import React, { useState, useEffect } from 'react';
import { Search, Filter, Play, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Breadcrumb } from './Breadcrumb';

interface Video {
  id: string;
  title: string;
  thumbnailUrl: string;
  duration: string;
  views: number;
}

const SAMPLE_VIDEOS: Video[] = [
  {
    id: '1',
    title: 'Ethereal Dreamscapes in Motion',
    thumbnailUrl: 'https://images.unsplash.com/photo-1518495973542-4542c06a5843',
    duration: '3:45',
    views: 1200
  },
  {
    id: '2',
    title: 'Geometric Illusions Animated',
    thumbnailUrl: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f',
    duration: '2:30',
    views: 980
  },
  {
    id: '3',
    title: 'Art Nouveau Patterns in AI',
    thumbnailUrl: 'https://images.unsplash.com/photo-1605721911519-3dfeb3be25e7',
    duration: '4:15',
    views: 1500
  },
  // Add more sample videos as needed
];

export function Gallery() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    // In a real application, fetch videos from an API
    setVideos(SAMPLE_VIDEOS);
  }, []);

  const filteredVideos = videos.filter(video =>
    video.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-midnight-blue pt-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto mb-12">
        <Breadcrumb items={[{ label: 'Gallery', path: '/gallery' }]} />
        <h1 className="text-4xl font-art-nouveau text-amber-300 mb-6 text-center">
          AI-Generated Video Gallery
        </h1>
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8">
          <div className="relative w-full sm:w-64 mb-4 sm:mb-0">
            <input
              type="text"
              placeholder="Search videos..."
              className="w-full pl-10 pr-4 py-2 bg-deep-purple/30 border border-amber-500/30 rounded-lg focus:border-amber-500 focus:ring-1 focus:ring-amber-500 text-gray-100"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
          <div className="flex items-center">
            <Filter className="w-5 h-5 text-gray-400 mr-2" />
            <select
              className="bg-deep-purple/30 border border-amber-500/30 rounded-lg px-3 py-2 text-gray-100 focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              <option value="all">All Videos</option>
              <option value="recent">Most Recent</option>
              <option value="popular">Most Popular</option>
            </select>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredVideos.map((video) => (
            <Link key={video.id} to={`/video/${video.id}`} className="bg-deep-purple/30 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
              <div className="relative">
                <img src={video.thumbnailUrl} alt={video.title} className="w-full h-48 object-cover" />
                <div className="absolute bottom-2 right-2 bg-black/70 text-white px-2 py-1 rounded flex items-center">
                  <Clock className="w-4 h-4 mr-1" />
                  <span>{video.duration}</span>
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold text-amber-300 mb-2">{video.title}</h3>
                <div className="flex justify-between text-gray-400">
                  <span className="flex items-center">
                    <Play className="w-4 h-4 mr-1" />
                    {video.views} views
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
