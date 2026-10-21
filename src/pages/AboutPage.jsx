import React from 'react';
import { Target, Eye, ShieldCheck, Award, Heart, CheckCircle2, ArrowRight } from 'lucide-react';
import { foundationInfo } from '../data/mockData';

export default function AboutPage({ onOpenDonate }) {
  const leadership = [
    {
      name: "Dr. Alistair Vance",
      role: "Executive Director & Co-Founder",
      bio: "20+ years leading community welfare, healthcare outreach, and sustainable relief across South Asia.",
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80"
    },
    {
      name: "Priyanka Nambiar",
      role: "Head of Community Seva Programs",
      bio: "Pioneered decentralized Annadan food kitchens and women's self-help empowerment centers in 140+ rural villages.",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80"
    },
    {
      name: "Marcus Thorne, CPA",
      role: "Chief Financial & Audit Officer",
      bio: "Ensures 100% transparent, auditable donor ledgers and strict compliance with global non-profit standards.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80"
    }
  ];

  return (
    <div className="bg-[#FDFBF7] py-14 lg:py-20 text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Header Hero - Centered */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FFF2E3] text-xs font-bold text-[#A34805] border border-[#FDE2C4] shadow-xs">
            <span className="w-2 h-2 rounded-full bg-[#E87A1E] animate-pulse"></span>
            OUR STORY & PHILOSOPHY
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#381602] leading-tight">
            Serve, Support & Uplift Human Dignity.
          </h1>
          <p className="text-base sm:text-lg text-[#5C381E] leading-relaxed max-w-2xl mx-auto">
            Immense Life Foundation was established on the ideals of selfless seva, compassionate community care, child education, and holistic empowerment. We believe human lives flourish best when supported with love, dignity, and transparency.
          </p>
        </div>

        {/* 3 Pillars of Trust */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-3xl border border-[#F3DEC8] shadow-sm">
            <div className="w-12 h-12 rounded-2xl bg-[#FFF2E3] text-[#E87A1E] flex items-center justify-center mb-4 border border-[#FDE2C4]">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-xl font-bold text-[#381602] mb-2">Uncompromising Transparency</h3>
            <p className="text-xs sm:text-sm text-[#5C381E] leading-relaxed">
              Every single gift is accounted for with open verified reports and audits. 88% of funds go straight to frontline food, medical, and educational relief.
            </p>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-[#F3DEC8] shadow-sm">
            <div className="w-12 h-12 rounded-2xl bg-[#FFF2E3] text-[#E87A1E] flex items-center justify-center mb-4 border border-[#FDE2C4]">
              <Target className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-xl font-bold text-[#381602] mb-2">Community Ownership</h3>
            <p className="text-xs sm:text-sm text-[#5C381E] leading-relaxed">
              We listen to community elders, rural families, and local volunteers to deploy aid where it is most needed with deep cultural respect.
            </p>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-[#F3DEC8] shadow-sm">
            <div className="w-12 h-12 rounded-2xl bg-[#FFF2E3] text-[#E87A1E] flex items-center justify-center mb-4 border border-[#FDE2C4]">
              <Award className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-xl font-bold text-[#381602] mb-2">Verified Ground Outcomes</h3>
            <p className="text-xs sm:text-sm text-[#5C381E] leading-relaxed">
              We track daily Annadan meal counts, medical clinic visits, and child schooling progress with rigorous surveys and photo documentation.
            </p>
          </div>
        </div>

        {/* Leadership Team */}
        <div>
          <div className="text-center max-w-xl mx-auto mb-12">
            <h2 className="font-serif text-3xl font-bold text-[#381602]">
              Leadership & Governance
            </h2>
            <p className="text-sm text-[#5C381E] mt-2">
              Guided by devoted humanitarians, social workers, and independent fiscal trustees.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {leadership.map((member, i) => (
              <div key={i} className="bg-white rounded-3xl overflow-hidden border border-[#F3DEC8] shadow-sm p-6 text-center">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-28 h-28 rounded-full object-cover mx-auto mb-4 border-4 border-[#FFF2E3] shadow-md"
                />
                <h4 className="font-serif font-bold text-lg text-[#381602]">{member.name}</h4>
                <p className="text-xs font-semibold text-[#A34805] mt-0.5 mb-3">{member.role}</p>
                <p className="text-xs text-[#5C381E] leading-relaxed">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Banner */}
        <div className="bg-gradient-to-r from-[#FFF2E3] via-[#FFFDF9] to-[#FDE2C4] text-[#381602] rounded-3xl p-8 sm:p-12 border border-[#F3DEC8] shadow-md flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold mb-2">
              Want to Join our Seva Mission?
            </h3>
            <p className="text-xs sm:text-sm text-[#5C381E] max-w-xl">
              Support our ongoing campaigns, volunteer in the field, or partner your retail store through our transparent QR Seva program.
            </p>
          </div>
          <button
            onClick={() => onOpenDonate()}
            className="px-8 py-4 bg-[#E87A1E] hover:bg-[#D2640C] text-white font-bold text-sm rounded-full transition shadow-sm shrink-0 flex items-center gap-2"
          >
            <Heart className="w-4 h-4 fill-current text-white/90" />
            <span>Donate Today</span>
          </button>
        </div>

      </div>
    </div>
  );
}
