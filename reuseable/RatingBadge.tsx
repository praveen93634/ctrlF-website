"use client";

import React from "react";
import { Star } from "lucide-react";

export interface RatingBadgeProps {
  platform?: string;
  score?: string;
  reviewsText?: string;
  stars?: number;
  theme?: "light" | "dark" | "auto";
  className?: string;
}

export function RatingBadge({
  platform = "G2",
  score = "4.5",
  reviewsText = "Rated 4.5 (2k+ reviews)",
  stars = 4.5,
  theme = "auto",
  className = "",
}: RatingBadgeProps) {
  const fullStars = Math.floor(stars);
  const hasHalfStar = stars % 1 !== 0;

  const starFilledClass =
    theme === "dark"
      ? "fill-white text-white"
      : "fill-amber-400 text-amber-400";

  const starUnfilledClass =
    theme === "dark"
      ? "fill-white/30 text-white/30"
      : "fill-zinc-200 text-zinc-200 dark:fill-zinc-700 dark:text-zinc-700";

  const textColorClass =
    theme === "dark"
      ? "text-white/95"
      : "text-zinc-600 dark:text-zinc-300";

  return (
    <div className={`flex items-center gap-2.5 shrink-0 ${className}`}>
      {/* G2 circular logo */}
      <div
        className="flex h-7 w-7 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-full bg-[#E05C47] text-white shadow-xs"
        aria-label={`${platform} review score ${score}`}
      >
        <span className="font-sans font-black tracking-tighter text-xs sm:text-sm leading-none select-none">
          G<span className="text-[9px] align-super">2</span>
        </span>
      </div>

      {/* Stars & review count */}
      <div className="flex flex-col justify-center">
        <div className="flex items-center gap-0.5">
          {Array.from({ length: fullStars }).map((_, i) => (
            <Star
              key={`star-${i}`}
              className={`h-3 w-3 sm:h-3.5 sm:w-3.5 ${starFilledClass}`}
              aria-hidden="true"
            />
          ))}
          {hasHalfStar && (
            <div className="relative inline-block h-3 w-3 sm:h-4.5 sm:w-4.5">
              <Star
                className={`h-3 w-3 sm:h-4.5 sm:w-4.5 ${starUnfilledClass}`}
                aria-hidden="true"
              />
              <div className="absolute inset-0 w-[50%] overflow-hidden">
                <Star
                  className={`h-3 w-3 sm:h-3.5 sm:w-3.5 ${starFilledClass}`}
                  aria-hidden="true"
                />
              </div>
            </div>
          )}
        </div>
        <span
          className={`text-[10px] sm:text-sm font-medium whitespace-nowrap tracking-tight font-secondary leading-tight mt-0.5 ${textColorClass}`}
        >
          {reviewsText}
        </span>
      </div>
    </div>
  );
}

export default RatingBadge;

