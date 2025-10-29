import { GameCarousel } from "@/components/game-carousel";

export default function Home() {
  return (
    <main className="min-h-screen bg-white py-8 px-1 md:px-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12 w-full max-w-6xl mx-auto lg:pl-56">
          <div className="flex items-center gap-1 md:gap-4 mb-2">
            <img
              src="/nab-logo.jpg"
              alt="NAB Logo"
              className="h-10 w-auto rounded-sm"
            />
            <h1 className="text-xl md:text-5xl font-bold text-primaryx text-black">
              NAB 2025 Pool Minigames
            </h1>
          </div>
          <p className="text-xl text-muted-foreground">
            Take challenges and win prizes
          </p>
          {/* <div className="mt-3 inline-flex items-center gap-2 rounded-full bg-primary/10 text-primary px-3 py-1 text-sm font-semibold">
            <span className="inline-block h-2 w-2 rounded-full bg-primary animate-pulse" />
            Holiday Edition
          </div> */}
        </div>

        <GameCarousel />
      </div>
    </main>
  );
}
