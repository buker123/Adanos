import React from 'react';
import { Beef, Flame, Bell, CheckCircle } from 'lucide-react';

const FeatureBoxes = () => {
  const features = [
    {
      icon: Beef,
      title: 'Meat, Fries and No Fillers',
      description: 'Premium ingredients, no shortcuts. Just pure quality in every bite.'
    },
    {
      icon: Flame,
      title: 'Hand-Slaughtered Halal',
      description: 'Fresh, halal-certified meat prepared with care and respect.'
    },
    {
      icon: Bell,
      title: 'Subscribe to Order',
      description: 'Stay updated with exclusive deals and new menu items.'
    },
    {
      icon: CheckCircle,
      title: 'Time Published and Verified',
      description: 'Accurate wait times, real-time order tracking, always reliable.'
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-b from-white to-red-50">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="bg-red-600 text-white p-8 rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 group"
              >
                <div className="flex justify-center mb-4">
                  <div className="bg-white/20 p-4 rounded-full group-hover:scale-110 transition-transform duration-300">
                    <Icon className="h-8 w-8" />
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-3 text-center">
                  {feature.title}
                </h3>
                <p className="text-white/90 text-sm text-center leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FeatureBoxes;
