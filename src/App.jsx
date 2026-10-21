import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import TopInfoBar from './components/common/TopInfoBar';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import DonationModal from './components/common/DonationModal';
import { AdminProvider } from './context/AdminContext';

// Public Pages
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ProgramsPage from './pages/ProgramsPage';
import ProjectsPage from './pages/ProjectsPage';
import ReportsPage from './pages/ReportsPage';
import GalleryPage from './pages/GalleryPage';
import NewsPage from './pages/NewsPage';
import ContactPage from './pages/ContactPage';
import DonatePage from './pages/DonatePage';
import ShopQRPayPage from './pages/ShopQRPayPage';

// Admin Pages
import AdminLayout from './pages/admin/AdminLayout';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminWebsiteCMS from './pages/admin/AdminWebsiteCMS';
import AdminShops from './pages/admin/AdminShops';
import AdminQRCodes from './pages/admin/AdminQRCodes';
import AdminTransactions from './pages/admin/AdminTransactions';
import AdminCustomers from './pages/admin/AdminCustomers';
import AdminReceipts from './pages/admin/AdminReceipts';
import AdminReports from './pages/admin/AdminReports';
import AdminRazorpay from './pages/admin/AdminRazorpay';
import AdminSettlements from './pages/admin/AdminSettlements';
import AdminNotifications from './pages/admin/AdminNotifications';
import AdminUsers from './pages/admin/AdminUsers';
import AdminAuditLogs from './pages/admin/AdminAuditLogs';
import AdminSettings from './pages/admin/AdminSettings';
import AdminProjects from './pages/admin/AdminProjects';

// Scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  // Global Donation Modal state
  const [donateModalOpen, setDonateModalOpen] = useState(false);
  const [activeProjectForDonation, setActiveProjectForDonation] = useState(null);
  const [activeAmountForDonation, setActiveAmountForDonation] = useState(null);

  const handleOpenDonate = (projectOrOpts = null) => {
    if (typeof projectOrOpts === 'number') {
      setActiveAmountForDonation(projectOrOpts);
      setActiveProjectForDonation(null);
    } else if (projectOrOpts && typeof projectOrOpts === 'object') {
      if (projectOrOpts.amount) setActiveAmountForDonation(projectOrOpts.amount);
      else setActiveAmountForDonation(null);
      if (projectOrOpts.project) setActiveProjectForDonation(projectOrOpts.project);
      else if (!projectOrOpts.amount) setActiveProjectForDonation(projectOrOpts);
    } else {
      setActiveProjectForDonation(projectOrOpts);
      setActiveAmountForDonation(null);
    }
    setDonateModalOpen(true);
  };

  return (
    <AdminProvider>
      <div className="min-h-screen flex flex-col font-sans selection:bg-[#F4A261] selection:text-white bg-white">
        <ScrollToTop />

        {/* Global Interactive Donation Flow Modal */}
        <DonationModal
          isOpen={donateModalOpen}
          onClose={() => setDonateModalOpen(false)}
          defaultProject={activeProjectForDonation}
          defaultAmount={activeAmountForDonation}
        />

        {/* Top Header & Navigation for Public Site */}
        {!isAdminRoute && (
          <>
            <TopInfoBar />
            <Navbar onOpenDonate={() => handleOpenDonate()} />
          </>
        )}

        {/* Main Content Router */}
        <div className="flex-1">
          <Routes>
            {/* Public Website Routes */}
            <Route path="/" element={<HomePage onOpenDonate={handleOpenDonate} />} />
            <Route path="/about" element={<AboutPage onOpenDonate={handleOpenDonate} />} />
            <Route path="/programs" element={<ProgramsPage onOpenDonate={handleOpenDonate} />} />
            <Route path="/projects" element={<ProjectsPage onOpenDonate={handleOpenDonate} />} />
            <Route path="/reports" element={<ReportsPage />} />
            <Route path="/gallery" element={<GalleryPage onOpenDonate={handleOpenDonate} />} />
            <Route path="/news" element={<NewsPage onOpenDonate={handleOpenDonate} />} />
            <Route path="/events" element={<NewsPage onOpenDonate={handleOpenDonate} />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/donate" element={<DonatePage />} />
            <Route path="/pay" element={<ShopQRPayPage />} />
            <Route path="/pay/:shopId" element={<ShopQRPayPage />} />

            {/* Admin Console Comprehensive Routes */}
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<AdminDashboard />} />
              <Route path="website-cms" element={<AdminWebsiteCMS />} />
              <Route path="shops" element={<AdminShops />} />
              <Route path="qr-codes" element={<AdminQRCodes />} />
              <Route path="transactions" element={<AdminTransactions />} />
              <Route path="customers" element={<AdminCustomers />} />
              <Route path="receipts" element={<AdminReceipts />} />
              <Route path="reports" element={<AdminReports />} />
              <Route path="razorpay" element={<AdminRazorpay />} />
              <Route path="settlements" element={<AdminSettlements />} />
              <Route path="notifications" element={<AdminNotifications />} />
              <Route path="users" element={<AdminUsers />} />
              <Route path="audit-logs" element={<AdminAuditLogs />} />
              <Route path="settings" element={<AdminSettings />} />

              {/* Backward compatibility and submenu aliases */}
              <Route path="content" element={<AdminWebsiteCMS />} />
              <Route path="programs" element={<AdminWebsiteCMS />} />
              <Route path="projects" element={<AdminProjects />} />
              <Route path="donors" element={<AdminCustomers />} />
              <Route path="gallery" element={<AdminWebsiteCMS />} />
              <Route path="news" element={<AdminWebsiteCMS />} />
              <Route path="partners" element={<AdminShops />} />
            </Route>
          </Routes>
        </div>

        {/* Public Footer */}
        {!isAdminRoute && <Footer onOpenDonate={() => handleOpenDonate()} />}
      </div>
    </AdminProvider>
  );
}
