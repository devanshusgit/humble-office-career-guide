import { z } from 'zod';

export const CareerGuideResultSchema = z.object({
  guideTitle: z.string(),
  studentName: z.string(),
  generatedDate: z.string(),
  executiveSummary: z.string(),
  profileSnapshot: z.object({
    educationStage: z.string(),
    majorInterests: z.array(z.string()),
    keyStrengths: z.array(z.string()),
    preferredWorkStyles: z.array(z.string()),
    importantConstraints: z.array(z.string()),
    statedGoals: z.array(z.string()),
  }),
  recommendedCareerPaths: z.array(z.object({
    careerTitle: z.string(),
    fitLevel: z.enum(['Strong Fit', 'Good Fit', 'Explore Further']),
    fitScore: z.number(),
    overview: z.string(),
    whyItMatches: z.array(z.string()),
    typicalActivities: z.array(z.string()),
    skillsRequired: z.array(z.string()),
    skillsAlreadyDemonstrated: z.array(z.string()),
    skillsToDevelop: z.array(z.string()),
    possibleEducationRoutes: z.array(z.string()),
    possibleEntryRoutes: z.array(z.string()),
    practicalNextSteps: z.array(z.string()),
    possibleChallenges: z.array(z.string()),
    verificationNotes: z.array(z.string()),
  })),
  alternativeCareerPaths: z.array(z.object({
    careerTitle: z.string(),
    reasonToExplore: z.string(),
    firstExplorationStep: z.string(),
  })),
  educationRoadmap: z.object({
    immediateOptions: z.array(z.string()),
    mediumTermOptions: z.array(z.string()),
    qualificationsToInvestigate: z.array(z.string()),
    verificationChecklist: z.array(z.string()),
  }),
  skillDevelopmentPlan: z.array(z.object({
    skill: z.string(),
    importance: z.string(),
    beginnerAction: z.string(),
    practiceProject: z.string(),
  })),
  ninetyDayActionPlan: z.array(z.object({
    period: z.string(),
    actions: z.array(z.string()),
    expectedOutcome: z.string(),
  })),
  oneYearRoadmap: z.array(z.object({
    period: z.string(),
    milestone: z.string(),
    actions: z.array(z.string()),
  })),
  explorationActivities: z.array(z.string()),
  questionsAnswered: z.array(z.object({
    question: z.string(),
    answer: z.string(),
  })),
  decisionFramework: z.object({
    criteria: z.array(z.string()),
    comparisonMethod: z.string(),
    suggestedDecisionDate: z.string(),
  }),
  encouragementNote: z.string(),
  disclaimer: z.string(),
});

export type CareerGuideResult = z.infer<typeof CareerGuideResultSchema>;
