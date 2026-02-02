import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, Search, Menu, X, User, ChevronDown } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { Button } from './ui/button';
import { Input } from './ui/input';

const Header = () => {
  const { getCartCount } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [menuDropdownOpen, setMenuDropdownOpen] = useState(false);
  const [mobileMenuDropdownOpen, setMobileMenuDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const menuCategories = [
    { name: 'Beef Burgers', href: '/menu?category=beef-burgers' },
    { name: 'Chicken Burgers', href: '/menu?category=chicken-burgers' },
    { name: 'Box Meals', href: '/menu?category=box-meals' },
    { name: 'Light Meals', href: '/menu?category=light-meals' },
    { name: 'Loaded Chips', href: '/menu?category=loaded-chips' },
    { name: 'Adanos Grilled', href: '/menu?category=adanos-grilled' },
    { name: 'Sides', href: '/menu?category=sides' },
    { name: 'Kids Meals', href: '/menu?category=kids-meals' },
    { name: 'Milkshakes', href: '/menu?category=milkshakes' },
    { name: 'Smoothies', href: '/menu?category=smoothies' },
    { name: 'Ice Cream', href: '/menu?category=ice-cream' },
    { name: 'Waffles', href: '/menu?category=waffles' },
    { name: 'Desserts', href: '/menu?category=desserts' },
  ];

  const navigation = [
    { name: 'ABOUT', href: '#about' },
    { name: 'FIND US', href: '#location' }
  ];

  const handleNavClick = (e, href) => {
    e.preventDefault();
    if (href.startsWith('#')) {
      // If we're not on the home page, navigate there first
      if (window.location.pathname !== '/') {
        navigate('/');
        setTimeout(() => {
          const element = document.getElementById(href.substring(1));
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        }, 100);
      } else {
        const element = document.getElementById(href.substring(1));
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-red-600 shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Left Navigation */}
          <nav className="hidden lg:flex items-center space-x-6">
            {/* Menu Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => setMenuDropdownOpen(true)}
              onMouseLeave={() => setMenuDropdownOpen(false)}
            >
              <Link
                to="/menu"
                className="text-white text-sm font-bold hover:text-red-100 transition-colors flex items-center gap-1"
              >
                MENU
                <ChevronDown className={`h-4 w-4 transition-transform ${menuDropdownOpen ? 'rotate-180' : ''}`} />
              </Link>
              
              {/* Dropdown Menu */}
              {menuDropdownOpen && (
                <div className="absolute top-full left-0 mt-1 w-48 bg-white rounded-lg shadow-lg py-2 z-50">
                  {menuCategories.map((category) => (
                    <Link
                      key={category.name}
                      to={category.href}
                      className="block px-4 py-2 text-gray-700 hover:bg-red-50 hover:text-red-600 font-medium transition-colors"
                      onClick={() => setMenuDropdownOpen(false)}
                    >
                      {category.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
            
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className="text-white text-sm font-bold hover:text-red-100 transition-colors cursor-pointer"
              >
                {item.name}
              </a>
            ))}
          </nav>

          {/* Logo */}
          <Link to="/" className="flex items-center">
            <div className="bg-white px-6 py-2 rounded-full">
              <h1 className="text-red-600 text-xl font-black tracking-tight">ADANOS BURGER</h1>
            </div>
          </Link>

          {/* Right Navigation */}
          <div className="hidden lg:flex items-center space-x-6">
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="text-white hover:text-red-100 transition-colors"
            >
              <Search className="h-5 w-5" />
            </button>
            <Link to="/signin" className="text-white hover:text-red-100 transition-colors">
              <User className="h-5 w-5" />
            </Link>
            <Link to="/cart" className="relative text-white hover:text-red-100 transition-colors">
              <ShoppingCart className="h-5 w-5" />
              {getCartCount() > 0 && (
                <span className="absolute -top-2 -right-2 bg-white text-red-600 text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {getCartCount()}
                </span>
              )}
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden text-white"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Search Bar */}
        {searchOpen && (
          <div className="py-3 border-t border-red-500">
            <Input
              type="search"
              placeholder="Search for burgers, sides, drinks..."
              className="w-full max-w-md mx-auto"
            />
          </div>
        )}
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-red-700 border-t border-red-500">
          <nav className="container mx-auto px-4 py-4 space-y-3">
            {/* Mobile Menu Dropdown */}
            <div>
              <button
                onClick={() => setMobileMenuDropdownOpen(!mobileMenuDropdownOpen)}
                className="flex items-center justify-between w-full text-white text-sm font-bold hover:text-red-100 transition-colors"
              >
                MENU
                <ChevronDown className={`h-4 w-4 transition-transform ${mobileMenuDropdownOpen ? 'rotate-180' : ''}`} />
              </button>
              {mobileMenuDropdownOpen && (
                <div className="mt-2 ml-4 space-y-2">
                  {menuCategories.map((category) => (
                    <Link
                      key={category.name}
                      to={category.href}
                      className="block text-red-100 text-sm font-medium hover:text-white transition-colors"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {category.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
            
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="block text-white text-sm font-bold hover:text-red-100 transition-colors cursor-pointer"
                onClick={(e) => {
                  handleNavClick(e, item.href);
                  setMobileMenuOpen(false);
                }}
              >
                {item.name}
              </a>
            ))}
            <Link
              to="/signin"
              className="block text-white text-sm font-bold hover:text-red-100 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              SIGN IN / REGISTER
            </Link>
            <Link
              to="/cart"
              className="block text-white text-sm font-bold hover:text-red-100 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              CART ({getCartCount()})
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
