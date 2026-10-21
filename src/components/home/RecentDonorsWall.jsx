import React from 'react';
import { Heart, ShieldCheck, CheckCircle2, Award, Users, Sparkles, ArrowRight } from 'lucide-react';
import { useNGO } from '../../context/NGOContext';

export default function RecentDonorsWall({ onOpenDonate }) {
  const { transactions } = useNGO();

  // Filter completed transactions, take the latest 6 donors
  const completedTxns = transactions.filter(t => t.status === 'Completed').slice(0, 6);

  // Total community raised
  const totalRaised = transactions
    .filter(t => t.status === 'Completed')
    .reduce((sum, t) => sum + (Number(t.amount) || 0), 0);

  return (
    <section className="py-16 sm:py-24 bg-gradient-to-b from-[#FDFBF7] via-[#FFFDF9] to-[#FDFBF7] border-t border-[#F7E6D4] relative overflow-hidden">
      
      {/* Decorative Warm Auras */}
      <div className="absolute top-1/2 -left-20 w-80 h-80 bg-[#FFE4C4]/35 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-10 -right-20 w-80 h-80 bg-[#FFD8A8]/25 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header - Centered */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-14 space-y-3.5">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FFF2E3] text-xs font-bold text-[#A34805] border border-[#F5DEC8] shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-[#E87A1E]" />
            <span>WALL OF GRATITUDE • RECENT SEVA CONTRIBUTORS</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#381602] tracking-tight">
            Honoring Our Compassionate Donors
          </h2>
          <p className="text-sm sm:text-base text-stone-600 max-w-2xl mx-auto leading-relaxed">
            Every single contribution directly feeds a hungry elder, heals a sick patient, or sends a child to school. We express our deepest gratitude to our benevolent supporters.
          </p>
          <div className="pt-2">
            <button
              onClick={() => onOpenDonate()}
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#E87A1E] hover:bg-[#D2640C] text-white rounded-full text-xs sm:text-sm font-bold shadow-md hover:shadow-lg transition transform hover:-translate-y-0.5 active:translate-y-0"
            >
              <Heart className="w-4 h-4 fill-current text-white/90" />
              <span>Join This Wall of Compassion</span>
            </button>
          </div>
        </div>

        {/* 6 Donor Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {completedTxns.map((donor, idx) => {
            const initials = donor.customerName
              ? donor.customerName
                  .split(' ')
                  .map(n => n[0])
                  .join('')
                  .toUpperCase()
                  .slice(0, 2)
              : 'IL';

            return (
              <div
                key={donor.id || idx}
                className="bg-white rounded-3xl p-6 border border-[#F3DEC8] shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between group hover:border-[#E87A1E]/40 text-left"
              >
                <div>
                  {/* Top Bar: Avatar Initials + Amount */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-[#E87A1E] via-[#F8B26A] to-[#FFF2E3] p-0.5 shadow-xs flex items-center justify-center">
                        <div className="w-full h-full rounded-full bg-white flex items-center justify-center font-serif font-bold text-sm text-[#A34805]">
                          {initials}
                        </div>
                      </div>
                      <div>
                        <h4 className="font-serif font-bold text-base text-[#381602] leading-tight">
                          {donor.customerName || 'Anonymous Donor'}
                        </h4>
                        <span className="text-[11px] text-stone-500 block mt-0.5">
                          {donor.date || 'Recent Seva'}
                        </span>
                      </div>
                    </div>

                    <div className="text-right">
                      <span className="font-serif text-xl sm:text-2xl font-bold text-[#E87A1E] block">
                        ₹{Number(donor.amount || 0).toLocaleString('en-IN')}
                      </span>
                      <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200 inline-flex items-center gap-1">
                        <CheckCircle2 className="w-2.5 h-2.5 text-emerald-600" />
                        80G Verified
                      </span>
                    </div>
                  </div>

                  {/* Project Tag */}
                  <div className="bg-[#FFFDF9] rounded-2xl p-3 border border-[#F5DEC8]/80 text-xs">
                    <span className="text-[10px] font-bold text-[#A34805] uppercase tracking-wider block">
                      SEVA INITIATIVE SUPPORTED:
                    </span>
                    <span className="font-semibold text-[#381602] mt-0.5 block truncate">
                      {donor.project || 'General Daily Annadan & Seva Fund'}
                    </span>
                  </div>
                </div>

                {/* Card Footer: Receipt / Payment Mode */}
                <div className="mt-4 pt-3 border-t border-[#F5DEC8]/60 flex items-center justify-between text-[11px] text-stone-500 font-medium">
                  <span className="flex items-center gap-1 text-[#381602]">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#E87A1E]" />
                    <span>Receipt #{donor.receiptNo || donor.id}</span>
                  </span>
                  <span className="text-[#A34805] font-semibold">
                    {donor.paymentMethod || 'UPI / Online'}
                  </span>
                </div>

              </div>
            );
          })}
        </div>

        {/* Live Community Total Bar */}
        <div className="mt-12 bg-white rounded-3xl p-6 sm:p-7 border border-[#F3DEC8] shadow-sm flex flex-col md:flex-row items-center justify-between gap-6 text-left">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-[#FFF2E3] text-[#A34805] flex items-center justify-center shrink-0 border border-[#F5DEC8]">
              <Users className="w-7 h-7 text-[#E87A1E]" />
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#A34805] block">
                COMMUNITY TRANSPARENCY
              </span>
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#381602]">
                100% Tax-Deductible Community Impact
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 mt-0.5">
                All donations are audited independently and qualify for 50% tax exemption under Section 80G(5)(vi).
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 shrink-0">
            <div className="text-right">
              <span className="text-[11px] font-bold text-stone-500 uppercase block">
                Total Seva Funds Logged
              </span>
              <span className="font-serif text-2xl sm:text-3xl font-bold text-[#381602]">
                ₹{totalRaised.toLocaleString('en-IN')}
              </span>
            </div>
            <button
              onClick={() => onOpenDonate()}
              className="px-6 py-3 bg-[#E87A1E] hover:bg-[#D2640C] text-white text-xs sm:text-sm font-bold rounded-2xl shadow-sm hover:shadow transition flex items-center gap-2"
            >
              <Heart className="w-4 h-4 fill-current text-white/90" />
              <span>Donate Now</span>
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
