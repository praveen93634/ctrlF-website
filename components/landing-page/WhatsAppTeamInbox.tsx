"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Search,
  Check,
  CheckCheck,
  Calendar,
  Clock,
  Sparkles,
  ShieldCheck,
  Settings,
  Bot,
  Zap,
  MoreVertical,
  Paperclip,
  Send,
  Users,
  MessageSquare,
  Megaphone,
  CreditCard,
  Smile,
  RotateCcw,
  ChevronLeft,
  Phone,
  Video,
  Camera,
  Wifi,
  Battery,
} from "lucide-react";

// Official WhatsApp verified green badge SVG
function WhatsAppVerifiedBadge({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      aria-label="Verified WhatsApp Business"
    >
      <circle cx="12" cy="12" r="10" fill="#10B981" />
      <path
        d="M8.5 12.5L10.5 14.5L15.5 9.5"
        stroke="white"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// Official WhatsApp icon SVG
function WhatsAppIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M17.472 14.382c-.301-.15-1.78-.878-2.056-.978-.276-.1-.477-.15-.678.15-.2.301-.778.978-.954 1.179-.176.2-.351.226-.652.075-.301-.15-1.27-.468-2.42-1.493-.895-.798-1.5-1.783-1.676-2.084-.176-.301-.019-.464.132-.614.136-.135.301-.351.452-.527.15-.176.2-.301.3-.502.101-.2.05-.376-.025-.526-.075-.15-.678-1.631-.929-2.233-.244-.587-.492-.507-.678-.517-.176-.01-.376-.01-.577-.01-.2 0-.527.075-.803.376-.276.301-1.054 1.03-1.054 2.511 0 1.482 1.079 2.912 1.23 3.113.15.2 2.123 3.242 5.143 4.546.719.311 1.28.497 1.718.636.722.23 1.378.198 1.898.12.58-.088 1.78-.728 2.03-1.431.251-.703.251-1.305.176-1.431-.075-.126-.276-.201-.577-.351zM12.04 2C6.51 2 2.02 6.48 2.02 12c0 1.83.49 3.55 1.35 5.04L2 22l5.12-1.34c1.44.79 3.09 1.23 4.92 1.23 5.53 0 10.02-4.48 10.02-10S17.57 2 12.04 2z" />
    </svg>
  );
}

// Bouncing Typing Dots Indicator (WhatsApp style)
function WhatsAppTypingDots({ label = "Typing" }: { label?: string }) {
  return (
    <div className="inline-flex items-center gap-1.5 px-3 py-2 rounded-2xl rounded-bl-xs bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 shadow-xs text-xs text-zinc-500">
      <span className="text-[11px] font-medium text-emerald-600 dark:text-emerald-400 mr-1">
        {label}
      </span>
      <span className="flex items-center gap-1">
        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-bounce [animation-delay:-0.3s]" />
        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-bounce [animation-delay:-0.15s]" />
        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-bounce" />
      </span>
    </div>
  );
}

interface ChatThread {
  id: string;
  name: string;
  avatarText: string;
  avatarBg: string;
  phone: string;
  snippet: string;
  time: string;
  unreadCount?: number;
  tags: { label: string; color: string }[];
  isVerified?: boolean;
}

const SAMPLE_THREADS: ChatThread[] = [
  {
    id: "thread-1",
    name: "Sarah Jenkins",
    avatarText: "SJ",
    avatarBg: "bg-emerald-600",
    phone: "+1 (555) 019-2834",
    snippet: "Selected 10:30 AM! Let's lock it in.",
    time: "10:25 AM",
    tags: [
      { label: "VIP Client", color: "bg-emerald-100 text-emerald-800 border-emerald-200" },
      { label: "Hydra-Facial", color: "bg-amber-100 text-amber-800 border-amber-200" },
    ],
    isVerified: true,
  },
  {
    id: "thread-2",
    name: "Dr. Marcus Vance",
    avatarText: "MV",
    avatarBg: "bg-zinc-800",
    phone: "+1 (555) 394-1182",
    snippet: "Deposit received · Slot locked ✓",
    time: "9:42 AM",
    tags: [
      { label: "Confirmed ✓", color: "bg-teal-100 text-teal-800 border-teal-200" },
      { label: "Consultation", color: "bg-zinc-100 text-zinc-700 border-zinc-200" },
    ],
    isVerified: true,
  },
  {
    id: "thread-3",
    name: "Elena Rostova",
    avatarText: "ER",
    avatarBg: "bg-orange-600",
    phone: "+1 (555) 831-9043",
    snippet: "Do you have 2 slots for Balayage on Sat?",
    time: "8:15 AM",
    unreadCount: 2,
    tags: [
      { label: "Instagram Ad", color: "bg-purple-100 text-purple-800 border-purple-200" },
      { label: "High Value", color: "bg-rose-100 text-rose-800 border-rose-200" },
    ],
    isVerified: true,
  },
  {
    id: "thread-4",
    name: "Michael Chang",
    avatarText: "MC",
    avatarBg: "bg-blue-600",
    phone: "+1 (555) 441-2910",
    snippet: "Automated 24h WhatsApp reminder sent",
    time: "Yesterday",
    tags: [
      { label: "24h Reminder", color: "bg-sky-100 text-sky-800 border-sky-200" },
    ],
    isVerified: false,
  },
];

