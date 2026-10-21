import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Eye, X, ZoomIn, ArrowRight, Sparkles } from 'lucide-react';
import { useAdmin } from '../../context/AdminContext';

export default function HomeGallerySection() {
  const { websiteCMS } = useAdmin();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activePhoto, setActivePhoto] = useState(null);

  const defaultPhotos = [
    {
      id: 1,
      title: "Daily Community Annadan Drive",
      category: "Annadan",
      image: "/hero_seva_banner.jpg",
      caption: "Serving warm, nutritious meals to over 1,200 children and community elders with selfless devotion.",
      span: "md:col-span-2 md:row-span-2",
      height: "h-72 sm:h-96"
    },
    {
      id: 2,
      title: "Interactive Classroom Learning",
      category: "Education",
      image: "/hero_ngo_education.jpg",
      caption: "Empowering frontline village children with science kits, digital tablets, and certified instructors.",
      span: "md:col-span-1 md:row-span-1",
      height: "h-48 sm:h-44"
    },
    {
      id: 3,
      title: "Mobile Health Camp & Diagnostics",
      category: "Healthcare",
      image: "/hero_ngo_healthcare.jpg",
      caption: "Physicians providing free checkups, vital health screenings, and free medicines to seniors.",
      span: "md:col-span-1 md:row-span-1",
      height: "h-48 sm:h-44"
    },
    {
      id: 4,
      title: "Community Seva & Welfare Hub",
      category: "Annadan",
      image: "/about_ngo_team.jpg",
      caption: "Ensuring vulnerable elderly citizens receive warm care, rations, and continuous medical companionship.",
      span: "md:col-span-1 md:row-span-1",
      height: "h-48 sm:h-48"
    },
    {
      id: 5,
      title: "Women Vocational Empowerment Drive",
      category: "Education",
      image: "/ngo_women_skills.jpg",
      caption: "Distributing school bags, stationery, and learning charts to inspire first-generation school learners.",
      span: "md:col-span-1 md:row-span-1",
      height: "h-48 sm:h-48"
    },
    {
      id: 6,
      title: "Youth Volunteer Sapling Plantation",
      category: "Environment",
      image: "/hero_sapling_hands.jpg",
      caption: "Community youth planting 500 indigenous fruit trees and building clean rural rainwater pits.",
      span: "md:col-span-1 md:row-span-1",
      height: "h-48 sm:h-48"
    }
  ];

  const dynamicPhotos = (websiteCMS?.gallery || [])
    .filter(g => g.status === 'Published')
    .map((g, idx) => ({
      id: g.id,
      title: g.title,
      category: g.category,
      image: g.image,
      caption: g.title,
      span: idx === 0 ? "md:col-span-2 md:row-span-2" : "md:col-span-1 md:row-span-1",
      height: idx === 0 ? "h-72 sm:h-96" : "h-48 sm:h-48"
    }));

  const photos = dynamicPhotos.length > 0 ? dynamicPhotos : defaultPhotos;
  const categories = ['All', ...Array.from(new Set(photos.map(p => p.category)))];

  const filteredPhotos = selectedCategory === 'All'
    ? photos
    : photos.filter(p => p.category === selectedCategory);

  return (
    <section id="gallery" className="pt-8 pb-8 sm:pt-10 sm:pb-10 bg-[#FFF9F3] relative border-b border-[#F5DEC8]/70 text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-7 sm:mb-8 space-y-2.5">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FFF0E3] text-xs font-bold text-[#F4A261] border border-[#F5DEC8]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>VISUAL FIELD ARCHIVES</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#493326]">
            Moments of Hope & Humanity
          </h2>
          <p className="text-base sm:text-lg text-[#493326]/75">
            Every photograph tells a story of compassion, kindness, and positive change.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 ${
                selectedCategory === cat
                  ? 'bg-[#F4A261] text-white shadow-md'
                  : 'bg-white text-[#493326] border border-[#F5DEC8] hover:border-[#F4A261] hover:bg-[#FFF0E3]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Asymmetric / Responsive Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 sm:gap-6">
          {filteredPhotos.map((photo) => (
            <div
              key={photo.id}
              onClick={() => setActivePhoto(photo)}
              className={`relative rounded-3xl overflow-hidden bg-white border border-[#F5DEC8] shadow-xs hover:shadow-xl cursor-pointer group transition-all duration-300 ${photo.span}`}
            >
              <img
                src={photo.image}
                alt={photo.title}
                className={`w-full ${photo.height} object-cover group-hover:scale-106 transition-transform duration-700`}
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#493326]/80 via-[#493326]/20 to-transparent opacity-80 group-hover:opacity-95 transition-opacity"></div>

              {/* Hover Overlay with Short Caption and View Icon */}
              <div className="absolute inset-0 p-5 flex flex-col justify-between text-white">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold bg-[#F4A261] text-white px-2.5 py-1 rounded-full uppercase tracking-wider shadow-xs">
                    {photo.category}
                  </span>
                  <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center group-hover:scale-110 group-hover:bg-[#F4A261] transition-all">
                    <ZoomIn className="w-4 h-4 text-white" />
                  </div>
                </div>

                <div className="space-y-1 transform group-hover:translate-y-0 transition-transform">
                  <h3 className="font-serif font-bold text-base sm:text-lg text-white leading-snug">
                    {photo.title}
                  </h3>
                  <p className="text-xs text-white/85 line-clamp-2 leading-relaxed">
                    {photo.caption}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Centered Button */}
        <div className="mt-6 sm:mt-8 text-center">
          <Link
            to="/gallery"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-white hover:bg-[#FFF0E3] text-[#493326] border-2 border-[#F4A261] text-xs sm:text-sm font-bold rounded-full transition-all shadow-xs hover:shadow-md"
          >
            <span>View Full Gallery</span>
            <ArrowRight className="w-4 h-4 text-[#F4A261]" />
          </Link>
        </div>

      </div>

      {/* Lightbox Modal */}
      {activePhoto && (
        <div 
          onClick={() => setActivePhoto(null)}
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200"
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-3xl max-w-3xl w-full overflow-hidden shadow-2xl border border-[#F5DEC8] relative"
          >
            <button
              onClick={() => setActivePhoto(null)}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition"
            >
              <X className="w-5 h-5" />
            </button>

            <img
              src={activePhoto.image}
              alt={activePhoto.title}
              className="w-full max-h-[60vh] object-cover"
            />

            <div className="p-6 bg-[#FFF9F3]">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-[10px] font-bold bg-[#FFF0E3] text-[#F4A261] px-2.5 py-0.5 rounded-full border border-[#F5DEC8]">
                  {activePhoto.category}
                </span>
                <span className="text-xs text-[#493326]/60 font-medium">Immense Life Field Archive</span>
              </div>
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#493326] mb-2">
                {activePhoto.title}
              </h3>
              <p className="text-sm text-[#493326]/80 leading-relaxed">
                {activePhoto.caption}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
