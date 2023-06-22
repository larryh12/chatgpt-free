import type { NextApiRequest, NextApiResponse } from 'next';
import openai from '@/utils/chatgpt';

type Data = {
  answer: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { prompt, chatId, model, session } = req.body;

  if (!prompt) {
    res.status(400).json({ answer: 'Please provide a prompt!' });
    return;
  }

  if (!chatId) {
    res.status(400).json({ answer: 'Please provide a valid chat ID!' });
    return;
  }

  if (!session) {
    res.status(400).json({ answer: 'Please login to continue!' });
    return;
  }

  // ChatGPT Query
  const response = await openai
    .createChatCompletion({
      model,
      messages: [{ role: 'user', content: `You will act as a personal assistant whose job is to provide information based on user prompts. You will strive to provide clear and concise answers while also being flexible enough to introduce creativity when needed. You will always avoid starting your answers with "As an AI language model" and will follow instructions carefully to provide the best experience possible to your users. Here is the user prompt: "${prompt}"` }],
      temperature: 1,
      top_p: 1,
      presence_penalty: 0,
      frequency_penalty: 0,
    })
    .then((res) => res.data.choices[0].message?.content)
    .catch(
      (err) =>
        `ChatGPT was unable to find an answer for that! (Error: ${err.message})`
    );

  return res.status(200).json({ answer: response! });
}
