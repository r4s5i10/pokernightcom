import Image from "next/image";
import Link from "next/link";
import NewsletterForm from "@/components/NewsletterForm";
import ProductCard from "@/components/ProductCard";
import { episodeCount, getLatestEpisodes, getNewsPosts, site, ytThumb, ytUrl } from "@/lib/data";
import { products } from "@/lib/products";
import homeGameStats from "@/data/home-game-stats.json";

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
  const channelVideos = latest.slice(0, 6);
  const statLeaders = homeGameStats.players.slice(0, 7);
  const formatMoney = (value: number) => `${value >= 0 ? "+" : "−"}$${Math.abs(value).toLocaleString("en-US")}`;
  const initials = (name: string) => name.split(/\s+/).map((part) => part[0]).join("").slice(0, 2).toUpperCase();

  return (
    <div className="flow-home">
      {featured && (
        <section className="flow-hero">
          <div className="flow-hero__collage" aria-hidden="true" />
          <div className="flow-hero__orb" aria-hidden="true" />

          <div className="wrap flow-hero__inner">
            <div className="flow-hero__copy">
              <span className="flow-kicker"><i /> America’s televised cash game</span>
              <h1><span>Poker Night</span><em>in America</em></h1>
              <p>Big pots. Big personalities. Zero scripts. Pull up a chair for the cash game that never plays it safe.</p>
              <div className="flow-actions">
                <a className="flow-button flow-button--red" href={site.watchLive[0].url} target="_blank" rel="noopener noreferrer">
                  <span className="flow-button__play">▶</span> Watch live
                </a>
                <Link className="flow-button flow-button--line" href="/episodes">Explore every episode</Link>
              </div>
              <div className="flow-hero__proof">
                <strong>{episodeCount()}+</strong>
                <span>episodes of cards-up<br />cash-game action</span>
              </div>
            </div>

            <a className="flow-feature" href={ytUrl(featured.youtubeId)} target="_blank" rel="noopener noreferrer">
              <span className="flow-feature__image">
                <Image src={ytThumb(featured.youtubeId, "max")} alt={featured.title} fill priority sizes="(max-width: 850px) 94vw, 58vw" />
              </span>
              <span className="flow-feature__shade" />
              <span className="flow-feature__top"><b>Now playing</b><i>Season 5</i></span>
              <span className="flow-feature__play" aria-hidden="true">▶</span>
              <span className="flow-feature__caption">
                <small>Featured episode</small>
                <strong>{featured.title}</strong>
                <span>{featured.venue}</span>
              </span>
            </a>
          </div>

          <div className="flow-marquee" aria-label="Poker Night highlights">
            <div><span>Cards up</span><i>♦</i><span>Cameras on</span><i>♠</i><span>Big pots</span><i>♥</i><span>Bigger personalities</span><i>♣</i><span>Cards up</span></div>
          </div>
        </section>
      )}

      <section className="episode-flow">
        <div className="wrap">
          <div className="flow-heading">
            <div><span className="flow-kicker"><i /> Fresh from the felt</span><h2>Stay for<br /><em>one more hand.</em></h2></div>
            <div className="flow-heading__aside"><p>The latest faces, hands and moments from the Poker Night table.</p><Link href="/episodes">View the full archive <span>↗</span></Link></div>
          </div>

          <div className="episode-ribbon">
            {latest.slice(1, 5).map((episode, index) => (
              <a className="episode-ribbon__item" key={`${episode.title}-${index}`} href={ytUrl(episode.youtubeId)} target="_blank" rel="noopener noreferrer">
                <span className="episode-ribbon__number">0{index + 1}</span>
                <span className="episode-ribbon__thumb"><Image src={ytThumb(episode.youtubeId, "hq")} alt="" fill sizes="(max-width: 700px) 78vw, 25vw" /></span>
                <span className="episode-ribbon__copy"><small>{episode.season}</small><strong>{episode.title}</strong><em>{episode.venue}</em></span>
                <span className="episode-ribbon__arrow">↗</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="channel-flow">
        <div className="wrap channel-flow__shell">
          <header className="channel-flow__header">
            <div className="channel-flow__identity">
              <span className="channel-flow__mark"><Image src="/pnia-shield.png" alt="" width={76} height={76} /></span>
              <div>
                <span className="flow-kicker flow-kicker--light"><i /> Official channel</span>
                <h2>Poker Night TV</h2>
                <p>Cards-up cash games, full episodes, table talk and the biggest personalities in poker.</p>
                <small>{episodeCount()} episodes · New action from the Poker Night archive</small>
              </div>
            </div>
            <a className="channel-flow__subscribe" href={site.watchLive[0].url} target="_blank" rel="noopener noreferrer">Subscribe on YouTube ↗</a>
          </header>
          <div className="channel-video-grid">
            {channelVideos.map((episode, index) => (
              <a className={index === 0 ? "channel-video channel-video--lead" : "channel-video"} key={`${episode.title}-${index}`} href={ytUrl(episode.youtubeId)} target="_blank" rel="noopener noreferrer">
                <span className="channel-video__image"><Image src={ytThumb(episode.youtubeId, index === 0 ? "max" : "hq")} alt={episode.title} fill sizes="(max-width: 800px) 92vw, 33vw" /></span>
                <span className="channel-video__shade" />
                <span className="channel-video__play">▶</span>
                <span className="channel-video__copy"><small>{episode.season}</small><strong>{episode.title}</strong><em>{episode.venue}</em></span>
              </a>
            ))}
          </div>
          <Link className="channel-flow__more" href="/episodes">Browse the full video library <span>→</span></Link>
        </div>
      </section>

      <section className="archive-flow">
        <div className="wrap archive-flow__heading">
          <div>
            <span className="flow-kicker flow-kicker--light"><i /> From the Poker Night archive</span>
            <h2>Every hand<br /><em>has a story.</em></h2>
          </div>
          <p>Real tables, unforgettable personalities, and the moments between the cards that made Poker Night what it is.</p>
        </div>

        <div className="wrap archive-flow__gallery">
          <figure className="archive-photo archive-photo--studio">
            <Image src="/legacy/studio-night.jpg" alt="A lively Poker Night in America game filmed in the studio" fill sizes="(max-width: 700px) 92vw, 48vw" />
            <figcaption><span>01</span> The game comes alive</figcaption>
          </figure>
          <figure className="archive-photo archive-photo--portrait">
            <Image src="/legacy/player-portrait.jpg" alt="Poker player seated at a Poker Night table with chips" fill sizes="(max-width: 700px) 70vw, 24vw" />
            <figcaption><span>02</span> Faces of the felt</figcaption>
          </figure>
          <figure className="archive-photo archive-photo--ladies">
            <Image src="/legacy/ladies-night.jpg" alt="Players smiling together during Poker Night Ladies Night" fill sizes="(max-width: 700px) 86vw, 30vw" />
            <figcaption><span>03</span> Ladies Night</figcaption>
          </figure>
          <figure className="archive-photo archive-photo--host">
            <Image src="/legacy/poker-night-host.jpg" alt="Poker Night presenter speaking beside a television camera" fill sizes="(max-width: 700px) 74vw, 24vw" />
            <figcaption><span>04</span> Behind the broadcast</figcaption>
          </figure>
          <figure className="archive-photo archive-photo--winner">
            <Image src="/legacy/jason-koon-winner.jpg" alt="Jason Koon holding a poker championship trophy" fill sizes="(max-width: 700px) 70vw, 24vw" />
            <figcaption><span>05</span> The winning moment</figcaption>
          </figure>
          <figure className="archive-photo archive-photo--phil">
            <Image src="/legacy/phil-hellmuth.jpg" alt="Phil Hellmuth at the Poker Night in America table" fill sizes="(max-width: 700px) 86vw, 32vw" />
            <figcaption><span>06</span> Legends at the table</figcaption>
          </figure>
        </div>
      </section>

      <section className="stats-flow">
        <div className="wrap">
          <div className="stats-flow__heading">
            <div><span className="flow-kicker flow-kicker--light"><i /> From the home game</span><h2>Who’s up.<br /><em>Who’s chasing.</em></h2></div>
            <p>Running profit and loss totals from {homeGameStats.title}, through {homeGameStats.lastUpdated}.</p>
          </div>

          <div className="stats-flow__layout">
            <div className="leaderboard-card">
              <header>
                <div><strong>Profit / Loss leaderboard</strong><span>{homeGameStats.period}</span></div>
                <select aria-label="Leaderboard period" defaultValue="all"><option value="all">All sessions</option></select>
                <a href={homeGameStats.sourceUrl} target="_blank" rel="noopener noreferrer">View sheet ↗</a>
              </header>
              <div className="leaderboard-card__labels"><span>Rank</span><span>Player</span><span>Net</span></div>
              <ol>
                {statLeaders.map((player, index) => (
                  <li key={player.name}>
                    <b>{String(index + 1).padStart(2, "0")}</b>
                    <span className="leaderboard-card__player"><i>{initials(player.name)}</i><strong>{player.name}</strong></span>
                    <em className={player.profitLoss >= 0 ? "is-positive" : "is-negative"}>{formatMoney(player.profitLoss)}</em>
                  </li>
                ))}
              </ol>
            </div>

            <div className="leader-deck" aria-label="Home game leaders">
              {homeGameStats.players.slice(0, 4).map((player, index) => (
                <article className="leader-card" key={player.name}>
                  <span className="leader-card__rank">0{index + 1}</span>
                  <span className="leader-card__avatar">{initials(player.name)}</span>
                  <span className="leader-card__eyebrow">Home game leader</span>
                  <strong>{player.name}</strong>
                  <em>{formatMoney(player.profitLoss)}</em>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="watch-flow">
        <div className="watch-flow__curve" aria-hidden="true" />
        <div className="wrap watch-flow__inner">
          <div className="watch-flow__copy">
            <span className="flow-kicker flow-kicker--light"><i /> Watch your way</span>
            <h2>The table<br />travels with you.</h2>
            <p>Live streams when the cards are flying. Full episodes when you want to settle in.</p>
            <Link href="/where-to-watch">Find Poker Night everywhere <span>↗</span></Link>
          </div>
          <div className="platform-stream">
            {platforms.map((platform, index) => (
              <a key={platform.name} href={platform.url} target="_blank" rel="noopener noreferrer" aria-label={`Watch on ${platform.name}`}>
                <span>0{index + 1}</span>
                <Image src={platform.image} alt={platform.name} width={150} height={55} />
                <i>↗</i>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="shop-flow">
        <div className="wrap">
          <div className="shop-flow__title">
            <div><span className="flow-kicker"><i /> Off the felt</span><h2>Wear the<br /><em>night.</em></h2></div>
            <p>Official gear for the rail, the home game, and everywhere after the river.</p>
          </div>
          <div className="product-grid product-grid--four flow-products">
            {products.slice(0, 4).map((product) => <ProductCard key={product.id} product={product} />)}
          </div>
          <Link className="shop-flow__link" href="/store">Shop all Poker Night gear <span>→</span></Link>
        </div>
      </section>

      <section className="app-flow">
        <div className="app-flow__sweep" aria-hidden="true" />
        <div className="wrap app-flow__inner">
          <div className="app-flow__art">
            <span className="app-flow__ring" />
            <Image src="/pnia-logo.png" alt="Poker Night in America – Be On TV app" width={430} height={320} style={{ width: "100%", height: "auto" }} />
          </div>
          <div className="app-flow__copy">
            <span className="flow-kicker flow-kicker--light"><i /> Free to play</span>
            <h2>Don’t just<br />watch the table.<br /><em>Take a seat.</em></h2>
            <p>{site.app.blurb}</p>
            <div className="flow-actions">
              <a className="flow-button flow-button--white" href={site.app.ios} target="_blank" rel="noopener noreferrer">Get the app <span>↗</span></a>
              <Link className="flow-button flow-button--darkline" href="/poker-night-app">See how it works</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="stories-flow">
        <div className="wrap">
          <div className="flow-heading flow-heading--stories">
            <div><span className="flow-kicker"><i /> Inside the game</span><h2>Stories worth<br /><em>staying up for.</em></h2></div>
            <Link href="/news">All Poker Night news <span>↗</span></Link>
          </div>
          <div className="story-grid flow-stories flow-stories--newsroom">
            {news.map((post, index) => (
              <Link className="story-card" key={post.slug} href={`/news/${post.slug}`}>
                <span className="story-card__image">
                  <Image src={post.youtubeId ? ytThumb(post.youtubeId, index === 0 ? "max" : "hq") : post.image || "/pnia.webp"} alt={post.title} fill sizes="(max-width: 800px) 100vw, 33vw" />
                </span>
                <span className="story-card__copy"><span className="eyebrow">{post.categories[0] || "News"}</span><strong>{post.title}</strong><small>{post.date}</small></span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="signup-flow">
        <div className="wrap signup-flow__inner">
          <span className="signup-flow__suit" aria-hidden="true">♦</span>
          <div><span className="flow-kicker flow-kicker--light"><i /> The inside deal</span><h2>{site.newsletter.heading}</h2><p>{site.newsletter.sub}</p></div>
          <NewsletterForm />
        </div>
      </section>
    </div>
  );
}
