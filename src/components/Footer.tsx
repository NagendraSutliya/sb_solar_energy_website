import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Sun, Zap } from 'lucide-react';
import { FaFacebook, FaInstagram, FaYoutube } from 'react-icons/fa';
import { motion } from 'framer-motion';

const FooterParticles = () => {
  const particles = Array.from({ length: 12 }).map((_, i) => ({
    id: i,
    isSun: i % 2 === 0,
    left: `${Math.random() * 90 + 5}%`,
    top: `${Math.random() * 80 + 10}%`,
    delay: Math.random() * -2,
    duration: Math.random() * 3 + 2.5,
    xJump: (Math.random() - 0.5) * 100, 
    yJump: (Math.random() - 0.5) * 100, 
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 opacity-20">
      {particles.map(p => (
        <motion.div
          key={p.id}
          className={`absolute ${p.isSun ? 'text-amber-400' : 'text-primary'}`}
          style={{ left: p.left, top: p.top }}
          animate={{
            x: [0, p.xJump, 0],
            y: [0, p.yJump, 0],
            rotate: p.isSun ? [0, 180, 360] : [-15, 15, -15],
            scale: [1, 1.3, 1]
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: p.delay,
          }}
        >
          {p.isSun ? <Sun className="h-6 w-6" /> : <Zap className="h-6 w-6" />}
        </motion.div>
      ))}
    </div>
  );
};

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-10 md:pt-16 pb-6 md:pb-8 border-t border-slate-800 relative overflow-hidden">
      <FooterParticles />
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 mb-8 md:mb-12">
          
          {/* Brand & About */}
          <div className="space-y-4">
           <Link to="/" className="flex flex-col items-start space-y-2">
              <img src="/sb_logo.png" alt="Logo" className="h-10 md:h-12 w-auto" />
              <span className="font-heading font-extrabold text-xl md:text-2xl text-white tracking-tight leading-none">
                SB SOLAR <span className="text-primary">ENERGY</span>
              </span>
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed">
              Premium Quality Solar Projects Solution For All Around Renewable Energy Sources. 
              Partnering With Local People For Our Businesses, We Have Created An Environment Of Growth And Progress.
            </p>
            <div className="flex space-x-4 pt-2">
              <a href="https://www.facebook.com/" target="_blank" rel="noreferrer" className="text-slate-400 hover:text-primary transition-colors">
               <FaFacebook className="h-5 w-5" />
              </a>
              <a href="https://www.instagram.com/sb_industries_jaipur" target="_blank" rel="noreferrer" className="text-slate-400 hover:text-primary transition-colors">
               <FaInstagram className="h-5 w-5" />
              </a>
              <a href="https://www.youtube.com/" target="_blank" rel="noreferrer" className="text-slate-400 hover:text-primary transition-colors">
               <FaYoutube className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold text-white mb-6 uppercase tracking-wider">Quick Links</h3>
            <ul className="space-y-3">
              {[
                { name: 'Home', path: '/' },
                { name: 'About Us', path: '/about' },
                { name: 'EMI Solar Plan', path: '/emi-solar-plan' },
                { name: 'Services & Solutions', path: '/services' },
                { name: 'Typography Studio (Test)', path: '/typography-test' },
                { name: 'Terms and Conditions', path: '/terms-and-conditions' },
                { name: 'Privacy Policy', path: '/privacy-policy' },
              ].map((link) => (
                <li key={link.name}>
                  <Link to={link.path} className="text-slate-400 hover:text-primary transition-colors text-sm flex items-center gap-1.5">
                    {link.name}
                    {link.path === '/typography-test' && (
                      <span className="text-[10px] bg-primary/20 text-primary font-bold px-1.5 py-0.2 rounded">
                        NEW
                      </span>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Industry Solutions */}
          <div>
            <h3 className="text-lg font-bold text-white mb-6 uppercase tracking-wider">Industry Solutions</h3>
            <ul className="space-y-3">
              {[
                'Residential Solution',
                'Corporate Solution',
                'Industrial',
                'Solar Parks',
                'Safe City'
              ].map((item) => (
                <li key={item} className="text-slate-400 text-sm">
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Us */}
          <div>
            <h3 className="text-lg font-bold text-white mb-6 uppercase tracking-wider">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <span className="text-sm text-slate-400">Jaipur, Rajasthan, India</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-primary shrink-0" />
                <a href="tel:07023204664" className="text-sm text-slate-400 hover:text-white transition-colors">+91 7023204664</a>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-primary shrink-0" />
                <a href="mailto:support@sbsolarenergy.in" className="text-sm text-slate-400 hover:text-white transition-colors break-all">support@sbsolarenergy.in</a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-6 md:pt-8 mt-6 md:mt-8 border-t border-slate-800 flex flex-col md:flex-row justify-center items-center gap-3 md:gap-6 relative text-center md:text-left">
          
          {/* Jumping Solar Animation */}
          <motion.div
            animate={{ y: [0, -15, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            className="absolute left-1/2 -top-5 md:-top-6 -translate-x-1/2 text-amber-400 bg-slate-900 p-2 rounded-full border border-slate-700 shadow-[0_0_15px_rgba(251,191,36,0.15)]"
          >
            <Sun className="h-5 w-5 md:h-6 md:w-6" />
          </motion.div>

          <p className="text-xs md:text-sm text-slate-500 mt-2 md:mt-0">
            © {new Date().getFullYear()} SB SOLAR ENERGY .in All Rights Reserved.
          </p>
          <p className="text-xs md:text-sm text-slate-500">
            POWERED BY <a href="https://lrgroup.in" target="_blank" rel="noreferrer" className="text-primary hover:text-primary-hover font-bold tracking-wider transition-colors">LR GROUP</a>
          </p>
        </div>
      </div>
    </footer>
  );
};


export default Footer;
