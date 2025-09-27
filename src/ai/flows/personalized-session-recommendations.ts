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
  schedule: z.string().describe('用户的当前日程安排。'),
  mood: z.string().describe('用户的当前情绪。'),
  pastActivity: z.string().describe('用户的过去冥想活动。'),
});

export type RecommendSessionInput = z.infer<typeof RecommendSessionInputSchema>;

const MeditationSessionSchema = z.object({
  title: z.string().describe('冥想课程的标题。'),
  duration: z.string().describe('冥想课程的持续时间（例如，“5分钟”）。'),
  description: z.string().describe('冥想课程的简短描述。'),
  icon: z.string().describe('代表课程的简单、优雅的线条艺术图标。'),
  script: z.string().describe('冥想课程的脚本。'),
});

const RecommendSessionOutputSchema = z.object({
  session: MeditationSessionSchema.describe('推荐的冥想课程。'),
  reason: z.string().describe('推荐此课程的原因。'),
});

export type RecommendSessionOutput = z.infer<typeof RecommendSessionOutputSchema>;

const meditationSessions = [
  {
    title: '午间重置',
    duration: '5分钟',
    description: '清理思绪，迎接下午。',
    icon: 'coffee',
    script: '吸气... 呼气... 想象一个宁静的空间...', // 示例脚本
  },
  {
    title: '晚间放松',
    duration: '10分钟',
    description: '放松并准备入睡。',
    icon: 'moon',
    script: '释放一天的紧张... 专注于你的呼吸...', // 示例脚本
  },
  {
    title: '晨间激励',
    duration: '7分钟',
    description: '以积极的能量开始新的一天。',
    icon: 'sun',
    script: '设定你今天的意图... 感受能量的流动...', // 示例脚本
  },
];

const getRelevantSession = ai.defineTool(
  {
    name: 'getRelevantSession',
    description: '从可用课程列表中检索相关的冥想课程。',
    inputSchema: z.object({
      schedule: z.string().describe('用户的当前日程安排。'),
      mood: z.string().describe('用户的当前情绪。'),
      pastActivity: z.string().describe('用户的过去冥想活动。'),
    }),
    outputSchema: MeditationSessionSchema,
  },
  async (input) => {
    // 在真实的应用中，这里会使用数据库或其他持久化存储。
    // 现在，我们只返回一个硬编码的课程。
    // 你可以在这里实现逻辑，根据输入参数选择一个课程。
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
  prompt: `根据用户的日程安排、情绪和过去的活动，从可用的课程中推荐一个冥想课程。

日程安排: {{{schedule}}}
情绪: {{{mood}}}
过去的活动: {{{pastActivity}}}

请考虑以下几点：
- 如果用户日程繁忙，推荐一个简短的课程。
- 推荐一个与用户情绪相匹配的课程（例如，针对焦虑的平静课程，针对疲劳的活力课程）。
- 推荐一个用户最近没有尝试过的课程，或者与他们过去的活动互补的课程。

使用 getRelevantSession 工具来选择最佳课程。

返回推荐的课程和推荐它的原因。`, 
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
