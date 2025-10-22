import React from 'react';
import { Button } from '../ui/button';
import { Users, Calendar, Utensils } from 'lucide-react';

const CateringSection = () => {
  return (
    <section id="catering" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl lg:text-5xl font-black text-gray-900 mb-6">
            Catering For All
          </h2>
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            Make your next event unforgettable with Adanos Burger catering. Whether it's a corporate 
            lunch, wedding reception, birthday party, or any special occasion, we bring the smash to you. 
            Custom packages available for groups of all sizes, from intimate gatherings to large celebrations.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="flex flex-col items-center">
              <div className="bg-red-100 p-6 rounded-full mb-4">
                <Users className="h-10 w-10 text-red-600" />
              </div>
              <h3 className="font-bold text-lg mb-2">Any Group Size</h3>
              <p className="text-gray-600 text-sm">From 10 to 1000+ guests</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-red-100 p-6 rounded-full mb-4">
                <Calendar className="h-10 w-10 text-red-600" />
              </div>
              <h3 className="font-bold text-lg mb-2">Flexible Scheduling</h3>
              <p className="text-gray-600 text-sm">Book your preferred date</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-red-100 p-6 rounded-full mb-4">
                <Utensils className="h-10 w-10 text-red-600" />
              </div>
              <h3 className="font-bold text-lg mb-2">Custom Menus</h3>
              <p className="text-gray-600 text-sm">Tailored to your preferences</p>
            </div>
          </div>

          <Button
            size="lg"
            className="bg-red-600 hover:bg-red-700 text-white font-bold px-12 py-6 text-lg rounded-full transition-all hover:scale-105 shadow-lg"
          >
            VIEW PACKAGES
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CateringSection;
