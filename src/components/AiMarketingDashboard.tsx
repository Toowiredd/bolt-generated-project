import React from 'react';
import { type UserProfile } from '../services/authService';
import { Breadcrumb } from './Breadcrumb';

interface AiMarketingDashboardProps {
  user: UserProfile;
}

export function AiMarketingDashboard({ user }: AiMarketingDashboardProps) {
  return (
    <div className="min-h-screen bg-midnight-blue pt-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <Breadcrumb items={[{ label: 'AI Marketing Dashboard', path: '/dashboard' }]} />
        <h1 className="text-4xl font-art-nouveau text-amber-300 mb-8">AI Marketing Dashboard for {user.displayName}</h1>
        <div className="bg-deep-purple/30 p-8 rounded-lg shadow-lg">
          <p className="text-gray-300 text-lg">
            Welcome to the AI Marketing Dashboard. This feature is currently under development.
          </p>
        </div>
      </div>
    </div>
  );
}
