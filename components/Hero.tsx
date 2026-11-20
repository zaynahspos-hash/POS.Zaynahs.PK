'use client'

import { useState, useRef } from 'react'
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'motion/react'
import Image from 'next/image'
import { Zap, Monitor, HardDrive, Smartphone, RefreshCw, Store, ShoppingCart, Package, WifiOff } from 'lucide-react'

interface HeroProps {
  customDesktopUrl?: string
  customTabletUrl?: string
  customMobileUrl?: string
  theme?: 'light' | 'dark'
}

export default function Hero({ 
  customDesktopUrl = "https://vnoxmoqnyqaqnlsnwbus.supabase.co/storage/v1/object/public/product-images/Dell-Latitude-localhost.webp", 
  customTabletUrl = "https://vnoxmoqnyqaqnlsnwbus.supabase.co/storage/v1/object/public/product-images/iPad-Air-4-localhost.webp", 
  customMobileUrl = "https://vnoxmoqnyqaqnlsnwbus.supabase.co/storage/v1/object/public/product-images/Galaxy-S26-ULTRA-localhost.webp",
  theme = 'light' 
}: HeroProps) {
  const [activeDevice, setActiveDevice] = useState<'all' | 'laptop' | 'tablet' | 'mobile'>('all')
  const containerRef = useRef<HTMLDivElement>(null)
  const demoUrl = process.env.NEXT_PUBLIC_DEMO_URL || 'https://demo.zaynahspos.com'
  const isDark = theme === 'dark'

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  })

  // Highly dampened luxurious spring path to smooth out the layout-linking logic
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 24,
    restDelta: 0.001
  })

  // Premium, buttery-smooth scroll-linked sequential transforms (Apple style 1-by-1)
  // Initially they are all 3 together (scroll 0 to 0.4). As we scroll further, they animate out in sequence.
  const desktopY = useTransform(smoothProgress, [0, 0.4, 0.7, 1.0], [0, 0, 30, 45])
  const desktopScale = useTransform(smoothProgress, [0, 0.4, 0.7, 1.0], [1, 1, 0.98, 0.96])

  // Tablet Separates from 0.4 to 0.7
  const tabletX = useTransform(smoothProgress, [0, 0.4, 0.7, 1.0], [0, 0, 40, 40])
  const tabletY = useTransform(smoothProgress, [0, 0.4, 0.7, 1.0], [0, 0, 95, 95])
  const tabletScale = useTransform(smoothProgress, [0, 0.4, 0.7, 1.0], [1, 1, 0.95, 0.95])

  // Mobile Separates from 0.7 to 1.0
  const mobileX = useTransform(smoothProgress, [0, 0.7, 1.0], [0, 0, -25])
  const mobileY = useTransform(smoothProgress, [0, 0.7, 1.0], [0, 0, 75])
  const mobileScale = useTransform(smoothProgress, [0, 0.7, 1.0], [1, 1, 0.97])

  return (
    <div 
      id="hero" 
      ref={containerRef} 
      className={`relative overflow-hidden flex flex-col justify-start pt-24 sm:pt-28 pb-16 transition-colors duration-300 ${
        isDark ? 'bg-black text-white' : 'bg-slate-50 text-neutral-800'
      }`}
    >
      {/* Background Ambience / Glows */}
      <div className={`absolute w-[450px] h-[450px] rounded-full blur-[130px] top-10 left-10 pointer-events-none transition-opacity duration-500 ${isDark ? 'bg-brand-emerald/10' : 'bg-brand-emerald/15'}`} />
      <div className={`absolute w-[500px] h-[500px] rounded-full blur-[140px] bottom-32 right-10 pointer-events-none transition-opacity duration-500 ${isDark ? 'bg-emerald-500/5' : 'bg-emerald-400/10'}`} />
      
      {/* Dynamic Grid Overlay */}
      <div className={`absolute inset-0 bg-[radial-gradient(rgba(16,185,129,0.015)_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none ${isDark ? 'opacity-100' : 'opacity-60'}`} />

      {/* Hero Header Typography */}
      <div className="relative z-20 text-center px-4 max-w-5xl mx-auto flex flex-col items-center">
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-2"
        >
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-brand-emerald/10 text-brand-emerald text-[10px] sm:text-[11px] font-bold tracking-[0.2em] uppercase rounded-full mb-4 border border-brand-emerald/20">
            <Zap className="w-3 h-3 text-brand-emerald shrink-0" /> Next-Gen Inventory Control
          </span>
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className={`text-4xl sm:text-6xl md:text-7xl lg:text-[76px] leading-[1.0] font-black uppercase tracking-tighter mb-4 font-sans transition-colors duration-300 ${
            isDark ? 'text-white' : 'text-slate-900'
          }`}
        >
          The Power <br className="hidden sm:block"/>To <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-emerald to-emerald-500">Scale</span> Fast.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.25 }}
          className={`max-w-3xl mx-auto mt-1 text-sm sm:text-base leading-relaxed transition-colors duration-300 font-medium ${
            isDark ? 'text-neutral-400' : 'text-slate-600'
          }`}
        >
          The first all-in-one POS built for Pakistani businesses. Featuring dedicated <b className={isDark ? 'text-white' : 'text-slate-900'}>Retail, Wholesale, and E-commerce</b> modes with real-time sync across all your devices.
        </motion.p>

        <motion.div
           initial={{ opacity: 0, y: 25 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.8, delay: 0.28 }}
           className="flex flex-col gap-3 mt-6 items-center"
        >
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
            <span className={`px-2.5 sm:px-3 py-1.5 text-[10px] sm:text-xs font-bold rounded-lg border ${isDark ? 'bg-neutral-900 border-neutral-800 text-neutral-300' : 'bg-white border-neutral-200 text-neutral-600'} shadow-sm flex items-center gap-1.5 sm:gap-2`}><Monitor className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-brand-emerald" /> Web Based</span>
            <span className={`px-2.5 sm:px-3 py-1.5 text-[10px] sm:text-xs font-bold rounded-lg border ${isDark ? 'bg-neutral-900 border-neutral-800 text-neutral-300' : 'bg-white border-neutral-200 text-neutral-600'} shadow-sm flex items-center gap-1.5 sm:gap-2`}><HardDrive className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-brand-emerald" /> Windows, Mac, Linux</span>
            <span className={`px-2.5 sm:px-3 py-1.5 text-[10px] sm:text-xs font-bold rounded-lg border ${isDark ? 'bg-neutral-900 border-neutral-800 text-neutral-300' : 'bg-white border-neutral-200 text-neutral-600'} shadow-sm flex items-center gap-1.5 sm:gap-2`}><Smartphone className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-brand-emerald" /> Mobile & PWA</span>
            <span className={`px-2.5 sm:px-3 py-1.5 text-[10px] sm:text-xs font-bold rounded-lg border ${isDark ? 'bg-brand-emerald/10 border-brand-emerald/20 text-brand-emerald' : 'bg-brand-emerald/10 border-brand-emerald/30 text-brand-emerald/90'} shadow-sm flex items-center gap-1.5 sm:gap-2`}><RefreshCw className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-brand-emerald" /> Realtime Sync</span>
            <span className={`px-2.5 sm:px-3 py-1.5 text-[10px] sm:text-xs font-bold rounded-lg border ${isDark ? 'bg-brand-emerald/10 border-brand-emerald/20 text-brand-emerald' : 'bg-brand-emerald/10 border-brand-emerald/30 text-brand-emerald/90'} shadow-sm flex items-center gap-1.5 sm:gap-2`}><WifiOff className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-brand-emerald" /> Offline Support</span>
          </div>
          
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
             <span className={`px-3 py-1.5 text-[11px] sm:text-xs font-bold uppercase tracking-wider rounded-lg border ${isDark ? 'border-brand-emerald/30 text-brand-emerald' : 'bg-brand-emerald/5 border-brand-emerald/30 text-brand-emerald/90'} shadow-sm flex items-center gap-1.5`}><Store className="w-3.5 h-3.5" /> Retail</span>
             <span className={`px-3 py-1.5 text-[11px] sm:text-xs font-bold uppercase tracking-wider rounded-lg border ${isDark ? 'border-brand-emerald/30 text-brand-emerald' : 'bg-brand-emerald/5 border-brand-emerald/30 text-brand-emerald/90'} shadow-sm flex items-center gap-1.5`}><Package className="w-3.5 h-3.5" /> Wholesale</span>
             <span className={`px-3 py-1.5 text-[11px] sm:text-xs font-bold uppercase tracking-wider rounded-lg border ${isDark ? 'border-brand-emerald/30 text-brand-emerald' : 'bg-brand-emerald/5 border-brand-emerald/30 text-brand-emerald/90'} shadow-sm flex items-center gap-1.5`}><ShoppingCart className="w-3.5 h-3.5" /> E-commerce</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className={`flex items-center gap-6 mt-6 px-6 py-3.5 rounded-2xl border transition-colors duration-300 ${isDark ? 'bg-neutral-900/40 border-white/5' : 'bg-white border-neutral-200 shadow-sm'}`}
        >
          <div className="flex flex-col text-center sm:text-left">
            <div className="flex items-baseline justify-center sm:justify-start gap-1">
              <span className={`text-2xl font-black font-serif italic ${isDark ? 'text-white' : 'text-slate-900'}`}>₨70</span>
              <span className={`text-xs ml-0.5 font-mono ${isDark ? 'text-neutral-400' : 'text-neutral-500'}`}>/ day</span>
            </div>
            <span className="text-[9px] uppercase tracking-widest font-black text-brand-emerald">₨2,099 / Month After Trial</span>
          </div>
          <div className={`w-px h-10 ${isDark ? 'bg-white/10' : 'bg-neutral-200'}`}></div>
          <div className="flex flex-col text-center sm:text-left">
            <span className="text-2xl font-black font-serif italic text-brand-emerald">1 Month</span>
            <span className={`text-[9px] uppercase tracking-widest font-bold ${isDark ? 'text-gray-500' : 'text-neutral-500'}`}>Free Trial</span>
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35 }}
          className="flex flex-col sm:flex-row items-center gap-4 mt-8 w-full sm:w-auto"
        >
          <button
            onClick={() => window.open(demoUrl, '_blank')}
            className="w-full sm:w-auto px-8 py-3.5 bg-brand-emerald text-black font-bold rounded-full text-sm hover:shadow-[0_0_20px_rgba(16,185,129,0.4)] transition-all uppercase cursor-pointer text-center"
          >
            Launch Live Demo
          </button>
          
          <motion.a
            href="#booking-form"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`w-full sm:w-auto px-8 py-3.5 font-bold uppercase tracking-wider rounded-full transition-all flex items-center justify-center gap-2 text-sm text-center border ${
              isDark 
                ? 'bg-neutral-900 text-white border-neutral-800 hover:bg-neutral-800' 
                : 'bg-white text-neutral-800 border-neutral-200 hover:bg-neutral-100 shadow-sm'
            }`}
          >
            Book Free Install
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M5 12h14m-7-7 7 7-7 7"/></svg>
          </motion.a>
        </motion.div>
      </div>

      {/* 3. Re-created Device Showcase Section: Device switcher and multiple view modes */}
      <div className="relative w-full max-w-6xl mx-auto mt-12 md:mt-16 px-4 flex flex-col items-center z-10">
        
        {/* Modern high-tactility Device Switcher Pills */}
        <div className={`flex flex-wrap items-center justify-center gap-1.5 p-1.5 rounded-2xl mb-12 border ${
          isDark ? 'bg-neutral-900/60 border-neutral-800' : 'bg-white border-neutral-200/80 shadow-sm'
        }`}>
          <button
            onClick={() => setActiveDevice('all')}
            className={`px-4 py-2 text-xs font-bold tracking-wider uppercase rounded-xl transition-all cursor-pointer ${
              activeDevice === 'all'
                ? 'bg-brand-emerald text-black shadow-md shadow-brand-emerald/15'
                : isDark 
                  ? 'text-neutral-400 hover:text-white hover:bg-neutral-800/40' 
                  : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100/60'
            }`}
          >
            All Devices (3-in-1)
          </button>
          
          <button
            onClick={() => setActiveDevice('laptop')}
            className={`px-4 py-2 text-xs font-bold tracking-wider uppercase rounded-xl transition-all cursor-pointer flex items-center gap-1.5 ${
              activeDevice === 'laptop'
                ? 'bg-brand-emerald text-black shadow-md shadow-brand-emerald/15'
                : isDark 
                  ? 'text-neutral-400 hover:text-white hover:bg-neutral-800/40' 
                  : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100/60'
            }`}
          >
            <span>💻</span> PC / Laptop Pack
          </button>
          
          <button
            onClick={() => setActiveDevice('tablet')}
            className={`px-4 py-2 text-xs font-bold tracking-wider uppercase rounded-xl transition-all cursor-pointer flex items-center gap-1.5 ${
              activeDevice === 'tablet'
                ? 'bg-brand-emerald text-black shadow-md shadow-brand-emerald/15'
                : isDark 
                  ? 'text-neutral-400 hover:text-white hover:bg-neutral-800/40' 
                  : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100/60'
            }`}
          >
            <span>📱</span> Tablet Touch
          </button>
          
          <button
            onClick={() => setActiveDevice('mobile')}
            className={`px-4 py-2 text-xs font-bold tracking-wider uppercase rounded-xl transition-all cursor-pointer flex items-center gap-1.5 ${
              activeDevice === 'mobile'
                ? 'bg-brand-emerald text-black shadow-md shadow-brand-emerald/15'
                : isDark 
                  ? 'text-neutral-400 hover:text-white hover:bg-neutral-800/40' 
                  : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100/60'
            }`}
          >
            <span>🤳</span> Mobile App
          </button>
        </div>

        {/* Dynamic Display Area with Smooth Animating Transitions */}
        <div className="w-full relative min-h-[340px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            {/* Active View: ALL DEVICES COMPOSITE */}
            {activeDevice === 'all' && (
              <motion.div 
                key="all-devices"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.35, ease: "easeInOut" }}
                className="relative w-full aspect-[16/10] max-w-4xl mx-auto flex items-center justify-center"
              >
                {/* Back Layer: Desktop/PC Representation */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: 25 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  style={{ y: desktopY, scale: desktopScale }}
                  transition={{ duration: 0.8, delay: 0.15, ease: "easeOut" }}
                  className="absolute left-0 top-0 w-[74%] h-[92%] flex items-center justify-center z-10"
                >
                  <div className="relative w-full h-full">
                    <Image
                      src={customDesktopUrl}
                      alt="ZaynahsPOS Desktop Interface"
                      fill
                      priority
                      className="object-contain drop-shadow-[0_20px_45px_rgba(0,0,0,0.18)]"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                </motion.div>

                {/* Middle Layer: Tablet touchstation */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9, x: 30, y: 30 }}
                  animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
                  style={{ x: tabletX, y: tabletY, scale: tabletScale }}
                  transition={{ duration: 0.85, delay: 0.45, ease: "easeOut" }}
                  className="absolute right-[8%] bottom-[5%] w-[44%] h-[72%] flex items-center justify-center z-20"
                >
                  <div className="relative w-full h-full">
                    <Image
                      src={customTabletUrl}
                      alt="ZaynahsPOS Tablet Interface"
                      fill
                      priority
                      className="object-contain drop-shadow-[0_15px_35px_rgba(0,0,0,0.22)]"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                </motion.div>

                {/* Front Layer: Mobile phone device (exactly 12.5% of width, scaled down to fit) */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.82, x: 20, y: 30 }}
                  animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
                  style={{ x: mobileX, y: mobileY, scale: mobileScale }}
                  transition={{ duration: 0.9, delay: 0.75, ease: "easeOut" }}
                  className="absolute right-[6%] bottom-1 w-[12.5%] aspect-[9/19] flex items-center justify-center z-30"
                >
                  <div className="relative w-full h-full">
                    <Image
                      src={customMobileUrl}
                      alt="ZaynahsPOS Mobile Interface"
                      fill
                      priority
                      className="object-contain drop-shadow-[0_15px_30px_rgba(0,0,0,0.28)]"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                </motion.div>
              </motion.div>
            )}

            {/* Active View: ISOLATED LAPTOP / PC SHOWCASE */}
            {activeDevice === 'laptop' && (
              <motion.div
                key="laptop-device"
                initial={{ opacity: 0, y: 20, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.97 }}
                transition={{ duration: 0.35, ease: "easeInOut" }}
                className="w-full max-w-4xl mx-auto flex flex-col items-center"
              >
                <div className="text-center mb-6">
                  <span className="text-xs font-mono font-bold tracking-wider uppercase text-brand-emerald bg-brand-emerald/10 px-3 py-1 rounded-full">
                    POWERFUL COUNTER POS
                  </span>
                  <h3 className={`text-lg sm:text-2xl font-black uppercase tracking-tight mt-1 transition-colors duration-300 ${
                    isDark ? 'text-white' : 'text-slate-900'
                  }`}>
                    PC & Laptop Pack
                  </h3>
                </div>
                <div className="w-full aspect-[16/10] relative max-w-3xl">
                  <Image
                    src={customDesktopUrl}
                    alt="ZaynahsPOS Full Desktop Showcase"
                    fill
                    priority
                    className="object-contain drop-shadow-[0_25px_50px_rgba(0,0,0,0.22)]"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </motion.div>
            )}

            {/* Active View: ISOLATED TABLET TOUCHSTATION */}
            {activeDevice === 'tablet' && (
              <motion.div
                key="tablet-device"
                initial={{ opacity: 0, y: 20, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.97 }}
                transition={{ duration: 0.35, ease: "easeInOut" }}
                className="w-full max-w-3xl mx-auto flex flex-col items-center"
              >
                <div className="text-center mb-6">
                  <span className="text-xs font-mono font-bold tracking-wider uppercase text-brand-emerald bg-brand-emerald/10 px-3 py-1 rounded-full">
                    PORTABLE BILLING TOUCHSTATION
                  </span>
                  <h3 className={`text-lg sm:text-2xl font-black uppercase tracking-tight mt-1 transition-colors duration-300 ${
                    isDark ? 'text-white' : 'text-slate-900'
                  }`}>
                    Android / iPad Station
                  </h3>
                </div>
                <div className="w-full aspect-[4/3] relative max-w-lg">
                  <Image
                    src={customTabletUrl}
                    alt="ZaynahsPOS Full Tablet Showcase"
                    fill
                    priority
                    className="object-contain drop-shadow-[0_25px_50px_rgba(0,0,0,0.22)]"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </motion.div>
            )}

            {/* Active View: ISOLATED MOBILE APP */}
            {activeDevice === 'mobile' && (
              <motion.div
                key="mobile-device"
                initial={{ opacity: 0, y: 20, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.97 }}
                transition={{ duration: 0.35, ease: "easeInOut" }}
                className="w-full max-w-2xl mx-auto flex flex-col items-center"
              >
                <div className="text-center mb-6">
                  <span className="text-xs font-mono font-bold tracking-wider uppercase text-brand-emerald bg-brand-emerald/10 px-3 py-1 rounded-full">
                    ON-THE-ROAD SALES COMPANION
                  </span>
                  <h3 className={`text-lg sm:text-2xl font-black uppercase tracking-tight mt-1 transition-colors duration-300 ${
                    isDark ? 'text-white' : 'text-slate-900'
                  }`}>
                    Galaxy & iPhone App
                  </h3>
                </div>
                <div className="w-full aspect-[9/19] relative max-w-[145px] sm:max-w-[195px] md:max-w-[210px] scale-[0.95] sm:scale-100">
                  <Image
                    src={customMobileUrl}
                    alt="ZaynahsPOS Full Mobile Showcase"
                    fill
                    priority
                    className="object-contain drop-shadow-[0_25px_50px_rgba(0,0,0,0.24)]"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </div>

       {/* Modern Scroll-linked 1-by-1 Device Screens Reveal Section */}
      <div className="w-full max-w-5xl mx-auto mt-28 md:mt-36 px-4 border-t border-dashed border-neutral-200/50 dark:border-neutral-800/80 pt-20 pb-12">
        <div className="text-center max-w-2xl mx-auto mb-20">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-brand-emerald/10 text-brand-emerald text-[11px] font-mono font-bold tracking-[0.25em] uppercase rounded-full mb-3">
            🔮 Scroll to Explore • ون بائے ون اسکرینز
          </span>
          <h2 className={`text-2xl sm:text-4xl font-black uppercase tracking-tight font-sans transition-colors duration-300 ${
            isDark ? 'text-white' : 'text-slate-900'
          }`}>
            Terminal Deep-Dive <span className="text-brand-emerald">/</span> اسکرینز کا جائزہ
          </h2>
          <p className={`text-xs sm:text-sm mt-3 font-medium leading-relaxed transition-colors duration-300 ${
            isDark ? 'text-neutral-400' : 'text-neutral-500'
          }`}>
            Witness how our beautiful, lightning-fast layouts dynamically adapt to optimize your billing desk, tablet counter, and mobile field operations.
          </p>
        </div>

        {/* 1-by-1 Staggered Vertical Cards on Scroll */}
        <div className="flex flex-col gap-24 md:gap-32">
          
          {/* 1. PC / LAPTOP SCREEN */}
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.98 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
            className={`p-5 sm:p-8 md:p-10 rounded-[2.5rem] border transition-all duration-300 ${
              isDark 
                ? 'bg-neutral-900/30 border-neutral-800/80 hover:bg-neutral-900/50 shadow-2xl' 
                : 'bg-white border-slate-200/80 hover:border-slate-300 shadow-md shadow-slate-100'
            }`}
          >
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
              <div>
                <span className="text-[10px] font-mono font-bold text-brand-emerald uppercase tracking-widest bg-brand-emerald/10 px-2.5 py-1 rounded-md">
                  Station #1
                </span>
                <h3 className={`text-xl sm:text-2xl font-black uppercase tracking-tight mt-2.5 transition-colors ${
                  isDark ? 'text-white' : 'text-slate-900'
                }`}>
                  Desktop & PC Counter Pack
                </h3>
              </div>
              <p className="text-xs sm:text-sm font-bold text-brand-emerald text-left sm:text-right font-sans lg:max-w-xs leading-tight">
                کاؤنٹر اور پی سی کے لیے ڈیزائن کی گئی بڑی لائیو اسکرین
              </p>
            </div>
            
            <p className={`text-xs sm:text-sm mb-6 leading-relaxed transition-colors ${isDark ? 'text-neutral-400' : 'text-neutral-650'}`}>
              <strong className="text-brand-emerald">Wholesale, retail, and back-office.</strong> Best optimized for continuous keyboard typing, heavy barcode-scanner guns, barcode thermal sticker printing, weighing scales, and double-sided customer displays.
            </p>
 
            <div className="relative w-full aspect-[16/10] bg-neutral-950/5 dark:bg-black/20 rounded-2xl overflow-hidden border border-neutral-200/40 dark:border-white/5 flex items-center justify-center p-2 sm:p-4">
              <div className="relative w-full h-full">
                <Image
                  src={customDesktopUrl}
                  alt="ZaynahsPOS PC Interface Screen"
                  fill
                  className="object-contain"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
          </motion.div>
 
          {/* 2. TABLET TOUCH STATION */}
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.98 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
            className={`p-5 sm:p-8 md:p-10 rounded-[2.5rem] border transition-all duration-300 ${
              isDark 
                ? 'bg-neutral-900/30 border-neutral-800/80 hover:bg-neutral-900/50 shadow-2xl' 
                : 'bg-white border-slate-200/80 hover:border-slate-300 shadow-md shadow-slate-100'
            }`}
          >
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
              <div>
                <span className="text-[10px] font-mono font-bold text-brand-emerald uppercase tracking-widest bg-brand-emerald/10 px-2.5 py-1 rounded-md">
                  Station #2
                </span>
                <h3 className={`text-xl sm:text-2xl font-black uppercase tracking-tight mt-2.5 transition-colors ${
                  isDark ? 'text-white' : 'text-slate-900'
                }`}>
                  Tablet Touch POS Counter
                </h3>
              </div>
              <p className="text-xs sm:text-sm font-bold text-brand-emerald text-left sm:text-right font-sans lg:max-w-xs leading-tight">
                اینڈرائڈ اور آئی پیڈ ٹیبلٹس کے لیے مخصوص ٹچ اسکرین انٹرفیس
              </p>
            </div>
 
            <p className={`text-xs sm:text-sm mb-6 leading-relaxed transition-colors ${isDark ? 'text-neutral-400' : 'text-neutral-650'}`}>
              <strong className="text-brand-emerald">Fluid, touch-first catalog grid.</strong> Designed explicitly for fast-paced environments like Bakers & Sweets, Cafés, and Pharmacies. Quick touch category tabs, visual items grid, and local Wi-Fi printer connectivity.
            </p>
 
            <div className="relative w-full aspect-[4/3] max-w-2xl mx-auto bg-neutral-950/5 dark:bg-black/20 rounded-2xl overflow-hidden border border-neutral-200/40 dark:border-white/5 flex items-center justify-center p-2 sm:p-4">
              <div className="relative w-full h-full">
                <Image
                  src={customTabletUrl}
                  alt="ZaynahsPOS Tablet Interface Screen"
                  fill
                  className="object-contain"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
          </motion.div>
 
          {/* 3. MOBILE APP */}
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.98 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
            className={`p-5 sm:p-8 md:p-10 rounded-[2.5rem] border transition-all duration-300 ${
              isDark 
                ? 'bg-neutral-900/30 border-neutral-800/80 hover:bg-neutral-900/50 shadow-2xl' 
                : 'bg-white border-slate-200/80 hover:border-slate-300 shadow-md shadow-slate-100'
            }`}
          >
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
              <div>
                <span className="text-[10px] font-mono font-bold text-brand-emerald uppercase tracking-widest bg-brand-emerald/10 px-2.5 py-1 rounded-md">
                  Station #3
                </span>
                <h3 className={`text-xl sm:text-2xl font-black uppercase tracking-tight mt-2.5 transition-colors ${
                  isDark ? 'text-white' : 'text-slate-900'
                }`}>
                  Handheld & Smartphone Companion
                </h3>
              </div>
              <p className="text-xs sm:text-sm font-bold text-brand-emerald text-left sm:text-right font-sans lg:max-w-xs leading-tight">
                موبائل جیب اور سیلز فورس کے لیے لائیو فون ایپ اسکرینس
              </p>
            </div>
 
            <p className={`text-xs sm:text-sm mb-6 leading-relaxed transition-colors ${isDark ? 'text-neutral-400' : 'text-neutral-650'}`}>
              <strong className="text-brand-emerald">Pocket-size business commander.</strong> Sell directly from the aisle, scan packages instantly using your hardware&apos;s camera zoom, query real-time stock levels, check sales counters, and view reports live from anywhere.
            </p>
 
            <div className="relative w-full aspect-[9/19] max-w-[145px] sm:max-w-[195px] md:max-w-[210px] mx-auto scale-[0.95] sm:scale-100 bg-neutral-950/5 dark:bg-black/20 rounded-2xl overflow-hidden border border-neutral-200/40 dark:border-white/5 flex items-center justify-center p-2">
              <div className="relative w-full h-full">
                <Image
                  src={customMobileUrl}
                  alt="ZaynahsPOS Mobile Interface Screen"
                  fill
                  className="object-contain"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
          </motion.div>
 
        </div>
      </div>
    </div>
  )
}
