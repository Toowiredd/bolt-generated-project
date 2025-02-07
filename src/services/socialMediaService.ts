import axios from 'axios';

const VAL_TOWN_API_KEY = process.env.VITE_VAL_TOWN_API_KEY;

export const generateContent = async (prompt: string) => {
  try {
    const response = await axios.post(
      'https://api.val.town/v1/run/@toowired.generateContent',
      { prompt },
      { headers: { Authorization: `Bearer ${VAL_TOWN_API_KEY}` } }
    );
    return response.data;
  } catch (error) {
    console.error('Error generating content:', error);
    throw error;
  }
};

export const getContentSuggestions = async (topic: string) => {
  try {
    const response = await axios.get(
      `https://api.val.town/v1/run/@toowired.getContentSuggestions?topic=${encodeURIComponent(topic)}`,
      { headers: { Authorization: `Bearer ${VAL_TOWN_API_KEY}` } }
    );
    return response.data;
  } catch (error) {
    console.error('Error getting content suggestions:', error);
    throw error;
  }
};

export const schedulePost = async (content: string, platform: string, scheduledTime: Date) => {
  try {
    const response = await axios.post(
      'https://api.val.town/v1/run/@toowired.schedulePost',
      { content, platform, scheduledTime },
      { headers: { Authorization: `Bearer ${VAL_TOWN_API_KEY}` } }
    );
    return response.data;
  } catch (error) {
    console.error('Error scheduling post:', error);
    throw error;
  }
};

export const getAnalytics = async () => {
  try {
    const response = await axios.get(
      'https://api.val.town/v1/run/@toowired.getAnalytics',
      { headers: { Authorization: `Bearer ${VAL_TOWN_API_KEY}` } }
    );
    return response.data;
  } catch (error) {
    console.error('Error getting analytics:', error);
    throw error;
  }
};

export const createABTest = async (contentA: string, contentB: string, platform: string) => {
  try {
    const response = await axios.post(
      'https://api.val.town/v1/run/@toowired.createABTest',
      { contentA, contentB, platform },
      { headers: { Authorization: `Bearer ${VAL_TOWN_API_KEY}` } }
    );
    return response.data;
  } catch (error) {
    console.error('Error creating A/B test:', error);
    throw error;
  }
};

export const getScheduledPosts = async () => {
  try {
    const response = await axios.get(
      'https://api.val.town/v1/run/@toowired.getScheduledPosts',
      { headers: { Authorization: `Bearer ${VAL_TOWN_API_KEY}` } }
    );
    return response.data;
  } catch (error) {
    console.error('Error getting scheduled posts:', error);
    throw error;
  }
};
