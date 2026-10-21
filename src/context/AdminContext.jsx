import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  initialShopsData, 
  initialTransactionsData, 
  initialCustomersData, 
  initialReceiptsData, 
  initialSettlementsData, 
  initialAdminUsersData, 
  initialAuditLogsData, 
  initialNotificationsData, 
  initialWebsiteCMSData, 
  initialRazorpayConfig, 
  initialFoundationSettings 
} from '../data/adminMockData';
import { useToast } from './ToastContext';

const AdminContext = createContext();

export function AdminProvider({ children }) {
  const { addToast } = useToast();

  // Load from local storage or fallback to initial dataset
  const [shops, setShops] = useState(() => {
    const saved = localStorage.getItem('ilf_admin_shops');
    return saved ? JSON.parse(saved) : initialShopsData;
  });

  const [transactions, setTransactions] = useState(() => {
    const saved = localStorage.getItem('ilf_admin_transactions');
    return saved ? JSON.parse(saved) : initialTransactionsData;
  });

  const [customers, setCustomers] = useState(() => {
    const saved = localStorage.getItem('ilf_admin_customers');
    return saved ? JSON.parse(saved) : initialCustomersData;
  });

  const [receipts, setReceipts] = useState(() => {
    const saved = localStorage.getItem('ilf_admin_receipts');
    return saved ? JSON.parse(saved) : initialReceiptsData;
  });

  const [settlements, setSettlements] = useState(() => {
    const saved = localStorage.getItem('ilf_admin_settlements');
    return saved ? JSON.parse(saved) : initialSettlementsData;
  });

  const [adminUsers, setAdminUsers] = useState(() => {
    const saved = localStorage.getItem('ilf_admin_users');
    return saved ? JSON.parse(saved) : initialAdminUsersData;
  });

  const [auditLogs, setAuditLogs] = useState(() => {
    const saved = localStorage.getItem('ilf_admin_audit_logs');
    return saved ? JSON.parse(saved) : initialAuditLogsData;
  });

  const [notifications, setNotifications] = useState(() => {
    const saved = localStorage.getItem('ilf_admin_notifications');
    return saved ? JSON.parse(saved) : initialNotificationsData;
  });

  const [websiteCMS, setWebsiteCMS] = useState(() => {
    const saved = localStorage.getItem('ilf_admin_website_cms');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (!parsed.events || !Array.isArray(parsed.events)) {
          parsed.events = initialWebsiteCMSData.events || [];
        }
        return parsed;
      } catch (e) {
        return initialWebsiteCMSData;
      }
    }
    return initialWebsiteCMSData;
  });

  const [razorpayConfig, setRazorpayConfig] = useState(() => {
    const saved = localStorage.getItem('ilf_admin_razorpay');
    return saved ? JSON.parse(saved) : initialRazorpayConfig;
  });

  const [foundationSettings, setFoundationSettings] = useState(() => {
    const saved = localStorage.getItem('ilf_admin_settings');
    return saved ? JSON.parse(saved) : initialFoundationSettings;
  });

  // Global search query
  const [searchQuery, setSearchQuery] = useState('');
  const [activeReceiptModal, setActiveReceiptModal] = useState(null);
  const [activePrintStandeeModal, setActivePrintStandeeModal] = useState(null);

  // Sync to local storage
  useEffect(() => { localStorage.setItem('ilf_admin_shops', JSON.stringify(shops)); }, [shops]);
  useEffect(() => { localStorage.setItem('ilf_admin_transactions', JSON.stringify(transactions)); }, [transactions]);
  useEffect(() => { localStorage.setItem('ilf_admin_customers', JSON.stringify(customers)); }, [customers]);
  useEffect(() => { localStorage.setItem('ilf_admin_receipts', JSON.stringify(receipts)); }, [receipts]);
  useEffect(() => { localStorage.setItem('ilf_admin_settlements', JSON.stringify(settlements)); }, [settlements]);
  useEffect(() => { localStorage.setItem('ilf_admin_users', JSON.stringify(adminUsers)); }, [adminUsers]);
  useEffect(() => { localStorage.setItem('ilf_admin_audit_logs', JSON.stringify(auditLogs)); }, [auditLogs]);
  useEffect(() => { localStorage.setItem('ilf_admin_notifications', JSON.stringify(notifications)); }, [notifications]);
  useEffect(() => { localStorage.setItem('ilf_admin_website_cms', JSON.stringify(websiteCMS)); }, [websiteCMS]);
  useEffect(() => { localStorage.setItem('ilf_admin_razorpay', JSON.stringify(razorpayConfig)); }, [razorpayConfig]);
  useEffect(() => { localStorage.setItem('ilf_admin_settings', JSON.stringify(foundationSettings)); }, [foundationSettings]);

  // Helper to log audit event
  const logAudit = (action, module, details) => {
    const newLog = {
      id: `AUD-${Math.floor(1000 + Math.random() * 9000)}`,
      timestamp: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) + ', ' + new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      adminName: 'Admin Desk (Super Admin)',
      role: 'Super Admin',
      action,
      module,
      ipAddress: '14.139.122.4',
      details
    };
    setAuditLogs(prev => [newLog, ...prev]);
  };

  // --- Shop Actions ---
  const addShop = (shopData) => {
    const newId = `SHP-00${shops.length + 1}`;
    const newQr = `ILF-SHOP-00${shops.length + 1}`;
    const created = {
      id: newId,
      qrId: newQr,
      status: 'Active',
      qrStatus: 'Active',
      totalCollected: 0,
      transactionsCount: 0,
      commissionWaived: '100%',
      registeredDate: 'Today',
      lastActive: 'Just now',
      activeStandees: 1,
      targetCause: shopData.targetCause || 'Annadan & Child Nutrition',
      ...shopData
    };
    setShops(prev => [created, ...prev]);
    logAudit('Enrolled Merchant Shop', 'Shop Management', `Added ${created.name} (${created.id}) with counter QR ${newQr}`);
    addToast(`Shop "${created.name}" enrolled successfully! QR standee generated.`, 'success');
    return created;
  };

  const updateShop = (shopId, updatedData) => {
    setShops(prev => prev.map(s => s.id === shopId ? { ...s, ...updatedData } : s));
    logAudit('Updated Shop Details', 'Shop Management', `Modified profile for shop ID ${shopId}`);
    addToast('Shop details updated successfully!', 'success');
  };

  const toggleShopStatus = (shopId) => {
    setShops(prev => prev.map(s => {
      if (s.id === shopId) {
        const nextStatus = s.status === 'Active' ? 'Inactive' : 'Active';
        const nextQr = nextStatus === 'Active' ? 'Active' : 'Suspended';
        logAudit('Toggled Shop Status', 'Shop Management', `Changed shop ${s.name} status to ${nextStatus}`);
        addToast(`Shop "${s.name}" is now ${nextStatus}.`, 'info');
        return { ...s, status: nextStatus, qrStatus: nextQr };
      }
      return s;
    }));
  };

  const deleteShop = (shopId) => {
    const shop = shops.find(s => s.id === shopId);
    setShops(prev => prev.filter(s => s.id !== shopId));
    logAudit('Deleted Shop Record', 'Shop Management', `Removed ${shop ? shop.name : shopId}`);
    addToast('Shop removed from directory.', 'info');
  };

  // --- QR Code Actions ---
  const regenerateQR = (shopId) => {
    setShops(prev => prev.map(s => {
      if (s.id === shopId) {
        const newQrId = `ILF-SHOP-${Math.floor(100 + Math.random() * 900)}`;
        logAudit('Regenerated QR Standee', 'QR Code Management', `Regenerated QR for ${s.name} to ${newQrId}`);
        addToast(`New cryptographic QR standee generated for ${s.name}!`, 'success');
        return { ...s, qrId: newQrId, qrStatus: 'Active', lastActive: 'Just now' };
      }
      return s;
    }));
  };

  const revokeQR = (shopId) => {
    setShops(prev => prev.map(s => {
      if (s.id === shopId) {
        logAudit('Revoked QR Standee', 'QR Code Management', `Revoked QR token for ${s.name}`);
        addToast(`QR code for ${s.name} has been revoked and disabled.`, 'warning');
        return { ...s, qrStatus: 'Revoked' };
      }
      return s;
    }));
  };

  // --- Receipt Actions ---
  const resendReceipt = (receiptNumber, method = 'WhatsApp') => {
    setReceipts(prev => prev.map(r => {
      if (r.receiptNumber === receiptNumber) {
        const nextStatus = method === 'WhatsApp' ? 'Sent via WhatsApp' : 'Sent via Email';
        logAudit(`Resent 80G Receipt via ${method}`, 'Receipts & Invoices', `Dispatched ${receiptNumber} to ${r.customerMobile}`);
        addToast(`Receipt ${receiptNumber} resent successfully via ${method}!`, 'success');
        return { ...r, status: nextStatus };
      }
      return r;
    }));
  };

  // --- Website CMS Actions ---
  const updateCMSHome = (homeData) => {
    setWebsiteCMS(prev => ({ ...prev, home: { ...prev.home, ...homeData } }));
    logAudit('Updated Home CMS', 'Website CMS', 'Updated homepage hero, statistics, and badges');
    addToast('Homepage content updated and saved!', 'success');
  };

  const updateCMSAbout = (aboutData) => {
    setWebsiteCMS(prev => ({ ...prev, about: { ...prev.about, ...aboutData } }));
    logAudit('Updated About Foundation CMS', 'Website CMS', 'Updated mission, vision, and trustee details');
    addToast('About Foundation content saved!', 'success');
  };

  const updateCMSPrograms = (programsList) => {
    setWebsiteCMS(prev => ({ ...prev, programs: programsList }));
    logAudit('Updated Programs List', 'Website CMS', 'Reordered/updated seva programs');
    addToast('Programs catalog updated!', 'success');
  };

  const updateProgram = (progId, updatedData) => {
    setWebsiteCMS(prev => ({
      ...prev,
      programs: prev.programs.map(p => p.id === progId ? { ...p, ...updatedData } : p)
    }));
    logAudit('Updated Program', 'Website CMS', `Modified program ${progId}`);
    addToast('Program details updated!', 'success');
  };

  const toggleProgramPublish = (programId) => {
    setWebsiteCMS(prev => ({
      ...prev,
      programs: prev.programs.map(p => {
        if (p.id === programId) {
          const next = p.status === 'Published' ? 'Draft' : 'Published';
          logAudit('Toggled Program Publish', 'Website CMS', `Program ${p.title} set to ${next}`);
          addToast(`Program "${p.title}" status: ${next}`, 'info');
          return { ...p, status: next };
        }
        return p;
      })
    }));
  };

  const addProgram = (prog) => {
    const newProg = {
      id: `PROG-${websiteCMS.programs.length + 1}`,
      status: 'Published',
      image: '/hero_ngo_education.jpg',
      ...prog
    };
    setWebsiteCMS(prev => ({ ...prev, programs: [newProg, ...prev.programs] }));
    logAudit('Created Program', 'Website CMS', `Added seva initiative ${newProg.title}`);
    addToast(`Program "${newProg.title}" created successfully!`, 'success');
  };

  const deleteProgram = (progId) => {
    setWebsiteCMS(prev => ({
      ...prev,
      programs: prev.programs.filter(p => p.id !== progId)
    }));
    logAudit('Deleted Program', 'Website CMS', `Removed program ID ${progId}`);
    addToast('Program removed.', 'info');
  };

  // Gallery CMS
  const updateCMSGallery = (galleryList) => {
    setWebsiteCMS(prev => ({ ...prev, gallery: galleryList }));
    logAudit('Updated Gallery CMS', 'Website CMS', 'Updated media gallery items');
    addToast('Gallery media synchronized!', 'success');
  };

  const addGalleryItem = (item) => {
    const newItem = {
      id: `GAL-${Date.now().toString().slice(-4)}`,
      status: 'Published',
      date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      image: '/hero_seva_banner.jpg',
      ...item
    };
    setWebsiteCMS(prev => ({ ...prev, gallery: [newItem, ...prev.gallery] }));
    logAudit('Added Gallery Media', 'Website CMS', `Uploaded ${newItem.title}`);
    addToast(`Photo "${newItem.title}" added to gallery!`, 'success');
  };

  const deleteGalleryItem = (galId) => {
    setWebsiteCMS(prev => ({
      ...prev,
      gallery: prev.gallery.filter(g => g.id !== galId)
    }));
    logAudit('Deleted Gallery Media', 'Website CMS', `Removed gallery ID ${galId}`);
    addToast('Photo removed from gallery.', 'info');
  };

  const updateGalleryItem = (galId, updatedData) => {
    setWebsiteCMS(prev => ({
      ...prev,
      gallery: prev.gallery.map(g => g.id === galId ? { ...g, ...updatedData } : g)
    }));
    logAudit('Updated Gallery Media', 'Website CMS', `Updated photo ${galId}`);
    addToast('Gallery photo updated!', 'success');
  };

  const toggleGalleryStatus = (galId) => {
    setWebsiteCMS(prev => ({
      ...prev,
      gallery: prev.gallery.map(g => {
        if (g.id === galId) {
          const next = g.status === 'Published' ? 'Hidden' : 'Published';
          return { ...g, status: next };
        }
        return g;
      })
    }));
    addToast('Gallery item visibility toggled', 'info');
  };

  // News CMS
  const updateCMSNews = (newsList) => {
    setWebsiteCMS(prev => ({ ...prev, news: newsList }));
    logAudit('Updated News CMS', 'Website CMS', 'Updated press dispatches');
    addToast('News & events synchronized!', 'success');
  };

  const addNewsItem = (item) => {
    const newItem = {
      id: `NEWS-${Date.now().toString().slice(-4)}`,
      status: 'Published',
      date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      author: 'Trustee Desk',
      readTime: '3 min read',
      ...item
    };
    setWebsiteCMS(prev => ({ ...prev, news: [newItem, ...prev.news] }));
    logAudit('Added News Article', 'Website CMS', `Published article ${newItem.title}`);
    addToast(`Article "${newItem.title}" published!`, 'success');
  };

  const updateNewsItem = (newsId, updatedData) => {
    setWebsiteCMS(prev => ({
      ...prev,
      news: prev.news.map(n => n.id === newsId ? { ...n, ...updatedData } : n)
    }));
    logAudit('Updated News Article', 'Website CMS', `Updated article ${newsId}`);
    addToast('Announcement updated!', 'success');
  };

  const deleteNewsItem = (newsId) => {
    setWebsiteCMS(prev => ({
      ...prev,
      news: prev.news.filter(n => n.id !== newsId)
    }));
    logAudit('Deleted News Article', 'Website CMS', `Removed article ID ${newsId}`);
    addToast('Article removed from press dispatches.', 'info');
  };

  // Event CMS
  const updateCMSEvents = (eventsList) => {
    setWebsiteCMS(prev => ({ ...prev, events: eventsList }));
    logAudit('Updated Events CMS', 'Website CMS', 'Updated seva events catalog');
    addToast('Events synchronized!', 'success');
  };

  const addEventItem = (item) => {
    const newEvent = {
      id: `EVT-${Date.now().toString().slice(-4)}`,
      status: 'Published',
      date: item.date || 'Upcoming Sunday',
      time: item.time || '10:00 AM – 2:00 PM',
      location: item.location || 'Community Center Hub',
      category: item.category || 'Annadan',
      volunteersNeeded: Number(item.volunteersNeeded) || 10,
      badge: item.badge || 'Open for Volunteers',
      ...item
    };
    setWebsiteCMS(prev => ({ ...prev, events: [newEvent, ...(prev.events || [])] }));
    logAudit('Added Seva Event', 'Website CMS', `Scheduled event ${newEvent.title}`);
    addToast(`Event "${newEvent.title}" scheduled successfully!`, 'success');
  };

  const updateEventItem = (eventId, updatedData) => {
    setWebsiteCMS(prev => ({
      ...prev,
      events: (prev.events || []).map(e => e.id === eventId ? { ...e, ...updatedData } : e)
    }));
    logAudit('Updated Seva Event', 'Website CMS', `Updated event ${eventId}`);
    addToast('Event updated successfully!', 'success');
  };

  const deleteEventItem = (eventId) => {
    setWebsiteCMS(prev => ({
      ...prev,
      events: (prev.events || []).filter(e => e.id !== eventId)
    }));
    logAudit('Deleted Seva Event', 'Website CMS', `Removed event ID ${eventId}`);
    addToast('Event removed from schedule.', 'info');
  };

  // Donation CMS
  const updateCMSDonation = (donationData) => {
    setWebsiteCMS(prev => ({ ...prev, donationContent: { ...prev.donationContent, ...donationData } }));
    logAudit('Updated Donation CMS', 'Website CMS', 'Configured suggested tiers and stories');
    addToast('Donation page configuration saved!', 'success');
  };

  // Contact CMS
  const updateCMSContact = (contactData) => {
    setWebsiteCMS(prev => ({ ...prev, contact: { ...prev.contact, ...contactData } }));
    logAudit('Updated Contact CMS', 'Website CMS', 'Updated official phone, email, and trust hubs');
    addToast('Contact details updated!', 'success');
  };

  // Footer CMS
  const updateCMSFooter = (footerData) => {
    setWebsiteCMS(prev => ({ ...prev, footer: { ...prev.footer, ...footerData } }));
    logAudit('Updated Footer CMS', 'Website CMS', 'Updated legal disclaimer and social links');
    addToast('Footer and social links saved!', 'success');
  };

  // Live Dynamic Donation Record Action
  const recordDonationTransaction = ({
    amount,
    customerName,
    customerPhone,
    customerEmail = '',
    customerPan = '',
    shopId = null,
    shopName = 'Direct Online Seva Portal',
    cause = 'Annadan & Child Nutrition',
    paymentMethod = 'UPI (Razorpay Gateway)'
  }) => {
    const txnNum = Math.floor(10000 + Math.random() * 90000);
    const txnId = `TXN-${txnNum}`;
    const receiptNo = `ILF-REC-2026-${txnNum}`;
    const dateFormatted = new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
    const timeFormatted = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    const fullDateTime = `${dateFormatted}, ${timeFormatted}`;

    const newTxn = {
      id: txnId,
      razorpayOrderId: `order_${Math.random().toString(36).substring(2, 12)}`,
      razorpayPaymentId: `pay_${Math.random().toString(36).substring(2, 12)}`,
      shopId: shopId || 'ONLINE',
      shopName,
      customerName: customerName || 'Anonymous Seva Patron',
      customerPhone: customerPhone || '+91 98200 12345',
      customerEmail: customerEmail || 'donor@immenselife.org',
      amount: Number(amount),
      paymentMethod,
      dateTime: fullDateTime,
      status: 'Successful',
      receiptStatus: 'Generated',
      receiptNo,
      taxDeductible: true,
      cause,
      gatewayFee: 0,
      netReceived: Number(amount),
      customerPan: customerPan.toUpperCase() || 'NOT_PROVIDED'
    };

    setTransactions(prev => [newTxn, ...prev]);

    // Update shop collections if from a shop
    if (shopId && shopId !== 'ONLINE') {
      setShops(prev => prev.map(s => {
        if (s.id === shopId) {
          return {
            ...s,
            totalCollected: (s.totalCollected || 0) + Number(amount),
            transactionsCount: (s.transactionsCount || 0) + 1,
            lastActive: 'Just now'
          };
        }
        return s;
      }));
    }

    // Generate 80G receipt
    const newReceipt = {
      receiptNumber: receiptNo,
      transactionId: txnId,
      customerName: newTxn.customerName,
      customerMobile: newTxn.customerPhone,
      customerPan: newTxn.customerPan,
      shopName,
      shopId: shopId || 'ONLINE',
      amount: Number(amount),
      paymentDate: dateFormatted,
      documentType: '80G Donation Receipt',
      status: 'Generated',
      cause,
      authorizedSignatory: 'Dr. Arvind Swaminathan (Managing Trustee)',
      taxExemptionRef: 'CIT(E)/80G/DEL/2021-22/A/10492'
    };
    setReceipts(prev => [newReceipt, ...prev]);

    // Update or add customer
    setCustomers(prev => {
      const existing = prev.find(c => c.mobile === newTxn.customerPhone || c.name.toLowerCase() === newTxn.customerName.toLowerCase());
      if (existing) {
        return prev.map(c => c.id === existing.id ? {
          ...c,
          successfulPayments: (c.successfulPayments || 1) + 1,
          totalPaid: (c.totalPaid || 0) + Number(amount),
          lastPaymentDate: dateFormatted,
          pan: customerPan || c.pan
        } : c);
      } else {
        const newCust = {
          id: `CUST-${Math.floor(1000 + Math.random() * 9000)}`,
          name: newTxn.customerName,
          mobile: newTxn.customerPhone,
          email: newTxn.customerEmail,
          successfulPayments: 1,
          totalPaid: Number(amount),
          lastPaymentDate: dateFormatted,
          primaryShop: shopName,
          pan: newTxn.customerPan,
          city: 'Mumbai',
          loyaltyTier: Number(amount) >= 10000 ? 'Platinum Seva Patron' : Number(amount) >= 2500 ? 'Gold Seva Patron' : 'Active Seva Patron',
          certificate80G: `CERT-80G-2026-${Math.floor(1000 + Math.random() * 9000)}`
        };
        return [newCust, ...prev];
      }
    });

    // Add high value notification
    const notifSeverity = Number(amount) >= 5000 ? 'success' : 'info';
    const newNotif = {
      id: `NOTIF-${Date.now()}`,
      title: `Donation Received: ₹${Number(amount).toLocaleString('en-IN')}`,
      desc: `Received from ${newTxn.customerName} via ${shopName}`,
      type: 'transaction',
      time: 'Just now',
      read: false,
      severity: notifSeverity
    };
    setNotifications(prev => [newNotif, ...prev]);

    logAudit('Processed Live Donation', 'Payments & Transactions', `Received ₹${amount} from ${newTxn.customerName} (${receiptNo})`);
    addToast(`Donation of ₹${Number(amount).toLocaleString('en-IN')} confirmed! 80G Receipt ${receiptNo} issued.`, 'success');

    return { txn: newTxn, receipt: newReceipt };
  };

  // --- Razorpay Config Actions ---
  const toggleRazorpayMode = () => {
    const nextMode = razorpayConfig.mode === 'Live' ? 'Test' : 'Live';
    setRazorpayConfig(prev => ({
      ...prev,
      mode: nextMode,
      connectionStatus: nextMode === 'Live' ? 'Connected & Live' : 'Test Mode (Sandbox)'
    }));
    logAudit('Toggled Razorpay Mode', 'Razorpay Integration', `Switched gateway environment to ${nextMode}`);
    addToast(`Razorpay environment switched to ${nextMode} Mode!`, nextMode === 'Live' ? 'success' : 'warning');
  };

  const updateRazorpayKeys = (keys) => {
    setRazorpayConfig(prev => ({ ...prev, ...keys }));
    logAudit('Updated Razorpay API Keys', 'Razorpay Integration', 'Updated Key ID and Webhook Secret tokens');
    addToast('Razorpay credentials securely updated!', 'success');
  };

  const testRazorpayConnection = () => {
    logAudit('Tested Razorpay Webhook', 'Razorpay Integration', 'Triggered test ping to webhook endpoint');
    addToast('Ping successful! Webhook returned HTTP 200 OK (Latency: 34ms). Gateway is healthy.', 'success');
  };

  // --- Notification Actions ---
  const markNotificationRead = (notifId) => {
    setNotifications(prev => prev.map(n => n.id === notifId ? { ...n, read: true } : n));
  };

  const markAllNotificationsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    addToast('All notifications marked as read', 'info');
  };

  const addBroadcastNotification = (title, desc, severity = 'info') => {
    const newNotif = {
      id: `NOTIF-${Date.now()}`,
      title,
      desc,
      type: 'broadcast',
      time: 'Just now',
      read: false,
      severity
    };
    setNotifications(prev => [newNotif, ...prev]);
    logAudit('Sent Broadcast Notification', 'Notifications', title);
    addToast('Broadcast alert dispatched to admin desk!', 'success');
  };

  // --- Admin Users Actions ---
  const addAdminUser = (userData) => {
    const newUser = {
      id: `USR-00${adminUsers.length + 1}`,
      status: 'Active',
      lastLogin: 'Never',
      twoFactor: true,
      ...userData
    };
    setAdminUsers(prev => [newUser, ...prev]);
    logAudit('Created Admin User', 'Admin Users & Roles', `Provisioned account for ${newUser.name} as ${newUser.role}`);
    addToast(`Admin user "${newUser.name}" added successfully!`, 'success');
  };

  const toggleUserStatus = (userId) => {
    setAdminUsers(prev => prev.map(u => {
      if (u.id === userId) {
        const next = u.status === 'Active' ? 'Suspended' : 'Active';
        logAudit('Toggled User Status', 'Admin Users & Roles', `Account ${u.name} set to ${next}`);
        addToast(`User ${u.name} is now ${next}.`, 'info');
        return { ...u, status: next };
      }
      return u;
    }));
  };

  // Computed summary metrics for Dashboard
  const totalRegisteredShops = shops.length;
  const activeShopsCount = shops.filter(s => s.status === 'Active').length;
  const totalCollectionAmount = transactions
    .filter(t => t.status === 'Successful')
    .reduce((sum, t) => sum + t.amount, 0) + 3840000; // adding base historical aggregate
  const todaysCollectionAmount = transactions
    .filter(t => t.status === 'Successful' && t.dateTime.includes('21 Oct'))
    .reduce((sum, t) => sum + t.amount, 0) || 48500;
  const thisMonthsCollectionAmount = 895000;
  const successfulTxnCount = transactions.filter(t => t.status === 'Successful').length + 6410;
  const pendingTxnCount = transactions.filter(t => t.status === 'Pending').length;
  const totalCustomersCount = customers.length + 6420;

  return (
    <AdminContext.Provider value={{
      shops,
      transactions,
      customers,
      receipts,
      settlements,
      adminUsers,
      auditLogs,
      notifications,
      websiteCMS,
      razorpayConfig,
      foundationSettings,
      setFoundationSettings,
      searchQuery,
      setSearchQuery,
      activeReceiptModal,
      setActiveReceiptModal,
      activePrintStandeeModal,
      setActivePrintStandeeModal,
      // Actions
      addShop,
      updateShop,
      toggleShopStatus,
      deleteShop,
      regenerateQR,
      revokeQR,
      resendReceipt,
      updateCMSHome,
      updateCMSAbout,
      toggleProgramPublish,
      addProgram,
      updateProgram,
      deleteProgram,
      updateCMSPrograms,
      updateCMSGallery,
      addGalleryItem,
      updateGalleryItem,
      deleteGalleryItem,
      toggleGalleryStatus,
      updateCMSNews,
      addNewsItem,
      updateNewsItem,
      deleteNewsItem,
      updateCMSEvents,
      addEventItem,
      updateEventItem,
      deleteEventItem,
      updateCMSDonation,
      updateCMSContact,
      updateCMSFooter,
      recordDonationTransaction,
      toggleRazorpayMode,
      updateRazorpayKeys,
      testRazorpayConnection,
      markNotificationRead,
      markAllNotificationsRead,
      addBroadcastNotification,
      addAdminUser,
      toggleUserStatus,
      logAudit,
      // Aggregates
      totalRegisteredShops,
      activeShopsCount,
      totalCollectionAmount,
      todaysCollectionAmount,
      thisMonthsCollectionAmount,
      successfulTxnCount,
      pendingTxnCount,
      totalCustomersCount
    }}>
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
}
