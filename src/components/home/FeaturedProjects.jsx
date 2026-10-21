import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Share2, Clock, Users, ArrowRight, CheckCircle2 } from 'lucide-react';
import { featuredProjects } from '../../data/mockData';
import { useToast } from '../../context/ToastContext';

export default function FeaturedProjects({ onOpenDonate }) {
  const { addToast } = useToast();

  const handleShare = (project) => {
    if (navigator.share) {
      navigator.share({
        title: project.title,
        text: project.description,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      addToast(`Campaign link for "${project.title}" copied to clipboard!`, 'info');
    }
  };

  return (
    <section className="py-20 lg:py-28 bg-white border-t border-[#E3ECE6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading & View All Link */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-xs font-bold text-emerald-900 mb-2.5 border border-emerald-200/60 shadow-xs">
              <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse"></span>
              24 INITIATIVES ACTIVE ON GROUND
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#143D2B]">
              Featured Active Campaigns
            </h2>
            <p className="text-sm text-gray-600 mt-2 max-w-xl">
              Transparent, community-driven restoration efforts where 100% of public gifts reach boots on the ground with satellite-verified audit tracking.
            </p>
          </div>

          <Link
            to="/projects"
            className="inline-flex items-center gap-2 text-sm font-bold text-emerald-800 hover:text-emerald-950 group shrink-0"
          >
            <span>View All Projects</span>
            <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* 3 Cards Desktop Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProjects.slice(0, 3).map((project) => {
            const percent = Math.min(Math.round((project.raised / project.target) * 100), 100);
            return (
              <div
                key={project.id}
                className="bg-white rounded-3xl overflow-hidden border border-[#E7E2D5] shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
              >
                {/* Image Container with Badges */}
                <div className="relative h-56 sm:h-60 overflow-hidden bg-gray-100">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>

                  {/* Top Badges */}
                  <div className="absolute top-3.5 left-3.5 flex items-center gap-2">
                    {project.badge === 'Urgent' && (
                      <span className="bg-[#D32F2F] text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full shadow-sm">
                        Urgent
                      </span>
                    )}
                    <span className="bg-white/95 backdrop-blur-md text-[#143D2B] text-[11px] font-bold px-3 py-1 rounded-full shadow-sm">
                      {project.category}
                    </span>
                  </div>

                  {/* Days left badge */}
                  <div className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-md text-white text-[11px] font-medium px-2.5 py-1 rounded-full flex items-center gap-1">
                    <Clock className="w-3 h-3 text-emerald-300" />
                    <span>{project.daysLeft} days left</span>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-800">
                      {project.location}
                    </span>
                    <h3 className="font-serif text-xl font-bold text-[#143D2B] mt-1 mb-2 line-clamp-1 group-hover:text-emerald-900 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#4E5F57] line-clamp-2 leading-relaxed">
                      {project.description}
                    </p>
                  </div>

                  {/* Funding Metrics & Progress */}
                  <div className="mt-6 pt-4 border-t border-gray-100">
                    <div className="flex justify-between items-baseline mb-2">
                      <div className="font-serif text-2xl font-bold text-[#143D2B]">
                        ${project.raised.toLocaleString()}
                        <span className="text-xs font-sans text-gray-500 font-normal ml-1">
                          / ${project.target.toLocaleString()}
                        </span>
                      </div>
                      <span className="text-xs font-bold bg-[#E7EFE9] text-emerald-800 px-2.5 py-0.5 rounded-full">
                        {percent}%
                      </span>
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full bg-[#EAE7DC] h-2.5 rounded-full overflow-hidden">
                      <div
                        className="bg-emerald-600 h-full rounded-full transition-all duration-1000"
                        style={{ width: `${percent}%` }}
                      ></div>
                    </div>

                    <div className="flex items-center justify-between text-xs text-gray-500 mt-2 font-medium">
                      <span className="flex items-center gap-1">
                        <Users className="w-3.5 h-3.5 text-gray-400" />
                        {project.backers} backers
                      </span>
                      <span>Target: May 2026</span>
                    </div>

                    {/* Action buttons */}
                    <div className="flex items-center gap-2 mt-5">
                      <button
                        onClick={() => onOpenDonate(project)}
                        className="flex-1 py-3 px-4 bg-emerald-700 hover:bg-emerald-800 text-white text-xs sm:text-sm font-bold rounded-xl flex items-center justify-center gap-2 shadow-xs hover:shadow transition active:scale-[0.99]"
                      >
                        <Heart className="w-4 h-4 fill-current text-emerald-200" />
                        <span>Support Project</span>
                      </button>

                      <button
                        onClick={() => handleShare(project)}
                        className="p-3 rounded-xl border border-[#DCD6C7] hover:bg-gray-50 text-gray-700 transition"
                        title="Share Campaign"
                        aria-label="Share campaign"
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

      </div>
    </section>
  );
}
