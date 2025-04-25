import { createOpenAI } from "@ai-sdk/openai"; 
import { generateText } from "ai"

const openai = createOpenAI({
    apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY!,
    compatibility: "strict",
});
export const ai = async (prompt: string): Promise<string> => {
    const { text } = await generateText({
        model: openai('gpt-4'),
        prompt,
    });
    
    if (process.env.NODE_ENV === 'development') {
        console.log("AI Response:", text);
    }
    
    return text;
}