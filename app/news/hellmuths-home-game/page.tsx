import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { homeGameRecaps, recapImages } from "@/data/home-game-recaps";

export const metadata: Metadata = {
  title: "Hellmuth's Home Game Episode Recaps",
  description: "Independent PokerNews coverage of Hellmuth's Home Game, collected episode by episode by Poker Night in America.",
};

export default function HomeGameRecapsPage() {
  const featured = homeGameRecaps.slice(0, 3);
  const archive = homeGameRecaps.slice(3);

  return (
    <div className="recap-hub">
      <header className="recap-hub__hero">
        <div className="wrap recap-hub__hero-inner">
          <div>
            <span className="flow-kicker flow-kicker--light"><i /> Independent coverage</span>
            <h1>Hellmuth’s<br /><em>Home Game recaps.</em></h1>
          </div>
          <div className="recap-hub__dek">
            <p>Follow the biggest hands, table talk, wins and blowups across every episode of Hellmuth’s Home Game.</p>
            <span>Reporting and headlines by PokerNews. Each link opens the original article on PokerNews.com.</span>
          </div>
        </div>
      </header>

      <main>
        <section className="recap-hub__latest">
          <div className="wrap">
            <div className="recap-hub__section-title">
              <span>Latest coverage</span>
              <b>Episodes 28–30</b>
            </div>
            <div className="recap-feature-grid recap-feature-grid--hub">
              {featured.map((recap, index) => (
                <a className="recap-feature" key={recap.url} href={recap.url} target="_blank" rel="noopener noreferrer">
                  <span className="recap-feature__image"><Image src={recapImages[index]} alt="" fill sizes="(max-width: 800px) 88vw, 33vw" /></span>
                  <span className="recap-feature__shade" />
                  <span className="recap-feature__number">EP {recap.episodes}</span>
                  <span className="recap-feature__copy"><small>PokerNews · {recap.published}</small><strong>{recap.title}</strong><em>Read on PokerNews ↗</em></span>
                </a>
              ))}
            </div>
          </div>
        </section>

        <section className="recap-hub__archive">
          <div className="wrap">
            <div className="recap-hub__archive-heading">
              <div><span className="flow-kicker"><i /> The complete run</span><h2>Episode by episode.</h2></div>
              <p>{homeGameRecaps.length} original recaps covering Episodes 1–30.</p>
            </div>
            <div className="recap-index">
              {archive.map((recap) => (
                <a key={recap.url} href={recap.url} target="_blank" rel="noopener noreferrer">
                  <span className="recap-index__episode">EP {recap.episodes}</span>
                  <span className="recap-index__copy"><strong>{recap.title}</strong><small>PokerNews · {recap.published}</small></span>
                  <span className="recap-index__arrow">↗</span>
                </a>
              ))}
            </div>
            <div className="recap-hub__footer">
              <p>Poker Night in America does not reproduce the article text. All reporting remains on and belongs to PokerNews.</p>
              <Link href="/news">Back to Poker Night news <span>→</span></Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
