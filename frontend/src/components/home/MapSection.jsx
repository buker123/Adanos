import React from 'react';
import { restaurantInfo } from '../../data/mockData';

const MapSection = () => {
  return (
    <section className="py-0 bg-white">
      <div className="w-full h-[500px]">
        <iframe
          src={restaurantInfo.mapUrl}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Adanos Burger Location"
        ></iframe>
      </div>
    </section>
  );
};

export default MapSection;
