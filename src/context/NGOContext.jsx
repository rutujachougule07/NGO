import React, { createContext, useContext, useState, useEffect } from 'react';
import { initialShops, initialTransactions, foundationInfo } from '../data/mockData';

const NGOContext = createContext();

const STORAGE_KEY_SHOPS = 'ilf_ngo_shops_v2';
const STORAGE_KEY_TXNS = 'ilf_ngo_transactions_v2';
const STORAGE_KEY_CONFIG = 'ilf_ngo_razorpay_config_v2';
const STORAGE_KEY_CMS = 'ilf_ngo_cms_v2';

// Standardized INR initial shops with GSTIN and Indian locations
const defaultShops = [
  {
    id: "SHP-001",
    name: "Green Roots Organic Cafe",
    owner: "Vikas Deshmukh",
    phone: "+91 98220 14820",
    email: "contact@greenrootscafe.in",
    location: "Koregaon Park, Pune, Maharashtra",
    gstin: "27AABCG1234F1Z8",
    qrId: "ILF-SHOP-001",
    category: "Cafe & Organic Store",
    status: "Active",
    totalCollected: 84500,
    transactionsCount: 312,
    commissionWaived: "100%",
    registeredDate: "12 Jan 2025"
  },
  {
    id: "SHP-002",
    name: "Himalayan Herbal Apothecary",
    owner: "Meera Kulkarni",
    phone: "+91 98112 40918",
    email: "care@himalayanherbal.in",
    location: "Bandra West, Mumbai, Maharashtra",
    gstin: "27AAECK5678B1ZQ",
    qrId: "ILF-SHOP-002",
    category: "Wellness & Ayurvedic Pharmacy",
    status: "Active",
    totalCollected: 142000,
    transactionsCount: 520,
    commissionWaived: "100%",
    registeredDate: "04 Feb 2025"
  },
  {
    id: "SHP-003",
    name: "Earthwise Books & Coffee",
    owner: "Arunabha Bose",
    phone: "+91 98311 02938",
    email: "arun@earthwisebooks.in",
    location: "Park Street, Kolkata, West Bengal",
    gstin: "19AADCB9012A1ZG",
    qrId: "ILF-SHOP-003",
    category: "Bookstore & Cafe",
    status: "Active",
    totalCollected: 56300,
    transactionsCount: 245,
    commissionWaived: "100%",
    registeredDate: "19 Mar 2025"
  },
  {
    id: "SHP-004",
    name: "Sahyadri Eco-Fabrics Collective",
    owner: "Sunita Gokhale",
    phone: "+91 97654 11029",
    email: "sunita@sahyadrifabrics.com",
    location: "FC Road, Pune, Maharashtra",
    gstin: "27AAGCS3456C1ZV",
    qrId: "ILF-SHOP-004",
    category: "Handlooms & Ethical Apparel",
    status: "Active",
    totalCollected: 38400,
    transactionsCount: 118,
    commissionWaived: "100%",
    registeredDate: "10 Oct 2026"
  },
  {
    id: "SHP-005",
    name: "Banyan Tree Yoga Studio",
    owner: "Maya Deshmukh",
    phone: "+91 98210 99420",
    email: "maya@banyantreeyoga.com",
    location: "Indiranagar, Bengaluru, Karnataka",
    gstin: "29AALCB7890D1Z3",
    qrId: "ILF-SHOP-005",
    category: "Yoga & Wellness Studio",
    status: "Active",
    totalCollected: 98200,
    transactionsCount: 418,
    commissionWaived: "100%",
    registeredDate: "05 Apr 2025"
  }
];

