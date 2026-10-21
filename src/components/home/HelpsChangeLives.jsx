import React from 'react';
import { HeartPulse, Gift, GraduationCap, Heart, ArrowRight } from 'lucide-react';

export default function HelpsChangeLives({ onOpenDonate }) {
  const causes = [
    {
      id: 'healthcare',
      title: 'Support Life-Saving Healthcare',
      desc: 'Provide medical checkups, essential medicines, and emergency treatments for elders and families who cannot afford healthcare.',
      icon: HeartPulse,
      image: 'https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&w=700&q=80',
      badge: 'Medical Relief',
    },
    {
      id: 'support',
      title: 'Compassion-Driven Annadan',
      desc: 'Provide daily wholesome nutritious food packs to families battling hunger. Your support ensures children and elders sleep nourished.',
      icon: Gift,
      image: 'https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=700&q=80',
      badge: 'Nutrition & Annadan',
    },
    {
      id: 'education',
      title: 'Give Children a Chance to Learn',
      desc: 'Help underprivileged children access quality schooling through books, uniforms, and learning kits. Your contribution shapes their future.',
      icon: GraduationCap,
      image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=700&q=80',
      badge: 'Child Education',
    },
  ];

  return (
    <section className="py-16 sm:py-20 bg-[#FDFBF7] border-t border-[#F7E6D4]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-14 gap-4 text-left">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFF2E3] text-xs font-bold text-[#A34805] border border-[#FDE2C4] mb-2.5">
              <span className="w-2 h-2 rounded-full bg-[#E87A1E]"></span>
              <span>DIRECT IMPACT SEVA</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#381602] tracking-tight">
              Helps Change Lives
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#5C381E] max-w-md leading-relaxed">
            Explore the initiatives that directly uplift families and children. Every contribution you make creates verified, measurable transformation.
          </p>
        </div>

        {/* 3 Horizontal Split Cards */}
        <div className="space-y-6">
          {causes.map((cause) => {
            const Icon = cause.icon;
            return (
              <div
                key={cause.id}
                className="bg-white rounded-3xl p-6 sm:p-8 border border-[#F3DEC8] shadow-xs hover:shadow-md transition-all duration-300 flex flex-col md:flex-row items-center justify-between gap-6"
              >
                {/* Left: Text & Action */}
                <div className="flex-1 space-y-3.5 pr-0 md:pr-6 text-left">
                  <div className="w-10 h-10 rounded-full bg-[#FFF2E3] text-[#E87A1E] flex items-center justify-center border border-[#FDE2C4]">
                    <Icon className="w-5 h-5" />
                  </div>
                  
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#381602]">
                    {cause.title}
                  </h3>
                  
                  <p className="text-xs sm:text-sm text-[#5C381E] leading-relaxed max-w-xl">
                    {cause.desc}
                  </p>

                  <div className="pt-2">
                    <button
                      onClick={() => onOpenDonate({ project: cause.id })}
                      className="px-5 py-2.5 bg-[#E87A1E] hover:bg-[#D2640C] text-white text-xs sm:text-sm font-bold rounded-full transition-all duration-200 shadow-xs flex items-center gap-2"
                    >
                      <Heart className="w-3.5 h-3.5 fill-current text-white/90" />
                      <span>Donate Now</span>
                    </button>
                  </div>
                </div>

                {/* Right: Rounded Image */}
                <div className="w-full md:w-80 lg:w-96 shrink-0">
                  <div className="relative rounded-2xl overflow-hidden aspect-[16/10] shadow-sm border border-[#F7E6D4]">
                    <img
                      src={cause.image}
                      alt={cause.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-md px-2.5 py-1 rounded-full text-[10px] font-bold text-[#A34805] border border-[#F5DEC8]">
                      {cause.badge}
                    </div>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
