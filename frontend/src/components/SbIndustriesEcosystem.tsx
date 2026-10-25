import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Factory,
  Laptop,
  Building2,
  HeartPulse,
  Boxes,
  Sun,
  Zap,
  Sparkles,
  Cpu,
  ShieldCheck,
  Maximize2,
  X,
  Download,
  ChevronRight,
  Globe,
  Layers,
  CheckCircle2,
  FileText,
  Heart
} from 'lucide-react';
import AnimatedBackground from './AnimatedBackground';

interface VerticalItem {
  id: string;
  number: string;
  title: string;
  category: string;
  description: string;
  themeColor: 'blue' | 'red';
  icon: React.ElementType;
  secondaryIcon: React.ElementType;
  highlights: string[];
  isFlagship?: boolean;
}

const VERTICALS: VerticalItem[] = [
  {
    id: 'manufacturing',
    number: '01',
    title: 'Advanced Manufacturing & Engineering',
    category: 'Industrial Systems',
    description: 'High-precision Manufacturing, Industrial Engineering Solutions, & Modern Production Technologies.',
    themeColor: 'blue',
    icon: Factory,
    secondaryIcon: Cpu,
    highlights: [
      'High-Precision Machining',
      'Industrial Automation & Robotics',
      'Production Line Modernization',
      'Quality Control & Six-Sigma'
    ]
  },
  {
    id: 'services',
    number: '02',
    title: 'Services & Technology',
    category: 'Digital Innovation',
    description: 'Innovative Technology Services, Digital Solutions, Automation, & IT-enabled Business Services.',
    themeColor: 'red',
    icon: Laptop,
    secondaryIcon: Sparkles,
    highlights: [
      'Digital Transformation',
      'Workflow & Process Automation',
      'Cloud Architecture & SaaS',
      'IT-Enabled Business Services'
    ]
  },
  {
    id: 'infrastructure',
    number: '03',
    title: 'Infrastructure & Utilities',
    category: 'Turnkey Development',
    description: 'Development And Management Of Infrastructure Projects Including Energy, Utilities, And Industrial Facilities.',
    themeColor: 'blue',
    icon: Building2,
    secondaryIcon: Layers,
    highlights: [
      'Industrial Parks & Facilities',
      'Civil & MEP Project EPC',
      'Smart Utility Networks',
      'Grid Infrastructure Management'
    ]
  },
  {
    id: 'healthcare',
    number: '04',
    title: 'Consumer & Healthcare',
    category: 'Life Sciences & Wellness',
    description: 'Products And Services Focused On Consumer Needs, Healthcare Equipment, And Wellness Solutions.',
    themeColor: 'red',
    icon: HeartPulse,
    secondaryIcon: Heart,
    highlights: [
      'Healthcare & Diagnostic Equipment',
      'Patient Wellness Solutions',
      'Consumer Everyday Essentials',
      'Certified Medical Supplies'
    ]
  },
  {
    id: 'resources',
    number: '05',
    title: 'Resources & Materials',
    category: 'Supply Chain & Sourcing',
    description: 'Sustainable Sourcing, Processing, And Supply Of Industrial Raw Materials And Resources.',
    themeColor: 'blue',
    icon: Boxes,
    secondaryIcon: Globe,
    highlights: [
      'Sustainable Mineral Sourcing',
      'Industrial Raw Material Supply',
      'Circular Economy & Recycling',
      'Nationwide Logistics Network'
    ]
  },
  {
    id: 'power',
    number: '06',
    title: 'Power Solutions',
    category: 'Flagship Clean Energy',
    description: 'Renewable Energy, Solar Power Systems, Electrical Infrastructure, And Energy Management Solutions.',
    themeColor: 'red',
    icon: Sun,
    secondaryIcon: Zap,
    isFlagship: true,
    highlights: [
      'SB Solar Energy Systems EPC',
      'Utility-Scale & Rooftop Solar',
      'Hybrid Inverters & Energy Storage',
      '25+ Year Guaranteed Performance'
    ]
  }
];

