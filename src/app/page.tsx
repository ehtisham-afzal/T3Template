import { getServerAuthSession } from "@/server/auth";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import FamilyMap from "@/components/family-map";
import  FamilyTree  from "@/components/FamilyTree";

export default async function HomePage() {
  const session = await getServerAuthSession();
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-32 px-4 text-primary w-full">
      <div className="flex min-h-[calc(60vh-64px)] max-w-screen-md flex-col items-center justify-center">
        <h1 className="mb-4 text-4xl font-bold">
          Welcome to Mughal-Khel Family Explorer
        </h1>
        <p className="mb-8 max-w-2xl text-center text-xl">
          Discover and connect with your family members across the globe. Sign
          up to explore your family tree and see where everyone is located!
        </p>
        <div className="space-x-4">
          {session?.user ? (
            <Button asChild>
              <Link href="/dashboard">Family tree</Link>
            </Button>
          ) : (
            <>
              <Button asChild>
                <Link href="/signup">Get Started</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/login">Login</Link>
              </Button>
            </>
          )}
        </div>
      </div>
      <section className="mb-16 w-full max-w-screen-xl">
        <h2 className="mb-6 text-2xl font-bold">Mughal khel on earth</h2>
        <FamilyMap />
      </section>

      {/* Family Tree Section */}
      <section className="mb-16 w-full max-w-screen-xl">
        <h2 className="mb-6 text-2xl font-bold">Family tree</h2>
        <FamilyTree />
      </section>
    </main>
  );
}
