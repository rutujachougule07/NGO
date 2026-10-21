import React, { useState } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  FileText, 
  FolderKanban, 
  Layers, 
  Store, 
  QrCode, 
  Receipt, 
  Users, 
  FileCheck2, 
  BarChart3, 
  Image as ImageIcon, 
  Newspaper, 
  Handshake, 
  UserCheck, 
  Settings, 
  Search, 
  Bell, 
  Menu, 
  X, 
  ChevronDown, 
  ExternalLink, 
  Palette, 
  LogOut, 
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';
import { foundationInfo } from '../../data/mockData';
import { useTheme } from '../../context/ThemeContext';
import { useToast } from '../../context/ToastContext';

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const { addToast } = useToast();

  const menuItems = [
    { name: 'Dashboard', path: '/admin', icon: LayoutDashboard },
    { name: 'Shop Management', path: '/admin/shops', icon: Store, badge: '5 Active' },
    { name: 'QR Code Management', path: '/admin/qr-codes', icon: QrCode },
    { name: 'Transactions', path: '/admin/transactions', icon: Receipt },
    { name: 'Reports & Audits', path: '/admin/reports', icon: BarChart3 },
    { name: 'Website Content', path: '/admin/content', icon: FileText },
    { name: 'Programs', path: '/admin/programs', icon: Layers },
    { name: 'Projects', path: '/admin/projects', icon: FolderKanban },
    { name: 'Donors & Customers', path: '/admin/donors', icon: Users },
    { name: 'Receipts & 80G', path: '/admin/receipts', icon: FileCheck2 },
    { name: 'Gallery Media', path: '/admin/gallery', icon: ImageIcon },
    { name: 'News & Events', path: '/admin/news', icon: Newspaper },
    { name: 'Partners', path: '/admin/partners', icon: Handshake },
    { name: 'Users & Roles', path: '/admin/users', icon: UserCheck },
    { name: 'Settings', path: '/admin/settings', icon: Settings },
  ];

  const notifications = [
    { id: 1, title: 'New Shop QR Donation: $30', desc: 'Received via Green Roots Cafe QR', time: '12m ago' },
    { id: 2, title: 'KPMG Q1 Audit Verified', desc: 'Certificate uploaded to ledger', time: '1h ago' },
    { id: 3, title: 'New Shop Registration', desc: 'Sahyadri Fabrics submitted docs', time: '3h ago' },
  ];

  const getBreadcrumbs = () => {
    const segments = location.pathname.split('/').filter(Boolean);
    if (segments.length <= 1) return 'Admin / Overview';
    const sub = segments[1];
    const match = menuItems.find(m => m.path === location.pathname);
    return `Admin / ${match ? match.name : sub.charAt(0).toUpperCase() + sub.slice(1)}`;
  };

  const getPageTitle = () => {
    const match = menuItems.find(m => m.path === location.pathname);
    return match ? match.name : 'Admin Overview';
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] flex text-stone-900">
      
      {/* Sidebar for Desktop */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-[#F3DEC8] text-stone-800 flex flex-col justify-between transition-transform duration-300 lg:translate-x-0 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div>
          {/* Logo & Close toggle */}
          <div className="p-5 border-b border-[#F3DEC8] flex items-center justify-between">
            <Link to="/" className="flex items-center gap-3">
              <img
                src="/immense_life_brand.jpg"
                alt="Immense Life Logo"
                className="w-10 h-10 rounded-full object-cover border-2 border-[#E87A1E] shadow-sm"
              />
              <div>
                <span className="font-serif font-bold text-sm block text-[#381602] leading-tight">
                  Immense Life
                </span>
                <span className="text-[10px] text-[#E87A1E] uppercase tracking-widest font-bold">
                  Admin Console
                </span>
              </div>
            </Link>

            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden p-1 rounded-lg text-stone-500 hover:text-stone-900"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Items List */}
          <div className="py-4 px-3 space-y-1 max-h-[calc(100vh-160px)] overflow-y-auto">
            <div className="text-[10px] font-bold uppercase tracking-wider text-stone-400 px-3 py-1">
              Core Operations
            </div>

            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;

              return (
                <Link
                  key={item.name}
                  to={item.path}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition ${
                    isActive
                      ? 'bg-[#FFF2E3] text-[#A34805] font-bold border border-[#F5DEC8] shadow-xs'
                      : 'text-stone-600 hover:text-[#381602] hover:bg-[#FFF2E3]/50'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-[#E87A1E]' : 'text-stone-400'}`} />
                    <span>{item.name}</span>
                  </div>
                  {item.badge && (
                    <span className="text-[10px] font-bold bg-[#FFF2E3] text-[#A34805] px-2 py-0.5 rounded-full border border-[#F5DEC8]">
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </div>
        </div>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-[#F3DEC8] bg-[#FFFDF9]">
          <Link
            to="/"
            className="w-full py-2 px-3 bg-white hover:bg-[#FFF2E3] border border-[#F3DEC8] text-xs font-semibold rounded-xl flex items-center justify-center gap-2 text-stone-700 hover:text-[#381602] shadow-2xs transition"
          >
            <ExternalLink className="w-3.5 h-3.5 text-[#E87A1E]" />
            <span>View Public Website</span>
          </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 lg:pl-64 flex flex-col min-w-0">
        
        {/* Top Header */}
        <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-[#F3DEC8] px-4 sm:px-8 py-3.5 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 rounded-xl bg-stone-100 text-stone-700 hover:bg-stone-200 transition"
            >
              <Menu className="w-5 h-5" />
            </button>

            <div>
              <div className="text-[11px] font-bold text-stone-400">
                {getBreadcrumbs()}
              </div>
              <h1 className="font-serif text-xl sm:text-2xl font-bold text-[#381602]">
                {getPageTitle()}
              </h1>
            </div>
          </div>

          {/* Right Header items: Search, Notifs, Theme, Profile */}
          <div className="flex items-center gap-2 sm:gap-4">
            
            {/* Quick Search */}
            <div className="hidden md:flex items-center relative">
              <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search transactions, shops, donors..."
                className="w-56 lg:w-72 bg-[#FFFDF9] border border-[#F3DEC8] rounded-full pl-9 pr-3 py-1.5 text-xs text-stone-800 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-[#E87A1E]"
              />
            </div>

            {/* Notification Menu */}
            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="p-2 rounded-full hover:bg-[#FFF2E3] text-stone-600 relative transition"
                aria-label="Notifications"
              >
                <Bell className="w-5 h-5" />
                <span className="w-2 h-2 rounded-full bg-[#E87A1E] absolute top-1.5 right-1.5"></span>
              </button>

              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-xl border border-[#F3DEC8] p-3 z-50 animate-slide-down">
                  <div className="flex items-center justify-between pb-2 mb-2 border-b border-[#F3DEC8]">
                    <span className="text-xs font-bold text-[#381602]">Notifications</span>
                    <span className="text-[10px] text-[#E87A1E] font-bold cursor-pointer">Mark all read</span>
                  </div>
                  <div className="space-y-2">
                    {notifications.map(n => (
                      <div key={n.id} className="p-2.5 rounded-xl hover:bg-[#FFF2E3]/50 transition text-xs">
                        <div className="font-bold text-[#381602]">{n.title}</div>
                        <div className="text-[11px] text-stone-500 mt-0.5">{n.desc}</div>
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
                className="flex items-center gap-2.5 p-1 sm:px-2 rounded-full hover:bg-[#FFF2E3] transition"
              >
                <img
                  src="/immense_life_brand.jpg"
                  alt="Admin user"
                  className="w-8 h-8 rounded-full object-cover border-2 border-[#E87A1E]"
                />
                <div className="hidden sm:block text-left">
                  <div className="text-xs font-bold text-[#381602] leading-none">Admin Desk</div>
                  <div className="text-[10px] text-[#A34805] font-semibold mt-0.5">Super Admin</div>
                </div>
                <ChevronDown className="w-3.5 h-3.5 text-stone-400 hidden sm:block" />
              </button>

              {showProfileMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-2xl shadow-xl border border-[#F3DEC8] p-1.5 z-50">
                  <Link
                    to="/admin/settings"
                    onClick={() => setShowProfileMenu(false)}
                    className="flex items-center gap-2 px-3 py-2 text-xs text-stone-700 hover:bg-[#FFF2E3] rounded-xl font-medium"
                  >
                    <Settings className="w-3.5 h-3.5 text-[#E87A1E]" />
                    <span>Settings & Security</span>
                  </Link>
                  <Link
                    to="/"
                    onClick={() => setShowProfileMenu(false)}
                    className="flex items-center gap-2 px-3 py-2 text-xs text-stone-700 hover:bg-[#FFF2E3] rounded-xl font-medium"
                  >
                    <ExternalLink className="w-3.5 h-3.5 text-[#E87A1E]" />
                    <span>Public Homepage</span>
                  </Link>
                  <button
                    onClick={() => {
                      setShowProfileMenu(false);
                      addToast('Logged out of admin session', 'info');
                      navigate('/');
                    }}
                    className="w-full flex items-center gap-2 px-3 py-2 text-xs text-red-600 hover:bg-red-50 rounded-xl font-medium text-left"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Sign Out</span>
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
