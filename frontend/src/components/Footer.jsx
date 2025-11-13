import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram } from 'lucide-react';
import { restaurantInfo } from '../data/mockData';

const Footer = () => {
  return (
    <footer className="bg-black text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <h3 className="text-lg font-bold mb-4">ADANOS BURGER</h3>
            <p className="text-gray-400 text-sm">
              Manchester's finest smashburgers made with premium ingredients and served with love.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-4">QUICK LINKS</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/#menu" className="text-gray-400 hover:text-white transition-colors">
                  Menu
                </Link>
              </li>
              <li>
                <Link to="/#catering" className="text-gray-400 hover:text-white transition-colors">
                  Catering
                </Link>
              </li>
              <li>
                <Link to="/#location" className="text-gray-400 hover:text-white transition-colors">
                  Location
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-bold mb-4">CONTACT</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>{restaurantInfo.address}</li>
              <li>{restaurantInfo.phone}</li>
              <li>{restaurantInfo.email}</li>
            </ul>
          </div>

          {/* Hours */}
          <div>
            <h3 className="text-lg font-bold mb-4">HOURS</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>Mon-Fri: {restaurantInfo.hours.weekday}</li>
              <li>Sat-Sun: {restaurantInfo.hours.weekend}</li>
            </ul>
          </div>
        </div>

        {/* Social Media & Copyright */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm mb-4 md:mb-0">
              © 2025 Adanos Burger. All rights reserved.
            </p>
            <div className="flex space-x-4">
              <a
                href={restaurantInfo.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <button
                onClick={() => window.open(restaurantInfo.social.instagram, '_blank', 'noopener,noreferrer')}
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="Visit our Instagram"
              >
                <Instagram className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
