import React from 'react';
import { partners } from '../../data/mockData';

export default function PartnersSection() {
  return (
    <section className="py-14 bg-[#FFFDF9] border-t border-[#F7E6D4]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-8">
          <span className="text-xs font-bold uppercase tracking-widest text-[#8A3B04]">
            Accredited by Leading Non-Profit Alliances & Auditing Bodies
          </span>
        </div>

        {/* Partners horizontal strip */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 items-center">
          {partners.map((partner, idx) => (
            <div
              key={idx}
              className="bg-white hover:bg-[#FFF2E3]/50 p-4 rounded-2xl border border-[#F3DEC8] shadow-xs hover:shadow-md transition text-center flex flex-col items-center justify-center gap-1 group"
            >
              <div className="text-sm font-bold text-gray-800 group-hover:text-[#381602] transition-colors">
                {partner.logo}
              </div>
              <div className="text-[10px] font-semibold text-[#A34805] uppercase tracking-wider">
                {partner.badge}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
