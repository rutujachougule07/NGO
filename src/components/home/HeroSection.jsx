import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShieldCheck, Sparkles, CheckCircle2, QrCode, ArrowRight, Award } from 'lucide-react';
import { useNGO } from '../../context/NGOContext';

export default function HeroSection({ onOpenDonate }) {
  const { cmsContent } = useNGO();

  const tagline = cmsContent?.heroTagline || "SERVE • SUPPORT • UPLIFT • TOGETHER";
  const title = cmsContent?.heroTitle || "Empowering Vulnerable Communities Across India";
  const subtitle = cmsContent?.heroSubtitle || "Immense Life Foundation is committed to selfless Annadan seva, preventive medical relief, underprivileged child schooling, and grassroots ground empowerment with 100% transparent governance.";

  return (
    <section className="relative overflow-hidden bg-[#FDFBF7] pt-8 pb-12 lg:pt-14 lg:pb-18 border-b border-[#F7E6D4]/60">
      {/* Radiant golden sun aura in background */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#FFE4C4]/40 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-[#FFD8A8]/30 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Column: Heading, Subtitle, CTA buttons */}
          <div className="lg:col-span-7 space-y-6 text-left">
            
            {/* Saffron Eyebrow Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FFF2E3] text-xs font-bold text-[#A34805] border border-[#FDE2C4] shadow-xs">
              <span className="w-2 h-2 rounded-full bg-[#E87A1E] animate-pulse"></span>
              <span>{tagline}</span>
            </div>

            {/* Main Editorial Serif Headline */}
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-[3.25rem] font-bold text-[#381602] leading-[1.15] tracking-tight">
              {title}
            </h1>

            {/* Subtitle text */}
            <p className="text-base sm:text-lg text-[#5C381E] max-w-2xl leading-relaxed">
              {subtitle}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => onOpenDonate()}
                className="px-7 py-3.5 bg-[#E87A1E] hover:bg-[#D2640C] text-white font-bold text-sm sm:text-base rounded-full shadow-md hover:shadow-lg transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0 flex items-center gap-2"
              >
                <Heart className="w-4 h-4 fill-current text-white/90" />
                <span>Donate Now</span>
              </button>

              <Link
                to="/programs"
                className="px-6 py-3.5 bg-white hover:bg-stone-50 text-[#381602] font-bold text-sm sm:text-base rounded-full border border-[#F5DEC8] shadow-xs hover:shadow transition-all duration-200 flex items-center gap-2"
              >
                <span>Explore Programs</span>
                <ArrowRight className="w-4 h-4 text-[#E87A1E]" />
              </Link>

              <Link
                to="/pay"
                className="px-5 py-3.5 bg-[#FFF2E3]/80 hover:bg-[#FFF2E3] text-[#A34805] font-semibold text-xs sm:text-sm rounded-full border border-[#F5DEC8] transition-all duration-200 flex items-center gap-1.5"
                title="Scan QR at registered retail counter"
              >
                <QrCode className="w-4 h-4 text-[#E87A1E]" />
                <span>Partner Store QR</span>
              </Link>
            </div>

            {/* Trust highlights */}
            <div className="flex flex-wrap items-center gap-6 pt-4 text-xs font-semibold text-[#8A3B04] border-t border-[#F5DEC8]/70">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#E87A1E]" />
                <span>Section 80G Certified Non-Profit</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#E87A1E]" />
                <span>100% Tax-Deductible Direct Receipts</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-[#E87A1E]" />
                <span>Audited Transparency</span>
              </div>
            </div>

          </div>

          {/* Right Column: Prestigious Emblem & Foundation Card */}
          <div className="lg:col-span-5 relative flex justify-center">
            <div className="w-full max-w-md bg-gradient-to-b from-white to-[#FFFDF9] rounded-3xl p-6 sm:p-7 shadow-xl border border-[#F3DEC8] text-center relative group">
              
              {/* Top Verified Tag */}
              <div className="flex items-center justify-between pb-4 border-b border-[#F7E6D4] text-xs font-bold text-[#A34805]">
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  Active Community Seva
                </span>
                <span className="bg-[#FFF2E3] px-3 py-1 rounded-full border border-[#F5DEC8] text-[11px]">
                  Est. 2026
                </span>
              </div>

              {/* Prestigious Foundation Emblem in Full, Pristine Proportion */}
              <div className="my-5 relative flex justify-center">
                <div className="w-56 h-56 sm:w-64 sm:h-64 rounded-full p-2 bg-gradient-to-tr from-[#E87A1E] via-[#F8B26A] to-[#FFF2E3] shadow-lg flex items-center justify-center transform group-hover:scale-102 transition-transform duration-500">
                  <div className="w-full h-full rounded-full overflow-hidden bg-white p-1">
                    <img
                      src="/immense_life_brand.jpg"
                      alt="Immense Life Foundation - Shirdi Sai Baba Seva Emblem"
                      className="w-full h-full object-contain"
                    />
                  </div>
                </div>
              </div>

              {/* Foundation Details & Impact Metrics */}
              <div className="space-y-3">
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#381602]">
                  Immense Life Foundation
                </h3>
                <p className="text-xs text-stone-600 leading-relaxed px-2">
                  Dedicated to selfless Annadan, healthcare camps, and child education under the guidance of President Milind Manohar Sonar.
                </p>

                {/* 2 Quick KPIs */}
                <div className="grid grid-cols-2 gap-3 pt-2 text-left">
                  <div className="bg-[#FFFDF9] p-3 rounded-2xl border border-[#F5DEC8]">
                    <span className="text-[10px] uppercase font-bold text-[#A34805] block">Daily Meals</span>
                    <span className="font-serif text-xl font-bold text-[#381602]">75,000+</span>
                    <span className="text-[10px] text-stone-500 block">Served with love</span>
                  </div>
                  <div className="bg-[#FFFDF9] p-3 rounded-2xl border border-[#F5DEC8]">
                    <span className="text-[10px] uppercase font-bold text-[#A34805] block">Section 80G</span>
                    <span className="font-serif text-xl font-bold text-emerald-800">100%</span>
                    <span className="text-[10px] text-stone-500 block">Tax Exemption</span>
                  </div>
                </div>

                {/* Bottom Quick Action */}
                <div className="pt-2">
                  <button
                    onClick={() => onOpenDonate()}
                    className="w-full py-3 bg-[#E87A1E] hover:bg-[#D2640C] text-white text-xs sm:text-sm font-bold rounded-2xl shadow-sm hover:shadow transition flex items-center justify-center gap-2"
                  >
                    <Heart className="w-4 h-4 fill-current text-white/90" />
                    <span>Support This Noble Seva</span>
                  </button>
                </div>

              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

