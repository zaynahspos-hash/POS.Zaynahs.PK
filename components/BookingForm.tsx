'use client'

import React, { useState } from 'react'
import { motion } from 'motion/react'
import toast, { Toaster } from 'react-hot-toast'
import { Calendar, Store, User, Phone, Mail, Building, MapPin, RefreshCw, Sparkles } from 'lucide-react'

interface BookingProps {
  theme?: 'light' | 'dark'
}

export default function BookingForm({ theme = 'light' }: BookingProps) {
  const [loading, setLoading] = useState(false)
  const [mounted, setMounted] = useState(false)

  React.useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true)
  }, [])

  const isDark = theme === 'dark'

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)

    const formData = new FormData(e.currentTarget)
    const payload = {
      shopName: formData.get('shopName'),
      ownerName: formData.get('ownerName'),
      phoneNumber: formData.get('phoneNumber'),
      email: formData.get('email'),
      businessType: formData.get('businessType'),
      city: formData.get('city'),
    }

    try {
      const res = await fetch('/api/submit-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })

      const responseData = await res.json()

      if (res.ok && responseData.success) {
        toast.success('Installation booked successfully! Demo credentials dispatched to your email.', {
          duration: 6000,
          position: 'top-center'
        })
        e.currentTarget.reset()
      } else {
        const errMessage = responseData.error || 'Failed to submit booking.'
        toast.error(`Submission failed: ${errMessage}`)
      }
    } catch (error) {
      toast.error('Network error. Please check your connection and try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section 
      id="booking-form" 
      className={`py-24 relative overflow-hidden transition-colors duration-300 ${
        isDark ? 'bg-black text-white' : 'bg-slate-50 text-neutral-800'
      }`}
    >
      {mounted && <Toaster position="top-center" reverseOrder={false} />}
      
      {/* Absolute glow highlights */}
      <div className={`absolute w-[600px] h-[600px] rounded-full blur-[120px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none transition-all ${
        isDark ? 'bg-brand-emerald/10' : 'bg-brand-emerald/20'
      }`} />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 z-10 relative">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="text-xs font-mono font-bold tracking-[0.2em] text-brand-emerald bg-brand-emerald/10 px-3 py-1.5 rounded-full uppercase inline-flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5" />
            Launch Program
          </span>
          <h2 className={`text-3xl md:text-5xl font-black uppercase tracking-tight font-sans mt-4 transition-colors duration-300 ${
            isDark ? 'text-white' : 'text-slate-900'
          }`}>
            Book Setup & Install
          </h2>
          <p className={`mt-3 text-sm md:text-base transition-colors duration-300 ${
            isDark ? 'text-neutral-400' : 'text-neutral-600'
          }`}>
            Configure your virtual or physical checkout machines. Fill the details below, and our engineering desk will schedule a remote launch meeting on WhatsApp within 4 hours.
          </p>
        </motion.div>

        {/* Dynamic Booking Card Form */}
        <motion.div 
          initial={{ opacity: 0, y: 40, scale: 0.96 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: false, amount: 0.15 }}
          transition={{ type: "spring", stiffness: 75, damping: 14 }}
          className={`relative group p-6 sm:p-12 md:p-16 border rounded-[2rem] sm:rounded-[3rem] overflow-hidden shadow-2xl transition-colors duration-300 ${
            isDark 
              ? 'bg-[#111111] border-neutral-800 shadow-brand-emerald/5' 
              : 'bg-white border-slate-200 shadow-brand-emerald/5'
          }`}
        >
          
          {/* Top highlight bar */}
          <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-brand-emerald to-transparent opacity-70" />
          
          <form onSubmit={handleSubmit} className="space-y-8" suppressHydrationWarning>
            <div className="grid sm:grid-cols-2 gap-6">
              {/* Shop Name */}
              <div className="space-y-2">
                <label className={`text-xs font-mono font-bold uppercase tracking-wider flex items-center gap-1.5 transition-colors duration-300 ${isDark ? 'text-neutral-400' : 'text-neutral-500'}`}>
                  <Store className="w-3.5 h-3.5 text-brand-emerald" />
                  Shop / Business Name *
                </label>
                <input
                  required
                  type="text"
                  name="shopName"
                  suppressHydrationWarning
                  placeholder="e.g. Zaynahs Bakers & Sweets"
                  className={`w-full px-4 py-3 border rounded-xl text-sm transition outline-none font-sans ${
                    isDark 
                      ? 'bg-black/80 border-neutral-800 text-white focus:border-brand-emerald hover:border-neutral-700' 
                      : 'bg-slate-50 border-neutral-200 text-slate-800 focus:border-brand-emerald hover:border-neutral-300'
                  }`}
                />
              </div>

              {/* Owner Name */}
              <div className="space-y-2">
                <label className={`text-xs font-mono font-bold uppercase tracking-wider flex items-center gap-1.5 transition-colors duration-300 ${isDark ? 'text-neutral-400' : 'text-neutral-500'}`}>
                  <User className="w-3.5 h-3.5 text-brand-emerald" />
                  Owner Name *
                </label>
                <input
                  required
                  type="text"
                  name="ownerName"
                  suppressHydrationWarning
                  placeholder="e.g. Muhammad Jameel"
                  className={`w-full px-4 py-3 border rounded-xl text-sm transition outline-none font-sans ${
                    isDark 
                      ? 'bg-black/80 border-neutral-800 text-white focus:border-brand-emerald hover:border-neutral-700' 
                      : 'bg-slate-50 border-neutral-200 text-slate-800 focus:border-brand-emerald hover:border-neutral-300'
                  }`}
                />
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
              {/* WhatsApp Number */}
              <div className="space-y-2">
                <label className={`text-xs font-mono font-bold uppercase tracking-wider flex items-center gap-1.5 transition-colors duration-300 ${isDark ? 'text-neutral-400' : 'text-neutral-500'}`}>
                  <Phone className="w-3.5 h-3.5 text-brand-emerald" />
                  WhatsApp Number *
                </label>
                <input
                  required
                  type="tel"
                  name="phoneNumber"
                  suppressHydrationWarning
                  placeholder="e.g. +92 300 1234567"
                  className={`w-full px-4 py-3 border rounded-xl text-sm transition outline-none font-mono ${
                    isDark 
                      ? 'bg-black/80 border-neutral-800 text-white focus:border-brand-emerald hover:border-neutral-700' 
                      : 'bg-slate-50 border-neutral-200 text-slate-800 focus:border-brand-emerald hover:border-neutral-300'
                  }`}
                />
              </div>

              {/* Email Address */}
              <div className="space-y-2">
                <label className={`text-xs font-mono font-bold uppercase tracking-wider flex items-center gap-1.5 transition-colors duration-300 ${isDark ? 'text-neutral-400' : 'text-neutral-500'}`}>
                  <Mail className="w-3.5 h-3.5 text-brand-emerald" />
                  Email Address <span className="text-[10px] text-neutral-400">(highly recommended)</span>
                </label>
                <input
                  type="email"
                  name="email"
                  suppressHydrationWarning
                  placeholder="e.g. info@zaynahsbakers.com"
                  className={`w-full px-4 py-3 border rounded-xl text-sm transition outline-none font-mono ${
                    isDark 
                      ? 'bg-black/80 border-neutral-800 text-white focus:border-brand-emerald hover:border-neutral-700' 
                      : 'bg-slate-50 border-neutral-200 text-slate-800 focus:border-brand-emerald hover:border-neutral-300'
                  }`}
                />
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
              {/* Business Type Selector */}
              <div className="space-y-2">
                <label className={`text-xs font-mono font-bold uppercase tracking-wider flex items-center gap-1.5 transition-colors duration-300 ${isDark ? 'text-neutral-400' : 'text-neutral-500'}`}>
                  <Building className="w-3.5 h-3.5 text-brand-emerald" />
                  Business Type *
                </label>
                <select
                  required
                  name="businessType"
                  suppressHydrationWarning
                  className={`w-full px-4 py-3 border rounded-xl text-sm transition outline-none font-sans cursor-pointer ${
                    isDark 
                      ? 'bg-neutral-905 border-neutral-800 text-white focus:border-brand-emerald hover:border-neutral-700' 
                      : 'bg-slate-50 border-neutral-200 text-slate-800 focus:border-brand-emerald hover:border-neutral-300'
                  }`}
                >
                  <option value="" className={isDark ? "bg-neutral-900 text-neutral-500" : "bg-white text-neutral-500"}>Choose category...</option>
                  <option value="Retail Shop" className={isDark ? "bg-neutral-900 text-white" : "bg-white text-slate-800"}>Retail Shop / General Store</option>
                  <option value="Restaurant" className={isDark ? "bg-neutral-900 text-white" : "bg-white text-slate-800"}>Restaurant / Food Truck / Café</option>
                  <option value="Pharmacy" className={isDark ? "bg-neutral-900 text-white" : "bg-white text-slate-800"}>Pharmacy / Drugstore</option>
                  <option value="Grocery Store" className={isDark ? "bg-neutral-900 text-white" : "bg-white text-slate-800"}>Grocery / Supermarket</option>
                  <option value="Electronics Shop" className={isDark ? "bg-neutral-900 text-white" : "bg-white text-slate-800"}>Electronics / Gadget Hub</option>
                  <option value="Garments Store" className={isDark ? "bg-neutral-900 text-white" : "bg-white text-slate-800"}>Garments & Shoes Store / Clothing & Footwear</option>
                  <option value="Accessories Store" className={isDark ? "bg-neutral-900 text-white" : "bg-white text-slate-800"}>Accessories & Cosmetics Store</option>
                  <option value="Mobile Shop" className={isDark ? "bg-neutral-900 text-white" : "bg-white text-slate-800"}>Mobile Shop & Accessories</option>
                  <option value="Other" className={isDark ? "bg-neutral-900 text-white" : "bg-white text-slate-800"}>Other business entity</option>
                </select>
              </div>

              {/* City */}
              <div className="space-y-2">
                <label className={`text-xs font-mono font-bold uppercase tracking-wider flex items-center gap-1.5 transition-colors duration-300 ${isDark ? 'text-neutral-400' : 'text-neutral-500'}`}>
                  <MapPin className="w-3.5 h-3.5 text-brand-emerald" />
                  City Location <span className="text-[10px] text-neutral-400">(optional)</span>
                </label>
                <input
                  type="text"
                  name="city"
                  suppressHydrationWarning
                  placeholder="e.g. Lahore, Karachi, Islamabad"
                  className={`w-full px-4 py-3 border rounded-xl text-sm transition outline-none font-sans ${
                    isDark 
                      ? 'bg-black/80 border-neutral-800 text-white focus:border-brand-emerald hover:border-neutral-700' 
                      : 'bg-slate-50 border-neutral-200 text-slate-800 focus:border-brand-emerald hover:border-neutral-300'
                  }`}
                />
              </div>
            </div>

            <div className="pt-8 border-t border-dashed border-neutral-200/50 dark:border-neutral-800/80 flex flex-col items-center gap-5">
              <div className="w-full sm:w-auto sm:min-w-[320px]">
                <button
                  disabled={loading}
                  type="submit"
                  className="w-full py-4 px-8 bg-brand-emerald hover:bg-emerald-600 text-white font-bold text-base rounded-xl transition-colors duration-200 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
                >
                  {loading ? (
                    <>
                      <RefreshCw className="w-5 h-5 animate-spin" />
                      <span>Submitting...</span>
                    </>
                  ) : (
                    <span>Book Installation Now</span>
                  )}
                </button>
              </div>
              <span className={`text-[11px] font-mono text-center ${isDark ? 'text-neutral-500' : 'text-neutral-400'}`}>
                🔒 Form entries are protected by direct TLS 1.3 protocol. No data is shared.
              </span>
            </div>
          </form>
        </motion.div>
      </div>
    </section>
  )
}
