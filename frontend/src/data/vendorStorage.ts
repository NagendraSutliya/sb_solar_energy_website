export interface Vendor {
  id: string;
  name: string;
  contactPerson: string;
  email: string;
  contact: string;
  address: string;
  state: string;
  district: string;
  businessType: 'dealer' | 'distributor' | 'installer' | 'other';
  rating: number;
  reviewCount?: number;
  status: 'Approved' | 'Pending' | 'Rejected';
  tags: string[];
  registeredAt: string;
  isOfficialHub?: boolean;
}

const STORAGE_KEY = 'sb_solar_vendors_v3';
const PREV_KEY = 'sb_solar_vendors';

export const INITIAL_VENDORS: Vendor[] = [
  // Dungarpur


  // Jaipur
  {
    id: 'v-jaipur-1',
    name: 'SB Solar Energy Corporate Experience Center',
    contactPerson: 'Rahul Devanda',
    email: 'info@sbsolar.co.in',
    contact: '+91 7023204664',
    address: 'E-42, RIICO Industrial Area, Sitapura, Tonk Road, Jaipur',
    state: 'Rajasthan',
    district: 'Jaipur',
    businessType: 'distributor',
    rating: 5.0,
    reviewCount: 184,
    status: 'Approved',
    tags: ['Headquarters & Regional Hub', 'Govt Subsidy Desk', 'Commercial & Industrial', 'Express Delivery'],
    registeredAt: '2026-07-01T09:00:00Z',
    isOfficialHub: true,
  },
  {
    id: 'v-jaipur-2',
    name: 'SunPower Solutions Jaipur',
    contactPerson: 'Sunil Verma',
    email: 'sunil@sunpowersolutions.in',
    contact: '+91 9876543210',
    address: '123 Solar Park, Sitapura Industrial Area, Jaipur',
    state: 'Rajasthan',
    district: 'Jaipur',
    businessType: 'dealer',
    rating: 4.8,
    reviewCount: 92,
    status: 'Approved',
    tags: ['Certified Dealer', 'On-Grid Rooftop', 'Net Metering Expert'],
    registeredAt: '2026-09-15T10:30:00Z',
  },
  {
    id: 'v-jaipur-3',
    name: 'PinkCity Renewable Tech',
    contactPerson: 'Manoj Agarwal',
    email: 'pinkcitysolar@gmail.com',
    contact: '+91 9829088776',
    address: 'Road No. 9, VKIA, Sikar Road, Jaipur',
    state: 'Rajasthan',
    district: 'Jaipur',
    businessType: 'installer',
    rating: 4.9,
    reviewCount: 65,
    status: 'Approved',
    tags: ['System Installer', 'Industrial Rooftop', 'PM Surya Ghar'],
    registeredAt: '2026-09-18T11:00:00Z',
  },

  // Jodhpur
  {
    id: 'v-jodhpur-1',
    name: 'Marwar Solar Energy Hub',
    contactPerson: 'Priya Sharma',
    email: 'marwarsolar@sbsolar.in',
    contact: '+91 9876543211',
    address: 'Phase 2, Heavy Industrial Area, Basni, Jodhpur',
    state: 'Rajasthan',
    district: 'Jodhpur',
    businessType: 'distributor',
    rating: 4.8,
    reviewCount: 78,
    status: 'Approved',
    tags: ['Regional Distributor', 'Hybrid Inverters', 'Residential & Farmhouses'],
    registeredAt: '2026-09-20T14:15:00Z',
  },
  {
    id: 'v-jodhpur-2',
    name: 'Surya Mandir Solar Installations',
    contactPerson: 'Rakesh Gehlot',
    email: 'suryamandirjodhpur@gmail.com',
    contact: '+91 9414133221',
    address: 'Main Pal Road, Near AIIMS Circle, Jodhpur',
    state: 'Rajasthan',
    district: 'Jodhpur',
    businessType: 'installer',
    rating: 4.7,
    reviewCount: 42,
    status: 'Approved',
    tags: ['Certified Dealer', 'Solar Water Pump', 'Rooftop Expert'],
    registeredAt: '2026-09-25T16:00:00Z',
  },

  // Udaipur
  {
    id: 'v-udaipur-1',
    name: 'Lakecity Solar Dynamics (SB Solar Partner)',
    contactPerson: 'Anil Purohit',
    email: 'lakecitysolar@gmail.com',
    contact: '+91 9829154321',
    address: '22, Madri Industrial Area, Sector 3, Udaipur',
    state: 'Rajasthan',
    district: 'Udaipur',
    businessType: 'dealer',
    rating: 4.9,
    reviewCount: 62,
    status: 'Approved',
    tags: ['Certified Dealer', 'Hotel & Resort Solar', 'PM Surya Ghar'],
    registeredAt: '2026-08-15T12:00:00Z',
  },
  {
    id: 'v-udaipur-2',
    name: 'Mewar Renewable Energy Corp',
    contactPerson: 'Chetan Sharma',
    email: 'mewarsolar.udr@gmail.com',
    contact: '+91 9784512345',
    address: 'Opp. Bhuwana Highway, Sukher, Udaipur',
    state: 'Rajasthan',
    district: 'Udaipur',
    businessType: 'installer',
    rating: 4.8,
    reviewCount: 39,
    status: 'Approved',
    tags: ['System Installer', 'Residential Rooftop', 'Commercial Systems'],
    registeredAt: '2026-08-30T10:00:00Z',
  },

  // Sikar
  {
    id: 'v-sikar-1',
    name: 'Shekhawati Solar Power Hub',
    contactPerson: 'Ramesh Patel',
    email: 'shekhawatisolar@gmail.com',
    contact: '+91 9876543212',
    address: 'Main Piprali Road, Near Coaching Hub, Sikar',
    state: 'Rajasthan',
    district: 'Sikar',
    businessType: 'installer',
    rating: 4.9,
    reviewCount: 84,
    status: 'Approved',
    tags: ['System Installer', 'Schools & Hostels', 'PM Surya Ghar Subsidy'],
    registeredAt: '2026-10-01T09:00:00Z',
  },
  {
    id: 'v-sikar-2',
    name: 'Shree Shyam Solar Services',
    contactPerson: 'Suresh Dhayal',
    email: 'shreeshyamsikar@gmail.com',
    contact: '+91 9414566778',
    address: 'Station Road, Near Kalyan Circle, Sikar',
    state: 'Rajasthan',
    district: 'Sikar',
    businessType: 'dealer',
    rating: 4.8,
    reviewCount: 51,
    status: 'Approved',
    tags: ['Certified Dealer', 'Agricultural Solar', 'Battery Backup'],
    registeredAt: '2026-09-12T11:00:00Z',
  },

  // Kota


  // Bikaner
  {
    id: 'v-bikaner-1',
    name: 'Apex Green Technologies Bikaner',
    contactPerson: 'Vikram Singh',
    email: 'vikram@apexsolar.com',
    contact: '+91 9829012345',
    address: 'Near Old Bus Stand, Rani Bazar, Bikaner',
    state: 'Rajasthan',
    district: 'Bikaner',
    businessType: 'dealer',
    rating: 4.7,
    reviewCount: 45,
    status: 'Approved',
    tags: ['Certified Dealer', 'Agricultural Tubewell Solar', 'Residential'],
    registeredAt: '2026-10-05T11:45:00Z',
  },
  {
    id: 'v-bikaner-2',
    name: 'Thar Sun Energy Solutions',
    contactPerson: 'Surendra Godara',
    email: 'tharsolar.bkn@gmail.com',
    contact: '+91 9414377889',
    address: 'Nokha Road, Industrial Area, Bikaner',
    state: 'Rajasthan',
    district: 'Bikaner',
    businessType: 'installer',
    rating: 4.9,
    reviewCount: 38,
    status: 'Approved',
    tags: ['System Installer', 'Solar Water Pump', 'PM KUSUM Project'],
    registeredAt: '2026-09-28T15:00:00Z',
  },

  // Ajmer
  {
    id: 'v-ajmer-1',
    name: 'Aravalli Solar Systems',
    contactPerson: 'Sanjay Rathi',
    email: 'aravallisolar.ajm@gmail.com',
    contact: '+91 9828044556',
    address: 'Jaipur Road, Near Ghughra Ghati, Ajmer',
    state: 'Rajasthan',
    district: 'Ajmer',
    businessType: 'dealer',
    rating: 4.8,
    reviewCount: 52,
    status: 'Approved',
    tags: ['Certified Dealer', 'Domestic & Commercial', 'Net Metering'],
    registeredAt: '2026-08-18T10:00:00Z',
  },

  // Alwar
  {
    id: 'v-alwar-1',
    name: 'Matsya Solar & Electric Corp',
    contactPerson: 'Arun Yadav',
    email: 'matsyasolar.alwar@gmail.com',
    contact: '+91 9829511223',
    address: 'Plot 88, Matsya Industrial Area (MIA), Alwar',
    state: 'Rajasthan',
    district: 'Alwar',
    businessType: 'distributor',
    rating: 4.8,
    reviewCount: 67,
    status: 'Approved',
    tags: ['Regional Distributor', 'Industrial Shed Solar', 'Subsidy Assistance'],
    registeredAt: '2026-08-20T11:00:00Z',
  },

  // Banswara
  {
    id: 'v-banswara-1',
    name: 'Mahi Solar Power & Engineering',
    contactPerson: 'Govind Singh',
    email: 'mahisolar.banswara@gmail.com',
    contact: '+91 9413321987',
    address: 'Custom Circle, Dahod Road, Banswara',
    state: 'Rajasthan',
    district: 'Banswara',
    businessType: 'dealer',
    rating: 4.8,
    reviewCount: 31,
    status: 'Approved',
    tags: ['Certified Dealer', 'PM Surya Ghar', 'Solar Pumps'],
    registeredAt: '2026-09-02T09:30:00Z',
  },

  // Bhilwara


  // Nagaur
  {
    id: 'v-nagaur-1',
    name: 'Shree Balaji Solar Services Nagaur',
    contactPerson: 'Mahesh Choudhary',
    email: 'balajisolar.nagaur@gmail.com',
    contact: '+91 9414054321',
    address: 'Station Road, Kuchaman City & Nagaur',
    state: 'Rajasthan',
    district: 'Nagaur',
    businessType: 'installer',
    rating: 4.9,
    reviewCount: 69,
    status: 'Approved',
    tags: ['System Installer', 'Solar Water Pump', 'Rooftop Net Metering'],
    registeredAt: '2026-10-10T16:20:00Z',
  },

  // Pali
  {
    id: 'v-pali-1',
    name: 'Pali Marudhar Solar Energy',
    contactPerson: 'Bhanwar Lal',
    email: 'palisolar@gmail.com',
    contact: '+91 9829233445',
    address: 'Industrial Estate, Near Mandia Road, Pali',
    state: 'Rajasthan',
    district: 'Pali',
    businessType: 'dealer',
    rating: 4.7,
    reviewCount: 34,
    status: 'Approved',
    tags: ['Certified Dealer', 'Factory Solar Systems', 'PM Surya Ghar'],
    registeredAt: '2026-09-14T11:00:00Z',
  },

  // Barmer
  {
    id: 'v-barmer-1',
    name: 'Thar Desert Solar Installations',
    contactPerson: 'Kailash Dan',
    email: 'thardesertsolar@gmail.com',
    contact: '+91 9413088990',
    address: 'Refinery Highway, Balotra Road, Barmer',
    state: 'Rajasthan',
    district: 'Barmer',
    businessType: 'installer',
    rating: 4.8,
    reviewCount: 41,
    status: 'Approved',
    tags: ['System Installer', 'High-Heat Resistant Panels', 'Off-Grid & On-Grid'],
    registeredAt: '2026-08-28T13:00:00Z',
  },

  // Jaisalmer
  {
    id: 'v-jaisalmer-1',
    name: 'Golden Sun Renewable Projects',
    contactPerson: 'Tanveer Bhati',
    email: 'goldensunsolar.jsm@gmail.com',
    contact: '+91 9828566778',
    address: 'Gadisar Lake Road, Jaisalmer',
    state: 'Rajasthan',
    district: 'Jaisalmer',
    businessType: 'dealer',
    rating: 4.9,
    reviewCount: 29,
    status: 'Approved',
    tags: ['Certified Dealer', 'Resort & Camp Solar', 'Desert Heavy-Duty'],
    registeredAt: '2026-09-04T12:00:00Z',
  },

  // Sri Ganganagar
  {
    id: 'v-ganganagar-1',
    name: 'Green Belt Solar & Agri Tech',
    contactPerson: 'Jaspreet Singh',
    email: 'greenbeltsolar.sgnr@gmail.com',
    contact: '+91 9414622334',
    address: 'Suratgarh Road, Opposite Grain Market, Sri Ganganagar',
    state: 'Rajasthan',
    district: 'Sri Ganganagar',
    businessType: 'dealer',
    rating: 4.8,
    reviewCount: 46,
    status: 'Approved',
    tags: ['Certified Dealer', 'Agri Tubewells', 'PM Surya Ghar Subsidy'],
    registeredAt: '2026-09-08T10:00:00Z',
  },

  // Hanumangarh
  {
    id: 'v-hanumangarh-1',
    name: 'Ghaggar Solar Tech Hub',
    contactPerson: 'Balwant Ram',
    email: 'ghaggarsolar.hmh@gmail.com',
    contact: '+91 9829877665',
    address: 'Junction Road, Near Bus Depot, Hanumangarh',
    state: 'Rajasthan',
    district: 'Hanumangarh',
    businessType: 'installer',
    rating: 4.7,
    reviewCount: 32,
    status: 'Approved',
    tags: ['System Installer', 'Domestic Rooftop', 'Tubewell Pumps'],
    registeredAt: '2026-09-17T15:00:00Z',
  },

  // Chittorgarh
  {
    id: 'v-chittor-1',
    name: 'Padmini Solar Solutions',
    contactPerson: 'Vijay Sisodiya',
    email: 'padminisolar.cor@gmail.com',
    contact: '+91 9414844332',
    address: 'Bhilwara Bypass Road, Near Railway Station, Chittorgarh',
    state: 'Rajasthan',
    district: 'Chittorgarh',
    businessType: 'dealer',
    rating: 4.8,
    reviewCount: 37,
    status: 'Approved',
    tags: ['Certified Dealer', 'Stone Industry Solar', 'Rooftop Net Metering'],
    registeredAt: '2026-09-01T11:00:00Z',
  },

  // Churu
  {
    id: 'v-churu-1',
    name: 'Thar Jyoti Solar Agency',
    contactPerson: 'Om Prakash',
    email: 'tharjyotisolar@gmail.com',
    contact: '+91 9829655443',
    address: 'Station Road, Sujangarh & Churu',
    state: 'Rajasthan',
    district: 'Churu',
    businessType: 'dealer',
    rating: 4.7,
    reviewCount: 28,
    status: 'Approved',
    tags: ['Certified Dealer', 'PM Surya Ghar', 'Residential Rooftop'],
    registeredAt: '2026-09-22T09:00:00Z',
  },

  // Jhunjhunu
  {
    id: 'v-jhunjhunu-1',
    name: 'Shekhawati Surya Power Jhunjhunu',
    contactPerson: 'Sandeep Shekhawat',
    email: 'suryapower.jjn@gmail.com',
    contact: '+91 9414788990',
    address: 'Mandawa Road, Near Peeru Singh Circle, Jhunjhunu',
    state: 'Rajasthan',
    district: 'Jhunjhunu',
    businessType: 'dealer',
    rating: 4.8,
    reviewCount: 44,
    status: 'Approved',
    tags: ['Certified Dealer', 'Ex-Servicemen Subsidy Support', 'Rooftop Solar'],
    registeredAt: '2026-09-19T14:00:00Z',
  },

  // Dausa
  {
    id: 'v-dausa-1',
    name: 'Dausa Green Energy Hub',
    contactPerson: 'Mukesh Meena',
    email: 'dausasolar@gmail.com',
    contact: '+91 9829411224',
    address: 'Agra Road, Near Collectorate Circle, Dausa',
    state: 'Rajasthan',
    district: 'Dausa',
    businessType: 'installer',
    rating: 4.8,
    reviewCount: 35,
    status: 'Approved',
    tags: ['System Installer', 'PM Surya Ghar', 'Farmhouse Solar'],
    registeredAt: '2026-09-11T12:00:00Z',
  },

  // Tonk
  {
    id: 'v-tonk-1',
    name: 'Niwai & Tonk Solar Tech Partners',
    contactPerson: 'Asif Khan',
    email: 'tonksolar@gmail.com',
    contact: '+91 9413255667',
    address: 'Jaipur-Kota Highway, Tonk Road, Tonk',
    state: 'Rajasthan',
    district: 'Tonk',
    businessType: 'dealer',
    rating: 4.7,
    reviewCount: 26,
    status: 'Approved',
    tags: ['Certified Dealer', 'Agri Solar Pumps', 'Domestic Installation'],
    registeredAt: '2026-09-24T10:00:00Z',
  },

  // Sawai Madhopur
  {
    id: 'v-sawai-1',
    name: 'Ranthambore Green Power Solutions',
    contactPerson: 'Ravindra Sharma',
    email: 'ranthamboresolar@gmail.com',
    contact: '+91 9829933221',
    address: 'Ranthambore Road, Near Circuit House, Sawai Madhopur',
    state: 'Rajasthan',
    district: 'Sawai Madhopur',
    businessType: 'dealer',
    rating: 4.9,
    reviewCount: 38,
    status: 'Approved',
    tags: ['Certified Dealer', 'Resort & Safari Lodges', 'Eco-Friendly Rooftop'],
    registeredAt: '2026-09-06T15:00:00Z',
  },

  // Bharatpur
  {
    id: 'v-bharatpur-1',
    name: 'Brij Bhoomi Solar Services',
    contactPerson: 'Hemant Faujdar',
    email: 'brijbhoomisolar@gmail.com',
    contact: '+91 9414911002',
    address: 'Circular Road, Near Kumher Gate, Bharatpur',
    state: 'Rajasthan',
    district: 'Bharatpur',
    businessType: 'dealer',
    rating: 4.8,
    reviewCount: 42,
    status: 'Approved',
    tags: ['Certified Dealer', 'PM Surya Ghar', 'Net Metering Approval'],
    registeredAt: '2026-09-16T11:00:00Z',
  },

  // Dholpur
  {
    id: 'v-dholpur-1',
    name: 'Chambal Valley Solar Associates',
    contactPerson: 'Neeraj Tyagi',
    email: 'chambalvalleysolar@gmail.com',
    contact: '+91 9828844332',
    address: 'GT Road, Near City Bus Stand, Dholpur',
    state: 'Rajasthan',
    district: 'Dholpur',
    businessType: 'installer',
    rating: 4.7,
    reviewCount: 22,
    status: 'Approved',
    tags: ['System Installer', 'Residential Rooftop', 'Agricultural Pumps'],
    registeredAt: '2026-09-29T14:00:00Z',
  },

  // Karauli
  {
    id: 'v-karauli-1',
    name: 'Kaila Devi Solar Associates',
    contactPerson: 'Jagdish Prasad',
    email: 'kailadevisolar@gmail.com',
    contact: '+91 9413577668',
    address: 'Gulab Bagh, Hindaun Road, Karauli',
    state: 'Rajasthan',
    district: 'Karauli',
    businessType: 'dealer',
    rating: 4.7,
    reviewCount: 25,
    status: 'Approved',
    tags: ['Certified Dealer', 'Rooftop Net Metering', 'Subsidy Assistance'],
    registeredAt: '2026-09-27T10:00:00Z',
  },

  // Rajsamand
  {
    id: 'v-rajsamand-1',
    name: 'Dwarkadhish Solar Power',
    contactPerson: 'Narendra Paliwal',
    email: 'dwarkadhishsolar@gmail.com',
    contact: '+91 9829788991',
    address: 'Nathdwara Temple Road, Kankroli, Rajsamand',
    state: 'Rajasthan',
    district: 'Rajsamand',
    businessType: 'dealer',
    rating: 4.9,
    reviewCount: 39,
    status: 'Approved',
    tags: ['Certified Dealer', 'Marble Industry Solar', 'PM Surya Ghar'],
    registeredAt: '2026-08-25T11:00:00Z',
  },

  // Sirohi
  {
    id: 'v-sirohi-1',
    name: 'Mount Abu & Sirohi Green Energy',
    contactPerson: 'Devaram Dewasi',
    email: 'mountabusolar@gmail.com',
    contact: '+91 9414422119',
    address: 'Sheoganj-Sirohi Highway, Sirohi',
    state: 'Rajasthan',
    district: 'Sirohi',
    businessType: 'installer',
    rating: 4.8,
    reviewCount: 31,
    status: 'Approved',
    tags: ['System Installer', 'Hotel & Hill-Station Solar', 'Commercial'],
    registeredAt: '2026-09-07T13:00:00Z',
  },

  // Jalore
  {
    id: 'v-jalore-1',
    name: 'Granite City Solar Installations',
    contactPerson: 'Shravan Patel',
    email: 'granitecitysolar@gmail.com',
    contact: '+91 9829199887',
    address: 'Phase 3, Industrial Area, Jalore',
    state: 'Rajasthan',
    district: 'Jalore',
    businessType: 'dealer',
    rating: 4.7,
    reviewCount: 33,
    status: 'Approved',
    tags: ['Certified Dealer', 'Granite Cutter Plant Solar', 'Farm Pumps'],
    registeredAt: '2026-09-21T10:00:00Z',
  },

  // Pratapgarh
  {
    id: 'v-pratapgarh-1',
    name: 'Tribal Belt Solar Solutions',
    contactPerson: 'Dinesh Meena',
    email: 'tribalbeltsolar@gmail.com',
    contact: '+91 9413866554',
    address: 'Bus Stand Road, Near Krishi Mandi, Pratapgarh',
    state: 'Rajasthan',
    district: 'Pratapgarh',
    businessType: 'installer',
    rating: 4.8,
    reviewCount: 27,
    status: 'Approved',
    tags: ['System Installer', 'Tribal Area Subsidy Support', 'Solar Pumps'],
    registeredAt: '2026-09-26T12:00:00Z',
  },

  // Baran
  {
    id: 'v-baran-1',
    name: 'Hadoti Solar Tech Center',
    contactPerson: 'Raghuvir Nagar',
    email: 'hadotisolar.baran@gmail.com',
    contact: '+91 9828355442',
    address: 'Kota Road, Near Mandi Gate, Baran',
    state: 'Rajasthan',
    district: 'Baran',
    businessType: 'dealer',
    rating: 4.7,
    reviewCount: 24,
    status: 'Approved',
    tags: ['Certified Dealer', 'PM Surya Ghar', 'Agri Tubewells'],
    registeredAt: '2026-09-23T11:00:00Z',
  },

  // Bundi
  {
    id: 'v-bundi-1',
    name: 'Taragarh Solar Services',
    contactPerson: 'Satish Pareek',
    email: 'taragarhsolar@gmail.com',
    contact: '+91 9414388776',
    address: 'Nainwa Road, Near Circuit House, Bundi',
    state: 'Rajasthan',
    district: 'Bundi',
    businessType: 'dealer',
    rating: 4.8,
    reviewCount: 30,
    status: 'Approved',
    tags: ['Certified Dealer', 'Rooftop Net Metering', 'Heritage Property Solar'],
    registeredAt: '2026-09-13T10:00:00Z',
  },

  // Jhalawar
  {
    id: 'v-jhalawar-1',
    name: 'Sun City Solar Innovations',
    contactPerson: 'Arvind Patidar',
    email: 'suncitysolar.jhl@gmail.com',
    contact: '+91 9829066554',
    address: 'Jhalrapatan Road, Near Mini Secretariat, Jhalawar',
    state: 'Rajasthan',
    district: 'Jhalawar',
    businessType: 'installer',
    rating: 4.8,
    reviewCount: 33,
    status: 'Approved',
    tags: ['System Installer', 'Orchard & Farm Solar', 'PM Surya Ghar'],
    registeredAt: '2026-09-09T14:00:00Z',
  },
];

