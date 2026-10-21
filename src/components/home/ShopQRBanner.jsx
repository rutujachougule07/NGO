import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Store, 
  QrCode, 
  ArrowRight, 
  ShieldCheck, 
  CheckCircle2, 
  Award, 
  Smartphone, 
  FileCheck2, 
  Sparkles,
  Zap,
  Building2,
  ExternalLink
} from 'lucide-react';
import { useNGO } from '../../context/NGOContext';

export default function ShopQRBanner() {
  const { shops } = useNGO();
  const [activeShopIndex, setActiveShopIndex] = useState(0);

  const activeShops = shops.filter(s => s.status === 'Active');
  const selectedShop = activeShops[activeShopIndex] || activeShops[0] || {
    id: '1',
    qrId: 'ILF-SHOP-001',
    name: 'Green Roots Organic Store & Cafe',
    owner: 'Rameshwar Patil',
    location: 'Bhandarkar Road, Pune, Maharashtra',
    totalCollected: 14500
  };

  return (
    <section className="py-16 sm:py-24 bg-gradient-to-b from-[#FFFDF9] via-[#FDFBF7] to-[#FAF6EE] border-y border-[#F3DEC8] relative overflow-hidden">
      
      {/* Decorative Warm Ambient Glows */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-[#FFE4C4]/40 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-10 -right-32 w-96 h-96 bg-[#FFD8A8]/30 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-18">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FFF2E3] text-xs font-bold text-[#A34805] border border-[#F5DEC8] shadow-xs mb-3.5">
            <Store className="w-3.5 h-3.5 text-[#E87A1E]" />
            <span>RETAIL SEVA COUNTER NETWORK • CLIENT SOP SYSTEM</span>
          </div>
          
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#381602] tracking-tight leading-[1.15]">
            Donate While You Shop at 500+ Partner Stores
          </h2>
          
          <p className="text-sm sm:text-base text-stone-600 mt-3.5 max-w-2xl mx-auto leading-relaxed">
            Whenever you visit a neighborhood grocery, medical pharmacy, or retail store, look for the official <strong>Immense Life Foundation QR Standee</strong> on the billing counter. Donate just ₹20, ₹50, or ₹100 via UPI and get an instant Section 80G tax receipt!
          </p>
        </div>

        {/* 2-Column Interactive Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Column: 3D Acrylic Counter Standee Live Mockup */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="w-full max-w-sm sm:max-w-md bg-white rounded-3xl p-6 sm:p-7 shadow-2xl border-4 border-[#F5DEC8] text-center relative group">
              
              {/* Standee Acrylic Header */}
              <div className="bg-gradient-to-r from-[#FFF2E3] via-white to-[#FFF2E3] p-4 rounded-2xl border border-[#F5DEC8] mb-5 shadow-xs">
                <div className="flex items-center justify-center gap-3">
                  <img
                    src="/immense_life_brand.jpg"
                    alt="Immense Life Emblem"
                    className="w-12 h-12 rounded-full object-cover border-2 border-[#E87A1E] shadow-xs"
                  />
                  <div className="text-left">
                    <span className="font-serif font-bold text-base text-[#381602] block leading-none">
                      Immense Life Foundation
                    </span>
                    <span className="text-[10px] font-bold text-[#D2640C] uppercase tracking-wider block mt-0.5">
                      Section 80G Certified Non-Profit
                    </span>
                  </div>
                </div>
              </div>

              {/* Verified Store Location Tag */}
              <div className="flex items-center justify-between text-xs font-bold text-[#381602] bg-[#FFFDF9] px-3.5 py-1.5 rounded-xl border border-[#F5DEC8] mb-4">
                <span className="truncate max-w-[200px] text-left">
                  📍 {selectedShop.name}
                </span>
                <span className="font-mono text-[10px] text-[#A34805] bg-[#FFF2E3] px-2 py-0.5 rounded border border-[#F5DEC8] shrink-0">
                  {selectedShop.qrId}
                </span>
              </div>

              {/* Realistic QR Code Box */}
              <div className="p-4 bg-white rounded-2xl border-2 border-dashed border-[#E87A1E]/50 relative flex flex-col items-center justify-center my-3 shadow-inner">
                <div className="w-48 h-48 sm:w-52 sm:h-52 bg-white rounded-xl p-2.5 flex items-center justify-center shadow-xs border border-stone-200">
                  <img
                    src={`https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(
                      `${window.location.origin}/pay?shop=${selectedShop.qrId}`
                    )}&color=381602`}
                    alt={`Counter QR for ${selectedShop.name}`}
                    className="w-full h-full object-contain"
                  />
                </div>

                <div className="mt-2.5 flex items-center gap-2 text-[11px] font-bold text-[#A34805]">
                  <Sparkles className="w-3.5 h-3.5 text-[#E87A1E]" />
                  <span>Scan with GPay • PhonePe • Paytm • BHIM</span>
                </div>
              </div>

              {/* Micro-donation Pill Options */}
              <div className="grid grid-cols-3 gap-2 mt-4 text-xs font-bold">
                <div className="bg-[#FFF2E3] text-[#A34805] py-2 rounded-xl border border-[#F5DEC8]">
                  ₹20 Annadan
                </div>
                <div className="bg-[#FFF2E3] text-[#A34805] py-2 rounded-xl border border-[#F5DEC8]">
                  ₹50 Medicine
                </div>
                <div className="bg-[#FFF2E3] text-[#A34805] py-2 rounded-xl border border-[#F5DEC8]">
                  ₹100 Books
                </div>
              </div>

              {/* Direct Test Payment CTA */}
              <div className="mt-5">
                <Link
                  to={`/pay?shop=${selectedShop.qrId}`}
                  className="w-full py-3.5 bg-[#E87A1E] hover:bg-[#D2640C] text-white font-bold text-xs sm:text-sm rounded-xl shadow-md transition flex items-center justify-center gap-2"
                >
                  <Smartphone className="w-4 h-4" />
                  <span>Test Scan & Pay for this Store</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              <div className="text-[10px] text-stone-500 mt-2 font-medium">
                Authorized President: Milind Manohar Sonar • Instant PDF Receipt
              </div>

            </div>
          </div>

          {/* Right Column: 3-Step Lifecycle + Store Selector */}
          <div className="lg:col-span-7 space-y-7 text-left">
            
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#A34805] block mb-1">
                HOW COUNTER QR DONATIONS WORK
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#381602]">
                Seamless 3-Step Micro-Donation Flow
              </h3>
            </div>

            {/* 3 Step Cards */}
            <div className="space-y-4">
              
              {/* Step 1 */}
              <div className="bg-white rounded-2xl p-5 border border-[#F3DEC8] shadow-xs flex items-start gap-4 hover:shadow-md transition">
                <div className="w-10 h-10 rounded-xl bg-[#FFF2E3] text-[#A34805] font-serif font-bold text-lg flex items-center justify-center shrink-0 border border-[#F5DEC8]">
                  1
                </div>
                <div>
                  <h4 className="font-bold text-sm text-[#381602] flex items-center gap-2">
                    <span>Partner Store Displays QR Standee</span>
                    <Store className="w-3.5 h-3.5 text-[#E87A1E]" />
                  </h4>
                  <p className="text-xs text-stone-600 mt-1 leading-relaxed">
                    Our verified retail partner displays the official acrylic standee right at the cashier billing counter, mapped with a unique Shop ID (e.g., ILF-SHOP-001).
                  </p>
                </div>
              </div>

              {/* Step 2 */}
              <div className="bg-white rounded-2xl p-5 border border-[#F3DEC8] shadow-xs flex items-start gap-4 hover:shadow-md transition">
                <div className="w-10 h-10 rounded-xl bg-[#FFF2E3] text-[#A34805] font-serif font-bold text-lg flex items-center justify-center shrink-0 border border-[#F5DEC8]">
                  2
                </div>
                <div>
                  <h4 className="font-bold text-sm text-[#381602] flex items-center gap-2">
                    <span>Customer Scans with UPI & Enters Mobile</span>
                    <Zap className="w-3.5 h-3.5 text-[#E87A1E]" />
                  </h4>
                  <p className="text-xs text-stone-600 mt-1 leading-relaxed">
                    Customer scans with Google Pay, PhonePe, or Paytm, enters their Name and 10-digit mobile number, and pays any small amount like ₹20, ₹50, or ₹100.
                  </p>
                </div>
              </div>

              {/* Step 3 */}
              <div className="bg-white rounded-2xl p-5 border border-[#F3DEC8] shadow-xs flex items-start gap-4 hover:shadow-md transition">
                <div className="w-10 h-10 rounded-xl bg-[#FFF2E3] text-[#A34805] font-serif font-bold text-lg flex items-center justify-center shrink-0 border border-[#F5DEC8]">
                  3
                </div>
                <div>
                  <h4 className="font-bold text-sm text-[#381602] flex items-center gap-2">
                    <span>Instant Section 80G Tax Exemption Receipt</span>
                    <FileCheck2 className="w-3.5 h-3.5 text-[#E87A1E]" />
                  </h4>
                  <p className="text-xs text-stone-600 mt-1 leading-relaxed">
                    Razorpay verifies the transaction, generates an official 80G receipt signed by President Milind Manohar Sonar, and logs the collection under that specific store!
                  </p>
                </div>
              </div>

            </div>

            {/* Sample Store Selector Pills */}
            <div className="pt-2">
              <span className="text-xs font-bold text-[#381602] block mb-2.5">
                Preview Different Partner Stores in System:
              </span>
              <div className="flex flex-wrap gap-2">
                {activeShops.map((shop, idx) => (
                  <button
                    key={shop.id}
                    onClick={() => setActiveShopIndex(idx)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition border ${
                      activeShopIndex === idx
                        ? 'bg-[#E87A1E] text-white border-[#E87A1E] shadow-xs'
                        : 'bg-white text-stone-700 border-[#F3DEC8] hover:bg-[#FFF2E3]'
                    }`}
                  >
                    🏪 {shop.name.split(' ')[0]} {shop.name.split(' ')[1] || ''}
                  </button>
                ))}
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <Link
                to="/pay"
                className="px-6 py-3 bg-[#E87A1E] hover:bg-[#D2640C] text-white text-xs font-bold rounded-full transition flex items-center gap-2 shadow-xs"
              >
                <QrCode className="w-4 h-4" />
                <span>Open General QR Payment Flow</span>
              </Link>

              <Link
                to="/contact"
                className="px-5 py-3 bg-white text-[#381602] hover:bg-[#FFF2E3] border border-[#F3DEC8] text-xs font-bold rounded-full transition"
              >
                <span>Register Your Shop as a Seva Counter</span>
              </Link>
            </div>

          </div>

        </div>

        {/* Trust Credentials Bar */}
        <div className="mt-12 bg-white rounded-2xl p-4 border border-[#F3DEC8] flex flex-wrap items-center justify-between gap-4 text-xs text-stone-600 shadow-xs">
          <div className="flex items-center gap-2 font-semibold text-[#381602]">
            <Award className="w-4 h-4 text-[#E87A1E]" />
            <span>Govt. of India 80G Certified Non-Profit • Automated Digital Invoices</span>
          </div>
          <div className="flex items-center gap-2 text-emerald-800 font-medium">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>100% Secure Razorpay PCI-DSS Level 1 Gateway</span>
          </div>
        </div>

      </div>
    </section>
  );
}
