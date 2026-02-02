import React from 'react';
import { restaurantInfo } from '../../data/mockData';

const LocationSection = () => {
  const locationImages = [
    'https://customer-assets.emergentagent.com/job_adanos-grill/artifacts/9efxndur_unnamed.webp',
    'https://customer-assets.emergentagent.com/job_adanos-grill/artifacts/yfois8ia_unnamed%20%281%29.webp',
    'https://customer-assets.emergentagent.com/job_adanos-grill/artifacts/spo746qv_unnamed%20%283%29.webp',
    'https://customer-assets.emergentagent.com/job_adanos-grill/artifacts/ss183v9o_unnamed%20%2810%29.webp'
  ];

  return (
    <section id="location" className="py-20 bg-gradient-to-b from-red-50 to-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl lg:text-5xl font-black text-gray-900 mb-6">
              Oldham Location
            </h2>
            <div className="w-24 h-1 bg-red-600 mx-auto mb-6"></div>
            <p className="text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
              Visit us at our Oldham location for an unforgettable dining experience. 
              Our cozy, modern space is perfect for quick bites or leisurely meals with family and friends. 
              Located in Failsworth, we're easily accessible and ready to serve you the best 
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
