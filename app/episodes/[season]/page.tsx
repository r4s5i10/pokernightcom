import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getSeasons, getSeason, ytThumb, ytUrl, site } from "@/lib/data";

export function generateStaticParams() {
  return getSeasons().map((s) => ({ season: s.slug }));
}

export function generateMetadata({ params }: { params: { season: string } }): Metadata {
  const s = getSeason(params.season);
  return {
    title: s ? `${s.season} Episodes` : "Episodes",
    description: s
      ? `Watch every ${s.season} episode of Poker Night in America.`
      : undefined,
  };
}

export default function SeasonPage({ params }: { params: { season: string } }) {
  const season = getSeason(params.season);
  if (!season) notFound();

  const epTotal = season.series.reduce((n, ser) => n + ser.episodes.length, 0);

  return (
    <>
      <div className="page-hero">
        <div className="wrap">
          <span className="crumb">
            <Link href="/episodes" style={{ color: "#c8102e" }}>Episodes</Link> / {season.season}
          </span>
          <h1 className="display" style={{ color: "#fff", fontSize: "clamp(30px, 4.4vw, 48px)" }}>
            {season.season}
          </h1>
          <p style={{ color: "#c9c9d2", marginTop: 10, fontSize: 15.5 }}>
            {season.series.length} series · {epTotal > 0 ? `${epTotal} episodes` : "streaming series"}
          </p>
        </div>
      </div>

      <section className="section">
        <div className="wrap">
          {season.series.map((ser) => (
            <div key={ser.code} id={ser.code.toLowerCase()} style={{ marginBottom: 40 }}>
              <div className="section-head">
                <h2 style={{ fontSize: "clamp(18px, 2.4vw, 24px)" }}>{ser.venue}</h2>
                <span style={{ color: "#999", fontSize: 13, fontWeight: 700, textTransform: "uppercase", letterSpacing: ".06em" }}>
                  {ser.code}
                </span>
              </div>

              {ser.episodes.length > 0 ? (
                <div className="card-grid">
                  {ser.episodes.map((ep, i) => (
                    <a
                      key={`${ser.code}-${i}`}
                      className="card"
                      href={ytUrl(ep.youtubeId)}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <span className="thumb">
                        <Image
                          src={ytThumb(ep.youtubeId)}
                          alt={ep.title}
                          fill
                          sizes="(max-width: 700px) 100vw, 300px"
                          style={{ objectFit: "cover" }}
                        />
                        {ep.youtubeId && <span className="play">▶</span>}
                      </span>
                      <span className="card-body">
                        <span className="kicker">{ep.label}</span>
                        <span className="card-title">{ep.title}</span>
                        {ep.date && <span className="meta">{ep.date}</span>}
                      </span>
                    </a>
                  ))}
                </div>
              ) : (
                <p style={{ color: "#666", fontSize: 14.5 }}>
                  Full episodes from this series stream on{" "}
                  <a href={site.watchLive[0].url} target="_blank" rel="noopener noreferrer" style={{ color: "#c8102e", fontWeight: 700 }}>
                    our YouTube channel
                  </a>{" "}
                  and{" "}
                  <a href={site.watchLive[1].url} target="_blank" rel="noopener noreferrer" style={{ color: "#c8102e", fontWeight: 700 }}>
                    Twitch
                  </a>.
                </p>
              )}
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
