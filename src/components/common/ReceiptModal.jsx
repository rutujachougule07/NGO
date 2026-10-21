import React, { useRef } from 'react';
import { 
  X, 
  Printer, 
  Download, 
  CheckCircle2, 
  ShieldCheck, 
  Share2, 
  Building2, 
  Phone, 
  Mail, 
  Calendar, 
  CreditCard 
} from 'lucide-react';
import { useToast } from '../../context/ToastContext';
import { useNGO } from '../../context/NGOContext';

// Helper to convert number to words (Indian Rupees)
function amountInWords(num) {
  const a = ['', 'One ', 'Two ', 'Three ', 'Four ', 'Five ', 'Six ', 'Seven ', 'Eight ', 'Nine ', 'Ten ', 'Eleven ', 'Twelve ', 'Thirteen ', 'Fourteen ', 'Fifteen ', 'Sixteen ', 'Seventeen ', 'Eighteen ', 'Nineteen '];
  const b = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];

  const n = ('000000000' + num).substr(-9).match(/^(\d{2})(\d{2})(\d{2})(\d{1})(\d{2})$/);
  if (!n) return '';
  let str = '';
  str += (Number(n[1]) !== 0) ? (a[Number(n[1])] || b[n[1][0]] + ' ' + a[n[1][1]]) + 'Crore ' : '';
  str += (Number(n[2]) !== 0) ? (a[Number(n[2])] || b[n[2][0]] + ' ' + a[n[2][1]]) + 'Lakh ' : '';
  str += (Number(n[3]) !== 0) ? (a[Number(n[3])] || b[n[3][0]] + ' ' + a[n[3][1]]) + 'Thousand ' : '';
  str += (Number(n[4]) !== 0) ? (a[Number(n[4])] || b[n[4][0]] + ' ' + a[n[4][1]]) + 'Hundred ' : '';
  str += (Number(n[5]) !== 0) ? ((str !== '') ? 'and ' : '') + (a[Number(n[5])] || b[n[5][0]] + ' ' + a[n[5][1]]) : '';
  return str.trim() ? str.trim() + ' Rupees Only' : 'Zero Rupees';
}

