'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { ArrowUp } from 'lucide-react'

interface FloatingWidgetProps {
  whatsappNumber?: string
}

export default function FloatingWidget({ whatsappNumber = '+923001234567' }: FloatingWidgetProps) {
  const [showScrollTop, setShowScrollTop] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true)
    function handleScroll() {
      if (window.scrollY > 400) {
        setShowScrollTop(true)
      } else {
        setShowScrollTop(false)
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  if (!mounted) return null

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const defaultNumber = process.env.NEXT_PUBLIC_ADMIN_WHATSAPP || whatsappNumber
  const whatsappUrl = `https://wa.me/${defaultNumber.replace(/\D/g, '')}?text=Salam!%20Main%20ZaynahsPOS%20ka%20FREE%20trial%20lena%20chahta%20hoon`

  const demoUrl = process.env.NEXT_PUBLIC_DEMO_URL || 'https://demo.zaynahspos.com'

  return (
    <>
      {/* 1. Global Floating Utility Stack (ScrollToTop + WhatsApp) */}
      {/* Elevate bottom position to bottom-20 on mobile to clear the sticky bottom action bar */}
      <div className="fixed bottom-20 sm:bottom-8 right-6 md:right-8 z-[999999] flex flex-col items-center gap-3 transform-gpu">
        {/* Scroll To Top */}
        <AnimatePresence>
          {showScrollTop && (
            <motion.button
              initial={{ scale: 0, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0, opacity: 0, y: 15 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={scrollToTop}
              id="scroll-to-top-floating"
              className="w-12 h-12 rounded-full border flex items-center justify-center transition cursor-pointer shadow-lg bg-white dark:bg-neutral-900 border-slate-200 dark:border-neutral-800 text-neutral-700 dark:text-neutral-300 hover:text-slate-900 dark:hover:text-white hover:border-slate-350 dark:hover:border-neutral-700 shadow-slate-200/50 dark:shadow-black/80"
            >
              <ArrowUp className="w-5 h-5" />
            </motion.button>
          )}
        </AnimatePresence>

        {/* Live WhatsApp Launch button */}
        <motion.a
          href={whatsappUrl}
          target="_blank"
          rel="noreferrer"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          id="whatsapp-floating-action"
          title="Direct Sales on WhatsApp"
          className="w-14 h-14 bg-emerald-500 rounded-full flex items-center justify-center text-black font-bold shadow-2xl hover:bg-emerald-400 hover:shadow-emerald-500/30 transition shadow-emerald-500/10 cursor-pointer"
        >
          <svg className="w-7 h-7 fill-black" viewBox="0 0 24 24">
            <path d="M12.004 2c-5.518 0-9.996 4.477-9.996 9.996 0 1.764.459 3.49 1.332 5.003l-1.34 4.896 5.011-1.314c1.455.793 3.09 1.211 4.757 1.211 5.518 0 9.996-4.477 9.996-9.996 0-5.519-4.478-9.996-9.996-9.996zm5.828 14.162c-.255.719-1.28 1.312-1.782 1.365-.453.048-.152.195-2.585-.751-2.924-1.139-4.795-4.116-4.941-4.312-.146-.195-1.186-1.577-1.186-3.003 0-1.426.749-2.127 1.015-2.408.266-.282.586-.352.782-.352.196 0 .393.001.562.009.18.008.419-.069.658.503.247.587.842 2.052.915 2.199.073.147.122.318.024.514-.097.197-.184.294-.367.509-.184.215-.386.444-.551.619-.184.215-.386.444-.551.619-.184.195-.378.408-.163.777.215.368.956 1.576 2.052 2.551 1.408 1.254 2.593 1.642 2.962 1.826.368.184.585.152.805-.104.22-.257.942-1.096 1.196-1.469.255-.373.51-.311.854-.184.344.128 2.184 1.03 2.551 1.213.368.184.613.272.695.413.082.142.082.822-.173 1.541z" />
          </svg>
        </motion.a>
      </div>

      {/* 2. Responsive Mobile Sticky CTA Action Bar */}
      {/* Hidden natively on desktop/tablet, active only on small/mobile screens */}
      <div className="sm:hidden fixed bottom-0 left-0 right-0 z-[999998] p-3 px-4 bg-white/90 dark:bg-neutral-950/95 backdrop-blur-md border-t border-slate-200/80 dark:border-neutral-900/85 shadow-[0_-10px_30px_rgba(0,0,0,0.06)] dark:shadow-[0_-15px_35px_rgba(0,0,0,0.45)] transition-colors duration-300">
        <div className="flex items-center gap-3 w-full max-w-md mx-auto">
          
          <button
            onClick={() => window.open(demoUrl, '_blank')}
            className="flex-1 min-h-[46px] inline-flex items-center justify-center gap-1.5 px-4 bg-brand-emerald text-black font-black text-xs uppercase tracking-wider rounded-xl hover:bg-brand-emerald/90 active:scale-95 transition-all text-center"
          >
            <span>🚀</span> Launch Demo
          </button>
          
          <a
            href="#booking-form"
            className="flex-1 min-h-[46px] inline-flex items-center justify-center gap-1.5 px-4 bg-neutral-900 dark:bg-neutral-800 text-white border border-neutral-800 dark:border-neutral-700 font-bold text-xs uppercase tracking-wider rounded-xl hover:bg-neutral-800 active:scale-95 transition-all text-center"
          >
            <span>📅</span> Book Install
          </a>

        </div>
      </div>
    </>
  )
}
