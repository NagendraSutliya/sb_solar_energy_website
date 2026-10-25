import React, { useState } from 'react';
import { 
  Check, 
  Type, 
  Sun, 
  ShieldCheck, 
  Calculator, 
  ArrowRight,
  TrendingUp,
  CheckCircle2
} from 'lucide-react';

interface FontOption {
  id: string;
  name: string;
  className: string;
  sub: string;
  description: string;
  recommendedFor: string;
}

const fontOptions: FontOption[] = [
  {
    id: 'outfit',
    name: 'Outfit (Modern Renewable & Clean Tech)',
    className: 'font-outfit',
    sub: 'Modern, Energetic Geometric Sans',
    description: 'Crisp curved letterforms with high modern energy. Gives SB Solar Energy a premium, high-tech Tesla/Renewables aesthetic.',
    recommendedFor: 'Solar, CleanTech, Modern Green Energy'
  },
  {
    id: 'jakarta',
    name: 'Plus Jakarta Sans (Modern Editorial & FinTech)',
    className: 'font-jakarta',
    sub: 'Contemporary, Premium & Welcoming',
    description: 'Super clean, friendly yet deeply professional. Perfect balance between high readability and modern startup sophistication.',
    recommendedFor: 'Enterprise Clean Energy, Solar Financing'
  },
  {
    id: 'inter',
    name: 'Inter (Industry Standard Clean Tech)',
    className: 'font-inter',
    sub: 'Neutral, Highly Legible & Balanced',
    description: 'The global benchmark for web applications (Apple, Stripe). Flawless readability across small mobile screens and large displays.',
    recommendedFor: 'Minimalist, Ultra-clean corporate tech'
  },
  {
    id: 'montserrat',
    name: 'Montserrat Headings + Inter Body',
    className: 'font-montserrat',
    sub: 'Authoritative EPC & Engineering Hybrid',
    description: 'Strong, solid geometric architectural headings paired with crystal clear body text. Evokes strength, industrial trust and heavy EPC reliability.',
    recommendedFor: 'Industrial EPC, Government Solar Infrastructure'
  }
];