// Standardized initial INR customer transactions with Razorpay IDs & customer details
const defaultTransactions = [
  {
    id: "TXN-89425",
    customerName: "Rahul Patil",
    customerMobile: "+91 98230 45678",
    customerEmail: "rahul.patil@gmail.com",
    amount: 1500,
    currency: "INR",
    type: "Shop QR Donation",
    shopId: "SHP-001",
    shopName: "Green Roots Organic Cafe",
    qrId: "ILF-SHOP-001",
    project: "Daily Annadan & Nutrition Drive",
    date: "20 Oct 2026, 02:15 PM",
    timestamp: "2026-10-20T14:15:00Z",
    paymentMethod: "UPI (Google Pay)",
    razorpayPaymentId: "pay_Rzp9482918471",
    razorpayOrderId: "order_ORzp94829101",
    status: "Completed",
    receiptNo: "REC-2026-89425",
    gstInvoiceNo: "INV-ILF-2026-089425",
    taxDeductible: true,
    reconciled: true,
    settlementBatch: "SETTL-2026-10-20-01"
  },
  {
    id: "TXN-89424",
    customerName: "Sneha Kulkarni",
    customerMobile: "+91 99221 87654",
    customerEmail: "sneha.k@outlook.com",
    amount: 2500,
    currency: "INR",
    type: "Shop QR Donation",
    shopId: "SHP-002",
    shopName: "Himalayan Herbal Apothecary",
    qrId: "ILF-SHOP-002",
    project: "Mobile Healthcare & Medical Aid",
    date: "20 Oct 2026, 11:30 AM",
    timestamp: "2026-10-20T11:30:00Z",
    paymentMethod: "UPI (PhonePe)",
    razorpayPaymentId: "pay_Rzp9473820194",
    razorpayOrderId: "order_ORzp94738200",
    status: "Completed",
    receiptNo: "REC-2026-89424",
    gstInvoiceNo: "INV-ILF-2026-089424",
    taxDeductible: true,
    reconciled: true,
    settlementBatch: "SETTL-2026-10-20-01"
  },
  {
    id: "TXN-89423",
    customerName: "Amit Sharma",
    customerMobile: "+91 98190 12345",
    customerEmail: "amit.sharma@yahoo.co.in",
    amount: 500,
    currency: "INR",
    type: "Shop QR Donation",
    shopId: "SHP-001",
    shopName: "Green Roots Organic Cafe",
    qrId: "ILF-SHOP-001",
    project: "Child Education & Learning Centers",
    date: "19 Oct 2026, 06:45 PM",
    timestamp: "2026-10-19T18:45:00Z",
    paymentMethod: "UPI (Paytm)",
    razorpayPaymentId: "pay_Rzp9461902847",
    razorpayOrderId: "order_ORzp94619010",
    status: "Completed",
    receiptNo: "REC-2026-89423",
    gstInvoiceNo: "INV-ILF-2026-089423",
    taxDeductible: true,
    reconciled: true,
    settlementBatch: "SETTL-2026-10-19-02"
  },
  {
    id: "TXN-89422",
    customerName: "Pooja Joshi",
    customerMobile: "+91 97655 43210",
    customerEmail: "pooja.j@gmail.com",
    amount: 5000,
    currency: "INR",
    type: "Shop QR Donation",
    shopId: "SHP-004",
    shopName: "Sahyadri Eco-Fabrics Collective",
    qrId: "ILF-SHOP-004",
    project: "Women Empowerment & Livelihood",
    date: "19 Oct 2026, 03:20 PM",
    timestamp: "2026-10-19T15:20:00Z",
    paymentMethod: "Card (RuPay Debit)",
    razorpayPaymentId: "pay_Rzp9450821948",
    razorpayOrderId: "order_ORzp94508200",
    status: "Completed",
    receiptNo: "REC-2026-89422",
    gstInvoiceNo: "INV-ILF-2026-089422",
    taxDeductible: true,
    reconciled: true,
    settlementBatch: "SETTL-2026-10-19-02"
  },
  {
    id: "TXN-89421",
    customerName: "Ananya Iyer",
    customerMobile: "+91 98450 78912",
    customerEmail: "ananya.iyer@gmail.com",
    amount: 2500,
    currency: "INR",
    type: "Shop QR Donation",
    shopId: "SHP-003",
    shopName: "Earthwise Books & Coffee",
    qrId: "ILF-SHOP-003",
    project: "Child Education & Learning Centers",
    date: "18 Oct 2026, 04:32 PM",
    timestamp: "2026-10-18T16:32:00Z",
    paymentMethod: "UPI (Google Pay)",
    razorpayPaymentId: "pay_Rzp9448102941",
    razorpayOrderId: "order_ORzp94481011",
    status: "Completed",
    receiptNo: "REC-2026-89421",
    gstInvoiceNo: "INV-ILF-2026-089421",
    taxDeductible: true,
    reconciled: true,
    settlementBatch: "SETTL-2026-10-18-01"
  },
  {
    id: "TXN-89420",
    customerName: "Milind Manohar Sonar",
    customerMobile: "+91 98224 84000",
    customerEmail: "milind.sonar@immenselife.org",
    amount: 11000,
    currency: "INR",
    type: "Direct Web Donation",
    shopId: "DIRECT",
    shopName: "Immense Life Official Portal",
    qrId: "ILF-DIRECT-WEB",
    project: "General Seva & Upliftment Fund",
    date: "18 Oct 2026, 10:15 AM",
    timestamp: "2026-10-18T10:15:00Z",
    paymentMethod: "NetBanking (HDFC Bank)",
    razorpayPaymentId: "pay_Rzp9439201842",
    razorpayOrderId: "order_ORzp94392000",
    status: "Completed",
    receiptNo: "REC-2026-89420",
    gstInvoiceNo: "INV-ILF-2026-089420",
    taxDeductible: true,
    reconciled: true,
    settlementBatch: "SETTL-2026-10-18-01"
  }
];

