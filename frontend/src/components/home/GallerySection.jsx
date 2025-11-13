import React from 'react';
import { galleryImages, restaurantInfo } from '../../data/mockData';
import { Instagram } from 'lucide-react';

const GallerySection = () => {
  const handleInstagramClick = (e) => {
    e.preventDefault();
    // Open Instagram in a new window with specific parameters to avoid blocking
    window.open(restaurantInfo.social.instagram, '_blank', 'noopener,noreferrer');
  };

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl lg:text-5xl font-black text-gray-900 mb-4">
            Follow Us
          </h2>
          <p className="text-xl text-gray-600 mb-6">
            Tag us @adanosburger and show off your burger moments!
          </p>
          <div className="w-24 h-1 bg-red-600 mx-auto"></div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {galleryImages.map((image, index) => (
            <div
              key={index}
              onClick={handleInstagramClick}
              className="relative overflow-hidden rounded-lg shadow-lg group aspect-square cursor-pointer block"
            >
              <img
                src={image}
                alt={`Gallery ${index + 1}`}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <div className="bg-white/90 p-3 rounded-full transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  <Instagram className="h-6 w-6 text-red-600" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GallerySection;
