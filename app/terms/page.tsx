import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ShieldCheck, Scale, FileText } from "lucide-react";
import Footer from "@/reuseable/Footer";

export const metadata: Metadata = {
  title: "Terms & Conditions — ctrlF",
  description:
    "Review the terms, conditions, and acceptable use policy for ctrlF AI follow-ups and WhatsApp Business API coordination.",
};

export default function TermsPage() {
  const lastUpdated = "November 2, 2026";

  return (
    <div className="min-h-screen flex flex-col bg-[#faf8f5] dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 font-figtree">
      {/* Main Terms Content */}
      <main className="flex-1 max-w-4xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-32 sm:pt-36 pb-16">
        
        {/* Breadcrumb Navigation */}
        <div className="mb-8 flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-semibold text-zinc-600 dark:text-zinc-400 hover:text-orange-600 dark:hover:text-orange-400 transition-colors focus-visible:outline-2 focus-visible:outline-orange-500 rounded-md"
            aria-label="Return to homepage"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to ctrlF Home</span>
          </Link>
          <div className="flex items-center gap-1.5 text-xs text-emerald-600 dark:text-emerald-400 font-medium bg-emerald-50 dark:bg-emerald-950/40 px-2.5 py-1 rounded-full border border-emerald-200/70 dark:border-emerald-800/50">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Official WhatsApp Partner Guidelines</span>
          </div>
        </div>

        {/* Header Title Section */}
        <div className="border-b border-zinc-200 dark:border-zinc-800 pb-8 mb-10">
          <div className="inline-flex items-center gap-1.5 text-xs font-mono font-bold uppercase tracking-wider text-orange-600 dark:text-orange-400 bg-orange-50 dark:bg-orange-950/40 px-3 py-1 rounded-full border border-orange-200/70 dark:border-orange-800/60 mb-3">
            <Scale className="w-3.5 h-3.5" />
            <span>User Agreement</span>
          </div>
          <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[#0e2733] dark:text-white">
            Terms &amp; Conditions
          </h1>
          <p className="mt-2 text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 font-figtree">
            Last Updated: {lastUpdated} &middot; Version 1.2
          </p>

          <div className="mt-6 bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200/90 dark:border-zinc-800 p-5 shadow-xs">
            <h2 className="text-sm font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2 mb-2 font-figtree">
              <FileText className="w-4 h-4 text-orange-500" />
              <span>Service Summary</span>
            </h2>
            <p className="text-xs sm:text-[13px] text-zinc-600 dark:text-zinc-300 leading-relaxed font-figtree">
              These Terms &amp; Conditions govern your subscription to the ctrlF platform, our WhatsApp automation engines, multi-agent inbox, and self-hosted installation packages. By subscribing or using the service, you agree to comply with our acceptable use policies and WhatsApp&rsquo;s Business Terms of Service.
            </p>
          </div>
        </div>

        {/* Clauses */}
        <div className="space-y-10 text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed font-figtree">
          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-[#0e2733] dark:text-white font-figtree">
              1. Platform Services &amp; Account Responsibility
            </h2>
            <p>
              ctrlF provides automated appointment follow-ups, interactive WhatsApp booking flows, and team collaboration tooling. You are responsible for maintaining the security of your business account credentials and ensuring your staff members use authorized access permissions.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-[#0e2733] dark:text-white font-figtree">
              2. Acceptable Messaging Policy (Anti-Spam)
            </h2>
            <p>
              You agree to use ctrlF strictly for legitimate, appointment-based and customer-consented communications. <strong>Bulk unsolicited spam messaging, misleading promotions, or harassment via WhatsApp is strictly prohibited</strong> and will result in immediate termination of service and suspension of your Meta WABA credentials.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-[#0e2733] dark:text-white font-figtree">
              3. Service Availability &amp; SLA
            </h2>
            <p>
              We aim for 99.9% uptime across our hosted SaaS infrastructure. Message delivery times may be subject to Meta&rsquo;s WhatsApp Business Cloud API uptime and recipient network connectivity.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-[#0e2733] dark:text-white font-figtree">
              4. Termination &amp; Cancellation
            </h2>
            <p>
              You may cancel your SaaS subscription at any time via your dashboard settings. For self-hosted license agreements, license terms and software updates remain governed by your enterprise license agreement.
            </p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
