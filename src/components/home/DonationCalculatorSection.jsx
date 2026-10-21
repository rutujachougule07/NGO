import React, { useState } from 'react';
import { 
  Heart, 
  ShieldCheck, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  Calculator,
  Utensils 
} from 'lucide-react';
import { fundAllocation, featuredProjects } from '../../data/mockData';
import { useToast } from '../../context/ToastContext';

export default function DonationCalculatorSection({ onOpenDonate }) {
  const { addToast } = useToast();
  const [pledge, setPledge] = useState(25);
  const [frequency, setFrequency] = useState('monthly');
  const [donorName, setDonorName] = useState('');
  const [donorEmail, setDonorEmail] = useState('');
  const [selectedProject, setSelectedProject] = useState('general');

  // Dynamic calculated tangible results based on pledge value
  const hotMeals = Math.floor(pledge * 1.5);
  const medicalKits = Math.max(1, Math.floor(pledge / 25));
  const trackingMonths = pledge >= 50 ? '2 Years' : pledge >= 25 ? '1 Year' : '6 Months';

  const handlePreset = (val) => {
    setPledge(val);
  };

  const handleContinue = (e) => {
    e.preventDefault();
    if (pledge < 5) {
      addToast('Minimum donation is $5', 'info');
      return;
    }
    onOpenDonate({
      id: selectedProject,
      defaultAmount: pledge,
      frequency: frequency,
      donorName,
      donorEmail,
    });
  };

  return (
    <section className="py-20 lg:py-28 bg-[#FDFBF7] text-gray-900 relative overflow-hidden border-y border-[#F7E6D4]">
      {/* Background warm radiant glow */}
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-[#FFE4C4]/30 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-[#FFD8A8]/20 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Side: Serif Heading, Audited Fund Breakdown */}
          <div className="lg:col-span-6 space-y-7 text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFF2E3] border border-[#FDE2C4] text-xs font-bold text-[#A34805] shadow-xs">
              <span className="w-2 h-2 rounded-full bg-[#E87A1E] animate-pulse"></span>
              AUDITED TRANSPARENCY • Q1 2026 LIVE DATA
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#381602] leading-tight">
              Where Your Support Goes
            </h2>

            <p className="text-base text-[#5C381E] leading-relaxed max-w-lg">
              Real-time transparency, verified community reports, and audited non-profit outcomes. Every dollar directly reaches community food, health, and child education.
            </p>

            {/* Fund Allocation Bar & 3 Compact Cards */}
            <div className="bg-white p-6 sm:p-7 rounded-3xl border border-[#F3DEC8] shadow-md space-y-5">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-base font-bold text-[#381602]">Fund Allocation</h4>
                  <p className="text-xs text-[#5C381E]">100% Audited Independent Financial Governance</p>
                </div>
                <span className="text-xs font-bold bg-[#FFF2E3] text-[#A34805] border border-[#FDE2C4] px-3 py-1 rounded-full">
                  94% Field Direct
                </span>
              </div>

              {/* Progress split bar */}
              <div className="w-full h-3 rounded-full overflow-hidden flex bg-gray-100">
                <div style={{ width: `${fundAllocation.directField}%` }} className="bg-[#E87A1E] h-full" title="88% Direct Field"></div>
                <div style={{ width: `${fundAllocation.education}%` }} className="bg-[#F8A863] h-full" title="7% Education"></div>
                <div style={{ width: `${fundAllocation.admin}%` }} className="bg-[#FDE2C4] h-full" title="5% Admin & Legal"></div>
              </div>

              {/* 3 Metrics breakdown */}
              <div className="grid grid-cols-3 gap-3 pt-2">
                <div className="bg-[#FFFDF9] p-3 rounded-2xl border border-[#F5DEC8]">
                  <div className="flex items-center gap-1.5 text-[11px] text-[#A34805] font-bold mb-1">
                    <span className="w-2 h-2 rounded-full bg-[#E87A1E]"></span>
                    Direct Seva
                  </div>
                  <div className="font-serif text-2xl font-bold text-[#381602]">{fundAllocation.directField}%</div>
                  <div className="text-[10px] text-gray-500 mt-1 line-clamp-2">
                    Warm meals, mobile clinic aid, rural nutrition kits
                  </div>
                </div>

                <div className="bg-[#FFFDF9] p-3 rounded-2xl border border-[#F5DEC8]">
                  <div className="flex items-center gap-1.5 text-[11px] text-[#A34805] font-bold mb-1">
                    <span className="w-2 h-2 rounded-full bg-[#F8A863]"></span>
                    Education
                  </div>
                  <div className="font-serif text-2xl font-bold text-[#381602]">{fundAllocation.education}%</div>
                  <div className="text-[10px] text-gray-500 mt-1 line-clamp-2">
                    Child schooling, learning kits, teacher honorariums
                  </div>
                </div>

                <div className="bg-[#FFFDF9] p-3 rounded-2xl border border-[#F5DEC8]">
                  <div className="flex items-center gap-1.5 text-[11px] text-[#A34805] font-bold mb-1">
                    <span className="w-2 h-2 rounded-full bg-[#FBCDA0]"></span>
                    Admin/Audit
                  </div>
                  <div className="font-serif text-2xl font-bold text-[#381602]">{fundAllocation.admin}%</div>
                  <div className="text-[10px] text-gray-500 mt-1 line-clamp-2">
                    Audits, legal compliance, secure digital infrastructure
                  </div>
                </div>
              </div>
            </div>

            {/* Certifications row */}
            <div className="flex items-center gap-4 text-xs text-[#5C381E] font-medium">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#E87A1E]" />
                <span>GuideStar Platinum 2026</span>
              </div>
              <span>•</span>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#E87A1E]" />
                <span>Charity Navigator 4-Star (100%)</span>
              </div>
            </div>

          </div>

          {/* Right Side: Elegant White Donation Form & Simulator Card */}
          <div className="lg:col-span-6">
            <div className="bg-white text-gray-900 rounded-3xl p-6 sm:p-8 shadow-xl border border-[#F3DEC8] relative text-left">
              
              {/* Card Header with Calculator icon */}
              <div className="flex items-center justify-between pb-4 border-b border-gray-100 mb-5">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#A34805] block">
                    Tangible Outcome Calculator
                  </span>
                  <h3 className="font-serif text-2xl font-bold text-[#381602]">
                    Simulate Your Impact
                  </h3>
                </div>
                <div className="w-10 h-10 rounded-2xl bg-[#FFF2E3] text-[#E87A1E] flex items-center justify-center border border-[#FDE2C4]">
                  <Calculator className="w-5 h-5 text-[#E87A1E]" />
                </div>
              </div>

              {/* Frequency selection */}
              <div className="grid grid-cols-2 bg-[#FFF2E3] p-1 rounded-full mb-5 border border-[#FDE2C4]">
                <button
                  type="button"
                  onClick={() => setFrequency('once')}
                  className={`py-2 text-xs font-bold rounded-full transition ${
                    frequency === 'once'
                      ? 'bg-white text-[#381602] shadow-xs'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Give Once
                </button>
                <button
                  type="button"
                  onClick={() => setFrequency('monthly')}
                  className={`py-2 text-xs font-bold rounded-full flex items-center justify-center gap-1.5 transition ${
                    frequency === 'monthly'
                      ? 'bg-[#E87A1E] text-white shadow-xs'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <Heart className="w-3.5 h-3.5 fill-current text-[#FDE2C4]" />
                  <span>Give Monthly (2X Impact)</span>
                </button>
              </div>

              {/* Preset Buttons ($10, $25, $50, $100) */}
              <div className="grid grid-cols-4 gap-2 mb-4">
                {[10, 25, 50, 100].map(val => (
                  <button
                    key={val}
                    type="button"
                    onClick={() => handlePreset(val)}
                    className={`py-2.5 rounded-xl text-xs font-bold transition border ${
                      pledge === val
                        ? 'bg-[#E87A1E] text-white border-[#E87A1E] shadow-sm ring-2 ring-[#E87A1E]/30'
                        : 'bg-white text-gray-800 border-gray-200 hover:bg-[#FFF2E3]/50 hover:border-[#E87A1E]'
                    }`}
                  >
                    ${val}
                  </button>
                ))}
              </div>

              {/* Slider & Custom Amount Input */}
              <div className="mb-5 bg-[#FFFDF9] p-4 rounded-2xl border border-[#F5DEC8]">
                <div className="flex justify-between items-center mb-2">
                  <label htmlFor="custom-monthly-pledge-input" className="text-xs font-semibold text-gray-700">Custom monthly pledge</label>
                  <span className="font-serif text-2xl font-bold text-[#381602]">${pledge}</span>
                </div>
                <input
                  id="custom-monthly-pledge-input"
                  aria-label="Custom monthly pledge"
                  type="range"
                  min="5"
                  max="200"
                  step="5"
                  value={pledge}
                  onChange={(e) => setPledge(parseInt(e.target.value))}
                  className="w-full accent-[#E87A1E] cursor-pointer"
                />
                <div className="flex justify-between text-[11px] text-gray-500 font-medium mt-1">
                  <span>$5</span>
                  <span>$100</span>
                  <span>$200</span>
                </div>
              </div>

              {/* Guaranteed Field Results Highlight */}
              <div className="bg-[#FFF2E3] border border-[#FDE2C4] rounded-2xl p-4 mb-5">
                <div className="flex items-center gap-1.5 text-xs font-bold text-[#A34805] uppercase tracking-wider mb-3">
                  <Utensils className="w-3.5 h-3.5 text-[#E87A1E]" />
                  GUARANTEED DIRECT COMMUNITY OUTCOMES
                </div>

                <div className="grid grid-cols-2 gap-3 mb-3">
                  <div className="bg-white p-3 rounded-xl border border-[#F5DEC8]">
                    <div className="font-serif text-2xl font-bold text-[#381602]">{hotMeals}</div>
                    <div className="text-xs text-gray-600 mt-0.5 leading-snug">
                      Hot Annadan meals served to elderly & hungry children
                    </div>
                  </div>

                  <div className="bg-white p-3 rounded-xl border border-[#F5DEC8]">
                    <div className="font-serif text-2xl font-bold text-[#381602]">{medicalKits}</div>
                    <div className="text-xs text-gray-600 mt-0.5 leading-snug">
                      Family emergency healthcare kits & consultation support
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs text-[#A34805] font-medium pt-1">
                  <span>Verified 80G Tax-Deductible Receipt</span>
                  <span className="font-bold text-[#E87A1E]">100% Verified Allocation</span>
                </div>
              </div>

              {/* Project selector & donor fields */}
              <div className="space-y-3 mb-5">
                <div>
                  <label className="text-xs font-semibold text-gray-700 block mb-1">Direct to Initiative</label>
                  <select
                    value={selectedProject}
                    onChange={(e) => setSelectedProject(e.target.value)}
                    className="w-full bg-[#FFFDF9] border border-gray-200 rounded-xl px-3 py-2 text-xs font-medium text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#E87A1E]"
                  >
                    <option value="general">🙏 General Annadan & Community Seva Fund</option>
                    {featuredProjects.map(p => (
                      <option key={p.id} value={p.id}>{p.title}</option>
                    ))}
                    <option value="education">🎓 Child Education & Learning Centers</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    placeholder="Your Name (Optional)"
                    value={donorName}
                    onChange={(e) => setDonorName(e.target.value)}
                    className="w-full bg-[#FFFDF9] border border-gray-200 rounded-xl px-3 py-2 text-xs text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#E87A1E]"
                  />
                  <input
                    type="email"
                    placeholder="Your Email"
                    value={donorEmail}
                    onChange={(e) => setDonorEmail(e.target.value)}
                    className="w-full bg-[#FFFDF9] border border-gray-200 rounded-xl px-3 py-2 text-xs text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#E87A1E]"
                  />
                </div>
              </div>

              {/* Large Continue to Donate Button */}
              <button
                type="button"
                onClick={handleContinue}
                className="w-full py-4 px-6 bg-[#E87A1E] hover:bg-[#D2640C] text-white font-bold rounded-2xl flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0"
              >
                <span>Support Community with ${pledge}{frequency === 'monthly' ? '/mo' : ''}</span>
                <ArrowRight className="w-4 h-4 text-white/90" />
              </button>

              <div className="flex items-center justify-center gap-3 text-[11px] text-gray-500 mt-3">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#E87A1E]" />
                  Bank Grade 256-bit SSL
                </span>
                <span>•</span>
                <span>Instant 80G Tax Receipt</span>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
