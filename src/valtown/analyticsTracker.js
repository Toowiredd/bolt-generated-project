let analytics = new Map();

export const trackPost = (postId) => {
  analytics.set(postId, {
    postId,
    likes: 0,
    comments: 0,
    shares: 0,
    impressions: 0,
  });
};

export const updateAnalytics = (postId, metric, value) => {
  const postAnalytics = analytics.get(postId);
  if (postAnalytics) {
    postAnalytics[metric] += value;
    analytics.set(postId, postAnalytics);
  }
};

export const getAnalytics = (postId) => analytics.get(postId);

export const getAllAnalytics = () => Array.from(analytics.values());
