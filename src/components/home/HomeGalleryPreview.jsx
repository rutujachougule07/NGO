import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Image as ImageIcon, ArrowRight, ZoomIn, X, Heart } from 'lucide-react';

export default function HomeGalleryPreview({ onOpenDonate }) {
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  const previewPhotos = [
    {
      id: 1,
      title: "Daily Community Annadan Seva",
      category: "Annadan",
      location: "Frontline Community Kitchens",
      url: "/hero_annadan.jpg",
      caption: "Nutritious, sanctified hot meals served daily to elderly citizens, daily-wage laborers, and children with deep reverence."
    },
    {
      id: 2,
      title: "Underprivileged Child STEM Schooling",
      category: "Education",
      location: "Rural Learning Centers",
      url: "/hero_education.jpg",
      caption: "Equipping young minds with school bags, notebooks, geometry kits, and interactive tablet learning."
    },
    {
      id: 3,
      title: "Free Mobile Medical Dispensary",
      category: "Healthcare",
      location: "Outskirts & Slum Settlements",
      url: "/hero_medical.jpg",
      caption: "Volunteer specialist doctors conducting routine screenings, distributing free medicines, and pediatric monitoring."
    },
    {
      id: 4,
      title: "Clean Drinking Water Borewell Project",
      category: "Water Seva",
      location: "Drought-Prone Rural Belts",
      url: "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=800&q=80",
      caption: "Solar-powered deep water pumps supplying 24/7 pure, clean drinking water to over 450 village families."
    }
  ];

  return (
    <section className="py-16 sm:py-24 bg-[#FFFDF9] border-t border-[#F3DEC8]/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header - Centered */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3.5">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FFF2E3] text-xs font-bold text-[#A34805] border border-[#F5DEC8] shadow-xs">
            <ImageIcon className="w-3.5 h-3.5 text-[#E87A1E]" />
            <span>VISUAL EVIDENCE OF COMPASSION • LIVE ARCHIVES</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#381602] tracking-tight">
            Moments on the Frontline
          </h2>
          <p className="text-sm sm:text-base text-stone-600 max-w-2xl mx-auto leading-relaxed">
            Explore authentic glimpses of our daily Annadan kitchens, mobile clinic camps, and child learning drives.
          </p>
          <div className="pt-2">
            <Link
              to="/gallery"
              className="inline-flex items-center gap-2 px-6 py-2.5 bg-white text-[#381602] hover:bg-[#FFF2E3] border border-[#F3DEC8] rounded-full text-xs sm:text-sm font-bold shadow-xs hover:shadow transition"
            >
              <span>Explore All 50+ Photos in Gallery</span>
              <ArrowRight className="w-4 h-4 text-[#E87A1E]" />
            </Link>
          </div>
        </div>

        {/* 4 Photo Interactive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {previewPhotos.map((photo) => (
            <div
              key={photo.id}
              onClick={() => setSelectedPhoto(photo)}
              className="group relative rounded-3xl overflow-hidden bg-white shadow-sm hover:shadow-2xl transition-all duration-500 border border-[#F3DEC8] hover:border-[#E87A1E]/50 cursor-pointer h-72 sm:h-80"
            >
              <img
                src={photo.url}
                alt={photo.title}
                className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent opacity-80 group-hover:opacity-95 transition-opacity"></div>

              {/* Category Pill Top Left */}
              <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold text-[#381602] border border-[#F5DEC8]">
                {photo.category}
              </div>

              {/* Zoom Icon Top Right */}
              <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/40 backdrop-blur-md text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <ZoomIn className="w-4 h-4" />
              </div>

              {/* Caption Bottom */}
              <div className="absolute bottom-4 left-4 right-4 text-white text-left">
                <span className="text-[10px] font-semibold text-[#FFB86A] uppercase tracking-wider block">
                  {photo.location}
                </span>
                <h3 className="font-serif text-base font-bold leading-snug text-white mt-0.5">
                  {photo.title}
                </h3>
              </div>
            </div>
          ))}
        </div>

        {/* Modal Lightbox */}
        {selectedPhoto && (
          <div
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in"
            onClick={() => setSelectedPhoto(null)}
          >
            <div
              className="bg-[#FFFDF9] rounded-3xl overflow-hidden max-w-3xl w-full shadow-2xl relative border border-[#F3DEC8]"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedPhoto(null)}
                className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/70 transition"
              >
                <X className="w-5 h-5" />
              </button>

              <img
                src={selectedPhoto.url}
                alt={selectedPhoto.title}
                className="w-full h-[360px] sm:h-[440px] object-cover"
              />

              <div className="p-6 bg-[#FFFDF9] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-left">
                <div>
                  <span className="text-xs font-bold text-[#A34805] uppercase tracking-wider">
                    {selectedPhoto.location} • {selectedPhoto.category}
                  </span>
                  <h3 className="font-serif text-2xl font-bold text-[#381602] mt-1">
                    {selectedPhoto.title}
                  </h3>
                  <p className="text-xs text-stone-600 mt-1 max-w-xl leading-relaxed">
                    {selectedPhoto.caption}
                  </p>
                </div>

                <button
                  onClick={() => {
                    setSelectedPhoto(null);
                    onOpenDonate();
                  }}
                  className="px-6 py-3 bg-[#E87A1E] hover:bg-[#D2640C] text-white font-bold text-xs rounded-full transition flex items-center gap-2 shrink-0 shadow-sm"
                >
                  <Heart className="w-4 h-4 fill-current text-white/90" />
                  <span>Support this Seva</span>
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
