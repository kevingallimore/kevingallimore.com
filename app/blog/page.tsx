import { PostList } from "@/components/post-list";
import { Splash } from "@/components/splash";
import { pageMetadata, splashMetadata } from "@/lib/metadata";
import { getPublishedPosts } from "@/lib/posts";
import { isSplashMode } from "@/lib/site-mode";
import { site } from "@/lib/site";

export const metadata = isSplashMode()
  ? splashMetadata()
  : pageMetadata({
      title: "Blog",
      description: `Writing by ${site.name} on CRM, email, personalization, Salesforce Marketing Cloud, and Data 360.`,
      path: "/blog",
    });

export const ensureStatic = "navigation";

export default async function BlogPage() {
  if (isSplashMode()) return <Splash />;

  const posts = await getPublishedPosts();

  return (
    <div className="mx-auto w-full max-w-3xl px-6 py-16 sm:py-20">
      <h1 className="font-serif text-4xl font-medium tracking-tight sm:text-5xl">
        Blog
      </h1>
      <p className="mt-4 max-w-2xl text-lg leading-8 text-muted">
        Reference notes and practical patterns for CRM, email, personalization,
        and customer data platforms.
      </p>
      <PostList posts={posts} />
    </div>
  );
}
