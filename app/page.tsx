import { GameCarousel } from "@/components/game-carousel"

export default function Home() {
  return (
    <main className="min-h-screen bg-background py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12">
          <h1 className="text-5xl font-bold text-foreground mb-2">NAB 8 Ball Minigames</h1>
          <p className="text-xl text-muted-foreground">Master the fundamentals of pool with 6 progressive challenges</p>
        </div>

        <GameCarousel />
      </div>
    </main>
  )
}
