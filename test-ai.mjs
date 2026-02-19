
import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { streamText } from "ai";

const apiKey = "AIzaSyDETpaMSoccBrKJ0F3YoaITtVCBS8LOG-M"; // Hardcoded for test

const google = createGoogleGenerativeAI({
    apiKey: apiKey,
});

async function main() {
    console.log("Starting test...");
    try {
        const result = await streamText({
            model: google("gemini-1.5-flash-001"),
            prompt: "Hello, are you there?",
        });

        console.log("Result keys:", Object.keys(result));
        // Check if toDataStreamResponse exists
        console.log("Has toDataStreamResponse:", typeof result.toDataStreamResponse);
        console.log("Has toTextStreamResponse:", typeof result.toTextStreamResponse);

        console.log("Stream started...");
        let fullText = "";
        for await (const chunk of result.textStream) {
            console.log("Chunk:", JSON.stringify(chunk));
            fullText += chunk;
        }
        console.log("Stream finished.");
        console.log("Full Text:", fullText);

        console.log("Finish Reason:", await result.finishReason);
        console.log("Usage:", await result.usage);

        console.log("\nDone");
    } catch (e) {
        console.error("Error:", e);
    }
}

main();
