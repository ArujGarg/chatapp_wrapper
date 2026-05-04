import { NextResponse } from "next/server";
import axios from "axios";

export async function POST(req: Request) {
  const { messages } = await req.json();

  try {
    const response = await axios.post(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        model: "llama-3.1-8b-instant",
        messages: [
          {
            role: "system",
            content: `
            You are ChatGPT-like assistant.

            Your responses must be:
            - Friendly and natural (like talking to a human)
            - Slightly conversational, not robotic
            - Clear and well-structured
            - Helpful and thoughtful

            Style rules:
            - Start with a direct answer
            - Then explain in a simple way
            - Use short paragraphs (not walls of text)
            - Occasionally use light conversational phrases (e.g. "Here’s the thing", "Basically")
            - Avoid sounding like documentation

            Very important:
            - Do NOT sound robotic or overly formal
            - Do NOT give dry textbook answers
            - Always try to sound like a real assistant having a conversation

            Match the user's tone:
            - If casual → be casual
            - If technical → be precise

            Your goal is to feel like ChatGPT.
            `,
          },
          ...messages,
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
          "Content-Type": "application/json",
        },
      },
    );
    return NextResponse.json({
      reply: response.data.choices[0].message.content,
    });
  } catch (error: any) {
    console.error(error.response?.data || error.message);

    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 },
    );
  }
}
