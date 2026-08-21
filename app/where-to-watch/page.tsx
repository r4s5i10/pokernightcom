import type { Metadata } from "next";
import { site } from "@/lib/data";

export const metadata: Metadata = {
  title: "Where to Watch",
  description:
    "Watch Poker Night in America live on YouTube and Twitch, stream free on Plex, Local Now, and SportsTribal TV, or catch syndicated episodes on regional sports networks in 27 states.",
};

const platformBlurbs: Record<string, string> = {
  YouTube:
    "Full episodes, live streams, and highlights — the home of Poker Night in America online.",
  Twitch:
    "Live cash-game streams with real-time chat. Follow to get notified when the cards are in the air.",
  "Plex Live TV":
    "The 24/7 Poker Night TV channel, streaming free on Plex — no subscription required.",
  "Local Now":
    "Stream the Poker Night in America channel free on Local Now, on your phone, TV, or browser.",
  "SportsTribal TV":
    "Watch the Poker Night channel free on SportsTribal TV, available across smart TVs and streaming devices.",
};

export default function WhereToWatchPage() {
  return (
    <>
      <div className="page-hero">
        <div className="wrap">
          <span className="crumb">Poker Night</span>
          <h1 className="display" style={{ color: "#fff", fontSize: "clamp(30px, 4.4vw, 48px)" }}>
            Where to Watch
          </h1>
          <p style={{ color: "#c9c9d2", marginTop: 10, maxWidth: 660, fontSize: 15.5 }}>
            Stream us live, watch free 24/7 channels, or find us on your regional
            sports network.
          </p>
        </div>
      </div>

      <section className="section">
        <div className="wrap">
          <div className="section-head">
            <h2>Streaming Platforms</h2>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: 18,
            }}
          >
            {site.watchLive.map((p) => (
              <a
                key={p.name}
                href={p.url}
                target="_blank"
                rel="noopener noreferrer"
                className="card"
                style={{ padding: "26px 22px", display: "block" }}
              >
                <span style={{ display: "block", color: "#c8102e", fontSize: 24, marginBottom: 10 }}>▶</span>
                <span
                  style={{
                    display: "block",
                    fontFamily: "var(--font-oswald)",
                    fontWeight: 600,
                    fontSize: 20,
                    textTransform: "uppercase",
                    letterSpacing: ".03em",
                    marginBottom: 8,
                  }}
                >
                  {p.name}
                </span>
                <span style={{ display: "block", color: "#555", fontSize: 14, lineHeight: 1.65 }}>
                  {platformBlurbs[p.name] || ""}
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="section dark-tex">
        <div className="wrap" style={{ maxWidth: 860 }}>
          <div className="section-head" style={{ borderBottomColor: "#26262e" }}>
            <h2 style={{ color: "#fff" }}>On Television</h2>
          </div>
          <p style={{ color: "#c9c9d2", fontSize: 16, lineHeight: 1.8 }}>
            {site.coverage}
          </p>
          <p style={{ color: "#a7a7b1", fontSize: 14.5, lineHeight: 1.8, marginTop: 16 }}>
            Trying to find which channel a regional sports network is on with your
            satellite or cable provider? Check your local listings, or catch every
            episode any time on our free streaming channels above.
          </p>
        </div>
      </section>
    </>
  );
}
