import React from 'react';
import { User, Image, Video, Heart, MessageCircle } from 'lucide-react';
import { Breadcrumb } from './Breadcrumb';

// ... (rest of the component remains the same)

export function UserProfile({ username, bio, followers, following, artworks, videos }: UserProfileProps) {
  return (
    <div className="bg-midnight-blue min-h-screen pt-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <Breadcrumb items={[{ label: 'Profile', path: '/profile' }]} />
        {/* ... (rest of the component remains the same) */}
      </div>
    </div>
  );
}
