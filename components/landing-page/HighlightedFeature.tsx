"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  ShoppingBag,
  Send,
  Link2,
  ImageIcon,
  Video,
  Share2,
  ExternalLink,
  MessageCircle,
  Check,
  CheckCheck,
  ShieldCheck,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { highlightedFeatureContent } from "@/content/highlighted-feature";

/* =========================================================================
   VISUAL 1: CHATBOT BUILDER (60FPS Hardware-Accelerated Flow Builder)
   ========================================================================= */
const BUILDER_OPTIONS = [
  { id: "demo", label: "Book a demo", hasPort: false },
  { id: "track", label: "Track my order", hasPort: true }, // Index 1
  { id: "return", label: "Return/exchange policy", hasPort: true }, // Index 2
  { id: "about", label: "More about Acme", hasPort: false },
  { id: "place", label: "How can I place an order?", hasPort: false },
  { id: "feedback", label: "Product feedback", hasPort: false },
  { id: "website", label: "Visit Website", hasPort: false },
];

type NodeStatus = "hidden" | "dragging" | "placed";

function VisualChatbotBuilder() {
  const [node1Status, setNode1Status] = useState<NodeStatus>("hidden");
  const [node2Status, setNode2Status] = useState<NodeStatus>("hidden");
  const [node3Status, setNode3Status] = useState<NodeStatus>("hidden");
  const [activeOption, setActiveOption] = useState<number | null>(null);
  const [isClicking, setIsClicking] = useState(false);
  const [isActionHovered, setIsActionHovered] = useState(false);
  const [isActionButtonPressed, setIsActionButtonPressed] = useState(false);

  const cursorRef = useRef<HTMLDivElement>(null);
  const node1Ref = useRef<HTMLDivElement>(null);
  const node2Ref = useRef<HTMLDivElement>(null);
  const node3Ref = useRef<HTMLDivElement>(null);
  const wire1Ref = useRef<SVGPathElement>(null);
  const wire2Ref = useRef<SVGPathElement>(null);

  useEffect(() => {
    let animId: number;
    const startTime = performance.now();
    const duration = 8800; // 8.8s complete drag-and-drop animation loop

    const updateFrame = (now: number) => {
      const elapsed = (now - startTime) % duration;
      const progress = elapsed / duration; // 0 to 1

      let curX = 350;
      let curY = 250;
      let curScale = 1;

      // -------------------------------------------------------------
      // STAGE 0: Initially ONLY the sidebar is present (progress < 0.12)
      // Cursor moves to the Toolbar Send tool (x: 28, y: 92)
      // -------------------------------------------------------------
      if (progress < 0.08) {
        setNode1Status("hidden");
        setNode2Status("hidden");
        setNode3Status("hidden");
        setActiveOption(null);
        setIsActionHovered(false);
        setIsActionButtonPressed(false);

        const t = progress / 0.08;
        const ease = t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
        // Arc from (350, 250) via control (180, 190) to (28, 92)
        curX = (1 - ease) * (1 - ease) * 350 + 2 * (1 - ease) * ease * 180 + ease * ease * 28;
        curY = (1 - ease) * (1 - ease) * 250 + 2 * (1 - ease) * ease * 190 + ease * ease * 92;
      } else if (progress < 0.12) {
        // Clicks down on the Send tool to grab the Main Message Node
        setNode1Status("hidden");
        setNode2Status("hidden");
        setNode3Status("hidden");
        setActiveOption(null);

        curX = 28;
        curY = 92;
        const clickT = (progress - 0.08) / 0.04;
        curScale = clickT < 0.5 ? 1 - clickT * 0.28 : 0.86 + (clickT - 0.5) * 0.28;
      }
      // -------------------------------------------------------------
      // STAGE 1: Drag & Drop Node 1 (Center Main Node) (0.12 to 0.32)
      // Drags from sidebar (28, 92) to center position (left: 56, top: 12)
      // -------------------------------------------------------------
      else if (progress < 0.28) {
        setNode1Status("dragging");
        setNode2Status("hidden");
        setNode3Status("hidden");
        setActiveOption(null);

        const t = (progress - 0.12) / 0.16;
        const ease = t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

        // Offset from final base (56, 12)
        const dx = -46 * (1 - ease);
        const dy = 80 * (1 - ease);

        if (node1Ref.current) {
          node1Ref.current.style.transform = `translate3d(${dx}px, ${dy}px, 0) scale(1.02) rotate(-1.5deg)`;
        }

        // Cursor holds Node 1 top header
        curX = 56 + dx + 80;
        curY = 12 + dy + 14;
        curScale = 0.92;
      } else if (progress < 0.34) {
        // Node 1 is dropped and settles smoothly
        setNode1Status("placed");
        setNode2Status("hidden");
        setNode3Status("hidden");
        setActiveOption(null);

        if (node1Ref.current) {
          node1Ref.current.style.transform = "translate3d(0, 0, 0) scale(1) rotate(0deg)";
        }

        // Cursor releases and glides to "Track my order" port dot at (216, 115)
        const t = (progress - 0.28) / 0.06;
        const ease = t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
        curX = 136 + (216 - 136) * ease;
        curY = 26 + (115 - 26) * ease;
      }
      // -------------------------------------------------------------
      // STAGE 2: Click Port 1 & Drag & Drop Node 2 (Top-Right) (0.34 to 0.56)
      // Drags Node 2 to (left: 290, top: 12), drawing live Wire 1
      // -------------------------------------------------------------
      else if (progress < 0.38) {
        // Clicks the port dot of "Track my order"
        setNode1Status("placed");
        setNode2Status("hidden");
        setNode3Status("hidden");
        setActiveOption(1);

        curX = 216;
        curY = 115;
        const clickT = (progress - 0.34) / 0.04;
        curScale = clickT < 0.5 ? 1 - clickT * 0.28 : 0.86 + (clickT - 0.5) * 0.28;
      } else if (progress < 0.52) {
        // Dragging Node 2 to top right
        setNode1Status("placed");
        setNode2Status("dragging");
        setNode3Status("hidden");
        setActiveOption(1);

        const t = (progress - 0.38) / 0.14;
        const ease = t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

        const dx = -74 * (1 - ease);
        const dy = 58 * (1 - ease);

        if (node2Ref.current) {
          node2Ref.current.style.transform = `translate3d(${dx}px, ${dy}px, 0) scale(1.02) rotate(-1deg)`;
        }

        // Target incoming port on moving Node 2
        const portX = 290 + dx;
        const portY = 60 + dy;
        const midX = 216 + (portX - 216) * 0.55;

        if (wire1Ref.current) {
          wire1Ref.current.setAttribute("d", `M 216 115 H ${midX} V ${portY} H ${portX}`);
        }

        // Cursor holds Node 2 header
        curX = 290 + dx + 75;
        curY = 12 + dy + 14;
        curScale = 0.92;
      } else if (progress < 0.58) {
        // Node 2 is dropped & settled
        setNode1Status("placed");
        setNode2Status("placed");
        setNode3Status("hidden");
        setActiveOption(1);

        if (node2Ref.current) {
          node2Ref.current.style.transform = "translate3d(0, 0, 0) scale(1) rotate(0deg)";
        }
        if (wire1Ref.current) {
          wire1Ref.current.setAttribute("d", "M 216 115 H 256 V 60 H 290");
        }

        // Cursor swoops down towards "Return/exchange policy" port dot at (216, 141)
        const t = (progress - 0.52) / 0.06;
        const ease = t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
        curX = 365 + (216 - 365) * ease;
        curY = 26 + (141 - 26) * ease;
      }
      // -------------------------------------------------------------
      // STAGE 3: Click Port 2 & Drag & Drop Node 3 (Bottom-Right Down) (0.58 to 0.80)
      // Drags Node 3 down to (left: 280, top: 164), drawing live Wire 2
      // -------------------------------------------------------------
      else if (progress < 0.62) {
        // Clicks the port dot of "Return/exchange policy"
        setNode1Status("placed");
        setNode2Status("placed");
        setNode3Status("hidden");
        setActiveOption(2);

        curX = 216;
        curY = 141;
        const clickT = (progress - 0.58) / 0.04;
        curScale = clickT < 0.5 ? 1 - clickT * 0.28 : 0.86 + (clickT - 0.5) * 0.28;
      } else if (progress < 0.76) {
        // Dragging Node 3 down into place
        setNode1Status("placed");
        setNode2Status("placed");
        setNode3Status("dragging");
        setActiveOption(2);

        const t = (progress - 0.62) / 0.14;
        const ease = t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

        const dx = -64 * (1 - ease);
        const dy = -40 * (1 - ease);

        if (node3Ref.current) {
          node3Ref.current.style.transform = `translate3d(${dx}px, ${dy}px, 0) scale(1.02) rotate(-1deg)`;
        }

        // Target incoming port on moving Node 3
        const portX = 280 + dx;
        const portY = 232 + dy;
        const midX = 216 + (portX - 216) * 0.47;

        if (wire2Ref.current) {
          wire2Ref.current.setAttribute("d", `M 216 141 H ${midX} V ${portY} H ${portX}`);
        }

        // Cursor holds Node 3 header
        curX = 280 + dx + 80;
        curY = 164 + dy + 14;
        curScale = 0.92;
      } else if (progress < 0.82) {
        // Node 3 is dropped & settled down
        setNode1Status("placed");
        setNode2Status("placed");
        setNode3Status("placed");
        setActiveOption(2);
        setIsActionHovered(false);
        setIsActionButtonPressed(false);

        if (node3Ref.current) {
          node3Ref.current.style.transform = "translate3d(0, 0, 0) scale(1) rotate(0deg)";
        }
        if (wire2Ref.current) {
          wire2Ref.current.setAttribute("d", "M 216 141 H 246 V 232 H 280");
        }

        // Cursor moves to the Action Button "Place a Return/Exchange request" at (362, 278)
        const t = (progress - 0.76) / 0.06;
        const ease = t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
        curX = 360 + (362 - 360) * ease;
        curY = 178 + (278 - 178) * ease;
      }
      // -------------------------------------------------------------
      // STAGE 4: Clicks Action Button on Node 3 (0.82 to 0.90)
      // -------------------------------------------------------------
      else if (progress < 0.90) {
        setNode1Status("placed");
        setNode2Status("placed");
        setNode3Status("placed");
        setActiveOption(2);
        setIsActionHovered(true);

        curX = 362;
        curY = 278;
        const clickT = (progress - 0.82) / 0.08;
        curScale = clickT < 0.5 ? 1 - clickT * 0.28 : 0.86 + (clickT - 0.5) * 0.28;
        setIsActionButtonPressed(clickT >= 0.2 && clickT <= 0.8);
      }
      // -------------------------------------------------------------
      // STAGE 5: Complete Active Flow Showcase & Drifts to Loop (0.90 to 1.00)
      // -------------------------------------------------------------
      else {
        setNode1Status("placed");
        setNode2Status("placed");
        setNode3Status("placed");
        setActiveOption(null);
        setIsActionHovered(false);
        setIsActionButtonPressed(false);

        const t = (progress - 0.90) / 0.10;
        const ease = t * t;
        curX = 362 + (420 - 362) * ease;
        curY = 278 + (310 - 278) * ease;
      }

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${curX}px, ${curY}px, 0) scale(${curScale})`;
      }

      // Discrete click ripple triggers
      const clicking =
        (progress >= 0.09 && progress <= 0.12) ||
        (progress >= 0.35 && progress <= 0.38) ||
        (progress >= 0.59 && progress <= 0.62) ||
        (progress >= 0.83 && progress <= 0.89);
      setIsClicking(clicking);

      animId = requestAnimationFrame(updateFrame);
    };

    animId = requestAnimationFrame(updateFrame);
    return () => cancelAnimationFrame(animId);
  }, []);

  return (
    <div className="relative w-full h-full min-h-[310px] flex items-center justify-center p-3 select-none overflow-hidden bg-[#faf8f5] dark:bg-zinc-950 font-figtree">
      {/* Subtle Dot Grid Background */}
      <div
        className="absolute inset-0 bg-[radial-gradient(#d1d5db_1.25px,transparent_1.25px)] [background-size:14px_14px] dark:bg-[radial-gradient(#27272a_1.25px,transparent_1.25px)] opacity-70 pointer-events-none"
        aria-hidden="true"
      />

      {/* Responsive Canvas Container with Fixed Aspect (480px x 320px) */}
      <div className="relative w-[480px] h-[320px] origin-center transform scale-[0.68] xs:scale-[0.76] sm:scale-[0.85] md:scale-[0.80] lg:scale-[0.90] xl:scale-100 flex-shrink-0 font-figtree">
        
        {/* 1. Left Floating Toolbar (Always Visible) */}
        <div className="absolute left-2.5 top-1/2 -translate-y-1/2 w-9 bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200/90 dark:border-zinc-800 shadow-[0_4px_16px_rgba(0,0,0,0.06)] py-2.5 px-1.5 flex flex-col items-center gap-2.5 z-20 font-figtree">
          {/* Active Tool (Top: Emerald square with shopping bag icon) */}
          <div className="w-6 h-6 rounded-lg bg-[#10b981] text-white flex items-center justify-center shadow-xs">
            <ShoppingBag className="w-3.5 h-3.5" />
          </div>
          {/* Tool 2: Send (Drag source for message node) */}
          <div
            className={`w-6 h-6 rounded-md flex items-center justify-center transition-colors ${
              node1Status === "dragging"
                ? "bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 scale-110 ring-1 ring-emerald-500/40"
                : "text-zinc-400 dark:text-zinc-500 hover:text-zinc-600"
            }`}
          >
            <Send className="w-3.5 h-3.5" />
          </div>
          {/* Tool 3: Link */}
          <div className="w-6 h-6 flex items-center justify-center text-zinc-400 dark:text-zinc-500 hover:text-zinc-600 transition-colors">
            <Link2 className="w-3.5 h-3.5" />
          </div>
          {/* Tool 4: Image */}
          <div className="w-6 h-6 flex items-center justify-center text-zinc-400 dark:text-zinc-500 hover:text-zinc-600 transition-colors">
            <ImageIcon className="w-3.5 h-3.5" />
          </div>
          {/* Tool 5: Video */}
          <div className="w-6 h-6 flex items-center justify-center text-zinc-400 dark:text-zinc-500 hover:text-zinc-600 transition-colors">
            <Video className="w-3.5 h-3.5" />
          </div>
          {/* Tool 6: Share */}
          <div className="w-6 h-6 flex items-center justify-center text-zinc-400 dark:text-zinc-500 hover:text-zinc-600 transition-colors">
            <Share2 className="w-3.5 h-3.5" />
          </div>
        </div>

        {/* --- Drop Target Placeholder 1 (Center Main Node) --- */}
        {node1Status === "dragging" && (
          <div className="absolute left-[56px] top-[12px] w-[160px] h-[286px] rounded-xl border-2 border-dashed border-emerald-400/70 bg-emerald-50/25 dark:bg-emerald-950/25 flex flex-col items-center justify-center text-center p-3 z-5 pointer-events-none animate-in fade-in zoom-in-95 duration-200 font-figtree">
            <div className="w-7 h-7 rounded-full bg-emerald-100 dark:bg-emerald-900/60 text-emerald-700 dark:text-emerald-300 flex items-center justify-center mb-1.5 shadow-xs">
              <Send className="w-3.5 h-3.5" />
            </div>
            <span className="text-[8px] font-figtree uppercase tracking-wider font-bold text-emerald-800 dark:text-emerald-300">
              Drop Center Node
            </span>
            <span className="text-[7px] text-emerald-600/80 dark:text-emerald-400/80 mt-0.5">
              Greeting &amp; Service Menu
            </span>
          </div>
        )}

        {/* 2. Center Main Node (Dragged & Dropped by Cursor) */}
        <div
          ref={node1Ref}
          className={`absolute left-[56px] top-[12px] w-[160px] bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200/90 dark:border-zinc-800 p-2 font-figtree ${
            node1Status === "hidden"
              ? "opacity-0 pointer-events-none scale-90"
              : node1Status === "dragging"
              ? "opacity-100 z-30 shadow-[0_20px_40px_rgba(0,0,0,0.14)] ring-2 ring-emerald-500/30 will-change-transform"
              : "opacity-100 z-10 shadow-[0_4px_16px_rgba(0,0,0,0.06)] transition-all duration-300"
          }`}
        >
          {/* Top Banner: SEND A MESSAGE */}
          <div className="bg-[#dcfce7] dark:bg-emerald-950/60 text-[#065f46] dark:text-emerald-300 text-[8px] font-figtree font-bold tracking-wider uppercase rounded-md py-1 text-center">
            SEND A MESSAGE
          </div>

          {/* Mint Message Bubble */}
          <div className="bg-[#ecfdf5] dark:bg-emerald-950/30 text-[#065f46] dark:text-emerald-200 text-[9px] p-2 rounded-lg leading-tight mt-1.5 border border-[#bbf7d0]/60 dark:border-emerald-800/40">
            Hi {"{{name}}"}! How can I help you today?
          </div>

          {/* 7 Stacked Buttons */}
          <div className="flex flex-col gap-1 mt-1.5">
            {BUILDER_OPTIONS.map((opt, i) => (
              <div
                key={opt.id}
                className={`relative text-[8.5px] font-medium py-1 px-2 rounded-md border text-center transition-all duration-200 font-figtree ${
                  activeOption === i
                    ? "bg-emerald-50 dark:bg-emerald-950/60 border-emerald-500 text-emerald-900 dark:text-emerald-200 shadow-xs ring-1 ring-emerald-500/30 scale-[1.02]"
                    : "bg-[#f8fafc] dark:bg-zinc-800/80 border-zinc-200/80 dark:border-zinc-700/80 text-zinc-700 dark:text-zinc-300"
                }`}
              >
                {opt.label}

                {/* Connection dot on right side for branches */}
                {opt.hasPort && (
                  <span
                    className={`absolute -right-[4.5px] top-1/2 -translate-y-1/2 w-2 h-2 rounded-full border-2 border-white dark:border-zinc-900 transition-all duration-300 ${
                      activeOption === i ||
                      (i === 1 && node2Status === "placed") ||
                      (i === 2 && node3Status === "placed")
                        ? "bg-[#10b981] ring-2 ring-emerald-400/40 scale-125"
                        : "bg-[#122c37] dark:bg-zinc-400"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* --- Drop Target Placeholder 2 (Top-Right Node) --- */}
        {node2Status === "dragging" && (
          <div className="absolute left-[290px] top-[12px] w-[155px] h-[138px] rounded-xl border-2 border-dashed border-emerald-400/70 bg-emerald-50/25 dark:bg-emerald-950/25 flex flex-col items-center justify-center text-center p-2 z-5 pointer-events-none animate-in fade-in zoom-in-95 duration-200 font-figtree">
            <span className="text-[7.5px] font-figtree uppercase tracking-wider font-bold text-emerald-800 dark:text-emerald-300">
              Drop Branch 1
            </span>
            <span className="text-[7px] text-emerald-600/80 dark:text-emerald-400/80 mt-0.5">
              Order Number Verification
            </span>
          </div>
        )}

        {/* 3. Top-Right Branch Node (Dragged & Dropped by Cursor) */}
        <div
          ref={node2Ref}
          className={`absolute left-[290px] top-[12px] w-[155px] bg-white dark:bg-zinc-900 rounded-xl border p-2 font-figtree ${
            node2Status === "hidden"
              ? "opacity-0 pointer-events-none scale-90"
              : node2Status === "dragging"
              ? "opacity-100 z-30 shadow-[0_20px_40px_rgba(0,0,0,0.14)] ring-2 ring-emerald-500/30 will-change-transform border-emerald-500"
              : "opacity-100 z-10 shadow-[0_4px_16px_rgba(0,0,0,0.06)] border-emerald-500/80 ring-2 ring-emerald-500/20 shadow-emerald-500/10 transition-all duration-300"
          }`}
        >
          {/* Left Incoming Port Dot */}
          <span
            className={`absolute -left-[4.5px] top-[48px] w-2 h-2 rounded-full border-2 border-white dark:border-zinc-900 transition-all duration-300 ${
              node2Status === "placed"
                ? "bg-[#10b981] ring-2 ring-emerald-400/40 scale-125"
                : "bg-[#122c37] dark:bg-zinc-400"
            }`}
          />

          {/* Top Banner: SEND A MESSAGE */}
          <div className="bg-[#dcfce7] dark:bg-emerald-950/60 text-[#065f46] dark:text-emerald-300 text-[8px] font-figtree font-bold tracking-wider uppercase rounded-md py-1 text-center">
            SEND A MESSAGE
          </div>

          {/* Person at Laptop with Verification Badge Graphic */}
          <div className="relative w-full h-[64px] flex items-center justify-center my-1.5 bg-zinc-50/70 dark:bg-zinc-800/40 rounded-lg overflow-hidden border border-zinc-100 dark:border-zinc-800/60">
            <svg className="w-full h-full" viewBox="0 0 140 64" fill="none">
              <circle cx="70" cy="38" r="26" fill="#e0e7ff" fillOpacity="0.4" />
              <rect x="42" y="16" width="56" height="34" rx="4" fill="#0e2733" />
              <rect x="45" y="19" width="50" height="26" rx="2" fill="#1e3a47" />
              <line x1="49" y1="24" x2="68" y2="24" stroke="#34d399" strokeWidth="2" strokeLinecap="round" />
              <line x1="49" y1="29" x2="84" y2="29" stroke="#94a3b8" strokeWidth="1.5" strokeLinecap="round" />
              <line x1="49" y1="34" x2="76" y2="34" stroke="#94a3b8" strokeWidth="1.5" strokeLinecap="round" />
              <line x1="49" y1="39" x2="60" y2="39" stroke="#f97316" strokeWidth="1.5" strokeLinecap="round" />
              <path d="M 36 50 L 104 50 L 101 53 L 39 53 Z" fill="#94a3b8" />
              <rect x="64" y="50" width="12" height="1.5" rx="0.75" fill="#64748b" />
              <circle cx="95" cy="18" r="7" fill="#fb923c" />
              <path d="M 87 32 C 87 26 91 24 95 24 C 99 24 103 26 103 32 Z" fill="#ea580c" />
              <circle cx="108" cy="15" r="7" fill="#10b981" />
              <path d="M 105 15 L 107.5 17.5 L 111.5 13" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>

          {/* Mint Message Bubble */}
          <div className="bg-[#ecfdf5] dark:bg-emerald-950/30 text-[#065f46] dark:text-emerald-200 text-[9px] p-2 rounded-lg leading-tight border border-[#bbf7d0]/60 dark:border-emerald-800/40">
            Please share your Order Number
          </div>
        </div>

        {/* --- Drop Target Placeholder 3 (Bottom-Right Node Down) --- */}
        {node3Status === "dragging" && (
          <div className="absolute left-[280px] top-[164px] w-[165px] h-[146px] rounded-xl border-2 border-dashed border-orange-400/70 bg-orange-50/25 dark:bg-orange-950/25 flex flex-col items-center justify-center text-center p-2 z-5 pointer-events-none animate-in fade-in zoom-in-95 duration-200 font-figtree">
            <span className="text-[7.5px] font-figtree uppercase tracking-wider font-bold text-orange-800 dark:text-orange-300">
              Drop Branch 2 (Down)
            </span>
            <span className="text-[7px] text-orange-600/80 dark:text-orange-400/80 mt-0.5">
              Policy &amp; Action Button
            </span>
          </div>
        )}

        {/* 4. Bottom-Right Branch Node (Dragged & Dropped Down by Cursor) */}
        <div
          ref={node3Ref}
          className={`absolute left-[280px] top-[164px] w-[165px] bg-white dark:bg-zinc-900 rounded-xl border p-2 font-figtree ${
            node3Status === "hidden"
              ? "opacity-0 pointer-events-none scale-90"
              : node3Status === "dragging"
              ? "opacity-100 z-30 shadow-[0_20px_40px_rgba(0,0,0,0.14)] ring-2 ring-orange-500/30 will-change-transform border-orange-500"
              : "opacity-100 z-10 shadow-[0_4px_16px_rgba(0,0,0,0.06)] border-orange-500/80 ring-2 ring-orange-500/20 shadow-orange-500/10 transition-all duration-300"
          }`}
        >
          {/* Left Incoming Port Dot */}
          <span
            className={`absolute -left-[4.5px] top-[68px] w-2 h-2 rounded-full border-2 border-white dark:border-zinc-900 transition-all duration-300 ${
              node3Status === "placed"
                ? "bg-[#f97316] ring-2 ring-orange-400/40 scale-125"
                : "bg-[#122c37] dark:bg-zinc-400"
            }`}
          />

          {/* Top Banner: SEND A MESSAGE + BUTTON */}
          <div className="bg-[#fef3c7] dark:bg-amber-950/60 text-[#92400e] dark:text-amber-300 text-[7.5px] font-figtree font-bold tracking-wider uppercase rounded-md py-1 text-center">
            SEND A MESSAGE + BUTTON
          </div>

          {/* Peach Message Bubble */}
          <div className="bg-[#fffbeb] dark:bg-amber-950/30 text-[#78350f] dark:text-amber-200 text-[8.5px] p-2 rounded-lg leading-snug mt-1.5 border border-[#fde68a]/60 dark:border-amber-800/40">
            You can request a Return/Exchange order within 14 days of placing the order. Click below to place a Return/Exchange request.
          </div>

          {/* Crisp Action Button */}
          <div
            className={`w-full mt-1.5 py-1.5 px-2 rounded-lg border text-[8.5px] font-medium flex items-center justify-center gap-1 transition-all duration-200 font-figtree ${
              isActionButtonPressed
                ? "bg-orange-500 text-white border-orange-600 scale-[0.98] shadow-xs"
                : isActionHovered
                ? "bg-zinc-100 text-zinc-900 border-zinc-300 shadow-2xs scale-[1.01]"
                : "bg-white dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 border-zinc-200 dark:border-zinc-700 shadow-2xs"
            }`}
          >
            <ExternalLink className="w-2.5 h-2.5 text-zinc-500" />
            <span>Place a Return/Exchange request</span>
          </div>
        </div>

        {/* 5. Stepped Orthogonal Wires (Dynamic Draw & Traveling Laser Pulses) */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none z-12"
          aria-hidden="true"
        >
          {/* Base Guide Track 1 */}
          {node2Status !== "hidden" && (
            <path
              d="M 216 115 H 256 V 60 H 290"
              fill="none"
              stroke="#122c37"
              strokeWidth="1.5"
              opacity="0.18"
            />
          )}

          {/* Wire 1 (Dynamic Live Laser tracking during drag, solid when placed) */}
          {node2Status !== "hidden" && (
            <path
              ref={wire1Ref}
              d="M 216 115 H 256 V 60 H 290"
              fill="none"
              stroke="#10b981"
              strokeWidth="2"
              strokeDasharray={node2Status === "dragging" ? "4 3" : undefined}
            />
          )}

          {/* Continuous Traveling Pulse on Wire 1 when fully placed */}
          {node2Status === "placed" && (
            <circle r="3" fill="#10b981">
              <animateMotion
                dur="1.2s"
                repeatCount="indefinite"
                path="M 216 115 H 256 V 60 H 290"
              />
            </circle>
          )}

          {/* Base Guide Track 2 */}
          {node3Status !== "hidden" && (
            <path
              d="M 216 141 H 246 V 232 H 280"
              fill="none"
              stroke="#122c37"
              strokeWidth="1.5"
              opacity="0.18"
            />
          )}

          {/* Wire 2 (Dynamic Live Laser tracking during drag down, solid when placed) */}
          {node3Status !== "hidden" && (
            <path
              ref={wire2Ref}
              d="M 216 141 H 246 V 232 H 280"
              fill="none"
              stroke="#f97316"
              strokeWidth="2"
              strokeDasharray={node3Status === "dragging" ? "4 3" : undefined}
            />
          )}

          {/* Continuous Traveling Pulse on Wire 2 when fully placed */}
          {node3Status === "placed" && (
            <circle r="3" fill="#f97316">
              <animateMotion
                dur="1.2s"
                repeatCount="indefinite"
                path="M 216 141 H 246 V 232 H 280"
              />
            </circle>
          )}
        </svg>

        {/* 6. Realistic 60FPS Video Cursor (Direct GPU Compositor Translation) */}
        <div
          ref={cursorRef}
          className="absolute top-0 left-0 pointer-events-none z-40 will-change-transform"
          style={{
            transform: "translate3d(350px, 250px, 0)",
          }}
        >
          <svg
            className="w-4 h-4 text-zinc-900 dark:text-white drop-shadow-md"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M4 0l16 12.279-6.951 1.17 4.325 8.817-3.596 1.734-4.35-8.879-5.428 5.239z" />
          </svg>
          {isClicking && (
            <span className="absolute -left-2 -top-2 w-8 h-8 rounded-full border-2 border-emerald-500/70 animate-ping pointer-events-none" />
          )}
        </div>

      </div>
    </div>
  );
}

/* =========================================================================
   VISUAL 2: INSTANT REPLIES (Streaming Letter-by-Letter Real-Time AI Chat)
   ========================================================================= */
const STREAMING_MESSAGE =
  "We're open 9:00 AM – 8:00 PM tomorrow! 🌿 Would you like to reserve a slot?";

function VisualInstantReplies() {
  const [typedChars, setTypedChars] = useState(0);
  const [chatStep, setChatStep] = useState(0); // 0: customer sent, 1: typing dots, 2: streaming text, 3: buttons appear, 4: clicked & confirmed

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (chatStep === 0) {
      // Step 0 -> Step 1 (Show typing dots after 1.0s)
      timer = setTimeout(() => setChatStep(1), 1000);
    } else if (chatStep === 1) {
      // Step 1 -> Step 2 (Start streaming reply after 1.2s)
      timer = setTimeout(() => {
        setTypedChars(0);
        setChatStep(2);
      }, 1200);
    } else if (chatStep === 2) {
      // Streaming characters smoothly (~32ms per character)
      if (typedChars < STREAMING_MESSAGE.length) {
        timer = setTimeout(() => {
          setTypedChars((prev) => prev + 1);
        }, 32);
      } else {
        // Finished typing -> show quick buttons
        timer = setTimeout(() => setChatStep(3), 400);
      }
    } else if (chatStep === 3) {
      // Auto-click the booking button after 1.2s
      timer = setTimeout(() => setChatStep(4), 1200);
    } else if (chatStep === 4) {
      // Reset loop after 3.2s of celebration
      timer = setTimeout(() => {
        setTypedChars(0);
        setChatStep(0);
      }, 3200);
    }

    return () => clearTimeout(timer);
  }, [chatStep, typedChars]);

  return (
    <div className="relative w-full h-full min-h-[310px] flex items-center justify-center p-4 select-none overflow-hidden bg-gradient-to-b from-zinc-50/70 via-white to-emerald-50/20 dark:from-zinc-900/60 dark:via-zinc-900/40 dark:to-zinc-950 font-figtree">
      {/* Phone Chat Container */}
      <div className="relative w-full max-w-[340px] bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200/90 dark:border-zinc-800 shadow-md p-3.5 flex flex-col justify-between min-h-[255px] font-figtree">
        
        {/* Chat Header */}
        <div className="flex items-center justify-between pb-2 mb-2 border-b border-zinc-100 dark:border-zinc-800">
          <div className="flex items-center gap-2">
            <div className="relative w-7 h-7 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-600 font-bold text-xs">
              <MessageCircle className="w-4 h-4 text-emerald-600" />
              <span className="absolute bottom-0 right-0 w-2 h-2 rounded-full bg-emerald-500 ring-1 ring-white" />
            </div>
            <div>
              <div className="flex items-center gap-1">
                <span className="text-xs font-semibold text-zinc-900 dark:text-zinc-100">
                  ctrlF Assistant
                </span>
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-500 fill-emerald-500/20" />
              </div>
              <p className="text-[10px] text-emerald-600 dark:text-emerald-400 font-medium">
                Replies in ~10 seconds
              </p>
            </div>
          </div>
          <span className="text-[10px] font-figtree font-medium text-zinc-400">24/7 Live</span>
        </div>

        {/* Message Thread Area */}
        <div className="space-y-2 text-xs">
          {/* Customer Question Bubble (Right) */}
          <div className="flex justify-end">
            <div className="bg-[#122c37] text-white rounded-2xl rounded-tr-xs px-3 py-1.5 max-w-[82%] shadow-xs transition-transform">
              <p className="text-[11.5px] leading-snug">What are your timings tomorrow?</p>
              <div className="flex items-center justify-end gap-1 mt-0.5 text-[9px] text-zinc-400">
                <span>11:42 PM</span>
                <CheckCheck className="w-3 h-3 text-emerald-400" />
              </div>
            </div>
          </div>

          {/* Typing Indicator Bubble (Left) */}
          {chatStep === 1 && (
            <div className="flex justify-start">
              <div className="bg-zinc-100 dark:bg-zinc-800 text-zinc-500 rounded-2xl rounded-tl-xs px-3 py-2 flex items-center gap-1 shadow-xs">
                <span className="w-1.5 h-1.5 rounded-full bg-zinc-400 animate-bounce" />
                <span className="w-1.5 h-1.5 rounded-full bg-zinc-400 animate-bounce [animation-delay:0.2s]" />
                <span className="w-1.5 h-1.5 rounded-full bg-zinc-400 animate-bounce [animation-delay:0.4s]" />
              </div>
            </div>
          )}

          {/* Assistant Answer Bubble with Real-Time Typing Caret */}
          {chatStep >= 2 && (
            <div className="flex flex-col items-start gap-1.5">
              <div className="bg-zinc-100 dark:bg-zinc-800/90 text-zinc-900 dark:text-zinc-100 rounded-2xl rounded-tl-xs px-3 py-2 max-w-[92%] shadow-xs border border-zinc-200/50 dark:border-zinc-700/50 transition-all">
                <p className="text-[11.5px] leading-[1.3]">
                  {STREAMING_MESSAGE.slice(0, typedChars)}
                  {chatStep === 2 && typedChars < STREAMING_MESSAGE.length && (
                    <span className="inline-block w-1.5 h-3 bg-emerald-500 ml-0.5 animate-pulse align-middle" />
                  )}
                </p>
                <div className="text-right text-[9px] text-zinc-400 mt-0.5">
                  11:42 PM
                </div>
              </div>

              {/* Quick Reply Interactive Buttons (Slide & Spring Entrance) */}
              {chatStep >= 3 && (
                <div className="flex flex-wrap gap-1.5 pt-0.5 animate-in fade-in slide-in-from-bottom-2 duration-300">
                  <button
                    type="button"
                    className={`text-[10px] font-medium px-2.5 py-1 rounded-full border transition-all duration-200 ${
                      chatStep >= 4
                        ? "bg-emerald-600 text-white border-emerald-600 shadow-xs scale-102"
                        : "bg-white dark:bg-zinc-800 text-emerald-700 dark:text-emerald-300 border-emerald-500/40 hover:bg-emerald-50 shadow-2xs"
                    }`}
                  >
                    📅 Book 2:00 PM
                  </button>
                  <button
                    type="button"
                    className="text-[10px] font-medium px-2.5 py-1 rounded-full bg-white dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700 shadow-2xs"
                  >
                    💇 View Prices
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Client Auto-Response & Final Confirmation */}
          {chatStep >= 4 && (
            <div className="flex justify-end pt-1 animate-in fade-in slide-in-from-bottom-1 duration-300">
              <div className="bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-200 border border-emerald-200 dark:border-emerald-800 rounded-xl px-2.5 py-1 text-[11px] flex items-center gap-1.5 shadow-2xs">
                <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Reserved 2:00 PM · Instant SMS & WhatsApp Sent</span>
              </div>
            </div>
          )}
        </div>

        {/* Footer info badge */}
        <div className="pt-2 mt-1 border-t border-zinc-100 dark:border-zinc-800 text-center">
          <span className="text-[9px] font-figtree font-medium text-zinc-400">
            Powered by official WhatsApp Business API
          </span>
        </div>
      </div>
    </div>
  );
}

/* =========================================================================
   VISUAL 3: AUTO FOLLOW-UPS (Smooth Flowing Timeline with Glowing Scan)
   ========================================================================= */
function VisualAutoFollowUps() {
  const [activeStage, setActiveStage] = useState(1);

  useEffect(() => {
    let animTimer: NodeJS.Timeout;
    if (activeStage === 1) {
      animTimer = setTimeout(() => setActiveStage(2), 2000);
    } else if (activeStage === 2) {
      animTimer = setTimeout(() => setActiveStage(3), 2000);
    } else if (activeStage === 3) {
      animTimer = setTimeout(() => setActiveStage(4), 1800);
    } else {
      animTimer = setTimeout(() => setActiveStage(1), 2800);
    }
    return () => clearTimeout(animTimer);
  }, [activeStage]);

  return (
    <div className="relative w-full h-full min-h-[310px] flex items-center justify-center p-4 select-none overflow-hidden bg-gradient-to-b from-zinc-50/70 via-white to-orange-50/20 dark:from-zinc-900/60 dark:via-zinc-900/40 dark:to-zinc-950 font-figtree">
      <div className="relative w-full max-w-[340px] flex flex-col justify-between py-1 font-figtree">
        
        {/* Timeline Track with 3 Message Steps */}
        <div className="relative pl-6 space-y-2.5">
          {/* Vertical Connecting Line */}
          <div className="absolute left-[9px] top-2 bottom-3 w-0.5 bg-zinc-200 dark:bg-zinc-800">
            {/* Animated Laser Progress Fill */}
            <div
              className="w-full bg-gradient-to-b from-orange-500 to-emerald-500 transition-all duration-700 ease-out shadow-xs"
              style={{
                height:
                  activeStage === 1
                    ? "25%"
                    : activeStage === 2
                    ? "60%"
                    : activeStage === 3
                    ? "88%"
                    : "100%",
              }}
            />
          </div>

          {/* Milestone 1: Day 1 */}
          <div className="relative">
            <span
              className={`absolute -left-6 top-1 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold border transition-colors ${
                activeStage >= 1
                  ? "bg-orange-500 text-white border-orange-500 shadow-2xs"
                  : "bg-white text-zinc-400 border-zinc-300"
              }`}
            >
              1
            </span>
            <div className="bg-white dark:bg-zinc-800 rounded-xl border border-zinc-200/80 dark:border-zinc-700/80 p-2.5 shadow-2xs">
              <div className="flex items-center justify-between text-[10px] font-figtree mb-1">
                <span className="font-semibold text-orange-600 dark:text-orange-400">Day 1 · Inquiry</span>
                <span className="text-zinc-400">No reply (24h)</span>
              </div>
              <p className="text-[11px] text-zinc-700 dark:text-zinc-300">
                &ldquo;Hi Jessica! Checking in on your consultation slot.&rdquo;
              </p>
            </div>
          </div>

          {/* Milestone 2: Day 3 */}
          <div
            className={`relative transition-all duration-300 ${
              activeStage >= 2 ? "opacity-100 translate-y-0" : "opacity-40 translate-y-1"
            }`}
          >
            <span
              className={`absolute -left-6 top-1 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold border transition-colors ${
                activeStage >= 2
                  ? "bg-orange-500 text-white border-orange-500 shadow-2xs"
                  : "bg-white text-zinc-400 border-zinc-300"
              }`}
            >
              2
            </span>
            <div className="bg-white dark:bg-zinc-800 rounded-xl border border-zinc-200/80 dark:border-zinc-700/80 p-2.5 shadow-2xs">
              <div className="flex items-center justify-between text-[10px] font-figtree mb-1">
                <span className="font-semibold text-orange-600 dark:text-orange-400">Day 3 · Nudge</span>
                <span className="text-zinc-400">Read ✓✓</span>
              </div>
              <p className="text-[11px] text-zinc-700 dark:text-zinc-300">
                &ldquo;We saved your Friday slot if you still need it!&rdquo;
              </p>
            </div>
          </div>

          {/* Milestone 3: Day 7 */}
          <div
            className={`relative transition-all duration-300 ${
              activeStage >= 3 ? "opacity-100 translate-y-0" : "opacity-40 translate-y-1"
            }`}
          >
            <span
              className={`absolute -left-6 top-1 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold border transition-colors ${
                activeStage >= 3
                  ? "bg-emerald-500 text-white border-emerald-500 shadow-2xs"
                  : "bg-white text-zinc-400 border-zinc-300"
              }`}
            >
              3
            </span>
            <div className="bg-white dark:bg-zinc-800 rounded-xl border border-zinc-200/80 dark:border-zinc-700/80 p-2.5 shadow-2xs">
              <div className="flex items-center justify-between text-[10px] font-figtree mb-1">
                <span className="font-semibold text-emerald-600 dark:text-emerald-400">Day 7 · Last Call</span>
                <span className="text-emerald-600 font-semibold">Replied!</span>
              </div>
              <p className="text-[11px] text-zinc-700 dark:text-zinc-300">
                &ldquo;Only 2 slots left for Saturday! Would 11 AM work?&rdquo;
              </p>
              <div className="mt-1 pt-1 border-t border-zinc-100 dark:border-zinc-700/50 flex items-center gap-1 text-[10.5px] text-emerald-700 dark:text-emerald-300 font-medium">
                <Check className="w-3 h-3 text-emerald-500" />
                <span>Customer: &ldquo;Yes! Saturday at 11 AM please.&rdquo;</span>
              </div>
            </div>
          </div>
        </div>

        {/* Final Celebration Badge: Booked ✓ */}
        <div
          className={`mt-2 flex items-center justify-between rounded-xl px-3 py-2 border transition-all duration-500 ${
            activeStage >= 4
              ? "bg-emerald-600 text-white border-emerald-500 shadow-md scale-102"
              : "bg-zinc-100 text-zinc-400 border-zinc-200 opacity-60"
          }`}
        >
          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 rounded-full bg-white animate-ping" />
            <span className="text-xs font-semibold">
              🎉 Appointment Booked &amp; Confirmed
            </span>
          </div>
          <span className="text-[10px] font-figtree font-medium tracking-tight">
            $150 Slot Saved
          </span>
        </div>

      </div>
    </div>
  );
}

/* =========================================================================
   VISUAL 4: BOOKINGS & INSIGHTS (Google Calendar - Cursor Aligning Appointments)
   ========================================================================= */
function VisualBookingsAndInsights() {
  const [placedCount, setPlacedCount] = useState(0); // 0: initially empty, 1: Tue placed, 2: Wed placed, 3: Thu placed
  const [isClicking, setIsClicking] = useState(false);
  const [hoveredTiming, setHoveredTiming] = useState<string | null>(null);

  const calendarCursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let animId: number;
    const startTime = performance.now();
    const duration = 7800; // 7.8s full alignment loop

    const updateFrame = (now: number) => {
      const elapsed = (now - startTime) % duration;
      const progress = elapsed / duration; // 0 to 1

      // 60FPS Cursor Trajectory targeting 3 successive timing slots:
      // Target 1: Tuesday 10:00 AM (x: 93, y: 114)
      // Target 2: Wednesday 11:00 AM (x: 187, y: 150)
      // Target 3: Thursday 12:00 PM (x: 281, y: 186)
      let x = 290;
      let y = 220;
      let scale = 1;

      if (progress < 0.26) {
        // Enters and swoops to Target 1 (Tuesday 10:00 AM)
        const t = progress / 0.26;
        const ease = t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
        // Curve from (290, 220) via control (170, 80) to (93, 114)
        x = (1 - ease) * (1 - ease) * 290 + 2 * (1 - ease) * ease * 170 + ease * ease * 93;
        y = (1 - ease) * (1 - ease) * 220 + 2 * (1 - ease) * ease * 80 + ease * ease * 114;

        if (progress > 0.20) {
          const clickT = (progress - 0.20) / 0.06;
          scale = clickT < 0.5 ? 1 - clickT * 0.28 : 0.86 + (clickT - 0.5) * 0.28;
        }
      } else if (progress < 0.50) {
        // Swoops from Target 1 to Target 2 (Wednesday 11:00 AM)
        const t = (progress - 0.26) / 0.24;
        const ease = t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
        // Curve from (93, 114) via control (140, 110) to (187, 150)
        x = (1 - ease) * (1 - ease) * 93 + 2 * (1 - ease) * ease * 140 + ease * ease * 187;
        y = (1 - ease) * (1 - ease) * 114 + 2 * (1 - ease) * ease * 110 + ease * ease * 150;

        if (progress > 0.44) {
          const clickT = (progress - 0.44) / 0.06;
          scale = clickT < 0.5 ? 1 - clickT * 0.28 : 0.86 + (clickT - 0.5) * 0.28;
        }
      } else if (progress < 0.74) {
        // Swoops from Target 2 to Target 3 (Thursday 12:00 PM)
        const t = (progress - 0.50) / 0.24;
        const ease = t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
        // Curve from (187, 150) via control (235, 145) to (281, 186)
        x = (1 - ease) * (1 - ease) * 187 + 2 * (1 - ease) * ease * 235 + ease * ease * 281;
        y = (1 - ease) * (1 - ease) * 150 + 2 * (1 - ease) * ease * 145 + ease * ease * 186;

        if (progress > 0.68) {
          const clickT = (progress - 0.68) / 0.06;
          scale = clickT < 0.5 ? 1 - clickT * 0.28 : 0.86 + (clickT - 0.5) * 0.28;
        }
      } else if (progress < 0.88) {
        // Eases to bottom status bar, viewing all aligned appointments
        const t = (progress - 0.74) / 0.14;
        const ease = t * (2 - t);
        x = 281 + (220 - 281) * ease;
        y = 186 + (224 - 186) * ease;
      } else {
        // Swoops away out of frame to loop
        const t = (progress - 0.88) / 0.12;
        const ease = t * t;
        x = 220 + (310 - 220) * ease;
        y = 224 + (250 - 224) * ease;
      }

      if (calendarCursorRef.current) {
        calendarCursorRef.current.style.transform = `translate3d(${x}px, ${y}px, 0) scale(${scale})`;
      }

      // Click ripple triggers
      const clicking =
        (progress >= 0.21 && progress <= 0.26) ||
        (progress >= 0.45 && progress <= 0.50) ||
        (progress >= 0.69 && progress <= 0.74);
      setIsClicking(clicking);

      // Tooltip tags on cursor
      if (progress >= 0.12 && progress < 0.26) {
        setHoveredTiming("10:00 AM · Hair Balayage");
      } else if (progress >= 0.36 && progress < 0.50) {
        setHoveredTiming("11:00 AM · Facial & Spa");
      } else if (progress >= 0.60 && progress < 0.74) {
        setHoveredTiming("12:00 PM · VIP Therapy");
      } else {
        setHoveredTiming(null);
      }

      // Step synchronization: initially 0 appointments, placed 1-by-1
      if (progress < 0.24) {
        setPlacedCount(0); // Initially empty
      } else if (progress < 0.48) {
        setPlacedCount(1); // 1st appointment aligned
      } else if (progress < 0.72) {
        setPlacedCount(2); // 2nd appointment aligned
      } else {
        setPlacedCount(3); // All 3 appointments aligned
      }

      animId = requestAnimationFrame(updateFrame);
    };

    animId = requestAnimationFrame(updateFrame);
    return () => cancelAnimationFrame(animId);
  }, []);

  return (
    <div className="relative w-full h-full min-h-[310px] flex items-center justify-center p-3 select-none overflow-hidden bg-gradient-to-b from-zinc-50/70 via-white to-orange-50/20 dark:from-zinc-900/60 dark:via-zinc-900/40 dark:to-zinc-950 font-figtree">
      {/* Google Calendar Widget Container */}
      <div className="relative w-[340px] max-w-full bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200/90 dark:border-zinc-800 shadow-md p-3 flex flex-col justify-between overflow-hidden font-figtree">
        
        {/* 1. Google Calendar Header Bar */}
        <div className="flex items-center justify-between pb-2 border-b border-zinc-100 dark:border-zinc-800">
          <div className="flex items-center gap-1.5">
            {/* Google Calendar Square Icon Badge */}
            <div className="w-5 h-5 rounded-md bg-[#122c37] dark:bg-emerald-600 text-white flex flex-col items-center justify-center shadow-xs">
              <span className="text-[6px] font-figtree leading-none uppercase font-bold text-orange-400">NOV</span>
              <span className="text-[8px] font-bold leading-none">4</span>
            </div>
            <span className="text-xs font-bold text-zinc-900 dark:text-zinc-100">
              Nov 2026
            </span>
            <div className="flex items-center gap-0.5 ml-0.5">
              <button
                type="button"
                aria-label="Previous week"
                className="w-4 h-4 rounded-full flex items-center justify-center text-zinc-400 hover:text-zinc-600 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
              >
                <ChevronLeft className="w-3 h-3" />
              </button>
              <button
                type="button"
                aria-label="Next week"
                className="w-4 h-4 rounded-full flex items-center justify-center text-zinc-400 hover:text-zinc-600 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
              >
                <ChevronRight className="w-3 h-3" />
              </button>
            </div>
            <span className="text-[8.5px] font-medium px-1.5 py-0.5 rounded-full border border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-300">
              Today
            </span>
          </div>

          {/* Sync Status Badge */}
          <div className="flex items-center gap-1 text-[8.5px] font-figtree text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/50 px-2 py-0.5 rounded-full border border-emerald-200/80 dark:border-emerald-800/60">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>Google Calendar</span>
          </div>
        </div>

        {/* 2. Google Calendar Days Columns Header */}
        <div className="grid grid-cols-[34px_1fr_1fr_1fr] border-b border-zinc-100 dark:border-zinc-800 py-1.5 text-center items-center">
          {/* Time gutter placeholder */}
          <span className="text-[7.5px] font-figtree text-zinc-400">GMT</span>
          
          {/* TUE 3 */}
          <div className="flex flex-col items-center">
            <span className="text-[7.5px] font-figtree text-zinc-400 uppercase font-semibold">TUE</span>
            <span className="text-[10px] font-semibold text-zinc-700 dark:text-zinc-300">3</span>
          </div>

          {/* WED 4 (TODAY - Google Calendar signature circle badge) */}
          <div className="flex flex-col items-center">
            <span className="text-[7.5px] font-figtree text-orange-600 dark:text-orange-400 font-bold uppercase">WED</span>
            <span className="w-4.5 h-4.5 rounded-full bg-orange-500 text-white text-[9px] font-bold flex items-center justify-center shadow-xs">
              4
            </span>
          </div>

          {/* THU 5 */}
          <div className="flex flex-col items-center">
            <span className="text-[7.5px] font-figtree text-zinc-400 uppercase font-semibold">THU</span>
            <span className="text-[10px] font-semibold text-zinc-700 dark:text-zinc-300">5</span>
          </div>
        </div>

        {/* 3. Google Calendar Time Grid & Event Slots */}
        <div className="relative grid grid-cols-[34px_1fr_1fr_1fr] h-[162px] overflow-hidden text-xs">
          
          {/* Google Calendar Current Time Horizontal Indicator Line at 10:30 AM */}
          <div
            className="absolute left-[34px] right-0 top-[58px] z-20 flex items-center pointer-events-none"
            aria-hidden="true"
          >
            {/* The signature Google Calendar red/orange circle */}
            <span className="w-2.5 h-2.5 rounded-full bg-orange-500 ring-2 ring-white dark:ring-zinc-900 -ml-1.25 shadow-xs" />
            {/* Horizontal hairline across all columns */}
            <div className="h-[1.5px] flex-1 bg-orange-500/90" />
            {/* Time pill positioned cleanly in the time gutter */}
            <span className="absolute -top-2.5 -left-7 bg-orange-500 text-white text-[7px] font-figtree px-1 py-0.5 rounded font-bold shadow-xs">
              10:30
            </span>
          </div>

          {/* Left Column: Time Axis Labels */}
          <div className="flex flex-col justify-between py-1 text-[8px] font-figtree text-zinc-400 border-r border-zinc-100 dark:border-zinc-800 pr-1 text-right">
            <span>09:00</span>
            <span className={placedCount < 1 ? "font-bold text-emerald-600 transition-colors" : ""}>10:00</span>
            <span className={placedCount === 1 ? "font-bold text-orange-600 transition-colors" : ""}>11:00</span>
            <span className={placedCount === 2 ? "font-bold text-emerald-600 transition-colors" : ""}>12:00</span>
            <span>13:00</span>
          </div>

          {/* Column 1: TUE 3 */}
          <div className="relative border-r border-zinc-100 dark:border-zinc-800 p-0.5">
            <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
              <div className="border-b border-zinc-100/70 dark:border-zinc-800/60 h-1/4" />
              <div className="border-b border-zinc-100/70 dark:border-zinc-800/60 h-1/4" />
              <div className="border-b border-zinc-100/70 dark:border-zinc-800/60 h-1/4" />
              <div className="border-b border-zinc-100/70 dark:border-zinc-800/60 h-1/4" />
            </div>

            {/* Tuesday 10:00 AM Slot: Initially Empty -> Aligned by Cursor */}
            {placedCount === 0 ? (
              <div className="absolute top-[38px] left-0.5 right-0.5 h-[50px] border border-dashed border-emerald-400/50 bg-emerald-50/20 rounded-md p-1 flex flex-col justify-center items-center text-center">
                <span className="text-[6.5px] font-figtree text-emerald-700/80">10:00 AM</span>
                <span className="text-[7px] text-emerald-600/70">+ Open Slot</span>
              </div>
            ) : (
              <div className="absolute top-[38px] left-0.5 right-0.5 h-[52px] bg-emerald-50 dark:bg-emerald-950/60 border-l-[3.5px] border-emerald-500 rounded-r-md p-1 shadow-xs animate-in zoom-in-95 duration-200 overflow-hidden">
                <div className="flex items-center justify-between">
                  <span className="text-[7px] font-figtree text-emerald-700 dark:text-emerald-300 font-bold">10:00 AM</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                </div>
                <p className="text-[8px] font-bold text-emerald-950 dark:text-emerald-100 leading-tight truncate">
                  Hair Balayage
                </p>
                <span className="block text-[6.5px] text-emerald-700 dark:text-emerald-300 truncate">
                  Sarah J. · Confirmed ✓
                </span>
              </div>
            )}
          </div>

          {/* Column 2: WED 4 (TODAY) */}
          <div className="relative border-r border-zinc-100 dark:border-zinc-800 p-0.5 bg-orange-50/15 dark:bg-orange-950/10">
            <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
              <div className="border-b border-zinc-100/70 dark:border-zinc-800/60 h-1/4" />
              <div className="border-b border-zinc-100/70 dark:border-zinc-800/60 h-1/4" />
              <div className="border-b border-zinc-100/70 dark:border-zinc-800/60 h-1/4" />
              <div className="border-b border-zinc-100/70 dark:border-zinc-800/60 h-1/4" />
            </div>

            {/* Wednesday 11:00 AM Slot: Initially Empty -> Aligned by Cursor */}
            {placedCount < 2 ? (
              <div className="absolute top-[76px] left-0.5 right-0.5 h-[52px] border border-dashed border-orange-400/50 bg-orange-50/20 rounded-md p-1 flex flex-col justify-center items-center text-center">
                <span className="text-[6.5px] font-figtree text-orange-700/80">11:00 AM</span>
                <span className="text-[7px] text-orange-600/70">+ Open Slot</span>
              </div>
            ) : (
              <div className="absolute top-[76px] left-0.5 right-0.5 h-[52px] bg-orange-50 dark:bg-orange-950/60 border-l-[3.5px] border-orange-500 rounded-r-md p-1 shadow-xs animate-in zoom-in-95 duration-200 overflow-hidden">
                <div className="flex items-center justify-between">
                  <span className="text-[7px] font-figtree text-orange-700 dark:text-orange-300 font-bold">11:00 AM</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
                </div>
                <p className="text-[8px] font-bold text-orange-950 dark:text-orange-100 leading-tight truncate">
                  Facial &amp; Spa
                </p>
                <span className="block text-[6.5px] text-orange-700 dark:text-orange-300 truncate">
                  Jessica · Paid $35 ✓
                </span>
              </div>
            )}
          </div>

          {/* Column 3: THU 5 */}
          <div className="relative p-0.5">
            <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
              <div className="border-b border-zinc-100/70 dark:border-zinc-800/60 h-1/4" />
              <div className="border-b border-zinc-100/70 dark:border-zinc-800/60 h-1/4" />
              <div className="border-b border-zinc-100/70 dark:border-zinc-800/60 h-1/4" />
              <div className="border-b border-zinc-100/70 dark:border-zinc-800/60 h-1/4" />
            </div>

            {/* Thursday 12:00 PM Slot: Initially Empty -> Aligned by Cursor */}
            {placedCount < 3 ? (
              <div className="absolute top-[114px] left-0.5 right-0.5 h-[44px] border border-dashed border-emerald-400/50 bg-emerald-50/20 rounded-md p-1 flex flex-col justify-center items-center text-center">
                <span className="text-[6.5px] font-figtree text-emerald-700/80">12:00 PM</span>
                <span className="text-[7px] text-emerald-600/70">+ Open Slot</span>
              </div>
            ) : (
              <div className="absolute top-[114px] left-0.5 right-0.5 h-[44px] bg-[#122c37]/10 dark:bg-zinc-800 border-l-[3.5px] border-[#122c37] dark:border-zinc-400 rounded-r-md p-1 shadow-xs animate-in zoom-in-95 duration-200 overflow-hidden">
                <div className="flex items-center justify-between">
                  <span className="text-[7px] font-figtree text-zinc-700 dark:text-zinc-300 font-bold">12:00 PM</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                </div>
                <p className="text-[8px] font-bold text-zinc-900 dark:text-zinc-100 leading-tight truncate">
                  VIP Therapy
                </p>
                <span className="block text-[6.5px] text-zinc-600 dark:text-zinc-400 truncate">
                  Chloe K. · Locked ✓
                </span>
              </div>
            )}
          </div>

        </div>

        {/* 4. Google Calendar Bottom 2-Way Sync Footer Bar */}
        <div className="pt-2 mt-1 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between text-[8.5px]">
          <div className="flex items-center gap-1.5">
            <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-ping" />
            <span className="font-medium text-zinc-700 dark:text-zinc-300">
              {placedCount === 0 && "Auto-aligning incoming WhatsApp bookings..."}
              {placedCount === 1 && "Aligning: Tuesday 10:00 AM Balayage ✓"}
              {placedCount === 2 && "Aligning: Wednesday 11:00 AM Facial ✓"}
              {placedCount >= 3 && "🎉 3 Appointments Aligned & Synced · Zero Overlaps"}
            </span>
          </div>
          <span className="font-figtree text-emerald-600 dark:text-emerald-400 font-semibold">
            {placedCount >= 3 ? "+$380" : "Google Sync"}
          </span>
        </div>

        {/* 5. Realistic 60FPS Pointer Cursor Aligning Appointments by Timing */}
        <div
          ref={calendarCursorRef}
          className="absolute top-0 left-0 pointer-events-none z-40 will-change-transform"
          style={{
            transform: "translate3d(290px, 220px, 0)",
          }}
        >
          <svg
            className="w-4 h-4 text-zinc-900 dark:text-white drop-shadow-md"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M4 0l16 12.279-6.951 1.17 4.325 8.817-3.596 1.734-4.35-8.879-5.428 5.239z" />
          </svg>
          
          {/* Timing preview tag on cursor while aligning slot */}
          {hoveredTiming && (
            <div className="ml-3 -mt-2 bg-[#0e2733] text-white text-[7px] font-figtree px-1.5 py-0.5 rounded shadow whitespace-nowrap animate-in fade-in duration-150">
              {hoveredTiming}
            </div>
          )}

          {/* Click Ripple Effect */}
          {isClicking && (
            <span className="absolute -left-2 -top-2 w-8 h-8 rounded-full border-2 border-orange-500/80 animate-ping pointer-events-none" />
          )}
        </div>

      </div>
    </div>
  );
}

/* =========================================================================
   MAIN SECTION COMPONENT: HIGHLIGHTED FEATURES (2x2 BENTO GRID)
   ========================================================================= */
export function HighlightedFeature() {
  const { eyebrow, title, subtitle, items } = highlightedFeatureContent;

  return (
    <section
      id="highlighted-features"
      aria-label="WhatsApp Assistant Platform Capabilities"
      className="relative w-full py-20 sm:py-24 lg:py-28 bg-[#faf8f5] dark:bg-zinc-950 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        
        {/* Section Header (Centered layout) */}
        <div className="max-w-3xl mx-auto text-center mb-14 sm:mb-16 lg:mb-20">
          {/* Eyebrow */}
          <div className="mb-3.5 inline-flex items-center gap-2 rounded-full border border-orange-500/20 bg-orange-500/10 px-3.5 py-1 text-xs font-mono font-bold tracking-tight uppercase text-orange-600 dark:text-orange-400">
            {eyebrow.dot && (
              <span className="h-2 w-2 rounded-full bg-orange-600 dark:bg-orange-500 animate-pulse" />
            )}
            <span>{eyebrow.text}</span>
          </div>

          {/* Main Title */}
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-6xl font-medium tracking-tight text-[#0e2733] dark:text-zinc-50 leading-[1.1] mb-4">
            {title}
          </h2>

          {/* Subtitle */}
          <p className="font-secondary text-base sm:text-lg text-zinc-600 dark:text-zinc-400 leading-[1.2] max-w-2xl mx-auto">
            {subtitle}
          </p>
        </div>

        {/* 2x2 Bento Grid with Hairline Dividers (Matching Reference Layout) */}
        <div className="rounded-3xl border border-zinc-200/90 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-sm overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2">
            
            {/* Box 1: Chatbot Builder (Top-Left) */}
            <div className="flex flex-col justify-between border-b md:border-r border-zinc-200/80 dark:border-zinc-800">
              {/* Upper Visual Animation */}
              <div className="h-[310px] sm:h-[340px] font-figtree">
                <VisualChatbotBuilder />
              </div>
              {/* Lower Content */}
              <div className="p-6 sm:p-8 border-t border-zinc-100 dark:border-zinc-800/80 bg-white dark:bg-zinc-900">
                <span className="inline-block text-xs font-mono font-bold tracking-tight uppercase text-orange-600 dark:text-orange-500 mb-1.5">
                  {items[0].eyebrow}
                </span>
                <h3 className="font-heading text-xl sm:text-2xl font-medium text-[#0e2733] dark:text-zinc-100 mb-2">
                  {items[0].title}
                </h3>
                <p className="font-secondary text-xs sm:text-[15px] text-zinc-600 dark:text-zinc-400 leading-[1.3]">
                  {items[0].description}
                </p>
              </div>
            </div>

            {/* Box 2: Instant Replies (Top-Right) */}
            <div className="flex flex-col justify-between border-b border-zinc-200/80 dark:border-zinc-800">
              {/* Upper Visual Animation */}
              <div className="h-[310px] sm:h-[340px] font-figtree">
                <VisualInstantReplies />
              </div>
              {/* Lower Content */}
              <div className="p-6 sm:p-8 border-t border-zinc-100 dark:border-zinc-800/80 bg-white dark:bg-zinc-900">
                <span className="inline-block text-xs font-mono font-bold tracking-tight uppercase text-orange-600 dark:text-orange-500 mb-1.5">
                  {items[1].eyebrow}
                </span>
                <h3 className="font-heading text-xl sm:text-2xl font-medium text-[#0e2733] dark:text-zinc-100 mb-2">
                  {items[1].title}
                </h3>
                <p className="font-secondary text-sm sm:text-[15px] text-zinc-600 dark:text-zinc-400 leading-[1.3]">
                  {items[1].description}
                </p>
              </div>
            </div>

            {/* Box 3: Auto Follow-ups (Bottom-Left) */}
            <div className="flex flex-col justify-between border-b md:border-b-0 md:border-r border-zinc-200/80 dark:border-zinc-800">
              {/* Upper Visual Animation */}
              <div className="h-[310px] sm:h-[340px] font-figtree">
                <VisualAutoFollowUps />
              </div>
              {/* Lower Content */}
              <div className="p-6 sm:p-8 border-t border-zinc-100 dark:border-zinc-800/80 bg-white dark:bg-zinc-900">
                <span className="inline-block text-xs font-mono font-bold tracking-tight uppercase text-orange-600 dark:text-orange-500 mb-1.5">
                  {items[2].eyebrow}
                </span>
                <h3 className="font-heading text-xl sm:text-2xl font-medium text-[#0e2733] dark:text-zinc-100 mb-2">
                  {items[2].title}
                </h3>
                <p className="font-secondary text-sm sm:text-[15px] text-zinc-600 dark:text-zinc-400 leading-[1.3]">
                  {items[2].description}
                </p>
              </div>
            </div>

            {/* Box 4: Bookings and Insights (Bottom-Right) */}
            <div className="flex flex-col justify-between">
              {/* Upper Visual Animation */}
              <div className="h-[310px] sm:h-[340px] font-figtree">
                <VisualBookingsAndInsights />
              </div>
              {/* Lower Content */}
              <div className="p-6 sm:p-8 border-t border-zinc-100 dark:border-zinc-800/80 bg-white dark:bg-zinc-900">
                <span className="inline-block text-xs font-mono font-bold tracking-tight uppercase text-orange-600 dark:text-orange-500 mb-1.5">
                  {items[3].eyebrow}
                </span>
                <h3 className="font-heading text-xl sm:text-2xl font-medium text-[#0e2733] dark:text-zinc-100 mb-2">
                  {items[3].title}
                </h3>
                <p className="font-secondary text-sm sm:text-[15px] text-zinc-600 dark:text-zinc-400 leading-[1.3]">
                  {items[3].description}
                </p>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}

export default HighlightedFeature;
