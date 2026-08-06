import Image from "next/image";
import Link from "next/link";
import NewsletterForm from "@/components/NewsletterForm";
import ProductCard from "@/components/ProductCard";
import { episodeCount, getLatestEpisodes, getNewsPosts, site, ytThumb, ytUrl } from "@/lib/data";
import { products } from "@/lib/products";

const platforms = [
  { name: "YouTube", image: "/logo-youtube.png", url: site.watchLive[0].url },
  { name: "Twitch", image: "/logo-twitch.png", url: site.watchLive[1].url },
  { name: "Plex", image: "/logo-plex.png", url: site.watchLive[2].url },
  { name: "Local Now", image: "/logo-localnow.png", url: site.watchLive[3].url },
  { name: "SportsTribal TV", image: "/logo-sportstribal.png", url: site.watchLive[4].url },
];

export default function HomePage() {
  const latest = getLatestEpisodes(7);
  const featured = latest[0];
  const news = getNewsPosts().slice(0, 3);

  return (
    <>
      {featured && (
        <section className="compact-hero">
          <div className="wrap">
            <div className="compact-hero__mast">
              <div>
                <span className="eyebrow">America’s televised cash game</span>
                <h1>Poker Night <em>in America</em></h1>
              </div>
              <div className="compact-hero__intro">
                <p>
                  Big pots, bigger personalities, and {episodeCount()}+ episodes of cards-up cash-game action.
                </p>
                <div className="compact-hero__links">
                  <a href={site.watchLive[0].url} target="_blank" rel="noopener noreferrer">Watch live <span>▶</span></a>
                  <Link href="/episodes">Browse every episode →</Link>
                </div>
              </div>
            </div>

            <div className="compact-hero__grid">
              <a className="hero-feature" href={ytUrl(featured.youtubeId)} target="_blank" rel="noopener noreferrer">
                <Image src={ytThumb(featured.youtubeId, "max")} alt={featured.title} fill priority sizes="(max-width: 900px) 100vw, 66vw" />
                <span className="hero-feature__shade" />
                <span className="hero-feature__play" aria-hidden="true">▶</span>
                <span className="hero-feature__copy">
                  <span className="eyebrow eyebrow--light">Featured episode</span>
                  <strong>{featured.title}</strong>
                  <small>{featured.season} · {featured.venue}</small>
                </span>
              </a>

              <aside className="hero-queue" aria-label="Latest episodes">
                <header>
                  <div><span className="eyebrow">Straight from the felt</span><h2>Latest episodes</h2></div>
                  <Link href="/episodes" aria-label="View all episodes">View all →</Link>
                </header>
                <div className="hero-queue__list">
                  {latest.slice(1, 6).map((episode, index) => (
                    <a key={`${episode.title}-${index}`} href={ytUrl(episode.youtubeId)} target="_blank" rel="noopener noreferrer">
                      <b>{String(index + 1).padStart(2, "0")}</b>
                      <span><strong>{episode.title}</strong><small>{episode.season} · {episode.venue}</small></span>
                      <i aria-hidden="true">▶</i>
                    </a>
                  ))}
                </div>
              </aside>
            </div>
          </div>
          <div className="compact-hero__footer">
            <div className="wrap">
              <span>Cards up. Cameras on.</span>
              <span>♦</span>
              <span>Live cash games on YouTube &amp; Twitch</span>
              <a href={site.watchLive[1].url} target="_blank" rel="noopener noreferrer">Watch on Twitch ↗</a>
            </div>
          </div>
        </section>
      )}

      <section className="watch-band">
        <div className="wrap watch-band__inner">
          <div className="watch-band__copy">
            <span className="eyebrow eyebrow--light">Your seat is ready</span>
            <h2>Watch wherever you are.</h2>
            <p>Catch the stream live, or pull up a full episode when the timing is right.</p>
            <Link className="text-link text-link--light" href="/where-to-watch">See every way to watch →</Link>
          </div>
          <div className="platform-grid">
            {platforms.map((platform) => (
              <a key={platform.name} href={platform.url} target="_blank" rel="noopener noreferrer" aria-label={`Watch on ${platform.name}`}>
                <Image src={platform.image} alt={platform.name} width={150} height={55} />
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--soft">
        <div className="wrap">
          <div className="section-intro">
            <div><span className="eyebrow">From the merch table</span><h2>Rep Poker Night</h2></div>
            <Link className="text-link" href="/store">Shop all gear →</Link>
          </div>
          <div className="product-grid product-grid--four">
            {products.slice(0, 4).map((product) => <ProductCard key={product.id} product={product} />)}
          </div>
        </div>
      </section>

      <section className="app-feature">
        <div className="wrap app-feature__inner">
          <div className="app-feature__art">
            <span className="app-feature__halo" />
            <Image src="/pnia-logo.png" alt="Poker Night in America – Be On TV app" width={430} height={320} />
          </div>
          <div className="app-feature__copy">
            <span className="eyebrow eyebrow--light">Free to play</span>
            <h2>Your shot at the table starts here.</h2>
            <p>{site.app.blurb}</p>
            <div className="button-row">
              <a className="btn btn-light" href={site.app.ios} target="_blank" rel="noopener noreferrer">Get the app ↗</a>
              <Link className="btn btn-ghost" href="/poker-night-app">How it works</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="section news-section">
        <div className="wrap">
          <div className="section-intro">
            <div><span className="eyebrow">Inside the game</span><h2>Latest stories</h2></div>
            <Link className="text-link" href="/news">Read all news →</Link>
          </div>
          <div className="story-grid">
            {news.map((post, index) => (
              <Link className={index === 0 ? "story-card story-card--lead" : "story-card"} key={post.slug} href={`/news/${post.slug}`}>
                <span className="story-card__image">
                  <Image src={post.youtubeId ? ytThumb(post.youtubeId, index === 0 ? "max" : "hq") : post.image || "/pnia.webp"} alt={post.title} fill sizes={index === 0 ? "(max-width: 800px) 100vw, 60vw" : "(max-width: 800px) 100vw, 35vw"} />
                </span>
                <span className="story-card__copy"><span className="eyebrow">{post.categories[0] || "News"}</span><strong>{post.title}</strong><small>{post.date}</small></span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="newsletter-band">
        <div className="wrap newsletter-band__inner">
          <div><span className="eyebrow eyebrow--light">Don’t miss the next deal</span><h2>{site.newsletter.heading}</h2><p>{site.newsletter.sub}</p></div>
          <NewsletterForm />
        </div>
      </section>
    </>
  );
}
