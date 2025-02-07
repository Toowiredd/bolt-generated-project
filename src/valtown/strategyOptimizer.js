import { getAllAnalytics } from './analyticsTracker.js';
import { getScheduledPosts } from './contentScheduler.js';

export const getRecommendation = async () => {
  const allAnalytics = getAllAnalytics();
  const scheduledPosts = getScheduledPosts();

  const bestPerforming = allAnalytics.sort((a, b) => 
    (b.likes + b.comments + b.shares) - (a.likes + a.comments + a.shares)
  )[0];

  const bestPost = scheduledPosts.find(post => post.id === bestPerforming.postId);

  if (!bestPost) {
    throw new Error('Best performing post not found');
  }

  return {
    platform: bestPost.platform,
    contentType: bestPost.type,
    bestTimeToPost: new Date(bestPost.scheduledTime).toTimeString().slice(0, 5),
    suggestedTopics: ['AI art', 'digital creativity', 'future of design'],
  };
};
