import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";

const heroCriticalCss = `
:root{color-scheme:dark;--radius:1.5rem;--background:oklch(0.13 0.04 295);--foreground:oklch(0.99 0 0);--card:oklch(0.16 0.045 295);--card-foreground:oklch(0.99 0 0);--popover:oklch(0.15 0.045 295);--popover-foreground:oklch(0.99 0 0);--primary:oklch(0.66 0.24 18);--primary-foreground:oklch(0.99 0 0);--secondary:oklch(0.2 0.06 295);--secondary-foreground:oklch(0.99 0 0);--muted:oklch(0.2 0.05 295);--muted-foreground:oklch(0.76 0.02 295);--accent:oklch(0.22 0.08 300);--accent-foreground:oklch(0.99 0 0);--border:oklch(0.99 0 0 / 8%);--input:oklch(0.99 0 0 / 10%);--surface-1:oklch(0.14 0.04 295);--surface-2:oklch(0.17 0.05 295);--surface-3:oklch(0.2 0.06 298);--surface-glass:oklch(0.18 0.06 298 / 55%);--cherry:oklch(0.66 0.24 18);--cosmic:oklch(0.74 0.2 320);--electric:oklch(0.66 0.24 310);--glow:oklch(0.83 0.13 320);--gold:oklch(0.86 0.16 90);--gold-foreground:oklch(0.18 0.05 295);--ring:oklch(0.72 0.22 320);--shadow-primary:0 20px 60px -20px oklch(0.66 0.24 18 / 55%);--shadow-ambient:0 30px 80px -30px oklch(0.05 0 0 / 70%);--gradient-ai:linear-gradient(135deg,oklch(0.66 0.24 18),oklch(0.74 0.2 320));--gradient-cosmic:radial-gradient(ellipse at top,oklch(0.3 0.14 310 / 55%),transparent 60%)}
*,:after,:before{border-color:var(--border)}
body{background:var(--background);color:var(--foreground);font-family:"Inter",sans-serif;font-feature-settings:"ss01","cv11";-webkit-font-smoothing:antialiased;overflow-x:hidden;margin:0}
html{scroll-behavior:smooth}
.text-gradient-ai{background:var(--gradient-ai);-webkit-background-clip:text;background-clip:text;color:transparent}
.cosmic-halo{background-image:var(--gradient-cosmic)}
.glass-panel{background:linear-gradient(135deg,oklch(0.22 0.07 300 / 50%),oklch(0.16 0.05 295 / 40%));border:1px solid oklch(1 0 0 / 8%);backdrop-filter:blur(24px) saturate(140%);box-shadow:var(--shadow-ambient)}
.gradient-border{position:relative;isolation:isolate}
.gradient-border::before{content:"";position:absolute;inset:0;border-radius:inherit;padding:1px;background:linear-gradient(135deg,oklch(0.66 0.24 18 / 60%),oklch(0.74 0.2 320 / 30%),transparent 70%);-webkit-mask:linear-gradient(#000 0 0) content-box,linear-gradient(#000 0 0);-webkit-mask-composite:xor;mask-composite:exclude;pointer-events:none}
@keyframes hero-fade-in{from{opacity:0;transform:translateY(28px)}to{opacity:1;transform:translateY(0)}}
@keyframes hero-fade-scale{from{opacity:0;transform:scale(.9) rotateY(8deg)}to{opacity:1;transform:scale(1) rotateY(0)}}
@keyframes bar-rise{from{height:0!important}}
@keyframes progress-fill{from{width:0!important}}
@keyframes fadeIn{from{opacity:0}to{opacity:1}}
@keyframes scaleIn{from{opacity:0;transform:scale(.96)}to{opacity:1;transform:scale(1)}}
@keyframes float-y{0%,to{transform:translateY(0)}50%{transform:translateY(-10px)}}
.animate-hero-fade-in{animation:hero-fade-in .9s ease-out forwards}
.animate-hero-fade-scale{opacity:0;animation:hero-fade-scale 1s ease-out .25s forwards}
.animate-bar-rise{animation:bar-rise .6s ease-out forwards;height:0!important}
.animate-progress-fill{width:0!important;animation:progress-fill 1s ease-out forwards}
.animate-fade-in{animation:fadeIn .2s ease-out forwards}
.animate-scale-in{animation:scaleIn .2s ease-out forwards}
@media (prefers-reduced-motion:reduce){*,:after,:before{animation-duration:.01ms!important;animation-iteration-count:1!important;transition-duration:.01ms!important}}
`;

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "ShareOn Enterprise" },
      { name: "description", content: "The AI personal branding operating system for turning expertise into influence." },
      { name: "author", content: "ShareOn" },
      { property: "og:title", content: "ShareOn Enterprise" },
      { property: "og:description", content: "The AI personal branding operating system for turning expertise into influence." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "twitter:site", content: "@ShareOn" },
      { name: "twitter:title", content: "ShareOn Enterprise" },
      { name: "twitter:description", content: "The AI personal branding operating system for turning expertise into influence." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/fae9fae9-d41d-4e93-b90c-80b3f1e487a5/id-preview-02f164cf--22ed18a2-e437-4542-a566-d9ef4f2279af.lovable.app-1781290869414.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/fae9fae9-d41d-4e93-b90c-80b3f1e487a5/id-preview-02f164cf--22ed18a2-e437-4542-a566-d9ef4f2279af.lovable.app-1781290869414.png" },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: appCss },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Inter:wght@400..900&display=swap" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <style dangerouslySetInnerHTML={{ __html: heroCriticalCss }} />
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
      <Outlet />
    </QueryClientProvider>
  );
}