const GROUP_VENTURES = [
  {
    name: 'LR GROUP',
    tag: 'Enterprise IT & Hardware Systems',
    desc: 'Specializing in computer architecture, hardware integration, and enterprise IT infrastructure.',
    badge: 'Technology Division',
    accent: 'from-blue-600 to-cyan-500',
    icon: Laptop,
    symbol: 'LR'
  },
  {
    name: 'India Tax',
    tag: 'Corporate Tax & Financial Compliance',
    desc: 'Expert taxation advisory, regulatory compliance, GST auditing, and corporate finance solutions.',
    badge: 'Financial Services',
    accent: 'from-amber-500 via-rose-500 to-indigo-600',
    icon: FileText,
    symbol: 'IT'
  },
  {
    name: 'Premasharam Foundation',
    tag: 'CSR & Environmental Sustainability',
    desc: 'Dedicated social impact foundation supporting green tree drives, rural healthcare, and education.',
    badge: 'Social Impact & CSR',
    accent: 'from-emerald-600 to-lime-500',
    icon: Heart,
    symbol: 'PF'
  },
  {
    name: 'Dline Core',
    tag: 'Industrial Engineering & Project Execution',
    desc: 'Innovative design planning, core structural engineering, and integrated facility execution.',
    badge: 'Engineering & Design',
    accent: 'from-orange-500 to-amber-600',
    icon: Layers,
    symbol: 'DC'
  },
  {
    name: 'RR Solar & Infra',
    tag: 'Decentralized Rooftop Clean Energy',
    desc: 'Specialized distributed rooftop solar plants, micro-generation, and residential clean power.',
    badge: 'Clean Energy Venture',
    accent: 'from-blue-800 to-red-600',
    icon: Sun,
    symbol: 'RR'
  }
];