const FULL_CUSTOMER_MESSAGE =
  "Hi there! 👋 Can I book a Hydra-Facial consultation this Saturday morning?";

export function WhatsAppTeamInbox() {
  const [activeTab, setActiveTab] = useState<"all" | "unread" | "assigned">("all");
  const [selectedThreadId, setSelectedThreadId] = useState<string>("thread-1");
  const [selectedSlot, setSelectedSlot] = useState<"10:30" | "14:00">("10:30");
  const [activeNav, setActiveNav] = useState<"inbox" | "broadcasts" | "flows" | "contacts">("inbox");

  // Automatic Typing & Progressive Message State
  const [animStep, setAnimStep] = useState<number>(0);
  const [typedChars, setTypedChars] = useState<number>(0);
  const [cursorPos, setCursorPos] = useState<{ x: number; y: number; clicking: boolean }>({
    x: 80,
    y: 80,
    clicking: false,
  });

  const chatContainerRef = useRef<HTMLDivElement>(null);

  // Auto-scroll chat container as messages appear
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [animStep, typedChars]);

  // Main Animation Controller
  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (animStep === 0) {
      timer = setTimeout(() => {
        setTypedChars(0);
        setSelectedSlot("10:30");
        setCursorPos({ x: 80, y: 80, clicking: false });
        setAnimStep(1);
      }, 700);
    } else if (animStep === 1) {
      if (typedChars < FULL_CUSTOMER_MESSAGE.length) {
        timer = setTimeout(() => {
          setTypedChars((prev) => prev + 1);
        }, 28);
      } else {
        timer = setTimeout(() => {
          setAnimStep(2);
        }, 450);
      }
    } else if (animStep === 2) {
      timer = setTimeout(() => {
        setAnimStep(3);
      }, 650);
    } else if (animStep === 3) {
      timer = setTimeout(() => {
        setAnimStep(4);
      }, 1100);
    } else if (animStep === 4) {
      timer = setTimeout(() => {
        setAnimStep(5);
        setCursorPos({ x: 38, y: 52, clicking: false });
      }, 800);
    } else if (animStep === 5) {
      timer = setTimeout(() => {
        setCursorPos({ x: 38, y: 52, clicking: true });
        setSelectedSlot("10:30");
        timer = setTimeout(() => {
          setAnimStep(6);
        }, 500);
      }, 600);
    } else if (animStep === 6) {
      timer = setTimeout(() => {
        setAnimStep(7);
      }, 900);
    } else if (animStep === 7) {
      timer = setTimeout(() => {
        setAnimStep(8);
      }, 4500);
    } else if (animStep === 8) {
      timer = setTimeout(() => {
        setTypedChars(0);
        setSelectedSlot("10:30");
        setCursorPos({ x: 80, y: 80, clicking: false });
        setAnimStep(0);
      }, 400);
    }

    return () => clearTimeout(timer);
  }, [animStep, typedChars]);

  const activeThread = SAMPLE_THREADS.find((t) => t.id === selectedThreadId) || SAMPLE_THREADS[0];

  const liveSnippet =
    animStep <= 1
      ? animStep === 1
        ? "Sarah is typing..."
        : "No new messages"
      : animStep < 6
      ? FULL_CUSTOMER_MESSAGE
      : "Selected 10:30 AM! Let's lock it in.";

  return (
    <div className="w-full font-figtree select-none text-zinc-900 dark:text-zinc-100 overflow-hidden">
      {/* ─────────────────────────────────────────────────────────────
          1. MOBILE VIEW PHONE HEADER (< sm)
          Looks like an authentic iPhone running WhatsApp
          ───────────────────────────────────────────────────────────── */}
      <div className="block sm:hidden">
        {/* Dynamic Island / Status Bar */}
        <div className="flex items-center justify-between px-5 pt-3 pb-2 bg-zinc-950 text-white text-[11px] font-semibold border-b border-zinc-900">
          <span>9:41</span>
          <div className="flex items-center gap-1.5 h-4 px-3 rounded-full bg-zinc-900 border border-zinc-800">
            <span className="h-1.5 w-1.5 rounded-full bg-zinc-700" />
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
          </div>
          <div className="flex items-center gap-1.5 text-zinc-300">
            <Wifi className="h-3 w-3" />
            <Battery className="h-3.5 w-3.5" />
          </div>
        </div>

        {/* WhatsApp Mobile Top Navigation Bar */}
        <div className="flex items-center justify-between px-3 py-2.5 bg-[#075e54] text-white shadow-xs">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => {
                setAnimStep(0);
                setTypedChars(0);
              }}
              className="flex items-center text-white -ml-1 focus:outline-none"
              title="Back"
            >
              <ChevronLeft className="h-5 w-5" />
              <span className="text-[10px] font-bold bg-white/20 px-1.5 py-0.2 rounded-full">3</span>
            </button>
            <div className="relative">
              <div
                className={`h-8 w-8 rounded-full ${activeThread.avatarBg} text-white flex items-center justify-center text-xs font-bold ring-1 ring-white/30`}
              >
                {activeThread.avatarText}
              </div>
              <span className="absolute bottom-0 right-0 h-2 w-2 rounded-full bg-emerald-400 ring-1 ring-emerald-950" />
            </div>
            <div>
              <div className="flex items-center gap-1">
                <span className="text-xs font-bold leading-tight text-white">
                  {activeThread.name}
                </span>
                <WhatsAppVerifiedBadge className="h-3 w-3 inline-block" />
              </div>
              <span className="text-[10px] text-emerald-200 block leading-tight">
                online • Official Business API
              </span>
            </div>
          </div>
          <div className="flex items-center gap-3 text-white">
            <Video className="h-4 w-4 opacity-90" />
            <Phone className="h-3.5 w-3.5 opacity-90" />
            <button
              type="button"
              onClick={() => {
                setAnimStep(0);
                setTypedChars(0);
              }}
              title="Replay conversation"
              className="p-1 rounded text-white hover:text-emerald-200 active:scale-90 transition-transform"
            >
              <RotateCcw className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          2. DESKTOP VIEW APPLICATION BAR (>= sm)
          Wati Multi-Agent Shared Team Inbox Chrome
          ───────────────────────────────────────────────────────────── */}
      <div className="hidden sm:flex items-center justify-between px-4 py-2.5 bg-zinc-900 border-b border-zinc-800 text-white">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5" aria-hidden="true">
            <span className="h-3 w-3 rounded-full bg-[#ef4444] inline-block" />
            <span className="h-3 w-3 rounded-full bg-[#f59e0b] inline-block" />
            <span className="h-3 w-3 rounded-full bg-[#10b981] inline-block" />
          </div>
          <div className="h-3.5 w-px bg-zinc-700" />
          <div className="flex items-center gap-2">
            <span className="font-semibold text-xs tracking-tight text-white flex items-center gap-1.5">
              <span className="inline-block h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              ctrlF Shared Team Inbox
            </span>
            <span className="inline-flex items-center gap-1 rounded-md bg-emerald-500/20 px-2 py-0.5 text-[10px] font-medium text-emerald-300 border border-emerald-500/30">
              <WhatsAppIcon className="h-3 w-3 text-emerald-400" />
              Official WhatsApp Business API
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={() => {
              setAnimStep(0);
              setTypedChars(0);
            }}
            className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white text-[11px] font-medium border border-zinc-700 transition-colors"
            title="Restart typing sequence"
          >
            <RotateCcw className="h-3 w-3 text-emerald-400" />
            <span>Replay</span>
          </button>

          <div className="hidden md:flex items-center gap-2 text-xs text-zinc-400">
            <span className="text-[11px]">3 agents online</span>
            <div className="flex -space-x-1.5">
              <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-emerald-700 text-[10px] font-bold text-white ring-1 ring-zinc-900">
                C
              </span>
              <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-amber-600 text-[10px] font-bold text-white ring-1 ring-zinc-900">
                L
              </span>
              <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-blue-600 text-[10px] font-bold text-white ring-1 ring-zinc-900">
                M
              </span>
            </div>
          </div>
          <div className="inline-flex items-center gap-1.5 bg-zinc-800 text-zinc-200 text-xs px-2.5 py-1 rounded-full border border-zinc-700">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            <span className="font-medium text-[11px] truncate">
              +1 (800) 555-CTRLF
            </span>
          </div>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          3. MAIN LAYOUT (Adaptive: Mobile Single Screen / Desktop Multi-Column)
          ───────────────────────────────────────────────────────────── */}
      <div className="flex h-[470px] sm:h-[500px] bg-white dark:bg-zinc-950 overflow-hidden">
        {/* Navigation Rail (Far Left Icons - Desktop only) */}
        <div className="w-13 shrink-0 hidden sm:flex border-r border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/60 flex-col items-center py-4 justify-between">
          <div className="flex flex-col items-center gap-4 w-full">
            <button
              type="button"
              onClick={() => setActiveNav("inbox")}
              className={`relative p-2.5 rounded-xl transition-all ${
                activeNav === "inbox"
                  ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/30"
                  : "text-zinc-500 hover:text-zinc-900 hover:bg-zinc-200 dark:hover:bg-zinc-800"
              }`}
              title="Team Inbox"
            >
              <MessageSquare className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-emerald-500 text-[9px] font-bold text-white border-2 border-white dark:border-zinc-900">
                3
              </span>
            </button>

            <button
              type="button"
              onClick={() => setActiveNav("broadcasts")}
              className={`p-2.5 rounded-xl transition-all ${
                activeNav === "broadcasts"
                  ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/30"
                  : "text-zinc-500 hover:text-zinc-900 hover:bg-zinc-200 dark:hover:bg-zinc-800"
              }`}
              title="Broadcast Campaigns"
            >
              <Megaphone className="h-5 w-5" />
            </button>

            <button
              type="button"
              onClick={() => setActiveNav("flows")}
              className={`p-2.5 rounded-xl transition-all ${
                activeNav === "flows"
                  ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/30"
                  : "text-zinc-500 hover:text-zinc-900 hover:bg-zinc-200 dark:hover:bg-zinc-800"
              }`}
              title="WhatsApp Flows & Chatbots"
            >
              <Bot className="h-5 w-5" />
            </button>

            <button
              type="button"
              onClick={() => setActiveNav("contacts")}
              className={`p-2.5 rounded-xl transition-all ${
                activeNav === "contacts"
                  ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/30"
                  : "text-zinc-500 hover:text-zinc-900 hover:bg-zinc-200 dark:hover:bg-zinc-800"
              }`}
              title="Customer Pipeline"
            >
              <Users className="h-5 w-5" />
            </button>
          </div>

          <div className="flex flex-col items-center gap-3">
            <button
              type="button"
              className="p-2 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200"
              title="Settings"
            >
              <Settings className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Conversation List Column (Desktop/Tablet only) */}
        <div className="w-64 lg:w-72 shrink-0 hidden md:flex border-r border-zinc-200 dark:border-zinc-800 bg-[#faf8f5] dark:bg-zinc-900/40 flex-col">
          <div className="p-3 border-b border-zinc-200 dark:border-zinc-800 bg-white/70 dark:bg-zinc-900/80 backdrop-blur-sm">
            <div className="relative mb-2.5">
              <Search className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-zinc-400" />
              <input
                type="text"
                readOnly
                placeholder="Search chats, tags..."
                value=""
                className="w-full rounded-lg border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800/80 py-1.5 pl-8 pr-7 text-xs text-zinc-800 dark:text-zinc-200 placeholder-zinc-400 focus:outline-none"
              />
              <span className="absolute right-2 top-2 text-[10px] text-zinc-400 font-mono bg-zinc-200 dark:bg-zinc-700 px-1 rounded">
                ⌘K
              </span>
            </div>

            <div className="flex items-center gap-1 text-[11px] font-medium text-zinc-600 dark:text-zinc-400 overflow-x-auto pb-0.5">
              <button
                type="button"
                onClick={() => setActiveTab("all")}
                className={`px-2.5 py-1 rounded-md transition-colors ${
                  activeTab === "all"
                    ? "bg-emerald-600 text-white font-semibold shadow-sm"
                    : "hover:bg-zinc-200 dark:hover:bg-zinc-800"
                }`}
              >
                All (18)
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("unread")}
                className={`px-2.5 py-1 rounded-md transition-colors flex items-center gap-1 ${
                  activeTab === "unread"
                    ? "bg-emerald-600 text-white font-semibold shadow-sm"
                    : "hover:bg-zinc-200 dark:hover:bg-zinc-800"
                }`}
              >
                <span>Unread</span>
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("assigned")}
                className={`px-2.5 py-1 rounded-md transition-colors ${
                  activeTab === "assigned"
                    ? "bg-emerald-600 text-white font-semibold shadow-sm"
                    : "hover:bg-zinc-200 dark:hover:bg-zinc-800"
                }`}
              >
                Assigned (4)
              </button>
            </div>
          </div>

          <div className="flex-1 min-h-0 overflow-y-auto divide-y divide-zinc-100 dark:divide-zinc-800/60">
            {SAMPLE_THREADS.map((thread) => {
              const isSelected = thread.id === selectedThreadId;
              const isThread1 = thread.id === "thread-1";
              return (
                <div
                  key={thread.id}
                  onClick={() => setSelectedThreadId(thread.id)}
                  className={`p-3 cursor-pointer transition-all ${
                    isSelected
                      ? "bg-emerald-500/10 dark:bg-emerald-950/30 border-l-4 border-l-emerald-600 dark:border-l-emerald-400"
                      : "hover:bg-zinc-100/80 dark:hover:bg-zinc-800/40"
                  }`}
                >
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <div className="flex items-center gap-2">
                      <div className="relative">
                        <div
                          className={`h-8 w-8 rounded-full ${thread.avatarBg} text-white flex items-center justify-center text-xs font-bold shadow-sm`}
                        >
                          {thread.avatarText}
                        </div>
                        <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full bg-emerald-500 ring-2 ring-white dark:ring-zinc-900 flex items-center justify-center">
                          <WhatsAppIcon className="h-2 w-2 text-white" />
                        </span>
                      </div>
                      <div>
                        <div className="flex items-center gap-1">
                          <span className="text-xs font-semibold text-zinc-900 dark:text-zinc-100">
                            {thread.name}
                          </span>
                          {thread.isVerified && (
                            <WhatsAppVerifiedBadge className="h-3 w-3 inline-block" />
                          )}
                        </div>
                        <span className="text-[10px] text-zinc-400 block font-mono">
                          {thread.phone}
                        </span>
                      </div>
                    </div>
                    <span className="text-[10px] text-zinc-400 shrink-0 font-medium">
                      {isThread1 && animStep <= 1 ? "Just now" : thread.time}
                    </span>
                  </div>

                  <p
                    className={`text-[11px] line-clamp-1 mb-1.5 pl-10 ${
                      isThread1 && animStep === 1
                        ? "text-emerald-600 dark:text-emerald-400 font-medium italic"
                        : "text-zinc-600 dark:text-zinc-400"
                    }`}
                  >
                    {isThread1 ? liveSnippet : thread.snippet}
                  </p>

                  <div className="flex items-center gap-1.5 pl-10 flex-wrap">
                    {thread.tags.map((tag) => (
                      <span
                        key={tag.label}
                        className={`text-[9px] font-semibold px-1.5 py-0.5 rounded border ${tag.color}`}
                      >
                        {tag.label}
                      </span>
                    ))}
                    {thread.unreadCount && (
                      <span className="ml-auto inline-flex h-4 w-4 items-center justify-center rounded-full bg-emerald-600 text-[9px] font-bold text-white">
                        {thread.unreadCount}
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="p-2.5 border-t border-zinc-200 dark:border-zinc-800 bg-white/50 dark:bg-zinc-900/40 text-[10px] text-zinc-500 flex items-center justify-between">
            <span className="flex items-center gap-1">
              <Zap className="h-3 w-3 text-amber-500" />
              <span>Avg. response:</span>
              <strong className="text-zinc-700 dark:text-zinc-300">8s</strong>
            </span>
            <span className="text-emerald-600 dark:text-emerald-400 font-medium">
              100% WhatsApp SLA
            </span>
          </div>
        </div>

        {/* Center Main WhatsApp Conversation Pane */}
        <div className="flex-1 min-w-0 flex flex-col bg-[#f8fafc] dark:bg-zinc-950 border-r border-zinc-200 dark:border-zinc-800 relative">
          {/* Active Chat Header (Desktop only - mobile uses dedicated WhatsApp header above) */}
          <div className="hidden sm:flex items-center justify-between px-4 py-3 bg-white dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800 shadow-xs">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div
                  className={`h-9 w-9 rounded-full ${activeThread.avatarBg} text-white flex items-center justify-center text-xs font-bold`}
                >
                  {activeThread.avatarText}
                </div>
                <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-emerald-500 ring-2 ring-white dark:ring-zinc-900" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-semibold text-sm text-zinc-900 dark:text-zinc-100">
                    {activeThread.name}
                  </span>
                  <WhatsAppVerifiedBadge className="h-3.5 w-3.5" />
                  <span className="text-[10px] bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 font-semibold px-1.5 py-0.5 rounded border border-emerald-200 dark:border-emerald-800">
                    VIP
                  </span>
                </div>
                <div className="flex items-center gap-2 text-[11px] text-zinc-500">
                  <span>{activeThread.phone}</span>
                  <span>•</span>
                  <span className="text-emerald-600 dark:text-emerald-400 font-medium flex items-center gap-1">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 inline-block" />
                    Assigned: Claire (Front Desk)
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-1.5">
              <button
                type="button"
                className="hidden lg:inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium text-zinc-700 dark:text-zinc-300 bg-zinc-100 dark:bg-zinc-800 rounded-md hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
              >
                <span>+ Internal Note</span>
              </button>
              <button
                type="button"
                className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 rounded-md hover:bg-emerald-100 transition-colors"
              >
                <Check className="h-3 w-3" />
                <span>Resolve</span>
              </button>
              <button
                type="button"
                className="p-1.5 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200"
              >
                <MoreVertical className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Chat Messages Stream (Scrollable container with fixed height and auto-scroll) */}
          <div
            ref={chatContainerRef}
            className="flex-1 min-h-0 p-3 sm:p-4 overflow-y-auto space-y-3 bg-[#efeae2]/60 dark:bg-zinc-950/90 relative scroll-smooth [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-zinc-300 dark:[&::-webkit-scrollbar-thumb]:bg-zinc-700"
          >
            {/* End-to-end encryption notification */}
            <div className="flex justify-center">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-amber-50 dark:bg-amber-950/30 border border-amber-200/80 dark:border-amber-800/40 text-[9px] sm:text-[10px] text-amber-800 dark:text-amber-300 shadow-2xs text-center">
                <ShieldCheck className="h-3 w-3 text-amber-600 dark:text-amber-400 shrink-0" />
                <span>Official Meta Cloud API • 256-bit Encrypted</span>
              </div>
            </div>

            {/* Date separator */}
            <div className="flex justify-center">
              <span className="text-[9px] sm:text-[10px] font-semibold text-zinc-400 bg-white/80 dark:bg-zinc-800/80 px-2.5 py-0.5 rounded-full shadow-2xs">
                Today, November 8
              </span>
            </div>

            {/* STATE 0: Initial clean empty state notice */}
            {animStep === 0 && (
              <div className="flex flex-col items-center justify-center py-10 text-center text-zinc-400 animate-in fade-in duration-500">
                <div className="h-10 w-10 rounded-full bg-emerald-50 dark:bg-emerald-950/40 flex items-center justify-center text-emerald-600 dark:text-emerald-400 mb-2">
                  <WhatsAppIcon className="h-5 w-5" />
                </div>
                <p className="text-xs font-medium text-zinc-600 dark:text-zinc-400">
                  Ready for new WhatsApp inquiry...
                </p>
                <p className="text-[10px] text-zinc-400 mt-0.5">
                  Incoming leads from Meta Ads appear here instantly
                </p>
              </div>
            )}

            {/* STATE 1: Live Character-by-Character Typewriter Draft Bubble */}
            {animStep === 1 && (
              <div className="flex items-end gap-2 max-w-[90%] sm:max-w-[85%] animate-in fade-in slide-in-from-bottom-2 duration-300">
                <div className="bg-white dark:bg-zinc-900 p-2.5 sm:p-3 rounded-2xl rounded-bl-xs border border-emerald-300 dark:border-emerald-700/60 shadow-sm ring-2 ring-emerald-500/20">
                  <div className="flex items-center gap-1.5 mb-1 text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-ping" />
                    <span>Sarah Jenkins is typing...</span>
                  </div>
                  <p className="text-xs text-zinc-800 dark:text-zinc-200 leading-relaxed font-normal">
                    {FULL_CUSTOMER_MESSAGE.slice(0, typedChars)}
                    <span className="inline-block w-0.5 h-3.5 bg-emerald-600 dark:bg-emerald-400 ml-0.5 animate-pulse align-middle" />
                  </p>
                </div>
              </div>
            )}

            {/* STATE 2+: Customer Message 1 Finalized */}
            {animStep >= 2 && (
              <div className="flex items-end gap-2 max-w-[90%] sm:max-w-[85%] animate-in fade-in slide-in-from-bottom-2 duration-300">
                <div className="bg-white dark:bg-zinc-900 p-2.5 sm:p-3 rounded-2xl rounded-bl-xs border border-zinc-200/80 dark:border-zinc-800 shadow-xs">
                  <p className="text-xs text-zinc-800 dark:text-zinc-200 leading-relaxed">
                    {FULL_CUSTOMER_MESSAGE}
                  </p>
                  <div className="mt-1 flex items-center justify-end gap-1 text-[10px] text-zinc-400">
                    <span>10:24 AM</span>
                  </div>
                </div>
              </div>
            )}

            {/* STATE 3: Bot Typing Indicator */}
            {animStep === 3 && (
              <div className="flex items-end justify-end max-w-[90%] sm:max-w-[85%] ml-auto animate-in fade-in slide-in-from-bottom-2 duration-200">
                <WhatsAppTypingDots label="ctrlF Autopilot is replying" />
              </div>
            )}

            {/* STATE 4+: Bot Reply & WhatsApp Flow Slot Card */}
            {animStep >= 4 && (
              <div className="flex items-end justify-end gap-2 max-w-[96%] sm:max-w-[92%] ml-auto animate-in fade-in slide-in-from-bottom-2 duration-400">
                <div className="bg-[#dcf8c6] dark:bg-emerald-950/70 p-3 sm:p-3.5 rounded-2xl rounded-br-xs border border-emerald-300/80 dark:border-emerald-800/60 shadow-xs text-zinc-900 dark:text-zinc-100">
                  <div className="flex items-center gap-1.5 mb-1 text-[10px] font-bold text-emerald-800 dark:text-emerald-300">
                    <Bot className="h-3 w-3" />
                    <span>ctrlF Autopilot Flow</span>
                    <span className="text-[9px] font-normal text-emerald-700/80 dark:text-emerald-400">
                      • Instant Reply
                    </span>
                  </div>
                  <p className="text-xs text-zinc-800 dark:text-zinc-200 leading-relaxed mb-2">
                    Hi Sarah! ✨ Welcome to Glow Clinic. Here are our remaining Saturday slots:
                  </p>

                  {/* WhatsApp Interactive Flow Slot Picker Card */}
                  <div className="relative rounded-xl border border-emerald-300 dark:border-emerald-700/60 bg-white dark:bg-zinc-900 p-2 sm:p-2.5 shadow-xs">
                    <div className="flex items-center justify-between mb-2 pb-1.5 border-b border-zinc-100 dark:border-zinc-800 text-[11px]">
                      <span className="font-semibold text-zinc-900 dark:text-zinc-100 flex items-center gap-1 truncate mr-2">
                        <Sparkles className="h-3 w-3 text-amber-500 shrink-0" />
                        Hydra-Facial (60 min)
                      </span>
                      <span className="font-bold text-emerald-600 dark:text-emerald-400 shrink-0">
                        $120
                      </span>
                    </div>

                    <div className="space-y-1.5">
                      {/* Slot Option 1: 10:30 AM */}
                      <div
                        onClick={() => setSelectedSlot("10:30")}
                        className={`flex items-center justify-between p-2 rounded-lg border text-xs cursor-pointer transition-all ${
                          selectedSlot === "10:30" && animStep >= 5
                            ? "border-emerald-500 bg-emerald-50 dark:bg-emerald-950/50 text-emerald-950 dark:text-emerald-100 font-semibold ring-2 ring-emerald-500/50 shadow-xs"
                            : "border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300"
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <span
                            className={`h-3.5 w-3.5 rounded-full flex items-center justify-center border transition-all ${
                              selectedSlot === "10:30" && animStep >= 5
                                ? "border-emerald-600 bg-emerald-600 text-white scale-110"
                                : "border-zinc-400"
                            }`}
                          >
                            {selectedSlot === "10:30" && animStep >= 5 && (
                              <Check className="h-2.5 w-2.5" />
                            )}
                          </span>
                          <span className="text-[11px] sm:text-xs">Sat, Nov 8 • 10:30 AM</span>
                        </div>
                        <span className="text-[9px] sm:text-[10px] font-medium text-emerald-700 dark:text-emerald-400 bg-emerald-100/70 dark:bg-emerald-900/60 px-1.5 py-0.5 rounded">
                          Recommended
                        </span>
                      </div>

                      {/* Slot Option 2: 02:00 PM */}
                      <div
                        onClick={() => setSelectedSlot("14:00")}
                        className={`flex items-center justify-between p-2 rounded-lg border text-xs cursor-pointer transition-all ${
                          selectedSlot === "14:00"
                            ? "border-emerald-500 bg-emerald-50 dark:bg-emerald-950/50 text-emerald-950 dark:text-emerald-100 font-semibold ring-1 ring-emerald-500"
                            : "border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300"
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <span
                            className={`h-3.5 w-3.5 rounded-full flex items-center justify-center border ${
                              selectedSlot === "14:00"
                                ? "border-emerald-600 bg-emerald-600 text-white"
                                : "border-zinc-400"
                            }`}
                          >
                            {selectedSlot === "14:00" && <Check className="h-2.5 w-2.5" />}
                          </span>
                          <span className="text-[11px] sm:text-xs">Sat, Nov 8 • 02:00 PM</span>
                        </div>
                        <span className="text-[9px] sm:text-[10px] text-zinc-500">1 left</span>
                      </div>
                    </div>

                    <div className="mt-1.5 text-[9px] sm:text-[10px] text-zinc-500 dark:text-zinc-400 text-center">
                      *Requires a $30 booking deposit to lock slot
                    </div>
                  </div>

                  <div className="mt-1.5 flex items-center justify-end gap-1 text-[10px] text-emerald-700/80 dark:text-emerald-400">
                    <span>10:24 AM</span>
                    <CheckCheck className="h-3.5 w-3.5 text-emerald-600" />
                  </div>
                </div>
              </div>
            )}

            {/* STATE 6+: Customer Selects Slot Reply */}
            {animStep >= 6 && (
              <div className="flex items-end gap-2 max-w-[90%] sm:max-w-[85%] animate-in fade-in slide-in-from-bottom-2 duration-300">
                <div className="bg-white dark:bg-zinc-900 p-2.5 sm:p-3 rounded-2xl rounded-bl-xs border border-zinc-200/80 dark:border-zinc-800 shadow-xs">
                  <p className="text-xs text-zinc-800 dark:text-zinc-200 leading-relaxed font-medium">
                    Selected 10:30 AM! Let&apos;s lock it in.
                  </p>
                  <div className="mt-1 flex items-center justify-end gap-1 text-[10px] text-zinc-400">
                    <span>10:25 AM</span>
                  </div>
                </div>
              </div>
            )}

            {/* STATE 7+: Deposit Confirmation & Calendar Sync Receipt */}
            {animStep >= 7 && (
              <div className="flex items-end justify-end gap-2 max-w-[96%] sm:max-w-[92%] ml-auto animate-in fade-in slide-in-from-bottom-2 duration-400">
                <div className="bg-[#dcf8c6] dark:bg-emerald-950/70 p-3 sm:p-3.5 rounded-2xl rounded-br-xs border border-emerald-300/80 dark:border-emerald-800/60 shadow-xs">
                  <p className="text-xs text-zinc-800 dark:text-zinc-200 leading-relaxed mb-2 font-medium">
                    You&apos;re booked! 🎉 Reserved Sat, Nov 8 at 10:30 AM.
                  </p>

                  <div className="rounded-xl border border-emerald-300 dark:border-emerald-700 bg-white dark:bg-zinc-900 p-2.5 text-xs shadow-xs">
                    <div className="flex items-center justify-between pb-1.5 border-b border-zinc-100 dark:border-zinc-800">
                      <span className="font-semibold text-emerald-700 dark:text-emerald-400 flex items-center gap-1.5 text-[11px] sm:text-xs">
                        <CreditCard className="h-3.5 w-3.5 text-emerald-600" />
                        Deposit Paid: $30.00
                      </span>
                      <span className="text-[10px] font-mono text-zinc-400">Stripe ✓</span>
                    </div>
                    <div className="pt-1.5 text-[10px] sm:text-[11px] text-zinc-600 dark:text-zinc-400 space-y-1">
                      <div className="flex items-center gap-1 text-zinc-700 dark:text-zinc-300 font-medium">
                        <Calendar className="h-3 w-3 text-emerald-600 shrink-0" />
                        <span>Google Calendar 2-Way Synced</span>
                      </div>
                      <div className="flex items-center gap-1 text-zinc-500">
                        <Clock className="h-3 w-3 text-amber-600 shrink-0" />
                        <span>24h & 2h WhatsApp reminders queued</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-1.5 flex items-center justify-end gap-1 text-[10px] text-emerald-700/80 dark:text-emerald-400">
                    <span>10:25 AM</span>
                    <CheckCheck className="h-3.5 w-3.5 text-emerald-600" />
                  </div>
                </div>
              </div>
            )}

            {/* Virtual Pointer Cursor during Step 5 */}
            {animStep === 5 && (
              <div
                className="pointer-events-none absolute z-40 transition-all duration-500 ease-out"
                style={{
                  top: `${cursorPos.y}%`,
                  left: `${cursorPos.x}%`,
                }}
              >
                <div className="relative">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    className="drop-shadow-md text-emerald-600"
                  >
                    <path
                      d="M5.5 3.5L11.5 19.5L14.5 13.5L20.5 10.5L5.5 3.5Z"
                      fill="#10B981"
                      stroke="#ffffff"
                      strokeWidth="2"
                      strokeLinejoin="round"
                    />
                  </svg>
                  {cursorPos.clicking && (
                    <span className="absolute -top-1 -left-1 h-6 w-6 rounded-full bg-emerald-400/50 animate-ping" />
                  )}
                </div>
              </div>
            )}
          </div>

          {/* ─────────────────────────────────────────────────────────────
              4A. MOBILE BOTTOM INPUT BAR (< sm)
              Matches authentic WhatsApp iOS / Android layout
              ───────────────────────────────────────────────────────────── */}
          <div className="flex sm:hidden items-center gap-2 p-2 bg-[#f0f2f5] dark:bg-zinc-900 border-t border-zinc-200/80 dark:border-zinc-800">
            <div className="flex-1 flex items-center gap-1.5 bg-white dark:bg-zinc-800 rounded-full px-3 py-1.5 shadow-2xs border border-zinc-200 dark:border-zinc-700">
              <Smile className="h-4 w-4 text-zinc-400 shrink-0" />
              <input
                type="text"
                readOnly
                value=""
                placeholder="Message"
                className="flex-1 text-xs bg-transparent text-zinc-800 dark:text-zinc-200 placeholder-zinc-400 focus:outline-none min-w-0"
              />
              <Paperclip className="h-3.5 w-3.5 text-zinc-400 -rotate-45 shrink-0" />
              <Camera className="h-3.5 w-3.5 text-zinc-400 shrink-0" />
            </div>
            <button
              type="button"
              className={`h-9 w-9 rounded-full text-white flex items-center justify-center shadow-sm shrink-0 transition-all active:scale-90 ${
                animStep === 1
                  ? "bg-[#25D366] animate-pulse"
                  : "bg-[#25D366] hover:bg-emerald-500"
              }`}
              title="Send"
            >
              <Send className="h-4 w-4" />
            </button>
          </div>

          {/* ─────────────────────────────────────────────────────────────
              4B. DESKTOP BOTTOM INPUT BAR (>= sm)
              Wati multi-agent reply box with canned responses
              ───────────────────────────────────────────────────────────── */}
          <div className="hidden sm:block p-3 bg-white dark:bg-zinc-900 border-t border-zinc-200 dark:border-zinc-800">
            <div className="flex items-center gap-1.5 mb-2 overflow-x-auto pb-1 text-[11px]">
              <span className="text-[10px] text-zinc-400 font-medium shrink-0 flex items-center gap-1">
                <Zap className="h-3 w-3 text-amber-500" /> Canned:
              </span>
              <button
                type="button"
                className="shrink-0 px-2 py-0.5 rounded-full bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700 transition-colors"
              >
                /send-directions
              </button>
              <button
                type="button"
                className="shrink-0 px-2 py-0.5 rounded-full bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700 transition-colors"
              >
                /aftercare-guide
              </button>
              <button
                type="button"
                className="shrink-0 px-2 py-0.5 rounded-full bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700 transition-colors"
              >
                /reschedule-link
              </button>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                className="p-1.5 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800"
                title="Attach WhatsApp Flow or File"
              >
                <Paperclip className="h-4 w-4" />
              </button>
              <button
                type="button"
                className="p-1.5 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800"
                title="Emojis"
              >
                <Smile className="h-4 w-4" />
              </button>
              <input
                type="text"
                readOnly
                value=""
                placeholder="Reply as Claire (Front Desk) or type '/' for templates..."
                className="flex-1 bg-zinc-50 dark:bg-zinc-800/70 border border-zinc-200 dark:border-zinc-700 rounded-xl px-3 py-2 text-xs text-zinc-800 dark:text-zinc-200 placeholder-zinc-400 focus:outline-none"
              />
              <button
                type="button"
                className={`inline-flex items-center justify-center h-8 w-8 rounded-xl text-white shadow-sm transition-all active:scale-95 shrink-0 ${
                  animStep === 1
                    ? "bg-emerald-500 animate-pulse"
                    : "bg-emerald-600 hover:bg-emerald-500"
                }`}
                title="Send Message"
              >
                <Send className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WhatsAppTeamInbox;
