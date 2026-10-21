import React from 'react';
import { HeartHandshake, ShieldCheck, Users, Utensils, Sparkles } from 'lucide-react';

export default function BentoShowcase() {
  return (
    <section className="py-16 sm:py-20 bg-[#FDFBF7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Bento Grid layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Column 1: Hands with Emblem Photo + 500+ Active Volunteers */}
          <div className="flex flex-col gap-6">
            {/* Emblem Artwork Card */}
            <div className="bg-white rounded-3xl p-3 border border-[#F3DEC8] shadow-xs overflow-hidden">
              <div className="rounded-2xl overflow-hidden aspect-[4/3] relative bg-[#FFF2E3]">
                <img
                  src="/hero_seva_banner.jpg"
                  alt="Immense Life Foundation Community Seva"
                  className="w-full h-full object-cover object-center"
                />
                <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-md px-2.5 py-1 rounded-full text-[10px] font-bold text-[#A34805] border border-[#F5DEC8]">
                  Daily Annadan Seva
                </div>
              </div>
            </div>

            {/* 500+ Active Volunteers Card */}
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-[#F3DEC8] shadow-xs flex-1 flex flex-col justify-between text-left">
              <div className="flex items-baseline justify-between mb-2">
                <span className="font-serif text-3xl sm:text-4xl font-bold text-[#381602]">
                  500+
                </span>
                <span className="text-xs font-semibold text-[#8A3B04]">
                  Active Seva Volunteers
                </span>
              </div>
              <h4 className="font-serif font-bold text-base text-[#381602] mt-3 mb-1">
                Community-Centered Programs
              </h4>
              <p className="text-xs text-[#5C381E] leading-relaxed">
                Our initiatives empower families through food security, health camps, child schooling, and sustainable relief.
              </p>
            </div>
          </div>

          {/* Column 2: Compassion-Driven Support + 75,000+ Meals Delivered */}
          <div className="flex flex-col gap-6 text-left">
            {/* Compassion-Driven Support */}
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-[#F3DEC8] shadow-xs flex-1 flex flex-col justify-center">
              <div className="w-12 h-12 rounded-2xl bg-[#FFF2E3] text-[#E87A1E] flex items-center justify-center mb-5 border border-[#FDE2C4]">
                <HeartHandshake className="w-6 h-6" />
              </div>
              <h4 className="font-serif font-bold text-xl text-[#381602] mb-2">
                Compassion-Driven Seva
              </h4>
              <p className="text-xs sm:text-sm text-[#5C381E] leading-relaxed">
                We provide essential aid and relief to families with selfless love, deep respect, and unconditional human dignity.
              </p>
            </div>

            {/* 75,000+ Annadan Meals Delivered */}
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-[#F3DEC8] shadow-xs">
              <div className="font-serif text-3xl sm:text-4xl font-bold text-[#381602] mb-1">
                75,000+
              </div>
              <div className="text-xs font-semibold text-[#8A3B04]">
                Nutritious Meals Served in Daily Annadan
              </div>
            </div>
          </div>

          {/* Column 3: Transparent & Trusted + Learning Center Photo */}
          <div className="flex flex-col gap-6 text-left">
            {/* Transparent & Trusted Card */}
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-[#F3DEC8] shadow-xs">
              <div className="w-12 h-12 rounded-2xl bg-[#FFF2E3] text-[#E87A1E] flex items-center justify-center mb-4 border border-[#FDE2C4]">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h4 className="font-serif font-bold text-xl text-[#381602] mb-2">
                Transparent & Trusted
              </h4>
              <p className="text-xs sm:text-sm text-[#5C381E] leading-relaxed">
                Every donation is deployed with audited financial accountability and real-time public impact updates.
              </p>
            </div>

            {/* Teacher and Student Learning Center Photo */}
            <div className="bg-white rounded-3xl p-3 border border-[#F3DEC8] shadow-xs flex-1 overflow-hidden">
              <div className="rounded-2xl overflow-hidden h-full min-h-[180px] relative">
                <img
                  src="https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=600&q=80"
                  alt="Educator tutoring child in Immense Life learning center"
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-md px-2.5 py-1 rounded-full text-[10px] font-bold text-[#A34805] border border-[#F5DEC8]">
                  Immense Life • Child Seva
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
