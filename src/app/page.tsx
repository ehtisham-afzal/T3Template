import { Prose } from "@/components/Prose";
import { ModeToggle } from "@/components/ui/ModeToggle";

export default function HomePage() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="pb-3 text-4xl font-semibold tracking-tight text-center scroll-m-20 lg:text-6xl">
        Create T3 Template <br />
        By Ehtisham
      </h1>
      <ModeToggle/>
    </main>
  );
}
