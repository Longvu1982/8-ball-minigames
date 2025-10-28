"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";

import { DIFFICULTY_COLORS, DIFFICULTY_TEXT, GAMES } from "@/lib/game-data";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback, useState } from "react";
import { GameTabs } from "./game-tabs";

export function GameCarousel() {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

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
    <div className="w-full max-w-6xl mx-auto">
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
                      <h1 className="text-4xl font-bold text-foreground mb-2">
                        {game.name}
                      </h1>
                    </div>
                    <p className="text-lg text-muted-foreground mb-4">
                      {game.description}
                    </p>
                  </div>

                  {/* Rules section */}
                  {/* <Accordion
                  type="single"
                  collapsible
                  className="bg-secondary rounded px-4 mb-8 cursor-pointer"
                  defaultValue="rules"
                >
                  <AccordionItem value="rules">
                    <AccordionTrigger className="w-full cursor-pointer">
                      <div>
                        <h3 className="font-semibold text-foreground mb-3">
                          Rules:
                        </h3>
                        <AccordionContent>
                          <ul className="space-y-2">
                            {game.rules.map((rule, ruleIdx) => (
                              <li
                                key={ruleIdx}
                                className="flex gap-3 text-sm text-muted-foreground"
                              >
                                <span className="font-semibold text-primary">
                                  {ruleIdx + 1}.
                                </span>
                                <span>{rule}</span>
                              </li>
                            ))}
                          </ul>
                        </AccordionContent>
                      </div>
                    </AccordionTrigger>
                  </AccordionItem>
                </Accordion> */}

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
