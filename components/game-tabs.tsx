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

      <div className="bg-accent/10x bg-transparent rounded-lg">
        {activeTab === "video" && (
          <div className="flex items-center justify-center rounded-md">
            <div className="text-center">
              <video
                controls
                src={game.videoUrl}
                className="w-full h-auto rounded-lg"
                onPointerDown={(e) => e.stopPropagation()} // 👈 prevents carousel swipe
                onTouchStart={(e) => e.stopPropagation()} // 👈 also for touch devices
              />
            </div>
          </div>
        )}

        {activeTab === "table" && (
          <div className="">
            <GridBillardTable game={game} />
          </div>
        )}
      </div>
    </div>
  );
}
