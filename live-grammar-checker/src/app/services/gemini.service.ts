import { Injectable } from '@angular/core';
import { GoogleGenerativeAI } from '@google/generative-ai';

@Injectable({
    providedIn: 'root'
})
export class GeminiService {
    private genAI: GoogleGenerativeAI;
    private model: any;

    constructor() {
        this.genAI = new GoogleGenerativeAI('replace API gemini disini');
        this.model = this.genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });
    }

    async checkGrammar(text: string): Promise<any> {
        const prompt = `
    Analyze the following English text for grammar. be LENIENT.
    Input Text: "${text}"
    
    Rules:
    1. IGNORE capitalization errors (e.g., "i" instead of "I", starting with lowercase).
    2. IGNORE missing punctuation at the end of the sentence.
    3. Focus ONLY on sentence structure, verb tense, and subject-verb agreement.
    4. If the sentence is grammatically sound ignoring case/punctuation, return "Correct".
    
    Example:
    - Input: "i eat an apple" -> Status: "Correct" (ignore 'i' and missing period)
    - Input: "she eat an apple" -> Status: "Incorrect" (Correction: "She eats an apple")
    
    Return ONLY valid JSON:
    {
      "status": "Correct" or "Incorrect",
      "correction": "string"
    }
    `;

        try {
            const result = await this.model.generateContent(prompt);
            const response = await result.response;
            const textResponse = response.text();
            // Clean up potential markdown code blocks if the model adds them
            const jsonString = textResponse.replace(/```json/g, '').replace(/```/g, '').trim();
            return JSON.parse(jsonString);
        } catch (error) {
            console.error('Error checking grammar:', error);
            return { status: 'Error', correction: 'Could not check grammar.' };
        }
    }
}
