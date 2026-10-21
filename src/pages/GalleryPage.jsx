import React, { useState, useMemo } from 'react';
import { 
  X, 
  ZoomIn, 
  Eye, 
  Heart, 
  Sparkles,
  ChevronRight,
  Camera,
  MapPin
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAdmin } from '../context/AdminContext';

export default function GalleryPage({ onOpenDonate }) {
  const { websiteCMS } = useAdmin();
  const [activePhoto, setActivePhoto] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('All');

  const defaultPhotos = [
    {
      id: 1,
      title: "Daily Community Annadan Seva",
      location: "Frontline Community Kitchens",
      category: "Annadan",
      url: "/hero_seva_banner.jpg",
      caption: "Serving fresh, wholesome, sanctified hot meals to hundreds of elderly citizens, daily workers, and children with love and devotion."
    },
    {
      id: 2,
      title: "Mobile Health Camp & Free Dispensary",
      location: "Rural Outskirts & Village Settlements",
      category: "Healthcare",
      url: "/hero_ngo_healthcare.jpg",
      caption: "Dedicated voluntary physicians providing free preventive screenings, vital diagnosis, and pediatric nutrition guidance."
    },
    {
      id: 3,
      title: "Village Child Education & School Mentorship",
      location: "Community Learning Centers",
      category: "Education",
      url: "/hero_ngo_education.jpg",
      caption: "Empowering bright young minds with school kits, notebooks, digital learning, and dedicated educator mentorship."
    },
    {
      id: 4,
      title: "Women's Self-Help Vocational Group",
      location: "Skill Training Hub",
      category: "Education",
      url: "/ngo_women_skills.jpg",
      caption: "Women artisans hand-crafting tailored garments and natural products to achieve dignified financial self-reliance."
    },
    {
      id: 5,
      title: "Maharashtra Gram Seva & Community Well",
      location: "Ahmednagar & Shirdi Rural Regions",
      category: "Clean Water",
      url: "/about_ngo_team.jpg",
      caption: "Community center volunteers working hand-in-hand with village elders to provide clean water access and social care."
    },
    {
      id: 6,
      title: "Go Green Maharashtra & Tree Plantation",
      location: "Rural Ecological Belts",
      category: "Relief",
      url: "/ngo_community_planting.jpg",
      caption: "Youth and villagers planting hundreds of native trees to preserve soil fertility and ensure clean rural environments."
    }
  ];

  const dynamicPhotos = (websiteCMS?.gallery || [])
    .filter(g => g.status === 'Published')
    .map(g => ({
      id: g.id,
      title: g.title,
      location: "Frontline Community Hub",
      category: g.category || 'Annadan',
      url: g.image || "/hero_seva_banner.jpg",
      caption: g.title
    }));

  const photos = dynamicPhotos.length > 0 ? dynamicPhotos : defaultPhotos;
  const categories = ['All', ...Array.from(new Set(photos.map(p => p.category)))];

  const filteredPhotos = useMemo(() => {
    if (selectedCategory === 'All') return photos;
    return photos.filter(p => p.category === selectedCategory);
  }, [selectedCategory, photos]);

  return (
    <div className="bg-[#FDFBF7] min-h-screen text-left">
      
      {/* Top Banner & Header: Centered Text Content */}
      <section className="bg-gradient-to-b from-[#FFF0E3]/70 via-[#FFF9F3] to-[#FFFDFB] pt-14 pb-16 border-b border-[#F5DEC8] text-center relative overflow-hidden">
        {/* Decorative Ambient Glows */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#F4A261]/10 rounded-full blur-3xl pointer-events-none -mt-20"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl mx-auto text-center space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FFF0E3] text-xs font-bold text-[#F4A261] border border-[#F5DEC8] shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-[#F4A261] animate-pulse"></span>
              <span>EYEWITNESS FIELD ARCHIVES & PHOTO VERIFICATION</span>
            </div>
            
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-[#493326] leading-tight tracking-tight">
              Moments on the <span className="text-[#F4A261]">Frontline</span>
            </h1>
            
            <p className="text-base sm:text-lg text-[#493326]/80 leading-relaxed max-w-2xl mx-auto">
              Explore unfiltered snapshots of our voluntary community kitchens, mobile medical outreach, and child development classes.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-20 space-y-12">
        
        {/* Category Tabs */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-4 border-b border-[#F5DEC8]">
          <div className="flex flex-wrap items-center justify-center gap-2">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-bold transition ${
                  selectedCategory === cat
                    ? 'bg-[#F4A261] text-white shadow-xs'
                    : 'bg-white text-[#493326] border border-[#F5DEC8] hover:bg-[#FFF0E3]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <span className="text-xs font-bold text-[#493326]/60">
            Showing {filteredPhotos.length} archival photos
          </span>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPhotos.map(photo => (
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
