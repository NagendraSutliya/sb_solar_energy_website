import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Zap, Shield, Sun, Building2, Home as HomeIcon, Factory, ChevronLeft, ChevronRight, Award, TrendingUp, Phone, Settings, FileText, Star, Quote, Pointer, PiggyBank, CreditCard, Smartphone, X, HelpCircle, ChevronDown } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { motion, AnimatePresence } from 'framer-motion';
import AnimatedBackground from '../components/AnimatedBackground';

const HERO_SLIDES = [
  {
    id: 1,
    title: "Complete Solution For All Your Power Needs",
    subtitle: "Smart Homes Run On Smart Solar. Upgrade With Go Green And Enjoy Lower Bills And Clean Energy!",
    image: "/hero1.png"
  },
  {
    id: 2,
    title: "Innovative and Superior Solar Solutions",
    subtitle: "Offering customized solar solutions for Residential, Institutional, Commercial, Industrial, and Agriculture sectors.",
    image: "/hero2.png"
  },
  {
    id: 3,
    title: "Get Upto ₹ 78,000 Subsidy By Central Government",
    subtitle: "Install solar at your home to reduce electricity bills by up to 90% and secure your sustainable future.",
    image: "/hero3.png"
  },
  {
    id: 4,
    title: "Illuminate Your Sustainable Future",
    subtitle: "System with a Battery Backup | System without Battery",
    image: "/hero4.png"
  }
];

const HeroSlider = () => {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev === 0 ? HERO_SLIDES.length - 1 : prev - 1));

  return (
    <div className="relative h-[450px] md:h-[550px] w-full overflow-hidden bg-slate-900">
      <AnimatePresence initial={false}>
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="absolute inset-0 z-0"
        >
          <div className="absolute inset-0 bg-slate-900/50 z-10"></div>
          <img
            src={HERO_SLIDES[currentSlide].image}
            alt="Solar Panels Background"
            className="w-full h-full object-cover transform scale-105"
          />
        </motion.div>
      </AnimatePresence>

      <div className="absolute inset-0 z-20 flex items-center justify-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="max-w-4xl text-center mx-auto"
            >
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-4 md:mb-6 text-white leading-tight drop-shadow-lg uppercase">
                {HERO_SLIDES[currentSlide].title}
              </h1>
              <p className="text-base sm:text-lg md:text-xl text-yellow-400 mb-8 md:mb-10 font-medium drop-shadow-md max-w-3xl mx-auto">
                {HERO_SLIDES[currentSlide].subtitle}
              </p>
              <div className="flex flex-wrap gap-3 sm:gap-4 justify-center">
                <Button onClick={() => navigate('/contact')} size="sm" className="group rounded-full shadow-xl shadow-primary/20 hover:scale-105 transition-transform md:h-14 md:px-8 md:text-lg sm:h-11 sm:px-6 sm:text-base">
                  Let's Start Now
                  <Pointer className="rotate-90 ml-2 h-3 w-4 md:h-4 md:w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button onClick={() => navigate('/products')} size="sm" variant="outline" className="text-white border-white rounded-full hover:bg-white hover:text-slate-900 hover:scale-105 transition-transform md:h-14 md:px-8 md:text-lg sm:h-11 sm:px-6 sm:text-base bg-white/5 backdrop-blur-sm">
                  View Our Products
                </Button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <button onClick={prevSlide} className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-30 p-2 rounded-full hover:bg-green-300 hover:text-black transition-colors text-white hidden md:block border border-white/20">
        <ChevronLeft className="h-8 w-8" />
      </button>
      <button onClick={nextSlide} className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-30 p-2 rounded-full hover:bg-green-300 hover:text-black transition-colors text-white hidden md:block border border-white/20">
        <ChevronRight className="h-8 w-8" />
      </button>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex space-x-3">
        {HERO_SLIDES.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentSlide(idx)}
            className={`h-2 rounded-full transition-all duration-300 ${currentSlide === idx ? 'bg-primary w-8' : 'bg-white/50 hover:bg-white w-2'
              }`}
          />
        ))}
      </div>
    </div>
  );
};



