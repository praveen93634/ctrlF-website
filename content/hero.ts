export interface FloatingNotification {
  id: string;
  type: "success" | "ai" | "alert";
  title: string;
  subtitle: string;
  meta?: string;
  action?: {
    label: string;
    href: string;
  };
}

export interface HeroContent {
  badge: {
    text: string;
    pulseDot: boolean;
  };
  headline: {
    line1: string;
    line2: string;
  };
  subheadline: string;
  primaryCta: {
    label: string;
    href: string;
  };
  secondaryCta: {
    label: string;
    href: string;
  };
  dashboardImage: {
    src: string;
    alt: string;
    width: number;
    height: number;
  };
  notifications: FloatingNotification[];
}

export const heroContent: HeroContent = {
  badge: {
    text: "THE AI APPOINTMENT & WHATSAPP COORDINATION OS",
    pulseDot: true,
  },
  headline: {
    line1: "Turn missed follow-ups \ninto meaningful business growth",
    line2: "Turn chats into confirmed visits.",
  },
  subheadline:
    "ctrlF brings official WhatsApp Business API automation for Business. Share one WhatsApp number across your entire team, automate booking reminders, broadcast open slots, and recover lost leads on autopilot.",
  primaryCta: {
    label: "Join the early access list",
    href: "#early-access",
  },
  secondaryCta: {
    label: "See how it works",
    href: "#how-it-works",
  },
  dashboardImage: {
    src: "/CtrlF-dashboard.png",
    alt: "ctrlF appointment coordination and follow-up analytics dashboard",
    width: 1454,
    height: 939,
  },
  notifications: [
    {
      id: "booking-confirmed",
      type: "success",
      title: "⚡ 8s Avg. First Response",
      subtitle: "94% faster than phone calls · Zero lead drop-off",
      meta: "Meta Official WhatsApp Business API",
    },
    {
      id: "ai-assistant",
      type: "ai",
      title: "Shared Team WhatsApp Inbox",
      subtitle: "3 front-desk agents managing 1 official number simultaneously.",
      action: {
        label: "View live inbox tour",
        href: "#features",
      },
    },
    {
      id: "recovery-alert",
      type: "alert",
      title: "+$1,420 Recovered No-Shows",
      subtitle: "In-chat Stripe deposit collected & slot locked in calendar",
      meta: "24h & 2h WhatsApp reminders queued",
    },
  ],
};
