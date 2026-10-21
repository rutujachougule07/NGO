import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, User, Clock, ArrowRight, Download, Share2, FileText, CheckCircle2 } from 'lucide-react';
import { fieldDispatches, auditReports } from '../../data/mockData';
import { useToast } from '../../context/ToastContext';

export default function FieldDispatches() {
  const { addToast } = useToast();

  const handleDownloadReport = (rep) => {
    addToast(`Downloading "${rep.title}" (${rep.fileSize})...`, 'success');
  };

  const handleShareReport = (rep) => {
    if (navigator.share) {
      navigator.share({ title: rep.title, url: window.location.href }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      addToast('Annual report link copied to clipboard!', 'info');
    }
  };

  return (
    <section className="py-20 lg:py-24 bg-[#F8FAF9] border-t border-[#E3ECE6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-emerald-200 text-xs font-bold text-emerald-900 mb-2.5 shadow-xs">
              <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
              VERIFIED FIRST-PERSON STORIES
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#143D2B]">
              Field Dispatches
            </h2>
            <p className="text-sm text-gray-600 mt-2 max-w-xl">
              Verified first-person reports from restoration hubs, community collectives, and frontline monitoring teams.
            </p>
          </div>

          <Link
            to="/news"
            className="inline-flex items-center gap-2 text-sm font-bold text-emerald-800 hover:text-emerald-950 group shrink-0"
          >
            <span>View All Stories</span>
            <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* 2 Big Dispatch Cards Grid (as seen in Reference Image 1) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {fieldDispatches.map((story) => (
            <article
              key={story.id}
              className="bg-white rounded-3xl overflow-hidden border border-[#E6E1D4] shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
            >
              {/* Photo with tags */}
              <div className="relative h-64 overflow-hidden bg-gray-100">
                <img
                  src={story.image}
                  alt={story.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>

                {/* Tag pill */}
                <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-[#143D2B] shadow-sm flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
                  {story.tag}
                </div>

                <div className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-md text-white text-xs font-medium px-2.5 py-1 rounded-full flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-emerald-300" />
                  {story.readTime}
                </div>
              </div>

              {/* Story Content */}
              <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500 mb-3 font-medium">
                    <span className="flex items-center gap-1 text-[#143D2B] font-bold">
                      <User className="w-3.5 h-3.5 text-emerald-700" />
                      {story.author}, {story.role}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {story.date}
                    </span>
                  </div>

                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#143D2B] mb-3 group-hover:text-emerald-800 transition-colors leading-snug">
                    {story.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#4E5F57] leading-relaxed line-clamp-3">
                    {story.excerpt}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-gray-100 flex items-center justify-between">
                  <span className="text-xs font-bold text-emerald-800 bg-[#E7EFE9] px-3 py-1 rounded-full">
                    {story.activeTrees}
                  </span>

                  <Link
                    to={`/news#${story.id}`}
                    className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#143D2B] hover:text-emerald-700 group transition"
                  >
                    <span>Read Full Story</span>
                    <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Official Annual Report Banner */}
        {auditReports[0] && (
          <div className="bg-gradient-to-r from-[#EDF7F1] via-[#F5FAF7] to-[#E6F3EB] text-[#143D2B] rounded-3xl p-6 sm:p-8 border border-[#CCE4D5] shadow-md relative overflow-hidden">
            <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-200/20 rounded-full blur-2xl pointer-events-none"></div>

            <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
              <div className="space-y-3 max-w-2xl">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white text-emerald-800 text-xs font-bold border border-emerald-200 shadow-xs">
                  <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                  OFFICIAL AUDIT RELEASE
                </div>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#143D2B]">
                  {auditReports[0].title}
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                  {auditReports[0].subtitle}
                </p>
                <div className="flex items-center gap-2 text-xs text-emerald-800 font-semibold">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>{auditReports[0].auditOpinion} • {auditReports[0].fileSize}</span>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3 shrink-0 w-full sm:w-auto">
                <button
                  onClick={() => handleDownloadReport(auditReports[0])}
                  className="flex-1 sm:flex-none px-6 py-3.5 bg-emerald-700 text-white font-bold rounded-2xl flex items-center justify-center gap-2 hover:bg-emerald-800 transition shadow-sm active:scale-95"
                >
                  <Download className="w-4 h-4 text-white" />
                  <span>Download Report (PDF)</span>
                </button>
                <button
                  onClick={() => handleShareReport(auditReports[0])}
                  className="p-3.5 rounded-2xl bg-white hover:bg-emerald-50 text-emerald-900 transition border border-emerald-200 shadow-xs"
                  title="Share Report"
                >
                  <Share2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
