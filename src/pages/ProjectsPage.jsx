import React, { useState } from 'react';
import { Search, Filter, Heart, Share2, Clock, Users, ArrowRight, ShieldCheck, PlusCircle } from 'lucide-react';
import { featuredProjects } from '../data/mockData';
import { useToast } from '../context/ToastContext';

export default function ProjectsPage({ onOpenDonate }) {
  const { addToast } = useToast();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['All', 'Climate Resilience', 'Water Security', 'Biodiversity', 'Clean Tech'];

  const filteredProjects = featuredProjects.filter(p => {
    const matchesCat = selectedCategory === 'All' || p.category === selectedCategory;
    const matchesQuery = p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         p.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         p.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesQuery;
  });

  const handleShare = (project) => {
    if (navigator.share) {
      navigator.share({ title: project.title, url: window.location.href }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      addToast(`Campaign link for "${project.title}" copied!`, 'info');
    }
  };

  return (
    <div className="bg-[#FDFBF7] py-12 lg:py-16 text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Top Header - Centered */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FFF2E3] text-xs font-bold text-[#A34805] border border-[#FDE2C4] shadow-xs">
            <span className="w-2 h-2 rounded-full bg-[#E87A1E] animate-pulse"></span>
            24 ACTIVE SEVA INITIATIVES
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#381602] leading-tight">
            Active Campaigns & Projects
          </h1>
          <p className="text-base sm:text-lg text-[#5C381E] leading-relaxed max-w-2xl mx-auto">
            Transparent, community-driven seva efforts where 100% of public gifts reach boots on the ground with verified audit tracking.
          </p>
        </div>

        {/* Search & Filter Toolbar */}
        <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center justify-between">
          {/* Search box */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by community, region, or seva..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white border border-[#F3DEC8] rounded-2xl pl-10 pr-4 py-2.5 text-xs sm:text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#E87A1E]"
            />
          </div>

          {/* Category Chips */}
          <div className="flex flex-wrap items-center gap-2 overflow-x-auto pb-1">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-bold transition whitespace-nowrap ${
                  selectedCategory === cat
                    ? 'bg-[#E87A1E] text-white shadow-xs'
                    : 'bg-white text-[#5C381E] border border-[#F5DEC8] hover:bg-[#FFF2E3]'
                }`}
              >
                {cat === 'All' ? `All (${featuredProjects.length})` : cat}
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
                className="bg-white rounded-3xl overflow-hidden border border-[#F3DEC8] shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
              >
                {/* Photo & badges */}
                <div className="relative h-60 overflow-hidden bg-gray-100">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>

                  <div className="absolute top-3.5 left-3.5 flex items-center gap-2">
                    {project.badge === 'Urgent' && (
                      <span className="bg-[#D32F2F] text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full shadow-sm">
                        Urgent
                      </span>
                    )}
                    <span className="bg-white/95 backdrop-blur-md text-[#381602] text-[11px] font-bold px-3 py-1 rounded-full shadow-sm">
                      {project.category}
                    </span>
                  </div>

                  <div className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-md text-white text-[11px] font-medium px-2.5 py-1 rounded-full flex items-center gap-1">
                    <Clock className="w-3 h-3 text-[#FDE2C4]" />
                    <span>{project.daysLeft} days left</span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#A34805]">
                      {project.location}
                    </span>
                    <h3 className="font-serif text-xl font-bold text-[#381602] mt-1 mb-2 line-clamp-1 group-hover:text-[#D2640C] transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#5C381E] line-clamp-2 leading-relaxed">
                      {project.description}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-gray-100">
                    <div className="flex justify-between items-baseline mb-2">
                      <div className="font-serif text-2xl font-bold text-[#381602]">
                        ${project.raised.toLocaleString()}
                        <span className="text-xs font-sans text-gray-500 font-normal ml-1">
                          / ${project.target.toLocaleString()}
                        </span>
                      </div>
                      <span className="text-xs font-bold bg-[#FFF2E3] text-[#A34805] px-2.5 py-0.5 rounded-full border border-[#FDE2C4]">
                        {percent}%
                      </span>
                    </div>

                    <div className="w-full bg-[#FCE8D5] h-2.5 rounded-full overflow-hidden">
                      <div
                        className="bg-[#E87A1E] h-full rounded-full transition-all duration-1000"
                        style={{ width: `${percent}%` }}
                      ></div>
                    </div>

                    <div className="flex items-center justify-between text-xs text-gray-500 mt-2 font-medium">
                      <span className="flex items-center gap-1">
                        <Users className="w-3.5 h-3.5 text-gray-400" />
                        {project.backers} supporters
                      </span>
                      <span>Target: May 2026</span>
                    </div>

                    <div className="flex items-center gap-2 mt-5">
                      <button
                        onClick={() => onOpenDonate(project)}
                        className="flex-1 py-3 px-4 bg-[#E87A1E] hover:bg-[#D2640C] text-white text-xs sm:text-sm font-bold rounded-xl flex items-center justify-center gap-2 shadow-xs hover:shadow transition active:scale-[0.99]"
                      >
                        <Heart className="w-4 h-4 fill-current text-white/90" />
                        <span>Support Project</span>
                      </button>

                      <button
                        onClick={() => handleShare(project)}
                        className="p-3 rounded-xl border border-[#F3DEC8] hover:bg-[#FFF2E3] text-[#5C381E] transition"
                        title="Share Campaign"
                      >
                        <Share2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Start Community Fundraiser Card */}
        <div className="bg-gradient-to-r from-[#FFF2E3] via-[#FFFDF9] to-[#FDE2C4] text-[#381602] rounded-3xl p-8 sm:p-10 border border-[#F3DEC8] shadow-md relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl text-left">
            <span className="text-xs font-bold uppercase tracking-wider text-[#A34805] bg-white border border-[#F5DEC8] px-3 py-1 rounded-full shadow-xs">
              🙏 Grassroots Seva Ignition
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#381602]">
              Want to start your own community fundraiser?
            </h3>
            <p className="text-xs sm:text-sm text-[#5C381E] leading-relaxed">
              Empower your school, neighborhood, or devotee group with zero platform fees and live verified proof of impact.
            </p>
          </div>

          <button
            onClick={() => addToast('Fundraiser creation application opened! Check your email for verification link.', 'success')}
            className="px-8 py-3.5 bg-[#E87A1E] text-white font-bold rounded-2xl hover:bg-[#D2640C] transition shadow-sm shrink-0 flex items-center gap-2"
          >
            <PlusCircle className="w-4 h-4 text-white/90" />
            <span>Create a Campaign</span>
          </button>
        </div>

      </div>
    </div>
  );
}
