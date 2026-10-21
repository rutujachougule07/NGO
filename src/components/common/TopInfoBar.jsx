import React, { useState, useRef, useEffect } from 'react';
import { Phone, Mail, Globe, Palette, ChevronDown, Check } from 'lucide-react';
import { foundationInfo } from '../../data/mockData';
import { useTheme } from '../../context/ThemeContext';
import { useLanguage } from '../../context/LanguageContext';
import { useAdmin } from '../../context/AdminContext';

export default function TopInfoBar() {
  const { theme, toggleTheme } = useTheme();
  const { currentLang, activeLangObj, languages, changeLanguage } = useLanguage();
  const { websiteCMS, foundationSettings } = useAdmin();
  const [showLangMenu, setShowLangMenu] = useState(false);
  const langMenuRef = useRef(null);

  const phone = websiteCMS?.contact?.helplinePhone || foundationSettings?.helplinePhone || foundationInfo.phone;
  const email = websiteCMS?.contact?.officialEmail || foundationSettings?.officialEmail || foundationInfo.email;
  const announcement = websiteCMS?.home?.badgeText || foundationInfo.announcement;

  useEffect(() => {
    function handleClickOutside(event) {
      if (langMenuRef.current && !langMenuRef.current.contains(event.target)) {
        setShowLangMenu(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="bg-[#FFFDF9] text-[#5C381E] text-xs py-2 px-4 border-b border-[#F7E6D4] transition-colors">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-2">
        {/* Left: Contact info */}
        <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 sm:gap-4 text-[11px] sm:text-xs">
          <a 
            href={`tel:${phone.split('/')[0].trim()}`} 
            className="flex items-center gap-1.5 hover:text-[#D2640C] transition font-medium"
          >
            <Phone className="w-3.5 h-3.5 text-[#E87A1E]" />
            <span>{phone}</span>
          </a>
          <span className="hidden sm:inline text-[#F5DEC8]">|</span>
          <a 
            href={`mailto:${email}`} 
            className="flex items-center gap-1.5 hover:text-[#D2640C] transition font-medium"
          >
            <Mail className="w-3.5 h-3.5 text-[#E87A1E]" />
            <span>{email}</span>
          </a>
        </div>

        {/* Center: Live announcement badge */}
        <div className="hidden lg:flex items-center gap-2 bg-[#FFF2E3] px-3.5 py-1 rounded-full text-[11px] font-semibold text-[#A34805] border border-[#FDE2C4]">
          <span className="w-2 h-2 rounded-full bg-[#E87A1E] animate-pulse"></span>
          <span>{announcement}</span>
        </div>

        {/* Right: Socials, Language, Palette Switcher */}
        <div className="flex items-center justify-center sm:justify-end gap-3 sm:gap-4 text-xs">
          {/* Social icons */}
          <div className="flex items-center gap-2.5 text-[#F4A261]">
            <a href="#social" className="hover:text-[#493326] transition opacity-80 hover:opacity-100" title="Twitter/X">
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
            </a>
            <a href="#social" className="hover:text-[#493326] transition opacity-80 hover:opacity-100" title="LinkedIn">
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
            </a>
            <a href="#social" className="hover:text-[#493326] transition opacity-80 hover:opacity-100" title="YouTube">
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/></svg>
            </a>
          </div>

          <span className="text-[#F5DEC8]">|</span>

          {/* Theme Switcher */}
          <button
            onClick={toggleTheme}
            className="flex items-center gap-1 text-[#493326] hover:bg-[#FFF0E3] transition bg-white px-2 py-0.5 rounded-full border border-[#F5DEC8] text-[11px] shadow-2xs"
            title="Switch Theme"
          >
            <Palette className="w-3 h-3 text-[#F4A261]" />
            <span>Saffron</span>
          </button>

          {/* Language Selector */}
          <div className="relative" ref={langMenuRef}>
            <button
              onClick={() => setShowLangMenu(!showLangMenu)}
              className="flex items-center gap-1.5 text-[#493326] hover:text-[#E87A1E] transition text-[11px] font-medium bg-white px-2.5 py-1 rounded-full border border-[#F5DEC8] shadow-2xs"
              title="Select Language / भाषा निवडा"
              aria-label="Select Language"
            >
              <Globe className="w-3.5 h-3.5 text-[#E87A1E]" />
              <span className="font-semibold">{activeLangObj?.nativeName || 'English'}</span>
              <ChevronDown className="w-3 h-3 text-[#5C381E]/60" />
            </button>

            {showLangMenu && (
              <div className="absolute right-0 mt-1.5 w-36 bg-white text-[#493326] rounded-xl shadow-xl border border-[#F5DEC8] py-1.5 z-50 animate-in fade-in zoom-in-95 duration-150">
                <div className="px-3 py-1 text-[10px] uppercase font-bold text-[#A34805] tracking-wider border-b border-[#F7E6D4]/60 mb-1">
                  Languages / भाषा
                </div>
                {languages.map(l => (
                  <button
                    key={l.code}
                    onClick={() => {
                      changeLanguage(l.code);
                      setShowLangMenu(false);
                    }}
                    className={`w-full text-left px-3 py-1.5 text-xs hover:bg-[#FFF0E3] flex items-center justify-between transition-colors ${
                      currentLang === l.code ? 'bg-[#FFF2E3] font-bold text-[#E87A1E]' : 'text-[#493326]'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <span>{l.flag}</span>
                      <span>{l.nativeName}</span>
                    </span>
                    {currentLang === l.code && <Check className="w-3.5 h-3.5 text-[#E87A1E]" />}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
