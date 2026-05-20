import { ReactNode, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

export function Reveal({
  children,
  delay = 0,
  y = 40,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay, ease: [0.2, 0.8, 0.2, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function Counter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [value, setValue] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting && !started.current) {
            started.current = true;
            const duration = 1600;
            const start = performance.now();
            const step = (t: number) => {
              const p = Math.min((t - start) / duration, 1);
              const eased = 1 - Math.pow(1 - p, 3);
              setValue(Math.floor(target * eased));
              if (p < 1) requestAnimationFrame(step);
              else setValue(target);
            };
            requestAnimationFrame(step);
          }
        });
      },
      { threshold: 0.4 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [target]);

  return (
    <span ref={ref}>
      {value.toLocaleString()}
      {suffix}
    </span>
  );
}

export function SectionBadge({ children }: { children: ReactNode }) {
  return (
    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border border-gold-500/20 bg-gold-500/5">
      <span className="w-1.5 h-1.5 rounded-full bg-gold-400 animate-pulse"></span>
      <span className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-300">{children}</span>
    </div>
  );
}

export function PageHero({
  title,
  subtitle,
  badge,
}: {
  title: ReactNode;
  subtitle?: string;
  badge?: string;
}) {
  return (
    <section className="relative pt-32 pb-16 md:pt-40 md:pb-20 overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-40"></div>
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-gold-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-navy-500/20 rounded-full blur-3xl"></div>
      <div className="relative max-w-6xl mx-auto px-4 md:px-6 lg:px-8 text-center">
        {badge && (
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border border-gold-500/20 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-gold-400 animate-pulse"></span>
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-300">{badge}</span>
          </div>
        )}
        <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-6 text-lg text-white/60 max-w-2xl mx-auto">{subtitle}</p>
        )}
      </div>
    </section>
  );
}
