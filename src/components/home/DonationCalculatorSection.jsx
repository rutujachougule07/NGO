import React from 'react';
import { 
  ShieldCheck, 
  CheckCircle2, 
  Heart, 
  FileText, 
  Award, 
  TrendingUp,
  Sparkles,
  ArrowRight,
  Lock
} from 'lucide-react';
import { fundAllocation, foundationInfo } from '../../data/mockData';

export default function DonationCalculatorSection({ onOpenDonate }) {
  return (
    <section className="py-16 sm:py-24 bg-[#FFFDF9] border-t border-[#F7E6D4] relative overflow-hidden text-left">
      {/* Decorative Warm Auras */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#FFE4C4]/25 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#FFD8A8]/20 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FFF2E3] text-xs font-bold text-[#A34805] mb-3 border border-[#F5DEC8]">
            <Sparkles className="w-3.5 h-3.5 text-[#E87A1E]" />
            <span>100% FINANCIAL TRANSPARENCY & AUDITED GOVERNANCE</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#381602] tracking-tight">
            Where Your Support Goes
          </h2>
          <p className="text-sm sm:text-base text-stone-600 mt-3 leading-relaxed">
            Trust is the foundation of our seva. Every single rupee received is audited independently and deployed directly to provide food, healthcare, and education to those in need.
          </p>
        </div>

        {/* 2-Column Clean Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Fund Allocation Infographic (7 Cols) */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-9 border border-[#F3DEC8] shadow-sm space-y-6">
            
            <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-[#F7E6D4]">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#A34805]">
                  AUDITED BREAKDOWN (Q1 2026)
                </span>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#381602]">
                  How Every ₹100 is Utilized
                </h3>
              </div>
              <span className="text-xs font-bold px-3 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-full inline-flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                95% Direct Mission Impact
              </span>
            </div>

            {/* Visual Segmented Progress Bar */}
            <div className="space-y-2">
              <div className="w-full h-4 rounded-full overflow-hidden flex bg-stone-100 p-0.5 border border-[#F5DEC8]">
                <div 
                  style={{ width: `${fundAllocation.directField}%` }} 
                  className="bg-[#E87A1E] h-full rounded-l-full transition-all duration-700"
                  title="88% Direct Field Seva"
                ></div>
                <div 
                  style={{ width: `${fundAllocation.education}%` }} 
                  className="bg-[#F8A863] h-full transition-all duration-700"
                  title="7% Education Mentoring"
                ></div>
                <div 
                  style={{ width: `${fundAllocation.admin}%` }} 
                  className="bg-[#FBCDA0] h-full rounded-r-full transition-all duration-700"
                  title="5% Independent CA Audit & Legal"
                ></div>
              </div>
              <div className="flex justify-between text-[11px] text-stone-500 font-medium px-1">
                <span className="text-[#E87A1E] font-bold">● 88% Direct Seva</span>
                <span className="text-[#C8640C] font-bold">● 7% Education Mentoring</span>
                <span className="text-stone-500 font-bold">● 5% Audit & Legal</span>
              </div>
            </div>

            {/* 3 Detail Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-[#FFFDF9] border border-[#F5DEC8] space-y-1">
                <div className="text-[11px] font-bold text-[#A34805] uppercase">Direct Seva</div>
                <div className="font-serif text-3xl font-bold text-[#E87A1E]">88%</div>
                <p className="text-xs text-stone-600 leading-snug">
                  Fresh Annadan hot meals, emergency medicines & child school kits.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-[#FFFDF9] border border-[#F5DEC8] space-y-1">
                <div className="text-[11px] font-bold text-[#A34805] uppercase">Education & Mentoring</div>
                <div className="font-serif text-3xl font-bold text-[#381602]">7%</div>
                <p className="text-xs text-stone-600 leading-snug">
                  Volunteer teachers, remedial classes & girl-child guidance.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-[#FFFDF9] border border-[#F5DEC8] space-y-1">
                <div className="text-[11px] font-bold text-[#A34805] uppercase">Audits & Legal</div>
                <div className="font-serif text-3xl font-bold text-[#381602]">5%</div>
                <p className="text-xs text-stone-600 leading-snug">
                  Independent CA balance-sheet audits & secure digital receipt systems.
                </p>
              </div>
            </div>

            {/* Trust Certifications Banner */}
            <div className="pt-2 flex flex-wrap items-center justify-between gap-4 text-xs text-stone-600 border-t border-[#F7E6D4]">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#E87A1E]" />
                <span className="font-semibold text-[#381602]">Section 80G Certified Non-Profit</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-[#E87A1E]" />
                <span className="font-semibold text-[#381602]">GuideStar Platinum 2026</span>
              </div>
              <div className="flex items-center gap-2">
                <Lock className="w-4 h-4 text-[#E87A1E]" />
                <span className="font-semibold text-[#381602]">256-bit Bank Grade Security</span>
              </div>
            </div>

          </div>

          {/* Right Column: Tax Benefit & Direct Seva Contribution Card (5 Cols) */}
          <div className="lg:col-span-5 bg-gradient-to-br from-[#381602] via-[#4A1E03] to-[#2B1001] text-white rounded-3xl p-7 sm:p-9 shadow-xl relative overflow-hidden flex flex-col justify-between">
            {/* Subtle overlay aura */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#E87A1E]/15 rounded-full blur-2xl pointer-events-none"></div>

            <div className="space-y-6 relative z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-[11px] font-bold text-[#FFB86A] border border-white/15">
                <FileText className="w-3.5 h-3.5" />
                <span>50% TAX DEDUCTION UNDER SEC 80G</span>
              </div>

              <h3 className="font-serif text-2xl sm:text-3xl font-bold leading-snug">
                Your Contribution Is 100% Tax-Deductible
              </h3>

              <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
                As a certified registered non-profit, all donations made to Immense Life Foundation qualify for tax deductions under Section 80G(5)(vi) of the Income Tax Act.
              </p>

              {/* 3 Benefits bullets */}
              <div className="space-y-3 pt-1">
                <div className="flex items-start gap-3 text-xs text-stone-200">
                  <CheckCircle2 className="w-4 h-4 text-[#FFB86A] shrink-0 mt-0.5" />
                  <span><strong>Instant 80G Tax Receipt</strong> generated immediately on payment.</span>
                </div>
                <div className="flex items-start gap-3 text-xs text-stone-200">
                  <CheckCircle2 className="w-4 h-4 text-[#FFB86A] shrink-0 mt-0.5" />
                  <span><strong>Transparent Ground Reports</strong> emailed with photo proof of meals & camps.</span>
                </div>
                <div className="flex items-start gap-3 text-xs text-stone-200">
                  <CheckCircle2 className="w-4 h-4 text-[#FFB86A] shrink-0 mt-0.5" />
                  <span><strong>Convenient UPI & Card Options</strong> with zero processing deduction.</span>
                </div>
              </div>
            </div>

            <div className="pt-8 relative z-10">
              <button
                onClick={() => onOpenDonate()}
                className="w-full py-4 px-6 bg-[#E87A1E] hover:bg-[#D2640C] text-white font-bold rounded-2xl flex items-center justify-center gap-2 shadow-lg transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0"
              >
                <Heart className="w-4 h-4 fill-current text-white/90" />
                <span>Make a Tax-Deductible Donation</span>
                <ArrowRight className="w-4 h-4 text-white/90" />
              </button>
              <p className="text-center text-[11px] text-stone-400 mt-2.5">
                Reg. No: 501(c)(3) & Section 80G / 12A Certified
              </p>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
