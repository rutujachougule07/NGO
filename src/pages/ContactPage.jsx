import React, { useState } from 'react';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Send, 
  MessageSquare, 
  Clock, 
  ShieldCheck, 
  CheckCircle2, 
  HeartHandshake,
  ChevronRight,
  Headphones,
  Calendar
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { foundationInfo } from '../data/mockData';
import { useToast } from '../context/ToastContext';
import { useAdmin } from '../context/AdminContext';

export default function ContactPage() {
  const { addToast } = useToast();
  const { websiteCMS, foundationSettings } = useAdmin();
  const cmsContact = websiteCMS?.contact || {};
  const phone = cmsContact.helplinePhone || foundationSettings?.helplinePhone || foundationInfo.phone;
  const email = cmsContact.officialEmail || foundationSettings?.officialEmail || foundationInfo.email;
  const address = cmsContact.registeredOffice || foundationSettings?.address || foundationInfo.address;

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'General Inquiry',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      addToast('Thank you! Your message has been routed to our community seva desk.', 'success');
      setFormData({ name: '', email: '', phone: '', subject: 'General Inquiry', message: '' });
    }, 1000);
  };

  return (
    <div className="bg-[#FDFBF7] min-h-screen text-left">
      
      {/* Top Banner & Header: Centered Text Content */}
      <section className="bg-gradient-to-b from-[#FFF0E3]/70 via-[#FFF9F3] to-[#FFFDFB] pt-10 pb-6 sm:pt-12 sm:pb-8 border-b border-[#F5DEC8] text-center relative overflow-hidden">
        {/* Decorative Ambient Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#F4A261]/10 rounded-full blur-3xl pointer-events-none -mt-20"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl mx-auto text-center space-y-3">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FFF0E3] text-xs font-bold text-[#F4A261] border border-[#F5DEC8] shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-[#F4A261] animate-pulse"></span>
              <span>24/7 VOLUNTEER HELPLINE & COMMUNITY ASSISTANCE</span>
            </div>
            
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#493326] leading-tight tracking-tight">
              Connect With Our Team & <span className="text-[#F4A261]">Seva Hubs</span>
            </h1>
            
            <p className="text-sm sm:text-base text-[#493326]/80 leading-relaxed max-w-2xl mx-auto">
              Whether you want to sponsor an active relief campaign, volunteer in our Annadan kitchen, enroll a shop in our fee-free QR network, or request emergency assistance, our community team is here for you.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-16 sm:pt-8 sm:pb-20 space-y-14">
        
        {/* Contact Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left: Contact Info Cards */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#F5DEC8] shadow-sm space-y-6">
              <h3 className="font-serif text-2xl font-bold text-[#493326]">
                Direct Seva Helpdesk
              </h3>

              <div className="space-y-4">
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-[#FFF0E3] text-[#F4A261] border border-[#F5DEC8] flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs text-[#493326]/70 font-medium block">Phone / WhatsApp Support</span>
                    <a href={`tel:${phone.split('/')[0].trim()}`} className="text-sm font-bold text-[#493326] hover:text-[#F4A261] transition">
                      {phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-[#FFF0E3] text-[#F4A261] border border-[#F5DEC8] flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs text-[#493326]/70 font-medium block">Official Secretariat Email</span>
                    <a href={`mailto:${email}`} className="text-sm font-bold text-[#493326] hover:text-[#F4A261] transition">
                      {email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-[#FFF0E3] text-[#F4A261] border border-[#F5DEC8] flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs text-[#493326]/70 font-medium block">Registered Secretariat</span>
                    <p className="text-xs font-semibold text-[#493326] mt-0.5 leading-relaxed">
                      {address}
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-[#F5DEC8] flex items-center gap-2 text-xs font-semibold text-[#F4A261]">
                <Clock className="w-4 h-4 text-[#F4A261]" />
                <span>Response Time: Typically within 2 to 4 business hours</span>
              </div>
            </div>

            {/* Retail QR Partnership Card */}
            <div className="bg-gradient-to-br from-[#FFF0E3] via-white to-[#FFF0E3] text-[#493326] p-6 sm:p-8 rounded-3xl border border-[#F5DEC8] shadow-xs space-y-3">
              <span className="text-[11px] font-bold text-[#F4A261] uppercase tracking-wider block">
                For Retailers, Cafes & Corporate CSR
              </span>
              <h4 className="font-serif text-xl font-bold text-[#493326]">
                Join the Fee-Free Shop QR Network
              </h4>
              <p className="text-xs text-[#493326]/80 leading-relaxed">
                Display our zero-overhead donation QR standee on your checkout billing counter. Over 280 retail stores and restaurants empower daily Annadan directly without any middleman fees.
              </p>
              <div className="pt-1">
                <Link
                  to="/admin/shops"
                  className="text-xs font-bold text-[#F4A261] hover:underline inline-flex items-center gap-1"
                >
                  <span>Learn about merchant enrollment</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>

          {/* Right: Structured Message Form */}
          <div className="lg:col-span-7">
            <div className="bg-white p-8 sm:p-10 rounded-3xl border border-[#F5DEC8] shadow-sm">
              <h3 className="font-serif text-2xl font-bold text-[#493326] mb-1">
                Send a Structured Inquiry
              </h3>
              <p className="text-xs sm:text-sm text-[#493326]/80 mb-6">
                Fill in the details below and your communication will be assigned to the designated seva head.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-[#493326] block mb-1.5">Your Full Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Maya Sharma"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-[#FFFDF9] border border-[#F5DEC8] rounded-xl px-4 py-2.5 text-xs text-[#493326] focus:outline-none focus:ring-2 focus:ring-[#F4A261]"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-[#493326] block mb-1.5">Email Address</label>
                    <input
                      type="email"
                      required
                      placeholder="maya@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-[#FFFDF9] border border-[#F5DEC8] rounded-xl px-4 py-2.5 text-xs text-[#493326] focus:outline-none focus:ring-2 focus:ring-[#F4A261]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-[#493326] block mb-1.5">Phone Number (Optional)</label>
                    <input
                      type="tel"
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-[#FFFDF9] border border-[#F5DEC8] rounded-xl px-4 py-2.5 text-xs text-[#493326] focus:outline-none focus:ring-2 focus:ring-[#F4A261]"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-[#493326] block mb-1.5">Department / Topic</label>
                    <select
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full bg-[#FFFDF9] border border-[#F5DEC8] rounded-xl px-4 py-2.5 text-xs font-medium text-[#493326] focus:outline-none focus:ring-2 focus:ring-[#F4A261]"
                    >
                      <option value="General Inquiry">General Foundation Inquiry</option>
                      <option value="Sponsor a Project">Sponsoring an Annadan / Medical Campaign</option>
                      <option value="Shop QR Partnership">Enrolling a Shop in QR Network</option>
                      <option value="Audited Reports">Financial Audit & 80G Receipt Query</option>
                      <option value="Volunteer">Field Volunteering & Medical Camps</option>
                      <option value="CSR Partnership">Corporate Social Responsibility (CSR)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-[#493326] block mb-1.5">Your Message or Proposal</label>
                  <textarea
                    rows="5"
                    required
                    placeholder="Describe how you wish to serve, collaborate, or request aid..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-[#FFFDF9] border border-[#F5DEC8] rounded-xl p-4 text-xs text-[#493326] focus:outline-none focus:ring-2 focus:ring-[#F4A261]"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 px-6 bg-[#F4A261] hover:bg-[#E78B45] text-white font-bold rounded-xl flex items-center justify-center gap-2 shadow-xs hover:shadow transition disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span>Routing message to seva desk...</span>
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
