import React, { useState } from 'react';
import { Phone, Mail, Globe, Palette, ChevronDown, Check } from 'lucide-react';
import { foundationInfo } from '../../data/mockData';
import { useTheme } from '../../context/ThemeContext';
import { useNGO } from '../../context/NGOContext';

export default function TopInfoBar() {
  const { theme, toggleTheme } = useTheme();
  const { cmsContent } = useNGO();
  const [lang, setLang] = useState('English');
  const [showLangMenu, setShowLangMenu] = useState(false);

  const phone = cmsContent?.contactPhone || foundationInfo.phone;
  const email = cmsContent?.contactEmail || foundationInfo.email;
  const announcement = cmsContent?.announcement || foundationInfo.announcement;

  const languages = ['English', 'Español', 'Français', 'हिन्दी', 'Deutsch'];

  return (
    <div className="bg-[#FFFDF9] text-[#5C381E] text-xs py-2 px-4 border-b border-[#F7E6D4] transition-colors">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-2">
        {/* Left: Contact info */}
        <div className="flex flex-wrap items-center gap-4 text-[11px] sm:text-xs">
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
        <div className="flex items-center gap-4 text-xs">
          {/* Social icons */}
          <div className="flex items-center gap-2.5 text-[#D2640C]">
            <a href="#social" className="hover:text-[#381602] transition opacity-80 hover:opacity-100" title="Twitter/X">
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
            </a>
            <a href="#social" className="hover:text-[#381602] transition opacity-80 hover:opacity-100" title="LinkedIn">
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
            </a>
            <a href="#social" className="hover:text-[#381602] transition opacity-80 hover:opacity-100" title="YouTube">
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/></svg>
            </a>
          </div>

          <span className="text-[#F5DEC8]">|</span>

          {/* Theme Switcher */}
          <button
            onClick={toggleTheme}
            className="flex items-center gap-1 text-[#381602] hover:bg-[#FFF2E3] transition bg-white px-2 py-0.5 rounded border border-[#F5DEC8] text-[11px] shadow-xs"
            title="Switch Theme"
          >
            <Palette className="w-3 h-3 text-[#E87A1E]" />
            <span>Saffron</span>
          </button>

          {/* Language Selector */}
          <div className="relative">
            <button
              onClick={() => setShowLangMenu(!showLangMenu)}
              className="flex items-center gap-1 hover:text-white transition text-[11px]"
            >
              <Globe className="w-3 h-3 text-emerald-300" />
              <span>{lang}</span>
              <ChevronDown className="w-3 h-3" />
            </button>

            {showLangMenu && (
              <div className="absolute right-0 mt-1 w-28 bg-white text-gray-800 rounded-lg shadow-xl border border-gray-100 py-1 z-50">
                {languages.map(l => (
                  <button
                    key={l}
                    onClick={() => {
                      setLang(l);
                      setShowLangMenu(false);
                    }}
                    className="w-full text-left px-3 py-1.5 text-xs hover:bg-[#F2F7F4] flex items-center justify-between"
                  >
                    <span>{l}</span>
                    {lang === l && <Check className="w-3 h-3 text-emerald-700" />}
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
