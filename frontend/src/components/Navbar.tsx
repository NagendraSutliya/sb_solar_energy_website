import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from './ui/Button';
import FreeSolarQuoteModal from './FreeSolarQuoteModal';

const NAV_LINKS = [
  { name: 'Home', path: '/' },
  { name: 'About Us', path: '/about' },
  { 
    name: 'Our Products', 
    path: '/products',
    dropdown: [
      { name: 'Solar PV Module', path: '/products/pv-module' },
      { name: 'Solar Light System', path: '/products/street-light' },
      { name: 'Solar Water Pump', path: '/products/water-pump' },
      { name: 'Solar Inverters', path: '/products/inverters' },
      { name: 'Inverters & Battery', path: '/products/batteries' },
      { name: 'Accessories', path: '/products/accessories' },
    ]
  },
  { 
    name: 'Services & Solutions', 
    path: '/services',
    dropdown: [
      { name: 'Residential Solar', path: '/services#residential' },
      { name: 'Commercial & Corporate', path: '/services#commercial' },
      { name: 'Industrial Solar', path: '/services#industrial' },
      { name: 'Utility Solar Parks', path: '/services#utility' },
      { name: 'EPC & Installation Services', path: '/services#services-list' },
      { name: 'Net Metering & O&M', path: '/services#services-list' },
    ]
  },
  { name: 'Solar Plan', path: '/emi-solar-plan', isEmi: true },
  { name: 'Support', path: '/contact' },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isPortalDropdownOpen, setIsPortalDropdownOpen] = useState(false);
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);
  const location = useLocation();
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setIsPortalDropdownOpen(false);
      }
    };

    const handleOpenQuote = () => setIsQuoteOpen(true);
    window.addEventListener('open-solar-quote', handleOpenQuote);

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      window.removeEventListener('open-solar-quote', handleOpenQuote);
    };
  }, []);

  return (
    <nav ref={navRef} className="sticky top-0 z-50 glass">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-14 md:h-20">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="flex flex-col items-center justify-center group pt-1">
              <img 
                src="/sb_logo.png" 
                alt="SB Solar Energy" 
                className="h-4 md:h-8 w-auto object-contain rounded shadow-sm group-hover:scale-105 transition-transform duration-300"
              />
              <span className="font-heading font-extrabold text-sm md:text-base text-slate-900 tracking-tight mt-1 leading-none">
                SB SOLAR <span className="text-primary">ENERGY</span>
              </span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-0.5 lg:gap-1">
            {NAV_LINKS.map((link) => (
              <div key={link.name} className="relative group">
                <Link
                  to={link.path}
                  className={cn(
                    "relative px-2 lg:px-2.5 py-1.5 text-xs lg:text-sm font-semibold tracking-normal transition-all duration-200 flex items-center gap-1 group/navlink rounded-md",
                    location.pathname === link.path
                      ? "text-primary bg-primary/10"
                      : "text-slate-700 hover:text-primary hover:bg-slate-100/70"
                  )}
                >
                  {link.isEmi ? (
                    <span className="inline-flex items-center gap-1">
                      <span className="bg-amber-100 text-amber-800 text-[10px] font-bold px-1.5 py-0.2 rounded-full border border-amber-300 shadow-xs animate-pulse">
                        EMI
                      </span>
                      <span className="text-orange-500 font-bold hover:text-orange-600 transition-colors">
                        {link.name}
                      </span>
                    </span>
                  ) : (
                    <span>{link.name}</span>
                  )}
                  {link.dropdown && <ChevronDown className="h-3.5 w-3.5 text-slate-400 transition-transform duration-200 group-hover:rotate-180 group-hover:text-primary" />}
                  
                  {/* Active Indicator Line */}
                  {location.pathname === link.path && (
                    <span className="absolute bottom-0 left-1.5 right-1.5 h-[2px] bg-primary rounded-full"></span>
                  )}
                </Link>

                {/* Dropdown */}
                {link.dropdown && (
                  <div className="absolute left-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform origin-top-left translate-y-2 group-hover:translate-y-0">
                    <div className="py-1" role="menu" aria-orientation="vertical">
                      {link.dropdown.map((dropLink) => (
                        <Link
                          key={dropLink.name}
                          to={dropLink.path}
                          className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-100 hover:text-primary"
                          role="menuitem"
                        >
                          {dropLink.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
          
          {/* Action buttons (Free Solar Quote + Portal Login) */}
          <div className="hidden md:flex items-center space-x-2 lg:space-x-3 ml-2 lg:ml-4 relative">
            {/* Free Solar Quote Button */}
            <button
              onClick={() => setIsQuoteOpen(true)}
              className="bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 hover:from-orange-600 hover:to-amber-600 text-white font-bold text-xs lg:text-sm px-4 lg:px-5 py-2.5 rounded-xl shadow-md shadow-orange-500/25 hover:shadow-orange-500/40 transition-all hover:scale-105 active:scale-95 cursor-pointer whitespace-nowrap"
            >
              Free Solar Quote
            </button>

            {/* Portal Login Dropdown */}
            <div className="relative">
              <button 
                onClick={() => setIsPortalDropdownOpen(!isPortalDropdownOpen)}
                className="bg-slate-900 text-white px-3.5 lg:px-4 py-2.5 rounded-xl font-medium text-xs lg:text-sm hover:bg-slate-800 transition-colors shadow-sm flex items-center gap-1.5"
              >
                Portal <ChevronDown className={cn("h-3.5 w-3.5 transition-transform duration-300", isPortalDropdownOpen && "rotate-180")} />
              </button>
              
              {/* Dropdown Menu */}
              <div className={cn(
                "absolute right-0 top-full mt-2 w-48 rounded-xl shadow-xl bg-white ring-1 ring-black/5 transition-all duration-200 transform origin-top-right overflow-hidden z-50",
                isPortalDropdownOpen ? "opacity-100 visible translate-y-0" : "opacity-0 invisible translate-y-2"
              )}>
                <div className="py-1">
                  <Link to="/portal/login?role=admin" onClick={() => setIsPortalDropdownOpen(false)} className="block px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-primary transition-colors">
                    Admin / Staff Login
                  </Link>
                  <Link to="/portal/login?role=customer" onClick={() => setIsPortalDropdownOpen(false)} className="block px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-primary border-t border-slate-100 transition-colors">
                    Customer Login
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-slate-700 hover:text-primary hover:bg-slate-100 focus:outline-none"
            >
              {isOpen ? <X className="block h-6 w-6" /> : <Menu className="block h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="md:hidden absolute top-full right-0 w-72 bg-white border-t border-slate-200 shadow-2xl origin-top-right rounded-bl-3xl overflow-hidden"
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 max-h-[calc(100vh-4rem)] overflow-y-auto">
            {NAV_LINKS.map((link) => (
              <div key={link.name}>
                {link.dropdown ? (
                  <div className={cn(
                    "flex items-center justify-between rounded-r-md border-l-4 transition-all duration-200",
                    location.pathname.startsWith(link.path) || activeDropdown === link.name
                      ? "bg-primary/10 border-primary shadow-sm"
                      : "border-transparent hover:bg-slate-50"
                  )}>
                    <Link
                      to={link.path}
                      className={cn(
                        "block px-4 py-3 text-base font-semibold flex-1",
                        location.pathname === link.path ? "text-primary" : "text-slate-700 hover:text-primary"
                      )}
                      onClick={() => setIsOpen(false)}
                    >
                      {link.name}
                    </Link>
                    <button
                      onClick={() => setActiveDropdown(activeDropdown === link.name ? null : link.name)}
                      className={cn(
                        "p-3 transition-colors",
                        activeDropdown === link.name ? "text-primary" : "text-slate-500 hover:text-primary"
                      )}
                    >
                      <ChevronDown className={cn("h-5 w-5 transition-transform duration-300", activeDropdown === link.name && "rotate-180")} />
                    </button>
                  </div>
                ) : (
                  <Link
                    to={link.path}
                    className={cn(
                      "block px-4 py-3 rounded-r-md text-base font-semibold transition-all duration-200",
                      location.pathname === link.path
                        ? "text-primary bg-primary/10 shadow-sm border-l-4 border-primary"
                        : "text-slate-700 hover:text-primary hover:bg-slate-50 border-l-4 border-transparent"
                    )}
                    onClick={() => setIsOpen(false)}
                  >
                    {link.isEmi && (
                      <span className="bg-amber-100 text-amber-800 text-[10px] font-black px-1.5 py-0.5 rounded mr-1.5 border border-amber-300">
                        EMI
                      </span>
                    )}
                    {link.name}
                  </Link>
                )}
                
                <AnimatePresence>
                  {link.dropdown && activeDropdown === link.name && (
                    <motion.div 
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="pl-4 space-y-1 mt-1 bg-slate-50/50 py-2 rounded-lg border-l-2 border-slate-100 ml-2">
                        {link.dropdown.map((dropLink) => (
                          <Link
                            key={dropLink.name}
                            to={dropLink.path}
                            className="block px-3 py-2 rounded-md text-sm font-medium text-slate-600 hover:bg-slate-100 hover:text-primary transition-colors"
                            onClick={() => setIsOpen(false)}
                          >
                            {dropLink.name}
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}

            {/* Mobile Quote CTA */}
            <div className="pt-3 pb-2">
              <button
                onClick={() => {
                  setIsOpen(false);
                  setIsQuoteOpen(true);
                }}
                className="w-full bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 text-white font-bold text-sm py-3 px-4 rounded-xl shadow-md flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Free Solar Quote</span>
              </button>
            </div>
          </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Free Solar Quote Modal */}
      <FreeSolarQuoteModal isOpen={isQuoteOpen} onClose={() => setIsQuoteOpen(false)} />
    </nav>
  );
};


export default Navbar;
