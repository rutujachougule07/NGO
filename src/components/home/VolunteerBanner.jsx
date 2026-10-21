import React from 'react';
import { Link } from 'react-router-dom';
import { Users, BookOpen, Heart, Smile } from 'lucide-react';

export default function VolunteerBanner() {
  const benefits = [
    { id: 1, text: 'Connect with your community through Seva', icon: Users },
    { id: 2, text: 'Nurture empathy and leadership skills', icon: BookOpen },
    { id: 3, text: 'Bring relief to families in need', icon: Heart },
    { id: 4, text: 'Experience the joy of selfless giving', icon: Smile },
  ];

  return (
    <section className="py-8 sm:py-12 bg-[#FDFBF7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#FFF2E3] border border-[#F3DEC8] rounded-3xl p-6 sm:p-8 lg:p-10 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
            
            {/* Left: Volunteer team photograph */}
            <div className="lg:col-span-4">
              <div className="rounded-2xl overflow-hidden shadow-md border-2 border-white aspect-[4/3] sm:aspect-[16/11]">
                <img
                  src="https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=800&q=80"
                  alt="Immense Life Seva volunteers serving warm meals"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>

            {/* Center: Headline, text and button */}
            <div className="lg:col-span-5 space-y-4 text-left">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white text-xs font-bold text-[#A34805] border border-[#F5DEC8]">
                <span>JOIN OUR SEVA FAMILY</span>
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#381602] leading-tight">
                Make an impact. Volunteer with us.
              </h3>
              <p className="text-sm text-[#5C381E] leading-relaxed">
                Join a loving community of changemakers dedicated to uplifting lives, serving warm food, and nurturing children with compassion.
              </p>
              <div className="pt-2">
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[#E87A1E] hover:bg-[#D2640C] text-white font-bold text-sm rounded-full shadow-sm hover:shadow transition-all duration-200"
                >
                  <Users className="w-4 h-4 text-white" />
                  <span>Explore Seva Opportunities</span>
                </Link>
              </div>
            </div>

            {/* Right: Bulleted benefits list */}
            <div className="lg:col-span-3 space-y-3.5 border-t lg:border-t-0 lg:border-l border-[#F0D5BE] pt-6 lg:pt-0 lg:pl-8 text-left">
              {benefits.map((b) => {
                const Icon = b.icon;
                return (
                  <div key={b.id} className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-white text-[#E87A1E] flex items-center justify-center shrink-0 shadow-xs border border-[#F5DEC8]">
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="text-xs sm:text-sm font-semibold text-[#381602]">
                      {b.text}
                    </span>
                  </div>
                );
              })}
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
