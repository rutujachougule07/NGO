import React from 'react';
import { areasOfWork } from '../data/mockData';
import { 
  Utensils,
  GraduationCap, 
  Sparkles, 
  HeartPulse, 
  Building2, 
  Sprout, 
  Scale, 
  Heart, 
  CheckCircle2, 
  ArrowRight 
} from 'lucide-react';

export default function ProgramsPage({ onOpenDonate }) {
  const iconMap = {
    Utensils,
    GraduationCap,
    Sparkles,
    HeartPulse,
    Building2,
    Sprout,
    Scale,
  };

  return (
    <div className="bg-[#FDFBF7] py-14 lg:py-20 text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Header - Centered */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FFF2E3] text-xs font-bold text-[#A34805] border border-[#FDE2C4] shadow-xs">
            <span className="w-2 h-2 rounded-full bg-[#E87A1E] animate-pulse"></span>
            HOLISTIC SOCIAL SEVA INITIATIVES
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#381602] leading-tight">
            Our Core Community Programs
          </h1>
          <p className="text-base sm:text-lg text-[#5C381E] leading-relaxed max-w-2xl mx-auto">
            Meaningful community transformation requires integrated seva. Our initiatives bring together wholesome Annadan nutrition, medical healthcare, child education kits, and rural family empowerment.
          </p>
        </div>

        {/* Detailed Program Pillars List */}
        <div className="space-y-12">
          {areasOfWork.map((area, idx) => {
            const Icon = iconMap[area.icon] || Sprout;
            const isEven = idx % 2 === 0;

            return (
              <div
                key={area.id}
                id={area.id}
                className="bg-white rounded-3xl p-8 sm:p-10 border border-[#F3DEC8] shadow-sm hover:shadow-md transition grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
              >
                {/* Image */}
                <div className={`lg:col-span-5 ${isEven ? 'lg:order-1' : 'lg:order-2'}`}>
                  <div className="rounded-2xl overflow-hidden shadow-md h-64 sm:h-80 border border-[#F7E6D4]">
                    <img
                      src={area.image}
                      alt={area.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                </div>

                {/* Content */}
                <div className={`lg:col-span-7 space-y-4 ${isEven ? 'lg:order-2' : 'lg:order-1'}`}>
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-2xl bg-[#FFF2E3] text-[#E87A1E] flex items-center justify-center border border-[#FDE2C4]">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-bold bg-[#FFF2E3] text-[#A34805] border border-[#FDE2C4] px-3 py-1 rounded-full">
                      {area.metric}
                    </span>
                  </div>

                  <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#381602]">
                    {area.title}
                  </h3>

                  <p className="text-sm text-[#5C381E] leading-relaxed">
                    {area.desc}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    <div className="flex items-center gap-2 text-xs font-semibold text-[#8A3B04]">
                      <CheckCircle2 className="w-4 h-4 text-[#E87A1E] shrink-0" />
                      <span>100% Direct Village Led</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs font-semibold text-[#8A3B04]">
                      <CheckCircle2 className="w-4 h-4 text-[#E87A1E] shrink-0" />
                      <span>Continuous Impact Auditing</span>
                    </div>
                  </div>

                  <div className="pt-4 flex items-center gap-3">
                    <button
                      onClick={() => onOpenDonate({ project: area.id })}
                      className="px-6 py-2.5 bg-[#E87A1E] hover:bg-[#D2640C] text-white text-xs font-bold rounded-full transition flex items-center gap-2 shadow-xs hover:shadow"
                    >
                      <Heart className="w-3.5 h-3.5 fill-current text-white/90" />
                      <span>Sponsor this Program</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
}
