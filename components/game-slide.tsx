"use client";

import {
  DIFFICULTY_COLORS,
  DIFFICULTY_TEXT,
  GameConfig,
} from "@/lib/game-data";

interface GameSlideProps {
  game: GameConfig;
}

export function GameSlide({ game }: GameSlideProps) {
  return (
    <div className="mb-8">
      <div className="mb-4">
        <div className="flex items-center gap-3 pl-10 mb-2">
          <div className="flex items-center gap-3">
            <span
              className={`px-3 py-1 rounded text-white text-xs md:text-sm font-semibold ${
                DIFFICULTY_COLORS[game.difficulty]
              }`}
            >
              {DIFFICULTY_TEXT[game.difficulty]}
            </span>
          </div>
          <h1 className="text-2xl md:text-4xl font-semibold text-primaryx text-black">
            {game.name}
          </h1>
        </div>
        <p className="text-lg text-foreground/80 mb-4">{game.description}</p>
      </div>

      {/* Tabs and content area are kept outside; parent comp adds tabs */}
    </div>
  );
}
