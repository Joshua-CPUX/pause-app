
import Link from "next/link";
import { Mail, Star, Shield } from "lucide-react";
import { AppHeader } from "@/app/components/app-header";
import { Separator } from "@/components/ui/separator";

const aboutOptions = [
  {
    icon: Mail,
    text: "Send Feedback",
    href: "mailto:feedback@pauseapp.dev",
  },
  {
    icon: Star,
    text: "Rate on App Store",
    href: "#",
  },
  {
    icon: Shield,
    text: "Privacy Policy",
    href: "#",
  },
];

export default function AboutPage() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-background">
      <AppHeader variant="page" title="About" />
      <main className="flex-1 px-4 md:px-6">
        <div className="mx-auto max-w-2xl">
          <div className="space-y-4 text-center">
            <h1 className="text-4xl font-bold text-primary">Pause</h1>
            <p className="text-lg text-muted-foreground">
              Crafted to help you find a moment of peace in your busy day.
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
