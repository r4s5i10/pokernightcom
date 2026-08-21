import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { getSeasons, getStudio52, episodeCount, ytThumb, ytUrl } from "@/lib/data";

export const metadata: Metadata = {
  title: "Episodes",
  description:
    "Browse every season of Poker Night in America — full episodes, venues, and live streams.",
};

export default function EpisodesPage() {
  const seasons = getSeasons();
  const studio52 = getStudio52();

  return (
    <>
      <div className="page-hero">
        <div className="wrap">
          <span className="crumb">The Show</span>
          <h1 className="display" style={{ color: "#fff", fontSize: "clamp(30px, 4.4vw, 48px)" }}>
            Episodes
          </h1>
          <p style={{ color: "#c9c9d2", marginTop: 10, maxWidth: 640, fontSize: 15.5 }}>
            {episodeCount()} episodes across {seasons.length} seasons — cash games from
            casinos all over America, plus live-streamed series from Studio 52.
          </p>
        </div>
      </div>

      <section className="section">
        <div className="wrap">
          {seasons.map((s) => {
            const eps = s.series.reduce((n, ser) => n + ser.episodes.length, 0);
            return (
              <div key={s.slug} style={{ marginBottom: 34 }}>
                <div className="section-head">
                  <h2>{s.season}</h2>
                  <Link href={`/episodes/${s.slug}`} className="view-more">
                    {eps > 0 ? `All ${eps} Episodes »` : "View Series »"}
                  </Link>
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
                  {s.series.map((ser) => (
                    <Link
                      key={ser.code}
                      href={`/episodes/${s.slug}#${ser.code.toLowerCase()}`}
                      style={{
                        background: "#f4f4f6",
                        border: "1px solid #e2e2e8",
                        padding: "10px 16px",
                        fontSize: 13.5,
                        fontWeight: 600,
                        color: "#222",
                      }}
                    >
                      {ser.venue}
                      <span style={{ color: "#999", fontWeight: 500 }}>
                        {ser.episodes.length > 0 ? ` · ${ser.episodes.length} eps` : ""}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            );
          })}

          {studio52.length > 0 && (
            <div style={{ marginTop: 46 }}>
              <div className="section-head">
                <h2>Studio 52 Live Streams</h2>
              </div>
              <div className="card-grid">
                {studio52.map((ep, i) => (
                  <a key={i} className="card" href={ytUrl(ep.youtubeId)} target="_blank" rel="noopener noreferrer">
                    <span className="thumb">
                      <Image src={ytThumb(ep.youtubeId)} alt={ep.title} fill sizes="300px" style={{ objectFit: "cover" }} />
                      <span className="play">▶</span>
                    </span>
                    <span className="card-body">
                      <span className="kicker">{ep.label}</span>
                      <span className="card-title">{ep.title}</span>
                    </span>
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
