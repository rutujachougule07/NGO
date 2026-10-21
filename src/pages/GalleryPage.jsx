import React, { useState } from 'react';
import { X, ZoomIn, Eye, Heart, Sparkles } from 'lucide-react';

export default function GalleryPage({ onOpenDonate }) {
  const [activePhoto, setActivePhoto] = useState(null);

  const photos = [
    {
      id: 1,
      title: "Daily Community Annadan Seva",
      location: "Frontline Community Kitchens",
      category: "Annadan",
      url: "/immense_life_brand.jpg",
      caption: "Serving fresh, wholesome, sanctified hot meals to hundreds of elderly citizens, workers, and children daily with devotion and care."
    },
    {
      id: 2,
      title: "Mobile Health Camp & Free Dispensary",
      location: "Rural Outskirts & Slum Settlements",
      category: "Healthcare",
      url: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=1200&q=80",
      caption: "Dedicated voluntary physicians providing free preventive screenings, basic medicines, and pediatric nutrition guidance."
    },
    {
      id: 3,
      title: "Underprivileged Child STEM & Evening School",
      location: "Community Learning Centers",
      category: "Education",
      url: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1200&q=80",
      caption: "Empowering bright young minds with tablets, notebooks, science kits, and dedicated youth mentors."
    },
    {
      id: 4,
      title: "Women's Self-Help Cooperative",
      location: "Skill Training Hub",
      category: "Empowerment",
      url: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=1200&q=80",
      caption: "Women artisans hand-crafting eco-friendly bags and natural products to achieve financial independence."
    },
    {
      id: 5,
      title: "Clean Drinking Water & Community Wells",
      location: "Semi-Arid Drought Regions",
      category: "Clean Water",
      url: "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=1200&q=80",
      caption: "Deep aquifer solar pumping stations ensuring 24/7 access to pure, tested drinking water for over 450 families."
    },
    {
      id: 6,
      title: "Frontline Emergency Relief & Winter Drive",
      location: "Transit Settlements",
      category: "Relief",
      url: "https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?auto=format&fit=crop&w=1200&q=80",
      caption: "Distributing warm blankets, dry ration packets, and hygiene essentials to vulnerable families during harsh weather."
    }
  ];

  return (
    <div className="bg-[#FDFBF7] py-14 lg:py-20 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header - Centered */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FFF2E3] text-xs font-bold text-[#A34805] border border-[#F5DEC8] shadow-xs">
            <span className="w-2 h-2 rounded-full bg-[#E87A1E]"></span>
            VISUAL SEVA ARCHIVES
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#381602] leading-tight">
            Moments on the Frontline
          </h1>
          <p className="text-base sm:text-lg text-stone-600 max-w-2xl mx-auto leading-relaxed">
            Witness our volunteers, partners, and community members working together to serve, support, and uplift lives every single day.
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {photos.map(photo => (
            <div
              key={photo.id}
              onClick={() => setActivePhoto(photo)}
              className="group relative rounded-3xl overflow-hidden bg-white shadow-sm hover:shadow-xl transition-all duration-300 border border-[#F3DEC8] hover:border-[#E87A1E]/40 cursor-pointer h-80"
            >
              <img
                src={photo.url}
                alt={photo.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent opacity-80 group-hover:opacity-90 transition-opacity"></div>

              <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-[#381602] border border-[#F5DEC8]">
                {photo.category}
              </div>

              <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/40 backdrop-blur-md text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <ZoomIn className="w-4 h-4" />
              </div>

              <div className="absolute bottom-4 left-4 right-4 text-white">
                <span className="text-[11px] font-semibold text-[#FFB86A] uppercase tracking-wider block">
                  {photo.location}
                </span>
                <h3 className="font-serif text-lg font-bold leading-snug">
                  {photo.title}
                </h3>
              </div>
            </div>
          ))}
        </div>

        {/* Lightbox Modal */}
        {activePhoto && (
          <div
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in"
            onClick={() => setActivePhoto(null)}
          >
            <div
              className="bg-[#FFFDF9] rounded-3xl overflow-hidden max-w-3xl w-full shadow-2xl relative border border-[#F3DEC8]"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setActivePhoto(null)}
                className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/70 transition"
              >
                <X className="w-5 h-5" />
              </button>

              <img
                src={activePhoto.url}
                alt={activePhoto.title}
                className="w-full h-[380px] sm:h-[450px] object-cover"
              />

              <div className="p-6 sm:p-7 bg-[#FFFDF9] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <span className="text-xs font-bold text-[#A34805] uppercase tracking-wider">
                    {activePhoto.location} • {activePhoto.category}
                  </span>
                  <h3 className="font-serif text-2xl font-bold text-[#381602] mt-1">
                    {activePhoto.title}
                  </h3>
                  <p className="text-xs text-stone-600 mt-1 max-w-xl leading-relaxed">
                    {activePhoto.caption}
                  </p>
                </div>

                <button
                  onClick={() => {
                    setActivePhoto(null);
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
    </div>
  );
}
