"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import gsap from "gsap";
import {
  ArrowRight,
  ArrowUpRight,
  CalendarCheck,
  Sparkles,
  Clock,
} from "lucide-react";
import { heroContent } from "@/content/hero";
import WhatsAppTeamInbox from "@/components/landing-page/WhatsAppTeamInbox";

// Dynamically import WebGL GradientASCII with SSR disabled for optimal hydration
const GradientASCII = dynamic(() => import("@/reuseable/gradientAscii"), {
  ssr: false,
});

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // GSAP context for clean lifecycle scoping and cleanup
    const ctx = gsap.context(() => {
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      if (prefersReducedMotion) {
        // Immediate show if reduced motion is preferred
        gsap.set(
          [
            ".hero-badge",
            ".hero-title-line",
            ".hero-subheadline",
            ".hero-cta-group",
            ".hero-dashboard-wrapper",
            ".hero-floating-card",
          ],
          { opacity: 1, y: 0, scale: 1 }
        );
        return;
      }

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(
        ".hero-badge",
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.7, delay: 0.1 }
      )
        .fromTo(
          ".hero-title-line",
          { opacity: 0, y: 28 },
          { opacity: 1, y: 0, duration: 0.85, stagger: 0.14 },
          "-=0.4"
        )
        .fromTo(
          ".hero-subheadline",
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.7 },
          "-=0.55"
        )
        .fromTo(
          ".hero-cta-group",
          { opacity: 0, y: 18 },
          { opacity: 1, y: 0, duration: 0.65 },
          "-=0.45"
        )
        .fromTo(
          ".hero-dashboard-wrapper",
          { opacity: 0, y: 35, scale: 0.97 },
          { opacity: 1, y: 0, scale: 1, duration: 1.05, ease: "power2.out" },
          "-=0.3"
        )
        .fromTo(
          ".hero-floating-card",
          { opacity: 0, y: 24, scale: 0.92 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.65,
            stagger: 0.18,
            ease: "back.out(1.4)",
          },
          "-=0.5"
        );

      // Subtle resting float animation for the badge cards
      gsap.to(".hero-floating-card-1", {
        y: "-=6",
        duration: 3.2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
      gsap.to(".hero-floating-card-2", {
        y: "+=6",
        duration: 3.8,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: 0.4,
      });
      gsap.to(".hero-floating-card-3", {
        y: "-=7",
        duration: 3.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: 0.7,
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative min-h-[90vh] w-full overflow-hidden pt-24 pb-24 sm:pt-28 md:pt-32 md:pb-24 bg-[#faf8f5]"
      aria-labelledby="hero-heading"
    >
      {/* Background: WebGL GradientASCII flare */}
      <div
        className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
        aria-hidden="true"
      >
        <div
          className="absolute inset-0"
          style={{
            WebkitMaskImage:
              "radial-gradient(ellipse 90% 80% at 50% 25%, black 45%, transparent 95%)",
            maskImage:
              "radial-gradient(ellipse 90% 80% at 50% 25%, black 45%, transparent 95%)",
          }}
        >
          <GradientASCII
            shape="horizon"
            colors={["#ea580c", "#f97316", "#fb923c", "#fed7aa"]}
            cellSize={16}
            density={0.7}
            glyphOpacity={0.45}
            glow={0.3}
            softness={0.9}
            speed={0.7}
            scale={2.15}
            intro={false}
            lightMode={false}
            mouseInteraction={true}
            className="h-full w-full"
          />
        </div>

        {/* Soft bottom vignette into page background */}
        {/* <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-background via-background/60 to-transparent" /> */}
      </div>


      {/* Hero Foreground Content */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          {/* Top Pill Announcement */}
          <div className="hero-badge mb-3 inline-flex items-center gap-2 rounded-full border border-amber-500 bg-amber-500/10 px-4 py-1.5 backdrop-blur-md">
            {heroContent.badge.pulseDot && (
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-green-600" />
              </span>
            )}
            <span className="font-secondary tracking-tight text-xs md:text-sm font-semibold uppercase text-black dark:text-amber-300">
              {heroContent.badge.text}
            </span>
          </div>

          {/* Headline in EB Garamond */}
          <h1
            id="hero-heading"
            className=" font-medium tracking-tight text-black dark:text-zinc-50 leading-[1.08] sm:leading-[1.08]"
          >
            <span className="block text-3xl sm:text-5xl md:text-6xl whitespace-pre-line">
              {heroContent.headline.line1}
            </span>
            <span className="block font-figtree text-4xl sm:text-5xl md:text-6xl text-white tracking-tight dark:text-zinc-200">
              {/* {heroContent.headline.line2} */}
            </span>
          </h1>

          {/* Subheadline in Figtree */}
          <p className="hero-subheadline mx-auto mt-6 max-w-3xl font-secondary text-sm  sm:text-lg md:text-xl text-white dark:text-zinc-300 leading-[1.3] font-normal">
            {heroContent.subheadline}
          </p>

          {/* CTA Buttons */}
          <div className="hero-cta-group mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 font-secondary">
            <Link
              href={heroContent.primaryCta.href}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-zinc-950 px-7 py-3.5 text-base font-semibold text-white shadow-lg shadow-zinc-950/15 transition-all hover:bg-zinc-800 hover:shadow-xl active:scale-98 dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground tracking-tight"
            >
              <span>{heroContent.primaryCta.label}</span>
              <ArrowUpRight className="h-4 w-4 opacity-75" aria-hidden="true" />
            </Link>

            <Link
              href={heroContent.secondaryCta.href}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full border border-zinc-300 dark:border-zinc-700 bg-white/70 dark:bg-zinc-900/70 px-7 py-3.5 text-base font-semibold text-black dark:text-zinc-200 backdrop-blur-sm transition-all hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:border-zinc-400 active:scale-98 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground tracking-tight"
            >
              <span>{heroContent.secondaryCta.label}</span>
              <ArrowUpRight className="h-4 w-4 opacity-75" aria-hidden="true" />
            </Link>
          </div>
        </div>

        {/* Dashboard Mockup Display - Adaptive: Smartphone frame on mobile, Widescreen Team Inbox on desktop */}
        <div className="hero-dashboard-wrapper relative mx-auto mt-12 sm:mt-18 lg:mt-12 max-w-[340px] xs:max-w-[375px] sm:max-w-6xl">
          {/* Subtle glowing halo behind the dashboard */}
          <div
            className="absolute -inset-1 rounded-3xl bg-gradient-to-b from-emerald-500/15 via-amber-500/10 to-transparent blur-2xl pointer-events-none"
            aria-hidden="true"
          />

          {/* Main frame with phone bezel on mobile */}
          <div className="relative rounded-[32px] sm:rounded-2xl border-2 sm:border border-zinc-800 sm:border-zinc-200/90 dark:border-zinc-800 bg-zinc-900 sm:bg-[#faf8f5] dark:bg-zinc-950 p-1 sm:p-2.5 shadow-2xl shadow-zinc-950/25 sm:shadow-zinc-950/15 backdrop-blur-md">
            <div className="overflow-hidden rounded-[26px] sm:rounded-xl border border-zinc-800 sm:border-zinc-200/80 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-inner">
              <WhatsAppTeamInbox />
            </div>
          </div>

          {/* Floating Card 1: WhatsApp First Response SLA (Top Left) */}
          <div className="hero-floating-card hero-floating-card-1 absolute -left-4 lg:-left-8 top-14 hidden lg:flex items-center gap-3.5 rounded-2xl border border-zinc-200/90 dark:border-zinc-800 bg-white/95 dark:bg-zinc-900/95 p-3.5 shadow-xl shadow-zinc-900/10 backdrop-blur-md max-w-xs z-30">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-500/15 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400">
              <CalendarCheck className="h-5 w-5" aria-hidden="true" />
            </div>
            <div>
              <div className="font-figtree text-xs font-bold text-zinc-900 dark:text-zinc-100">
                {heroContent.notifications[0].title}
              </div>
              <div className="font-figtree text-[11px] text-zinc-500 dark:text-zinc-400">
                {heroContent.notifications[0].subtitle}
              </div>
              <div className="mt-0.5 font-figtree text-[10px] font-semibold text-emerald-700 dark:text-emerald-400">
                {heroContent.notifications[0].meta}
              </div>
            </div>
          </div>

          {/* Floating Card 2: Shared Team Inbox Multi-Agent (Bottom Left) */}
          <div className="hero-floating-card hero-floating-card-2 absolute -left-6 lg:-left-10 -bottom-8 hidden lg:flex flex-col gap-2 rounded-2xl border border-amber-200/80 dark:border-zinc-800 bg-white/95 dark:bg-zinc-900/95 p-4 shadow-xl shadow-amber-900/10 backdrop-blur-md max-w-xs z-30">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 font-figtree text-xs font-bold text-zinc-900 dark:text-zinc-100">
                <Sparkles className="h-3.5 w-3.5 text-amber-600" />
                <span>{heroContent.notifications[1].title}</span>
              </div>
              <span className="font-figtree text-[10px] rounded-full bg-emerald-100 dark:bg-emerald-950/60 px-2 py-0.5 text-emerald-800 dark:text-emerald-300 font-semibold">
                Live
              </span>
            </div>
            <p className="font-figtree text-xs text-zinc-600 dark:text-zinc-300 leading-snug">
              {heroContent.notifications[1].subtitle}
            </p>
            {heroContent.notifications[1].action && (
              <Link
                href={heroContent.notifications[1].action.href}
                className="inline-flex items-center gap-1 font-figtree text-[11px] font-semibold text-emerald-700 dark:text-emerald-400 hover:underline"
              >
                <span>{heroContent.notifications[1].action.label}</span>
                <ArrowRight className="h-3 w-3" />
              </Link>
            )}
          </div>

          {/* Floating Card 3: Recovered No-Show Revenue (Right) */}
          <div className="hero-floating-card hero-floating-card-3 absolute -right-4 lg:-right-8 top-1/4 hidden lg:flex items-center gap-3.5 rounded-2xl border border-zinc-200/90 dark:border-zinc-800 bg-white/95 dark:bg-zinc-900/95 p-3.5 shadow-xl shadow-zinc-900/10 backdrop-blur-md max-w-xs z-30">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-500/15 text-amber-600 dark:bg-amber-500/20 dark:text-amber-400">
              <Clock className="h-5 w-5" aria-hidden="true" />
            </div>
            <div>
              <div className="font-figtree text-xs font-bold text-zinc-900 dark:text-zinc-100">
                {heroContent.notifications[2].title}
              </div>
              <div className="font-figtree text-[11px] text-zinc-500 dark:text-zinc-400">
                {heroContent.notifications[2].subtitle}
              </div>
              <div className="mt-0.5 font-figtree text-[10px] font-semibold text-amber-700 dark:text-amber-400">
                {heroContent.notifications[2].meta}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
