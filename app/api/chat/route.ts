import { NextResponse } from "next/server";
import axios from "axios";

export async function POST(req: Request) {
  const { message } = await req.json();

  try {
    const response = await axios.post(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        model: "llama-3.1-8b-instant",
        messages: [
          {
            role: "system",
            content: "You are a helpful assistant.",
          },
          {
            role: "user",
            content: message,
          },
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
          "Content-Type": "application/json",
        },
      },
    );

    console.log("repsonse ", response);

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
