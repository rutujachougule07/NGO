import React from 'react';
import { 
  Target, 
  Eye, 
  ShieldCheck, 
  Award, 
  Heart, 
  CheckCircle2, 
  ArrowRight,
  Sun,
  Users,
  Calendar,
  Sparkles,
  FileCheck,
  Building,
  ChevronRight
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { foundationInfo } from '../data/mockData';
import { useAdmin } from '../context/AdminContext';

export default function AboutPage({ onOpenDonate }) {
  const { websiteCMS, foundationSettings } = useAdmin();
  const cmsAbout = websiteCMS?.about || {};

  const defaultLeadership = [
    {
      name: "Dr. Arvind Swaminathan",
      role: "Managing Trustee & Executive Director",
      credentials: "M.D., Public Health | Ex-Director AIIMS",
      bio: "Leads clinical medical vans, seva partnerships, and strategic community outreach across rural networks.",
      image: "/about_ngo_team.jpg"
    },
    {
      name: "Smt. Kalyani Deshmukh",
      role: "Social Welfare Trustee",
      credentials: "Pioneer in Women Micro-Cooperatives & Child Welfare",
      bio: "Pioneered decentralized community kitchens and mobile Annadan meal vans feeding over 2,000 citizens daily.",
      image: "/hero_ngo_education.jpg"
    },
    {
      name: "Shri Rajeshwar Kulkarni",
      role: "Treasurer & Legal Counsel",
      credentials: "Senior Advocate & Tax Specialist",
      bio: "Oversees fiscal statutory compliance, 80G tax exemptions, and independent annual CA audits.",
      image: "/hero_ngo_healthcare.jpg"
    }
  ];

  const dynamicTrustees = (cmsAbout.trustees || []).map((t, i) => ({
    name: t.name,
    role: t.role,
    credentials: t.experience || 'Trustee Board',
    bio: `${t.name} serves as ${t.role} for Immense Life Foundation, guiding field execution and governance.`,
    image: i === 0 ? "/about_ngo_team.jpg" : i === 1 ? "/hero_ngo_education.jpg" : "/hero_ngo_healthcare.jpg"
  }));

  const leadership = dynamicTrustees.length > 0 ? dynamicTrustees : defaultLeadership;

  const milestones = [
    {
      year: "2018",
      title: "Foundation Inception & First Annadan Kitchen",
      desc: "Started with a small volunteer kitchen serving 50 hot sanctified meals daily to destitute elderly citizens in rural suburbs."
    },
    {
      year: "2020",
      title: "Pandemic Disaster Relief Operations",
      desc: "Dispatched over 120,000 dry ration food kits, emergency oxygen concentrators, and hygiene kits during nationwide lockdowns."
    },
    {
      year: "2022",
      title: "Mobile Health Van & Preventive Clinics",
      desc: "Launched fully-equipped mobile dispensaries with voluntary doctors providing free health screenings and pediatric care."
    },
    {
      year: "2024",
      title: "Child Education STEM Hubs & Women Cooperatives",
      desc: "Opened 8 after-school remedial learning centers with free tablets, stationery, and vocational tailoring workshops for mothers."
    },
    {
      year: "2026",
      title: "Digital Seva & 280+ Shop QR Network",
      desc: "Expanded across 14 frontline districts, surpassing 75,000 verified meals and pioneering fee-free QR donations in retail partner stores."
    }
  ];

  const credentialsList = [
    { label: "80G Tax Exemption", desc: "50% deduction on all Indian donations under Sec 80G" },
    { label: "12A Registration", desc: "Recognized as a public charitable institution" },
    { label: "NITI Aayog Darpan", desc: "Registered on central NGO portal (DL/2021/028491)" },
    { label: "Independent Audits", desc: "Fiscal books audited annually by statutory chartered accountants" }
  ];

  return (
    <div className="bg-[#FDFBF7] min-h-screen text-left">
      
      {/* Top Professional Header Banner */}
      <section className="bg-gradient-to-b from-[#FFF2E3]/70 via-[#FFFDF9] to-[#FDFBF7] pt-12 pb-16 border-b border-[#F3DEC8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          


          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FFF2E3] text-xs font-bold text-[#A34805] border border-[#F5DEC8] shadow-xs">
                <span className="w-2 h-2 rounded-full bg-[#E87A1E] animate-pulse"></span>
                ESTABLISHED 2018 • SERVE • SUPPORT • UPLIFT • TOGETHER
              </div>
              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-[#381602] leading-[1.15]">
                Uplifting Lives with Selfless Seva & Dignity.
              </h1>
              <p className="text-base sm:text-lg text-stone-600 leading-relaxed max-w-2xl">
                {cmsAbout.description || "Immense Life Foundation is a public charitable trust founded on the timeless philosophy of universal compassion, selfless service (Nishkama Seva), and absolute transparency. We bridge the gap between compassionate donors and frontline vulnerable communities."}
              </p>

              {/* Quick Trust Bar */}
              <div className="pt-2 flex flex-wrap items-center gap-4 text-xs font-semibold text-[#381602]">
                <div className="flex items-center gap-1.5 bg-white px-3.5 py-2 rounded-full border border-[#F3DEC8] shadow-xs">
                  <ShieldCheck className="w-4 h-4 text-[#E87A1E]" />
                  <span>80G / 501(c)(3) Certified</span>
                </div>
                <div className="flex items-center gap-1.5 bg-white px-3.5 py-2 rounded-full border border-[#F3DEC8] shadow-xs">
                  <FileCheck className="w-4 h-4 text-[#E87A1E]" />
                  <span>Audited by Statutory CAs</span>
                </div>
                <div className="flex items-center gap-1.5 bg-white px-3.5 py-2 rounded-full border border-[#F3DEC8] shadow-xs">
                  <Heart className="w-4 h-4 text-[#E87A1E] fill-[#E87A1E]/20" />
                  <span>100% Volunteer Driven Ground Force</span>
                </div>
              </div>
            </div>

            {/* Emblem Artwork Card */}
            <div className="lg:col-span-5">
              <div className="relative rounded-3xl overflow-hidden p-3 bg-white border border-[#F3DEC8] shadow-xl shadow-[#E87A1E]/5">
                <img 
                  src={cmsAbout.image || "/about_ngo_team.jpg"} 
                  alt="Immense Life Seva and Humanitarian Relief" 
                  className="w-full h-80 sm:h-96 object-cover object-center rounded-2xl"
                />
                <div className="absolute inset-x-7 bottom-7 bg-white/95 backdrop-blur-md p-4 rounded-2xl border border-[#F5DEC8] shadow-md">
                  <span className="text-[10px] font-bold text-[#A34805] uppercase tracking-wider block">
                    Our Guiding Inspiration
                  </span>
                  <p className="font-serif font-bold text-sm text-[#381602] mt-0.5">
                    "Sabka Malik Ek — Love All, Feed All, Serve All."
                  </p>
                  <p className="text-[11px] text-stone-500 mt-1">
                    Dedication to selfless community Annadan and universal humanitarian care.
                  </p>
                </div>
              </div>
            </div>

          </div>

          {/* Aggregate Numbers Strip */}
          <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-4 bg-white p-6 rounded-3xl border border-[#F3DEC8] shadow-sm">
            <div className="text-center p-3 border-r border-[#F3DEC8]/70 last:border-0">
              <span className="font-serif text-3xl sm:text-4xl font-bold text-[#381602] block">75,000+</span>
              <span className="text-xs font-semibold text-stone-500 mt-1 block">Hot Annadan Meals</span>
            </div>
            <div className="text-center p-3 md:border-r border-[#F3DEC8]/70 last:border-0">
              <span className="font-serif text-3xl sm:text-4xl font-bold text-[#381602] block">12,500+</span>
              <span className="text-xs font-semibold text-stone-500 mt-1 block">Free Medical Consults</span>
            </div>
            <div className="text-center p-3 border-r border-[#F3DEC8]/70 last:border-0">
              <span className="font-serif text-3xl sm:text-4xl font-bold text-[#381602] block">1,800+</span>
              <span className="text-xs font-semibold text-stone-500 mt-1 block">Students Supported</span>
            </div>
            <div className="text-center p-3">
              <span className="font-serif text-3xl sm:text-4xl font-bold text-[#E87A1E] block">88%</span>
              <span className="text-xs font-semibold text-stone-500 mt-1 block">Direct Program Seva</span>
            </div>
          </div>

        </div>
      </section>

      {/* Main Content Sections */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 space-y-20">
        
        {/* Core Pillars of Trust */}
        <div>
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-[#E87A1E]">
              Operational Principles
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#381602] mt-2">
              How We Maintain Complete Trust
            </h2>
            <p className="text-sm text-stone-600 mt-2">
              Every rupee and dollar contributed is treated as sacred trust and directed directly toward tangible frontline impact.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-3xl border border-[#F3DEC8] shadow-sm hover:shadow-md transition">
              <div className="w-12 h-12 rounded-2xl bg-[#FFF2E3] text-[#E87A1E] flex items-center justify-center mb-5 border border-[#F5DEC8]">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-xl font-bold text-[#381602] mb-2">Uncompromising Transparency</h3>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                Open verified public balance sheets and audit reports available for anyone to inspect. 88% of all funds directly reach frontline food, medical, and education relief.
              </p>
            </div>

            <div className="bg-white p-8 rounded-3xl border border-[#F3DEC8] shadow-sm hover:shadow-md transition">
              <div className="w-12 h-12 rounded-2xl bg-[#FFF2E3] text-[#E87A1E] flex items-center justify-center mb-5 border border-[#F5DEC8]">
                <Target className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-xl font-bold text-[#381602] mb-2">Grassroots Community Voice</h3>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                We work alongside local village councils, neighborhood leaders, and voluntary youth to identify genuinely destitute families without prejudice or bias.
              </p>
            </div>

            <div className="bg-white p-8 rounded-3xl border border-[#F3DEC8] shadow-sm hover:shadow-md transition">
              <div className="w-12 h-12 rounded-2xl bg-[#FFF2E3] text-[#E87A1E] flex items-center justify-center mb-5 border border-[#F5DEC8]">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-xl font-bold text-[#381602] mb-2">Photo & Ledger Verification</h3>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                Donors receive digital verification of field activities, Annadan distribution counts, and patient registers for maximum accountability.
              </p>
            </div>
          </div>
        </div>

        {/* Journey Timeline */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-[#F3DEC8] shadow-sm">
          <div className="max-w-2xl mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-[#E87A1E]">
              Our Milestones
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#381602] mt-2">
              The Journey of Immense Life Foundation
            </h2>
            <p className="text-sm text-stone-600 mt-2">
              From a small community initiative to a multi-district seva trust transforming thousands of lives every month.
            </p>
          </div>

          <div className="space-y-8 relative before:absolute before:inset-0 before:left-3.5 before:w-0.5 before:bg-[#F3DEC8]">
            {milestones.map((item, idx) => (
              <div key={idx} className="relative flex items-start gap-6 group">
                <div className="w-8 h-8 rounded-full bg-[#FFF2E3] border-2 border-[#E87A1E] flex items-center justify-center text-xs font-bold text-[#E87A1E] shrink-0 mt-0.5 z-10 group-hover:scale-110 group-hover:bg-[#E87A1E] group-hover:text-white transition-all shadow-xs">
                  {idx + 1}
                </div>
                <div className="flex-1 bg-[#FFFDF9] p-5 sm:p-6 rounded-2xl border border-[#F3DEC8] hover:border-[#E87A1E]/50 transition shadow-2xs">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
                    <h4 className="font-serif text-lg font-bold text-[#381602]">
                      {item.title}
                    </h4>
                    <span className="text-xs font-bold font-mono text-[#A34805] bg-[#FFF2E3] px-2.5 py-0.5 rounded-full border border-[#F5DEC8]">
                      {item.year}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Leadership Team */}
        <div>
          <div className="text-center max-w-xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-[#E87A1E]">
              Leadership & Governance
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#381602] mt-2">
              Governed by Dedicated Trustees
            </h2>
            <p className="text-sm text-stone-600 mt-2">
              Guided by experienced medical professionals, humanitarian social workers, and chartered accountants.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {leadership.map((member, i) => (
              <div key={i} className="bg-white rounded-3xl overflow-hidden border border-[#F3DEC8] shadow-sm p-6 text-center hover:border-[#E87A1E]/50 hover:shadow-md transition">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-28 h-28 rounded-full object-cover mx-auto mb-4 border-4 border-[#FFF2E3] shadow-md"
                />
                <h4 className="font-serif font-bold text-lg text-[#381602]">{member.name}</h4>
                <p className="text-xs font-bold text-[#E87A1E] mt-0.5">{member.role}</p>
                <p className="text-[11px] font-semibold text-stone-500 mt-0.5 mb-3">{member.credentials}</p>
                <p className="text-xs text-stone-600 leading-relaxed">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Statutory Compliance Badges */}
        <div className="bg-[#FFF2E3] rounded-3xl p-8 border border-[#F5DEC8]">
          <div className="text-center max-w-xl mx-auto mb-8">
            <h3 className="font-serif text-2xl font-bold text-[#381602]">
              Legal Accreditations & Statutory Compliance
            </h3>
            <p className="text-xs text-stone-600 mt-1">
              Registered and compliant with all Indian statutory charity and tax requirements.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {credentialsList.map((item, idx) => (
              <div key={idx} className="bg-white p-4 rounded-2xl border border-[#F5DEC8] shadow-xs text-center">
                <CheckCircle2 className="w-5 h-5 text-[#E87A1E] mx-auto mb-2" />
                <h4 className="font-bold text-xs text-[#381602]">{item.label}</h4>
                <p className="text-[11px] text-stone-500 mt-1 leading-snug">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action Banner */}
        <div className="bg-gradient-to-r from-[#FFF2E3] via-white to-[#FDE2C4] text-[#381602] rounded-3xl p-8 sm:p-12 border border-[#F3DEC8] shadow-md flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#A34805] block mb-1">
              Be the Hands that Serve
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold mb-2">
              Join Our Seva Mission Today
            </h3>
            <p className="text-xs sm:text-sm text-stone-600 max-w-xl leading-relaxed">
              Every meal served and every patient healed begins with compassionate people like you. Support an active project, become a field volunteer, or partner your retail store today.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              onClick={() => onOpenDonate()}
              className="px-8 py-3.5 bg-[#E87A1E] hover:bg-[#D2640C] text-white font-bold text-sm rounded-full transition shadow-md flex items-center gap-2 active:scale-95"
            >
              <Heart className="w-4 h-4 fill-current text-white/90" />
              <span>Donate Online</span>
            </button>
            <Link
              to="/contact"
              className="px-6 py-3.5 bg-white hover:bg-[#FFF2E3] text-[#381602] font-semibold text-sm rounded-full border border-[#F3DEC8] transition shadow-xs"
            >
              Contact Seva Desk
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
