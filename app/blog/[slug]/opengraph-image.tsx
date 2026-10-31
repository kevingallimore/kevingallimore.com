import { getPost, getPublishedPosts } from "@/lib/posts";
import { ogContentType, ogSize, renderOgImage } from "@/lib/og";
import { site } from "@/lib/site";

export const alt = `Blog post by ${site.name}`;
export const size = ogSize;
export const contentType = ogContentType;

export async function generateStaticParams() {
  const posts = await getPublishedPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export default async function PostOpenGraphImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPost(slug);

  return renderOgImage({
    kicker: site.name,
    title: post?.title ?? site.name,
    footer: site.jobTitle,
  });
}
