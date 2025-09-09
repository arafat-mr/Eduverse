import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";


async function safeGenerate(model, message, retries = 3) {
  for (let i = 0; i < retries; i++) {
    try {
      const result = await model.generateContent(message);
      return result.response.text();
    } catch (err) {
      console.error(`Gemini attempt ${i + 1} failed:`, err.message);
      if (i === retries - 1) throw err;
      await new Promise(r => setTimeout(r, 1000 * (i + 1)));
    }
  }
}

export async function POST(req) {
  try {
    const { message } = await req.json();

    if (!message) {
      return NextResponse.json({ error: "No message provided" }, { status: 400 });
    }

  
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

  
    let model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    let reply;

    try {
      reply = await safeGenerate(model, message);
    } catch (flashError) {
      console.warn(" Flash overloaded, switching to Pro...");

      model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });
      reply = await safeGenerate(model, message);
    }

    return NextResponse.json({ reply });
  } catch (error) {
    console.error("Gemini Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
