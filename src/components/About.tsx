import React from 'react';
import { Breadcrumb } from './Breadcrumb';

export function About() {
  return (
    <div className="min-h-screen bg-midnight-blue pt-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <Breadcrumb items={[{ label: 'About', path: '/about' }]} />
        <h1 className="text-4xl font-art-nouveau text-amber-300 mb-8">About Ethereal Visions</h1>
        <div className="bg-deep-purple/30 rounded-lg p-8 mb-8">
          <p className="text-gray-300 mb-4">
            Ethereal Visions is at the forefront of AI-generated art, blending the impossible geometries of Escher 
            with the flowing elegance of Art Nouveau. Our mission is to push the boundaries of digital creativity 
            and explore the limitless possibilities of artificial intelligence in art creation.
          </p>
          <p className="text-gray-300 mb-4">
            Founded in 2024, our team of artists, developers, and AI enthusiasts work tirelessly to create 
            unique, mesmerizing pieces that challenge perception and ignite imagination. We believe in the 
            power of technology to enhance human creativity, not replace it.
          </p>
          <p className="text-gray-300">
            Join us on this exciting journey as we redefine the intersection of art and artificial intelligence, 
            creating a new realm of visual experiences that were once thought impossible.
          </p>
        </div>
      </div>
    </div>
  );
}
