import React, { useState } from 'react';
import { motion } from 'framer-motion';
import AnimatedBackground from '../components/AnimatedBackground';
import { 
  Calculator, 
  CheckCircle, 
  BadgePercent, 
  Landmark, 
  ShieldCheck, 
  Zap, 
  ArrowRight, 
  Calendar, 
  Coins, 
  FileCheck2, 
  Building, 
  Sparkles,
  TrendingUp,
  Percent,
  Copy,
  Check
} from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';

interface EmiSolarPlanProps {
  onOpenQuoteModal?: () => void;
}

const EmiSolarPlan: React.FC<EmiSolarPlanProps> = ({ onOpenQuoteModal }) => {
  // Calculator States
  const [calcMode, setCalcMode] = useState<'reducing' | 'flat'>('reducing');
  const [systemKW, setSystemKW] = useState<number>(3);
  const [tenureYears, setTenureYears] = useState<number>(5);
  const [interestRate, setInterestRate] = useState<number>(7);
  const [downPaymentPercent, setDownPaymentPercent] = useState<number>(10);
  const [customLoanOverride, setCustomLoanOverride] = useState<number | null>(null);
  const [copiedToast, setCopiedToast] = useState(false);

  // Application Form States
  const [applicantName, setApplicantName] = useState('');
  const [applicantPhone, setApplicantPhone] = useState('');
  const [applicantCity, setApplicantCity] = useState('');
  const [applicantOccupation, setApplicantOccupation] = useState('Salaried');
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Solar Cost Benchmarks in India (avg ~₹55,000/kW)
  const baseCost = systemKW * 55000;
  
  // PM Surya Ghar subsidy rule: 
  // 1 kW: ₹30,000 | 2 kW: ₹60,000 | 3 kW+: ₹78,000
  const subsidyAmount = systemKW <= 1 ? 30000 : systemKW <= 2 ? 60000 : 78000;
  
  const netCostAfterSubsidy = Math.max(10000, baseCost - subsidyAmount);
  const downPayment = Math.round((netCostAfterSubsidy * downPaymentPercent) / 100);
  const calculatedLoanAmount = Math.max(10000, netCostAfterSubsidy - downPayment);
  const loanAmount = customLoanOverride !== null ? customLoanOverride : calculatedLoanAmount;

  const totalMonths = tenureYears * 12;

  // EMI & Repayment calculations based on mode:
  let emi = 0;
  let totalInterest = 0;
  let totalRepayment = 0;

  if (loanAmount > 0 && totalMonths > 0) {
    if (calcMode === 'reducing') {
      const monthlyRate = (interestRate / 100) / 12;
      emi = Math.round((loanAmount * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) / (Math.pow(1 + monthlyRate, totalMonths) - 1));
      totalRepayment = emi * totalMonths;
      totalInterest = Math.max(0, totalRepayment - loanAmount);
    } else {
      totalInterest = Math.round(loanAmount * (interestRate / 100) * tenureYears);
      totalRepayment = loanAmount + totalInterest;
      emi = Math.round(totalRepayment / totalMonths);
    }
  }

  // Monthly electricity units generated (approx 120 units per kW per month in India)
  const monthlyUnits = systemKW * 120;
  const avgElectricityTariff = 7.5; // ₹/unit
  const monthlySavings = Math.round(monthlyUnits * avgElectricityTariff);
  const netMonthlyGain = monthlySavings - emi;

  const principalPct = totalRepayment > 0 ? Math.round((loanAmount / totalRepayment) * 1000) / 10 : 100;
  const interestPct = totalRepayment > 0 ? Math.round((totalInterest / totalRepayment) * 1000) / 10 : 0;

  const handleShareWhatsApp = () => {
    const text = encodeURIComponent(
      `*☀️ SB Solar Energy - Solar Loan Offer*\n\n` +
      `⚡ *System Capacity:* ${systemKW} kW\n` +
      `💰 *Loan Amount:* ₹${loanAmount.toLocaleString('en-IN')}\n` +
      `📊 *Interest Rate:* ${interestRate}% p.a. (${calcMode === 'reducing' ? 'Reducing Balance' : 'Flat Rate'})\n` +
      `📅 *Tenure:* ${tenureYears} Years (${totalMonths} Months)\n` +
      `💳 *Estimated Monthly EMI:* ₹${emi.toLocaleString('en-IN')}/mo\n` +
      `💡 *Monthly Power Bill Offset:* ~₹${monthlySavings.toLocaleString('en-IN')}/mo\n` +
      `🏛️ *Total Interest:* ₹${totalInterest.toLocaleString('en-IN')}\n` +
      `💵 *Total Repayment:* ₹${totalRepayment.toLocaleString('en-IN')}\n\n` +
      `_Calculated via SB Solar Energy Official Portal_`
    );
    window.open(`https://wa.me/?text=${text}`, '_blank');
  };

  const handleCopyQuotation = () => {
    const summary = 
      `☀️ SB Solar Energy - Solar Loan Quotation\n` +
      `• System Size: ${systemKW} kW\n` +
      `• Loan Amount: ₹${loanAmount.toLocaleString('en-IN')}\n` +
      `• Calculation Mode: ${calcMode === 'reducing' ? 'Reducing Balance' : 'Flat Rate'}\n` +
      `• Interest Rate: ${interestRate}% p.a.\n` +
      `• Tenure: ${tenureYears} Years (${totalMonths} Months)\n` +
      `• Estimated Monthly EMI: ₹${emi.toLocaleString('en-IN')}/mo\n` +
      `• Monthly Bill Savings: ~₹${monthlySavings.toLocaleString('en-IN')}/mo\n` +
      `• Total Interest Payable: ₹${totalInterest.toLocaleString('en-IN')}\n` +
      `• Total Repayment Amount: ₹${totalRepayment.toLocaleString('en-IN')}`;
    
    navigator.clipboard.writeText(summary);
    setCopiedToast(true);
    setTimeout(() => setCopiedToast(false), 2500);
  };

  const handleApplySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!applicantName || !applicantPhone) return;

    const message = encodeURIComponent(
      `*New Solar Loan / EMI Application Request*\n\n` +
      `👤 *Name:* ${applicantName}\n` +
      `📞 *Phone:* ${applicantPhone}\n` +
      `📍 *City:* ${applicantCity || 'Not specified'}\n` +
      `💼 *Occupation:* ${applicantOccupation}\n` +
      `☀️ *System Size:* ${systemKW} kW\n` +
      `📅 *Tenure:* ${tenureYears} Years (${totalMonths} Months)\n` +
      `💰 *Estimated EMI:* ₹${emi.toLocaleString('en-IN')}/mo\n` +
      `🏛️ *Net Loan Amount:* ₹${loanAmount.toLocaleString('en-IN')}\n\n` +
      `_Requested from SB Solar Energy Website_`
    );

    const whatsappUrl = `https://wa.me/917023204664?text=${message}`;
    window.open(whatsappUrl, '_blank');
    setIsSubmitted(true);
  };

  const scrollToCalculator = (e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.getElementById('calculator');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToApplyForm = (e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.getElementById('apply-form');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen text-slate-800">
      {/* Hero Section */}
      <section 
        className="relative min-h-[200px] md:h-[300px] flex items-center justify-center bg-fixed bg-center bg-cover overflow-hidden z-10"
        style={{ backgroundImage: "url('/hero3.png')" }}
      >
        <AnimatedBackground />
        <div className="absolute inset-0 bg-slate-900/75 z-0"></div>
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto py-5 sm:py-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-primary font-bold tracking-widest uppercase text-xs mb-1 block">
              Collateral-Free Solar Financing @ 7% Interest p.a.
            </span>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-white mb-1.5">
              Solar <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-emerald-400">EMI Plan</span>
            </h1>
            <p className="text-xs sm:text-sm md:text-base text-slate-200 font-normal max-w-2xl mx-auto leading-relaxed mb-3">
              Don&apos;t let upfront cost stop you. Your electricity bill savings will pay for your monthly solar EMI with full PM Surya Ghar Central Subsidy!
            </p>

            <div className="flex flex-wrap items-center justify-center gap-2.5">
              <button
                onClick={scrollToCalculator}
                className="bg-primary hover:bg-primary-hover text-white px-4 py-2 rounded-xl font-bold text-xs sm:text-sm shadow-md transition-all flex items-center gap-1.5 cursor-pointer hover:scale-105 active:scale-95"
              >
                <Calculator className="w-4 h-4" /> Calculate EMI
              </button>
              {onOpenQuoteModal && (
                <button
                  onClick={onOpenQuoteModal}
                  className="bg-white/10 hover:bg-white/20 text-white border border-white/20 px-4 py-2 rounded-xl font-medium text-xs sm:text-sm backdrop-blur-sm transition-all"
                >
                  Get Free Quote
                </button>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Key Highlights / Numbers */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 sm:pt-6 relative z-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-3.5">
          {[
            { label: 'Starting Interest Rate', val: '6.0% p.a.', desc: 'Under PM Surya Ghar Scheme', icon: BadgePercent, color: 'text-amber-600 bg-amber-50' },
            { label: 'Govt Subsidy Credit', val: 'Up to ₹78,000', desc: 'Direct to Bank Account', icon: Landmark, color: 'text-green-600 bg-green-50' },
            { label: 'Collateral Needed', val: '₹0 / Zero', desc: '100% Paperless Approval', icon: ShieldCheck, color: 'text-blue-600 bg-blue-50' },
            { label: 'Loan Tenure', val: 'Up to 5-10 Yrs', desc: 'Flexible Monthly Repayment', icon: Calendar, color: 'text-purple-600 bg-purple-50' }
          ].map((item, idx) => (
            <div key={idx} className="bg-white rounded-xl sm:rounded-2xl p-3 sm:p-3.5 2xl:p-4 shadow-sm hover:shadow-md border border-slate-100 flex flex-col justify-between transition-shadow">
              <div className="flex items-center justify-between mb-1.5">
                <span className={`p-1.5 rounded-lg ${item.color}`}>
                  <item.icon className="w-4 h-4" />
                </span>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Verified</span>
              </div>
              <div>
                <div className="text-base sm:text-lg 2xl:text-xl font-extrabold text-slate-900 tracking-tight">{item.val}</div>
                <div className="text-xs sm:text-sm font-bold text-slate-800 mt-0.5">{item.label}</div>
                <div className="text-[11px] text-slate-500 mt-0.5 leading-snug line-clamp-1">{item.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Interactive EMI & Savings Calculator */}
      <section id="calculator" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-12 2xl:py-16 scroll-mt-24">
        <div className="text-center max-w-3xl mx-auto mb-8 md:mb-10">
          <span className="text-primary font-bold text-xs uppercase tracking-widest bg-primary/10 px-3.5 py-1.5 rounded-full inline-block mb-3">
            Real-Time Solar Financing Calculator
          </span>
          <h2 className="text-xl sm:text-2xl md:text-3xl 2xl:text-4xl font-extrabold text-slate-900 tracking-tight">
            Calculate Your Solar EMI &amp; Savings
          </h2>
          <p className="text-xs sm:text-sm md:text-base text-slate-600 mt-2">
            Compare banking reducing rate vs flat rate, explore instant loan presets, and see how your solar electricity savings offset your monthly EMI.
          </p>

         
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
          {/* Controls Column */}
          <div className="lg:col-span-7 bg-white p-5 sm:p-6 2xl:p-8 rounded-3xl shadow-xl border border-slate-200/80 flex flex-col justify-between h-full">
            <div className="space-y-5 md:space-y-6">
              {/* System Capacity Slider & Presets */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="font-bold text-slate-800 text-sm sm:text-base flex items-center gap-2">
                  <Zap className="w-5 h-5 text-amber-500 fill-amber-500" />
                  Rooftop Solar Capacity:
                </label>
                <span className="text-xl sm:text-2xl font-black text-primary bg-primary/10 px-3 py-1 rounded-xl">
                  {systemKW} kW
                </span>
              </div>
              <input
                type="range"
                min={1}
                max={10}
                step={0.5}
                value={systemKW}
                onChange={(e) => {
                  setSystemKW(Number(e.target.value));
                  setCustomLoanOverride(null);
                }}
                className="w-full h-2.5 bg-slate-200 rounded-lg accent-primary cursor-pointer"
              />
              <div className="flex flex-wrap gap-1.5 mt-2.5">
                {[2, 3, 4, 5, 7, 10].map((kw) => (
                  <button
                    key={kw}
                    type="button"
                    onClick={() => {
                      setSystemKW(kw);
                      setCustomLoanOverride(null);
                    }}
                    className={`text-xs px-2.5 py-1 rounded-lg font-semibold transition-all cursor-pointer ${
                      systemKW === kw
                        ? 'bg-primary text-white shadow-sm'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {kw} kW
                  </button>
                ))}
              </div>
            </div>

            {/* Solar Loan Amount & Presets */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="font-bold text-slate-800 text-sm sm:text-base flex items-center gap-2">
                  <Landmark className="w-5 h-5 text-indigo-600" />
                  Solar Loan Amount:
                </label>
                <div className="flex items-center gap-2">
                  <span className="text-lg sm:text-xl font-black text-indigo-700 bg-indigo-50 px-3 py-1 rounded-xl">
                    ₹{loanAmount.toLocaleString('en-IN')}
                  </span>
                  {customLoanOverride !== null && (
                    <button
                      type="button"
                      onClick={() => setCustomLoanOverride(null)}
                      className="text-[11px] text-slate-500 hover:text-slate-800 underline cursor-pointer"
                      title="Reset to capacity calculated cost"
                    >
                      Reset
                    </button>
                  )}
                </div>
              </div>
              <input
                type="range"
                min={50000}
                max={1000000}
                step={10000}
                value={loanAmount}
                onChange={(e) => setCustomLoanOverride(Number(e.target.value))}
                className="w-full h-2.5 bg-slate-200 rounded-lg accent-indigo-600 cursor-pointer"
              />
              <div className="flex flex-wrap gap-1.5 mt-2.5">
                {[
                  { label: '₹95,000', val: 95000 },
                  { label: '₹1.4 Lakh', val: 140000 },
                  { label: '₹2 Lakh', val: 200000 },
                  { label: '₹3.5 Lakh', val: 350000 },
                  { label: '₹5 Lakh', val: 500000 },
                  { label: '₹10 Lakh', val: 1000000 },
                ].map((preset) => (
                  <button
                    key={preset.val}
                    type="button"
                    onClick={() => setCustomLoanOverride(preset.val)}
                    className={`text-xs px-2.5 py-1 rounded-lg font-semibold transition-all cursor-pointer ${
                      loanAmount === preset.val
                        ? 'bg-indigo-600 text-white shadow-sm'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {preset.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Interest Rate & Presets */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="font-bold text-slate-800 text-sm sm:text-base flex items-center gap-2">
                  <BadgePercent className="w-5 h-5 text-amber-600" />
                  Interest Rate (% per annum):
                </label>
                <span className="text-lg sm:text-xl font-black text-amber-700 bg-amber-50 px-3 py-1 rounded-xl">
                  {interestRate}% p.a.
                </span>
              </div>
              <input
                type="range"
                min={5}
                max={15}
                step={0.1}
                value={interestRate}
                onChange={(e) => setInterestRate(Number(e.target.value))}
                className="w-full h-2.5 bg-slate-200 rounded-lg accent-amber-600 cursor-pointer"
              />
              <div className="flex flex-wrap gap-1.5 mt-2.5">
                {[6, 7, 8, 8.15, 9, 13, 14].map((rate) => (
                  <button
                    key={rate}
                    type="button"
                    onClick={() => setInterestRate(rate)}
                    className={`text-xs px-2.5 py-1 rounded-lg font-semibold transition-all cursor-pointer ${
                      interestRate === rate
                        ? 'bg-amber-600 text-white shadow-sm'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {rate}%
                  </button>
                ))}
              </div>
            </div>

            {/* Tenure Slider & Presets */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="font-bold text-slate-800 text-sm sm:text-base flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-blue-500" />
                  Loan Repayment Tenure:
                </label>
                <span className="text-xl sm:text-2xl font-black text-blue-600 bg-blue-50 px-3 py-1 rounded-xl">
                  {tenureYears} {tenureYears === 1 ? 'Year' : 'Years'} ({totalMonths} Mos)
                </span>
              </div>
              <input
                type="range"
                min={1}
                max={10}
                step={1}
                value={tenureYears}
                onChange={(e) => setTenureYears(Number(e.target.value))}
                className="w-full h-2.5 bg-slate-200 rounded-lg accent-blue-600 cursor-pointer"
              />
              <div className="flex flex-wrap gap-1.5 mt-2.5">
                {[
                  { label: '3 Years (36 Mo)', yrs: 3 },
                  { label: '5 Years (60 Mo)', yrs: 5 },
                  { label: '7 Years (84 Mo)', yrs: 7 },
                  { label: '10 Years (120 Mo)', yrs: 10 }
                ].map((t) => (
                  <button
                    key={t.yrs}
                    type="button"
                    onClick={() => setTenureYears(t.yrs)}
                    className={`text-xs px-2.5 py-1 rounded-lg font-semibold transition-all cursor-pointer ${
                      tenureYears === t.yrs
                        ? 'bg-blue-600 text-white shadow-sm'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Down Payment % */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="font-bold text-slate-800 text-sm sm:text-base flex items-center gap-2">
                  <Coins className="w-5 h-5 text-green-600" />
                  Down Payment:
                </label>
                <span className="text-lg sm:text-xl font-black text-green-700 bg-green-50 px-3 py-1 rounded-xl">
                  {downPaymentPercent}% (₹{downPayment.toLocaleString('en-IN')})
                </span>
              </div>
              <input
                type="range"
                min={0}
                max={40}
                step={5}
                value={downPaymentPercent}
                onChange={(e) => {
                  setDownPaymentPercent(Number(e.target.value));
                  setCustomLoanOverride(null);
                }}
                className="w-full h-2.5 bg-slate-200 rounded-lg accent-green-600 cursor-pointer"
              />
              <div className="flex justify-between text-xs text-slate-400 mt-1 font-medium">
                <span>0% (Zero Down-payment)</span>
                <span>10%</span>
                <span>20%</span>
                <span>40%</span>
              </div>
            </div>
          </div>

          {/* Quick Cost & Subsidy Breakdown */}
          <div className="mt-5 md:mt-6 bg-slate-50 rounded-2xl p-4 sm:p-5 border border-slate-200 space-y-2.5 text-sm">
              <div className="flex justify-between text-slate-600">
                <span>Approximate System Cost:</span>
                <span className="font-semibold text-slate-800">₹{baseCost.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between text-green-600 font-semibold">
                <span>Central Govt Subsidy (PM Surya Ghar):</span>
                <span>- ₹{subsidyAmount.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Customer Down Payment ({downPaymentPercent}%):</span>
                <span className="font-medium text-slate-800">₹{downPayment.toLocaleString('en-IN')}</span>
              </div>
              <div className="border-t border-slate-200 pt-2 flex justify-between font-bold text-slate-900 text-base">
                <span>Net Solar Loan Financed:</span>
                <span className="text-primary font-black">₹{loanAmount.toLocaleString('en-IN')}</span>
              </div>
            </div>
          </div>

          {/* Results Summary Column */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-4 h-full">
            <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-amber-950 text-white rounded-3xl p-5 sm:p-6 2xl:p-7 shadow-2xl border border-slate-800 relative overflow-hidden flex-1 flex flex-col justify-between">
              <div>
                {/* Calculation Mode Switcher Tabs - Lighter Background Container */}
              <div className="mb-5 bg-white rounded-2xl p-2.5 shadow-lg border border-slate-100 text-slate-800">
                <div className="flex items-center justify-between px-1.5 pt-0.5 pb-2">
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500">
                    Loan Calculation Type
                  </span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    calcMode === 'reducing' 
                      ? 'bg-emerald-100 text-emerald-800 border border-emerald-300' 
                      : 'bg-amber-100 text-amber-800 border border-amber-300'
                  }`}>
                    {calcMode === 'reducing' ? '✓ Reducing Balance' : '✓ Flat Rate'}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-1.5 bg-slate-100/90 p-1 rounded-xl border border-slate-200/80">
                  <button
                    type="button"
                    onClick={() => setCalcMode('reducing')}
                    className={`py-2 px-2.5 rounded-lg font-bold text-xs transition-all duration-200 cursor-pointer flex items-center justify-center gap-1.5 ${
                      calcMode === 'reducing'
                        ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/25 ring-1 ring-emerald-500'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-white/80'
                    }`}
                  >
                    <TrendingUp className={`w-3.5 h-3.5 ${calcMode === 'reducing' ? 'text-white' : 'text-emerald-600'}`} />
                    <span>Reducing Rate</span>
                    <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${
                      calcMode === 'reducing' 
                        ? 'bg-black/20 text-white' 
                        : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                    }`}>
                      Bank
                    </span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setCalcMode('flat')}
                    className={`py-2 px-2.5 rounded-lg font-bold text-xs transition-all duration-200 cursor-pointer flex items-center justify-center gap-1.5 ${
                      calcMode === 'flat'
                        ? 'bg-amber-500 text-white shadow-md shadow-amber-500/25 ring-1 ring-amber-400'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-white/80'
                    }`}
                  >
                    <Percent className={`w-3.5 h-3.5 ${calcMode === 'flat' ? 'text-white' : 'text-amber-600'}`} />
                    <span>Flat Rate</span>
                    <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${
                      calcMode === 'flat' 
                        ? 'bg-black/20 text-white' 
                        : 'bg-amber-50 text-amber-700 border border-amber-200'
                    }`}>
                      NBFC
                    </span>
                  </button>
                </div>
              </div>

              {/* Monthly EMI Header */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <div>
                  <span className="text-xs text-amber-400 font-bold uppercase tracking-wider block">
                    Calculated Monthly EMI
                  </span>
                  <div className="text-2xl sm:text-3xl 2xl:text-4xl font-black text-amber-400 mt-1">
                    ₹{emi.toLocaleString('en-IN')}
                    <span className="text-xs sm:text-sm font-normal text-slate-400"> / month</span>
                  </div>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
                  <Calculator className="w-6 h-6" />
                </div>
              </div>

              {/* Green Box: Estimated Solar Bill Offset */}
              <div className="my-5 bg-emerald-950/70 border border-emerald-500/30 rounded-2xl p-4">
                <div className="flex items-center justify-between text-emerald-400 font-bold text-xs uppercase tracking-wider mb-2">
                  <span className="flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                    Estimated Solar Bill Offset
                  </span>
                  <span className="text-[11px] bg-emerald-500/20 px-2 py-0.5 rounded-full">
                    {monthlyUnits} Units/mo
                  </span>
                </div>
                <div className="space-y-1.5 text-xs sm:text-sm">
                  <div className="flex justify-between items-center text-slate-300">
                    <span>Power Bill Savings:</span>
                    <span className="font-bold text-emerald-400">+ ₹{monthlySavings.toLocaleString('en-IN')} / mo</span>
                  </div>
                  <div className="flex justify-between items-center text-slate-300">
                    <span>Monthly Solar EMI:</span>
                    <span className="font-bold text-amber-400">- ₹{emi.toLocaleString('en-IN')} / mo</span>
                  </div>
                  <div className="border-t border-emerald-500/20 pt-2 flex justify-between items-center font-bold">
                    <span className="text-white">Net Monthly Benefit:</span>
                    <span className={netMonthlyGain >= 0 ? "text-emerald-300 text-sm font-black" : "text-amber-300 text-sm font-black"}>
                      {netMonthlyGain >= 0 ? `+ ₹${netMonthlyGain.toLocaleString('en-IN')} / mo Extra Saved` : `Net Outflow only ₹${Math.abs(netMonthlyGain).toLocaleString('en-IN')}/mo`}
                    </span>
                  </div>
                </div>
              </div>

              {/* Financial Breakdown Table & Donut Chart */}
              <div className="space-y-4 pb-4 border-b border-slate-800">
                <div className="flex items-center justify-between gap-4">
                  <div className="space-y-2 text-xs sm:text-sm flex-1">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Principal Amount:</span>
                      <span className="font-bold text-white">₹{loanAmount.toLocaleString('en-IN')}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Total Interest:</span>
                      <span className="font-bold text-amber-400">₹{totalInterest.toLocaleString('en-IN')}</span>
                    </div>
                    <div className="flex justify-between border-t border-slate-800 pt-1.5">
                      <span className="text-slate-300 font-semibold">Total Repayment:</span>
                      <span className="font-black text-cyan-300">₹{totalRepayment.toLocaleString('en-IN')}</span>
                    </div>
                  </div>

                  {/* Donut Chart (SVG) */}
                  <div className="flex flex-col items-center">
                    <div className="relative w-20 h-20">
                      <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                        <circle
                          cx="50"
                          cy="50"
                          r="38"
                          fill="none"
                          stroke="#334155"
                          strokeWidth="14"
                        />
                        <circle
                          cx="50"
                          cy="50"
                          r="38"
                          fill="none"
                          stroke="#10b981"
                          strokeWidth="14"
                          strokeDasharray={`${(principalPct * 238.76) / 100} 238.76`}
                          strokeLinecap="round"
                        />
                        <circle
                          cx="50"
                          cy="50"
                          r="38"
                          fill="none"
                          stroke="#f59e0b"
                          strokeWidth="14"
                          strokeDasharray={`${(interestPct * 238.76) / 100} 238.76`}
                          strokeDashoffset={`-${(principalPct * 238.76) / 100}`}
                          strokeLinecap="round"
                        />
                      </svg>
                      <div className="absolute inset-0 flex flex-col items-center justify-center text-[10px] font-bold text-slate-300">
                        <span>{tenureYears}Y</span>
                      </div>
                    </div>
                    <div className="flex gap-2 text-[10px] mt-1.5 font-semibold">
                      <span className="text-emerald-400 flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>{principalPct}%
                      </span>
                      <span className="text-amber-400 flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>{interestPct}%
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons: WhatsApp, Copy, Apply */}
            <div className="pt-4 space-y-2.5">
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={handleShareWhatsApp}
                    className="w-full py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-md"
                  >
                    <FaWhatsapp className="w-4 h-4" /> Share on WhatsApp
                  </button>
                  <button
                    type="button"
                    onClick={handleCopyQuotation}
                    className="w-full py-2.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer border border-slate-700"
                  >
                    {copiedToast ? (
                      <>
                        <Check className="w-4 h-4 text-emerald-400" /> Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" /> Copy Quotation
                      </>
                    )}
                  </button>
                </div>

                <button
                  type="button"
                  onClick={scrollToApplyForm}
                  className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:from-amber-600 hover:to-orange-600 text-white font-bold text-center block shadow-lg shadow-orange-500/20 transition-all hover:scale-[1.01] cursor-pointer"
                >
                  Apply For This EMI Plan
                </button>
              </div>
            </div>

            {/* Subsidy Note Card */}
            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 sm:p-4.5 flex items-start gap-3.5 shrink-0">
              <CheckCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
              <div className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                <strong className="text-slate-900 block font-bold mb-0.5">PM Surya Ghar Subsidy Guaranteed</strong>
                SB Solar Energy handles end-to-end DISCOM net metering, government portal registration, and subsidy disbursement assistance right to your bank account.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Banking & Financing Partners */}
      <section className="bg-white py-14 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <h3 className="text-xs uppercase font-bold tracking-widest text-slate-400">
              Nationalized &amp; Private Bank Tie-ups
            </h3>
            <p className="text-xl sm:text-2xl font-bold text-slate-800 mt-1">
              Easy Financing via Trusted Lending Partners
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              { name: 'State Bank of India', desc: 'Surya Ghar Loan @ 7%' },
              { name: 'Canara Bank', desc: 'Instant Rooftop Loan' },
              { name: 'Punjab National Bank', desc: 'Fast Sanction' },
              { name: 'Bank of Baroda', desc: 'Low Interest Rate' },
              { name: 'Union Bank of India', desc: 'Direct Subsidy Link' },
              { name: 'Tata Capital / NBFC', desc: 'Paperless Digital EMI' },
            ].map((bank, i) => (
              <div key={i} className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-white hover:shadow-md transition-all text-center flex flex-col justify-center items-center">
                <Building className="w-6 h-6 text-primary mb-2 opacity-80" />
                <span className="font-bold text-slate-800 text-xs sm:text-sm leading-tight">{bank.name}</span>
                <span className="text-[11px] text-slate-500 mt-1">{bank.desc}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works - 4 Steps */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-primary font-bold text-xs uppercase tracking-widest bg-primary/10 px-3 py-1 rounded-full">
            Simple 4-Step Process
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2">
            How to Get Solar on EMI
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            { step: '01', title: 'Submit Details', desc: 'Share your basic info & average power bill using the form below.', icon: FileCheck2 },
            { step: '02', title: 'Free Rooftop Audit', desc: 'Our technical engineer evaluates shadow-free area & system size.', icon: Zap },
            { step: '03', title: 'Instant Loan Sanction', desc: 'Quick paperless approval under PM Surya Ghar Yojana portal.', icon: Landmark },
            { step: '04', title: 'Installation & Subsidy', desc: 'Turnkey installation done with net meter & subsidy directly deposited.', icon: CheckCircle },
          ].map((item, idx) => (
            <div key={idx} className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm relative overflow-hidden group hover:shadow-md transition-all">
              <div className="text-4xl font-black text-slate-100 absolute -top-1 -right-1 select-none group-hover:text-amber-100 transition-colors">
                {item.step}
              </div>
              <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-bold mb-4 relative z-10">
                <item.icon className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-base mb-1.5 relative z-10">{item.title}</h3>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed relative z-10">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Application Form */}
      <section id="apply-form" className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 scroll-mt-24">
        <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-2xl border border-slate-200">
          <div className="text-center max-w-xl mx-auto mb-8">
            <span className="bg-amber-100 text-amber-800 text-xs font-bold px-3 py-1 rounded-full uppercase">
              Quick Application
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2">
              Apply for Solar Loan / EMI
            </h2>
            <p className="text-slate-600 text-sm mt-1">
              Fill in your details to check pre-approved eligibility with 0 obligation.
            </p>
          </div>

          {isSubmitted ? (
            <div className="text-center py-8 space-y-3">
              <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-bold text-slate-800">Application Initiated!</h3>
              <p className="text-slate-600 max-w-md mx-auto text-sm leading-relaxed">
                Thank you, <span className="font-semibold text-slate-800">{applicantName}</span>. We opened WhatsApp to connect you with our financing desk. Our team will verify your eligibility shortly.
              </p>
            </div>
          ) : (
            <form onSubmit={handleApplySubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Enter your name"
                    value={applicantName}
                    onChange={(e) => setApplicantName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none text-sm"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">
                    Mobile Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="10-digit mobile number"
                    value={applicantPhone}
                    onChange={(e) => setApplicantPhone(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">
                    City / Pin Code
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Jaipur, 302001"
                    value={applicantCity}
                    onChange={(e) => setApplicantCity(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none text-sm"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">
                    Employment / Income Source
                  </label>
                  <select
                    value={applicantOccupation}
                    onChange={(e) => setApplicantOccupation(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none text-sm bg-white"
                  >
                    <option value="Salaried">Salaried (Private / Govt)</option>
                    <option value="Self Employed / Business">Self Employed / Business</option>
                    <option value="Farmer / Agriculture">Farmer / Agriculture</option>
                    <option value="Retired / Pensioner">Retired / Pensioner</option>
                  </select>
                </div>
              </div>

              {/* Selected Plan Preview */}
              <div className="p-3.5 bg-amber-50 rounded-xl border border-amber-200 flex justify-between items-center text-xs sm:text-sm">
                <div>
                  <span className="text-slate-600">Selected Plan: </span>
                  <strong className="text-slate-900">{systemKW} kW System</strong>
                </div>
                <div>
                  <span className="text-slate-600">Est. EMI: </span>
                  <strong className="text-amber-700">₹{emi.toLocaleString('en-IN')}/mo ({tenureYears} Yrs)</strong>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 px-6 rounded-xl bg-primary hover:bg-primary-hover text-white font-bold text-base shadow-lg shadow-primary/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Check EMI Eligibility &amp; Apply Now</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </form>
          )}
        </div>
      </section>
    </div>
  );
};

export default EmiSolarPlan;
