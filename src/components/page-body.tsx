import { AnimatePresence, motion } from "framer-motion";
import {
  Activity, ArrowRight, Atom, BarChart3, BookOpen, Boxes, BrainCircuit, CalendarDays,
  Check, ChevronRight, CirclePlay, Command, Database, FileText, Globe2, Infinity as InfinityIcon,
  Layers3, Menu, MessageCircle, Mic2, Network, Play, Search, Send, Sparkles, UploadCloud,
  Video, WandSparkles, X, Zap, Loader2, CheckCircle2,
} from "lucide-react";
import { useEffect, useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import creatorsImage from "@/assets/shareon-creators.jpg";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { LazyCosmicScene } from "@/components/lazy-cosmic-scene";

const navItems = ["Features", "Solutions", "Pricing", "Resources", "About"];

const storyScenes = [
  { number: "01", eyebrow: "Knowledge, trapped", title: "Your best ideas are hiding in plain sight.", body: "Documents. Calls. Voice notes. Years of expertise. Your intellectual capital is scattered across formats built for storage—not growth.", icon: FileText },
  { number: "02", eyebrow: "Signal overload", title: "Consistency became a full-time job.", body: "Every platform demands a new format, cadence, and voice. The work of being visible eclipses the work that made you valuable.", icon: Layers3 },
  { number: "03", eyebrow: "The transformation", title: "ShareOn turns knowledge into an intelligent system.", body: "One source becomes a coordinated content universe—grounded in your expertise, calibrated to your voice, ready for every channel.", icon: BrainCircuit },
  { number: "04", eyebrow: "Brand Voice AI", title: "It learns what makes you unmistakably you.", body: "Cadence, conviction, stories, language, and point of view become a living identity model that evolves with every idea.", icon: Mic2 },
  { number: "05", eyebrow: "Avatar Studio", title: "Your presence, multiplied.", body: "Generate studio-quality video with a digital presenter that looks, sounds, and communicates like you—at the speed of thought.", icon: Video },
  { number: "06", eyebrow: "Content Engine", title: "Create once. Become everywhere.", body: "Long-form insight branches into posts, threads, scripts, carousels, newsletters, and content calendars in a single intelligent flow.", icon: WandSparkles },
  { number: "07", eyebrow: "Publishing Hub", title: "Every channel moves as one.", body: "Approve, schedule, adapt, and publish across your entire presence from one calm, coordinated command center.", icon: Send },
  { number: "08", eyebrow: "Analytics intelligence", title: "Know what creates momentum.", body: "ShareOn connects content performance to audience signals and tells you what to say next—not just what happened last.", icon: BarChart3 },
  { number: "09", eyebrow: "Compounding growth", title: "Your personal brand becomes an asset.", body: "More visibility. Deeper trust. A repeatable engine for opportunities that keeps working while you do your most important work.", icon: InfinityIcon },
];

const modules = [
  { name: "Brand Voice AI", copy: "A living identity model trained on your strongest work.", stat: "97.4%", label: "voice match", icon: Mic2, className: "md:col-span-7 md:row-span-2" },
  { name: "Avatar Studio", copy: "Your digital presence, ready for any script.", stat: "4K", label: "studio output", icon: Video, className: "md:col-span-5 md:row-span-3" },
  { name: "Content Engine", copy: "One idea, orchestrated into every format.", stat: "12×", label: "faster creation", icon: Sparkles, className: "md:col-span-4 md:row-span-2" },
  { name: "Publishing Hub", copy: "Precision scheduling across every channel.", stat: "8", label: "platforms", icon: Send, className: "md:col-span-8 md:row-span-2" },
  { name: "Analytics Intelligence", copy: "Signals become a clear next move.", stat: "+42%", label: "avg. reach", icon: BarChart3, className: "md:col-span-7 md:row-span-2" },
  { name: "Knowledge Base", copy: "Every insight indexed, connected, and ready.", stat: "∞", label: "context", icon: Database, className: "md:col-span-5 md:row-span-2" },
];

const architecture = [
  { name: "Experience", detail: "Adaptive interfaces across web, mobile, and embedded workflows.", metric: "24 ms", icon: Boxes },
  { name: "Intelligence Gateway", detail: "Routes every request through the right model and context window.", metric: "99.99%", icon: Network },
  { name: "Knowledge Engine", detail: "Maps source material into concepts, stories, claims, and evidence.", metric: "1.8B", icon: BrainCircuit },
  { name: "Brand Voice AI", detail: "Maintains identity, tone, vocabulary, and point of view at scale.", metric: "97.4%", icon: Mic2 },
  { name: "Publishing Layer", detail: "Adapts, schedules, and distributes content across every channel.", metric: "8 channels", icon: Send },
  { name: "Analytics Layer", detail: "Closes the loop with performance-aware recommendations.", metric: "+42%", icon: BarChart3 },
];

const roleOptions = ["Startup Founder", "Consultant", "Coach / Trainer", "Educator / Course Creator", "Freelancer", "Agency Owner", "Real Estate Agent", "Marketing Professional", "Other"] as const;
const platformOptions = ["LinkedIn", "Instagram", "YouTube", "Twitter / X", "Multiple platforms", "Not actively posting yet"] as const;
const challengeOptions = ["I don't like being on camera", "I don't have time to create content", "I run out of content ideas", "I don't know how to grow my audience", "I lack consistency in posting", "I don't have editing/design skills"] as const;
const frequencyOptions = ["Daily", "A few times a week", "Once a week", "Rarely", "Never"] as const;
const countryOptions = ["India", "United States", "United Kingdom", "UAE / GCC", "Japan", "Other"] as const;

const waitlistSchema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  email: z.string().min(1, "Email is required").email("Please enter a valid email address"),
  role: z.string().min(1, "Please select an option"),
  platform: z.string().min(1, "Please select an option"),
  challenge: z.string().min(1, "Please select an option"),
  frequency: z.string().optional(),
  country: z.string().min(1, "Please select your country"),
  otherCountry: z.string().optional(),
}).refine((data) => data.country !== "Other" || (data.otherCountry ?? "").length > 0, {
  message: "Please specify your country",
  path: ["otherCountry"],
});

