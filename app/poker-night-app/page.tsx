import type { Metadata } from "next";
import { site } from "@/lib/data";

export const metadata: Metadata = {
  title: "Poker Night App",
  description:
    "Play the free Poker Night in America social poker app — daily bonuses, free chips, tournaments, and your chance to play poker on TV.",
};

const features = [
  {
    title: "Free Chips",
    text: "Come back to the game every day for huge bonuses and get free chips.",
  },
  {
    title: "Play With Friends",
    text: "Invite your friends to the game through email or Facebook and get bonuses as a reward.",
  },
  {
    title: "Tournaments",
    text: "Master your poker skills! Participate in weekly Sit n' Go and Shootout tournaments where you can win unique trophies and top our leaderboard.",
  },
  {
    title: "Get Rewards",
    text: "Up the stakes, win hands, go all-in and unlock achievements. Bet big to win!",
  },
  {
    title: "Your Profile Page",
    text: "Track your progress and status in the game! See how many tournaments you've won and achievements you've completed.",
  },
  {
    title: "Chat With Other Players",
    text: "Have even more fun at the poker tables with our easy to use in-game instant messenger!",
  },
  {
    title: "Fair Hand Dealing Guaranteed",
    text: "Our certified Random Number Generator (RNG) brings you the best and fairest game experience.",
  },
  {
    title: "Learn to Play",
    text: "New to poker? Our simple tutorial mode will help you take the first steps — learn winning combinations and the rules of the game quickly.",
  },
];

export default function AppPage() {
  return (
    <>
      <div className="page-hero">
        <div className="wrap">
          <span className="crumb">Free to Play</span>
          <h1 className="display" style={{ color: "#fff", fontSize: "clamp(30px, 4.4vw, 48px)" }}>
            Poker Night App
          </h1>
          <p style={{ color: "#c9c9d2", marginTop: 10, maxWidth: 640, fontSize: 15.5 }}>
            {site.app.blurb}
          </p>
          <div style={{ marginTop: 22 }}>
            <a href={site.app.ios} target="_blank" rel="noopener noreferrer" className="btn btn-red">
              Download on the App Store
            </a>
          </div>
        </div>
      </div>

      <section className="section">
        <div className="wrap">
          <div className="section-head">
            <h2>App Features</h2>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(270px, 1fr))",
              gap: 18,
            }}
          >
            {features.map((f) => (
              <div key={f.title} className="card" style={{ padding: "24px 22px" }}>
                <span
                  style={{
                    display: "block",
                    fontFamily: "var(--font-oswald)",
                    fontWeight: 600,
                    fontSize: 18,
                    textTransform: "uppercase",
                    letterSpacing: ".03em",
                    color: "#c8102e",
                    marginBottom: 8,
                  }}
                >
                  {f.title}
                </span>
                <span style={{ display: "block", color: "#444", fontSize: 14.5, lineHeight: 1.65 }}>
                  {f.text}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section dark">
        <div className="wrap" style={{ textAlign: "center", maxWidth: 700 }}>
          <h2 className="display" style={{ color: "#fff", fontSize: "clamp(24px, 3vw, 34px)", marginBottom: 12 }}>
            Want to be on TV?
          </h2>
          <p style={{ color: "#c9c9d2", fontSize: 16, lineHeight: 1.7, marginBottom: 24 }}>
            Top the app leaderboards for your chance to sit down with the pros on
            Poker Night in America.
          </p>
          <a href={site.app.ios} target="_blank" rel="noopener noreferrer" className="btn btn-purple">
            Get the App
          </a>
        </div>
      </section>
    </>
  );
}
