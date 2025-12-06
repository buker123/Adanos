import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../ui/button';
import { ArrowRight } from 'lucide-react';

const CheckoutSection = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="bg-gradient-to-br from-red-50 to-white rounded-2xl shadow-xl overflow-hidden border-2 border-red-100">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
            {/* Text Content */}
            <div className="p-12 lg:p-16 flex flex-col justify-center">
              <h2 className="text-4xl lg:text-5xl font-black text-gray-900 mb-6">
                Adanos Special Burger
              </h2>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Experience Manchester's best smashburgers with our signature special recipe. 
                Each burger is crafted with premium halal ingredients, hand-smashed to perfection, 
                and served with love. From classic cheeseburgers to our famous triple patty monster, 
                there's something for everyone.
              </p>
              <div className="space-y-4">
                <p className="text-gray-700 font-semibold flex items-center">
                  <span className="bg-red-600 text-white w-6 h-6 rounded-full flex items-center justify-center mr-3 text-sm">✓</span>
                  Premium 100% beef patties
                </p>
                <p className="text-gray-700 font-semibold flex items-center">
                  <span className="bg-red-600 text-white w-6 h-6 rounded-full flex items-center justify-center mr-3 text-sm">✓</span>
                  Fresh ingredients daily
                </p>
                <p className="text-gray-700 font-semibold flex items-center">
                  <span className="bg-red-600 text-white w-6 h-6 rounded-full flex items-center justify-center mr-3 text-sm">✓</span>
                  Halal-certified options
                </p>
              </div>
              <div className="mt-8">
                <a href="/menu">
                  <Button
                    size="lg"
                    className="bg-red-600 hover:bg-red-700 text-white font-bold px-8 py-6 rounded-full transition-all hover:scale-105"
                  >
                    VIEW FULL MENU
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </a>
              </div>
            </div>

            {/* Image */}
            <div className="relative h-[400px] lg:h-auto">
              <img
                src="https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=1200&h=800&fit=crop"
                alt="Delicious burger"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CheckoutSection;
