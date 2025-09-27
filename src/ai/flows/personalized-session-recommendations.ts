// src/ai/flows/personalized-session-recommendations.ts
'use server';

/**
 * @fileOverview Recommends meditation sessions based on user schedule, mood, and past activity.
 *
 * - recommendSession - A function that takes user data and returns a session recommendation.
 * - RecommendSessionInput - The input type for the recommendSession function.
 * - RecommendSessionOutput - The return type for the recommendSession function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const RecommendSessionInputSchema = z.object({
  schedule: z.string().describe('The user\'s current daily schedule.'),
  mood: z.string().describe('The user\'s current mood.'),
  pastActivity: z.string().describe('The user\'s past meditation activity.'),
});

export type RecommendSessionInput = z.infer<typeof RecommendSessionInputSchema>;

const MeditationSessionSchema = z.object({
  title: z.string().describe('The title of the meditation session.'),
  duration: z.string().describe('The duration of the meditation session (e.g., \'5 MIN\').'),
  description: z.string().describe('A short description of the meditation session.'),
  icon: z.string().describe('A simple, elegant line-art icon representing the session.'),
  script: z.string().describe('The script of the meditation session.'),
});

const RecommendSessionOutputSchema = z.object({
  session: MeditationSessionSchema.describe('The recommended meditation session.'),
  reason: z.string().describe('The reason for recommending this session.'),
});

export type RecommendSessionOutput = z.infer<typeof RecommendSessionOutputSchema>;

const meditationSessions = [
  {
    title: 'Midday Reset',
    duration: '5 MIN',
    description: 'Clear your mind for the afternoon.',
    icon: 'coffee',
    script: 'Breathe in... Breathe out... Visualize a peaceful space...', // Example script
  },
  {
    title: 'Evening Wind Down',
    duration: '10 MIN',
    description: 'Relax and prepare for sleep.',
    icon: 'moon',
    script: 'Release the day\'s tension... Focus on your breath...', // Example script
  },
  {
    title: 'Morning Motivation',
    duration: '7 MIN',
    description: 'Start your day with positive energy.',
    icon: 'sun',
    script: 'Set your intentions for the day... Feel the energy flowing...', // Example script
  },
];

const getRelevantSession = ai.defineTool(
  {
    name: 'getRelevantSession',
    description: 'Retrieves a relevant meditation session from a list of available sessions.',
    inputSchema: z.object({
      schedule: z.string().describe('The user\'s current daily schedule.'),
      mood: z.string().describe('The user\'s current mood.'),
      pastActivity: z.string().describe('The user\'s past meditation activity.'),
    }),
    outputSchema: MeditationSessionSchema,
  },
  async (input) => {
    // In a real application, this would use a database or other persistent storage.
    // For now, we'll just return a hardcoded session.
    // You could implement logic here to select a session based on the input parameters.
    return meditationSessions[0];
  }
);

export async function recommendSession(input: RecommendSessionInput): Promise<RecommendSessionOutput> {
  return recommendSessionFlow(input);
}

const prompt = ai.definePrompt({
  name: 'recommendSessionPrompt',
  input: {schema: RecommendSessionInputSchema},
  output: {schema: RecommendSessionOutputSchema},
  tools: [getRelevantSession],
  prompt: `Based on the user's schedule, mood, and past activity, recommend a meditation session from the available sessions.

Schedule: {{{schedule}}}
Mood: {{{mood}}}
Past Activity: {{{pastActivity}}}

Consider the following:
- Recommend a short session if the user has a busy schedule.
- Recommend a session that matches the user's mood (e.g., calming for anxiety, energizing for fatigue).
- Recommend a session that the user hasn't tried recently, or that complements their past activity.

Use the getRelevantSession tool to choose the best session.

Return the recommended session and the reason for recommending it.`, 
});

const recommendSessionFlow = ai.defineFlow(
  {
    name: 'recommendSessionFlow',
    inputSchema: RecommendSessionInputSchema,
    outputSchema: RecommendSessionOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
