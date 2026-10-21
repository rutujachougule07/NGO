import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { 
  Heart, 
  ArrowRight, 
  ChevronLeft, 
  ChevronRight, 
  ShieldCheck, 
  CheckCircle2, 
  Sparkles, 
  Utensils, 
  GraduationCap, 
  HeartPulse, 
  Store,
  QrCode,
  Award
} from 'lucide-react';
import { useNGO } from '../../context/NGOContext';

export default function HeroSlider({ onOpenDonate }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef(null);

  const slides = [
    {
      id: 1,
      image: '/hero_annadan.jpg',
      badge: 'DIVINE SEVA • DAILY MAHA-ANNADAN',
      badgeIcon: Utensils,
      title: 'Serving Warm Meals. Nourishing Souls. Restoring Dignity.',
      subtitle: 'Over 75,000+ sanctified, nutritious meals lovingly served each month to vulnerable elders, homeless citizens, and hungry children across community kitchens.',
      primaryBtnText: 'Sponsor Annadan Meals',
      primaryBtnAction: () => onOpenDonate({ amount: 1000, project: 'support' }),
      secondaryLink: '/programs',
      secondaryBtnText: 'Explore Food Seva',
      accentColor: '#E87A1E',
      tagline: 'Hunger Free Communities',
      statNumber: '75,000+',
      statLabel: 'Hot Meals Served Monthly',
      kpiText: '₹500 provides 20 hot, nutritious meals • 100% Tax Deductible (80G)',
    },
    {
      id: 2,
      image: '/hero_education.jpg',
      badge: 'CHILD EMPOWERMENT • DREAM SCHOOLING',
      badgeIcon: GraduationCap,
      title: 'Lighting the Torch of Knowledge for Every Child.',
      subtitle: 'Equipping 8,300+ underprivileged rural students with modern school bags, STEM learning kits, textbooks, and caring youth mentors to break generational poverty.',
      primaryBtnText: 'Sponsor a Child’s Schooling',
      primaryBtnAction: () => onOpenDonate({ amount: 1000, project: 'education' }),
      secondaryLink: '/programs',
      secondaryBtnText: 'Our Learning Centers',
      accentColor: '#D2640C',
      tagline: 'Education For All',
      statNumber: '8,300+',
      statLabel: 'Students Empowered',
      kpiText: '₹1,000 sponsors a complete school kit & 1 term mentorship care',
    },
    {
      id: 3,
      image: '/hero_medical.jpg',
      badge: 'HEALTHCARE SEVA • FREE MOBILE CLINICS',
      badgeIcon: HeartPulse,
      title: 'Quality Healthcare Within Reach for Every Family.',
      subtitle: 'Mobile dispensaries and free screening camps bringing volunteer specialist physicians, pediatric care, and essential medicines to remote rural and slum settlements.',
      primaryBtnText: 'Support Medical Clinics',
      primaryBtnAction: () => onOpenDonate({ amount: 2500, project: 'healthcare' }),
      secondaryLink: '/programs',
      secondaryBtnText: 'View Medical Missions',
      accentColor: '#143D2B',
      tagline: 'Health & Healing',
      statNumber: '120+',
      statLabel: 'Free Health Camps',
      kpiText: '₹2,500 funds medical screening & medicines for 5 vulnerable families',
    }
  ];

  // Auto-advance slides every 6 seconds unless paused on hover
  useEffect(() => {
    if (!isPaused) {
      timerRef.current = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
      }, 6000);
    }
    return () => clearInterval(timerRef.current);
  }, [isPaused, slides.length]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const active = slides[currentSlide];

  return (
    <div 
      className="relative w-full overflow-hidden bg-stone-900 text-white select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Dynamic Slide Backgrounds with smooth transitions */}
      <div className="relative h-[560px] sm:h-[620px] lg:h-[700px] w-full">
        {slides.map((slide, index) => {
          const isActive = index === currentSlide;
          return (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                isActive ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
              }`}
            >
              {/* Image with subtle Ken-Burns zoom on active */}
              <img
                src={slide.image}
                alt={slide.title}
                className={`w-full h-full object-cover object-center transition-transform duration-7000 ease-out ${
                  isActive ? 'scale-105' : 'scale-100'
                }`}
              />

              {/* Cinematic Multilayer Vignette Gradients for Crystal Clear Text Readability */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/65 to-black/30 lg:to-transparent"></div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/40"></div>
            </div>
          );
        })}

        {/* Content Container (Layered above background) */}
        <div className="absolute inset-0 z-20 flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              
              {/* Left Column: Eyebrow, Majestic Headline, Subtitle & Action Buttons */}
              <div className="lg:col-span-8 space-y-6 text-left animate-fade-in">
                
                {/* Glowing Seva Eyebrow Badge */}
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/15 backdrop-blur-md border border-white/25 text-xs sm:text-sm font-bold tracking-wide text-[#FFB86A] shadow-lg">
                  {React.createElement(active.badgeIcon, { className: "w-4 h-4 text-[#FFB86A]" })}
                  <span>{active.badge}</span>
                </div>

                {/* Main Hero Serif Headline */}
                <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold leading-[1.12] tracking-tight text-white drop-shadow-md max-w-3xl">
                  {active.title}
                </h1>

                {/* Subtitle Description */}
                <p className="text-sm sm:text-base lg:text-lg text-white/90 max-w-2xl leading-relaxed drop-shadow font-light">
                  {active.subtitle}
                </p>

                {/* Interactive Action Buttons Row */}
                <div className="flex flex-wrap items-center gap-3.5 pt-2">
                  <button
                    onClick={active.primaryBtnAction}
                    className="px-7 py-3.5 sm:px-8 sm:py-4 bg-[#E87A1E] hover:bg-[#D2640C] text-white font-bold text-sm sm:text-base rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 flex items-center gap-2.5 ring-2 ring-white/30"
                  >
                    <Heart className="w-4 h-4 sm:w-5 sm:h-5 fill-current text-white" />
                    <span>{active.primaryBtnText}</span>
                  </button>

                  <Link
                    to={active.secondaryLink}
                    className="px-6 py-3.5 sm:px-7 sm:py-4 bg-white/15 hover:bg-white/25 backdrop-blur-md text-white font-bold text-sm sm:text-base rounded-full border border-white/30 transition-all duration-300 flex items-center gap-2 hover:border-white shadow-lg"
                  >
                    <span>{active.secondaryBtnText}</span>
                    <ArrowRight className="w-4 h-4 text-[#FFB86A]" />
                  </Link>

                  <Link
                    to="/pay"
                    className="px-5 py-3.5 sm:px-6 sm:py-4 bg-emerald-900/60 hover:bg-emerald-800/80 backdrop-blur-md text-emerald-100 font-semibold text-xs sm:text-sm rounded-full border border-emerald-400/40 transition-all duration-300 flex items-center gap-2 shadow-lg"
                    title="Donate at local partner store QR counter"
                  >
                    <QrCode className="w-4 h-4 text-emerald-300" />
                    <span>Partner Store QR</span>
                  </Link>
                </div>

                {/* Trust & Tax Benefits Strip */}
                <div className="flex flex-wrap items-center gap-4 sm:gap-6 pt-4 text-xs font-medium text-white/80 border-t border-white/15">
                  <div className="flex items-center gap-1.5 text-white">
                    <ShieldCheck className="w-4 h-4 text-[#FFB86A]" />
                    <span>Section 80G Certified Non-Profit</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-white">
                    <CheckCircle2 className="w-4 h-4 text-[#FFB86A]" />
                    <span>100% Tax-Deductible Direct Receipts</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-white">
                    <Award className="w-4 h-4 text-[#FFB86A]" />
                    <span>Audited Transparency</span>
                  </div>
                </div>

              </div>

              {/* Right Column: Floating Glassmorphic Seva Impact Medallion Card */}
              <div className="hidden lg:block lg:col-span-4">
                <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-6 shadow-2xl text-center space-y-4 relative overflow-hidden group">
                  
                  {/* Subtle top badge */}
                  <div className="flex items-center justify-between text-xs font-bold text-[#FFB86A] pb-3 border-b border-white/15">
                    <span className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                      Verified Seva Impact
                    </span>
                    <span className="bg-white/15 px-2.5 py-0.5 rounded-full text-[10px] text-white">
                      Govt. Reg.
                    </span>
                  </div>

                  {/* Circular Golden Emblem of Shirdi Sai Baba & Immense Life Foundation */}
                  <div className="w-40 h-40 mx-auto rounded-full p-2 bg-gradient-to-tr from-[#E87A1E] via-[#F8B26A] to-white/80 shadow-2xl flex items-center justify-center transform group-hover:scale-105 transition-transform duration-500">
                    <div className="w-full h-full rounded-full overflow-hidden bg-white p-1">
                      <img
                        src="/immense_life_brand.jpg"
                        alt="Immense Life Foundation Emblem"
                        className="w-full h-full object-contain"
                      />
                    </div>
                  </div>

                  {/* Foundation Name & Mission Statement */}
                  <div>
                    <h3 className="font-serif text-xl font-bold text-white tracking-wide">
                      Immense Life Foundation
                    </h3>
                    <p className="text-xs text-white/80 mt-1 leading-snug">
                      Authorized President: <strong className="text-white">Milind Manohar Sonar</strong>
                    </p>
                  </div>

                  {/* Real-time Dynamic Metric Box matching active slide */}
                  <div className="bg-white/10 backdrop-blur-md rounded-2xl p-3.5 border border-white/15 text-left">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-[#FFB86A]">
                        {active.statLabel}
                      </span>
                      <span className="font-serif text-2xl font-bold text-white">
                        {active.statNumber}
                      </span>
                    </div>
                    <p className="text-[11px] text-white/80 mt-1 leading-tight">
                      {active.kpiText}
                    </p>
                  </div>

                  {/* Quick Donate Button on Floating Card */}
                  <button
                    onClick={() => onOpenDonate()}
                    className="w-full py-3 bg-[#E87A1E] hover:bg-[#D2640C] text-white text-xs font-bold rounded-xl shadow-lg transition flex items-center justify-center gap-2 transform active:scale-95"
                  >
                    <Heart className="w-3.5 h-3.5 fill-current text-white" />
                    <span>Contribute to this Seva</span>
                  </button>

                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Carousel Arrow Controls (Left & Right) */}
        <button
          onClick={prevSlide}
          aria-label="Previous Slide"
          className="absolute left-4 top-1/2 -translate-y-1/2 z-30 w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-black/40 hover:bg-black/70 backdrop-blur-md border border-white/20 text-white flex items-center justify-center transition-all duration-200 transform hover:scale-110 shadow-xl"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        <button
          onClick={nextSlide}
          aria-label="Next Slide"
          className="absolute right-4 top-1/2 -translate-y-1/2 z-30 w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-black/40 hover:bg-black/70 backdrop-blur-md border border-white/20 text-white flex items-center justify-center transition-all duration-200 transform hover:scale-110 shadow-xl"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Bottom Slide Indicators with Animated Progress Bars */}
        <div className="absolute bottom-6 left-0 right-0 z-30 flex items-center justify-center gap-3">
          {slides.map((slide, index) => {
            const isCurrent = index === currentSlide;
            return (
              <button
                key={slide.id}
                onClick={() => goToSlide(index)}
                aria-label={`Go to slide ${index + 1}`}
                className={`group flex items-center gap-2 px-3 py-1.5 rounded-full transition-all duration-300 ${
                  isCurrent 
                    ? 'bg-white/25 backdrop-blur-md border border-white/50 ring-2 ring-[#E87A1E]' 
                    : 'bg-black/40 hover:bg-black/60 border border-white/20'
                }`}
              >
                <span className={`w-2.5 h-2.5 rounded-full transition-colors ${
                  isCurrent ? 'bg-[#E87A1E]' : 'bg-white/60 group-hover:bg-white'
                }`}></span>
                <span className="hidden sm:inline text-xs font-semibold text-white/90">
                  {slide.tagline}
                </span>
              </button>
            );
          })}
        </div>

      </div>

      {/* Live Seva Ticker Bar running beneath the slider */}
      <div className="bg-[#1C0D03] border-t border-b border-[#F5DEC8]/20 py-3 px-4 text-xs font-medium text-stone-200 overflow-hidden relative shadow-md">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          
          <div className="flex items-center gap-2 shrink-0 bg-[#E87A1E] text-white px-3 py-1 rounded-full font-bold text-[11px] uppercase tracking-wider shadow-xs">
            <span className="w-2 h-2 rounded-full bg-white animate-ping"></span>
            <span>Live Seva Pulse</span>
          </div>

          <div className="overflow-hidden whitespace-nowrap flex-1">
            <div className="inline-flex items-center gap-8 animate-marquee text-xs text-stone-300">
              <span className="flex items-center gap-1.5">
                🍲 <strong className="text-white">Active Daily Annadan:</strong> 75,000+ meals cooked & served across frontline kitchens.
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5">
                📜 <strong className="text-white">Section 80G Certified:</strong> 100% Tax Deductible Automated PDF Receipts issued instantly.
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5">
                🏪 <strong className="text-white">Retail Counter QR Standees:</strong> Scan & Donate at 500+ partner grocery, pharmacy & apparel stores.
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5">
                🩺 <strong className="text-white">Free Medical Screening:</strong> Mobile dispensary vans active in tribal and rural settlements.
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5">
                🎓 <strong className="text-white">Child Education Drive:</strong> Free textbooks, school bags & STEM kits distribution ongoing.
              </span>
            </div>
          </div>

          <Link
            to="/gallery"
            className="hidden md:inline-flex items-center gap-1 text-[11px] font-bold text-[#FFB86A] hover:text-white shrink-0 transition"
          >
            <span>View Live Photos</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>

        </div>
      </div>
    </div>
  );
}
