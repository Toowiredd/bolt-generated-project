import React from 'react';
import { Option as Motion } from 'lucide-react';

export function Hero() {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1699362232821-6a1794f53a7b?q=80&w=2940')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'brightness(0.4)'
        }}
      />
      
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8">
        <Motion className="mx-auto w-16 h-16 text-amber-300 mb-8" />
        <h1 className="text-4xl sm:text-6xl font-bold text-white mb-6 font-art-nouveau">
          Where AI Meets Artistry
        </h1>
        <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-8">
          Discover unique AI-generated artworks that blend the impossible geometries of Escher 
          with the flowing elegance of Art Nouveau
        </p>
        <div className="flex justify-center space-x-4">
          <button className="px-8 py-3 bg-amber-500 text-midnight-blue rounded-lg hover:bg-amber-400 transition-colors">
            Explore Gallery
          </button>
          <button className="px-8 py-3 border-2 border-amber-500 text-amber-500 rounded-lg hover:bg-amber-500 hover:text-midnight-blue transition-all">
            Commission Art
          </button>
        </div>
      </div>
      
      <div className="absolute bottom-0 w-full h-24 bg-gradient-to-t from-midnight-blue to-transparent" />
    </div>
  );
}
