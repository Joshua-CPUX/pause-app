
import type { LucideIcon } from "lucide-react";
import { Coffee, Moon, Sun } from "lucide-react";

export type Session = {
  slug: string;
  title: string;
  duration: string;
  durationInSeconds: number;
  description: string;
  icon: LucideIcon;
  audioUrl: string;
};

export const sessions: Session[] = [
  {
    slug: "midday-reset",
    title: "午间重置",
    duration: "5 分钟",
    durationInSeconds: 300,
    description: "理清思绪，迎接下午。",
    icon: Coffee,
    audioUrl: "https://cdn.pixabay.com/audio/2022/10/18/audio_73662d0321.mp3",
  },
  {
    slug: "evening-wind-down",
    title: "晚间放松",
    duration: "10 分钟",
    durationInSeconds: 600,
    description: "放松身心，准备入睡。",
    icon: Moon,
    audioUrl: "https://cdn.pixabay.com/audio/2024/02/09/audio_a1c7f1a238.mp3",
  },
  {
    slug: "morning-motivation",
    title: "晨间激励",
    duration: "7 分钟",
    durationInSeconds: 420,
    description: "以积极的能量开始新的一天。",
    icon: Sun,
    audioUrl: "https://cdn.pixabay.com/audio/2022/11/17/audio_82a3a30364.mp3",
  },
];

export const getSessionBySlug = (slug: string) => {
  return sessions.find((session) => session.slug === slug);
};
