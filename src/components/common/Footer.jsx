import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Heart, 
  Send, 
  Phone, 
  Mail, 
  MapPin, 
  ArrowUpRight,
  Sparkles,
  ShieldCheck
} from 'lucide-react';
import { useToast } from '../../context/ToastContext';
import { useAdmin } from '../../context/AdminContext';

export default function Footer({ onOpenDonate }) {
  const { addToast } = useToast();
  const { websiteCMS } = useAdmin();
  const cmsFooter = websiteCMS?.footer || {};
  const cmsContact = websiteCMS?.contact || {};
  const [email, setEmail] = useState('');

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      addToast('Please enter a valid email address', 'error');
      return;
    }
    addToast('Thank you for subscribing to our Seva Newsletter!', 'success');
    setEmail('');
  };

  const quickLinks = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'Programs', path: '/programs' },
    { name: 'Visual Gallery', path: '/gallery' },
    { name: 'News & Events', path: '/news' },
    { name: 'Shop QR Pay', path: '/pay' },
    { name: 'Contact Seva Hubs', path: '/contact' },
  ];

  const programLinks = [
    { name: 'Education & Child Development', path: '/programs' },
    { name: 'Healthcare & Wellness', path: '/programs' },
    { name: 'Food & Essential Support (Annadan)', path: '/programs' },
    { name: 'Community Welfare & Sanitation', path: '/programs' },
    { name: 'Women & Child Empowerment', path: '/programs' },
    { name: 'Social Awareness & Relief', path: '/programs' },
  ];

  return (
    <footer className="bg-[#1F140D] text-white pt-10 pb-8 sm:pt-16 sm:pb-12 border-t border-[#382317] relative text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Grid: Brand, Quick Links, Programs, Contact/Newsletter */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-8 pb-10 border-b border-[#382317]">
          
          {/* Brand Info (Full width on mobile, 4 cols on lg) */}
          <div className="sm:col-span-2 lg:col-span-4 space-y-3.5">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full overflow-hidden border-2 border-[#F4A261] shadow-xs shrink-0 bg-white flex items-center justify-center p-0.5">
                <img 
                  src="/immense_life_logo.jpg" 
                  alt="Immense Life Emblem" 
                  className="w-full h-full object-contain rounded-full" 
                />
              </div>
              <div className="flex flex-col">
                <span className="font-serif font-bold text-lg sm:text-xl text-white tracking-tight leading-none">
                  Immense Life
                </span>
                <span className="text-[9px] text-[#F4A261] font-bold uppercase tracking-[0.22em] mt-1">
                  Foundation
                </span>
              </div>
            </Link>

            <p className="text-xs sm:text-sm text-white/70 leading-relaxed max-w-sm">
              {cmsFooter.tagline ? `${cmsFooter.tagline} • ` : ''}Inspired by the peaceful spirit of Shirdi Sai Baba — building a compassionate community through selfless food distribution, free medical aid, child education, and emergency disaster relief.
            </p>

            {/* Social Media Icons */}
            <div className="flex items-center gap-2 pt-1">
              {[
                {
                  name: 'WhatsApp',
                  link: cmsFooter.socialLinks?.whatsapp || '#social',
                  svg: <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.598 2.664-.698c.969.586 1.761.88 2.796.88 3.182 0 5.768-2.587 5.768-5.766.001-3.182-2.585-5.767-5.768-5.767zm7.531 5.766c0 4.155-3.376 7.531-7.531 7.531-1.31 0-2.535-.34-3.606-.934l-4.425 1.159 1.183-4.321c-.696-1.127-1.083-2.451-1.083-3.835 0-4.155 3.376-7.531 7.531-7.531 4.155 0 7.531 3.376 7.531 7.531z"/></svg>
                },
                {
                  name: 'Instagram',
                  link: cmsFooter.socialLinks?.instagram || '#social',
                  svg: <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                },
                {
                  name: 'Twitter/X',
                  link: cmsFooter.socialLinks?.twitter || '#social',
                  svg: <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                },
                {
                  name: 'YouTube',
                  link: cmsFooter.socialLinks?.youtube || '#social',
                  svg: <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/></svg>
                }
              ].map((s, idx) => (
                <a
                  key={idx}
                  href={s.link}
                  target="_blank"
                  rel="noreferrer"
                  className="w-8 h-8 rounded-full bg-[#2C1C13] border border-[#442B1D] text-white/70 hover:text-white hover:border-[#F4A261] hover:bg-[#F4A261] flex items-center justify-center transition active:scale-95"
                  title={s.name}
                >
                  {s.svg}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links & Seva Programs: 2 Columns on Mobile for Clean Compact Layout */}
          <div className="sm:col-span-2 lg:col-span-5 grid grid-cols-2 gap-4 sm:gap-6">
            {/* Quick Navigation */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#F4A261]">
                Quick Navigation
              </h4>
              <ul className="space-y-2 text-xs sm:text-sm">
                {quickLinks.map((item, idx) => (
                  <li key={idx}>
                    <Link 
                      to={item.path} 
                      className="text-white/70 hover:text-[#F4A261] transition inline-block py-0.5"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Core Programs */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#F4A261]">
                Seva Programs
              </h4>
              <ul className="space-y-2 text-xs sm:text-sm">
                {programLinks.map((item, idx) => (
                  <li key={idx}>
                    <Link 
                      to={item.path} 
                      className="text-white/70 hover:text-[#F4A261] transition inline-block py-0.5"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Contact Placeholders & Newsletter (3 cols) */}
          <div className="sm:col-span-2 lg:col-span-3 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#F4A261]">
              Contact Information
            </h4>
            
            <div className="space-y-2.5 text-xs text-white/75">
              <p className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#F4A261] shrink-0 mt-0.5" />
                <span className="leading-snug">{cmsContact.registeredOffice || "Sai Seva Bhavan, Shirdi Highway, Ahmednagar, MH 423109"}</span>
              </p>
              <a 
                href={`tel:${(cmsContact.helplinePhone || "+9184005520").split('/')[0].trim()}`}
                className="flex items-center gap-2 hover:text-[#F4A261] transition"
              >
                <Phone className="w-3.5 h-3.5 text-[#F4A261] shrink-0" />
                <span>{cmsContact.helplinePhone || "+91 (02423) 258-900 / 1800-209-SEVA"}</span>
              </a>
              <a 
                href={`mailto:${cmsContact.officialEmail || "contact@immenselife.org"}`}
                className="flex items-center gap-2 hover:text-[#F4A261] transition"
              >
                <Mail className="w-3.5 h-3.5 text-[#F4A261] shrink-0" />
                <span>{cmsContact.officialEmail || "contact@immenselife.org"}</span>
              </a>
            </div>

            {/* Newsletter Input */}
            <form onSubmit={handleSubscribe} className="space-y-2 pt-1">
              <label className="text-[11px] font-bold text-white/90 block">
                Subscribe for Monthly Seva Bulletin:
              </label>
              <div className="flex rounded-full overflow-hidden border border-[#442B1D] bg-[#2C1C13] p-1 shadow-inner focus-within:border-[#F4A261]">
                <input
                  type="email"
                  placeholder="Your email address..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-transparent px-3 text-xs text-white placeholder-white/40 focus:outline-none"
                />
                <button
                  type="submit"
                  aria-label="Subscribe"
                  className="px-3.5 py-1.5 bg-[#F4A261] hover:bg-[#E87A1E] text-white rounded-full text-xs font-bold transition shrink-0 active:scale-95"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>
            </form>
          </div>

        </div>

        {/* Bottom Bar: Copyright, Legal Links & 80G Notice */}
        <div className="pt-6 sm:pt-8 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 text-xs text-white/60 text-center sm:text-left">
          <p>© {new Date().getFullYear()} Immense Life Foundation. All rights reserved.</p>

          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-x-3 gap-y-1.5 text-[11px] sm:text-xs font-medium">
            <Link to="/about" className="hover:text-[#F4A261] transition">Section 80G Tax Exemption</Link>
            <span className="text-white/30">•</span>
            <Link to="/about" className="hover:text-[#F4A261] transition">Privacy Policy</Link>
            <span className="text-white/30">•</span>
            <Link to="/about" className="hover:text-[#F4A261] transition">Terms & Conditions</Link>
            <span className="text-white/30">•</span>
            <Link to="/admin" className="text-[#F4A261] font-bold hover:underline">Admin Console</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
