"use client"

import { useState } from "react"
import type { GameConfig } from "@/lib/game-data"
import { BilliardTable } from "./billiard-table"

interface GameTabsProps {
  game: GameConfig
}

export function GameTabs({ game }: GameTabsProps) {
  const [activeTab, setActiveTab] = useState<"video" | "table">("table")
  const [randomizeKey, setRandomizeKey] = useState(0)

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
              <div className="w-16 h-16 bg-primary flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-primary-foreground" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                </svg>
              </div>
              <p className="text-muted-foreground">Video tutorial for {game.name} coming soon</p>
            </div>
          </div>
        )}

        {activeTab === "table" && (
          <div className="flex justify-center">
            <BilliardTable key={randomizeKey} game={game} onRandomize={() => setRandomizeKey((prev) => prev + 1)} />
          </div>
        )}
      </div>
    </div>
  )
}
