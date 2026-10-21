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
  Sun
} from 'lucide-react';
import { Link } from 'react-router-dom';
import confetti from 'canvas-confetti';
import { donationTiers, featuredProjects } from '../data/mockData';
import { useToast } from '../context/ToastContext';

export default function DonatePage() {
  const { addToast } = useToast();
  const [frequency, setFrequency] = useState('monthly');
  const [selectedTier, setSelectedTier] = useState(1000);
  const [customAmount, setCustomAmount] = useState('');
  const [coverFees, setCoverFees] = useState(true);
  const [selectedProject, setSelectedProject] = useState('general');
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const [donorName, setDonorName] = useState('');
  const [donorEmail, setDonorEmail] = useState('');
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
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
      addToast(`Thank you! Your donation of ₹${totalAmount.toLocaleString('en-IN')} has been processed.`, 'success');
    }, 1200);
  };

  return (
    <div className="bg-[#FDFBF7] py-12 px-4 sm:px-6 min-h-screen">
      <div className="max-w-xl mx-auto">
        
        {/* Back navigation */}
        <div className="mb-6 flex items-center justify-between">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-xs font-bold text-[#381602] hover:text-[#E87A1E] bg-white px-3.5 py-2 rounded-full border border-[#F3DEC8] shadow-xs transition"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Main Site</span>
          </Link>
          <div className="flex items-center gap-1.5 text-xs font-bold text-[#A34805] bg-[#FFF2E3] px-3.5 py-1.5 rounded-full border border-[#F5DEC8]">
            <Award className="w-3.5 h-3.5 text-[#E87A1E]" />
            <span>Tax-Deductible 501(c)(3) / 80G</span>
          </div>
        </div>

        {/* Counter QR Link */}
        <Link
          to="/pay"
          className="mb-4 bg-[#FFF2E3] hover:bg-[#FCE2C8] border border-[#F5DEC8] p-3 rounded-2xl flex items-center justify-between text-xs text-[#381602] transition shadow-xs"
        >
          <div className="flex items-center gap-2 font-bold">
            <span className="text-sm">🏪</span>
            <span>At a partner store counter? Scan & Pay via Shop QR</span>
          </div>
          <span className="font-bold text-[#E87A1E]">Open QR Pay →</span>
        </Link>

        {/* Main Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#F3DEC8] shadow-xl shadow-[#E87A1E]/5">
          
          {isSuccess ? (
            <div className="text-center py-10 px-4">
              <div className="w-20 h-20 bg-[#FFF2E3] text-[#E87A1E] rounded-full flex items-center justify-center mx-auto mb-5 shadow-inner border border-[#F5DEC8]">
                <Check className="w-10 h-10 stroke-[3]" />
              </div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#A34805] bg-[#FFF2E3] px-3.5 py-1 rounded-full border border-[#F5DEC8]">
                Tax-Deductible Receipt Generated
              </span>
              <h2 className="font-serif text-3xl font-bold text-[#381602] mt-3">
                Thank You for Your Generosity!
              </h2>
              <p className="text-sm text-stone-600 mt-2 max-w-md mx-auto">
                Your contribution of <strong className="text-[#381602] font-bold">₹{totalAmount.toLocaleString('en-IN')} {frequency === 'monthly' ? '/ month' : ''}</strong> directly supports Immense Life Foundation frontline relief and community upliftment.
              </p>

              <div className="bg-[#FFFDF9] border border-[#F3DEC8] rounded-2xl p-5 mt-6 text-left max-w-sm mx-auto shadow-sm space-y-2">
                <div className="flex justify-between text-xs text-stone-500 pb-2 border-b border-[#F3DEC8]">
                  <span>Transaction ID</span>
                  <span className="font-mono font-medium text-[#381602]">ILF-TXN-98421</span>
                </div>
                <div className="flex justify-between text-xs text-stone-500 py-1">
                  <span>Allocation</span>
                  <span className="font-bold text-[#E87A1E]">88% Direct Ground Seva</span>
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
                  to="/admin/transactions"
                  className="px-6 py-3 bg-white text-[#381602] font-medium rounded-full border border-[#F3DEC8] hover:bg-[#FFF2E3] transition"
                >
                  View in Admin Ledger
                </Link>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Header inside card */}
              <div className="flex items-center justify-between pb-4 border-b border-[#F3DEC8]">
                <div>
                  <h1 className="font-serif text-2xl font-bold text-[#381602]">
                    Donation Flow
                  </h1>
                  <p className="text-xs text-stone-500 mt-0.5">Serve • Support • Uplift • Together</p>
                </div>
                <div className="w-10 h-10 rounded-full bg-[#FFF2E3] border border-[#F5DEC8] flex items-center justify-center text-[#E87A1E]">
                  <Sun className="w-5 h-5 text-[#E87A1E]" />
                </div>
              </div>

              {/* Trust badges row */}
              <div className="flex items-center justify-between text-[11px] font-medium text-stone-600 bg-[#FFFDF9] p-3 rounded-xl border border-[#F3DEC8]">
                <div className="flex items-center gap-1.5 text-[#381602] font-bold">
                  <ShieldCheck className="w-4 h-4 text-[#E87A1E]" />
                  <span>SECURE 256-BIT ENCRYPTED</span>
                </div>
                <div className="flex items-center gap-1 text-[#A34805] font-semibold">
                  <Award className="w-3.5 h-3.5 text-[#E87A1E]" />
                  <span>Tax-Deductible 501(c)(3)</span>
                </div>
              </div>

              {/* Monthly direct impact card */}
              <div className="bg-[#FFF2E3] rounded-2xl p-3.5 border border-[#F5DEC8] flex items-center gap-3.5 shadow-xs">
                <img 
                  src="/immense_life_brand.jpg" 
                  alt="Immense Life Impact" 
                  className="w-16 h-16 rounded-xl object-cover border border-[#F5DEC8]"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#A34805]">
                      Monthly Direct Seva
                    </span>
                    <span className="text-[10px] bg-[#E87A1E] text-white font-bold px-2 py-0.5 rounded-full">
                      2X IMPACT
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-[#381602] truncate">
                    {selectedTier === 15 ? 'Provides 30 Hot Annadan Meals' : selectedTier === 35 ? 'Sponsors Mobile Health Checkup' : selectedTier === 75 ? 'Educates 2 Underprivileged Children' : 'Complete Community Relief Kit'}
                  </h4>
                  <p className="text-xs text-stone-600 line-clamp-1">
                    Transparent grassroots delivery verified with photo updates & community tracking.
                  </p>
                </div>
              </div>

              {/* Frequency Toggle */}
              <div>
                <label className="block text-xs font-semibold text-[#381602] mb-1.5">
                  Donation Frequency
                </label>
                <div className="grid grid-cols-2 bg-[#F5EBE1] p-1 rounded-full border border-[#F3DEC8]">
                  <button
                    type="button"
                    onClick={() => setFrequency('once')}
                    className={`py-2.5 text-xs font-semibold rounded-full transition ${
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
                    className={`py-2.5 text-xs font-semibold rounded-full flex items-center justify-center gap-1.5 transition ${
                      frequency === 'monthly'
                        ? 'bg-[#E87A1E] text-white shadow-sm font-bold'
                        : 'text-stone-600 hover:text-[#381602]'
                    }`}
                  >
                    <Heart className="w-3.5 h-3.5 fill-current text-white/80" />
                    <span>Give Monthly</span>
                    <span className="text-[10px] bg-white/20 text-white font-bold px-1.5 rounded-full">
                      2X
                    </span>
                  </button>
                </div>
              </div>

              {/* Amount Grid */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-xs font-semibold text-[#381602]">Choose Amount</label>
                  <span className="text-xs font-bold text-stone-500">INR (₹)</span>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {donationTiers.map(tier => {
                    const isSelected = selectedTier === tier.amount && !customAmount;
                    return (
                      <button
                        type="button"
                        key={tier.amount}
                        onClick={() => handleTierClick(tier.amount)}
                        className={`p-4 rounded-2xl border text-left transition-all relative ${
                          isSelected
                            ? 'bg-[#E87A1E] text-white border-[#E87A1E] shadow-md ring-2 ring-[#E87A1E]/30'
                            : 'bg-white text-stone-900 border-[#F3DEC8] hover:border-[#E87A1E]/60'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className={`text-2xl font-bold font-serif ${isSelected ? 'text-white' : 'text-[#381602]'}`}>
                            ₹{tier.amount.toLocaleString('en-IN')}
                          </span>
                          <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                            isSelected ? 'bg-white text-[#E87A1E] border-white' : 'border-stone-300'
                          }`}>
                            {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                          </div>
                        </div>
                        <p className={`text-xs mt-1.5 font-medium ${isSelected ? 'text-white/90' : 'text-stone-600'}`}>
                          {tier.title}
                        </p>
                      </button>
                    );
                  })}
                </div>

                <div className="mt-3 relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-500 font-bold">₹</span>
                  <input
                    type="text"
                    placeholder="Other amount"
                    value={customAmount}
                    onChange={(e) => {
                      setCustomAmount(e.target.value.replace(/[^0-9.]/g, ''));
                      setSelectedTier(null);
                    }}
                    className="w-full bg-white border border-[#F3DEC8] rounded-xl pl-9 pr-4 py-3 text-sm font-medium text-[#381602] focus:outline-none focus:ring-2 focus:ring-[#E87A1E]"
                  />
                </div>
              </div>

              {/* Direct Gift Selection */}
              <div>
                <label className="text-xs font-semibold text-[#381602] block mb-1">Direct Your Gift</label>
                <select
                  value={selectedProject}
                  onChange={(e) => setSelectedProject(e.target.value)}
                  className="w-full bg-white border border-[#F3DEC8] rounded-xl px-3.5 py-3 text-xs font-medium text-[#381602] focus:outline-none focus:ring-2 focus:ring-[#E87A1E]"
                >
                  <option value="general">✨ General Seva & Upliftment Fund (Where most needed)</option>
                  {featuredProjects.map(p => (
                    <option key={p.id} value={p.id}>{p.title} ({p.location})</option>
                  ))}
                  <option value="annadan">🍲 Daily Annadan & Nutrition Drive</option>
                  <option value="health">🩺 Mobile Healthcare & Medical Aid</option>
                  <option value="education">🎓 Child Education & Learning Centers</option>
                </select>
              </div>

              {/* Payment Method */}
              <div>
                <label className="text-xs font-semibold text-[#381602] block mb-1.5">Payment Method</label>
                
                {/* Mobile Pay Option */}
                <button
                  type="button"
                  onClick={() => setPaymentMethod('apple-gpay')}
                  className="w-full py-3 bg-[#381602] hover:bg-black text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow-sm transition mb-3"
                >
                  <span>Pay with Apple Pay | G Pay | UPI</span>
                </button>

                <div className="text-center text-[10px] font-bold uppercase tracking-wider text-stone-400 mb-3">
                  OR PAY WITH CARD
                </div>

                <div className="bg-[#FFFDF9] p-4 rounded-2xl border border-[#F3DEC8] space-y-3">
                  <div>
                    <span className="text-[10px] font-bold uppercase text-stone-500">Card Details</span>
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

              {/* 2% Fee Checkbox */}
              <label className="flex items-start gap-2.5 p-3.5 rounded-xl bg-white border border-[#F3DEC8] cursor-pointer hover:bg-[#FFF2E3]/40">
                <input
                  type="checkbox"
                  checked={coverFees}
                  onChange={(e) => setCoverFees(e.target.checked)}
                  className="mt-0.5 w-4 h-4 text-[#E87A1E] rounded focus:ring-[#E87A1E] accent-[#E87A1E]"
                />
                <div className="text-xs">
                  <span className="font-bold text-[#381602]">Cover 2% payment processing costs</span>
                  <p className="text-stone-500 text-[11px] mt-0.5">
                    Add ₹{processingFee.toFixed(2)} so 100% of your gift reaches community relief teams directly.
                  </p>
                </div>
              </label>

              {/* Large Submit CTA */}
              <button
                type="submit"
                disabled={isSubmitting || baseAmount <= 0}
                className="w-full py-4 px-6 bg-[#E87A1E] hover:bg-[#D2640C] text-white font-bold rounded-2xl flex items-center justify-center gap-2 shadow-lg shadow-[#E87A1E]/20 transition active:scale-[0.99] disabled:opacity-50 text-sm"
              >
                {isSubmitting ? (
                  <span>Securing your contribution...</span>
                ) : (
                  <>
                    <Heart className="w-4 h-4 text-white fill-current" />
                    <span>Complete Donation of ₹{totalAmount.toLocaleString('en-IN')}{frequency === 'monthly' ? '/mo' : ''}</span>
                  </>
                )}
              </button>

              {/* Credentials */}
              <div className="grid grid-cols-3 gap-2 pt-2 border-t border-[#F3DEC8]">
                <div className="bg-white py-2 px-2 rounded-xl text-center border border-[#F3DEC8]">
                  <span className="text-[10px] text-[#E87A1E] font-bold block">GuideStar</span>
                  <span className="text-[9px] text-stone-500 font-medium">PLATINUM 2026</span>
                </div>
                <div className="bg-white py-2 px-2 rounded-xl text-center border border-[#F3DEC8]">
                  <span className="text-[10px] text-[#E87A1E] font-bold block">Charity Nav.</span>
                  <span className="text-[9px] text-stone-500 font-medium">4/4 TOP RATED</span>
                </div>
                <div className="bg-white py-2 px-2 rounded-xl text-center border border-[#F3DEC8]">
                  <span className="text-[10px] text-[#E87A1E] font-bold block">SSL Verified</span>
                  <span className="text-[9px] text-stone-500 font-medium">Bank Grade</span>
                </div>
              </div>

            </form>
          )}

        </div>
      </div>
    </div>
  );
}
