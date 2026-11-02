import React from "react";
import Image from "next/image";
import Link from "next/link";

// Clean, accessible SVG social icons
function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
    </svg>
  );
}

const FOOTER_LINKS = {
  explore: [
    { label: "Our Story", href: "#about" },
    { label: "How It Works", href: "#how-it-works" },
  ],
  app: [
    { label: "WhatsApp Flows", href: "#flows" },
    { label: "Team Inbox", href: "#inbox" },
    { label: "Follow-Up Autopilot", href: "#autopilot" },
    { label: "Broadcast Campaigns", href: "#broadcasts" },
  ],
  legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms & Conditions", href: "/terms" },
    { label: "Data Security", href: "/privacy#security" },
    { label: "Cookie Policy", href: "/privacy#cookies" },
  ],
};

const SOCIAL_LINKS = [
  {
    name: "Instagram",
    href: "https://www.instagram.com/thectrlaagency/",
    icon: InstagramIcon,
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/company/ctrla-agency/",
    icon: LinkedInIcon,
  },
];

export default function Footer() {
  return (
    <footer
      aria-label="Site Footer"
      className="relative w-full bg-[#faf8f5] dark:bg-zinc-950 pt-16 sm:pt-20 lg:pt-14 overflow-hidden"
    >
      {/* 1. Floating Footer Card (Layered Above the Landscape) */}
      <div className="relative z-10  px-[5%] pb-10">
        <div className="bg-white dark:bg-zinc-900 rounded-[28px] sm:rounded-[36px] border border-zinc-200/90 dark:border-zinc-800 shadow-[0_20px_50px_rgba(0,0,0,0.07)] p-8 sm:p-12 lg:p-14 font-figtree transition-all">
          
          {/* Top Section: Brand Logo & Navigation Columns */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12">
            
            {/* Left: Brand Identity */}
            <div className="md:col-span-5 flex flex-col justify-start">
              <Link
                href="/"
                className="inline-flex items-center gap-2.5 group focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500 rounded-md"
                aria-label="ctrlF home"
              >
                {/* Signature Brand Icon Badge */}
                {/* <div className="w-8 h-8 rounded-full bg-orange-500 text-white flex items-center justify-center font-bold text-sm shadow-xs group-hover:scale-105 transition-transform">
                  <span className="font-extrabold font-mono leading-none">F</span>
                </div> */}
                {/* Brand Name */}
                <div className="flex items-baseline">
                  <span className="font-primary text-2xl sm:text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-white">
                    ctrl
                  </span>
                  <span className="font-primary text-2xl sm:text-3xl font-extrabold text-orange-600 dark:text-orange-500">
                    F!
                  </span>
                </div>
              </Link>
              <p className="mt-3 text-xs sm:text-[13px] text-zinc-500 dark:text-zinc-400 font-figtree leading-relaxed max-w-sm">
                AI WhatsApp Business API &amp; Customer Coordination OS for clinics, salons, and appointment businesses.
              </p>
            </div>

            {/* Right: 3 Nav Columns */}
            <div className="md:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-6 sm:gap-8">
              
              {/* Column 1: Explore */}
              <div className="flex flex-col gap-3">
                <span className="text-xs font-bold text-zinc-900 dark:text-zinc-100 font-figtree">
                  Explore
                </span>
                <ul className="flex flex-col gap-2.5 text-xs text-zinc-500 dark:text-zinc-400 font-figtree">
                  {FOOTER_LINKS.explore.map((item) => (
                    <li key={item.label}>
                      <Link
                        href={item.href}
                        className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500 rounded"
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Column 2: App / Platform */}
              <div className="flex flex-col gap-3">
                <span className="text-xs font-bold text-zinc-900 dark:text-zinc-100 font-figtree">
                  Features
                </span>
                <ul className="flex flex-col gap-2.5 text-xs text-zinc-500 dark:text-zinc-400 font-figtree">
                  {FOOTER_LINKS.app.map((item) => (
                    <li key={item.label}>
                      <Link
                        href={item.href}
                        className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500 rounded"
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Column 3: Legal Pages */}
              <div className="flex flex-col gap-3 col-span-2 sm:col-span-1">
                <span className="text-xs font-bold text-zinc-900 dark:text-zinc-100 font-figtree">
                  Legal Pages
                </span>
                <ul className="flex flex-col gap-2.5 text-xs text-zinc-500 dark:text-zinc-400 font-figtree">
                  {FOOTER_LINKS.legal.map((item) => (
                    <li key={item.label}>
                      <Link
                        href={item.href}
                        className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500 rounded"
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

            </div>

          </div>

          {/* Thin Horizontal Divider */}
          <div className="w-full h-px bg-zinc-100 dark:bg-zinc-800 my-8 sm:my-10" />

          {/* Bottom Section: Copyright & Socials */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            
            {/* Copyright Notice */}
            <span className="text-xs text-zinc-400 dark:text-zinc-500 font-figtree">
              &copy; 2026 ctrlF! All Rights Reserved
            </span>

            {/* Circular Social Buttons */}
            <div className="flex items-center gap-2">
              {SOCIAL_LINKS.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Follow us on ${social.name}`}
                    className="w-8 h-8 rounded-full border border-zinc-200 dark:border-zinc-700/80 flex items-center justify-center text-zinc-600 dark:text-zinc-300 hover:text-orange-600 dark:hover:text-orange-400 hover:border-orange-500 hover:bg-orange-50/40 dark:hover:bg-zinc-800 transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500"
                  >
                    <Icon className="w-3.5 h-3.5" />
                  </a>
                );
              })}
            </div>

          </div>

        </div>
      </div>

      {/* 2. Rolling Landscape Hills Background Image (/footer-bg.png) */}
      {/* 2. Rolling Landscape Hills Background Image (/footer-bg.png) */}
      {/* <div className="relative w-full -mt-24 xs:-mt-32 sm:-mt-44 md:-mt-56 lg:-mt-68 xl:-mt-76 pointer-events-none select-none z-0">
        <Image
          src="/footer-bg.png"
          alt="Rolling landscape hills background"
          width={1672}
          height={941}
          className="w-full h-auto object-cover object-top"
          priority
        />
      </div> */}
    </footer>
  );
}
