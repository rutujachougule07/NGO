import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { 
  Calendar, 
  User, 
  Clock, 
  ArrowRight, 
  X, 
  Heart, 
  Share2, 
  MapPin, 
  Users, 
  Newspaper, 
  Sparkles,
  CheckCircle2,
  CalendarDays
} from 'lucide-react';
import { fieldDispatches, upcomingEvents } from '../data/mockData';
import { useToast } from '../context/ToastContext';

export default function NewsPage({ onOpenDonate }) {
  const { addToast } = useToast();
  const [searchParams, setSearchParams] = useSearchParams();
  const initialTab = searchParams.get('tab') === 'events' ? 'events' : 'news';
  const [activeTab, setActiveTab] = useState(initialTab);
  const [activeStory, setActiveStory] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [rsvpSubmitted, setRsvpSubmitted] = useState(false);
  const [volunteerForm, setVolunteerForm] = useState({ name: '', phone: '', email: '' });

  useEffect(() => {
    const tab = searchParams.get('tab');
    if (tab === 'events' || tab === 'news') {
      setActiveTab(tab);
    }
  }, [searchParams]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setSearchParams({ tab });
  };

  const handleShare = (item) => {
    if (navigator.share) {
      navigator.share({ title: item.title, url: window.location.href }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      addToast(`Link for "${item.title}" copied!`, 'info');
    }
  };

  const handleRsvpSubmit = (e) => {
    e.preventDefault();
    if (!volunteerForm.name || !volunteerForm.phone) {
      addToast('Please enter your name and phone number', 'error');
      return;
    }
    setRsvpSubmitted(true);
    addToast(`Thank you ${volunteerForm.name}! You are registered for ${selectedEvent.title}.`, 'success');
    setTimeout(() => {
      setSelectedEvent(null);
      setRsvpSubmitted(false);
      setVolunteerForm({ name: '', phone: '', email: '' });
    }, 2000);
  };

  return (
    <div className="bg-[#FDFBF7] py-14 lg:py-20 min-h-screen text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header - Centered as requested */}
        <div className="text-center max-w-3xl mx-auto space-y-4 pb-8 border-b border-[#F5DEC8]">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FFF2E3] text-xs font-bold text-[#A34805] border border-[#F5DEC8] shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-[#E87A1E]" />
            <span>COMMUNITY UPDATES & GROUND SEVA</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#381602] leading-tight">
            News & Community Events
          </h1>
          <p className="text-base sm:text-lg text-stone-600 max-w-2xl mx-auto leading-relaxed">
            Read real stories from our daily Annadan kitchens and join our upcoming free medical camps and school distribution drives.
          </p>

          {/* Centered 2 Clean Switcher Tabs: News vs Events */}
          <div className="pt-3 flex justify-center">
            <div className="inline-flex bg-[#FFF2E3] p-1.5 rounded-2xl border border-[#F5DEC8] shadow-xs">
              <button
                onClick={() => handleTabChange('news')}
                className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 ${
                  activeTab === 'news'
                    ? 'bg-white text-[#381602] shadow-sm'
                    : 'text-stone-600 hover:text-[#381602]'
                }`}
              >
                <Newspaper className={`w-4 h-4 ${activeTab === 'news' ? 'text-[#E87A1E]' : ''}`} />
                <span>News & Field Stories ({fieldDispatches.length})</span>
              </button>
              <button
                onClick={() => handleTabChange('events')}
                className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 ${
                  activeTab === 'events'
                    ? 'bg-[#E87A1E] text-white shadow-sm'
                    : 'text-stone-600 hover:text-[#381602]'
                }`}
              >
                <CalendarDays className="w-4 h-4" />
                <span>Upcoming Events ({upcomingEvents.length})</span>
              </button>
            </div>
          </div>
        </div>

        {/* TAB 1: NEWS & FIELD STORIES */}
        {activeTab === 'news' && (
          <div className="space-y-8 animate-fade-in">
            <div className="flex items-center justify-between">
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#381602]">
                Latest Field Dispatches & Press Releases
              </h2>
              <span className="text-xs font-semibold text-stone-500">
                Verified Reports from Ground Teams
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {fieldDispatches.map((story) => (
                <article
                  key={story.id}
                  className="bg-white rounded-3xl overflow-hidden border border-[#F3DEC8] shadow-xs hover:shadow-xl hover:border-[#E87A1E]/40 transition-all duration-300 flex flex-col justify-between group"
                >
                  <div>
                    <div className="relative h-60 overflow-hidden bg-stone-100">
                      <img
                        src={story.image}
                        alt={story.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>

                      <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md px-3 py-1 rounded-full text-[11px] font-bold text-[#381602] shadow-xs border border-[#F5DEC8]">
                        {story.tag}
                      </div>

                      <div className="absolute bottom-3 right-4 bg-black/60 backdrop-blur-md text-white text-[11px] font-medium px-2.5 py-1 rounded-full flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-[#FFB86A]" />
                        {story.readTime}
                      </div>
                    </div>

                    <div className="p-6">
                      <div className="flex flex-wrap items-center gap-2 text-[11px] text-stone-500 mb-2.5 font-medium">
                        <span className="flex items-center gap-1 text-[#381602] font-bold">
                          <User className="w-3 h-3 text-[#E87A1E]" />
                          {story.author}
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {story.date}
                        </span>
                      </div>

                      <h3 className="font-serif text-lg sm:text-xl font-bold text-[#381602] mb-2.5 group-hover:text-[#E87A1E] transition-colors leading-snug line-clamp-2">
                        {story.title}
                      </h3>

                      <p className="text-xs sm:text-sm text-stone-600 leading-relaxed line-clamp-3">
                        {story.excerpt}
                      </p>
                    </div>
                  </div>

                  <div className="p-6 pt-0">
                    <div className="pt-4 border-t border-[#F5DEC8] flex items-center justify-between">
                      <span className="text-[11px] font-bold text-[#A34805] bg-[#FFF2E3] border border-[#F5DEC8] px-2.5 py-0.5 rounded-full">
                        {story.activeBadge}
                      </span>

                      <button
                        onClick={() => setActiveStory(story)}
                        className="inline-flex items-center gap-1 text-xs font-bold text-[#381602] hover:text-[#E87A1E] group transition"
                      >
                        <span>Read Story</span>
                        <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        )}

        {/* TAB 2: EVENTS & SEVA CAMPS */}
        {activeTab === 'events' && (
          <div className="space-y-8 animate-fade-in">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#381602]">
                  Upcoming & Recent Community Seva Drives
                </h2>
                <p className="text-xs sm:text-sm text-stone-600 mt-1">
                  Participate, volunteer, or sponsor direct on-ground medical camps and feeding drives.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {upcomingEvents.map((evt) => (
                <div
                  key={evt.id}
                  className="bg-white rounded-3xl overflow-hidden border border-[#F3DEC8] shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
                >
                  <div>
                    {/* Event Banner */}
                    <div className="relative h-56 overflow-hidden bg-stone-100">
                      <img
                        src={evt.image}
                        alt={evt.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>

                      <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-[#381602] border border-[#F5DEC8]">
                        {evt.category}
                      </div>

                      <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-bold border backdrop-blur-md ${
                        evt.status === 'Upcoming' 
                          ? 'bg-emerald-500/90 text-white border-emerald-400' 
                          : 'bg-black/60 text-stone-200 border-white/20'
                      }`}>
                        {evt.status}
                      </div>

                      <div className="absolute bottom-3 left-4 right-4 text-white text-xs font-semibold flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-[#FFB86A]" />
                        <span>{evt.date} • {evt.time}</span>
                      </div>
                    </div>

                    {/* Event Body */}
                    <div className="p-6 sm:p-7 space-y-3.5">
                      <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#381602] group-hover:text-[#E87A1E] transition leading-snug">
                        {evt.title}
                      </h3>

                      <div className="flex items-start gap-2 text-xs text-stone-600">
                        <MapPin className="w-4 h-4 text-[#E87A1E] shrink-0 mt-0.5" />
                        <span>{evt.location}</span>
                      </div>

                      <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                        {evt.desc}
                      </p>

                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-xl bg-[#FFFDF9] border border-[#F5DEC8] text-xs font-semibold text-[#A34805]">
                        <Users className="w-3.5 h-3.5 text-[#E87A1E]" />
                        <span>{evt.volunteersNeeded}</span>
                      </div>
                    </div>
                  </div>

                  {/* Event Action Buttons */}
                  <div className="p-6 sm:p-7 pt-0 flex flex-wrap items-center gap-3">
                    {evt.status === 'Upcoming' ? (
                      <>
                        <button
                          onClick={() => setSelectedEvent(evt)}
                          className="flex-1 py-3 px-4 bg-[#E87A1E] hover:bg-[#D2640C] text-white text-xs sm:text-sm font-bold rounded-2xl shadow-xs hover:shadow transition flex items-center justify-center gap-2"
                        >
                          <Users className="w-4 h-4" />
                          <span>Register as Volunteer</span>
                        </button>
                        <button
                          onClick={() => onOpenDonate({ project: evt.id })}
                          className="py-3 px-5 bg-white hover:bg-[#FFF2E3] text-[#381602] border border-[#F3DEC8] text-xs sm:text-sm font-bold rounded-2xl transition flex items-center gap-2"
                        >
                          <Heart className="w-4 h-4 text-[#E87A1E] fill-current" />
                          <span>Sponsor Event</span>
                        </button>
                      </>
                    ) : (
                      <div className="w-full text-center py-2.5 bg-stone-50 rounded-2xl text-xs text-stone-500 font-medium border border-stone-200">
                        Seva Drive Completed Successfully • Photos Archived in Gallery
                      </div>
                    )}
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
                <div className="absolute bottom-4 left-4 bg-white/95 px-3 py-1 rounded-full text-xs font-bold text-[#381602] border border-[#F5DEC8]">
                  {activeStory.tag}
                </div>
              </div>

              <div className="p-6 sm:p-8 space-y-4">
                <div className="flex items-center gap-3 text-xs text-stone-500 font-medium">
                  <span className="font-bold text-[#381602]">{activeStory.author} ({activeStory.role})</span>
                  <span>•</span>
                  <span>{activeStory.date}</span>
                  <span>•</span>
                  <span>{activeStory.readTime}</span>
                </div>

                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#381602] leading-tight">
                  {activeStory.title}
                </h2>

                <p className="text-sm text-stone-700 leading-relaxed">
                  {activeStory.excerpt}
                </p>

                <p className="text-sm text-stone-700 leading-relaxed">
                  With tireless community dedication and transparent digital tracking, our frontline volunteer teams ensure that nutritional aid, clean water, and warm support reach every vulnerable family without hesitation or bureaucratic delay.
                </p>

                <div className="pt-6 border-t border-[#F3DEC8] flex items-center justify-between">
                  <button
                    onClick={() => handleShare(activeStory)}
                    className="p-3 rounded-xl border border-[#F3DEC8] hover:bg-[#FFF2E3] text-[#381602] transition"
                  >
                    <Share2 className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => {
                      setActiveStory(null);
                      onOpenDonate();
                    }}
                    className="px-6 py-3 bg-[#E87A1E] hover:bg-[#D2640C] text-white font-bold text-xs rounded-full transition flex items-center gap-2 shadow-xs"
                  >
                    <Heart className="w-4 h-4 fill-current text-white/90" />
                    <span>Support this Initiative</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Volunteer RSVP Modal for Events */}
        {selectedEvent && (
          <div
            className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in"
            onClick={() => setSelectedEvent(null)}
          >
            <div
              className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl border border-[#F3DEC8] relative text-left"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedEvent(null)}
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-stone-100 text-stone-600 flex items-center justify-center hover:bg-stone-200 transition"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFF2E3] text-xs font-bold text-[#A34805] mb-3 border border-[#F5DEC8]">
                <Calendar className="w-3.5 h-3.5 text-[#E87A1E]" />
                <span>SEVA VOLUNTEER REGISTRATION</span>
              </div>

              <h3 className="font-serif text-2xl font-bold text-[#381602]">
                Join: {selectedEvent.title}
              </h3>
              <p className="text-xs text-stone-500 mt-1">
                📍 {selectedEvent.location} • 📅 {selectedEvent.date}
              </p>

              {rsvpSubmitted ? (
                <div className="my-8 text-center py-6 bg-emerald-50 rounded-2xl border border-emerald-200 text-emerald-800 space-y-2">
                  <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                  <h4 className="font-bold text-base">Registration Confirmed!</h4>
                  <p className="text-xs text-emerald-700">Our volunteer coordinator will contact you via WhatsApp / Call.</p>
                </div>
              ) : (
                <form onSubmit={handleRsvpSubmit} className="space-y-4 mt-6">
                  <div>
                    <label className="text-xs font-semibold text-stone-700 block mb-1">Your Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Ramesh Patil"
                      value={volunteerForm.name}
                      onChange={(e) => setVolunteerForm({ ...volunteerForm, name: e.target.value })}
                      className="w-full bg-[#FFFDF9] border border-[#F5DEC8] rounded-xl px-3.5 py-2.5 text-xs text-stone-800 focus:outline-none focus:ring-2 focus:ring-[#E87A1E]"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-stone-700 block mb-1">WhatsApp / Phone Number *</label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      value={volunteerForm.phone}
                      onChange={(e) => setVolunteerForm({ ...volunteerForm, phone: e.target.value })}
                      className="w-full bg-[#FFFDF9] border border-[#F5DEC8] rounded-xl px-3.5 py-2.5 text-xs text-stone-800 focus:outline-none focus:ring-2 focus:ring-[#E87A1E]"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-stone-700 block mb-1">Email (Optional)</label>
                    <input
                      type="email"
                      placeholder="ramesh@gmail.com"
                      value={volunteerForm.email}
                      onChange={(e) => setVolunteerForm({ ...volunteerForm, email: e.target.value })}
                      className="w-full bg-[#FFFDF9] border border-[#F5DEC8] rounded-xl px-3.5 py-2.5 text-xs text-stone-800 focus:outline-none focus:ring-2 focus:ring-[#E87A1E]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 bg-[#E87A1E] hover:bg-[#D2640C] text-white font-bold text-xs sm:text-sm rounded-2xl shadow-sm hover:shadow transition"
                  >
                    Confirm My Volunteer Participation
                  </button>
                </form>
              )}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
