import React from 'react';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import { restaurantInfo } from '../../data/mockData';

const ContactSection = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-white to-red-50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl lg:text-5xl font-black text-gray-900 mb-4">
              Where to Find Us
            </h2>
            <div className="w-24 h-1 bg-red-600 mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Address */}
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 border-2 border-red-100">
              <div className="flex items-start space-x-4">
                <div className="bg-red-100 p-4 rounded-full">
                  <MapPin className="h-6 w-6 text-red-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Address</h3>
                  <p className="text-gray-600 leading-relaxed">
                    {restaurantInfo.address}
                  </p>
                </div>
              </div>
            </div>

            {/* Phone */}
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 border-2 border-red-100">
              <div className="flex items-start space-x-4">
                <div className="bg-red-100 p-4 rounded-full">
                  <Phone className="h-6 w-6 text-red-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Phone</h3>
                  <a
                    href={`tel:${restaurantInfo.phone}`}
                    className="text-gray-600 hover:text-red-600 transition-colors text-lg font-semibold"
                  >
                    {restaurantInfo.phone}
                  </a>
                </div>
              </div>
            </div>

            {/* Email */}
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 border-2 border-red-100">
              <div className="flex items-start space-x-4">
                <div className="bg-red-100 p-4 rounded-full">
                  <Mail className="h-6 w-6 text-red-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Email</h3>
                  <a
                    href={`mailto:${restaurantInfo.email}`}
                    className="text-gray-600 hover:text-red-600 transition-colors break-all"
                  >
                    {restaurantInfo.email}
                  </a>
                </div>
              </div>
            </div>

            {/* Hours */}
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 border-2 border-red-100">
              <div className="flex items-start space-x-4">
                <div className="bg-red-100 p-4 rounded-full">
                  <Clock className="h-6 w-6 text-red-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Hours</h3>
                  <div className="text-gray-600 space-y-1">
                    <p className="font-semibold">Mon-Fri:</p>
                    <p>{restaurantInfo.hours.weekday}</p>
                    <p className="font-semibold mt-2">Sat-Sun:</p>
                    <p>{restaurantInfo.hours.weekend}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
