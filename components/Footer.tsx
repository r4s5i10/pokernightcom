import Link from "next/link";
import site from "@/data/site.json";

const colHead: React.CSSProperties = {
  color: "#fff",
  fontFamily: "var(--font-oswald)",
  fontSize: 15,
  fontWeight: 600,
  textTransform: "uppercase",
  letterSpacing: "0.08em",
  marginBottom: 14,
  paddingBottom: 8,
  borderBottom: "2px solid #c8102e",
  display: "inline-block",
};

const footLink: React.CSSProperties = {
  display: "block",
  color: "#a7a7b1",
  fontSize: 14,
  padding: "5px 0",
};

export default function Footer() {
  return (
    <footer style={{ background: "#0b0b0e", borderTop: "4px solid #c8102e", marginTop: 0 }}>
      <div className="wrap" style={{ padding: "48px 20px 32px" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: 36,
          }}
        >
          <div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/pnia-shield.png" alt="Poker Night in America" style={{ height: 74, width: "auto", marginBottom: 14 }} />
            <p style={{ color: "#a7a7b1", fontSize: 13.5, lineHeight: 1.7, maxWidth: 320 }}>
              Poker Night in America brings the fun back to poker — cash games and
              conversation with the biggest names in the game, airing in more than
              28 million homes nationwide.
            </p>
          </div>

          <div>
            <span style={colHead}>The Show</span>
            <Link href="/episodes" style={footLink}>All Episodes</Link>
            <Link href="/episodes/season-1" style={footLink}>Season 1</Link>
            <Link href="/episodes/season-2" style={footLink}>Season 2</Link>
            <Link href="/episodes/season-3" style={footLink}>Season 3</Link>
            <Link href="/episodes/season-4" style={footLink}>Season 4</Link>
            <Link href="/episodes/season-5" style={footLink}>Season 5</Link>
            <Link href="/episodes/season-6" style={footLink}>Season 6</Link>
            <Link href="/news" style={footLink}>News</Link>
          </div>

          <div>
            <span style={colHead}>Watch</span>
            {site.watchLive.map((p) => (
              <a key={p.name} href={p.url} target="_blank" rel="noopener noreferrer" style={footLink}>
                {p.name}
              </a>
            ))}
            <Link href="/where-to-watch" style={footLink}>Where to Watch</Link>
            <Link href="/poker-night-app" style={footLink}>Poker Night App</Link>
          </div>

          <div>
            <span style={colHead}>Follow</span>
            {site.social.map((s) => (
              <a key={s.name} href={s.url} target="_blank" rel="noopener noreferrer" style={footLink}>
                {s.name}
              </a>
            ))}
            <div style={{ marginTop: 18 }}>
              <div style={{ color: "#6f6f7a", fontSize: 11, textTransform: "uppercase", letterSpacing: ".1em", marginBottom: 8 }}>
                Presented by
              </div>
              <a href={site.presentedBy.url} target="_blank" rel="noopener noreferrer">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/betrivers-poker.png" alt="BetRivers" style={{ height: 40, width: "auto" }} />
              </a>
            </div>
          </div>
        </div>

        <div
          style={{
            borderTop: "1px solid #26262e",
            marginTop: 40,
            paddingTop: 20,
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            gap: 12,
          }}
        >
          <span style={{ color: "#6f6f7a", fontSize: 12.5 }}>
            © {new Date().getFullYear()} Poker Night in America. All rights reserved.
          </span>
          <span style={{ color: "#6f6f7a", fontSize: 12.5 }}>
            Play responsibly. If you or someone you know has a gambling problem, call 1-800-GAMBLER.
          </span>
        </div>
      </div>
    </footer>
  );
}
