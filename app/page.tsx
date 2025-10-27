import { GameCarousel } from "@/components/game-carousel";

export default function Home() {
  return (
    <main className="min-h-screen bg-background py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12">
          <h1 className="text-5xl font-bold text-foreground mb-2">
            NAB 2025 Pools Minigames
          </h1>
          <p className="text-xl text-muted-foreground">
            Take challenges and win prices
          </p>
        </div>

        <GameCarousel />
      </div>
    </main>
  );
}
