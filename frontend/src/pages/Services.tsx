import { useEffect } from 'react';
import AnimatedBackground from '../components/AnimatedBackground';
import { 
  Settings, 
  Wrench as Tools, 
  Activity, 
  ShieldCheck, 
  Zap, 
  PenTool, 
  Home, 
  Factory, 
  Building2, 
  Sun, 
  ArrowRight,
  Calculator,
  CheckCircle2
} from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '../components/ui/Button';
import { useNavigate, useLocation } from 'react-router-dom';

const Services = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Scroll to hash anchor on navigation
  useEffect(() => {
    if (location.hash) {
      const el = document.querySelector(location.hash);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [location]);

  const solutions = [
    {
      id: 'residential',
      title: 'Residential Solar Solutions',
      icon: Home,
      image: '/ind_residential.png',
      badge: 'Up to ₹78,000 Subsidy',
      desc: 'Empower your home with clean energy. Our residential rooftop systems drastically reduce your electricity bills by up to 90% while increasing property value. We handle everything from subsidy paperwork to seamless net-metering.',
      features: ['Net Metering Setup & DISCOM Approvals', 'Zero Downpayment & Easy EMI Options', 'Aesthetic Low-Profile Tier-1 Mounting']
    },
    {
      id: 'commercial',
      title: 'Commercial & Corporate Solar',
      icon: Building2,
      image: '/ind_corporate.png',
      badge: 'Accelerated Depreciation Tax Benefits',
      desc: 'Lock in your operational energy costs and boost your corporate ESG credentials. We design high-yield rooftop and carport systems for offices, hospitals, colleges, and retail spaces with superior ROI.',
      features: ['Tax Benefits (Section 32 Depreciation)', 'Custom Solar Carports & Rooftop Arrays', 'Zero-Downtime Fast-track Commissioning']
    },
    {
      id: 'industrial',
      title: 'Industrial High-Yield Solar',
      icon: Factory,
      image: '/ind_industrial.png',
      badge: 'Heavy-Duty Power Support',
      desc: 'Heavy energy consumers need robust EPC engineering. Our industrial solar arrays are built to withstand high loads, harsh ambient temperatures, and supply constant power for manufacturing plants and warehouses.',
      features: ['High-Tension (HT) Grid Synchronization', 'Heavy-Duty Tier-1 Panels & Inverters', 'Advanced SCADA Remote Telemetry & Monitoring']
    },
    {
      id: 'utility',
      title: 'Utility Scale Solar Parks',
      icon: Sun,
      image: '/ind_park.png',
      badge: 'Megawatt Scale EPC',
      desc: 'Turnkey EPC execution for utility-scale ground-mount solar plants. From terrain assessment and land clearance to high-voltage substation integration, we deliver megawatt-scale projects on schedule.',
      features: ['End-to-End Turnkey EPC Execution', 'Single & Dual-Axis Tracker System Integration', 'Long-term Performance-guaranteed O&M Contracts']
    }
  ];

  const services = [
    {
      title: 'Solar Consultation & Audit',
      icon: Activity,
      desc: 'Comprehensive energy audits and structural assessments to determine the exact optimal solar capacity for your consumption and budget.',
    },
    {
      title: 'Custom Engineering & Design',
      icon: PenTool,
      desc: 'Our engineers run 3D shadow analysis, wind load calculations, and electrical single-line diagrams (SLDs) for peak generation efficiency.',
    },
    {
      title: 'Turnkey EPC & Installation',
      icon: Tools,
      desc: 'Flawless execution by certified solar technicians ensuring mechanical, structural, and electrical components meet highest safety standards.',
    },
    {
      title: 'Operations & Maintenance (O&M)',
      icon: Settings,
      desc: 'Proactive panel cleaning, thermal drone imaging, inverter diagnostics, and preventive maintenance ensuring 25-year maximum generation.',
    },
    {
      title: 'Net Metering & Grid Integration',
      icon: Zap,
      desc: 'We handle 100% of the utility liaisoning, CEIG approvals, and bi-directional meter installation so you export surplus power worry-free.',
    },
    {
      title: 'System Upgrades & Battery Storage',
      icon: ShieldCheck,
      desc: 'Modernize existing plants with high-efficiency bifacial panels, hybrid inverters, and lithium-ion battery backup systems.',
    }
  ];

  const handleOpenQuote = () => {
    window.dispatchEvent(new CustomEvent('open-solar-quote'));
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      
      {/* Hero Section */}
      <section 
        className="relative min-h-[200px] md:h-[300px] flex items-center justify-center bg-fixed bg-cover overflow-hidden z-10"
        style={{ 
          backgroundImage: "url('/services_hero.png')",
          backgroundPosition: "center 40%" 
        }}
      >
        <AnimatedBackground />
        <div className="absolute inset-0 bg-slate-950/80 z-0"></div>
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto py-5 sm:py-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-primary font-bold tracking-widest uppercase text-xs mb-1 block bg-primary/20 backdrop-blur-md px-3.5 py-0.5 rounded-full w-max mx-auto border border-primary/30">
              End-to-End Solar Solutions &amp; EPC Capabilities
            </span>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-white mb-1.5">
              Solar <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-400 to-amber-200">Services &amp; Solutions</span>
            </h1>
            <p className="text-xs sm:text-sm md:text-base text-slate-200 font-normal max-w-2xl mx-auto leading-relaxed mb-3">
              From tailored sector solutions (Residential, Commercial, Industrial) to end-to-end EPC installation and 25-year maintenance.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-2.5">
              <button
                onClick={handleOpenQuote}
                className="bg-primary hover:bg-primary-hover text-white px-4 py-2 rounded-xl font-bold text-xs sm:text-sm shadow-md transition-all hover:scale-105"
              >
                Get Free Solar Quote
              </button>
              <button
                onClick={() => navigate('/emi-solar-plan')}
                className="bg-white/10 hover:bg-white/20 text-white border border-white/20 px-4 py-2 rounded-xl font-medium text-xs sm:text-sm backdrop-blur-sm transition-all"
              >
                Check EMI Solar Plan
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Part 1: Industry Solutions */}
      <section className="py-20 bg-white relative overflow-hidden z-10">
        <AnimatedBackground />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs uppercase font-extrabold tracking-widest text-primary bg-primary/10 px-3 py-1 rounded-full">
              Sector Specializations
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 mt-3 mb-3">
              Solar Solutions Tailored for Every Sector
            </h2>
            <p className="text-slate-600 text-base md:text-lg">
              Engineered specifically for your facility’s unique load profile, architectural setup, and financial goals.
            </p>
          </div>
          
          <div className="space-y-20">
            {solutions.map((sol, i) => (
              <div 
                id={sol.id} 
                key={sol.id} 
                className={`flex flex-col lg:flex-row gap-10 items-center scroll-mt-24 ${i % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}
              >
                {/* Image Side */}
                <motion.div 
                  initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.7 }}
                  className="w-full lg:w-1/2"
                >
                  <div className="relative rounded-3xl overflow-hidden shadow-xl aspect-[4/3] group border border-slate-100">
                    <div className="absolute inset-0 bg-slate-900/10 group-hover:bg-transparent transition-colors duration-500 z-10"></div>
                    <img 
                      src={sol.image} 
                      alt={sol.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                    />
                    
                    <div className="absolute top-4 left-4 z-20 bg-amber-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
                      {sol.badge}
                    </div>

                    <div className="absolute bottom-5 left-5 right-5 z-20 bg-white/95 backdrop-blur-md p-4 rounded-2xl shadow-lg flex items-center space-x-3 border border-white/50">
                      <div className="bg-primary/10 p-2.5 rounded-xl text-primary">
                        <sol.icon className="h-6 w-6" />
                      </div>
                      <div>
                        <span className="font-bold text-slate-900 block leading-tight">{sol.title}</span>
                        <span className="text-xs text-slate-500">Tier-1 Components &amp; Guaranteed Performance</span>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Content Side */}
                <motion.div 
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.7, delay: 0.2 }}
                  className="w-full lg:w-1/2 space-y-5"
                >
                  <div>
                    <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-2">{sol.title}</h3>
                    <div className="w-14 h-1.5 bg-primary rounded-full mb-4"></div>
                    <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
                      {sol.desc}
                    </p>
                  </div>
                  
                  <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200/80 space-y-3">
                    <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider">Key Advantages</h4>
                    <ul className="space-y-2.5">
                      {sol.features.map((feat, idx) => (
                        <li key={idx} className="flex items-center text-slate-700 text-xs sm:text-sm font-medium">
                          <CheckCircle2 className="h-4 w-4 text-green-600 mr-2.5 flex-shrink-0" />
                          {feat}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex flex-wrap items-center gap-3 pt-1">
                    <button
                      onClick={handleOpenQuote}
                      className="bg-primary hover:bg-primary-hover text-white text-xs sm:text-sm font-bold px-5 py-2.5 rounded-xl shadow-md transition-all flex items-center gap-1.5"
                    >
                      <span>Get Quote for {sol.title.split(' ')[0]}</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                    {sol.id === 'residential' && (
                      <button
                        onClick={() => navigate('/emi-solar-plan')}
                        className="bg-amber-100 hover:bg-amber-200 text-amber-900 text-xs sm:text-sm font-bold px-4 py-2.5 rounded-xl transition-all flex items-center gap-1.5"
                      >
                        <Calculator className="w-4 h-4 text-amber-700" />
                        <span>EMI &amp; Subsidy Calculator</span>
                      </button>
                    )}
                  </div>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Part 2: Engineering & EPC Services */}
      <section id="services-list" className="py-24 bg-slate-100/70 relative overflow-hidden z-10 border-t border-slate-200">
        <AnimatedBackground />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs uppercase font-extrabold tracking-widest text-primary bg-primary/10 px-3 py-1 rounded-full">
              Full Lifecycle Capabilities
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 mt-3 mb-3">
              Our EPC &amp; Engineering Services
            </h2>
            <p className="text-slate-600 text-base md:text-lg">
              We do not just install panels — we engineer turnkey power plants backed by 25 years of technical performance.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {services.map((service, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
                className="bg-white p-7 sm:p-8 rounded-3xl border border-slate-200 hover:border-primary/50 hover:shadow-xl transition-all duration-300 hover:-translate-y-1.5 group flex flex-col justify-between"
              >
                <div>
                  <div className="h-14 w-14 bg-primary/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-primary transition-colors duration-300">
                    <service.icon className="h-7 w-7 text-primary group-hover:text-white transition-colors duration-300" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-primary transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-slate-600 leading-relaxed text-sm">
                    {service.desc}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-primary">
                  <span>Guaranteed Quality</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </motion.div>
            ))}
          </div>

          {/* Quick CTA Banner */}
          <div className="mt-16 bg-gradient-to-r from-slate-900 via-slate-800 to-amber-950 text-white rounded-3xl p-8 sm:p-12 text-center shadow-xl border border-slate-800 space-y-4">
            <h3 className="text-2xl sm:text-3xl font-black">
              Ready to Power Your Property With Clean Solar Energy?
            </h3>
            <p className="text-slate-300 max-w-2xl mx-auto text-sm sm:text-base">
              Speak with our senior solar engineers for a free on-site shadow analysis and financial feasibility report.
            </p>
            <div className="pt-2 flex flex-wrap justify-center gap-3">
              <Button 
                onClick={handleOpenQuote}
                size="lg" 
                className="bg-primary hover:bg-primary-hover text-white font-bold px-8"
              >
                Request Free Quote Now
              </Button>
              <Button 
                onClick={() => navigate('/contact')} 
                variant="outline"
                size="lg" 
                className="border-white/30 text-white hover:bg-white/10"
              >
                Contact Technical Support
              </Button>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Services;
