
import type { LucideIcon } from "lucide-react";
import { Coffee, Moon, Sun } from "lucide-react";

export type Session = {
  slug: string;
  title: string;
  duration: string;
  durationInSeconds: number;
  description: string;
  icon: LucideIcon;
};

export const sessions: Session[] = [
  {
    slug: "midday-reset",
    title: "Midday Reset",
    duration: "5 MIN",
    durationInSeconds: 300,
    description: "Clear your mind for the afternoon.",
    icon: Coffee,
  },
  {
    slug: "evening-wind-down",
    title: "Evening Wind Down",
    duration: "10 MIN",
    durationInSeconds: 600,
    description: "Relax and prepare for sleep.",
    icon: Moon,
  },
  {
    slug: "morning-motivation",
    title: "Morning Motivation",
    duration: "7 MIN",
    durationInSeconds: 420,
    description: "Start your day with positive energy.",
    icon: Sun,
  },
];

export const getSessionBySlug = (slug: string) => {
  return sessions.find((session) => session.slug === slug);
};
