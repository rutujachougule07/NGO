import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Compass, ShieldCheck, ArrowRight, CheckCircle2 } from 'lucide-react';
import { useAdmin } from '../../context/AdminContext';

export default function HomeAboutSection() {
  const { websiteCMS } = useAdmin();
  const cmsAbout = websiteCMS?.about || {};

  const pillars = [
    {
      title: "Our Mission",
      desc: cmsAbout.missionStatement || "To alleviate hunger, expand accessible healthcare, and educate underserved children through selfless community service.",
      icon: Compass,
    },
    {
      title: "Our Vision",
      desc: cmsAbout.visionStatement || "A compassionate society where every vulnerable family lives with dignity, health, self-reliance, and universal respect.",
      icon: Heart,
    },
    {
      title: "Our Values",
      desc: "Rooted in transparency, radical empathy, accountability, and the universal principle of selfless seva.",
      icon: ShieldCheck,
    },
  ];

  return (
    <section id="about" className="pt-16 pb-10 sm:pt-20 sm:pb-12 bg-[#FFF9F3] relative overflow-hidden border-b border-[#F5DEC8]/70 text-left">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#FFF0E3] rounded-full filter blur-3xl opacity-70 pointer-events-none -mr-20 -mt-20"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#F4A261]/10 rounded-full filter blur-3xl opacity-60 pointer-events-none -ml-20 -mb-20"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          
          {/* Left: Large Community Service Image Card (Clean, Unobstructed, Professional) */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden shadow-xl border-4 border-white bg-white group">
              <img
                src={cmsAbout.image || "/about_ngo_team.jpg"}
                alt="Immense Life Foundation Community Seva Team in Maharashtra"
                className="w-full h-[440px] sm:h-[500px] object-cover object-center group-hover:scale-102 transition-transform duration-700"
              />
            </div>
            {/* Subtle decorative offset border frame */}
            <div className="absolute -bottom-3 -right-3 w-full h-full rounded-3xl border-2 border-[#F4A261]/40 -z-10 pointer-events-none hidden sm:block"></div>
          </div>

          {/* Right: Text, Quote, 3 Pillars, Learn More CTA */}
          <div className="lg:col-span-7 space-y-5">
            
            {/* Small Label */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FFF0E3] text-xs font-bold text-[#F4A261] border border-[#F5DEC8] shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-[#F4A261]"></span>
              <span>ABOUT IMMENSE LIFE FOUNDATION</span>
            </div>

            {/* Heading */}
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#493326] leading-[1.2]">
              Serving Humanity with Love and Compassion.
            </h2>

            {/* Short Description */}
            <p className="text-sm sm:text-base text-[#493326]/85 leading-relaxed">
              {cmsAbout.description || "Immense Life Foundation is a non-profit humanitarian organization committed to uplifting vulnerable families across India. Through daily hot meal distributions, mobile clinics, and educational sponsorship, we bridge hope and action with complete dignity."}
            </p>

            {/* Elegant Spiritual Quote Callout */}
            <div className="border-l-4 border-[#F4A261] bg-[#FFF0E3]/70 px-4 py-3 rounded-r-xl">
              <p className="font-serif italic font-bold text-sm sm:text-base text-[#493326]">
                “Love All, Serve All.”
              </p>
              <p className="text-xs text-[#493326]/75 mt-0.5">
                Guided by the eternal teachings of Shirdi Sai Baba — seeing divinity in every act of service.
              </p>
            </div>

            {/* Three Feature Items: Mission, Vision, Values */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 pt-1">
              {pillars.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl bg-white border border-[#F5DEC8] shadow-xs hover:border-[#F4A261]/60 hover:shadow-md transition-all group"
                  >
                    <div className="w-9 h-9 rounded-xl bg-[#FFF0E3] text-[#F4A261] flex items-center justify-center mb-2.5 group-hover:scale-110 transition-transform">
                      <Icon className="w-4 h-4 text-[#F4A261]" />
                    </div>
                    <h3 className="font-serif font-bold text-sm text-[#493326] mb-1">
                      {item.title}
                    </h3>
                    <p className="text-xs text-[#493326]/75 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* Action Button & Trust Markers */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <Link
                to="/about"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#F4A261] hover:bg-[#E87A1E] text-white text-xs sm:text-sm font-bold rounded-full transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5"
              >
                <span>Learn More About Us</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <div className="flex items-center gap-2 text-xs font-semibold text-[#493326]/75">
                <CheckCircle2 className="w-4 h-4 text-[#F4A261]" />
                <span>80G Tax-Exempt Certified NGO</span>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
