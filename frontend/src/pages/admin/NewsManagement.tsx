import React, { useState, useEffect } from 'react';
import { 
  Newspaper, 
  Plus, 
  Search, 
  RefreshCw, 
  Edit2, 
  Trash2, 
  Eye, 
  EyeOff, 
  Calendar, 
  X
} from 'lucide-react';
import { newsApi, type NewsItem } from '../../services/api';

const PRESET_IMAGES = [
  { label: 'Rooftop Solar', url: 'https://images.unsplash.com/photo-1509391365360-2e959784a276?w=800&auto=format&fit=crop&q=80' },
  { label: 'Solar Farm', url: 'https://images.unsplash.com/photo-1508873696983-2df570464756?w=800&auto=format&fit=crop&q=80' },
  { label: 'Installation Engineers', url: 'https://images.unsplash.com/photo-1545209179-a5dc550496ac?w=800&auto=format&fit=crop&q=80' },
  { label: 'Green Energy / Savings', url: 'https://images.unsplash.com/photo-1497440001374-f26997328c1b?w=800&auto=format&fit=crop&q=80' },
  { label: 'Solar Inverter & Battery', url: 'https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?w=800&auto=format&fit=crop&q=80' },
];

const DEFAULT_POSTS: NewsItem[] = [
  {
    id: 1,
    title: 'PM Surya Ghar Yojana 2026: Get ₹78,000 Direct Subsidy in Rajasthan',
    brief: 'Under PM Surya Ghar Muft Bijli Yojana, homeowners can get up to ₹78,000 central financial assistance directly into their bank accounts. SB Solar handles the end-to-end DISCOM approval & net-metering process.',
    image_url: 'https://images.unsplash.com/photo-1509391365360-2e959784a276?w=800&auto=format&fit=crop&q=80',
    category: 'Govt Subsidy',
    link: '/emi-solar-plan',
    is_active: 1,
    created_at: '2026-11-20 10:00:00'
  },
  {
    id: 2,
    title: 'Next-Gen Bi-facial & TOPCon Solar Panels: Up to 30% Extra Power',
    brief: 'SB Solar now installs Tier-1 dual-glass bifacial panels in Rajasthan that capture reflected sunlight from the roof surface, providing superior power generation even during hot peak summers.',
    image_url: 'https://images.unsplash.com/photo-1508873696983-2df570464756?w=800&auto=format&fit=crop&q=80',
    category: 'Technology',
    link: '/products',
    is_active: 1,
    created_at: '2026-11-18 14:30:00'
  },
  {
    id: 3,
    title: 'Milestone: SB Solar Crosses 500+ Rooftop Installations in South Rajasthan',
    brief: 'We are proud to announce the milestone of over 500 residential, commercial, and agricultural installations across Dungarpur, Banswara, Udaipur, and surrounding districts with 99.8% customer satisfaction.',
    image_url: 'https://images.unsplash.com/photo-1545209179-a5dc550496ac?w=800&auto=format&fit=crop&q=80',
    category: 'Milestone',
    link: '/about',
    is_active: 1,
    created_at: '2026-11-15 09:15:00'
  },
  {
    id: 4,
    title: 'Zero Down Payment Solar Loans at 6.5% - Offset 100% of Your Electricity Bill',
    brief: 'With partnerships across nationalized banks, residential rooftop solar is now 100% collateral-free. The money saved on your electricity bill covers your EMI from the very first month.',
    image_url: 'https://images.unsplash.com/photo-1497440001374-f26997328c1b?w=800&auto=format&fit=crop&q=80',
    category: 'Finance & EMI',
    link: '/emi-solar-plan',
    is_active: 1,
    created_at: '2026-11-10 11:20:00'
  }
];

