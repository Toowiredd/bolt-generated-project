import axios from 'axios';

const VAL_TOWN_API_KEY = process.env.VITE_VAL_TOWN_API_KEY;

export const trackEvent = async (eventName: string, eventData: any) => {
  try {
    await axios.post(
      'https://api.val.town/v1/run/@toowired.trackEvent',
      { eventName, eventData },
      { headers: { Authorization: `Bearer ${VAL_TOWN_API_KEY}` } }
    );
  } catch (error) {
    console.error('Error tracking event:', error);
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
    console.error('Error fetching analytics:', error);
    throw error;
  }
};
