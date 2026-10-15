import AnimatedBackground from '../components/AnimatedBackground';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Search, 
  ChevronDown, 
  LayoutGrid, 
  List, 
  CheckCircle, 
  AlertCircle, 
  ShieldCheck, 
  Star, 
  Building2, 
  RotateCcw, 
  User, 
  Check, 
  Zap, 
  Award 
} from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '../components/ui/Button';
import { useState, useEffect, useMemo } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { indiaStatesDistricts } from '../data/indiaStatesDistricts';
import { getStoredVendors, type Vendor } from '../data/vendorStorage';

const POPULAR_DISTRICTS = ['All', 'Dungarpur', 'Jaipur', 'Jodhpur', 'Udaipur', 'Kota', 'Sikar', 'Bikaner', 'Ajmer', 'Banswara', 'Bhilwara', 'Alwar'];

const Contact = () => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState<'contact' | 'vendor'>(location.state?.activeTab || 'contact');
  const [vendors, setVendors] = useState<Vendor[]>(() => getStoredVendors());
  const [selectedState, setSelectedState] = useState('Rajasthan');
  const [selectedDistrict, setSelectedDistrict] = useState(location.state?.district || '');
  const [selectedType, setSelectedType] = useState<'all' | 'dealer' | 'installer' | 'distributor'>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const handleUpdate = () => {
      setVendors(getStoredVendors());
    };
    window.addEventListener('sb-vendors-updated', handleUpdate);
    return () => window.removeEventListener('sb-vendors-updated', handleUpdate);
  }, []);

  const districtCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    vendors.forEach(v => {
      if (v.status === 'Approved' && v.district) {
        counts[v.district] = (counts[v.district] || 0) + 1;
      }
    });
    return counts;
  }, [vendors]);

  const getWhatsAppUrl = (vendor: Vendor) => {
    const cleanNumber = vendor.contact.replace(/\D/g, '');
    const number = cleanNumber.startsWith('91') ? cleanNumber : `91${cleanNumber}`;
    const text = encodeURIComponent(`Hello ${vendor.name}, I found your dealership on the SB Solar website and would like a quote for rooftop solar in ${vendor.district || 'Rajasthan'}.`);
    return `https://wa.me/${number}?text=${text}`;
  };

  // Contact Form State
  const [contactData, setContactData] = useState({ name: '', email: '', subject: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [statusMessage, setStatusMessage] = useState('');

  const handleContactChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setContactData({ ...contactData, [e.target.id]: e.target.value });
  };

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: "ab13e878-4fba-4132-8d33-c8532b57020a", 
          subject: contactData.subject || "New Contact Form Submission",
          from_name: "SB Solar Website",
          "Sender Name": contactData.name,
          "Sender Email": contactData.email,
          "Message": contactData.message,
        }),
      });
      const result = await response.json();
      if (result.success) {
        setSubmitStatus('success');
        setStatusMessage("Message sent successfully! Our team will contact you shortly.");
        setContactData({ name: '', email: '', subject: '', message: '' });
      } else {
        setSubmitStatus('error');
        setStatusMessage("Something went wrong. Please try again.");
      }
    } catch (error) {
      setSubmitStatus('error');
      setStatusMessage("Error sending message. Please check your connection.");
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus('idle'), 5000);
    }
  };

  const filteredVendors = vendors.filter(vendor => {
    // Only display Approved vendors in public directory
    if (vendor.status && vendor.status !== 'Approved') return false;

    // Filter by partnership type
    if (selectedType !== 'all') {
      if (vendor.businessType !== selectedType) return false;
    }

    // Filter by selected state if specified
    if (selectedState) {
      const matchState = 
        (vendor.state && vendor.state.toLowerCase() === selectedState.toLowerCase()) ||
        (vendor.address && vendor.address.toLowerCase().includes(selectedState.toLowerCase()));
      if (!matchState) return false;
    }

    // Filter by selected district if specified
    if (selectedDistrict) {
      const matchDistrict = 
        (vendor.district && vendor.district.toLowerCase() === selectedDistrict.toLowerCase()) ||
        (vendor.address && vendor.address.toLowerCase().includes(selectedDistrict.toLowerCase()));
      if (!matchDistrict) return false;
    }

    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchQuery =
        vendor.name.toLowerCase().includes(q) ||
        vendor.address.toLowerCase().includes(q) ||
        vendor.contact.toLowerCase().includes(q) ||
        (vendor.contactPerson && vendor.contactPerson.toLowerCase().includes(q)) ||
        (vendor.district && vendor.district.toLowerCase().includes(q)) ||
        (vendor.state && vendor.state.toLowerCase().includes(q)) ||
        (vendor.rating && vendor.rating.toString().includes(q)) ||
        (vendor.tags && vendor.tags.some(tag => tag.toLowerCase().includes(q)));
      if (!matchQuery) return false;
    }

    return true;
  });

  return (
    <div className="flex flex-col min-h-screen">
      {/* Page Header */}
      <section className="relative min-h-[200px] md:h-[300px] flex items-center justify-center bg-fixed bg-cover overflow-hidden z-10"
        style={{
          backgroundImage: "url('/contact_hero.png')",
          backgroundPosition: "center 70%" 
        }}
      >
        <AnimatedBackground />
        <div className="absolute inset-0 bg-slate-900/75 z-0"></div>
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto py-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-primary font-bold tracking-widest uppercase text-xs mb-1.5 block">24/7 Assistance</span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white mb-2">
              Contact &amp; <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-emerald-400">Support</span>
            </h1>
            <p className="text-xs sm:text-sm md:text-base text-slate-200 font-normal max-w-2xl mx-auto leading-relaxed">
              Get in touch with our expert technical support team for inquiries, quotes, or immediate assistance.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Tab Switcher */}
      <div className="bg-white shadow-sm border-b border-slate-200 sticky top-[72px] z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center space-x-8 md:space-x-16">
            <button 
              onClick={() => setActiveTab('contact')}
              className={`py-4 md:py-5 font-bold text-sm md:text-base border-b-[3px] transition-colors ${activeTab === 'contact' ? 'border-primary text-primary' : 'border-transparent text-slate-500 hover:text-slate-900'}`}
            >
              Contact Support
            </button>
            <button 
              onClick={() => setActiveTab('vendor')}
              className={`py-4 md:py-5 font-bold text-sm md:text-base border-b-[3px] transition-colors ${activeTab === 'vendor' ? 'border-primary text-primary' : 'border-transparent text-slate-500 hover:text-slate-900'}`}
            >
              Find a Vendor
            </button>
          </div>
        </div>
      </div>

      {activeTab === 'contact' ? (
        <section className="py-20 bg-slate-50 relative overflow-hidden z-10">
      <AnimatedBackground />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            
            {/* Contact Information */}
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-8">Get In Touch</h2>
              
              <div className="space-y-8">
                <div className="flex items-start space-x-4">
                  <div className="bg-white p-3 rounded-full shadow-sm">
                    <Phone className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-lg mb-1">Phone Number</h3>
                    <p className="text-slate-600">+91 7023204664</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-white p-3 rounded-full shadow-sm">
                    <Mail className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-lg mb-1">Email Address</h3>
                    <p className="text-slate-600 break-all">sbindustries2121@gmail.com</p>
                    <p className="text-slate-600 break-all">support@sbsolarenergy.in</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-white p-3 rounded-full shadow-sm">
                    <MapPin className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-lg mb-1">Location</h3>
                    <p className="text-slate-600">Jaipur, Rajasthan, India</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-white p-3 rounded-full shadow-sm">
                    <Clock className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-lg mb-1">Business Hours</h3>
                    <p className="text-slate-600">Monday - Saturday: 9:00 AM - 6:00 PM</p>
                  </div>
                </div>
              </div>

              {/* Map Embed */}
              <div className="mt-10 rounded-2xl overflow-hidden shadow-sm border border-slate-100 h-[250px]">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d211.50583965914583!2d75.58637852981474!3d26.986484315565846!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e1!3m2!1sen!2sin!4v1784194048018!5m2!1sen!2sin" 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen={true} 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                  title="SB Solar Energy Location in Jaipur"
                ></iframe>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white p-8 md:p-10 rounded-2xl shadow-sm border border-slate-100 flex flex-col h-full relative">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">Send a Message</h2>
              
              <AnimatePresence>
                {submitStatus !== 'idle' && (
                  <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    className={`mb-6 p-4 rounded-xl border flex items-start space-x-3 ${
                      submitStatus === 'success' 
                        ? 'bg-green-50 border-green-200 text-green-800' 
                        : 'bg-red-50 border-red-200 text-red-800'
                    }`}
                  >
                    {submitStatus === 'success' ? (
                      <CheckCircle className="h-5 w-5 shrink-0 mt-0.5 text-green-600" />
                    ) : (
                      <AlertCircle className="h-5 w-5 shrink-0 mt-0.5 text-red-600" />
                    )}
                    <div>
                      <h4 className={`font-bold ${submitStatus === 'success' ? 'text-green-900' : 'text-red-900'}`}>
                        {submitStatus === 'success' ? 'Success!' : 'Oops!'}
                      </h4>
                      <p className="text-sm mt-0.5 opacity-90">{statusMessage}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <form className="space-y-6 flex flex-col flex-grow" onSubmit={handleContactSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-2">Your Name</label>
                    <input type="text" id="name" required value={contactData.name} onChange={handleContactChange} className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-shadow" placeholder="John Doe" />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">Your Email</label>
                    <input type="email" id="email" required value={contactData.email} onChange={handleContactChange} className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-shadow" placeholder="john@example.com" />
                  </div>
                </div>
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-slate-700 mb-2">Subject</label>
                  <input type="text" id="subject" value={contactData.subject} onChange={handleContactChange} className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-shadow" placeholder="How can we help?" />
                </div>
                <div className="flex-grow">
                  <label htmlFor="message" className="block text-sm font-medium text-slate-700 mb-2">Message</label>
                  <textarea id="message" required value={contactData.message} onChange={handleContactChange} className="w-full h-[150px] md:h-[calc(100%-2rem)] px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-shadow resize-none" placeholder="Your message here..."></textarea>
                </div>
                <div className="mt-auto pt-4">
                  <Button type="submit" disabled={isSubmitting} className="w-full h-14 text-lg">
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </Button>
                </div>
              </form>
            </div>

          </div>
        </div>
      </section>
      ) : (
      <section className="py-12 md:py-16 bg-slate-50/70 border-t border-slate-200 relative overflow-hidden z-10">
        <AnimatedBackground />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Quick District Navigation Pills */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                <MapPin className="h-3.5 w-3.5 text-primary" /> Popular Coverage Districts in Rajasthan:
              </span>
              <span className="text-xs text-slate-400 hidden sm:inline">
                Click any district for instant verified dealers
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              {POPULAR_DISTRICTS.map((dist) => {
                const isSelected = (dist === 'All' && !selectedDistrict) || selectedDistrict === dist;
                const count = dist === 'All' 
                  ? vendors.filter(v => v.status === 'Approved').length 
                  : (districtCounts[dist] || 0);

                return (
                  <button
                    key={dist}
                    onClick={() => {
                      setSelectedDistrict(dist === 'All' ? '' : dist);
                    }}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all flex items-center gap-1.5 ${
                      isSelected
                        ? 'bg-primary text-white shadow-md shadow-primary/25 scale-105'
                        : 'bg-white text-slate-700 border border-slate-200 hover:border-primary/50 hover:bg-slate-50'
                    }`}
                  >
                    <span>{dist}</span>
                    <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                      isSelected ? 'bg-white/25 text-white' : 'bg-slate-100 text-slate-600'
                    }`}>
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            
            {/* Left Sidebar (Filters) */}
            <div className="lg:col-span-1 space-y-6">
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 space-y-5">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
                    <Building2 className="h-4 w-4 text-primary" />
                    Filter Partners
                  </h3>
                  {(selectedDistrict || searchQuery || selectedType !== 'all') && (
                    <button
                      onClick={() => {
                        setSelectedDistrict('');
                        setSearchQuery('');
                        setSelectedType('all');
                      }}
                      className="text-xs text-primary hover:underline flex items-center gap-1 font-semibold"
                    >
                      <RotateCcw className="h-3 w-3" /> Reset
                    </button>
                  )}
                </div>

                {/* Search Input */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">Search by Name or Area</label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <input
                      type="text"
                      placeholder="e.g. Dungarpur, Jaipur, name..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-200 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                    />
                  </div>
                </div>

                {/* State (Fixed to Rajasthan) */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="block text-xs font-bold text-slate-700">State / Region</label>
                    <span className="text-[10px] text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded-full flex items-center gap-1">
                      <Check className="h-3 w-3" /> Verified
                    </span>
                  </div>
                  <div className="relative">
                    <select
                      className="w-full appearance-none bg-slate-50 border border-slate-200 rounded-xl py-2.5 pl-3 pr-8 text-xs font-semibold text-slate-800 outline-none cursor-default"
                      value={selectedState}
                      onChange={(e) => setSelectedState(e.target.value)}
                    >
                      {Object.keys(indiaStatesDistricts).map((state) => (
                        <option key={state} value={state}>{state} (Primary Service Area)</option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
                  </div>
                </div>

                {/* District Select */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">Select District</label>
                  <div className="relative">
                    <select
                      className="w-full appearance-none bg-white border border-slate-200 rounded-xl py-2.5 pl-3 pr-8 text-xs outline-none focus:border-primary focus:ring-1 focus:ring-primary cursor-pointer shadow-sm text-slate-800 font-medium"
                      value={selectedDistrict}
                      onChange={(e) => setSelectedDistrict(e.target.value)}
                    >
                      <option value="">All Rajasthan Districts ({vendors.filter(v => v.status === 'Approved').length} Partners)</option>
                      {selectedState && indiaStatesDistricts[selectedState]?.map((district) => {
                        const count = districtCounts[district] || 0;
                        return (
                          <option key={district} value={district}>
                            {district} {count > 0 ? `(${count} verified ${count === 1 ? 'partner' : 'partners'})` : '(Direct Hub Service)'}
                          </option>
                        );
                      })}
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
                  </div>
                </div>

                {/* Partnership Type */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">Partner Category</label>
                  <select
                    className="w-full appearance-none bg-white border border-slate-200 rounded-xl py-2.5 pl-3 pr-8 text-xs outline-none focus:border-primary focus:ring-1 focus:ring-primary cursor-pointer shadow-sm text-slate-700"
                    value={selectedType}
                    onChange={(e) => setSelectedType(e.target.value as any)}
                  >
                    <option value="all">All Categories</option>
                    <option value="dealer">Certified Dealers</option>
                    <option value="installer">System Installers &amp; EPC</option>
                    <option value="distributor">Regional Distributors</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
                </div>
              </div>

              {/* Direct SB Solar Helpline Support Card */}
              <div className="bg-gradient-to-br from-indigo-900 to-slate-900 text-white rounded-2xl p-5 shadow-lg relative overflow-hidden">
                <div className="absolute top-0 right-0 -mr-6 -mt-6 w-24 h-24 bg-primary/20 rounded-full blur-xl pointer-events-none"></div>
                <div className="relative z-10 space-y-3">
                  <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold">
                    <ShieldCheck className="h-4 w-4" /> Direct Factory Support
                  </div>
                  <h4 className="font-bold text-white text-sm leading-snug">
                    Can't find an installer near your farm or home?
                  </h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Our central engineering team directly provides free site visits, subsidy paperwork, and guaranteed installations across all Rajasthan tehsils.
                  </p>
                  
                  <div className="pt-2 space-y-2">
                    <a
                      href="tel:+917023204664"
                      className="w-full py-2 px-3 bg-white text-slate-900 hover:bg-slate-100 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-colors shadow-sm"
                    >
                      <Phone className="h-3.5 w-3.5 text-primary" /> +91 70232 04664
                    </a>
                    <button
                      onClick={() => window.dispatchEvent(new CustomEvent('open-solar-quote'))}
                      className="w-full py-2 px-3 bg-primary/90 hover:bg-primary text-white rounded-xl text-xs font-bold transition-colors"
                    >
                      Request Free Site Survey
                    </button>
                  </div>
                </div>
              </div>

              {/* Become Partner Card */}
              <div className="bg-white rounded-2xl border border-dashed border-slate-300 p-5 text-center">
                <Award className="h-8 w-8 text-primary mx-auto mb-2 opacity-80" />
                <h5 className="font-bold text-slate-800 text-sm">Become a Channel Partner</h5>
                <p className="text-xs text-slate-500 mt-1 mb-3">
                  Are you a solar installer or dealer in {selectedDistrict || 'Rajasthan'}? Join SB Solar's certified network.
                </p>
                <Link
                  to="/vendor-registration"
                  className="inline-flex items-center text-xs font-bold text-primary hover:text-primary/80"
                >
                  Apply for Dealership &rarr;
                </Link>
              </div>
            </div>

            {/* Right Main Content */}
            <div className="lg:col-span-3 space-y-6">
              
              {/* Regional Guarantee Card for selected district */}
              <div className="bg-gradient-to-r from-emerald-600 to-teal-700 text-white rounded-2xl p-5 sm:p-6 shadow-md flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
                <div className="space-y-1.5">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="bg-white/20 text-white text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-full">
                      Rajasthan Certified Network
                    </span>
                    <span className="text-emerald-200 text-xs font-medium flex items-center gap-1">
                      <Zap className="h-3.5 w-3.5 text-amber-300" /> PM Surya Ghar: Up to ₹78,000 Subsidy
                    </span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold">
                    Authorized Solar Coverage for {selectedDistrict ? `${selectedDistrict} District` : 'All Rajasthan'}
                  </h3>
                  <p className="text-xs text-emerald-100 max-w-xl leading-relaxed">
                    All listed partners are verified by SB Solar Energy. Enjoy 25 years linear warranty on solar PV modules, Tier-1 inverters, and seamless net metering approvals.
                  </p>
                </div>
                <div className="shrink-0 flex items-center gap-2.5 w-full sm:w-auto">
                  <button
                    onClick={() => window.dispatchEvent(new CustomEvent('open-solar-quote'))}
                    className="flex-1 sm:flex-none px-4 py-2.5 bg-white text-emerald-900 hover:bg-emerald-50 rounded-xl text-xs font-bold transition-all shadow-sm whitespace-nowrap"
                  >
                    Get Free Quote
                  </button>
                  <a
                    href="https://wa.me/917023204664?text=Hello%20SB%20Solar,%20I%20am%20looking%20for%20solar%20installation%20in%20Rajasthan."
                    target="_blank"
                    rel="noreferrer"
                    className="p-2.5 bg-emerald-800/80 hover:bg-emerald-800 text-white rounded-xl transition-all"
                    title="Direct WhatsApp"
                  >
                    <FaWhatsapp className="h-4 w-4" />
                  </a>
                </div>
              </div>

              {/* Header and Results Toolbar */}
              <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 shadow-sm">
                <div>
                  <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                    Available Partners
                    <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-700">
                      {filteredVendors.length} Verified
                    </span>
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Showing authorized dealers and installers in {selectedDistrict ? `${selectedDistrict}, Rajasthan` : 'Rajasthan'}
                  </p>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-auto">
                  <button 
                    onClick={() => setViewMode('grid')}
                    className={`p-2 rounded-lg transition-all ${viewMode === 'grid' ? 'bg-primary text-white shadow-sm' : 'bg-slate-100 text-slate-500 hover:text-slate-800'}`}
                    title="Grid View"
                  >
                    <LayoutGrid className="h-4 w-4" />
                  </button>
                  <button 
                    onClick={() => setViewMode('table')}
                    className={`p-2 rounded-lg transition-all ${viewMode === 'table' ? 'bg-primary text-white shadow-sm' : 'bg-slate-100 text-slate-500 hover:text-slate-800'}`}
                    title="Table View"
                  >
                    <List className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Vendors Display */}
              {filteredVendors.length === 0 ? (
                <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center shadow-sm space-y-4">
                  <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mx-auto text-slate-400">
                    <MapPin className="h-8 w-8 text-primary" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-slate-800">No independent partner matching your search</h4>
                    <p className="text-xs text-slate-500 max-w-md mx-auto mt-1">
                      Our official SB Solar central engineering division directly serves {selectedDistrict || 'this region'}. You get the exact same factory pricing, warranty, and PM Surya Ghar subsidy!
                    </p>
                  </div>

                  <div className="pt-2 flex flex-wrap justify-center gap-3">
                    <a
                      href="tel:+917023204664"
                      className="px-5 py-2.5 bg-primary text-white rounded-xl text-xs font-bold flex items-center gap-2 shadow-md hover:bg-primary/90 transition-all"
                    >
                      <Phone className="h-4 w-4" /> Call Direct Engineer (+91 70232 04664)
                    </a>
                    <button
                      onClick={() => {
                        setSelectedDistrict('');
                        setSearchQuery('');
                        setSelectedType('all');
                      }}
                      className="px-4 py-2.5 border border-slate-300 text-slate-700 rounded-xl text-xs font-semibold hover:bg-slate-50"
                    >
                      View All Rajasthan Partners
                    </button>
                  </div>
                </div>
              ) : viewMode === 'grid' ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {filteredVendors.map((vendor) => (
                    <div 
                      key={vendor.id} 
                      className={`bg-white rounded-2xl p-5 border transition-all duration-200 hover:shadow-xl hover:-translate-y-0.5 flex flex-col justify-between ${
                        vendor.isOfficialHub 
                          ? 'border-indigo-300 ring-2 ring-indigo-500/20' 
                          : 'border-slate-200 hover:border-primary/50'
                      }`}
                    >
                      <div>
                        {/* Header Badges */}
                        <div className="flex items-start justify-between gap-3 mb-2.5">
                          <div>
                            <span className={`inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md mb-1.5 ${
                              vendor.isOfficialHub
                                ? 'bg-indigo-100 text-indigo-800'
                                : 'bg-emerald-50 text-emerald-700 border border-emerald-100'
                            }`}>
                              <ShieldCheck className="h-3 w-3 text-emerald-600" />
                              {vendor.isOfficialHub ? 'Corporate Experience Center' : 'Authorized Partner'}
                            </span>
                            <h4 className="font-bold text-slate-900 text-base leading-snug group-hover:text-primary transition-colors">
                              {vendor.name}
                            </h4>
                          </div>

                          <div className="flex items-center gap-1 bg-amber-50 border border-amber-200/60 px-2 py-1 rounded-lg shrink-0">
                            <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                            <span className="text-xs font-bold text-amber-900">{vendor.rating}</span>
                            {vendor.reviewCount && (
                              <span className="text-[10px] text-amber-700">({vendor.reviewCount})</span>
                            )}
                          </div>
                        </div>

                        {/* Contact Person & Address */}
                        <div className="space-y-2 py-2 text-xs text-slate-600 border-t border-slate-100 mt-2">
                          {vendor.contactPerson && (
                            <div className="flex items-center text-slate-700 font-medium">
                              <User className="h-3.5 w-3.5 text-primary mr-2 shrink-0" />
                              <span>Key Contact: <strong className="text-slate-900">{vendor.contactPerson}</strong></span>
                            </div>
                          )}

                          <div className="flex items-start">
                            <MapPin className="h-3.5 w-3.5 text-rose-500 mr-2 mt-0.5 shrink-0" />
                            <span className="leading-relaxed">
                              <strong className="text-slate-800">{vendor.district}, {vendor.state}</strong> &bull; {vendor.address}
                            </span>
                          </div>

                          <div className="flex items-center text-slate-800 font-semibold">
                            <Phone className="h-3.5 w-3.5 text-indigo-500 mr-2 shrink-0" />
                            <span>{vendor.contact}</span>
                          </div>
                        </div>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-1.5 pt-2.5 border-t border-slate-100 mb-4">
                          {vendor.tags.map((tag) => (
                            <span 
                              key={tag} 
                              className="bg-slate-100/80 text-slate-600 text-[10px] font-semibold px-2 py-0.5 rounded-md"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex items-center gap-2 pt-3 border-t border-slate-100">
                        <a
                          href={getWhatsAppUrl(vendor)}
                          target="_blank"
                          rel="noreferrer"
                          className="flex-1 py-2 px-2.5 bg-[#25D366] hover:bg-[#20ba59] text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all shadow-sm"
                          title="Chat on WhatsApp"
                        >
                          <FaWhatsapp className="h-3.5 w-3.5" />
                          <span>WhatsApp</span>
                        </a>

                        <a
                          href={`tel:${vendor.contact}`}
                          className="flex-1 py-2 px-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all shadow-sm"
                        >
                          <Phone className="h-3 w-3" />
                          <span>Call</span>
                        </a>

                        <button
                          onClick={() => window.dispatchEvent(new CustomEvent('open-solar-quote'))}
                          className="py-2 px-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition-all whitespace-nowrap"
                        >
                          Get Quote
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse min-w-[650px]">
                      <thead className="bg-slate-50 text-[11px] font-bold text-slate-500 uppercase tracking-wider border-b border-slate-200">
                        <tr>
                          <th className="py-3.5 px-4">Partner Name</th>
                          <th className="py-3.5 px-4">Location</th>
                          <th className="py-3.5 px-4">Rating</th>
                          <th className="py-3.5 px-4">Contact</th>
                          <th className="py-3.5 px-4 text-right">Connect</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 text-xs">
                        {filteredVendors.map((vendor) => (
                          <tr key={vendor.id} className="hover:bg-slate-50/80 transition-colors">
                            <td className="py-3.5 px-4">
                              <div className="font-bold text-slate-900">{vendor.name}</div>
                              <div className="text-[11px] text-slate-500">Contact: {vendor.contactPerson}</div>
                            </td>
                            <td className="py-3.5 px-4">
                              <span className="font-semibold text-slate-800">{vendor.district}</span>
                              <div className="text-[11px] text-slate-400 truncate max-w-[200px]" title={vendor.address}>
                                {vendor.address}
                              </div>
                            </td>
                            <td className="py-3.5 px-4">
                              <span className="bg-amber-50 text-amber-800 font-bold px-2 py-0.5 rounded-full inline-flex items-center gap-1">
                                ★ {vendor.rating}
                              </span>
                            </td>
                            <td className="py-3.5 px-4 font-medium text-slate-700 whitespace-nowrap">
                              {vendor.contact}
                            </td>
                            <td className="py-3.5 px-4 text-right">
                              <div className="flex items-center justify-end gap-1.5">
                                <a
                                  href={getWhatsAppUrl(vendor)}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="p-1.5 bg-[#25D366] text-white rounded-lg hover:bg-[#20ba59] transition-colors"
                                  title="WhatsApp"
                                >
                                  <FaWhatsapp className="h-3.5 w-3.5" />
                                </a>
                                <a
                                  href={`tel:${vendor.contact}`}
                                  className="p-1.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                                  title="Call"
                                >
                                  <Phone className="h-3.5 w-3.5" />
                                </a>
                                <button
                                  onClick={() => window.dispatchEvent(new CustomEvent('open-solar-quote'))}
                                  className="px-2.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-[11px] font-bold"
                                >
                                  Quote
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

            </div>
          </div>
        </div>
      </section>
      )}
    </div>
  );
};

export default Contact;
