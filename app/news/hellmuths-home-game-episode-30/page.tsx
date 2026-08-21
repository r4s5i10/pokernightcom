import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Jennifer Tilly Takes Control in Hellmuth's Home Game Episode 30",
  description: "The official Poker Night recap of Hellmuth's Home Game Episode 30, where Jennifer Tilly finished up $85,125 after a $68,400 final pot.",
  openGraph: {
    title: "Jennifer Tilly Takes Control in Hellmuth's Home Game Episode 30",
    description: "Aces, sets and a $68,400 finale: the official recap from Poker Night in America.",
    images: ["/news/home-game-30/hero.webp"],
  },
};

const openingStacks = [
  ["Erick Lindgren", "$22,675", "+$17,675"],
  ["Shaun Deeb", "$23,775", "−$1,225"],
  ["Dan “Jungleman” Cates", "$46,475", "−$13,525"],
  ["Xuan Liu", "$23,400", "−$1,600"],
  ["Phil Hellmuth", "$7,250", "−$7,750"],
  ["Jennifer Tilly", "$37,975", "+$7,975"],
  ["Nick Hellmuth", "$8,075", "−$1,925"],
];

const finalStacks = [
  ["Jennifer Tilly", "$115,125", "+$85,125"],
  ["Erick Lindgren", "$20,200", "+$15,200"],
  ["Dan “Jungleman” Cates", "$64,625", "+$4,625"],
  ["Xuan Liu", "$38,850", "+$3,850"],
  ["Nick Hellmuth", "$0", "−$10,000"],
  ["Phil Hellmuth", "$4,350", "−$20,000"],
  ["Shaun Deeb", "$0", "−$80,000"],
];

function StackTable({ rows, label }: { rows: string[][]; label: string }) {
  return (
    <div className="official-recap__table-wrap">
      <div className="official-recap__table-title"><span>{label}</span><b>$25 / $50 · $50 BB ante</b></div>
      <table className="official-recap__table">
        <thead><tr><th>Player</th><th>Stack</th><th>Session</th></tr></thead>
        <tbody>{rows.map(([player, stack, result]) => <tr key={player}><td>{player}</td><td>{stack}</td><td className={result.startsWith("+") ? "is-positive" : "is-negative"}>{result}</td></tr>)}</tbody>
      </table>
    </div>
  );
}

function RecapImage({ src, alt, caption }: { src: string; alt: string; caption: string }) {
  return (
    <figure className="official-recap__figure">
      <span><Image src={src} alt={alt} fill sizes="(max-width: 800px) 100vw, 920px" /></span>
      <figcaption>{caption}</figcaption>
    </figure>
  );
}

