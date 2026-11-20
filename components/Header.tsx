'use client'

import { useState } from 'react'
import { motion } from 'motion/react'
import Image from 'next/image'
import Link from 'next/link'
import { Menu, X, Sun, Moon } from 'lucide-react'

interface HeaderProps {
  theme: 'light' | 'dark'
  onChangeTheme: () => void
}

export default function Header({ theme, onChangeTheme }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const demoUrl = process.env.NEXT_PUBLIC_DEMO_URL || 'https://demo.zaynahspos.com'

  const navigationItems = [
    { label: 'Capabilities', href: '/#features' },
    { label: 'Pricing', href: '/#pricing' },
    { label: 'Book Installation', href: '/#booking-form' },
    { label: 'Other Apps', href: '/#ecosystem' }
  ]

  const isDark = theme === 'dark'

  return (
    <header className={`fixed top-0 inset-x-0 z-[999999] transform-gpu h-20 flex items-center px-4 md:px-12 select-none backdrop-blur-md border-b transition-all duration-300 ${
      isDark ? 'bg-[#0A0A0A]/95 border-white/5' : 'bg-white/95 border-neutral-200/60'
    }`}>
      <div className="max-w-7xl mx-auto w-full flex items-center justify-between">
        
        {/* Logo brand label */}
        <Link href="/" className="flex items-center gap-2">
          <div className="relative w-9 h-9 overflow-hidden rounded-lg flex items-center justify-center bg-transparent shrink-0">
            <Image 
              src="https://vnoxmoqnyqaqnlsnwbus.supabase.co/storage/v1/object/public/product-images/zaynahspos.com.webp"
              alt="ZaynahsPOS logo"
              width={36}
              height={36}
              className="object-contain"
              referrerPolicy="no-referrer"
            />
          </div>
          <span className={`text-xl md:text-2xl font-black tracking-tighter uppercase font-serif italic transition-colors duration-300 ${
            isDark ? 'text-white' : 'text-neutral-900'
          }`}>
            Zaynahs<span className="text-brand-emerald">POS</span>
          </span>
        </Link>

        {/* Desktop links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
          {navigationItems.map((item, index) => (
            <Link 
              key={index}
              href={item.href}
              className={`transition-colors duration-250 ${
                isDark ? 'text-neutral-400 hover:text-brand-emerald' : 'text-neutral-600 hover:text-brand-emerald'
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Theme select & Action buttons */}
        <div className="hidden md:flex items-center gap-4">
          {/* Theme switcher */}
          <button
            onClick={onChangeTheme}
            id="theme-toggle-desktop"
            className={`w-10 h-10 rounded-full flex items-center justify-center border transition-all duration-300 cursor-pointer ${
              isDark 
                ? 'bg-neutral-900 border-neutral-800 text-yellow-400 hover:bg-neutral-800' 
                : 'bg-neutral-100 border-neutral-200 text-neutral-700 hover:bg-neutral-200'
            }`}
            aria-label="Toggle Theme"
          >
            {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          <a
            href={demoUrl}
            target="_blank"
            rel="noreferrer"
            className="px-6 py-2 bg-brand-emerald text-black font-bold rounded-full text-sm hover:shadow-[0_0_20px_rgba(16,185,129,0.4)] transition-all uppercase text-center cursor-pointer"
          >
            Try Demo
          </a>
        </div>

        {/* Mobile togglers (theme & menu) */}
        <div className="flex items-center gap-3 md:hidden">
          {/* Mobile Theme Toggle */}
          <button
            onClick={onChangeTheme}
            id="theme-toggle-mobile"
            className={`w-9 h-9 rounded-full flex items-center justify-center border transition-all duration-300 cursor-pointer ${
              isDark 
                ? 'bg-neutral-900 border-neutral-800 text-yellow-400' 
                : 'bg-neutral-100 border-neutral-200 text-neutral-700'
            }`}
            aria-label="Toggle Theme"
          >
            {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`p-1.5 transition duration-200 focus:outline-none cursor-pointer ${
              isDark ? 'text-neutral-400 hover:text-white' : 'text-neutral-600 hover:text-neutral-900'
            }`}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu overlay */}
      {mobileMenuOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`md:hidden absolute top-full inset-x-0 border-b py-6 px-6 shadow-2xl flex flex-col gap-6 transition-colors duration-300 ${
            isDark ? 'bg-[#121212] border-neutral-800' : 'bg-white border-neutral-200'
          }`}
        >
          <div className="flex flex-col gap-4 font-bold text-sm">
            {navigationItems.map((item, index) => (
              <Link 
                key={index}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`transition ${
                  isDark ? 'text-neutral-300 hover:text-brand-emerald' : 'text-neutral-700 hover:text-brand-emerald'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          <hr className={`border-t ${isDark ? 'border-neutral-800' : 'border-neutral-200'}`} />

          <a
            href={demoUrl}
            target="_blank"
            rel="noreferrer"
            onClick={() => setMobileMenuOpen(false)}
            className="w-full text-center py-3.5 bg-brand-emerald text-black font-extrabold text-sm uppercase tracking-wider rounded-full transition shadow-lg shadow-brand-emerald/20 hover:shadow-brand-emerald/50"
          >
            Try Demo
          </a>
        </motion.div>
      )}
    </header>
  )
}
