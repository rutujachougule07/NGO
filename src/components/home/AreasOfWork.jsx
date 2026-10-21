import React from 'react';
import { Link } from 'react-router-dom';
import { 
  GraduationCap, 
  Sparkles, 
  HeartPulse, 
  Building2, 
  Sprout, 
  Scale, 
  ArrowRight 
} from 'lucide-react';
import { areasOfWork } from '../../data/mockData';

export default function AreasOfWork() {
  const iconMap = {
    GraduationCap,
    Sparkles,
    HeartPulse,
    Building2,
    Sprout,
    Scale,
  };

  return (
    <section className="py-20 lg:py-24 bg-[#F8FAF9] border-t border-[#E3ECE6] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-emerald-200 text-xs font-bold text-emerald-900 mb-3 shadow-xs">
            <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
            PILLARS OF CHANGE
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#143D2B] leading-tight">
            Our Core Areas of Work
          </h2>
          <p className="text-sm sm:text-base text-gray-600 mt-3">
            Holistic community transformation requiring integrated solutions that safeguard both human dignity and ecological equilibrium.
          </p>
        </div>

        {/* 6 Compact Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {areasOfWork.map((area) => {
            const Icon = iconMap[area.icon] || Sprout;
            return (
              <div
                key={area.id}
                className="group bg-white rounded-3xl p-6 border border-[#E0EBE4] shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between hover:-translate-y-1 relative overflow-hidden"
              >
                {/* Decorative image accent on hover */}
                <div className="absolute top-0 right-0 w-28 h-28 -mr-6 -mt-6 rounded-full overflow-hidden opacity-0 group-hover:opacity-20 transition-opacity duration-300 pointer-events-none">
                  <img src={area.image} alt={area.title} className="w-full h-full object-cover" />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-12 h-12 rounded-2xl bg-[#E8EFEA] text-[#143D2B] flex items-center justify-center group-hover:bg-[#143D2B] group-hover:text-white transition-colors duration-300 shadow-sm">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-100">
                      {area.metric}
                    </span>
                  </div>

                  <h3 className="font-serif text-xl font-bold text-[#143D2B] mb-2 group-hover:text-emerald-900 transition-colors">
                    {area.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#4E5F57] leading-relaxed">
                    {area.desc}
                  </p>
                </div>

                <div className="pt-6 mt-4 border-t border-gray-100 flex items-center justify-between">
                  <Link
                    to={`/programs#${area.id}`}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#143D2B] group-hover:text-emerald-700 transition"
                  >
                    <span>Explore Field Initiatives</span>
                    <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
