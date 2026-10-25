export interface ProductData {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  features: string[];
  specs: { label: string; value: string }[];
  image: string;
  bgGradient: string;
}

export const productsData: Record<string, ProductData> = {
  'pv-module': {
    id: 'pv-module',
    title: 'Solar PV Module',
    subtitle: 'High-Efficiency Monocrystalline Panels',
    description: 'Our Tier-1 Solar PV Modules utilize advanced crystalline technology to ensure maximum energy yield even in low-light environments. Engineered to withstand severe weather conditions, they guarantee long-term reliability for both residential and commercial projects.',
    features: [
      'High conversion efficiency up to 21.5%',
      'PID Resistance Technology',
      'Excellent performance in low-light environments',
      '25-Year Linear Power Warranty',
      'Robust aluminum frame for heavy snow and wind loads'
    ],
    specs: [
      { label: 'Cell Type', value: 'Monocrystalline PERC' },
      { label: 'Power Output', value: '400W - 550W' },
      { label: 'Efficiency', value: 'Up to 21.5%' },
      { label: 'Warranty', value: '25 Years' }
    ],
    image: '/solar_pv.png',
    bgGradient: 'from-teal-900 to-slate-900'
  },
  'street-light': {
    id: 'street-light',
    title: 'Solar Street Light System',
    subtitle: 'Smart & Independent Outdoor Illumination',
    description: 'An all-in-one standalone street lighting solution designed for modern infrastructure. Featuring an integrated solar panel, deep-cycle battery, and ultra-bright LEDs, this system provides reliable illumination for parks, streets, and campuses without relying on grid power.',
    features: [
      'All-in-one integrated design',
      'Auto-dimming motion sensors',
      'Zero electricity costs & maintenance-free',
      'IP65 Waterproof Rating',
      'Lithium LiFePO4 Battery for extended life'
    ],
    specs: [
      { label: 'LED Power', value: '20W - 120W' },
      { label: 'Battery', value: 'LiFePO4' },
      { label: 'Autonomy', value: '2-3 Rainy Days' },
      { label: 'Protection', value: 'IP65' }
    ],
    image: '/prod8.png',
    bgGradient: 'from-indigo-900 to-slate-900'
  },
  'water-pump': {
    id: 'water-pump',
    title: 'Solar Water Pump',
    subtitle: 'Reliable Agricultural & Domestic Water Pumping',
    description: 'Transform your irrigation and water supply with our efficient solar water pumps. Harnessing the sun\'s energy directly, these pumps operate silently and cost-effectively, making them the perfect solution for remote agricultural fields and domestic water needs.',
    features: [
      'Operates directly on DC solar power',
      'High efficiency MPPT controller included',
      'Stainless steel anti-corrosion build',
      'Dry-run protection mechanism',
      'Zero fuel or electricity costs'
    ],
    specs: [
      { label: 'Pump Type', value: 'Submersible / Surface' },
      { label: 'Head Capacity', value: 'Up to 150m' },
      { label: 'Flow Rate', value: 'Up to 50,000 LPD' },
      { label: 'Application', value: 'Agriculture / Domestic' }
    ],
    image: '/prod6.png',
    bgGradient: 'from-blue-900 to-slate-900'
  },
  'inverters': {
    id: 'inverters',
    title: 'Solar Inverters',
    subtitle: 'Intelligent Energy Conversion (On/Off/Hybrid)',
    description: 'Our range of advanced solar inverters acts as the brain of your solar system. Whether you need an On-Grid inverter to net-meter excess power, an Off-Grid inverter for remote locations, or a Hybrid system for the best of both worlds, we have the perfect solution.',
    features: [
      'Pure Sine Wave output for sensitive electronics',
      'Advanced MPPT tracking algorithms',
      'Real-time Wi-Fi monitoring and app integration',
      'Compact, wall-mountable design',
      'Built-in surge and short-circuit protection'
    ],
    specs: [
      { label: 'Types Available', value: 'On-Grid, Off-Grid, Hybrid' },
      { label: 'Capacity Range', value: '1kW - 100kW+' },
      { label: 'Efficiency', value: 'Up to 98.6%' },
      { label: 'Monitoring', value: 'Wi-Fi / GPRS' }
    ],
    image: '/prod2.png',
    bgGradient: 'from-amber-900 to-slate-900'
  },
  'batteries': {
    id: 'batteries',
    title: 'Inverters & Batteries',
    subtitle: 'High-Capacity Deep Cycle Storage',
    description: 'Ensure your home or business never goes dark. Our premium deep-cycle solar batteries provide massive energy storage capacity with long lifespans, designed specifically to handle the rigorous charge and discharge cycles of solar systems.',
    features: [
      'High cyclic life and deep discharge capability',
      'Low maintenance tubular and LiFePO4 options',
      'Fast charging acceptance',
      'Excellent performance in extreme temperatures',
      'Eco-friendly and safe operation'
    ],
    specs: [
      { label: 'Technology', value: 'Tubular Lead-Acid / LiFePO4' },
      { label: 'Capacity', value: '100Ah - 300Ah' },
      { label: 'Voltage', value: '12V, 24V, 48V' },
      { label: 'Lifespan', value: '5-10+ Years' }
    ],
    image: '/prod5.png',
    bgGradient: 'from-pink-900 to-slate-900'
  },
  'accessories': {
    id: 'accessories',
    title: 'Solar Accessories',
    subtitle: 'Premium Mounting, Cabling & Connectors',
    description: 'A solar system is only as strong as its weakest link. We provide top-tier, weather-resistant accessories including galvanized mounting structures, heavy-duty DC cables, MC4 connectors, and safety switches to ensure your installation is robust and safe.',
    features: [
      'Hot-dip galvanized mounting structures (Rust-proof)',
      'UV-resistant, double-insulated DC cables',
      'IP67 rated MC4 connectors',
      'AC/DC Distribution Boxes with Surge Protection',
      'Lightning Arrestors and Earthing Kits'
    ],
    specs: [
      { label: 'Structures', value: 'GI / Aluminum' },
      { label: 'Cables', value: '4sqmm / 6sqmm UV Resistant' },
      { label: 'Connectors', value: 'MC4 IP67' },
      { label: 'Safety', value: 'ACDB, DCDB, LA, Earthing' }
    ],
    image: '/prod7.png',
    bgGradient: 'from-emerald-900 to-slate-900'
  }
};
