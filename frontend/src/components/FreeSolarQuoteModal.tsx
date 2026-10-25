import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sun, Zap, CheckCircle2, ShieldCheck, ArrowRight, PhoneCall, Sparkles } from 'lucide-react';

interface FreeSolarQuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const FreeSolarQuoteModal: React.FC<FreeSolarQuoteModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    city: '',
    monthlyBill: 2500,
    category: 'Residential',
    roofType: 'Concrete / RCC Flat',
  });
  const [submitted, setSubmitted] = useState(false);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Dynamic calculations based on bill
  const estimatedCapacityKW = Math.max(1, Math.round((formData.monthlyBill / 900) * 10) / 10);
  const estimatedSubsidy = formData.category === 'Residential'
    ? estimatedCapacityKW <= 1 ? 30000 : estimatedCapacityKW <= 2 ? 60000 : 78000
    : 0;
  const approxMonthlySavings = Math.round(formData.monthlyBill * 0.85);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.phone) return;

    // Send via WhatsApp
    const message = encodeURIComponent(
      `*New Free Solar Quote Request*\n\n` +
      `👤 *Name:* ${formData.fullName}\n` +
      `📞 *Phone:* ${formData.phone}\n` +
      `📍 *City:* ${formData.city || 'Not specified'}\n` +
      `⚡ *Monthly Bill:* ₹${formData.monthlyBill.toLocaleString('en-IN')}\n` +
      `🏠 *Category:* ${formData.category}\n` +
      `🏗️ *Roof Type:* ${formData.roofType}\n` +
      `☀️ *Recommended System:* ${estimatedCapacityKW} kW\n` +
      `💰 *Estimated Subsidy:* ₹${estimatedSubsidy.toLocaleString('en-IN')}\n\n` +
      `_Requested from SB Solar Energy Website_`
    );

    const whatsappUrl = `https://wa.me/917023204664?text=${message}`;
    window.open(whatsappUrl, '_blank');
    setSubmitted(true);
  };

  const handleReset = () => {
    setSubmitted(false);
    onClose();
  };

  if (typeof document === 'undefined') return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[99999] overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm"
          />

          {/* Centering wrapper */}
          <div className="min-h-full flex items-center justify-center p-3 sm:p-6 relative pointer-events-none">
            {/* Modal Container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ type: "spring", duration: 0.35 }}
              onClick={(e) => e.stopPropagation()}
              className="relative bg-white rounded-2xl shadow-2xl w-full max-w-xl overflow-hidden z-10 border border-slate-100 my-auto pointer-events-auto text-left"
            >
            {/* Header with vibrant solar gradient */}
            <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 px-6 py-5 text-white relative">
              <button
                onClick={onClose}
                className="absolute top-4 right-4 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 rounded-full p-1.5 transition-colors"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-2 mb-1">
                <span className="bg-white/20 backdrop-blur-md text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full flex items-center gap-1">
                  <Sparkles className="w-3 h-3" /> 100% Free &amp; No Obligation
                </span>
                <span className="bg-green-500/90 text-[11px] font-bold px-2 py-0.5 rounded-full">
                  Up to ₹78,000 Subsidy
                </span>
              </div>

              <h2 className="text-xl md:text-2xl font-black tracking-tight flex items-center gap-2">
                <Sun className="w-6 h-6 text-yellow-200 fill-yellow-200 animate-spin-slow" />
                Get Instant Free Solar Quote
              </h2>
              <p className="text-amber-100 text-xs sm:text-sm mt-1">
                Check recommended system size, estimated subsidy &amp; monthly savings in 30 seconds.
              </p>
            </div>

            {submitted ? (
              <div className="p-8 text-center space-y-4">
                <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-bold text-slate-800">Quote Request Submitted!</h3>
                <p className="text-slate-600 max-w-md mx-auto text-sm leading-relaxed">
                  Thank you, <span className="font-semibold text-slate-800">{formData.fullName}</span>! We have opened WhatsApp to connect with our solar specialist. Our technical engineer will also review your requirements and provide you with an accurate quotation shortly.
                </p>

                <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 max-w-md mx-auto text-left text-sm space-y-2">
                  <div className="flex justify-between text-slate-700">
                    <span>Recommended Capacity:</span>
                    <strong className="text-primary font-bold">{estimatedCapacityKW} kW</strong>
                  </div>
                  <div className="flex justify-between text-slate-700">
                    <span>Govt Subsidy:</span>
                    <strong className="text-green-600 font-bold">Up to ₹{estimatedSubsidy.toLocaleString('en-IN')}</strong>
                  </div>
                  <div className="flex justify-between text-slate-700">
                    <span>Est. Monthly Savings:</span>
                    <strong className="text-slate-900 font-bold">~₹{approxMonthlySavings.toLocaleString('en-IN')}/mo</strong>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    onClick={handleReset}
                    className="bg-primary text-white font-semibold px-6 py-2.5 rounded-lg hover:bg-primary-hover transition-colors shadow-md text-sm"
                  >
                    Done / Close
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="p-5 sm:p-6 space-y-5">
                {/* Live Estimator Preview Card */}
                <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white p-4 rounded-xl shadow-md border border-slate-700 grid grid-cols-3 gap-2 text-center">
                  <div className="border-r border-slate-700 pr-2">
                    <span className="text-[11px] text-slate-400 block font-medium">System Size</span>
                    <span className="text-base sm:text-xl font-bold text-amber-400 flex items-center justify-center gap-1">
                      <Zap className="w-4 h-4 fill-amber-400" /> {estimatedCapacityKW} kW
                    </span>
                  </div>
                  <div className="border-r border-slate-700 px-2">
                    <span className="text-[11px] text-slate-400 block font-medium">Govt Subsidy</span>
                    <span className="text-base sm:text-xl font-bold text-green-400">
                      ₹{estimatedSubsidy > 0 ? `${(estimatedSubsidy / 1000).toFixed(0)}k` : 'N/A'}
                    </span>
                  </div>
                  <div className="pl-2">
                    <span className="text-[11px] text-slate-400 block font-medium">Monthly Savings</span>
                    <span className="text-base sm:text-xl font-bold text-cyan-300">
                      ~₹{approxMonthlySavings.toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>

                {/* Form Inputs */}
                <div className="space-y-4">
                  {/* Monthly Bill Slider */}
                  <div>
                    <div className="flex justify-between text-sm font-semibold text-slate-700 mb-1">
                      <label htmlFor="quote-bill">Average Monthly Electricity Bill:</label>
                      <span className="text-orange-600 font-bold text-base">₹{formData.monthlyBill.toLocaleString('en-IN')} / month</span>
                    </div>
                    <input
                      id="quote-bill"
                      type="range"
                      min={800}
                      max={20000}
                      step={100}
                      value={formData.monthlyBill}
                      onChange={(e) => setFormData({ ...formData, monthlyBill: Number(e.target.value) })}
                      className="w-full accent-orange-500 h-2 bg-slate-200 rounded-lg cursor-pointer"
                    />
                    <div className="flex justify-between text-[11px] text-slate-400 mt-1">
                      <span>₹800</span>
                      <span>₹5,000</span>
                      <span>₹10,000</span>
                      <span>₹20,000+</span>
                    </div>
                  </div>

                  {/* Personal info */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div>
                      <label className="text-xs font-semibold text-slate-700 block mb-1">
                        Your Full Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Ramesh Sharma"
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-100 outline-none text-sm transition-all"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-slate-700 block mb-1">
                        Mobile Number <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="e.g. 9876543210"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-100 outline-none text-sm transition-all"
                      />
                    </div>
                  </div>

                  {/* City & Category */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div>
                      <label className="text-xs font-semibold text-slate-700 block mb-1">
                        City / District
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Jaipur, Rajasthan"
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-100 outline-none text-sm transition-all"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-slate-700 block mb-1">
                        Connection Type
                      </label>
                      <select
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-100 outline-none text-sm bg-white"
                      >
                        <option value="Residential">Residential (Home / Rooftop)</option>
                        <option value="Commercial">Commercial / Office / Shop</option>
                        <option value="Industrial">Industrial / Factory</option>
                        <option value="Agricultural">Agricultural / Solar Water Pump</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Trust Badges */}
                <div className="flex items-center justify-between py-2 border-t border-slate-100 text-[11px] text-slate-500">
                  <span className="flex items-center gap-1">
                    <ShieldCheck className="w-4 h-4 text-green-600" /> MNRE Approved &amp; Tier-1
                  </span>
                  <span className="flex items-center gap-1">
                    <CheckCircle2 className="w-4 h-4 text-primary" /> 25-Year Panel Warranty
                  </span>
                  <span className="hidden sm:flex items-center gap-1">
                    <PhoneCall className="w-4 h-4 text-orange-500" /> Instant Callback
                  </span>
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 hover:from-orange-600 hover:to-amber-600 text-white font-bold text-base shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40 transition-all flex items-center justify-center gap-2 group cursor-pointer"
                >
                  <span>Get My Free Quote on WhatsApp</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </form>
            )}
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
};

export default FreeSolarQuoteModal;
