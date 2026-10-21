import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, ArrowRight } from 'lucide-react';
import { useAdmin } from '../../context/AdminContext';

export default function HomeNewsSection() {
  const { websiteCMS } = useAdmin();

  const defaultArticles = [
    {
      id: 1,
      title: "Community Health Awareness Camp",
      category: "Healthcare Drive",
      date: "March 15, 2026",
      image: "/hero_ngo_healthcare.jpg",
      description: "Over 850 rural villagers and senior citizens received free preventive diagnosis, cardiac screenings, and 30-day medicine kits."
    },
    {
      id: 2,
      title: "Educational Support for Children",
      category: "Child Education",
      date: "March 28, 2026",
      image: "/hero_ngo_education.jpg",
      description: "Distributed 1,200 school kits, school uniforms, and interactive tablets to frontline government school students."
    },
    {
      id: 3,
      title: "Food Distribution and Community Care Drive",
      category: "Annadan Seva",
      date: "April 02, 2026",
      image: "/hero_seva_banner.jpg",
      description: "Community Annadan reached 5,000+ daily wage earners and families with freshly prepared nutritious khichdi and buttermilk."
    }
  ];

  const dynamicArticles = (websiteCMS?.news || [])
    .filter(n => n.status === 'Published')
    .slice(0, 3)
    .map((n, idx) => ({
      id: n.id,
      title: n.title,
      category: n.category,
      date: n.date,
      image: idx === 0 ? "/hero_ngo_healthcare.jpg" : idx === 1 ? "/hero_ngo_education.jpg" : "/hero_seva_banner.jpg",
      description: n.summary
    }));

  const articles = dynamicArticles.length > 0 ? dynamicArticles : defaultArticles;

  return (
    <section id="news" className="pt-8 pb-16 sm:pt-10 sm:pb-20 bg-white relative text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10 space-y-2.5">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FFF0E3] text-xs font-bold text-[#F4A261] border border-[#F5DEC8]">
            <span className="w-2 h-2 rounded-full bg-[#F4A261]"></span>
            <span>COMMUNITY DISPATCHES</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#493326]">
            Latest News & Events
          </h2>
          <p className="text-base sm:text-lg text-[#493326]/75">
            Stay connected with our activities, initiatives, and community impact.
          </p>
        </div>

        {/* 3 Featured Cards in 1 Row on Desktop */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-14">
          {articles.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-3xl overflow-hidden border border-[#F5DEC8] shadow-xs hover:shadow-xl hover:border-[#F4A261]/60 transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                {/* Photo & Badges */}
                <div className="relative h-52 overflow-hidden bg-[#FFF9F3]">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-106 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>

                  {/* Date Badge */}
                  <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-[#493326] shadow-xs flex items-center gap-1.5 border border-[#F5DEC8]">
                    <Calendar className="w-3.5 h-3.5 text-[#F4A261]" />
                    <span>{item.date}</span>
                  </div>

                  {/* Category Label */}
                  <div className="absolute bottom-3 right-3 bg-[#F4A261] text-white px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider shadow-xs">
                    {item.category}
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-6">
                  <h3 className="font-serif font-bold text-lg text-[#493326] group-hover:text-[#F4A261] transition-colors mb-2.5 leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#493326]/75 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>

              {/* Read More Link */}
              <div className="px-6 pb-6 pt-2 border-t border-[#FFF0E3]">
                <Link
                  to="/news"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#F4A261] group-hover:text-[#E87A1E] transition-colors"
                >
                  <span>Read More</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          ))}
        </div>



        {/* Centered Button */}
        <div className="text-center">
          <Link
            to="/news"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-white hover:bg-[#FFF0E3] text-[#493326] border-2 border-[#F4A261] text-xs sm:text-sm font-bold rounded-full transition-all shadow-xs hover:shadow-md"
          >
            <span>View All News & Events</span>
            <ArrowRight className="w-4 h-4 text-[#F4A261]" />
          </Link>
        </div>

      </div>
    </section>
  );
}
