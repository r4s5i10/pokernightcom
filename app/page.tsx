import Link from "next/link";
import Image from "next/image";
import NewsletterForm from "@/components/NewsletterForm";
import {
  site,
  getLatestEpisodes,
  getNewsPosts,
  episodeCount,
  ytThumb,
  ytUrl,
} from "@/lib/data";

export default function HomePage() {
  const latest = getLatestEpisodes(8);
  const heroEp = latest[0];
  const panelEps = latest.slice(0, 6);
  const news = getNewsPosts().slice(0, 6);

  return (
    <>
      {/* ============ HERO ============ */}
      <section className="section dark-tex" style={{ padding: "0" }}>
        <div
          className="wrap"
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(0, 1.6fr) minmax(280px, 1fr)",
            gap: 32,
            padding: "44px 20px 52px",
            alignItems: "stretch",
          }}
        >
          {/* Hero feature */}
          <div style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <span className="kicker" style={{ fontSize: 14 }}>America&apos;s Favorite Televised Cash Game</span>
            <h1
              className="display"
              style={{ color: "#fff", fontSize: "clamp(34px, 5vw, 58px)", margin: "10px 0 16px", lineHeight: 1.05 }}
            >
              Poker Night <span style={{ color: "#c8102e" }}>in America</span>
            </h1>
            <p style={{ color: "#c9c9d2", fontSize: 17, lineHeight: 1.7, maxWidth: 560, marginBottom: 26 }}>
              High-stakes cash games, big personalities, and the most fun you can have
              at a poker table — featuring Phil Hellmuth, Doyle Brunson, Daniel Negreanu,
              Shaun Deeb and more. {episodeCount()}+ episodes and counting.
            </p>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <a href={site.watchLive[0].url} target="_blank" rel="noopener noreferrer" className="btn btn-live">
                ▶ Watch Live
              </a>
              <Link href="/episodes" className="btn btn-outline">
                Browse Episodes
              </Link>
            </div>
            <div style={{ marginTop: 34 }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/pnia.webp" alt="Poker Night in America" style={{ width: "100%", maxWidth: 520, height: "auto", border: "1px solid #26262e", boxShadow: "0 18px 40px rgba(0,0,0,.55)" }} />
            </div>
          </div>

          {/* Latest episodes side panel (WSOP leaderboard style) */}
          <aside className="side-panel">
            <div className="panel-head">Latest Episodes</div>
            <div>
              {panelEps.map((ep, i) => (
                <a
                  key={`${ep.title}-${i}`}
                  href={ytUrl(ep.youtubeId)}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "flex",
                    gap: 12,
                    alignItems: "center",
                    padding: "11px 16px",
                    borderBottom: "1px solid #26262e",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "var(--font-oswald)",
                      color: "#c8102e",
                      fontWeight: 700,
                      fontSize: 18,
                      minWidth: 22,
                    }}
                  >
                    {i + 1}
                  </span>
                  <span style={{ flex: 1 }}>
                    <span style={{ display: "block", color: "#fff", fontSize: 13.5, fontWeight: 600, lineHeight: 1.35 }}>
                      {ep.title}
                    </span>
                    <span style={{ display: "block", color: "#8b8b96", fontSize: 12, marginTop: 2 }}>
                      {ep.season} · {ep.venue}
                    </span>
                  </span>
                </a>
              ))}
            </div>
            <Link
              href="/episodes"
              style={{
                display: "block",
                textAlign: "center",
                padding: "13px",
                color: "#c8102e",
                fontWeight: 700,
                fontSize: 13,
                textTransform: "uppercase",
                letterSpacing: ".07em",
              }}
            >
              View All Episodes →
            </Link>
          </aside>
        </div>
      </section>

      {/* ============ RED STRIP ============ */}
      <div className="strip">
        <div className="wrap" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 18, flexWrap: "wrap", padding: "14px 20px" }}>
          <span style={{ color: "#fff", fontFamily: "var(--font-oswald)", fontWeight: 600, fontSize: 17, textTransform: "uppercase", letterSpacing: ".05em" }}>
            Streaming live cash games on YouTube &amp; Twitch
          </span>
          <a href={site.watchLive[1].url} target="_blank" rel="noopener noreferrer" className="btn btn-red" style={{ padding: "9px 20px", fontSize: 12.5 }}>
            Watch on Twitch
          </a>
        </div>
      </div>

      {/* ============ LATEST EPISODES GRID (photo-collage background, like live site) ============ */}
      <section className="section collage">
        <div className="wrap">
          <div className="section-head on-dark">
            <h2 style={{ color: "#fff" }}>Latest Episodes</h2>
            <Link href="/episodes" className="view-more">View More »</Link>
          </div>
          <div className="card-grid">
            {latest.map((ep, i) => (
              <a key={`${ep.title}-grid-${i}`} className="card" href={ytUrl(ep.youtubeId)} target="_blank" rel="noopener noreferrer">
                <span className="thumb">
                  <Image
                    src={ytThumb(ep.youtubeId)}
                    alt={ep.title}
                    fill
                    sizes="(max-width: 700px) 100vw, 300px"
                    style={{ objectFit: "cover" }}
                  />
                  <span className="play">▶</span>
                </span>
                <span className="card-body">
                  <span className="kicker">{ep.season} · {ep.venue}</span>
                  <span className="card-title">{ep.title}</span>
                  {ep.date && <span className="meta">{ep.date}</span>}
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ============ WHERE TO WATCH (dark) ============ */}
      <section className="section dark-tex">
        <div className="wrap">
          <div className="section-head" style={{ borderBottomColor: "#26262e" }}>
            <h2 style={{ color: "#fff" }}>Watch Live on These Platforms</h2>
            <Link href="/where-to-watch" className="view-more">View More »</Link>
          </div>
          <div className="platform-wall">
            {/* eslint-disable @next/next/no-img-element */}
            <a href={site.watchLive[0].url} target="_blank" rel="noopener noreferrer">
              <img src="/logo-youtube.png" alt="YouTube" />
            </a>
            <a href={site.watchLive[1].url} target="_blank" rel="noopener noreferrer">
              <img src="/logo-twitch.png" alt="Twitch" />
            </a>
            <a href={site.watchLive[4].url} target="_blank" rel="noopener noreferrer">
              <img src="/logo-sportstribal.png" alt="SportsTribal TV" />
            </a>
            <a href={site.watchLive[3].url} target="_blank" rel="noopener noreferrer">
              <img src="/logo-localnow.png" alt="Local Now" />
            </a>
            <Link href="/where-to-watch">
              <img src="/logo-edge.png" alt="EDGE" />
            </Link>
            <a href={site.watchLive[2].url} target="_blank" rel="noopener noreferrer">
              <img src="/logo-plex.png" alt="Plex" />
            </a>
            {/* eslint-enable @next/next/no-img-element */}
          </div>
          <div style={{ textAlign: "center", marginTop: 26 }}>
            <Link href="/where-to-watch" className="btn btn-red">
              And More!
            </Link>
          </div>
          <p style={{ color: "#a7a7b1", fontSize: 14.5, lineHeight: 1.7, marginTop: 26, maxWidth: 760 }}>
            {site.coverage}
          </p>
        </div>
      </section>

      {/* ============ TOP STORIES ============ */}
      <section className="section gray">
        <div className="wrap">
          <div className="section-head">
            <h2>Top Stories</h2>
            <Link href="/news" className="view-more">View More »</Link>
          </div>
          <div className="card-grid">
            {news.map((p) => (
              <Link key={p.slug} className="card" href={`/news/${p.slug}`}>
                <span className="thumb">
                  <Image
                    src={p.youtubeId ? ytThumb(p.youtubeId) : p.image || "/pnia.webp"}
                    alt={p.title}
                    fill
                    sizes="(max-width: 700px) 100vw, 300px"
                    style={{ objectFit: "cover" }}
                  />
                </span>
                <span className="card-body">
                  <span className="kicker">News</span>
                  <span className="card-title">{p.title}</span>
                  {p.date && <span className="meta">{p.date}</span>}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ============ APP PROMO (dark) ============ */}
      <section className="section dark">
        <div
          className="wrap"
          style={{ display: "flex", alignItems: "center", gap: 40, flexWrap: "wrap" }}
        >
          <div style={{ flex: "1 1 380px" }}>
            <span className="kicker" style={{ fontSize: 13 }}>Free to Play</span>
            <h2 className="display" style={{ color: "#fff", fontSize: "clamp(26px, 3.4vw, 40px)", margin: "8px 0 14px" }}>
              The Poker Night App — Be On TV
            </h2>
            <p style={{ color: "#c9c9d2", fontSize: 16, lineHeight: 1.7, marginBottom: 22 }}>
              {site.app.blurb}
            </p>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <a href={site.app.ios} target="_blank" rel="noopener noreferrer" className="btn btn-red">
                Download on the App Store
              </a>
              <Link href="/poker-night-app" className="btn btn-outline">
                Learn More
              </Link>
            </div>
          </div>
          <div style={{ flex: "1 1 300px", textAlign: "center" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/pnia-logo.png" alt="Poker Night in America app" style={{ maxWidth: 320, width: "100%", height: "auto" }} />
          </div>
        </div>
      </section>

      {/* ============ PRESENTED BY STRIP ============ */}
      <div className="strip" style={{ background: "linear-gradient(90deg, #1b1b22, #26262e)" }}>
        <div className="wrap" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 20, flexWrap: "wrap", padding: "18px 20px" }}>
          <span style={{ color: "#a7a7b1", fontSize: 12.5, textTransform: "uppercase", letterSpacing: ".12em", fontWeight: 700 }}>
            Presented by
          </span>
          <a href={site.presentedBy.url} target="_blank" rel="noopener noreferrer">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/betrivers-poker.png" alt="BetRivers Poker" style={{ height: 44, width: "auto" }} />
          </a>
        </div>
      </div>

      {/* ============ NEWSLETTER ============ */}
      <section className="section" style={{ textAlign: "center" }}>
        <div className="wrap" style={{ maxWidth: 680 }}>
          <h2 className="display" style={{ fontSize: "clamp(24px, 3vw, 34px)", marginBottom: 10 }}>
            {site.newsletter.heading}
          </h2>
          <p style={{ color: "#555", fontSize: 15.5, marginBottom: 24 }}>{site.newsletter.sub}</p>
          <NewsletterForm />
        </div>
      </section>
    </>
  );
}
