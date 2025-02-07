import React, { useState, useEffect } from 'react';
import { ShoppingCart, Download, Share2 } from 'lucide-react';
import { useParams } from 'react-router-dom';
import { Breadcrumb } from './Breadcrumb';

interface Artwork {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  artist: string;
  price: number;
  tags: string[];
}

interface LicenseOption {
  name: string;
  price: number;
  description: string;
}

const SAMPLE_ARTWORK: Artwork = {
  id: '1',
  title: 'Ethereal Dreamscape',
  description: 'A mesmerizing blend of Escher-like impossible geometries and flowing Art Nouveau elements, created by our AI.',
  imageUrl: 'https://images.unsplash.com/photo-1614850715649-1d0106293bd1',
  artist: 'AI Artist 001',
  price: 500,
  tags: ['surreal', 'geometric', 'art nouveau']
};

const LICENSE_OPTIONS: LicenseOption[] = [
  { name: 'Personal', price: 50, description: 'Use for personal, non-commercial purposes' },
  { name: 'Commercial', price: 200, description: 'Use for commercial projects and marketing' },
  { name: 'Exclusive', price: 1000, description: 'Exclusive rights to the artwork' }
];

export function ArtworkDetail() {
  const { id } = useParams<{ id: string }>();
  const [artwork, setArtwork] = useState<Artwork | null>(null);
  const [selectedLicense, setSelectedLicense] = useState<LicenseOption | null>(null);

  useEffect(() => {
    // In a real application, fetch the artwork data based on the id
    // For now, we'll use the sample data
    setArtwork(SAMPLE_ARTWORK);
  }, [id]);

  if (!artwork) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-midnight-blue pt-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <Breadcrumb items={[
          { label: 'Gallery', path: '/gallery' },
          { label: artwork.title, path: `/artwork/${id}` }
        ]} />
        <div className="bg-deep-purple/30 rounded-lg overflow-hidden shadow-xl">
          <div className="md:flex">
            <div className="md:flex-shrink-0">
              <img className="h-96 w-full object-cover md:w-96" src={artwork.imageUrl} alt={artwork.title} />
            </div>
            <div className="p-8">
              <h2 className="text-3xl font-art-nouveau text-amber-300 mb-4">{artwork.title}</h2>
              <p className="text-gray-300 mb-4">{artwork.description}</p>
              <p className="text-gray-400 mb-2">Artist: {artwork.artist}</p>
              <p className="text-2xl text-amber-500 mb-4">${artwork.price}</p>
              <div className="mb-6">
                <h3 className="text-xl text-amber-300 mb-2">License Options</h3>
                {LICENSE_OPTIONS.map((option) => (
                  <button
                    key={option.name}
                    onClick={() => setSelectedLicense(option)}
                    className={`block w-full text-left p-3 mb-2 rounded ${
                      selectedLicense === option ? 'bg-amber-500 text-midnight-blue' : 'bg-midnight-blue text-gray-300'
                    }`}
                  >
                    <span className="font-bold">{option.name}</span> - ${option.price}
                    <p className="text-sm">{option.description}</p>
                  </button>
                ))}
              </div>
              <div className="flex space-x-4">
                <button className="flex items-center justify-center px-4 py-2 border border-amber-500 text-amber-500 rounded hover:bg-amber-500 hover:text-midnight-blue transition-colors">
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  Add to Cart
                </button>
                <button className="flex items-center justify-center px-4 py-2 bg-amber-500 text-midnight-blue rounded hover:bg-amber-400 transition-colors">
                  <Download className="w-5 h-5 mr-2" />
                  Download
                </button>
                <button className="flex items-center justify-center px-4 py-2 border border-gray-500 text-gray-500 rounded hover:bg-gray-500 hover:text-midnight-blue transition-colors">
                  <Share2 className="w-5 h-5 mr-2" />
                  Share
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
