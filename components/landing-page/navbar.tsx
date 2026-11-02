"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

interface NavItem {
  label: string;
  href: string;
}

const navItems: NavItem[] = [
  { label: "Solutions", href: "#solutions" },
  { label: "Platform", href: "#platform" },
  { label: "Insights", href: "#insights" },
  { label: "About Us", href: "#about" },
  { label: "Contact Us", href: "#contact" },
];

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="absolute top-3 inset-x-0 z-50 w-full bg-transparent">
      <nav
        aria-label="Main Navigation"
        className="mx-auto flex max-w-7xl items-center justify-between px-6 sm:px-8 lg:px-12 py-5 sm:py-6"
      >
        {/* Left: Brand Logo */}
        <div className="flex flex-1 items-center justify-start">
          <Link
            href="/"
            className="group flex items-center gap-1.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground rounded-md"
            aria-label="ctrlF home"
          >
            <div className="flex items-baseline">
              <span className="font-primary text-2xl sm:text-3xl font-extrabold tracking-tight text-white dark:text-white">
                ctrl
              </span>
              <span className="font-primary text-2xl sm:text-3xl font-extrabold text-orange-600 dark:text-orange-500">
                F
              </span>
            </div>
          </Link>
        </div>

        {/* Center: Navigation Links */}
        <div className="hidden md:flex items-center justify-center gap-7 lg:gap-9 font-mono text-xs sm:text-[13px] font-medium text-white">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="text-white hover:text-white/80 transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* Right: LOGIN & BOOK A DEMO Pill */}
        <div className="flex flex-1 items-center justify-end gap-5 sm:gap-6 font-mono">
          <Link
            href="#login"
            className="text-xs hidden md:block sm:text-[13px] font-semibold tracking-wider uppercase text-white hover:text-white/80 transition-colors"
          >
            LOGIN
          </Link>

          <Link
            href="#book-demo"
            className="hidden md:inline-flex items-center justify-center rounded-full bg-[#193c48] hover:bg-[#122e37] text-white px-5 sm:px-6 py-2.5 text-xs sm:text-[13px] font-semibold tracking-wider uppercase transition-all shadow-xs active:scale-95"
          >
            BOOK A DEMO
          </Link>

          {/* Mobile menu trigger */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex md:hidden items-center justify-center p-1.5 text-white hover:text-white/80"
            aria-expanded={mobileMenuOpen}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" aria-hidden="true" />
            ) : (
              <Menu className="h-6 w-6" aria-hidden="true" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-zinc-200/80 dark:border-zinc-800 bg-[#faf8f5]/95 dark:bg-zinc-950/95 backdrop-blur-md px-6 py-5 shadow-lg">
          <div className="flex flex-col space-y-3 font-mono text-sm">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-slate-700 hover:text-black dark:text-slate-300 py-1"
              >
                {item.label}
              </Link>
            ))}
            <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex flex-col gap-2">
              <Link
                href="#login"
                onClick={() => setMobileMenuOpen(false)}
                className="py-1.5 text-center font-semibold text-slate-800 dark:text-slate-200"
              >
                LOGIN
              </Link>
              <Link
                href="#book-demo"
                onClick={() => setMobileMenuOpen(false)}
                className="rounded-full bg-[#193c48] py-2.5 text-center text-xs font-semibold tracking-wider uppercase text-white shadow-xs"
              >
                BOOK A DEMO
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

export default Navbar;
