export interface HighlightedGridItem {
  id: string;
  gridNumber: number;
  eyebrow: string;
  title: string;
  description: string;
}

export interface HighlightedFeatureContent {
  eyebrow: {
    dot: boolean;
    text: string;
  };
  title: string;
  subtitle: string;
  items: HighlightedGridItem[];
}

export const highlightedFeatureContent: HighlightedFeatureContent = {
  eyebrow: {
    dot: true,
    text: "Features",
  },
  title: "Build your WhatsApp assistant in minutes, not weeks.",
  subtitle:
    "No code, no developers. Set up replies, follow-ups and bookings with simple drag and drop.",
  items: [
    {
      id: "chatbot-builder",
      gridNumber: 1,
      eyebrow: "BUILD",
      title: "Launch a WhatsApp chatbot in minutes",
      description:
        "Drag and drop your replies, add buttons like “Book a slot” or “View prices”, and go live. No coding needed.",
    },
    {
      id: "instant-replies",
      gridNumber: 2,
      eyebrow: "SUPPORT",
      title: "Answer every customer, 24/7",
      description:
        "Prices, timings, location, services. ctrlF replies in seconds, even at midnight, in your tone and in the customer’s language.",
    },
    {
      id: "auto-followups",
      gridNumber: 3,
      eyebrow: "FOLLOW-UPS",
      title: "Never let a lead go cold",
      description:
        "Set smart follow-up messages for people who stopped replying. ctrlF sends them at the right time until the customer books or says no.",
    },
    {
      id: "bookings-insights",
      gridNumber: 4,
      eyebrow: "GROW",
      title: "Book appointments and track results",
      description:
        "Customers pick a slot right inside WhatsApp. See leads, bookings and response times in one simple dashboard.",
    },
  ],
};

