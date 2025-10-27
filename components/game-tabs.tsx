"use client";

import type { GameConfig } from "@/lib/game-data";
import { useState } from "react";
import GridBillardTable from "./billiard-table-v2";

interface GameTabsProps {
  game: GameConfig;
}

export function GameTabs({ game }: GameTabsProps) {
  const [activeTab, setActiveTab] = useState<"video" | "table">("video");

  return (
    <div className="w-full">
      {/* Tab buttons */}
      <div className="flex gap-4 border-b border-border mb-6">
        <button
          onClick={() => setActiveTab("video")}
          className={`px-4 py-3 font-semibold transition-colors ${
            activeTab === "video"
              ? "text-primary border-b-2 border-primary"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          Video Tutorial
        </button>
        <button
          onClick={() => setActiveTab("table")}
          className={`px-4 py-3 font-semibold transition-colors ${
            activeTab === "table"
              ? "text-primary border-b-2 border-primary"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          Practice Table
        </button>
      </div>

      <div className="bg-secondary p-6">
        {activeTab === "video" && (
          <div className="flex items-center justify-center bg-muted p-12">
            <div className="text-center">
              {/* <div className="w-16 h-16 bg-primary flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-primary-foreground"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                </svg>
              </div>
              <p className="text-muted-foreground">
                Video tutorial for {game.name} coming soon
              </p> */}

              <video
                controls
                src={game.videoUrl}
                autoPlay
                className="w-full h-auto rounded-lg"
                onPointerDown={(e) => e.stopPropagation()} // 👈 prevents carousel swipe
                onTouchStart={(e) => e.stopPropagation()} // 👈 also for touch devices
              />
            </div>
          </div>
        )}

        {activeTab === "table" && (
          <div className="">
            {/* <BilliardTable key={randomizeKey} game={game} onRandomize={() => setRandomizeKey((prev) => prev + 1)} /> */}
            <GridBillardTable game={game} />
          </div>
        )}
      </div>
    </div>
  );
}
