// @ts-ignore
import { db } from "https://esm.sh/@val/db";
import { OpenAI } from "npm:openai@^4.0.0";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export const generateContent = async (prompt) => {
  const completion = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: prompt }],
  });
  return completion.choices[0].message.content;
};

export const getContentSuggestions = async (topic) => {
  const prompt = `Generate 5 content ideas for social media posts about ${topic}`;
  return await generateContent(prompt);
};

export const schedulePost = async (content, platform, scheduledTime) => {
  const id = Date.now().toString();
  await db.set(`post:${id}`, JSON.stringify({ content, platform, scheduledTime }));
  return id;
};

export const getAnalytics = async (postId) => {
  // In a real scenario, this would fetch data from social media APIs
  return {
    likes: Math.floor(Math.random() * 1000),
    shares: Math.floor(Math.random() * 500),
    comments: Math.floor(Math.random() * 200),
  };
};

export const createABTest = async (contentA, contentB, platform) => {
  const id = Date.now().toString();
  await db.set(`abtest:${id}`, JSON.stringify({ contentA, contentB, platform }));
  return id;
};
