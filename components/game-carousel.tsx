"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";

import { GAMES } from "@/lib/game-data";
import { cn } from "@/lib/utils";
import { useCallback, useState } from "react";
import { GameTabs } from "./game-tabs";
import { GameCarouselControls } from "./game-carousel-controls";
import { GameListSidebar } from "./game-list-sidebar";
import { GameSlide } from "./game-slide";

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

  return (
    <div className={cn("w-full max-w-6xl mx-auto lg:pl-56")}>
      <GameListSidebar
        games={GAMES}
        currentIndex={current}
        onSelect={(idx) => api?.scrollTo(idx)}
      />

      <Carousel
        setApi={setApi}
        className="w-full mb-4"
        opts={{ watchDrag: false }}
      >
        <div className="relative">
          <GameCarouselControls
            overlay={true}
            onPrev={goToPrevious}
            onNext={goToNext}
            total={GAMES.length}
            current={current}
            onDotClick={(idx) => api?.scrollTo(idx)}
          />
          <CarouselContent
            onPointerDown={(e) => e.stopPropagation()}
            onTouchStart={(e) => e.stopPropagation()}
          >
            {GAMES.map((game, idx) => (
              <CarouselItem key={idx} className="pl-2">
                <GameSlide game={game} />
                <div>
                  <GameTabs game={game} />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </div>
      </Carousel>
      <div className="hidden lg:block">
        <GameCarouselControls
          overlay={false}
          onPrev={goToPrevious}
          onNext={goToNext}
          total={GAMES.length}
          current={current}
          onDotClick={(idx) => api?.scrollTo(idx)}
        />
      </div>
    </div>
  );
}
