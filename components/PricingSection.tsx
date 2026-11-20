'use client'

import { Check, Flame, ShieldAlert, Award, Zap } from 'lucide-react'
import { motion } from 'motion/react'

interface PricingProps {
  theme?: 'light' | 'dark'
}

export default function PricingSection({ theme = 'light' }: PricingProps) {
  const pricingFeatures = [
    "Unlimited Products & Sales Database",
    "Unlimited Store Logins & Device Terminals",
    "All Native Application Packages (Android, iOS, Windows, macOS, Linux, Web)",
    "Built-in High-Accuracy Barcode & QR Code Scanner",
    "Advanced Role-Based Access controls (Cashier, Manager, Admin)",
    "Integrated Supplier & Expense Tracking engines",
    "Fully Automated Daily Cloud Backups (Zero Data Loss)",
    "Dedicated 24/7 Priority Support via WhatsApp"
  ]

  const isDark = theme === 'dark'

  return (
    <section 
      id="pricing" 
      className={`py-24 md:py-32 relative overflow-hidden transition-colors duration-300 ${
        isDark 
          ? 'bg-gradient-to-b from-[#121212] to-black text-white' 
          : 'bg-gradient-to-b from-white to-slate-50 text-neutral-800'
      }`}
    >
      {/* Background decoration */}
      <div className={`absolute w-[500px] h-[500px] rounded-full blur-[140px] top-1/4 right-0 pointer-events-none transition-all ${
        isDark ? 'bg-brand-emerald/5' : 'bg-brand-emerald/10'
      }`} />

      <div className="max-w-5xl mx-auto px-4 z-10 relative">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-mono font-bold tracking-[0.2em] text-brand-emerald uppercase bg-brand-emerald/10 px-3 py-1.5 rounded-full inline-flex items-center gap-1.5">
            <Flame className="w-3.5 h-3.5 fill-brand-emerald text-brand-emerald animate-pulse" />
            UNBEATABLE VALUE
          </span>
          <h2 className={`text-3xl md:text-5xl font-black uppercase tracking-tight font-sans mt-4 transition-colors duration-300 ${
            isDark ? 'text-white' : 'text-slate-900'
          }`}>
            Simple, Transparent Pricing
          </h2>
          <p className={`mt-3 text-sm md:text-base transition-colors duration-300 ${
            isDark ? 'text-neutral-400' : 'text-neutral-600'
          }`}>
            No dynamic upselling. No hidden service charges. Scale your retail or food station without financial friction.
          </p>
        </div>

        {/* Feature pricing card */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className={`border-2 rounded-3xl p-6 md:p-14 relative transition-colors duration-300 ${
            isDark 
              ? 'bg-[#121212]/90 border-brand-emerald' 
              : 'bg-white border-brand-emerald shadow-xl shadow-emerald-100/50'
          }`}
        >
          {/* Popular Tag decoration */}
          <div className="absolute -top-[18px] left-1/2 -translate-x-1/2 bg-brand-emerald text-black text-xs font-mono font-black tracking-[0.14em] px-6 py-2 rounded-full uppercase shadow-lg shadow-brand-emerald/35 flex items-center gap-1.5">
            <Award className="w-4 h-4 text-black shrink-0" /> 1-Month Free Trial Offer
          </div>

          <div className="grid md:grid-cols-5 gap-12 items-center">
            {/* Price statement */}
            <div className={`md:col-span-2 text-center md:text-left pb-8 md:pb-0 md:border-r border-b md:border-b-0 transition-colors duration-300 ${
              isDark ? 'border-neutral-850' : 'border-neutral-200'
            }`}>
              <span className={`text-xs font-mono tracking-widest uppercase ${isDark ? 'text-neutral-400' : 'text-neutral-500'}`}>MONTHLY OPERATION COST</span>
              <div className="flex flex-col items-center md:items-start mt-4">
                <div className={`text-sm font-bold line-through opacity-60 mb-1 ${isDark ? 'text-neutral-500' : 'text-neutral-500'}`}>
                  Actual Price: ₨7,999 / month
                </div>
                <div className="flex items-baseline justify-center md:justify-start gap-1 mb-3">
                  <span className="text-5xl sm:text-6xl font-black text-brand-emerald font-sans">₨2,099</span>
                  <span className={`font-bold font-mono text-sm ${isDark ? 'text-neutral-300' : 'text-neutral-500'}`}>/ month</span>
                </div>
                <div className={`text-[11px] sm:text-xs font-bold py-1.5 px-3 rounded-full border bg-brand-emerald/10 text-brand-emerald border-brand-emerald/20 inline-block uppercase tracking-wider`}>
                  Limited Time Offer (First 1,000 Users)
                </div>
              </div>
              <p className={`text-xs sm:text-sm mt-5 font-semibold transition-colors duration-300 ${
                isDark ? 'text-neutral-400' : 'text-neutral-600'
              }`}>
                Start with a 30-day completely free trial. Cancel anytime with a single click. <br className="hidden sm:block" />
                <span className={`block mt-3 text-[11px] sm:text-xs pt-3 border-t font-medium ${isDark ? 'border-neutral-800 text-neutral-400' : 'border-neutral-200 text-neutral-500'}`}>
                  * A fully refundable setup deposit of <b className={`${isDark ? 'text-white' : 'text-slate-900'}`}>₨ 500</b> is required to begin the trial. This will be either refunded if you cancel, or merged into your 2nd month&apos;s fee.
                </span>
              </p>
              
              <div className={`mt-8 p-4 border rounded-xl flex items-start gap-3 text-left transition-colors duration-300 ${
                isDark ? 'bg-black/60 border-neutral-800' : 'bg-slate-50 border-neutral-200'
              }`}>
                <ShieldAlert className={`w-5 h-5 shrink-0 ${isDark ? 'text-neutral-400' : 'text-neutral-500'}`} />
                <span className={`text-[11px] leading-relaxed font-mono ${isDark ? 'text-neutral-400' : 'text-neutral-500'}`}>
                  All databases remain entirely self-contained. You hold continuous rights to export custom inventory files at zero cost.
                </span>
              </div>
            </div>

            {/* List of elements */}
            <div className="md:col-span-3 space-y-4">
              <h3 className={`text-lg font-bold tracking-tight uppercase font-sans transition-colors duration-300 ${
                isDark ? 'text-white' : 'text-slate-900'
              }`}>
                All features are open & unlimited:
              </h3>
              
              <ul className="space-y-3.5 text-sm">
                {pricingFeatures.map((item, index) => (
                  <li key={index} className="flex items-start gap-3 text-neutral-600 dark:text-neutral-300">
                    <span className="w-5 h-5 rounded-full bg-brand-emerald/10 border border-brand-emerald/20 flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-3.5 h-3.5 text-brand-emerald" />
                    </span>
                    <span className={`leading-tight transition-colors duration-300 ${
                      isDark ? 'text-neutral-300' : 'text-neutral-700'
                    }`}>{item}</span>
                  </li>
                ))}
              </ul>

              <div className="pt-6">
                <a 
                  href="#booking-form"
                  className="w-full text-center py-4 bg-brand-emerald hover:bg-emerald-400 text-black font-extrabold rounded-full uppercase tracking-wider text-sm transition shadow-lg shadow-brand-emerald/10 hover:shadow-brand-emerald/40 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Zap className="w-4 h-4 fill-black text-black" /> Setup Free Trial Account
                </a>
                <div className="mt-5 flex items-center justify-center gap-2">
                  <div className="flex">
                    {[1,2,3,4,5].map(i => (
                      <svg key={i} className="w-4 h-4 text-emerald-500 fill-emerald-500" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <span className={`text-xs font-bold leading-tight ${isDark ? 'text-neutral-400' : 'text-neutral-600'}`}>300+ Happy Users & 5-Star Reviews</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
