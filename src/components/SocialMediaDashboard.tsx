import React, { useState, useEffect } from 'react';
import { generateContent, getContentSuggestions, schedulePost, getAnalytics, createABTest } from '../services/socialMediaService';
import { Breadcrumb } from './Breadcrumb';

export function SocialMediaDashboard() {
  const [content, setContent] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [scheduledPosts, setScheduledPosts] = useState([]);
  const [analytics, setAnalytics] = useState({});
  const [error, setError] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const suggestionsData = await getContentSuggestions('AI art');
      setSuggestions(suggestionsData);
      const analyticsData = await getAnalytics();
      setAnalytics(analyticsData);
      // Fetch scheduled posts (implement this function in socialMediaService)
      // const scheduledPostsData = await getScheduledPosts();
      // setScheduledPosts(scheduledPostsData);
    } catch (err) {
      setError('Failed to fetch data');
      console.error(err);
    }
  };

  const handleGenerateContent = async () => {
    try {
      const generatedContent = await generateContent('Generate a post about AI art');
      setContent(generatedContent);
    } catch (err) {
      setError('Failed to generate content');
      console.error(err);
    }
  };

  const handleSchedulePost = async () => {
    try {
      await schedulePost(content, 'twitter', new Date());
      setContent('');
      // Refresh scheduled posts
      // const scheduledPostsData = await getScheduledPosts();
      // setScheduledPosts(scheduledPostsData);
    } catch (err) {
      setError('Failed to schedule post');
      console.error(err);
    }
  };

  const handleCreateABTest = async () => {
    try {
      await createABTest(content, 'Alternative content', 'twitter');
      setContent('');
    } catch (err) {
      setError('Failed to create A/B test');
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-midnight-blue pt-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <Breadcrumb items={[{ label: 'Social Media Dashboard', path: '/social-media' }]} />
        <h1 className="text-4xl font-art-nouveau text-amber-300 mb-8">Social Media Dashboard</h1>
        
        {error && <p className="text-red-500 mb-4">{error}</p>}
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-deep-purple/30 p-6 rounded-lg">
            <h2 className="text-2xl text-amber-300 mb-4">Content Generation</h2>
            <button onClick={handleGenerateContent} className="bg-amber-500 text-midnight-blue px-4 py-2 rounded mb-4">Generate Content</button>
            <textarea 
              value={content} 
              onChange={(e) => setContent(e.target.value)} 
              className="w-full h-32 bg-midnight-blue text-gray-100 p-2 rounded"
            />
            <div className="mt-4 space-x-4">
              <button onClick={handleSchedulePost} className="bg-amber-500 text-midnight-blue px-4 py-2 rounded">Schedule Post</button>
              <button onClick={handleCreateABTest} className="bg-amber-500 text-midnight-blue px-4 py-2 rounded">Create A/B Test</button>
            </div>
          </div>
          
          <div className="bg-deep-purple/30 p-6 rounded-lg">
            <h2 className="text-2xl text-amber-300 mb-4">Content Suggestions</h2>
            <ul className="list-disc pl-5 text-gray-100">
              {suggestions.map((suggestion, index) => (
                <li key={index}>{suggestion}</li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className="mt-8 bg-deep-purple/30 p-6 rounded-lg">
          <h2 className="text-2xl text-amber-300 mb-4">Analytics</h2>
          {/* Display analytics data here */}
        </div>
        
        <div className="mt-8 bg-deep-purple/30 p-6 rounded-lg">
          <h2 className="text-2xl text-amber-300 mb-4">Scheduled Posts</h2>
          {/* Display scheduled posts here */}
        </div>
      </div>
    </div>
  );
}
