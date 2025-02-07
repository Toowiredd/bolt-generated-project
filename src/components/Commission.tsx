import React from 'react';
import { VideoUpload } from './VideoUpload';
import { Palette, Clock, MessageSquare, Sparkles } from 'lucide-react';
import { Breadcrumb } from './Breadcrumb';

export function Commission() {
  return (
    <div className="min-h-screen bg-midnight-blue pt-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <Breadcrumb items={[{ label: 'Commission', path: '/commission' }]} />
        {/* ... (rest of the component remains the same) */}
      </div>
    </div>
  );
}
