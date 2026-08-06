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
      <section className="home-hero">
        <div className="home-hero__media" aria-hidden="true">
          <Image src="/collage-bg.webp" alt="" fill priority sizes="100vw" />
        </div>
        <div className="wrap home-hero__inner">
          <div className="home-hero__copy">
            <span className="eyebrow eyebrow--light">America’s televised cash game</span>
            <h1>Big pots.<br /><em>Bigger</em> personalities.</h1>
            <p>
              The best players in poker, one table, and absolutely no shortage of action.
              Watch {episodeCount()}+ episodes and new live cash games from Poker Night in America.
            </p>
            <div className="button-row">
              <a className="btn btn-red" href={site.watchLive[0].url} target="_blank" rel="noopener noreferrer">
                Watch now <span aria-hidden="true">▶</span>
              </a>
              <Link className="btn btn-ghost" href="/episodes">Explore episodes</Link>
            </div>
          </div>
          <div className="home-hero__stamp">
            <Image src="/pnia-shield.png" alt="Poker Night in America" width={210} height={230} priority />
            <span>Cards up. Cameras on.</span>
          </div>
        </div>
        <div className="home-hero__ticker" aria-label="Show highlights">
          <div className="wrap">
            <span>High-stakes cash games</span><i>♦</i><span>Poker’s biggest names</span><i>♥</i><span>Live &amp; on demand</span><i>♠</i><span>All action. No filler.</span>
          </div>
        </div>
      </section>

      {featured && (
        <section className="section feature-section">
          <div className="wrap">
            <div className="section-intro">
              <div><span className="eyebrow">Fresh from the felt</span><h2>Latest action</h2></div>
              <Link className="text-link" href="/episodes">All episodes →</Link>
            </div>
            <div className="episode-feature">
              <a className="episode-feature__image" href={ytUrl(featured.youtubeId)} target="_blank" rel="noopener noreferrer">
                <Image src={ytThumb(featured.youtubeId, "max")} alt={featured.title} fill sizes="(max-width: 900px) 100vw, 66vw" />
                <span className="play-button" aria-hidden="true">▶</span>
                <span className="episode-feature__label">Now playing</span>
              </a>
              <div className="episode-feature__copy">
                <span className="eyebrow">{featured.season} · {featured.venue}</span>
                <h3>{featured.title}</h3>
                <p>Settle in for table talk, momentum swings, and every decision that makes a cash game worth watching.</p>
                <a className="text-link" href={ytUrl(featured.youtubeId)} target="_blank" rel="noopener noreferrer">Watch the episode ↗</a>
              </div>
            </div>
            <div className="episode-rail">
              {latest.slice(1).map((episode, index) => (
                <a key={`${episode.title}-${index}`} href={ytUrl(episode.youtubeId)} target="_blank" rel="noopener noreferrer">
                  <span>{String(index + 2).padStart(2, "0")}</span>
                  <strong>{episode.title}</strong>
                  <small>{episode.season}</small>
                </a>
              ))}
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
