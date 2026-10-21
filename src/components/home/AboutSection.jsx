import React from 'react';
import { Link } from 'react-router-dom';
import { Target, Eye, ArrowRight, Award, ShieldCheck, Heart } from 'lucide-react';
import { foundationInfo } from '../../data/mockData';

export default function AboutSection() {
  return (
    <section className="py-20 lg:py-28 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Story, Mission & Vision Cards */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-xs font-bold text-emerald-900 border border-emerald-200/60 shadow-xs">
              <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
              ABOUT IMMENSE LIFE FOUNDATION
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#143D2B] leading-tight">
              Driven by Compassion, Rooted in Measurable Community Transformation.
            </h2>

            <p className="text-base text-gray-600 leading-relaxed">
              Founded on the conviction that frontline communities are the ultimate stewards of their land and future, Immense Life Foundation bridges grassroots action with rigorous ecological and social governance.
            </p>

            {/* Mission & Vision Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="bg-[#FAFDFB] p-5 rounded-3xl border border-[#DFECE4] shadow-xs hover:shadow-md transition">
                <div className="w-10 h-10 rounded-2xl bg-emerald-100/70 text-emerald-800 flex items-center justify-center mb-3">
                  <Target className="w-5 h-5 text-emerald-700" />
                </div>
                <h4 className="font-serif font-bold text-base text-[#143D2B] mb-1">Our Mission</h4>
                <p className="text-xs text-gray-600 leading-relaxed">
                  To restore critical bio-corridors and elevate vulnerable communities through sustainable livelihoods, healthcare, and education.
                </p>
              </div>

              <div className="bg-[#FAFDFB] p-5 rounded-3xl border border-[#DFECE4] shadow-xs hover:shadow-md transition">
                <div className="w-10 h-10 rounded-2xl bg-emerald-100/70 text-emerald-800 flex items-center justify-center mb-3">
                  <Eye className="w-5 h-5 text-emerald-700" />
                </div>
                <h4 className="font-serif font-bold text-base text-[#143D2B] mb-1">Our Vision</h4>
                <p className="text-xs text-gray-600 leading-relaxed">
                  A balanced planet where regenerative natural ecosystems and resilient local human populations flourish together.
                </p>
              </div>
            </div>

            {/* Read more link */}
            <div className="pt-2">
              <Link
                to="/about"
                className="inline-flex items-center gap-2 text-sm font-bold text-emerald-800 hover:text-emerald-950 group transition"
              >
                <span>Read More About Our Governance & Team</span>
                <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

          {/* Right Column: 3-Photo Grid + Floating Info Card */}
          <div className="lg:col-span-6 relative">
            <div className="grid grid-cols-12 gap-4 relative">
              
              {/* One Large Community Photograph */}
              <div className="col-span-12 sm:col-span-7 rounded-3xl overflow-hidden shadow-xl border-4 border-white bg-white">
                <img
                  src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=700&q=80"
                  alt="Community members and children empowered by Immense Life"
                  className="w-full h-80 sm:h-96 object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Two Smaller Photographs in a Grid */}
              <div className="col-span-12 sm:col-span-5 flex flex-col gap-4">
                <div className="rounded-3xl overflow-hidden shadow-md border-4 border-white bg-white">
                  <img
                    src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=500&q=80"
                    alt="Women cooperative artisan"
                    className="w-full h-44 sm:h-[184px] object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="rounded-3xl overflow-hidden shadow-md border-4 border-white bg-white">
                  <img
                    src="https://images.unsplash.com/photo-1592982537447-7440770cbfc9?auto=format&fit=crop&w=500&q=80"
                    alt="Regenerative farmer inspects seedlings"
                    className="w-full h-44 sm:h-[184px] object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </div>

              {/* Small Floating Information Card */}
              <div className="absolute -bottom-6 left-4 sm:left-8 bg-white/95 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-[#E2DDD0] max-w-xs flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-xl bg-[#E8EFEA] text-[#143D2B] flex items-center justify-center shrink-0">
                  <Award className="w-6 h-6 text-emerald-800" />
                </div>
                <div>
                  <div className="flex items-center gap-1 text-[11px] font-bold text-emerald-800 uppercase tracking-wider">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    Verified 100% Score
                  </div>
                  <div className="text-xs font-bold text-gray-900 leading-snug">
                    Charity Navigator 4-Star Certified
                  </div>
                  <div className="text-[10px] text-gray-500 mt-0.5">
                    Highest possible non-profit fiscal rating
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
