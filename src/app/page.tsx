import { ModeToggle } from "@/components/ui/ModeToggle";
import Link from "next/link";

export default function HomePage() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen">
      <Link href="/mdx-route" className="mb-20">
      Article
      </Link>
      <h1 className="pb-3 text-4xl font-semibold tracking-tight text-center scroll-m-20 lg:text-6xl">
        Create T3 Template <br />
        By Ehtisham
      </h1>
      <ModeToggle/>
    </main>
  );
}