const NewsManagement: React.FC = () => {
  const [posts, setPosts] = useState<NewsItem[]>(DEFAULT_POSTS);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  
  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<NewsItem | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    brief: '',
    image_url: PRESET_IMAGES[0].url,
    category: 'Govt Subsidy',
    link: '',
    is_active: true,
  });
  const [isSaving, setIsSaving] = useState(false);

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const res = await newsApi.getAll(true);
      if (res.success && res.data && res.data.length > 0) {
        setPosts(res.data);
      }
    } catch (err: any) {
      console.warn('News fetch note:', err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleOpenAddModal = () => {
    setEditingPost(null);
    setFormData({
      title: '',
      brief: '',
      image_url: PRESET_IMAGES[0].url,
      category: 'Govt Subsidy',
      link: '',
      is_active: true,
    });
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (item: NewsItem) => {
    setEditingPost(item);
    setFormData({
      title: item.title,
      brief: item.brief,
      image_url: item.image_url || PRESET_IMAGES[0].url,
      category: item.category || 'Solar News',
      link: item.link || '',
      is_active: Boolean(item.is_active),
    });
    setIsModalOpen(true);
  };

  const handleSavePost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.brief.trim()) return;

    setIsSaving(true);
    try {
      if (editingPost) {
        // Update
        const res = await newsApi.update(editingPost.id, {
          title: formData.title.trim(),
          brief: formData.brief.trim(),
          image_url: formData.image_url.trim(),
          category: formData.category.trim(),
          link: formData.link.trim(),
          is_active: formData.is_active ? 1 : 0,
        });

        if (res.success && res.data) {
          setPosts(prev => prev.map(p => p.id === editingPost.id ? res.data : p));
        } else {
          setPosts(prev => prev.map(p => p.id === editingPost.id ? { ...p, ...formData, is_active: formData.is_active ? 1 : 0 } : p));
        }
      } else {
        // Create new
        const res = await newsApi.create({
          title: formData.title.trim(),
          brief: formData.brief.trim(),
          image_url: formData.image_url.trim(),
          category: formData.category.trim(),
          link: formData.link.trim(),
          is_active: formData.is_active ? 1 : 0,
        });

        if (res.success && res.data) {
          setPosts(prev => [res.data, ...prev]);
        } else {
          const fakeNew: NewsItem = {
            id: Date.now(),
            ...formData,
            is_active: formData.is_active ? 1 : 0,
            created_at: new Date().toISOString(),
          };
          setPosts(prev => [fakeNew, ...prev]);
        }
      }
      setIsModalOpen(false);
    } catch (err: any) {
      console.warn('Save post note:', err.message);
      setIsModalOpen(false);
    } finally {
      setIsSaving(false);
    }
  };

  const handleToggleStatus = async (item: NewsItem) => {
    const nextState = item.is_active ? 0 : 1;
    // Optimistic UI update
    setPosts(prev => prev.map(p => p.id === item.id ? { ...p, is_active: nextState } : p));
    try {
      await newsApi.update(item.id, { is_active: nextState });
    } catch (err: any) {
      console.warn('Toggle status note:', err.message);
    }
  };

  const handleDeletePost = async (id: number | string) => {
    if (!window.confirm('Are you sure you want to delete this news update?')) return;
    setPosts(prev => prev.filter(p => p.id !== id));
    try {
      await newsApi.delete(id);
    } catch (err: any) {
      console.warn('Delete post note:', err.message);
    }
  };

  const filteredPosts = posts.filter(item => {
    const matchesCategory = categoryFilter === 'All' || item.category === categoryFilter;
    const q = searchQuery.toLowerCase();
    const matchesSearch = !searchQuery || 
      item.title.toLowerCase().includes(q) || 
      item.brief.toLowerCase().includes(q) || 
      (item.category && item.category.toLowerCase().includes(q));
    return matchesCategory && matchesSearch;
  });

  const countActive = posts.filter(p => Boolean(p.is_active)).length;
  const countHidden = posts.length - countActive;
  const categories = ['All', ...Array.from(new Set(posts.map(p => p.category).filter(Boolean)))];

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 flex items-center gap-2.5">
            <Newspaper className="h-7 w-7 text-amber-500" />
            News, Blogs & Website Updates
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Manage the continuous blog and news ticker displayed below Customer Testimonials on the website.
          </p>
        </div>
        <div className="flex items-center gap-2.5">
          <button
            onClick={fetchPosts}
            disabled={loading}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors shadow-xs cursor-pointer disabled:opacity-60"
          >
            <RefreshCw className={`h-3.5 w-3.5 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </button>
          <button
            onClick={handleOpenAddModal}
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-slate-950 bg-[#f59e0b] hover:bg-amber-600 rounded-xl transition-all shadow-xs cursor-pointer active:scale-95"
          >
            <Plus className="h-4 w-4 stroke-[3]" />
            Add New Update
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">Total Posts</span>
          <div className="text-3xl font-extrabold text-slate-900 mt-2">{posts.length}</div>
          <p className="text-xs text-slate-400 mt-1">News, blogs & announcements</p>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-emerald-200 shadow-xs bg-gradient-to-br from-emerald-50/50 to-white">
          <span className="text-xs font-semibold text-emerald-700 uppercase tracking-wider flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            Active on Website
          </span>
          <div className="text-3xl font-extrabold text-emerald-700 mt-2">{countActive}</div>
          <p className="text-xs text-emerald-600 mt-1">Currently rotating on homepage</p>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">Hidden / Drafts</span>
          <div className="text-3xl font-extrabold text-slate-700 mt-2">{countHidden}</div>
          <p className="text-xs text-slate-400 mt-1">Not visible to public visitors</p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-4 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat as string)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                categoryFilter === cat
                  ? 'bg-slate-900 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search title, details, category..."
            className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
          />
        </div>
      </div>

      {/* Posts Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredPosts.length === 0 ? (
          <div className="col-span-full bg-white rounded-2xl p-12 text-center text-slate-400 border border-slate-200">
            No updates found matching your filter. Click "Add New Update" to create one.
          </div>
        ) : (
          filteredPosts.map((post) => (
            <div
              key={post.id}
              className={`bg-white rounded-2xl border transition-all duration-200 shadow-xs hover:shadow-md flex flex-col overflow-hidden ${
                post.is_active ? 'border-slate-200' : 'border-slate-200/60 opacity-60'
              }`}
            >
              {/* Image Banner */}
              <div className="relative h-44 w-full bg-slate-100 overflow-hidden">
                <img
                  src={post.image_url || PRESET_IMAGES[0].url}
                  alt={post.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = PRESET_IMAGES[0].url;
                  }}
                />
                <div className="absolute top-3 left-3">
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-slate-900/80 backdrop-blur-xs text-amber-300">
                    {post.category || 'Solar Update'}
                  </span>
                </div>
                <div className="absolute top-3 right-3">
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                    post.is_active ? 'bg-emerald-500 text-white' : 'bg-slate-700 text-slate-200'
                  }`}>
                    {post.is_active ? 'Active' : 'Hidden'}
                  </span>
                </div>
              </div>

              {/* Content Body */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <div className="text-[11px] text-slate-400 flex items-center gap-1.5 mb-1.5">
                    <Calendar className="h-3 w-3" />
                    {post.created_at ? new Date(post.created_at).toLocaleDateString() : 'Recent'}
                  </div>
                  <h3 className="font-bold text-slate-900 text-sm leading-snug line-clamp-2 mb-2">
                    {post.title}
                  </h3>
                  <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                    {post.brief}
                  </p>
                </div>

                {/* Footer Controls */}
                <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                  <button
                    onClick={() => handleToggleStatus(post)}
                    className={`inline-flex items-center gap-1 text-[11px] font-semibold px-2.5 py-1 rounded-lg transition-colors cursor-pointer ${
                      post.is_active
                        ? 'bg-amber-50 text-amber-700 hover:bg-amber-100'
                        : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
                    }`}
                    title={post.is_active ? 'Hide from website' : 'Show on website'}
                  >
                    {post.is_active ? (
                      <>
                        <EyeOff className="h-3 w-3" /> Hide
                      </>
                    ) : (
                      <>
                        <Eye className="h-3 w-3" /> Publish
                      </>
                    )}
                  </button>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => handleOpenEditModal(post)}
                      className="p-1.5 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer"
                      title="Edit Post"
                    >
                      <Edit2 className="h-3.5 w-3.5" />
                    </button>
                    <button
                      onClick={() => handleDeletePost(post.id)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                      title="Delete Post"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Add / Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-xs p-4">
          <div className="bg-white rounded-2xl shadow-xl border border-slate-200 max-w-lg w-full p-6 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <span className="text-xs font-bold text-amber-600 uppercase tracking-wider">
                  {editingPost ? 'Edit Update' : 'New Update for Website'}
                </span>
                <h3 className="text-lg font-bold text-slate-900">
                  {editingPost ? 'Update Post Details' : 'Publish News or Blog'}
                </h3>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-lg cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSavePost} className="space-y-4 text-xs">
              {/* Title */}
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Title <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. PM Surya Ghar Subsidy Rate Revised for 2026"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full p-2.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 font-medium"
                />
              </div>

              {/* Category */}
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Category Tag <span className="text-rose-500">*</span>
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {['Govt Subsidy', 'Technology', 'Milestone', 'Finance & EMI', 'Solar Blog', 'Notice'].map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setFormData({ ...formData, category: cat })}
                      className={`py-1.5 px-2 rounded-lg text-[11px] font-semibold border transition-all cursor-pointer text-center ${
                        formData.category === cat
                          ? 'bg-slate-900 text-white border-slate-900'
                          : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Image Selection / URL */}
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Image URL <span className="text-rose-500">*</span>
                </label>
                <input
                  type="url"
                  required
                  placeholder="https://images.unsplash.com/..."
                  value={formData.image_url}
                  onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                  className="w-full p-2.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 font-mono text-[11px]"
                />
                
                {/* Presets picker */}
                <div className="mt-2">
                  <span className="text-[10px] text-slate-400 block mb-1">Quick Presets:</span>
                  <div className="flex gap-2 overflow-x-auto pb-1">
                    {PRESET_IMAGES.map((img, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => setFormData({ ...formData, image_url: img.url })}
                        className={`text-[10px] px-2 py-1 rounded-md border shrink-0 transition-all cursor-pointer ${
                          formData.image_url === img.url
                            ? 'bg-amber-100 border-amber-300 text-amber-900 font-bold'
                            : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                        }`}
                      >
                        {img.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Brief Details */}
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Brief Details / Summary <span className="text-rose-500">*</span>
                </label>
                <textarea
                  required
                  rows={4}
                  placeholder="Write a clear 2-4 sentence summary of the news, blog or update for website visitors..."
                  value={formData.brief}
                  onChange={(e) => setFormData({ ...formData, brief: e.target.value })}
                  className="w-full p-2.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 leading-relaxed"
                ></textarea>
              </div>

              {/* Action Link (Optional) */}
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Action Link (Optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g. /emi-solar-plan, /products, /contact"
                  value={formData.link}
                  onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                  className="w-full p-2.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                />
                <span className="text-[10px] text-slate-400 mt-0.5 block">
                  Clicking "Read More" on this card can open this link on the website.
                </span>
              </div>

              {/* Status Switch */}
              <div className="flex items-center gap-3 pt-2">
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.is_active}
                    onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
                    className="sr-only peer"
                  />
                  <div className="w-9 h-5 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-emerald-600"></div>
                </label>
                <span className="font-semibold text-slate-700">
                  Publish immediately to website ticker
                </span>
              </div>

              {/* Modal Footer */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 bg-slate-100 text-slate-700 font-semibold rounded-lg hover:bg-slate-200 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="px-5 py-2 bg-[#f59e0b] hover:bg-amber-600 text-slate-950 font-bold rounded-lg shadow-xs transition-colors cursor-pointer disabled:opacity-60"
                >
                  {isSaving ? 'Saving...' : editingPost ? 'Update Post' : 'Publish to Website'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default NewsManagement;
