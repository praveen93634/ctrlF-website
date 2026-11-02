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
      title: "Appointment confirmed",
      subtitle: "Tomorrow at 2:30 PM · Dental Clinic",
      meta: "Confirmed via WhatsApp Flow in 2m",
    },
    {
      id: "ai-assistant",
      type: "ai",
      title: "ctrlF Shared Inbox",
      subtitle: "6 consultation inquiries assigned to team. Follow-up automated.",
      action: {
        label: "View active inbox",
        href: "#pipeline",
      },
    },
    {
      id: "recovery-alert",
      type: "alert",
      title: "Broadcast slot filled",
      subtitle: "Client rescheduled to Saturday · Empty chair refilled",
      meta: "Saved $120 slot",
    },
  ],
};
