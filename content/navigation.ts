export interface NavLink {
  label: string;
  href: string;
}

export interface NavigationContent {
  brand: {
    name: string;
    tagline: string;
  };
  announcement?: {
    badge: string;
    text: string;
    href?: string;
  };
  links: NavLink[];
  actions: {
    login: {
      label: string;
      href: string;
    };
    primaryCta: {
      label: string;
      href: string;
    };
  };
}

export const navigationContent: NavigationContent = {
  brand: {
    name: "ctrlF",
    tagline: "Follow-up & Coordination OS",
  },
  announcement: {
    badge: "New",
    text: "AI follow-ups now active for WhatsApp & Instagram",
    href: "#how-it-works",
  },
  links: [
    { label: "Solutions", href: "#use-cases" },
    { label: "How It Works", href: "#how-it-works" },
    { label: "Features", href: "#features" },
    { label: "Dashboard", href: "#dashboard-preview" },
    { label: "Pricing", href: "#pricing" },
    { label: "FAQ", href: "#faq" },
  ],
  actions: {
    login: {
      label: "Log In",
      href: "#login",
    },
    primaryCta: {
      label: "Book a demo",
      href: "#book-demo",
    },
  },
};

