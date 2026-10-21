import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Heart, 
  ArrowRight, 
  Sparkles, 
  Users, 
  MapPin, 
  ChevronLeft, 
  ChevronRight,
  CheckCircle2,
  Receipt
} from 'lucide-react';
import { useAdmin } from '../../context/AdminContext';

export default function HeroSection({ onOpenDonate }) {
  const { websiteCMS } = useAdmin();
  const cmsHome = websiteCMS?.home || {};

  const stats = [
    { value: cmsHome.stat1Number || "2.4M+", label: cmsHome.stat1Label || "Sanctified Meals", icon: Users },
    { value: cmsHome.stat2Number || "284+", label: cmsHome.stat2Label || "Partner Counters", icon: Sparkles },
    { value: cmsHome.stat3Number || "100%", label: cmsHome.stat3Label || "80G Receipts", icon: Receipt },
  ];

  const defaultSlides = [
    {
      id: 1,
      image: "/hero_seva_banner.jpg",
      badge: "Active Daily Annadan Seva",
      alt: "Immense Life Foundation Humanitarian Seva & Annadan",
      title: "Daily Sanctified Annadan Food Seva",
      description: "Serving over 1,200 hot nutritious meals daily to vulnerable elders, daily laborers, and school children."
    },
    {
      id: 2,
      image: "/hero_ngo_education.jpg",
      badge: "Free Child Education Drive",
      alt: "Indian Rural Village NGO Education and Child Development",
      title: "Empowering Underprivileged Children",
      description: "Providing school kits, notebooks, digital education, and dedicated teaching mentors across village centers."
    },
    {
      id: 3,
      image: "/hero_ngo_healthcare.jpg",
      badge: "Rural Free Healthcare Camp",
      alt: "Indian Village Free Medical Camp and Health Checkup Mission",
      title: "Free Healthcare & Life-Saving Medicine",
      description: "Voluntary doctors providing free diagnostics, vital screenings, and essential medicines to rural families."
    }
  ];

  const slides = (cmsHome.bannerImages && cmsHome.bannerImages.length > 0)
    ? cmsHome.bannerImages.map((b, i) => ({
        id: b.id || i + 1,
        image: typeof b === 'string' ? b : (b.image || "/hero_seva_banner.jpg"),
        badge: b.badge || "Section 80G Certified Non-Profit",
        alt: b.title || "Immense Life Foundation Seva",
        title: b.title || "Serving Humanity with Compassion & Unconditional Love",
        description: b.description || "Immense Life Foundation partners with retail counters, community volunteers, and conscious citizens to provide daily Annadan, healthcare vans, and child education."
      }))
    : defaultSlides;

  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Auto-advance slides every 5 seconds unless paused on hover
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [isPaused, slides.length]);

  const handlePrev = (e) => {
    e?.stopPropagation();
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const handleNext = (e) => {
    e?.stopPropagation();
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  return (
    <section 
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      className="relative h-[calc(100vh-76px)] min-h-[520px] max-h-[800px] flex items-center overflow-hidden text-left bg-[#2A160A]"
    >
      
      {/* 1. Full-Screen Background Slider Images (Properly Sized & Centered) */}
      {slides.map((slide, index) => {
        const isActive = index === currentSlide;
        return (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              isActive ? 'opacity-100 z-0' : 'opacity-0 -z-10 pointer-events-none'
            }`}
          >
            <img
              src={slide.image}
              alt={slide.alt}
              className="w-full h-full object-cover object-center"
            />
          </div>
        );
      })}

      {/* 2. Soft & Light Radiant Gradient Overlay to Keep Image Vibrant, Bright & Clear */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-black/10 z-10"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-black/20 z-10"></div>

      {/* 3. Hero Content Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 relative z-20 w-full">
        <div className="max-w-3xl space-y-4 sm:space-y-5">
          
          {/* Small Heading Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-black/35 backdrop-blur-md text-xs font-bold text-[#E6B566] border border-white/20 shadow-md">
            <span className="w-2 h-2 rounded-full bg-[#F4A261] animate-pulse"></span>
            <span>{cmsHome.badgeText || "Section 80G Certified Non-Profit • Trust Reg: E-34821/MUM"}</span>
          </div>

          {/* Main Heading */}
          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold text-white leading-[1.15] tracking-tight drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)]">
            {cmsHome.heroHeadline || "Serving Humanity with Compassion & Unconditional Love"}
          </h1>

          {/* Description */}
          <p className="text-sm sm:text-base lg:text-lg text-white max-w-2xl leading-relaxed font-normal drop-shadow-[0_1px_6px_rgba(0,0,0,0.8)]">
            {cmsHome.heroSubheadline || "Immense Life Foundation partners with retail counters, community volunteers, and conscious citizens to provide daily Annadan, healthcare vans, and child education."}
          </p>

          {/* Two Action Buttons */}
          <div className="pt-1 flex flex-wrap items-center gap-3 sm:gap-4">
            <a
              href="#programs"
              className="px-6 py-3 bg-white/20 hover:bg-white text-white hover:text-[#493326] border border-white/40 backdrop-blur-md text-xs sm:text-sm font-bold rounded-full transition-all shadow-md hover:shadow-xl flex items-center gap-2"
            >
              <span>Explore Our Programs</span>
              <ArrowRight className="w-4 h-4 text-[#E6B566]" />
            </a>

            <button
              onClick={() => onOpenDonate()}
              className="px-6 py-3 bg-[#F4A261] hover:bg-[#E87A1E] text-white text-xs sm:text-sm font-bold rounded-full transition-all shadow-lg hover:shadow-2xl hover:-translate-y-0.5 flex items-center gap-2"
            >
              <Heart className="w-4 h-4 fill-current" />
              <span>{cmsHome.primaryCtaText || "Support a Cause Today"}</span>
            </button>
          </div>

          {/* Impact Statistics Minimal Counters */}
          <div className="pt-5 sm:pt-6 border-t border-white/20 grid grid-cols-3 gap-6 max-w-lg">
            {stats.map((st, idx) => (
              <div key={idx} className="space-y-0.5">
                <div className="font-serif text-2xl sm:text-3xl font-bold text-white">
                  {st.value}
                </div>
                <div className="text-[11px] sm:text-xs font-medium text-[#E6B566]">
                  {st.label}
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>

      {/* 4. Left & Right Slider Navigation Arrows */}
      <button
        onClick={handlePrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/30 hover:bg-black/60 text-white border border-white/30 backdrop-blur-md flex items-center justify-center transition-all z-30 hover:scale-105"
        aria-label="Previous Slide"
      >
        <ChevronLeft className="w-6 h-6 text-white" />
      </button>

      <button
        onClick={handleNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/30 hover:bg-black/60 text-white border border-white/30 backdrop-blur-md flex items-center justify-center transition-all z-30 hover:scale-105"
        aria-label="Next Slide"
      >
        <ChevronRight className="w-6 h-6 text-white" />
      </button>

      {/* 5. Bottom Slide Indicators / Dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-black/40 backdrop-blur-md px-4 py-2 rounded-full z-30 border border-white/20">
        {slides.map((_, dotIdx) => (
          <button
            key={dotIdx}
            onClick={() => setCurrentSlide(dotIdx)}
            className={`h-2 rounded-full transition-all duration-300 ${
              dotIdx === currentSlide 
                ? 'w-8 bg-[#F4A261]' 
                : 'w-2 bg-white/60 hover:bg-white'
            }`}
            aria-label={`Go to slide ${dotIdx + 1}`}
          />
        ))}
      </div>

    </section>
  );
}
