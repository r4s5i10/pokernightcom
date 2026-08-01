import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { getNewsPosts, ytThumb } from "@/lib/data";

export const metadata: Metadata = {
  title: "News",
  description: "The latest news, announcements, and stories from Poker Night in America.",
};

export default function NewsPage() {
  const posts = getNewsPosts();
  const [feature, ...rest] = posts;

  return (
    <>
      <div className="page-hero">
        <div className="wrap">
          <span className="crumb">Poker Night</span>
          <h1 className="display" style={{ color: "#fff", fontSize: "clamp(30px, 4.4vw, 48px)" }}>
            News
          </h1>
        </div>
      </div>

      <section className="section">
        <div className="wrap">
          {feature && (
            <Link
              href={`/news/${feature.slug}`}
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                gap: 0,
                background: "#0b0b0e",
                marginBottom: 40,
                overflow: "hidden",
              }}
            >
              <span style={{ position: "relative", minHeight: 280, display: "block" }}>
                <Image
                  src={feature.youtubeId ? ytThumb(feature.youtubeId, "max") : feature.image || "/pnia.webp"}
                  alt={feature.title}
                  fill
                  sizes="(max-width: 700px) 100vw, 620px"
                  style={{ objectFit: "cover" }}
                />
              </span>
              <span style={{ padding: "34px 32px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
                <span className="kicker">Featured</span>
                <span
                  className="display"
                  style={{ color: "#fff", fontSize: "clamp(22px, 2.8vw, 32px)", margin: "8px 0 12px", display: "block" }}
                >
                  {feature.title}
                </span>
                {feature.date && <span style={{ color: "#8b8b96", fontSize: 13 }}>{feature.date}</span>}
                {feature.body && (
                  <span style={{ color: "#c9c9d2", fontSize: 15, lineHeight: 1.7, marginTop: 12, display: "block" }}>
                    {feature.body.slice(0, 200)}…
                  </span>
                )}
              </span>
            </Link>
          )}

          <div className="card-grid">
            {rest.map((p) => (
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
                  <span className="kicker">{p.categories[0] || "News"}</span>
                  <span className="card-title">{p.title}</span>
                  {p.date && <span className="meta">{p.date}</span>}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