// Razorpay configuration conforming to Step 2 of SOP
const defaultRazorpayConfig = {
  keyId: "rzp_live_ImmenseLife2026Key",
  keySecret: "sec_live_94k20NmAq82Zlw",
  webhookSecret: "whsec_ImmenseLife2026Razorpay",
  webhookUrl: "https://immenselife.org/api/webhooks/razorpay",
  mode: "test", // 'test' | 'live'
  merchantName: "Immense Life Foundation",
  authorizedSignatory: "Milind Manohar Sonar",
  kycStatus: "Verified & Approved",
  accountStatus: "Active",
  bankAccount: "HDFC Bank ••••••4091",
  ifsc: "HDFC0001248",
  ngoPan: "AAATI8291K",
  ngo80GURN: "AABTI8291KF20214",
  ngo12A: "DEL-IR23910-0902",
  csrRegNo: "CSR00039281",
  gstin: "27AABTI8291K1Z5"
};

// Website CMS content conforming to Requirement #1 of SOP
const defaultCMS = {
  heroTagline: "Serve • Support • Uplift • Together",
  heroTitle: "Empowering Frontline Communities Across India",
  heroSubtitle: "Immense Life Foundation bridges compassionate donors and local partner shops through seamless, 100% transparent QR-based micro-donations and grassroots ground relief.",
  announcement: "Divine Seva & Annadan Community Relief Active • 100% Tax-Deductible 80G Receipts Issued Instantly",
  contactPhone: "+91 (22) 8400-5520 / +91 98224 84000",
  contactEmail: "seva@immenselife.org",
  headquarters: "Shirdi Peace Path, Shirdi & 420 Harmony Way, New Delhi, India"
};

