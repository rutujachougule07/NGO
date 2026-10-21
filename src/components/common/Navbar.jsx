import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Heart, Sparkles, Globe, Check } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export default function Navbar({ onOpenDonate }) {
  const { currentLang, languages, changeLanguage } = useLanguage();
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
    { name: 'About Us', path: '/about', hash: '#about' },
    { name: 'Programs', path: '/programs', hash: '#programs' },
    { name: 'Gallery', path: '/gallery', hash: '#gallery' },
    { name: 'News & Events', path: '/news', hash: '#news' },
    { name: 'Contact', path: '/contact' },
  ];

  const handleNavClick = (link) => {
    setMobileMenuOpen(false);
    if (location.pathname === '/' && link.hash) {
      const el = document.querySelector(link.hash);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const isActive = (path) => {
    if (path === '/' && location.pathname !== '/') return false;
    return location.pathname === path || (path !== '/' && location.pathname.startsWith(path));
  };

  return (
    <>
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-md shadow-xs py-3 border-b border-[#F5DEC8]'
            : 'bg-white/95 backdrop-blur-sm py-3.5 border-b border-[#F5DEC8]/70 shadow-2xs'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          
          {/* Logo with subtle Sai Baba inspired visual identity */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full overflow-hidden border-2 border-[#F4A261] shadow-xs shrink-0 bg-white flex items-center justify-center p-0.5 group-hover:scale-105 transition-transform">
              <img 
                src="/immense_life_logo.jpg" 
                alt="Immense Life Foundation Logo" 
                className="w-full h-full object-contain rounded-full" 
              />
            </div>
            <div className="flex flex-col text-left">
              <span className="font-serif font-bold text-xl sm:text-2xl text-[#493326] leading-none tracking-tight">
                Immense Life
              </span>
              <span className="text-[9px] sm:text-[10px] tracking-[0.22em] uppercase font-bold text-[#F4A261] mt-0.5">
                Foundation
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => handleNavClick(link)}
                className={`px-3.5 py-1.5 rounded-full text-xs xl:text-sm font-semibold transition-all duration-200 ${
                  isActive(link.path)
                    ? 'text-[#493326] bg-[#FFF0E3] font-bold border border-[#F5DEC8]'
                    : 'text-[#493326]/85 hover:text-[#F4A261] hover:bg-[#FFF0E3]/70'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Right Actions: Partner Pay Link + Highlighted Donate Button */}
          <div className="hidden sm:flex items-center gap-3">
            <Link
              to="/pay"
              className="text-xs font-semibold text-[#493326]/80 hover:text-[#F4A261] px-3 py-1.5 rounded-full hover:bg-[#FFF0E3] transition"
            >
              Shop QR Pay
            </Link>

            <button
              onClick={() => onOpenDonate()}
              className="px-5 py-2.5 bg-[#F4A261] hover:bg-[#E87A1E] text-white text-xs sm:text-sm font-bold rounded-full transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5 flex items-center gap-1.5"
            >
              <Heart className="w-4 h-4 fill-current text-white/95" />
              <span>Donate Now</span>
            </button>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={() => onOpenDonate()}
              className="px-3.5 py-1.5 bg-[#F4A261] text-white text-xs font-bold rounded-full shadow-xs flex items-center gap-1 sm:hidden"
            >
              <Heart className="w-3.5 h-3.5 fill-current" />
              <span>Donate</span>
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-[#493326] hover:bg-[#FFF0E3] transition"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-b border-[#F5DEC8] px-4 pt-3 pb-6 space-y-2 text-left shadow-lg animate-in slide-in-from-top duration-200">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => handleNavClick(link)}
                className={`block px-4 py-2.5 rounded-xl text-sm font-semibold transition ${
                  isActive(link.path)
                    ? 'bg-[#FFF0E3] text-[#493326] font-bold border border-[#F5DEC8]'
                    : 'text-[#493326] hover:bg-[#FFF0E3]/60 hover:text-[#F4A261]'
                }`}
              >
                {link.name}
              </Link>
            ))}

            <Link
              to="/pay"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-4 py-2.5 rounded-xl text-sm font-semibold text-[#493326] hover:bg-[#FFF0E3]"
            >
              Shop QR Pay
            </Link>

            {/* Mobile Language Switcher */}
            <div className="pt-2 pb-1 border-t border-[#F5DEC8]/80 mt-2">
              <div className="flex items-center gap-2 px-1 mb-2 text-xs font-bold text-[#A34805]">
                <Globe className="w-3.5 h-3.5 text-[#E87A1E]" />
                <span>भाषा निवडा / Choose Language</span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {languages.map((l) => (
                  <button
                    key={l.code}
                    onClick={() => {
                      changeLanguage(l.code);
                      setMobileMenuOpen(false);
                    }}
                    className={`py-2 px-2.5 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 border transition ${
                      currentLang === l.code
                        ? 'bg-[#E87A1E] text-white border-[#E87A1E] shadow-xs'
                        : 'bg-[#FFFDF9] text-[#493326] border-[#F5DEC8] hover:bg-[#FFF2E3]'
                    }`}
                  >
                    <span>{l.flag}</span>
                    <span>{l.nativeName}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenDonate();
                }}
                className="w-full py-3 bg-[#F4A261] hover:bg-[#E87A1E] text-white text-sm font-bold rounded-xl transition shadow-md flex items-center justify-center gap-2"
              >
                <Heart className="w-4 h-4 fill-current" />
                <span>Donate Now</span>
              </button>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
