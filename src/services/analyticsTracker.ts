import axios from 'axios';

const VAL_TOWN_API_KEY = process.env.VITE_VAL_TOWN_API_KEY;

export async function trackPost(postId: string): Promise<void> {
  try {
    await axios.post(
      'https://api.val.town/v1/run/@toowired.trackPost',
      { postId },
      { headers: { Authorization: `Bearer ${VAL_TOWN_API_KEY}` } }
    );
  } catch (error) {
    console.error('Error tracking post:', error);
    throw error;
  }
}

export async function updateAnalytics(postId: string, metric: string, value: number): Promise<void> {
  try {
    await axios.post(
      'https://api.val.town/v1/run/@toowired.updateAnalytics',
      { postId, metric, value },
      { headers: { Authorization: `Bearer ${VAL_TOWN_API_KEY}` } }
    );
  } catch (error) {
    console.error('Error updating analytics:', error);
    throw error;
  }
}

export async function getAllAnalytics(): Promise<any[]> {
  try {
    const response = await axios.get(
      'https://api.val.town/v1/run/@toowired.getAllAnalytics',
      { headers: { Authorization: `Bearer ${VAL_TOWN_API_KEY}` } }
    );
    return response.data;
  } catch (error) {
    console.error('Error getting all analytics:', error);
    throw error;
  }
}
