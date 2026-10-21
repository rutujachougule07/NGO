import React, { useState } from 'react';
import { 
  QrCode, 
  Search, 
  Download, 
  Printer, 
  RefreshCw, 
  Slash, 
  CheckCircle2, 
  AlertCircle, 
  ExternalLink, 
  Copy, 
  Eye, 
  Store,
  Layers,
  Sparkles,
  ShieldCheck,
  X
} from 'lucide-react';
import { useAdmin } from '../../context/AdminContext';
import { useToast } from '../../context/ToastContext';

export default function AdminQRCodes() {
  const { 
    shops, 
    regenerateQR, 
    revokeQR, 
    setActivePrintStandeeModal 
  } = useAdmin();
  const { addToast } = useToast();

  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [confirmModal, setConfirmModal] = useState(null); // { type: 'regenerate' | 'revoke', shop: ... }
  const [selectedShopDetail, setSelectedShopDetail] = useState(null);

  const filteredShops = shops.filter(s => {
    const matchesSearch = 
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.qrId.toLowerCase().includes(search.toLowerCase()) ||
      s.city.toLowerCase().includes(search.toLowerCase()) ||
      s.id.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === 'All' || s.qrStatus === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleCopyLink = (shop) => {
    const payUrl = `${window.location.origin}/pay/${shop.qrId}`;
    navigator.clipboard.writeText(payUrl);
    addToast(`Payment link for ${shop.name} copied! (${payUrl})`, 'info');
  };

  const handleDownloadSVG = (shop) => {
    addToast(`High-resolution SVG QR Code Standee downloaded for ${shop.name}!`, 'success');
  };

  const handleConfirmAction = () => {
    if (!confirmModal) return;
    if (confirmModal.type === 'regenerate') {
      regenerateQR(confirmModal.shop.id);
    } else if (confirmModal.type === 'revoke') {
      revokeQR(confirmModal.shop.id);
    }
    setConfirmModal(null);
  };

  return (
    <div className="space-y-6 text-left pb-10">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#FFF2E3] text-[#A34805] text-xs font-bold mb-1 border border-[#F5DEC8]">
            <QrCode className="w-3.5 h-3.5" />
            <span>Counter Standee Network • Module #5</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-black text-[#381602]">
            QR Code Standee Management
          </h2>
          <p className="text-xs text-stone-500 mt-0.5">
            Cryptographic UPI QR standees mapped to partner retail counters, dynamic payment URLs, and instant 80G tax certificates
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1.5 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-xl text-xs font-bold flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>{shops.filter(s => s.qrStatus === 'Active').length} Active Standees</span>
          </span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-[#F3DEC8] shadow-xs flex flex-col md:flex-row items-center justify-between gap-3">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by QR token, shop name, city..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full bg-[#FFFDF9] border border-[#DDD7C9] rounded-xl pl-9 pr-3 py-2 text-xs text-stone-800 focus:outline-none focus:ring-2 focus:ring-[#E87A1E]"
          />
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          <span className="text-xs text-stone-500 font-semibold">QR Status:</span>
          <select
            value={statusFilter}
            onChange={e => setStatusFilter(e.target.value)}
            className="bg-[#FFFDF9] border border-[#DDD7C9] rounded-xl px-3 py-1.5 text-xs text-stone-700 focus:outline-none focus:ring-1 focus:ring-[#E87A1E]"
          >
            <option value="All">All Statuses</option>
            <option value="Active">Active</option>
            <option value="Suspended">Suspended</option>
            <option value="Revoked">Revoked</option>
          </select>

          <span className="text-xs font-bold text-stone-400">
            {filteredShops.length} Counters
          </span>
        </div>
      </div>

      {/* Standees Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {filteredShops.map(shop => {
          const isRevoked = shop.qrStatus === 'Revoked';
          const isSuspended = shop.qrStatus === 'Suspended';
          const payUrl = `${window.location.origin}/pay/${shop.qrId}`;

          return (
            <div
              key={shop.id}
              className={`bg-white rounded-3xl p-5 border shadow-xs hover:shadow-md transition flex flex-col justify-between relative overflow-hidden ${
                isRevoked
                  ? 'border-red-200 bg-red-50/20'
                  : isSuspended
                  ? 'border-amber-200 bg-amber-50/20'
                  : 'border-[#F3DEC8] hover:border-[#E87A1E]/50'
              }`}
            >
              {/* Top Meta */}
              <div>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div className="flex items-center gap-1.5">
                    <span className="px-2 py-0.5 rounded-md font-mono text-[10px] font-bold bg-[#FFF2E3] text-[#A34805] border border-[#F5DEC8]">
                      {shop.qrId}
                    </span>
                    <span className="text-[10px] text-stone-400">{shop.id}</span>
                  </div>

                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                    shop.qrStatus === 'Active'
                      ? 'bg-emerald-100 text-emerald-800'
                      : shop.qrStatus === 'Suspended'
                      ? 'bg-amber-100 text-amber-800'
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {shop.qrStatus}
                  </span>
                </div>

                <h3 className="font-bold text-sm text-[#381602] truncate" title={shop.name}>
                  {shop.name}
                </h3>
                <p className="text-[11px] text-stone-500 truncate">
                  {shop.city} • Owner: {shop.owner}
                </p>

                {/* QR Preview Card */}
                <div className="my-4 p-4 rounded-2xl bg-gradient-to-b from-[#FFFDF9] to-stone-100 border border-stone-200 flex flex-col items-center justify-center relative group">
                  
                  {/* Simulated QR Code Graphic */}
                  <div className="p-2.5 bg-white rounded-xl shadow-xs border border-stone-200 relative">
                    <svg className="w-28 h-28" viewBox="0 0 100 100" fill="none">
                      <rect width="100" height="100" fill="white" />
                      {/* Corner Position Detectors */}
                      <rect x="5" y="5" width="26" height="26" rx="4" fill="#381602" />
                      <rect x="10" y="10" width="16" height="16" rx="2" fill="white" />
                      <rect x="14" y="14" width="8" height="8" rx="1" fill="#E87A1E" />

                      <rect x="69" y="5" width="26" height="26" rx="4" fill="#381602" />
                      <rect x="74" y="10" width="16" height="16" rx="2" fill="white" />
                      <rect x="78" y="14" width="8" height="8" rx="1" fill="#E87A1E" />

                      <rect x="5" y="69" width="26" height="26" rx="4" fill="#381602" />
                      <rect x="10" y="74" width="16" height="16" rx="2" fill="white" />
                      <rect x="14" y="78" width="8" height="8" rx="1" fill="#E87A1E" />

                      {/* Random Matrix Modules */}
                      <g fill="#381602">
                        <rect x="36" y="8" width="5" height="5" rx="1" />
                        <rect x="46" y="8" width="5" height="5" rx="1" />
                        <rect x="56" y="8" width="5" height="5" rx="1" />
                        <rect x="36" y="20" width="5" height="5" rx="1" />
                        <rect x="56" y="20" width="5" height="5" rx="1" />

                        <rect x="8" y="36" width="5" height="5" rx="1" />
                        <rect x="20" y="36" width="5" height="5" rx="1" />
                        <rect x="68" y="36" width="5" height="5" rx="1" />
                        <rect x="80" y="36" width="5" height="5" rx="1" />

                        <rect x="8" y="48" width="5" height="5" rx="1" />
                        <rect x="20" y="48" width="5" height="5" rx="1" />
                        <rect x="68" y="48" width="5" height="5" rx="1" />
                        <rect x="80" y="48" width="5" height="5" rx="1" />

                        <rect x="36" y="68" width="5" height="5" rx="1" />
                        <rect x="46" y="68" width="5" height="5" rx="1" />
                        <rect x="56" y="68" width="5" height="5" rx="1" />
                        <rect x="68" y="78" width="5" height="5" rx="1" />
                        <rect x="80" y="78" width="5" height="5" rx="1" />
                      </g>

                      {/* Center Emblem */}
                      <circle cx="50" cy="50" r="11" fill="white" stroke="#E87A1E" strokeWidth="1.5" />
                      <circle cx="50" cy="50" r="6" fill="#E87A1E" />
                    </svg>

                    {isRevoked && (
                      <div className="absolute inset-0 bg-red-900/80 rounded-xl flex items-center justify-center text-white text-xs font-bold">
                        REVOKED
                      </div>
                    )}
                  </div>

                  <div className="mt-2 text-center">
                    <span className="text-[10px] text-stone-500 font-medium">
                      Registered: {shop.registeredDate}
                    </span>
                    <div className="text-[9px] text-[#A34805] font-bold mt-0.5">
                      Target: {shop.targetCause}
                    </div>
                  </div>
                </div>

                {/* Metrics */}
                <div className="grid grid-cols-2 gap-2 text-[11px] mb-3 p-2.5 rounded-xl bg-stone-50 border border-stone-200">
                  <div>
                    <span className="text-stone-400 block text-[9px] uppercase">Raised</span>
                    <span className="font-bold text-[#E87A1E]">₹{shop.totalCollected.toLocaleString('en-IN')}</span>
                  </div>
                  <div>
                    <span className="text-stone-400 block text-[9px] uppercase">Transactions</span>
                    <span className="font-bold text-stone-800">{shop.transactionsCount} scans</span>
                  </div>
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="space-y-2 pt-2 border-t border-stone-100">
                <div className="grid grid-cols-2 gap-1.5">
                  <button
                    onClick={() => setActivePrintStandeeModal(shop)}
                    className="py-1.5 px-2 bg-stone-900 hover:bg-stone-800 text-white rounded-xl text-xs font-bold transition flex items-center justify-center gap-1 shadow-2xs"
                  >
                    <Printer className="w-3.5 h-3.5 text-[#E87A1E]" />
                    <span>Print</span>
                  </button>
                  <button
                    onClick={() => handleDownloadSVG(shop)}
                    className="py-1.5 px-2 bg-stone-100 hover:bg-[#FFF2E3] text-stone-800 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1 border border-stone-200"
                  >
                    <Download className="w-3.5 h-3.5 text-emerald-600" />
                    <span>SVG</span>
                  </button>
                </div>

                <div className="flex items-center justify-between text-xs pt-1">
                  <button
                    onClick={() => handleCopyLink(shop)}
                    className="text-[#A34805] hover:text-[#381602] font-semibold text-[11px] flex items-center gap-1"
                  >
                    <Copy className="w-3 h-3" />
                    <span>Copy URL</span>
                  </button>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => setConfirmModal({ type: 'regenerate', shop })}
                      className="p-1 rounded text-stone-500 hover:text-stone-900 hover:bg-stone-100"
                      title="Regenerate QR Token"
                    >
                      <RefreshCw className="w-3.5 h-3.5" />
                    </button>
                    {!isRevoked && (
                      <button
                        onClick={() => setConfirmModal({ type: 'revoke', shop })}
                        className="p-1 rounded text-stone-400 hover:text-red-600 hover:bg-red-50"
                        title="Revoke / Deactivate QR"
                      >
                        <Slash className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>
              </div>

            </div>
          );
        })}
      </div>

      {/* Confirmation Dialog for Regenerate or Revoke */}
      {confirmModal && (
        <div className="fixed inset-0 z-50 bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-sm w-full border border-stone-200 shadow-2xl text-center space-y-4 animate-in fade-in zoom-in-95">
            <div className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto ${
              confirmModal.type === 'regenerate' ? 'bg-amber-100 text-amber-600' : 'bg-red-100 text-red-600'
            }`}>
              {confirmModal.type === 'regenerate' ? <RefreshCw className="w-6 h-6" /> : <Slash className="w-6 h-6" />}
            </div>

            <div>
              <h4 className="font-serif text-lg font-bold text-stone-900">
                {confirmModal.type === 'regenerate' ? 'Regenerate QR Code Standee?' : 'Revoke & Disable QR Code?'}
              </h4>
              <p className="text-xs text-stone-500 mt-1">
                {confirmModal.type === 'regenerate'
                  ? `This will create a new cryptographic payment token for ${confirmModal.shop.name}. Existing physical standees must be replaced.`
                  : `Are you sure you want to revoke the QR standee for ${confirmModal.shop.name}? Donors scanning this standee will no longer be able to donate.`}
              </p>
            </div>

            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                onClick={() => setConfirmModal(null)}
                className="px-4 py-2 bg-stone-100 hover:bg-stone-200 rounded-xl text-xs font-semibold text-stone-700"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmAction}
                className={`px-5 py-2 rounded-xl text-xs font-bold text-white shadow-sm ${
                  confirmModal.type === 'regenerate' ? 'bg-[#E87A1E] hover:bg-[#D2640C]' : 'bg-red-600 hover:bg-red-700'
                }`}
              >
                {confirmModal.type === 'regenerate' ? 'Regenerate Standee' : 'Confirm Revoke'}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
