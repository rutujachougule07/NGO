import React, { useState } from 'react';
import { 
  Plus, 
  Search, 
  Filter, 
  Store, 
  QrCode, 
  Download, 
  Printer, 
  X, 
  CheckCircle2, 
  AlertCircle, 
  Eye, 
  ExternalLink,
  Receipt,
  Building2,
  FileSpreadsheet,
  Edit3
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useNGO } from '../../context/NGOContext';
import { useToast } from '../../context/ToastContext';

export default function AdminShops() {
  const { shops, addShop, updateShop, transactions, razorpayConfig } = useNGO();
  const { addToast } = useToast();
  
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [activeShopModal, setActiveShopModal] = useState(null);
  const [activeLedgerShop, setActiveLedgerShop] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingShop, setEditingShop] = useState(null);

  // New shop form state conforming to Step 5: (name, owner, address, GSTIN if applicable, contact)
  const [newShop, setNewShop] = useState({
    name: '',
    owner: '',
    phone: '',
    email: '',
    location: '',
    gstin: '',
    category: 'Retail Store'
  });

  const filteredShops = shops.filter(s => {
    const matchesSearch = s.name.toLowerCase().includes(search.toLowerCase()) ||
                          s.owner.toLowerCase().includes(search.toLowerCase()) ||
                          s.location.toLowerCase().includes(search.toLowerCase()) ||
                          s.qrId.toLowerCase().includes(search.toLowerCase()) ||
                          (s.gstin && s.gstin.toLowerCase().includes(search.toLowerCase()));
    const matchesStatus = statusFilter === 'All' || s.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleAddShop = (e) => {
    e.preventDefault();
    const createdShop = addShop(newShop);
    setIsAddModalOpen(false);
    setNewShop({ name: '', owner: '', phone: '', email: '', location: '', gstin: '', category: 'Retail Store' });
    addToast(`Partner shop "${createdShop.name}" registered and QR Standee ${createdShop.qrId} generated!`, 'success');
  };

  const handlePrintQR = (shop) => {
    addToast(`Printing official counter QR standee poster for "${shop.name}"...`, 'info');
    setTimeout(() => {
      window.print();
    }, 400);
  };

  const handleDownloadQR = (shop) => {
    addToast(`High-resolution SVG & PDF counter standee for "${shop.name}" downloaded!`, 'success');
  };

  return (
    <div className="space-y-6">
      
      {/* Top Header & Add Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-serif text-2xl font-bold text-[#143D2B]">
            Retail Partner Shop Management
          </h2>
          <p className="text-xs text-gray-500 mt-0.5">
            SOP Step 5: Onboard shops with GSTIN, print counter QR standees & map Razorpay collections
          </p>
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="px-5 py-2.5 bg-[#143D2B] hover:bg-[#0E2E20] text-white text-xs font-bold rounded-xl flex items-center justify-center gap-2 shadow-sm transition"
        >
          <Plus className="w-4 h-4" />
          <span>Onboard New Shop</span>
        </button>
      </div>

      {/* Search & Filter Toolbar */}
      <div className="bg-white p-4 rounded-2xl border border-[#E7E2D5] flex flex-col sm:flex-row gap-3 items-center justify-between shadow-xs">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by shop name, owner, GSTIN, or QR ID..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-[#FAF9F5] border border-gray-200 rounded-xl pl-9 pr-3 py-2 text-xs text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#143D2B]"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <span className="text-xs font-semibold text-gray-500">Status:</span>
          {['All', 'Active', 'Inactive'].map(st => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                statusFilter === st
                  ? 'bg-[#143D2B] text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Shop Table */}
      <div className="bg-white rounded-3xl border border-[#E7E2D5] shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#FAF9F5] text-gray-500 font-bold uppercase text-[10px] border-b border-gray-100">
              <tr>
                <th className="py-3.5 px-4">QR ID</th>
                <th className="py-3.5 px-4">Shop Name & GSTIN</th>
                <th className="py-3.5 px-4">Owner / Contact</th>
                <th className="py-3.5 px-4">Counter Location</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4">Total Collections (₹)</th>
                <th className="py-3.5 px-4">Customer Payments</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 font-medium text-gray-800">
              {filteredShops.map((shop) => (
                <tr key={shop.id} className="hover:bg-gray-50/80 transition">
                  <td className="py-3.5 px-4">
                    <span className="font-mono font-bold text-[#143D2B] bg-[#E7EFE9] px-2 py-0.5 rounded-md">
                      {shop.qrId}
                    </span>
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="font-bold text-gray-900">{shop.name}</div>
                    <div className="text-[11px] text-gray-500">GSTIN: {shop.gstin || 'Exempt / Unregistered'}</div>
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="font-bold">{shop.owner}</div>
                    <div className="text-[11px] text-gray-400">{shop.phone}</div>
                  </td>
                  <td className="py-3.5 px-4 text-gray-600 max-w-xs truncate">{shop.location}</td>
                  <td className="py-3.5 px-4">
                    <span className={`inline-flex items-center gap-1 text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                      shop.status === 'Active'
                        ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                        : 'bg-red-50 text-red-800 border border-red-200'
                    }`}>
                      {shop.status === 'Active' ? <CheckCircle2 className="w-3 h-3 text-emerald-600" /> : <AlertCircle className="w-3 h-3 text-red-600" />}
                      {shop.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 font-serif font-bold text-[#143D2B]">
                    ₹{Number(shop.totalCollected || 0).toLocaleString('en-IN')}
                  </td>
                  <td className="py-3.5 px-4 text-gray-600">
                    <button
                      onClick={() => setActiveLedgerShop(shop)}
                      className="inline-flex items-center gap-1 text-emerald-800 font-bold hover:underline"
                    >
                      <span>{shop.transactionsCount || 0} payments</span>
                    </button>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        onClick={() => setEditingShop(shop)}
                        className="p-1.5 hover:bg-gray-100 text-gray-600 rounded-lg transition"
                        title="Edit Shop Information"
                      >
                        <Edit3 className="w-4 h-4 text-gray-700" />
                      </button>
                      <Link
                        to={`/pay?shop=${shop.qrId}`}
                        target="_blank"
                        className="p-1.5 hover:bg-[#FFF2E3] text-[#E87A1E] rounded-lg transition"
                        title="Test Customer Payment Flow"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </Link>
                      <button
                        onClick={() => setActiveShopModal(shop)}
                        className="p-1.5 hover:bg-[#E7EFE9] text-[#143D2B] rounded-lg transition"
                        title="View QR Standee"
                      >
                        <QrCode className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDownloadQR(shop)}
                        className="p-1.5 hover:bg-gray-100 text-gray-600 rounded-lg transition"
                        title="Download Standee"
                      >
                        <Download className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handlePrintQR(shop)}
                        className="p-1.5 hover:bg-gray-100 text-gray-600 rounded-lg transition"
                        title="Print Standee Poster"
                      >
                        <Printer className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Shop Details & QR Code Drawer/Modal */}
      {activeShopModal && (
        <div
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setActiveShopModal(null)}
        >
          <div
            className="bg-[#FAF8F5] rounded-3xl p-6 sm:p-8 max-w-md w-full border border-[#E7E2D5] shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActiveShopModal(null)}
              className="absolute top-4 right-4 p-1 rounded-full text-gray-500 hover:bg-gray-200 transition"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Standee Preview Card (Directly Printable) */}
            <div className="bg-white rounded-3xl p-6 border-2 border-[#143D2B] text-center shadow-lg space-y-4">
              <div className="flex items-center justify-center gap-2">
                <img
                  src="/immense_life_brand.jpg"
                  alt="Immense Life Emblem"
                  className="w-10 h-10 rounded-full object-cover border-2 border-[#E87A1E] shadow-xs"
                />
                <div className="text-left">
                  <span className="font-serif font-bold text-sm text-[#143D2B] block leading-tight">
                    Immense Life Foundation
                  </span>
                  <span className="text-[9px] uppercase tracking-wider text-emerald-800 font-bold">
                    Official Partner Shop Counter
                  </span>
                </div>
              </div>

              <div className="bg-[#FAF9F5] p-3 rounded-2xl border border-gray-100">
                <h3 className="font-bold text-sm text-gray-900">{activeShopModal.name}</h3>
                <p className="text-[11px] text-gray-500">{activeShopModal.location}</p>
                <div className="flex items-center justify-center gap-2 mt-1">
                  <span className="text-[10px] font-mono font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded">
                    {activeShopModal.qrId}
                  </span>
                  {activeShopModal.gstin && (
                    <span className="text-[10px] font-mono text-gray-500">
                      GSTIN: {activeShopModal.gstin}
                    </span>
                  )}
                </div>
              </div>

              {/* High-fidelity stylized SVG QR Code */}
              <div className="p-4 bg-white rounded-2xl border-2 border-dashed border-emerald-700/40 inline-block shadow-xs">
                <svg className="w-44 h-44 mx-auto text-[#143D2B]" viewBox="0 0 100 100" fill="currentColor">
                  <rect x="5" y="5" width="26" height="26" rx="4" fill="#143D2B" />
                  <rect x="9" y="9" width="18" height="18" rx="2" fill="white" />
                  <rect x="13" y="13" width="10" height="10" rx="2" fill="#143D2B" />

                  <rect x="69" y="5" width="26" height="26" rx="4" fill="#143D2B" />
                  <rect x="73" y="9" width="18" height="18" rx="2" fill="white" />
                  <rect x="77" y="13" width="10" height="10" rx="2" fill="#143D2B" />

                  <rect x="5" y="69" width="26" height="26" rx="4" fill="#143D2B" />
                  <rect x="9" y="73" width="18" height="18" rx="2" fill="white" />
                  <rect x="13" y="77" width="10" height="10" rx="2" fill="#143D2B" />

                  <rect x="36" y="8" width="5" height="5" rx="1" />
                  <rect x="44" y="8" width="5" height="5" rx="1" />
                  <rect x="54" y="8" width="8" height="5" rx="1" />
                  <rect x="36" y="18" width="8" height="5" rx="1" />
                  <rect x="48" y="18" width="5" height="5" rx="1" />
                  <rect x="58" y="18" width="5" height="5" rx="1" />

                  <rect x="8" y="36" width="5" height="8" rx="1" />
                  <rect x="18" y="36" width="8" height="5" rx="1" />
                  <rect x="28" y="36" width="5" height="5" rx="1" />
                  <rect x="38" y="36" width="8" height="8" rx="1" />
                  <rect x="50" y="36" width="5" height="5" rx="1" />
                  <rect x="60" y="36" width="8" height="5" rx="1" />
                  <rect x="74" y="36" width="5" height="8" rx="1" />
                  <rect x="84" y="36" width="8" height="5" rx="1" />

                  <rect x="40" y="40" width="20" height="20" rx="4" fill="#143D2B" />
                  <circle cx="50" cy="50" r="6" fill="#E87A1E" />

                  <rect x="8" y="48" width="8" height="5" rx="1" />
                  <rect x="20" y="48" width="5" height="8" rx="1" />
                  <rect x="64" y="48" width="8" height="5" rx="1" />
                  <rect x="78" y="48" width="5" height="8" rx="1" />

                  <rect x="36" y="64" width="5" height="8" rx="1" />
                  <rect x="46" y="64" width="8" height="5" rx="1" />
                  <rect x="58" y="64" width="5" height="8" rx="1" />
                  <rect x="70" y="64" width="8" height="5" rx="1" />
                  <rect x="82" y="64" width="5" height="8" rx="1" />
                  <rect x="36" y="78" width="8" height="5" rx="1" />
                  <rect x="48" y="78" width="5" height="8" rx="1" />
                  <rect x="60" y="78" width="8" height="5" rx="1" />
                  <rect x="72" y="78" width="5" height="8" rx="1" />
                  <rect x="84" y="78" width="8" height="5" rx="1" />
                </svg>
              </div>

              <div className="space-y-1">
                <p className="text-xs font-bold text-gray-900">Scan to Donate via UPI / GPay / PhonePe / Card</p>
                <p className="text-[10px] text-gray-500">
                  Instant Section 80G Tax Deductible Receipt Generated • Powered by Razorpay
                </p>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="flex items-center gap-2 mt-5">
              <Link
                to={`/pay?shop=${activeShopModal.qrId}`}
                target="_blank"
                className="py-2.5 px-3 bg-[#E87A1E] hover:bg-[#D2640C] text-white text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 transition"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Open URL</span>
              </Link>
              <button
                onClick={() => handlePrintQR(activeShopModal)}
                className="flex-1 py-2.5 bg-[#143D2B] hover:bg-[#0E2E20] text-white text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 shadow-sm transition"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print Standee</span>
              </button>
              <button
                onClick={() => handleDownloadQR(activeShopModal)}
                className="flex-1 py-2.5 bg-white text-gray-800 border border-gray-300 hover:bg-gray-50 text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 transition"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download SVG</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Shop Ledger Drawer (Customer Records mapped to this shop) */}
      {activeLedgerShop && (
        <div
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-end p-0 sm:p-4"
          onClick={() => setActiveLedgerShop(null)}
        >
          <div
            className="bg-white h-full sm:h-auto sm:max-h-[90vh] sm:rounded-3xl p-6 max-w-xl w-full border border-[#E7E2D5] shadow-2xl overflow-y-auto flex flex-col justify-between"
            onClick={(e) => e.stopPropagation()}
          >
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800">Shop Collections Ledger</span>
                  <h3 className="font-serif text-lg font-bold text-[#143D2B]">{activeLedgerShop.name}</h3>
                </div>
                <button
                  onClick={() => setActiveLedgerShop(null)}
                  className="p-1 rounded-full text-gray-400 hover:bg-gray-100"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="py-4 space-y-3">
                <div className="grid grid-cols-2 gap-3 text-xs bg-[#FAF9F5] p-3 rounded-2xl border border-gray-100">
                  <div>
                    <span className="text-gray-500 block">Total Mapped Amount</span>
                    <span className="font-serif font-bold text-lg text-[#143D2B]">
                      ₹{Number(activeLedgerShop.totalCollected || 0).toLocaleString('en-IN')}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-500 block">Total Customer Scans</span>
                    <span className="font-bold text-lg text-gray-900">{activeLedgerShop.transactionsCount || 0}</span>
                  </div>
                </div>

                <h4 className="text-xs font-bold text-gray-700 pt-2">Mapped Customer Records:</h4>

                <div className="space-y-2">
                  {transactions.filter(t => t.shopId === activeLedgerShop.id || t.qrId === activeLedgerShop.qrId).length === 0 ? (
                    <div className="text-center py-8 text-gray-400 text-xs">
                      No customer transactions recorded for this counter yet.
                    </div>
                  ) : (
                    transactions
                      .filter(t => t.shopId === activeLedgerShop.id || t.qrId === activeLedgerShop.qrId)
                      .map(t => (
                        <div key={t.id} className="p-3 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 transition text-xs flex items-center justify-between">
                          <div>
                            <div className="font-bold text-gray-900">{t.customerName}</div>
                            <div className="text-[11px] text-gray-500">{t.customerMobile} • {t.date}</div>
                            <div className="text-[10px] font-mono text-emerald-800">{t.razorpayPaymentId}</div>
                          </div>
                          <div className="text-right">
                            <span className="font-serif font-bold text-emerald-800 text-sm block">
                              ₹{Number(t.amount).toLocaleString('en-IN')}
                            </span>
                            <span className="text-[10px] bg-emerald-50 text-emerald-800 px-2 py-0.5 rounded font-bold border border-emerald-200">
                              Completed
                            </span>
                          </div>
                        </div>
                      ))
                  )}
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-gray-100 flex justify-end">
              <button
                onClick={() => setActiveLedgerShop(null)}
                className="px-5 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold rounded-xl text-xs transition"
              >
                Close Ledger
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add New Shop Modal Conforming to Step 5 */}
      {isAddModalOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setIsAddModalOpen(false)}
        >
          <div
            className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full border border-[#E7E2D5] shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-gray-100 mb-5">
              <div>
                <h3 className="font-serif text-xl font-bold text-[#143D2B]">
                  Onboard Partner Shop
                </h3>
                <p className="text-[11px] text-gray-500">
                  Register shop details as per SOP Step 5 to generate unique QR standee
                </p>
              </div>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="p-1 rounded-full text-gray-400 hover:bg-gray-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddShop} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-gray-700 block mb-1">Shop / Outlet Name <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Pune Organic Mart & Cafe"
                  value={newShop.name}
                  onChange={(e) => setNewShop({ ...newShop, name: e.target.value })}
                  className="w-full bg-[#FAF9F5] border border-gray-300 rounded-xl px-3.5 py-2 text-xs text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#143D2B]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-gray-700 block mb-1">Owner Name <span className="text-red-500">*</span></label>
                  <input
                    type="text"
                    required
                    placeholder="Owner's full name"
                    value={newShop.owner}
                    onChange={(e) => setNewShop({ ...newShop, owner: e.target.value })}
                    className="w-full bg-[#FAF9F5] border border-gray-300 rounded-xl px-3.5 py-2 text-xs text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#143D2B]"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-700 block mb-1">Contact Phone <span className="text-red-500">*</span></label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98220 12345"
                    value={newShop.phone}
                    onChange={(e) => setNewShop({ ...newShop, phone: e.target.value })}
                    className="w-full bg-[#FAF9F5] border border-gray-300 rounded-xl px-3.5 py-2 text-xs text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#143D2B]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-gray-700 block mb-1">Email Address</label>
                  <input
                    type="email"
                    placeholder="contact@shopdomain.in"
                    value={newShop.email}
                    onChange={(e) => setNewShop({ ...newShop, email: e.target.value })}
                    className="w-full bg-[#FAF9F5] border border-gray-300 rounded-xl px-3.5 py-2 text-xs text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#143D2B]"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-700 block mb-1">
                    GSTIN <span className="text-gray-400 font-normal">(if applicable)</span>
                  </label>
                  <input
                    type="text"
                    placeholder="27AABCT1234F1Z8"
                    value={newShop.gstin}
                    onChange={(e) => setNewShop({ ...newShop, gstin: e.target.value.toUpperCase() })}
                    className="w-full bg-[#FAF9F5] border border-gray-300 rounded-xl px-3.5 py-2 text-xs font-mono uppercase text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#143D2B]"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-gray-700 block mb-1">Store Address & City <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Shop No 4, Shivaji Nagar, Pune, Maharashtra"
                  value={newShop.location}
                  onChange={(e) => setNewShop({ ...newShop, location: e.target.value })}
                  className="w-full bg-[#FAF9F5] border border-gray-300 rounded-xl px-3.5 py-2 text-xs text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#143D2B]"
                />
              </div>

              <div className="bg-emerald-50 p-3 rounded-xl border border-emerald-200 text-[11px] text-emerald-900 flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                <span>
                  SOP Step 5: System will generate unique QR code (`ILF-SHOP-XXX`), linked to Immense Life Foundation Razorpay account with automated 80G tax receipt generation.
                </span>
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-gray-600 hover:bg-gray-100 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-[#143D2B] hover:bg-[#0E2E20] text-white text-xs font-bold rounded-xl shadow-sm transition"
                >
                  Register Shop & Generate QR
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Partner Shop Modal (Requirement #2: Add, edit, view, search, and filter registered shops) */}
      {editingShop && (
        <div
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setEditingShop(null)}
        >
          <div
            className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full border border-[#E7E2D5] shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-gray-100 mb-5">
              <div>
                <h3 className="font-serif text-xl font-bold text-[#143D2B]">
                  Edit Partner Shop: {editingShop.name}
                </h3>
                <p className="text-[11px] text-gray-500">
                  Update counter details, GSTIN, or toggle Active/Inactive status
                </p>
              </div>
              <button
                onClick={() => setEditingShop(null)}
                className="p-1 rounded-full text-gray-400 hover:bg-gray-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                updateShop(editingShop.id, editingShop);
                setEditingShop(null);
                addToast(`Shop "${editingShop.name}" updated successfully!`, 'success');
              }}
              className="space-y-4"
            >
              <div>
                <label className="text-xs font-bold text-gray-700 block mb-1">Shop / Outlet Name</label>
                <input
                  type="text"
                  required
                  value={editingShop.name}
                  onChange={(e) => setEditingShop({ ...editingShop, name: e.target.value })}
                  className="w-full bg-[#FAF9F5] border border-gray-300 rounded-xl px-3.5 py-2 text-xs text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#143D2B]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-gray-700 block mb-1">Owner Name</label>
                  <input
                    type="text"
                    required
                    value={editingShop.owner}
                    onChange={(e) => setEditingShop({ ...editingShop, owner: e.target.value })}
                    className="w-full bg-[#FAF9F5] border border-gray-300 rounded-xl px-3.5 py-2 text-xs text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#143D2B]"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-700 block mb-1">Contact Phone</label>
                  <input
                    type="tel"
                    required
                    value={editingShop.phone}
                    onChange={(e) => setEditingShop({ ...editingShop, phone: e.target.value })}
                    className="w-full bg-[#FAF9F5] border border-gray-300 rounded-xl px-3.5 py-2 text-xs text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#143D2B]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-gray-700 block mb-1">Email Address</label>
                  <input
                    type="email"
                    value={editingShop.email || ''}
                    onChange={(e) => setEditingShop({ ...editingShop, email: e.target.value })}
                    className="w-full bg-[#FAF9F5] border border-gray-300 rounded-xl px-3.5 py-2 text-xs text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#143D2B]"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-700 block mb-1">GSTIN</label>
                  <input
                    type="text"
                    value={editingShop.gstin || ''}
                    onChange={(e) => setEditingShop({ ...editingShop, gstin: e.target.value.toUpperCase() })}
                    className="w-full bg-[#FAF9F5] border border-gray-300 rounded-xl px-3.5 py-2 text-xs font-mono uppercase text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#143D2B]"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-gray-700 block mb-1">Counter Location / City</label>
                <input
                  type="text"
                  required
                  value={editingShop.location}
                  onChange={(e) => setEditingShop({ ...editingShop, location: e.target.value })}
                  className="w-full bg-[#FAF9F5] border border-gray-300 rounded-xl px-3.5 py-2 text-xs text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#143D2B]"
                />
              </div>

              {/* Status Toggle (Active vs Inactive) */}
              <div>
                <label className="text-xs font-bold text-gray-700 block mb-1">
                  Shop Operational Status <span className="text-red-500">*</span>
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setEditingShop({ ...editingShop, status: 'Active' })}
                    className={`py-2 px-3 rounded-xl border text-xs font-bold transition flex items-center justify-center gap-1.5 ${
                      editingShop.status === 'Active'
                        ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                        : 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100'
                    }`}
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Active (Accepts Payments)</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setEditingShop({ ...editingShop, status: 'Inactive' })}
                    className={`py-2 px-3 rounded-xl border text-xs font-bold transition flex items-center justify-center gap-1.5 ${
                      editingShop.status === 'Inactive'
                        ? 'bg-red-600 text-white border-red-600 shadow-xs'
                        : 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100'
                    }`}
                  >
                    <AlertCircle className="w-4 h-4" />
                    <span>Inactive (Blocks Payments)</span>
                  </button>
                </div>
                <p className="text-[10px] text-gray-500 mt-1">
                  * Note: Inactive shops will immediately be blocked from processing new customer payments on the QR payment page.
                </p>
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setEditingShop(null)}
                  className="px-4 py-2 text-xs font-semibold text-gray-600 hover:bg-gray-100 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-[#143D2B] hover:bg-[#0E2E20] text-white text-xs font-bold rounded-xl shadow-sm transition"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
