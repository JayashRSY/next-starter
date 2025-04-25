import { ai } from '@/lib/ai';
import createCCPrompt from '@/utils/createCCPrompt';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    try {
        const prompt = createCCPrompt(await req.json());
        const response = await ai(prompt);
        const parsed = JSON.parse(response);
        return NextResponse.json(parsed);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
        return NextResponse.json(
            {
                error: 'Gemini response failed',
                details: err.message,
            },
            { status: 500 }
        );
    }
}
