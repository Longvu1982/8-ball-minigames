"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface GameCarouselControlsProps {
  overlay?: boolean;
  onPrev: () => void;
  onNext: () => void;
  total: number;
  current: number;
  onDotClick: (index: number) => void;
}

export function GameCarouselControls({
  overlay,
  onPrev,
  onNext,
  total,
  current,
  onDotClick,
}: GameCarouselControlsProps) {
  return (
    <div
      className={cn(
        "flex items-center justify-between mb-8 gap-4",
        overlay ? "absolute top-0 left-0 right-0 z-2" : ""
      )}
    >
      <button
        onClick={onPrev}
        className="p-2 pr-20 cursor-pointer text-foreground transition-opacity hover:opacity-70 shrink-0"
        aria-label="Previous game"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      <div className="hidden lg:flex gap-2 justify-center flex-1">
        {Array.from({ length: total }).map((_, idx) => (
          <button
            key={idx}
            onClick={() => onDotClick(idx)}
            className={`w-2 h-2 rounded-full transition-colors ${
              idx === current ? "bg-primary" : "bg-border"
            }`}
            aria-label={`Go to game ${idx + 1}`}
          />
        ))}
      </div>

      <button
        onClick={onNext}
        className="p-2 pl-20 cursor-pointer text-foreground transition-opacity hover:opacity-70 shrink-0"
        aria-label="Next game"
      >
        <ChevronRight className="w-6 h-6" />
      </button>
    </div>
  );
}