export default function Episode30RecapPage() {
  return (
    <article className="official-recap">
      <header className="official-recap__hero">
        <Image src="/news/home-game-30/hero.webp" alt="Jennifer Tilly at the Hellmuth's Home Game table" fill priority sizes="100vw" />
        <span className="official-recap__hero-shade" />
        <div className="wrap official-recap__hero-copy">
          <Link href="/news/hellmuths-home-game">Hellmuth’s Home Game <span>↗</span></Link>
          <span className="flow-kicker flow-kicker--light"><i /> Official episode recap</span>
          <h1>Jennifer Tilly<br /><em>takes control.</em></h1>
          <p>A set, pocket aces and a $68,400 final pot send Tilly to the top in Episode 30.</p>
        </div>
      </header>

      <div className="wrap official-recap__layout">
        <aside className="official-recap__rail">
          <span>Episode</span><strong>30</strong>
          <span>Published</span><b>August 20, 2026</b>
          <span>By</span><b>Poker Night Editorial</b>
          <span>Location</span><b>Grand Sierra Resort<br />Reno, Nevada</b>
        </aside>

        <div className="official-recap__body">
          <p className="official-recap__dek">Jennifer Tilly began Episode 30 with a healthy stack and ended it with the table’s only six-figure pile. Between those two points came a fearless turn raise, a perfectly timed set and the biggest pot of the night.</p>

          <p>The latest chapter of <em>Hellmuth’s Home Game</em>, presented by Poker Night in America and sponsored by BetRivers, continued the $25/$50 cash game at Grand Sierra Resort. With a $50 big-blind ante in play, the action arrived quickly—and the first collision set the tone.</p>

          <StackTable rows={openingStacks} label="Stacks at the start" />

          <h2>Cates lands the first punch</h2>
          <p>Dan “Jungleman” Cates opened the episode with ace-king and found Tilly waiting in the big blind with ace-queen. Tilly three-bet, Cates came back over the top, and neither player backed away after an ace landed on the flop.</p>
          <p>Tilly called bets on the flop and turn before facing a pot-sized $12,500 river wager. Her top pair was strong enough to reach the end, but Cates’ king kicker decided the $36,675 pot. It was an early setback for Tilly—not a preview of how her night would finish.</p>
          <RecapImage src="/news/home-game-30/hand-01.webp" alt="Jennifer Tilly faces a river decision against Dan Cates" caption="Tilly’s ace-queen runs into Cates’ ace-king in the opening hand." />

          <h2>Jungleman sends Nick to the rail</h2>
          <p>Cates picked up kings soon afterward and raised from early position. Nick Hellmuth defended ace-jack from the small blind and connected with a jack-high flop. When Nick led, Cates raised—and Nick committed the rest of his $7,725 stack.</p>
          <p>They ran the $16,600 pot twice. Cates’ overpair held on both boards, giving him the scoop and ending Nick’s session. The exit still delivered one of the episode’s warmer moments as Nick stopped to hug his father before leaving the table.</p>
          <RecapImage src="/news/home-game-30/hand-02.webp" alt="Dan Cates' kings hold against Nick Hellmuth" caption="Pocket kings hold twice for Cates against Nick Hellmuth’s ace-jack." />

          <h2>Tilly changes gears</h2>
          <p>The momentum shifted when Tilly took king-jack into a three-way pot against Phil Hellmuth and Shaun Deeb. Deeb made top pair with king-ten and continued betting. Tilly called the flop, then turned a queen and raised Deeb’s $3,000 bet to $10,000.</p>
          <p>Deeb moved all in. Tilly called for the rest, and a blank river sent the $39,000 pot her way. The hand was more than a double: it moved Tilly from recovery mode into a position to dictate the rest of the episode.</p>
          <RecapImage src="/news/home-game-30/hand-03.webp" alt="Jennifer Tilly all in against Shaun Deeb" caption="Tilly’s king-jack outkicks Deeb’s top pair in a $39,000 pot." />

          <h2>A set stops Cates cold</h2>
          <p>On Hand 161, Tilly raised pocket tens and Cates three-bet queens from the small blind. Tilly four-bet to $4,200, then found the dream flop: ten-nine-deuce, giving her top set against Cates’ overpair.</p>
          <p>Cates called $3,000 on the flop and check-raised the turn after Tilly bet another $5,000. Tilly answered by moving all in for $49,700. Cates worked through the decision and ultimately found the fold. Tilly showed the set, collecting the pot without needing a river card.</p>
          <RecapImage src="/news/home-game-30/hand-04.webp" alt="Jennifer Tilly moves all in with a set of tens against Dan Cates" caption="Tilly puts maximum pressure on Cates after flopping top set." />

          <h2>Hellmuth’s short stack disappears</h2>
          <p>Phil Hellmuth’s pocket sevens went in preflop against Deeb’s king-jack with multiple straddles already on the table. They ran the $12,250 pot twice. Deeb paired a king on the first board and a jack on the second to scoop, leaving Hellmuth to absorb another losing session.</p>
          <RecapImage src="/news/home-game-30/hand-05.webp" alt="Phil Hellmuth runs pocket sevens twice against Shaun Deeb" caption="Deeb gets there on both boards to eliminate Hellmuth’s short stack." />

          <h2>Aces deliver the finale</h2>
          <p>The last hand produced the largest pot of the episode. Erick Lindgren opened with jacks, Deeb three-bet tens from the small blind, and Tilly looked down at aces in the straddle. Her four-bet to $10,000 cleared Lindgren out, but Deeb called.</p>
          <p>On a six-nine-six flop, Deeb checked and Tilly bet $10,000. Deeb then moved all in for $23,400. Tilly called immediately, putting $68,400 in the middle. They ran it once. The turn and river brought no help for Deeb, and Tilly’s aces held to finish the show.</p>
          <RecapImage src="/news/home-game-30/hand-06.webp" alt="Jennifer Tilly's pocket aces hold against Shaun Deeb's pocket tens" caption="Pocket aces hold in the $68,400 finale, pushing Tilly beyond $115,000." />

          <h2>The final count</h2>
          <p>Tilly closed Episode 30 with $115,125 in front of her—an $85,125 profit and a commanding lead over the field. Lindgren and Cates also finished in the black, while Deeb absorbed the session’s largest loss.</p>
          <StackTable rows={finalStacks} label="Stacks at the finish" />

          <div className="official-recap__endnote">
            <span>More from the home game</span>
            <h2>Catch up before<br />the next deal.</h2>
            <div><Link href="/news/hellmuths-home-game">Browse every recap <span>→</span></Link><Link href="/where-to-watch">Where to watch <span>↗</span></Link></div>
          </div>
        </div>
      </div>
    </article>
  );
}
