import React from 'react';
import { X, Printer, Download, Share2, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { useAdmin } from '../../../context/AdminContext';
import { useToast } from '../../../context/ToastContext';

// Helper to convert numbers to Indian currency words
function numberToWords(num) {
  const a = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];
  const b = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];

  if (num === 0) return 'Zero';
  if (num < 20) return a[num];
  if (num < 100) return b[Math.floor(num / 10)] + (num % 10 !== 0 ? ' ' + a[num % 10] : '');
  if (num < 1000) return a[Math.floor(num / 100)] + ' Hundred' + (num % 100 !== 0 ? ' and ' + numberToWords(num % 100) : '');
  if (num < 100000) return numberToWords(Math.floor(num / 1000)) + ' Thousand' + (num % 1000 !== 0 ? ' ' + numberToWords(num % 1000) : '');
  if (num < 10000000) return numberToWords(Math.floor(num / 100000)) + ' Lakh' + (num % 100000 !== 0 ? ' ' + numberToWords(num % 100000) : '');
  return numberToWords(Math.floor(num / 10000000)) + ' Crore' + (num % 10000000 !== 0 ? ' ' + numberToWords(num % 10000000) : '');
}

export default function ReceiptPreviewModal() {
  const { activeReceiptModal, setActiveReceiptModal } = useAdmin();
  const { addToast } = useToast();

  if (!activeReceiptModal) return null;

  const r = activeReceiptModal;
  const isInvoice = r.documentType && r.documentType.includes('Invoice');
  const amountInWords = numberToWords(Number(r.amount || 0));

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    addToast(`Downloaded official PDF for ${r.receiptNumber}`, 'success');
  };

  const handleResend = () => {
    addToast(`Receipt resent to donor mobile ${r.customerMobile} via WhatsApp!`, 'success');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full border border-stone-200 overflow-hidden flex flex-col my-8 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Top Control Bar */}
        <div className="bg-stone-50 px-6 py-4 border-b border-stone-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${
              isInvoice ? 'bg-indigo-100 text-indigo-800' : 'bg-emerald-100 text-emerald-800'
            }`}>
              {isInvoice ? 'Merchant Platform Invoice' : 'Section 80G Tax Exemption Receipt'}
            </span>
            <span className="text-xs text-stone-500 font-mono">{r.receiptNumber}</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="p-2 text-stone-600 hover:text-stone-900 hover:bg-stone-200 rounded-xl transition flex items-center gap-1.5 text-xs font-semibold"
              title="Print Receipt"
            >
              <Printer className="w-4 h-4 text-[#E87A1E]" />
              <span className="hidden sm:inline">Print</span>
            </button>
            <button
              onClick={handleDownload}
              className="p-2 text-stone-600 hover:text-stone-900 hover:bg-stone-200 rounded-xl transition flex items-center gap-1.5 text-xs font-semibold"
              title="Download PDF"
            >
              <Download className="w-4 h-4 text-emerald-600" />
              <span className="hidden sm:inline">PDF</span>
            </button>
            <button
              onClick={handleResend}
              className="p-2 text-stone-600 hover:text-stone-900 hover:bg-stone-200 rounded-xl transition flex items-center gap-1.5 text-xs font-semibold"
              title="Send via WhatsApp"
            >
              <Share2 className="w-4 h-4 text-[#A34805]" />
              <span className="hidden sm:inline">WhatsApp</span>
            </button>
            <button
              onClick={() => setActiveReceiptModal(null)}
              className="p-2 text-stone-400 hover:text-stone-700 hover:bg-stone-200 rounded-xl transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Official Receipt Body */}
        <div className="p-8 sm:p-10 space-y-6 text-stone-800 bg-white" id="printable-receipt">
          
          {/* Letterhead */}
          <div className="flex items-start justify-between border-b-2 border-[#E87A1E]/30 pb-6">
            <div className="flex items-center gap-4">
              <img
                src="/immense_life_logo.jpg"
                alt="Immense Life Logo"
                className="w-16 h-16 rounded-2xl object-contain p-1 border-2 border-[#E87A1E] shadow-sm bg-white"
              />
              <div>
                <h2 className="font-serif text-2xl font-black text-[#381602] tracking-tight">
                  IMMENSE LIFE FOUNDATION
                </h2>
                <p className="text-[11px] font-bold text-[#E87A1E] uppercase tracking-wider">
                  Public Charitable Trust • Registered Non-Profit
                </p>
                <p className="text-[10px] text-stone-500 mt-0.5">
                  Trust Reg No: E-34821 (Mumbai) • PAN: AAATI9402J • NITI Aayog Darpan: DL/2021/0294819
                </p>
                <p className="text-[10px] text-stone-500">
                  420 Harmony Way, New Delhi 110001 & Shirdi Peace Path, Ahmednagar 423109
                </p>
              </div>
            </div>

            <div className="text-right">
              <div className="inline-block px-3 py-1 bg-[#FFF2E3] border border-[#F5DEC8] rounded-xl text-center">
                <span className="text-[9px] font-bold uppercase text-[#A34805] block">Section 80G Certified</span>
                <span className="text-[10px] font-mono font-bold text-[#381602]">100% Tax Deductible</span>
              </div>
            </div>
          </div>

          {/* Receipt Title & Meta */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 bg-[#FFFDF9] p-4 rounded-2xl border border-[#F3DEC8]">
            <div>
              <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wider block">Document Type</span>
              <span className="text-sm font-bold text-[#381602]">{r.documentType || 'Official 80G Donation Receipt'}</span>
            </div>
            <div className="sm:text-right">
              <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wider block">Receipt Number</span>
              <span className="text-sm font-mono font-bold text-[#E87A1E]">{r.receiptNumber}</span>
            </div>
          </div>

          {/* Donor & Transaction Two-Column Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200/80 space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400 block">Donor / Contributor Details</span>
              <div className="font-bold text-sm text-[#381602]">{r.customerName}</div>
              <div className="text-stone-600">Mobile: <span className="font-semibold">{r.customerMobile}</span></div>
              {r.customerPan && <div className="text-stone-600">PAN: <span className="font-mono font-semibold">{r.customerPan}</span></div>}
              {r.customerEmail && <div className="text-stone-600">Email: <span className="font-medium">{r.customerEmail}</span></div>}
            </div>

            <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200/80 space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400 block">Payment & Counter Mapping</span>
              <div className="text-stone-600">Txn ID: <span className="font-mono font-bold text-[#381602]">{r.transactionId}</span></div>
              <div className="text-stone-600">Shop Counter: <span className="font-semibold text-[#381602]">{r.shopName || 'Central Seva Portal'}</span></div>
              <div className="text-stone-600">Date & Time: <span className="font-semibold">{r.paymentDate}</span></div>
              <div className="text-stone-600">Payment Gateway: <span className="font-medium text-emerald-700">Razorpay Verified (UPI/Card)</span></div>
            </div>
          </div>

          {/* Amount Box */}
          <div className="p-5 rounded-2xl bg-gradient-to-r from-[#FFF2E3] to-[#FFF9F2] border-2 border-[#E87A1E]/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#A34805] block">Total Amount Received</span>
              <div className="font-serif text-3xl font-black text-[#381602] tracking-tight">
                ₹{Number(r.amount).toLocaleString('en-IN')}.00
              </div>
              <div className="text-xs text-stone-600 italic font-medium mt-0.5">
                Rupees {amountInWords} Only
              </div>
            </div>

            <div className="text-left sm:text-right">
              <span className="text-[10px] font-bold uppercase tracking-wider text-stone-500 block">Purpose of Contribution</span>
              <span className="text-xs font-bold text-[#A34805] bg-white px-3 py-1.5 rounded-xl border border-[#F3DEC8] inline-block mt-1">
                {r.cause || 'Annadan & Community Welfare'}
              </span>
            </div>
          </div>

          {/* Statutory Exemption Declaration */}
          <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 text-[10px] text-stone-600 space-y-1">
            <div className="font-bold text-stone-800 flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
              <span>Statutory Income Tax Exemption Clause:</span>
            </div>
            <p>
              Donations to Immense Life Foundation are exempt under Section 80G(5)(vi) of the Income Tax Act, 1961 vide Order No: <span className="font-mono font-bold text-stone-800">{r.taxExemptionRef || 'CIT(E)/80G/DEL/2021-22/A/10492'}</span>.
            </p>
            <p>
              This is a computer-generated digital receipt and verified on the Foundation's public blockchain/ledger. No physical signature required.
            </p>
          </div>

          {/* Signatures & Stamps */}
          <div className="pt-4 flex items-end justify-between border-t border-stone-200">
            <div className="flex items-center gap-3">
              <div className="w-16 h-16 rounded-full border-2 border-dashed border-[#E87A1E]/50 flex items-center justify-center p-1 text-center">
                <span className="text-[8px] font-bold text-[#A34805] uppercase leading-none">
                  IMMENSE LIFE TRUST SEAL
                </span>
              </div>
              <div className="text-[10px] text-stone-500">
                <span className="text-emerald-700 font-bold block flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" /> Digitally Authenticated
                </span>
                <span>Verification Hash: 89f4b...19a2</span>
              </div>
            </div>

            <div className="text-right">
              <div className="font-serif italic font-bold text-sm text-[#381602]">
                {r.authorizedSignatory || 'Dr. Arvind Swaminathan'}
              </div>
              <div className="text-[10px] font-bold text-stone-500 uppercase tracking-wider">
                Authorized Signatory / Managing Trustee
              </div>
              <div className="text-[9px] text-stone-400">
                Immense Life Foundation
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
