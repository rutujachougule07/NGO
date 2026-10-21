import React from 'react';
import HeroSlider from '../components/home/HeroSlider';
import ImpactStats from '../components/home/ImpactStats';
import FeaturedSevaCauses from '../components/home/FeaturedSevaCauses';
import RecentDonorsWall from '../components/home/RecentDonorsWall';
import HomeGalleryPreview from '../components/home/HomeGalleryPreview';
import VolunteerBanner from '../components/home/VolunteerBanner';
import DonationCalculatorSection from '../components/home/DonationCalculatorSection';
import NewsletterBanner from '../components/home/NewsletterBanner';
import PartnersSection from '../components/home/PartnersSection';

export default function HomePage({ onOpenDonate }) {
  return (
    <main className="bg-[#FDFBF7]">
      {/* 1. Full-Width Dynamic Hero Carousel Slider with Live Seva Pulse Ticker */}
      <HeroSlider onOpenDonate={(opts) => onOpenDonate(opts)} />

      {/* 2. Our Impact 4-Column Statistics Strip (Directly beneath slider) */}
      <ImpactStats />

      {/* 3. Featured 2-3 Core Seva Donation Causes (Daily Annadan, Child Education, Mobile Clinic) */}
      <FeaturedSevaCauses onOpenDonate={(opts) => onOpenDonate(opts)} />

      {/* 4. Live Wall of Donors (Honoring people who have donated) */}
      <RecentDonorsWall onOpenDonate={(opts) => onOpenDonate(opts)} />

      {/* 5. Live Photo Gallery Preview with HD Lightbox */}
      <HomeGalleryPreview onOpenDonate={(opts) => onOpenDonate(opts)} />

      {/* 6. Volunteer With Us Seva Banner */}
      <VolunteerBanner />

      {/* 7. Interactive Transparent Calculator & Fund Distribution in INR */}
      <DonationCalculatorSection onOpenDonate={(opts) => onOpenDonate(opts)} />

      {/* 8. Stay Connected Newsletter Photo Banner */}
      <NewsletterBanner />

      {/* 9. Trusted Partners & Accreditations */}
      <PartnersSection />
    </main>
  );
}
