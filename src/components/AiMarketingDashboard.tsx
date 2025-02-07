import React, { useState, useEffect } from 'react';
import { generateContent } from '../services/aiContentGenerator';
import { schedulePost, getScheduledPosts } from '../services/contentScheduler';
import { getAllAnalytics } from '../services/analyticsTracker';
import { getRecommendation } from '../services/strategyOptimizer';
import { Calendar, BarChart2, TrendingUp, PlusCircle, Send } from 'lucide-react';
import { UserProfile } from '../services/authService';
import { Breadcrumb } from './Breadcrumb';

// ... (rest of the component remains the same)

export function AiMarketingDashboard({ user }: AiMarketingDashboardProps) {
  // ... (existing state and logic)

  return (
    <div className="min-h-screen bg-midnight-blue pt-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <Breadcrumb items={[{ label: 'AI Marketing Dashboard', path: '/dashboard' }]} />
        <h1 className="text-4xl font-art-nouveau text-amber-300 mb-8">AI Marketing Dashboard for {user.displayName}</h1>
        {/* ... (rest of the component remains the same) */}
      </div>
    </div>
  );
}
