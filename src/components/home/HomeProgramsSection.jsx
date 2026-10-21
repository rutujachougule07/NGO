import React, { useRef, useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { 
  GraduationCap, 
  HeartPulse, 
  Utensils, 
  Users, 
  Sparkles, 
  Leaf, 
  ArrowRight
} from 'lucide-react';

import { useAdmin } from '../../context/AdminContext';

export default function HomeProgramsSection() {
  const { websiteCMS } = useAdmin();
  const scrollRef = useRef(null);
  const singleWidthRef = useRef(0);
  const isPausedRef = useRef(false);
  const isNavigatingRef = useRef(false);
  const resumeTimerRef = useRef(null);
  const animFrameRef = useRef(null);
  const lastTimeRef = useRef(null);

  const [isPaused, setIsPaused] = useState(false);

  const getIconForCategory = (cat) => {
    const c = (cat || '').toLowerCase();
    if (c.includes('hunger') || c.includes('food') || c.includes('annadan')) return Utensils;
    if (c.includes('health') || c.includes('clinic')) return HeartPulse;
    if (c.includes('educ') || c.includes('child')) return GraduationCap;
    if (c.includes('women') || c.includes('skill')) return Sparkles;
    if (c.includes('environ') || c.includes('green') || c.includes('tree')) return Leaf;
    return Users;
  };

  const defaultPrograms = [
    {
      id: "food-support",
      title: "Food & Essential Support (Annadan)",
      description: "Conducting sanctified daily Annadan drives to provide hot, nutritious meals to homeless, daily wage workers, and impoverished families.",
      icon: Utensils,
      image: "/hero_seva_banner.jpg",
      stats: "85,000+ Meals Served",
      badge: "Hunger Relief"
    },
    {
      id: "healthcare",
      title: "Healthcare & Free Mobile Clinics",
      description: "Delivering mobile medical clinics, vital diagnostic checkups, doctor consultations, and free life-saving medicines to remote rural hamlets.",
      icon: HeartPulse,
      image: "/hero_ngo_healthcare.jpg",
      stats: "18,000+ Patients Treated",
      badge: "Medical Aid"
    },
    {
      id: "education",
      title: "Child Education & Mentorship",
      description: "Empowering bright young minds with free village study centers, school bags, notebooks, digital learning, and dedicated educator mentorship.",
      icon: GraduationCap,
      image: "/hero_ngo_education.jpg",
      stats: "2,400+ Children Enrolled",
      badge: "Education"
    },
    {
      id: "women-empowerment",
      title: "Women Vocational Empowerment",
      description: "Providing tailoring, sewing machines, handicraft masterclasses, and financial independence to underprivileged women across self-help groups.",
      icon: Sparkles,
      image: "/ngo_women_skills.jpg",
      stats: "1,150+ Women Trained",
      badge: "Skill Development"
    },
    {
      id: "community-welfare",
      title: "Community Welfare & Relief",
      description: "Building clean drinking water facilities, senior citizen daylight shelters, emergency disaster relief, and holistic village development.",
      icon: Users,
      image: "/about_ngo_team.jpg",
      stats: "48+ Villages Uplifted",
      badge: "Rural Development"
    },
    {
      id: "social-awareness",
      title: "Green Environment & Tree Drives",
      description: "Fostering environmental conservation through massive tree-planting drives, clean village hygiene campaigns, and youth civic engagement.",
      icon: Leaf,
      image: "/ngo_community_planting.jpg",
      stats: "35,000+ Saplings Planted",
      badge: "Clean & Green"
    }
  ];

  const dynamicPrograms = (websiteCMS?.programs || [])
    .filter(p => p.status === 'Published')
    .map(p => ({
      id: p.id,
      title: p.title,
      description: p.description,
      icon: getIconForCategory(p.category),
      image: p.image || '/hero_seva_banner.jpg',
      stats: p.targetGoal || p.activeBeneficiaries || 'Active Seva Initiative',
      badge: p.category || 'Humanitarian'
    }));

  const programs = dynamicPrograms.length > 0 ? dynamicPrograms : defaultPrograms;

  // 3 duplicate sets: [Set 0 (clone), Set 1 (main), Set 2 (clone)] for 100% gapless infinite loop
  const totalSets = 3;
  const allCards = Array.from({ length: totalSets }, (_, setIdx) => 
    programs.map((item) => ({ ...item, setIdx }))
  ).flat();

  // Keep state and ref synchronized for smooth rAF
  const setPauseState = useCallback((paused) => {
    isPausedRef.current = paused;
    setIsPaused(paused);
  }, []);

  // Measure exact single-set width dynamically
  const updateMeasurements = useCallback(() => {
    const track = scrollRef.current;
    if (!track) return;
    const cards = track.querySelectorAll('[data-program-card]');
    if (cards.length >= programs.length * 2) {
      const firstCard = cards[0];
      const secondSetFirstCard = cards[programs.length];
      const measuredSingleWidth = secondSetFirstCard.offsetLeft - firstCard.offsetLeft;
      singleWidthRef.current = measuredSingleWidth;

      // Initialize to middle set if at starting boundary
      if (track.scrollLeft === 0 && measuredSingleWidth > 0) {
        track.scrollLeft = measuredSingleWidth;
      }
    }
  }, [programs.length]);

  // Handle window resize
  useEffect(() => {
    updateMeasurements();
    const handleResize = () => {
      updateMeasurements();
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [updateMeasurements]);

  // Smooth rAF Auto-Scroll Loop
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setPauseState(true);
      return;
    }

    const scrollSpeedPixelsPerSecond = 38; // Steady, readable, elegant glide
    lastTimeRef.current = performance.now();

    const step = (time) => {
      const delta = (time - lastTimeRef.current) / 1000;
      lastTimeRef.current = time;

      const track = scrollRef.current;
      const singleWidth = singleWidthRef.current;

      if (!isPausedRef.current && track && singleWidth > 0) {
        track.scrollLeft += scrollSpeedPixelsPerSecond * delta;

        // Loop seamlessly between Set 1 and Set 2 without any visible jumps or blank gaps
        if (track.scrollLeft >= singleWidth * 2) {
          track.scrollLeft -= singleWidth;
        } else if (track.scrollLeft <= 0) {
          track.scrollLeft += singleWidth;
        }
      }

      animFrameRef.current = requestAnimationFrame(step);
    };

    animFrameRef.current = requestAnimationFrame(step);

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
    };
  }, [setPauseState]);

  // Arrow Navigation Handler with Debounce & Delayed Auto-Resume
  const handleArrowClick = (direction) => {
    if (isNavigatingRef.current) return;
    isNavigatingRef.current = true;

    setPauseState(true);
    if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);

    const track = scrollRef.current;
    if (track) {
      const card = track.querySelector('[data-program-card]');
      const cardWidth = card?.clientWidth || 350;
      const scrollStep = (cardWidth + 24) * (direction === 'next' ? 1 : -1);

      track.scrollBy({ left: scrollStep, behavior: 'smooth' });
    }

    setTimeout(() => {
      isNavigatingRef.current = false;
    }, 450);

    resumeTimerRef.current = setTimeout(() => {
      lastTimeRef.current = performance.now();
      setPauseState(false);
    }, 3500);
  };

  // Hover Handlers (Desktop)
  const handleMouseEnter = () => {
    if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
    setPauseState(true);
  };

  const handleMouseLeave = () => {
    lastTimeRef.current = performance.now();
    setPauseState(false);
  };

  // Touch Handlers (Mobile / Tablets)
  const handleTouchStart = () => {
    if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
    setPauseState(true);
  };

  const handleTouchEnd = () => {
    if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
    resumeTimerRef.current = setTimeout(() => {
      lastTimeRef.current = performance.now();
      setPauseState(false);
    }, 3000);
  };

  return (
    <section 
      id="programs" 
      className="pt-8 pb-8 sm:pt-10 sm:pb-10 bg-[#FFFDFB] relative text-left overflow-hidden select-none border-b border-[#F5DEC8]/60"
    >
      {/* 1. Header Container (Centered Alignment) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 sm:mb-10 text-center">
        <div className="max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FFF0E3] text-xs font-bold text-[#F4A261] border border-[#F5DEC8] shadow-2xs">
            <span className="w-2 h-2 rounded-full bg-[#F4A261] animate-pulse"></span>
            <span>HOLISTIC SEVA INITIATIVES</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#493326] tracking-tight">
            Our Core Programs
          </h2>
          <p className="text-base sm:text-lg text-[#493326]/75 max-w-2xl mx-auto">
            Transforming communities through compassionate, organized, and impactful social initiatives.
          </p>
        </div>
      </div>

      {/* 2. Full-Page Edge-to-Edge Continuous Carousel Track */}
      <div className="relative w-full overflow-hidden">
        
        {/* Horizontal Infinite Slider Track */}
        <div
          ref={scrollRef}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          className="flex gap-6 overflow-x-auto py-5 px-4 sm:px-8 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
        >
          {allCards.map((prog, index) => {
            const Icon = prog.icon;
            const isClone = prog.setIdx !== 1; // Set 1 is the accessible primary set

            return (
              <div
                key={`${prog.id}-${prog.setIdx}-${index}`}
                data-program-card
                aria-hidden={isClone ? 'true' : undefined}
                className="w-[280px] sm:w-[320px] md:w-[350px] lg:w-[370px] shrink-0 bg-white rounded-3xl overflow-hidden border border-[#F5DEC8] shadow-sm hover:shadow-xl hover:border-[#F4A261]/80 hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  {/* Compact & Clear Image Container */}
                  <div className="relative h-48 sm:h-52 overflow-hidden bg-[#FFF9F3]">
                    <img
                      src={prog.image}
                      alt={isClone ? "" : prog.title}
                      className="w-full h-full object-cover object-center group-hover:scale-106 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/15 to-transparent"></div>

                    {/* Circular Icon in Light Saffron */}
                    <div className="absolute top-3.5 left-3.5 w-10 h-10 rounded-xl bg-white/95 backdrop-blur-md text-[#F4A261] border border-white shadow-md flex items-center justify-center group-hover:bg-[#F4A261] group-hover:text-white transition-colors duration-300">
                      <Icon className="w-5 h-5" />
                    </div>

                    {/* Program Category Badge on Top-Right */}
                    <div className="absolute top-3.5 right-3.5 bg-black/45 backdrop-blur-md px-2.5 py-0.5 rounded-full text-[10px] font-bold text-white border border-white/20">
                      {prog.badge}
                    </div>

                    {/* Impact Stats Pill on Bottom */}
                    <div className="absolute bottom-3 left-3.5 bg-white/95 backdrop-blur-md px-3 py-1 rounded-full text-[11px] font-bold text-[#493326] shadow-xs border border-[#F5DEC8]">
                      {prog.stats}
                    </div>
                  </div>

                  {/* Card Content Body */}
                  <div className="p-5 sm:p-6 space-y-2">
                    <h3 className="font-serif font-bold text-lg sm:text-xl text-[#493326] group-hover:text-[#F4A261] transition-colors leading-snug">
                      {prog.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#493326]/75 leading-relaxed line-clamp-2">
                      {prog.description}
                    </p>
                  </div>
                </div>

                {/* Card Action Footer */}
                <div className="px-5 sm:px-6 pb-5 pt-3 border-t border-[#FFF0E3] flex items-center justify-between mt-1">
                  <Link
                    to="/programs"
                    tabIndex={isClone ? -1 : 0}
                    className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#F4A261] group-hover:text-[#E87A1E] transition-colors"
                  >
                    <span>Explore Program</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-200" />
                  </Link>

                  <span className="text-[10px] font-bold text-[#493326]/45 uppercase tracking-wider bg-[#FFF0E3] px-2.5 py-0.5 rounded-full">
                    Direct Seva
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 3. Bottom Centered Call To Action */}
      <div className="mt-6 sm:mt-8 text-center relative z-20">
        <Link
          to="/programs"
          className="inline-flex items-center gap-2.5 px-9 py-4 bg-white hover:bg-[#F4A261] text-[#493326] hover:text-white border-2 border-[#F4A261] text-sm font-bold rounded-full transition-all duration-300 shadow-sm hover:shadow-lg hover:-translate-y-0.5"
        >
          <span>View All Seva Programs</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

    </section>
  );
}
