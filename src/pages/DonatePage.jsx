import React, { useState } from 'react';
import { 
  Heart, 
  ShieldCheck, 
  Check, 
  CreditCard, 
  Lock, 
  ArrowLeft, 
  Sparkles,
  Award,
  Sun,
  ChevronRight,
  FileText,
  Building,
  HelpCircle,
  PhoneCall
} from 'lucide-react';
import { Link } from 'react-router-dom';
import confetti from 'canvas-confetti';
import { donationTiers, featuredProjects } from '../data/mockData';
import { useToast } from '../context/ToastContext';
import { useAdmin } from '../context/AdminContext';

export default function DonatePage() {
  const { addToast } = useToast();
  const { websiteCMS, recordDonationTransaction } = useAdmin();
  const cmsDonation = websiteCMS?.donationContent || {};

  const [frequency, setFrequency] = useState('monthly');
  const [selectedTier, setSelectedTier] = useState(35);
  const [customAmount, setCustomAmount] = useState('');
  const [coverFees, setCoverFees] = useState(true);
  const [selectedProject, setSelectedProject] = useState('general');
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [generatedReceiptData, setGeneratedReceiptData] = useState(null);

  const [donorName, setDonorName] = useState('');
  const [donorEmail, setDonorEmail] = useState('');
  const [donorPan, setDonorPan] = useState('');
  const [cardNumber, setCardNumber] = useState('4242 •••• •••• 4242');
  const [cardExpiry, setCardExpiry] = useState('08/29');
  const [cardCvc, setCardCvc] = useState('482');

  const baseAmount = customAmount ? parseFloat(customAmount) || 0 : selectedTier;
  const processingFee = coverFees ? Number((baseAmount * 0.02).toFixed(2)) : 0;
  const totalAmount = Number((baseAmount + processingFee).toFixed(2));

  const handleTierClick = (amount) => {
    setSelectedTier(amount);
    setCustomAmount('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (baseAmount <= 0) {
      addToast('Please choose or enter a valid donation amount', 'error');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);

      const res = recordDonationTransaction({
        amount: totalAmount,
        customerName: donorName || 'Devoted Donor',
        customerPhone: '+91 98200 44101',
        customerEmail: donorEmail || 'donor@immenselife.org',
        customerPan: donorPan || '',
        shopId: null,
        shopName: 'Direct Foundation Website (80G Portal)',
        cause: selectedProject === 'general' ? 'Daily Annadan Mahaprasad' : selectedProject,
        paymentMethod: paymentMethod === 'card' ? 'Credit Card' : 'UPI (Razorpay Gateway)'
      });

      setGeneratedReceiptData(res?.receipt || null);

      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 }
      });
      addToast(`Thank you! Your donation of $${totalAmount} has been processed with 80G tax exemption.`, 'success');
    }, 1200);
  };

  return (
    <div className="bg-[#FDFBF7] min-h-screen py-10 lg:py-16 text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Navigation Breadcrumb Bar */}
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-xs font-bold text-[#381602] hover:text-[#E87A1E] bg-white px-4 py-2 rounded-full border border-[#F3DEC8] shadow-xs transition"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Main Website</span>
          </Link>
          <div className="flex items-center gap-2 text-xs font-bold text-[#A34805] bg-[#FFF2E3] px-3.5 py-1.5 rounded-full border border-[#F5DEC8]">
            <Award className="w-4 h-4 text-[#E87A1E]" />
            <span>Eligible for 50% Tax Deduction under Section 80G / 501(c)(3)</span>
          </div>
        </div>

        {/* 2-Column Professional Donation Architecture */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Trust Pillars, Live Impact Preview & Bank Transfer Details */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Header Description */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#F3DEC8] shadow-sm space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-[#FFF2E3] border border-[#F5DEC8] flex items-center justify-center text-[#E87A1E]">
                <Sun className="w-6 h-6 text-[#E87A1E]" />
              </div>
              <h1 className="font-serif text-3xl font-bold text-[#381602]">
                Support Frontline Seva & Nutrition
              </h1>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                Your generosity provides hot Annadan meals, mobile healthcare clinics, and child education kits to marginalized families across grassroots districts.
              </p>

              {/* Tangible Impact Meter */}
              <div className="bg-[#FFF2E3] p-4 rounded-2xl border border-[#F5DEC8] flex items-center gap-4">
                <img 
                  src="/hero_seva_banner.jpg" 
                  alt="Immense Life Seva" 
                  className="w-16 h-16 rounded-xl object-cover border border-[#F5DEC8] shrink-0"
                />
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#A34805] block">
                    Your Direct Seva Output
                  </span>
                  <h4 className="text-xs sm:text-sm font-bold text-[#381602] mt-0.5">
                    {baseAmount >= 100 
                      ? `Provides 200+ Hot Meals & Medicine Kits` 
                      : baseAmount >= 50 
                      ? `Sponsors 100 Nutritious Annadan Meals` 
                      : baseAmount >= 25 
                      ? `Feeds 50 Vulnerable Children & Elders` 
                      : `Supports Grassroots Relief Delivery`}
                  </h4>
                  <p className="text-[11px] text-stone-500 mt-0.5">
                    100% verified with geo-tagged distribution logs.
                  </p>
                </div>
              </div>
            </div>

            {/* Tax Exemption & 80G Info Box */}
            <div className="bg-white p-6 rounded-3xl border border-[#F3DEC8] shadow-sm space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold text-[#381602]">
                <ShieldCheck className="w-4 h-4 text-[#E87A1E]" />
                <span>Instant 80G Tax Exemption Certificate</span>
              </div>
              <p className="text-xs text-stone-600 leading-relaxed">
                Donations are 50% tax exempt under Section 80G of the Indian Income Tax Act. A certified digital receipt with 80G registration number is issued to your email immediately upon transaction completion.
              </p>
              <div className="pt-2 text-[11px] text-stone-500 flex items-center justify-between border-t border-[#F3DEC8]">
                <span>Trust Registration: IV-19030281</span>
                <span className="font-bold text-[#A34805]">80G Approved</span>
              </div>
            </div>

            {/* Offline Bank Transfer / RTGS Info */}
            <div className="bg-[#FFFDF9] p-6 rounded-3xl border border-[#F3DEC8] shadow-xs space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="font-serif font-bold text-sm text-[#381602]">
                  Direct Bank Wire / RTGS / NEFT
                </h4>
                <Building className="w-4 h-4 text-[#A34805]" />
              </div>
              <p className="text-[11px] text-stone-500">
                For major corporate CSR or large family sponsorships, donate directly to our audited bank account:
              </p>
              <div className="bg-white p-3 rounded-xl border border-[#F5DEC8] font-mono text-[11px] text-stone-700 space-y-1">
                <div><span className="text-stone-400">A/C Name:</span> Immense Life Foundation</div>
                <div><span className="text-stone-400">Bank:</span> State Bank of India (SBI)</div>
                <div><span className="text-stone-400">A/C No:</span> 409281729014</div>
                <div><span className="text-stone-400">IFSC Code:</span> SBIN0001842</div>
              </div>
            </div>

          </div>

          {/* Right Column: Interactive Donation Form */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#F3DEC8] shadow-xl shadow-[#E87A1E]/5">
              
              {isSuccess ? (
                <div className="text-center py-10 px-4">
                  <div className="w-20 h-20 bg-[#FFF2E3] text-[#E87A1E] rounded-full flex items-center justify-center mx-auto mb-5 shadow-inner border border-[#F5DEC8]">
                    <Check className="w-10 h-10 stroke-[3]" />
                  </div>
                  <span className="text-xs font-bold uppercase tracking-widest text-[#A34805] bg-[#FFF2E3] px-3.5 py-1 rounded-full border border-[#F5DEC8]">
                    80G Tax-Deductible Receipt Generated
                  </span>
                  <h2 className="font-serif text-3xl font-bold text-[#381602] mt-3">
                    Thank You for Your Generosity!
                  </h2>
                  <p className="text-sm text-stone-600 mt-2 max-w-md mx-auto leading-relaxed">
                    Your contribution of <strong className="text-[#381602] font-bold">${totalAmount} {frequency === 'monthly' ? '/ month' : ''}</strong> directly accelerates community Annadan and frontline relief.
                  </p>

                  <div className="bg-[#FFFDF9] border border-[#F3DEC8] rounded-2xl p-5 mt-6 text-left max-w-sm mx-auto shadow-sm space-y-2 text-xs">
                    <div className="flex justify-between text-stone-500 pb-2 border-b border-[#F3DEC8]">
                      <span>Receipt ID</span>
                      <span className="font-mono font-medium text-[#381602]">ILF-80G-2026-98421</span>
                    </div>
                    <div className="flex justify-between text-stone-500 py-1">
                      <span>Fund Allocation</span>
                      <span className="font-bold text-[#E87A1E]">88% Direct Ground Seva</span>
                    </div>
                    <div className="flex justify-between text-stone-500 pt-1">
                      <span>Status</span>
                      <span className="font-bold text-green-700">Verified & Reconciled</span>
                    </div>
                  </div>

                  <div className="mt-8 flex flex-wrap justify-center gap-3">
                    <Link
                      to="/"
                      className="px-8 py-3 bg-[#E87A1E] text-white font-medium rounded-full hover:bg-[#D2640C] transition shadow-md"
                    >
                      Return to Home
                    </Link>
                    <Link
                      to="/reports"
                      className="px-6 py-3 bg-white text-[#381602] font-medium rounded-full border border-[#F3DEC8] hover:bg-[#FFF2E3] transition"
                    >
                      View Fund Audits
                    </Link>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  
                  {/* Frequency Toggle */}
                  <div>
                    <label className="block text-xs font-bold text-[#381602] mb-1.5 uppercase tracking-wider">
                      Donation Frequency
                    </label>
                    <div className="grid grid-cols-2 bg-[#F5EBE1] p-1 rounded-full border border-[#F3DEC8]">
                      <button
                        type="button"
                        onClick={() => setFrequency('once')}
                        className={`py-3 text-xs font-semibold rounded-full transition ${
                          frequency === 'once'
                            ? 'bg-white text-[#381602] shadow-sm font-bold'
                            : 'text-stone-600 hover:text-[#381602]'
                        }`}
                      >
                        Give Once
                      </button>
                      <button
                        type="button"
                        onClick={() => setFrequency('monthly')}
                        className={`py-3 text-xs font-semibold rounded-full flex items-center justify-center gap-1.5 transition ${
                          frequency === 'monthly'
                            ? 'bg-[#E87A1E] text-white shadow-sm font-bold'
                            : 'text-stone-600 hover:text-[#381602]'
                        }`}
                      >
                        <Heart className="w-3.5 h-3.5 fill-current text-white/80" />
                        <span>Monthly Seva Pledge</span>
                        <span className="text-[10px] bg-white/20 text-white font-bold px-1.5 rounded-full">
                          2X
                        </span>
                      </button>
                    </div>
                  </div>

                  {/* Amount Grid */}
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <label className="text-xs font-bold text-[#381602] uppercase tracking-wider">Select Contribution Amount</label>
                      <span className="text-xs font-bold text-stone-500">USD ($)</span>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      {donationTiers.map(tier => {
                        const isSelected = selectedTier === tier.amount && !customAmount;
                        return (
                          <button
                            type="button"
                            key={tier.amount}
                            onClick={() => handleTierClick(tier.amount)}
                            className={`p-3.5 rounded-2xl border text-center transition-all relative ${
                              isSelected
                                ? 'bg-[#E87A1E] text-white border-[#E87A1E] shadow-md ring-2 ring-[#E87A1E]/30'
                                : 'bg-white text-stone-900 border-[#F3DEC8] hover:border-[#E87A1E]/60'
                            }`}
                          >
                            <span className={`text-xl font-bold font-serif block ${isSelected ? 'text-white' : 'text-[#381602]'}`}>
                              ${tier.amount}
                            </span>
                            <span className={`text-[10px] mt-0.5 font-medium block truncate ${isSelected ? 'text-white/90' : 'text-stone-500'}`}>
                              {tier.title}
                            </span>
                          </button>
                        );
                      })}
                    </div>

                    <div className="mt-3 relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-500 font-bold">$</span>
                      <input
                        type="text"
                        placeholder="Enter other custom amount"
                        value={customAmount}
                        onChange={(e) => {
                          setCustomAmount(e.target.value.replace(/[^0-9.]/g, ''));
                          setSelectedTier(null);
                        }}
                        className="w-full bg-[#FFFDF9] border border-[#F3DEC8] rounded-xl pl-9 pr-4 py-3 text-sm font-medium text-[#381602] focus:outline-none focus:ring-2 focus:ring-[#E87A1E]"
                      />
                    </div>
                  </div>

                  {/* Program Allocation Choice */}
                  <div>
                    <label className="text-xs font-bold text-[#381602] block mb-1 uppercase tracking-wider">Direct Your Contribution</label>
                    <select
                      value={selectedProject}
                      onChange={(e) => setSelectedProject(e.target.value)}
                      className="w-full bg-[#FFFDF9] border border-[#F3DEC8] rounded-xl px-3.5 py-3 text-xs font-medium text-[#381602] focus:outline-none focus:ring-2 focus:ring-[#E87A1E]"
                    >
                      <option value="general">✨ General Seva & Upliftment Fund (Where most needed)</option>
                      {featuredProjects.map(p => (
                        <option key={p.id} value={p.id}>{p.title} ({p.location})</option>
                      ))}
                      <option value="annadan">🍲 Daily Annadan & Community Kitchen</option>
                      <option value="health">🩺 Free Mobile Health Dispensary</option>
                      <option value="education">🎓 Child Education & STEM Centers</option>
                    </select>
                  </div>

                  {/* Donor Tax Information */}
                  <div className="space-y-3 pt-2 border-t border-[#F3DEC8]">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#A34805] block">
                      Donor Receipt Information
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="text-[11px] font-bold text-stone-600 block mb-1">Full Name (for 80G Receipt)</label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Ramesh Patel"
                          value={donorName}
                          onChange={(e) => setDonorName(e.target.value)}
                          className="w-full bg-[#FFFDF9] border border-[#F3DEC8] rounded-xl px-3 py-2 text-xs text-[#381602] focus:outline-none focus:ring-2 focus:ring-[#E87A1E]"
                        />
                      </div>
                      <div>
                        <label className="text-[11px] font-bold text-stone-600 block mb-1">Email Address</label>
                        <input
                          type="email"
                          required
                          placeholder="ramesh@example.com"
                          value={donorEmail}
                          onChange={(e) => setDonorEmail(e.target.value)}
                          className="w-full bg-[#FFFDF9] border border-[#F3DEC8] rounded-xl px-3 py-2 text-xs text-[#381602] focus:outline-none focus:ring-2 focus:ring-[#E87A1E]"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Payment Method */}
                  <div className="space-y-3">
                    <label className="text-xs font-bold text-[#381602] block uppercase tracking-wider">Payment Method</label>
                    
                    {/* Instant Mobile Pay */}
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('apple-gpay')}
                      className="w-full py-3 bg-[#381602] hover:bg-black text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow-sm transition"
                    >
                      <span>Pay with UPI | Google Pay | Apple Pay</span>
                    </button>

                    <div className="text-center text-[10px] font-bold uppercase tracking-wider text-stone-400">
                      OR PAY WITH DEBIT / CREDIT CARD
                    </div>

                    <div className="bg-[#FFFDF9] p-4 rounded-2xl border border-[#F3DEC8] space-y-3">
                      <div>
                        <span className="text-[10px] font-bold uppercase text-stone-500">Card Number</span>
                        <div className="relative mt-1">
                          <CreditCard className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                          <input
                            type="text"
                            value={cardNumber}
                            onChange={(e) => setCardNumber(e.target.value)}
                            className="w-full bg-white border border-[#F3DEC8] rounded-lg pl-9 pr-3 py-2 text-xs font-mono text-[#381602] focus:outline-none focus:ring-2 focus:ring-[#E87A1E]"
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <span className="text-[10px] font-bold uppercase text-stone-500">Expires</span>
                          <input
                            type="text"
                            value={cardExpiry}
                            onChange={(e) => setCardExpiry(e.target.value)}
                            className="w-full bg-white border border-[#F3DEC8] rounded-lg px-3 py-2 text-xs font-mono text-[#381602] focus:outline-none focus:ring-2 focus:ring-[#E87A1E]"
                          />
                        </div>
                        <div>
                          <span className="text-[10px] font-bold uppercase text-stone-500">CVC</span>
                          <div className="relative">
                            <input
                              type="password"
                              value={cardCvc}
                              onChange={(e) => setCardCvc(e.target.value)}
                              className="w-full bg-white border border-[#F3DEC8] rounded-lg px-3 py-2 text-xs font-mono text-[#381602] focus:outline-none focus:ring-2 focus:ring-[#E87A1E]"
                            />
                            <Lock className="w-3.5 h-3.5 text-stone-400 absolute right-2.5 top-1/2 -translate-y-1/2" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* 2% Processing Fee Checkbox */}
                  <label className="flex items-start gap-2.5 p-3.5 rounded-xl bg-[#FFFDF9] border border-[#F3DEC8] cursor-pointer hover:bg-[#FFF2E3]/50">
                    <input
                      type="checkbox"
                      checked={coverFees}
                      onChange={(e) => setCoverFees(e.target.checked)}
                      className="mt-0.5 w-4 h-4 text-[#E87A1E] rounded focus:ring-[#E87A1E] accent-[#E87A1E]"
                    />
                    <div className="text-xs">
                      <span className="font-bold text-[#381602]">Cover 2% banking gateway cost (${processingFee.toFixed(2)})</span>
                      <p className="text-stone-500 text-[11px] mt-0.5">
                        Ensures 100% of your contribution reaches grassroots meal and medicine distribution directly.
                      </p>
                    </div>
                  </label>

                  {/* Submit CTA */}
                  <button
                    type="submit"
                    disabled={isSubmitting || baseAmount <= 0}
                    className="w-full py-4 px-6 bg-[#E87A1E] hover:bg-[#D2640C] text-white font-bold rounded-2xl flex items-center justify-center gap-2 shadow-lg shadow-[#E87A1E]/20 transition active:scale-[0.99] disabled:opacity-50 text-sm"
                  >
                    {isSubmitting ? (
                      <span>Securing payment & generating 80G receipt...</span>
                    ) : (
                      <>
                        <Heart className="w-4 h-4 text-white fill-current" />
                        <span>Complete Seva Gift of ${totalAmount.toFixed(2)}{frequency === 'monthly' ? '/mo' : ''}</span>
                      </>
                    )}
                  </button>

                  {/* Security Certifications */}
                  <div className="grid grid-cols-3 gap-2 pt-2 border-t border-[#F3DEC8]">
                    <div className="bg-[#FFFDF9] py-2 px-2 rounded-xl text-center border border-[#F3DEC8]">
                      <span className="text-[10px] text-[#E87A1E] font-bold block">80G / 12A</span>
                      <span className="text-[9px] text-stone-500 font-medium">Govt. Registered</span>
                    </div>
                    <div className="bg-[#FFFDF9] py-2 px-2 rounded-xl text-center border border-[#F3DEC8]">
                      <span className="text-[10px] text-[#E87A1E] font-bold block">GuideStar</span>
                      <span className="text-[9px] text-stone-500 font-medium">PLATINUM 2026</span>
                    </div>
                    <div className="bg-[#FFFDF9] py-2 px-2 rounded-xl text-center border border-[#F3DEC8]">
                      <span className="text-[10px] text-[#E87A1E] font-bold block">256-Bit SSL</span>
                      <span className="text-[9px] text-stone-500 font-medium">Bank Grade Secure</span>
                    </div>
                  </div>

                </form>
              )}

            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
