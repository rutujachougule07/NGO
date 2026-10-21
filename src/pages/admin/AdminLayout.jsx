import React, { useState, useEffect, useRef } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Globe, 
  Store, 
  QrCode, 
  Receipt, 
  Users, 
  FileCheck2, 
  BarChart3, 
  CreditCard, 
  Building2, 
  Bell, 
  ShieldCheck, 
  History, 
  Settings, 
  LogOut, 
  Search, 
  Menu, 
  X, 
  ChevronDown, 
  ChevronRight, 
  ExternalLink, 
  Calendar,
  Layers,
  Image as ImageIcon,
  Newspaper,
  Phone,
  HeartHandshake,
  Info,
  CheckCircle2,
  Sparkles,
  ChevronLeft
} from 'lucide-react';
import { useAdmin } from '../../context/AdminContext';
import { useToast } from '../../context/ToastContext';
import ReceiptPreviewModal from './modals/ReceiptPreviewModal';
import QRStandeeModal from './modals/QRStandeeModal';

export default function AdminLayout() {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [desktopSidebarCollapsed, setDesktopSidebarCollapsed] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [websiteSubmenuOpen, setWebsiteSubmenuOpen] = useState(true);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  // Global search state
  const [globalSearch, setGlobalSearch] = useState('');
  const [showSearchResults, setShowSearchResults] = useState(false);
  const searchRef = useRef(null);

  const location = useLocation();
  const navigate = useNavigate();
  const { addToast } = useToast();
  const { 
    shops, 
    transactions, 
    customers, 
    notifications, 
    markNotificationRead,
    setActiveReceiptModal,
    currentAdminUser,
    logoutAdmin
  } = useAdmin();

  // Close search on outside click
  useEffect(() => {
    function handleClickOutside(e) {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setShowSearchResults(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // 15 Sidebar Menu items as per specification
  const menuItems = [
    { name: 'Dashboard', path: '/admin', icon: LayoutDashboard },
    { 
      name: 'Website Management', 
      path: '/admin/website-cms', 
      icon: Globe,
      hasSubmenu: true,
      subItems: [
        { name: 'Home', path: '/admin/website-cms?tab=home', tab: 'home' },
        { name: 'About Us', path: '/admin/website-cms?tab=about', tab: 'about' },
        { name: 'Programs', path: '/admin/website-cms?tab=programs', tab: 'programs' },
        { name: 'Gallery', path: '/admin/website-cms?tab=gallery', tab: 'gallery' },
        { name: 'News & Events', path: '/admin/website-cms?tab=news', tab: 'news' },
        { name: 'Contact', path: '/admin/website-cms?tab=contact', tab: 'contact' }
      ]
    },
    { name: 'Shop Management', path: '/admin/shops', icon: Store, badge: `${shops.length}` },
    { name: 'QR Code Management', path: '/admin/qr-codes', icon: QrCode },
    { name: 'Payments & Transactions', path: '/admin/transactions', icon: Receipt },
    { name: 'Customer Management', path: '/admin/customers', icon: Users },
    { name: 'Receipts & Invoices', path: '/admin/receipts', icon: FileCheck2 },
    { name: 'Reports & Analytics', path: '/admin/reports', icon: BarChart3 },
  ];

  // Global search matching
  const matchingShops = globalSearch.trim() ? shops.filter(s => s.name.toLowerCase().includes(globalSearch.toLowerCase())).slice(0, 3) : [];
  const matchingTxns = globalSearch.trim() ? transactions.filter(t => t.id.toLowerCase().includes(globalSearch.toLowerCase()) || t.customerName.toLowerCase().includes(globalSearch.toLowerCase())).slice(0, 3) : [];
  const matchingCustomers = globalSearch.trim() ? customers.filter(c => c.name.toLowerCase().includes(globalSearch.toLowerCase()) || c.mobile.includes(globalSearch)).slice(0, 3) : [];

  const unreadCount = notifications.filter(n => !n.read).length;

  const currentDateString = new Date().toLocaleDateString('en-GB', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  });

  const getPageTitle = () => {
    const current = menuItems.find(m => m.path === location.pathname);
    if (current) return current.name;
    if (location.pathname.startsWith('/admin/website')) return 'Website Management (CMS)';
    return 'Admin Console';
  };

  const handleLogout = () => {
    setShowLogoutConfirm(false);
    logoutAdmin();
    navigate('/admin/login');
  };

  return (
    <div className="admin-panel min-h-screen bg-[#FDFBF7] flex text-stone-900 font-sans selection:bg-[#E87A1E] selection:text-white">
      
      {/* Global Modals Mounted at Root */}
      <ReceiptPreviewModal />
      <QRStandeeModal />

      {/* Logout Confirmation Dialog */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 z-50 bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-sm w-full border border-stone-200 shadow-2xl text-center space-y-4 animate-in fade-in zoom-in-95">
            <div className="w-12 h-12 rounded-full bg-red-100 text-red-600 flex items-center justify-center mx-auto">
              <LogOut className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-serif text-lg font-bold text-stone-900">Sign Out of Admin Desk?</h4>
              <p className="text-xs text-stone-500 mt-1">
                Your administrative session will be terminated and you will be redirected to the public website.
              </p>
            </div>
            <div className="flex items-center justify-center gap-3">
              <button
                onClick={() => setShowLogoutConfirm(false)}
                className="px-4 py-2 bg-stone-100 hover:bg-stone-200 rounded-xl text-xs font-semibold text-stone-700"
              >
                Stay Logged In
              </button>
              <button
                onClick={handleLogout}
                className="px-5 py-2 bg-red-600 hover:bg-red-700 rounded-xl text-xs font-bold text-white shadow-sm"
              >
                Confirm Logout
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Sidebar Overlay on Mobile */}
      {mobileSidebarOpen && (
        <div 
          onClick={() => setMobileSidebarOpen(false)}
          className="fixed inset-0 bg-stone-900/40 backdrop-blur-xs z-40 lg:hidden"
        ></div>
      )}

      {/* Left Collapsible Sidebar */}
      <aside className={`bg-white border-r border-[#F3DEC8] text-stone-800 flex flex-col justify-between transition-all duration-300 ${
        mobileSidebarOpen 
          ? 'fixed inset-y-0 left-0 z-50 w-72 translate-x-0 shadow-2xl' 
          : 'fixed inset-y-0 left-0 z-50 w-72 -translate-x-full'
      } lg:static lg:sticky lg:top-0 lg:h-screen lg:translate-x-0 lg:z-30 lg:shrink-0 ${
        desktopSidebarCollapsed ? 'lg:w-20' : 'lg:w-72'
      }`}>
        
        {/* Top brand header & menu scroll area */}
        <div className="flex-1 flex flex-col min-h-0 overflow-hidden">
          <div className="p-4 sm:p-5 border-b border-[#F3DEC8] flex items-center justify-between shrink-0">
            <Link to="/admin" className="flex items-center gap-3 overflow-hidden">
              <img
                src="/immense_life_logo.jpg"
                alt="Immense Life Logo"
                className="w-11 h-11 rounded-full object-contain p-0.5 bg-white border-2 border-[#E87A1E] shadow-sm shrink-0"
              />
              {!desktopSidebarCollapsed && (
                <div className="truncate">
                  <span className="font-serif font-black text-base sm:text-lg block text-[#381602] leading-tight tracking-tight">
                    Immense Life
                  </span>
                  <span className="text-[11px] text-[#E87A1E] uppercase tracking-widest font-black">
                    ADMIN PANEL
                  </span>
                </div>
              )}
            </Link>

            {/* Mobile close toggle */}
            <button
              onClick={() => setMobileSidebarOpen(false)}
              className="lg:hidden p-1.5 rounded-lg text-stone-500 hover:text-stone-900 hover:bg-stone-100"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Sidebar Menu List */}
          <div className="py-3 px-2 sm:px-3 space-y-1.5 flex-1 overflow-y-auto text-left">
            {!desktopSidebarCollapsed && (
              <div className="text-xs font-black uppercase tracking-wider text-stone-400 px-3 py-1.5">
                Navigation Modules
              </div>
            )}

            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path || 
                (item.path === '/admin/website-cms' && location.pathname.startsWith('/admin/website'));

              return (
                <div key={item.name}>
                  <Link
                    to={item.path}
                    onClick={() => {
                      setMobileSidebarOpen(false);
                      if (item.hasSubmenu) {
                        setWebsiteSubmenuOpen(!websiteSubmenuOpen);
                      }
                    }}
                    title={desktopSidebarCollapsed ? item.name : undefined}
                    className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-[14px] sm:text-[15px] font-bold transition group ${
                      isActive
                        ? 'bg-[#FFF2E3] text-[#A34805] border border-[#F5DEC8] shadow-xs'
                        : 'text-stone-700 hover:text-[#381602] hover:bg-[#FFF2E3]/60'
                    }`}
                  >
                    <div className="flex items-center gap-3 truncate">
                      <Icon className={`w-5 h-5 shrink-0 ${isActive ? 'text-[#E87A1E]' : 'text-stone-500 group-hover:text-[#E87A1E]'}`} />
                      {!desktopSidebarCollapsed && (
                        <span className="truncate">{item.name}</span>
                      )}
                    </div>

                    {!desktopSidebarCollapsed && item.badge && (
                      <span className="text-xs font-bold bg-[#FFF2E3] text-[#A34805] px-2.5 py-0.5 rounded-full border border-[#F5DEC8]">
                        {item.badge}
                      </span>
                    )}

                    {!desktopSidebarCollapsed && item.hasSubmenu && (
                      <ChevronDown className={`w-4 h-4 text-stone-400 transition-transform ${websiteSubmenuOpen ? 'rotate-180' : ''}`} />
                    )}
                  </Link>

                  {/* Submenu for Website Management */}
                  {item.hasSubmenu && websiteSubmenuOpen && !desktopSidebarCollapsed && (
                    <div className="pl-8 pr-2 py-1 space-y-1 mt-0.5">
                      {item.subItems.map((sub, idx) => {
                        const searchParams = new URLSearchParams(location.search);
                        const currentTab = searchParams.get('tab') || (location.pathname === '/admin/website-cms' ? 'home' : '');
                        const isSubActive = location.pathname === '/admin/website-cms' && currentTab === sub.tab;
                        return (
                          <Link
                            key={idx}
                            to={sub.path}
                            onClick={() => setMobileSidebarOpen(false)}
                            className={`block px-3 py-1.5 text-xs sm:text-[13px] rounded-lg transition ${
                              isSubActive 
                                ? 'font-bold text-[#A34805] bg-[#FFF2E3]' 
                                : 'font-semibold text-stone-600 hover:text-[#A34805] hover:bg-stone-50'
                            }`}
                          >
                            <span className={isSubActive ? 'text-[#E87A1E] font-black mr-2' : 'text-stone-400 mr-2'}>•</span>
                            {sub.name}
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}

            {/* Logout Button */}
            <button
              onClick={() => setShowLogoutConfirm(true)}
              className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-[14px] sm:text-[15px] font-bold text-red-600 hover:bg-red-50 hover:text-red-700 transition cursor-pointer"
              title={desktopSidebarCollapsed ? 'Logout' : undefined}
            >
              <div className="flex items-center gap-3 truncate">
                <LogOut className="w-5 h-5 text-red-500 shrink-0" />
                {!desktopSidebarCollapsed && <span>Logout</span>}
              </div>
            </button>
          </div>
        </div>

        {/* Sidebar Footer */}
        <div className="p-3 border-t border-[#F3DEC8] bg-[#FFFDF9] space-y-2 shrink-0">
          {/* Collapse/Expand Toggle on Desktop */}
          <button
            onClick={() => setDesktopSidebarCollapsed(!desktopSidebarCollapsed)}
            className="hidden lg:flex w-full py-1.5 px-2 bg-stone-100 hover:bg-stone-200 text-stone-600 text-xs font-semibold rounded-xl items-center justify-center gap-1.5 transition"
            title={desktopSidebarCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
          >
            {desktopSidebarCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
            {!desktopSidebarCollapsed && <span>Collapse Sidebar</span>}
          </button>

          {!desktopSidebarCollapsed && (
            <Link
              to="/"
              className="w-full py-2 px-3 bg-white hover:bg-[#FFF2E3] border border-[#F3DEC8] text-xs font-bold rounded-xl flex items-center justify-center gap-2 text-stone-700 hover:text-[#381602] shadow-2xs transition"
            >
              <ExternalLink className="w-3.5 h-3.5 text-[#E87A1E]" />
              <span>View Public NGO Site</span>
            </Link>
          )}
        </div>

      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* Top Header Bar */}
        <header className="sticky top-0 z-20 bg-white/95 backdrop-blur-md border-b border-[#F3DEC8] px-4 sm:px-8 py-3.5 flex items-center justify-between gap-4">
          
          {/* Left: Hamburger & Dynamic Title */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileSidebarOpen(true)}
              className="lg:hidden p-2 rounded-xl bg-stone-100 text-stone-700 hover:bg-stone-200 transition"
              aria-label="Open Navigation"
            >
              <Menu className="w-5 h-5" />
            </button>

            <div>
              <div className="text-xs font-bold text-stone-400 uppercase tracking-wider">
                Admin Console / Immense Life Foundation
              </div>
              <h1 className="font-serif text-xl sm:text-2xl font-black text-[#381602]">
                {getPageTitle()}
              </h1>
            </div>
          </div>

          {/* Right Header items: Global Search, Date Badge, Notifs, Profile */}
          <div className="flex items-center gap-2 sm:gap-4">
            
            {/* Global Search with Live Results Dropdown */}
            <div ref={searchRef} className="relative hidden md:block">
              <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Global search shops, donors, transactions..."
                value={globalSearch}
                onChange={e => {
                  setGlobalSearch(e.target.value);
                  setShowSearchResults(true);
                }}
                onFocus={() => setShowSearchResults(true)}
                className="w-64 lg:w-80 bg-[#FFFDF9] border border-[#DDD7C9] rounded-full pl-10 pr-4 py-2 text-sm font-medium text-stone-800 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-[#E87A1E]"
              />

              {/* Search Results Dropdown */}
              {showSearchResults && globalSearch.trim().length > 0 && (
                <div className="absolute right-0 mt-2 w-88 bg-white rounded-2xl shadow-2xl border border-[#F3DEC8] p-3 z-50 text-xs text-left animate-in fade-in zoom-in-95">
                  <div className="flex items-center justify-between pb-2 mb-2 border-b border-stone-100">
                    <span className="font-bold text-[#381602]">Search Results</span>
                    <button onClick={() => setShowSearchResults(false)} className="text-stone-400 hover:text-stone-700">
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {matchingShops.length > 0 && (
                    <div className="mb-2">
                      <span className="text-[10px] font-bold text-stone-400 uppercase">Shops</span>
                      {matchingShops.map(s => (
                        <Link
                          key={s.id}
                          to="/admin/shops"
                          onClick={() => setShowSearchResults(false)}
                          className="block p-1.5 hover:bg-[#FFF2E3] rounded-lg text-stone-800 font-medium"
                        >
                          {s.name} ({s.city})
                        </Link>
                      ))}
                    </div>
                  )}

                  {matchingTxns.length > 0 && (
                    <div className="mb-2">
                      <span className="text-[10px] font-bold text-stone-400 uppercase">Transactions</span>
                      {matchingTxns.map(t => (
                        <Link
                          key={t.id}
                          to="/admin/transactions"
                          onClick={() => setShowSearchResults(false)}
                          className="block p-1.5 hover:bg-[#FFF2E3] rounded-lg text-stone-800 font-medium"
                        >
                          {t.id} • {t.customerName} (₹{t.amount})
                        </Link>
                      ))}
                    </div>
                  )}

                  {matchingCustomers.length > 0 && (
                    <div>
                      <span className="text-[10px] font-bold text-stone-400 uppercase">Customers</span>
                      {matchingCustomers.map(c => (
                        <Link
                          key={c.id}
                          to="/admin/customers"
                          onClick={() => setShowSearchResults(false)}
                          className="block p-1.5 hover:bg-[#FFF2E3] rounded-lg text-stone-800 font-medium"
                        >
                          {c.name} ({c.mobile})
                        </Link>
                      ))}
                    </div>
                  )}

                  {matchingShops.length === 0 && matchingTxns.length === 0 && matchingCustomers.length === 0 && (
                    <div className="py-3 text-center text-stone-400 italic">
                      No matching records found
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Current Date Badge */}
            <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-[#FFF2E3] text-[#A34805] border border-[#F5DEC8] rounded-xl text-xs font-bold">
              <Calendar className="w-3.5 h-3.5 text-[#E87A1E]" />
              <span>{currentDateString}</span>
            </div>

            {/* Notification Popover */}
            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="p-2 rounded-full hover:bg-[#FFF2E3] text-stone-600 relative transition"
                aria-label="View Notifications"
              >
                <Bell className="w-5 h-5" />
                {unreadCount > 0 && (
                  <span className="w-2.5 h-2.5 rounded-full bg-[#E87A1E] absolute top-1.5 right-1.5 ring-2 ring-white"></span>
                )}
              </button>

              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-3xl shadow-2xl border border-[#F3DEC8] p-4 z-50 animate-in fade-in zoom-in-95 text-left">
                  <div className="flex items-center justify-between pb-2 mb-3 border-b border-stone-200">
                    <div className="flex items-center gap-1.5">
                      <span className="font-serif font-bold text-sm text-[#381602]">Notifications</span>
                      {unreadCount > 0 && (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#FFF2E3] text-[#A34805]">
                          {unreadCount} unread
                        </span>
                      )}
                    </div>
                    <Link
                      to="/admin/notifications"
                      onClick={() => setShowNotifications(false)}
                      className="text-[11px] text-[#E87A1E] font-bold hover:underline"
                    >
                      View All
                    </Link>
                  </div>

                  <div className="space-y-2 max-h-72 overflow-y-auto">
                    {notifications.slice(0, 4).map(n => (
                      <div
                        key={n.id}
                        onClick={() => {
                          markNotificationRead(n.id);
                          setShowNotifications(false);
                          navigate('/admin/notifications');
                        }}
                        className={`p-3 rounded-2xl transition cursor-pointer text-xs ${
                          !n.read ? 'bg-[#FFFDF9] border border-[#F3DEC8]' : 'hover:bg-stone-50'
                        }`}
                      >
                        <div className="font-bold text-[#381602]">{n.title}</div>
                        <div className="text-[11px] text-stone-600 mt-0.5">{n.desc}</div>
                        <div className="text-[10px] text-stone-400 mt-1">{n.time}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Profile Dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                className="flex items-center gap-2 p-1 sm:px-2 rounded-full hover:bg-[#FFF2E3] transition"
              >
                <img
                  src="/immense_life_logo.jpg"
                  alt="Admin User Avatar"
                  className="w-9 h-9 rounded-full object-contain p-0.5 bg-white border-2 border-[#E87A1E]"
                />
                <div className="hidden sm:block text-left">
                  <div className="text-sm font-bold text-[#381602] leading-none">
                    {currentAdminUser?.name || 'Dr. Arvind Swaminathan'}
                  </div>
                  <div className="text-xs text-[#A34805] font-semibold mt-1">
                    {currentAdminUser?.role || 'Super Admin'}
                  </div>
                </div>
                <ChevronDown className="w-4 h-4 text-stone-400 hidden sm:block" />
              </button>

              {showProfileMenu && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-[#F3DEC8] p-2 z-50 text-left">
                  <div className="p-2.5 border-b border-stone-100">
                    <span className="font-bold text-sm text-stone-900 block truncate">
                      {currentAdminUser?.name || 'Dr. Arvind Swaminathan'}
                    </span>
                    <span className="text-xs text-stone-500 block font-mono truncate mt-0.5">
                      {currentAdminUser?.email || 'arvind.swami@immenselife.org'}
                    </span>
                  </div>

                  <Link
                    to="/"
                    onClick={() => setShowProfileMenu(false)}
                    className="flex items-center gap-2 px-3 py-2 text-xs text-stone-700 hover:bg-[#FFF2E3] rounded-xl font-medium"
                  >
                    <ExternalLink className="w-3.5 h-3.5 text-[#E87A1E]" />
                    <span>View Public Website</span>
                  </Link>

                  <button
                    onClick={() => {
                      setShowProfileMenu(false);
                      setShowLogoutConfirm(true);
                    }}
                    className="w-full flex items-center gap-2 px-3 py-2 text-xs text-red-600 hover:bg-red-50 rounded-xl font-medium text-left"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Logout</span>
                  </button>
                </div>
              )}
            </div>

          </div>
        </header>

        {/* Dashboard View Routed Page */}
        <main className="p-4 sm:p-8 flex-1">
          <Outlet />
        </main>

      </div>
    </div>
  );
}
