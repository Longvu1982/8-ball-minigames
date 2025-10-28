"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";

import {
  DIFFICULTY_COLORS,
  DIFFICULTY_TEXT_COLORS,
  DIFFICULTY_TEXT,
  GAMES,
} from "@/lib/game-data";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback, useState } from "react";
import { GameTabs } from "./game-tabs";

export function GameCarousel() {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [panelOpen, setPanelOpen] = useState(true);

  const handleSelectChange = useCallback(() => {
    if (!api) return;
    setCurrent(api.selectedScrollSnap());
  }, [api]);

  const goToPrevious = useCallback(() => {
    api?.scrollPrev();
  }, [api]);

  const goToNext = useCallback(() => {
    api?.scrollNext();
  }, [api]);

  if (api && api.on) {
    api.on?.("select", handleSelectChange);
  }

  const renderControl = (overlay?: boolean) => {
    return (
      <div
        className={cn(
          "flex items-center justify-between mb-8 gap-4",
          overlay ? "absolute top-0 left-0 right-0 z-2" : ""
        )}
      >
        <button
          onClick={goToPrevious}
          className="p-2 pr-20 cursor-pointer text-foreground transition-opacity hover:opacity-70 shrink-0"
          aria-label="Previous game"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        <div className="flex gap-2 justify-center flex-1">
          {GAMES.map((_, idx) => (
            <button
              key={idx}
              onClick={() => api?.scrollTo(idx)}
              className={`w-2 h-2 rounded-full transition-colors ${
                idx === current ? "bg-primary" : "bg-border"
              }`}
              aria-label={`Go to game ${idx + 1}`}
            />
          ))}
        </div>

        <button
          onClick={goToNext}
          className="p-2 pl-20 cursor-pointer text-foreground transition-opacity hover:opacity-70 shrink-0"
          aria-label="Next game"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>
    );
  };

  return (
    <div
      className={cn(
        "w-full max-w-6xl mx-auto",
        panelOpen ? "lg:pl-56" : "lg:pl-12"
      )}
    >
      {/* Collapsible left sidebar (hidden on small screens) */}
      <aside
        className={cn(
          "hidden lg:block py-4 fixed left-0 top-0 bottom-0 z-50 border-r border-border bg-black backdrop-blur shadow-sm overflow-y-auto",
          // "supports-backdrop-filter:bg-background/60",
          panelOpen ? "w-56" : "w-12"
        )}
      >
        {/* Toggle handle */}
        {/* <button
          type="button"
          onClick={() => setPanelOpen((v) => !v)}
          className="absolute right-0 top-1/2 -translate-y-1/2 w-6 h-10 rounded-md border border-border bg-background shadow hover:bg-muted transition z-50"
          aria-label={panelOpen ? "Collapse panel" : "Expand panel"}
        >
          {panelOpen ? (
            <ChevronLeft className="mx-auto h-4 w-4" />
          ) : (
            <ChevronRight className="mx-auto h-4 w-4" />
          )}
        </button> */}

        <div className="text-white font-bold text-left text-xl px-2 mb-4">
          GAME LISTS
        </div>

        <div className={cn("p-2 space-y-2", panelOpen ? "" : "px-1")}>
          {GAMES.map((game, idx) => (
            <button
              key={game.id}
              onClick={() => api?.scrollTo(idx)}
              className={cn(
                "w-full text-left rounded-md overflow-hidden transition-colors bg-white hover:border-primary/60 hover:bg-primary/5 focus:outline-none focus:ring-2 focus:ring-primary"
                // idx === current ? "border-primary bg-primary/10" : ""
                // "border-[2px] border-white"
              )}
              aria-label={`Open ${game.name}`}
              title={!panelOpen ? game.name : undefined}
            >
              <div
                className={cn(
                  "flex items-center gap-3 p-2",
                  panelOpen ? "" : "justify-center p-1",
                  idx === current
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
                      idx === current && "bg-white px-1"
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

      <Carousel setApi={setApi} className="w-full" opts={{ watchDrag: false }}>
        <div className="relative">
          {renderControl(true)}
          <CarouselContent
            onPointerDown={(e) => e.stopPropagation()}
            onTouchStart={(e) => e.stopPropagation()}
          >
            {GAMES.map((game, idx) => (
              <CarouselItem key={idx} className="pl-2">
                <div className="mb-8">
                  {/* Game title and info */}
                  <div className="mb-4">
                    <div className="flex items-center gap-3 pl-10 mb-2">
                      <div className="flex items-center gap-3">
                        <span
                          className={`px-3 py-1 rounded text-white text-sm font-semibold ${
                            DIFFICULTY_COLORS[game.difficulty]
                          }`}
                        >
                          {DIFFICULTY_TEXT[game.difficulty]}
                        </span>
                      </div>
                      <h1 className="text-4xl font-semibold text-primaryx text-black">
                        {game.name}
                      </h1>
                    </div>
                    <p className="text-lg text-foreground/80 mb-4">
                      {game.description}
                    </p>
                  </div>

                  {/* Game tabs */}
                  <div>
                    <GameTabs game={game} />
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </div>
      </Carousel>

      {renderControl()}
    </div>
  );
}
