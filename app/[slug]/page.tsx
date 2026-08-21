import { notFound, redirect } from "next/navigation";
import posts from "@/data/posts.json";
import { getPost, isEpisodePost, type Post } from "@/lib/data";

export function generateStaticParams() {
  return (posts as Post[]).map((post) => ({ slug: post.slug }));
}

export default async function LegacyPostRoute({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();
  redirect(isEpisodePost(post) ? "/episodes" : `/news/${post.slug}`);
}
