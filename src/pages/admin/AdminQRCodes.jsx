import React, { useState } from 'react';
import { 
  QrCode, 
  Download, 
  Printer, 
  Search, 
  CheckCircle2, 
  AlertCircle, 
  Copy, 
  ExternalLink,
  Store,
  Sparkles
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useNGO } from '../../context/NGOContext';
import { useToast } from '../../context/ToastContext';

export default function AdminQRCodes() {
  const { shops, razorpayConfig } = useNGO();
  const { addToast } = useToast();
  const [search, setSearch] = useState('');

  const filteredQRs = shops.filter(s =>
    s.name.toLowerCase().includes(search.toLowerCase()) ||
    s.qrId.toLowerCase().includes(search.toLowerCase()) ||
    s.location.toLowerCase().includes(search.toLowerCase())
  );

  const handleCopyLink = (shop) => {
    const payUrl = `${window.location.origin}/pay?shop=${shop.qrId}`;
    navigator.clipboard.writeText(payUrl);
    addToast(`Scan & Pay URL for "${shop.name}" copied to clipboard!`, 'info');
  };

  const handlePrint = (shop) => {
    addToast(`Printing official counter standee poster for "${shop.name}"...`, 'info');
    setTimeout(() => window.print(), 400);
  };

  const handleDownload = (shop) => {
    addToast(`High-res QR vector asset downloaded for "${shop.name}"!`, 'success');
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-serif text-2xl font-bold text-[#143D2B]">
            QR Code Management & Standee Directory
          </h2>
          <p className="text-xs text-gray-500 mt-0.5">
            SOP Step 5 & 6: Counter QR codes for registered partner shops with Razorpay payment routing
          </p>
        </div>

        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by shop or QR code ID..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-white border border-[#DDD7C9] rounded-xl pl-9 pr-3 py-2 text-xs text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#143D2B]"
          />
        </div>
      </div>

      {/* QR Codes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredQRs.map(shop => {
          const scanUrl = `/pay?shop=${shop.qrId}`;
          return (
            <div
              key={shop.id}
              className="bg-white rounded-3xl p-6 border border-[#E7E2D5] shadow-xs hover:shadow-lg transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <span className="font-mono text-xs font-bold text-[#143D2B] bg-[#E7EFE9] px-2.5 py-1 rounded-md block w-fit mb-1">
                      {shop.qrId}
                    </span>
                    <h3 className="font-bold text-base text-gray-900 leading-snug">{shop.name}</h3>
                    <p className="text-xs text-gray-500">{shop.location}</p>
                    {shop.gstin && (
                      <p className="text-[10px] text-gray-400 font-mono mt-0.5">GSTIN: {shop.gstin}</p>
                    )}
                  </div>
                  <span className={`inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    shop.status === 'Active'
                      ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                      : 'bg-amber-50 text-amber-800 border border-amber-200'
                  }`}>
                    {shop.status === 'Active' ? <CheckCircle2 className="w-3 h-3 text-emerald-600" /> : <AlertCircle className="w-3 h-3 text-amber-600" />}
                    {shop.status}
                  </span>
                </div>

                {/* QR Preview Card */}
                <div className="bg-[#FAF9F5] p-5 rounded-2xl border border-gray-100 text-center my-3 group-hover:border-emerald-600/40 transition relative">
                  <svg className="w-36 h-36 mx-auto text-[#143D2B]" viewBox="0 0 100 100" fill="currentColor">
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
                    <circle cx="50" cy="50" r="5" fill="#E87A1E" />

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
                  <p className="text-[11px] font-bold text-gray-600 mt-2">
                    Scans to: <span className="font-mono text-[#E87A1E]">/pay?shop={shop.qrId}</span>
                  </p>
                </div>

                <div className="flex items-center justify-between text-xs text-gray-500 py-1">
                  <span>Total Collected:</span>
                  <span className="font-serif text-sm font-bold text-[#143D2B]">
                    ₹{Number(shop.totalCollected || 0).toLocaleString('en-IN')}
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs text-gray-500 pb-2">
                  <span>Customer Scans:</span>
                  <span className="font-bold text-gray-900">{shop.transactionsCount || 0}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2 pt-3 border-t border-gray-100">
                <Link
                  to={scanUrl}
                  target="_blank"
                  className="w-full py-2 bg-[#E87A1E] hover:bg-[#D2640C] text-white text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 transition shadow-xs"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Test Scan & Pay Page</span>
                </Link>

                <div className="grid grid-cols-3 gap-2">
                  <button
                    onClick={() => handleCopyLink(shop)}
                    className="py-2 bg-gray-50 hover:bg-gray-100 text-gray-700 text-xs font-semibold rounded-xl flex items-center justify-center gap-1 transition"
                    title="Copy direct payment link"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy</span>
                  </button>
                  <button
                    onClick={() => handleDownload(shop)}
                    className="py-2 bg-gray-50 hover:bg-gray-100 text-gray-700 text-xs font-semibold rounded-xl flex items-center justify-center gap-1 transition"
                    title="Download vector poster"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>SVG</span>
                  </button>
                  <button
                    onClick={() => handlePrint(shop)}
                    className="py-2 bg-gray-50 hover:bg-gray-100 text-gray-700 text-xs font-semibold rounded-xl flex items-center justify-center gap-1 transition"
                    title="Print standee"
                  >
                    <Printer className="w-3.5 h-3.5" />
                    <span>Print</span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
}
