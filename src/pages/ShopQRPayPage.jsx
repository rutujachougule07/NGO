import React, { useState, useEffect } from 'react';
import { useParams, useSearchParams, Link } from 'react-router-dom';
import { 
  Store, 
  ShieldCheck, 
  Heart, 
  Check, 
  Download, 
  Share2, 
  CreditCard, 
  Smartphone, 
  ArrowLeft, 
  Receipt, 
  Award,
  Sun,
  FileCheck2,
  Printer,
  Sparkles
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { initialShops, foundationInfo } from '../data/mockData';
import { useToast } from '../context/ToastContext';
import { useAdmin } from '../context/AdminContext';

export default function ShopQRPayPage() {
  const { shopId } = useParams();
  const [searchParams] = useSearchParams();
  const { addToast } = useToast();
  const { shops, recordDonationTransaction } = useAdmin();

  const allShops = (shops && shops.length > 0) ? shops : initialShops;

  // Find shop matching URL param or query param, default to first shop
  const resolvedShop = allShops.find(
    s => s.id === shopId || s.qrId === shopId || s.id === searchParams.get('shop')
  ) || allShops[0];

  const [currentShop, setCurrentShop] = useState(resolvedShop);
  const [selectedAmount, setSelectedAmount] = useState(250);
  const [customAmount, setCustomAmount] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [customerMobile, setCustomerMobile] = useState('');
  const [customerPan, setCustomerPan] = useState('');
  const [isRazorpayOpen, setIsRazorpayOpen] = useState(false);
  const [paymentProcessing, setPaymentProcessing] = useState(false);
  const [isPaid, setIsPaid] = useState(false);
  const [transactionData, setTransactionData] = useState(null);

  const amountToPay = customAmount ? parseFloat(customAmount) || 0 : selectedAmount;

  const quickAmounts = [100, 250, 500, 1000, 2500];

  const handleSelectAmount = (amt) => {
    setSelectedAmount(amt);
    setCustomAmount('');
  };

  const handleOpenRazorpay = (e) => {
    e.preventDefault();
    if (amountToPay <= 0) {
      addToast('Please enter a valid amount to contribute', 'error');
      return;
    }
    if (!customerName.trim()) {
      addToast('Please enter customer / donor name', 'error');
      return;
    }
    if (!customerMobile.trim() || customerMobile.length < 10) {
      addToast('Please enter a valid 10-digit mobile number', 'error');
      return;
    }

    setIsRazorpayOpen(true);
  };

  const handleProcessPayment = (method = 'UPI') => {
    setPaymentProcessing(true);
    setTimeout(() => {
      setPaymentProcessing(false);
      setIsRazorpayOpen(false);

      const res = recordDonationTransaction({
        amount: amountToPay,
        customerName: customerName.trim(),
        customerPhone: customerMobile.trim(),
        customerPan: customerPan.toUpperCase() || '',
        shopId: currentShop?.id,
        shopName: currentShop?.name,
        cause: currentShop?.targetCause || 'Annadan & Child Nutrition',
        paymentMethod: method === 'UPI' ? 'UPI (Google Pay / PhonePe)' : 'Debit / Credit Card'
      });

      const txnId = res?.txn?.id || `pay_${Date.now().toString(36).toUpperCase()}`;
      const receiptNo = res?.receipt?.receiptNumber || `ILF-REC-${Math.floor(100000 + Math.random() * 900000)}`;

      const data = {
        txnId,
        receiptNo,
        amount: amountToPay,
        customerName,
        customerMobile,
        customerPan: customerPan.toUpperCase() || 'NOT_PROVIDED',
        shopName: currentShop.name,
        shopId: currentShop.id,
        shopLocation: currentShop.location,
        paymentMethod: method,
        date: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
        time: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
      };

      setTransactionData(data);
      setIsPaid(true);

      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    }, 1200);
  };

  const handlePrintReceipt = () => {
    window.print();
  };

  const handleShareWhatsApp = () => {
    if (!transactionData) return;
    const text = `Immense Life Foundation 80G Receipt\nReceipt No: ${transactionData.receiptNo}\nAmount: ₹${transactionData.amount}\nPartner Shop: ${transactionData.shopName}\nDonor: ${transactionData.customerName}\nTxn ID: ${transactionData.txnId}\nThank you for supporting community Seva!`;
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div className="bg-[#FDFBF7] min-h-screen py-10 lg:py-16 text-left">
      <div className="max-w-xl mx-auto px-4 sm:px-6">
        
        {/* Top Back bar */}
        <div className="mb-6 flex items-center justify-between">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-xs font-bold text-[#381602] hover:text-[#E87A1E] bg-white px-3.5 py-1.5 rounded-full border border-[#F3DEC8] shadow-xs transition"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Main Site</span>
          </Link>

          <div className="flex items-center gap-1.5 text-xs font-bold text-[#A34805] bg-[#FFF2E3] px-3 py-1 rounded-full border border-[#F5DEC8]">
            <ShieldCheck className="w-3.5 h-3.5 text-[#E87A1E]" />
            <span>Razorpay Verified Merchant</span>
          </div>
        </div>

        {/* Success / Official Invoice Screen */}
        {isPaid && transactionData ? (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#F3DEC8] shadow-xl text-center space-y-6">
            <div className="w-16 h-16 bg-[#FFF2E3] text-[#E87A1E] rounded-full flex items-center justify-center mx-auto border border-[#F5DEC8] shadow-inner">
              <Check className="w-9 h-9 stroke-[3]" />
            </div>

            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#A34805] bg-[#FFF2E3] px-3 py-1 rounded-full border border-[#F5DEC8]">
                Payment Successful & 80G Certified
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#381602] mt-2">
                Thank You, {transactionData.customerName}!
              </h2>
              <p className="text-xs sm:text-sm text-stone-600 mt-1">
                Your payment was recorded for <strong className="text-[#381602]">{transactionData.shopName}</strong> counter QR.
              </p>
            </div>

            {/* Printable Receipt Card */}
            <div className="bg-[#FFFDF9] border border-[#F3DEC8] rounded-2xl p-5 text-left text-xs space-y-3 font-sans shadow-xs">
              <div className="flex items-center justify-between border-b border-[#F3DEC8] pb-3">
                <div className="flex items-center gap-2">
                  <img src="/immense_life_logo.jpg" alt="Logo" className="w-7 h-7 rounded-full object-contain p-0.5 bg-white border border-[#F4A261]" />
                  <div>
                    <span className="font-bold text-[#381602] block leading-tight">Immense Life Foundation</span>
                    <span className="text-[9px] text-stone-500">Reg: 80G / 12A / Section 115</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="font-mono font-bold text-[#381602] block">{transactionData.receiptNo}</span>
                  <span className="text-[10px] text-stone-400">{transactionData.date}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-1">
                <div>
                  <span className="text-stone-400 text-[10px] block uppercase font-bold">Partner Shop</span>
                  <span className="font-bold text-[#381602]">{transactionData.shopName}</span>
                  <span className="text-[10px] text-stone-500 block truncate">{transactionData.shopLocation}</span>
                </div>
                <div>
                  <span className="text-stone-400 text-[10px] block uppercase font-bold">Customer / Mobile</span>
                  <span className="font-bold text-[#381602]">{transactionData.customerName}</span>
                  <span className="text-[10px] text-stone-500 block">{transactionData.customerMobile}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-1">
                <div>
                  <span className="text-stone-400 text-[10px] block uppercase font-bold">Razorpay Payment ID</span>
                  <span className="font-mono font-bold text-[#A34805]">{transactionData.txnId}</span>
                </div>
                <div>
                  <span className="text-stone-400 text-[10px] block uppercase font-bold">Payment Gateway</span>
                  <span className="font-bold text-stone-700">{transactionData.paymentMethod} (Razorpay)</span>
                </div>
              </div>

              <div className="pt-3 border-t border-[#F3DEC8] flex items-center justify-between">
                <div>
                  <span className="text-xs text-stone-500">Actual Amount Received</span>
                  <span className="block text-[10px] text-stone-400">100% Tax Deductible (80G)</span>
                </div>
                <span className="font-serif text-2xl font-bold text-[#381602]">
                  ₹{transactionData.amount.toLocaleString('en-IN')}
                </span>
              </div>
            </div>

            {/* Actions: Print & Share */}
            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <button
                onClick={handlePrintReceipt}
                className="px-5 py-2.5 bg-[#E87A1E] hover:bg-[#D2640C] text-white text-xs font-bold rounded-xl flex items-center gap-2 shadow-xs transition"
              >
                <Printer className="w-4 h-4" />
                <span>Print Official Receipt</span>
              </button>
              <button
                onClick={handleShareWhatsApp}
                className="px-5 py-2.5 bg-green-700 hover:bg-green-800 text-white text-xs font-bold rounded-xl flex items-center gap-2 shadow-xs transition"
              >
                <Share2 className="w-4 h-4" />
                <span>WhatsApp Receipt</span>
              </button>
              <button
                onClick={() => {
                  setIsPaid(false);
                  setCustomerName('');
                  setCustomerMobile('');
                  setCustomerPan('');
                }}
                className="px-4 py-2.5 bg-white border border-[#F3DEC8] text-stone-700 hover:bg-[#FFF2E3] text-xs font-bold rounded-xl transition"
              >
                Make Another Payment
              </button>
            </div>
          </div>
        ) : (
          /* Main Payment Form */
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#F3DEC8] shadow-xl space-y-6">
            
            {/* Shop Identification Banner */}
            <div className="bg-gradient-to-r from-[#FFF2E3] via-white to-[#FDE2C4] p-4 rounded-2xl border border-[#F5DEC8] flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-xl bg-white border border-[#F5DEC8] flex items-center justify-center text-[#E87A1E] shrink-0 shadow-xs">
                <Store className="w-6 h-6" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] font-bold text-[#A34805] uppercase tracking-wider">
                    Counter QR Partner
                  </span>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#E87A1E]"></span>
                  <span className="text-[10px] font-mono text-stone-500">{currentShop.qrId}</span>
                </div>
                <h3 className="font-serif text-lg font-bold text-[#381602] truncate">
                  {currentShop.name}
                </h3>
                <p className="text-xs text-stone-500 truncate">
                  📍 {currentShop.location}
                </p>
              </div>
            </div>

            {/* Shop Switcher Dropdown (for testing/demo convenience) */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-[11px] font-bold text-stone-600 uppercase tracking-wider">
                  Select Partner Counter
                </label>
                <span className="text-[10px] text-stone-400">QR Mapped Shop</span>
              </div>
              <select
                value={currentShop.id}
                onChange={(e) => {
                  const s = initialShops.find(shp => shp.id === e.target.value);
                  if (s) setCurrentShop(s);
                }}
                className="w-full bg-[#FFFDF9] border border-[#F3DEC8] rounded-xl px-3.5 py-2.5 text-xs text-[#381602] font-semibold focus:outline-none focus:ring-2 focus:ring-[#E87A1E]"
              >
                {initialShops.map(s => (
                  <option key={s.id} value={s.id}>
                    {s.name} ({s.location}) - [{s.qrId}]
                  </option>
                ))}
              </select>
            </div>

            {/* Contribution Amount Presets */}
            <div>
              <label className="text-[11px] font-bold text-stone-600 block mb-2 uppercase tracking-wider">
                Choose Donation / Payment Amount (INR ₹)
              </label>
              <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                {quickAmounts.map(amt => (
                  <button
                    key={amt}
                    type="button"
                    onClick={() => handleSelectAmount(amt)}
                    className={`py-3 px-2 rounded-xl text-center font-bold text-xs transition border ${
                      selectedAmount === amt && !customAmount
                        ? 'bg-[#E87A1E] text-white border-[#E87A1E] shadow-sm'
                        : 'bg-[#FFFDF9] text-[#381602] border-[#F3DEC8] hover:bg-[#FFF2E3]'
                    }`}
                  >
                    ₹{amt}
                  </button>
                ))}
              </div>

              <div className="mt-2.5 relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400 font-bold text-sm">₹</span>
                <input
                  type="text"
                  placeholder="Or enter any custom amount"
                  value={customAmount}
                  onChange={(e) => {
                    setCustomAmount(e.target.value.replace(/[^0-9.]/g, ''));
                    setSelectedAmount(null);
                  }}
                  className="w-full bg-[#FFFDF9] border border-[#F3DEC8] rounded-xl pl-8 pr-4 py-2.5 text-xs font-semibold text-[#381602] focus:outline-none focus:ring-2 focus:ring-[#E87A1E]"
                />
              </div>
            </div>

            {/* Customer Details Form (Requirement 5 in SOP) */}
            <form onSubmit={handleOpenRazorpay} className="space-y-4 pt-2 border-t border-[#F3DEC8]">
              <span className="text-[11px] font-bold text-[#A34805] uppercase tracking-wider block">
                Customer & Receipt Details
              </span>

              <div>
                <label className="text-xs font-bold text-stone-700 block mb-1">
                  Customer / Donor Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Rahul Sharma"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full bg-[#FFFDF9] border border-[#F3DEC8] rounded-xl px-3.5 py-2.5 text-xs text-[#381602] focus:outline-none focus:ring-2 focus:ring-[#E87A1E]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-stone-700 block mb-1">
                    Mobile Number (for SMS & 80G Receipt) *
                  </label>
                  <input
                    type="tel"
                    required
                    maxLength={10}
                    placeholder="10-digit mobile number"
                    value={customerMobile}
                    onChange={(e) => setCustomerMobile(e.target.value.replace(/[^0-9]/g, ''))}
                    className="w-full bg-[#FFFDF9] border border-[#F3DEC8] rounded-xl px-3.5 py-2.5 text-xs text-[#381602] font-mono focus:outline-none focus:ring-2 focus:ring-[#E87A1E]"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-stone-700 block mb-1">
                    PAN Card Number (Optional for 80G)
                  </label>
                  <input
                    type="text"
                    maxLength={10}
                    placeholder="ABCDE1234F"
                    value={customerPan}
                    onChange={(e) => setCustomerPan(e.target.value.toUpperCase())}
                    className="w-full bg-[#FFFDF9] border border-[#F3DEC8] rounded-xl px-3.5 py-2.5 text-xs text-[#381602] font-mono uppercase focus:outline-none focus:ring-2 focus:ring-[#E87A1E]"
                  />
                </div>
              </div>

              {/* Razorpay Trust Strip */}
              <div className="bg-[#FFFDF9] p-3 rounded-xl border border-[#F3DEC8] flex items-center justify-between text-[11px] text-stone-600">
                <div className="flex items-center gap-1.5 font-semibold">
                  <ShieldCheck className="w-4 h-4 text-[#E87A1E]" />
                  <span>Secured by Razorpay Standard</span>
                </div>
                <span className="font-bold text-[#A34805]">50% 80G Tax Exemption</span>
              </div>

              {/* Pay Button */}
              <button
                type="submit"
                disabled={amountToPay <= 0}
                className="w-full py-4 bg-[#E87A1E] hover:bg-[#D2640C] text-white font-bold rounded-2xl flex items-center justify-center gap-2 shadow-lg shadow-[#E87A1E]/20 transition active:scale-[0.99] text-sm disabled:opacity-50"
              >
                <Heart className="w-4 h-4 fill-current text-white/90" />
                <span>Pay ₹{amountToPay.toLocaleString('en-IN')} via Razorpay</span>
              </button>
            </form>

            <div className="text-center text-[10px] text-stone-400">
              Payment is directly credited to Immense Life Foundation trust account & mapped to {currentShop.name}.
            </div>

          </div>
        )}

      </div>

      {/* Razorpay Mock Interactive Modal */}
      {isRazorpayOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white rounded-2xl max-w-sm w-full overflow-hidden shadow-2xl border border-gray-200">
            {/* Razorpay Header */}
            <div className="bg-[#0C2340] text-white p-4 flex items-center justify-between">
              <div>
                <span className="text-[10px] text-cyan-300 font-bold uppercase tracking-wider block">Razorpay Checkout</span>
                <span className="font-bold text-sm block">Immense Life Foundation</span>
                <span className="text-[11px] text-stone-300">Partner: {currentShop.name}</span>
              </div>
              <div className="text-right">
                <span className="text-xs text-stone-300 block">Amount</span>
                <span className="text-lg font-bold text-white">₹{amountToPay}</span>
              </div>
            </div>

            {/* Payment Options */}
            <div className="p-4 space-y-3">
              <span className="text-xs font-bold text-gray-500 uppercase tracking-wider block">
                Select Payment Option
              </span>

              {paymentProcessing ? (
                <div className="py-8 text-center space-y-3">
                  <div className="w-10 h-10 border-4 border-[#E87A1E] border-t-transparent rounded-full animate-spin mx-auto"></div>
                  <p className="text-xs font-bold text-gray-700">Connecting to Razorpay gateway...</p>
                  <p className="text-[10px] text-gray-400">Capturing customer transaction record</p>
                </div>
              ) : (
                <div className="space-y-2">
                  <button
                    type="button"
                    onClick={() => handleProcessPayment('UPI (GPay / PhonePe)')}
                    className="w-full p-3 rounded-xl border border-gray-200 hover:border-[#E87A1E] hover:bg-[#FFF2E3]/30 flex items-center justify-between text-xs font-bold text-gray-800 transition text-left"
                  >
                    <div className="flex items-center gap-2.5">
                      <Smartphone className="w-4 h-4 text-[#E87A1E]" />
                      <div>
                        <span>UPI / QR</span>
                        <span className="block text-[10px] text-gray-400 font-normal">Google Pay, PhonePe, Paytm, BHIM</span>
                      </div>
                    </div>
                    <span className="text-[10px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-bold">Fast</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleProcessPayment('Card (Debit / Credit)')}
                    className="w-full p-3 rounded-xl border border-gray-200 hover:border-[#E87A1E] hover:bg-[#FFF2E3]/30 flex items-center justify-between text-xs font-bold text-gray-800 transition text-left"
                  >
                    <div className="flex items-center gap-2.5">
                      <CreditCard className="w-4 h-4 text-[#E87A1E]" />
                      <div>
                        <span>Cards (Debit & Credit)</span>
                        <span className="block text-[10px] text-gray-400 font-normal">Visa, MasterCard, RuPay</span>
                      </div>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleProcessPayment('Netbanking')}
                    className="w-full p-3 rounded-xl border border-gray-200 hover:border-[#E87A1E] hover:bg-[#FFF2E3]/30 flex items-center justify-between text-xs font-bold text-gray-800 transition text-left"
                  >
                    <div className="flex items-center gap-2.5">
                      <CreditCard className="w-4 h-4 text-stone-400" />
                      <div>
                        <span>Netbanking</span>
                        <span className="block text-[10px] text-gray-400 font-normal">SBI, HDFC, ICICI, Axis</span>
                      </div>
                    </div>
                  </button>
                </div>
              )}

              {!paymentProcessing && (
                <button
                  type="button"
                  onClick={() => setIsRazorpayOpen(false)}
                  className="w-full py-2 text-xs font-bold text-gray-500 hover:text-gray-800 text-center transition pt-2"
                >
                  Cancel Transaction
                </button>
              )}
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
