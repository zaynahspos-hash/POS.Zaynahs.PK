'use client'

import { motion } from 'motion/react'
import Image from 'next/image'
import { Sparkles } from 'lucide-react'

interface FeaturesProps {
  theme?: 'light' | 'dark'
}

export default function Features({ theme = 'light' }: FeaturesProps) {
  const isDark = theme === 'dark'

  const showcaseItems = [
    {
      title_en: "Live Business Dashboard",
      title_ur: "لائیو بزنس ڈیش بورڈ",
      description_en: "Monitor your entire business health in real-time. Track sales, profits, top products, and overall growth from a single, beautifully designed dashboard.",
      description_ur: "اپنے کاروبار کی تمام تفصیلات ایک اسکرین پر دیکھیں۔ سیلز، منافع اور ٹاپ پراڈکٹس کا جائزہ لیں۔",
      image: "https://vnoxmoqnyqaqnlsnwbus.supabase.co/storage/v1/object/public/product-images/featres%20of%20pos/zaynahspos.com%201%20dashboard.webp",
    },
    {
      title_en: "Hardware Integration Ready",
      title_ur: "ہارڈویئر کنکشن کی مکمل سپورٹ",
      description_en: "Seamlessly connects out-of-the-box with any barcode scanner, thermal receipt printer, and trigger-cash drawer.",
      description_ur: "بارکوڈ اسکینر، رسید پرنٹر، اور کیش دراز کے ساتھ مکمل اور آسان کنکشن۔",
      image: "https://vnoxmoqnyqaqnlsnwbus.supabase.co/storage/v1/object/public/product-images/featres%20of%20pos/zaynahspos.com%20pos%20barcode%20scaner%20and%20recipt%20printer.webp",
    },
    {
      title_en: "Advanced Checkout Modes",
      title_ur: "ایڈوانسڈ چیک آؤٹ موڈز",
      description_en: "Seamlessly switch between Wholesale, Retail & E-commerce modes. Cross-platform PWA for Mac, Linux & Windows with a built-in touch-friendly keyboard.",
      description_ur: "ہول سیل، ریٹیل اور ای کامرس موڈز۔ میک، لینکس اور پی ڈبلیو اے کی سپورٹ کے ساتھ بلٹ ان ٹچ والا کی بورڈ۔",
      image: "https://vnoxmoqnyqaqnlsnwbus.supabase.co/storage/v1/object/public/product-images/featres%20of%20pos/zaynahspos.com%20checkout.webp",
    },
    {
      title_en: "Receipt Sharing & Printing",
      title_ur: "رسید شیئرنگ اور پرنٹنگ",
      description_en: "Instantly print professional thermal receipts or securely share digital copies with your customers via WhatsApp or Email.",
      description_ur: "پروفیشنل رسید پرنٹ کریں یا واٹس ایپ اور ای میل کے ذریعے کسٹمرز کو ڈیجیٹل کاپی بھیجیں۔",
      image: "https://vnoxmoqnyqaqnlsnwbus.supabase.co/storage/v1/object/public/product-images/featres%20of%20pos/zaynahspos.com%20recipt%20sharing%20and%20printing.webp",
    },
    {
      title_en: "Ultra-Fast POS Terminal",
      title_ur: "انتہائی تیز پی او ایس ٹرمینل",
      description_en: "Settle sales instantly. Designed for lightning-fast checkout with complete barcode scanner and thermal receipt printer integration.",
      description_ur: "انتہائی تیزی سے بل بنائیں۔ بارکوڈ اسکینر اور رسید پرنٹر کی مکمل سپورٹ کے ساتھ۔",
      image: "https://vnoxmoqnyqaqnlsnwbus.supabase.co/storage/v1/object/public/product-images/featres%20of%20pos/zaynahspos.com%202%20sales%20page.webp",
    },
    {
      title_en: "Smart Product Management",
      title_ur: "بہترین پراڈکٹ مینجمنٹ",
      description_en: "Easily manage your entire catalog. Supports infinite variants, categories, dynamic pricing, and deep stock alerts.",
      description_ur: "اپنی مصنوعات کا تفصیلی ریکارڈ رکھیں۔ اقسام، قیمتیں، اور اسٹاک الرٹس کنٹرول کریں۔",
      image: "https://vnoxmoqnyqaqnlsnwbus.supabase.co/storage/v1/object/public/product-images/featres%20of%20pos/zaynahspos.com%203%20product%20page.webp",
    },
    {
      title_en: "Custom Barcode Generator",
      title_ur: "کسٹم بارکوڈ جنریٹر",
      description_en: "Create and print custom EAN-13 barcode labels directly from your product lists for seamless scanning at checkout.",
      description_ur: "مصنوعات کے لیے اپنے کسٹم بارکوڈ لیبلز بنائیں اور اسکیننگ کو قابلِ بھروسہ بنائیں۔",
      image: "https://vnoxmoqnyqaqnlsnwbus.supabase.co/storage/v1/object/public/product-images/featres%20of%20pos/zaynahspos.com%204%20barcode%20label%20genrattion.webp",
    },
    {
      title_en: "Daily Expense Tracker",
      title_ur: "روزمرہ اخراجات بک",
      description_en: "Log all daily operational expenses instantly to get an accurate, unmanipulated view of your net profit margins.",
      description_ur: "دکان کے روزمرہ اخراجات کا اندراج کریں اور اصل منافع کا تجزیہ کریں۔",
      image: "https://vnoxmoqnyqaqnlsnwbus.supabase.co/storage/v1/object/public/product-images/featres%20of%20pos/zaynahspos.com%205%20expense%20page.webp",
    },
    {
      title_en: "Customer Khata & Ledgers",
      title_ur: "کسٹمر کھاتہ اور لیجرز",
      description_en: "Maintain comprehensive digital ledgers for your regular customers with complete debit/credit payment history.",
      description_ur: "اپنے ریگولر کسٹمرز کا ادھار اور وصولی کا مکمل ڈیجیٹل کھاتہ رکھیں۔",
      image: "https://vnoxmoqnyqaqnlsnwbus.supabase.co/storage/v1/object/public/product-images/featres%20of%20pos/zaynahspos.com%20customer%20page.webp",
    },
    {
      title_en: "Discount Configurator",
      title_ur: "ڈسکاؤنٹ کنفیگریٹر",
      description_en: "Apply targeted discounts or bulk promo rules for your customers seamlessly right at the checkout terminal.",
      description_ur: "کسٹمرز کے لیے ضرورت کے مطابق ڈسکاؤنٹ یا پروموشن سیٹ کریں۔",
      image: "https://vnoxmoqnyqaqnlsnwbus.supabase.co/storage/v1/object/public/product-images/featres%20of%20pos/zaynahspos.com%20discounts%20page.webp",
    },
    {
      title_en: "Inventory Audit Reports",
      title_ur: "انوینٹری آڈٹ رپورٹس",
      description_en: "Never run out of stock. Keep an eagle eye on inventory limits, fast-moving items, and low stock warnings.",
      description_ur: "اپنے اسٹاک پر کڑی نظر رکھیں۔ فاسٹ موونگ اور کم ہونے وااالے اسٹاک کی الرٹس۔",
      image: "https://vnoxmoqnyqaqnlsnwbus.supabase.co/storage/v1/object/public/product-images/featres%20of%20pos/zaynahspos.com%20report%20inventry.webp",
    },
    {
      title_en: "Advanced Reporting Center",
      title_ur: "ایڈوانسڈ رپورٹنگ سینٹر",
      description_en: "Generate detailed visual reports for sales, trends, and business metrics mapped over any custom date ranges.",
      description_ur: "سیلز، رجحانات اور کاروباری کارکردگی کی تفصیلی رپورٹس حاصل کریں۔",
      image: "https://vnoxmoqnyqaqnlsnwbus.supabase.co/storage/v1/object/public/product-images/featres%20of%20pos/zaynahspos.com%20report%20main.webp",
    },
    {
      title_en: "Payment & Cash Reports",
      title_ur: "پیمنٹ اور کیش رپورٹس",
      description_en: "Track all incoming cash, outgoing payments, and register activity in fine detail with totally clear ledgers.",
      description_ur: "کیش کی آمدن، اخراجات، اور کیش دراز کی مکمل سرگرمی کا تفصیلی ریکارڈ۔",
      image: "https://vnoxmoqnyqaqnlsnwbus.supabase.co/storage/v1/object/public/product-images/featres%20of%20pos/zaynahspos.com%20report%20paymnet.webp",
    },
    {
      title_en: "Supplier Master Ledgers",
      title_ur: "سپلائیز اکاؤنٹس",
      description_en: "Track supplier debts, overall purchase history, and expected payment timelines without balancing paper diaries.",
      description_ur: "سپلائی کرنے والوں کا حساب کتاب اور خریداری کی مکمل ہسٹری دیکھیں۔",
      image: "https://vnoxmoqnyqaqnlsnwbus.supabase.co/storage/v1/object/public/product-images/featres%20of%20pos/zaynahspos.com%20suplier%20page.webp",
    },
    {
      title_en: "Staff Roles & Security",
      title_ur: "اسٹاف رولز اور سیکیورٹی",
      description_en: "Create heavily restricted logins for operational cashiers and managers to protect your underlying master data.",
      description_ur: "اپنے عملے کے لیے محدود رسائی والے اکاؤنٹس بنائیں تاکہ ڈیٹا محفوظ رہے۔",
      image: "https://vnoxmoqnyqaqnlsnwbus.supabase.co/storage/v1/object/public/product-images/featres%20of%20pos/zaynahspos.com%20users%20and%20rols%20page.webp",
    },
    {
      title_en: "Global Business Settings",
      title_ur: "سسٹم کسٹمائزیشن",
      description_en: "Configure the core framework to your exact business needs: including currency, tax modules, and store details.",
      description_ur: "اپنے کاروبار کی ضرورت کے مطابق کرنسی، ٹیکس، اور دکان کی تفصیلات سیٹ کریں۔",
      image: "https://vnoxmoqnyqaqnlsnwbus.supabase.co/storage/v1/object/public/product-images/featres%20of%20pos/zaynahspos.com%20settings%20genral%20setttings.webp",
    },
    {
      title_en: "Receipt Layout Engine",
      title_ur: "رسید لے آؤٹ انجن",
      description_en: "Customize your invoice layouts for external thermal printers. Add your brand logo, business policies, and address.",
      description_ur: "پرنٹر رسید کا ڈیزائن خود سیٹ کریں۔ اپنا لوگو، شرائط اور پتہ شامل کریں۔",
      image: "https://vnoxmoqnyqaqnlsnwbus.supabase.co/storage/v1/object/public/product-images/featres%20of%20pos/zaynahspos.com%20settings%20recipt%20setting.webp",
    },
    {
      title_en: "System Database Control",
      title_ur: "ڈیٹا بیس مینجمنٹ",
      description_en: "Complete data ownership. Back up your files, execute cleanup maintenance, and import/export logs easily.",
      description_ur: "اپنے ڈیٹا کے خود مالک بنیں۔ بیک اپ، کلین اپ اور امپورٹ/ایکسپورٹ کی آسان سہولت۔",
      image: "https://vnoxmoqnyqaqnlsnwbus.supabase.co/storage/v1/object/public/product-images/featres%20of%20pos/zaynahspos.com%20settings%20databse%20mangmen%20import%20export.webp",
    }
  ]

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { type: "spring" as const, stiffness: 70, damping: 20 }
    }
  }

  return (
    <section 
      id="features" 
      className={`py-24 relative transition-colors duration-300 border-t ${
        isDark ? 'bg-[#050505] border-neutral-900 text-white' : 'bg-slate-50 border-slate-200 text-neutral-800'
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6">
        
        {/* Section Heading */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7 }}
          className="text-center max-w-4xl mx-auto mb-20"
        >
          <span className="inline-flex items-center gap-2 text-xs font-mono font-bold tracking-[0.2em] text-brand-emerald bg-brand-emerald/10 border border-brand-emerald/20 px-4 py-2 rounded-full uppercase">
            <Sparkles className="w-4 h-4" /> 
            Complete Software Walkthrough
          </span>
          <h2 className={`text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tight font-sans mt-6 transition-colors duration-300 ${
            isDark ? 'text-white' : 'text-slate-900'
          }`}>
            Platform Interfaces <span className="text-brand-emerald">•</span> تمام خصوصیات
          </h2>
          <p className={`mt-6 text-base md:text-lg transition-colors duration-300 max-w-2xl mx-auto ${
            isDark ? 'text-neutral-400' : 'text-neutral-500'
          }`}>
            Take a deep dive into the beautifully crafted screens of ZaynahsPOS. We’ve designed every single page focusing on speed, usability, and power.
          </p>
        </motion.div>

        {/* Masonry or Grid of beautifully rounded visual cards */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.05 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12"
        >
          {showcaseItems.map((item, index) => (
            <motion.div 
              key={index}
              variants={cardVariants}
              className={`group flex flex-col rounded-[32px] overflow-hidden border transition-all duration-500 hover:shadow-2xl hover:-translate-y-1 ${
                isDark 
                  ? 'bg-[#121212] border-neutral-800 hover:border-neutral-700 hover:shadow-brand-emerald/5' 
                  : 'bg-white border-slate-200 hover:border-slate-300 hover:shadow-brand-emerald/5'
              }`}
            >
              {/* Image Container with precise aspect ratio */}
              <div className={`relative w-full aspect-[16/10] sm:aspect-[16/9] overflow-hidden border-b ${
                isDark ? 'bg-neutral-900 border-neutral-800' : 'bg-slate-100 border-slate-100'
              }`}>
                <Image 
                  src={item.image} 
                  fill 
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  alt={`Screenshot showing ${item.title_en}`}
                  className="object-cover object-top transition-transform duration-[1200ms] ease-out group-hover:scale-105"
                  priority={index < 4}
                />
                
                {/* Subtle Inner Glow/Overlay for depth */}
                <div className={`absolute inset-0 pointer-events-none transition-opacity duration-500 ${
                  isDark ? 'bg-gradient-to-t from-black/40 via-transparent' : 'bg-black/0 group-hover:bg-black/5'
                }`} />
                
                {/* Number Badge */}
                <div className={`absolute top-4 left-4 sm:top-6 sm:left-6 w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm backdrop-blur-md border ${
                  isDark 
                    ? 'bg-black/50 border-white/10 text-white' 
                    : 'bg-white/80 border-slate-200 text-slate-900 shadow-sm'
                }`}>
                  {index + 1}
                </div>
              </div>

              {/* Text Module */}
              <div className="p-8 sm:p-10 flex flex-col flex-grow justify-between">
                <div>
                  <h3 className={`text-2xl font-black uppercase tracking-tight transition-colors ${
                    isDark ? 'text-white' : 'text-slate-900'
                  }`}>
                    {item.title_en}
                  </h3>
                  <p className="text-sm font-bold text-brand-emerald tracking-wide mt-2">
                    {item.title_ur}
                  </p>
                  <p className={`mt-5 text-sm md:text-base leading-relaxed transition-colors ${
                    isDark ? 'text-neutral-400' : 'text-neutral-600'
                  }`}>
                    {item.description_en}
                  </p>
                </div>
                <div className={`mt-6 pt-6 border-t ${isDark ? 'border-neutral-800' : 'border-slate-100'}`}>
                   <p className={`text-[13px] leading-relaxed transition-colors ${
                     isDark ? 'text-neutral-500' : 'text-neutral-500'
                   }`}>
                     {item.description_ur}
                   </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

