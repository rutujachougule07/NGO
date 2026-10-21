import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Heart, Shield, Sparkles } from 'lucide-react';
import { foundationInfo } from '../../data/mockData';

export default function Navbar({ onOpenDonate }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'Programs', path: '/programs' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'News & Events', path: '/news' },
    { name: 'Partner Stores', path: '/pay' },
    { name: 'Contact', path: '/contact' },
  ];


  const isActive = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <>
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-md shadow-xs py-3.5 border-b border-[#F3DEC8]'
            : 'bg-[#FDFBF7]/95 backdrop-blur-sm py-4 border-b border-[#F7E6D4]'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Immense Life Foundation Logo matching the uploaded emblem */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full overflow-hidden border border-[#F5DEC8] shadow-xs shrink-0 bg-[#FFF2E3] flex items-center justify-center group-hover:scale-105 transition-transform">
              <img 
                src="/immense_life_brand.jpg" 
                alt="Immense Life Emblem" 
                className="w-full h-full object-cover object-bottom scale-110" 
              />
            </div>
            <div className="flex flex-col">
              <span className="font-serif font-bold text-xl sm:text-2xl text-[#381602] leading-none tracking-tight">
                Immense Life
              </span>
              <span className="text-[9px] sm:text-[10px] tracking-[0.22em] uppercase font-bold text-[#D2640C] mt-0.5">
                Foundation
              </span>
            </div>
          </Link>

          {/* Desktop/Tablet Nav Links */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-1.5">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`px-3 py-1.5 rounded-full text-xs lg:text-sm font-semibold transition-all duration-200 whitespace-nowrap ${
                  isActive(link.path)
                    ? 'text-[#381602] bg-[#FFF2E3] font-bold border border-[#F5DEC8]'
                    : 'text-[#5C381E] hover:text-[#D2640C] hover:bg-[#FFF2E3]/60'
                }`}
              >
                <span>{link.name}</span>
              </Link>
            ))}
          </nav>

          {/* Right Actions: Donate Button */}
          <div className="hidden sm:flex items-center gap-2 lg:gap-3 shrink-0">

            {/* Donate Pill Button in Radiant Saffron */}
            <button
              onClick={onOpenDonate}
              className="inline-flex items-center gap-1.5 px-5 py-2 text-xs xl:text-sm font-bold text-white bg-[#E87A1E] hover:bg-[#D2640C] rounded-full shadow-sm hover:shadow-md transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0"
            >
              <Heart className="w-3.5 h-3.5 fill-current text-white/90" />
              <span>Donate</span>
            </button>
          </div>

          {/* Mobile Hamburger toggle */}
          <div className="flex sm:hidden items-center gap-2">
            <button
              onClick={onOpenDonate}
              className="px-3.5 py-1.5 text-xs font-bold text-white bg-[#E87A1E] rounded-full shadow-xs flex items-center gap-1"
            >
              <Heart className="w-3 h-3 fill-current" />
              <span>Donate</span>
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-[#5C381E] hover:bg-[#FFF2E3] transition"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>


        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-[#E3ECE6] bg-white/98 backdrop-blur-md px-5 pt-3 pb-6 animate-slide-down">
            <div className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-4 py-2.5 rounded-xl text-sm font-medium transition ${
                    isActive(link.path)
                      ? 'text-emerald-900 bg-emerald-50 font-bold'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>

            <div className="mt-4 pt-4 border-t border-gray-100 flex flex-col gap-2.5">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenDonate();
                }}
                className="w-full py-3 text-center text-sm font-bold text-white bg-emerald-700 hover:bg-emerald-800 rounded-xl flex items-center justify-center gap-2 shadow-sm"
              >
                <Heart className="w-4 h-4 fill-current text-emerald-200" />
                Support Immense Life Foundation
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Floating Bottom Nav for Mobile */}
      <div className="sm:hidden fixed bottom-0 left-0 right-0 z-30 bg-white/95 text-gray-600 border-t border-gray-200/80 py-2 px-6 flex items-center justify-around shadow-xl backdrop-blur-md">
        <Link to="/" className="flex flex-col items-center gap-1 text-[10px] text-gray-600 hover:text-emerald-700">
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg>
          <span>Mission</span>
        </Link>
        <Link to="/projects" className="flex flex-col items-center gap-1 text-[10px] text-gray-600 hover:text-emerald-700">
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="m4.93 4.93 4.24 4.24"/><path d="m14.83 9.17 4.24-4.24"/><path d="m14.83 14.83 4.24 4.24"/><path d="m9.17 14.83-4.24 4.24"/></svg>
          <span>Campaigns</span>
        </Link>
        <button onClick={onOpenDonate} className="flex flex-col items-center gap-1 text-[10px] text-emerald-700 font-bold">
          <div className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center -mt-4 shadow-md ring-4 ring-emerald-50">
            <Heart className="w-4 h-4 fill-current" />
          </div>
          <span>Impact</span>
        </button>
        <Link to="/contact" className="flex flex-col items-center gap-1 text-[10px] text-gray-600 hover:text-emerald-700">
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
          <span>Volunteer</span>
        </Link>
      </div>
    </>
  );
}
