import AnimatedBackground from '../components/AnimatedBackground';
import { ArrowRight, Download, Zap, Settings } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { motion } from 'framer-motion';

const Products = () => {
  const navigate = useNavigate();
  const products = [
    { id: 'pv-module', title: 'Solar PV Module', img: '/solar_pv.png', desc: 'Highly Efficient Array of Solar PV Modules featuring advanced crystalline technology for maximum yield and a 25-Year Warranty.' },
    { id: 'on-grid', title: 'On Grid Inverter', img: '/prod2.png', desc: 'Seamlessly syncs with the utility grid to export excess power. Built for high-efficiency commercial and residential setups.' },
    { id: 'hybrid', title: 'Hybrid Inverter', img: '/prod3.png', desc: 'The ultimate power management solution combining solar, battery storage, and grid power for uninterrupted energy.' },
    { id: 'off-grid', title: 'Off Grid Inverter', img: '/prod4.png', desc: 'Completely independent power generation for remote locations without access to traditional utility grids.' },
    { id: 'batteries', title: 'Solar Batteries', img: '/prod5.png', desc: 'Deep cycle, high-capacity energy storage systems ensuring your home runs smoothly long after the sun goes down.' },
    { id: 'water-heater', title: 'Solar Water Heater', img: '/prod6.png', desc: 'Cost-effective thermal solutions utilizing the sun\'s energy to provide consistent hot water for residential complexes.' },
    { id: 'accessories', title: 'Solar Accessories', img: '/prod7.png', desc: 'Premium mounting structures, heavy-duty cables, and specialized connectors required for a safe and robust installation.' },
    { id: 'street-light', title: 'Street Light System', img: '/prod8.png', desc: 'Standalone, auto-dimming LED street lights powered by integrated solar panels for roads, parks, and campuses.' },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      {/* Hero Section */}
      <section className="relative min-h-[200px] md:h-[300px] flex items-center justify-center bg-fixed bg-center bg-cover overflow-hidden z-10"
        style={{ backgroundImage: "url('/products_hero.png')" }}
      >
        <AnimatedBackground />
        <div className="absolute inset-0 bg-slate-900/65 z-0"></div>
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto py-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-primary font-bold tracking-widest uppercase text-xs mb-1.5 block">Premium Catalog</span>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-white mb-2 leading-tight">
              Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-emerald-400">Products</span>
            </h1>
            <p className="text-xs sm:text-sm md:text-base text-slate-200 font-normal max-w-2xl mx-auto leading-relaxed">
              Explore our comprehensive range of high-efficiency solar modules, intelligent inverters, and robust energy storage systems designed for a sustainable future.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Benefits Bar */}
      <section className="relative z-30 -mt-10 max-w-5xl mx-auto px-6 md:px-4 w-full overflow-hidden">
      <AnimatedBackground />
        <div className="bg-white rounded-xl shadow-lg shadow-slate-200/50 py-1 md:py-6 px-4 md:px-6 border border-slate-100 flex flex-wrap justify-center md:justify-between items-center gap-4 md:gap-6">
          <div className="flex items-center space-x-3">
            <Zap className="h-6 w-6 text-amber-500" />
            <span className="font-semibold text-slate-700">High Efficiency Ratings</span>
          </div>
          <div className="hidden md:block w-px h-8 bg-slate-200"></div>
          <div className="flex items-center space-x-3">
            <Settings className="h-6 w-6 text-primary" />
            <span className="font-semibold text-slate-700">Tier-1 Global Components</span>
          </div>
          <div className="hidden md:block w-px h-8 bg-slate-200"></div>
          <div className="flex items-center space-x-3">
            <Download className="h-6 w-6 text-blue-500" />
            <span className="font-semibold text-slate-700 hover:text-primary cursor-pointer transition-colors">Download Brochure</span>
          </div>
        </div>
      </section>

      {/* Catalog Grid */}
      <section className="py-24 bg-slate-50 relative overflow-hidden z-10">
      <AnimatedBackground />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {products.map((prod, i) => (
              <motion.div 
                key={prod.id} 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                onClick={() => navigate(`/products/${prod.id}`)}
                className="bg-white rounded-3xl overflow-hidden shadow-sm border border-slate-100 hover:shadow-2xl hover:border-primary/30 transition-all duration-300 group flex flex-col h-full cursor-pointer"
              >
                <div className="h-60 bg-slate-50/50 p-5 flex items-center justify-center relative overflow-hidden border-b border-slate-50">
                  <div className="absolute inset-0 bg-primary/5 group-hover:bg-primary/10 transition-colors duration-300"></div>
                  <img 
                    src={prod.img} 
                    alt={prod.title} 
                    className="max-h-full max-w-full object-contain relative z-10 group-hover:scale-110 transition-transform duration-500 drop-shadow-md" 
                  />
                </div>
                <div className="p-8 flex-grow flex flex-col">
                  <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-primary transition-colors">{prod.title}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed mb-6 flex-grow">{prod.desc}</p>
                  
                  <div className="mt-auto">
                    <Button variant="outline" className="w-full justify-between group-hover:bg-primary group-hover:text-white group-hover:border-primary transition-all duration-300">
                      View Specifications
                      <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
};

export default Products;
