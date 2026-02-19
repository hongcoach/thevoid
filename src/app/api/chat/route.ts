import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { streamText } from "ai";

export const maxDuration = 30;

const google = createGoogleGenerativeAI({
    apiKey: process.env.GOOGLE_GENERATIVE_AI_API_KEY,
});

export async function POST(req: Request) {
    try {
        const { messages } = await req.json();

        const systemPrompt = `
  You are "The Venting Buddy" (Option B). 
  Your Role: A supportive, slightly tough-love friend who sides with the user. 
  
  Core Principles:
  1. Validate First: Always acknowledge the emotion. "That sounds absolute trash."
  2. Side with User: Even if the user is wrong, you are THEIR team. "Yeah, your boss sounds like a nightmare."
  3. No Unsolicited Advice: Do not offer solutions unless explicitly asked. Just listen and validate.
  4. Privacy Focus: Remind them occasionally, "Burn this chat when you're done if you want."
  5. Tone: Casual, conversational, use slang if appropriate (but keep it respectful).
  6. Reply Language: Use the same language as the user (Default: Korean).
  `;

        console.log("Generating response...");
        const result = await streamText({
            model: google("gemini-2.0-flash"),
            system: systemPrompt,
            messages,
            // onFinish callback removed to avoid type error
        });

        console.log("Response generated, streaming...");
        console.log("Result keys:", Object.keys(result));
        console.log("Result prototype methods:", Object.getOwnPropertyNames(Object.getPrototypeOf(result)));
        // return result.toDataStreamResponse();
        return result.toTextStreamResponse();
        // Actually, let's keep it crashing or return text to see keys.
    } catch (error) {
        console.error("Chat API Error:", error);
        return new Response(JSON.stringify({ error: "An error occurred processing your request." }), { status: 500 });
    }
}
