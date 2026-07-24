import { GoogleGenAI, Type } from '@google/genai';
import { env } from '@/lib/env';
import { CareerGuideResult } from './schema';
import { buildPrompt } from './prompt';
import { zodToJsonSchema } from 'zod-to-json-schema';
import { CareerGuideResultSchema } from './schema';

const ai = new GoogleGenAI({
  apiKey: env.GEMINI_API_KEY,
});

// Removed zodToJsonSchema and schemaObject as it was returning empty object

export async function generateCareerGuide(
  formData: Record<string, unknown>
): Promise<CareerGuideResult> {
  const tsInterface = `
export interface CareerGuideResult {
  guideTitle: string;
  studentName: string;
  generatedDate: string;
  executiveSummary: string;
  profileSnapshot: {
    educationStage: string;
    majorInterests: string[];
    keyStrengths: string[];
    preferredWorkStyles: string[];
    importantConstraints: string[];
    statedGoals: string[];
  };
  recommendedCareerPaths: Array<{
    careerTitle: string;
    fitLevel: 'Strong Fit' | 'Good Fit' | 'Explore Further';
    fitScore: number;
    overview: string;
    whyItMatches: string[];
    typicalActivities: string[];
    skillsRequired: string[];
    skillsAlreadyDemonstrated: string[];
    skillsToDevelop: string[];
    possibleEducationRoutes: string[];
    possibleEntryRoutes: string[];
    practicalNextSteps: string[];
    possibleChallenges: string[];
    verificationNotes: string[];
  }>;
  alternativeCareerPaths: Array<{
    careerTitle: string;
    reasonToExplore: string;
    firstExplorationStep: string;
  }>;
  educationRoadmap: {
    immediateOptions: string[];
    mediumTermOptions: string[];
    qualificationsToInvestigate: string[];
    verificationChecklist: string[];
  };
  skillDevelopmentPlan: Array<{
    skill: string;
    importance: string;
    beginnerAction: string;
    practiceProject: string;
  }>;
  ninetyDayActionPlan: Array<{
    period: string;
    actions: string[];
    expectedOutcome: string;
  }>;
  oneYearRoadmap: Array<{
    period: string;
    milestone: string;
    actions: string[];
  }>;
  explorationActivities: string[];
  questionsAnswered: Array<{
    question: string;
    answer: string;
  }>;
  decisionFramework: {
    criteria: string[];
    comparisonMethod: string;
    suggestedDecisionDate: string;
  };
  encouragementNote: string;
  disclaimer: string;
}
  `;

  const prompt = buildPrompt(formData) + "\n\nCRITICAL: You MUST return ONLY valid JSON that strictly satisfies the following TypeScript interface. Do NOT include Markdown formatting (like ```json). Just return the raw JSON object:\n" + tsInterface;

  try {
    const response = await ai.models.generateContent({
      model: env.GEMINI_MODEL,
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        temperature: 0.7,
      },
    });

    const text = response.text;
    if (!text) throw new Error('Empty response from Gemini');
    console.log("Raw Gemini JSON:", text);

    const jsonResponse = JSON.parse(text);
    
    // Validate against the Zod schema
    const parsedData = CareerGuideResultSchema.parse(jsonResponse);
    return parsedData;
  } catch (error) {
    console.error('Error generating career guide with Gemini:', error);
    throw error;
  }
}
