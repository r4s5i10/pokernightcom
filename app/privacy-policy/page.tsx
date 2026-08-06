import type { Metadata } from "next";
import { legacyPrivacyHtml } from "@/data/privacy-policy";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Poker Night in America privacy policy.",
  alternates: { canonical: "/privacy-policy" },
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <section className="page-hero">
        <div className="wrap">
          <span className="crumb">Legal</span>
          <h1>Privacy Policy</h1>
          <p>How information may be collected and used when you visit PokerNight.com.</p>
        </div>
      </section>
      <section className="section">
        <article className="wrap prose legal-copy">
          <aside className="legal-notice">
            <strong>Migration note</strong>
            <p>
              This policy is preserved in full from the current PokerNight.com website and was last modified
              August 24, 2017. RSI counsel should review and update it before production cutover.
            </p>
          </aside>
          <div dangerouslySetInnerHTML={{ __html: legacyPrivacyHtml }} />
        </article>
      </section>
    </>
  );
}
