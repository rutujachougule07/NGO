import React from 'react';
import { X, Printer, Download, Copy, ExternalLink, QrCode, ShieldCheck, Heart, Sparkles } from 'lucide-react';
import { useAdmin } from '../../../context/AdminContext';
import { useToast } from '../../../context/ToastContext';

export default function QRStandeeModal() {
  const { activePrintStandeeModal, setActivePrintStandeeModal } = useAdmin();
  const { addToast } = useToast();

  if (!activePrintStandeeModal) return null;

  const shop = activePrintStandeeModal;
  const payUrl = `${window.location.origin}/pay/${shop.qrId}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(payUrl);
    addToast(`Customer payment link copied: ${payUrl}`, 'info');
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    addToast(`Downloaded high-res printable standee artwork for ${shop.name}!`, 'success');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl max-w-lg w-full border border-stone-200 overflow-hidden flex flex-col my-8 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Top Control Bar */}
        <div className="bg-stone-50 px-6 py-4 border-b border-stone-200 flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-[#381602]">Merchant Counter Standee</span>
            <div className="text-[10px] text-stone-500 font-mono">{shop.qrId} • {shop.name}</div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="p-2 text-stone-600 hover:text-stone-900 hover:bg-stone-200 rounded-xl transition flex items-center gap-1.5 text-xs font-semibold"
            >
              <Printer className="w-4 h-4 text-[#E87A1E]" />
              <span className="hidden sm:inline">Print Standee</span>
            </button>
            <button
              onClick={handleDownload}
              className="p-2 text-stone-600 hover:text-stone-900 hover:bg-stone-200 rounded-xl transition flex items-center gap-1.5 text-xs font-semibold"
            >
              <Download className="w-4 h-4 text-emerald-600" />
              <span className="hidden sm:inline">Artwork</span>
            </button>
            <button
              onClick={() => setActivePrintStandeeModal(null)}
              className="p-2 text-stone-400 hover:text-stone-700 hover:bg-stone-200 rounded-xl transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Realistic Counter Acrylic Stand Display */}
        <div className="p-6 sm:p-8 flex justify-center bg-stone-100">
          <div 
            id="printable-standee" 
            className="w-full max-w-sm bg-white rounded-3xl p-6 shadow-xl border-4 border-[#E87A1E] flex flex-col items-center text-center relative overflow-hidden"
          >
            {/* Top Badge */}
            <div className="w-full bg-[#381602] text-white py-2 px-4 rounded-2xl flex items-center justify-between mb-4 shadow-sm">
              <div className="flex items-center gap-2">
                <img
                  src="/immense_life_logo.jpg"
                  alt="Logo"
                  className="w-6 h-6 rounded-full bg-white p-0.5 object-contain"
                />
                <span className="font-serif font-black text-xs tracking-wider">IMMENSE LIFE</span>
              </div>
              <span className="text-[9px] font-bold uppercase tracking-wider text-[#F4A261] bg-[#4D2408] px-2 py-0.5 rounded-full">
                80G Certified Seva
              </span>
            </div>

            {/* Headline */}
            <h3 className="font-serif text-lg font-black text-[#381602] leading-snug">
              Support Seva While You Shop
            </h3>
            <p className="text-[11px] text-stone-600 mt-1 max-w-xs">
              Every small contribution brings hot sanctified meals, child education, and mobile healthcare to rural families.
            </p>

            {/* Partner Shop Box */}
            <div className="my-3 py-1.5 px-4 bg-[#FFF2E3] rounded-xl border border-[#F5DEC8] inline-block">
              <span className="text-[9px] font-bold uppercase text-[#A34805] block">Partner Counter</span>
              <span className="text-xs font-bold text-[#381602]">{shop.name}</span>
            </div>

            {/* QR Code Container with Centered Logo */}
            <div className="relative p-4 bg-white rounded-2xl border-2 border-[#E87A1E]/40 shadow-inner my-2">
              <svg className="w-48 h-48" viewBox="0 0 200 200" fill="none">
                {/* Simulated high-quality QR grid */}
                <rect width="200" height="200" fill="white" />
                {/* Corner Eyes */}
                <rect x="15" y="15" width="45" height="45" rx="8" fill="#381602" />
                <rect x="23" y="23" width="29" height="29" rx="4" fill="white" />
                <rect x="29" y="29" width="17" height="17" rx="2" fill="#E87A1E" />

                <rect x="140" y="15" width="45" height="45" rx="8" fill="#381602" />
                <rect x="148" y="23" width="29" height="29" rx="4" fill="white" />
                <rect x="154" y="29" width="17" height="17" rx="2" fill="#E87A1E" />

                <rect x="15" y="140" width="45" height="45" rx="8" fill="#381602" />
                <rect x="23" y="148" width="29" height="29" rx="4" fill="white" />
                <rect x="29" y="154" width="17" height="17" rx="2" fill="#E87A1E" />

                {/* Data Matrix Dots */}
                <g fill="#381602">
                  <rect x="75" y="20" width="8" height="8" rx="2" />
                  <rect x="90" y="20" width="8" height="8" rx="2" />
                  <rect x="105" y="20" width="8" height="8" rx="2" />
                  <rect x="120" y="20" width="8" height="8" rx="2" />

                  <rect x="75" y="35" width="8" height="8" rx="2" />
                  <rect x="105" y="35" width="8" height="8" rx="2" />
                  <rect x="120" y="45" width="8" height="8" rx="2" />

                  <rect x="20" y="75" width="8" height="8" rx="2" />
                  <rect x="35" y="75" width="8" height="8" rx="2" />
                  <rect x="50" y="75" width="8" height="8" rx="2" />
                  <rect x="75" y="75" width="8" height="8" rx="2" />
                  <rect x="135" y="75" width="8" height="8" rx="2" />
                  <rect x="150" y="75" width="8" height="8" rx="2" />
                  <rect x="165" y="75" width="8" height="8" rx="2" />

                  <rect x="20" y="90" width="8" height="8" rx="2" />
                  <rect x="50" y="90" width="8" height="8" rx="2" />
                  <rect x="135" y="90" width="8" height="8" rx="2" />
                  <rect x="165" y="90" width="8" height="8" rx="2" />

                  <rect x="20" y="105" width="8" height="8" rx="2" />
                  <rect x="35" y="105" width="8" height="8" rx="2" />
                  <rect x="50" y="105" width="8" height="8" rx="2" />
                  <rect x="75" y="105" width="8" height="8" rx="2" />
                  <rect x="135" y="105" width="8" height="8" rx="2" />
                  <rect x="165" y="105" width="8" height="8" rx="2" />

                  <rect x="75" y="135" width="8" height="8" rx="2" />
                  <rect x="90" y="135" width="8" height="8" rx="2" />
                  <rect x="105" y="135" width="8" height="8" rx="2" />
                  <rect x="120" y="135" width="8" height="8" rx="2" />
                  <rect x="135" y="135" width="8" height="8" rx="2" />

                  <rect x="75" y="150" width="8" height="8" rx="2" />
                  <rect x="105" y="150" width="8" height="8" rx="2" />
                  <rect x="150" y="150" width="8" height="8" rx="2" />
                  <rect x="165" y="150" width="8" height="8" rx="2" />

                  <rect x="75" y="165" width="8" height="8" rx="2" />
                  <rect x="90" y="165" width="8" height="8" rx="2" />
                  <rect x="120" y="165" width="8" height="8" rx="2" />
                  <rect x="135" y="165" width="8" height="8" rx="2" />
                </g>

                {/* Central Emblem */}
                <circle cx="100" cy="100" r="22" fill="white" stroke="#E87A1E" strokeWidth="2.5" />
                <path d="M100 110 C100 110 93 105 93 99 C93 95 96 93 100 96 C104 93 107 95 107 99 C107 105 100 110 100 110 Z" fill="#E87A1E" />
              </svg>

              <div className="mt-1 text-[10px] font-mono font-bold text-stone-500">
                {shop.qrId}
              </div>
            </div>

            {/* UPI Payment Instructions */}
            <div className="w-full mt-2">
              <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wider block">
                Scan with any UPI App
              </span>
              <div className="flex items-center justify-center gap-2 mt-1 text-[11px] font-bold text-stone-700">
                <span className="px-2 py-0.5 bg-stone-100 rounded-md">GPay</span>
                <span className="px-2 py-0.5 bg-stone-100 rounded-md">PhonePe</span>
                <span className="px-2 py-0.5 bg-stone-100 rounded-md">Paytm</span>
                <span className="px-2 py-0.5 bg-stone-100 rounded-md">BHIM</span>
              </div>
            </div>

            {/* Bottom 80G Footer note */}
            <div className="mt-4 pt-3 border-t border-stone-200 w-full flex items-center justify-between text-[9px] text-stone-500">
              <span className="flex items-center gap-1 font-semibold text-emerald-700">
                <ShieldCheck className="w-3 h-3" /> Sec 80G Tax Deductible
              </span>
              <span>Instant SMS Receipt</span>
            </div>
          </div>
        </div>

        {/* Footer Link Details */}
        <div className="p-4 bg-stone-50 border-t border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <div className="truncate max-w-xs font-mono text-[11px] text-stone-600">
            {payUrl}
          </div>
          <button
            onClick={handleCopyLink}
            className="px-4 py-2 bg-stone-900 hover:bg-stone-800 text-white rounded-xl flex items-center gap-1.5 font-semibold text-xs transition"
          >
            <Copy className="w-3.5 h-3.5" />
            <span>Copy Link</span>
          </button>
        </div>

      </div>
    </div>
  );
}
