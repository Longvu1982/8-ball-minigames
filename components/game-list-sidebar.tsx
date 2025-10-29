"use client";

import { cn } from "@/lib/utils";
import {
  DIFFICULTY_TEXT,
  DIFFICULTY_TEXT_COLORS,
  GameConfig,
} from "@/lib/game-data";

interface GameListSidebarProps {
  games: GameConfig[];
  currentIndex: number;
  onSelect: (index: number) => void;
}

export function GameListSidebar({
  games,
  currentIndex,
  onSelect,
}: GameListSidebarProps) {
  return (
    <aside
      className={cn(
        "hidden lg:block py-4 fixed left-0 top-0 bottom-0 z-50 border-r border-border bg-black backdrop-blur shadow-sm overflow-y-auto w-56"
      )}
    >
      <div className="text-white font-bold text-left text-xl px-2 mb-4">
        GAME LIST
      </div>

      <div className={cn("p-2 space-y-2 px-x")}>
        {" "}
        {games.map((game, idx) => (
          <button
            key={game.id}
            onClick={() => onSelect(idx)}
            className={cn(
              "w-full text-left rounded-md overflow-hidden transition-colors bg-white hover:border-primary/60 hover:bg-primary/5 focus:outline-none focus:ring-2 focus:ring-primary"
            )}
            aria-label={`Open ${game.name}`}
            title={game.name}
          >
            <div
              className={cn(
                "flex items-center gap-3 p-2",
                idx === currentIndex
                  ? "border-transparent bg-primary"
                  : "border-transparent bg-black"
              )}
            >
              <div className="min-w-0">
                <div
                  className={cn(
                    "text-sm font-semibold truncate mb-1 text-white"
                  )}
                >
                  {game.name}
                </div>
                <div
                  className={cn(
                    "flex items-center gap-3 w-fit rounded-sm",
                    idx === currentIndex && "bg-white px-1"
                  )}
                >
                  <span
                    className={`rounded text-xs font-bold ${
                      DIFFICULTY_TEXT_COLORS[game.difficulty]
                    }`}
                  >
                    {DIFFICULTY_TEXT[game.difficulty]}
                  </span>
                </div>
              </div>
            </div>
          </button>
        ))}
      </div>
    </aside>
  );
}
