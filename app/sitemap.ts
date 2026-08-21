import type { MetadataRoute } from "next";
import { getNewsPosts, getSeasons } from "@/lib/data";
import { products } from "@/lib/products";

const base = "https://www.pokernight.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const core = ["", "/episodes", "/news", "/where-to-watch", "/poker-night-app", "/store", "/privacy-policy"];
  return [
    ...core.map((path) => ({ url: `${base}${path}`, changeFrequency: "weekly" as const, priority: path === "" ? 1 : .8 })),
    ...getSeasons().map((season) => ({ url: `${base}/episodes/${season.slug}`, changeFrequency: "monthly" as const, priority: .7 })),
    ...getNewsPosts().map((post) => ({ url: `${base}/news/${post.slug}`, lastModified: post.date ? new Date(post.date) : undefined, changeFrequency: "monthly" as const, priority: .6 })),
    ...products.map((product) => ({ url: `${base}/product/${product.slug}`, changeFrequency: "weekly" as const, priority: .7 })),
  ];
}
