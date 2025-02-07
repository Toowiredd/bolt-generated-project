import React, { useState, useEffect } from 'react';
import { Share2, ThumbsUp, MessageCircle, Bookmark } from 'lucide-react';
import { useParams } from 'react-router-dom';
import { Breadcrumb } from './Breadcrumb';

interface Video {
  id: string;
  title: string;
  description: string;
  videoUrl: string;
  views: number;
  likes: number;
  comments: number;
}

const SAMPLE_VIDEO: Video = {
  id: '1',
  title: 'Ethereal Dreamscapes in Motion',
  description: 'Experience a mesmerizing journey through AI-generated landscapes that blend impossible geometries with flowing Art Nouveau elements.',
  videoUrl: 'https://example.com/video1.mp4', // Replace with an actual video URL
  views: 1500,
  likes: 120,
  comments: 45
};

export function VideoDetail() {
  const { id } = useParams<{ id: string }>();
  const [video, setVideo] = useState<Video | null>(null);
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);

  useEffect(() => {
    // In a real application, fetch the video data based on the id
    // For now, we'll use the sample data
    setVideo(SAMPLE_VIDEO);
  }, [id]);

  if (!video) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-midnight-blue pt-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <Breadcrumb items={[
          { label: 'Gallery', path: '/gallery' },
          { label: video.title, path: `/video/${id}` }
        ]} />
        <div className="bg-deep-purple/30 rounded-lg overflow-hidden shadow-xl">
          <div className="aspect-w-16 aspect-h-9">
            <video
              className="w-full h-full object-cover"
              controls
              poster="https://images.unsplash.com/photo-1518495973542-4542c06a5843"
            >
              <source src={video.videoUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
          <div className="p-6">
            <h1 className="text-3xl font-art-nouveau text-amber-300 mb-4">{video.title}</h1>
            <p className="text-gray-300 mb-4">{video.description}</p>
            <div className="flex justify-between items-center mb-6">
              <div className="flex space-x-4 text-gray-400">
                <span>{video.views} views</span>
                <span>{video.likes} likes</span>
                <span>{video.comments} comments</span>
              </div>
              <div className="flex space-x-4">
                <button
                  onClick={() => setIsLiked(!isLiked)}
                  className={`flex items-center ${isLiked ? 'text-amber-500' : 'text-gray-400'} hover:text-amber-500`}
                >
                  <ThumbsUp className="w-5 h-5 mr-1" />
                  Like
                </button>
                <button className="flex items-center text-gray-400 hover:text-amber-500">
                  <MessageCircle className="w-5 h-5 mr-1" />
                  Comment
                </button>
                <button className="flex items-center text-gray-400 hover:text-amber-500">
                  <Share2 className="w-5 h-5 mr-1" />
                  Share
                </button>
                <button
                  onClick={() => setIsBookmarked(!isBookmarked)}
                  className={`flex items-center ${isBookmarked ? 'text-amber-500' : 'text-gray-400'} hover:text-amber-500`}
                >
                  <Bookmark className="w-5 h-5 mr-1" />
                  Save
                </button>
              </div>
            </div>
            <div className="border-t border-gray-700 pt-6">
              <h2 className="text-xl text-amber-300 mb-4">Comments</h2>
              {/* Add comment section here */}
              <p className="text-gray-400">Comments are coming soon!</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
