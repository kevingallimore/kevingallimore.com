import { PostList } from "@/components/post-list";
import { Splash } from "@/components/splash";
import { pageMetadata, splashMetadata } from "@/lib/metadata";
import { getPublishedPosts } from "@/lib/posts";
import { isSplashMode } from "@/lib/site-mode";
import { site } from "@/lib/site";

export const metadata = isSplashMode()
  ? splashMetadata()
  : pageMetadata({
      description: site.description,
      path: "/",
    });

// Prerender the full page. Post files are cached in lib/posts.ts.
export const ensureStatic = "navigation";

export default async function HomePage() {
  if (isSplashMode()) return <Splash />;

  const posts = await getPublishedPosts();
  const recent = posts.slice(0, 5);

  return (
    <div className="mx-auto w-full max-w-3xl px-6 py-16 sm:py-24">
      <p className="text-sm font-medium tracking-[0.16em] text-accent uppercase">
        {site.jobTitle}
      </p>
      <h1 className="mt-3 font-serif text-5xl font-medium tracking-tight text-balance text-ink sm:text-6xl">
        {site.name}
      </h1>
      <p className="mt-5 max-w-2xl text-xl leading-relaxed text-muted">
        {site.tagline}
      </p>
      <p className="mt-8 max-w-2xl text-lg leading-8">
        I publish reference notes and practical patterns for CRM, email,
        personalization, and customer data platforms, focused on Salesforce
        Marketing Cloud and Data 360.
      </p>

      <section className="mt-16 border-t border-line pt-10" aria-labelledby="recent-posts">
        <div className="flex items-baseline justify-between gap-4">
          <h2 id="recent-posts" className="font-serif text-2xl font-medium">
            Recent posts
          </h2>
        </div>
        <PostList posts={recent} />
      </section>
    </div>
  );
}
