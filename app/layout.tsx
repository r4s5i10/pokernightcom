import type { Metadata } from "next";
import { Inter, Barlow_Condensed } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
// Display font — condensed w/ italics to echo the slanted PNIA logo lettering
const barlow = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-oswald",
});

export const metadata: Metadata = {
  title: {
    default: "Poker Night in America | America's Favorite Televised Cash Game",
    template: "%s | Poker Night in America",
  },
  description:
    "Poker Night in America brings the fun back to poker. Watch full episodes, live streams, and the biggest names in poker — Phil Hellmuth, Doyle Brunson, Shaun Deeb, Jennifer Tilly and more.",
  metadataBase: new URL("https://www.pokernight.com"),
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "https://www.pokernight.com",
    siteName: "Poker Night in America",
    title: "Poker Night in America",
    description:
      "America's favorite televised cash game. Watch full episodes and live streams.",
    images: [{ url: "/og-pokernight.png", width: 1731, height: 909, alt: "Poker Night in America — Cards up. Cameras on." }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Poker Night in America",
    description: "America’s favorite televised cash game. Watch full episodes and live streams.",
    images: ["/og-pokernight.png"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const gaId = process.env.NEXT_PUBLIC_GA_ID;
  const metaPixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID;
  return (
    <html lang="en" className={`${inter.variable} ${barlow.variable}`}>
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
        {gaId && (
          <>
            <Script src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} strategy="afterInteractive" />
            <Script id="ga4" strategy="afterInteractive">
              {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','${gaId}');`}
            </Script>
          </>
        )}
        {metaPixelId && (
          <Script id="meta-pixel" strategy="afterInteractive">
            {`!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','${metaPixelId}');fbq('track','PageView');`}
          </Script>
        )}
      </body>
    </html>
  );
}
