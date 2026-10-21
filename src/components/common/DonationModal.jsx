import React, { useState } from 'react';
import { X, ShieldCheck, Leaf, Check, CreditCard, Lock, Sparkles, Heart } from 'lucide-react';
import confetti from 'canvas-confetti';
import { donationTiers, featuredProjects } from '../../data/mockData';
import { useToast } from '../../context/ToastContext';

export default function DonationModal({ isOpen, onClose, defaultProject = null, defaultAmount = null }) {
  const { addToast } = useToast();
  const [frequency, setFrequency] = useState('monthly'); // 'once' | 'monthly'
  const [selectedTier, setSelectedTier] = useState(defaultAmount || 1000);
  const [customAmount, setCustomAmount] = useState('');
  const [coverFees, setCoverFees] = useState(true);
  const [selectedProject, setSelectedProject] = useState(defaultProject?.id || 'general');

  React.useEffect(() => {
    if (defaultAmount) {
      setSelectedTier(defaultAmount);
      setCustomAmount('');
    }
    if (defaultProject) {
      setSelectedProject(defaultProject?.id || defaultProject);
    }
  }, [defaultAmount, defaultProject, isOpen]);
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Form fields
  const [donorName, setDonorName] = useState('');
  const [donorEmail, setDonorEmail] = useState('');
  const [cardNumber, setCardNumber] = useState('4242 8492 1049 3920');
  const [cardExpiry, setCardExpiry] = useState('08/29');
  const [cardCvc, setCardCvc] = useState('482');

  if (!isOpen) return null;

  const baseAmount = customAmount ? parseFloat(customAmount) || 0 : selectedTier;
  const processingFee = coverFees ? Number((baseAmount * 0.02).toFixed(2)) : 0;
  const totalAmount = Number((baseAmount + processingFee).toFixed(2));

  const handleTierClick = (amount) => {
    setSelectedTier(amount);
    setCustomAmount('');
  };

  const handleCustomChange = (e) => {
    const val = e.target.value.replace(/[^0-9.]/g, '');
    setCustomAmount(val);
    setSelectedTier(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (baseAmount <= 0) {
      addToast('Please select or enter a valid donation amount', 'error');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      confetti({
        particleCount: 90,
        spread: 60,
        origin: { y: 0.6 }
      });
      addToast(`Thank you! Your donation of ₹${totalAmount.toLocaleString('en-IN')} has been recorded.`, 'success');
    }, 1200);
  };

  const resetAndClose = () => {
    setIsSuccess(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/50 backdrop-blur-sm flex items-center justify-center p-3 sm:p-5 animate-fade-in">
      <div 
        className="bg-white w-full max-w-lg rounded-3xl shadow-2xl border border-gray-200 overflow-hidden relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top bar header */}
        <div className="flex items-center justify-between px-6 py-4 bg-white border-b border-gray-100">
          <div className="flex items-center gap-2">
            <button 
              onClick={resetAndClose}
              className="p-1.5 rounded-full hover:bg-gray-100 text-gray-700 transition"
              aria-label="Close donation flow"
            >
              <X className="w-5 h-5" />
            </button>
            <h2 className="text-lg font-bold text-[#381602]">Donation Flow</h2>
          </div>
          <div className="flex items-center gap-2 text-xs font-semibold text-[#A34805] bg-[#FFF2E3] border border-[#FDE2C4] px-3 py-1 rounded-full">
            <Leaf className="w-3.5 h-3.5 text-[#E87A1E]" />
            Immense Life
          </div>
        </div>

        {/* Modal body */}
        <div className="p-6 max-h-[82vh] overflow-y-auto">
          {isSuccess ? (
            <div className="text-center py-8 px-4">
              <div className="w-20 h-20 bg-[#FFF2E3] text-[#E87A1E] rounded-full flex items-center justify-center mx-auto mb-5 shadow-inner border border-[#FDE2C4]">
                <Check className="w-10 h-10" />
              </div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#A34805] bg-[#FFF2E3] px-3 py-1 rounded-full border border-[#FDE2C4]">
                Tax-Deductible Receipt Generated
              </span>
              <h3 className="font-serif text-3xl font-bold text-[#381602] mt-3">
                Thank You for Your Generosity!
              </h3>
              <p className="text-sm text-gray-600 mt-2 max-w-md mx-auto">
                Your contribution of <strong className="text-[#A34805] font-bold">₹{totalAmount.toLocaleString('en-IN')} {frequency === 'monthly' ? '/ month' : ''}</strong> directly accelerates frontline operations. A receipt has been sent to your email.
              </p>

              <div className="bg-[#FFFDF9] border border-gray-200 rounded-2xl p-4 mt-6 text-left max-w-sm mx-auto shadow-sm">
                <div className="flex justify-between text-xs text-gray-500 pb-2 border-b border-gray-200">
                  <span>Transaction ID</span>
                  <span className="font-mono font-medium text-gray-800">ILF-TXN-{Math.floor(100000 + Math.random() * 900000)}</span>
                </div>
                <div className="flex justify-between text-xs text-gray-500 py-2 border-b border-gray-200">
                  <span>Project</span>
                  <span className="font-medium text-gray-800">
                    {featuredProjects.find(p => p.id === selectedProject)?.title || 'General Community Seva Fund'}
                  </span>
                </div>
                <div className="flex justify-between text-xs text-gray-500 pt-2">
                  <span>Field Direct Allocation</span>
                  <span className="font-bold text-[#E87A1E]">88% Direct Ground Ops</span>
                </div>
              </div>

              <button
                onClick={resetAndClose}
                className="mt-6 px-8 py-3 bg-[#E87A1E] text-white font-medium rounded-full hover:bg-[#D2640C] transition shadow-md"
              >
                Return to Website
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Trust Badges Bar */}
              <div className="flex items-center justify-between text-[11px] font-medium text-gray-600 bg-[#FFFDF9] p-2.5 rounded-xl border border-[#F5DEC8]">
                <div className="flex items-center gap-1 text-[#A34805] font-bold">
                  <ShieldCheck className="w-4 h-4 text-[#E87A1E]" />
                  <span>SECURE 256-BIT ENCRYPTED</span>
                </div>
                <div className="flex items-center gap-1 text-gray-500">
                  <Leaf className="w-3.5 h-3.5 text-[#E87A1E]" />
                  <span>Tax-Deductible 501(c)(3) & 80G</span>
                </div>
              </div>

              {/* Monthly Direct Impact Highlight */}
              <div className="bg-[#FFFDF9] rounded-2xl p-3 border border-[#F5DEC8] flex items-center gap-3 shadow-sm">
                <img 
                  src="https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=150&q=80" 
                  alt="Seva impact" 
                  className="w-16 h-16 rounded-xl object-cover"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#A34805]">
                      {frequency === 'monthly' ? 'Monthly Direct Impact' : 'Direct Seva Impact'}
                    </span>
                    <span className="text-[10px] bg-[#FFF2E3] text-[#A34805] font-bold px-2 py-0.5 rounded-full border border-[#FDE2C4]">
                      2X IMPACT
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-gray-900 truncate">
                    {selectedTier === 15 ? 'Provide 15 Hot Annadan Meals' : selectedTier === 35 ? 'Sponsor 1 Child School Kit' : selectedTier === 50 ? 'Family Medical & Food Pack' : selectedTier === 75 ? 'Community Water Toolkit' : selectedTier === 150 ? 'Full Seva Clinic Support' : 'Custom Community Seva'}
                  </h4>
                  <p className="text-xs text-gray-500 line-clamp-1">
                    Verified direct ground deployment with transparent accounting.
                  </p>
                </div>
              </div>

              {/* Donation Frequency Toggle */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                  Donation Frequency
                </label>
                <div className="grid grid-cols-2 bg-gray-100 p-1 rounded-full border border-gray-200">
                  <button
                    type="button"
                    onClick={() => setFrequency('once')}
                    className={`py-2 text-xs font-semibold rounded-full transition ${
                      frequency === 'once'
                        ? 'bg-white text-[#381602] shadow-sm font-bold'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    Give Once
                  </button>
                  <button
                    type="button"
                    onClick={() => setFrequency('monthly')}
                    className={`py-2 text-xs font-semibold rounded-full flex items-center justify-center gap-1.5 transition ${
                      frequency === 'monthly'
                        ? 'bg-[#E87A1E] text-white shadow-sm font-bold'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    <Heart className="w-3.5 h-3.5 fill-current text-[#FDE2C4]" />
                    <span>Give Monthly</span>
                    <span className="text-[10px] bg-[#D2640C] text-white font-bold px-1.5 rounded-full">
                      2X
                    </span>
                  </button>
                </div>
              </div>

              {/* Choose Amount Grid */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-xs font-semibold text-gray-700">Choose Amount</label>
                  <span className="text-xs font-bold text-gray-500">INR (₹)</span>
                </div>
                <div className="grid grid-cols-2 gap-2.5">
                  {donationTiers.map(tier => {
                    const isSelected = selectedTier === tier.amount && !customAmount;
                    return (
                      <button
                        type="button"
                        key={tier.amount}
                        onClick={() => handleTierClick(tier.amount)}
                        className={`p-3.5 rounded-2xl border text-left transition-all relative ${
                          isSelected
                            ? 'bg-[#E87A1E] text-white border-[#E87A1E] shadow-md ring-2 ring-[#E87A1E]/30'
                            : 'bg-white text-gray-900 border-gray-200 hover:border-[#E87A1E]/60'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className={`text-xl font-bold font-serif ${isSelected ? 'text-white' : 'text-gray-900'}`}>
                            ₹{tier.amount.toLocaleString('en-IN')}
                          </span>
                          <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                            isSelected ? 'bg-white text-[#E87A1E] border-white' : 'border-gray-300'
                          }`}>
                            {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                          </div>
                        </div>
                        <p className={`text-xs mt-1 font-medium ${isSelected ? 'text-[#FDE2C4]' : 'text-gray-600'}`}>
                          {tier.title}
                        </p>
                      </button>
                    );
                  })}
                </div>

                {/* Other Amount Field */}
                <div className="mt-2.5 relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-bold">₹</span>
                  <input
                    type="text"
                    placeholder="Other amount"
                    value={customAmount}
                    onChange={handleCustomChange}
                    className="w-full bg-white border border-gray-200 rounded-xl pl-9 pr-4 py-2.5 text-sm font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-700"
                  />
                </div>
              </div>

              {/* Direct Your Gift Dropdown */}
              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="text-xs font-semibold text-gray-700">Direct Your Gift</label>
                  <span className="text-[11px] font-semibold text-emerald-800">100% Verified Allocation</span>
                </div>
                <select
                  value={selectedProject}
                  onChange={(e) => setSelectedProject(e.target.value)}
                  className="w-full bg-white border border-gray-200 rounded-xl px-3.5 py-2.5 text-xs font-medium text-gray-800 focus:outline-none focus:ring-2 focus:ring-emerald-700"
                >
                  <option value="general">🌱 General Conservation & Community Fund</option>
                  {featuredProjects.map(p => (
                    <option key={p.id} value={p.id}>
                      {p.title} ({p.location})
                    </option>
                  ))}
                  <option value="women">✨ Women Empowerment & Livelihood Fund</option>
                  <option value="education">🎓 Child Education & STEM Centers</option>
                </select>
              </div>

              {/* Donor info fields */}
              <div className="grid grid-cols-2 gap-2.5">
                <div>
                  <label className="text-xs font-semibold text-gray-700 block mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Sarah Jenkins"
                    value={donorName}
                    onChange={(e) => setDonorName(e.target.value)}
                    className="w-full bg-white border border-gray-200 rounded-xl px-3 py-2 text-xs text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-700"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-700 block mb-1">Email Address</label>
                  <input
                    type="email"
                    required
                    placeholder="sarah@example.com"
                    value={donorEmail}
                    onChange={(e) => setDonorEmail(e.target.value)}
                    className="w-full bg-white border border-gray-200 rounded-xl px-3 py-2 text-xs text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-700"
                  />
                </div>
              </div>

              {/* Payment Method Section */}
              <div>
                <label className="text-xs font-semibold text-gray-700 block mb-1.5">Payment Method</label>
                <div className="grid grid-cols-3 gap-2 mb-3">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('card')}
                    className={`py-2 px-3 rounded-xl border text-xs font-semibold flex items-center justify-center gap-1.5 transition ${
                      paymentMethod === 'card'
                        ? 'bg-[#E87A1E] text-white border-[#E87A1E] font-bold'
                        : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    <CreditCard className="w-3.5 h-3.5" />
                    Card
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('apple-gpay')}
                    className={`py-2 px-3 rounded-xl border text-xs font-semibold flex items-center justify-center gap-1.5 transition ${
                      paymentMethod === 'apple-gpay'
                        ? 'bg-[#E87A1E] text-white border-[#E87A1E] font-bold'
                        : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    <span>📱 GPay / Apple</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('paypal')}
                    className={`py-2 px-3 rounded-xl border text-xs font-semibold flex items-center justify-center gap-1.5 transition ${
                      paymentMethod === 'paypal'
                        ? 'bg-[#E87A1E] text-white border-[#E87A1E] font-bold'
                        : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    <span>PayPal</span>
                  </button>
                </div>

                {/* Card Fields */}
                {paymentMethod === 'card' && (
                  <div className="bg-[#FFFDF9] p-3 rounded-2xl border border-[#F5DEC8] space-y-2">
                    <div>
                      <span className="text-[10px] font-bold uppercase text-gray-500">Card Details</span>
                      <div className="relative mt-1">
                        <CreditCard className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                        <input
                          type="text"
                          value={cardNumber}
                          onChange={(e) => setCardNumber(e.target.value)}
                          className="w-full bg-white border border-gray-200 rounded-lg pl-9 pr-3 py-1.5 text-xs font-mono text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#E87A1E]"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <span className="text-[10px] font-bold uppercase text-gray-500">Expires</span>
                        <input
                          type="text"
                          value={cardExpiry}
                          onChange={(e) => setCardExpiry(e.target.value)}
                          className="w-full bg-white border border-gray-200 rounded-lg px-3 py-1.5 text-xs font-mono text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#E87A1E]"
                        />
                      </div>
                      <div>
                        <span className="text-[10px] font-bold uppercase text-gray-500">CVC</span>
                        <div className="relative">
                          <input
                            type="password"
                            value={cardCvc}
                            onChange={(e) => setCardCvc(e.target.value)}
                            className="w-full bg-white border border-gray-200 rounded-lg px-3 py-1.5 text-xs font-mono text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#E87A1E]"
                          />
                          <Lock className="w-3.5 h-3.5 text-gray-400 absolute right-2.5 top-1/2 -translate-y-1/2" />
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Cover 2% Fee Checkbox */}
              <label className="flex items-start gap-2.5 p-3 rounded-xl bg-white border border-gray-200 cursor-pointer hover:bg-gray-50/50">
                <input
                  type="checkbox"
                  checked={coverFees}
                  onChange={(e) => setCoverFees(e.target.checked)}
                  className="mt-0.5 w-4 h-4 text-[#E87A1E] rounded focus:ring-[#E87A1E]"
                />
                <div className="text-xs">
                  <span className="font-bold text-gray-800">Cover 2% payment processing costs</span>
                  <p className="text-gray-500 text-[11px] mt-0.5">
                    Add ₹{processingFee.toFixed(2)} so 100% of your gift directly reaches community ground seva.
                  </p>
                </div>
              </label>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting || baseAmount <= 0}
                className="w-full py-3.5 px-6 bg-[#E87A1E] hover:bg-[#D2640C] text-white font-bold rounded-2xl flex items-center justify-center gap-2 shadow-lg shadow-[#E87A1E]/20 transition active:scale-[0.99] disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span className="inline-flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                    Securing your donation...
                  </span>
                ) : (
                  <>
                    <Heart className="w-4 h-4 fill-current text-white/90" />
                    <span>Complete Donation of ₹{totalAmount.toLocaleString('en-IN')}{frequency === 'monthly' ? '/mo' : ''}</span>
                  </>
                )}
              </button>

              <p className="text-[11px] text-center text-gray-500">
                Cancel anytime from your supporter portal. Tax receipts sent immediately.
              </p>

              {/* Bottom Credential Badges */}
              <div className="grid grid-cols-3 gap-2 pt-2 border-t border-gray-100">
                <div className="bg-white py-2 px-2 rounded-xl text-center border border-gray-200">
                  <span className="text-[10px] text-[#A34805] font-bold block">GuideStar</span>
                  <span className="text-[9px] text-gray-500 font-medium">PLATINUM 2026</span>
                </div>
                <div className="bg-white py-2 px-2 rounded-xl text-center border border-gray-200">
                  <span className="text-[10px] text-[#A34805] font-bold block">Charity Nav.</span>
                  <span className="text-[9px] text-gray-500 font-medium">4/4 TOP RATED</span>
                </div>
                <div className="bg-white py-2 px-2 rounded-xl text-center border border-gray-200">
                  <span className="text-[10px] text-[#A34805] font-bold block">SSL Verified</span>
                  <span className="text-[9px] text-gray-500 font-medium">Bank Grade</span>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
