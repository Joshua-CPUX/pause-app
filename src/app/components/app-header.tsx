
import Link from "next/link";
import { Info, ArrowLeft } from "lucide-react";
import { Logo } from "@/app/components/logo";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type AppHeaderProps = {
  variant?: "home" | "page";
  title?: string;
  className?: string;
};

export function AppHeader({
  variant = "home",
  title,
  className,
}: AppHeaderProps) {
  return (
    <header
      className={cn(
        "flex h-20 items-center justify-between px-4 md:px-6",
        className
      )}
    >
      {variant === "home" ? (
        <Logo />
      ) : (
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="h-10 w-10" asChild>
            <Link href="/">
              <ArrowLeft className="h-6 w-6" />
              <span className="sr-only">Back to Home</span>
            </Link>
          </Button>
          <h1 className="text-xl font-bold text-foreground">{title}</h1>
        </div>
      )}
      {variant === "home" && (
        <Button variant="ghost" size="icon" className="h-10 w-10" asChild>
          <Link href="/about">
            <Info className="h-6 w-6" />
            <span className="sr-only">About page</span>
          </Link>
        </Button>
      )}
    </header>
  );
}
