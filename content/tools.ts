export interface OrbitIconItem {
  id: string;
  name: string;
  imageSrc: string;
  alt: string;
  category?: string;
  angle: number; // in degrees
}

export interface PlatformAccordionItem {
  id: string;
  title: string;
  description: string;
  defaultOpen?: boolean;
}

export interface ToolsContent {
  eyebrow: {
    dot: boolean;
    text: string;
  };
  headline: string;
  description: string;
  accordions: PlatformAccordionItem[];
  centerBadge: {
    brandPrefix: string;
    brandHighlight: string;
    badgeLabel: string;
    tooltip: string;
  };
  orbits: {
    inner: {
      durationSeconds: number;
      clockwise: boolean;
      icons: OrbitIconItem[];
    };
    middle: {
      durationSeconds: number;
      clockwise: boolean;
      icons: OrbitIconItem[];
    };
    outer: {
      durationSeconds: number;
      clockwise: boolean;
      icons: OrbitIconItem[];
    };
  };
}

export const toolsContent: ToolsContent = {
  eyebrow: {
    dot: true,
    text: "THE PLATFORM",
  },
  headline: "One platform for the entire customer lifecycle",
  description:
    "ctrlF connects official WhatsApp Business API messaging, shared team inboxes, smart booking flows, and follow-up automations behind your business—giving receptionists, clinicians, and studio owners one intelligent foundation.",
  accordions: [
    {
      id: "shared-inbox",
      title: "Shared WhatsApp Team Inbox & Routing",
      description:
        "Give your entire team access to one verified business WhatsApp number across all devices. Auto-assign inquiries to specific stylists or clinicians, leave internal notes, and reply with instant canned templates.",
    },
    {
      id: "automated-followups",
      title: "Automated WhatsApp Follow-ups & Reminders",
      description:
        "Trigger automated 24-hour confirmations, 2-hour pre-visit reminders, and polite re-engagement messages that recover cold leads and minimize empty chairs without receptionist burnout.",
    },
    {
      id: "smart-booking",
      title: "Interactive WhatsApp Booking Flows",
      description:
        "Let clients choose services, pick calendar slots, and confirm appointments natively inside WhatsApp chats with interactive buttons and zero phone tag.",
      defaultOpen: true,
    },
    {
      id: "whatsapp-broadcasts",
      title: "WhatsApp Broadcasts & Slot Backfilling",
      description:
        "Send targeted bulk broadcasts to opted-in clients with 98% open rates. Announce seasonal treatments, promote quiet days, and refill last-minute cancellations in minutes.",
    },
    {
      id: "analytics-recovery",
      title: "Analytics, Team SLAs & No-Show Recovery",
      description:
        "Monitor delivery and read rates, team response times, and measure exactly how many chairs and dollars were saved by automated no-show recovery flows.",
    },
  ],
  centerBadge: {
    brandPrefix: "ctrl",
    brandHighlight: "F",
    badgeLabel: "OS",
    tooltip: "ctrlF Coordination Engine",
  },
  orbits: {
    // Inner Ring: 3 core communication & CRM connectors
    inner: {
      durationSeconds: 38,
      clockwise: true,
      icons: [
        {
          id: "hubspot",
          name: "HubSpot",
          imageSrc: "/icons/Format=Glyph.png",
          alt: "HubSpot CRM integration",
          category: "CRM & Contacts",
          angle: 30,
        },
        {
          id: "slack",
          name: "Slack",
          imageSrc: "/icons/Format=Glyph (3).png",
          alt: "Slack team notifications",
          category: "Team Alerts",
          angle: 150,
        },
        {
          id: "mailchimp",
          name: "Mailchimp",
          imageSrc: "/icons/Format=Glyph (2).png",
          alt: "Mailchimp marketing integration",
          category: "Client Campaigns",
          angle: 270,
        },
      ],
    },
    // Middle Ring: 4 business operations & productivity apps
    middle: {
      durationSeconds: 52,
      clockwise: false,
      icons: [
        {
          id: "salesforce",
          name: "Salesforce",
          imageSrc: "/icons/Format=Glyph (1).png",
          alt: "Salesforce Enterprise sync",
          category: "Client Records",
          angle: 45,
        },
        {
          id: "notion",
          name: "Notion",
          imageSrc: "/icons/Property 1=Glyph.png",
          alt: "Notion workspace database",
          category: "Internal SOPs",
          angle: 135,
        },
        {
          id: "zoho",
          name: "Zoho",
          imageSrc: "/icons/ZOHO.png",
          alt: "Zoho CRM & Desk sync",
          category: "Desk Support",
          angle: 225,
        },
        {
          id: "rippling",
          name: "Rippling",
          imageSrc: "/icons/Listitem → Rippling.png",
          alt: "Rippling staff scheduling",
          category: "Staff Management",
          angle: 315,
        },
      ],
    },
    // Outer Ring: 5 booking, checkout & client engagement channels
    outer: {
      durationSeconds: 68,
      clockwise: true,
      icons: [
        {
          id: "booking",
          name: "Booking.com",
          imageSrc: "/logos/Company=Booking.com.png",
          alt: "Booking.com appointment synchronization",
          category: "Channel Sync",
          angle: 0,
        },
        {
          id: "paypal",
          name: "PayPal",
          imageSrc: "/logos/Company=PayPal.png",
          alt: "PayPal instant deposit payments",
          category: "Deposit Collection",
          angle: 72,
        },
        {
          id: "freshworks",
          name: "Freshworks",
          imageSrc: "/logos/Company=Freshworks.png",
          alt: "Freshworks customer support ticketing",
          category: "Inquiry Desk",
          angle: 144,
        },
        {
          id: "pipedrive",
          name: "Pipedrive",
          imageSrc: "/logos/Company=Pipedrive.png",
          alt: "Pipedrive sales & booking pipeline",
          category: "Deal Pipeline",
          angle: 216,
        },
        {
          id: "razorpay",
          name: "Razorpay",
          imageSrc: "/logos/Company=Razorpay.png",
          alt: "Razorpay appointment checkout",
          category: "Payments",
          angle: 288,
        },
      ],
    },
  },
};
