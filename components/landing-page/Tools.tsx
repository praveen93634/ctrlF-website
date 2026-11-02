"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { toolsContent, type OrbitIconItem } from "@/content/tools";

export default function Tools() {
  const [activeAccordionId, setActiveAccordionId] = useState<string>(() => {
    const defaultItem = toolsContent.accordions.find((item) => item.defaultOpen);
    return defaultItem ? defaultItem.id : toolsContent.accordions[0]?.id || "";
  });

  const toggleAccordion = (id: string) => {
    setActiveAccordionId((prev) => (prev === id ? "" : id));
  };

  return (
    <section
      id="platform"
      aria-labelledby="platform-heading"
      className="relative w-full py-20 lg:py-28 bg-[#faf8f5] dark:bg-zinc-950 overflow-hidden"
    >
      {/* Background ambient radial glow accents */}
      <div className="absolute top-1/2 right-12 -translate-y-1/2 w-[420px] h-[420px] bg-orange-500/5 blur-3xl rounded-full pointer-events-none" />
      <div className="absolute bottom-8 left-12 w-80 h-80 bg-zinc-400/5 blur-3xl rounded-full pointer-events-none" />

      <div className="px-[5%] relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
          
          {/* Left Column: Heading, Subhead & Interactive Accordion */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 text-sm font-semibold tracking-tight text-orange-600 dark:text-orange-500 mb-3.5">
              {toolsContent.eyebrow.dot && (
                <span className="inline-block w-2 h-2 rounded-full bg-orange-600 dark:bg-orange-500 animate-pulse" />
              )}
              <span>{toolsContent.eyebrow.text}</span>
            </div>

            {/* Headline */}
            <h2
              id="platform-heading"
              className="font-primary text-3xl sm:text-4xl lg:text-[44px] font-medium tracking-tight text-[#112d3b] dark:text-zinc-100 leading-[1.1] mb-5"
            >
              {toolsContent.headline}
            </h2>

            {/* Description */}
            <p className="font-secondary text-base sm:text-[17px] text-zinc-600 dark:text-zinc-400 leading-[1.2] max-w-xl mb-4">
              {toolsContent.description}
            </p>

            {/* Accordion List */}
            <div
              role="region"
              aria-label="Platform capabilities list"
              className="flex flex-col divide-y divide-zinc-200/70 dark:divide-zinc-800/70 border-t border-b border-zinc-200/70 dark:border-zinc-800/70"
            >
              {toolsContent.accordions.map((item) => {
                const isOpen = activeAccordionId === item.id;
                return (
                  <div key={item.id} className="py-4 sm:py-4.5 transition-colors">
                    <button
                      type="button"
                      onClick={() => toggleAccordion(item.id)}
                      aria-expanded={isOpen}
                      aria-controls={`accordion-panel-${item.id}`}
                      id={`accordion-btn-${item.id}`}
                      className="group flex items-center gap-3.5 w-full text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500/50 rounded-lg py-0.5 cursor-pointer select-none"
                    >
                      {/* Checkmark Bullet */}
                      <span
                        className={cn(
                          "w-5 h-5 rounded-full flex items-center justify-center shrink-0 transition-all duration-200",
                          isOpen
                            ? "bg-orange-500 text-white shadow-xs scale-105"
                            : "bg-orange-50 dark:bg-orange-950/40 text-orange-600 dark:text-orange-400 group-hover:bg-orange-100 group-hover:scale-105"
                        )}
                        aria-hidden="true"
                      >
                        <Check className="w-3 h-3 stroke-[3]" />
                      </span>

                      {/* Title */}
                      <span
                        className={cn(
                          "text-base sm:text-[17px] font-medium tracking-tight transition-colors",
                          isOpen
                            ? "text-[#112d3b] dark:text-white font-semibold"
                            : "text-zinc-700 dark:text-zinc-300 group-hover:text-zinc-950 dark:group-hover:text-white"
                        )}
                      >
                        {item.title}
                      </span>
                    </button>

                    {/* Collapsible Content */}
                    <div
                      id={`accordion-panel-${item.id}`}
                      role="region"
                      aria-labelledby={`accordion-btn-${item.id}`}
                      className={cn(
                        "grid transition-all duration-300 ease-in-out pl-8.5",
                        isOpen
                          ? "grid-rows-[1fr] opacity-100 mt-2.5 mb-1"
                          : "grid-rows-[0fr] opacity-0"
                      )}
                    >
                      <div className="overflow-hidden">
                        <p className="font-secondary text-sm sm:text-[15px] text-zinc-500 dark:text-zinc-400 leading-relaxed max-w-lg">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Concentric Rotating Orbit Visualization */}
          <div className="lg:col-span-7 flex items-center justify-center relative">
            <div
              className="relative w-full max-w-[480px] sm:max-w-[520px] lg:max-w-[560px] aspect-square flex items-center justify-center select-none"
              aria-label="ctrlF platform integration orbits"
            >
              {/* Center Ambient Glow */}
              <div
                className="absolute inset-0 m-auto w-36 h-36 rounded-full bg-orange-500/20 blur-2xl pointer-events-none"
                aria-hidden="true"
              />

              {/* Center Squircle Brand Badge */}
              <div
                className="absolute inset-0 m-auto z-20 flex flex-col items-center justify-center w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-[#122c37] border border-white/10 shadow-2xl shadow-[#122c37]/35 transition-transform duration-300 hover:scale-105 cursor-pointer"
                title={toolsContent.centerBadge.tooltip}
              >
                <div className="relative flex flex-col items-center justify-center text-center leading-none">
                  <div className="flex items-baseline">
                    <span className="font-primary font-bold text-xl sm:text-2xl text-white tracking-tight">
                      {toolsContent.centerBadge.brandPrefix}
                    </span>
                    <span className="font-primary font-bold text-xl sm:text-2xl text-orange-500">
                      {toolsContent.centerBadge.brandHighlight}
                    </span>
                  </div>
                  <span className="text-[9px] font-mono tracking-widest text-orange-400/90 font-semibold uppercase mt-1">
                    {/* {toolsContent.centerBadge.badgeLabel} */}
                  </span>
                </div>
              </div>

              {/* Orbit 1: Inner Ring (44% diameter) */}
              <OrbitRing
                diameterPercent={44}
                durationSeconds={toolsContent.orbits.inner.durationSeconds}
                clockwise={toolsContent.orbits.inner.clockwise}
                icons={toolsContent.orbits.inner.icons}
                ringId="inner-ring"
              />

              {/* Orbit 2: Middle Ring (70% diameter) */}
              <OrbitRing
                diameterPercent={70}
                durationSeconds={toolsContent.orbits.middle.durationSeconds}
                clockwise={toolsContent.orbits.middle.clockwise}
                icons={toolsContent.orbits.middle.icons}
                ringId="middle-ring"
              />

              {/* Orbit 3: Outer Ring (96% diameter) */}
              <OrbitRing
                diameterPercent={96}
                durationSeconds={toolsContent.orbits.outer.durationSeconds}
                clockwise={toolsContent.orbits.outer.clockwise}
                icons={toolsContent.orbits.outer.icons}
                ringId="outer-ring"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

interface OrbitRingProps {
  diameterPercent: number;
  durationSeconds: number;
  clockwise: boolean;
  icons: OrbitIconItem[];
  ringId: string;
}

function OrbitRing({
  diameterPercent,
  durationSeconds,
  clockwise,
  icons,
  ringId,
}: OrbitRingProps) {
  const ringAnimation = clockwise ? "spin-clockwise" : "spin-counter-clockwise";
  const chipAnimation = clockwise ? "spin-counter-clockwise" : "spin-clockwise";

  return (
    <div
      id={ringId}
      className="orbit-ring absolute inset-0 m-auto rounded-full border border-dashed border-zinc-300 dark:border-zinc-700/80 pointer-events-none will-change-transform"
      style={{
        width: `${diameterPercent}%`,
        height: `${diameterPercent}%`,
        animation: `${ringAnimation} ${durationSeconds}s linear infinite`,
      }}
      aria-hidden="true"
    >
      {icons.map((icon) => {
        // Place icon exactly on perimeter of this circle
        const rad = (icon.angle * Math.PI) / 180;
        const leftPercent = 50 + 50 * Math.cos(rad);
        const topPercent = 50 + 50 * Math.sin(rad);

        return (
          <div
            key={icon.id}
            className="absolute pointer-events-auto -translate-x-1/2 -translate-y-1/2 will-change-transform"
            style={{
              left: `${leftPercent.toFixed(3)}%`,
              top: `${topPercent.toFixed(3)}%`,
            }}
          >
            {/* Counter-rotating squircle chip */}
            <div
              className="orbit-chip group/chip relative will-change-transform"
              style={{
                animation: `${chipAnimation} ${durationSeconds}s linear infinite`,
              }}
            >
              <div
                className={cn(
                  "relative flex items-center justify-center",
                  "w-11 h-11 sm:w-12 sm:h-12",
                  "bg-white dark:bg-zinc-900",
                  "border border-zinc-200/90 dark:border-zinc-800",
                  "shadow-[0_4px_16px_rgba(0,0,0,0.06)] dark:shadow-[0_4px_16px_rgba(0,0,0,0.4)]",
                  "rounded-2xl p-1",
                  "transition-all duration-200 ease-out",
                  "hover:scale-125 hover:z-30 hover:shadow-xl hover:border-orange-500/50 cursor-pointer"
                )}
              >
                <Image
                  src={encodeURI(icon.imageSrc)}
                  alt={icon.alt}
                  width={32}
                  height={32}
                  className="w-full h-full object-contain pointer-events-none"
                />

                {/* Tooltip */}
                <div
                  role="tooltip"
                  className="absolute -bottom-8 left-1/2 -translate-x-1/2 opacity-0 group-hover/chip:opacity-100 transition-opacity duration-150 pointer-events-none whitespace-nowrap bg-zinc-900 text-white text-[11px] font-medium px-2 py-0.5 rounded shadow-lg z-50"
                >
                  {icon.name}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
