import { motion } from 'framer-motion';
import { PiggyBank, Settings, Smartphone, CheckCircle, ChevronRight, Award } from 'lucide-react';
import { Link } from 'react-router-dom';

const SbSolarProtection = () => {
  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 text-sm text-slate-500 mb-8">
          <Link to="/" className="hover:text-primary transition-colors">Home</Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-slate-800 font-medium">SB Solar Protection</span>
        </div>

        {/* Hero Section */}
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-100">
          <div className="flex flex-col lg:flex-row">
            
            {/* Image Side */}
            <div className="lg:w-1/2 p-8 lg:p-12 bg-gradient-to-br from-indigo-50 to-blue-50 flex items-center justify-center relative">
              <div className="absolute inset-0 bg-blue-400/20 blur-3xl rounded-full scale-110"></div>
              <motion.img 
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.6 }}
                src="/brand_images/sb_solar.jpeg" 
                alt="SB Solar Protection" 
                className="w-full max-w-md object-contain relative z-10 drop-shadow-2xl rounded-xl border-4 border-white shadow-lg"
              />
            </div>
            
            {/* Content Side */}
            <div className="lg:w-1/2 p-8 lg:p-16 flex flex-col justify-center">
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <div className="inline-flex items-center space-x-2 bg-blue-100 text-[#1e3a8a] px-4 py-2 rounded-full font-bold text-sm mb-6">
                  <Award className="w-4 h-4" />
                  <span>Premium Protection Plan</span>
                </div>
                
                <h1 className="text-4xl lg:text-5xl font-black text-slate-900 mb-4 tracking-tight">
                  SB SOLAR PROTECTION<sup className="text-2xl ml-1">™</sup>
                </h1>
                
                <p className="text-2xl font-bold text-[#10b981] mb-6">
                  25 Years of Trusted Solar Performance
                </p>
                
                <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                  Experience true peace of mind with India's only Guaranteed Solar Savings & Protection Plan. We ensure your solar investment yields maximum returns with zero maintenance hassles.
                </p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="flex items-start space-x-3">
                    <div className="p-2 bg-blue-50 rounded-lg text-blue-600 mt-1">
                      <CheckCircle className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900">Guaranteed Generation</h4>
                      <p className="text-sm text-slate-500 mt-1">Assured power output year after year.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="p-2 bg-green-50 rounded-lg text-green-600 mt-1">
                      <PiggyBank className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900">Savings Protection</h4>
                      <p className="text-sm text-slate-500 mt-1">Money-back promise at Rs. 8/unit.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="p-2 bg-orange-50 rounded-lg text-orange-600 mt-1">
                      <Settings className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900">Zero Repair Cost</h4>
                      <p className="text-sm text-slate-500 mt-1">₹0 Repair & Replacement Cost.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="p-2 bg-purple-50 rounded-lg text-purple-600 mt-1">
                      <Smartphone className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900">Real-time Tracking</h4>
                      <p className="text-sm text-slate-500 mt-1">App to track real-time power generation.</p>
                    </div>
                  </div>
                </div>

              </motion.div>
            </div>
          </div>
        </div>

        {/* Core Pillars Section */}
        <div className="mt-20 mb-12">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center space-x-2 bg-green-100 text-green-700 px-4 py-2 rounded-full font-bold text-sm mb-4">
              <Award className="w-4 h-4" />
              <span>Core Benefits</span>
            </div>
            <h2 className="text-3xl lg:text-4xl font-black text-slate-900 mb-4">The Three Pillars of Protection</h2>
            <p className="text-lg text-slate-600">The SB Solar Protection guarantee is built on three foundational pillars designed to give you complete peace of mind and maximum return on investment.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              className="bg-white rounded-3xl p-8 shadow-xl border border-slate-100 hover:shadow-2xl transition-all hover:-translate-y-2 group"
            >
              <div className="w-16 h-16 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                <CheckCircle className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">Guaranteed Generation</h3>
              <p className="text-slate-600 leading-relaxed mb-6">
                We guarantee that your solar setup will generate the promised power year after year. If generation falls below the guaranteed threshold, we compensate you for the shortfall.
              </p>
              <ul className="space-y-3">
                <li className="flex items-center text-sm text-slate-700 font-medium">
                  <CheckCircle className="w-4 h-4 text-blue-500 mr-2" /> 25 Years Assurance
                </li>
                <li className="flex items-center text-sm text-slate-700 font-medium">
                  <CheckCircle className="w-4 h-4 text-blue-500 mr-2" /> Real-time Performance Tracking
                </li>
                <li className="flex items-center text-sm text-slate-700 font-medium">
                  <CheckCircle className="w-4 h-4 text-blue-500 mr-2" /> Annual Output Audits
                </li>
              </ul>
            </motion.div>

            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-3xl p-8 shadow-xl border border-slate-100 hover:shadow-2xl transition-all hover:-translate-y-2 group"
            >
              <div className="w-16 h-16 rounded-2xl bg-green-50 text-green-600 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-green-600 group-hover:text-white transition-all duration-300">
                <PiggyBank className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">Savings Protection</h3>
              <p className="text-slate-600 leading-relaxed mb-6">
                Protect your savings with our exclusive money-back promise. We offer a guaranteed rate of Rs. 8/unit for any shortfall, securing your financial return.
              </p>
              <ul className="space-y-3">
                <li className="flex items-center text-sm text-slate-700 font-medium">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" /> Money-back Promise @ Rs.8/unit
                </li>
                <li className="flex items-center text-sm text-slate-700 font-medium">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" /> Zero Hidden Charges
                </li>
                <li className="flex items-center text-sm text-slate-700 font-medium">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" /> Guaranteed ROI
                </li>
              </ul>
            </motion.div>

            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-3xl p-8 shadow-xl border border-slate-100 hover:shadow-2xl transition-all hover:-translate-y-2 group"
            >
              <div className="w-16 h-16 rounded-2xl bg-orange-50 text-orange-600 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-orange-600 group-hover:text-white transition-all duration-300">
                <Settings className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">Service Support</h3>
              <p className="text-slate-600 leading-relaxed mb-6">
                Never worry about maintenance again. Our proactive service ensures your system is always running at peak efficiency with zero repair and replacement costs.
              </p>
              <ul className="space-y-3">
                <li className="flex items-center text-sm text-slate-700 font-medium">
                  <CheckCircle className="w-4 h-4 text-orange-500 mr-2" /> ₹0 Repair & Replacement Cost
                </li>
                <li className="flex items-center text-sm text-slate-700 font-medium">
                  <CheckCircle className="w-4 h-4 text-orange-500 mr-2" /> Proactive Maintenance Visits
                </li>
                <li className="flex items-center text-sm text-slate-700 font-medium">
                  <CheckCircle className="w-4 h-4 text-orange-500 mr-2" /> Priority Support Desk
                </li>
              </ul>
            </motion.div>
          </div>
        </div>

        {/* 3kW Example Section */}
        <div className="mb-16 bg-gradient-to-br from-[#0d1b4a] to-[#1a2f6c] rounded-3xl p-8 lg:p-12 shadow-2xl relative overflow-hidden text-white border border-blue-800">
          <div className="absolute top-0 right-0 opacity-10 transform translate-x-1/4 -translate-y-1/4">
            <Settings className="w-96 h-96" />
          </div>
          
          <div className="relative z-10">
            <h3 className="text-3xl font-black mb-2 text-yellow-400 tracking-tight">3kW Solar System Plan</h3>
            <p className="text-blue-200 mb-8 text-lg font-medium">Yearly Generation Plan - See how we protect your investment.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-inner">
                <div className="text-blue-300 text-sm font-bold uppercase tracking-wider mb-2">Annual Guaranteed Generation</div>
                <div className="text-3xl font-black text-white">4,200-4,500 <span className="text-base font-medium opacity-80 block mt-1">Units / Year</span></div>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-inner">
                <div className="text-orange-300 text-sm font-bold uppercase tracking-wider mb-2">Target Generation</div>
                <div className="text-3xl font-black text-white">350-375 <span className="text-base font-medium opacity-80 block mt-1">Units / Month</span></div>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-inner">
                <div className="text-green-300 text-sm font-bold uppercase tracking-wider mb-2">Return / Compensation</div>
                <div className="text-xl font-bold text-white mb-2 leading-tight">Guarantee of 4,200 Units</div>
                <div className="text-lg font-bold text-green-400 bg-green-900/40 inline-block px-3 py-1 rounded-lg">₹8/- Unit Return</div>
              </div>
              
              <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl p-6 border border-green-400 shadow-xl relative overflow-hidden group">
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out"></div>
                <div className="relative z-10">
                  <div className="text-white/90 text-sm font-bold uppercase tracking-wider mb-3 border-b border-white/30 pb-2">Example</div>
                  <div className="text-sm font-medium mb-1">If 4,000 Units in a year</div>
                  <div className="text-sm font-medium mb-3 opacity-90">Shortfall = 200 Units × ₹8</div>
                  <div className="text-2xl sm:text-3xl font-black text-yellow-300 drop-shadow-md bg-black/20 rounded-lg p-2 inline-block">₹1,600/- Return</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Subsidy and Features Section */}
        <div className="mb-20">
          <div className="bg-white rounded-3xl p-8 lg:p-12 shadow-xl border border-slate-100 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-red-50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 z-0"></div>
            
            <div className="flex flex-col lg:flex-row gap-12 items-center relative z-10">
              
              {/* Subsidy Box */}
              <div className="lg:w-1/3 text-center w-full">
                <div className="bg-gradient-to-b from-blue-50 to-white border-2 border-blue-200 rounded-3xl p-8 relative shadow-lg transform hover:-translate-y-1 transition-transform">
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-blue-600 text-white px-5 py-1.5 rounded-full text-sm font-bold shadow-md whitespace-nowrap">
                    State Govt Subsidy
                  </div>
                  <h3 className="text-5xl lg:text-6xl font-black text-blue-700 mb-2 drop-shadow-sm tracking-tighter">78,000/-</h3>
                  <p className="text-xl font-bold text-slate-800 mb-3">Up to ₹</p>
                  <p className="text-2xl font-black text-red-600 bg-red-50 py-3 rounded-xl border border-red-100 shadow-inner tracking-tight">Avail Subsidy Benefits</p>
                  <div className="mt-5 text-sm font-bold text-slate-500 bg-slate-100 py-1.5 rounded-lg">17,000/- (State Govt Subsidy)</div>
                </div>
              </div>
              
              {/* Features List */}
              <div className="lg:w-2/3 w-full">
                <div className="inline-block bg-[#1e3a8a] text-white px-8 py-3 rounded-2xl font-black text-xl mb-8 shadow-lg tracking-wide border-b-4 border-blue-900">
                  Our Key Features:-
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-8">
                  <div className="flex items-start space-x-4 p-3 hover:bg-slate-50 rounded-xl transition-colors">
                    <div className="mt-1 w-7 h-7 rounded-full bg-red-100 text-red-600 flex items-center justify-center shrink-0 shadow-sm border border-red-200">
                      <div className="w-2.5 h-2.5 rounded-full bg-red-600 shadow-sm"></div>
                    </div>
                    <span className="text-lg font-bold text-slate-800 leading-tight">Govt. Subsidy & Net Metering Facility</span>
                  </div>
                  
                  <div className="flex items-start space-x-4 p-3 hover:bg-slate-50 rounded-xl transition-colors">
                    <div className="mt-1 w-7 h-7 rounded-full bg-red-100 text-red-600 flex items-center justify-center shrink-0 shadow-sm border border-red-200">
                      <div className="w-2.5 h-2.5 rounded-full bg-red-600 shadow-sm"></div>
                    </div>
                    <span className="text-lg font-bold text-slate-800 leading-tight">Premium Brand Panels & Inverters</span>
                  </div>
                  
                  <div className="flex items-start space-x-4 p-3 hover:bg-slate-50 rounded-xl transition-colors">
                    <div className="mt-1 w-7 h-7 rounded-full bg-red-100 text-red-600 flex items-center justify-center shrink-0 shadow-sm border border-red-200">
                      <div className="w-2.5 h-2.5 rounded-full bg-red-600 shadow-sm"></div>
                    </div>
                    <span className="text-lg font-bold text-slate-800 leading-tight">Easy EMI & Financing Options</span>
                  </div>
                  
                  <div className="flex items-start space-x-4 p-3 hover:bg-slate-50 rounded-xl transition-colors">
                    <div className="mt-1 w-7 h-7 rounded-full bg-red-100 text-red-600 flex items-center justify-center shrink-0 shadow-sm border border-red-200">
                      <div className="w-2.5 h-2.5 rounded-full bg-red-600 shadow-sm"></div>
                    </div>
                    <span className="text-lg font-bold text-slate-800 leading-tight">Fast Installation & After-Sales Support</span>
                  </div>
                  
                  <div className="flex items-start space-x-4 p-3 hover:bg-slate-50 rounded-xl transition-colors md:col-span-2">
                    <div className="mt-1 w-7 h-7 rounded-full bg-red-100 text-red-600 flex items-center justify-center shrink-0 shadow-sm border border-red-200">
                      <div className="w-2.5 h-2.5 rounded-full bg-red-600 shadow-sm"></div>
                    </div>
                    <span className="text-lg font-bold text-slate-800 leading-tight">Free Site Survey & Consultation</span>
                  </div>
                </div>
              </div>
              
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          className="mt-16 bg-slate-900 rounded-3xl p-8 lg:p-12 text-center relative overflow-hidden"
        >
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:20px_20px]"></div>
          <div className="relative z-10">
            <h2 className="text-3xl font-black text-white mb-4">Ready to secure your solar future?</h2>
            <p className="text-slate-300 mb-8 max-w-2xl mx-auto text-lg">
              Join thousands of satisfied customers who have chosen SB Solar Protection for their energy needs.
            </p>
            <Link 
              to="/contact" 
              className="inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-slate-900 bg-white hover:bg-slate-100 rounded-xl transition-all hover:scale-105 shadow-xl hover:shadow-2xl"
            >
              Get Started Today
            </Link>
          </div>
        </motion.div>

      </div>
    </div>
  );
};

export default SbSolarProtection;
