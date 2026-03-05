import { Injectable } from '@angular/core';
import { ExplanationResult } from './history-service';
import { catchError, from, map, Observable, throwError } from 'rxjs';
import { environment } from '../../environments/envrionment';

@Injectable({
  providedIn: 'root',
})
export class ClaudeService {
  explainCode(code: string): Observable<ExplanationResult> {
    return this.callClaudeAPI({
      model: environment.AI_MODEL,
      max_tokens: 1000,
      messages: [{ role: 'user', content: this.buildPrompt(code) }],
    });
  }

  private callClaudeAPI(body: any): Observable<ExplanationResult> {
    return from(
      fetch(environment.API_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': environment.API_KEY,
          'anthropic-version': '2023-06-01',
          'anthropic-dangerous-direct-browser-access': 'true',
        },
        body: JSON.stringify(body),
      }).then((r) => r.json()),
    ).pipe(
      map((data: any) => {
        const rawText = data.content?.map((b: any) => b.text || '').join('') || '';
        return this.parseResponse(rawText);
      }),
      catchError((err) => throwError(() => new Error('AI analysis failed: ' + err.message))),
    );
  }

  private buildPrompt(code: string): string {
    return `
    You are a code analysis assistant. Analyze the following code and respond ONLY with a valid JSON object (no markdown, no backticks, no extra text) with this exact structure:
    {
      "explanation": "A clear 2-4 sentence plain-English explanation of what the code does. Be specific about the algorithm, data structures, and purpose.",
      "keyPoints": ["point 1", "point 2", "point 3"],
      "timeComplexity": {"notation": "O(?)", "description": "brief explanation"},
      "spaceComplexity": {"notation": "O(?)", "description": "brief explanation"},
      "optimizedCode": "the optimized version of the code as a string (use \\\n for newlines, escape quotes)",
      "optimizationNotes": "brief note on what was improved",
      "potentialIssues": "any edge cases, bugs, or accuracy notes (or null if none)"
    }
    Important guidelines:
      - Be accurate and honest. If you're uncertain, say so in potentialIssues.
      - Do not fabricate behavior that isn't in the code.
      - For complexity, analyze the actual algorithm, not a generic estimate.
    Code to analyze:
      \`\`\`
      ${code}
      \`\`\`
    Respond ONLY with the JSON object. No markdown. No explanation outside the JSON.`;
  }

  private parseResponse(raw: string): ExplanationResult {
    try {
      const cleaned = raw.replace(/```json|```/g, '').trim();
      return JSON.parse(cleaned);
    } catch {
      const match = raw.match(/\{[\s\S]*\}/);
      if (match) return JSON.parse(match[0]);
      throw new Error('Could not parse AI response');
    }
  }
}