type WaitlistValues = z.infer<typeof waitlistSchema>;

function WaitlistForm() {
  const [submitted, setSubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
    setValue,
    reset,
  } = useForm<WaitlistValues>({
    resolver: zodResolver(waitlistSchema),
    defaultValues: { fullName: "", email: "", role: "", platform: "", challenge: "", frequency: "", country: "", otherCountry: "" },
  });

  const country = watch("country");
  const onSubmit = async () => {
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setSubmitted(true);
    reset();
  };

  if (submitted) {
    return (
      <AnimatePresence mode="wait">
        <motion.div
          key="success"
          initial={{ opacity: 0, scale: .95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex flex-col items-center justify-center py-20 text-center"
        >
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 14 }}
            className="mb-8 flex size-20 items-center justify-center rounded-full bg-primary/15"
          >
            <CheckCircle2 className="size-10 text-primary" />
          </motion.span>
          <h3 className="text-3xl font-bold tracking-tight">You&rsquo;re on the list!</h3>
          <p className="mt-4 max-w-md text-muted-foreground">
            Keep an eye on your inbox for exclusive early access. We&rsquo;ll let you know the moment we launch.
          </p>
        </motion.div>
      </AnimatePresence>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-6">
      <div className="grid gap-5 md:grid-cols-2">
        <div className="space-y-2"><Label htmlFor="fullName">Full Name *</Label><Input id="fullName" {...register("fullName")} placeholder="Your full name" />{errors.fullName && <p className="text-xs text-destructive">{errors.fullName.message}</p>}</div>
        <div className="space-y-2"><Label htmlFor="email">Email Address *</Label><Input id="email" type="email" {...register("email")} placeholder="you@example.com" />{errors.email && <p className="text-xs text-destructive">{errors.email.message}</p>}</div>
        <div className="space-y-2"><Label>What best describes you? *</Label><Select onValueChange={(v) => setValue("role", v)}><SelectTrigger><SelectValue placeholder="Select an option" /></SelectTrigger><SelectContent>{roleOptions.map((o) => <SelectItem key={o} value={o}>{o}</SelectItem>)}</SelectContent></Select>{errors.role && <p className="text-xs text-destructive">{errors.role.message}</p>}</div>
        <div className="space-y-2"><Label>Which platform do you focus on most? *</Label><Select onValueChange={(v) => setValue("platform", v)}><SelectTrigger><SelectValue placeholder="Select an option" /></SelectTrigger><SelectContent>{platformOptions.map((o) => <SelectItem key={o} value={o}>{o}</SelectItem>)}</SelectContent></Select>{errors.platform && <p className="text-xs text-destructive">{errors.platform.message}</p>}</div>
        <div className="space-y-2"><Label>What&rsquo;s your biggest content challenge right now? *</Label><Select onValueChange={(v) => setValue("challenge", v)}><SelectTrigger><SelectValue placeholder="Select an option" /></SelectTrigger><SelectContent>{challengeOptions.map((o) => <SelectItem key={o} value={o}>{o}</SelectItem>)}</SelectContent></Select>{errors.challenge && <p className="text-xs text-destructive">{errors.challenge.message}</p>}</div>
        <div className="space-y-2"><Label>How often do you currently post content?</Label><Select onValueChange={(v) => setValue("frequency", v)}><SelectTrigger><SelectValue placeholder="Select an option" /></SelectTrigger><SelectContent>{frequencyOptions.map((o) => <SelectItem key={o} value={o}>{o}</SelectItem>)}</SelectContent></Select></div>
        <div className="space-y-2 md:col-span-2"><Label>Country *</Label><div className="grid gap-4 md:grid-cols-2"><Select onValueChange={(v) => { setValue("country", v); if (v !== "Other") setValue("otherCountry", ""); }}><SelectTrigger><SelectValue placeholder="Select your country" /></SelectTrigger><SelectContent>{countryOptions.map((o) => <SelectItem key={o} value={o}>{o}</SelectItem>)}</SelectContent></Select><AnimatePresence>{country === "Other" && (<motion.div initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -12 }} transition={{ duration: .25 }}><Input placeholder="Please specify your country" {...register("otherCountry")} /></motion.div>)}</AnimatePresence></div>{errors.country && <p className="text-xs text-destructive">{errors.country.message}</p>}{errors.otherCountry && <p className="text-xs text-destructive">{errors.otherCountry.message}</p>}</div>
      </div>
      <Button type="submit" variant="hero" size="lg" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? <><Loader2 className="size-5 animate-spin" /> Joining the waitlist&hellip;</> : <>Join the waitlist <ArrowRight /></>}
      </Button>
      <p className="text-center text-xs text-muted-foreground">No spam. Unsubscribe anytime.</p>
    </form>
  );
}

