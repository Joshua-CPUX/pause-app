
import { getSessionBySlug } from "@/lib/sessions";
import { notFound } from "next/navigation";
import { Player } from "@/app/components/player";

type SessionPageProps = {
  params: {
    slug: string;
  };
};

export default function SessionPage({ params }: SessionPageProps) {
  const session = getSessionBySlug(params.slug);

  if (!session) {
    notFound();
  }

  return <Player slug={params.slug} />;
}
