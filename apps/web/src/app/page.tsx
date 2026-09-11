import Image from 'next/image';

import { Button } from '@/components/ui/button';

export default function Home() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex w-full max-w-3xl flex-1 flex-col items-center justify-center gap-8 bg-white px-16 py-32 dark:bg-black">
        <Image
          className="dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={100}
          height={20}
          priority
        />
        <div className="flex flex-col items-center gap-3 text-center">
          <h1 className="text-3xl font-semibold tracking-tight text-black dark:text-zinc-50">
            Leaguefy
          </h1>
          <p className="max-w-md text-lg text-zinc-600 dark:text-zinc-400">
            App Router · Tailwind v4 · shadcn/ui — monorepo pronto para o MVP x1.
          </p>
        </div>
        <Button type="button">shadcn/ui ok</Button>
      </main>
    </div>
  );
}
