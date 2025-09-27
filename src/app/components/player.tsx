
"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { X, Play, Pause as PauseIcon } from "lucide-react";
import { getSessionBySlug, type Session } from "@/lib/sessions";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export function Player({ slug }: { slug: string }) {
  const [session, setSession] = useState<Session | undefined>(undefined);
  const [timeLeft, setTimeLeft] = useState<number | undefined>(undefined);
  const [isPlaying, setIsPlaying] = useState(true);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const foundSession = getSessionBySlug(slug);
    setSession(foundSession);
    setTimeLeft(foundSession?.durationInSeconds);
  }, [slug]);

  useEffect(() => {
    document.body.classList.add("player-active");
    return () => {
      document.body.classList.remove("player-active");
    };
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      // Ensure there is a source before trying to play
      if (audio.src) {
        audio.play().catch(error => console.error("Error playing audio:", error));
      }
    } else {
      audio.pause();
    }
  }, [isPlaying, session]); // Add session to dependency array

  useEffect(() => {
    if (!isPlaying || !timeLeft || timeLeft <= 0) {
      if (timeLeft === 0) {
        setIsPlaying(false);
      }
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => (prevTime ? (prevTime > 0 ? prevTime - 1 : 0) : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, [isPlaying, timeLeft]);

  useEffect(() => {
    if (timeLeft === 0) {
      setIsPlaying(false);
    }
  }, [timeLeft]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0");
    const secs = (seconds % 60).toString().padStart(2, "0");
    return `${mins}:${secs}`;
  };
  
  if (!session || timeLeft === undefined) {
    return null; // Or a loading spinner
  }

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-animation text-primary-foreground">
      {session.audioUrl && <audio ref={audioRef} src={session.audioUrl} autoPlay loop />}
      <Button
        variant="ghost"
        size="icon"
        className="absolute top-6 left-6 h-12 w-12 text-primary-foreground/70 hover:text-primary-foreground hover:bg-white/20"
        asChild
      >
        <Link href="/">
          <X className="h-8 w-8" style={{ filter: "drop-shadow(0 1px 1px hsl(var(--foreground) / 0.2))" }} />
          <span className="sr-only">关闭课程</span>
        </Link>
      </Button>

      <div
        className={cn(
          "breathing-circle relative flex h-64 w-64 items-center justify-center rounded-full border-4 border-primary-foreground/50 bg-black/10 md:h-80 md:w-80",
          !isPlaying && "animation-paused"
        )}
      >
        <span className="font-mono text-6xl font-bold text-white md:text-7xl" style={{ textShadow: "0 2px 4px hsl(var(--foreground) / 0.2)" }}>
          {formatTime(timeLeft)}
        </span>
      </div>

      <div className="absolute bottom-16">
        <Button
          variant="ghost"
          size="icon"
          className="h-20 w-20 rounded-full text-primary-foreground/80 hover:text-primary-foreground hover:bg-white/20"
          onClick={() => setIsPlaying(!isPlaying)}
          aria-label={isPlaying ? "暂停" : "播放"}
        >
          {isPlaying ? (
            <PauseIcon className="h-10 w-10" fill="currentColor" style={{ filter: "drop-shadow(0 1px 1px hsl(var(--foreground) / 0.2))" }} />
          ) : (
            <Play className="h-10 w-10" fill="currentColor" style={{ filter: "drop-shadow(0 1px 1px hsl(var(--foreground) / 0.2))" }} />
          )}
        </Button>
      </div>
    </div>
  );
}
