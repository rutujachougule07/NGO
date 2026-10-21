import React, { useState } from 'react';
import { Mail, CheckCircle2 } from 'lucide-react';
import { useToast } from '../../context/ToastContext';

export default function NewsletterBanner() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const { addToast } = useToast();

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      addToast('Please enter a valid email address', 'error');
      return;
    }
    setSubscribed(true);
    addToast('Thank you for subscribing to Immense Life Seva dispatches!', 'success');
  };

  return (
    <section className="py-12 sm:py-16 bg-[#FDFBF7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Full-width rounded photo card container with floating signup box */}
        <div className="relative rounded-3xl sm:rounded-4xl overflow-hidden shadow-xl border border-[#F3DEC8] aspect-[16/9] sm:aspect-[21/9] min-h-[380px] sm:min-h-[420px]">
          
          <img
            src="https://images.unsplash.com/photo-1576267423445-b2e0074d68a4?auto=format&fit=crop&w=1600&q=80"
            alt="Community members and children receiving support"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/25 via-transparent to-black/35 pointer-events-none"></div>

          {/* Floating Newsletter Signup Box (Bottom-Right) */}
          <div className="absolute bottom-6 right-6 sm:bottom-10 sm:right-10 bg-white/95 backdrop-blur-md p-6 sm:p-7 rounded-3xl shadow-2xl border border-[#F3DEC8] max-w-sm sm:max-w-md w-[calc(100%-3rem)] text-left">
            
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFF2E3] text-[10px] font-bold uppercase tracking-wider text-[#A34805] border border-[#FDE2C4] mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#E87A1E]"></span>
              <span>Stay Connected</span>
            </div>

            <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#381602] leading-snug mb-2">
              Get Updates That Make a Difference
            </h3>

            <p className="text-xs text-[#5C381E] leading-relaxed mb-4">
              Receive verified seva reports, stories from frontline clinics, and upcoming volunteer opportunities.
            </p>

            {subscribed ? (
              <div className="flex items-center gap-2 text-xs font-bold text-[#A34805] bg-[#FFF2E3] p-3 rounded-xl border border-[#FDE2C4]">
                <CheckCircle2 className="w-4 h-4 text-[#E87A1E]" />
                <span>You are subscribed to Immense Life Seva bulletins!</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter Your Email Address"
                  className="flex-1 px-4 py-2.5 bg-gray-50 text-xs sm:text-sm text-gray-800 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#E87A1E] focus:bg-white"
                  required
                />
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-[#E87A1E] hover:bg-[#D2640C] text-white text-xs sm:text-sm font-bold rounded-xl transition-all shadow-xs shrink-0"
                >
                  Subscribe
                </button>
              </form>
            )}

          </div>

        </div>

      </div>
    </section>
  );
}
