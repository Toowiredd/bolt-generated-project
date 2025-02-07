import OpenAI from 'openai';
import { analyticsTracker } from './analyticsTracker';

const openai = new OpenAI({
  apiKey: process.env.VITE_OPENAI_API_KEY,
});

interface PostData {
  content: string;
  engagement: number;
}

async function getSuccessfulPosts(): Promise<PostData[]> {
  const allAnalytics = analyticsTracker.getAllAnalytics();
  return allAnalytics
    .filter(post => post.likes + post.comments + post.shares > 100)
    .map(post => ({
      content: post.content,
      engagement: post.likes + post.comments + post.shares
    }));
}

async function fineTuneModel() {
  const successfulPosts = await getSuccessfulPosts();
  const trainingData = successfulPosts.map(post => ({
    prompt: "Generate a social media post",
    completion: post.content
  }));

  const file = await openai.files.create({
    file: Buffer.from(JSON.stringify(trainingData)),
    purpose: 'fine-tune'
  });

  const fineTune = await openai.fineTunes.create({
    training_file: file.id,
    model: 'gpt-3.5-turbo'
  });

  return fineTune.id;
}

let fineTunedModelId: string | null = null;

export async function generateEnhancedContent(prompt: string, type: 'text' | 'image'): Promise<string> {
  if (!fineTunedModelId) {
    fineTunedModelId = await fineTuneModel();
  }

  try {
    if (type === 'text') {
      const completion = await openai.chat.completions.create({
        model: fineTunedModelId,
        messages: [{ role: "user", content: prompt }],
      });
      return completion.choices[0].message.content || '';
    } else {
      const response = await openai.images.generate({
        model: "dall-e-3",
        prompt: prompt,
        n: 1,
        size: "1024x1024",
      });
      return response.data[0].url || '';
    }
  } catch (error) {
    console.error('Error generating enhanced content:', error);
    throw error;
  }
}
