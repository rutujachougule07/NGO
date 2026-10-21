import React, { useState, useMemo } from 'react';
import { 
  Calendar, 
  User, 
  Clock, 
  ArrowRight, 
  X, 
  Heart, 
  Share2, 
  Tag, 
  Sun,
  ChevronRight,
  BookOpen,
  Sparkles,
  Send,
  MapPin,
  Users,
  CheckCircle2
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { fieldDispatches } from '../data/mockData';
import { useToast } from '../context/ToastContext';
import { useAdmin } from '../context/AdminContext';

export default function NewsPage({ onOpenDonate }) {
  const { addToast } = useToast();
  const { websiteCMS } = useAdmin();
  const [activeStory, setActiveStory] = useState(null);
  const [mainTab, setMainTab] = useState('news'); // 'news' | 'events'
  const [selectedTag, setSelectedTag] = useState('All');
  const [newsletterEmail, setNewsletterEmail] = useState('');

  const tags = ['All', 'Annadan', 'Healthcare', 'Education', 'Community'];

  const defaultEvents = [
    {
      id: 'EVT-101',
      title: "Mega Community Annadan Seva Drive",
      date: "Sunday, 26 October 2026",
      time: "10:30 AM – 3:30 PM",
      location: "Central Community Kitchen, Sector 7 Hub",
      category: "Annadan",
      volunteersNeeded: 25,
      description: "Serving over 2,500 hot nutritious sanctified meals to daily laborers, elderly residents, and children with live music and community blessings.",
      badge: "Open for Volunteers",
      status: "Published"
    },
    {
      id: 'EVT-102',
      title: "Free Rural Health Camp & Pediatric Screening",
      date: "Saturday, 08 November 2026",
      time: "9:00 AM – 4:00 PM",
      location: "Primary Health Center, Kaveri Outskirts Hub",
      category: "Healthcare",
      volunteersNeeded: 12,
      description: "Free medical checkups by voluntary pediatricians and general physicians, accompanied by distribution of vitamins and basic medicines.",
      badge: "Voluntary Doctors Joining",
      status: "Published"
    },
    {
      id: 'EVT-103',
      title: "Child Education STEM Lab & Tablet Distribution",
      date: "Sunday, 22 November 2026",
      time: "11:00 AM – 2:00 PM",
      location: "Remedial Learning Center, Kaveri Basin",
      category: "Education",
      volunteersNeeded: 15,
      description: "Distributing 150 digital learning tablets and science experiment kits to rural school children with mentorship sessions.",
      badge: "Mentors Welcome",
      status: "Published"
    }
  ];

  const rawEvents = (websiteCMS?.events && websiteCMS.events.length > 0) ? websiteCMS.events : defaultEvents;
  const upcomingEvents = rawEvents.filter(e => e.status !== 'Draft');

  const dynamicArticles = (websiteCMS?.news || [])
    .filter(n => n.status === 'Published')
    .map((n, idx) => ({
      id: n.id,
      title: n.title,
      summary: n.summary,
      author: n.author || 'Trustee Desk',
      date: n.date,
      readTime: n.readTime || '3 min read',
      tag: n.category || 'Dispatches',
      image: idx === 0 ? "/hero_seva_banner.jpg" : idx === 1 ? "/hero_ngo_healthcare.jpg" : "/hero_ngo_education.jpg",
      body: n.summary,
      stats: '100% Verified Frontline Seva'
    }));

  const displayStories = dynamicArticles.length > 0 ? dynamicArticles : fieldDispatches;

  const filteredStories = useMemo(() => {
    if (selectedTag === 'All') return displayStories;
    return displayStories.filter(s => (s.tag || '').toLowerCase().includes(selectedTag.toLowerCase()) || (selectedTag === 'Annadan' && s.title.toLowerCase().includes('meal')));
  }, [selectedTag, displayStories]);

  const handleShare = (item) => {
    if (navigator.share) {
      navigator.share({ title: item.title, url: window.location.href }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      addToast(`Link for "${item.title}" copied!`, 'info');
    }
  };

  const handleRegisterVolunteer = (evt) => {
    addToast(`You are registered as a volunteer for "${evt.title}"! Details sent to your email.`, 'success');
  };

  return (
    <div className="bg-[#FDFBF7] min-h-screen text-left">
      
      {/* Top Banner & Header: Centered Text Content */}
      <section className="bg-gradient-to-b from-[#FFF0E3]/70 via-[#FFF9F3] to-[#FFFDFB] pt-10 pb-6 sm:pt-12 sm:pb-8 border-b border-[#F5DEC8] text-center relative overflow-hidden">
        {/* Decorative Ambient Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#F4A261]/10 rounded-full blur-3xl pointer-events-none -mt-20"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl mx-auto text-center space-y-3.5">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FFF0E3] text-xs font-bold text-[#F4A261] border border-[#F5DEC8] shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-[#F4A261] animate-pulse"></span>
              <span>COMMUNITY UPDATES • FIELD STORIES & EVENTS</span>
            </div>
            
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#493326] leading-tight tracking-tight">
              News & Upcoming <span className="text-[#F4A261]">Events</span>
            </h1>
            
            <p className="text-sm sm:text-base text-[#493326]/80 leading-relaxed max-w-2xl mx-auto">
              Stay updated on our daily Annadan distributions, mobile health drives, child education milestones, and upcoming field volunteering events.
            </p>

            {/* Main Tabs (News vs Events) Centered */}
            <div className="pt-1 flex justify-center">
              <div className="inline-flex items-center gap-2 bg-white p-1.5 rounded-2xl border border-[#F5DEC8] shadow-xs">
                <button
                  onClick={() => setMainTab('news')}
                  className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition ${
                    mainTab === 'news'
                      ? 'bg-[#F4A261] text-white shadow-xs'
                      : 'text-[#493326] hover:bg-[#FFF0E3]'
                  }`}
                >
                  📰 Field News ({fieldDispatches.length})
                </button>
                <button
                  onClick={() => setMainTab('events')}
                  className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition ${
                    mainTab === 'events'
                      ? 'bg-[#F4A261] text-white shadow-xs'
                      : 'text-[#493326] hover:bg-[#FFF0E3]'
                  }`}
                >
                  🗓️ Seva Events ({upcomingEvents.length})
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-16 sm:pt-8 sm:pb-20 space-y-10">
        
        {mainTab === 'news' ? (
          /* News View */
          <>
            {/* Category Filters Bar */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-4 border-b border-[#F5DEC8]">
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                {tags.map(tag => (
                  <button
                    key={tag}
                    onClick={() => setSelectedTag(tag)}
                    className={`px-4 py-2 rounded-full text-xs font-bold transition ${
                      selectedTag === tag
                        ? 'bg-[#F4A261] text-white shadow-xs'
                        : 'bg-white text-[#493326] border border-[#F5DEC8] hover:bg-[#FFF0E3]'
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>

              <span className="text-xs font-bold text-[#493326]/70">
                Showing {filteredStories.length} dispatches
              </span>
            </div>

            {/* Stories Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {filteredStories.map((story) => (
                <article
                  key={story.id}
                  className="bg-white rounded-3xl overflow-hidden border border-[#F5DEC8] shadow-sm hover:shadow-xl hover:border-[#F4A261]/50 transition-all duration-300 flex flex-col justify-between group"
                >
                  <div className="relative h-64 overflow-hidden bg-stone-100">
                    <img
                      src={story.image}
                      alt={story.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent"></div>

                    <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-[#493326] shadow-sm flex items-center gap-1.5 border border-[#F5DEC8]">
                      <span className="w-2 h-2 rounded-full bg-[#F4A261]"></span>
                      {story.tag}
                    </div>

                    <div className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-md text-white text-xs font-medium px-2.5 py-1 rounded-full flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-[#F4A261]" />
                      {story.readTime}
                    </div>
                  </div>

                  <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex flex-wrap items-center gap-3 text-xs text-[#493326]/70 mb-3 font-medium">
                        <span className="flex items-center gap-1 text-[#493326] font-bold">
                          <User className="w-3.5 h-3.5 text-[#F4A261]" />
                          {story.author}, {story.role}
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5" />
                          {story.date}
                        </span>
                      </div>

                      <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#493326] mb-3 group-hover:text-[#F4A261] transition-colors leading-snug">
                        {story.title}
                      </h3>

                      <p className="text-xs sm:text-sm text-[#493326]/80 leading-relaxed line-clamp-3">
                        {story.excerpt}
                      </p>
                    </div>

                    <div className="pt-6 mt-6 border-t border-[#F5DEC8] flex items-center justify-between">
                      <span className="text-xs font-bold text-[#F4A261] bg-[#FFF0E3] border border-[#F5DEC8] px-3 py-1 rounded-full">
                        {story.activeTrees}
                      </span>

                      <button
                        onClick={() => setActiveStory(story)}
                        className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#493326] hover:text-[#F4A261] group transition"
                      >
                        <span>Read Full Story</span>
                        <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </>
        ) : (
          /* Events View */
          <div className="space-y-6">
            <div className="max-w-2xl mb-8">
              <span className="text-xs font-bold uppercase tracking-widest text-[#F4A261]">
                Community Service Schedule
              </span>
              <h2 className="font-serif text-3xl font-bold text-[#493326] mt-1">
                Upcoming Seva Camps & Distribution Events
              </h2>
              <p className="text-xs sm:text-sm text-[#493326]/80 mt-1">
                Participate directly on the ground. Everyone is welcome to volunteer and join our community service efforts.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {upcomingEvents.map(evt => (
                <div
                  key={evt.id}
                  className="bg-white rounded-3xl p-6 sm:p-8 border border-[#F5DEC8] shadow-sm hover:shadow-md transition space-y-4 flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold text-[#F4A261] bg-[#FFF0E3] px-2.5 py-1 rounded-full border border-[#F5DEC8]">
                        {evt.category}
                      </span>
                      <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-100">
                        {evt.badge}
                      </span>
                    </div>

                    <h3 className="font-serif text-xl font-bold text-[#493326] leading-snug">
                      {evt.title}
                    </h3>

                    <div className="text-xs text-[#493326]/80 space-y-1.5 pt-1">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-[#F4A261] shrink-0" />
                        <span className="font-semibold text-[#493326]">{evt.date}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-[#F4A261] shrink-0" />
                        <span>{evt.time}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-[#F4A261] shrink-0" />
                        <span className="line-clamp-1">{evt.location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-[#F4A261] shrink-0" />
                        <span>{evt.volunteersNeeded} Volunteers Needed</span>
                      </div>
                    </div>

                    <p className="text-xs text-[#493326]/80 leading-relaxed pt-2 border-t border-[#F5DEC8]">
                      {evt.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-[#F5DEC8] flex items-center gap-2">
                    <button
                      onClick={() => handleRegisterVolunteer(evt)}
                      className="flex-1 py-2.5 bg-[#F4A261] hover:bg-[#E78B45] text-white text-xs font-bold rounded-xl transition shadow-xs text-center"
                    >
                      Volunteer for Event
                    </button>
                    <button
                      onClick={() => handleShare(evt)}
                      className="p-2.5 rounded-xl border border-[#F5DEC8] hover:bg-[#FFF0E3] text-[#493326] transition"
                      title="Share Event"
                    >
                      <Share2 className="w-4 h-4 text-[#493326]" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Read Story Modal */}
        {activeStory && (
          <div
            className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in"
            onClick={() => setActiveStory(null)}
          >
            <div
              className="bg-[#FFFDF9] rounded-3xl overflow-hidden max-w-2xl w-full max-h-[88vh] overflow-y-auto shadow-2xl border border-[#F3DEC8] relative"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative h-64 sm:h-72">
                <img
                  src={activeStory.image}
                  alt={activeStory.title}
                  className="w-full h-full object-cover"
                />
                <button
                  onClick={() => setActiveStory(null)}
                  className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black/80 transition"
                >
                  <X className="w-5 h-5" />
                </button>
                <div className="absolute bottom-4 left-4 bg-white/95 px-3 py-1 rounded-full text-xs font-bold text-[#493326] border border-[#F5DEC8]">
                  {activeStory.tag}
                </div>
              </div>

              <div className="p-6 sm:p-8 space-y-4 text-left">
                <div className="flex items-center gap-3 text-xs text-[#493326]/70 font-medium">
                  <span className="font-bold text-[#493326]">{activeStory.author} ({activeStory.role})</span>
                  <span>•</span>
                  <span>{activeStory.date}</span>
                  <span>•</span>
                  <span>{activeStory.readTime}</span>
                </div>

                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#493326] leading-tight">
                  {activeStory.title}
                </h2>

                <p className="text-sm text-[#493326]/80 leading-relaxed">
                  {activeStory.excerpt}
                </p>

                <p className="text-sm text-[#493326]/80 leading-relaxed">
                  With tireless community dedication and transparent digital tracking, our frontline volunteer teams ensure that nutritional aid, clean water, and warm support reach every vulnerable family without hesitation or bureaucratic delay.
                </p>

                <div className="pt-6 border-t border-[#F5DEC8] flex items-center justify-between">
                  <button
                    onClick={() => handleShare(activeStory)}
                    className="p-3 rounded-xl border border-[#F5DEC8] hover:bg-[#FFF0E3] text-[#493326] transition"
                  >
                    <Share2 className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => {
                      setActiveStory(null);
                      onOpenDonate();
                    }}
                    className="px-6 py-3 bg-[#F4A261] hover:bg-[#E78B45] text-white font-bold text-xs rounded-full transition flex items-center gap-2 shadow-xs"
                  >
                    <Heart className="w-4 h-4 fill-current text-white/90" />
                    <span>Support this Initiative</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
