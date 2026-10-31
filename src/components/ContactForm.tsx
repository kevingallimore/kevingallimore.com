import {useEffect, useRef, useState, type ReactNode} from "react";

const FORMSTACK_EMBED_SRC =
  "https://indepthdesigns.formstack.com/forms/js.php/contactkevingallimore?no_style_strict=1";

const FORMSTACK_FALLBACK_URL =
  "https://indepthdesigns.formstack.com/forms/contactkevingallimore";

/**
 * Formstack's embed script writes the form with document.write.
 * After the page has loaded, a real document.write would erase the site,
 * so the script is added once in the browser and those writes are caught
 * and placed in the container instead.
 *
 * The HTML is kept for the whole visit so /about and /contact, and
 * Docusaurus client navigation, do not download or run that embed twice.
 */
let embedHtmlPromise: Promise<string> | null = null;

function loadEmbedHtml(): Promise<string> {
  if (embedHtmlPromise) return embedHtmlPromise;

  embedHtmlPromise = new Promise((resolve, reject) => {
    const chunks: string[] = [];
    const previousWrite = document.write.bind(document);
    const previousWriteln = document.writeln.bind(document);
    const restore = () => {
      document.write = previousWrite;
      document.writeln = previousWriteln;
    };
    document.write = (...parts: string[]) => {
      chunks.push(parts.join(""));
    };
    document.writeln = (...parts: string[]) => {
      chunks.push(`${parts.join("")}\n`);
    };

    const script = document.createElement("script");
    script.src = FORMSTACK_EMBED_SRC;
    script.async = false;
    script.dataset.formstackEmbed = "contact";
    script.onload = () => {
      restore();
      resolve(chunks.join(""));
    };
    script.onerror = () => {
      restore();
      embedHtmlPromise = null;
      reject(new Error("Formstack embed failed to load"));
    };
    document.head.appendChild(script);
  });

  return embedHtmlPromise;
}

function runScripts(
  parent: HTMLElement,
  scripts: HTMLScriptElement[],
): Promise<void> {
  return scripts.reduce<Promise<void>>((chain, original) => {
    return chain.then(
      () =>
        new Promise((resolve) => {
          const src = original.getAttribute("src");
          if (src && document.querySelector("script[data-formstack-renderer]")) {
            resolve();
            return;
          }
          const script = document.createElement("script");
          const type = original.getAttribute("type");
          if (type) script.type = type;
          if (src) {
            script.src = src;
            script.dataset.formstackRenderer = "true";
            script.onload = () => resolve();
            script.onerror = () => resolve();
            document.head.appendChild(script);
            return;
          }
          const code = original.textContent ?? "";
          if (code.trim() === "") {
            resolve();
            return;
          }
          script.text = code;
          parent.appendChild(script);
          resolve();
        }),
    );
  }, Promise.resolve());
}

function mountEmbed(container: HTMLElement, html: string): Promise<void> {
  const parsed = new DOMParser().parseFromString(html, "text/html");
  const scripts: HTMLScriptElement[] = [];
  container.replaceChildren();
  for (const node of Array.from(parsed.body.childNodes)) {
    if (node.nodeName === "SCRIPT") {
      scripts.push(node as HTMLScriptElement);
      continue;
    }
    // The embed includes a style tag that zeroes the page body margin.
    if (node.nodeName === "STYLE") continue;
    container.appendChild(document.importNode(node, true));
  }
  return runScripts(container, scripts);
}

function watchForForm(container: HTMLElement): {
  promise: Promise<void>;
  cancel: () => void;
} {
  let cleanup = () => {};
  const promise = new Promise<void>((resolve, reject) => {
    const finish = (ok: boolean) => {
      cleanup();
      if (ok) resolve();
      else reject(new Error("Formstack form did not render"));
    };
    if (container.querySelector("input, textarea, iframe, form")) {
      resolve();
      return;
    }
    const observer = new MutationObserver(() => {
      if (container.querySelector("input, textarea, iframe, form")) finish(true);
    });
    const timer = window.setTimeout(() => finish(false), 10000);
    observer.observe(container, {childList: true, subtree: true});
    cleanup = () => {
      observer.disconnect();
      window.clearTimeout(timer);
    };
  });
  return {
    promise,
    cancel: () => cleanup(),
  };
}

export default function ContactForm(): ReactNode {
  const containerRef = useRef<HTMLDivElement>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    let cancelled = false;
    let cancelWatch = () => {};

    loadEmbedHtml()
      .then((html) => {
        if (cancelled) return;
        return mountEmbed(container, html);
      })
      .then(() => {
        if (cancelled) return;
        const watch = watchForForm(container);
        cancelWatch = watch.cancel;
        return watch.promise;
      })
      .catch(() => {
        if (!cancelled) setFailed(true);
      });

    return () => {
      cancelled = true;
      cancelWatch();
      container.replaceChildren();
    };
  }, []);

  return (
    <div id="contact" className="contact-form">
      <div ref={containerRef} />
      {failed ? (
        <p className="contact-form__fallback">
          <a href={FORMSTACK_FALLBACK_URL}>Open the contact form</a>
        </p>
      ) : null}
      <noscript
        dangerouslySetInnerHTML={{
          __html: `<a href="${FORMSTACK_FALLBACK_URL}">Open the contact form</a>`,
        }}
      />
    </div>
  );
}
