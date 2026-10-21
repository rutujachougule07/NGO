import React, { useState } from 'react';
import { Heart, HandHeart } from 'lucide-react';

export default function QuickDonateBar({ onOpenDonate }) {
  const [selectedAmount, setSelectedAmount] = useState(1000);
  const presets = [500, 1000, 2500, 5000];

  const handleGiveToday = () => {
    if (onOpenDonate) {
      onOpenDonate(selectedAmount);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-2 mb-12 sm:mb-16 relative z-20">
      <div className="bg-[#FFF2E3] border border-[#F3DEC8] rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-sm">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-5">
          
          {/* Left Side: Icon & Messaging */}
          <div className="flex items-center gap-4 text-left w-full lg:w-auto">
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-[#A34805] text-white flex items-center justify-center shrink-0 shadow-sm">
              <HandHeart className="w-6 h-6 sm:w-7 sm:h-7 text-[#FDE2C4]" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-base sm:text-lg text-[#381602] leading-snug">
                Your donation makes a real difference.
              </h3>
              <p className="text-xs sm:text-sm text-[#5C381E] mt-0.5">
                Every gift helps us uplift families, serve warm meals, and educate children.
              </p>
            </div>
          </div>

          {/* Right Side: Preset Amounts and Give Today Button */}
          <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 w-full lg:w-auto justify-start lg:justify-end">
            {presets.map((amount) => {
              const isSelected = selectedAmount === amount;
              return (
                <button
                  key={amount}
                  type="button"
                  onClick={() => setSelectedAmount(amount)}
                  className={`px-4 sm:px-5 py-2.5 rounded-xl text-sm font-bold transition-all duration-200 border ${
                    isSelected
                      ? 'bg-white text-[#A34805] border-[#E87A1E] shadow-sm ring-2 ring-[#E87A1E]/30'
                      : 'bg-white/90 hover:bg-white text-[#5C381E] border-[#F0D5BE] hover:border-[#E87A1E]'
                  }`}
                >
                  ₹{amount.toLocaleString('en-IN')}
                </button>
              );
            })}

            {/* Give Today CTA Button */}
            <button
              type="button"
              onClick={handleGiveToday}
              className="px-6 py-2.5 bg-[#E87A1E] hover:bg-[#D2640C] text-white text-sm font-bold rounded-xl shadow-sm hover:shadow transition-all duration-200 flex items-center gap-2 transform hover:-translate-y-0.5 active:translate-y-0"
            >
              <Heart className="w-4 h-4 fill-current text-white/90" />
              <span>Give Today</span>
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
