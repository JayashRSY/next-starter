import { ai } from '@/lib/ai';
import createCCPrompt from '@/utils/createCCPrompt';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        
        // Validate input
        if (!body.amount || !body.platform || !body.category || !body.selectedCards) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            );
        }

        const prompt = createCCPrompt(body);
        const response = await ai(prompt);
        
        try {
            const parsed = JSON.parse(response);
            return NextResponse.json(parsed);
        } catch (parseError) {
            return NextResponse.json(
                { error: 'Invalid response format from AI' },
                { status: 500 }
            );
        }
    } catch (err) {
        const error = err as Error;
        return NextResponse.json(
            {
                error: 'Request failed',
                details: error.message,
            },
            { status: 500 }
        );
    }
}
