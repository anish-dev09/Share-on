import { createFileRoute } from "@tanstack/react-router";
import {
  Activity, ArrowRight, BarChart3, Check, CirclePlay, Command, Globe2,
  Menu, Sparkles, ChevronRight,
} from "lucide-react";
import { useEffect, useState, type MouseEvent, useRef } from "react";
import { Button } from "@/components/ui/button";
import { LazyBody } from "@/components/lazy-body";
import { LazyCosmicScene } from "@/components/lazy-cosmic-scene";
import logoUrl from "@/assets/ShareOn Logo Primary.jpg.jpeg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "ShareOn Enterprise — AI Personal Branding OS" },
      { name: "description", content: "Turn your expertise into videos, social content, and automated publishing with the AI personal branding operating system." },
      { property: "og:title", content: "ShareOn Enterprise — AI Personal Branding OS" },
      { property: "og:description", content: "Transform your knowledge into a brand that compounds across every platform." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const navItems = ["Features", "Solutions", "Pricing", "About"];
const rotatingWords = ["authority", "influence", "opportunity", "momentum"];

function CommandPalette({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(0);
  const commands = [
    ["Open Features", "features"], ["Open Pricing", "pricing"], ["Book Demo", "pricing"],
    ["Contact Team", "footer"], ["Open Analytics", "metrics"], ["Open Integrations", "architecture"],
    ["Open Documentation", "footer"], ["Start Free Trial", "sandbox"],
  ];
  const filtered = commands.filter(([label]) => label.toLowerCase().includes(query.toLowerCase()));
  useEffect(() => setSelected(0), [query]);
  const choose = (id: string) => { document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }); onClose(); };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center bg-background/90 px-4 pt-[12vh] backdrop-blur-2xl" onClick={onClose}>
      <div className="glass-panel gradient-border w-full max-w-2xl overflow-hidden rounded-[2rem] animate-scale-in" onClick={(event) => event.stopPropagation()}>
        <div className="flex items-center gap-4 border-b border-border px-6 py-5"><Command /><input autoFocus value={query} onChange={(event) => setQuery(event.target.value)} onKeyDown={(event) => { if (event.key === "ArrowDown") setSelected((selected + 1) % filtered.length); if (event.key === "ArrowUp") setSelected((selected - 1 + filtered.length) % filtered.length); if (event.key === "Enter" && filtered[selected]) choose(filtered[selected][1]); if (event.key === "Escape") onClose(); }} placeholder="Where do you want to go?" className="w-full bg-transparent text-xl outline-none placeholder:text-muted-foreground" /><kbd className="rounded-lg border border-border bg-muted px-2 py-1 text-xs text-muted-foreground">ESC</kbd></div>
        <div className="p-3"><p className="px-4 py-3 text-xs font-semibold uppercase tracking-[.2em] text-muted-foreground">{query ? "Results" : "Recent actions"}</p>{filtered.map(([label, id], index) => <button key={label} onMouseEnter={() => setSelected(index)} onClick={() => choose(id)} className={`flex w-full items-center justify-between rounded-2xl px-4 py-4 text-left transition ${selected === index ? "bg-accent text-foreground" : "text-muted-foreground"}`}><span className="flex items-center gap-3"><Command className="size-4" />{label}</span><ChevronRight className="size-4" /></button>)}</div>
      </div>
    </div>
  );
}

