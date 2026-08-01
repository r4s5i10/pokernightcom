"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const seasons = [
  { name: "Season 1", slug: "season-1" },
  { name: "Season 2", slug: "season-2" },
  { name: "Season 3", slug: "season-3" },
  { name: "Season 4", slug: "season-4" },
  { name: "Season 5", slug: "season-5" },
  { name: "Season 6", slug: "season-6" },
];

const links = [
  { name: "News", href: "/news" },
  { name: "Where to Watch", href: "/where-to-watch" },
  { name: "Poker Night App", href: "/poker-night-app" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [epOpen, setEpOpen] = useState(false);
  const pathname = usePathname();

  const linkStyle: React.CSSProperties = {
    color: "#d6d6de",
    fontSize: 14,
    fontWeight: 600,
    textTransform: "uppercase" as const,
    letterSpacing: "0.06em",
    padding: "26px 14px",
    display: "block",
    borderBottom: "3px solid transparent",
    whiteSpace: "nowrap",
  };

  return (
    <header
      style={{
        background: "#0b0b0e",
        borderBottom: "1px solid #26262e",
        position: "sticky",
        top: 0,
        zIndex: 100,
      }}
    >
      <div
        className="wrap"
        style={{ display: "flex", alignItems: "center", gap: 8 }}
      >
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: 10, marginRight: 12, padding: "10px 0" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/pnia-shield.png" alt="Poker Night in America" style={{ height: 52, width: "auto" }} />
        </Link>

        {/* Desktop nav */}
        <nav className="nav-desktop" style={{ display: "flex", alignItems: "center", flex: 1 }}>
          <div
            style={{ position: "relative" }}
            onMouseEnter={() => setEpOpen(true)}
            onMouseLeave={() => setEpOpen(false)}
          >
            <Link
              href="/episodes"
              style={{
                ...linkStyle,
                color: pathname.startsWith("/episodes") ? "#fff" : linkStyle.color,
                borderBottomColor: pathname.startsWith("/episodes") ? "#c8102e" : "transparent",
              }}
            >
              Episodes ▾
            </Link>
            {epOpen && (
              <div
                style={{
                  position: "absolute",
                  top: "100%",
                  left: 0,
                  background: "#141419",
                  border: "1px solid #26262e",
                  borderTop: "3px solid #c8102e",
                  minWidth: 220,
                  boxShadow: "0 14px 30px rgba(0,0,0,.5)",
                }}
              >
                {seasons.map((s) => (
                  <Link
                    key={s.slug}
                    href={`/episodes/${s.slug}`}
                    style={{
                      display: "block",
                      padding: "12px 18px",
                      color: "#d6d6de",
                      fontSize: 14,
                      borderBottom: "1px solid #26262e",
                    }}
                  >
                    {s.name}
                  </Link>
                ))}
                <Link
                  href="/episodes"
                  style={{ display: "block", padding: "12px 18px", color: "#c8102e", fontSize: 13, fontWeight: 700, textTransform: "uppercase", letterSpacing: ".06em" }}
                >
                  All Episodes →
                </Link>
              </div>
            )}
          </div>
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              style={{
                ...linkStyle,
                color: pathname.startsWith(l.href) ? "#fff" : linkStyle.color,
                borderBottomColor: pathname.startsWith(l.href) ? "#c8102e" : "transparent",
              }}
            >
              {l.name}
            </Link>
          ))}
        </nav>

        <a
          href="https://www.youtube.com/pokernightinamerica"
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-purple"
          style={{ padding: "10px 22px", fontSize: 13 }}
        >
          ▶ Watch Live
        </a>

        {/* Mobile toggle */}
        <button
          className="nav-toggle"
          aria-label="Menu"
          onClick={() => setOpen(!open)}
          style={{
            display: "none",
            background: "none",
            border: "1px solid #3a3a44",
            color: "#fff",
            padding: "8px 12px",
            fontSize: 18,
            cursor: "pointer",
          }}
        >
          ☰
        </button>
      </div>

      {open && (
        <nav style={{ background: "#141419", borderTop: "1px solid #26262e", padding: "8px 0 16px" }}>
          <div className="wrap">
            <Link href="/episodes" onClick={() => setOpen(false)} style={{ display: "block", padding: "12px 0", color: "#fff", fontWeight: 600 }}>
              Episodes
            </Link>
            {seasons.map((s) => (
              <Link key={s.slug} href={`/episodes/${s.slug}`} onClick={() => setOpen(false)} style={{ display: "block", padding: "9px 0 9px 18px", color: "#b9b9c2", fontSize: 14 }}>
                {s.name}
              </Link>
            ))}
            {links.map((l) => (
              <Link key={l.href} href={l.href} onClick={() => setOpen(false)} style={{ display: "block", padding: "12px 0", color: "#fff", fontWeight: 600 }}>
                {l.name}
              </Link>
            ))}
          </div>
        </nav>
      )}

      <style jsx>{`
        @media (max-width: 880px) {
          .nav-desktop {
            display: none !important;
          }
          .nav-toggle {
            display: block !important;
          }
        }
      `}</style>
    </header>
  );
}
