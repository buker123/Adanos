import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '../ui/button';
import { burgers } from '../../data/mockData';
import { useCart } from '../../context/CartContext';
import { toast } from '../../hooks/use-toast';

const HeroSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { addToCart } = useCart();
  const heroBurgers = burgers.filter(b => b.size);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroBurgers.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [heroBurgers.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroBurgers.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroBurgers.length) % heroBurgers.length);
  };

  const handleAddToOrder = (burger) => {
    addToCart(burger);
    toast({
      title: "Added to cart!",
      description: `${burger.name} has been added to your order.`,
    });
  };

  return (
    <section className="relative bg-gradient-to-b from-red-50 to-white overflow-hidden">
      <div className="container mx-auto px-4 py-16">
        <div className="relative h-[600px] flex items-center">
          {/* Slides */}
          {heroBurgers.map((burger, index) => (
            <div
              key={burger.id}
              className={`absolute inset-0 transition-opacity duration-700 ${
                index === currentSlide ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center h-full">
                {/* Text Content */}
                <div className="space-y-6">
                  <div className="inline-block">
                    <span className="bg-red-600 text-white px-4 py-2 rounded-full text-sm font-bold uppercase">
                      {burger.size}
                    </span>
                  </div>
                  <h1 className="text-5xl lg:text-7xl font-black text-gray-900 leading-tight">
                    {burger.name}
                  </h1>
                  <p className="text-xl text-gray-600">
                    {burger.description}
                  </p>
                  <div className="flex items-center space-x-4">
                    <span className="text-4xl font-black text-red-600">
                      ${burger.price.toFixed(2)}
                    </span>
                    <Button
                      size="lg"
                      className="bg-red-600 hover:bg-red-700 text-white px-8 py-6 text-lg font-bold rounded-full transition-transform hover:scale-105"
                      onClick={() => handleAddToOrder(burger)}
                    >
                      ADD TO ORDER
                    </Button>
                  </div>
                </div>

                {/* Burger Image */}
                <div className="relative">
                  <div className="absolute inset-0 bg-red-200 rounded-full blur-3xl opacity-30 transform scale-75"></div>
                  <img
                    src={burger.image}
                    alt={burger.name}
                    className="relative z-10 w-full h-[500px] object-contain drop-shadow-2xl transform hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </div>
            </div>
          ))}

          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-3 rounded-full shadow-lg transition-all hover:scale-110 z-20"
          >
            <ChevronLeft className="h-6 w-6 text-red-600" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-3 rounded-full shadow-lg transition-all hover:scale-110 z-20"
          >
            <ChevronRight className="h-6 w-6 text-red-600" />
          </button>

          {/* Dots */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex space-x-2 z-20">
            {heroBurgers.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`h-3 rounded-full transition-all ${
                  index === currentSlide
                    ? 'w-8 bg-red-600'
                    : 'w-3 bg-gray-300 hover:bg-gray-400'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSlider;
