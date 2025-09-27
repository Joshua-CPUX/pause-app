
import Link from "next/link";
import type { Session } from "@/lib/sessions";
import { Card, CardContent } from "@/components/ui/card";

export function SessionCard({ session }: { session: Session }) {
  const Icon = session.icon;
  return (
    <Link href={`/session/${session.slug}`} className="block group">
      <Card className="transform transition-transform duration-300 ease-in-out group-hover:scale-[1.02] group-hover:shadow-lg bg-card border-border/50 shadow-md">
        <CardContent className="flex items-center gap-6 p-6">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-accent">
            <Icon className="h-8 w-8 text-primary" />
          </div>
          <div className="flex-1">
            <h2 className="font-headline text-xl font-bold text-foreground">
              {session.title}
            </h2>
            <p className="text-sm font-medium uppercase tracking-wider text-muted-foreground">
              {session.duration}
            </p>
            <p className="mt-1 text-base text-muted-foreground">
              {session.description}
            </p>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
