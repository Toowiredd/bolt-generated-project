import axios from 'axios';

const VAL_TOWN_API_KEY = process.env.VITE_VAL_TOWN_API_KEY;

export async function getRecommendation(): Promise<any> {
  try {
    const response = await axios.get(
      'https://api.val.town/v1/run/@toowired.getRecommendation',
      { headers: { Authorization: `Bearer ${VAL_TOWN_API_KEY}` } }
    );
    return response.data;
  } catch (error) {
    console.error('Error getting recommendation:', error);
    throw error;
  }
}
