
import Link from "next/link";
import { Mail, Star, Shield } from "lucide-react";
import { AppHeader } from "@/app/components/app-header";
import { Separator } from "@/components/ui/separator";

const aboutOptions = [
  {
    icon: Mail,
    text: "发送反馈",
    href: "mailto:feedback@pauseapp.dev",
  },
  {
    icon: Star,
    text: "在应用商店评分",
    href: "#",
  },
  {
    icon: Shield,
    text: "隐私政策",
    href: "#",
  },
];

export default function AboutPage() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-background">
      <AppHeader variant="page" title="关于" />
      <main className="flex-1 px-4 md:px-6">
        <div className="mx-auto max-w-2xl">
          <div className="space-y-4 text-center">
            <h1 className="text-4xl font-bold text-primary">暂停</h1>
            <p className="text-lg text-muted-foreground">
              旨在帮助您在忙碌的一天中找到片刻的宁静。
            </p>
          </div>

          <Separator className="my-12" />

          <div className="space-y-2">
            {aboutOptions.map((option) => {
              const Icon = option.icon;
              return (
                <Link
                  key={option.text}
                  href={option.href}
                  className="flex items-center gap-4 rounded-lg p-4 text-lg font-medium text-foreground transition-colors hover:bg-accent"
                >
                  <Icon className="h-6 w-6 text-primary" />
                  <span>{option.text}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </main>
    </div>
  );
}
