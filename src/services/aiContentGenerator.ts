import axios from 'axios';

const VAL_TOWN_API_KEY = process.env.VITE_VAL_TOWN_API_KEY;

export async function generateContent(prompt: string, type: 'text' | 'image'): Promise<string> {
  try {
    const response = await axios.post(
      'https://api.val.town/v1/run/@toowired.generateContent',
      { prompt, type },
      { headers: { Authorization: `Bearer ${VAL_TOWN_API_KEY}` } }
    );
    return response.data;
  } catch (error) {
    console.error('Error generating content:', error);
    throw error;
  }
}
