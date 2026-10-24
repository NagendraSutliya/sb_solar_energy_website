import React, { useState } from 'react';
import { Plus } from 'lucide-react';

interface ContactItem {
  id: string;
  name: string;
  initials: string;
  city: string;
  phone: string;
  tag: 'Customer' | 'Lead' | 'Vendor';
}

const INITIAL_CONTACTS: ContactItem[] = [
  {
    id: '1',
    name: 'Aarav Sharma',
    initials: 'AS',
    city: 'Jaipur',
    phone: '+91 98765 43210',
    tag: 'Customer',
  },
  {
    id: '2',
    name: 'Priya Mehta',
    initials: 'PM',
    city: 'Udaipur',
    phone: '+91 98291 54321',
    tag: 'Customer',
  },
  {
    id: '3',
    name: 'Vikram Khanna',
    initials: 'VK',
    city: 'Sikar',
    phone: '+91 94145 66778',
    tag: 'Lead',
  },
  {
    id: '4',
    name: 'Sneha Rao',
    initials: 'SR',
    city: 'Ajmer',
    phone: '+91 98280 44556',
    tag: 'Lead',
  },
  {
    id: '5',
    name: 'Govind Singh',
    initials: 'GS',
    city: 'Banswara',
    phone: '+91 94133 21987',
    tag: 'Vendor',
  },
  {
    id: '6',
    name: 'Meera Iyer',
    initials: 'MI',
    city: 'Kota',
    phone: '+91 98290 12345',
    tag: 'Lead',
  },
];

const ContactsManagement: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const getTagStyle = (tag: ContactItem['tag']) => {
    switch (tag) {
      case 'Customer':
        return 'bg-emerald-100 text-emerald-800';
      case 'Lead':
        return 'bg-amber-100 text-amber-800';
      case 'Vendor':
      default:
        return 'bg-slate-100 text-slate-700';
    }
  };

  const filtered = INITIAL_CONTACTS.filter(
    (c) =>
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.phone.includes(searchQuery) ||
      c.tag.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 pb-12 font-sans">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-extrabold text-slate-900 tracking-tight">
            Contacts
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            312 people
          </p>
        </div>

        <div className="flex items-center gap-3">
          <input
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm text-slate-800 placeholder-slate-400 w-56 sm:w-64 shadow-2xs focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all"
          />

          <button
            type="button"
            className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-[#f59e0b] hover:bg-amber-600 active:scale-[0.98] text-slate-950 rounded-xl text-sm font-bold shadow-xs transition-all cursor-pointer whitespace-nowrap"
          >
            <Plus className="w-4 h-4 stroke-[3]" />
            Add contact
          </button>
        </div>
      </div>

      {/* Contacts Grid matching Contacts.png (3 Columns) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((contact) => (
          <div
            key={contact.id}
            className="bg-white rounded-2xl p-6 border border-slate-100 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center font-bold text-xs shrink-0">
                  {contact.initials}
                </div>
                <h3 className="font-bold text-slate-900 text-base">
                  {contact.name}
                </h3>
              </div>

              <div className="mt-4 space-y-1 text-xs text-slate-500">
                <p>{contact.city}</p>
                <p className="font-medium text-slate-600">{contact.phone}</p>
              </div>
            </div>

            <div className="mt-5">
              <span
                className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${getTagStyle(
                  contact.tag
                )}`}
              >
                {contact.tag}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContactsManagement;
