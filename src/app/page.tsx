
import { AppHeader } from "@/app/components/app-header";
import { SessionCard } from "@/app/components/session-card";
import { sessions } from "@/lib/sessions";

export default function Home() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-background">
      <AppHeader variant="home" />
      <main className="flex-1 px-4 md:px-6">
        <div className="mx-auto max-w-2xl py-8">
          <h1 className="mb-10 text-center text-3xl font-headline text-foreground md:text-4xl">
            花点时间暂停一下
          </h1>
          <div className="space-y-4">
            {sessions.map((session) => (
              <SessionCard key={session.slug} session={session} />
            ))}
          </div>
        </div>
      </main>
      <footer className="py-8">
        {/* Empty footer for whitespace */}
      </footer>
    </div>
  );
}
