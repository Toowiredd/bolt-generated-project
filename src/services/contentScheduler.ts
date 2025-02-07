import axios from 'axios';

const VAL_TOWN_API_KEY = process.env.VITE_VAL_TOWN_API_KEY;

export async function schedulePost(content: string, type: 'text' | 'image', platform: 'twitter' | 'instagram' | 'facebook', scheduledTime: Date): Promise<any> {
  try {
    const response = await axios.post(
      'https://api.val.town/v1/run/@toowired.schedulePost',
      { content, type, platform, scheduledTime },
      { headers: { Authorization: `Bearer ${VAL_TOWN_API_KEY}` } }
    );
    return response.data;
  } catch (error) {
    console.error('Error scheduling post:', error);
    throw error;
  }
}

export async function getScheduledPosts(): Promise<any[]> {
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
}
