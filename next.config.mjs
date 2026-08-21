/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "i.ytimg.com" },
      { protocol: "https", hostname: "img.youtube.com" },
      { protocol: "https", hostname: "pokernight.com" },
    ],
  },
  async redirects() {
    return [
      { source: "/app", destination: "/poker-night-app", permanent: true },
      { source: "/app/registration", destination: "/poker-night-app", permanent: true },
      { source: "/app/sweeprules", destination: "/poker-night-app", permanent: true },
      { source: "/app-2", destination: "/poker-night-app", permanent: true },
      { source: "/sweepstakes", destination: "/poker-night-app", permanent: true },
      { source: "/sweepstakesform", destination: "/poker-night-app", permanent: true },
      { source: "/streaming", destination: "/where-to-watch", permanent: true },
      { source: "/coverage-map", destination: "/where-to-watch", permanent: true },
    ];
  },
};

export default nextConfig;