function Counter({ value, label }: { value: string; label: string }) {
  return <div><p className="text-2xl font-bold tracking-tight md:text-4xl">{value}</p><p className="mt-1 text-xs uppercase tracking-[.16em] text-muted-foreground">{label}</p></div>;
}

export default function PageBody() {
  const [yearly, setYearly] = useState(true);
  const [activeNode, setActiveNode] = useState(2);
  const [sandboxType, setSandboxType] = useState("LinkedIn Post");
  const [sandboxReady, setSandboxReady] = useState(false);

  const prices = [0, yearly ? 29 : 79, yearly ? 39 : 99];
  const activeArchitecture = architecture[activeNode];
  const ActiveArchitectureIcon = activeArchitecture.icon;
  const submitSandbox = (event: FormEvent) => { event.preventDefault(); setSandboxReady(false); window.setTimeout(() => setSandboxReady(true), 900); };

  return (
    <>
      <section className="relative z-10 overflow-hidden border-y border-border bg-surface-1/80 py-6"><div className="animate-ticker flex w-max items-center gap-14 pr-14 text-sm font-semibold text-muted-foreground">{[...Array(2)].flatMap(() => ["4,200+ active creators", "1.8M assets generated", "68 countries", "99.99% uptime", "SOC 2 ready", "12× faster creation"]).map((item, index) => <span key={`${item}-${index}`} className="flex items-center gap-3 whitespace-nowrap"><span className="size-1 rounded-full bg-primary" />{item}</span>)}</div></section>

      <section id="features" className="relative py-32 md:py-48"><div className="mx-auto max-w-7xl px-6 lg:px-8"><div className="mb-24 max-w-4xl"><p className="mb-5 text-sm font-semibold uppercase tracking-[.25em] text-primary">From fragmented to formidable</p><h2 className="text-5xl font-bold leading-[.95] tracking-[-.055em] md:text-7xl">Nine moments.<br/><span className="font-display font-normal italic text-gradient-ai">One compounding system.</span></h2></div><div className="space-y-5">{storyScenes.map((scene, index) => { const Icon = scene.icon; return <motion.article key={scene.number} className="group grid min-h-[55vh] items-center gap-10 border-t border-border py-20 md:grid-cols-[.35fr_1.3fr_1fr]" initial={{ opacity: .25 }} whileInView={{ opacity: 1 }} viewport={{ amount: .55 }} transition={{ duration: .6 }}><span className="font-display text-7xl text-muted-foreground/20 transition group-hover:text-primary/40">{scene.number}</span><div><p className="mb-5 text-sm font-semibold uppercase tracking-[.2em] text-cosmic">{scene.eyebrow}</p><h3 className="text-4xl font-bold leading-tight tracking-[-.04em] md:text-6xl">{scene.title}</h3></div><div><div className="mb-8 flex size-20 items-center justify-center rounded-[1.7rem] border border-border bg-surface-glass text-glow backdrop-blur-xl transition duration-500 group-hover:rotate-6 group-hover:scale-110"><Icon className="size-8" /></div><p className="text-lg leading-relaxed text-muted-foreground">{scene.body}</p></div></motion.article>; })}</div></div></section>

      <section id="solutions" className="relative py-28"><div className="mx-auto max-w-7xl px-6 lg:px-8"><div className="mb-16 flex flex-col justify-between gap-8 md:flex-row md:items-end"><div><p className="mb-5 text-sm font-semibold uppercase tracking-[.25em] text-primary">The operating system</p><h2 className="max-w-3xl text-5xl font-bold leading-[.95] tracking-[-.05em] md:text-7xl">Six engines.<br/><span className="font-display font-normal italic text-gradient-ai">One voice.</span></h2></div><p className="max-w-sm text-lg leading-relaxed text-muted-foreground">Every module shares context. Every output makes the entire system smarter.</p></div><div className="grid auto-rows-[11rem] gap-4 md:grid-cols-12">{modules.map((module) => { const Icon = module.icon; return <motion.article key={module.name} className={`gradient-border group relative overflow-hidden rounded-[2rem] bg-surface-2 p-7 ${module.className}`} whileHover={{ y: -6, scale: 1.01 }} transition={{ type: "spring", stiffness: 260, damping: 22 }}><div className="absolute -right-16 -top-16 size-48 rounded-full bg-electric/10 blur-3xl transition group-hover:bg-primary/15"/><div className="relative flex h-full flex-col justify-between"><div className="flex items-start justify-between"><Icon className="size-7 text-glow"/><ArrowRight className="size-5 -rotate-45 text-muted-foreground transition group-hover:rotate-0 group-hover:text-foreground" /></div><div><h3 className="text-2xl font-bold tracking-tight">{module.name}</h3><p className="mt-2 max-w-md text-sm text-muted-foreground">{module.copy}</p></div><div className="absolute bottom-7 right-7 text-right"><p className="text-4xl font-bold text-gradient-ai">{module.stat}</p><p className="text-xs uppercase tracking-wider text-muted-foreground">{module.label}</p></div></div></motion.article>; })}</div></div></section>

      <section id="architecture" className="relative py-32 md:py-48"><div className="cosmic-halo absolute inset-0 opacity-60"/><div className="relative mx-auto max-w-7xl px-6 lg:px-8"><div className="mx-auto mb-20 max-w-3xl text-center"><p className="mb-5 text-sm font-semibold uppercase tracking-[.25em] text-cosmic">Explore the intelligence layer</p><h2 className="text-5xl font-bold tracking-[-.055em] md:text-7xl">An architecture that <span className="font-display font-normal italic text-gradient-ai">thinks in systems.</span></h2></div><div className="glass-panel gradient-border grid overflow-hidden rounded-[2.2rem] lg:grid-cols-[.9fr_1.1fr]"><div className="border-b border-border p-5 lg:border-b-0 lg:border-r">{architecture.map((node, index) => { const Icon = node.icon; return <button key={node.name} onClick={() => setActiveNode(index)} className={`group flex w-full items-center gap-4 rounded-2xl p-4 text-left transition ${activeNode === index ? "bg-accent text-foreground" : "text-muted-foreground hover:bg-muted/50"}`}><span className={`flex size-11 items-center justify-center rounded-xl ${activeNode === index ? "bg-primary text-primary-foreground" : "bg-muted"}`}><Icon className="size-5" /></span><span><strong className="block text-sm text-foreground">{node.name}</strong><span className="text-xs">Layer 0{index + 1}</span></span><ChevronRight className="ml-auto size-4" /></button>; })}</div><AnimatePresence mode="wait"><motion.div key={activeNode} className="relative flex min-h-[34rem] flex-col justify-between overflow-hidden p-8 md:p-12" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}><div className="absolute inset-0 opacity-70"><LazyCosmicScene /></div><div className="relative flex justify-between"><span className="rounded-full border border-border bg-background/60 px-4 py-2 text-xs uppercase tracking-widest text-muted-foreground">Active architecture node</span><span className="text-sm text-cosmic">Healthy · 100%</span></div><div className="relative"><div className="mb-8 flex size-20 items-center justify-center rounded-[1.8rem] bg-primary shadow-[var(--shadow-primary)]"><ActiveArchitectureIcon className="size-9" /></div><p className="text-6xl font-black tracking-[-.06em]">{activeArchitecture.metric}</p><h3 className="mt-6 text-3xl font-bold">{activeArchitecture.name}</h3><p className="mt-3 max-w-lg text-lg leading-relaxed text-muted-foreground">{activeArchitecture.detail}</p><div className="mt-8 flex flex-wrap gap-3">{["Encrypted", "Adaptive", "Observable"].map((tag) => <span key={tag} className="rounded-full border border-border bg-surface-glass px-3 py-1.5 text-xs text-muted-foreground">{tag}</span>)}</div></div></motion.div></AnimatePresence></div></div></section>

      <section id="metrics" className="py-28"><div className="mx-auto max-w-7xl px-6 lg:px-8"><div className="grid gap-12 lg:grid-cols-[.75fr_1.25fr]"><div><p className="mb-5 text-sm font-semibold uppercase tracking-[.25em] text-primary">Live build in public</p><h2 className="text-5xl font-bold leading-none tracking-[-.05em] md:text-7xl">The network is <span className="font-display font-normal italic text-gradient-ai">alive.</span></h2><p className="mt-6 max-w-md text-lg text-muted-foreground">Every pulse is a creator turning what they know into something the world can use.</p></div><div className="glass-panel gradient-border rounded-[2rem] p-6 md:p-9"><div className="grid grid-cols-2 gap-8 border-b border-border pb-8 md:grid-cols-4"><Counter value="4,286" label="Creators active"/><Counter value="1.8M" label="Assets generated"/><Counter value="12.4M" label="Posts published"/><Counter value="68" label="Countries reached"/></div><div className="mt-8 grid gap-8 md:grid-cols-[1.25fr_.75fr]"><div className="relative min-h-64 overflow-hidden rounded-[1.5rem] bg-surface-1 p-5"><div className="absolute left-[16%] top-[35%] size-3 animate-ping rounded-full bg-primary"/><div className="absolute left-[45%] top-[28%] size-2 animate-pulse rounded-full bg-cosmic"/><div className="absolute right-[18%] top-[48%] size-3 animate-ping rounded-full bg-gold"/><Globe2 className="absolute left-1/2 top-1/2 size-52 -translate-x-1/2 -translate-y-1/2 text-muted-foreground/10"/><p className="relative text-xs uppercase tracking-widest text-muted-foreground">World activity / live</p></div><div><p className="mb-4 text-sm font-semibold">Streaming now</p>{["Maya published a video", "Jon trained his voice", "Ari generated 8 posts", "Noah reached 10K views"].map((item,index) => <motion.div key={item} className="flex gap-3 border-t border-border py-3 text-xs text-muted-foreground" initial={{ opacity: 0, x: 10 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: index * .12 }}><span className="mt-1 size-1.5 rounded-full bg-cosmic"/>{item}<span className="ml-auto">now</span></motion.div>)}</div></div></div></div></div></section>

      <section id="sandbox" className="scroll-mt-32 py-28 md:py-44"><div className="mx-auto max-w-7xl px-6 lg:px-8"><div className="mx-auto mb-16 max-w-3xl text-center"><p className="mb-5 text-sm font-semibold uppercase tracking-[.25em] text-gold">No signup. No friction.</p><h2 className="text-5xl font-bold tracking-[-.055em] md:text-7xl">Give us one idea.<br/><span className="font-display font-normal italic text-gradient-premium">Watch it multiply.</span></h2></div><form onSubmit={submitSandbox} className="glass-panel gradient-border mx-auto max-w-5xl rounded-[2.2rem] p-4 md:p-8"><div className="grid gap-4 lg:grid-cols-2"><label className="group flex min-h-80 cursor-pointer flex-col items-center justify-center rounded-[1.7rem] border border-dashed border-border bg-surface-1 p-8 text-center transition hover:border-primary/50 hover:bg-surface-2"><input type="file" className="sr-only" accept=".pdf,.txt,.doc,.docx"/><span className="mb-6 flex size-16 items-center justify-center rounded-2xl bg-primary/10 text-primary transition group-hover:scale-110"><UploadCloud className="size-7"/></span><strong className="text-xl">Drop your knowledge here</strong><span className="mt-2 text-sm text-muted-foreground">PDF, resume, notes, blog, or article</span><span className="mt-6 rounded-full border border-border px-4 py-2 text-xs">Choose a file</span></label><div className="flex min-h-80 flex-col rounded-[1.7rem] bg-surface-2 p-6"><p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Create instantly</p><div className="mt-4 flex flex-wrap gap-2">{["LinkedIn Post","X Thread","Content Calendar","Video Script"].map((type) => <button type="button" key={type} onClick={() => setSandboxType(type)} className={`rounded-full px-3 py-2 text-xs transition ${sandboxType === type ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:text-foreground"}`}>{type}</button>)}</div><AnimatePresence mode="wait">{sandboxReady ? <motion.div key="result" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-6 flex-1 rounded-2xl border border-cosmic/20 bg-cosmic/5 p-5"><span className="text-xs text-cosmic">Generated {sandboxType}</span><p className="mt-4 text-lg font-semibold">The most valuable ideas aren&rsquo;t always the loudest.</p><p className="mt-3 text-sm leading-relaxed text-muted-foreground">They&rsquo;re the ones earned through experience&mdash;then shaped into something others can act on. Here are three lessons I wish I knew sooner...</p></motion.div> : <div className="mt-6 flex flex-1 flex-col items-center justify-center rounded-2xl border border-border text-center text-muted-foreground"><Sparkles className="mb-4 size-8"/><p>Your generated content will appear here.</p></div>}</AnimatePresence><Button type="submit" variant="hero" size="lg" className="mt-4 w-full">Generate with ShareOn <WandSparkles /></Button></div></div></form></div></section>

      <section id="about" className="relative py-28"><div className="mx-auto max-w-7xl px-6 lg:px-8"><div className="overflow-hidden rounded-[2.5rem] bg-surface-1"><div className="grid lg:grid-cols-2"><img src={creatorsImage} alt="Three ShareOn creators in a cinematic studio" loading="lazy" width={1536} height={1024} className="h-full min-h-[32rem] w-full object-cover"/><div className="flex flex-col justify-center p-8 md:p-16"><p className="text-sm font-semibold uppercase tracking-[.25em] text-primary">Built for people with something to say</p><blockquote className="mt-8 text-3xl font-semibold leading-tight tracking-[-.035em] md:text-5xl">&ldquo;ShareOn didn&rsquo;t make me sound like everyone else. It finally made my ideas sound more like <span className="font-display italic text-gradient-ai">me.</span>&rdquo;</blockquote><div className="mt-10"><p className="font-semibold">Maya Chen</p><p className="text-sm text-muted-foreground">Founder, Fieldnotes Studio · 3.2× audience growth</p></div><div className="mt-10 flex gap-3"><Button variant="glass" size="icon" aria-label="Previous story"><ChevronRight className="rotate-180"/></Button><Button variant="glass" size="icon" aria-label="Next story"><ChevronRight/></Button></div></div></div></div></div></section>

      <section id="pricing" className="py-32 md:py-48"><div className="mx-auto max-w-7xl px-6 lg:px-8"><div className="mb-16 text-center"><p className="mb-5 text-sm font-semibold uppercase tracking-[.25em] text-primary">Simple by design</p><h2 className="text-5xl font-bold tracking-[-.055em] md:text-7xl">Start where you are.<br/><span className="font-display font-normal italic text-gradient-ai">Scale who you become.</span></h2><button onClick={() => setYearly(!yearly)} className="mt-8 inline-flex items-center gap-1 rounded-full border border-border bg-surface-1 p-1 text-sm"><span className={`rounded-full px-4 py-2 ${!yearly ? "bg-accent" : "text-muted-foreground"}`}>Monthly</span><span className={`rounded-full px-4 py-2 ${yearly ? "bg-accent" : "text-muted-foreground"}`}>Yearly <span className="text-cosmic">−20%</span></span></button></div><div className="grid gap-5 lg:grid-cols-3">{[{name:"Spark",copy:"Begin building your signal.",features:["3 knowledge sources","15 assets / month","2 social channels"]},{name:"Creator",copy:"Turn consistency into momentum.",features:["Unlimited sources","150 assets / month","Brand Voice AI","All publishing channels"]},{name:"Pro",copy:"Your complete personal brand OS.",features:["Everything in Creator","Avatar Studio","Advanced analytics","Priority intelligence"]}].map((plan,index) => <motion.article key={plan.name} whileHover={{ y: -8 }} className={`gradient-border relative rounded-[2rem] p-8 ${index === 2 ? "bg-gold text-gold-foreground shadow-[var(--shadow-gold)]" : "glass-panel"}`}>{index === 2 && <span className="absolute right-5 top-5 rounded-full bg-background px-3 py-1 text-xs text-foreground">Recommended</span>}<p className="text-sm font-semibold uppercase tracking-widest opacity-70">{plan.name}</p><p className="mt-6 text-5xl font-bold">${prices[index]}<span className="text-base font-normal opacity-60"> / mo</span></p><p className="mt-4 opacity-70">{plan.copy}</p><ul className="my-8 space-y-4">{plan.features.map((feature) => <li key={feature} className="flex items-center gap-3 text-sm"><Check className="size-4"/>{feature}</li>)}</ul><Button variant={index === 2 ? "default" : "glass"} size="lg" className="w-full">{index === 0 ? "Start free" : "Choose " + plan.name}<ArrowRight/></Button></motion.article>)}</div></div></section>

      <section id="waitlist" className="scroll-mt-32 py-28 md:py-44"><div className="mx-auto max-w-7xl px-6 lg:px-8"><div className="mx-auto mb-16 max-w-3xl text-center"><p className="mb-5 text-sm font-semibold uppercase tracking-[.25em] text-gold">Early access</p><h2 className="text-5xl font-bold tracking-[-.055em] md:text-7xl">Get early access.<br/><span className="font-display font-normal italic text-gradient-premium">Skip the line.</span></h2><p className="mt-6 text-lg text-muted-foreground">Join the waitlist and be the first to experience ShareOn when we open the doors.</p></div><div className="glass-panel gradient-border mx-auto max-w-2xl rounded-[2.2rem] p-6 md:p-10"><WaitlistForm /></div></div></section>

      <section className="relative px-6 py-28"><div className="gradient-border relative mx-auto max-w-7xl overflow-hidden rounded-[2.5rem] bg-surface-2 px-6 py-24 text-center md:px-16 md:py-32"><div className="cosmic-halo absolute inset-0"/><div className="absolute left-1/2 top-1/2 size-[38rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-cosmic/15"/><div className="absolute left-1/2 top-1/2 size-[26rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary/15"/><div className="relative"><p className="mb-6 text-sm font-semibold uppercase tracking-[.25em] text-gold">Your expertise is already valuable</p><h2 className="mx-auto max-w-5xl text-5xl font-black leading-[.92] tracking-[-.06em] md:text-8xl">Make it <span className="font-display font-normal italic text-gradient-ai">impossible to ignore.</span></h2><p className="mx-auto mt-8 max-w-xl text-lg text-muted-foreground">Build the personal brand operating system that turns what you know into opportunities that compound.</p><div className="mt-10 flex flex-wrap justify-center gap-4"><Button variant="hero" size="xl">Start your free trial <ArrowRight/></Button><Button variant="glass" size="xl">Book enterprise demo</Button></div><p className="mt-6 text-xs text-muted-foreground">No credit card · Setup in 4 minutes · Cancel anytime</p></div></div></section>

      <footer id="footer" className="border-t border-border px-6 pb-10 pt-24"><div className="mx-auto max-w-7xl"><div className="grid gap-14 md:grid-cols-2 lg:grid-cols-6"><div className="lg:col-span-2"><a href="#top" className="flex items-center gap-2 text-xl font-bold"><span className="flex size-9 items-center justify-center rounded-xl bg-primary"><InfinityIcon/></span>ShareOn</a><p className="mt-5 max-w-xs text-sm leading-relaxed text-muted-foreground">The AI personal branding operating system for people building what&rsquo;s next.</p><div className="mt-7 flex gap-2">{[Globe2,MessageCircle,Play].map((Icon,index)=><Button key={index} variant="glass" size="icon" aria-label="Social link"><Icon/></Button>)}</div></div>{[{title:"Product",links:["Features","Brand Voice","Avatar Studio","Pricing"]},{title:"Resources",links:["Documentation","Integrations","Guides","API"]},{title:"Company",links:["About","Careers","Contact","Security"]},{title:"Legal",links:["Privacy","Terms","DPA","Status"]}].map((column)=><div key={column.title}><p className="mb-5 text-sm font-semibold">{column.title}</p><ul className="space-y-3">{column.links.map(link=><li key={link}><a href="#top" className="text-sm text-muted-foreground transition hover:text-foreground">{link}</a></li>)}</ul></div>)}</div><div className="mt-20 flex flex-col justify-between gap-4 border-t border-border pt-7 text-xs text-muted-foreground md:flex-row"><p>&copy; 2026 ShareOn, Inc. All systems operational.</p><p>Designed for ideas worth sharing.</p></div></div></footer>

      <div className="fixed bottom-5 right-5 z-50"><AnimatePresence>{false && <motion.div className="glass-panel gradient-border absolute bottom-20 right-0 w-[min(22rem,calc(100vw-2.5rem))] rounded-[2rem] p-5" initial={{ opacity: 0, y: 16, scale: .92 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 16, scale: .92 }}><div className="flex items-center justify-between"><div className="flex items-center gap-3"><span className="flex size-10 items-center justify-center rounded-full bg-gradient-to-br from-primary to-cosmic"><Atom/></span><div><p className="font-semibold">ShareOn Intelligence</p><p className="text-xs text-cosmic">Online · ready to explore</p></div></div><Button variant="ghost" size="icon" onClick={()=>{}} aria-label="Close assistant"><X/></Button></div><p className="mt-6 text-sm leading-relaxed text-muted-foreground">I can tour the platform, explain features, search docs, or help you book a tailored demo.</p><div className="mt-5 grid grid-cols-2 gap-2">{["Take a tour","Compare plans","Search docs","Book demo"].map(action=><button key={action} className="rounded-xl border border-border bg-surface-1 px-3 py-3 text-left text-xs transition hover:bg-accent">{action}</button>)}</div><div className="mt-4 flex gap-2 rounded-xl bg-surface-1 p-2"><input className="min-w-0 flex-1 bg-transparent px-2 text-sm outline-none" placeholder="Ask anything..."/><Button variant="hero" size="icon" aria-label="Send message"><Send/></Button></div></motion.div>}</AnimatePresence></div>
    </>
  );
}
