import React, { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { 
  Home, 
  Info, 
  Layers, 
  Image as ImageIcon, 
  Newspaper, 
  Phone, 
  Plus, 
  Edit3, 
  Trash2, 
  Save, 
  Upload, 
  X, 
  Globe, 
  Sparkles,
  RefreshCw,
  Eye,
  CheckCircle2,
  Calendar,
  MapPin,
  Users,
  Clock
} from 'lucide-react';
import { useAdmin } from '../../context/AdminContext';
import { useToast } from '../../context/ToastContext';

export default function AdminWebsiteCMS() {
  const { 
    websiteCMS, 
    updateCMSHome, 
    updateCMSAbout, 
    addProgram, 
    updateProgram,
    deleteProgram,
    toggleProgramPublish,
    addGalleryItem,
    updateGalleryItem,
    deleteGalleryItem,
    toggleGalleryStatus,
    addNewsItem,
    updateNewsItem,
    deleteNewsItem,
    addEventItem,
    updateEventItem,
    deleteEventItem,
    updateCMSContact
  } = useAdmin();
  const { addToast } = useToast();

  const [searchParams, setSearchParams] = useSearchParams();
  const validTabs = ['home', 'about', 'programs', 'gallery', 'news', 'contact'];
  const tabParam = searchParams.get('tab');

  const [activeTab, setActiveTab] = useState(
    tabParam && validTabs.includes(tabParam) ? tabParam : 'home'
  );

  useEffect(() => {
    if (tabParam && validTabs.includes(tabParam) && tabParam !== activeTab) {
      setActiveTab(tabParam);
    }
  }, [tabParam]);

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
    setSearchParams({ tab: tabId });
  };

  // Helper for file upload conversion to base64 DataURL
  const processImageFile = (e, callback) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        addToast('Please upload an image smaller than 5MB', 'error');
        return;
      }
      const reader = new FileReader();
      reader.onload = () => {
        callback(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // ==========================================
  // 1. HOME: BANNER IMAGES ONLY (Add, Delete, Replace)
  // ==========================================
  const defaultBannerImages = [
    { id: "BAN-1", image: "/hero_seva_banner.jpg", title: "Daily Sanctified Annadan Food Seva" },
    { id: "BAN-2", image: "/hero_ngo_education.jpg", title: "Empowering Underprivileged Children" },
    { id: "BAN-3", image: "/hero_ngo_healthcare.jpg", title: "Free Healthcare & Life-Saving Medicine" }
  ];

  const currentBanners = (websiteCMS?.home?.bannerImages && websiteCMS.home.bannerImages.length > 0)
    ? websiteCMS.home.bannerImages
    : defaultBannerImages;

  const [showAddBannerModal, setShowAddBannerModal] = useState(false);
  const [newBannerForm, setNewBannerForm] = useState({ image: '', title: '' });
  
  // Replace Banner Modal
  const [replacingBannerId, setReplacingBannerId] = useState(null);
  const [replaceBannerUrl, setReplaceBannerUrl] = useState('');

  const handleAddBanner = (e) => {
    e.preventDefault();
    if (!newBannerForm.image.trim()) {
      addToast('Please provide an image URL or upload a file', 'error');
      return;
    }
    const newBanner = {
      id: `BAN-${Date.now().toString().slice(-4)}`,
      image: newBannerForm.image,
      title: newBannerForm.title || "Humanitarian Seva Banner"
    };
    const updated = [...currentBanners, newBanner];
    updateCMSHome({ bannerImages: updated });
    setShowAddBannerModal(false);
    setNewBannerForm({ image: '', title: '' });
    addToast('New banner image added to home slider!', 'success');
  };

  const handleDeleteBanner = (bannerId) => {
    if (currentBanners.length <= 1) {
      addToast('At least 1 banner image is required for the home slider', 'warning');
      return;
    }
    const updated = currentBanners.filter(b => b.id !== bannerId);
    updateCMSHome({ bannerImages: updated });
    addToast('Banner image deleted.', 'info');
  };

  const handleReplaceBanner = (e) => {
    e.preventDefault();
    if (!replaceBannerUrl.trim()) {
      addToast('Please provide a replacement image URL or file', 'error');
      return;
    }
    const updated = currentBanners.map(b => 
      b.id === replacingBannerId ? { ...b, image: replaceBannerUrl } : b
    );
    updateCMSHome({ bannerImages: updated });
    setReplacingBannerId(null);
    setReplaceBannerUrl('');
    addToast('Banner image successfully replaced!', 'success');
  };

  // ==========================================
  // 2. ABOUT US: IMAGE & DESCRIPTION ONLY
  // ==========================================
  const [aboutForm, setAboutForm] = useState({
    image: websiteCMS?.about?.image || "/about_ngo_team.jpg",
    description: websiteCMS?.about?.description || "Immense Life Foundation is a non-profit humanitarian organization committed to uplifting vulnerable families across India. Through daily hot meal distributions, mobile clinics, and educational sponsorship, we bridge hope and action with complete dignity. Guided by universal principles of selfless seva, we ensure that every contribution directly impacts lives on the ground with total transparency and accountability."
  });

  useEffect(() => {
    setAboutForm({
      image: websiteCMS?.about?.image || "/about_ngo_team.jpg",
      description: websiteCMS?.about?.description || "Immense Life Foundation is a non-profit humanitarian organization committed to uplifting vulnerable families across India. Through daily hot meal distributions, mobile clinics, and educational sponsorship, we bridge hope and action with complete dignity. Guided by universal principles of selfless seva, we ensure that every contribution directly impacts lives on the ground with total transparency and accountability."
    });
  }, [websiteCMS?.about]);

  const handleSaveAbout = (e) => {
    e.preventDefault();
    updateCMSAbout(aboutForm);
    addToast('About Us photo and description saved successfully!', 'success');
  };

  // ==========================================
  // 3. PROGRAMS: ADD, EDIT, DELETE
  // ==========================================
  const [showProgramModal, setShowProgramModal] = useState(false);
  const [editingProgram, setEditingProgram] = useState(null);
  const [programForm, setProgramForm] = useState({
    title: '',
    category: 'Hunger Relief',
    targetGoal: '',
    activeBeneficiaries: '',
    budget: '',
    description: '',
    image: '/hero_seva_banner.jpg',
    status: 'Published'
  });

  const openAddProgram = () => {
    setEditingProgram(null);
    setProgramForm({
      title: '',
      category: 'Hunger Relief',
      targetGoal: '',
      activeBeneficiaries: '',
      budget: '',
      description: '',
      image: '/hero_seva_banner.jpg',
      status: 'Published'
    });
    setShowProgramModal(true);
  };

  const openEditProgram = (prog) => {
    setEditingProgram(prog);
    setProgramForm({
      title: prog.title || '',
      category: prog.category || 'Hunger Relief',
      targetGoal: prog.targetGoal || '',
      activeBeneficiaries: prog.activeBeneficiaries || '',
      budget: prog.budget || '',
      description: prog.description || '',
      image: prog.image || '/hero_seva_banner.jpg',
      status: prog.status || 'Published'
    });
    setShowProgramModal(true);
  };

  const handleSaveProgram = (e) => {
    e.preventDefault();
    if (!programForm.title.trim()) {
      addToast('Please enter program title', 'error');
      return;
    }
    if (editingProgram) {
      updateProgram(editingProgram.id, programForm);
    } else {
      addProgram(programForm);
    }
    setShowProgramModal(false);
    setEditingProgram(null);
  };

  // ==========================================
  // 4. GALLERY: ADD, EDIT, DELETE
  // ==========================================
  const [showGalleryModal, setShowGalleryModal] = useState(false);
  const [editingGalleryItem, setEditingGalleryItem] = useState(null);
  const [galleryForm, setGalleryForm] = useState({
    title: '',
    category: 'Annadan',
    image: '/hero_seva_banner.jpg',
    status: 'Published'
  });

  const openAddGallery = () => {
    setEditingGalleryItem(null);
    setGalleryForm({
      title: '',
      category: 'Annadan',
      image: '/hero_seva_banner.jpg',
      status: 'Published'
    });
    setShowGalleryModal(true);
  };

  const openEditGallery = (item) => {
    setEditingGalleryItem(item);
    setGalleryForm({
      title: item.title || '',
      category: item.category || 'Annadan',
      image: item.image || '/hero_seva_banner.jpg',
      status: item.status || 'Published'
    });
    setShowGalleryModal(true);
  };

  const handleSaveGallery = (e) => {
    e.preventDefault();
    if (!galleryForm.title.trim() || !galleryForm.image.trim()) {
      addToast('Please enter title and image', 'error');
      return;
    }
    if (editingGalleryItem) {
      updateGalleryItem(editingGalleryItem.id, galleryForm);
    } else {
      addGalleryItem(galleryForm);
    }
    setShowGalleryModal(false);
    setEditingGalleryItem(null);
  };

  // ==========================================
  // 5. NEWS & EVENTS: ADD, EDIT, DELETE
  // ==========================================
  const [newsEventsFilter, setNewsEventsFilter] = useState('all'); // 'all' | 'news' | 'events'

  // News states & handlers
  const [showNewsModal, setShowNewsModal] = useState(false);
  const [editingNewsItem, setEditingNewsItem] = useState(null);
  const [newsForm, setNewsForm] = useState({
    title: '',
    category: 'Press Release',
    author: 'Trustee Desk',
    readTime: '3 min read',
    summary: '',
    status: 'Published'
  });

  const openAddNews = () => {
    setEditingNewsItem(null);
    setNewsForm({
      title: '',
      category: 'Press Release',
      author: 'Trustee Desk',
      readTime: '3 min read',
      summary: '',
      status: 'Published'
    });
    setShowNewsModal(true);
  };

  const openEditNews = (item) => {
    setEditingNewsItem(item);
    setNewsForm({
      title: item.title || '',
      category: item.category || 'Press Release',
      author: item.author || 'Trustee Desk',
      readTime: item.readTime || '3 min read',
      summary: item.summary || '',
      status: item.status || 'Published'
    });
    setShowNewsModal(true);
  };

  const handleSaveNews = (e) => {
    e.preventDefault();
    if (!newsForm.title.trim() || !newsForm.summary.trim()) {
      addToast('Please provide both title and summary', 'error');
      return;
    }
    if (editingNewsItem) {
      updateNewsItem(editingNewsItem.id, newsForm);
    } else {
      addNewsItem(newsForm);
    }
    setShowNewsModal(false);
    setEditingNewsItem(null);
  };

  // Event states & handlers
  const [showEventModal, setShowEventModal] = useState(false);
  const [editingEventItem, setEditingEventItem] = useState(null);
  const [eventForm, setEventForm] = useState({
    title: '',
    category: 'Annadan',
    date: 'Sunday, 26 October 2026',
    time: '10:30 AM – 3:30 PM',
    location: 'Central Community Kitchen, Sector 7 Hub',
    volunteersNeeded: 25,
    badge: 'Open for Volunteers',
    description: '',
    status: 'Published'
  });

  const openAddEvent = () => {
    setEditingEventItem(null);
    setEventForm({
      title: '',
      category: 'Annadan',
      date: 'Sunday, 26 October 2026',
      time: '10:30 AM – 3:30 PM',
      location: 'Central Community Kitchen, Sector 7 Hub',
      volunteersNeeded: 25,
      badge: 'Open for Volunteers',
      description: '',
      status: 'Published'
    });
    setShowEventModal(true);
  };

  const openEditEvent = (evt) => {
    setEditingEventItem(evt);
    setEventForm({
      title: evt.title || '',
      category: evt.category || 'Annadan',
      date: evt.date || '',
      time: evt.time || '',
      location: evt.location || '',
      volunteersNeeded: evt.volunteersNeeded || 10,
      badge: evt.badge || 'Open for Volunteers',
      description: evt.description || '',
      status: evt.status || 'Published'
    });
    setShowEventModal(true);
  };

  const handleSaveEvent = (e) => {
    e.preventDefault();
    if (!eventForm.title.trim() || !eventForm.description.trim()) {
      addToast('Please provide event title and description', 'error');
      return;
    }
    if (editingEventItem) {
      updateEventItem(editingEventItem.id, eventForm);
    } else {
      addEventItem(eventForm);
    }
    setShowEventModal(false);
    setEditingEventItem(null);
  };

  // ==========================================
  // 6. CONTACT: ESSENTIAL DETAILS ONLY
  // ==========================================
  const [contactForm, setContactForm] = useState({
    helplinePhone: websiteCMS?.contact?.helplinePhone || "+91 (22) 8400-5520",
    officialEmail: websiteCMS?.contact?.officialEmail || "seva@immenselife.org",
    registeredOffice: websiteCMS?.contact?.registeredOffice || "Trust Office: 420 Harmony Way, Connaught Place, New Delhi 110001",
    visitingHours: websiteCMS?.contact?.visitingHours || "Monday - Saturday: 9:00 AM - 6:00 PM IST"
  });

  useEffect(() => {
    setContactForm({
      helplinePhone: websiteCMS?.contact?.helplinePhone || "+91 (22) 8400-5520",
      officialEmail: websiteCMS?.contact?.officialEmail || "seva@immenselife.org",
      registeredOffice: websiteCMS?.contact?.registeredOffice || "Trust Office: 420 Harmony Way, Connaught Place, New Delhi 110001",
      visitingHours: websiteCMS?.contact?.visitingHours || "Monday - Saturday: 9:00 AM - 6:00 PM IST"
    });
  }, [websiteCMS?.contact]);

  const handleSaveContact = (e) => {
    e.preventDefault();
    updateCMSContact(contactForm);
    addToast('Official contact information saved!', 'success');
  };

  const tabs = [
    { id: 'home', name: 'Home', icon: Home },
    { id: 'about', name: 'About Us', icon: Info },
    { id: 'programs', name: 'Programs', icon: Layers },
    { id: 'gallery', name: 'Gallery', icon: ImageIcon },
    { id: 'news', name: 'News & Events', icon: Newspaper },
    { id: 'contact', name: 'Contact', icon: Phone }
  ];

  return (
    <div className="space-y-6 text-left pb-10">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#FFF2E3] text-[#A34805] text-xs font-bold mb-1 border border-[#F5DEC8]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Website Management • Live CMS</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-black text-[#381602]">
            Website Management
          </h2>
          <p className="text-xs text-stone-500 mt-0.5">
            Manage public website content directly across Home banners, About story, Programs, Gallery, News, and Contact.
          </p>
        </div>

        <a
          href="/"
          target="_blank"
          rel="noreferrer"
          className="px-4 py-2 bg-white hover:bg-stone-50 border border-stone-300 text-stone-700 text-xs font-bold rounded-xl flex items-center gap-1.5 shadow-2xs transition self-start"
        >
          <Globe className="w-4 h-4 text-[#E87A1E]" />
          <span>View Public Site</span>
        </a>
      </div>

      {/* 6 Tabs Navigation */}
      <div className="bg-white p-2 rounded-2xl border border-[#F3DEC8] shadow-xs flex items-center gap-1.5 overflow-x-auto no-scrollbar">
        {tabs.map(tab => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => handleTabClick(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition ${
                isActive
                  ? 'bg-[#E87A1E] text-white shadow-xs'
                  : 'text-stone-600 hover:text-stone-900 hover:bg-[#FFF2E3]'
              }`}
            >
              <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-[#E87A1E]'}`} />
              <span>{tab.name}</span>
            </button>
          );
        })}
      </div>

      {/* ==================================================== */}
      {/* SECTION 1: HOME PAGE (ONLY BANNER IMAGES MANAGEMENT) */}
      {/* ==================================================== */}
      {activeTab === 'home' && (
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#F3DEC8] shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-stone-200 pb-4">
            <div>
              <h3 className="font-serif text-xl font-bold text-[#381602]">
                Home Page Banner Images (Hero Slider)
              </h3>
              <p className="text-xs text-stone-500">
                Add, delete, or replace images that appear in the full-width slider on the home page.
              </p>
            </div>
            <button
              onClick={() => setShowAddBannerModal(true)}
              className="px-4 py-2 bg-[#E87A1E] hover:bg-[#D2640C] text-white text-xs font-bold rounded-xl flex items-center gap-1.5 shadow-sm transition active:scale-95 self-start"
            >
              <Plus className="w-4 h-4" />
              <span>Add Banner Image</span>
            </button>
          </div>

          {/* Banner Images Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {currentBanners.map((banner, index) => (
              <div 
                key={banner.id || index}
                className="bg-[#FFFDF9] rounded-2xl border border-[#F3DEC8] overflow-hidden shadow-xs flex flex-col justify-between group"
              >
                <div className="relative aspect-video bg-stone-100 overflow-hidden">
                  <img
                    src={banner.image || banner}
                    alt={banner.title || `Banner ${index + 1}`}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  />
                  <div className="absolute top-2 left-2 bg-black/60 backdrop-blur-xs text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                    Slide #{index + 1}
                  </div>
                </div>

                <div className="p-4 space-y-3">
                  <div>
                    <h4 className="font-bold text-xs text-[#381602] truncate">
                      {banner.title || `Banner Slide ${index + 1}`}
                    </h4>
                    <p className="text-[10px] text-stone-400 font-mono truncate mt-0.5">
                      {banner.image}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 pt-2 border-t border-stone-100">
                    <button
                      onClick={() => {
                        setReplacingBannerId(banner.id);
                        setReplaceBannerUrl(banner.image);
                      }}
                      className="flex-1 py-1.5 px-2 bg-white hover:bg-[#FFF2E3] border border-[#F3DEC8] text-[#A34805] text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 transition"
                    >
                      <RefreshCw className="w-3.5 h-3.5 text-[#E87A1E]" />
                      <span>Replace Image</span>
                    </button>

                    <button
                      onClick={() => handleDeleteBanner(banner.id)}
                      className="p-1.5 text-stone-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition"
                      title="Delete Slide"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ==================================================== */}
      {/* SECTION 2: ABOUT US (IMAGE & DESCRIPTION ONLY) */}
      {/* ==================================================== */}
      {activeTab === 'about' && (
        <form onSubmit={handleSaveAbout} className="bg-white p-6 sm:p-8 rounded-3xl border border-[#F3DEC8] shadow-xs space-y-6">
          <div className="flex items-center justify-between border-b border-stone-200 pb-4">
            <div>
              <h3 className="font-serif text-xl font-bold text-[#381602]">
                About Us Page Content
              </h3>
              <p className="text-xs text-stone-500">
                Update the main photo and narrative description shown on the public About Us page and Home About section.
              </p>
            </div>
            <button
              type="submit"
              className="px-5 py-2 bg-[#E87A1E] hover:bg-[#D2640C] text-white text-xs font-bold rounded-xl flex items-center gap-1.5 shadow-sm transition active:scale-95"
            >
              <Save className="w-4 h-4" />
              <span>Save Changes</span>
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Column: Image Preview & Upload (5 cols) */}
            <div className="lg:col-span-5 space-y-3">
              <label className="font-bold text-xs text-stone-800 block">
                About Foundation Image
              </label>

              <div className="relative rounded-2xl overflow-hidden border-2 border-[#F3DEC8] bg-stone-50 aspect-4/3 group">
                <img
                  src={aboutForm.image || "/about_ngo_team.jpg"}
                  alt="About Foundation"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <label className="flex-1 cursor-pointer py-2 px-3 bg-[#FFF2E3] hover:bg-[#FCE7D0] border border-[#F5DEC8] text-[#A34805] text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 transition">
                    <Upload className="w-3.5 h-3.5 text-[#E87A1E]" />
                    <span>Upload New Photo</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => processImageFile(e, (url) => setAboutForm({ ...aboutForm, image: url }))}
                    />
                  </label>
                </div>

                <div className="space-y-1">
                  <span className="text-[10px] text-stone-500">Or paste an Image URL:</span>
                  <input
                    type="text"
                    value={aboutForm.image || ''}
                    onChange={(e) => setAboutForm({ ...aboutForm, image: e.target.value })}
                    placeholder="/about_ngo_team.jpg or https://..."
                    className="w-full bg-[#FFFDF9] border border-[#DDD7C9] rounded-xl px-3 py-2 text-xs text-stone-800 font-mono focus:outline-none focus:ring-2 focus:ring-[#E87A1E]"
                  />
                </div>
              </div>
            </div>

            {/* Right Column: Description Textarea (7 cols) */}
            <div className="lg:col-span-7 space-y-3">
              <label className="font-bold text-xs text-stone-800 block">
                About Foundation Story & Description
              </label>

              <textarea
                rows="8"
                value={aboutForm.description || ''}
                onChange={(e) => setAboutForm({ ...aboutForm, description: e.target.value })}
                placeholder="Enter the foundation background narrative and humanitarian mission description..."
                className="w-full bg-[#FFFDF9] border border-[#DDD7C9] rounded-2xl p-4 text-xs text-stone-800 leading-relaxed focus:outline-none focus:ring-2 focus:ring-[#E87A1E]"
              />

              <p className="text-[11px] text-stone-500">
                This description is displayed on both the public <strong>/about</strong> page and the <strong>Homepage About Section</strong>.
              </p>
            </div>

          </div>
        </form>
      )}

      {/* ==================================================== */}
      {/* SECTION 3: PROGRAMS (ADD, EDIT, DELETE) */}
      {/* ==================================================== */}
      {activeTab === 'programs' && (
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#F3DEC8] shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-stone-200 pb-4">
            <div>
              <h3 className="font-serif text-xl font-bold text-[#381602]">
                Seva Programs & Causes
              </h3>
              <p className="text-xs text-stone-500">
                Add, edit, or delete the key humanitarian programs shown on the public site.
              </p>
            </div>
            <button
              onClick={openAddProgram}
              className="px-4 py-2 bg-[#E87A1E] hover:bg-[#D2640C] text-white text-xs font-bold rounded-xl flex items-center gap-1.5 shadow-sm transition active:scale-95 self-start"
            >
              <Plus className="w-4 h-4" />
              <span>Add New Program</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {websiteCMS.programs.map(prog => (
              <div key={prog.id} className="rounded-2xl border border-stone-200 bg-[#FFFDF9] overflow-hidden flex flex-col justify-between group">
                <div>
                  <div className="relative h-44 bg-stone-100 overflow-hidden">
                    <img
                      src={prog.image}
                      alt={prog.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                    />
                    <div className="absolute top-2 right-2">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        prog.status === 'Published' ? 'bg-emerald-100 text-emerald-800' : 'bg-stone-200 text-stone-700'
                      }`}>
                        {prog.status}
                      </span>
                    </div>
                  </div>

                  <div className="p-4 space-y-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#A34805]">
                      {prog.category}
                    </span>
                    <h4 className="font-serif font-bold text-sm text-[#381602]">
                      {prog.title}
                    </h4>
                    <p className="text-xs text-stone-600 line-clamp-2">
                      {prog.description}
                    </p>
                  </div>
                </div>

                <div className="p-4 pt-0 border-t border-stone-100 mt-2 flex items-center justify-between gap-2">
                  <button
                    onClick={() => openEditProgram(prog)}
                    className="flex-1 py-1.5 bg-stone-100 hover:bg-[#FFF2E3] text-[#A34805] text-xs font-bold rounded-xl flex items-center justify-center gap-1 transition"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                    <span>Edit</span>
                  </button>

                  <button
                    onClick={() => toggleProgramPublish(prog.id)}
                    className="py-1.5 px-3 bg-white hover:bg-stone-100 border border-stone-300 rounded-xl text-xs font-semibold text-stone-700 transition"
                  >
                    {prog.status === 'Published' ? 'Unpublish' : 'Publish'}
                  </button>

                  <button
                    onClick={() => deleteProgram(prog.id)}
                    className="p-1.5 text-stone-400 hover:text-red-600 transition"
                    title="Delete"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ==================================================== */}
      {/* SECTION 4: GALLERY (ADD, EDIT, DELETE) */}
      {/* ==================================================== */}
      {activeTab === 'gallery' && (
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#F3DEC8] shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-stone-200 pb-4">
            <div>
              <h3 className="font-serif text-xl font-bold text-[#381602]">
                Photo & Media Gallery
              </h3>
              <p className="text-xs text-stone-500">
                Add, edit, or delete field photos from the public gallery page.
              </p>
            </div>
            <button
              onClick={openAddGallery}
              className="px-4 py-2 bg-[#E87A1E] hover:bg-[#D2640C] text-white text-xs font-bold rounded-xl flex items-center gap-1.5 shadow-sm transition active:scale-95 self-start"
            >
              <Plus className="w-4 h-4" />
              <span>Upload Photo</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {websiteCMS.gallery.map(item => (
              <div key={item.id} className="rounded-2xl border border-stone-200 overflow-hidden bg-stone-50 group flex flex-col justify-between">
                <div className="relative h-44 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                  />
                  <div className="absolute top-2 right-2">
                    <button 
                      onClick={() => toggleGalleryStatus(item.id)}
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        item.status === 'Published' ? 'bg-emerald-100 text-emerald-800' : 'bg-stone-200 text-stone-600'
                      }`}
                    >
                      {item.status}
                    </button>
                  </div>
                </div>

                <div className="p-3 text-xs space-y-2">
                  <div>
                    <span className="text-[10px] font-bold text-[#A34805] uppercase">{item.category}</span>
                    <h4 className="font-bold text-stone-900 truncate mt-0.5">{item.title}</h4>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-stone-200">
                    <button
                      onClick={() => openEditGallery(item)}
                      className="py-1 px-3 bg-white hover:bg-[#FFF2E3] border border-stone-200 text-[#A34805] text-[11px] font-bold rounded-lg flex items-center gap-1 transition"
                    >
                      <Edit3 className="w-3 h-3" />
                      <span>Edit</span>
                    </button>

                    <button
                      onClick={() => deleteGalleryItem(item.id)}
                      className="p-1 text-stone-400 hover:text-red-600 transition"
                      title="Remove"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ==================================================== */}
      {/* SECTION 5: NEWS & EVENTS (ADD, EDIT, DELETE) */}
      {/* ==================================================== */}
      {activeTab === 'news' && (
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#F3DEC8] shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-200 pb-4">
            <div>
              <h3 className="font-serif text-xl font-bold text-[#381602]">
                News & Events Management
              </h3>
              <p className="text-xs text-stone-500">
                Add, edit, or delete public news dispatches, press releases, and upcoming community seva events.
              </p>
            </div>
            
            {/* TWO SEPARATE BUTTONS: ONE FOR EVENT, ONE FOR NEWS */}
            <div className="flex items-center gap-2.5 self-start sm:self-auto flex-wrap">
              <button
                type="button"
                onClick={openAddEvent}
                className="px-4 py-2 bg-[#381602] hover:bg-[#522204] text-white text-xs font-bold rounded-xl flex items-center gap-1.5 shadow-sm transition active:scale-95"
                title="Add New Upcoming Seva Event"
              >
                <Calendar className="w-4 h-4 text-[#F4A261]" />
                <span>+ Add Event</span>
              </button>

              <button
                type="button"
                onClick={openAddNews}
                className="px-4 py-2 bg-[#E87A1E] hover:bg-[#D2640C] text-white text-xs font-bold rounded-xl flex items-center gap-1.5 shadow-sm transition active:scale-95"
                title="Add New Press Announcement / News Article"
              >
                <Newspaper className="w-4 h-4" />
                <span>+ Add News</span>
              </button>
            </div>
          </div>

          {/* Subfilter: All / News Articles / Upcoming Events */}
          <div className="flex items-center gap-2 border-b border-stone-100 pb-2 overflow-x-auto text-xs">
            <button
              type="button"
              onClick={() => setNewsEventsFilter('all')}
              className={`px-3 py-1.5 rounded-lg font-bold transition whitespace-nowrap ${
                newsEventsFilter === 'all'
                  ? 'bg-[#381602] text-white'
                  : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
              }`}
            >
              All Items ({(websiteCMS?.news?.length || 0) + (websiteCMS?.events?.length || 0)})
            </button>
            <button
              type="button"
              onClick={() => setNewsEventsFilter('news')}
              className={`px-3 py-1.5 rounded-lg font-bold transition flex items-center gap-1.5 whitespace-nowrap ${
                newsEventsFilter === 'news'
                  ? 'bg-[#E87A1E] text-white'
                  : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
              }`}
            >
              <Newspaper className="w-3.5 h-3.5" />
              <span>News Articles ({websiteCMS?.news?.length || 0})</span>
            </button>
            <button
              type="button"
              onClick={() => setNewsEventsFilter('events')}
              className={`px-3 py-1.5 rounded-lg font-bold transition flex items-center gap-1.5 whitespace-nowrap ${
                newsEventsFilter === 'events'
                  ? 'bg-[#A34805] text-white'
                  : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
              }`}
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Upcoming Events ({websiteCMS?.events?.length || 0})</span>
            </button>
          </div>

          <div className="space-y-3">
            {/* Display News Items if 'all' or 'news' */}
            {(newsEventsFilter === 'all' || newsEventsFilter === 'news') && (websiteCMS.news || []).map(n => (
              <div key={n.id} className="p-4 rounded-2xl bg-[#FFFDF9] border border-stone-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs hover:border-[#E87A1E]/40 transition">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-[10px] font-bold text-[#E87A1E] bg-[#FFF2E3] px-2 py-0.5 rounded-full border border-[#F5DEC8]">
                      News Article
                    </span>
                    <span className="text-[10px] font-bold text-stone-600 bg-stone-100 px-2 py-0.5 rounded-full">
                      {n.category}
                    </span>
                    <span className="text-stone-400 text-[10px]">{n.date}</span>
                    {n.author && (
                      <span className="text-stone-400 text-[10px]">• By {n.author}</span>
                    )}
                  </div>
                  <h4 className="font-serif font-bold text-sm text-[#381602]">{n.title}</h4>
                  <p className="text-stone-600 line-clamp-1">{n.summary}</p>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                  <button
                    type="button"
                    onClick={() => openEditNews(n)}
                    className="py-1 px-3 bg-white hover:bg-[#FFF2E3] border border-stone-200 text-[#A34805] text-[11px] font-bold rounded-lg flex items-center gap-1 transition"
                  >
                    <Edit3 className="w-3 h-3" />
                    <span>Edit</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => deleteNewsItem(n.id)}
                    className="p-1.5 text-stone-400 hover:text-red-600 transition"
                    title="Delete News Article"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}

            {/* Display Event Items if 'all' or 'events' */}
            {(newsEventsFilter === 'all' || newsEventsFilter === 'events') && (websiteCMS.events || []).map(evt => (
              <div key={evt.id} className="p-4 rounded-2xl bg-[#FBF7F2] border border-[#ECD9C5] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs hover:border-[#381602]/40 transition">
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-[10px] font-bold text-[#381602] bg-[#EAD6C0] px-2.5 py-0.5 rounded-full">
                      Seva Event
                    </span>
                    <span className="text-[10px] font-bold text-[#A34805] bg-[#FFF2E3] px-2 py-0.5 rounded-full border border-[#F5DEC8]">
                      {evt.category}
                    </span>
                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100">
                      {evt.badge || 'Open'}
                    </span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      evt.status === 'Published' ? 'bg-emerald-100 text-emerald-800' : 'bg-stone-200 text-stone-700'
                    }`}>
                      {evt.status || 'Published'}
                    </span>
                  </div>
                  <h4 className="font-serif font-bold text-sm text-[#381602]">{evt.title}</h4>
                  <div className="flex items-center gap-3 text-[11px] text-stone-500 flex-wrap">
                    <span className="flex items-center gap-1 font-semibold text-stone-700">
                      <Calendar className="w-3 h-3 text-[#E87A1E]" />
                      {evt.date}
                    </span>
                    {evt.time && (
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3 text-stone-400" />
                        {evt.time}
                      </span>
                    )}
                    {evt.location && (
                      <span className="flex items-center gap-1 line-clamp-1">
                        <MapPin className="w-3 h-3 text-stone-400" />
                        {evt.location}
                      </span>
                    )}
                    {evt.volunteersNeeded && (
                      <span className="flex items-center gap-1">
                        <Users className="w-3 h-3 text-stone-400" />
                        {evt.volunteersNeeded} Volunteers
                      </span>
                    )}
                  </div>
                  <p className="text-stone-600 line-clamp-1">{evt.description}</p>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                  <button
                    type="button"
                    onClick={() => openEditEvent(evt)}
                    className="py-1 px-3 bg-white hover:bg-[#F3DEC8] border border-stone-200 text-[#381602] text-[11px] font-bold rounded-lg flex items-center gap-1 transition"
                  >
                    <Edit3 className="w-3 h-3" />
                    <span>Edit</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => deleteEventItem(evt.id)}
                    className="p-1.5 text-stone-400 hover:text-red-600 transition"
                    title="Delete Seva Event"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}

            {/* Empty state when filtering */}
            {newsEventsFilter === 'news' && (!websiteCMS.news || websiteCMS.news.length === 0) && (
              <div className="text-center py-8 text-stone-400 text-xs">
                No news articles added yet. Click <strong>+ Add News</strong> to create one.
              </div>
            )}
            {newsEventsFilter === 'events' && (!websiteCMS.events || websiteCMS.events.length === 0) && (
              <div className="text-center py-8 text-stone-400 text-xs">
                No upcoming events added yet. Click <strong>+ Add Event</strong> to schedule one.
              </div>
            )}
          </div>
        </div>
      )}

      {/* ==================================================== */}
      {/* SECTION 6: CONTACT (ESSENTIAL DETAILS ONLY) */}
      {/* ==================================================== */}
      {activeTab === 'contact' && (
        <form onSubmit={handleSaveContact} className="bg-white p-6 sm:p-8 rounded-3xl border border-[#F3DEC8] shadow-xs space-y-6">
          <div className="flex items-center justify-between border-b border-stone-200 pb-4">
            <div>
              <h3 className="font-serif text-xl font-bold text-[#381602]">
                Official Contact Information
              </h3>
              <p className="text-xs text-stone-500">
                Manage public helpline numbers, official email, and trust office address.
              </p>
            </div>
            <button
              type="submit"
              className="px-5 py-2 bg-[#E87A1E] hover:bg-[#D2640C] text-white text-xs font-bold rounded-xl flex items-center gap-1.5 shadow-sm transition active:scale-95"
            >
              <Save className="w-4 h-4" />
              <span>Save Contact Info</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="font-bold text-stone-700 block mb-1">
                Helpline Phone / WhatsApp
              </label>
              <input
                type="text"
                value={contactForm.helplinePhone || ''}
                onChange={e => setContactForm({ ...contactForm, helplinePhone: e.target.value })}
                className="w-full bg-[#FFFDF9] border border-[#DDD7C9] rounded-xl px-3.5 py-2.5 text-stone-900 font-mono focus:outline-none focus:ring-2 focus:ring-[#E87A1E]"
              />
            </div>

            <div>
              <label className="font-bold text-stone-700 block mb-1">
                Official Seva Email
              </label>
              <input
                type="email"
                value={contactForm.officialEmail || ''}
                onChange={e => setContactForm({ ...contactForm, officialEmail: e.target.value })}
                className="w-full bg-[#FFFDF9] border border-[#DDD7C9] rounded-xl px-3.5 py-2.5 text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#E87A1E]"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="font-bold text-stone-700 block mb-1">
                Registered Trust Office Address
              </label>
              <input
                type="text"
                value={contactForm.registeredOffice || ''}
                onChange={e => setContactForm({ ...contactForm, registeredOffice: e.target.value })}
                className="w-full bg-[#FFFDF9] border border-[#DDD7C9] rounded-xl px-3.5 py-2.5 text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#E87A1E]"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="font-bold text-stone-700 block mb-1">
                Visiting / Helpdesk Hours
              </label>
              <input
                type="text"
                value={contactForm.visitingHours || ''}
                onChange={e => setContactForm({ ...contactForm, visitingHours: e.target.value })}
                className="w-full bg-[#FFFDF9] border border-[#DDD7C9] rounded-xl px-3.5 py-2.5 text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#E87A1E]"
              />
            </div>
          </div>
        </form>
      )}

      {/* ==================================================== */}
      {/* MODAL 1: ADD BANNER IMAGE MODAL */}
      {/* ==================================================== */}
      {showAddBannerModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-md rounded-3xl shadow-xl border border-[#F3DEC8] p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-stone-200 pb-3">
              <h4 className="font-serif text-lg font-bold text-[#381602]">Add Home Banner Image</h4>
              <button onClick={() => setShowAddBannerModal(false)} className="p-1 text-stone-400 hover:text-stone-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddBanner} className="space-y-4 text-xs">
              <div>
                <label className="font-bold text-stone-700 block mb-1">Upload Photo from Device</label>
                <label className="cursor-pointer w-full py-2.5 px-3 bg-[#FFF2E3] hover:bg-[#FCE7D0] border border-[#F5DEC8] text-[#A34805] font-bold rounded-xl flex items-center justify-center gap-1.5 transition">
                  <Upload className="w-4 h-4 text-[#E87A1E]" />
                  <span>Choose Image File</span>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => processImageFile(e, (url) => setNewBannerForm({ ...newBannerForm, image: url }))}
                  />
                </label>
              </div>

              <div>
                <label className="font-bold text-stone-700 block mb-1">Or Enter Image URL</label>
                <input
                  type="text"
                  value={newBannerForm.image}
                  onChange={e => setNewBannerForm({ ...newBannerForm, image: e.target.value })}
                  placeholder="/hero_seva_banner.jpg or https://..."
                  className="w-full bg-[#FFFDF9] border border-[#DDD7C9] rounded-xl px-3 py-2 text-stone-900 font-mono focus:outline-none focus:ring-2 focus:ring-[#E87A1E]"
                />
              </div>

              {newBannerForm.image && (
                <div className="relative aspect-video rounded-xl overflow-hidden border border-stone-200">
                  <img src={newBannerForm.image} alt="Preview" className="w-full h-full object-cover" />
                </div>
              )}

              <div>
                <label className="font-bold text-stone-700 block mb-1">Banner Title / Caption (Optional)</label>
                <input
                  type="text"
                  value={newBannerForm.title}
                  onChange={e => setNewBannerForm({ ...newBannerForm, title: e.target.value })}
                  placeholder="e.g. Free Annadan Seva Drive"
                  className="w-full bg-[#FFFDF9] border border-[#DDD7C9] rounded-xl px-3 py-2 text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#E87A1E]"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddBannerModal(false)}
                  className="px-4 py-2 bg-stone-100 hover:bg-stone-200 text-stone-700 font-semibold rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#E87A1E] hover:bg-[#D2640C] text-white font-bold rounded-xl shadow-sm"
                >
                  Add Banner Slide
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ==================================================== */}
      {/* MODAL 2: REPLACE BANNER IMAGE MODAL */}
      {/* ==================================================== */}
      {replacingBannerId && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-md rounded-3xl shadow-xl border border-[#F3DEC8] p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-stone-200 pb-3">
              <h4 className="font-serif text-lg font-bold text-[#381602]">Replace Banner Image</h4>
              <button onClick={() => setReplacingBannerId(null)} className="p-1 text-stone-400 hover:text-stone-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleReplaceBanner} className="space-y-4 text-xs">
              <div>
                <label className="font-bold text-stone-700 block mb-1">Upload Replacement Image</label>
                <label className="cursor-pointer w-full py-2.5 px-3 bg-[#FFF2E3] hover:bg-[#FCE7D0] border border-[#F5DEC8] text-[#A34805] font-bold rounded-xl flex items-center justify-center gap-1.5 transition">
                  <Upload className="w-4 h-4 text-[#E87A1E]" />
                  <span>Choose New Image File</span>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => processImageFile(e, (url) => setReplaceBannerUrl(url))}
                  />
                </label>
              </div>

              <div>
                <label className="font-bold text-stone-700 block mb-1">Or Replace with URL</label>
                <input
                  type="text"
                  value={replaceBannerUrl}
                  onChange={e => setReplaceBannerUrl(e.target.value)}
                  placeholder="/hero_seva_banner.jpg or https://..."
                  className="w-full bg-[#FFFDF9] border border-[#DDD7C9] rounded-xl px-3 py-2 text-stone-900 font-mono focus:outline-none focus:ring-2 focus:ring-[#E87A1E]"
                />
              </div>

              {replaceBannerUrl && (
                <div className="relative aspect-video rounded-xl overflow-hidden border border-stone-200">
                  <img src={replaceBannerUrl} alt="Replacement Preview" className="w-full h-full object-cover" />
                </div>
              )}

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setReplacingBannerId(null)}
                  className="px-4 py-2 bg-stone-100 hover:bg-stone-200 text-stone-700 font-semibold rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#E87A1E] hover:bg-[#D2640C] text-white font-bold rounded-xl shadow-sm"
                >
                  Save Replacement
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ==================================================== */}
      {/* MODAL 3: PROGRAM MODAL (ADD / EDIT) */}
      {/* ==================================================== */}
      {showProgramModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-lg rounded-3xl shadow-xl border border-[#F3DEC8] p-6 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-stone-200 pb-3">
              <h4 className="font-serif text-lg font-bold text-[#381602]">
                {editingProgram ? 'Edit Seva Program' : 'Add New Program'}
              </h4>
              <button onClick={() => setShowProgramModal(false)} className="p-1 text-stone-400 hover:text-stone-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProgram} className="space-y-4 text-xs">
              <div>
                <label className="font-bold text-stone-700 block mb-1">Program Title *</label>
                <input
                  type="text"
                  required
                  value={programForm.title}
                  onChange={e => setProgramForm({ ...programForm, title: e.target.value })}
                  className="w-full bg-[#FFFDF9] border border-[#DDD7C9] rounded-xl px-3 py-2 text-stone-900 font-semibold focus:outline-none focus:ring-2 focus:ring-[#E87A1E]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-stone-700 block mb-1">Category</label>
                  <select
                    value={programForm.category}
                    onChange={e => setProgramForm({ ...programForm, category: e.target.value })}
                    className="w-full bg-[#FFFDF9] border border-[#DDD7C9] rounded-xl px-3 py-2 text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#E87A1E]"
                  >
                    <option value="Hunger Relief">Hunger Relief</option>
                    <option value="Healthcare">Healthcare</option>
                    <option value="Education">Education</option>
                    <option value="Environment">Environment</option>
                    <option value="Community Seva">Community Seva</option>
                  </select>
                </div>

                <div>
                  <label className="font-bold text-stone-700 block mb-1">Status</label>
                  <select
                    value={programForm.status}
                    onChange={e => setProgramForm({ ...programForm, status: e.target.value })}
                    className="w-full bg-[#FFFDF9] border border-[#DDD7C9] rounded-xl px-3 py-2 text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#E87A1E]"
                  >
                    <option value="Published">Published</option>
                    <option value="Draft">Draft</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="font-bold text-stone-700 block mb-1">Program Photo / Image</label>
                <div className="flex gap-2 mb-2">
                  <label className="cursor-pointer py-1.5 px-3 bg-[#FFF2E3] hover:bg-[#FCE7D0] border border-[#F5DEC8] text-[#A34805] text-[11px] font-bold rounded-xl flex items-center gap-1.5 transition">
                    <Upload className="w-3.5 h-3.5 text-[#E87A1E]" />
                    <span>Upload Image</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => processImageFile(e, (url) => setProgramForm({ ...programForm, image: url }))}
                    />
                  </label>
                </div>
                <input
                  type="text"
                  value={programForm.image}
                  onChange={e => setProgramForm({ ...programForm, image: e.target.value })}
                  placeholder="/hero_seva_banner.jpg or https://..."
                  className="w-full bg-[#FFFDF9] border border-[#DDD7C9] rounded-xl px-3 py-2 text-stone-900 font-mono focus:outline-none focus:ring-2 focus:ring-[#E87A1E]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-stone-700 block mb-1">Target Goal</label>
                  <input
                    type="text"
                    value={programForm.targetGoal}
                    onChange={e => setProgramForm({ ...programForm, targetGoal: e.target.value })}
                    placeholder="e.g. 3,000 Meals Daily"
                    className="w-full bg-[#FFFDF9] border border-[#DDD7C9] rounded-xl px-3 py-2 text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#E87A1E]"
                  />
                </div>
                <div>
                  <label className="font-bold text-stone-700 block mb-1">Active Beneficiaries</label>
                  <input
                    type="text"
                    value={programForm.activeBeneficiaries}
                    onChange={e => setProgramForm({ ...programForm, activeBeneficiaries: e.target.value })}
                    placeholder="e.g. 90,000 Monthly"
                    className="w-full bg-[#FFFDF9] border border-[#DDD7C9] rounded-xl px-3 py-2 text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#E87A1E]"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-stone-700 block mb-1">Description *</label>
                <textarea
                  rows="3"
                  required
                  value={programForm.description}
                  onChange={e => setProgramForm({ ...programForm, description: e.target.value })}
                  className="w-full bg-[#FFFDF9] border border-[#DDD7C9] rounded-xl px-3 py-2 text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#E87A1E]"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-stone-200">
                <button
                  type="button"
                  onClick={() => setShowProgramModal(false)}
                  className="px-4 py-2 bg-stone-100 hover:bg-stone-200 text-stone-700 font-semibold rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#E87A1E] hover:bg-[#D2640C] text-white font-bold rounded-xl shadow-sm"
                >
                  {editingProgram ? 'Save Changes' : 'Create Program'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ==================================================== */}
      {/* MODAL 4: GALLERY MODAL (ADD / EDIT) */}
      {/* ==================================================== */}
      {showGalleryModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-md rounded-3xl shadow-xl border border-[#F3DEC8] p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-stone-200 pb-3">
              <h4 className="font-serif text-lg font-bold text-[#381602]">
                {editingGalleryItem ? 'Edit Gallery Photo' : 'Upload Gallery Photo'}
              </h4>
              <button onClick={() => setShowGalleryModal(false)} className="p-1 text-stone-400 hover:text-stone-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveGallery} className="space-y-4 text-xs">
              <div>
                <label className="font-bold text-stone-700 block mb-1">Photo Title *</label>
                <input
                  type="text"
                  required
                  value={galleryForm.title}
                  onChange={e => setGalleryForm({ ...galleryForm, title: e.target.value })}
                  className="w-full bg-[#FFFDF9] border border-[#DDD7C9] rounded-xl px-3 py-2 text-stone-900 font-semibold focus:outline-none focus:ring-2 focus:ring-[#E87A1E]"
                />
              </div>

              <div>
                <label className="font-bold text-stone-700 block mb-1">Category</label>
                <select
                  value={galleryForm.category}
                  onChange={e => setGalleryForm({ ...galleryForm, category: e.target.value })}
                  className="w-full bg-[#FFFDF9] border border-[#DDD7C9] rounded-xl px-3 py-2 text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#E87A1E]"
                >
                  <option value="Annadan">Annadan</option>
                  <option value="Healthcare">Healthcare</option>
                  <option value="Education">Education</option>
                  <option value="Environment">Environment</option>
                  <option value="Partner Shops">Partner Shops</option>
                </select>
              </div>

              <div>
                <label className="font-bold text-stone-700 block mb-1">Image File / URL *</label>
                <label className="cursor-pointer w-full py-2 px-3 bg-[#FFF2E3] hover:bg-[#FCE7D0] border border-[#F5DEC8] text-[#A34805] font-bold rounded-xl flex items-center justify-center gap-1.5 mb-2 transition">
                  <Upload className="w-3.5 h-3.5 text-[#E87A1E]" />
                  <span>Choose Photo File</span>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => processImageFile(e, (url) => setGalleryForm({ ...galleryForm, image: url }))}
                  />
                </label>

                <input
                  type="text"
                  required
                  value={galleryForm.image}
                  onChange={e => setGalleryForm({ ...galleryForm, image: e.target.value })}
                  className="w-full bg-[#FFFDF9] border border-[#DDD7C9] rounded-xl px-3 py-2 text-stone-900 font-mono focus:outline-none focus:ring-2 focus:ring-[#E87A1E]"
                />
              </div>

              {galleryForm.image && (
                <div className="relative aspect-video rounded-xl overflow-hidden border border-stone-200">
                  <img src={galleryForm.image} alt="Preview" className="w-full h-full object-cover" />
                </div>
              )}

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-stone-200">
                <button
                  type="button"
                  onClick={() => setShowGalleryModal(false)}
                  className="px-4 py-2 bg-stone-100 hover:bg-stone-200 text-stone-700 font-semibold rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#E87A1E] hover:bg-[#D2640C] text-white font-bold rounded-xl shadow-sm"
                >
                  {editingGalleryItem ? 'Save Photo' : 'Upload Photo'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ==================================================== */}
      {/* MODAL 5: NEWS MODAL (ADD / EDIT) */}
      {/* ==================================================== */}
      {showNewsModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-md rounded-3xl shadow-xl border border-[#F3DEC8] p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-stone-200 pb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-[#FFF2E3] text-[#E87A1E] flex items-center justify-center">
                  <Newspaper className="w-4 h-4" />
                </div>
                <h4 className="font-serif text-lg font-bold text-[#381602]">
                  {editingNewsItem ? 'Edit News Article' : 'Add News Article'}
                </h4>
              </div>
              <button onClick={() => setShowNewsModal(false)} className="p-1 text-stone-400 hover:text-stone-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveNews} className="space-y-4 text-xs">
              <div>
                <label className="font-bold text-stone-700 block mb-1">Headline / Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Immense Life Expands Partner Shop QR Network"
                  value={newsForm.title}
                  onChange={e => setNewsForm({ ...newsForm, title: e.target.value })}
                  className="w-full bg-[#FFFDF9] border border-[#DDD7C9] rounded-xl px-3 py-2 text-stone-900 font-semibold focus:outline-none focus:ring-2 focus:ring-[#E87A1E]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-stone-700 block mb-1">Category</label>
                  <select
                    value={newsForm.category}
                    onChange={e => setNewsForm({ ...newsForm, category: e.target.value })}
                    className="w-full bg-[#FFFDF9] border border-[#DDD7C9] rounded-xl px-3 py-2 text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#E87A1E]"
                  >
                    <option value="Press Release">Press Release</option>
                    <option value="Field Story">Field Story</option>
                    <option value="Transparency">Transparency</option>
                    <option value="Ground Dispatch">Ground Dispatch</option>
                  </select>
                </div>

                <div>
                  <label className="font-bold text-stone-700 block mb-1">Status</label>
                  <select
                    value={newsForm.status || 'Published'}
                    onChange={e => setNewsForm({ ...newsForm, status: e.target.value })}
                    className="w-full bg-[#FFFDF9] border border-[#DDD7C9] rounded-xl px-3 py-2 text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#E87A1E]"
                  >
                    <option value="Published">Published</option>
                    <option value="Draft">Draft</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-stone-700 block mb-1">Author</label>
                  <input
                    type="text"
                    placeholder="Trustee Desk"
                    value={newsForm.author}
                    onChange={e => setNewsForm({ ...newsForm, author: e.target.value })}
                    className="w-full bg-[#FFFDF9] border border-[#DDD7C9] rounded-xl px-3 py-2 text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#E87A1E]"
                  />
                </div>

                <div>
                  <label className="font-bold text-stone-700 block mb-1">Read Time</label>
                  <input
                    type="text"
                    placeholder="3 min read"
                    value={newsForm.readTime || '3 min read'}
                    onChange={e => setNewsForm({ ...newsForm, readTime: e.target.value })}
                    className="w-full bg-[#FFFDF9] border border-[#DDD7C9] rounded-xl px-3 py-2 text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#E87A1E]"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-stone-700 block mb-1">Summary / Article Content *</label>
                <textarea
                  rows="4"
                  required
                  placeholder="Enter detailed press release or article summary..."
                  value={newsForm.summary}
                  onChange={e => setNewsForm({ ...newsForm, summary: e.target.value })}
                  className="w-full bg-[#FFFDF9] border border-[#DDD7C9] rounded-xl px-3 py-2 text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#E87A1E]"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-stone-200">
                <button
                  type="button"
                  onClick={() => setShowNewsModal(false)}
                  className="px-4 py-2 bg-stone-100 hover:bg-stone-200 text-stone-700 font-semibold rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#E87A1E] hover:bg-[#D2640C] text-white font-bold rounded-xl shadow-sm"
                >
                  {editingNewsItem ? 'Save Changes' : 'Publish News'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ==================================================== */}
      {/* MODAL 6: EVENT MODAL (ADD / EDIT) */}
      {/* ==================================================== */}
      {showEventModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-md max-h-[90vh] overflow-y-auto rounded-3xl shadow-xl border border-[#F3DEC8] p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-stone-200 pb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-[#381602] text-white flex items-center justify-center">
                  <Calendar className="w-4 h-4 text-[#F4A261]" />
                </div>
                <h4 className="font-serif text-lg font-bold text-[#381602]">
                  {editingEventItem ? 'Edit Seva Event' : 'Add Upcoming Seva Event'}
                </h4>
              </div>
              <button onClick={() => setShowEventModal(false)} className="p-1 text-stone-400 hover:text-stone-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveEvent} className="space-y-3.5 text-xs">
              <div>
                <label className="font-bold text-stone-700 block mb-1">Event Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Mega Community Annadan Seva Drive"
                  value={eventForm.title}
                  onChange={e => setEventForm({ ...eventForm, title: e.target.value })}
                  className="w-full bg-[#FFFDF9] border border-[#DDD7C9] rounded-xl px-3 py-2 text-stone-900 font-semibold focus:outline-none focus:ring-2 focus:ring-[#E87A1E]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-stone-700 block mb-1">Category</label>
                  <select
                    value={eventForm.category}
                    onChange={e => setEventForm({ ...eventForm, category: e.target.value })}
                    className="w-full bg-[#FFFDF9] border border-[#DDD7C9] rounded-xl px-3 py-2 text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#E87A1E]"
                  >
                    <option value="Annadan">Annadan</option>
                    <option value="Healthcare">Healthcare</option>
                    <option value="Education">Education</option>
                    <option value="Environment">Environment</option>
                    <option value="Community">Community</option>
                  </select>
                </div>

                <div>
                  <label className="font-bold text-stone-700 block mb-1">Status</label>
                  <select
                    value={eventForm.status}
                    onChange={e => setEventForm({ ...eventForm, status: e.target.value })}
                    className="w-full bg-[#FFFDF9] border border-[#DDD7C9] rounded-xl px-3 py-2 text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#E87A1E]"
                  >
                    <option value="Published">Published</option>
                    <option value="Draft">Draft</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-stone-700 block mb-1">Event Date *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Sunday, 26 October 2026"
                    value={eventForm.date}
                    onChange={e => setEventForm({ ...eventForm, date: e.target.value })}
                    className="w-full bg-[#FFFDF9] border border-[#DDD7C9] rounded-xl px-3 py-2 text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#E87A1E]"
                  />
                </div>

                <div>
                  <label className="font-bold text-stone-700 block mb-1">Event Timing *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 10:30 AM – 3:30 PM"
                    value={eventForm.time}
                    onChange={e => setEventForm({ ...eventForm, time: e.target.value })}
                    className="w-full bg-[#FFFDF9] border border-[#DDD7C9] rounded-xl px-3 py-2 text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#E87A1E]"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-stone-700 block mb-1">Location / Venue *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Central Community Kitchen, Sector 7 Hub"
                  value={eventForm.location}
                  onChange={e => setEventForm({ ...eventForm, location: e.target.value })}
                  className="w-full bg-[#FFFDF9] border border-[#DDD7C9] rounded-xl px-3 py-2 text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#E87A1E]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-stone-700 block mb-1">Volunteers Needed</label>
                  <input
                    type="number"
                    min="1"
                    placeholder="25"
                    value={eventForm.volunteersNeeded}
                    onChange={e => setEventForm({ ...eventForm, volunteersNeeded: e.target.value })}
                    className="w-full bg-[#FFFDF9] border border-[#DDD7C9] rounded-xl px-3 py-2 text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#E87A1E]"
                  />
                </div>

                <div>
                  <label className="font-bold text-stone-700 block mb-1">Volunteer Badge</label>
                  <input
                    type="text"
                    placeholder="e.g. Open for Volunteers"
                    value={eventForm.badge}
                    onChange={e => setEventForm({ ...eventForm, badge: e.target.value })}
                    className="w-full bg-[#FFFDF9] border border-[#DDD7C9] rounded-xl px-3 py-2 text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#E87A1E]"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-stone-700 block mb-1">Event Description *</label>
                <textarea
                  rows="3"
                  required
                  placeholder="Describe the seva camp, schedule, and volunteer responsibilities..."
                  value={eventForm.description}
                  onChange={e => setEventForm({ ...eventForm, description: e.target.value })}
                  className="w-full bg-[#FFFDF9] border border-[#DDD7C9] rounded-xl px-3 py-2 text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#E87A1E]"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-stone-200">
                <button
                  type="button"
                  onClick={() => setShowEventModal(false)}
                  className="px-4 py-2 bg-stone-100 hover:bg-stone-200 text-stone-700 font-semibold rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#381602] hover:bg-[#522204] text-white font-bold rounded-xl shadow-sm"
                >
                  {editingEventItem ? 'Save Event' : 'Schedule Event'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
