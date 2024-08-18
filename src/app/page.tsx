import { getServerAuthSession } from "@/server/auth";

import SessionData from "@/components/SessionData";

export default async function HomePage() {
  const session = await getServerAuthSession();
  return (
    <main className="flex min-h-screen flex-col items-center justify-center max-w-screen-md px-4">
      <h1 className="scroll-m-20 pb-3 text-center text-4xl font-semibold tracking-tight lg:text-6xl mb-6">
        Create T3 Template <br />
        By Ehtisham
      </h1>
      <SessionData session={session}/>
      {/* <code className="overflow-auto w-full max-w-full prose">{JSON.stringify(session, null, 2)}</code> */}
    </main>
  );
}
