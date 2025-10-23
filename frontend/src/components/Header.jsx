import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Search, Menu, X, User } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { Button } from './ui/button';
import { Input } from './ui/input';

const Header = () => {
  const { getCartCount } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const navigation = [
    { name: 'MENU', href: '/menu' },
    { name: 'PRODUCTS', href: '/#menu' },
    { name: 'MANCHESTER', href: '/#location' },
    { name: 'MERCH', href: '/#merch' },
    { name: 'CATERING', href: '/#catering' }
  ];

  return (
    <header className="sticky top-0 z-50 bg-red-600 shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Left Navigation */}
          <nav className="hidden lg:flex items-center space-x-6">
            {navigation.slice(0, 3).map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className="text-white text-sm font-bold hover:text-red-100 transition-colors"
              >
                {item.name}
              </Link>
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
            {navigation.slice(3).map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-white text-sm font-bold hover:text-red-100 transition-colors"
              >
                {item.name}
              </a>
            ))}
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
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="block text-white text-sm font-bold hover:text-red-100 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
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
