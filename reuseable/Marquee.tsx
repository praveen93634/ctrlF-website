"use client";

import React, { CSSProperties } from "react";

export interface MarqueeProps {
  children: React.ReactNode;
  /** Scrolling speed in seconds per full cycle (default: 30) */
  speed?: number;
  /** Scroll direction: "left" | "right" (default: "left") */
  direction?: "left" | "right";
  /** Whether to pause the animation when hovering over the marquee (default: true) */
  pauseOnHover?: boolean;
  /** Number of track duplicates for seamless looping (default: 4) */
  repeat?: number;
  /** Tailwind gap class between items (default: "gap-12") */
  gap?: string;
  /** Whether to apply soft transparent fade masks on the left and right edges (default: true) */
  fadeEdges?: boolean;
  /** Optional custom container class name */
  className?: string;
  /** Optional custom inner track class name */
  innerClassName?: string;
}

export function Marquee({
  children,
  speed = 30,
  direction = "left",
  pauseOnHover = true,
  repeat = 4,
  gap = "gap-12",
  fadeEdges = true,
  className = "",
  innerClassName = "",
}: MarqueeProps) {
  const animationClass =
    direction === "left"
      ? "marquee-track-scroll-left"
      : "marquee-track-scroll-right";

  const style = {
    "--marquee-duration": `${speed}s`,
  } as CSSProperties;

  return (
    <div
      style={style}
      className={`group relative flex w-full overflow-hidden select-none ${
        fadeEdges
          ? "[mask-image:linear-gradient(to_right,transparent_0%,black_6%,black_94%,transparent_100%)]"
          : ""
      } ${className}`}
    >
      <style>{`
        @keyframes marquee-scroll-left {
          0% { transform: translate3d(0%, 0, 0); }
          100% { transform: translate3d(-100%, 0, 0); }
        }
        @keyframes marquee-scroll-right {
          0% { transform: translate3d(-100%, 0, 0); }
          100% { transform: translate3d(0%, 0, 0); }
        }
        .marquee-track-scroll-left {
          animation: marquee-scroll-left var(--marquee-duration, 30s) linear infinite !important;
          will-change: transform;
        }
        .marquee-track-scroll-right {
          animation: marquee-scroll-right var(--marquee-duration, 30s) linear infinite !important;
          will-change: transform;
        }
        .group:hover .marquee-pause-hover {
          animation-play-state: paused !important;
        }
      `}</style>
      {Array.from({ length: repeat }).map((_, idx) => (
        <div
          key={idx}
          aria-hidden={idx > 0}
          className={`flex shrink-0 min-w-full items-center justify-around ${gap} ${animationClass} ${
            pauseOnHover ? "marquee-pause-hover" : ""
          } ${innerClassName}`}
        >
          {children}
        </div>
      ))}
    </div>
  );
}

export default Marquee;

