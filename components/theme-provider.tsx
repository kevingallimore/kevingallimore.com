"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import type { ReactNode } from "react";

/**
 * The theme choice stays in localStorage, not a cookie. Reading a cookie
 * on the server would make every page dynamic. `next-themes` injects a
 * script that sets `class="dark"` on <html> before paint, so the page
 * does not flash the wrong theme. Tailwind's `dark:` variant is wired to
 * that class in app/globals.css.
 */
export function ThemeProvider({ children }: { children: ReactNode }) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      {children}
    </NextThemesProvider>
  );
}
