import React, { useState, useEffect } from 'react';
import { 
  ChevronLeft, 
  ChevronRight 
} from 'lucide-react';
import { useAdmin } from '../../context/AdminContext';

export default function HeroSection({ onOpenDonate }) {
  const { websiteCMS } = useAdmin();
  const cmsHome = websiteCMS?.home || {};

  const defaultSlides = [
    {
      id: 1,
      image: "/hero_annadan_seva.jpg",
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
        image: typeof b === 'string' ? b : (b.image || "/hero_annadan_seva.jpg"),
        badge: b.badge || "Section 80G Certified Non-Profit",
        alt: b.title || "Immense Life Foundation Seva",
        title: b.title || "Serving Humanity with Compassion & Unconditional Love",
        description: b.description || "Immense Life Foundation partners with retail counters, community volunteers, and conscious citizens to provide daily Annadan, healthcare vans, and child education."
      }))
    : defaultSlides;

  const [currentSlide, setCurrentSlide] = useState(0);
  const [touchStartX, setTouchStartX] = useState(null);
  const [touchEndX, setTouchEndX] = useState(null);

  // Auto-advance slides continuously every 3 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [currentSlide, slides.length]);

  const handlePrev = (e) => {
    e?.stopPropagation();
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const handleNext = (e) => {
    e?.stopPropagation();
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  // Mobile Touch Swipe Handlers
  const handleTouchStart = (e) => {
    setTouchEndX(null);
    setTouchStartX(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEndX(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStartX || !touchEndX) return;
    const distance = touchStartX - touchEndX;
    const minSwipeDistance = 45;
    if (distance > minSwipeDistance) {
      handleNext();
    } else if (distance < -minSwipeDistance) {
      handlePrev();
    }
  };

  return (
    <section 
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      className="relative aspect-[16/10] sm:aspect-auto sm:h-[420px] md:h-[calc(100vh-72px)] md:max-h-[calc(100vh-72px)] w-full flex items-end overflow-hidden text-left bg-[#2A160A]"
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

      {/* 2. Soft & Light Gradient Overlay to Keep Image Vibrant, Bright & Clear */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/10 z-10 pointer-events-none"></div>

      {/* 3. Desktop Left & Right Slider Navigation Arrows */}
      <button
        onClick={handlePrev}
        className="hidden md:flex absolute left-4 lg:left-8 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/35 hover:bg-black/65 text-white border border-white/30 backdrop-blur-md items-center justify-center transition-all z-30 hover:scale-105 shadow-lg"
        aria-label="Previous Slide"
      >
        <ChevronLeft className="w-6 h-6 text-white" />
      </button>

      <button
        onClick={handleNext}
        className="hidden md:flex absolute right-4 lg:right-8 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/35 hover:bg-black/65 text-white border border-white/30 backdrop-blur-md items-center justify-center transition-all z-30 hover:scale-105 shadow-lg"
        aria-label="Next Slide"
      >
        <ChevronRight className="w-6 h-6 text-white" />
      </button>

      {/* 4. Bottom Slide Indicators (Sleek Minimal Dots) */}
      <div className="absolute bottom-2.5 sm:bottom-5 left-1/2 -translate-x-1/2 flex items-center gap-1.5 sm:gap-2 px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full bg-black/25 backdrop-blur-xs z-30 border border-white/20">
        {slides.map((_, dotIdx) => (
          <button
            key={dotIdx}
            onClick={() => setCurrentSlide(dotIdx)}
            className={`h-1.5 sm:h-2 rounded-full transition-all duration-300 ${
              dotIdx === currentSlide 
                ? 'w-5 sm:w-7 bg-[#F4A261]' 
                : 'w-1.5 sm:w-2 bg-white/70 hover:bg-white'
            }`}
            aria-label={`Go to slide ${dotIdx + 1}`}
          />
        ))}
      </div>

    </section>
  );
}
