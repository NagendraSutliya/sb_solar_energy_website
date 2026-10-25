import AnimatedBackground from '../components/AnimatedBackground';
import SbIndustriesEcosystem from '../components/SbIndustriesEcosystem';
import { Award, Target, Users, Shield, Leaf, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

const TEAM_MEMBERS = [
  { 
    name: 'Rahul Devanda', 
    role: 'Managing Director', 
    initials: 'RD', 
    image: '/team/rahul_devanda.jpg', 
    desc: 'Over 20 years of visionary leadership in the sustainable energy sector.' 
  },
  { 
    name: 'Rajendrasa Kudi', 
    role: 'Chief Technical Officer', 
    initials: 'RK', 
    image: '/team/rajendrasa_kudi.jpg', 
    desc: 'Expert in solar PV engineering and large-scale grid integration.' 
  },
  { 
    name: 'Vishal Choudhary', 
    role: 'Head of Operations', 
    initials: 'VC', 
    image: '/team/vishal_choudhary.jpg', 
    desc: 'Ensuring seamless project execution and unmatched quality control.' 
  },
  { 
    name: 'Harphool Choudhary', 
    role: 'Customer Success Manager', 
    initials: 'HC', 
    image: '/team/harphool_choudhary.jpg', 
    desc: 'Dedicated to providing 24/7 support and ensuring complete client satisfaction.' 
  }
];

const AboutUs = () => {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      
      {/* Hero Section */}
      <section className="relative min-h-[200px] md:h-[300px] flex items-center justify-center bg-fixed bg-center bg-cover overflow-hidden z-10"
        style={{ backgroundImage: "url('/about_hero.png')" }}
      >
        <AnimatedBackground />
        <div className="absolute inset-0 bg-slate-900/65 z-0"></div>
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto py-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-primary font-bold tracking-widest uppercase text-xs mb-1.5 block">Our Journey</span>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-white mb-2 leading-tight">
              Pioneering a Brighter, <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-emerald-400">Greener Future</span>
            </h1>
            <p className="text-xs sm:text-sm md:text-base text-slate-200 font-normal max-w-2xl mx-auto leading-relaxed">
              Discover the mission, values, and relentless innovation driving SB Solar Energy to the forefront of renewable integration in India.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Sleek Stats Bar */}
      <section className="relative z-30 -mt-10 max-w-5xl mx-auto px-6 md:px-4 w-full overflow-hidden">
      <AnimatedBackground />
        <div className="bg-white rounded-xl shadow-lg shadow-slate-200/50 py-1 md:py-6 border border-slate-100 flex flex-col md:flex-row items-center divide-y md:divide-y-0 md:divide-x divide-slate-100">
          {[
            { icon: Users, value: "1,000+", label: "Happy Clients", color: "text-blue-500" },
            { icon: Zap, value: "10MW+", label: "Energy Generated", color: "text-amber-500" },
            { icon: Shield, value: "25+", label: "Years Warranty", color: "text-emerald-500" },
            { icon: Leaf, value: "100%", label: "Eco-Friendly", color: "text-green-500" }
          ].map((stat, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="flex items-center justify-center w-full md:w-1/4 py-2 md:py-0 group"
            >
              <stat.icon className={`h-5 w-5 md:h-6 md:w-6 ${stat.color} mr-3 group-hover:scale-110 transition-transform`} strokeWidth={2.5} />
              <div className="flex flex-col text-left justify-center">
                <span className="font-bold text-base md:text-lg text-slate-900 leading-tight">{stat.value}</span>
                <span className="font-semibold text-xs text-slate-500 uppercase tracking-wider leading-none mt-1">{stat.label}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Who We Are Content */}
      <section className="py-6 sm:py-10 md:py-20 bg-slate-50 relative z-10 overflow-hidden">
      <AnimatedBackground />
        <div className="max-w-7xl mx-auto px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-16 items-center">
            
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-xl sm:text-2xl md:text-4xl font-bold text-slate-900 mb-4 md:mb-6">
                Leading the Transition to <span className="text-primary">Sustainable Energy</span>
              </h2>
              <div className="w-16 md:w-20 h-1.5 bg-primary rounded-full mb-6 md:mb-8"></div>
              
              <p className="text-slate-600 text-sm md:text-base font-medium leading-relaxed mb-4 md:mb-6">
                SB Solar Energy, a proud flagship division of <a href="#sb-industries" className="text-[#dc2626] hover:text-[#1e3a8a] font-bold underline decoration-red-300 underline-offset-4 transition-colors">SB Industries</a>, is an <strong className="text-slate-900 font-bold">ISO 9001:2015 CERTIFIED</strong> company dedicated to engineering the most advanced solar systems in the industry. Based in the heart of India, we leverage the multi-sector strength of our parent group to deliver reliable, high-yield renewable solutions.
              </p>
              <p className="text-slate-600 text-sm md:text-base font-medium leading-relaxed mb-6 md:mb-8">
                From residential rooftops to massive utility-scale solar parks, our systems are trusted by over 1,000 businesses, universities, government institutions, and families. We don't just sell panels; we deliver complete energy independence at an affordable price, ensuring long-term sustainability.
              </p>
              
              <div className="flex items-center space-x-6 bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                <div className="h-16 w-16 bg-emerald-100 rounded-2xl flex items-center justify-center shrink-0">
                  <Award className="h-8 w-8 text-primary" />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-slate-900">ISO 9001:2015 Certified</h3>
                  <p className="text-sm text-slate-500 mt-1 leading-relaxed">
                    Internationally recognized for our rigorous quality management and operational excellence across all projects.
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="aspect-[4/5] md:aspect-square rounded-3xl overflow-hidden shadow-2xl border-[8px] border-white relative z-10 bg-slate-200">
                <img src="/about_us_solar_epic.png" alt="Solar Energy Farm Landscape" className="w-full h-full object-cover" />
              </div>
              
              {/* Decorative Elements */}
              <div className="absolute -bottom-6 -left-6 w-48 h-48 bg-amber-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 z-0"></div>
              <div className="absolute -top-6 -right-6 w-48 h-48 bg-primary rounded-full mix-blend-multiply filter blur-3xl opacity-30 z-0"></div>
              
              
            </motion.div>

          </div>
        </div>
      </section>

      {/* SB Industries Conglomerate & Ecosystem */}
      <div id="sb-industries">
        <SbIndustriesEcosystem />
      </div>

      {/* Core Values Section */}
      <section className="py-10 md:py-20 bg-white relative overflow-hidden z-10">
      <AnimatedBackground />
        <div className="absolute inset-0 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:40px_40px] opacity-[0.03]"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-10 md:mb-12">
            <h2 className="text-2xl md:text-4xl font-bold text-slate-900 mb-3 md:mb-4">The Pillars of Our Success</h2>
            <div className="w-16 h-1 bg-primary mx-auto mb-6 rounded-full"></div>
            <p className="text-sm md:text-base text-slate-600 font-medium">These core principles guide every project we undertake, ensuring maximum satisfaction for our clients and maximum benefit for the planet.</p>
          </div>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
            {[
              { title: 'Our Mission', icon: Target, desc: 'To illuminate homes and businesses with clean, affordable, and sustainable energy solutions.' },
              { title: 'Our Vision', icon: Leaf, desc: 'To create a carbon-neutral world powered entirely by decentralized, renewable technology.' },
              { title: 'Unmatched Quality', icon: Shield, desc: 'We utilize exclusively Tier-1 components, delivering systems designed to last over 25 years.' },
              { title: 'Expert Team', icon: Users, desc: 'Unlimited support from the industry\'s top technical engineers and customer care experts.' }
            ].map((item, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                className="bg-slate-50 p-8 rounded-3xl border border-slate-100 hover:border-primary/30 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 group"
              >
                <div className="h-16 w-16 bg-white shadow-sm rounded-2xl flex items-center justify-center mb-6 group-hover:bg-primary transition-colors duration-300 border border-slate-100">
                  <item.icon className="h-8 w-8 text-primary group-hover:text-white transition-colors duration-300" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-4">{item.title}</h3>
                <p className="text-slate-600 leading-relaxed text-sm">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Team Section */}
      <section className="py-10 md:py-20 bg-slate-50 relative z-10 overflow-hidden">
      <AnimatedBackground />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-10 md:mb-12">
            <h2 className="text-2xl md:text-4xl font-bold text-slate-900 mb-3 md:mb-4">Meet Our Leadership</h2>
            <div className="w-16 h-1 bg-primary mx-auto mb-6 rounded-full"></div>
            <p className="text-sm md:text-base text-slate-600 font-medium">The passionate experts and visionaries driving our mission to illuminate the world with sustainable energy.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {TEAM_MEMBERS.map((member, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                className="bg-white rounded-3xl p-6 text-center shadow-sm border border-slate-100 hover:shadow-xl hover:border-primary/20 transition-all duration-300 hover:-translate-y-2 group flex flex-col justify-between"
              >
                <div>
                  {/* Photo Container with Gradient Border */}
                  <div className="relative w-28 h-28 md:w-36 md:h-36 mx-auto rounded-full p-1 bg-gradient-to-tr from-primary via-emerald-400 to-teal-500 shadow-lg shadow-emerald-500/15 mb-5 group-hover:scale-105 transition-all duration-300">
                    <div className="w-full h-full rounded-full overflow-hidden bg-slate-100 relative">
                      <img 
                        src={member.image} 
                        alt={member.name}
                        className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-110"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                        }}
                      />
                      {/* Initials fallback behind image */}
                      <div className="absolute inset-0 -z-10 flex items-center justify-center bg-gradient-to-br from-primary to-emerald-400 text-white font-bold text-2xl md:text-3xl">
                        {member.initials}
                      </div>
                    </div>
                  </div>

                  <h3 className="text-lg md:text-xl font-bold text-slate-900 mb-1 group-hover:text-primary transition-colors">
                    {member.name}
                  </h3>
                  <p className="text-primary font-bold text-xs uppercase tracking-wider mb-3">
                    {member.role}
                  </p>
                  <p className="text-slate-500 text-xs md:text-sm leading-relaxed">
                    {member.desc}
                  </p>
                </div>

                <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-center gap-1.5 text-[11px] font-semibold text-slate-400">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span>Leadership Team</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
};

export default AboutUs;
