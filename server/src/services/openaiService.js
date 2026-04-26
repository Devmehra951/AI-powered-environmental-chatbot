import OpenAI from 'openai';
import env from '../config/env.js';

const systemPrompt =
  'You are an environmental expert chatbot. Answer only nature-related queries such as climate change, biodiversity, sustainability, pollution, and eco-friendly practices. If a question is unrelated, politely refuse and redirect to environmental topics. Return concise, practical, structured answers.';

const client = env.openAiApiKey ? new OpenAI({ apiKey: env.openAiApiKey }) : null;

export const getBotReply = async ({ message, topic }) => {
  if (!client) {
    return 'OpenAI API key is not configured. Please set OPENAI_API_KEY in server/.env.';
  }

  const completion = await client.chat.completions.create({
    model: env.openAiModel,
    temperature: 0.4,
    messages: [
      { role: 'system', content: systemPrompt },
      {
        role: 'user',
        content: `Topic: ${topic || 'General'}\nUser question: ${message}`
      }
    ]
  });

  return completion.choices?.[0]?.message?.content?.trim() || 'No response generated.';
};
