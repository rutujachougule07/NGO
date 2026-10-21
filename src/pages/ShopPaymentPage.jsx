import React, { useState, useEffect } from 'react';
import { useSearchParams, useParams, Link } from 'react-router-dom';
import { 
  Building2, 
  CheckCircle2, 
  ShieldCheck, 
  Lock, 
  Smartphone, 
  CreditCard, 
  Check, 
  ArrowLeft, 
  Award, 
  Heart, 
  Printer, 
  Download, 
  Share2, 
  ExternalLink,
  Store,
  Sparkles,
  QrCode
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useNGO } from '../context/NGOContext';
import { useToast } from '../context/ToastContext';
import ReceiptModal from '../components/common/ReceiptModal';

export default function ShopPaymentPage() {
  const [searchParams] = useSearchParams();
  const { shopId: pathShopId } = useParams();
  const queryShop = searchParams.get('shop') || pathShopId;

  const { shops, recordCustomerPayment, razorpayConfig } = useNGO();
  const { addToast } = useToast();

  // Find shop matching queryShop
  const matchedShop = shops.find(s => 
    s.id.toLowerCase() === (queryShop || '').toLowerCase() || 
    s.qrId.toLowerCase() === (queryShop || '').toLowerCase()
  ) || shops[0];

  const [selectedShop, setSelectedShop] = useState(matchedShop);
  const [customerName, setCustomerName] = useState('');
  const [customerMobile, setCustomerMobile] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [donorPan, setDonorPan] = useState('');
  const [selectedAmount, setSelectedAmount] = useState(500);
  const [customAmount, setCustomAmount] = useState('');
  const [selectedProgram, setSelectedProgram] = useState('Daily Annadan & Nutrition Drive');
  const [paymentMethod, setPaymentMethod] = useState('upi'); // 'upi' | 'card' | 'netbanking'
  const [upiApp, setUpiApp] = useState('gpay'); // 'gpay' | 'phonepe' | 'paytm' | 'other'

  // Submission & razorpay simulation states
  const [isProcessing, setIsProcessing] = useState(false);
  const [showRazorpayModal, setShowRazorpayModal] = useState(false);
  const [completedTxn, setCompletedTxn] = useState(null);
  const [isReceiptModalOpen, setIsReceiptModalOpen] = useState(false);

  useEffect(() => {
    if (queryShop) {
      const found = shops.find(s => 
        s.id.toLowerCase() === queryShop.toLowerCase() || 
        s.qrId.toLowerCase() === queryShop.toLowerCase()
      );
      if (found) setSelectedShop(found);
    }
  }, [queryShop, shops]);

  const finalAmount = customAmount ? parseFloat(customAmount) || 0 : selectedAmount;
  const isShopInactive = selectedShop?.status === 'Inactive';

  const handlePayClick = (e) => {
    e.preventDefault();

    // Requirement #2: Prevent inactive shops from accepting new payments
    if (isShopInactive) {
      addToast(`Partner shop "${selectedShop.name}" is currently Inactive. New payments are disabled.`, 'error');
      return;
    }

    if (!customerName.trim()) {
      addToast('Please enter your full name as per official records', 'error');
      return;
    }
    if (!customerMobile.trim() || customerMobile.replace(/\D/g, '').length < 10) {
      addToast('Please enter a valid 10-digit mobile number for transaction mapping and SMS receipt', 'error');
      return;
    }
    if (finalAmount <= 0) {
      addToast('Please select or enter a valid donation amount', 'error');
      return;
    }

    // Open Razorpay Checkout Simulator
    setShowRazorpayModal(true);
  };

  const handleCompleteRazorpay = () => {
    setIsProcessing(true);
    setTimeout(() => {
      const formattedMethod = 
        paymentMethod === 'upi' ? `UPI (${upiApp === 'gpay' ? 'Google Pay' : upiApp === 'phonepe' ? 'PhonePe' : upiApp === 'paytm' ? 'Paytm' : 'BHIM / UPI ID'})` :
        paymentMethod === 'card' ? 'Debit/Credit Card (RuPay/Visa)' :
        'NetBanking (Indian Banks)';

      const txn = recordCustomerPayment({
        shopId: selectedShop.id,
        customerName: customerName.trim(),
        customerMobile: customerMobile.trim(),
        customerEmail: customerEmail.trim(),
        donorPan: donorPan.trim().toUpperCase(),
        amount: finalAmount,
        project: selectedProgram,
        paymentMethod: formattedMethod
      });

      setIsProcessing(false);
      setShowRazorpayModal(false);
      setCompletedTxn(txn);

      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 }
      });

      addToast(`Payment of ₹${finalAmount} verified via Razorpay! Receipt generated.`, 'success');
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] py-8 px-4 sm:px-6">
      <div className="max-w-xl mx-auto">
        
        {/* Navigation Bar */}
        <div className="flex items-center justify-between mb-6">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-xs font-bold text-[#381602] hover:text-[#E87A1E] bg-white px-3.5 py-2 rounded-full border border-[#F3DEC8] shadow-xs transition"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Immense Life Home</span>
          </Link>
          <div className="flex items-center gap-1.5 text-xs font-bold text-[#A34805] bg-[#FFF2E3] px-3.5 py-1.5 rounded-full border border-[#F5DEC8]">
            <Award className="w-3.5 h-3.5 text-[#E87A1E]" />
            <span>Section 80G Tax-Deductible</span>
          </div>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#F3DEC8] shadow-xl shadow-[#E87A1E]/5">
          
          {/* COMPLETED SUCCESS SCREEN */}
          {completedTxn ? (
            <div className="text-center py-6 space-y-6">
              <div className="w-20 h-20 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner border border-emerald-200">
                <Check className="w-10 h-10 stroke-[3]" />
              </div>

              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-800 bg-emerald-100/80 px-3 py-1 rounded-full border border-emerald-300">
                  Payment Successful • Razorpay Verified
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#381602] mt-3">
                  Thank You, {completedTxn.customerName}!
                </h2>
                <p className="text-xs sm:text-sm text-stone-600 mt-1 max-w-md mx-auto">
                  Your generous payment of <strong className="text-stone-900 font-bold">₹{completedTxn.amount.toLocaleString('en-IN')}</strong> at <strong className="text-[#381602]">{completedTxn.shopName}</strong> has been received and recorded.
                </p>
              </div>

              {/* Receipt Summary Card */}
              <div className="bg-[#FFFDF9] border border-[#F3DEC8] rounded-2xl p-5 text-left max-w-md mx-auto shadow-xs space-y-2.5 text-xs">
                <div className="flex justify-between items-center pb-2 border-b border-[#F3DEC8]">
                  <span className="text-stone-500">Official Receipt No</span>
                  <span className="font-mono font-bold text-[#381602]">{completedTxn.receiptNo}</span>
                </div>
                <div className="flex justify-between items-center py-0.5">
                  <span className="text-stone-500">Razorpay Payment ID</span>
                  <span className="font-mono font-medium text-emerald-800">{completedTxn.razorpayPaymentId}</span>
                </div>
                <div className="flex justify-between items-center py-0.5">
                  <span className="text-stone-500">Mapped Partner Shop</span>
                  <span className="font-bold text-stone-900">{completedTxn.shopName} ({completedTxn.qrId})</span>
                </div>
                <div className="flex justify-between items-center py-0.5">
                  <span className="text-stone-500">Donor Mobile</span>
                  <span className="font-medium text-stone-900">{completedTxn.customerMobile}</span>
                </div>
                <div className="flex justify-between items-center py-0.5">
                  <span className="text-stone-500">Relief Purpose</span>
                  <span className="font-semibold text-[#A34805]">{completedTxn.project}</span>
                </div>
                <div className="flex justify-between items-center pt-2 border-t border-[#F3DEC8] text-sm">
                  <span className="font-bold text-stone-700">Total Amount Paid</span>
                  <span className="font-serif font-bold text-[#381602] text-lg">₹{completedTxn.amount.toLocaleString('en-IN')}</span>
                </div>
              </div>

              <div className="p-3 bg-[#FFF2E3] rounded-xl border border-[#F5DEC8] max-w-md mx-auto text-[11px] text-[#A34805] font-medium flex items-center gap-2 text-left">
                <CheckCircle2 className="w-4 h-4 text-[#E87A1E] shrink-0" />
                <span>
                  SMS & Email confirmation sent. 80G tax receipt ready for download.
                </span>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap justify-center gap-3 pt-2">
                <button
                  onClick={() => setIsReceiptModalOpen(true)}
                  className="px-6 py-3 bg-[#E87A1E] hover:bg-[#D2640C] text-white font-bold rounded-2xl flex items-center gap-2 shadow-md transition"
                >
                  <Printer className="w-4 h-4" />
                  <span>View & Print Official 80G Receipt</span>
                </button>
                <Link
                  to="/admin/transactions"
                  className="px-5 py-3 bg-white border border-[#F3DEC8] text-[#381602] hover:bg-[#FFF2E3] font-bold rounded-2xl transition text-xs flex items-center gap-2"
                >
                  <span>Admin Transaction Ledger</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </Link>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => {
                    setCompletedTxn(null);
                    setCustomerName('');
                    setCustomerMobile('');
                    setCustomAmount('');
                  }}
                  className="text-xs font-semibold text-stone-500 hover:text-[#381602] underline"
                >
                  Make another contribution
                </button>
              </div>
            </div>
          ) : (
            /* PAYMENT FORM */
            <form onSubmit={handlePayClick} className="space-y-6">
              
              {/* Header inside card */}
              <div className="flex items-start justify-between pb-4 border-b border-[#F3DEC8]">
                <div className="flex items-center gap-3">
                  <img
                    src="/immense_life_brand.jpg"
                    alt="Immense Life Emblem"
                    className="w-12 h-12 rounded-full object-cover border-2 border-[#E87A1E] shadow-xs shrink-0"
                  />
                  <div>
                    <h1 className="font-serif text-xl font-bold text-[#381602]">
                      Immense Life Foundation
                    </h1>
                    <p className="text-[11px] text-stone-500 font-medium">
                      Official QR Payment & Donation Counter
                    </p>
                  </div>
                </div>
                <div className="bg-[#FFF2E3] text-[#A34805] text-[10px] font-bold px-2.5 py-1 rounded-full border border-[#F5DEC8] flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3 text-[#E87A1E]" />
                  <span>Verified NGO</span>
                </div>
              </div>

              {/* Active Partner Shop Information Card */}
              <div className={`rounded-2xl p-4 border space-y-2 ${
                isShopInactive 
                  ? 'bg-amber-50/80 border-amber-300' 
                  : 'bg-gradient-to-br from-[#FFF9F2] to-[#FFF2E3] border-[#F5DEC8]'
              }`}>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#A34805] flex items-center gap-1">
                    <Store className="w-3.5 h-3.5 text-[#E87A1E]" />
                    Partner Shop Counter
                  </span>
                  <div className="flex items-center gap-1.5">
                    <span className="font-mono text-[11px] bg-white/90 text-[#381602] font-bold px-2 py-0.5 rounded-md border border-[#F5DEC8]">
                      {selectedShop.qrId}
                    </span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      isShopInactive 
                        ? 'bg-red-100 text-red-800 border border-red-300' 
                        : 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                    }`}>
                      {selectedShop.status || 'Active'}
                    </span>
                  </div>
                </div>

                <div className="flex items-baseline justify-between">
                  <h3 className="font-serif text-base font-bold text-[#381602]">
                    {selectedShop.name}
                  </h3>
                  <span className="text-[11px] text-stone-500">{selectedShop.category || 'Retail Counter'}</span>
                </div>
                <p className="text-xs text-stone-600 line-clamp-1">
                  📍 {selectedShop.location}
                </p>

                {isShopInactive && (
                  <div className="p-2.5 bg-red-50 border border-red-200 rounded-xl text-red-800 text-xs font-bold flex items-center gap-2">
                    <span className="text-base">⚠️</span>
                    <span>This shop counter is currently INACTIVE. Payments are disabled per admin policy.</span>
                  </div>
                )}

                {/* Change shop dropdown if testing different shops */}
                <div className="pt-1 flex items-center justify-between text-[11px]">
                  <span className="text-stone-500">Scan at a different shop?</span>
                  <select
                    value={selectedShop.id}
                    onChange={(e) => {
                      const s = shops.find(item => item.id === e.target.value);
                      if (s) setSelectedShop(s);
                    }}
                    className="bg-white border border-[#F5DEC8] text-[#381602] font-bold rounded-lg px-2 py-1 text-[11px] focus:outline-none"
                  >
                    {shops.map(s => (
                      <option key={s.id} value={s.id}>{s.name} ({s.qrId})</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Customer Details Form (SOP Step 6: Customer enters name and mobile number) */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-stone-500">
                  Customer & Donor Information
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-semibold text-[#381602] block mb-1">
                      Customer Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Rahul Patil"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className="w-full bg-[#FAF9F5] border border-[#F3DEC8] rounded-xl px-3.5 py-2.5 text-xs text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#E87A1E]"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-[#381602] block mb-1">
                      Mobile Number <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-bold text-stone-500">+91</span>
                      <input
                        type="tel"
                        required
                        maxLength={10}
                        placeholder="9876543210"
                        value={customerMobile}
                        onChange={(e) => setCustomerMobile(e.target.value.replace(/\D/g, ''))}
                        className="w-full bg-[#FAF9F5] border border-[#F3DEC8] rounded-xl pl-11 pr-3.5 py-2.5 text-xs text-stone-900 font-medium focus:outline-none focus:ring-2 focus:ring-[#E87A1E]"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-semibold text-[#381602] block mb-1">
                      Email Address <span className="text-stone-400 font-normal">(for 80G e-receipt)</span>
                    </label>
                    <input
                      type="email"
                      placeholder="rahul.patil@gmail.com"
                      value={customerEmail}
                      onChange={(e) => setCustomerEmail(e.target.value)}
                      className="w-full bg-[#FAF9F5] border border-[#F3DEC8] rounded-xl px-3.5 py-2.5 text-xs text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#E87A1E]"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-[#381602] block mb-1">
                      PAN Card Number <span className="text-stone-400 font-normal">(for 80G tax benefit)</span>
                    </label>
                    <input
                      type="text"
                      maxLength={10}
                      placeholder="ABCDE1234F"
                      value={donorPan}
                      onChange={(e) => setDonorPan(e.target.value.toUpperCase())}
                      className="w-full bg-[#FAF9F5] border border-[#F3DEC8] rounded-xl px-3.5 py-2.5 text-xs font-mono text-stone-900 uppercase focus:outline-none focus:ring-2 focus:ring-[#E87A1E]"
                    />
                  </div>
                </div>
              </div>

              {/* Amount Selection in Indian Rupees (₹) */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label className="text-xs font-bold text-[#381602]">
                    Contribution Amount (INR ₹) <span className="text-red-500">*</span>
                  </label>
                  <span className="text-[11px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                    100% Goes to Relief Seva
                  </span>
                </div>

                <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                  {[100, 250, 500, 1000, 2500, 5000].map(amt => {
                    const isSelected = selectedAmount === amt && !customAmount;
                    return (
                      <button
                        type="button"
                        key={amt}
                        onClick={() => {
                          setSelectedAmount(amt);
                          setCustomAmount('');
                        }}
                        className={`py-2 px-1 text-center rounded-xl border text-xs font-bold transition ${
                          isSelected
                            ? 'bg-[#E87A1E] text-white border-[#E87A1E] shadow-sm ring-2 ring-[#E87A1E]/30'
                            : 'bg-[#FAF9F5] text-[#381602] border-[#F3DEC8] hover:border-[#E87A1E]'
                        }`}
                      >
                        ₹{amt}
                      </button>
                    );
                  })}
                </div>

                <div className="relative mt-2">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm font-bold text-stone-500">₹</span>
                  <input
                    type="number"
                    min="1"
                    placeholder="Enter other custom amount in Rupees"
                    value={customAmount}
                    onChange={(e) => {
                      setCustomAmount(e.target.value);
                      setSelectedAmount(null);
                    }}
                    className="w-full bg-[#FAF9F5] border border-[#F3DEC8] rounded-xl pl-8 pr-4 py-2.5 text-xs font-bold text-[#381602] focus:outline-none focus:ring-2 focus:ring-[#E87A1E]"
                  />
                </div>
              </div>

              {/* Relief Program Selection */}
              <div>
                <label className="text-xs font-bold text-[#381602] block mb-1">
                  Relief Program Allocation
                </label>
                <select
                  value={selectedProgram}
                  onChange={(e) => setSelectedProgram(e.target.value)}
                  className="w-full bg-[#FAF9F5] border border-[#F3DEC8] rounded-xl px-3 py-2.5 text-xs text-[#381602] font-semibold focus:outline-none focus:ring-2 focus:ring-[#E87A1E]"
                >
                  <option value="Daily Annadan & Nutrition Drive">🍲 Daily Annadan & Community Nutrition Relief</option>
                  <option value="Mobile Healthcare & Medical Aid">🩺 Mobile Healthcare & Tribal Medical Camps</option>
                  <option value="Child Education & Learning Centers">🎓 Child Education & Underprivileged Student Scholarships</option>
                  <option value="Women Empowerment & Livelihood">✨ Women Micro-Enterprise & Self-Help Collectives</option>
                  <option value="General Seva & Upliftment Fund">🌿 General Grassroots Relief (Deploy where most urgent)</option>
                </select>
              </div>

              {/* Payment Mode (Razorpay Supported: UPI / Card / NetBanking) */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-[#381602] block">
                  Select Payment Mode
                </label>

                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('upi')}
                    className={`py-2.5 px-3 rounded-xl border text-xs font-bold flex flex-col items-center justify-center gap-1 transition ${
                      paymentMethod === 'upi'
                        ? 'bg-[#FFF2E3] text-[#A34805] border-[#E87A1E] ring-2 ring-[#E87A1E]/30'
                        : 'bg-white text-stone-700 border-[#F3DEC8] hover:bg-stone-50'
                    }`}
                  >
                    <Smartphone className="w-4 h-4 text-[#E87A1E]" />
                    <span>UPI / QR</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('card')}
                    className={`py-2.5 px-3 rounded-xl border text-xs font-bold flex flex-col items-center justify-center gap-1 transition ${
                      paymentMethod === 'card'
                        ? 'bg-[#FFF2E3] text-[#A34805] border-[#E87A1E] ring-2 ring-[#E87A1E]/30'
                        : 'bg-white text-stone-700 border-[#F3DEC8] hover:bg-stone-50'
                    }`}
                  >
                    <CreditCard className="w-4 h-4 text-[#E87A1E]" />
                    <span>Cards (Debit/Credit)</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('netbanking')}
                    className={`py-2.5 px-3 rounded-xl border text-xs font-bold flex flex-col items-center justify-center gap-1 transition ${
                      paymentMethod === 'netbanking'
                        ? 'bg-[#FFF2E3] text-[#A34805] border-[#E87A1E] ring-2 ring-[#E87A1E]/30'
                        : 'bg-white text-stone-700 border-[#F3DEC8] hover:bg-stone-50'
                    }`}
                  >
                    <Building2 className="w-4 h-4 text-[#E87A1E]" />
                    <span>Net Banking</span>
                  </button>
                </div>

                {/* Sub-options for UPI */}
                {paymentMethod === 'upi' && (
                  <div className="bg-[#FAF9F5] p-3 rounded-xl border border-[#F3DEC8] flex items-center justify-between text-xs">
                    <span className="font-semibold text-stone-700">App:</span>
                    <div className="flex gap-2">
                      {[
                        { id: 'gpay', label: 'GPay' },
                        { id: 'phonepe', label: 'PhonePe' },
                        { id: 'paytm', label: 'Paytm' },
                        { id: 'other', label: 'Any UPI ID' },
                      ].map(app => (
                        <button
                          key={app.id}
                          type="button"
                          onClick={() => setUpiApp(app.id)}
                          className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition ${
                            upiApp === app.id
                              ? 'bg-[#E87A1E] text-white shadow-xs'
                              : 'bg-white text-stone-600 border border-stone-200'
                          }`}
                        >
                          {app.label}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isShopInactive}
                  className={`w-full py-4 rounded-2xl font-bold text-sm sm:text-base flex items-center justify-center gap-2 shadow-lg transition ${
                    isShopInactive 
                      ? 'bg-stone-300 text-stone-500 cursor-not-allowed shadow-none' 
                      : 'bg-[#E87A1E] hover:bg-[#D2640C] text-white shadow-[#E87A1E]/20 transform active:scale-[0.99]'
                  }`}
                >
                  <Lock className="w-4 h-4" />
                  <span>
                    {isShopInactive 
                      ? 'Counter Inactive - Payments Disabled' 
                      : `Pay ₹${finalAmount.toLocaleString('en-IN')} via Razorpay`}
                  </span>
                </button>
              </div>

              {/* Trust & Compliance Footer */}
              <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-[11px] text-stone-500 pt-1">
                <div className="flex items-center gap-1 font-semibold text-stone-700">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
                  <span>Razorpay PCI-DSS Level 1 Encrypted</span>
                </div>
                <span>•</span>
                <span>Section 80G Tax Exemption Receipt</span>
              </div>
            </form>
          )}

        </div>
      </div>

      {/* RAZORPAY CHECKOUT MODAL SIMULATOR */}
      {showRazorpayModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full overflow-hidden shadow-2xl border border-stone-200 animate-slide-up">
            
            {/* Razorpay Brand Header */}
            <div className="bg-[#0C2340] text-white p-5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center border border-white/20">
                  <img
                    src="/immense_life_brand.jpg"
                    alt="Immense Life"
                    className="w-7 h-7 rounded-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-bold text-sm leading-tight text-white">
                    {razorpayConfig.merchantName}
                  </h3>
                  <p className="text-[11px] text-blue-200">
                    Merchant ID: {razorpayConfig.keyId.substring(0, 14)}...
                  </p>
                </div>
              </div>
              <div className="text-right">
                <span className="text-[10px] uppercase font-bold text-blue-300 block">Amount</span>
                <span className="font-bold text-lg text-white">₹{finalAmount.toLocaleString('en-IN')}</span>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-4 text-xs">
              
              {/* Partner Shop Bar */}
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-3 flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase font-bold text-blue-800 block">Partner Counter</span>
                  <span className="font-bold text-stone-900">{selectedShop.name}</span>
                </div>
                <span className="font-mono text-[10px] bg-white px-2 py-0.5 rounded text-blue-900 font-bold border border-blue-200">
                  {selectedShop.qrId}
                </span>
              </div>

              {/* Customer Info Review */}
              <div className="bg-stone-50 rounded-xl p-3 border border-stone-200 space-y-1.5">
                <div className="flex justify-between">
                  <span className="text-stone-500">Customer Name:</span>
                  <span className="font-bold text-stone-900">{customerName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-500">Mobile Number:</span>
                  <span className="font-medium text-stone-900">+91 {customerMobile}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-500">Selected Method:</span>
                  <span className="font-semibold text-emerald-800 uppercase">
                    {paymentMethod} ({paymentMethod === 'upi' ? upiApp : 'Direct Gateway'})
                  </span>
                </div>
              </div>

              {/* Razorpay simulation note */}
              <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-amber-900 text-[11px] space-y-1">
                <div className="font-bold flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                  <span>Razorpay Real-time Webhook Simulator</span>
                </div>
                <p className="text-[10px] leading-tight text-amber-800">
                  Clicking "Authorize & Pay" will initiate bank transaction authorization and trigger webhook confirmation mapping this payment to {selectedShop.name}.
                </p>
              </div>

              {/* Actions */}
              <div className="pt-2 space-y-2">
                <button
                  type="button"
                  disabled={isProcessing}
                  onClick={handleCompleteRazorpay}
                  className="w-full py-3.5 bg-[#0C2340] hover:bg-[#071629] text-white rounded-xl font-bold text-sm flex items-center justify-center gap-2 shadow-md transition disabled:opacity-50"
                >
                  {isProcessing ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Authorizing with Razorpay...</span>
                    </div>
                  ) : (
                    <span>Authorize & Pay ₹{finalAmount.toLocaleString('en-IN')}</span>
                  )}
                </button>

                <button
                  type="button"
                  disabled={isProcessing}
                  onClick={() => setShowRazorpayModal(false)}
                  className="w-full py-2.5 text-stone-500 hover:text-stone-800 text-xs font-semibold"
                >
                  Cancel Transaction
                </button>
              </div>

            </div>

            {/* Razorpay Footer */}
            <div className="bg-stone-100 px-6 py-2 border-t border-stone-200 flex items-center justify-between text-[10px] text-stone-500">
              <span>Secured by Razorpay</span>
              <span>128-bit SSL Encrypted</span>
            </div>

          </div>
        </div>
      )}

      {/* Official 80G Receipt Modal */}
      {completedTxn && (
        <ReceiptModal
          isOpen={isReceiptModalOpen}
          onClose={() => setIsReceiptModalOpen(false)}
          transaction={completedTxn}
        />
      )}

    </div>
  );
}