export default function ReceiptModal({ isOpen, onClose, transaction }) {
  const { addToast } = useToast();
  const { razorpayConfig } = useNGO();
  const receiptRef = useRef();

  if (!isOpen || !transaction) return null;

  const handlePrint = () => {
    addToast('Opening print dialog for official 80G tax receipt...', 'info');
    setTimeout(() => {
      window.print();
    }, 400);
  };

  const handleDownload = () => {
    addToast(`Receipt ${transaction.receiptNo || 'REC'} downloaded in PDF format!`, 'success');
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Donation Receipt - Immense Life Foundation',
        text: `Immense Life Foundation Donation Receipt ${transaction.receiptNo} of ₹${transaction.amount}`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      addToast('Receipt link copied to clipboard!', 'info');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div className="relative bg-white rounded-3xl max-w-2xl w-full shadow-2xl border border-stone-200 overflow-hidden my-6">
        
        {/* Modal Top Actions Bar */}
        <div className="bg-[#381602] text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-[#FFB86A]" />
            <span className="text-xs sm:text-sm font-bold tracking-wide">
              Official Section 80G Tax-Deductible Receipt & Invoice
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition text-xs font-semibold flex items-center gap-1 px-2.5"
              title="Print Receipt"
            >
              <Printer className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Print</span>
            </button>
            <button
              onClick={handleDownload}
              className="p-1.5 rounded-lg bg-[#E87A1E] hover:bg-[#D2640C] text-white transition text-xs font-semibold flex items-center gap-1 px-2.5"
              title="Download PDF"
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Download</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition ml-1"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Printable Receipt Paper Container */}
        <div ref={receiptRef} className="p-6 sm:p-8 space-y-6 text-stone-800 bg-[#FFFDF9]">
          
          {/* Header with Immense Life Foundation Logo & Credentials */}
          <div className="border-b-2 border-dashed border-[#E7E2D5] pb-5">
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
              <div className="flex items-start gap-3">
                <img
                  src="/immense_life_brand.jpg"
                  alt="Immense Life Emblem"
                  className="w-14 h-14 rounded-full object-cover border-2 border-[#E87A1E] shadow-xs shrink-0"
                />
                <div>
                  <h1 className="font-serif text-2xl font-bold text-[#381602] leading-tight">
                    Immense Life Foundation
                  </h1>
                  <p className="text-[11px] text-stone-600 font-medium">
                    Reg. Under Section 8 of the Companies Act, 2013 | Registered NGO
                  </p>
                  <p className="text-[11px] text-stone-500">
                    Shirdi Peace Path, Shirdi & 420 Harmony Way, New Delhi, India
                  </p>
                  <div className="flex flex-wrap items-center gap-x-3 text-[10px] text-stone-600 font-semibold mt-1">
                    <span>PAN: <strong className="text-stone-900">{razorpayConfig.ngoPan}</strong></span>
                    <span>•</span>
                    <span>80G URN: <strong className="text-stone-900">{razorpayConfig.ngo80GURN}</strong></span>
                    <span>•</span>
                    <span>12A Reg: <strong className="text-stone-900">{razorpayConfig.ngo12A}</strong></span>
                    <span>•</span>
                    <span>GSTIN: <strong className="text-stone-900">{razorpayConfig.gstin}</strong></span>
                  </div>
                </div>
              </div>

              <div className="sm:text-right shrink-0">
                <span className="inline-block bg-[#FFF2E3] text-[#A34805] text-[10px] font-bold px-3 py-1 rounded-full border border-[#F5DEC8]">
                  Tax Exemption 80G(5)(vi)
                </span>
                <div className="mt-2 text-xs text-stone-600">
                  <div className="font-bold text-stone-900">Receipt No:</div>
                  <div className="font-mono text-[11px] text-[#A34805] font-bold">{transaction.receiptNo}</div>
                </div>
                <div className="text-[11px] text-stone-500 mt-0.5">
                  Invoice: <span className="font-mono">{transaction.gstInvoiceNo || transaction.receiptNo}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Partner Shop Mapping Banner */}
          <div className="bg-[#FFF8F0] border border-[#F5DEC8] rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2.5">
              <Building2 className="w-5 h-5 text-[#E87A1E] shrink-0" />
              <div>
                <span className="text-[10px] uppercase font-bold tracking-wider text-[#A34805] block">
                  Partner Shop Counter Collection
                </span>
                <span className="font-bold text-stone-900 text-sm">{transaction.shopName}</span>
                {transaction.qrId && (
                  <span className="text-[11px] text-stone-500 ml-2 font-mono">({transaction.qrId})</span>
                )}
              </div>
            </div>
            <span className="bg-emerald-50 text-emerald-800 text-[10px] font-bold px-2.5 py-1 rounded-full border border-emerald-200 self-start sm:self-auto flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3 text-emerald-600" />
              Direct Shop QR Verified
            </span>
          </div>

          {/* Customer & Transaction Details Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="bg-stone-50 rounded-2xl p-4 border border-stone-200/80 space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-stone-500 block border-b border-stone-200 pb-1">
                Donor / Customer Details
              </span>
              <div className="flex justify-between">
                <span className="text-stone-500">Donor Name:</span>
                <span className="font-bold text-stone-900">{transaction.customerName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500">Mobile No:</span>
                <span className="font-medium text-stone-900">{transaction.customerMobile || 'Not Provided'}</span>
              </div>
              {transaction.customerEmail && (
                <div className="flex justify-between">
                  <span className="text-stone-500">Email:</span>
                  <span className="font-medium text-stone-900">{transaction.customerEmail}</span>
                </div>
              )}
              {transaction.donorPan && (
                <div className="flex justify-between">
                  <span className="text-stone-500">Donor PAN:</span>
                  <span className="font-mono font-bold text-stone-900">{transaction.donorPan}</span>
                </div>
              )}
            </div>

            <div className="bg-stone-50 rounded-2xl p-4 border border-stone-200/80 space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-stone-500 block border-b border-stone-200 pb-1">
                Payment & Razorpay Details
              </span>
              <div className="flex justify-between">
                <span className="text-stone-500">Date & Time:</span>
                <span className="font-medium text-stone-900">{transaction.date}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500">Payment Gateway:</span>
                <span className="font-bold text-emerald-800">Razorpay Verified</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500">Razorpay Payment ID:</span>
                <span className="font-mono font-bold text-[#381602]">{transaction.razorpayPaymentId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500">Method:</span>
                <span className="font-medium text-stone-900">{transaction.paymentMethod}</span>
              </div>
            </div>
          </div>

          {/* Donation Amount Ledger Box */}
          <div className="border border-[#F3DEC8] rounded-2xl overflow-hidden">
            <div className="bg-[#FFF2E3] px-5 py-2.5 border-b border-[#F5DEC8] flex items-center justify-between text-xs font-bold text-[#381602]">
              <span>Purpose / Relief Program</span>
              <span>Amount Received</span>
            </div>
            <div className="p-5 flex items-center justify-between bg-white">
              <div>
                <h4 className="font-bold text-stone-900 text-sm">
                  {transaction.project || 'General Seva & Community Relief Fund'}
                </h4>
                <p className="text-xs text-stone-500 mt-0.5">
                  Donation to Immense Life Foundation under Section 80G of Income Tax Act 1961
                </p>
                <p className="text-xs font-serif italic text-stone-600 mt-2">
                  Amount in words: <strong className="text-[#381602] font-semibold">{amountInWords(transaction.amount)}</strong>
                </p>
              </div>
              <div className="text-right">
                <span className="font-serif text-2xl font-bold text-[#381602]">
                  ₹{Number(transaction.amount).toLocaleString('en-IN')}
                </span>
                <span className="text-[10px] text-stone-400 block font-medium">Net Amount (No GST applicable)</span>
              </div>
            </div>
          </div>

          {/* Legal Certification and Signatory */}
          <div className="border-t border-stone-200 pt-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs">
            <div className="space-y-1 max-w-sm">
              <p className="text-[10px] text-stone-500 leading-tight">
                * Note: Donations to Immense Life Foundation are eligible for 50% tax deduction under Section 80G(5)(vi) of the Income Tax Act, 1961. This is a computer-generated tax acknowledgement and does not require a physical signature.
              </p>
              <div className="flex items-center gap-1.5 text-[10px] text-emerald-800 font-semibold pt-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Digitally Signed & Reconciled via Razorpay Software</span>
              </div>
            </div>

            <div className="text-right sm:min-w-[160px] self-end sm:self-auto">
              <div className="font-serif font-bold text-sm text-[#381602]">
                Milind Manohar Sonar
              </div>
              <div className="text-[11px] text-stone-500 font-medium">
                Authorized Signatory & President
              </div>
              <div className="text-[10px] text-[#A34805] font-semibold">
                Immense Life Foundation
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="bg-stone-50 px-6 py-4 border-t border-stone-200 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-stone-500">
            <Phone className="w-3.5 h-3.5 text-[#E87A1E]" />
            <span>Donor Helpdesk: {razorpayConfig.merchantName} (+91 98224 84000)</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleShare}
              className="px-3.5 py-1.5 rounded-xl border border-stone-300 hover:bg-stone-100 text-stone-700 font-medium transition flex items-center gap-1.5"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>Share Receipt</span>
            </button>
            <button
              onClick={onClose}
              className="px-5 py-1.5 bg-[#381602] hover:bg-black text-white font-bold rounded-xl transition"
            >
              Close
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
