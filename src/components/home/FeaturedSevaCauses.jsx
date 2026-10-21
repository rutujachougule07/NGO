import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ArrowRight, Utensils, GraduationCap, HeartPulse, CheckCircle2, ShieldCheck } from 'lucide-react';

export default function FeaturedSevaCauses({ onOpenDonate }) {
  const causes = [
    {
      id: 'support',
      title: 'Daily Maha-Annadan Seva',
      category: 'Hunger Relief',
      icon: Utensils,
      image: '/hero_annadan.jpg',
      badge: 'Most Urgent • Daily Kitchen',
      desc: 'Serving fresh, sanctified, hot wholesome meals to elderly citizens, daily-wage laborers, and street children across community frontline kitchens.',
      suggestedAmount: 500,
      impactMetric: '₹500 sponsors 20 wholesome hot meals',
      donorsCount: '4,280+ meals sponsored this month',
    },
    {
      id: 'education',
      title: 'Underprivileged Child Education',
      category: 'Child Empowerment',
      icon: GraduationCap,
      image: '/hero_education.jpg',
      badge: 'Academic Term 2026',
      desc: 'Equipping bright young rural and slum children with high quality school bags, textbooks, geometry boxes, shoes, and dedicated youth coaching.',
      suggestedAmount: 1000,
      impactMetric: '₹1,000 sponsors complete schooling kit & mentoring',
      donorsCount: '1,150+ students supported',
    },
    {
      id: 'healthcare',
      title: 'Mobile Health Clinics & Medicines',
      category: 'Medical Relief',
      icon: HeartPulse,
      image: '/hero_medical.jpg',
      badge: 'Weekly Mobile Dispensary',
      desc: 'Volunteer specialist doctors delivering free medical screening, pediatric care, vital checkups, and free medicines to remote drought-hit villages.',
      suggestedAmount: 2500,
      impactMetric: '₹2,500 funds health checkup & medicines for 5 families',
      donorsCount: '120+ free mobile health camps',
    }
  ];

  return (
    <section className="py-16 sm:py-22 bg-[#FDFBF7] border-t border-[#F7E6D4] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header - Centered */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-14 space-y-3.5">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FFF2E3] text-xs font-bold text-[#A34805] border border-[#F5DEC8] shadow-xs">
            <Heart className="w-3.5 h-3.5 text-[#E87A1E] fill-current" />
            <span>DIRECT CONTRIBUTION CAUSES • 100% 80G TAX EXEMPT</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#381602] tracking-tight">
            Support Our Core Seva Initiatives
          </h2>
          <p className="text-sm sm:text-base text-stone-600 max-w-2xl mx-auto leading-relaxed">
            Choose a specific cause close to your heart. Every single rupee goes directly to food, medicine, and child schooling with full audited accountability.
          </p>
          <div className="pt-2">
            <Link
              to="/programs"
              className="inline-flex items-center gap-2 px-6 py-2.5 bg-white text-[#381602] hover:bg-[#FFF2E3] border border-[#F3DEC8] rounded-full text-xs sm:text-sm font-bold shadow-xs hover:shadow transition"
            >
              <span>View All Programs & Initiatives</span>
              <ArrowRight className="w-4 h-4 text-[#E87A1E]" />
            </Link>
          </div>
        </div>

        {/* 3 Featured Seva Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {causes.map((cause) => {
            const Icon = cause.icon;
            return (
              <div
                key={cause.id}
                className="bg-white rounded-3xl overflow-hidden border border-[#F3DEC8] shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group text-left"
              >
                <div>
                  {/* Photo with Overlay Badge */}
                  <div className="relative h-56 sm:h-60 overflow-hidden bg-stone-100">
                    <img
                      src={cause.image}
                      alt={cause.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>

                    <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md px-3 py-1 rounded-full text-[11px] font-bold text-[#381602] border border-[#F5DEC8]">
                      {cause.badge}
                    </div>

                    <div className="absolute bottom-3 left-4 right-4 text-white">
                      <div className="flex items-center gap-2 text-xs font-semibold text-[#FFB86A]">
                        <Icon className="w-4 h-4" />
                        <span>{cause.category}</span>
                      </div>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-6 space-y-3.5">
                    <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#381602] leading-snug group-hover:text-[#E87A1E] transition">
                      {cause.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-stone-600 leading-relaxed line-clamp-3">
                      {cause.desc}
                    </p>

                    {/* Tangible Impact Box */}
                    <div className="p-3 rounded-2xl bg-[#FFFDF9] border border-[#F5DEC8] text-xs space-y-1">
                      <div className="font-bold text-[#A34805] flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#E87A1E] shrink-0" />
                        <span>{cause.impactMetric}</span>
                      </div>
                      <div className="text-[11px] text-stone-500">
                        {cause.donorsCount}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bottom Donation CTA Bar */}
                <div className="p-6 pt-0">
                  <button
                    onClick={() => onOpenDonate({ amount: cause.suggestedAmount, project: cause.id })}
                    className="w-full py-3.5 bg-[#E87A1E] hover:bg-[#D2640C] text-white text-xs sm:text-sm font-bold rounded-2xl shadow-sm hover:shadow transition flex items-center justify-center gap-2 transform active:scale-98"
                  >
                    <Heart className="w-4 h-4 fill-current text-white/90" />
                    <span>Donate ₹{cause.suggestedAmount.toLocaleString('en-IN')} for this Seva</span>
                  </button>
                  <div className="text-center mt-2 text-[10px] text-stone-400">
                    Instant 80G Tax Exemption Certificate Generated
                  </div>
                </div>

              </div>
            );
          })}
        </div>

        {/* Bottom Guarantee Strip */}
        <div className="mt-12 bg-white rounded-2xl p-4 border border-[#F3DEC8] flex flex-wrap items-center justify-between gap-4 text-xs text-stone-600 shadow-xs">
          <div className="flex items-center gap-2 font-semibold text-[#381602]">
            <ShieldCheck className="w-4 h-4 text-[#E87A1E]" />
            <span>100% Direct Field Allocation • Zero Intermediary Waste</span>
          </div>
          <Link
            to="/programs"
            className="text-xs font-bold text-[#E87A1E] hover:underline flex items-center gap-1"
          >
            <span>Browse all other initiatives on Programs page</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

      </div>
    </section>
  );
}
