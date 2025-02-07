// @ts-ignore
import { OpenAI } from "npm:openai@^4.0.0";

export const generateContent = async (prompt, type) => {
  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

  if (type === 'text') {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
    });
    return completion.choices[0].message.content;
  } else if (type === 'image') {
    const response = await openai.images.generate({
      model: "dall-e-3",
      prompt: prompt,
      n: 1,
      size: "1024x1024",
    });
    return response.data[0].url;
  }
  throw new Error('Invalid content type');
};
