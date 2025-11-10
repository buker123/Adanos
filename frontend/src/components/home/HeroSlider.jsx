import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '../ui/button';

const HeroSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const slides = [
    {
      id: 1,
      image: 'https://customer-assets.emergentagent.com/job_adanos-grill/artifacts/9efxndur_unnamed.webp',
      title: 'Welcome to Adanos Burger',
      subtitle: 'Manchester\'s Finest Halal Smashburgers'
    },
    {
      id: 2,
      image: 'https://customer-assets.emergentagent.com/job_adanos-grill/artifacts/yfois8ia_unnamed%20%281%29.webp',
      title: 'Fresh Ingredients Daily',
      subtitle: 'Premium Quality You Can Taste'
    },
    {
      id: 3,
      image: 'https://customer-assets.emergentagent.com/job_adanos-grill/artifacts/spo746qv_unnamed%20%283%29.webp',
      title: 'Visit Our Restaurant',
      subtitle: 'Cozy Atmosphere, Great Food'
    },
    {
      id: 4,
      image: 'https://customer-assets.emergentagent.com/job_adanos-grill/artifacts/ss183v9o_unnamed%20%2810%29.webp',
      title: 'Handcrafted with Love',
      subtitle: 'Every Burger Made to Perfection'
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <section className="relative bg-black overflow-hidden">
      <div className="relative h-[600px] lg:h-[700px]">
        {/* Slides */}
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            {/* Background Image */}
            <div className="absolute inset-0">
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent"></div>
            </div>

            {/* Content */}
            <div className="relative h-full flex items-center">
              <div className="container mx-auto px-4">
                <div className="max-w-2xl">
                  <div className="inline-block mb-4">
                    <span className="bg-red-600 text-white px-6 py-3 rounded-full text-sm font-bold uppercase tracking-wide">
                      Halal Certified
                    </span>
                  </div>
                  <h1 className="text-5xl lg:text-7xl font-black text-white leading-tight mb-6 drop-shadow-lg">
                    {slide.title}
                  </h1>
                  <p className="text-2xl lg:text-3xl text-white/90 mb-8 drop-shadow-lg">
                    {slide.subtitle}
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <Link to="/menu">
                      <Button
                        size="lg"
                        className="bg-red-600 hover:bg-red-700 text-white px-10 py-7 text-lg font-bold rounded-full transition-transform hover:scale-105 shadow-2xl"
                      >
                        ORDER NOW
                      </Button>
                    </Link>
                    <a href="#menu">
                      <Button
                        size="lg"
                        variant="outline"
                        className="bg-white/10 backdrop-blur-sm border-2 border-white text-white hover:bg-white hover:text-red-600 px-10 py-7 text-lg font-bold rounded-full transition-all"
                      >
                        VIEW MENU
                      </Button>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Dots */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex space-x-3 z-20">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-3 rounded-full transition-all ${
                index === currentSlide
                  ? 'w-12 bg-red-600'
                  : 'w-3 bg-white/50 hover:bg-white/80'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSlider;
