'use client'

import { useState, useEffect } from 'react'
import Header from '../components/Header'
import Hero from '../components/Hero'
import Features from '../components/Features'
import PricingSection from '../components/PricingSection'
import BookingForm from '../components/BookingForm'
import OtherApps from '../components/OtherApps'
import FloatingWidget from '../components/FloatingWidget'
import { Mail, MessageSquare, Instagram, Facebook, Ghost, Music4 } from 'lucide-react'

export default function Home() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light')
  
  // Check stored theme in window on load
  useEffect(() => {
    const stored = localStorage.getItem('theme-preference')
    let activeTheme: 'light' | 'dark' = 'light'
    if (stored === 'dark') {
      activeTheme = 'dark'
    } else {
      activeTheme = 'light'
    }
    
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setTheme(activeTheme)
    if (activeTheme === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [])

  const toggleTheme = () => {
    const nextTheme = theme === 'light' ? 'dark' : 'light'
    setTheme(nextTheme)
    localStorage.setItem('theme-preference', nextTheme)
    if (nextTheme === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }

  // Active contact details from configuration
  const whatsappUrl = `https://wa.me/${(process.env.NEXT_PUBLIC_ADMIN_WHATSAPP || '+923001234567').replace(/\D/g, '')}?text=Hi%20ZaynahsPOS%2C%20I%20want%20to%20get%2520more%2520details%2520about%2520your%2520POS%2520system!`

  const isDark = theme === 'dark'

  return (
    <div className={`relative min-h-screen transition-colors duration-300 font-sans overflow-x-clip bg-white dark:bg-black text-neutral-700 dark:text-neutral-300`}>
      
      {/* Global Immersive UI Glow Effects */}
      <div className={`absolute top-[-200px] left-[-200px] w-[600px] h-[600px] rounded-full blur-[120px] pointer-events-none z-0 transition-opacity duration-300 ${
        isDark ? 'bg-[#10B981]/10 opacity-100' : 'bg-[#10B981]/8 opacity-60'
      }`} />
      <div className={`absolute bottom-[20%] right-[-100px] w-[500px] h-[500px] rounded-full blur-[100px] pointer-events-none z-0 transition-opacity duration-300 ${
        isDark ? 'bg-[#10B981]/5 opacity-100' : 'bg-[#10B981]/4 opacity-50'
      }`} />

      {/* 1. Header Navigation */}
      <Header theme={theme} onChangeTheme={toggleTheme} />

      {/* 2. Responsive Premium Showcase (all 3 devices composited together) */}
      <Hero theme={theme} />

      {/* 3. Simple static Features List */}
      <Features theme={theme} />

      {/* 4. Pricing details */}
      <PricingSection theme={theme} />

      {/* 5. Setup and Installation Booking Form */}
      <BookingForm theme={theme} />

      {/* 6. Other Apps / Business Ecosystem Section */}
      <section 
        id="ecosystem" 
        className={`py-24 relative overflow-hidden transition-colors duration-300 border-t ${
          isDark ? 'bg-black border-neutral-900 text-white' : 'bg-slate-50 border-slate-200 text-neutral-800'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 z-10 relative">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-mono font-bold tracking-[0.2em] text-brand-emerald bg-brand-emerald/10 px-3 py-1.5 rounded-full uppercase inline-flex items-center gap-1.5">
              <span>BUSINESS SOLUTIONS</span>
            </span>
            <h2 className={`text-3xl md:text-5xl font-black uppercase tracking-tight font-sans mt-4 transition-colors duration-300 ${
              isDark ? 'text-white' : 'text-slate-900'
            }`}>
              Our Apps &amp; <span className="text-brand-emerald">Ecosystem</span>
            </h2>
            <p className={`mt-3 text-sm md:text-base transition-colors duration-300 ${
              isDark ? 'text-neutral-400' : 'text-neutral-600'
            }`}>
              Explore our connected systems designed to automate and digitalize retail checkouts, WhatsApp order bookings, courier labeling, and deliveries.
            </p>
          </div>
          
          <OtherApps />
        </div>
      </section>

      {/* 5. Minimalistic footer with corporate styling */}
      <footer className={`transition-colors duration-300 py-16 border-t ${
        isDark ? 'bg-black border-neutral-900 text-neutral-500' : 'bg-slate-100/50 border-slate-200 text-neutral-600'
      }`}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 mb-12">
            <div className="sm:col-span-2 space-y-5">
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-xl overflow-hidden border shadow-sm ${isDark ? 'border-neutral-800' : 'border-slate-200'}`}>
                  <img 
                    src="https://vnoxmoqnyqaqnlsnwbus.supabase.co/storage/v1/object/public/product-images/zaynahspos.com.webp" 
                    alt="ZaynahsPOS logo" 
                    className="w-full h-full object-cover" 
                  />
                </div>
                <h3 className={`text-xl font-black uppercase tracking-wider transition-colors duration-300 ${
                  isDark ? 'text-white' : 'text-slate-900'
                }`}>
                  Zaynahs<span className="text-brand-emerald">POS</span>
                </h3>
              </div>
              <p className={`text-sm leading-relaxed max-w-sm transition-colors duration-300 ${
                isDark ? 'text-neutral-400' : 'text-neutral-600'
              }`}>
                Next-generation, lighting-fast, cloud-synced point of sale solution built explicitly to help retailers settle sales instantly. <br/><br/>
                A project by <strong>Zaynahs Developers</strong>.
              </p>
              <div className="flex items-center gap-4 pt-2">
                <a 
                  href={`https://wa.me/923027245937?text=Hi%20Shoaib%2C%20I%20want%20to%20get%20more%20details%20about%20your%20POS%20system!`}
                  target="_blank"
                  rel="noreferrer"
                  className={`w-10 h-10 rounded-full border flex items-center justify-center transition ${
                    isDark 
                      ? 'bg-neutral-900/60 border-neutral-800 text-neutral-400 hover:text-brand-emerald hover:border-brand-emerald' 
                      : 'bg-white border-slate-200 text-neutral-600 hover:text-brand-emerald hover:border-brand-emerald shadow-sm'
                  }`}
                >
                  <MessageSquare className="w-4 h-4" />
                </a>
                <a 
                  href={`mailto:shoaibzaynah@gmail.com`}
                  className={`w-10 h-10 rounded-full border flex items-center justify-center transition ${
                    isDark 
                      ? 'bg-neutral-900/60 border-neutral-800 text-neutral-400 hover:text-brand-emerald hover:border-brand-emerald' 
                      : 'bg-white border-slate-200 text-neutral-600 hover:text-brand-emerald hover:border-brand-emerald shadow-sm'
                  }`}
                >
                  <Mail className="w-4 h-4" />
                </a>
              </div>
            </div>

            <div>
              <h4 className={`text-xs font-mono font-bold uppercase tracking-widest mb-6 ${
                isDark ? 'text-white' : 'text-slate-900'
              }`}>
                Corporate Office
              </h4>
              <ul className="space-y-4 text-sm font-mono mt-1">
                <li>
                  <span className={`block text-[11px] leading-tight uppercase mb-2 ${isDark ? 'text-neutral-600' : 'text-neutral-500'}`}>
                    Address
                  </span>
                  <span className={`block text-sm leading-relaxed ${isDark ? 'text-neutral-400' : 'text-neutral-700'}`}>
                    G77 Makki Complex<br />
                    Chungi Amar Sidhu<br />
                    Lahore, Pakistan
                  </span>
                </li>
              </ul>
            </div>

            <div>
              <h4 className={`text-xs font-mono font-bold uppercase tracking-widest mb-6 ${
                isDark ? 'text-white' : 'text-slate-900'
              }`}>
                Direct Contact
              </h4>
              <ul className="space-y-4 text-sm font-mono mt-1">
                <li>
                  <span className={`block text-[11px] leading-tight uppercase ${isDark ? 'text-neutral-600' : 'text-neutral-500'}`}>
                    Direct Line
                  </span>
                  <a href="https://wa.me/923027245937" target="_blank" rel="noreferrer" className="block text-sm hover:text-brand-emerald font-bold mt-1">
                    0302-7245937
                  </a>
                </li>
                <li>
                  <span className={`block text-[11px] leading-tight uppercase ${isDark ? 'text-neutral-600' : 'text-neutral-500'}`}>
                    Support Email
                  </span>
                  <a href="mailto:shoaibzaynah@gmail.com" className="block text-sm hover:text-brand-emerald font-bold mt-1 max-w-xs break-all">
                    shoaibzaynah@gmail.com
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className={`text-xs font-mono font-bold uppercase tracking-widest mb-6 ${
                isDark ? 'text-white' : 'text-slate-900'
              }`}>
                Developer
              </h4>
              <div className="mt-1">
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-12 h-12 rounded-full overflow-hidden border ${isDark ? 'border-neutral-800' : 'border-slate-200'}`}>
                    <img 
                      src="https://avatars.githubusercontent.com/shoaibzaynah" 
                      onError={(e) => {
                        // Fallback if image fails to load
                        (e.target as HTMLImageElement).src = "https://ui-avatars.com/api/?name=Shoaib+Zaynah&background=10B981&color=fff";
                      }}
                      alt="Shoaib Zaynah" 
                      className="w-full h-full object-cover" 
                    />
                  </div>
                  <div>
                    <span className={`block text-[10px] leading-tight uppercase font-mono tracking-wider ${isDark ? 'text-neutral-500' : 'text-neutral-500'}`}>
                      Lead Dev
                    </span>
                    <span className={`block text-sm font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                      Shoaib Zaynah
                    </span>
                  </div>
                </div>
                
                <div className={`text-xs space-y-3 font-mono ${isDark ? 'text-neutral-400' : 'text-neutral-600'}`}>
                  <div>
                    <p className={`text-[10px] uppercase mb-2 ${isDark ? 'text-neutral-600' : 'text-neutral-400'}`}>Socials</p>
                    <div className="flex flex-col gap-2">
                      <a href="https://instagram.com/shoaibzaynah" target="_blank" rel="noreferrer" className="flex items-center gap-1.5 hover:text-brand-emerald transition block">
                        <Instagram className="w-3.5 h-3.5" />
                        <span className="font-bold">@shoaibzaynah</span>
                      </a>
                      <a href="https://facebook.com/shoaibzaynah" target="_blank" rel="noreferrer" className="flex items-center gap-1.5 hover:text-brand-emerald transition block">
                        <Facebook className="w-3.5 h-3.5" />
                        <span className="font-bold">@shoaibzaynah</span>
                      </a>
                      <a href="https://snapchat.com/add/shoaibzaynah" target="_blank" rel="noreferrer" className="flex items-center gap-1.5 hover:text-brand-emerald transition block">
                        <Ghost className="w-3.5 h-3.5" />
                        <span className="font-bold">@shoaibzaynah</span>
                      </a>
                      <a href="https://tiktok.com/@shoaibzaynahh" target="_blank" rel="noreferrer" className="flex items-center gap-1.5 hover:text-brand-emerald transition block">
                        <Music4 className="w-3.5 h-3.5" />
                        <span className="font-bold">@shoaibzaynahh</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <hr className={`mb-8 ${isDark ? 'border-neutral-900' : 'border-slate-200'}`} />

          {/* Legal statement */}
          <div className={`flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono mt-8 ${
            isDark ? 'text-neutral-600' : 'text-neutral-500'
          }`}>
            <span>© 2026 ZaynahsPOS & Zaynahs Developers. All rights registered.</span>
            <div className="flex items-center gap-4 hidden sm:flex">
              <a href="#features" className="hover:text-brand-emerald transition">Product Features</a>
              <a href="#ecosystem" className="hover:text-brand-emerald transition">Other Apps</a>
              <a href="#hero" className="hover:text-brand-emerald transition">Overview</a>
              <a href="/admin" className="hover:text-brand-emerald transition font-bold text-brand-emerald/70">Leads Manager</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Isolate Client Action Buttons widget with zero page-level re-renders */}
      <FloatingWidget whatsappNumber={process.env.NEXT_PUBLIC_ADMIN_WHATSAPP || "923027245937"} />

    </div>
  )
}
