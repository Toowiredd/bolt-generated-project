import React from 'react';
import { ShoppingCart, User, Search } from 'lucide-react';

export function Header() {
  return (
    <header className="fixed top-0 w-full bg-opacity-95 bg-midnight-blue z-50 backdrop-blur-sm">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <h1 className="text-2xl font-art-nouveau bg-gradient-to-r from-amber-300 to-amber-500 bg-clip-text text-transparent">
              Ethereal Visions
            </h1>
          </div>
          
          <div className="flex items-center space-x-8">
            <div className="hidden md:flex space-x-6">
              <a href="#gallery" className="text-gray-300 hover:text-amber-300 transition-colors">Gallery</a>
              <a href="#commission" className="text-gray-300 hover:text-amber-300 transition-colors">Commission</a>
              <a href="#about" className="text-gray-300 hover:text-amber-300 transition-colors">About</a>
            </div>
            
            <div className="flex items-center space-x-4">
              <button className="text-gray-300 hover:text-amber-300 transition-colors">
                <Search size={24} />
              </button>
              <button className="text-gray-300 hover:text-amber-300 transition-colors">
                <ShoppingCart size={24} />
              </button>
              <button className="text-gray-300 hover:text-amber-300 transition-colors">
                <User size={24} />
              </button>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
