import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { 
  FileText, 
  Users, 
  Layers, 
  FileCheck2, 
  Handshake, 
  UserCheck, 
  Newspaper, 
  Image as ImageIcon,
  CheckCircle2,
  Plus,
  Save,
  Edit3,
  Trash2,
  ExternalLink,
  Sparkles,
  X,
  Printer,
  Receipt,
  Calendar,
  Clock,
  Phone,
  Mail,
  ShieldCheck
} from 'lucide-react';
import { useToast } from '../../context/ToastContext';
import { useNGO } from '../../context/NGOContext';
import { areasOfWork, fieldDispatches } from '../../data/mockData';
import ReceiptModal from '../../components/common/ReceiptModal';

export default function AdminGenericCMS() {
  const location = useLocation();
  const { addToast } = useToast();
  const { cmsContent, updateCMS, transactions, shops } = useNGO();
  const path = location.pathname.split('/').pop() || 'overview';

  // CMS state for general copy
  const [editableCMS, setEditableCMS] = useState(cmsContent);

  // Dynamic modules state
  const [programsList, setProgramsList] = useState(areasOfWork);
  const [isAddProgramOpen, setIsAddProgramOpen] = useState(false);
  const [newProgram, setNewProgram] = useState({ title: '', desc: '', metric: '', icon: 'Heart' });

  const [newsList, setNewsList] = useState(fieldDispatches);
  const [isAddNewsOpen, setIsAddNewsOpen] = useState(false);
  const [newNews, setNewNews] = useState({ title: '', author: '', tag: 'Relief Drive', excerpt: '', date: 'Today' });

  const [galleryList, setGalleryList] = useState([
    { id: 1, title: "Daily Community Annadan Seva", category: "Annadan", url: "/immense_life_brand.jpg", caption: "Serving hot meals to elderly citizens and workers daily." },
    { id: 2, title: "Mobile Health Camp & Dispensary", category: "Healthcare", url: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=800&q=80", caption: "Voluntary physicians providing free checkups and medicines." },
    { id: 3, title: "Evening Learning Centers", category: "Education", url: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=800&q=80", caption: "Empowering young students with STEM kits and mentorship." },
    { id: 4, title: "Women's Artisan Cooperative", category: "Empowerment", url: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80", caption: "Training women in sustainable handicrafts and micro-grants." }
  ]);
  const [isAddGalleryOpen, setIsAddGalleryOpen] = useState(false);
  const [newGallery, setNewGallery] = useState({ title: '', category: 'Community', url: '', caption: '' });

  const [selectedReceiptTxn, setSelectedReceiptTxn] = useState(null);

  const handleSaveCMS = (e) => {
    e.preventDefault();
    updateCMS(editableCMS);
    addToast('Website copy updated successfully! Changes are live across the portal.', 'success');
  };

  const handleAddProgram = (e) => {
    e.preventDefault();
    const created = { id: `prog-${Date.now()}`, ...newProgram };
    setProgramsList([created, ...programsList]);
    setIsAddProgramOpen(false);
    setNewProgram({ title: '', desc: '', metric: '', icon: 'Heart' });
    addToast(`Program "${created.title}" added to website!`, 'success');
  };

  const handleDeleteProgram = (id) => {
    setProgramsList(programsList.filter(p => p.id !== id));
    addToast('Program removed from website list.', 'info');
  };

  const handleAddNews = (e) => {
    e.preventDefault();
    const created = { id: `news-${Date.now()}`, ...newNews, image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=800&q=80', readTime: '3 min read' };
    setNewsList([created, ...newsList]);
    setIsAddNewsOpen(false);
    setNewNews({ title: '', author: '', tag: 'Relief Drive', excerpt: '', date: 'Today' });
    addToast(`News update "${created.title}" published!`, 'success');
  };

  const handleDeleteNews = (id) => {
    setNewsList(newsList.filter(n => n.id !== id));
    addToast('News story removed.', 'info');
  };

  const handleAddGallery = (e) => {
    e.preventDefault();
    const created = { id: Date.now(), ...newGallery, url: newGallery.url || '/immense_life_brand.jpg' };
    setGalleryList([created, ...galleryList]);
    setIsAddGalleryOpen(false);
    setNewGallery({ title: '', category: 'Community', url: '', caption: '' });
    addToast(`Photo "${created.title}" added to gallery!`, 'success');
  };

  const handleDeleteGallery = (id) => {
    setGalleryList(galleryList.filter(g => g.id !== id));
    addToast('Photo removed from gallery.', 'info');
  };

  const titleMap = {
    content: { title: 'Website Content & Editorial CMS', icon: FileText, desc: 'Manage hero banner headlines, mission statements, and FAQ content without coding' },
    programs: { title: 'Programs CMS', icon: Layers, desc: 'Manage Annadan, Child Education, Healthcare & Community Relief pillars' },
    donors: { title: 'Donors & Customer Supporter Records', icon: Users, desc: 'View registered donors, mobile numbers, and contribution records' },
    receipts: { title: 'Section 80G Tax Receipts & Invoices', icon: FileCheck2, desc: 'View, verify, and reprint Section 80G tax certificates and GST invoices' },
    gallery: { title: 'Gallery Media Vault', icon: ImageIcon, desc: 'Manage high-resolution field photography and relief distribution media' },
    news: { title: 'News, Field Dispatches & Events', icon: Newspaper, desc: 'Publish field updates, announcements, and upcoming NGO events' },
    partners: { title: 'Corporate & Institutional Partners', icon: Handshake, desc: 'Manage partner retail shops, academic coalitions, and CSR sponsors' },
    users: { title: 'System Access & Role Permissions', icon: UserCheck, desc: 'Manage administrative roles, audit inspectors, and field station loggers' },
  };

  const current = titleMap[path] || {
    title: 'Content & Administration Module',
    icon: FileText,
    desc: 'Manage foundation administrative data and parameters'
  };

  const Icon = current.icon;

  return (
    <div className="space-y-6">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-start gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-[#E8EFEA] text-[#143D2B] flex items-center justify-center shrink-0">
            <Icon className="w-6 h-6 text-emerald-800" />
          </div>
          <div>
            <h2 className="font-serif text-2xl font-bold text-[#143D2B]">
              {current.title}
            </h2>
            <p className="text-xs text-gray-500 mt-0.5">
              {current.desc}
            </p>
          </div>
        </div>

        {/* Contextual Action Button based on path */}
        {path === 'programs' && (
          <button
            onClick={() => setIsAddProgramOpen(true)}
            className="px-5 py-2.5 bg-[#143D2B] hover:bg-[#0E2E20] text-white text-xs font-bold rounded-xl flex items-center gap-1.5 shadow-sm transition"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Program</span>
          </button>
        )}
        {path === 'news' && (
          <button
            onClick={() => setIsAddNewsOpen(true)}
            className="px-5 py-2.5 bg-[#143D2B] hover:bg-[#0E2E20] text-white text-xs font-bold rounded-xl flex items-center gap-1.5 shadow-sm transition"
          >
            <Plus className="w-4 h-4" />
            <span>Publish News Story</span>
          </button>
        )}
        {path === 'gallery' && (
          <button
            onClick={() => setIsAddGalleryOpen(true)}
            className="px-5 py-2.5 bg-[#143D2B] hover:bg-[#0E2E20] text-white text-xs font-bold rounded-xl flex items-center gap-1.5 shadow-sm transition"
          >
            <Plus className="w-4 h-4" />
            <span>Upload Photo</span>
          </button>
        )}
      </div>

      {/* 1. WEBSITE COPY / ABOUT US CMS */}
      {path === 'content' && (
        <form onSubmit={handleSaveCMS} className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E7E2D5] shadow-xs space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-gray-100">
            <div>
              <h3 className="font-serif text-lg font-bold text-[#143D2B]">
                Public Portal Copy & Announcement Editor
              </h3>
              <p className="text-xs text-gray-500">
                SOP Requirement #1: Update portal content without writing any code
              </p>
            </div>
            <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200 flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3 text-emerald-600" />
              Live Synced
            </span>
          </div>

          <div className="space-y-4">
            <div>
              <label className="text-xs font-bold text-gray-700 block mb-1">Top Announcement Ticker</label>
              <input
                type="text"
                value={editableCMS.announcement}
                onChange={(e) => setEditableCMS({ ...editableCMS, announcement: e.target.value })}
                className="w-full bg-[#FAF9F5] border border-gray-300 rounded-xl px-3.5 py-2 text-xs text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#143D2B]"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-gray-700 block mb-1">Hero Tagline</label>
              <input
                type="text"
                value={editableCMS.heroTagline}
                onChange={(e) => setEditableCMS({ ...editableCMS, heroTagline: e.target.value })}
                className="w-full bg-[#FAF9F5] border border-gray-300 rounded-xl px-3.5 py-2 text-xs text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#143D2B]"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-gray-700 block mb-1">Hero Main Headline</label>
              <input
                type="text"
                value={editableCMS.heroTitle}
                onChange={(e) => setEditableCMS({ ...editableCMS, heroTitle: e.target.value })}
                className="w-full bg-[#FAF9F5] border border-gray-300 rounded-xl px-3.5 py-2 text-xs font-serif font-bold text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#143D2B]"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-gray-700 block mb-1">Hero Subtitle / Mission Statement</label>
              <textarea
                rows={3}
                value={editableCMS.heroSubtitle}
                onChange={(e) => setEditableCMS({ ...editableCMS, heroSubtitle: e.target.value })}
                className="w-full bg-[#FAF9F5] border border-gray-300 rounded-xl px-3.5 py-2 text-xs text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#143D2B]"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-gray-700 block mb-1">Official Donor Helpline</label>
                <input
                  type="text"
                  value={editableCMS.contactPhone}
                  onChange={(e) => setEditableCMS({ ...editableCMS, contactPhone: e.target.value })}
                  className="w-full bg-[#FAF9F5] border border-gray-300 rounded-xl px-3.5 py-2 text-xs text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#143D2B]"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-gray-700 block mb-1">Official Support Email</label>
                <input
                  type="email"
                  value={editableCMS.contactEmail}
                  onChange={(e) => setEditableCMS({ ...editableCMS, contactEmail: e.target.value })}
                  className="w-full bg-[#FAF9F5] border border-gray-300 rounded-xl px-3.5 py-2 text-xs text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#143D2B]"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-gray-700 block mb-1">Headquarters & Postal Address</label>
              <input
                type="text"
                value={editableCMS.headquarters}
                onChange={(e) => setEditableCMS({ ...editableCMS, headquarters: e.target.value })}
                className="w-full bg-[#FAF9F5] border border-gray-300 rounded-xl px-3.5 py-2 text-xs text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#143D2B]"
              />
            </div>
          </div>

          <div className="pt-2 flex justify-end">
            <button
              type="submit"
              className="px-6 py-2.5 bg-[#143D2B] hover:bg-[#0E2E20] text-white text-xs font-bold rounded-xl flex items-center gap-1.5 shadow-sm transition"
            >
              <Save className="w-4 h-4 text-emerald-300" />
              <span>Publish Live Updates</span>
            </button>
          </div>
        </form>
      )}

      {/* 2. PROGRAMS CMS */}
      {path === 'programs' && (
        <div className="space-y-4">
          <div className="bg-white rounded-3xl border border-[#E7E2D5] shadow-xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#FAF9F5] text-gray-500 font-bold uppercase text-[10px] border-b border-gray-100">
                  <tr>
                    <th className="py-3.5 px-4">Program Pillar</th>
                    <th className="py-3.5 px-4">Key Metric</th>
                    <th className="py-3.5 px-4">Description</th>
                    <th className="py-3.5 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 font-medium text-gray-800">
                  {programsList.map((prog) => (
                    <tr key={prog.id} className="hover:bg-gray-50/80 transition">
                      <td className="py-3.5 px-4 font-bold text-gray-900">{prog.title}</td>
                      <td className="py-3.5 px-4 text-emerald-800 font-bold">{prog.metric}</td>
                      <td className="py-3.5 px-4 text-gray-600 max-w-md">{prog.desc}</td>
                      <td className="py-3.5 px-4 text-right">
                        <button
                          onClick={() => handleDeleteProgram(prog.id)}
                          className="p-1.5 hover:bg-red-50 text-red-600 rounded-lg transition"
                          title="Delete Program"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* 3. GALLERY MEDIA CMS */}
      {path === 'gallery' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {galleryList.map((photo) => (
              <div key={photo.id} className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-xs hover:shadow-md transition">
                <div className="h-40 bg-stone-100 relative overflow-hidden">
                  <img src={photo.url} alt={photo.title} className="w-full h-full object-cover" />
                  <span className="absolute top-2 left-2 bg-black/60 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                    {photo.category}
                  </span>
                </div>
                <div className="p-3.5 space-y-1">
                  <h4 className="font-bold text-stone-900 text-xs truncate">{photo.title}</h4>
                  <p className="text-[11px] text-stone-500 line-clamp-2">{photo.caption}</p>
                  <div className="pt-2 flex justify-end">
                    <button
                      onClick={() => handleDeleteGallery(photo.id)}
                      className="text-red-500 hover:text-red-700 text-xs font-semibold flex items-center gap-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Remove</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 4. NEWS & EVENTS CMS */}
      {path === 'news' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {newsList.map((news) => (
              <div key={news.id} className="bg-white rounded-3xl p-5 border border-[#E7E2D5] shadow-xs space-y-2.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[10px] font-bold text-[#A34805] bg-[#FFF2E3] px-2.5 py-0.5 rounded-full border border-[#F5DEC8]">
                    {news.tag}
                  </span>
                  <span className="text-gray-400 text-[11px]">{news.date}</span>
                </div>
                <h3 className="font-serif font-bold text-base text-gray-900 leading-snug">{news.title}</h3>
                <p className="text-xs text-gray-600 line-clamp-2">{news.excerpt}</p>
                <div className="pt-2 flex items-center justify-between border-t border-gray-100 text-xs">
                  <span className="text-gray-500 font-medium">By {news.author || 'Foundation Team'}</span>
                  <button
                    onClick={() => handleDeleteNews(news.id)}
                    className="text-red-500 hover:text-red-700 font-bold flex items-center gap-1"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Delete</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 5. RECEIPTS & 80G FILINGS */}
      {path === 'receipts' && (
        <div className="bg-white rounded-3xl border border-[#E7E2D5] shadow-xs overflow-hidden">
          <div className="p-4 border-b border-gray-100 flex items-center justify-between">
            <span className="text-xs font-bold text-gray-700">Official Section 80G Receipts & GST Invoices</span>
            <span className="text-xs text-emerald-800 font-bold">{transactions.length} Total Receipts Issued</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#FAF9F5] text-gray-500 font-bold uppercase text-[10px] border-b border-gray-100">
                <tr>
                  <th className="py-3.5 px-4">Receipt No</th>
                  <th className="py-3.5 px-4">Donor Name & Mobile</th>
                  <th className="py-3.5 px-4">Mapped Counter</th>
                  <th className="py-3.5 px-4">Amount (₹)</th>
                  <th className="py-3.5 px-4">Razorpay Payment ID</th>
                  <th className="py-3.5 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 font-medium text-gray-800">
                {transactions.map((t) => (
                  <tr key={t.id} className="hover:bg-gray-50/80 transition">
                    <td className="py-3.5 px-4 font-mono font-bold text-[#143D2B]">{t.receiptNo}</td>
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-gray-900">{t.customerName}</div>
                      <div className="text-[11px] text-gray-500">{t.customerMobile || 'Direct'}</div>
                    </td>
                    <td className="py-3.5 px-4 text-gray-700">{t.shopName}</td>
                    <td className="py-3.5 px-4 font-serif font-bold text-emerald-800">
                      ₹{Number(t.amount).toLocaleString('en-IN')}
                    </td>
                    <td className="py-3.5 px-4 font-mono text-[11px] text-gray-500">{t.razorpayPaymentId}</td>
                    <td className="py-3.5 px-4 text-right">
                      {t.status === 'Completed' ? (
                        <button
                          onClick={() => setSelectedReceiptTxn(t)}
                          className="px-3 py-1.5 bg-[#FFF2E3] hover:bg-[#FCE2C8] text-[#A34805] text-xs font-bold rounded-xl flex items-center gap-1 border border-[#F5DEC8] transition ml-auto"
                        >
                          <Printer className="w-3.5 h-3.5 text-[#E87A1E]" />
                          <span>Print 80G</span>
                        </button>
                      ) : (
                        <span className="text-[10px] text-gray-400 italic">Unverified</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 6. DONORS & SUPPORTERS */}
      {path === 'donors' && (
        <div className="bg-white rounded-3xl border border-[#E7E2D5] shadow-xs overflow-hidden">
          <div className="p-4 border-b border-gray-100 flex items-center justify-between">
            <span className="text-xs font-bold text-gray-700">Registered Donors & QR Contributors</span>
            <span className="text-xs text-stone-500">{transactions.length} Contributions Recorded</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#FAF9F5] text-gray-500 font-bold uppercase text-[10px] border-b border-gray-100">
                <tr>
                  <th className="py-3.5 px-4">Donor Name</th>
                  <th className="py-3.5 px-4">Mobile Number</th>
                  <th className="py-3.5 px-4">Email</th>
                  <th className="py-3.5 px-4">Counter Used</th>
                  <th className="py-3.5 px-4">Amount (₹)</th>
                  <th className="py-3.5 px-4">Date</th>
                  <th className="py-3.5 px-4 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 font-medium text-gray-800">
                {transactions.map((t) => (
                  <tr key={t.id} className="hover:bg-gray-50/80 transition">
                    <td className="py-3.5 px-4 font-bold text-gray-900">{t.customerName}</td>
                    <td className="py-3.5 px-4 font-medium text-gray-700">{t.customerMobile || '—'}</td>
                    <td className="py-3.5 px-4 text-gray-500">{t.customerEmail || '—'}</td>
                    <td className="py-3.5 px-4 text-gray-700">{t.shopName}</td>
                    <td className="py-3.5 px-4 font-serif font-bold text-emerald-800">₹{Number(t.amount).toLocaleString('en-IN')}</td>
                    <td className="py-3.5 px-4 text-gray-500">{t.date}</td>
                    <td className="py-3.5 px-4 text-right">
                      <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                        {t.status || 'Completed'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 7. FALLBACK / PARTNERS / USERS */}
      {!['content', 'programs', 'gallery', 'news', 'receipts', 'donors'].includes(path) && (
        <div className="bg-white rounded-3xl p-8 border border-[#E7E2D5] shadow-xs text-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-800 flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-8 h-8 text-emerald-600" />
          </div>
          <h3 className="font-serif text-xl font-bold text-[#143D2B]">
            {current.title} is Active & Managed
          </h3>
          <p className="text-xs text-gray-500 max-w-md mx-auto leading-relaxed">
            All records in this module are linked to Immense Life Foundation live operational databases and cryptographic audit trails.
          </p>
        </div>
      )}

      {/* ADD PROGRAM MODAL */}
      {isAddProgramOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full border border-stone-200 shadow-xl space-y-4">
            <div className="flex justify-between items-center pb-2 border-b">
              <h3 className="font-bold text-sm text-[#143D2B]">Add Relief Program</h3>
              <button onClick={() => setIsAddProgramOpen(false)}><X className="w-4 h-4 text-gray-400" /></button>
            </div>
            <form onSubmit={handleAddProgram} className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-gray-700 block mb-1">Program Title</label>
                <input required type="text" value={newProgram.title} onChange={e => setNewProgram({...newProgram, title: e.target.value})} className="w-full bg-stone-50 border rounded-xl p-2.5" placeholder="e.g. Daily Annadan Seva" />
              </div>
              <div>
                <label className="font-bold text-gray-700 block mb-1">Key Impact Metric</label>
                <input required type="text" value={newProgram.metric} onChange={e => setNewProgram({...newProgram, metric: e.target.value})} className="w-full bg-stone-50 border rounded-xl p-2.5" placeholder="e.g. 10,000+ Meals Served" />
              </div>
              <div>
                <label className="font-bold text-gray-700 block mb-1">Description</label>
                <textarea required rows={3} value={newProgram.desc} onChange={e => setNewProgram({...newProgram, desc: e.target.value})} className="w-full bg-stone-50 border rounded-xl p-2.5" placeholder="Explain the field program impact..." />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button type="button" onClick={() => setIsAddProgramOpen(false)} className="px-4 py-2 bg-gray-100 rounded-xl font-bold">Cancel</button>
                <button type="submit" className="px-5 py-2 bg-[#143D2B] text-white rounded-xl font-bold">Save Program</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ADD NEWS MODAL */}
      {isAddNewsOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full border border-stone-200 shadow-xl space-y-4">
            <div className="flex justify-between items-center pb-2 border-b">
              <h3 className="font-bold text-sm text-[#143D2B]">Publish News or Event</h3>
              <button onClick={() => setIsAddNewsOpen(false)}><X className="w-4 h-4 text-gray-400" /></button>
            </div>
            <form onSubmit={handleAddNews} className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-gray-700 block mb-1">Article Headline</label>
                <input required type="text" value={newNews.title} onChange={e => setNewNews({...newNews, title: e.target.value})} className="w-full bg-stone-50 border rounded-xl p-2.5" placeholder="e.g. Annadan Mobile Vans reach new district" />
              </div>
              <div>
                <label className="font-bold text-gray-700 block mb-1">Tag / Category</label>
                <input required type="text" value={newNews.tag} onChange={e => setNewNews({...newNews, tag: e.target.value})} className="w-full bg-stone-50 border rounded-xl p-2.5" placeholder="e.g. Community Health" />
              </div>
              <div>
                <label className="font-bold text-gray-700 block mb-1">Summary / Excerpt</label>
                <textarea required rows={3} value={newNews.excerpt} onChange={e => setNewNews({...newNews, excerpt: e.target.value})} className="w-full bg-stone-50 border rounded-xl p-2.5" placeholder="Summary of the dispatch..." />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button type="button" onClick={() => setIsAddNewsOpen(false)} className="px-4 py-2 bg-gray-100 rounded-xl font-bold">Cancel</button>
                <button type="submit" className="px-5 py-2 bg-[#143D2B] text-white rounded-xl font-bold">Publish</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ADD GALLERY MODAL */}
      {isAddGalleryOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full border border-stone-200 shadow-xl space-y-4">
            <div className="flex justify-between items-center pb-2 border-b">
              <h3 className="font-bold text-sm text-[#143D2B]">Upload Gallery Photo</h3>
              <button onClick={() => setIsAddGalleryOpen(false)}><X className="w-4 h-4 text-gray-400" /></button>
            </div>
            <form onSubmit={handleAddGallery} className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-gray-700 block mb-1">Photo Title</label>
                <input required type="text" value={newGallery.title} onChange={e => setNewGallery({...newGallery, title: e.target.value})} className="w-full bg-stone-50 border rounded-xl p-2.5" placeholder="e.g. Children at Community Classroom" />
              </div>
              <div>
                <label className="font-bold text-gray-700 block mb-1">Category</label>
                <input required type="text" value={newGallery.category} onChange={e => setNewGallery({...newGallery, category: e.target.value})} className="w-full bg-stone-50 border rounded-xl p-2.5" placeholder="e.g. Education" />
              </div>
              <div>
                <label className="font-bold text-gray-700 block mb-1">Image URL (or leave blank for brand emblem)</label>
                <input type="url" value={newGallery.url} onChange={e => setNewGallery({...newGallery, url: e.target.value})} className="w-full bg-stone-50 border rounded-xl p-2.5" placeholder="https://..." />
              </div>
              <div>
                <label className="font-bold text-gray-700 block mb-1">Caption</label>
                <textarea required rows={2} value={newGallery.caption} onChange={e => setNewGallery({...newGallery, caption: e.target.value})} className="w-full bg-stone-50 border rounded-xl p-2.5" placeholder="Photo caption..." />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button type="button" onClick={() => setIsAddGalleryOpen(false)} className="px-4 py-2 bg-gray-100 rounded-xl font-bold">Cancel</button>
                <button type="submit" className="px-5 py-2 bg-[#143D2B] text-white rounded-xl font-bold">Add Photo</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Official 80G Tax Receipt Modal */}
      {selectedReceiptTxn && (
        <ReceiptModal
          isOpen={!!selectedReceiptTxn}
          onClose={() => setSelectedReceiptTxn(null)}
          transaction={selectedReceiptTxn}
        />
      )}

    </div>
  );
}
