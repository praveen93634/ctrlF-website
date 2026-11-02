import type { Metadata } from "next";
import { EB_Garamond, Figtree, Geist_Mono, Geist } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Navbar } from "@/components/landing-page/navbar";
import SmoothScroller from "@/reuseable/SmoothScroller";

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });

const ebGaramond = EB_Garamond({
  variable: "--font-eb-garamond",
  subsets: ["latin"],
});

const figtree = Figtree({
  variable: "--font-figtree",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ctrlF — AI Follow-up & Appointment Coordination OS",
  description:
    "Automate WhatsApp follow-ups, fill empty clinic & salon slots, and turn social media leads into confirmed bookings.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={cn(
        "h-full antialiased",
        ebGaramond.variable,
        figtree.variable,
        geistMono.variable,
        geist.variable,
        "font-primary"
      )}
    >
      <body className="min-h-full flex flex-col font-primary bg-background text-foreground selection:bg-amber-100 selection:text-amber-900">
        <SmoothScroller> <Navbar />
          <main className="flex-1">
            {children}
          </main>
        </SmoothScroller>
      </body>
    </html>
  );
}


