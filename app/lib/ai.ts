import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! });

export const generateBotReply = async (message: string, leadStatus: string) => {
  const prompt = `
  You are an AI assistant for a real estate agent. 
  Qualify the lead politely and ask relevant questions if needed. 
  Current status: ${leadStatus}.
  Lead said: "${message}".
  Reply in one concise message and add "Reply STOP to unsubscribe" at the end.
  `;

  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [{ role: "system", content: prompt }],
  });

  return response.choices[0].message.content || "Thanks for your message!";
};
