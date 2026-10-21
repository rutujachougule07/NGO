import React from 'react';
import { areasOfWork } from '../data/mockData';
import { 
  GraduationCap, 
  Sparkles, 
  HeartPulse, 
  Building2, 
  Sprout, 
  Scale, 
  Heart,
  CheckCircle2, 
  ArrowRight,
  ChevronRight,
  HelpCircle,
  ShieldCheck,
  MapPin,
  Users,
  Calendar,
  Utensils
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAdmin } from '../context/AdminContext';

export default function ProgramsPage({ onOpenDonate }) {
  const { websiteCMS } = useAdmin();

  const iconMap = {
    GraduationCap,
    Sparkles,
    HeartPulse,
    Building2,
    Sprout,
    Scale,
    Utensils
  };

  const authenticImages = {
    education: "/hero_ngo_education.jpg",
    women: "/ngo_women_skills.jpg",
    healthcare: "/hero_ngo_healthcare.jpg",
    community: "/about_ngo_team.jpg",
    livelihood: "/ngo_community_planting.jpg",
    equality: "/hero_seva_banner.jpg",
  };

  const dynamicPrograms = (websiteCMS?.programs || [])
    .filter(p => p.status === 'Published')
    .map(p => {
      const cat = (p.category || '').toLowerCase();
      let icon = 'Building2';
      if (cat.includes('hunger') || cat.includes('food') || cat.includes('annadan')) icon = 'Utensils';
      else if (cat.includes('health') || cat.includes('clinic')) icon = 'HeartPulse';
      else if (cat.includes('educ') || cat.includes('child')) icon = 'GraduationCap';
      else if (cat.includes('women') || cat.includes('skill')) icon = 'Sparkles';
      else if (cat.includes('environ') || cat.includes('tree')) icon = 'Sprout';

      return {
        id: p.id,
        title: p.title,
        desc: p.description,
        metric: p.targetGoal || p.activeBeneficiaries || 'Active Seva',
        icon,
        image: p.image || '/hero_seva_banner.jpg',
        category: p.category
      };
    });

  const displayPrograms = dynamicPrograms.length > 0 ? dynamicPrograms : areasOfWork;

  return (
    <div className="bg-[#FFFDFB] min-h-screen text-left">
      
      {/* Top Banner & Header: Professional 2-Column Showcase */}
      <section className="bg-gradient-to-b from-[#FFF0E3]/70 via-[#FFF9F3] to-[#FFFDFB] pt-12 pb-16 lg:pt-16 lg:pb-20 border-b border-[#F5DEC8] relative overflow-hidden">
        {/* Subtle Decorative Ambient Glows */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#F4A261]/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#FFF0E3] rounded-full blur-3xl pointer-events-none -ml-20 -mb-20"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
            
            {/* Left Column: Heading, Narrative, Category Filter, Trust Badges (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FFF0E3] text-xs font-bold text-[#F4A261] border border-[#F5DEC8] shadow-2xs">
                <Sparkles className="w-3.5 h-3.5 text-[#F4A261]" />
                <span>INTEGRATED HUMANITARIAN INITIATIVES</span>
              </div>

              {/* Title */}
              <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold text-[#493326] leading-[1.15] tracking-tight">
                Holistic Community <span className="text-[#F4A261]">Transformation.</span>
              </h1>

              {/* Description */}
              <p className="text-base sm:text-lg text-[#493326]/80 leading-relaxed max-w-2xl">
                Guided by the divine teachings of Shirdi Sai Baba — building an empowered, self-sustaining society through direct Annadan food drives, free rural medical camps, primary child education, and women’s vocational skills.
              </p>

              {/* Quick Program Jump Links */}
              <div className="pt-1">
                <div className="text-xs font-bold uppercase tracking-wider text-[#493326]/60 mb-2.5">
                  Explore Specialized Programs:
                </div>
                <div className="flex flex-wrap gap-2.5">
                  {displayPrograms.map(area => (
                    <a
                      key={area.id}
                      href={`#${area.id}`}
                      className="px-4 py-2 rounded-full bg-white hover:bg-[#F4A261] text-[#493326] hover:text-white text-xs font-bold border border-[#F5DEC8] shadow-2xs hover:shadow-sm transition-all duration-200"
                    >
                      {area.title}
                    </a>
                  ))}
                </div>
              </div>

              {/* Trust Markers */}
              <div className="pt-3 flex flex-wrap items-center gap-6 text-xs font-semibold text-[#493326]/75 border-t border-[#F5DEC8]/80">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#F4A261]" />
                  <span>Section 80G Tax-Exempt Receipts</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#F4A261]" />
                  <span>100% Direct Ground Delivery</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#F4A261]" />
                  <span>Audited Transparency</span>
                </div>
              </div>

            </div>

            {/* Right Column: Ground Impact Showcase Card (5 cols) */}
            <div className="lg:col-span-5">
              <div className="bg-white rounded-3xl p-6 sm:p-7 border border-[#F5DEC8] shadow-xl relative group">
                
                {/* Photo with Overlay */}
                <div className="relative h-56 sm:h-64 rounded-2xl overflow-hidden mb-5">
                  <img 
                    src="/about_ngo_team.jpg" 
                    alt="Immense Life Maharashtra Gram Seva Team" 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent"></div>
                  
                  <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-md px-3 py-1 rounded-full text-[11px] font-bold text-[#493326] border border-[#F5DEC8] shadow-2xs">
                    Direct Ground Execution
                  </div>

                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <p className="text-xs font-medium text-white/90">Shirdi Peace & Seva Outreach</p>
                    <p className="font-serif font-bold text-sm sm:text-base">Empowering 48+ Rural Communities</p>
                  </div>
                </div>

                {/* 3 Impact Stats Grid */}
                <div className="grid grid-cols-3 gap-3 text-center pb-5 border-b border-[#FFF0E3]">
                  <div className="p-2.5 rounded-xl bg-[#FFF9F3] border border-[#F5DEC8]">
                    <div className="font-serif font-bold text-xl text-[#F4A261]">125K+</div>
                    <div className="text-[10px] font-bold text-[#493326]/70 uppercase tracking-wider mt-0.5">Lives Touched</div>
                  </div>
                  <div className="p-2.5 rounded-xl bg-[#FFF9F3] border border-[#F5DEC8]">
                    <div className="font-serif font-bold text-xl text-[#F4A261]">85K+</div>
                    <div className="text-[10px] font-bold text-[#493326]/70 uppercase tracking-wider mt-0.5">Meals Served</div>
                  </div>
                  <div className="p-2.5 rounded-xl bg-[#FFF9F3] border border-[#F5DEC8]">
                    <div className="font-serif font-bold text-xl text-[#F4A261]">100%</div>
                    <div className="text-[10px] font-bold text-[#493326]/70 uppercase tracking-wider mt-0.5">Voluntary Seva</div>
                  </div>
                </div>

                {/* Fast Action Button */}
                <div className="pt-4">
                  <button
                    onClick={() => onOpenDonate()}
                    className="w-full py-3.5 bg-[#F4A261] hover:bg-[#E87A1E] text-white text-xs sm:text-sm font-bold rounded-full transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 hover:-translate-y-0.5"
                  >
                    <Heart className="w-4 h-4 fill-current" />
                    <span>Support Our Seva Mission</span>
                  </button>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20 space-y-16">
        
        {/* Detailed Program Pillars List */}
        <div className="space-y-12">
          {displayPrograms.map((area, idx) => {
            const Icon = iconMap[area.icon] || Sprout;
            const isEven = idx % 2 === 0;
            const cardImage = area.image || authenticImages[area.id] || "/hero_seva_banner.jpg";

            return (
              <div
                key={area.id}
                id={area.id}
                className="bg-white rounded-3xl p-8 sm:p-12 border border-[#F3DEC8] shadow-sm hover:shadow-md transition grid grid-cols-1 lg:grid-cols-12 gap-10 items-center"
              >
                {/* Image */}
                <div className={`lg:col-span-5 ${isEven ? 'lg:order-1' : 'lg:order-2'}`}>
                  <div className="rounded-2xl overflow-hidden shadow-md h-72 sm:h-96 border border-[#F5DEC8] relative group">
                    <img
                      src={cardImage}
                      alt={area.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md px-3.5 py-1 rounded-full text-xs font-bold text-[#381602] border border-[#F5DEC8] shadow-xs">
                      {area.metric}
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className={`lg:col-span-7 space-y-5 ${isEven ? 'lg:order-2' : 'lg:order-1'}`}>
                  <div className="flex items-center justify-between">
                    <div className="w-14 h-14 rounded-2xl bg-[#FFF2E3] text-[#E87A1E] flex items-center justify-center border border-[#F5DEC8] shadow-xs">
                      <Icon className="w-7 h-7" />
                    </div>
                    <span className="text-xs font-bold bg-[#FFF2E3] text-[#A34805] border border-[#F5DEC8] px-3.5 py-1.5 rounded-full">
                      Verified Frontline Impact
                    </span>
                  </div>

                  <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#381602]">
                    {area.title}
                  </h3>

                  <p className="text-sm sm:text-base text-stone-600 leading-relaxed">
                    {area.desc}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-1">
                    <div className="flex items-center gap-2.5 text-xs font-bold text-[#381602] bg-[#FFFDF9] p-3 rounded-xl border border-[#F3DEC8]">
                      <CheckCircle2 className="w-4 h-4 text-[#E87A1E] shrink-0" />
                      <span>Zero Intermediaries & Direct Ground Seva</span>
                    </div>
                    <div className="flex items-center gap-2.5 text-xs font-bold text-[#381602] bg-[#FFFDF9] p-3 rounded-xl border border-[#F3DEC8]">
                      <CheckCircle2 className="w-4 h-4 text-[#E87A1E] shrink-0" />
                      <span>Continuous Impact & Photo Audits</span>
                    </div>
                  </div>

                  <div className="pt-3 flex flex-wrap items-center gap-4">
                    <button
                      onClick={() => onOpenDonate({ project: area.id })}
                      className="px-7 py-3.5 bg-[#E87A1E] hover:bg-[#D2640C] text-white text-xs sm:text-sm font-bold rounded-full transition flex items-center gap-2 shadow-md shadow-[#E87A1E]/20 active:scale-95"
                    >
                      <Heart className="w-4 h-4 fill-current text-white/90" />
                      <span>Sponsor this Initiative</span>
                    </button>
                    <Link
                      to="/contact"
                      className="px-5 py-3.5 text-xs font-semibold text-[#381602] hover:text-[#E87A1E] transition"
                    >
                      Request Support / Inquire →
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>




      </div>
    </div>
  );
}
