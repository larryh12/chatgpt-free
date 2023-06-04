import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_SECRET,
});

const openai = new OpenAIApi(configuration);

export default openai;
