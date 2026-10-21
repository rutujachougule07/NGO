import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Heart, 
  Send, 
  ShieldCheck, 
  Phone, 
  Mail, 
  MapPin, 
  ArrowUpRight 
} from 'lucide-react';
import { foundationInfo, areasOfWork } from '../../data/mockData';
import { useToast } from '../../context/ToastContext';

export default function Footer({ onOpenDonate }) {
  const { addToast } = useToast();
  const [email, setEmail] = useState('');

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      addToast('Please enter a valid email address', 'error');
      return;
    }
    addToast('Thank you for subscribing to our Field Ops Bulletin!', 'success');
    setEmail('');
  };

  return (
    <footer className="bg-[#FFFDF9] text-[#5C381E] pt-16 pb-12 border-t border-[#F7E6D4] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Grid: Brand, Quick Links, Programs, Newsletter */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-14 border-b border-[#F7E6D4]">
          
          {/* Brand Info (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full overflow-hidden border border-[#F5DEC8] shadow-xs shrink-0 bg-[#FFF2E3] flex items-center justify-center">
                <img 
                  src="/immense_life_brand.jpg" 
                  alt="Immense Life Emblem" 
                  className="w-full h-full object-cover object-bottom scale-110" 
                />
              </div>
              <div className="flex flex-col">
                <span className="font-serif font-bold text-xl text-[#381602] leading-none">
                  Immense Life
                </span>
                <span className="text-[9px] text-[#D2640C] font-bold uppercase tracking-[0.22em] mt-0.5">
                  Foundation
                </span>
              </div>
            </Link>

            <p className="text-xs sm:text-sm text-[#5C381E] leading-relaxed">
              Dedicated to selfless service: providing daily Annadan, free medical aid, child schooling, and disaster relief to marginalized communities with love and transparency.
            </p>

            <div className="pt-2 flex items-center gap-3">
              <button
                onClick={onOpenDonate}
                className="px-5 py-2.5 bg-[#E87A1E] hover:bg-[#D2640C] text-white text-xs sm:text-sm font-bold rounded-full transition-all shadow-xs flex items-center gap-2"
              >
                <Heart className="w-3.5 h-3.5 fill-current text-white/90" />
                <span>Support Our Mission</span>
              </button>
              <Link
                to="/reports"
                className="px-4 py-2.5 text-xs font-semibold text-[#381602] hover:text-[#D2640C] bg-white hover:bg-[#FFF2E3] rounded-full border border-[#F5DEC8] shadow-xs transition"
              >
                Reports
              </Link>
            </div>
          </div>

          {/* Quick Links (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#143D2B]">
              Quick Links
            </h4>
            <ul className="space-y-2 text-xs text-gray-600">
              <li>
                <Link to="/" className="hover:text-emerald-800 transition">Home</Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-emerald-800 transition">About the Foundation</Link>
              </li>
              <li>
                <Link to="/programs" className="hover:text-emerald-800 transition">Our Core Programs</Link>
              </li>
              <li>
                <Link to="/projects" className="hover:text-emerald-800 transition">Active Projects</Link>
              </li>
              <li>
                <Link to="/reports" className="hover:text-emerald-800 transition">Audited Reports</Link>
              </li>
              <li>
                <Link to="/gallery" className="hover:text-emerald-800 transition">Media & Gallery</Link>
              </li>
              <li>
                <Link to="/admin" className="hover:text-emerald-800 transition text-emerald-700 font-bold">Admin Portal</Link>
              </li>
            </ul>
          </div>

          {/* Programs (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#143D2B]">
              Focus Areas
            </h4>
            <ul className="space-y-2 text-xs text-gray-600">
              {areasOfWork.map(area => (
                <li key={area.id}>
                  <Link to={`/programs#${area.id}`} className="hover:text-emerald-800 transition flex items-center justify-between">
                    <span>{area.title}</span>
                    <ArrowUpRight className="w-3 h-3 text-emerald-600 opacity-0 group-hover:opacity-100" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter & Contact (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#143D2B]">
              Stay Informed
            </h4>
            <p className="text-xs text-gray-600 leading-relaxed">
              Receive monthly audited field dispatches, photo stories, and transparent fund utilization summaries.
            </p>

            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="relative">
                <input
                  type="email"
                  required
                  placeholder="Your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-white border border-[#DFECE4] rounded-xl px-3.5 py-2.5 text-xs text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-600 shadow-xs"
                />
                <button
                  type="submit"
                  className="absolute right-1.5 top-1/2 -translate-y-1/2 p-1.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg transition"
                  aria-label="Subscribe to newsletter"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>
            </form>

            <div className="pt-2 text-xs text-gray-600 space-y-1">
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                <span>{foundationInfo.phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                <span>{foundationInfo.email}</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Legal Bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>© 2026 {foundationInfo.name}. All rights reserved. 501(c)(3) Registered.</span>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-xs">
            <Link to="/privacy" className="hover:text-emerald-800 transition">Privacy Policy</Link>
            <span>•</span>
            <Link to="/terms" className="hover:text-emerald-800 transition">Terms of Service</Link>
            <span>•</span>
            <Link to="/reports" className="hover:text-emerald-800 transition">Donor Transparency Charter</Link>
            <span>•</span>
            <Link to="/admin" className="hover:text-emerald-800 transition text-emerald-700 font-semibold">Shop / Admin Login</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
