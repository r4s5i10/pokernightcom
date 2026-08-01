import episodesData from "@/data/episodes.json";
import postsData from "@/data/posts.json";
import siteData from "@/data/site.json";

export interface Episode {
  label: string;
  title: string;
  youtubeId: string | null;
  date?: string | null;
  excerpt?: string | null;
}

export interface Series {
  code: string;
  venue: string;
  episodes: Episode[];
}

export interface Season {
  season: string;
  slug: string;
  series: Series[];
}

export interface Post {
  slug: string;
  title: string;
  date: string | null;
  categories: string[];
  youtubeId: string | null;
  image: string | null;
  body: string | null;
}

export const site = siteData;

export function getSeasons(): Season[] {
  return (episodesData as { seasons: Season[] }).seasons;
}

export function getSeason(slug: string): Season | undefined {
  return getSeasons().find((s) => s.slug === slug);
}

export function getStudio52(): Episode[] {
  return (episodesData as unknown as { studio52: Episode[] }).studio52;
}

const isEpisodePost = (p: Post) =>
  p.categories.some((c) => c === "Episodes" || /^Season \d/.test(c) || /^Series /.test(c));

export function getNewsPosts(): Post[] {
  const posts = (postsData as Post[]).filter((p) => !isEpisodePost(p) && p.body);
  return posts.sort((a, b) => parseDate(b.date) - parseDate(a.date));
}

export function getPost(slug: string): Post | undefined {
  return (postsData as Post[]).find((p) => p.slug === slug);
}

export function parseDate(d: string | null | undefined): number {
  if (!d) return 0;
  const t = Date.parse(d);
  return Number.isNaN(t) ? 0 : t;
}

export function ytThumb(id: string | null, quality: "hq" | "mq" | "max" = "hq"): string {
  if (!id) return "/pnia.webp";
  const q = quality === "max" ? "maxresdefault" : quality === "mq" ? "mqdefault" : "hqdefault";
  return `https://i.ytimg.com/vi/${id}/${q}.jpg`;
}

export function ytUrl(id: string | null): string {
  return id ? `https://www.youtube.com/watch?v=${id}` : site.watchLive[0].url;
}

/** Flat list of all episodes that have a video, newest seasons first */
export function getLatestEpisodes(count = 8): (Episode & { season: string; venue: string })[] {
  const out: (Episode & { season: string; venue: string })[] = [];
  const seasons = [...getSeasons()].reverse();
  for (const s of seasons) {
    for (const ser of s.series) {
      for (const ep of ser.episodes) {
        if (ep.youtubeId) out.push({ ...ep, season: s.season, venue: ser.venue });
      }
    }
  }
  return out.slice(0, count);
}

export function episodeCount(): number {
  return getSeasons().reduce(
    (n, s) => n + s.series.reduce((m, ser) => m + ser.episodes.length, 0),
    0
  );
}
