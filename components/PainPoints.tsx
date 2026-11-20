'use client'

import { useState, useMemo } from 'react'
import { motion } from 'motion/react'
import { 
  AlertTriangle, ShieldAlert, XCircle, CheckCircle, Clock, 
  HelpCircle, Sparkles, TrendingDown, TrendingUp, Info, 
  ArrowRight, DollarSign, ShieldCheck, HeartCrack, Trash2, Zap,
  MessageCircle, Scale, Shield, Database, Smartphone, Users, ChevronDown
} from 'lucide-react'

interface PainPointsProps {
  theme?: 'light' | 'dark'
}

export default function PainPoints({ theme = 'light' }: PainPointsProps) {
  const isDark = theme === 'dark'
  
  // Interactive Calculator State
  const [creditCustomers, setCreditCustomers] = useState(5)
  const [avgCreditAmount, setAvgCreditAmount] = useState(2000)
  const [estimatedMonthlyShrinkage, setEstimatedMonthlyShrinkage] = useState(15000)

  // Math calculated values
  const yearlyCreditLoss = useMemo(() => {
    // Assume 15% of forgotten credit gets lost forever
    return Math.round(creditCustomers * avgCreditAmount * 12 * 0.15)
  }, [creditCustomers, avgCreditAmount])

  const yearlyShrinkageLoss = useMemo(() => {
    return estimatedMonthlyShrinkage * 12
  }, [estimatedMonthlyShrinkage])

  const aggregateYearlyLoss = useMemo(() => {
    return yearlyCreditLoss + yearlyShrinkageLoss
  }, [yearlyCreditLoss, yearlyShrinkageLoss])

  const defaultNumber = process.env.NEXT_PUBLIC_ADMIN_WHATSAPP || '+923027245937'
  const whatsappUrl = `https://wa.me/${defaultNumber.replace(/\D/g, '')}?text=Salam!%20Main%20ZaynahsPOS%20ka%20FREE%20trial%20lena%20chahta%20hoon`

  return (
    <section 
      id="psychology-triggers" 
      className={`py-24 md:py-32 relative overflow-hidden transition-colors duration-300 ${
        isDark ? 'bg-black text-white' : 'bg-slate-50 text-neutral-800'
      }`}
    >
      {/* Decorative Radial Gradients */}
      <div className={`absolute w-[600px] h-[600px] rounded-full blur-[140px] top-10 right-[-100px] pointer-events-none transition-all ${
        isDark ? 'bg-red-500/5' : 'bg-red-500/10'
      }`} />
      <div className={`absolute w-[600px] h-[600px] rounded-full blur-[140px] bottom-10 left-[-100px] pointer-events-none transition-all ${
        isDark ? 'bg-brand-emerald/5' : 'bg-brand-emerald/10'
      }`} />

      <div className="max-w-7xl mx-auto px-4 relative z-10">

        {/* 1. Agitating Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="text-xs font-mono font-bold tracking-[0.2em] text-red-500 bg-red-500/15 px-4 py-2 rounded-full inline-flex items-center gap-2">
            <AlertTriangle className="w-3.5 h-3.5 animate-pulse text-red-500" />
            CRITICAL LOSS AUDIT
          </span>
          <h2 className={`text-4xl md:text-6xl font-black uppercase tracking-tight font-sans mt-4 transition-colors duration-300 ${
            isDark ? 'text-white' : 'text-slate-900'
          }`}>
            Kya Aapka Stock <span className="text-red-500">Chori</span> Ho Raha Hai?
          </h2>
          <p className="text-lg md:text-xl font-bold font-sans text-brand-emerald mt-2 uppercase tracking-wide">
            Hisaab Kitaab Ka Proper Record Nahi? Karobar Mein Munafa Ki Bajaye Nuqsan?
          </p>
          <p className={`mt-4 text-sm md:text-base leading-relaxed transition-colors duration-300 ${
            isDark ? 'text-neutral-400' : 'text-neutral-600'
          }`}>
            Ab har paisa track karo, har samaan record karo. ZaynahsPOS banega aapke karobar ka asli rakshak.
          </p>
        </div>

        {/* 2. Before vs After Split Grid */}
        <div className="grid lg:grid-cols-2 gap-8 mb-24">
          
          {/* PAIN Column */}
          <div className={`p-8 md:p-12 border rounded-3xl relative overflow-hidden transition-colors duration-300 ${
            isDark ? 'bg-neutral-900/40 border-red-500/15' : 'bg-white border-red-200 shadow-sm'
          }`}>
            <span className="absolute top-4 right-4 text-xs font-mono font-bold text-red-500 bg-red-500/10 px-3 py-1 rounded-full uppercase flex items-center gap-1.5">
              <HeartCrack className="w-3 h-3" />
              Sangeen Masle
            </span>
            <h3 className="text-2xl font-black text-red-500 uppercase font-sans mb-8 flex items-center gap-2">
              <TrendingDown className="w-6 h-6" />
              Ye Masle Har Din Nuqsan Kar Rahe Hain
            </h3>

            <div className="space-y-6">
              {[
                {
                  title: "Stock Chori & Be-Hisaabi",
                  desc: "Stock count kar ke thak gaye lekin phir bhi kuch na kuch kam nikal jata hai. Staff ko pata hai hisaab dhila hai, isiliye chori aur bhi zyada hoti hai."
                },
                {
                  title: "Ghayaab Munafa (Hidden Loss)",
                  desc: "Har mahine din raat mehnat karte hain lekin aakhir mein munafa dikhta nahi. Samajh nahi aata paisa kahan ja raha hai."
                },
                {
                  title: "Complicated & Mehnge Softwares",
                  desc: "Purane software itne mehenge aur complicated hain ke normal staff use hi nahi kar pata. Har device pe alag license aur renewal fees mangte hain."
                },
                {
                  title: "Udhaar Doobna (Dead Credit)",
                  desc: "Customer ne udhar liya tha, likhna bhool gaye ya copy ghum ho gayi. Udhar yaad nahi rehta aur mehnat ka paisa hamesha ke liye doob jata hai."
                },
                {
                  title: "Yad-Dahshat Par Chalti Suppliers Ledger",
                  desc: "Suppliers ke sath transactions ka hisaab clear nahi hota. Maal kab aaya aur payment kab hui, is pe aksar jhagray aur be-aitmadi paidah hoti hai."
                }
              ].map((item, idx) => (
                <div key={idx} className="flex gap-4 items-start pb-6 border-b border-neutral-205/60 dark:border-neutral-800/80 last:border-b-0 last:pb-0">
                  <div className="w-6 h-6 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center shrink-0 mt-1">
                    <XCircle className="w-4 h-4 text-red-500" strokeWidth={2.5} />
                  </div>
                  <div>
                    <h4 className={`text-base font-bold font-sans transition-colors ${isDark ? 'text-white' : 'text-slate-900'}`}>{item.title}</h4>
                    <p className={`text-xs sm:text-sm mt-1 transition-colors ${isDark ? 'text-neutral-400' : 'text-neutral-600'}`}>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* SOLUTION Column */}
          <div className={`p-8 md:p-12 border rounded-3xl relative overflow-hidden transition-colors duration-300 ${
            isDark ? 'bg-neutral-900/40 border-brand-emerald/15' : 'bg-white border-brand-emerald/20 shadow-lg shadow-emerald-50/50'
          }`}>
            <span className="absolute top-4 right-4 text-xs font-mono font-bold text-brand-emerald bg-brand-emerald/10 px-3 py-1 rounded-full uppercase flex items-center gap-1.5">
              <ShieldCheck className="w-3 h-3" />
              Sure Guarantee
            </span>
            <h3 className="text-2xl font-black text-brand-emerald uppercase font-sans mb-8 flex items-center gap-2">
              <TrendingUp className="w-6 h-6" />
              Ab Ye Sab Khatam - Solution Promise
            </h3>

            <div className="space-y-6">
              {[
                {
                  title: "Chori-Proof Dynamic System",
                  desc: "Har item ki purchase, sale aur stock entry automatically track hoti hai. Product entry/exit ka mukammal record log banta hai."
                },
                {
                  title: "Staff Ki Har Activity Par Nazar",
                  desc: "Manager aur Cashier ke roles alag hain. Kis ne kab login kiya, kis ne kitne bills delete kiye, audit log mein sab kuch transparent rehta hai."
                },
                {
                  title: "Live Automatic Profit / Loss Dashboard",
                  desc: "Har waqt apna mukammal munafa aur kharche desktop ya mobile pe live dekhein. Ek click mein din bhar ki report haasil karein."
                },
                {
                  title: "Extremely Clean Urdu/English interface",
                  desc: "Itna aasan ke dukan par kaam karne wala chota bacha ya helper bhi 10 minutes mein billing seekh jaye. Kisi larnay wale software ka sar dard nahi."
                },
                {
                  title: "Kahin Se Bhi Control (Anywhere Real-time)",
                  desc: "ZaynahsPOS sab devices pe chalta hai. Agar aap dukan pe nahi bhi hain, ghar baithe pure karobar ki billing live dekh sakte hain."
                }
              ].map((item, idx) => (
                <div key={idx} className="flex gap-4 items-start pb-6 border-b border-neutral-205/60 dark:border-neutral-800/80 last:border-b-0 last:pb-0">
                  <div className="w-6 h-6 rounded-full bg-brand-emerald/10 border border-brand-emerald/20 flex items-center justify-center shrink-0 mt-1">
                    <CheckCircle className="w-4 h-4 text-brand-emerald" strokeWidth={2.5} />
                  </div>
                  <div>
                    <h4 className={`text-base font-bold font-sans transition-colors ${isDark ? 'text-white' : 'text-slate-900'}`}>{item.title}</h4>
                    <p className={`text-xs sm:text-sm mt-1 transition-colors ${isDark ? 'text-neutral-400' : 'text-neutral-600'}`}>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* 3. Three Critical Leaks Deep-Dive Bento Boxes */}
        <div className="mb-24">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h3 className={`text-2xl md:text-3xl font-black uppercase font-sans transition-colors ${isDark ? 'text-white' : 'text-slate-900'}`}>
              Dukan Ke Teen Baraay Nuqsan
            </h3>
            <p className="text-xs font-mono uppercase tracking-widest text-[#10B981] mt-1 font-bold">
              Har dukan par hone wala chupa hoa nuksan jo aap ko ghareeb rakhta hai
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            
            {/* Box 1: Stock Leak */}
            <div className={`p-6 border rounded-3xl relative overflow-hidden transition-colors duration-300 ${
              isDark ? 'bg-neutral-900/30 border-neutral-850' : 'bg-white border-neutral-200'
            }`}>
              <div className="w-12 h-12 rounded-2xl bg-red-500/10 flex items-center justify-center mb-6 text-red-500">
                <Trash2 className="w-6 h-6" />
              </div>
              <h4 className={`text-lg font-black uppercase font-sans mb-3 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                1. Stock Chori Block
              </h4>
              <p className={`text-xs sm:text-sm leading-relaxed mb-6 transition-colors ${isDark ? 'text-neutral-400' : 'text-neutral-600'}`}>
                Samaan gayab ho jata hai par hisaab nahi milta. Staff fake entries bana ke cash drawer se paise nikal letay hain ya doston ko muft items de dete hain.
              </p>
              
              <div className={`p-4 rounded-2xl border ${isDark ? 'bg-black/40 border-neutral-805' : 'bg-slate-50 border-neutral-200'}`}>
                <p className="text-[10px] font-mono uppercase tracking-wider text-red-500 font-bold mb-1">Dukan par nuksan:</p>
                <p className={`text-xs font-semibold leading-relaxed ${isDark ? 'text-neutral-300' : 'text-slate-800'}`}>
                  Cashier aur staff bin-entered sales se hazaro ka stock rozana gayab karte hain. Closing time pe stock match hi nahi karta.
                </p>
              </div>
            </div>

            {/* Box 2: Time Waste */}
            <div className={`p-6 border rounded-3xl relative overflow-hidden transition-colors duration-300 ${
              isDark ? 'bg-neutral-900/30 border-neutral-850' : 'bg-white border-neutral-200'
            }`}>
              <div className="w-12 h-12 rounded-2xl bg-yellow-500/10 flex items-center justify-center mb-6 text-yellow-500">
                <Clock className="w-6 h-6" />
              </div>
              <h4 className={`text-lg font-black uppercase font-sans mb-3 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                2. Time Waste Section
              </h4>
              <p className={`text-xs sm:text-sm leading-relaxed mb-6 transition-colors ${isDark ? 'text-neutral-400' : 'text-neutral-600'}`}>
                Manual billing mein har customer pe 5 se 10 minute lagte hain. Calculator pe ghaltian hoti hain aur copy par hisaab likhte likhte dopahar se raat ho jati hai.
              </p>
              
              <div className={`p-4 rounded-2xl border ${isDark ? 'bg-black/40 border-neutral-805' : 'bg-slate-50 border-neutral-200'}`}>
                <p className="text-[10px] font-mono uppercase tracking-wider text-yellow-500 font-bold mb-1">Time nuksan:</p>
                <p className={`text-xs font-semibold leading-relaxed ${isDark ? 'text-neutral-300' : 'text-slate-800'}`}>
                  Customer lambi line dekh kar sath wali dukan pe chala jata hai. Ghanto ka hisaab karne mein dukan malik ka pura din zaya ho jata hai.
                </p>
              </div>
            </div>

            {/* Box 3: Mehnge Software */}
            <div className={`p-6 border rounded-3xl relative overflow-hidden transition-colors duration-300 ${
              isDark ? 'bg-neutral-900/30 border-neutral-850' : 'bg-white border-neutral-200'
            }`}>
              <div className="w-12 h-12 rounded-2xl bg-blue-500/10 flex items-center justify-center mb-6 text-blue-500">
                <ShieldAlert className="w-6 h-6" />
              </div>
              <h4 className={`text-lg font-black uppercase font-sans mb-3 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                3. Mehnge Software Pain
              </h4>
              <p className={`text-xs sm:text-sm leading-relaxed mb-6 transition-colors ${isDark ? 'text-neutral-400' : 'text-neutral-600'}`}>
                Baqi companies Rs 50,000 upfront aur Rs 5,000 monthly mangti hain. Har device pe extra charges, training aur customer support ke liye alag nakhre jhelnay parte hain.
              </p>
              
              <div className={`p-4 rounded-2xl border ${isDark ? 'bg-black/40 border-neutral-805' : 'bg-slate-50 border-neutral-200'}`}>
                <p className="text-[10px] font-mono uppercase tracking-wider text-blue-500 font-bold mb-1">Paise ka nuksan:</p>
                <p className={`text-xs font-semibold leading-relaxed ${isDark ? 'text-neutral-300' : 'text-slate-800'}`}>
                  Internet na ho to biill band ho jata hai. Un ka support nawaqif logo ka hota hai aur har saal be-baat renewal fees mangi jati hai.
                </p>
              </div>
            </div>

          </div>
        </div>

        {/* 4. Interactive Psychological Calculator Hook */}
        <div className={`p-8 md:p-14 border rounded-3xl mb-24 relative overflow-hidden transition-colors duration-300 ${
          isDark 
            ? 'bg-neutral-900/90 border-brand-emerald/20' 
            : 'bg-white border-slate-200 shadow-xl shadow-emerald-500/5'
        }`}>
          <div className="absolute top-0 right-0 w-32 h-32 bg-brand-emerald/5 rounded-full blur-2xl pointer-events-none" />
          
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-6 space-y-6">
              <span className="text-xs font-mono font-bold tracking-[0.25em] text-brand-emerald bg-brand-emerald/10 px-3.5 py-1.5 rounded-full inline-flex items-center gap-1.5">
                <Scale className="w-3.5 h-3.5" />
                Dukan ka live hisab
              </span>
              <h3 className={`text-2xl md:text-4xl font-black uppercase tracking-tight font-sans ${isDark ? 'text-white' : 'text-slate-900'}`}>
                Calculate Karein: <br /> Aapka Har Saal Kitna Nuqsan Ho Raha Hai?
              </h3>
              <p className={`text-xs sm:text-sm leading-relaxed transition-colors ${isDark ? 'text-neutral-400' : 'text-neutral-600'}`}>
                Niche mojood sliders ko tabdeel kar ke dekhein ke choti choti be-hisaabian saal bhar mein kitne lakh rupees ka daka dalti hain. ZaynahsPOS sirf Rs 70/day (Rs 2,099/month) mein is poore nuksan ko hamesha ke liye rok sakta hai.
              </p>

              {/* Sliders Box */}
              <div className="space-y-6 pt-4">
                {/* Slider 1: Credit range */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-xs font-bold font-mono">
                    <span className={isDark ? 'text-neutral-300' : 'text-slate-700'}>Kitne customer udhaar lete hain?</span>
                    <span className="text-brand-emerald text-sm">{creditCustomers} Customers / month</span>
                  </div>
                  <input 
                    type="range"
                    min="1"
                    max="30"
                    value={creditCustomers}
                    onChange={(e) => setCreditCustomers(parseInt(e.target.value))}
                    className="w-full h-1.5 bg-neutral-250 dark:bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-brand-emerald"
                  />
                  <span className="block text-[10px] text-neutral-400">Guzishta salon ki average: takreeban 15% udhar log wapas karna bhool jate hain.</span>
                </div>

                {/* Slider 2: Average Credit loss amount */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-xs font-bold font-mono">
                    <span className={isDark ? 'text-neutral-300' : 'text-slate-700'}>Ek customer ka average udhaar bill?</span>
                    <span className="text-brand-emerald text-sm">Rs {avgCreditAmount.toLocaleString()} Only</span>
                  </div>
                  <input 
                    type="range"
                    min="500"
                    max="10000"
                    step="500"
                    value={avgCreditAmount}
                    onChange={(e) => setAvgCreditAmount(parseInt(e.target.value))}
                    className="w-full h-1.5 bg-neutral-250 dark:bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-brand-emerald"
                  />
                </div>

                {/* Slider 3: Stock leakage per month */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-xs font-bold font-mono">
                    <span className={isDark ? 'text-neutral-300' : 'text-slate-700'}>Mahana andazan stock chori / kharabi?</span>
                    <span className="text-red-500 text-sm">Rs {estimatedMonthlyShrinkage.toLocaleString()} / month</span>
                  </div>
                  <input 
                    type="range"
                    min="2000"
                    max="80000"
                    step="1000"
                    value={estimatedMonthlyShrinkage}
                    onChange={(e) => setEstimatedMonthlyShrinkage(parseInt(e.target.value))}
                    className="w-full h-1.5 bg-neutral-250 dark:bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-brand-emerald"
                  />
                  <span className="block text-[10px] text-neutral-400">Is mein staff chori, zaya shuda gandum/sabzi/expiry shamil hain.</span>
                </div>
              </div>
            </div>

            {/* Calculations Outcome Board */}
            <div className={`lg:col-span-6 p-8 rounded-3xl border text-center relative overflow-hidden ${
              isDark ? 'bg-black/80 border-neutral-800' : 'bg-slate-50 border-neutral-200'
            }`}>
              <div className="absolute top-0 right-0 w-16 h-16 bg-red-500/5 rounded-full blur-xl pointer-events-none" />
              
              <span className="text-[10px] font-mono font-black uppercase text-red-500 border border-red-500/20 bg-red-500/5 px-3 py-1 rounded-full mb-6 inline-block">
                Andazan Sannana Nuqsan (Annual Leakage)
              </span>

              <div className="space-y-2 mb-8">
                <p className="text-xs text-neutral-400 uppercase font-mono tracking-wider">Aapki dukan se har saal zaya hone wali raqam:</p>
                <p className="text-5xl sm:text-6xl font-black text-red-500 tracking-tight font-sans">
                  Rs {aggregateYearlyLoss.toLocaleString()}
                </p>
                <p className="text-xs text-neutral-500">
                  (Khoya hoa udhaar: Rs {yearlyCreditLoss.toLocaleString()} + Stock chori: Rs {yearlyShrinkageLoss.toLocaleString()})
                </p>
              </div>

              <div className={`p-6 rounded-2xl border text-left mb-8 ${isDark ? 'bg-neutral-900 border-neutral-800' : 'bg-white border-neutral-200 shadow-sm'}`}>
                <h4 className="text-sm font-black uppercase text-brand-emerald font-sans flex items-center gap-2 mb-2">
                  <ShieldCheck className="w-4 h-4" />
                  ZaynahsPOS Se Kitna Bache Ga?
                </h4>
                <p className={`text-xs transition-colors ${isDark ? 'text-neutral-300' : 'text-neutral-700'}`}>
                  ZaynahsPOS saalana sirf <strong className="text-white dark:text-neutral-200 bg-brand-emerald/10 px-1 py-0.5 rounded font-mono font-bold text-brand-emerald">Rs 25,188</strong> cost karta hai (sirf Rs 70/day ke hisab se). Aap apne business mein hone wala takreeban <strong>Rs {Math.round(aggregateYearlyLoss * 0.95).toLocaleString()}</strong> ka nuksan hamesha ke liye rok sakte hain! Phir bhi soch rahe hain?
                </p>
              </div>

              <a 
                href="#booking-form"
                className="w-full py-4 bg-brand-emerald hover:bg-emerald-400 text-black font-extrabold rounded-full uppercase tracking-widest text-xs sm:text-sm transition shadow-lg shadow-brand-emerald/25 hover:shadow-brand-emerald/50 flex items-center justify-center gap-2 cursor-pointer"
              >
                <Zap className="w-4 h-4 fill-black text-black" />
                Abhi Nuksan Rokhein - Free Trial Shuru Karein
              </a>
            </div>

          </div>
        </div>

        {/* 5. Real Customer Quotes & Pain Testimonials */}
        <div className="mb-24">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-[10px] font-mono tracking-[0.2em] text-neutral-400 uppercase">
              RELIABLE TRADERS TESTIMONIALS
            </span>
            <h3 className={`text-2xl md:text-4xl font-black uppercase tracking-tight font-sans ${isDark ? 'text-white' : 'text-slate-900'}`}>
              Karobari Bhaiyon Ki Zubani
            </h3>
            <p className="text-xs tracking-wide text-neutral-500 uppercase mt-1">
              Lahore, Karachi, Islamabad se hamare customers ke tajrubaat
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                text: "Har mahine 50-60 hazar ka stock gayab hota tha, samajh nahi aati thi kahan ja raha hai. Jab se ZaynahsPOS lagwaya hai, staff ki chori 100% khatam! Ek ek item ka hisaab hai.",
                author: "M. Ramzan",
                store: "Ramzan Traders, Lahore"
              },
              {
                text: "3 saal se Excel use kar raha tha, par roz dukan band karte hue calculations dushman ban jati thi. Ab sirf 1 click dosto! Din ki poori sale, bachat aur udhari crystal clear hai.",
                author: "Saeed Ahmed",
                store: "Ahmed Electronics, Karachi"
              },
              {
                text: "Har device pe license fees bharnay se tang aa chuki thi. ZaynahsPOS pe mere 3 sales boys, cashier aur main ghar baithe sath kaam kar rahe hain. Aur sirf Rs 70/day (Rs 2,099 monthly)!",
                author: "Mrs. Fatima",
                store: "Fatima Boutique, Islamabad"
              },
              {
                text: "Pehle wala software bohot mehenga aur mushkil tha. Staff ko seekhane mein hafton lagtay thay. ZaynahsPOS itna simple hai ke hamare young salesboy ne sirf adhay ghante mein seekh liya.",
                author: "Dr. Ali Noor",
                store: "Al-Noor Pharmacy, Faisalabad"
              }
            ].map((t, idx) => (
              <div 
                key={idx} 
                className={`p-6 border rounded-3xl flex flex-col justify-between transition-colors ${
                  isDark ? 'bg-neutral-900/30 border-neutral-850 hover:bg-neutral-900/50' : 'bg-white border-neutral-200 hover:shadow-sm'
                }`}
              >
                <div>
                  {/* Rating or visual quote representation */}
                  <div className="flex gap-1 mb-4 text-[#10B981]">
                    <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-brand-emerald/10 text-brand-emerald">Verified Owner</span>
                  </div>
                  <p className={`text-xs sm:text-sm leading-relaxed italic transition-colors ${isDark ? 'text-neutral-300' : 'text-neutral-600'}`}>
                    &ldquo;{t.text}&rdquo;
                  </p>
                </div>
                
                <div className="mt-6 pt-4 border-t dark:border-neutral-800 border-slate-100 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-brand-emerald/10 flex items-center justify-center font-mono font-black text-xs text-brand-emerald">
                    {t.author.charAt(0)}
                  </div>
                  <div>
                    <h5 className={`text-xs font-black font-sans uppercase ${isDark ? 'text-white' : 'text-slate-800'}`}>{t.author}</h5>
                    <p className="text-[10px] text-neutral-400 font-mono mt-0.5">{t.store}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 6. Risk-Free Urgency CTA Ticker banner */}
        <div className={`p-8 md:p-10 border rounded-3xl text-center relative overflow-hidden ${
          isDark ? 'bg-neutral-950/40 border-neutral-850' : 'bg-white border-neutral-200'
        }`}>
          <div className="relative z-10 max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="text-left space-y-2">
              <span className="text-[10px] font-mono font-bold tracking-[0.2em] text-brand-emerald bg-brand-emerald/10 px-3 py-1 rounded-full uppercase inline-block">
                Limited Slots Remaining
              </span>
              <h4 className={`text-xl sm:text-2xl font-black uppercase font-sans ${isDark ? 'text-white' : 'text-slate-900'}`}>
                Har Din Delay = Aur Nuqsan!
              </h4>
              <p className={`text-xs sm:text-sm leading-relaxed transition-colors ${isDark ? 'text-neutral-400' : 'text-neutral-600'}`}>
                Sarf pehle 50 customers ko free customization aur direct local support slots dya ja raha hai. Koi credit card ki zaroorat nahi.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-4 shrink-0 w-full md:w-auto">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="w-full sm:w-auto px-6 py-3 bg-emerald-500 hover:bg-emerald-400 text-black font-black uppercase text-xs tracking-wider rounded-full transition flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-emerald-500/10"
              >
                <MessageCircle className="w-4 h-4 fill-black text-black" />
                WhatsApp Demo
              </a>
              <a
                href="#booking-form"
                className={`w-full sm:w-auto px-6 py-3 text-xs tracking-wider uppercase font-black rounded-full border transition flex items-center justify-center gap-2 cursor-pointer ${
                  isDark 
                    ? 'bg-neutral-900 text-white border-neutral-800 hover:bg-neutral-800' 
                    : 'bg-white text-neutral-800 border-neutral-200 hover:bg-slate-50'
                }`}
              >
                Start Free Trial
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>

        {/* 7. Final Emotional Hook Box */}
        <div className={`mt-14 p-6 sm:p-8 rounded-2xl border text-center font-mono text-[11px] leading-relaxed relative overflow-hidden ${
          isDark ? 'bg-neutral-900/10 border-neutral-850 text-neutral-400' : 'bg-slate-50 border-neutral-200 text-slate-600'
        }`}>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-brand-emerald/5 rounded-full blur-2xl pointer-events-none" />
          <p className="max-w-4xl mx-auto">
            <strong className="text-brand-emerald uppercase">Aakhri Fikr:</strong> Sochiye! Kal aapka ek customer Rs 5,000 ka maal udhar le gaya aur aap ko hamesha ki tarha yaad nahi raha. Woh phir kabhi wapas nahi aya aur aap ka mehnat ki kamaai ke Rs 5,000 doob gaye. Yeh har dukan pe hafte mein 1 baar ho daku dalta hai, jis se saalana lakhon ka nuksan hota hai. ZaynahsPOS sirf Rs 70/day (Rs 2,099/month) mein is poore nuksan ko roku ga, stock chohri band kare ga aur dukan ka sara control aap ke haath mein de ga. 
          </p>
          <p className="mt-3 font-semibold text-brand-emerald uppercase tracking-[0.1em]">
            Abhi Free trial shuru karein aur apna karobar mehfooz banayein!
          </p>
        </div>

      </div>
    </section>
  )
}
