import { lazy, Suspense, useEffect, useRef, useState } from "react";

const PageBody = lazy(() => import("./page-body"));

export function LazyBody() {
  const ref = useRef<HTMLDivElement>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setLoaded(true);
          observer.disconnect();
        }
      },
      { rootMargin: "0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  if (loaded) {
    return (
      <Suspense fallback={<div className="h-screen" />}>
        <PageBody />
      </Suspense>
    );
  }

  return <div ref={ref} className="h-8" />;
}
