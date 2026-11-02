"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import {
  ArrowUpRight,
  Check,
  Clock,
  Sparkles,
  MessageCircle,
  CheckCheck,
  Calendar,
  Zap,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { featuresContent } from "@/content/features";
import GradientASCII from "@/components/GradientASCII";

/* =========================================================================
   CARD 1: LEAD MANAGEMENT MINI-UI
   Fixed-dimension, calm, architectural workflow with smooth auto-assignment loop.
   ZERO height jumps or layout shifts.
   ========================================================================= */
function LeadManagementMiniUI() {
  const [assigned, setAssigned] = useState(false);

  useEffect(() => {
    // Calm 6-second loop: toggles between New Lead and Auto-Assigned
    const timer = setInterval(() => {
      setAssigned((prev) => !prev);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full h-[320px] flex flex-col items-center justify-center select-none">
      {/* Workflow Trigger Pill */}
      <div className="mb-2 inline-flex items-center gap-1.5 rounded-full border border-zinc-200/90 dark:border-zinc-700 bg-white dark:bg-zinc-800/90 px-3 py-1 text-xs font-mono text-zinc-700 dark:text-zinc-300 shadow-2xs">
        <Zap className="h-3 w-3 text-orange-500" />
        <span>When lead messages on WhatsApp</span>
      </div>

      {/* Connecting Vertical Stem */}
      <div className="h-3 w-px bg-zinc-300 dark:bg-zinc-700" aria-hidden="true" />

      {/* Floating Lead Card (Strict Fixed Height) */}
      <div className="w-full h-[220px] rounded-2xl border border-zinc-200/90 dark:border-zinc-700/80 bg-white dark:bg-zinc-900 p-4 shadow-sm shadow-zinc-900/5 flex flex-col justify-between">
        {/* Header */}
        <div className="flex items-center justify-between pb-2 border-b border-zinc-100 dark:border-zinc-800">
          <div className="flex items-center gap-1.5">
            <span
              className={`h-2 w-2 rounded-full transition-colors duration-500 ${
                assigned ? "bg-emerald-500" : "bg-orange-500 animate-pulse"
              }`}
            />
            <span className="font-mono text-xs font-semibold tracking-tight uppercase text-zinc-700 dark:text-zinc-300">
              {assigned ? "ASSIGNED LEAD" : "NEW LEAD"}
            </span>
          </div>
          <span className="font-mono text-xs text-zinc-400">Just now</span>
        </div>

        {/* Lead Details */}
        <div className="flex items-start justify-between my-auto">
          <div>
            <h4 className="font-secondary text-base font-bold text-zinc-900 dark:text-zinc-100">
              Sarah Johnson
            </h4>
            <div className="mt-0.5 flex items-center gap-1.5 text-xs text-zinc-500 dark:text-zinc-400 font-secondary">
              <MessageCircle className="h-3.5 w-3.5 text-emerald-500" />
              <span>Website Inquiry • Bridal Styling</span>
            </div>
          </div>
          <div
            className={`flex h-8 w-8 items-center justify-center rounded-full font-semibold text-xs border transition-colors duration-500 ${
              assigned
                ? "bg-emerald-50 text-emerald-600 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-400 dark:border-emerald-800"
                : "bg-orange-50 text-orange-600 border-orange-200 dark:bg-orange-950/40 dark:text-orange-400 dark:border-orange-800"
            }`}
          >
            SJ
          </div>
        </div>

        {/* Status Pill & Action */}
        <div className="flex items-center justify-between pt-2 border-t border-zinc-100 dark:border-zinc-800">
          <span
            className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium border transition-colors duration-500 ${
              assigned
                ? "bg-emerald-500/10 text-emerald-700 border-emerald-500/20 dark:text-emerald-300"
                : "bg-amber-500/10 text-amber-700 border-amber-500/20 dark:text-amber-300"
            }`}
          >
            <span
              className={`h-1.5 w-1.5 rounded-full ${
                assigned ? "bg-emerald-500" : "bg-amber-500 animate-ping"
              }`}
            />
            <span>{assigned ? "Assigned • Front Desk" : "● New Lead"}</span>
          </span>

          <button
            type="button"
            onClick={() => setAssigned(!assigned)}
            className="inline-flex items-center gap-1 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-zinc-50 hover:bg-orange-50 hover:border-orange-200 hover:text-orange-600 dark:bg-zinc-800 dark:hover:bg-zinc-700 px-2.5 py-1 text-xs font-semibold text-zinc-700 dark:text-zinc-200 transition-colors"
          >
            <span>{assigned ? "Reassign" : "Assign Lead"}</span>
            <ArrowUpRight className="h-3 w-3" />
          </button>
        </div>
      </div>
    </div>
  );
}

/* =========================================================================
   CARD 2: AUTOMATED FOLLOW-UPS MINI-UI
   Minimalist live ticking countdown timer, steady workflow labels, and
   fixed WhatsApp message preview. ZERO height jumps.
   ========================================================================= */
function AutomatedFollowUpsMiniUI() {
  const [seconds, setSeconds] = useState(5076); // 01:24:36 in seconds

  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds((prev) => (prev > 0 ? prev - 1 : 5076));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (totalSeconds: number) => {
    const hrs = String(Math.floor(totalSeconds / 3600)).padStart(2, "0");
    const mins = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, "0");
    const secs = String(totalSeconds % 60).padStart(2, "0");
    return `${hrs}:${mins}:${secs}`;
  };

  return (
    <div className="w-full h-[320px] flex flex-col justify-between rounded-2xl border border-zinc-200/90 dark:border-zinc-700/80 bg-white dark:bg-zinc-900 p-4 shadow-sm shadow-zinc-900/5 select-none">
      {/* Header */}
      <div className="flex items-center justify-between pb-2 border-b border-zinc-100 dark:border-zinc-800">
        <span className="font-mono text-xs font-semibold tracking-tight uppercase text-zinc-500 dark:text-zinc-400">
          FOLLOW-UP AUTOMATION
        </span>
        <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
      </div>

      {/* Center: Live Timer Clock Display */}
      <div className="text-center my-1">
        <div className="font-mono text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-100 tabular-nums">
          {formatTime(seconds)}
        </div>
        <div className="mt-0.5 flex items-center justify-center gap-1 text-xs font-medium text-orange-600 dark:text-orange-400 font-secondary">
          <Clock className="h-3 w-3" />
          <span>Next automated follow-up</span>
        </div>
      </div>

      {/* Workflow Checklist (Fixed 3 items) */}
      <div className="space-y-1 rounded-xl bg-zinc-50 dark:bg-zinc-800/60 p-2 border border-zinc-100 dark:border-zinc-700/50 text-xs font-secondary">
        <div className="flex items-center gap-2 text-zinc-700 dark:text-zinc-300">
          <Check className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
          <span>Lead captured from WhatsApp</span>
        </div>
        <div className="flex items-center gap-2 text-zinc-700 dark:text-zinc-300">
          <Check className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
          <span>Reminder sequence scheduled</span>
        </div>
        <div className="flex items-center gap-2 text-orange-600 dark:text-orange-400 font-medium">
          <span className="h-1.5 w-1.5 rounded-full bg-orange-500 animate-pulse shrink-0" />
          <span>Message queue active</span>
        </div>
      </div>

      {/* WhatsApp Preview Bubble (Fixed Height) */}
      <div className="rounded-xl bg-emerald-500/10 border border-emerald-500/20 p-2.5 text-xs text-zinc-800 dark:text-zinc-200 font-secondary">
        <div className="flex items-center justify-between font-semibold text-emerald-700 dark:text-emerald-400 text-xs uppercase font-mono mb-1">
          <span className="flex items-center gap-1">
            <MessageCircle className="h-3 w-3" />
            <span>WhatsApp Preview</span>
          </span>
          <span className="text-zinc-400 font-normal">10:30 AM</span>
        </div>
        <p className="italic text-zinc-700 dark:text-zinc-300 leading-[1.2] line-clamp-2">
          &ldquo;Hi Sarah! Just checking in on your appointment for tomorrow at 2 PM 🌿&rdquo;
        </p>
        <div className="flex items-center justify-end gap-1 mt-1 text-xs text-zinc-400 font-mono">
          <CheckCheck className="h-3.5 w-3.5 text-emerald-500" />
        </div>
      </div>
    </div>
  );
}

/* =========================================================================
   CARD 3: APPOINTMENTS & TASKS MINI-UI
   Simulated Real Video Demo:
   A realistic pointer cursor moves smoothly to Card 1 -> clicks & completes ->
   moves to Card 2 -> clicks & completes -> moves to Card 3 -> clicks & completes.
   Progress bar glides in real-time. 100% authentic feel, zero layout shifts.
   ========================================================================= */
function AppointmentsTasksMiniUI() {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    // 4 phases, 1.8s each = 7.2s smooth realistic video loop
    const timer = setInterval(() => {
      setPhase((prev) => (prev + 1) % 4);
    }, 1800);
    return () => clearInterval(timer);
  }, []);

  const task1Done = phase >= 1;
  const task2Done = phase >= 2;
  const task3Done = phase >= 3;

  const completedCount =
    (task1Done ? 1 : 0) + (task2Done ? 1 : 0) + (task3Done ? 1 : 0);
  const percent = Math.round((completedCount / 3) * 100);

  // Simulated cursor coordinates inside the card
  const cursorTop =
    phase === 0 ? "70px" : phase === 1 ? "138px" : phase === 2 ? "206px" : "265px";
  const cursorLeft = phase === 3 ? "82%" : "72%";

  return (
    <div className="relative w-full h-[320px] flex flex-col justify-between rounded-2xl border border-zinc-200/90 dark:border-zinc-700/80 bg-white dark:bg-zinc-900 p-4 shadow-sm shadow-zinc-900/5 select-none overflow-hidden">
      {/* Simulated Realistic macOS/SaaS Cursor */}
      <div
        className="pointer-events-none absolute z-30 transition-all duration-700 ease-out"
        style={{
          top: cursorTop,
          left: cursorLeft,
          transform: phase < 3 ? "scale(0.92)" : "scale(1)",
        }}
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          className="drop-shadow-md text-zinc-900 dark:text-white"
        >
          <path
            d="M4.5 3.5L11.5 21L14.5 13.5L22 10.5L4.5 3.5Z"
            fill="currentColor"
            stroke="#ffffff"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      {/* Header */}
      <div className="flex items-center justify-between pb-2 border-b border-zinc-100 dark:border-zinc-800">
        <div className="flex items-center gap-1.5">
          <Calendar className="h-3.5 w-3.5 text-orange-500" />
          <span className="font-mono text-xs font-semibold tracking-tight uppercase text-zinc-700 dark:text-zinc-300">
            TODAY&apos;S PRIORITIES
          </span>
        </div>
        <span
          className={`rounded-full px-2 py-0.5 text-xs font-mono font-bold transition-all duration-500 ${
            completedCount === 3
              ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400 scale-102"
              : "bg-orange-100 text-orange-600 dark:bg-orange-950/60 dark:text-orange-400"
          }`}
        >
          {completedCount === 3 ? "3/3 ✓ All Clear" : `${completedCount}/3 Completed`}
        </span>
      </div>

      {/* 3 Real Priority Task Cards (Strict 58px Fixed Height Each) */}
      <div className="space-y-2 my-auto">
        {/* Task 1 */}
        <div
          className={`w-full h-[58px] rounded-xl p-2.5 flex items-center justify-between border transition-all duration-500 ${
            task1Done
              ? "border-zinc-100 dark:border-zinc-800 bg-zinc-50/70 dark:bg-zinc-800/40 opacity-75"
              : phase === 0
              ? "border-orange-500/60 bg-orange-50/40 dark:bg-orange-950/20 shadow-sm shadow-orange-500/10 scale-101"
              : "border-zinc-200/80 dark:border-zinc-800 bg-white dark:bg-zinc-900"
          }`}
        >
          <div className="flex items-center gap-2.5">
            <div
              className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-md border transition-all duration-500 ${
                task1Done
                  ? "border-emerald-500 bg-emerald-500 text-white"
                  : phase === 0
                  ? "border-orange-500 bg-white dark:bg-zinc-800"
                  : "border-zinc-300 dark:border-zinc-600 bg-white dark:bg-zinc-800"
              }`}
            >
              {task1Done && <Check className="h-3 w-3 stroke-[3]" />}
            </div>
            <div>
              <div
                className={`font-secondary text-xs font-semibold transition-all duration-500 ${
                  task1Done
                    ? "line-through text-zinc-400 dark:text-zinc-500"
                    : "text-zinc-900 dark:text-zinc-100"
                }`}
              >
                Product Demo
              </div>
              <div className="font-mono text-xs text-zinc-400">10:30 AM</div>
            </div>
          </div>
          <span
            className={`rounded-md px-1.5 py-0.5 text-xs font-mono font-medium transition-all duration-500 ${
              task1Done
                ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400"
                : phase === 0
                ? "bg-orange-500 text-white shadow-xs"
                : "bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300"
            }`}
          >
            {task1Done ? "Done ✓" : phase === 0 ? "Clicking..." : "Upcoming"}
          </span>
        </div>

        {/* Task 2 */}
        <div
          className={`w-full h-[58px] rounded-xl p-2.5 flex items-center justify-between border transition-all duration-500 ${
            task2Done
              ? "border-zinc-100 dark:border-zinc-800 bg-zinc-50/70 dark:bg-zinc-800/40 opacity-75"
              : phase === 1
              ? "border-orange-500/60 bg-orange-50/40 dark:bg-orange-950/20 shadow-sm shadow-orange-500/10 scale-101"
              : "border-zinc-200/80 dark:border-zinc-800 bg-white dark:bg-zinc-900"
          }`}
        >
          <div className="flex items-center gap-2.5">
            <div
              className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-md border transition-all duration-500 ${
                task2Done
                  ? "border-emerald-500 bg-emerald-500 text-white"
                  : phase === 1
                  ? "border-orange-500 bg-white dark:bg-zinc-800"
                  : "border-zinc-300 dark:border-zinc-600 bg-white dark:bg-zinc-800"
              }`}
            >
              {task2Done && <Check className="h-3 w-3 stroke-[3]" />}
            </div>
            <div>
              <div
                className={`font-secondary text-xs font-semibold transition-all duration-500 ${
                  task2Done
                    ? "line-through text-zinc-400 dark:text-zinc-500"
                    : "text-zinc-900 dark:text-zinc-100"
                }`}
              >
                Client Follow-Up
              </div>
              <div className="font-mono text-xs text-zinc-400">12:00 PM</div>
            </div>
          </div>
          <span
            className={`rounded-md px-1.5 py-0.5 text-xs font-mono font-medium transition-all duration-500 ${
              task2Done
                ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400"
                : phase === 1
                ? "bg-orange-500 text-white shadow-xs"
                : "bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300"
            }`}
          >
            {task2Done ? "Done ✓" : phase === 1 ? "Clicking..." : "Upcoming"}
          </span>
        </div>

        {/* Task 3 */}
        <div
          className={`w-full h-[58px] rounded-xl p-2.5 flex items-center justify-between border transition-all duration-500 ${
            task3Done
              ? "border-zinc-100 dark:border-zinc-800 bg-zinc-50/70 dark:bg-zinc-800/40 opacity-75"
              : phase === 2
              ? "border-orange-500/60 bg-orange-50/40 dark:bg-orange-950/20 shadow-sm shadow-orange-500/10 scale-101"
              : "border-zinc-200/80 dark:border-zinc-800 bg-white dark:bg-zinc-900"
          }`}
        >
          <div className="flex items-center gap-2.5">
            <div
              className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-md border transition-all duration-500 ${
                task3Done
                  ? "border-emerald-500 bg-emerald-500 text-white"
                  : phase === 2
                  ? "border-orange-500 bg-white dark:bg-zinc-800"
                  : "border-zinc-300 dark:border-zinc-600 bg-white dark:bg-zinc-800"
              }`}
            >
              {task3Done && <Check className="h-3 w-3 stroke-[3]" />}
            </div>
            <div>
              <div
                className={`font-secondary text-xs font-semibold transition-all duration-500 ${
                  task3Done
                    ? "line-through text-zinc-400 dark:text-zinc-500"
                    : "text-zinc-900 dark:text-zinc-100"
                }`}
              >
                Discovery Call
              </div>
              <div className="font-mono text-xs text-zinc-400">03:00 PM</div>
            </div>
          </div>
          <span
            className={`rounded-md px-1.5 py-0.5 text-xs font-mono font-medium transition-all duration-500 ${
              task3Done
                ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400"
                : phase === 2
                ? "bg-orange-500 text-white shadow-xs"
                : "bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300"
            }`}
          >
            {task3Done ? "Done ✓" : phase === 2 ? "Clicking..." : "Upcoming"}
          </span>
        </div>
      </div>

      {/* Progress Bar & Summary */}
      <div className="pt-2 border-t border-zinc-100 dark:border-zinc-800">
        <div className="flex items-center justify-between font-mono text-xs text-zinc-500 dark:text-zinc-400">
          <span>
            {completedCount} Completed · {3 - completedCount} Upcoming
          </span>
          <span className="font-semibold text-orange-600 dark:text-orange-400 transition-all duration-500">
            {percent}%
          </span>
        </div>
        <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-zinc-100 dark:bg-zinc-800">
          <div
            className="h-full bg-gradient-to-r from-orange-500 to-amber-500 transition-all duration-700 ease-out"
            style={{ width: `${percent}%` }}
          />
        </div>
      </div>
    </div>
  );
}

/* =========================================================================
   CARD 4: CUSTOMER INTELLIGENCE MINI-UI
   Embeds the genuine GradientASCII WebGL canvas in the upper area with
   the floating AI Insight card. Exactly matches Claripa signature card.
   ========================================================================= */
function CustomerIntelligenceMiniUI() {
  const [followedUp, setFollowedUp] = useState(false);

  return (
    <div className="relative w-full h-[320px] rounded-2xl overflow-hidden border border-orange-200/80 dark:border-orange-500/30 bg-white dark:bg-zinc-900 shadow-sm flex flex-col justify-between">
      {/* Real GradientASCII Flare Background at top */}
      <div className="absolute inset-x-0 top-0 h-44 z-0 overflow-hidden pointer-events-none">
        <GradientASCII
          shape="horizon"
          colors={["#ea580c", "#f97316", "#fb923c", "#fed7aa"]}
          cellSize={16}
          density={0.7}
          glyphOpacity={0.35}
          glow={0.3}
          softness={0.9}
          speed={0.6}
          scale={2.2}
          intro={false}
          lightMode={false}
          mouseInteraction={false}
          className="h-full w-full"
        />
        {/* Soft gradient mask to blend flare downward into the card */}
        <div
          className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#fffbf7] dark:to-zinc-900"
          aria-hidden="true"
        />
      </div>

      {/* Floating Glass AI Insight Content */}
      <div className="relative z-10 p-4 h-full flex flex-col justify-between">
        {/* Header */}
        <div className="flex items-center justify-between pb-2 border-b border-orange-200/50 dark:border-zinc-800">
          <div className="flex items-center gap-1.5 text-orange-600 dark:text-orange-400">
            <Sparkles className="h-3.5 w-3.5 fill-orange-500/20" />
            <span className="font-mono text-xs font-bold tracking-tight uppercase">
              AI INSIGHT
            </span>
          </div>
          <span className="rounded-full bg-amber-500/15 border border-amber-500/30 px-2 py-0.5 text-xs font-mono font-semibold text-amber-700 dark:text-amber-300">
            High-intent lead
          </span>
        </div>

        {/* Insight Body Tailored to Appointments & Bookings */}
        <div className="my-auto py-2">
          <div className="font-secondary text-xs font-bold text-zinc-900 dark:text-zinc-100">
            Sarah Johnson
          </div>
          <p className="mt-1 font-secondary text-sm text-zinc-600 dark:text-zinc-300 leading-[1.4]">
            Sarah inquired about the <span className="font-semibold text-zinc-900 dark:text-zinc-100">Bridal Package</span> 3 times this week. A follow-up may help secure the booking.
          </p>
        </div>

        {/* Action Button */}
        <button
          type="button"
          onClick={() => setFollowedUp(!followedUp)}
          className={`w-full flex items-center justify-center gap-1.5 rounded-xl px-3 py-2 text-xs font-semibold tracking-tight transition-all ${
            followedUp
              ? "bg-emerald-600 text-white shadow-sm"
              : "bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white shadow-md shadow-orange-600/20 active:scale-98"
          }`}
        >
          <span>{followedUp ? "Follow-Up Sent via WhatsApp ✓" : "Follow Up"}</span>
          <ArrowUpRight className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
}

export function Feature() {
  const { eyebrow, headline, description, ctaButton, cards } = featuresContent;
  const sliderRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [activeSlide, setActiveSlide] = useState(0);

  const updateScrollState = useCallback(() => {
    if (!sliderRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current;
    setCanScrollLeft(scrollLeft > 10);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);

    const firstCard = sliderRef.current.firstElementChild as HTMLElement | null;
    const cardStep = firstCard ? firstCard.offsetWidth + 24 : 360;
    const index = Math.round(scrollLeft / cardStep);
    setActiveSlide(Math.min(Math.max(index, 0), cards.length - 1));
  }, [cards.length]);

  useEffect(() => {
    updateScrollState();
    window.addEventListener("resize", updateScrollState);
    return () => window.removeEventListener("resize", updateScrollState);
  }, [updateScrollState]);

  const scrollSlider = (direction: "left" | "right") => {
    if (!sliderRef.current) return;
    const firstCard = sliderRef.current.firstElementChild as HTMLElement | null;
    const cardStep = firstCard ? firstCard.offsetWidth + 24 : sliderRef.current.clientWidth * 0.8;
    sliderRef.current.scrollBy({
      left: direction === "left" ? -cardStep : cardStep,
      behavior: "smooth",
    });
  };

  const scrollToSlide = (index: number) => {
    if (!sliderRef.current) return;
    const cardElements = sliderRef.current.children;
    if (cardElements[index]) {
      (cardElements[index] as HTMLElement).scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "start",
      });
    }
  };

  return (
    <section
      id="features"
      aria-label="CtrlF Platform Features"
      className="relative w-full overflow-hidden bg-[#faf8f5] dark:bg-zinc-950 py-20 sm:py-24 lg:py-28"
    >
      <div className="px-6 sm:px-8 lg:px-[5%]">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 pb-8 sm:pb-10 border-b border-zinc-200/80 dark:border-zinc-800">
          <div className="max-w-2xl">
            {/* Eyebrow */}
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-orange-500/20 bg-orange-500/10 px-3.5 py-1 text-xs font-mono font-bold tracking-tightst text-orange-600 dark:text-orange-400">
              {eyebrow.dot && (
                <span className="h-2 w-2 rounded-full bg-orange-600 dark:bg-orange-500" />
              )}
              <span>{eyebrow.text}</span>
            </div>

            {/* Headline */}
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[#0e2733] dark:text-zinc-50 leading-[1.12]">
              <span className="block">{headline.line1}</span>
              <span className="block text-zinc-700 dark:text-zinc-300">
                {headline.line2}
              </span>
            </h2>
          </div>

          {/* Right column: Description, Explore Button & Slider Controls */}
          <div className="flex flex-col items-start lg:items-end gap-5 max-w-lg">
            <p className="font-secondary text-base sm:text-lg text-zinc-600 dark:text-zinc-400 leading-[1.4] lg:text-right">
              {description}
            </p>

            <div className="flex items-center gap-3 w-full lg:w-auto justify-between lg:justify-end">
              <Link
                href={ctaButton.href}
                className="inline-flex items-center gap-2 rounded-full border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-6 py-2.5 font-mono text-xs sm:text-sm font-semibold tracking-tight uppercase text-zinc-900 dark:text-zinc-100 shadow-2xs hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:border-zinc-400 transition-all active:scale-95"
              >
                <span>{ctaButton.label}</span>
                <ArrowUpRight className="h-4 w-4" />
              </Link>

              {/* Slider Navigation Arrows (Visible on Mobile & Tablet < xl, hidden on Desktop xl+) */}
              <div className="flex items-center gap-2 xl:hidden">
                <button
                  type="button"
                  onClick={() => scrollSlider("left")}
                  disabled={!canScrollLeft}
                  aria-label="Previous feature card"
                  className="w-10 h-10 rounded-full border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 flex items-center justify-center text-zinc-700 dark:text-zinc-300 shadow-2xs hover:bg-zinc-100 dark:hover:bg-zinc-800 disabled:opacity-30 disabled:cursor-not-allowed transition-all active:scale-95 cursor-pointer"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  type="button"
                  onClick={() => scrollSlider("right")}
                  disabled={!canScrollRight}
                  aria-label="Next feature card"
                  className="w-10 h-10 rounded-full border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 flex items-center justify-center text-zinc-700 dark:text-zinc-300 shadow-2xs hover:bg-zinc-100 dark:hover:bg-zinc-800 disabled:opacity-30 disabled:cursor-not-allowed transition-all active:scale-95 cursor-pointer"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* 4 Feature Cards: Fluid Horizontal Slider on Mobile & Tablet (< xl, including 1024px), Grid on Desktop (xl+) */}
        <div
          ref={sliderRef}
          onScroll={updateScrollState}
          className="mt-12 sm:mt-16 flex xl:grid xl:grid-cols-4 gap-6 overflow-x-auto xl:overflow-x-visible snap-x snap-mandatory scroll-smooth pb-4 pt-1 -mx-1 px-6 sm:-mx-8 sm:px-8 lg:-mx-[5%] lg:px-[5%] xl:mx-0 xl:px-0"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {/* Card 1: Lead Management */}
          <div className="group relative flex flex-col justify-between rounded-3xl border border-zinc-200/80 dark:border-zinc-800 bg-[#fbf9f6] dark:bg-zinc-900/60 p-6 sm:p-7 shadow-xs hover:shadow-xl hover:shadow-orange-950/5 hover:-translate-y-1 transition-all duration-300 min-h-[480px] w-[86vw] max-w-[340px] sm:max-w-[360px] md:max-w-[380px] shrink-0 snap-start xl:w-auto xl:max-w-none xl:shrink">
            {/* Top Mini UI Component (Strict Fixed Height) */}
            <LeadManagementMiniUI />

            {/* Bottom Card Title + Arrow */}
            <div className="mt-6 pt-5 border-t border-zinc-200/60 dark:border-zinc-800 flex items-center justify-between">
              <h3 className="font-heading text-xl sm:text-2xl font-medium text-[#0e2733] dark:text-zinc-100">
                {cards[0].title}
              </h3>
              <ArrowUpRight className="h-5 w-5 text-zinc-400 group-hover:text-black dark:group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
            </div>
          </div>

          {/* Card 2: Automated Follow-Ups */}
          <div className="group relative flex flex-col justify-between rounded-3xl border border-zinc-200/80 dark:border-zinc-800 bg-[#fbf9f6] dark:bg-zinc-900/60 p-6 sm:p-7 shadow-xs hover:shadow-xl hover:shadow-orange-950/5 hover:-translate-y-1 transition-all duration-300 min-h-[480px] w-[86vw] max-w-[340px] sm:max-w-[360px] md:max-w-[380px] shrink-0 snap-start xl:w-auto xl:max-w-none xl:shrink">
            {/* Top Mini UI Component (Strict Fixed Height) */}
            <AutomatedFollowUpsMiniUI />

            {/* Bottom Card Title + Arrow */}
            <div className="mt-6 pt-5 border-t border-zinc-200/60 dark:border-zinc-800 flex items-center justify-between">
              <h3 className="font-heading text-xl sm:text-2xl font-medium text-[#0e2733] dark:text-zinc-100">
                {cards[1].title}
              </h3>
              <ArrowUpRight className="h-5 w-5 text-zinc-400 group-hover:text-black dark:group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
            </div>
          </div>

          {/* Card 3: Appointments & Tasks */}
          <div className="group relative flex flex-col justify-between rounded-3xl border border-zinc-200/80 dark:border-zinc-800 bg-[#fbf9f6] dark:bg-zinc-900/60 p-6 sm:p-7 shadow-xs hover:shadow-xl hover:shadow-orange-950/5 hover:-translate-y-1 transition-all duration-300 min-h-[480px] w-[86vw] max-w-[340px] sm:max-w-[360px] md:max-w-[380px] shrink-0 snap-start xl:w-auto xl:max-w-none xl:shrink">
            {/* Top Mini UI Component (Strict Fixed Height) */}
            <AppointmentsTasksMiniUI />

            {/* Bottom Card Title + Arrow */}
            <div className="mt-6 pt-5 border-t border-zinc-200/60 dark:border-zinc-800 flex items-center justify-between">
              <h3 className="font-heading text-xl sm:text-2xl font-medium text-[#0e2733] dark:text-zinc-100">
                {cards[2].title}
              </h3>
              <ArrowUpRight className="h-5 w-5 text-zinc-400 group-hover:text-black dark:group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
            </div>
          </div>

          {/* Card 4: Customer Intelligence (Signature Card with GradientASCII background) */}
          <div className="group relative flex flex-col justify-between rounded-3xl border border-orange-300/70 dark:border-orange-500/40 bg-[#fbf9f6] dark:bg-zinc-900/60 p-6 sm:p-7 shadow-xs hover:shadow-xl hover:shadow-orange-950/10 hover:-translate-y-1 transition-all duration-300 min-h-[480px] w-[86vw] max-w-[340px] sm:max-w-[360px] md:max-w-[380px] shrink-0 snap-start xl:w-auto xl:max-w-none xl:shrink">
            {/* Top Mini UI Component with genuine GradientASCII background */}
            <CustomerIntelligenceMiniUI />

            {/* Bottom Narrative + Highlighted Orange Title */}
            <div className="mt-6 pt-5 border-t border-orange-200/60 dark:border-zinc-800">
              {cards[3].description && (
                <p className="font-secondary text-xs sm:text-sm text-black dark:text-zinc-400 leading-[1.3] mb-3">
                  {cards[3].description}
                </p>
              )}
              <div className="flex items-center justify-between">
                <h3 className="font-heading text-xl sm:text-2xl font-normal text-orange-600 dark:text-orange-400">
                  {cards[3].title}
                </h3>
                <ArrowUpRight className="h-5 w-5 text-orange-600 dark:text-orange-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              </div>
            </div>
          </div>
        </div>

        {/* Pagination Dots (Mobile & Tablet < xl) */}
        <div className="mt-6 flex items-center justify-center gap-2 xl:hidden">
          {cards.map((_, index) => (
            <button
              key={index}
              type="button"
              onClick={() => scrollToSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
              className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                activeSlide === index
                  ? "w-8 bg-orange-600 dark:bg-orange-500"
                  : "w-2 bg-zinc-300 dark:bg-zinc-700 hover:bg-zinc-400"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Feature;
