import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getNewsPosts, getPost, ytThumb, ytUrl } from "@/lib/data";

export function generateStaticParams() {
  return getNewsPosts().map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const post = getPost(params.slug);
  return {
    title: post?.title || "News",
    description: post?.body ? post.body.slice(0, 155) : undefined,
  };
}

export default function NewsPostPage({ params }: { params: { slug: string } }) {
  const post = getPost(params.slug);
  if (!post || !post.body) notFound();

  const related = getNewsPosts()
    .filter((p) => p.slug !== post.slug)
    .slice(0, 3);

  return (
    <>
      <div className="page-hero">
        <div className="wrap">
          <span className="crumb">
            <Link href="/news" style={{ color: "#c8102e" }}>News</Link>
            {post.categories[0] ? ` / ${post.categories[0]}` : ""}
          </span>
          <h1 className="display" style={{ color: "#fff", fontSize: "clamp(26px, 3.8vw, 42px)", maxWidth: 900 }}>
            {post.title}
          </h1>
          {post.date && <p style={{ color: "#8b8b96", marginTop: 10, fontSize: 14 }}>{post.date}</p>}
        </div>
      </div>

      <section className="section">
        <div className="wrap" style={{ maxWidth: 860 }}>
          {post.youtubeId ? (
            <div style={{ position: "relative", paddingBottom: "56.25%", marginBottom: 28, background: "#000" }}>
              <iframe
                src={`https://www.youtube.com/embed/${post.youtubeId}`}
                title={post.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                style={{ position: "absolute", inset: 0, width: "100%", height: "100%", border: 0 }}
              />
            </div>
          ) : post.image ? (
            <div style={{ position: "relative", height: 380, marginBottom: 28 }}>
              <Image src={post.image} alt={post.title} fill sizes="860px" style={{ objectFit: "cover" }} unoptimized />
            </div>
          ) : null}

          <div className="prose">
            {post.body.split(/\n{2,}/).map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>

          {post.youtubeId && (
            <p style={{ marginTop: 24 }}>
              <a href={ytUrl(post.youtubeId)} target="_blank" rel="noopener noreferrer" className="btn btn-red">
                ▶ Watch on YouTube
              </a>
            </p>
          )}
        </div>
      </section>

      {related.length > 0 && (
        <section className="section gray">
          <div className="wrap">
            <div className="section-head">
              <h2>More Stories</h2>
              <Link href="/news" className="view-more">View More »</Link>
            </div>
            <div className="card-grid">
              {related.map((p) => (
                <Link key={p.slug} className="card" href={`/news/${p.slug}`}>
                  <span className="thumb">
                    <Image
                      src={p.youtubeId ? ytThumb(p.youtubeId) : p.image || "/pnia.webp"}
                      alt={p.title}
                      fill
                      sizes="300px"
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
      )}
    </>
  );
}