export const getStoredVendors = (): Vendor[] => {
  if (typeof window === 'undefined') return INITIAL_VENDORS;
  try {
    const rawV3 = localStorage.getItem(STORAGE_KEY);
    if (rawV3) {
      const parsed = JSON.parse(rawV3);
      if (Array.isArray(parsed) && parsed.length >= INITIAL_VENDORS.length) {
        return parsed;
      }
    }

    // Merge with any previously saved custom user registrations
    const rawOld = localStorage.getItem(PREV_KEY);
    let customRegistrations: Vendor[] = [];
    if (rawOld) {
      try {
        const oldParsed = JSON.parse(rawOld);
        if (Array.isArray(oldParsed)) {
          // Keep only newly registered ones (id starts with 'v-' followed by digits or timestamp)
          customRegistrations = oldParsed.filter(
            (v: any) => v && typeof v.id === 'string' && !v.id.includes('-dungarpur-') && !v.id.includes('-jaipur-') && !INITIAL_VENDORS.some(iv => iv.id === v.id)
          );
        }
      } catch (e) {
        // ignore
      }
    }

    const merged = [...customRegistrations, ...INITIAL_VENDORS];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
    return merged;
  } catch (e) {
    console.error('Error reading vendors from localStorage', e);
    return INITIAL_VENDORS;
  }
};

