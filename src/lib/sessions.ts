
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
    title: "午间重置",
    duration: "5 分钟",
    durationInSeconds: 300,
    description: "理清思绪，迎接下午。",
    icon: Coffee,
  },
  {
    slug: "evening-wind-down",
    title: "晚间放松",
    duration: "10 分钟",
    durationInSeconds: 600,
    description: "放松身心，准备入睡。",
    icon: Moon,
  },
  {
    slug: "morning-motivation",
    title: "晨间激励",
    duration: "7 分钟",
    durationInSeconds: 420,
    description: "以积极的能量开始新的一天。",
    icon: Sun,
  },
];

export const getSessionBySlug = (slug: string) => {
  return sessions.find((session) => session.slug === slug);
};
