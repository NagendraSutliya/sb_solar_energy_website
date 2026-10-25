import AnimatedBackground from '../components/AnimatedBackground';
import { Home, Factory, Building2, Sun } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '../components/ui/Button';
import { useNavigate } from 'react-router-dom';

const Solutions = () => {
  const navigate = useNavigate();

  const solutions = [
    {
      id: 'residential',
      title: 'Residential Solar',
      icon: Home,
      image: '/ind_residential.png',
      desc: 'Empower your home with clean energy. Our residential rooftop systems drastically reduce your electricity bills while increasing your property value. We handle everything from permits to installation.',
      features: ['Net Metering Setup', 'Battery Backup Options', 'Aesthetic Low-Profile Mounting']
    },
    {
      id: 'commercial',
      title: 'Commercial & Corporate',
      icon: Building2,
      image: '/ind_corporate.png',
      desc: 'Lock in your energy costs and boost your corporate sustainability profile. We design high-yield systems for offices, malls, and institutions that deliver exceptional ROI.',
      features: ['Tax Benefits (Accelerated Depreciation)', 'Custom Carport Structures', 'Zero-Downtime Installation']
    },
    {
      id: 'industrial',
      title: 'Industrial Solutions',
      icon: Factory,
      image: '/ind_industrial.png',
      desc: 'Heavy power consumers need robust solutions. Our industrial solar arrays are engineered to withstand harsh environments and provide massive power outputs for factories and warehouses.',
      features: ['High-Tension (HT) Grid Sync', 'Heavy-Duty Tier-1 Components', 'Advanced SCADA Monitoring']
    },
    {
      id: 'utility',
      title: 'Utility Scale Solar Parks',
      icon: Sun,
      image: '/ind_park.png',
      desc: 'Turnkey EPC services for massive utility-scale solar farms. From land acquisition assistance to high-voltage substation integration, we deliver megawatt-scale projects on time.',
      features: ['End-to-End EPC Execution', 'Tracker System Integration', 'Long-term O&M Contracts']
    }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      
      {/* Hero Section */}
      <section className="relative min-h-[400px] md:h-[300px] flex items-center justify-center bg-fixed bg-center bg-cover overflow-hidden z-10"
        style={{ backgroundImage: "url('/solutions_hero.png')" }}
      >
      <AnimatedBackground />
        <div className="absolute inset-0 bg-slate-900/60 z-0"></div>
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto mt-12 md:mt-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-primary font-bold tracking-widest uppercase text-sm mb-2 md:mb-4 block">Tailored Implementations</span>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-4 md:mb-6">
              Industry <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-emerald-400">Solutions</span>
            </h1>
            <p className="text-base md:text-xl text-slate-200 font-light max-w-2xl mx-auto leading-relaxed">
              Whether you are powering a single home or a megawatt industrial facility, we engineer specific solutions optimized for your exact energy profile.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Solutions Feed */}
      <section className="py-24 bg-white relative overflow-hidden z-10">
      <AnimatedBackground />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="space-y-24">
            {solutions.map((sol, i) => (
              <div key={sol.id} className={`flex flex-col lg:flex-row gap-12 items-center ${i % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}>
                
                {/* Image Side */}
                <motion.div 
                  initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8 }}
                  className="w-full lg:w-1/2"
                >
                  <div className="relative rounded-3xl overflow-hidden shadow-2xl aspect-[4/3] group">
                    <div className="absolute inset-0 bg-primary/10 group-hover:bg-transparent transition-colors duration-500 z-10"></div>
                    <img src={sol.image} alt={sol.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                    
                    <div className="absolute bottom-6 left-6 z-20 bg-white/90 backdrop-blur-md p-4 rounded-2xl shadow-lg flex items-center space-x-3">
                      <div className="bg-primary/10 p-2 rounded-xl">
                        <sol.icon className="h-6 w-6 text-primary" />
                      </div>
                      <span className="font-bold text-slate-900">{sol.title}</span>
                    </div>
                  </div>
                </motion.div>

                {/* Content Side */}
                <motion.div 
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="w-full lg:w-1/2"
                >
                  <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">{sol.title}</h2>
                  <div className="w-16 h-1.5 bg-primary rounded-full mb-6"></div>
                  <p className="text-lg text-slate-600 leading-relaxed mb-8">
                    {sol.desc}
                  </p>
                  
                  <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 mb-8">
                    <h4 className="font-bold text-slate-900 mb-4 text-sm uppercase tracking-wider">Solution Highlights</h4>
                    <ul className="space-y-3">
                      {sol.features.map((feat, idx) => (
                        <li key={idx} className="flex items-center text-slate-700">
                          <div className="h-2 w-2 rounded-full bg-primary mr-3"></div>
                          {feat}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Button onClick={() => navigate('/contact')} variant="outline" className="h-12 px-8">
                    Discuss {sol.title}
                  </Button>
                </motion.div>

              </div>
            ))}
          </div>

        </div>
      </section>

    </div>
  );
};

export default Solutions;
