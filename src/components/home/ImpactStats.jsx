import React from 'react';
import { Users, Utensils, GraduationCap, HeartHandshake } from 'lucide-react';

export default function ImpactStats() {
  const stats = [
    {
      id: 'lives',
      value: '25,000+',
      label: 'Lives Impacted',
      subtext: 'Through community seva and medical relief clinics.',
      icon: Users,
    },
    {
      id: 'meals',
      value: '75,000+',
      label: 'Warm Meals Served',
      subtext: 'Daily nutritious Annadan in rural & slum shelters.',
      icon: Utensils,
    },
    {
      id: 'students',
      value: '8,300+',
      label: 'Students Supported',
      subtext: 'Providing education kits, uniforms, and mentoring.',
      icon: GraduationCap,
    },
    {
      id: 'volunteers',
      value: '1,200+',
      label: 'Active Seva Volunteers',
      subtext: 'Dedicated souls serving with love and humility.',
      icon: HeartHandshake,
    },
  ];

  return (
    <section className="py-12 sm:py-16 bg-[#FDFBF7] border-t border-[#F7E6D4] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Centered Heading */}
        <div className="text-center mb-12 sm:mb-14">
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#381602] tracking-tight">
            Our Impact
          </h2>
          <div className="w-12 h-0.5 bg-[#E87A1E] mx-auto mt-3 rounded-full opacity-80"></div>
        </div>

        {/* 4 Clean Stat Columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
          {stats.map((item) => {
            const Icon = item.icon;
            return (
              <div 
                key={item.id} 
                className="flex items-start gap-4 p-4 rounded-2xl hover:bg-white/80 transition-colors duration-200"
              >
                {/* Circular soft saffron icon */}
                <div className="w-12 h-12 rounded-full bg-[#FFF2E3] text-[#E87A1E] flex items-center justify-center shrink-0 mt-0.5 border border-[#FDE2C4]">
                  <Icon className="w-5 h-5" />
                </div>

                <div className="flex-1 text-left">
                  <div className="font-serif text-2xl sm:text-3xl font-bold text-[#381602] leading-tight">
                    {item.value}
                  </div>
                  <div className="text-sm font-bold text-[#381602] mt-1">
                    {item.label}
                  </div>
                  <p className="text-xs text-[#5C381E] leading-relaxed mt-1">
                    {item.subtext}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