const FeaturesSection = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [wordIndex, setWordIndex] = useState(0);
  const rotatingWords = ["Investment", "Electricity Bill"];

  useEffect(() => {
    const wordInterval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % rotatingWords.length);
    }, 2500);
    return () => clearInterval(wordInterval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (scrollRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
        // On desktop, scrollWidth equals clientWidth so it won't scroll.
        // On mobile, if we reach the end, loop back to start.
        if (scrollLeft + clientWidth >= scrollWidth - 10) {
          scrollRef.current.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          // Scroll by roughly the width of one card (85vw)
          scrollRef.current.scrollBy({ left: clientWidth * 0.85, behavior: 'smooth' });
        }
      }
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-10 md:py-20 bg-slate-50 relative z-10 overflow-hidden">
      <AnimatedBackground />
      <div className="max-w-7xl mx-auto md:px-5 lg:px-8 relative z-10">
        <div className="text-center mb-10 md:mb-12">
          <h2 className="text-2xl md:text-4xl font-bold text-slate-900 tracking-tight mb-3 md:mb-4 flex flex-wrap justify-center items-center gap-x-2 leading-tight">
            <span>Power Your Home With <span className="text-primary">Solar</span> At</span>
            <span className="inline-flex items-center">
              <span className="mr-2">Zero</span>
              <span className="relative inline-block h-[1.2em] w-[140px] md:w-[270px] overflow-hidden text-left align-bottom">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={wordIndex}
                    initial={{ y: "100%", opacity: 0 }}
                    animate={{ y: "0%", opacity: 1 }}
                    exit={{ y: "-100%", opacity: 0 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                    className="bg-gradient-to-r from-blue-600 via-indigo-500 to-green-500 bg-clip-text text-transparent absolute inset-0 whitespace-nowrap pt-[0.01em]"
                  >
                    {rotatingWords[wordIndex]}
                  </motion.span>
                </AnimatePresence>
              </span>
            </span>
          </h2>
          <div className="w-16 h-1 bg-primary mx-auto rounded-full mt-2"></div>
        </div>

        <div
          ref={scrollRef}
          className="flex md:grid md:grid-cols-3 gap-6 md:gap-8 overflow-x-auto snap-x snap-mandatory px-[7.5vw] sm:px-[20vw] md:px-0 scroll-smooth [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
        >
          {[
            {
              title: 'Get Upto ₹78,000 Subsidy',
              desc: 'Install solar at your home to reduce electricity bill by up to 90% and also get subsidy from the central government.',
              icon: Zap
            },
            {
              title: 'Customized Solutions',
              desc: 'Offering Innovative and Superior Solar Solutions for Residential, Commercial, and Industrial needs.',
              icon: Shield
            },
            {
              title: 'Sustainable Future',
              desc: 'Illuminate your Sustainable Future System with or without a battery backup.',
              icon: Sun
            }
          ].map((feature, i) => (
            <div key={i} className="min-w-[85vw] sm:min-w-[60vw] md:min-w-0 snap-center bg-white p-5 md:p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group">
              <div className="flex items-center space-x-3 md:space-x-4 mb-4 md:mb-6">
                <div className="h-10 w-10 md:h-14 md:w-14 shrink-0 bg-primary/10 rounded-xl flex items-center justify-center group-hover:bg-primary transition-colors duration-300">
                  <feature.icon className="h-5 w-5 md:h-7 md:w-7 text-primary group-hover:text-white transition-colors duration-300" />
                </div>
                <h3 className="text-lg md:text-xl font-bold text-slate-900">{feature.title}</h3>
              </div>
              <p className="text-slate-600 text-sm md:text-base leading-relaxed mb-4 md:mb-6">{feature.desc}</p>
              <a href="tel:07023204664" className="text-primary font-semibold inline-flex items-center group-hover:text-primary-hover transition-colors">
                Learn more <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const ProductsSection = () => {
  return (
    <section className="py-10 md:py-20 bg-white relative z-10 overflow-hidden">
      <AnimatedBackground />
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <h2 className="text-2xl md:text-4xl font-bold tracking-tight mb-2 md:mb-3">
          <span className="text-primary">OUR</span> <span className="text-slate-900">PRODUCTS</span>
        </h2>
        <div className="w-16 h-1 bg-primary mx-auto mb-6 rounded-full"></div>
        <p className="text-sm md:text-base text-slate-600 max-w-4xl mx-auto mb-6 md:mb-12 font-medium">
          Highly Efficient Array of Solar PV Modules | Inverters | Energy Storage Systems | Premium-Quality At Affordable Price
        </p>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6">
          {[
            { title: 'SOLAR PV MODULE', color: 'text-teal-500', img: '/solar_pv.png' },
            { title: 'ON GRID INVERTER', color: 'text-orange-500', img: '/prod2.png' },
            { title: 'HYBRID INVERTER', color: 'text-green-600', img: '/prod3.png' },
            { title: 'SOLAR INVERTER - OFF GRID', color: 'text-rose-600', img: '/off_grid_inverter.png' },
            { title: 'BATTERIES', color: 'text-pink-600', img: '/prod5.png' },
            { title: 'SOLAR WATER HEATER', color: 'text-blue-500', img: '/prod6.png' },
            { title: 'ACCESSORIES SOLAR', color: 'text-amber-500', img: '/prod7.png' },
            { title: 'STREET LIGHT SYSTEM', color: 'text-indigo-700', img: '/prod8.png' }
          ].map((prod, i) => (
            <div key={i} className="bg-white rounded-xl border-2 border-slate-100 shadow-sm hover:shadow-xl hover:border-primary/20 transition-all duration-300 overflow-hidden group cursor-pointer flex flex-col h-full">
              <div className="h-32 sm:h-36 md:h-56 w-full p-2 sm:p-3 md:p-6 flex items-center justify-center bg-white">
                <img src={prod.img} alt={prod.title} className="max-h-full max-w-full object-contain group-hover:scale-110 transition-transform duration-500" />
              </div>
              <div className="p-2 md:p-4 flex-grow flex items-center justify-center border-t-2 border-slate-50 bg-slate-50/50">
                <h3 className={`font-black text-center text-[10px] sm:text-[12px] md:text-[15px] tracking-wide ${prod.color}`}>
                  {prod.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const INDUSTRY_SOLUTIONS = [
  { id: 'residential', title: 'Residential', icon: HomeIcon, desc: 'Facing power cuts and high bills? Install solar at your home for reliable, clean energy.', img: '/ind_residential.png' },
  { id: 'corporate', title: 'Corporate', icon: Building2, desc: 'Lower operational bills, enhance your green brand image, and make efficient use of office space.', img: '/ind_corporate.png' },
  { id: 'industrial', title: 'Industrial', icon: Factory, desc: 'Cut massive energy costs and boost profit margins with consistent, heavy-duty power.', img: '/ind_industrial.png' },
  { id: 'parks', title: 'Solar Parks', icon: Sun, desc: 'High energy output over vast land with rapid execution for utility-scale distribution.', img: '/ind_park.png' }
];

const IndustrySection = () => {
  const [active, setActive] = useState(INDUSTRY_SOLUTIONS[0]);

  return (
    <section className="py-10 md:py-20 bg-slate-50 relative z-10 overflow-hidden">
      <AnimatedBackground />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-5xl mx-auto mb-6 md:mb-12">
          <h2 className="text-2xl md:text-4xl font-bold tracking-tight mb-2 md:mb-3">
            <span className="text-primary">SOLUTIONS</span> <span className="text-slate-900">WE OFFER</span>
          </h2>
          <div className="w-16 h-1 bg-primary mx-auto mb-3 md:mb-6 rounded-full"></div>
          <p className="text-sm md:text-base text-slate-600 font-medium">
            Solar Energy India Provides Solutions For Various Industries, Offering Comprehensive Coverage For Effective And Efficient Safety & Quality.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 items-center">
          <div className="md:col-span-5 space-y-4">
            {INDUSTRY_SOLUTIONS.map((sol) => (
              <div
                key={sol.id}
                onClick={() => setActive(sol)}
                onMouseEnter={() => setActive(sol)}
                className={`mx-6 md:mx-0 p-3 md:p-6 rounded-2xl cursor-pointer transition-all duration-300 border-[0.5px] md:border-2 ${active.id === sol.id
                  ? 'bg-white border-primary shadow-xl scale-105'
                  : 'bg-transparent border-transparent hover:bg-white/50 hover:border-slate-200'
                  }`}
              >
                <div className="flex items-start space-x-4">
                  <div className={`p-2 md:p-3 rounded-xl transition-colors ${active.id === sol.id ? 'bg-primary/10 text-primary' : 'bg-slate-200 text-slate-500'}`}>
                    <sol.icon className="h-5 w-5 md:h-7 md:w-7" />
                  </div>
                  <div className="flex-1">
                    <h3 className={`text-lg sm:text-xl md:text-2xl font-bold transition-colors ${active.id === sol.id ? 'text-primary' : 'text-slate-800'}`}>{sol.title}</h3>
                    <AnimatePresence>
                      {active.id === sol.id && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="overflow-hidden"
                        >
                          <p className="text-slate-600 text-xs md:text-sm leading-relaxed mt-2 pr-4">
                            {sol.desc}
                          </p>
                          <div className="mt-4 rounded-xl overflow-hidden shadow-sm block md:hidden h-48 sm:h-64 relative border-2 border-slate-50">
                            <img src={sol.img} alt={sol.title} className="absolute inset-0 w-full h-full object-cover" />
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="hidden md:block md:col-span-7 h-[400px] lg:h-[600px] relative rounded-3xl overflow-hidden shadow-2xl glass group">
            <AnimatePresence mode="wait">
              <motion.img
                key={active.id}
                src={active.img}
                alt={active.title}
                initial={{ opacity: 0, scale: 1.1, x: 20 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.9, x: -20 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
            </AnimatePresence>
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent pointer-events-none"></div>
            <div className="absolute bottom-8 left-8 right-8 z-10 pointer-events-none">
              <motion.div
                key={`badge-${active.id}`}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center space-x-2 bg-primary/90 backdrop-blur text-white px-4 py-2 rounded-full font-semibold text-sm shadow-lg"
              >
                <active.icon className="h-4 w-4" />
                <span>{active.title} Solutions</span>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const WHY_CHOOSE_US = [
  { title: "25-Year Performance Warranty", desc: "Long-term peace of mind with our comprehensive performance guarantees.", icon: Shield },
  { title: "Expert Installation", desc: "Our certified engineers ensure flawless, safe, and efficient setups.", icon: Settings },
  { title: "Govt. Subsidy Support", desc: "We handle the paperwork to get you the maximum central subsidies.", icon: FileText },
  { title: "Tier-1 Quality", desc: "We use only premium, globally-rated solar panels and inverters.", icon: Award },
  { title: "Highest ROI", desc: "Maximize your energy savings and get the fastest return on investment.", icon: TrendingUp },
  { title: "24/7 Support", desc: "Round-the-clock technical assistance and maintenance services.", icon: Phone }
];

const WhyChooseUsSection = () => {
  return (
    <section className="py-10 md:py-20 bg-white relative z-10 overflow-hidden">
      <AnimatedBackground />
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-4xl mx-auto mb-6 md:mb-12">
          <h2 className="text-2xl md:text-4xl font-bold tracking-tight mb-2 md:mb-3">
            <span className="text-slate-900">WHY CHOOSE</span> <span className="text-primary">US</span>
          </h2>
          <div className="w-16 h-1 bg-primary mx-auto mb-2 md:mb-6 rounded-full"></div>
          <p className="text-sm md:text-base text-slate-600 font-medium">
            We deliver uncompromising quality, transparent pricing, and end-to-end solar solutions that empower you to take control of your energy future.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-8">
          {WHY_CHOOSE_US.map((feature, i) => (
            <div key={i} className="flex flex-col items-center text-center p-3 sm:p-6 md:p-8 rounded-3xl bg-slate-50 border border-slate-100 hover:border-primary/30 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 group">
              <div className="h-10 w-10 md:h-16 md:w-16 bg-white shadow-sm border border-slate-100 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-primary transition-colors duration-300">
                <feature.icon className="h-6 w-6 md:h-8 md:w-8 text-primary group-hover:text-white transition-colors duration-300" />
              </div>
              <h3 className="text-lg md:text-xl font-bold text-slate-900 mb-3">{feature.title}</h3>
              <p className="text-xs sm:text-sm md:text-base text-slate-600 leading-relaxed">
                {feature.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const TESTIMONIALS = [
  {
    name: "Rajesh Sharma",
    role: "Industrial Factory Owner",
    content: "Switching to SB Solar was the best decision for our operations. Our monthly energy costs dropped by 70% in the first quarter alone, and the heavy-duty inverters handle our loads flawlessly.",
    rating: 5
  },
  {
    name: "Priya Desai",
    role: "Residential Homeowner",
    content: "The team handled absolutely everything—from the initial roof inspection to the final government subsidy paperwork. Highly professional, clean installation, and incredibly efficient!",
    rating: 5
  },
  {
    name: "Amit Patel",
    role: "Corporate Director",
    content: "We were highly impressed by the premium quality of the Tier-1 panels and their 24/7 support team. Our corporate headquarters is now proudly running on 100% green energy.",
    rating: 5
  },
  {
    name: "Rajeev",
    role: "Corporate Director",
    content: "SB SOLAR ENERGY India was our EPS & installation Service for more than 10 years and we find them very competent and committed to our satisfaction.",
    rating: 5
  }
];

const TestimonialsSection = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      if (scrollRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
        if (scrollLeft + clientWidth >= scrollWidth - 10) {
          scrollRef.current.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          // Scroll by roughly the width of one card (85vw)
          scrollRef.current.scrollBy({ left: clientWidth * 0.85, behavior: 'smooth' });
        }
      }
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -400 : 400;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section className="py-10 md:py-20 bg-slate-50 relative z-10 overflow-hidden">
      <AnimatedBackground />
      <div className="max-w-[1400px] mx-auto lg:px-8 relative z-10">
        <div className="text-center max-w-4xl mx-auto mb-6 md:mb-12 px-4 lg:px-0">
          <h2 className="text-2xl md:text-4xl font-bold tracking-tight mb-2 md:mb-3">
            <span className="text-slate-900">WHAT OUR CUSTOMERS</span> <span className="text-primary">SAY</span>
          </h2>
          <div className="w-16 h-1 bg-primary mx-auto mb-2 md:mb-6 rounded-full"></div>
          <p className="text-sm md:text-base text-slate-600 font-medium">
            Don't just take our word for it. Hear from our satisfied clients across residential, corporate, and industrial sectors.
          </p>
        </div>

        <div className="relative group">
          {/* Left Arrow */}
          <button
            onClick={() => scroll('left')}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-12 z-20 bg-transparent text-slate-400 p-2 md:p-3 rounded-full hover:bg-primary hover:text-white hover:shadow-xl hover:border-transparent border border-transparent transition-all opacity-80 group-hover:opacity-100 hidden md:block"
          >
            <ChevronLeft className="w-8 h-8" />
          </button>

          {/* Scroll Container */}
          <div
            ref={scrollRef}
            className="flex overflow-x-auto snap-x snap-mandatory gap-8 pt-4 w-full scroll-smooth px-[7.5vw] sm:px-[20vw] lg:px-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
          >
            {(TESTIMONIALS.length <= 3 ? [...TESTIMONIALS, ...TESTIMONIALS] : TESTIMONIALS).map((testimonial, i) => (
              <div key={i} className="w-[85vw] sm:w-[calc(50%_-_1rem)] lg:w-[calc(33.333%_-_1.333rem)] flex-none snap-center bg-white p-4 md:p-8 rounded-3xl shadow-sm border border-slate-100 hover:shadow-xl transition-all duration-300 relative group/card hover:-translate-y-1 flex flex-col">
                <Quote className="absolute md:top-6 right-6 h-8 w-8 md:h-16 md:w-16 text-slate-50 group-hover/card:text-primary/5 transition-colors duration-300 -z-0" />

                <div className="flex space-x-1 mb-3 md:mb-6 relative z-10">
                  {[...Array(testimonial.rating)].map((_, j) => (
                    <Star key={j} className="h-4 w-4 md:h-5 md:w-5 text-amber-400 fill-amber-400" />
                  ))}
                </div>

                <p className="text-sm md:text-base text-slate-600 leading-relaxed mb-4 md:mb-8 relative z-10 italic flex-grow">
                  "{testimonial.content}"
                </p>

                <div className="flex items-center space-x-4 relative z-10 mt-auto">
                  <div className="h-8 w-8 md:h-12 md:w-12 bg-primary/10 rounded-full flex items-center justify-center text-primary font-bold md:text-lg shrink-0">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="text-sm md:text-base font-bold text-slate-900">{testimonial.name}</h4>
                    <p className="text-xs md:text-base text-slate-500">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Right Arrow */}
          <button
            onClick={() => scroll('right')}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-12 z-20 bg-transparent text-slate-400 p-3 rounded-full hover:bg-primary hover:text-white hover:shadow-xl hover:border-transparent border border-transparent transition-all opacity-80 group-hover:opacity-100 hidden md:block"
          >
            <ChevronRight className="w-8 h-8" />
          </button>
        </div>
      </div>
    </section>
  );
};

const BrandsSection = () => {
  const brands = [
    { id: 'tata', src: '/brand_images/Tata_Solar.jpeg', alt: 'Tata Solar' },
    { id: 'adani', src: '/brand_images/Adani.jpeg', alt: 'Adani Solar' },
    { id: 'ina', src: '/brand_images/INA_Solar.jpeg', alt: 'INA Solar' },
    { id: 'usha', src: '/brand_images/Usha.jpeg', alt: 'Usha' },
    { id: 'eastman', src: '/brand_images/Eastman.jpeg', alt: 'Eastman' },
    { id: 'xwatt', src: '/brand_images/XWatt.jpeg', alt: 'XWatt' },
    { id: 'luminous', src: '/brand_images/Luminious.jpeg', alt: 'Luminous' },
    { id: 'polycab', src: '/brand_images/Polycab.jpeg', alt: 'Polycab' },
    { id: 'waaree', src: '/brand_images/Waaree.jpeg', alt: 'Waaree' },
    { id: 'vsole', src: '/brand_images/Vsole.jpeg', alt: 'Vsole' },
    // { id: 'solar_protection', src: '/brand_images/Solar_Protection.jpeg', alt: 'Solar Protection' },
    // { id: 'sbsolar', src: '/brand_images/sb_solar.jpeg', alt: 'SB Solar' },
  ];

  return (
    <section className="py-10 md:py-20 bg-white relative overflow-hidden">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 mb-6 md:mb-12 text-center">
        <h2 className="text-2xl md:text-4xl font-black text-slate-900 tracking-tight uppercase">
          <span className="text-[#8CC63F]">BRANDS</span> WE DEAL IN
        </h2>
        <div className="w-24 h-1 bg-[#10b981] mx-auto mt-4 rounded-full"></div>
      </div>

      {/* Marquee Wrapper */}
      <div className="relative w-full overflow-hidden flex bg-white py-3 sm:py-6 md:py-10 before:absolute before:left-0 before:top-0 before:z-10 before:h-full before:w-20 before:bg-gradient-to-r before:from-white before:to-transparent after:absolute after:right-0 after:top-0 after:z-10 after:h-full after:w-20 after:bg-gradient-to-l after:from-white after:to-transparent">
        <motion.div
          animate={{ x: [0, -1920] }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 30,
              ease: "linear",
            },
          }}
          className="flex flex-nowrap gap-3 sm:gap-4 items-center"
        >
          {/* Render 3 sets of the brands to ensure infinite loop seamlessly */}
          {[...brands, ...brands, ...brands].map((brand, i) => (
            <div key={`${brand.id}-${i}`} className="flex-shrink-0 transition-all duration-300 transform hover:scale-125 hover:-translate-y-2 hover:drop-shadow-2xl px-2 md:px-4 cursor-pointer relative z-10 hover:z-20 bg-white rounded-xl shadow-sm hover:shadow-md p-4">
              <img src={brand.src} alt={brand.alt} className="h-16 md:h-24 w-auto object-contain mix-blend-multiply" />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

const CTASection = () => {
  const navigate = useNavigate();
  return (
    <section className="max-w-8xl mx-4 md:mx-10 px-4 sm:px-6 lg:px-8 mb-10 relative z-10">
      <div className="w-full rounded-2xl md:rounded-[30px] py-8 md:py-10 bg-[#0f172a] relative overflow-hidden shadow-2xl flex flex-col justify-center border border-slate-800">
        <motion.div
          animate={{ backgroundPosition: ["0px 0px", "40px 40px"] }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 opacity-30 bg-[radial-gradient(#22c55e_1px,transparent_1px)] [background-size:20px_20px] z-0"
        />

        <div className="relative z-10 flex flex-col items-center justify-between gap-x-6 gap-y-3 sm:gap-x-6 md:gap-8 text-center px-2 sm:px-4">

          {/* Top Section - Reseller CTA */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 md:gap-5 w-full px-2 sm:px-6 md:px-12">
            <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-white px-2 tracking-tight leading-tight max-w-2xl text-center">
              Become a Certified Dealer & Channel Partner
            </h3>

            <div className="flex md:flex-wrap items-center justify-center gap-3 shrink-0">
              <Button onClick={() => navigate('/vendor-registration')} className="bg-[#0ea5e9] hover:bg-[#0284c7] text-white border-0 shadow-lg font-bold tracking-wide px-3 sm:px-6 md:px-8 h-6 sm:h-9 md:h-10 text-[10px] sm:text-[14px] hover:-translate-y-1 transition-transform rounded-md">
                ENROLL NOW
              </Button>
              <a href="tel:+917023204664">
                <Button className="bg-[#ef4444] hover:bg-[#dc2626] text-white border-0 shadow-lg font-bold tracking-wide px-3 sm:px-6 md:px-8 h-6 sm:h-9 md:h-10 text-[10px] sm:text-[14px] flex items-center hover:-translate-y-1 transition-transform rounded-md">
                  <Phone className="h-3 sm:h-4 w-4 mr-2" />
                  CALL NOW
                </Button>
              </a>
            </div>
          </div>

          {/* Divider */}
          {/* <div className="w-full max-w-8xl h-px bg-slate-700/50"></div> */}

          {/* Bottom Section - Solar CTA */}
          {/* <div className="flex flex-col md:flex-row justify-between items-center gap-4 md:gap-5 w-full px-2 sm:px-6 md:px-12">
            <div className='text-left'>
            <h2 className="text-lg md:text-xl lg:text-2xl font-bold text-white tracking-tight drop-shadow-md">
              Go Solar with Zero Investment
            </h2>
            <p className="text-slate-300 font-medium text-[11px] sm:text-[13px] md:text-[15px] leading-relaxed drop-shadow-sm text-center">
              Government subsidy covers your downpayment, and monthly solar saving covers your EMI.
            </p></div>
            <Button size="lg" className="bg-[#14532d] mt-1 text-sm md:text-base text-white rounded-md hover:bg-primary px-3 sm:px-6 md:px-8 h-6 sm:h-9 md:h-10 shadow-xl hover:-translate-y-1 transition-transform border-0">
              Get a Free Quote
            </Button>
          </div> */}

        </div>
      </div>
    </section>
  );
};

const SBSolarProtectionNotification = () => {
  const [isVisible, setIsVisible] = useState(true);
  const navigate = useNavigate();

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4"
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 20 }}
          className="relative w-full max-w-6xl bg-gradient-to-r from-indigo-50 via-[#eef2ff] to-[#f0f9ff] rounded-2xl shadow-2xl border border-blue-100 p-6 sm:p-8 lg:p-12 max-h-[90vh] overflow-y-auto md:overflow-hidden"
        >
          <button
            onClick={() => setIsVisible(false)}
            className="absolute top-4 right-4 p-2 bg-white/80 hover:bg-white rounded-full transition-colors text-slate-500 hover:text-slate-800 z-50 shadow-sm"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex flex-col lg:flex-row items-center lg:items-stretch justify-between gap-4 md:gap-0 mt-6 sm:mt-0">

            {/* Left Content */}
            <div className="lg:w-1/3 space-y-4 text-center lg:text-left flex flex-col justify-center">
              <div>
                <p className="text-slate-600 font-medium text-lg mb-1">Introducing</p>
                <h2 className="text-3xl lg:text-4xl font-black text-[#1e3a8a] tracking-tight leading-tight">
                  SB SOLAR PROTECTION<sup className="text-xl ml-1 font-bold">™</sup>
                </h2>
              </div>

              <p className="text-slate-800 font-bold text-xl leading-snug mx-auto lg:mx-0 max-w-sm">
                Guaranteed Solar Savings & Protection Plan
              </p>

              <div className="pt-2">
                <Button
                  onClick={() => {
                    setIsVisible(false);
                    navigate('/sb-solar-protection');
                  }}
                  className="bg-gradient-to-r from-[#0d1b4a] to-[#1a2f6c] text-white hover:from-[#081236] hover:to-[#122355] shadow-xl hover:shadow-2xl transition-all duration-300 px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg rounded-xl w-full sm:w-auto"
                >
                  Know More
                </Button>
              </div>
            </div>

            {/* Middle Features Grid */}
            <div className="lg:flex-1 flex flex-col justify-center space-y-6 w-full">
              <div className="space-y-2 bg-green-50 p-4 sm:p-5 rounded-xl border border-green-200 shadow-sm text-center lg:text-left">
                <p className="text-[#10b981] font-bold text-lg leading-tight">25 Years of Trusted Solar Performance</p>
                <p className="text-slate-600 font-medium text-sm leading-relaxed">Guaranteed Generation • Savings Protection • Service Support</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div className="flex items-center space-x-4 bg-white/60 p-3 rounded-xl border border-blue-50/50 shadow-sm hover:bg-white transition-colors">
                  <div className="w-10 h-10 shrink-0 rounded-full bg-blue-100 flex items-center justify-center shadow-inner">
                    <PiggyBank className="w-5 h-5 text-blue-600" />
                  </div>
                  <p className="text-slate-700 font-semibold text-sm leading-tight">Money-back promise at Rs. 8/unit</p>
                </div>

                <div className="flex items-center space-x-4 bg-white/60 p-3 rounded-xl border border-blue-50/50 shadow-sm hover:bg-white transition-colors">
                  <div className="w-10 h-10 shrink-0 rounded-full bg-blue-100 flex items-center justify-center shadow-inner">
                    <CreditCard className="w-5 h-5 text-blue-600" />
                  </div>
                  <p className="text-slate-700 font-semibold text-sm leading-tight">Regular Proactive maintenance visits</p>
                </div>

                <div className="flex items-center space-x-4 bg-white/60 p-3 rounded-xl border border-blue-50/50 shadow-sm hover:bg-white transition-colors">
                  <div className="w-10 h-10 shrink-0 rounded-full bg-blue-100 flex items-center justify-center shadow-inner">
                    <Settings className="w-5 h-5 text-blue-600" />
                  </div>
                  <p className="text-slate-700 font-semibold text-sm leading-tight">₹0 Repair & Replacement Cost</p>
                </div>

                <div className="flex items-center space-x-4 bg-white/60 p-3 rounded-xl border border-blue-50/50 shadow-sm hover:bg-white transition-colors">
                  <div className="w-10 h-10 shrink-0 rounded-full bg-blue-100 flex items-center justify-center shadow-inner">
                    <Smartphone className="w-5 h-5 text-blue-600" />
                  </div>
                  <p className="text-slate-700 font-semibold text-sm leading-tight">App to track real-time power</p>
                </div>
              </div>
            </div>

            {/* Right Image */}
            <div className="lg:w-1/4 flex justify-center lg:justify-end relative items-center w-full mt-4 lg:mt-0">
              <div className="absolute inset-0 bg-blue-400/20 blur-3xl rounded-full scale-150"></div>
              <img src="/brand_images/Solar_Protection.png" alt="SB Solar Protection Guarantee" className="w-40 sm:w-48 lg:w-full max-w-[250px] object-contain relative z-10 drop-shadow-2xl hover:scale-105 transition-transform duration-500" />
            </div>

          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const navigate = useNavigate();

  const faqs = [
    {
      q: "PM Surya Ghar Muft Bijli Yojana me kitni subsidy milti hai?",
      a: "Central Government PM Surya Ghar scheme ke tehat 1 kW solar rooftop system par ₹30,000, 2 kW system par ₹60,000 aur 3 kW ya usse upar ke systems par flat ₹78,000 direct bank transfer subsidy provide karti hai. SB Solar Energy aapka poora DISCOM net metering aur portal paperwork handle karti hai."
    },
    {
      q: "Kya rooftop solar lagwane ke liye 100% EMI / loan option available hai?",
      a: "Haan! SB Solar Energy nationalized banks aur certified NBFCs ke sath milkar 6% se 7% starting interest rate par collateral-free solar financing provide karti hai. Isme zero down-payment option bhi available hai, jaha aapki electricity bill ki bachat se hi monthly EMI cover ho jaati hai."
    },
    {
      q: "Solar system lagane ke baad mera bijli ka bill kitna kam hoga?",
      a: "Ek standard on-grid solar system aapke bijli ke bill ko upar se 80% se 90% tak reduce kar deta hai. Din ke time jo extra bijli banti hai, woh bi-directional net meter ke through DISCOM grid ko feed hoti hai, jiska credit aapke monthly bill me adjust hota hai."
    },
    {
      q: "Solar panels ki warranty aur service support kya hai?",
      a: "Hum Tier-1 Monocrystalline Bifacial solar modules use karte hain jin par 25-30 saal ki 80%+ linear performance warranty aur inverters par 5-10 saal ki replacement warranty milti hai. Saath hi, SB Solar Protection ke tehat regular maintenance aur 24x7 IoT app monitoring provide ki jaati hai."
    },
    {
      q: "Installation me kitna time lagta hai?",
      a: "Site survey aur engineering structural audit ke baad physical rooftop installation 2 se 3 din me poori ho jaati hai. DISCOM approval aur net meter inspection me aamtaur par 7 se 15 din ka samay lagta hai, jisme hamari technical team end-to-end assist karti hai."
    },
    {
      q: "Kya cloudy ya barish ke dino me bhi solar kaam karta hai?",
      a: "Haan, modern Tier-1 mono PERC panels diffused sunlight (badal wale din) me bhi 25% se 40% electricity generate karte hain. Raat ke time aap regular DISCOM grid supply use karte hain jo din ki surplus generation se balance ho jaati hai."
    }
  ];

  return (
    <section className="py-14 sm:py-20 bg-slate-50 relative z-10 overflow-hidden border-t border-slate-200/80">
      <AnimatedBackground />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
          <span className="text-primary font-bold text-xs uppercase tracking-widest bg-primary/10 px-3.5 py-1.5 rounded-full inline-flex items-center gap-1.5 mb-3">
            <HelpCircle className="w-3.5 h-3.5" /> Frequently Asked Questions
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Frequently Asked <span className="text-primary">Questions</span>
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-2">
            Rooftop solar, PM Surya Ghar central subsidy aur EMI plans se jude sabhi aam sawalo ke jawab yaha payein.
          </p>
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-3.5">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className={`bg-white rounded-2xl border transition-all duration-200 overflow-hidden ${isOpen
                  ? 'border-primary/50 shadow-md ring-2 ring-primary/5'
                  : 'border-slate-200/80 hover:border-slate-300 shadow-xs'
                  }`}
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 cursor-pointer"
                >
                  <span className={`text-sm sm:text-base font-bold transition-colors ${isOpen ? 'text-primary' : 'text-slate-900'
                    }`}>
                    {faq.q}
                  </span>
                  <div className={`p-1.5 rounded-xl transition-all duration-200 shrink-0 ${isOpen ? 'bg-primary text-white rotate-180' : 'bg-slate-100 text-slate-500'
                    }`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
                    className="px-4 pb-4 sm:px-5 sm:pb-5 pt-0"
                  >
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal border-t border-slate-100 pt-3">
                      {faq.a}
                    </p>
                  </motion.div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom Helper Bar */}
        <div className="mt-8 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white rounded-2xl p-5 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-lg border border-slate-700">
          <div>
            <div className="text-sm font-bold text-white">Have more questions about your rooftop?</div>
            <div className="text-xs text-slate-300 mt-0.5">Our solar technical consultants are ready to assist with free rooftop feasibility assessment.</div>
          </div>
          <div className="flex items-center gap-2.5 shrink-0">
            <button
              onClick={() => navigate('/emi-solar-plan')}
              className="bg-primary hover:bg-primary-hover text-white px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer shadow-sm"
            >
              Calculate EMI
            </button>
            <button
              onClick={() => navigate('/contact')}
              className="bg-white/10 hover:bg-white/20 text-white border border-white/20 px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer"
            >
              Contact Support
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};

const Home = () => {
  return (
    <div className="flex flex-col min-h-screen relative">
      <HeroSlider />
      <SBSolarProtectionNotification />
      <FeaturesSection />
      <ProductsSection />
      <IndustrySection />
      <WhyChooseUsSection />
      <TestimonialsSection />
      <BrandsSection />
      <FAQSection />
      <CTASection />
    </div>
  );
};

export default Home;