export const NGOProvider = ({ children }) => {
  const [shops, setShops] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_SHOPS);
      return saved ? JSON.parse(saved) : defaultShops;
    } catch {
      return defaultShops;
    }
  });

  const [transactions, setTransactions] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_TXNS);
      return saved ? JSON.parse(saved) : defaultTransactions;
    } catch {
      return defaultTransactions;
    }
  });

  const [razorpayConfig, setRazorpayConfig] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_CONFIG);
      return saved ? JSON.parse(saved) : defaultRazorpayConfig;
    } catch {
      return defaultRazorpayConfig;
    }
  });

  const [cmsContent, setCmsContent] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_CMS);
      return saved ? JSON.parse(saved) : defaultCMS;
    } catch {
      return defaultCMS;
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_SHOPS, JSON.stringify(shops));
  }, [shops]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_TXNS, JSON.stringify(transactions));
  }, [transactions]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_CONFIG, JSON.stringify(razorpayConfig));
  }, [razorpayConfig]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_CMS, JSON.stringify(cmsContent));
  }, [cmsContent]);

  // Step 5: Shop Onboarding & QR Generation
  const addShop = (shopData) => {
    const nextNumber = shops.length + 1;
    const formattedId = `SHP-${String(nextNumber).padStart(3, '0')}`;
    const formattedQrId = `ILF-SHOP-${String(nextNumber).padStart(3, '0')}`;

    const newShop = {
      id: formattedId,
      name: shopData.name,
      owner: shopData.owner,
      phone: shopData.phone,
      email: shopData.email || '',
      location: shopData.location,
      gstin: shopData.gstin || 'Unregistered / Exempt',
      category: shopData.category || 'Retail Store',
      qrId: formattedQrId,
      status: 'Active',
      totalCollected: 0,
      transactionsCount: 0,
      commissionWaived: '100%',
      registeredDate: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
    };

    setShops(prev => [newShop, ...prev]);
    return newShop;
  };

  const updateShop = (shopId, updatedFields) => {
    setShops(prev => prev.map(s => s.id === shopId ? { ...s, ...updatedFields } : s));
  };

  // Step 6 & 7: Customer Payment Flow & Mapping
  const recordCustomerPayment = ({
    shopId,
    customerName,
    customerMobile,
    customerEmail,
    amount,
    project,
    paymentMethod = 'UPI (Razorpay)',
    donorPan = ''
  }) => {
    const targetShop = shops.find(s => s.id === shopId || s.qrId === shopId) || {
      id: shopId || 'DIRECT',
      name: 'Immense Life Official Portal',
      qrId: shopId || 'ILF-DIRECT-WEB'
    };

    const numAmount = Number(amount) || 0;
    const timestamp = new Date();
    const formattedDate = timestamp.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    }) + ', ' + timestamp.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });

    const randomSuffix = Math.floor(100000 + Math.random() * 900000);
    const txnId = `TXN-${randomSuffix}`;
    const razorpayPaymentId = `pay_Rzp${Date.now().toString().slice(-8)}${Math.floor(100 + Math.random() * 900)}`;
    const razorpayOrderId = `order_ORzp${Date.now().toString().slice(-8)}`;
    const receiptNo = `REC-2026-${randomSuffix}`;
    const gstInvoiceNo = `INV-ILF-2026-${randomSuffix}`;

    const newTransaction = {
      id: txnId,
      customerName: customerName || 'Generous Donor',
      customerMobile: customerMobile || '',
      customerEmail: customerEmail || '',
      donorPan: donorPan || '',
      amount: numAmount,
      currency: 'INR',
      type: 'Shop QR Donation',
      shopId: targetShop.id,
      shopName: targetShop.name,
      qrId: targetShop.qrId,
      project: project || 'Daily Annadan & Nutrition Drive',
      date: formattedDate,
      timestamp: timestamp.toISOString(),
      paymentMethod,
      razorpayPaymentId,
      razorpayOrderId,
      status: 'Completed',
      receiptNo,
      gstInvoiceNo,
      taxDeductible: true,
      reconciled: true,
      settlementBatch: `SETTL-${timestamp.toISOString().slice(0, 10)}-01`
    };

    // Update transactions list
    setTransactions(prev => [newTransaction, ...prev]);

    // Update shop stats if matched
    if (targetShop.id !== 'DIRECT') {
      setShops(prev => prev.map(s => {
        if (s.id === targetShop.id || s.qrId === targetShop.qrId) {
          return {
            ...s,
            totalCollected: (s.totalCollected || 0) + numAmount,
            transactionsCount: (s.transactionsCount || 0) + 1
          };
        }
        return s;
      }));
    }

    return newTransaction;
  };

  const updateRazorpayConfig = (newConfig) => {
    setRazorpayConfig(prev => ({ ...prev, ...newConfig }));
  };

  const updateCMS = (newCMS) => {
    setCmsContent(prev => ({ ...prev, ...newCMS }));
  };

  const getShopByQr = (qrOrId) => {
    if (!qrOrId) return null;
    return shops.find(s => s.qrId.toLowerCase() === qrOrId.toLowerCase() || s.id.toLowerCase() === qrOrId.toLowerCase()) || null;
  };

  return (
    <NGOContext.Provider
      value={{
        shops,
        transactions,
        razorpayConfig,
        cmsContent,
        addShop,
        updateShop,
        recordCustomerPayment,
        updateRazorpayConfig,
        updateCMS,
        getShopByQr
      }}
    >
      {children}
    </NGOContext.Provider>
  );
};

export const useNGO = () => {
  const context = useContext(NGOContext);
  if (!context) {
    throw new Error('useNGO must be used within an NGOProvider');
  }
  return context;
};
