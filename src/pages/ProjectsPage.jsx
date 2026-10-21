import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Filter, 
  Heart, 
  Share2, 
  Clock, 
  Users, 
  ArrowRight, 
  ShieldCheck, 
  PlusCircle,
  ChevronRight,
  TrendingUp,
  SlidersHorizontal,
  CheckCircle2
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { featuredProjects } from '../data/mockData';
import { useToast } from '../context/ToastContext';

export default function ProjectsPage({ onOpenDonate }) {
  const { addToast } = useToast();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('urgency'); // 'urgency' | 'funded' | 'amount'

  const categories = ['All', 'Annadan & Nutrition', 'Healthcare & Medical', 'Child Education', 'Clean Water & Relief'];

  const filteredProjects = useMemo(() => {
    return featuredProjects.filter(p => {
      const matchesCat = selectedCategory === 'All' || 
                         (selectedCategory === 'Annadan & Nutrition' && (p.category.includes('Climate') || p.category.includes('Food') || p.category.includes('Annadan'))) ||
                         (selectedCategory === 'Healthcare & Medical' && (p.category.includes('Health') || p.category.includes('Tech'))) ||
                         (selectedCategory === 'Child Education' && (p.category.includes('Education') || p.category.includes('Bio'))) ||
                         (selectedCategory === 'Clean Water & Relief' && (p.category.includes('Water') || p.category.includes('Resilience'))) ||
                         p.category === selectedCategory;

      const matchesQuery = p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           p.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           p.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCat && matchesQuery;
    }).sort((a, b) => {
      if (sortBy === 'urgency') return a.daysLeft - b.daysLeft;
      if (sortBy === 'funded') return (b.raised / b.target) - (a.raised / a.target);
      if (sortBy === 'amount') return b.raised - a.raised;
      return 0;
    });
  }, [selectedCategory, searchQuery, sortBy]);

  const handleShare = (project) => {
    if (navigator.share) {
      navigator.share({ title: project.title, url: window.location.href }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      addToast(`Campaign link for "${project.title}" copied to clipboard!`, 'info');
    }
  };

  return (
    <div className="bg-[#FDFBF7] min-h-screen text-left">
      
      {/* Top Banner & Header */}
      <section className="bg-gradient-to-b from-[#FFF2E3]/70 via-[#FFFDF9] to-[#FDFBF7] pt-12 pb-16 border-b border-[#F3DEC8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          


          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div className="max-w-3xl space-y-3">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FFF2E3] text-xs font-bold text-[#A34805] border border-[#F5DEC8] shadow-xs">
                <span className="w-2 h-2 rounded-full bg-[#E87A1E] animate-pulse"></span>
                LIVE COMMUNITY RELIEF MISSIONS • 100% AUDIT VERIFIED
              </div>
              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-[#381602] leading-tight">
                Active Campaigns & Seva Projects
              </h1>
              <p className="text-base sm:text-lg text-stone-600 leading-relaxed max-w-2xl">
                Choose a verified grassroots project to support. Track progress transparently with regular photo updates, meal distributions, and automated 80G tax deductible receipts.
              </p>
            </div>

            {/* Quick Metrics */}
            <div className="flex items-center gap-4 bg-white p-4 rounded-2xl border border-[#F3DEC8] shadow-xs shrink-0">
              <div className="pr-4 border-r border-[#F3DEC8]">
                <span className="text-xs font-bold text-stone-500 block">Total Deployed</span>
                <span className="font-serif text-xl font-bold text-[#381602]">$437,500</span>
              </div>
              <div>
                <span className="text-xs font-bold text-stone-500 block">Audited Delivery</span>
                <span className="font-serif text-xl font-bold text-[#E87A1E]">100% Ground Seva</span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16 space-y-12">
        
        {/* Search, Filter & Sort Toolbar */}
        <div className="bg-white p-4 sm:p-6 rounded-3xl border border-[#F3DEC8] shadow-sm space-y-4">
          <div className="flex flex-col lg:flex-row gap-4 items-stretch lg:items-center justify-between">
            
            {/* Search Box */}
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search by community, region, or keyword..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#FFFDF9] border border-[#F3DEC8] rounded-2xl pl-10 pr-4 py-2.5 text-xs sm:text-sm text-stone-800 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-[#E87A1E]"
              />
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2 shrink-0">
              <span className="text-xs font-bold text-stone-500 flex items-center gap-1">
                <SlidersHorizontal className="w-3.5 h-3.5" />
                Sort:
              </span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-[#FFFDF9] border border-[#F3DEC8] text-xs font-bold text-[#381602] rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#E87A1E]"
              >
                <option value="urgency">Most Urgent First</option>
                <option value="funded">Highest % Funded</option>
                <option value="amount">Largest Collection Target</option>
              </select>
            </div>
          </div>

          {/* Category Chips Bar */}
          <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-[#F3DEC8]">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-bold transition whitespace-nowrap ${
                  selectedCategory === cat
                    ? 'bg-[#E87A1E] text-white shadow-xs'
                    : 'bg-[#FFFDF9] text-stone-700 border border-[#F5DEC8] hover:bg-[#FFF2E3]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => {
            const percent = Math.min(Math.round((project.raised / project.target) * 100), 100);
            return (
              <div
                key={project.id}
                className="bg-white rounded-3xl overflow-hidden border border-[#F3DEC8] shadow-sm hover:shadow-xl hover:border-[#E87A1E]/40 transition-all duration-300 flex flex-col justify-between group"
              >
                {/* Photo & Badges */}
                <div className="relative h-60 overflow-hidden bg-stone-100">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent"></div>

                  <div className="absolute top-3.5 left-3.5 flex items-center gap-2">
                    {project.badge === 'Urgent' && (
                      <span className="bg-[#D32F2F] text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full shadow-sm">
                        High Priority
                      </span>
                    )}
                    <span className="bg-white/95 backdrop-blur-md text-[#381602] text-[11px] font-bold px-3 py-1 rounded-full shadow-sm border border-[#F5DEC8]">
                      {project.category}
                    </span>
                  </div>

                  <div className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-md text-white text-[11px] font-medium px-2.5 py-1 rounded-full flex items-center gap-1">
                    <Clock className="w-3 h-3 text-[#FFB86A]" />
                    <span>{project.daysLeft} days active</span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#A34805] block">
                      📍 {project.location}
                    </span>
                    <h3 className="font-serif text-xl font-bold text-[#381602] mt-1 mb-2 line-clamp-1 group-hover:text-[#E87A1E] transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-stone-600 line-clamp-2 leading-relaxed">
                      {project.description}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-[#F3DEC8]">
                    <div className="flex justify-between items-baseline mb-2">
                      <div className="font-serif text-2xl font-bold text-[#381602]">
                        ${project.raised.toLocaleString()}
                        <span className="text-xs font-sans text-stone-400 font-normal ml-1">
                          / ${project.target.toLocaleString()}
                        </span>
                      </div>
                      <span className="text-xs font-bold bg-[#FFF2E3] text-[#A34805] px-2.5 py-0.5 rounded-full border border-[#F5DEC8]">
                        {percent}% Funded
                      </span>
                    </div>

                    <div className="w-full bg-[#FCE8D5] h-2.5 rounded-full overflow-hidden">
                      <div
                        className="bg-[#E87A1E] h-full rounded-full transition-all duration-1000"
                        style={{ width: `${percent}%` }}
                      ></div>
                    </div>

                    <div className="flex items-center justify-between text-xs text-stone-500 mt-2.5 font-medium">
                      <span className="flex items-center gap-1">
                        <Users className="w-3.5 h-3.5 text-[#E87A1E]" />
                        {project.backers} dedicated supporters
                      </span>
                      <span className="text-[11px] text-stone-400">Verified Seva</span>
                    </div>

                    <div className="flex items-center gap-2 mt-5">
                      <button
                        onClick={() => onOpenDonate(project)}
                        className="flex-1 py-3 px-4 bg-[#E87A1E] hover:bg-[#D2640C] text-white text-xs sm:text-sm font-bold rounded-xl flex items-center justify-center gap-2 shadow-sm transition active:scale-[0.99]"
                      >
                        <Heart className="w-4 h-4 fill-current text-white/90" />
                        <span>Support Campaign</span>
                      </button>

                      <button
                        onClick={() => handleShare(project)}
                        className="p-3 rounded-xl border border-[#F3DEC8] hover:bg-[#FFF2E3] text-stone-700 transition"
                        title="Share Campaign"
                      >
                        <Share2 className="w-4 h-4 text-[#381602]" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Start Community Fundraiser Card */}
        <div className="bg-gradient-to-r from-[#FFF2E3] via-white to-[#FDE2C4] text-[#381602] rounded-3xl p-8 sm:p-12 border border-[#F3DEC8] shadow-md relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl text-left">
            <span className="text-xs font-bold uppercase tracking-wider text-[#A34805] bg-white border border-[#F5DEC8] px-3 py-1 rounded-full shadow-xs">
              🙏 Grassroots Community Seva
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#381602]">
              Want to start a community campaign or sponsor a village?
            </h3>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
              Empower your school, devotees group, or retail store network with zero administrative overhead and instant 80G digital certificates.
            </p>
          </div>

          <button
            onClick={() => addToast('Fundraiser creation application opened! Check your email for verification link.', 'success')}
            className="px-8 py-3.5 bg-[#E87A1E] text-white font-bold rounded-2xl hover:bg-[#D2640C] transition shadow-md shrink-0 flex items-center gap-2 active:scale-95"
          >
            <PlusCircle className="w-4 h-4 text-white/90" />
            <span>Launch a Campaign</span>
          </button>
        </div>

      </div>
    </div>
  );
}
