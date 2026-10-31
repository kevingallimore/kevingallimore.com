import Link from "next/link";
import { Nav } from "@/components/nav";
import { ThemeToggle } from "@/components/theme-toggle";
import { isSplashMode } from "@/lib/site-mode";
import { site } from "@/lib/site";

export function Header() {
  // Blog and About only lead back to this page while the site is offline.
  const splash = isSplashMode();

  return (
    <header className="sticky top-0 z-10 border-b border-line bg-paper">
      <div className="mx-auto flex w-full max-w-3xl flex-wrap items-center justify-between gap-x-6 gap-y-3 px-6 py-4">
        <Link
          href="/"
          className="font-serif text-lg text-ink underline decoration-transparent underline-offset-4 hover:decoration-current"
        >
          {site.name}
        </Link>
        <div className="flex items-center gap-5">
          {splash ? null : <Nav />}
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
