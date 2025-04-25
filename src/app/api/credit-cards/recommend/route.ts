import { CREDIT_CARDS } from '@/utils/constants';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

// Define the input schema using Zod
const recommendationInputSchema = z.object({
  amount: z.number().positive(),
  platform: z.string(),
  category: z.string(),
  userCards: z.array(z.string()).default([])
});

type RecommendationInput = z.infer<typeof recommendationInputSchema>;

// Initialize the Google AI client
const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GOOGLE_GENAI_API_KEY || "");
const geminiModel = genAI.getGenerativeModel({ model: "gemini-pro" });

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    
    // Validate the input
    const validation = recommendationInputSchema.safeParse(body);
    
    if (!validation.success) {
      return NextResponse.json(
        {
          error: "Invalid input",
          details: validation.error.format(),
        },
        { status: 400 }
      );
    }
    
    const input: RecommendationInput = validation.data;
    
    // Filter cards by user's selection or use all cards if none selected
    const cardsToConsider = input.userCards.length > 0
      ? CREDIT_CARDS.filter(card => input.userCards.includes(card.id))
      : CREDIT_CARDS;
      
    try {
      // Create a prompt for Gemini
      const prompt = `
        You are a credit card rewards expert. Based on the following transaction and available credit cards,
        recommend the best card to use for maximum rewards.

        Transaction details:
        - Amount: ₹${input.amount}
        - Platform: ${input.platform}
        - Category: ${input.category}

        Available credit cards:
        ${cardsToConsider.map(card => `
        - ID: ${card.id}
          Name: ${card.name} (${card.bank})
          Type: ${card.type}
          Annual Fee: ₹${card.annualFee}
          Rewards: ${Object.entries(card.rewards)
            .map(([key, value]) => `${key}: ${((value as number) * 100).toFixed(1)}%`)
            .join(', ')}
          Benefits: ${card.benefits?.join(', ') || 'None'}
        `).join('')}

        Please analyze which card would give the maximum rewards for this transaction. Consider the platform,
        category, and amount. Return your recommendation in the following JSON format:

        \`\`\`json
        {
          "bestCardId": "card-id-here",
          "savingsAmount": 123.45,
          "savingsPercentage": 5.0,
          "explanation": "Brief explanation of why this card is best",
          "comparisonResults": [
            {
              "cardId": "other-card-id",
              "savingsAmount": 100.00,
              "savingsPercentage": 4.0
            }
          ]
        }
        \`\`\`

        Only return the JSON, no other text.
      `;
      
      // Call Gemini API if API key is set
      if (process.env.GEMINI_API_KEY) {
        const result = await geminiModel.generateContent(prompt);
        const response = await result.response;
        const text = response.text();
        
        // Look for JSON in the response
        const jsonMatch = text.match(/```json\n([\s\S]*?)\n```/) || 
                        text.match(/{[\s\S]*?}/);
                        
        if (jsonMatch) {
          // Parse the JSON from the AI response
          const jsonStr = jsonMatch[1] || jsonMatch[0];
          const aiRecommendation = JSON.parse(jsonStr);
          
          // Ensure the recommendation contains the necessary fields
          if (aiRecommendation.bestCardId) {
            // Get the best card from our data
            const bestCard = CREDIT_CARDS.find(card => card.id === aiRecommendation.bestCardId);
            
            if (bestCard) {
              // Prepare comparison results if available
              let comparisonResults;
              if (aiRecommendation.comparisonResults) {
                comparisonResults = aiRecommendation.comparisonResults
                  .map((result: { cardId: string; savingsAmount: number; savingsPercentage: number }) => {
                    const card = CREDIT_CARDS.find(c => c.id === result.cardId);
                    if (!card) return null;
                    
                    return {
                      card,
                      savingsAmount: result.savingsAmount,
                      savingsPercentage: result.savingsPercentage
                    };
                  })
                  .filter(Boolean);
              }
              
              return NextResponse.json({
                bestCard,
                savingsAmount: aiRecommendation.savingsAmount,
                savingsPercentage: aiRecommendation.savingsPercentage,
                explanation: aiRecommendation.explanation,
                comparisonResults
              });
            }
          }
        }
      }
      
      // Fallback to rule-based approach if Gemini API fails or is not available
      const cardsWithRewards = cardsToConsider.map(card => {
        // Check if the card has platform-specific rewards
        const platformReward = card.rewards[input.platform] ||
                              card.rewards[input.category] ||
                              card.rewards.default;
        
        // Calculate savings
        const savingsAmount = input.amount * platformReward;
        const savingsPercentage = platformReward * 100;
        
        return {
          card,
          savingsAmount,
          savingsPercentage
        };
      });
      
      // Sort by highest rewards
      cardsWithRewards.sort((a, b) => b.savingsAmount - a.savingsAmount);
      
      // Get the best card
      const bestResult = cardsWithRewards[0];
      
      return NextResponse.json({
        bestCard: bestResult.card,
        savingsAmount: bestResult.savingsAmount,
        savingsPercentage: bestResult.savingsPercentage,
        explanation: `${bestResult.card.name} offers the highest rewards for this transaction.`,
        comparisonResults: cardsWithRewards.slice(1)
      });
      
    } catch (error) {
      console.error('Error processing recommendation:', error);
      return NextResponse.json(
        { error: 'Failed to process recommendation' },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Error parsing request:', error);
    return NextResponse.json(
      { error: 'Invalid request' },
      { status: 400 }
    );
  }
}