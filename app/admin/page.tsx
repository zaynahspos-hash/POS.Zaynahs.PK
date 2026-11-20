'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'motion/react'
import toast, { Toaster } from 'react-hot-toast'
import { 
  Lock, KeyRound, LogOut, Database, Users, 
  Clock, Phone, MessageSquare, Mail, MapPin, 
  Trash2, Edit, Save, RefreshCw, FileText, CheckCircle2, 
  XOctagon, PhoneCall, ArrowLeft, Search, Filter, ShieldCheck, HelpCircle
} from 'lucide-react'

// Local interface representing a captured lead
interface PosLead {
  id: string
  shopName: string
  ownerName: string
  phoneNumber: string
  email: string | null
  businessType: string
  city: string | null
  status: string
  notes: string | null
  createdAt: string
  updatedAt: string
}

// Stats interface for analytics metrics
interface LeadStats {
  totalLeads: number
  pendingLeads: number
  contactedLeads: number
  installedLeads: number
  cancelledLeads: number
}

export default function AdminPage() {
  const [password, setPassword] = useState('')
  const [isAuthorized, setIsAuthorized] = useState(false)
  const [checkingAuth, setCheckingAuth] = useState(false)
  
  // Data state
  const [leads, setLeads] = useState<PosLead[]>([])
  const [stats, setStats] = useState<LeadStats>({
    totalLeads: 0,
    pendingLeads: 0,
    contactedLeads: 0,
    installedLeads: 0,
    cancelledLeads: 0
  })
  const [loading, setLoading] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')

  // Edit states per-lead to track editing notes
  const [editingNotes, setEditingNotes] = useState<{ [key: string]: string }>({})
  const [savingNotesId, setSavingNotesId] = useState<string | null>(null)
  


  // Check stored credentials on mount
  useEffect(() => {
    const savedPassword = localStorage.getItem('zaynahs-admin-key')
    if (savedPassword) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setPassword(savedPassword)
      verifyAndFetch(savedPassword)
    }
  }, [])

  // Function to verify key and load data
  async function verifyAndFetch(passKey: string) {
    if (!passKey) return
    setCheckingAuth(true)
    setLoading(true)

    try {
      const res = await fetch('/api/admin/leads', {
        headers: {
          'x-admin-password': passKey
        }
      })

      if (res.ok) {
        const data = await res.json()
        if (data.success) {
          setLeads(data.leads || [])
          setStats(data.stats || {
            totalLeads: 0,
            pendingLeads: 0,
            contactedLeads: 0,
            installedLeads: 0,
            cancelledLeads: 0
          })
          setIsAuthorized(true)
          localStorage.setItem('zaynahs-admin-key', passKey)
          
          // Pre-populate notes map
          const notesMap: { [key: string]: string } = {}
          data.leads.forEach((l: PosLead) => {
            notesMap[l.id] = l.notes || ''
          })
          setEditingNotes(notesMap)
        } else {
          toast.error('Could not authenticate: Access Denied.')
          localStorage.removeItem('zaynahs-admin-key')
        }
      } else {
        toast.error('Invalid security key. Please look at your ADMIN_PASSWORD env variable.')
        localStorage.removeItem('zaynahs-admin-key')
      }
    } catch (error) {
      toast.error('Connection error while logging in.')
    } finally {
      setCheckingAuth(false)
      setLoading(false)
    }
  }

  // Handle manual sign in submissions
  function handleLoginSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!password) {
      toast.error('Please enter the administrator key')
      return
    }
    verifyAndFetch(password)
  }

  // Handle logout
  function handleLogout() {
    localStorage.removeItem('zaynahs-admin-key')
    setIsAuthorized(false)
    setPassword('')
    setLeads([])
    toast.success('Admin session logged out safely.')
  }

  // Trigger reloading leads data
  async function reloadLeads() {
    if (!password) return
    verifyAndFetch(password)
  }

  // Update lead status
  async function handleUpdateStatus(leadId: string, newStatus: string) {
    setLoading(true)
    try {
      const res = await fetch('/api/admin/leads', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-password': password
        },
        body: JSON.stringify({ id: leadId, status: newStatus })
      })

      if (res.ok) {
        toast.success(`Status updated to ${newStatus.toUpperCase()}`)
        // Update local state smoothly
        setLeads(prevLeads => 
          prevLeads.map(l => l.id === leadId ? { ...l, status: newStatus } : l)
        )
        // Recalculate stats locally for instant feel
        const latestLeads = leads.map(l => l.id === leadId ? { ...l, status: newStatus } : l)
        setStats({
          totalLeads: latestLeads.length,
          pendingLeads: latestLeads.filter(l => l.status === 'pending').length,
          contactedLeads: latestLeads.filter(l => l.status === 'contacted').length,
          installedLeads: latestLeads.filter(l => l.status === 'installed').length,
          cancelledLeads: latestLeads.filter(l => l.status === 'cancelled').length,
        })
      } else {
        toast.error('Failed to change lead status on server.')
      }
    } catch (err) {
      toast.error('Network request failed.')
    } finally {
      setLoading(false)
    }
  }

  // Save specific lead notes
  async function handleSaveNotes(leadId: string) {
    const currentNotes = editingNotes[leadId];
    setSavingNotesId(leadId)
    try {
      const res = await fetch('/api/admin/leads', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-password': password
        },
        body: JSON.stringify({ id: leadId, notes: currentNotes })
      })

      if (res.ok) {
        toast.success('Internal notes updated in cloud Database')
        // Sync central state
        setLeads(prevLeads => 
          prevLeads.map(l => l.id === leadId ? { ...l, notes: currentNotes } : l)
        )
      } else {
        toast.error('Could not save notes to DB.')
      }
    } catch (err) {
      toast.error('Network error during patch.')
    } finally {
      setSavingNotesId(null)
    }
  }

  // Delete lead with dialog prompt
  async function handleDeleteLead(leadId: string, shopName: string) {
    const confirmed = window.confirm(`⚠️ Are you sure you want to delete lead "${shopName}"? This is irreversible database deletion.`)
    if (!confirmed) return

    setLoading(true)
    try {
      const res = await fetch(`/api/admin/leads?id=${leadId}`, {
        method: 'DELETE',
        headers: {
          'x-admin-password': password
        }
      })

      if (res.ok) {
        toast.success(`Deleted lead: ${shopName}`)
        // Remove from local array
        const latestLeads = leads.filter(l => l.id !== leadId)
        setLeads(latestLeads)
        setStats({
          totalLeads: latestLeads.length,
          pendingLeads: latestLeads.filter(l => l.status === 'pending').length,
          contactedLeads: latestLeads.filter(l => l.status === 'contacted').length,
          installedLeads: latestLeads.filter(l => l.status === 'installed').length,
          cancelledLeads: latestLeads.filter(l => l.status === 'cancelled').length,
        })
      } else {
        toast.error('Failed to delete lead from database.')
      }
    } catch (err) {
      toast.error('Delete request failed.')
    } finally {
      setLoading(false)
    }
  }



  // Filtered list computed on search text & state selection
  const filteredLeads = leads.filter(l => {
    const query = searchQuery.toLowerCase()
    const matchesSearch = 
      l.shopName.toLowerCase().includes(query) ||
      l.ownerName.toLowerCase().includes(query) ||
      l.phoneNumber.toLowerCase().includes(query) ||
      (l.city && l.city.toLowerCase().includes(query)) ||
      (l.email && l.email.toLowerCase().includes(query)) ||
      l.businessType.toLowerCase().includes(query)

    const matchesStatus = statusFilter === 'all' || l.status === statusFilter
    return matchesSearch && matchesStatus
  })

  // Format timestamp nicely
  function formatDate(isoString: string) {
    if (!isoString) return ''
    const d = new Date(isoString)
    return d.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  // Helper to get status color classes
  function getStatusStyle(status: string) {
    switch (status) {
      case 'pending':
        return 'bg-amber-500/10 text-amber-500 border-amber-500/20'
      case 'contacted':
        return 'bg-blue-500/10 text-blue-400 border-blue-500/20'
      case 'installed':
        return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
      case 'cancelled':
        return 'bg-rose-500/10 text-rose-400 border-rose-500/20'
      default:
        return 'bg-neutral-500/10 text-neutral-400 border-neutral-500/20'
    }
  }

  return (
    <div className="min-h-screen bg-black text-neutral-300 font-sans selection:bg-[#10B981]/30 selection:text-white">
      <Toaster position="top-right" />

      {/* Futuristic glow elements */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#10B981]/5 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-emerald-950/10 rounded-full blur-[180px] pointer-events-none" />

      {/* Lock Screen authentication if not verified */}
      {!isAuthorized ? (
        <div className="min-h-screen flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-md bg-neutral-900 border border-neutral-800 rounded-3xl p-8 shadow-2xl relative overflow-hidden"
          >
            <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-[#10B981] to-transparent" />
            
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="w-16 h-16 rounded-2xl bg-[#10B981]/10 flex items-center justify-center text-[#10B981] border border-[#10B981]/25">
                <Lock className="w-8 h-8" />
              </div>
              <div>
                <h1 className="text-2xl md:text-3xl font-black uppercase text-white font-outfit tracking-tight">
                  ZAYNAHS<span className="text-[#10B981]">POS</span>
                </h1>
                <p className="text-xs font-mono uppercase tracking-[0.2em] text-[#10B981] mt-1">Admin Command Control</p>
                <p className="text-sm text-neutral-400 mt-4 leading-relaxed">
                  Enter your encrypted security key to fetch real-time installation leads, update workflow status, and view metrics.
                </p>
              </div>

              <form onSubmit={handleLoginSubmit} className="w-full space-y-4 pt-4">
                <div className="relative">
                  <KeyRound className="absolute left-3.5 top-3.5 w-5 h-5 text-[#10B981] pointer-events-none" />
                  <input
                    required
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter Administration Key..."
                    className="w-full pl-11 pr-4 py-3 bg-black border border-neutral-800 rounded-xl text-white outline-none focus:border-[#10B981] placeholder-neutral-600 text-sm font-sans"
                  />
                </div>

                <button
                  type="submit"
                  disabled={checkingAuth}
                  className="w-full py-3.5 bg-[#10B981] text-black font-extrabold text-xs uppercase tracking-widest rounded-xl hover:bg-emerald-400 transition flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/10 cursor-pointer disabled:opacity-60"
                >
                  {checkingAuth ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin text-black" />
                      Unlocking Panel...
                    </>
                  ) : (
                    <>
                      <ShieldCheck className="w-4 h-4 text-black" />
                      Authenticate Security Key
                    </>
                  )}
                </button>
              </form>

              <div className="pt-6 border-t border-neutral-800/80 w-full flex items-center justify-between text-[11px] font-mono text-neutral-500">
                <Link href="/" className="hover:text-white flex items-center gap-1.5 transition">
                  <ArrowLeft className="w-3 h-3" /> Back to Home
                </Link>
                <span>System status: Online</span>
              </div>
            </div>
          </motion.div>
        </div>
      ) : (
        /* Authenticated Main Dashboard Workspace */
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-8 space-y-8">
          
          {/* Header Bar */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-neutral-900 pb-8">
            <div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 bg-[#10B981] rounded-full animate-pulse" />
                <span className="text-xs font-mono uppercase font-bold tracking-widest text-[#10B981]">Real Database Dashboard</span>
              </div>
              <h1 className="text-3xl md:text-4xl font-black text-white font-outfit uppercase mt-1">
                Leads & Installation Desk
              </h1>
              <p className="text-xs text-neutral-400 mt-1">
                Capture, analyze, and dispatch setup actions directly for retail clients.
              </p>
            </div>

            <div className="flex items-center gap-3 self-stretch md:self-auto">
              <button 
                onClick={reloadLeads}
                disabled={loading}
                className="px-4 py-2 bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 rounded-xl text-xs font-mono font-bold uppercase text-white flex items-center gap-2 cursor-pointer transition disabled:opacity-50"
              >
                <RefreshCw className={`w-3.5 h-3.5 text-[#10B981] ${loading ? 'animate-spin' : ''}`} />
                Fetch New
              </button>
              
              <button 
                onClick={handleLogout}
                className="px-4 py-2 bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/20 rounded-xl text-xs font-mono font-bold uppercase text-rose-450 flex items-center gap-2 cursor-pointer transition"
              >
                <LogOut className="w-3.5 h-3.5 text-rose-400" />
                Lock Panel
              </button>
            </div>
          </div>

          {/* Quick Metrics Section */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            
            <div className="bg-neutral-900/60 border border-neutral-800/80 p-5 rounded-2xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-16 h-16 bg-[#10B981]/5 rounded-bl-3xl" />
              <p className="text-[10px] font-mono font-bold uppercase tracking-wider text-neutral-500">Captured Leads</p>
              <h3 className="text-3xl md:text-4xl font-black text-white mt-1.5 font-outfit">{stats.totalLeads}</h3>
              <div className="flex items-center gap-1.5 text-neutral-400 text-xs mt-2.5 font-mono">
                <Users className="w-3.5 h-3.5 text-[#10B981]" />
                <span>All Inquiries</span>
              </div>
            </div>

            <div className="bg-neutral-900/60 border border-neutral-800/80 p-5 rounded-2xl relative overflow-hidden">
              <p className="text-[10px] font-mono font-bold uppercase tracking-wider text-neutral-500 font-medium">Pending Setup</p>
              <h3 className="text-3xl md:text-4xl font-black text-amber-500 mt-1.5 font-outfit">{stats.pendingLeads}</h3>
              <div className="flex items-center gap-1.5 text-neutral-400 text-xs mt-2.5 font-mono">
                <Clock className="w-3.5 h-3.5 text-amber-500 animate-pulse" />
                <span>Awaiting Call</span>
              </div>
            </div>

            <div className="bg-neutral-900/60 border border-neutral-800/80 p-5 rounded-2xl relative overflow-hidden">
              <p className="text-[10px] font-mono font-bold uppercase tracking-wider text-neutral-500 font-medium">Contacted Clients</p>
              <h3 className="text-3xl md:text-4xl font-black text-blue-450 text-blue-400 mt-1.5 font-outfit">{stats.contactedLeads}</h3>
              <div className="flex items-center gap-1.5 text-neutral-400 text-xs mt-2.5 font-mono">
                <Phone className="w-3.5 h-3.5 text-blue-400" />
                <span>In Discussion</span>
              </div>
            </div>

            <div className="bg-neutral-900/60 border border-neutral-800/80 p-5 rounded-2xl relative overflow-hidden">
              <p className="text-[10px] font-mono font-bold uppercase tracking-wider text-neutral-500 font-medium">Completed Installs</p>
              <h3 className="text-3xl md:text-4xl font-black text-emerald-450 text-emerald-400 mt-1.5 font-outfit">{stats.installedLeads}</h3>
              <div className="flex items-center gap-1.5 text-neutral-400 text-xs mt-2.5 font-mono">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Active Systems</span>
              </div>
            </div>

            <div className="bg-neutral-900/60 border border-neutral-800/80 p-5 rounded-2xl relative overflow-hidden">
              <p className="text-[10px] font-mono font-bold uppercase tracking-wider text-neutral-500 font-medium font-bold">Cancelled / Spam</p>
              <h3 className="text-3xl md:text-4xl font-black text-rose-500 mt-1.5 font-outfit">{stats.cancelledLeads}</h3>
              <div className="flex items-center gap-1.5 text-neutral-400 text-xs mt-2.5 font-mono">
                <XOctagon className="w-3.5 h-3.5 text-rose-450 text-rose-450" />
                <span>Closed Tickets</span>
              </div>
            </div>

          </div>

          {/* Filtering Ribbon & Search Controls */}
          <div className="bg-neutral-900 border border-neutral-800/80 rounded-2xl p-4 flex flex-col md:flex-row gap-4 items-stretch md:items-center">
            
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-3 w-4 h-4 text-neutral-500 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search leads by shop name, owner, WhatsApp, city or category..."
                className="w-full pl-10 pr-4 py-2.5 bg-black border border-neutral-800 rounded-xl text-neutral-300 outline-none focus:border-[#10B981] placeholder-neutral-600 text-sm font-sans"
              />
            </div>

            <div className="flex gap-2 shrink-0 flex-wrap">
              <div className="flex items-center gap-2 border border-neutral-800 bg-black rounded-xl px-3 py-1.5">
                <Filter className="w-3.5 h-3.5 text-[#10B981]" />
                <span className="text-[11px] font-mono font-bold uppercase text-neutral-500">Status</span>
              </div>
              <button 
                onClick={() => setStatusFilter('all')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold uppercase transition scale-95 cursor-pointer ${
                  statusFilter === 'all' 
                    ? 'bg-[#10B981] text-black shadow-md shadow-brand-[#10B981]/20' 
                    : 'bg-black border border-neutral-800 text-neutral-400 hover:text-white'
                }`}
              >
                All
              </button>
              <button 
                onClick={() => setStatusFilter('pending')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold uppercase transition scale-95 cursor-pointer ${
                  statusFilter === 'pending' 
                    ? 'bg-amber-500 text-black shadow-md shadow-amber-500/20' 
                    : 'bg-black border border-neutral-800 text-neutral-400 hover:text-white'
                }`}
              >
                Pending
              </button>
              <button 
                onClick={() => setStatusFilter('contacted')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold uppercase transition scale-95 cursor-pointer ${
                  statusFilter === 'contacted' 
                    ? 'bg-blue-500 text-white shadow-md shadow-blue-500/20' 
                    : 'bg-black border border-neutral-800 text-neutral-400 hover:text-white'
                }`}
              >
                Contacted
              </button>
              <button 
                onClick={() => setStatusFilter('installed')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold uppercase transition scale-95 cursor-pointer ${
                  statusFilter === 'installed' 
                    ? 'bg-emerald-500 text-black shadow-md shadow-emerald-500/20' 
                    : 'bg-black border border-neutral-800 text-[#10B981]/70 hover:text-[#10B981] hover:bg-[#10B981]/5'
                }`}
              >
                Installed
              </button>
              <button 
                onClick={() => setStatusFilter('cancelled')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold uppercase transition scale-95 cursor-pointer ${
                  statusFilter === 'cancelled' 
                    ? 'bg-rose-500 text-white shadow-md shadow-rose-500/20' 
                    : 'bg-black border border-neutral-800 text-neutral-400 hover:text-white'
                }`}
              >
                Cancelled
              </button>
            </div>

          </div>

          {/* Core Table / List Layout */}
          {filteredLeads.length === 0 ? (
            <div className="bg-neutral-900 border border-neutral-800 p-16 rounded-3xl text-center space-y-4">
              <div className="w-12 h-12 bg-neutral-850 border border-neutral-800 rounded-2xl flex items-center justify-center text-neutral-500 mx-auto">
                <FileText className="w-6 h-6 text-neutral-500" />
              </div>
              <p className="text-white font-bold leading-none">No retail inquiries found</p>
              <p className="text-xs text-neutral-500 max-w-sm mx-auto">
                No leads found matching your filters. Share your website booking link with retail clients to capture real-time installations.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              <p className="text-[11px] font-mono font-bold uppercase tracking-widest text-[#10B981] px-1">
                Showing {filteredLeads.length} of {leads.length} captured leads
              </p>
              
              <div className="grid grid-cols-1 gap-4">
                {filteredLeads.map((lead) => {
                  const cleanedWhatsApp = lead.phoneNumber.replace(/\D/g, '')
                  const waUrl = `https://wa.me/${cleanedWhatsApp}?text=Assalam-o-Alaikum%20${encodeURIComponent(lead.ownerName)}%2C%20this%20is%20ZaynahsPOS%20Support.%20We%20received%20your%20installation%20booking%20for%20${encodeURIComponent(lead.shopName)}.%20Would%2520you%252520like%252550to%252550confirm%252550your%252550setup%252550time%252550today%252550?`
                  
                  return (
                    <motion.div
                      layout
                      key={lead.id}
                      className="bg-neutral-900 border border-neutral-800 hover:border-neutral-700/80 rounded-2xl p-6 transition-all duration-200"
                    >
                      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-4 border-b border-neutral-800/55">
                        <div className="space-y-1.5">
                          <div className="flex items-center gap-3">
                            <h3 className="text-xl font-bold text-white uppercase tracking-tight font-sans">
                              {lead.shopName}
                            </h3>
                            <span className="text-[10px] font-mono font-semibold px-2.5 py-1 bg-neutral-800 text-neutral-200 rounded border border-neutral-750">
                              {lead.businessType}
                            </span>
                          </div>
                          
                          <div className="flex items-center gap-4 text-xs font-mono text-neutral-400">
                            <span className="flex items-center gap-1">
                              <Users className="w-3.5 h-3.5 text-[#10B981]" />
                              Owner: <strong>{lead.ownerName}</strong>
                            </span>
                            {lead.city && (
                              <span className="flex items-center gap-1">
                                <MapPin className="w-3.5 h-3.5 text-[#10B981]" />
                                Location: <strong>{lead.city}</strong>
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Status Manager and Action Selector */}
                        <div className="flex items-center gap-4 shrink-0 self-stretch md:self-auto justify-between md:justify-end border-t border-dashed border-neutral-800/50 md:border-t-0 pt-4 md:pt-0">
                          <div>
                            <span className={`px-3 py-1.5 rounded-lg border text-[11px] font-mono uppercase font-bold ${getStatusStyle(lead.status)}`}>
                              {lead.status}
                            </span>
                          </div>
                          
                          <select
                            value={lead.status}
                            onChange={(e) => handleUpdateStatus(lead.id, e.target.value)}
                            className="bg-black border border-neutral-800 rounded-xl px-3 py-2 text-xs font-mono font-bold uppercase text-white outline-none cursor-pointer focus:border-[#10B981]"
                          >
                            <option value="pending">Mark Pending</option>
                            <option value="contacted">Mark Contacted</option>
                            <option value="installed">Mark Installed</option>
                            <option value="cancelled">Mark Cancelled</option>
                          </select>
                        </div>
                      </div>

                      {/* Lead Contact Info & Actions */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-5">
                        
                        {/* Direct Communication Channels */}
                        <div className="space-y-3">
                          <p className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#10B981]">Direct Actions</p>
                          
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                            <a
                              href={waUrl}
                              target="_blank"
                              rel="noreferrer"
                              className="px-4 py-3 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/20 rounded-xl text-xs font-semibold text-emerald-400 hover:text-emerald-300 transition flex items-center justify-center gap-2 cursor-pointer text-center"
                            >
                              <MessageSquare className="w-4 h-4 shrink-0 text-emerald-450" />
                              WhatsApp Message
                            </a>

                            <a
                              href={`tel:${lead.phoneNumber}`}
                              className="px-4 py-3 bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/20 rounded-xl text-xs font-semibold text-blue-400 hover:text-blue-300 transition flex items-center justify-center gap-2 cursor-pointer text-center"
                            >
                              <PhoneCall className="w-4 h-4 shrink-0 text-blue-450" />
                              Direct Call Desk
                            </a>
                          </div>

                          <div className="bg-black/60 p-3 rounded-xl border border-neutral-800 space-y-1 text-xs">
                            <p className="text-[10px] uppercase font-mono text-neutral-500">Contact Details</p>
                            <div className="flex items-center justify-between">
                              <span className="text-neutral-400 font-mono">WhatsApp:</span>
                              <span className="font-bold text-white selection:bg-emerald-500/20">{lead.phoneNumber}</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-neutral-400 font-mono">Email Adr:</span>
                              <span className="font-bold text-white selection:bg-emerald-500/20">{lead.email || 'None Provided'}</span>
                            </div>
                            <div className="flex items-center justify-between pt-1">
                              <span className="text-neutral-400 font-mono">Booked on:</span>
                              <span className="text-neutral-400 font-mono text-[10.5px]">{formatDate(lead.createdAt)}</span>
                            </div>
                          </div>
                        </div>

                        {/* Editable Cloud Database Notes Area */}
                        <div className="space-y-3 flex flex-col">
                          <div className="flex items-center justify-between">
                            <p className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#10B981]">Database Notes</p>
                            <span className="text-[9px] font-mono text-neutral-500 uppercase">updates live</span>
                          </div>

                          <textarea
                            value={editingNotes[lead.id] !== undefined ? editingNotes[lead.id] : (lead.notes || '')}
                            onChange={(e) => {
                              const text = e.target.value
                              setEditingNotes(prev => ({
                                ...prev,
                                [lead.id]: text
                              }))
                            }}
                            placeholder="Add administrative pipeline notes (e.g., 'Wants barcode scanner. Scheduled physically configuration next Tuesday')..."
                            className="w-full flex-1 min-h-[90px] p-3 bg-black border border-neutral-800 rounded-xl text-xs text-neutral-300 outline-none focus:border-[#10B981] placeholder-neutral-700 font-sans resize-y"
                          />

                          <div className="flex items-center justify-between gap-4">
                            <button
                              onClick={() => handleDeleteLead(lead.id, lead.shopName)}
                              className="px-3.5 py-2.5 bg-rose-500/5 hover:bg-rose-500/10 border border-rose-500/20 hover:border-rose-500/50 rounded-xl text-[11px] font-mono uppercase font-bold text-rose-450 hover:text-rose-400 flex items-center gap-1.5 transition cursor-pointer"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                              Delete Inq
                            </button>

                            <button
                              onClick={() => handleSaveNotes(lead.id)}
                              disabled={savingNotesId === lead.id}
                              className="px-4 py-2.5 bg-[#10B981] hover:bg-emerald-400 text-black rounded-xl text-xs font-bold uppercase flex items-center gap-1.5 transition cursor-pointer disabled:opacity-50"
                            >
                              {savingNotesId === lead.id ? (
                                <>
                                  <RefreshCw className="w-3 h-3 animate-spin text-black" />
                                  Saving...
                                </>
                              ) : (
                                <>
                                  <Save className="w-3.5 h-3.5" />
                                  Save DB Notes
                                </>
                              )}
                            </button>
                          </div>

                        </div>

                      </div>

                    </motion.div>
                  )
                })}
              </div>
            </div>
          )}

          {/* Prompt/Help card */}
          <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 flex flex-col sm:flex-row items-center gap-4 relative overflow-hidden">
            <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0 text-[#10B981]">
              <HelpCircle className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h5 className="text-white font-extrabold text-sm uppercase">Configured for Cloud Run Autodeployment</h5>
              <p className="text-xs text-neutral-400 leading-relaxed max-w-3xl">
                This app is optimized for rapid deployment. When you test this dashboard, all actions read/write your live Supabase database via Prisma ORM directly. Ensure your <code className="bg-black text-[#10B981] px-1 rounded">ADMIN_PASSWORD</code> is set in raw environment variables.
              </p>
            </div>
          </div>

        </div>
      )}
    </div>
  )
}