function Index() {
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [assistantOpen, setAssistantOpen] = useState(false);
  const [word, setWord] = useState(0);
  const [heroLoaded, setHeroLoaded] = useState(false);

  useEffect(() => {
    if ("scrollRestoration" in history) history.scrollRestoration = "manual";
    if (window.location.hash) {
      history.replaceState(null, "", window.location.pathname + window.location.search);
    }
    window.scrollTo(0, 0);
    requestAnimationFrame(() => setHeroLoaded(true));
  }, []);

  useEffect(() => {
    const wordTimer = window.setInterval(() => setWord((current) => (current + 1) % rotatingWords.length), 2800);
    const keyHandler = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") { event.preventDefault(); setPaletteOpen(true); }
    };
    window.addEventListener("keydown", keyHandler);
    return () => { window.clearInterval(wordTimer); window.removeEventListener("keydown", keyHandler); };
  }, []);

  return (
    <main className="relative min-h-screen overflow-hidden bg-background">
      <CommandPalette open={paletteOpen} onClose={() => setPaletteOpen(false)} />

      <header className="fixed inset-x-0 top-4 z-50 mx-auto flex w-[calc(100%-2rem)] max-w-6xl items-center justify-between rounded-full border border-border bg-background/65 px-3 py-2 shadow-[var(--shadow-ambient)] backdrop-blur-2xl md:top-6 md:px-4">
        <a href="#top" className="flex items-center gap-2 px-2 font-bold tracking-tight"><img src={logoUrl} alt="ShareOn Logo" className="h-8 w-8 rounded-xl object-cover" />ShareOn</a>
        <nav className="hidden items-center gap-1 lg:flex" aria-label="Main navigation">{navItems.map((item) => <a key={item} href={item === "Resources" ? "#sandbox" : `#${item.toLowerCase()}`} className="rounded-full px-3 py-2 text-sm text-muted-foreground transition hover:bg-accent hover:text-foreground">{item}</a>)}</nav>
        <div className="flex items-center gap-2"><Button variant="ghost" size="sm" className="hidden md:inline-flex" onClick={() => setPaletteOpen(true)}><Command /></Button><Button variant="hero" size="sm">Start free <ArrowRight /></Button><Button variant="hero" size="sm" asChild><a href="#waitlist" onClick={(e) => { e.preventDefault(); document.getElementById("waitlist")?.scrollIntoView({ behavior: "smooth" }); }}>Join waitlist</a></Button><Button variant="ghost" size="icon" className="lg:hidden" aria-label="Open menu"><Menu /></Button></div>
      </header>

      <section id="top" className="noise relative flex min-h-[105svh] items-center pt-28">
        <div className="cosmic-halo absolute inset-0" />
        <div className="absolute inset-y-0 right-0 w-full opacity-80 lg:w-[58%]"><LazyCosmicScene /></div>
        <div className="relative z-10 mx-auto grid w-full max-w-7xl items-center gap-16 px-6 py-20 lg:grid-cols-[1.08fr_.92fr] lg:px-8">
          <div className={`${heroLoaded ? "animate-hero-fade-in" : "opacity-0"}`}>
            <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/10 px-4 py-2 text-xs font-semibold uppercase tracking-[.18em] text-glow"><span className="size-1.5 animate-pulse rounded-full bg-primary" />ShareOn Enterprise · Now live</div>
            <h1 className="max-w-4xl text-[clamp(4rem,8vw,7.8rem)] font-black leading-[.82] tracking-[-.075em]">Turn expertise into <span className="font-display font-normal italic text-gradient-ai">{rotatingWords[word]}.</span></h1>
            <p className="mt-8 max-w-xl text-lg leading-relaxed text-muted-foreground md:text-xl">The AI personal branding operating system that transforms your knowledge into a brand that compounds—across every format, channel, and moment.</p>
            <div className="mt-10 flex flex-wrap items-center gap-4"><Button variant="hero" size="xl">Start building your brand <ArrowRight /></Button><Button variant="glass" size="xl" onClick={() => document.getElementById('waitlist')?.scrollIntoView({ behavior: 'smooth' })}>Join waitlist</Button></div>
            <div className="mt-10 flex items-center gap-4 text-sm text-muted-foreground"><div className="flex -space-x-2">{["S", "A", "M", "J"].map((letter) => <span key={letter} className="flex size-9 items-center justify-center rounded-full border-2 border-background bg-surface-3 text-xs font-bold text-foreground">{letter}</span>)}</div><p><strong className="text-foreground">4,200+</strong> experts building in public</p></div>
          </div>

          <div className={`relative mx-auto w-full max-w-xl pt-12 lg:pt-0 ${heroLoaded ? "animate-hero-fade-scale" : "opacity-0"}`}>
            <div className="glass-panel gradient-border relative overflow-hidden rounded-[2rem] p-3">
              <div className="flex items-center justify-between border-b border-border px-4 py-3"><div className="flex items-center gap-2"><span className="size-2 rounded-full bg-primary" /><span className="size-2 rounded-full bg-gold" /><span className="size-2 rounded-full bg-cosmic" /></div><span className="text-xs text-muted-foreground">SHAREON / COMMAND CENTER</span><Activity className="size-4 text-glow" /></div>
              <div className="grid gap-3 p-3 sm:grid-cols-[1.35fr_.65fr]">
                <div className="rounded-[1.4rem] bg-surface-1 p-5"><div className="flex items-start justify-between"><div><p className="text-xs uppercase tracking-[.15em] text-muted-foreground">Brand momentum</p><p className="mt-2 text-4xl font-bold">84.6</p></div><span className="rounded-full bg-cosmic/15 px-3 py-1 text-xs text-glow">+12.4%</span></div><div className="mt-8 flex h-28 items-end gap-1">{[35,55,42,67,52,76,64,88,72,96,82,100].map((height, index) => <span key={index} className="w-full rounded-t-sm bg-gradient-to-t from-primary to-cosmic animate-bar-rise" style={{ animationDelay: `${.7 + index * .05}s`, height: `${height}%` }} />)}</div></div>
                <div className="space-y-3"><div className="rounded-[1.4rem] bg-surface-2 p-4"><p className="text-xs text-muted-foreground">Voice match</p><p className="mt-3 text-2xl font-bold">97.4%</p><div className="mt-3 h-1.5 overflow-hidden rounded-full bg-muted"><span className="block h-full rounded-full bg-cosmic animate-progress-fill" style={{ width: "97%", animationDelay: "1s" }} /></div></div><div className="rounded-[1.4rem] bg-surface-2 p-4"><p className="text-xs text-muted-foreground">Content ready</p><p className="mt-3 text-2xl font-bold">18 <span className="text-sm font-normal text-muted-foreground">assets</span></p></div></div>
              </div>
              <div className="mx-3 mb-3 rounded-[1.4rem] border border-border bg-surface-1 p-4"><div className="mb-4 flex items-center justify-between"><p className="text-sm font-semibold">Live generation</p><span className="flex items-center gap-2 text-xs text-cosmic"><span className="size-1.5 animate-pulse rounded-full bg-cosmic" />thinking</span></div>{["Extracting 12 key insights", "Calibrating founder voice", "Building multi-channel campaign"].map((item, index) => <div key={item} className="flex items-center gap-3 border-t border-border py-3 text-xs text-muted-foreground"><span className={`size-6 rounded-lg ${index === 2 ? "shimmer bg-accent" : "bg-primary/15"}`} />{item}{index < 2 && <Check className="ml-auto size-3 text-cosmic" />}</div>)}</div>
            </div>
          </div>
        </div>
      </section>

      <LazyBody />

      <div className="fixed bottom-5 right-5 z-50">
        <button onClick={() => setAssistantOpen(!assistantOpen)} aria-label="Open AI assistant" className="animate-orb-pulse relative flex size-16 items-center justify-center rounded-full bg-gradient-to-br from-primary via-electric to-cosmic shadow-[var(--shadow-primary)]"><span className="absolute inset-1 rounded-full border border-foreground/20"/><Sparkles className="relative size-6"/></button>
      </div>
    </main>
  );
}
