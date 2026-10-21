import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, UserPlus, Sparkles, CheckCircle2 } from 'lucide-react';

export default function HomeCTASection({ onOpenDonate }) {
  return (
    <section className="py-10 sm:py-12 bg-gradient-to-r from-[#FFF0E3] via-[#FFF9F3] to-[#FFF0E3] relative overflow-hidden border-t border-[#F5DEC8] text-center">
      {/* Decorative Aura Shapes */}
      <div className="absolute top-1/2 left-10 -translate-y-1/2 w-64 h-64 bg-[#F4A261]/15 rounded-full filter blur-3xl pointer-events-none"></div>
      <div className="absolute top-1/2 right-10 -translate-y-1/2 w-64 h-64 bg-[#E6B566]/20 rounded-full filter blur-3xl pointer-events-none"></div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-3.5">
        
        {/* Decorative Badge */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white text-[11px] font-bold text-[#F4A261] border border-[#F5DEC8] shadow-2xs">
          <Sparkles className="w-3.5 h-3.5" />
          <span>JOIN OUR COMPASSIONATE MOVEMENT</span>
        </div>

        {/* Heading */}
        <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-[#493326] leading-tight">
          Be the Reason Someone Smiles Today.
        </h2>

        {/* Description */}
        <p className="text-xs sm:text-sm text-[#493326]/80 max-w-xl mx-auto leading-relaxed">
          Your support, participation, and kindness can help us build a better future for everyone. Even the smallest gesture creates ripples of hope.
        </p>

        {/* Action Buttons */}
        <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={() => onOpenDonate()}
            className="px-6 py-2.5 sm:py-3 bg-[#F4A261] hover:bg-[#E87A1E] text-white text-xs sm:text-sm font-bold rounded-full transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5 flex items-center gap-2"
          >
            <Heart className="w-4 h-4 fill-current" />
            <span>Support Our Mission</span>
          </button>

          <Link
            to="/contact"
            className="px-6 py-2.5 sm:py-3 bg-white hover:bg-[#FFF0E3] text-[#493326] border-2 border-[#F4A261] text-xs sm:text-sm font-bold rounded-full transition-all shadow-xs hover:shadow-md flex items-center gap-2"
          >
            <UserPlus className="w-4 h-4 text-[#F4A261]" />
            <span>Become a Volunteer</span>
          </Link>
        </div>

        {/* Trust Badges in a single compact row */}
        <div className="pt-4 flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-[11px] text-[#493326]/75 border-t border-[#F5DEC8]/60 max-w-lg mx-auto">
          <span className="flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#F4A261]" />
            100% Tax Deductible (Sec 80G)
          </span>
          <span className="flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#F4A261]" />
            Direct Seva Ground Force
          </span>
          <span className="flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#F4A261]" />
            Radical Financial Transparency
          </span>
        </div>

      </div>
    </section>
  );
}
