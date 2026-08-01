import type { Metadata } from "next";
import { Inter, Oswald } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const oswald = Oswald({ subsets: ["latin"], variable: "--font-oswald" });

export const metadata: Metadata = {
  title: {
    default: "Poker Night in America | America's Favorite Televised Cash Game",
    template: "%s | Poker Night in America",
  },
  description:
    "Poker Night in America brings the fun back to poker. Watch full episodes, live streams, and the biggest names in poker — Phil Hellmuth, Doyle Brunson, Shaun Deeb, Jennifer Tilly and more.",
  metadataBase: new URL("https://www.pokernight.com"),
  openGraph: {
    title: "Poker Night in America",
    description:
      "America's favorite televised cash game. Watch full episodes and live streams.",
    images: ["/pnia.webp"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${oswald.variable}`}>
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
