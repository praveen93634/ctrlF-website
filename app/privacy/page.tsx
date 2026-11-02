import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ShieldCheck, Lock, FileText, CheckCircle2 } from "lucide-react";
import Footer from "@/reuseable/Footer";

export const metadata: Metadata = {
  title: "Privacy Policy — ctrlF",
  description:
    "Learn how ctrlF collects, uses, and safeguards customer data and WhatsApp Business API communications for salons, clinics, and appointment-based businesses.",
};

export default function PrivacyPolicyPage() {
  const lastUpdated = "November 2, 2026";

  return (
    <div className="min-h-screen flex flex-col bg-[#faf8f5] dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 font-figtree">
      {/* Main Privacy Document Content */}
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
            <span>Meta API Compliant</span>
          </div>
        </div>

        {/* Header Title Section */}
        <div className="border-b border-zinc-200 dark:border-zinc-800 pb-8 mb-10">
          <div className="inline-flex items-center gap-1.5 text-xs font-mono font-bold uppercase tracking-wider text-orange-600 dark:text-orange-400 bg-orange-50 dark:bg-orange-950/40 px-3 py-1 rounded-full border border-orange-200/70 dark:border-orange-800/60 mb-3">
            <Lock className="w-3 h-3" />
            <span>Legal Documentation</span>
          </div>
          <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[#0e2733] dark:text-white">
            Privacy Policy
          </h1>
          <p className="mt-2 text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 font-figtree">
            Last Updated: {lastUpdated} &middot; Effective Date: November 2, 2026
          </p>

          {/* Quick Summary Card */}
          <div className="mt-6 bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200/90 dark:border-zinc-800 p-5 shadow-xs">
            <h2 className="text-sm font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2 mb-2 font-figtree">
              <FileText className="w-4 h-4 text-orange-500" />
              <span>Summary for Business Owners</span>
            </h2>
            <p className="text-xs sm:text-[13px] text-zinc-600 dark:text-zinc-300 leading-relaxed font-figtree">
              ctrlF provides AI follow-ups, official WhatsApp Business API integrations, and customer coordination software for clinics, salons, spas, and appointment-based businesses. We respect patient and client privacy: <strong>we never sell your customer data, we do not train public AI models on your private client conversations</strong>, and we provide both hosted SaaS and self-hosted deployment options for clients requiring complete data isolation.
            </p>
          </div>
        </div>

        {/* Policy Body Clauses */}
        <div className="space-y-10 text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed font-figtree">
          
          {/* Section 1 */}
          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-[#0e2733] dark:text-white font-figtree">
              1. Information We Collect
            </h2>
            <p>
              When you use ctrlF (&ldquo;we&rdquo;, &ldquo;our&rdquo;, or &ldquo;us&rdquo;), we collect information necessary to deliver appointment automation, shared team inboxes, and follow-up communications on your verified WhatsApp Business number:
            </p>
            <ul className="list-disc list-outside pl-5 space-y-1.5 text-xs sm:text-sm text-zinc-600 dark:text-zinc-400">
              <li>
                <strong>Account Information:</strong> Name, business name, business address, email, phone number, and administrative credentials.
              </li>
              <li>
                <strong>Customer Contact &amp; Appointment Data:</strong> Customer phone numbers, appointment reservation dates, service names (e.g. balayage, dental checkup, physiotherapy session), and booking status tags.
              </li>
              <li>
                <strong>WhatsApp Messaging Metadata:</strong> Message delivery timestamps, read receipts, template approval statuses, and incoming inquiry text processed via our webhook integrations with Meta.
              </li>
              <li>
                <strong>Calendar &amp; CRM Sync Data:</strong> Time slot availability and sync tokens through authorized integrations such as Google Calendar or your local scheduling software.
              </li>
            </ul>
          </section>

          {/* Section 2 */}
          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-[#0e2733] dark:text-white font-figtree">
              2. Meta WhatsApp Business API &amp; Messaging Compliance
            </h2>
            <p>
              ctrlF communicates with end-users exclusively through the official <strong>Meta WhatsApp Business Platform (Cloud API / On-Premises API)</strong>. By connecting your WhatsApp Business account:
            </p>
            <ul className="list-disc list-outside pl-5 space-y-1.5 text-xs sm:text-sm text-zinc-600 dark:text-zinc-400">
              <li>
                Communications sent via ctrlF adhere to WhatsApp&rsquo;s Business Messaging Policies, including recipient opt-in requirements and customer-initiated 24-hour service windows.
              </li>
              <li>
                WhatsApp messages are encrypted in transit. We process message payloads solely to trigger your configured automation rules (such as 24-hour confirmation pings, no-show recovery nudges, or canned team replies).
              </li>
              <li>
                ctrlF does not share your customers&rsquo; phone numbers with third-party advertisers or data brokers under any circumstances.
              </li>
            </ul>
          </section>

          {/* Section 3 */}
          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-[#0e2733] dark:text-white font-figtree">
              3. Hosted SaaS vs. Self-Hosted Privacy Options
            </h2>
            <p>
              We recognize that clinics, medical wellness practices, and high-confidentiality salons may require strict data residency controls:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
              <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-4 shadow-2xs">
                <h3 className="text-xs font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-1.5 mb-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  <span>Hosted Cloud SaaS</span>
                </h3>
                <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-normal">
                  Encrypted multi-tenant PostgreSQL databases with automated daily backups, SOC 2 compliant cloud infrastructure, and TLS 1.3 encryption.
                </p>
              </div>

              <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-4 shadow-2xs">
                <h3 className="text-xs font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-1.5 mb-1.5">
                  <CheckCircle2 className="w-4 h-4 text-orange-500" />
                  <span>Self-Hosted Deployment</span>
                </h3>
                <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-normal">
                  Deploy ctrlF on your private cloud (AWS, GCP, Hetzner, or local on-premise server) so all customer records and conversation logs remain strictly inside your network perimeter.
                </p>
              </div>
            </div>
          </section>

          {/* Section 4 */}
          <section id="security" className="space-y-3 scroll-mt-20">
            <h2 className="text-lg sm:text-xl font-bold text-[#0e2733] dark:text-white font-figtree">
              4. Data Security &amp; Encryption
            </h2>
            <p>
              We enforce industry-standard security protocols to protect sensitive appointment and communication data:
            </p>
            <ul className="list-disc list-outside pl-5 space-y-1.5 text-xs sm:text-sm text-zinc-600 dark:text-zinc-400">
              <li>All web traffic and API endpoints are encrypted using TLS 1.3.</li>
              <li>Database volumes are encrypted at rest with AES-256 standard encryption.</li>
              <li>Role-based access control (RBAC) ensures your front-desk receptionists, service specialists, and managers only access assigned customer records.</li>
            </ul>
          </section>

          {/* Section 5 */}
          <section id="cookies" className="space-y-3 scroll-mt-20">
            <h2 className="text-lg sm:text-xl font-bold text-[#0e2733] dark:text-white font-figtree">
              5. Cookies &amp; Tracking Technologies
            </h2>
            <p>
              Our website uses strictly necessary cookies to maintain session states and user preferences (such as light/dark mode selection). We do not deploy intrusive third-party cross-site trackers or sell personal browsing profiles.
            </p>
          </section>

          {/* Section 6 */}
          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-[#0e2733] dark:text-white font-figtree">
              6. Your Privacy Rights (GDPR &amp; CCPA)
            </h2>
            <p>
              Depending on your location, you and your business have the right to request access to the personal data we hold, request data correction, export your complete database records, or request complete deletion of your account and related messaging history.
            </p>
            <p>
              To exercise these rights, contact our privacy team at{" "}
              <a
                href="mailto:privacy@ctrlf.app"
                className="text-orange-600 dark:text-orange-400 font-semibold underline underline-offset-2 hover:text-orange-700"
              >
                privacy@ctrlf.app
              </a>
              .
            </p>
          </section>

          {/* Section 7 */}
          <section className="space-y-3 pt-2">
            <h2 className="text-lg sm:text-xl font-bold text-[#0e2733] dark:text-white font-figtree">
              7. Contact Us
            </h2>
            <p>
              If you have any questions or feedback regarding this Privacy Policy or our WhatsApp Business data practices, please reach out:
            </p>
            <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 p-4 text-xs sm:text-sm space-y-1 text-zinc-600 dark:text-zinc-400 font-figtree">
              <p className="font-semibold text-zinc-900 dark:text-white">ctrlF Privacy &amp; Data Protection</p>
              <p>Email: <a href="mailto:privacy@ctrlf.app" className="text-orange-600 dark:text-orange-400 underline">privacy@ctrlf.app</a></p>
              <p>Support: <a href="mailto:support@ctrlf.app" className="text-orange-600 dark:text-orange-400 underline">support@ctrlf.app</a></p>
            </div>
          </section>

        </div>
      </main>

      {/* Embedded Reusable Footer with /footer-bg.png */}
      <Footer />
    </div>
  );
}
