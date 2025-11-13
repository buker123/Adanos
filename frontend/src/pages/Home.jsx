import React from 'react';
import HeroSlider from '../components/home/HeroSlider';
import StartOrder from '../components/home/StartOrder';
import FeatureBoxes from '../components/home/FeatureBoxes';
import CheckoutSection from '../components/home/CheckoutSection';
import LocationSection from '../components/home/LocationSection';
import MapSection from '../components/home/MapSection';
import ContactSection from '../components/home/ContactSection';
import GallerySection from '../components/home/GallerySection';

const Home = () => {
  return (
    <div className="min-h-screen">
      <HeroSlider />
      <StartOrder />
      <FeatureBoxes />
      <CheckoutSection />
      <LocationSection />
      <MapSection />
      <ContactSection />
      <GallerySection />
    </div>
  );
};

export default Home;