const SbIndustriesEcosystem: React.FC = () => {
  const [activeVertical, setActiveVertical] = useState<string>('all');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredVerticals = activeVertical === 'all'
    ? VERTICALS
    : activeVertical === 'engineering'
      ? VERTICALS.filter(v => ['manufacturing', 'infrastructure'].includes(v.id))
      : activeVertical === 'tech'
        ? VERTICALS.filter(v => ['services', 'power'].includes(v.id))
        : VERTICALS.filter(v => ['healthcare', 'resources'].includes(v.id));

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-slate-100 via-slate-50 to-white relative overflow-hidden z-10 border-t border-b border-slate-200/80">
      <AnimatedBackground />

      {/* Decorative Blur Orbs */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-red-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section Header */}
        <div className="text-center max-w-4xl mx-auto mb-12 md:mb-16 flex flex-col items-center">

          {/* Badge: Parent Conglomerate & Ecosystem */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center justify-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-red-50 to-blue-50 border border-slate-200/80 shadow-xs mb-5 mx-auto"
          >
            <span className="flex h-2 w-2 rounded-full bg-red-600 animate-pulse" />
            <span className="text-xs font-bold uppercase tracking-widest text-slate-700">
              Parent Conglomerate & Ecosystem
            </span>
          </motion.div>

          {/* SB Industries Heading & Tagline - Perfectly Centered */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center justify-center text-center mb-6"
          >
            {/* Centered Heading */}
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-black tracking-tight text-slate-900 leading-tight text-center">
              SB <span className="text-[#dc2626]">INDUSTRIES</span>
            </h2>

            {/* Centered Tagline */}
            <span className="text-xs sm:text-sm md:text-base font-bold tracking-widest uppercase text-slate-500 mt-2 text-center">
              Multi-Disciplinary Industrial & Clean Energy Conglomerate
            </span>
            <div className="w-20 h-1 bg-gradient-to-r from-[#dc2626] to-[#1e3a8a] rounded-full mx-auto mt-3" />
          </motion.div>

          {/* Centered Paragraph */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="text-sm md:text-base text-slate-600 font-medium leading-relaxed max-w-3xl mx-auto text-center"
          >
            <strong className="text-slate-900 font-bold">SB Solar Energy</strong> Operates With The Full Backing, Financial Resilience, And Multi-Sector Engineering Expertise Of <strong className="text-[#dc2626] font-bold">SB Industries</strong> — Driving Innovation Across Advanced Manufacturing, Digital Automation, Utilities, Healthcare, Industrial Resources, And Renewable Power.
          </motion.p>

          {/* Centered Filter Tabs */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-2 md:gap-3 mx-auto">
            {[
              { id: 'all', label: 'All 6 Verticals' },
              { id: 'engineering', label: 'Engineering & Infra' },
              { id: 'tech', label: 'Services & Power' },
              { id: 'healthcare', label: 'Healthcare & Resources' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveVertical(tab.id)}
                className={`px-5 py-2.5 rounded-xl text-xs md:text-sm font-semibold transition-all duration-300 cursor-pointer ${activeVertical === tab.id
                  ? 'bg-slate-900 text-white shadow-md shadow-slate-900/20 scale-105 ring-2 ring-slate-900/10'
                  : 'bg-white text-slate-600 hover:bg-slate-100 hover:text-slate-900 border border-slate-200'
                  }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* 6 Core Verticals Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-16">
          <AnimatePresence mode="popLayout">
            {filteredVerticals.map((item, index) => {
              const isBlue = item.themeColor === 'blue';
              const IconComp = item.icon;
              const SecIcon = item.secondaryIcon;

              return (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, y: 25 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ delay: index * 0.08, duration: 0.5 }}
                  className={`relative rounded-3xl p-6 md:p-8 bg-white border transition-all duration-300 group hover:-translate-y-2 flex flex-col justify-between ${item.isFlagship
                    ? 'border-emerald-300 shadow-xl shadow-emerald-500/10 ring-2 ring-emerald-500/20'
                    : isBlue
                      ? 'border-slate-200 hover:border-blue-500 hover:shadow-xl hover:shadow-blue-500/10'
                      : 'border-slate-200 hover:border-red-500 hover:shadow-xl hover:shadow-red-500/10'
                    }`}
                >
                  {/* Top Badge & Number */}
                  <div>
                    <div className="flex items-center justify-between mb-5">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-300 group-hover:scale-110 shadow-sm ${item.isFlagship
                            ? 'bg-gradient-to-br from-emerald-500 to-teal-600 text-white'
                            : isBlue
                              ? 'bg-gradient-to-br from-[#1e3a8a] to-blue-700 text-white'
                              : 'bg-gradient-to-br from-[#dc2626] to-rose-600 text-white'
                            }`}
                        >
                          <IconComp className="w-6 h-6" strokeWidth={2.2} />
                        </div>
                        <div>
                          <span
                            className={`text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${item.isFlagship
                              ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                              : isBlue
                                ? 'bg-blue-50 text-[#1e3a8a] border-blue-100'
                                : 'bg-red-50 text-[#dc2626] border-red-100'
                              }`}
                          >
                            {item.category}
                          </span>
                        </div>
                      </div>

                      <span className="font-mono text-2xl font-black text-slate-300 group-hover:text-slate-400 transition-colors">
                        {item.number}
                      </span>
                    </div>

                    {/* Title */}
                    <h3
                      className={`text-xl md:text-2xl font-bold tracking-tight mb-3 transition-colors ${item.isFlagship
                        ? 'text-slate-900 group-hover:text-emerald-600'
                        : isBlue
                          ? 'text-slate-900 group-hover:text-[#1e3a8a]'
                          : 'text-slate-900 group-hover:text-[#dc2626]'
                        }`}
                    >
                      {item.title}
                    </h3>

                    {/* Description (Exact from Poster) */}
                    <p
                      className={`text-sm leading-relaxed mb-6 font-medium ${isBlue ? 'text-slate-700' : 'text-slate-700'
                        }`}
                    >
                      {item.description}
                    </p>

                    {/* Highlights List */}
                    <div className="space-y-2 mb-6">
                      {item.highlights.map((h, i) => (
                        <div key={i} className="flex items-center gap-2 text-xs md:text-sm text-slate-600">
                          <CheckCircle2
                            className={`w-4 h-4 shrink-0 ${item.isFlagship
                              ? 'text-emerald-500'
                              : isBlue
                                ? 'text-blue-600'
                                : 'text-red-500'
                              }`}
                          />
                          <span>{h}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Flagship Indicator or Division Footer */}
                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between mt-auto">
                    {item.isFlagship ? (
                      <div className="flex items-center gap-2 text-xs font-bold text-emerald-600">
                        <Sun className="w-4 h-4 text-amber-500 animate-spin-slow" />
                        <span>Flagship Division: SB Solar Energy</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
                        <SecIcon className="w-3.5 h-3.5 text-slate-400" />
                        <span>SB Industries Core Vertical</span>
                      </div>
                    )}
                    <span
                      className={`inline-flex items-center text-xs font-bold transition-transform group-hover:translate-x-1 ${item.isFlagship
                        ? 'text-emerald-600'
                        : isBlue
                          ? 'text-[#1e3a8a]'
                          : 'text-[#dc2626]'
                        }`}
                    >
                      Learn more <ChevronRight className="w-3.5 h-3.5 ml-0.5" />
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Feature Spotlight: Original Poster Showcase + Conglomerate Advantage */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="bg-white rounded-3xl p-6 sm:p-8 md:p-12 shadow-xl border border-slate-200 mb-16 relative overflow-hidden"
        >
          {/* Subtle background gradient accents */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-red-50 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-50 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-center relative z-10">

            {/* Left: Poster Preview Card with Zoom Trigger */}
            <div className="lg:col-span-5 flex flex-col items-center">
              <div
                onClick={() => setIsModalOpen(true)}
                className="relative group cursor-pointer max-w-sm w-full rounded-2xl overflow-hidden border-4 border-slate-900/10 shadow-2xl hover:shadow-red-500/20 transition-all duration-300 hover:scale-[1.02] bg-slate-900"
              >
                <img
                  src="/sb_industries_chart.png"
                  alt="SB Industries Corporate Structure and Verticals Infographic"
                  className="w-full h-auto object-cover group-hover:opacity-90 transition-opacity"
                />

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-4 text-center">
                  <div className="w-14 h-14 rounded-full bg-white/90 text-slate-900 flex items-center justify-center shadow-lg mb-2 transform scale-75 group-hover:scale-100 transition-transform">
                    <Maximize2 className="w-6 h-6" />
                  </div>
                  <span className="text-white font-bold text-sm bg-slate-900/80 px-3 py-1 rounded-full backdrop-blur-xs">
                    Click to Enlarge Infographic
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3 mt-4">
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-700 hover:text-red-600 transition-colors"
                >
                  <Maximize2 className="w-3.5 h-3.5" /> Fullscreen View
                </button>
                <span className="text-slate-300">•</span>
                <a
                  href="/sb_industries_chart.png"
                  download="SB_Industries_Corporate_Infographic.png"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-700 hover:text-blue-600 transition-colors"
                >
                  <Download className="w-3.5 h-3.5" /> Download Poster
                </a>
              </div>
            </div>

            {/* Right: Why Conglomerate Backing Matters to Solar Clients */}
            <div className="lg:col-span-7">
              <span className="text-xs font-bold uppercase tracking-widest text-[#dc2626] mb-2 block">
                The Conglomerate Advantage
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-4 leading-tight">
                Why Strong Corporate Group Backing Gives You 100% Peace of Mind
              </h3>
              <p className="text-slate-600 text-sm md:text-base font-normal mb-6 leading-relaxed">
                When you invest in a solar energy infrastructure that operates for 25 to 30 years, the strength of the parent company matters. Being backed by <strong className="text-slate-900 font-bold">SB Industries</strong> ensures our clients receive uninterrupted support, guaranteed warranty fulfillment, and industrial-grade engineering execution.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
                  <div className="flex items-center gap-2.5 mb-1.5">
                    <ShieldCheck className="w-5 h-5 text-emerald-600" />
                    <h4 className="font-bold text-slate-900 text-sm">25-Year Reliability</h4>
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Zero risk of single-sector insolvency. Multi-vertical balance sheets secure long-term warranties.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
                  <div className="flex items-center gap-2.5 mb-1.5">
                    <Factory className="w-5 h-5 text-blue-700" />
                    <h4 className="font-bold text-slate-900 text-sm">In-House Engineering</h4>
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Access to high-precision manufacturing, structural mounting fabrication, and rapid prototyping.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
                  <div className="flex items-center gap-2.5 mb-1.5">
                    <Laptop className="w-5 h-5 text-red-600" />
                    <h4 className="font-bold text-slate-900 text-sm">Smart Tech & IoT</h4>
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Continuous digital tracking, automated generation analytics, and fast remote diagnostics.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
                  <div className="flex items-center gap-2.5 mb-1.5">
                    <Boxes className="w-5 h-5 text-indigo-700" />
                    <h4 className="font-bold text-slate-900 text-sm">Direct Supply Chain</h4>
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Unmatched raw material sourcing eliminates supplier middle-margins, keeping customer pricing fair.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </motion.div>

        {/* Subsidiary / Group Ventures & Associated Entities Section */}
        <div>
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-bold uppercase tracking-widest text-[#1e3a8a] mb-1 block">
              Subsidiaries & Associated Arms
            </span>
            <h3 className="text-2xl md:text-3xl font-extrabold text-slate-900">
              The SB Industries Network
            </h3>
            <p className="text-xs md:text-sm text-slate-500 mt-2">
              Our inter-connected network of specialized entities, professional institutions, and community foundations.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 md:gap-6">
            {GROUP_VENTURES.map((venture, i) => {
              const VentureIcon = venture.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm hover:shadow-md hover:border-slate-300 transition-all duration-300 flex flex-col justify-between group"
                >
                  <div>
                    {/* Brand Monogram / Icon Header */}
                    <div className="flex items-center justify-between mb-3">
                      <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${venture.accent} text-white flex items-center justify-center font-bold text-sm shadow-sm group-hover:scale-105 transition-transform`}>
                        {venture.symbol}
                      </div>
                      <span className="text-[10px] font-bold text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">
                        {venture.badge}
                      </span>
                    </div>

                    <h4 className="font-bold text-base text-slate-900 group-hover:text-primary transition-colors">
                      {venture.name}
                    </h4>
                    <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2">
                      {venture.tag}
                    </p>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {venture.desc}
                    </p>
                  </div>

                  <div className="pt-3 mt-4 border-t border-slate-100 flex items-center gap-1.5 text-[11px] font-semibold text-slate-400 group-hover:text-slate-700 transition-colors">
                    <VentureIcon className="w-3.5 h-3.5" />
                    <span>Group Associate</span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

      </div>

      {/* Fullscreen Lightbox Modal for Official Poster */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[999] flex items-center justify-center p-4 sm:p-6 md:p-10">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-slate-950/80 backdrop-blur-md cursor-pointer"
            />

            {/* Modal Dialog Content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="relative bg-white rounded-3xl max-w-4xl w-full max-h-[92vh] overflow-hidden shadow-2xl flex flex-col z-10 border border-slate-200"
            >
              {/* Modal Header */}
              <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50">
                <div className="flex items-center gap-3">
                  <div className="px-2.5 py-1 rounded-xl bg-white border border-slate-200 font-black text-sm text-[#dc2626]">
                    SB <span className="text-[#1e3a8a]">INDUSTRIES</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm sm:text-base">
                      Official Corporate Structure & Verticals
                    </h4>
                    <span className="text-xs text-slate-500 hidden sm:inline-block">
                      High-resolution corporate overview infographic
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <a
                    href="/sb_industries_chart.png"
                    download="SB_Industries_Corporate_Overview.png"
                    className="p-2 rounded-xl bg-white border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors shadow-xs"
                    title="Download Poster"
                  >
                    <Download className="w-4 h-4" />
                  </a>
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="p-2 rounded-xl bg-white border border-slate-200 text-slate-600 hover:text-red-600 hover:bg-red-50 transition-colors shadow-xs cursor-pointer"
                    title="Close"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Modal Body: Scrollable Image */}
              <div className="p-4 sm:p-6 overflow-y-auto max-h-[calc(92vh-80px)] flex justify-center bg-slate-100/60">
                <div className="max-w-2xl w-full rounded-2xl overflow-hidden shadow-xl border border-slate-300 bg-white">
                  <img
                    src="/sb_industries_chart.png"
                    alt="SB Industries Corporate Structure and Verticals"
                    className="w-full h-auto object-contain"
                  />
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default SbIndustriesEcosystem;
