import React, { useState } from 'react';
import { Search, Plus, Mail, Phone, MapPin, Building2 } from 'lucide-react';

const ContactsManagement: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const contacts = [
    {
      id: '1',
      name: 'Aarav Sharma',
      initials: 'AS',
      role: 'Plant Director',
      company: 'Apex Manufacturing Ltd',
      email: 'aarav.sharma@apexsolar.in',
      phone: '+91 98201 44521',
      city: 'Ahmedabad, Gujarat',
      dealsCount: 2,
    },
    {
      id: '2',
      name: 'Priya Mehta',
      initials: 'PM',
      role: 'Managing Partner',
      company: 'Grand Horizon Hospitality',
      email: 'p.mehta@grandhorizon.com',
      phone: '+91 97112 88340',
      city: 'Jaipur, Rajasthan',
      dealsCount: 1,
    },
    {
      id: '3',
      name: 'Vikram Khanna',
      initials: 'VK',
      role: 'Agri-Business Head',
      company: 'Khanna Agro Farms',
      email: 'vikram@khannafarms.in',
      phone: '+91 94140 19283',
      city: 'Kota, Rajasthan',
      dealsCount: 1,
    },
    {
      id: '4',
      name: 'Sneha Rao',
      initials: 'SR',
      role: 'Homeowner / Residential',
      company: 'Private Residence',
      email: 'sneha.rao@gmail.com',
      phone: '+91 98840 22391',
      city: 'Bengaluru, Karnataka',
      dealsCount: 1,
    },
    {
      id: '5',
      name: 'Karan Joshi',
      initials: 'KJ',
      role: 'Facility Lead',
      company: 'Joshi Textile Mills',
      email: 'karan.j@joshitextiles.com',
      phone: '+91 99090 81273',
      city: 'Surat, Gujarat',
      dealsCount: 2,
    },
    {
      id: '6',
      name: 'Meera Iyer',
      initials: 'MI',
      role: 'Residential Client',
      company: 'Green Villa Estate',
      email: 'meera.iyer@outlook.com',
      phone: '+91 98450 71829',
      city: 'Chennai, Tamil Nadu',
      dealsCount: 1,
    },
  ];

  const filtered = contacts.filter(
    (c) =>
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.city.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 pb-12 font-sans">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-slate-900 tracking-tight">
            Contacts
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Manage your solar customer relationships and key stakeholders
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder="Search contacts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm text-slate-800 placeholder-slate-400 w-60 sm:w-72 shadow-2xs focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
            />
          </div>

          <button
            type="button"
            className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-[#2f5bf8] hover:bg-[#254edb] text-white rounded-xl text-sm font-medium shadow-sm transition-all cursor-pointer whitespace-nowrap"
          >
            <Plus className="w-4 h-4" />
            Add contact
          </button>
        </div>
      </div>

      {/* Contacts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((contact) => (
          <div
            key={contact.id}
            className="bg-white rounded-2xl p-5 border border-slate-100 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-sm">
                    {contact.initials}
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-base">
                      {contact.name}
                    </h3>
                    <p className="text-xs text-slate-400">{contact.role}</p>
                  </div>
                </div>
                <span className="text-xs bg-slate-100 text-slate-600 px-2.5 py-1 rounded-full font-medium">
                  {contact.dealsCount} Deals
                </span>
              </div>

              <div className="mt-4 space-y-2 text-xs text-slate-600">
                <div className="flex items-center gap-2">
                  <Building2 className="w-3.5 h-3.5 text-slate-400" />
                  <span>{contact.company}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-slate-400" />
                  <span>{contact.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-slate-400" />
                  <span>{contact.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" />
                  <span>{contact.city}</span>
                </div>
              </div>
            </div>

            <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="text-slate-400">Owner: Rahul</span>
              <button
                type="button"
                className="text-blue-600 hover:text-blue-800 font-semibold cursor-pointer"
              >
                View Profile →
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContactsManagement;
