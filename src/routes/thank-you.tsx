import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { CheckCircle2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import logoUrl from "@/assets/ShareOn Logo Primary.jpg.jpeg";

export const Route = createFileRoute("/thank-you")({
  head: () => ({
    meta: [
      { title: "Thank You — ShareOn Enterprise" },
      { name: "description", content: "Your waitlist submission has been received. Welcome to ShareOn." },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: ThankYou,
});

function ThankYou() {
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          window.location.href = "/";
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background">
      {/* Ambient background effects */}
      <div className="cosmic-halo absolute inset-0" />
      <div className="absolute left-1/2 top-1/2 size-[38rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-cosmic/10" />
      <div className="absolute left-1/2 top-1/2 size-[26rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary/10" />
      <div className="absolute left-1/2 top-1/2 size-[16rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-electric/8" />

      <div className="relative z-10 mx-auto max-w-2xl px-6 text-center">
        {/* Logo */}
        <Link to="/" className="mb-12 inline-flex items-center gap-2 text-xl font-bold tracking-tight text-foreground">
          <img src={logoUrl} alt="ShareOn Logo" className="h-9 w-9 rounded-xl object-cover" />
          ShareOn
        </Link>

        {/* Success icon */}
        <div className="mx-auto mb-10 flex size-24 items-center justify-center rounded-full bg-primary/15 shadow-[0_0_80px_-10px_oklch(0.66_0.24_18/50%)]">
          <div className="flex size-16 items-center justify-center rounded-full bg-gradient-to-br from-primary via-electric to-cosmic">
            <CheckCircle2 className="size-9 text-white" />
          </div>
        </div>

        {/* Heading */}
        <h1 className="text-4xl font-black tracking-[-.04em] text-foreground md:text-5xl">
          Thank you for joining<br />
          <span className="font-display font-normal italic text-gradient-ai">the waitlist!</span>
        </h1>

        {/* Subheading */}
        <p className="mx-auto mt-6 max-w-lg text-lg leading-relaxed text-muted-foreground">
          Your submission has been successfully received.<br />
          Preparing your command center…
        </p>

        {/* Countdown & redirect */}
        <div className="mt-10 flex flex-col items-center gap-6">
          <div className="inline-flex items-center gap-3 rounded-full border border-border bg-surface-glass px-5 py-3 text-sm text-muted-foreground backdrop-blur-xl">
            <span className="flex size-2 animate-pulse rounded-full bg-cosmic" />
            Redirecting to home in{" "}
            <span className="font-bold tabular-nums text-foreground">{countdown}s</span>
          </div>

          <Button variant="hero" size="lg" asChild>
            <Link to="/">
              Go to Home <ArrowRight />
            </Link>
          </Button>
        </div>

        {/* Footer note */}
        <p className="mt-16 text-xs text-muted-foreground">
          Keep an eye on your inbox for exclusive early access updates.
        </p>
      </div>

      {/* Noscript fallback with meta-refresh */}
      <noscript>
        <meta httpEquiv="refresh" content="5;url=/" />
      </noscript>
    </main>
  );
}
