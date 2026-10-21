import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import DonationModal from './components/common/DonationModal';

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
import ShopPaymentPage from './pages/ShopPaymentPage';

// Admin Pages
import AdminLayout from './pages/admin/AdminLayout';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminShops from './pages/admin/AdminShops';
import AdminQRCodes from './pages/admin/AdminQRCodes';
import AdminTransactions from './pages/admin/AdminTransactions';
import AdminReports from './pages/admin/AdminReports';
import AdminProjects from './pages/admin/AdminProjects';
import AdminSettings from './pages/admin/AdminSettings';
import AdminGenericCMS from './pages/admin/AdminGenericCMS';

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
  const isPayRoute = location.pathname.startsWith('/pay');

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
    <div className="min-h-screen flex flex-col font-sans selection:bg-[#386641] selection:text-white bg-[#FAFBF9]">
      <ScrollToTop />

      {/* Global Interactive Donation Flow Modal */}
      <DonationModal
        isOpen={donateModalOpen}
        onClose={() => setDonateModalOpen(false)}
        defaultProject={activeProjectForDonation}
        defaultAmount={activeAmountForDonation}
      />

      {/* Top Header & Navigation for Public Site */}
      {!isAdminRoute && !isPayRoute && (
        <Navbar onOpenDonate={() => handleOpenDonate()} />
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
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/donate" element={<DonatePage />} />
          
          {/* Dedicated Shop QR Payment Flow (SOP Step 6 & 7) */}
          <Route path="/pay" element={<ShopPaymentPage />} />
          <Route path="/pay/:shopId" element={<ShopPaymentPage />} />

          {/* Admin Dashboard & Management Routes */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="shops" element={<AdminShops />} />
            <Route path="qr-codes" element={<AdminQRCodes />} />
            <Route path="transactions" element={<AdminTransactions />} />
            <Route path="reports" element={<AdminReports />} />
            <Route path="projects" element={<AdminProjects />} />
            <Route path="settings" element={<AdminSettings />} />
            <Route path="content" element={<AdminGenericCMS />} />
            <Route path="programs" element={<AdminGenericCMS />} />
            <Route path="donors" element={<AdminGenericCMS />} />
            <Route path="receipts" element={<AdminGenericCMS />} />
            <Route path="gallery" element={<AdminGenericCMS />} />
            <Route path="news" element={<AdminGenericCMS />} />
            <Route path="partners" element={<AdminGenericCMS />} />
            <Route path="users" element={<AdminGenericCMS />} />
          </Route>
        </Routes>
      </div>

      {/* Public Footer */}
      {!isAdminRoute && !isPayRoute && <Footer onOpenDonate={() => handleOpenDonate()} />}
    </div>
  );
}