const TypographyTest: React.FC = () => {
  const [selectedFont, setSelectedFont] = useState<string>('outfit');
  const [selectedScale, setSelectedScale] = useState<'standard' | 'compact' | 'bold'>('standard');
  const [activeTab, setActiveTab] = useState<'preview' | 'scale' | 'comparison'>('preview');

  const currentFontObj = fontOptions.find(f => f.id === selectedFont) || fontOptions[0];

  return (
    <div className={`min-h-screen bg-slate-50 text-slate-800 ${currentFontObj.className} pb-24`}>
      {/* Sticky Control Bar for Instant Switching */}
      <div className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm py-3 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="p-2 bg-primary/10 text-primary rounded-xl">
              <Type className="w-5 h-5" />
            </span>
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-slate-400">Typography Studio</div>
              <div className="text-sm font-extrabold text-slate-900 flex items-center gap-1.5">
                Active Font: <span className="text-primary">{currentFontObj.name.split('(')[0]}</span>
              </div>
            </div>
          </div>

          {/* Quick Font Selector Pills */}
          <div className="flex flex-wrap items-center gap-1.5">
            {fontOptions.map(font => (
              <button
                key={font.id}
                onClick={() => setSelectedFont(font.id)}
                className={`text-xs px-3 py-1.5 rounded-xl font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                  selectedFont === font.id
                    ? 'bg-slate-900 text-white shadow-md scale-105'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {selectedFont === font.id && <Check className="w-3.5 h-3.5 text-primary" />}
                {font.name.split('(')[0].trim()}
              </button>
            ))}
          </div>

          {/* Scale Style Preset */}
          <div className="flex items-center bg-slate-100 p-1 rounded-xl text-xs font-semibold">
            <button
              onClick={() => setSelectedScale('standard')}
              className={`px-2.5 py-1 rounded-lg transition-all ${
                selectedScale === 'standard' ? 'bg-white shadow-sm text-slate-900' : 'text-slate-500'
              }`}
            >
              Standard Balanced
            </button>
            <button
              onClick={() => setSelectedScale('compact')}
              className={`px-2.5 py-1 rounded-lg transition-all ${
                selectedScale === 'compact' ? 'bg-white shadow-sm text-slate-900' : 'text-slate-500'
              }`}
            >
              Compact
            </button>
            <button
              onClick={() => setSelectedScale('bold')}
              className={`px-2.5 py-1 rounded-lg transition-all ${
                selectedScale === 'bold' ? 'bg-white shadow-sm text-slate-900' : 'text-slate-500'
              }`}
            >
              Bold Tech
            </button>
          </div>
        </div>
      </div>

      {/* Main Studio Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-12">
        
        {/* Intro Banner */}
        <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white rounded-3xl p-6 sm:p-10 shadow-xl border border-slate-700">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="max-w-2xl space-y-2">
              <span className="text-primary text-xs font-bold uppercase tracking-widest bg-primary/20 px-3 py-1 rounded-full inline-block">
                Design Standard Alignment
              </span>
              <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
                Centralized Typography &amp; Font System Test
              </h1>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                Yaha aap 4 alag-alag modern font families aur standardized font sizes ko real SB Solar Energy components me live dekh kar compare kar sakte hain. Jab aap final decide kar lenge, hum wahi exact font aur sizing rules poori website par apply karenge.
              </p>
            </div>

            <div className="bg-white/10 p-5 rounded-2xl border border-white/15 backdrop-blur-sm space-y-2 min-w-[260px]">
              <div className="text-xs uppercase font-bold tracking-wider text-slate-400">Current Selection</div>
              <div className="text-xl font-black text-amber-400">{currentFontObj.name.split('(')[0]}</div>
              <div className="text-xs text-slate-300">{currentFontObj.description}</div>
              <div className="text-[11px] text-emerald-400 font-semibold pt-1">
                ✓ Ready for whole project rollout
              </div>
            </div>
          </div>

          {/* Sub Navigation */}
          <div className="flex gap-2 mt-6 pt-6 border-t border-slate-700/80">
            <button
              onClick={() => setActiveTab('preview')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeTab === 'preview' ? 'bg-primary text-white shadow-md' : 'bg-white/10 text-slate-300 hover:bg-white/20'
              }`}
            >
              1. Real Component Previews
            </button>
            <button
              onClick={() => setActiveTab('scale')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeTab === 'scale' ? 'bg-primary text-white shadow-md' : 'bg-white/10 text-slate-300 hover:bg-white/20'
              }`}
            >
              2. Standard Hierarchy &amp; Font Sizes (H1-H4, Body)
            </button>
            <button
              onClick={() => setActiveTab('comparison')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeTab === 'comparison' ? 'bg-primary text-white shadow-md' : 'bg-white/10 text-slate-300 hover:bg-white/20'
              }`}
            >
              3. Side-by-Side 4 Fonts Comparison
            </button>
          </div>
        </div>

        {/* TAB 1: REAL COMPONENT PREVIEWS */}
        {activeTab === 'preview' && (
          <div className="space-y-12">
            
            {/* Component 1: Hero Section Mockup */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  <Sun className="w-5 h-5 text-amber-500" />
                  Hero Section Preview
                </h2>
                <span className="text-xs text-slate-400 font-medium">Rendered with active font</span>
              </div>

              <div className="relative rounded-3xl overflow-hidden bg-slate-900 text-white p-8 sm:p-14 border border-slate-800 shadow-xl">
                <div className="max-w-3xl space-y-4">
                  <span className="text-primary font-bold tracking-widest uppercase text-xs block">
                    Certified Solar EPC &amp; PM Surya Ghar Partner
                  </span>
                  <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight">
                    Power Your Tomorrow With <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-emerald-400">Clean Solar Energy</span>
                  </h1>
                  <p className="text-slate-300 text-sm sm:text-lg leading-relaxed font-normal max-w-2xl">
                    Rajasthan's most trusted rooftop solar installation company. Cut your electricity bills by up to 90% with zero down-payment collateral-free EMI financing and guaranteed ₹78,000 PM Surya Ghar Central subsidy.
                  </p>
                  <div className="flex flex-wrap items-center gap-3 pt-3">
                    <button className="bg-primary hover:bg-primary-hover text-white px-6 py-3 rounded-xl font-bold text-sm shadow-lg transition-all flex items-center gap-2 cursor-pointer">
                      Calculate Your Savings <ArrowRight className="w-4 h-4" />
                    </button>
                    <button className="bg-white/10 hover:bg-white/20 text-white border border-white/20 px-6 py-3 rounded-xl font-semibold text-sm transition-all cursor-pointer">
                      Get Free Solar Quote
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Component 2: Key Stats / Numbers Grid */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-emerald-500" />
                  Stats &amp; Key Highlights (Numbers vs Labels)
                </h2>
                <span className="text-xs text-slate-400 font-medium">Numbers Hierarchy check</span>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { label: 'Starting Interest Rate', val: '6.0% p.a.', desc: 'Under PM Surya Ghar Scheme', tag: 'Banking Standard' },
                  { label: 'Central Govt Subsidy', val: '₹78,000', desc: 'Direct to Bank Account', tag: 'Direct Credit' },
                  { label: 'Happy Solar Customers', val: '1,200+', desc: 'Across Rajasthan & NCR', tag: 'Verified' },
                  { label: 'Annual Power Saved', val: '3.4M+ kWh', desc: 'Clean Renewable Electricity', tag: 'Eco Impact' }
                ].map((item, idx) => (
                  <div key={idx} className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-sm flex flex-col justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-primary bg-primary/10 px-2 py-0.5 rounded-full w-max mb-3">
                      {item.tag}
                    </span>
                    <div>
                      <div className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">{item.val}</div>
                      <div className="text-xs sm:text-sm font-bold text-slate-700 mt-1">{item.label}</div>
                      <div className="text-xs text-slate-400 mt-0.5 leading-relaxed">{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Component 3: Feature / Service Card Grid */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-blue-500" />
                  Cards, Paragraphs &amp; Micro-Typography
                </h2>
                <span className="text-xs text-slate-400 font-medium">Body, H3 &amp; Lists legibility</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  {
                    title: 'Residential Rooftop Solar',
                    category: 'Clean Energy Solution',
                    desc: 'End-to-end rooftop installation designed for independent houses, villas and housing societies. Premium tier-1 monocrystalline panels with 25-year performance warranty.',
                    benefits: ['Up to 90% Bill Reduction', 'DISCOM Net Metering Assured', 'Central PM Subsidy Paperwork']
                  },
                  {
                    title: 'Commercial & Industrial Solar',
                    category: 'High ROI Infrastructure',
                    desc: 'Turn idle factory and warehouse roofs into revenue-generating solar power plants. Significant accelerated depreciation tax benefits and massive OPEX reductions.',
                    benefits: ['Accelerated Depreciation (40%)', 'Fast 3-4 Year Payback Period', '24x7 IoT Remote Generation Tracking']
                  },
                  {
                    title: 'Solar Water Pumping Systems',
                    category: 'Agricultural EPC',
                    desc: 'High-efficiency solar agriculture pumps under PM KUSUM scheme for uninterrupted daytime irrigation without relying on erratic grid electricity or diesel generators.',
                    benefits: ['Zero Fuel / Diesel Costs', 'High Pressure Flow Rates', 'Robust Inverters & Protections']
                  }
                ].map((card, idx) => (
                  <div key={idx} className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-md flex flex-col justify-between">
                    <div>
                      <span className="text-[11px] font-bold uppercase tracking-wider text-amber-600 bg-amber-50 px-2.5 py-1 rounded-lg inline-block mb-3">
                        {card.category}
                      </span>
                      <h3 className="text-lg font-bold text-slate-900 tracking-tight leading-snug mb-2">
                        {card.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal mb-4">
                        {card.desc}
                      </p>
                      <ul className="space-y-2 border-t border-slate-100 pt-3">
                        {card.benefits.map((b, i) => (
                          <li key={i} className="text-xs font-semibold text-slate-700 flex items-center gap-2">
                            <CheckCircle2 className="w-3.5 h-3.5 text-primary flex-shrink-0" />
                            {b}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <button className="mt-5 w-full py-2.5 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer">
                      Explore Solution <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Component 4: Calculator Snippet */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  <Calculator className="w-5 h-5 text-indigo-500" />
                  Calculator &amp; Financial Typography (Labels, Inputs, Badges)
                </h2>
                <span className="text-xs text-slate-400 font-medium">Precision and tabular numbers</span>
              </div>

              <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-xl max-w-2xl mx-auto">
                <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                  <div>
                    <span className="text-xs text-amber-400 font-bold uppercase tracking-wider">
                      Calculated Monthly EMI
                    </span>
                    <div className="text-3xl sm:text-4xl font-black text-amber-400 mt-1">
                      ₹2,149 <span className="text-xs text-slate-400 font-normal">/ month</span>
                    </div>
                  </div>
                  <span className="text-xs bg-emerald-500/20 text-emerald-400 font-bold px-3 py-1 rounded-full border border-emerald-500/30">
                    Reducing Balance @ 7%
                  </span>
                </div>

                <div className="py-4 space-y-2 text-xs sm:text-sm">
                  <div className="flex justify-between text-slate-300">
                    <span>Power Bill Savings:</span>
                    <span className="font-bold text-emerald-400">+ ₹2,700 / mo</span>
                  </div>
                  <div className="flex justify-between text-slate-300">
                    <span>Monthly Solar EMI:</span>
                    <span className="font-bold text-amber-400">- ₹2,149 / mo</span>
                  </div>
                  <div className="flex justify-between text-white font-bold border-t border-slate-800 pt-2">
                    <span>Net Monthly Gain:</span>
                    <span className="text-cyan-300 font-black">+ ₹551 / mo Extra Saved</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 mt-2">
                  <button className="py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs">
                    Share on WhatsApp
                  </button>
                  <button className="py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs border border-slate-700">
                    Copy Quotation
                  </button>
                </div>
              </div>
            </div>

          </div>
        )}

        {/* TAB 2: SYSTEMATIC SCALE HIERARCHY TABLE */}
        {activeTab === 'scale' && (
          <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/90 shadow-lg space-y-8">
            <div>
              <span className="text-primary font-bold text-xs uppercase tracking-widest bg-primary/10 px-3 py-1 rounded-full inline-block mb-2">
                Unified Design System Rules
              </span>
              <h2 className="text-2xl font-extrabold text-slate-900">
                Standard Scale &amp; Role Hierarchy
              </h2>
              <p className="text-slate-600 text-sm mt-1">
                Website ke har page par ab yahi exact token rules follow honge taaki kahi par bhi random font sizes na ho:
              </p>
            </div>

            <div className="divide-y divide-slate-100">
              {[
                {
                  role: 'Hero Display (H1)',
                  tailwind: 'text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight',
                  size: '32px – 48px',
                  sample: 'Power Your Future With Smart Solar Energy'
                },
                {
                  role: 'Section Title (H2)',
                  tailwind: 'text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 leading-snug',
                  size: '24px – 30px',
                  sample: 'Complete Turnkey Rooftop Solar Solutions'
                },
                {
                  role: 'Card / Subsection Title (H3)',
                  tailwind: 'text-lg sm:text-xl font-bold text-slate-800 leading-snug',
                  size: '18px – 20px',
                  sample: 'On-Grid Residential Solar Systems'
                },
                {
                  role: 'Subheading / List Header (H4)',
                  tailwind: 'text-base font-semibold text-slate-800 leading-snug',
                  size: '16px',
                  sample: 'Tier-1 Mono PERC Bifacial Solar Modules'
                },
                {
                  role: 'Category Eyebrow / Pill Tag',
                  tailwind: 'text-xs font-bold uppercase tracking-widest text-primary',
                  size: '12px',
                  sample: 'SUBSIDY ASSISTANCE ASSURED'
                },
                {
                  role: 'Body Large (Hero Subtitle / Lead)',
                  tailwind: 'text-base sm:text-lg text-slate-600 leading-relaxed font-normal',
                  size: '16px – 18px',
                  sample: 'Rajasthan’s certified solar EPC partner providing zero-cost upfront financing with full central subsidy support.'
                },
                {
                  role: 'Body Base (General Paragraphs)',
                  tailwind: 'text-sm sm:text-base text-slate-600 leading-relaxed font-normal',
                  size: '14px – 16px',
                  sample: 'Solar panels generate clean electrical energy during sunny daytime hours, feeding surplus units directly to your DISCOM electricity grid via bidirectional net metering.'
                },
                {
                  role: 'Body Small (Card Subtext / Form Hints)',
                  tailwind: 'text-xs sm:text-sm text-slate-500 leading-relaxed font-normal',
                  size: '12px – 14px',
                  sample: 'Estimated monthly units based on 4.5 peak sun hours per day in Rajasthan region.'
                },
                {
                  role: 'Caption / Meta Info',
                  tailwind: 'text-[11px] sm:text-xs text-slate-400 font-medium',
                  size: '11px – 12px',
                  sample: 'Terms & Conditions apply. Subsidy credited directly by MNRE Govt of India.'
                },
                {
                  role: 'Button Text',
                  tailwind: 'text-sm sm:text-base font-semibold',
                  size: '14px – 16px',
                  sample: 'Apply For Solar Loan Now'
                },
                {
                  role: 'Stat / Metric Number',
                  tailwind: 'text-2xl sm:text-3xl md:text-4xl font-black tracking-tight text-slate-900',
                  size: '24px – 36px',
                  sample: '₹78,000 / 10 Yrs'
                }
              ].map((row, idx) => (
                <div key={idx} className="py-5 grid grid-cols-1 lg:grid-cols-12 gap-4 items-center">
                  <div className="lg:col-span-3">
                    <div className="text-sm font-bold text-slate-900">{row.role}</div>
                    <div className="text-xs text-slate-400">{row.size}</div>
                    <code className="text-[10px] text-indigo-600 bg-indigo-50 px-1.5 py-0.5 rounded font-mono mt-1 inline-block">
                      {row.tailwind}
                    </code>
                  </div>
                  <div className="lg:col-span-9">
                    <p className={row.tailwind}>
                      {row.sample}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: SIDE-BY-SIDE 4 FONTS COMPARISON */}
        {activeTab === 'comparison' && (
          <div className="space-y-6">
            <div className="text-center max-w-2xl mx-auto">
              <span className="text-primary font-bold text-xs uppercase tracking-widest bg-primary/10 px-3 py-1 rounded-full">
                Direct Font Shootout
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2">
                Compare All 4 Fonts Head-to-Head
              </h2>
              <p className="text-slate-600 text-sm mt-1">
                Same text, same size, different personality. Click "Select This" on the one you like best!
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {fontOptions.map(font => (
                <div 
                  key={font.id} 
                  className={`bg-white rounded-3xl p-6 border-2 transition-all shadow-md ${font.className} ${
                    selectedFont === font.id 
                      ? 'border-primary ring-4 ring-primary/10 shadow-xl' 
                      : 'border-slate-200/80 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
                    <div>
                      <div className="text-base font-extrabold text-slate-900">{font.name}</div>
                      <div className="text-xs text-slate-400">{font.sub}</div>
                    </div>
                    <button
                      onClick={() => setSelectedFont(font.id)}
                      className={`text-xs px-3 py-1.5 rounded-xl font-bold cursor-pointer transition-all ${
                        selectedFont === font.id
                          ? 'bg-primary text-white shadow-md'
                          : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                      }`}
                    >
                      {selectedFont === font.id ? '✓ Selected' : 'Select This'}
                    </button>
                  </div>

                  {/* Sample Snippet */}
                  <div className="space-y-3">
                    <span className="text-xs font-bold text-primary uppercase tracking-widest">
                      Clean Energy Solutions
                    </span>
                    <h3 className="text-2xl font-bold text-slate-900 tracking-tight leading-tight">
                      India's Premier Solar EPC &amp; Rooftop Installation Partner
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                      We engineer high-yield, weather-resistant solar power installations backed by 25-year tier-1 panel performance warranties. Enjoy zero electricity bills with hassle-free PM Surya Ghar Central subsidy assistance.
                    </p>
                    <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200/80 flex justify-between items-center text-xs">
                      <span className="font-semibold text-slate-700">Estimated Monthly EMI:</span>
                      <span className="text-lg font-black text-amber-600">₹2,149 / mo</span>
                    </div>
                    <div className="text-[11px] text-slate-400 pt-1">
                      <strong>Best For:</strong> {font.recommendedFor}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Confirmation & Final Pick Card */}
        <div className="bg-gradient-to-r from-emerald-600 to-teal-700 text-white rounded-3xl p-6 sm:p-8 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1">
            <div className="text-xs font-bold uppercase tracking-widest text-emerald-200">Next Step</div>
            <h3 className="text-xl sm:text-2xl font-black">
              Aapko konsa Font aur Sizing style best laga?
            </h3>
            <p className="text-emerald-100 text-xs sm:text-sm max-w-xl">
              Currently Selected: <strong>{currentFontObj.name}</strong>. Chat me bas bata dijiye ya testing page me dekh kar confirm kijiye — hum wahi typography system pooray project ke sabhi pages me implement kar denge!
            </p>
          </div>
          <div className="flex items-center gap-3">
            <a
              href="/"
              className="bg-white text-emerald-800 hover:bg-slate-100 px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm shadow-md transition-all whitespace-nowrap"
            >
              Back to Home
            </a>
          </div>
        </div>

      </div>
    </div>
  );
};

export default TypographyTest;
