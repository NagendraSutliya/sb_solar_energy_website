import AnimatedBackground from '../components/AnimatedBackground';
import { useParams, Link, useNavigate, Navigate } from 'react-router-dom';
import { productsData } from '../data/products';
import { ArrowLeft, Cpu, Settings } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '../components/ui/Button';
import { useEffect, useState } from 'react';

const ProductDetail = () => {
  const { productId } = useParams<{ productId: string }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'technology' | 'features'>('features');
  
  // Scroll to top when loading a new product page
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [productId]);
  
  const product = productId ? productsData[productId] : null;

  if (!product) {
    return <Navigate to="/products" replace />;
  }

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">

      {/* Hero Section */}
      <section className="relative pt-8 pb-16 md:pt-12 md:pb-24 overflow-hidden bg-[#050b14] z-10">
      <AnimatedBackground />
        {/* Deep background mesh/glow */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-cyan-900/10 via-[#050b14] to-[#050b14] pointer-events-none"></div>
        
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Top Navigation Bar: Back Link on Left & All Products Navigator in Single Line on Right */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8 border-b border-slate-800/80 pb-4">
            <Link to="/products" className="inline-flex items-center text-cyan-500/80 hover:text-cyan-300 transition-colors text-sm font-medium shrink-0">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Products
            </Link>

            {/* All Products in Single Horizontal Line */}
            <div className="flex items-center gap-2 overflow-x-auto max-w-full pb-1 sm:pb-0 [&::-webkit-scrollbar]:h-1 [&::-webkit-scrollbar-thumb]:bg-slate-700/50 [&::-webkit-scrollbar-thumb]:rounded-full">
              {Object.values(productsData).map((item) => {
                const isActive = item.id === product.id;
                const shortTitle = item.id === 'pv-module' ? 'PV Module'
                  : item.id === 'street-light' ? 'Street Light'
                  : item.id === 'water-pump' ? 'Water Pump'
                  : item.id === 'inverters' ? 'Inverters'
                  : item.id === 'batteries' ? 'Batteries'
                  : 'Accessories';

                return (
                  <Link
                    key={item.id}
                    to={`/products/${item.id}`}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all duration-200 shrink-0 ${
                      isActive
                        ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400 font-semibold shadow-[0_0_12px_rgba(34,211,238,0.25)]'
                        : 'bg-slate-900/80 text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800'
                    }`}
                  >
                    <img 
                      src={item.image} 
                      alt={item.title} 
                      className="w-4 h-4 object-contain rounded shrink-0" 
                    />
                    <span>{shortTitle}</span>
                    {isActive && (
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_6px_rgba(34,211,238,1)]"></span>
                    )}
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Animated Product Content with upward slide transition on product switch */}
          <AnimatePresence mode="wait">
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -40 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Header & Title - Left Top Corner */}
              <div className="text-left mb-2 md:mb-4 max-w-xl relative z-20 pointer-events-auto">
                <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-3">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 drop-shadow-[0_0_15px_rgba(34,211,238,0.3)]">
                    {product.title}
                  </span>
                </h1>
            <div className="space-y-1.5 max-w-lg">
              <h2 className="text-xs md:text-sm font-semibold uppercase tracking-wider text-yellow-400">
                Product Overview
              </h2>
              <p className="text-slate-300 text-sm md:text-base font-light leading-relaxed">
                {product.description}
              </p>
            </div>
          </div>

          {/* Radial Layout Desktop (Shifted Upwards in Center) */}
          <div className="relative w-full max-w-5xl mx-auto h-[450px] md:h-[600px] flex items-center justify-center -mt-12 md:-mt-28 lg:-mt-36">
            
            {/* Background Glows */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] max-w-[300px] aspect-square md:w-[450px] md:h-[450px] bg-cyan-500/5 rounded-full blur-[80px] pointer-events-none"></div>

            {/* Orbit Rings Container with Ring-Attached Right Items */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] max-w-[300px] aspect-square md:w-[500px] md:h-[500px] rounded-full border border-slate-700/50 flex items-center justify-center bg-[#0a1220]/50 shadow-inner">
              
              {/* Spinning Ring 1 (Bright Cyan with Orbiting Beacon) */}
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                className="absolute w-full h-full rounded-full border-t-2 border-r-2 border-cyan-400/80 shadow-[0_0_15px_rgba(34,211,238,0.3)] pointer-events-none"
              >
                {/* Orbiting Glowing Bead */}
                <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3.5 h-3.5 rounded-full bg-cyan-400 shadow-[0_0_15px_rgba(34,211,238,1)] border border-white"></div>
              </motion.div>
              
              {/* Spinning Ring 2 (Dashed Blue with Reverse Orbiting Beacon) */}
              <motion.div 
                animate={{ rotate: -360 }}
                transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
                className="absolute inset-[-8%] rounded-full border-2 border-dashed border-blue-400/50 shadow-[0_0_12px_rgba(96,165,250,0.2)] pointer-events-none"
              >
                {/* Orbiting Glowing Bead 2 */}
                <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-blue-400 shadow-[0_0_12px_rgba(96,165,250,1)] border border-white"></div>
              </motion.div>

              {/* Central Product Image */}
              <motion.div 
                key={`img-${product.id}`}
                initial={{ scale: 0.8, opacity: 0, y: 25 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                className={`relative z-20 flex items-center justify-center pointer-events-none w-auto ${
                  product.id === 'accessories'
                    ? 'h-[240px] md:h-[340px] lg:h-[380px] max-w-[220px] md:max-w-[320px]'
                    : 'h-[260px] sm:h-[320px] md:h-[580px] lg:h-[660px] max-w-[240px] sm:max-w-[280px] md:max-w-[420px] lg:max-w-[460px]'
                }`}
              >
                <img 
                  src={product.image} 
                  alt={product.title} 
                  className="w-full h-full object-contain drop-shadow-[0_0_35px_rgba(255,255,255,0.25)]" 
                />
              </motion.div>

              {/* ATTACHED ON RING (RIGHT ARC): Dynamic Items docked directly on the circular ring perimeter */}
              <div className="absolute inset-0 pointer-events-none hidden sm:block">
                {activeTab === 'technology' ? (
                  // Technology Specs along right arc (4 items at 15%, 38%, 62%, 85%)
                  product.specs.map((spec, idx) => {
                    const positions = [
                      { left: '92%', top: '15%' },
                      { left: '102%', top: '38%' },
                      { left: '100%', top: '62%' },
                      { left: '85%', top: '85%' },
                    ];
                    const pos = positions[idx] || { left: '90%', top: `${20 + idx * 20}%` };

                    return (
                      <motion.div
                        key={`spec-${idx}`}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: idx * 0.08 }}
                        style={{ left: pos.left, top: pos.top }}
                        className="absolute -translate-y-1/2 flex items-center pointer-events-auto z-30 group"
                      >
                        {/* Socket directly on the ring */}
                        <div className="relative w-8 h-8 md:w-10 md:h-10 rounded-full border-2 border-cyan-400 bg-slate-900 flex items-center justify-center shadow-[0_0_15px_rgba(34,211,238,0.5)] shrink-0 group-hover:scale-110 transition-transform">
                          <div className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,1)]"></div>
                          {/* Anchor line into ring */}
                          <div className="absolute -left-2 top-1/2 -translate-y-1/2 w-2 h-[2px] bg-cyan-400"></div>
                        </div>

                        {/* Label & Value extending to the right */}
                        <div className="ml-3 text-left whitespace-nowrap bg-[#0a1220]/80 backdrop-blur-sm px-3 py-1.5 rounded-xl border border-slate-800/80 group-hover:border-cyan-500/50 transition-colors shadow-lg">
                          <div className="text-cyan-400 font-semibold text-[10px] uppercase tracking-wider">{spec.label}</div>
                          <div className="text-white font-medium text-xs md:text-sm drop-shadow-sm">{spec.value}</div>
                        </div>
                      </motion.div>
                    );
                  })
                ) : (
                  // Key Features along right arc (5 items at 12%, 30%, 50%, 70%, 88%)
                  product.features.slice(0, 5).map((feature, idx) => {
                    const positions = [
                      { left: '87%', top: '10%' },
                      { left: '98%', top: '25%' },
                      { left: '102%', top: '45%' },
                      { left: '99%', top: '65%' },
                      { left: '85%', top: '85%' },
                    ];
                    const pos = positions[idx] || { left: '90%', top: `${15 + idx * 18}%` };

                    return (
                      <motion.div
                        key={`feat-${idx}`}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: idx * 0.08 }}
                        style={{ left: pos.left, top: pos.top }}
                        className="absolute -translate-y-1/2 flex items-center pointer-events-auto z-30 group max-w-[220px] md:max-w-[280px]"
                      >
                        {/* Socket directly on the ring */}
                        <div className="relative w-7 h-7 md:w-8 md:h-8 rounded-full border-2 border-cyan-400/80 bg-slate-900 flex items-center justify-center shadow-[0_0_12px_rgba(34,211,238,0.4)] shrink-0 group-hover:scale-110 transition-transform">
                          <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,1)]"></div>
                          {/* Anchor line into ring */}
                          <div className="absolute -left-2 top-1/2 -translate-y-1/2 w-2 h-[2px] bg-cyan-400"></div>
                        </div>

                        {/* Feature text extending to the right */}
                        <div className="ml-3 text-left whitespace-nowrap bg-[#0a1220]/75 backdrop-blur-sm px-3 py-1.5 rounded-xl border border-slate-800/80 group-hover:border-cyan-500/50 transition-colors shadow-md">
                          <span className="text-slate-200 font-medium text-[11px] md:text-xs leading-snug group-hover:text-cyan-200 transition-colors block">
                            {feature}
                          </span>
                        </div>
                      </motion.div>
                    );
                  })
                )}
              </div>

            </div>

            {/* Left Nodes (Interactive Toggle: Technology & Key Features) */}
            <div className="absolute left-0 md:left-4 lg:left-12 top-1/2 -translate-y-1/2 flex flex-col gap-12 md:gap-24 z-30 hidden sm:flex">
              
              {/* Technology Option */}
              <button 
                type="button"
                onClick={() => setActiveTab('technology')}
                className={`flex items-center gap-4 group cursor-pointer text-left transition-all ${
                  activeTab === 'technology' ? 'opacity-100 scale-105' : 'opacity-70 hover:opacity-100'
                }`}
              >
                <span className={`font-semibold text-sm md:text-base tracking-widest uppercase transition-colors ${
                  activeTab === 'technology' ? 'text-cyan-300 drop-shadow-[0_0_8px_rgba(34,211,238,0.5)]' : 'text-slate-300 group-hover:text-white'
                }`}>
                  Technology
                </span>
                <div className={`w-10 h-10 md:w-14 md:h-14 rounded-full border-2 bg-[#050b14] flex items-center justify-center transition-all duration-300 relative ${
                  activeTab === 'technology' 
                    ? 'border-cyan-400 shadow-[0_0_25px_rgba(34,211,238,0.6)] bg-cyan-950/40 ring-2 ring-cyan-400/30' 
                    : 'border-slate-700/80 group-hover:border-cyan-500/50 shadow-[0_0_10px_rgba(0,0,0,0.5)]'
                }`}>
                   <Cpu className={`h-5 w-5 md:h-6 md:w-6 transition-transform group-hover:scale-110 ${
                     activeTab === 'technology' ? 'text-cyan-300' : 'text-slate-400 group-hover:text-cyan-400'
                   }`} />
                   {/* Connector Line */}
                   <div className={`absolute right-[-20px] md:right-[-40px] top-1/2 h-[1px] w-[20px] md:w-[40px] transition-all ${
                     activeTab === 'technology' 
                       ? 'bg-gradient-to-r from-cyan-400 to-cyan-500/40 shadow-[0_0_6px_rgba(34,211,238,0.8)]' 
                       : 'bg-gradient-to-r from-slate-700 to-transparent'
                   }`}></div>
                </div>
              </button>
              
              {/* Key Features Option */}
              <button 
                type="button"
                onClick={() => setActiveTab('features')}
                className={`flex items-center gap-4 group cursor-pointer text-left transition-all ${
                  activeTab === 'features' ? 'opacity-100 scale-105' : 'opacity-70 hover:opacity-100'
                }`}
              >
                <span className={`font-semibold text-sm md:text-base tracking-widest uppercase transition-colors ${
                  activeTab === 'features' ? 'text-cyan-300 drop-shadow-[0_0_8px_rgba(34,211,238,0.5)]' : 'text-slate-300 group-hover:text-white'
                }`}>
                  Key Features
                </span>
                <div className={`w-10 h-10 md:w-14 md:h-14 rounded-full border-2 bg-[#050b14] flex items-center justify-center transition-all duration-300 relative ${
                  activeTab === 'features' 
                    ? 'border-cyan-400 shadow-[0_0_25px_rgba(34,211,238,0.6)] bg-cyan-950/40 ring-2 ring-cyan-400/30' 
                    : 'border-slate-700/80 group-hover:border-cyan-500/50 shadow-[0_0_10px_rgba(0,0,0,0.5)]'
                }`}>
                   <Settings className={`h-5 w-5 md:h-6 md:w-6 transition-transform group-hover:scale-110 ${
                     activeTab === 'features' ? 'text-cyan-300' : 'text-slate-400 group-hover:text-cyan-400'
                   }`} />
                   {/* Connector Line */}
                   <div className={`absolute right-[-20px] md:right-[-40px] top-1/2 h-[1px] w-[20px] md:w-[40px] transition-all ${
                     activeTab === 'features' 
                       ? 'bg-gradient-to-r from-cyan-400 to-cyan-500/40 shadow-[0_0_6px_rgba(34,211,238,0.8)]' 
                       : 'bg-gradient-to-r from-slate-700 to-transparent'
                   }`}></div>
                </div>
              </button>

            </div>

          </div>

          {/* Mobile Fallback Toggle & List */}
          <div className="mt-8 sm:hidden space-y-4 px-2">
            <div className="flex rounded-xl bg-slate-900/80 p-1 border border-slate-800">
              <button
                type="button"
                onClick={() => setActiveTab('features')}
                className={`flex-1 py-2 rounded-lg text-xs font-semibold transition-all ${
                  activeTab === 'features' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/40' : 'text-slate-400'
                }`}
              >
                Key Features
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('technology')}
                className={`flex-1 py-2 rounded-lg text-xs font-semibold transition-all ${
                  activeTab === 'technology' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/40' : 'text-slate-400'
                }`}
              >
                Technology Specs
              </button>
            </div>

            {activeTab === 'technology' ? (
              <div className="grid grid-cols-2 gap-2">
                {product.specs.map((spec, idx) => (
                  <div key={idx} className="bg-[#0a1220] p-3 rounded-xl border border-slate-800 flex flex-col">
                    <span className="text-cyan-400 text-[10px] uppercase tracking-wider font-semibold">{spec.label}</span>
                    <span className="text-white text-xs font-medium mt-0.5">{spec.value}</span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-2">
                {product.features.map((feature, idx) => (
                  <div key={idx} className="flex items-start gap-3 bg-[#0a1220] p-3 rounded-xl border border-slate-800">
                    <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-1.5 shrink-0 shadow-[0_0_8px_rgba(34,211,238,1)]"></div>
                    <span className="text-slate-300 text-xs leading-relaxed">{feature}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="mt-12 text-center">
            <Button onClick={() => navigate('/contact')} size="lg" className="bg-cyan-500 text-slate-900 hover:bg-cyan-400 shadow-[0_0_20px_rgba(34,211,238,0.4)] border-0 font-bold tracking-wide rounded-full px-8">
              Request a Quote
            </Button>
          </div>

            </motion.div>
          </AnimatePresence>

        </div>
      </section>

      {/* Content Section */}
      {/* <section className="py-12 md:py-16 bg-white relative overflow-hidden z-10">
      <AnimatedBackground />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
            
            <div className="lg:col-span-7">
              <h2 className="text-3xl font-bold text-slate-900 mb-6">Product Overview</h2>
              <div className="w-16 h-1 bg-primary rounded-full mb-8"></div>
              <p className="text-lg text-slate-600 leading-relaxed mb-12">
                {product.description}
              </p>
              
              <h3 className="text-2xl font-bold text-slate-900 mb-6 flex items-center">
                <Zap className="h-6 w-6 text-amber-500 mr-3" />
                Key Features
              </h3>
              <ul className="space-y-4">
                {product.features.map((feature, i) => (
                  <motion.li 
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-start"
                  >
                    <CheckCircle2 className="h-6 w-6 text-primary shrink-0 mr-3" />
                    <span className="text-slate-700 leading-relaxed">{feature}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
            
            <div className="lg:col-span-5">
              <div className="bg-slate-50 rounded-3xl p-8 border border-slate-100 shadow-sm">
                <h3 className="text-xl font-bold text-slate-900 mb-6 border-b border-slate-200 pb-4">
                  Technical Specifications
                </h3>
                <div className="space-y-6">
                  {product.specs.map((spec, i) => (
                    <div key={i} className="flex justify-between items-center">
                      <span className="text-slate-500 font-medium">{spec.label}</span>
                      <span className="text-slate-900 font-bold text-right">{spec.value}</span>
                    </div>
                  ))}
                </div>
                
                <div className="mt-10 pt-8 border-t border-slate-200">
                  <p className="text-sm text-slate-500 mb-4 text-center">Ready to upgrade your energy infrastructure?</p>
                  <Button onClick={() => navigate('/contact')} className="w-full h-14 text-lg shadow-lg shadow-primary/20 hover:-translate-y-1 transition-transform">
                    Contact Sales Team
                  </Button>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section> */}
    </div>
  );
};

export default ProductDetail;
