import React from 'react';
import HeroSection from '../components/home/HeroSection';
import HomeAboutSection from '../components/home/HomeAboutSection';
import HomeProgramsSection from '../components/home/HomeProgramsSection';
import HomeGallerySection from '../components/home/HomeGallerySection';
import HomeNewsSection from '../components/home/HomeNewsSection';
import HomeCTASection from '../components/home/HomeCTASection';

export default function HomePage({ onOpenDonate }) {
  return (
    <main className="bg-white min-h-screen">
      {/* 1. Hero Section */}
      <HeroSection onOpenDonate={onOpenDonate} />

      {/* 2. About Us Section */}
      <HomeAboutSection />

      {/* 3. Programs Section (6 Cards Grid) */}
      <HomeProgramsSection />

      {/* 4. Gallery Section (Moments of Hope & Humanity) */}
      <HomeGallerySection />

      {/* 5. News & Events Section */}
      <HomeNewsSection />

      {/* 6. Homepage Closing Call to Action */}
      <HomeCTASection onOpenDonate={onOpenDonate} />
    </main>
  );
}
