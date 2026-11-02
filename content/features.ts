export interface FeatureCardItem {
  id: string;
  tag: string;
  title: string;
  description?: string;
  href: string;
  highlighted?: boolean;
}

export interface FeaturesContent {
  eyebrow: {
    dot: boolean;
    text: string;
  };
  headline: {
    line1: string;
    line2: string;
  };
  description: string;
  ctaButton: {
    label: string;
    href: string;
  };
  cards: FeatureCardItem[];
}

export const featuresContent: FeaturesContent = {
  eyebrow: {
    dot: true,
    text: "PEOPLE, CONNECTED",
  },
  headline: {
    line1: "Every Lead Matters.",
    line2: "Every Follow-Up Counts.",
  },
  description:
    "Bring your WhatsApp inquiries, customer conversations, and appointments into one intelligent shared workspace. Let automation handle follow-ups and broadcasts while you focus on client care.",
  ctaButton: {
    label: "EXPLORE OUR FEATURES",
    href: "#features",
  },
  cards: [
    {
      id: "lead-management",
      tag: "Lead Management",
      title: "Never Lose a Lead",
      href: "#lead-management",
    },
    {
      id: "automated-followups",
      tag: "Automated Follow-Ups",
      title: "Follow Up on Autopilot",
      href: "#automated-followups",
    },
    {
      id: "appointments-tasks",
      tag: "Appointments & Tasks",
      title: "Every Task, On Track",
      href: "#appointments-tasks",
    },
    {
      id: "customer-intelligence",
      tag: "Customer Intelligence",
      title: "Turn Conversations Into Action",
      description:
        "ctrlF delivers actionable WhatsApp intelligence so your team can broadcast open slots, recover no-shows, and drive repeat bookings.",
      href: "#customer-intelligence",
      highlighted: true,
    },
  ],
};
