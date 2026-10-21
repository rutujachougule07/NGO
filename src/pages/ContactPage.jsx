import React, { useState } from 'react';
import { Phone, Mail, MapPin, Send, MessageSquare, Clock, ShieldCheck, CheckCircle2, HeartHandshake } from 'lucide-react';
import { foundationInfo } from '../data/mockData';
import { useToast } from '../context/ToastContext';

export default function ContactPage() {
  const { addToast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'General Inquiry',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      addToast('Thank you! Your message has been routed to our community team.', 'success');
      setFormData({ name: '', email: '', subject: 'General Inquiry', message: '' });
    }, 1000);
  };

  return (
    <div className="bg-[#FDFBF7] py-14 lg:py-20 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Header - Centered */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FFF2E3] text-xs font-bold text-[#A34805] border border-[#F5DEC8] shadow-xs">
            <span className="w-2 h-2 rounded-full bg-[#E87A1E]"></span>
            GET IN TOUCH
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#381602] leading-tight">
            Connect With Our Team & Seva Hubs
          </h1>
          <p className="text-base sm:text-lg text-stone-600 leading-relaxed max-w-2xl mx-auto">
            Whether you want to sponsor an active relief campaign, become a community partner, or coordinate Annadan and medical camps, we warmly welcome you.
          </p>
        </div>

        {/* Contact Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left: Contact Info Cards */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#F3DEC8] shadow-sm space-y-6">
              <h3 className="font-serif text-2xl font-bold text-[#381602]">
                Direct Contacts
              </h3>

              <div className="space-y-4">
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-[#FFF2E3] text-[#E87A1E] border border-[#F5DEC8] flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs text-stone-500 font-medium block">Phone / WhatsApp</span>
                    <a href={`tel:${foundationInfo.phone.split('/')[0].trim()}`} className="text-sm font-bold text-[#381602] hover:text-[#E87A1E] transition">
                      {foundationInfo.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-[#FFF2E3] text-[#E87A1E] border border-[#F5DEC8] flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs text-stone-500 font-medium block">Official Email</span>
                    <a href={`mailto:${foundationInfo.email}`} className="text-sm font-bold text-[#381602] hover:text-[#E87A1E] transition">
                      {foundationInfo.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-[#FFF2E3] text-[#E87A1E] border border-[#F5DEC8] flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs text-stone-500 font-medium block">Main Secretariat</span>
                    <p className="text-xs font-semibold text-stone-800 mt-0.5 leading-relaxed">
                      {foundationInfo.address}
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-[#F3DEC8] flex items-center gap-2 text-xs font-semibold text-[#A34805]">
                <Clock className="w-4 h-4 text-[#E87A1E]" />
                <span>Response Time: Within 24 Business Hours</span>
              </div>
            </div>

            {/* Community Partnership Note */}
            <div className="bg-gradient-to-br from-[#FFF2E3] via-white to-[#FFF2E3] text-stone-900 p-6 rounded-3xl border border-[#F5DEC8] shadow-xs">
              <span className="text-[11px] font-bold text-[#A34805] uppercase tracking-wider block mb-1">
                For Retailers, Cafes & Corporate Donors
              </span>
              <h4 className="font-serif text-lg font-bold text-[#381602]">
                Join the Shop QR & Seva Network
              </h4>
              <p className="text-xs text-stone-600 mt-1 leading-relaxed">
                Display our 100% fee-free donation QR code on your checkout counter. Over 280 retail partners support frontline Annadan and child nutrition with zero administrative overhead.
              </p>
            </div>
          </div>

          {/* Right: Message Form */}
          <div className="lg:col-span-7">
            <div className="bg-white p-8 sm:p-10 rounded-3xl border border-[#F3DEC8] shadow-sm">
              <h3 className="font-serif text-2xl font-bold text-[#381602] mb-2">
                Send Us a Message
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 mb-6">
                Fill in the details below and our team will connect you with the appropriate program head.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-stone-700 block mb-1.5">Your Full Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Maya Sharma"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-[#FFFDF9] border border-[#F3DEC8] rounded-xl px-4 py-2.5 text-xs text-[#381602] focus:outline-none focus:ring-2 focus:ring-[#E87A1E]"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-stone-700 block mb-1.5">Email Address</label>
                    <input
                      type="email"
                      required
                      placeholder="maya@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-[#FFFDF9] border border-[#F3DEC8] rounded-xl px-4 py-2.5 text-xs text-[#381602] focus:outline-none focus:ring-2 focus:ring-[#E87A1E]"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-stone-700 block mb-1.5">Inquiry Topic</label>
                  <select
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full bg-[#FFFDF9] border border-[#F3DEC8] rounded-xl px-4 py-2.5 text-xs font-medium text-[#381602] focus:outline-none focus:ring-2 focus:ring-[#E87A1E]"
                  >
                    <option value="General Inquiry">General Foundation Inquiry</option>
                    <option value="Sponsor a Project">Sponsoring an Active Campaign</option>
                    <option value="Shop QR Partnership">Enrolling a Shop / QR Partnership</option>
                    <option value="Audited Reports">Financial Audit & 80G / 501(c)(3) Receipt</option>
                    <option value="Volunteer">Field Volunteering & Internships</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-stone-700 block mb-1.5">Your Message</label>
                  <textarea
                    rows="5"
                    required
                    placeholder="Tell us about your inquiry, partnership idea, or how you wish to serve..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-[#FFFDF9] border border-[#F3DEC8] rounded-xl p-4 text-xs text-[#381602] focus:outline-none focus:ring-2 focus:ring-[#E87A1E]"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 px-6 bg-[#E87A1E] hover:bg-[#D2640C] text-white font-bold rounded-xl flex items-center justify-center gap-2 shadow-xs hover:shadow transition disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span>Routing message...</span>
                  ) : (
                    <>
                      <Send className="w-4 h-4 text-white" />
                      <span>Transmit Message</span>
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
