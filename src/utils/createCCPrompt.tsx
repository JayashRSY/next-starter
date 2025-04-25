
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const createCCPrompt = (data: any) => {
      const { amount, platform, category, selectedCards } = data;
      const prompt = `
      You are a credit card recommendation engine.

      The user has the following credit cards: ${selectedCards.join(", ")}.
      They are going to spend ₹${amount} on "${platform}" in the category "${category}".

      Your job is to select the best credit card from the user's wallet to maximize cashback, points, or discounts based on real or commonly known Indian credit card reward programs.

      Respond ONLY with a valid JSON object in this **exact format**:

      {
        "card": "Card Name",
        "savings": "₹XXX",
        "reason": "Explain why this card is best in one sentence"
      }

      Do not include any text, explanation, markdown, or comments outside the JSON object. Only output valid JSON.
      `;
  return  prompt;
}

export default createCCPrompt