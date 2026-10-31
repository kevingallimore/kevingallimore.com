import Link from "next/link";
import { Splash } from "@/components/splash";
import { isSplashMode } from "@/lib/site-mode";

export default function NotFound() {
  if (isSplashMode()) return <Splash />;

  return (
    <div className="mx-auto w-full max-w-3xl px-6 py-24">
      <p className="text-sm font-medium tracking-[0.16em] text-accent uppercase">
        404
      </p>
      <h1 className="mt-3 font-serif text-4xl font-medium tracking-tight">
        Page not found
      </h1>
      <p className="mt-4 text-lg text-muted">
        That URL is not on this site.
      </p>
      <p className="mt-8">
        <Link
          href="/"
          className="text-accent underline decoration-accent/40 underline-offset-4"
        >
          Back home
        </Link>
      </p>
    </div>
  );
}