export const saveVendor = (vendorData: {
  name: string;
  contactPerson: string;
  email: string;
  contact: string;
  address: string;
  state?: string;
  district?: string;
  businessType: 'dealer' | 'distributor' | 'installer' | 'other';
  status?: 'Approved' | 'Pending' | 'Rejected';
  rating?: number;
  tags?: string[];
}): Vendor => {
  const current = getStoredVendors();

  const typeLabels: Record<string, string> = {
    dealer: 'Certified Dealer',
    distributor: 'Regional Distributor',
    installer: 'System Installer',
    other: 'Channel Partner'
  };

  const newVendor: Vendor = {
    id: `v-${Date.now()}`,
    name: vendorData.name,
    contactPerson: vendorData.contactPerson,
    email: vendorData.email,
    contact: vendorData.contact,
    address: vendorData.address,
    state: vendorData.state || 'Rajasthan',
    district: vendorData.district || 'Dungarpur',
    businessType: vendorData.businessType || 'dealer',
    rating: vendorData.rating ?? 5.0,
    reviewCount: 1,
    status: vendorData.status ?? 'Approved',
    tags: vendorData.tags && vendorData.tags.length > 0
      ? vendorData.tags
      : [typeLabels[vendorData.businessType || 'dealer'] || 'Channel Partner', 'PM Surya Ghar Subsidy', 'Verified Partner'],
    registeredAt: new Date().toISOString()
  };

  const updated = [newVendor, ...current.filter(v => v.id !== newVendor.id)];
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    window.dispatchEvent(new CustomEvent('sb-vendors-updated', { detail: updated }));
  } catch (e) {
    console.error('Error saving vendor to localStorage', e);
  }

  return newVendor;
};

export const updateVendorStatus = (id: string, status: 'Approved' | 'Pending' | 'Rejected'): Vendor[] => {
  const current = getStoredVendors();
  const updated = current.map(v => v.id === id ? { ...v, status } : v);
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    window.dispatchEvent(new CustomEvent('sb-vendors-updated', { detail: updated }));
  } catch (e) {
    console.error('Error updating vendor status', e);
  }
  return updated;
};

export const deleteVendor = (id: string): Vendor[] => {
  const current = getStoredVendors();
  const updated = current.filter(v => v.id !== id);
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    window.dispatchEvent(new CustomEvent('sb-vendors-updated', { detail: updated }));
  } catch (e) {
    console.error('Error deleting vendor', e);
  }
  return updated;
};
