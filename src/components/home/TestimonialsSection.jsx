import React from 'react';
import { Star, Quote } from 'lucide-react';
import { testimonials } from '../../data/mockData';

export default function TestimonialsSection() {
  return (
    <section className="py-20 lg:py-28 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Centered Heading */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-xs font-bold text-emerald-900 border border-emerald-200/60 mb-3 shadow-xs">
            <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
            COMMUNITY VOICES & GUARDIANS
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#143D2B] leading-tight">
            Trusted by Communities & Donors Alike
          </h2>
          <p className="text-sm sm:text-base text-gray-600 mt-3">
            Firsthand accounts from indigenous field leaders, agricultural cooperatives, and worldwide supporters.
          </p>
        </div>

        {/* 3 Testimonial Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((item) => (
            <div
              key={item.id}
              className="bg-[#FAFDFB] rounded-3xl p-7 sm:p-8 border border-[#DFECE4] shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between relative group"
            >
              <Quote className="w-8 h-8 text-[#143D2B]/15 absolute top-6 right-6 pointer-events-none group-hover:text-[#143D2B]/30 transition-colors" />

              <div>
                {/* 5 Star Rating */}
                <div className="flex items-center gap-1 mb-5">
                  {[...Array(item.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>

                {/* Quotation text */}
                <p className="font-serif italic text-base sm:text-lg text-[#203129] leading-relaxed mb-6">
                  "{item.quote}"
                </p>
              </div>

              {/* Profile info footer */}
              <div className="flex items-center gap-3.5 pt-5 border-t border-gray-100">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-12 h-12 rounded-full object-cover border-2 border-emerald-700/20 shadow-sm"
                />
                <div>
                  <h4 className="font-bold text-sm text-[#143D2B] leading-tight">
                    {item.name}
                  </h4>
                  <p className="text-xs text-gray-500 mt-0.5 font-medium">
                    {item.role}
                  </p>
                  <p className="text-[11px] text-emerald-800 font-semibold">
                    {item.location}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
