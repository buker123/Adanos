import React from 'react';
import { Badge } from '../ui/badge';

const AboutSection = () => {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Image Side */}
          <div className="relative">
            <div className="relative z-10">
              <img
                src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&h=600&fit=crop"
                alt="Delicious Adanos Burger"
                className="rounded-2xl shadow-2xl w-full h-[400px] object-cover"
              />
            </div>
            {/* Decorative Elements */}
            <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-red-600 rounded-2xl -z-0"></div>
            <div className="absolute -top-6 -left-6 w-32 h-32 bg-yellow-400 rounded-2xl -z-0"></div>
            
            {/* Stats Badge */}
            <div className="absolute bottom-8 left-8 bg-white p-4 rounded-xl shadow-lg z-20">
              <div className="text-center">
                <span className="text-4xl font-black text-red-600">5+</span>
                <p className="text-gray-600 font-medium">Years of Excellence</p>
              </div>
            </div>
          </div>

          {/* Content Side */}
          <div className="lg:pl-8">
            <Badge className="bg-red-100 text-red-600 mb-4">ABOUT US</Badge>
            <h2 className="text-4xl lg:text-5xl font-black text-gray-900 mb-6">
              Manchester's Finest
              <span className="text-red-600"> Halal Smashburgers</span>
            </h2>
            <p className="text-gray-600 text-lg mb-6 leading-relaxed">
              Welcome to Adanos Burger, where passion meets perfection. Located in the heart of Manchester, 
              we've been serving the finest halal smashburgers since day one. Our commitment to quality 
              ingredients and authentic flavors has made us a beloved destination for burger enthusiasts.
            </p>
            <p className="text-gray-600 text-lg mb-8 leading-relaxed">
              Every burger is crafted with 100% halal certified Angus beef, smashed to perfection on our 
              hot griddle, creating that irresistible crispy edge while keeping the inside juicy and flavorful. 
              From our signature Adanos Burger to our mouth-watering Peri Peri Chicken, every bite tells our story.
            </p>

            {/* Features */}
            <div className="grid grid-cols-2 gap-6">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">100% Halal</h4>
                  <p className="text-gray-500 text-sm">Certified ingredients</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">Fresh & Hot</h4>
                  <p className="text-gray-500 text-sm">Made to order</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">Top Rated</h4>
                  <p className="text-gray-500 text-sm">5-star reviews</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">Fast Service</h4>
                  <p className="text-gray-500 text-sm">Quick & efficient</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
