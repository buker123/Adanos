import React from 'react';
import { restaurantInfo } from '../../data/mockData';

const LocationSection = () => {
  const locationImages = [
    'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800&h=600&fit=crop'
  ];

  return (
    <section id="location" className="py-20 bg-gradient-to-b from-red-50 to-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl lg:text-5xl font-black text-gray-900 mb-6">
              Manchester Location
            </h2>
            <div className="w-24 h-1 bg-red-600 mx-auto mb-6"></div>
            <p className="text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
              Visit us at our Manchester location for an unforgettable dining experience. 
              Our cozy, modern space is perfect for quick bites or leisurely meals with family and friends. 
              Located in the heart of Failsworth, we're easily accessible and ready to serve you the best 
              smashburgers in town. Come hungry, leave happy!
            </p>
          </div>

          {/* Image Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
            {locationImages.map((image, index) => (
              <div
                key={index}
                className="relative overflow-hidden rounded-lg shadow-lg group aspect-square"
              >
                <img
                  src={image}
                  alt={`Location ${index + 1}`}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default LocationSection;
