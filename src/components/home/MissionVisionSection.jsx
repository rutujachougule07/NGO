import React from 'react';
import { Eye, Target, Sparkles, Heart } from 'lucide-react';

export default function MissionVisionSection() {
  return (
    <section className="py-16 sm:py-20 bg-[#FDFBF7] border-t border-[#F7E6D4]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Split Section: Artwork on Left + Vision / Mission on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: Hands holding seedling / Seva photo */}
          <div className="lg:col-span-6">
            <div className="rounded-3xl overflow-hidden shadow-lg border border-[#F3DEC8] aspect-[4/3] relative">
              <img
                src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=900&q=80"
                alt="Cupped hands holding young plant with golden soil"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#381602]/50 via-transparent to-transparent pointer-events-none"></div>
              <div className="absolute bottom-5 left-5 text-white text-left">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#FDE2C4] bg-[#A34805]/80 px-2.5 py-1 rounded-full">
                  Roots of Seva
                </span>
                <p className="text-sm font-semibold mt-1">Uplifting Communities With Love & Humility</p>
              </div>
            </div>
          </div>

          {/* Right Column: Vision & Mission Statement Cards */}
          <div className="lg:col-span-6 space-y-5 text-left">
            
            {/* Vision Statement */}
            <div className="bg-white p-6 sm:p-7 rounded-3xl border border-[#F3DEC8] shadow-xs hover:shadow-md transition">
              <div className="w-10 h-10 rounded-full bg-[#FFF2E3] text-[#E87A1E] flex items-center justify-center mb-3 border border-[#FDE2C4]">
                <Eye className="w-5 h-5" />
              </div>
              <h3 className="font-serif font-bold text-lg sm:text-xl text-[#381602] mb-2">
                Vision Statement
              </h3>
              <p className="text-xs sm:text-sm text-[#5C381E] leading-relaxed">
                We envision a compassionate world where no child goes hungry, every family has access to healthcare and education, and every human life can flourish with dignity, security, and spiritual peace.
              </p>
            </div>

            {/* Mission Statement */}
            <div className="bg-white p-6 sm:p-7 rounded-3xl border border-[#F3DEC8] shadow-xs hover:shadow-md transition">
              <div className="w-10 h-10 rounded-full bg-[#FFF2E3] text-[#E87A1E] flex items-center justify-center mb-3 border border-[#FDE2C4]">
                <Target className="w-5 h-5" />
              </div>
              <h3 className="font-serif font-bold text-lg sm:text-xl text-[#381602] mb-2">
                Mission Statement
              </h3>
              <p className="text-xs sm:text-sm text-[#5C381E] leading-relaxed">
                We are dedicated to selfless service: providing daily Annadan (free food), free medical assistance, child education, and disaster relief to marginalized communities with absolute transparency and devotion.
              </p>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
