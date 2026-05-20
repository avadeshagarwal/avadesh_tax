import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import {
  ArrowRight,
  Phone,
  MessageCircle,
  Calendar,
  CheckCircle2,
  TrendingUp,
  ShieldCheck,
  Activity,
  ChevronDown,
} from "lucide-react";
import { TRUST_BADGES, telLink, waLink } from "../data/content";

const ROTATING_WORDS = ["GST Filing", "Income Tax", "Compliance", "Registrations", "Audit"];
// Longest word reserves the slot width so the line never reflows.
const LONGEST_WORD = ROTATING_WORDS.reduce((a, b) => (b.length > a.length ? b : a), "");

const TICKER_ITEMS = [
  { sym: "GST", chg: "+98%", up: true, note: "On-time filings" },
  { sym: "ITR", chg: "+1.2K", up: true, note: "Returns filed" },
  { sym: "ROC", chg: "100%", up: true, note: "Compliance" },
  { sym: "MSME", chg: "320+", up: true, note: "Registrations" },
  { sym: "TDS", chg: "+24%", up: true, note: "Refunds claimed" },
  { sym: "AUDIT", chg: "A+", up: true, note: "Internal review" },
  { sym: "TM", chg: "85+", up: true, note: "Trademarks" },
  { sym: "₹12.4L", chg: "Tax saved", up: true, note: "FY 24-25" },
];

function Sparkline() {
  const points = useMemo(
    () => [42, 38, 45, 41, 48, 44, 52, 50, 58, 55, 62, 60, 68, 64, 72, 70, 78, 74, 82, 79, 86, 84, 90, 95],
    []
  );
  const w = 280;
  const h = 70;
  const max = Math.max(...points);
  const min = Math.min(...points);
  const range = max - min || 1;
  const step = w / (points.length - 1);
  const d = points
    .map((p, i) => {
      const x = i * step;
      const y = h - ((p - min) / range) * h;
      return `${i === 0 ? "M" : "L"} ${x.toFixed(2)} ${y.toFixed(2)}`;
    })
    .join(" ");
  const area = `${d} L ${w} ${h} L 0 ${h} Z`;

  return (
    <svg viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none" className="w-full h-16">
      <defs>
        <linearGradient id="spark-area" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#cda23a" stopOpacity="0.45" />
          <stop offset="100%" stopColor="#cda23a" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="spark-line" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0%" stopColor="#cda23a" />
          <stop offset="100%" stopColor="#10b981" />
        </linearGradient>
      </defs>
      <path d={area} fill="url(#spark-area)" />
      <path
        d={d}
        fill="none"
        stroke="url(#spark-line)"
        strokeWidth="2.25"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="draw-line"
        vectorEffect="non-scaling-stroke"
      />
      <circle
        cx={w}
        cy={h - ((points[points.length - 1] - min) / range) * h}
        r="3.5"
        fill="#10b981"
      />
    </svg>
  );
}

export default function HeroHome() {
  const [wordIndex, setWordIndex] = useState(0);
  const heroRef = useRef<HTMLDivElement>(null);

  // Reduced-motion guard
  const prefersReducedMotion = useRef(false);
  useEffect(() => {
    prefersReducedMotion.current =
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;
  }, []);

  // Mouse parallax — motion values keep this off the React render path.
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const smx = useSpring(mx, { stiffness: 50, damping: 22 });
  const smy = useSpring(my, { stiffness: 50, damping: 22 });
  const orb1X = useTransform(smx, [-1, 1], [-22, 22]);
  const orb1Y = useTransform(smy, [-1, 1], [-22, 22]);
  const orb2X = useTransform(smx, [-1, 1], [22, -22]);
  const orb2Y = useTransform(smy, [-1, 1], [22, -22]);
  // Subtler tilt: keeps the card from looking glitchy on slight movements.
  const cardRX = useTransform(smy, [-1, 1], [3.5, -3.5]);
  const cardRY = useTransform(smx, [-1, 1], [-3.5, 3.5]);

  useEffect(() => {
    if (prefersReducedMotion.current) return;
    const id = setInterval(() => {
      setWordIndex((i) => (i + 1) % ROTATING_WORDS.length);
    }, 2400);
    return () => clearInterval(id);
  }, []);

  return (
    <>
      <section
        ref={heroRef}
        onMouseMove={(e) => {
          if (prefersReducedMotion.current) return;
          const el = heroRef.current;
          if (!el) return;
          const r = el.getBoundingClientRect();
          mx.set(((e.clientX - r.left) / r.width) * 2 - 1);
          my.set(((e.clientY - r.top) / r.height) * 2 - 1);
        }}
        onMouseLeave={() => {
          mx.set(0);
          my.set(0);
        }}
        className="relative min-h-[100svh] flex items-center pt-28 pb-20 lg:pb-24 overflow-hidden isolate"
      >
        {/* Animated grid */}
        <div className="absolute inset-0 bg-grid-anim opacity-50 pointer-events-none -z-10"></div>

        {/* Mesh blobs */}
        <motion.div
          style={{ x: orb1X, y: orb1Y }}
          className="absolute top-[-10%] right-[-5%] w-[640px] h-[640px] rounded-full bg-gold-500/15 blur-3xl mesh-blob pointer-events-none -z-10"
          aria-hidden
        />
        <motion.div
          style={{ x: orb2X, y: orb2Y }}
          className="absolute bottom-[-15%] left-[-10%] w-[560px] h-[560px] rounded-full bg-emerald-500/15 blur-3xl mesh-blob pointer-events-none -z-10"
          aria-hidden
        />
        <div
          className="absolute top-[35%] left-[45%] w-[400px] h-[400px] rounded-full bg-navy-500/25 blur-3xl mesh-blob pointer-events-none -z-10"
          aria-hidden
        />

        {/* Conic accent ring */}
        <div
          className="absolute -top-32 -right-32 w-96 h-96 rounded-full opacity-30 conic-rotate pointer-events-none -z-10"
          style={{ background: "conic-gradient(from 0deg, transparent, rgba(205,162,58,0.4), transparent 40%)" }}
          aria-hidden
        />

        <div className="relative max-w-7xl mx-auto px-4 md:px-6 lg:px-8 grid lg:grid-cols-12 gap-10 lg:gap-12 items-center w-full">
          {/* Left */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border border-gold-500/25"
            >
              <span className="relative flex w-2 h-2">
                <span className="absolute inset-0 rounded-full bg-emerald-400 animate-ping opacity-75"></span>
                <span className="relative w-2 h-2 rounded-full bg-emerald-400"></span>
              </span>
              <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-gold-300">
                Live · 1200+ Clients Across India
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.08 }}
              className="mt-6 font-display text-[40px] sm:text-5xl lg:text-[58px] xl:text-[68px] font-semibold text-white leading-[1.05] tracking-tight"
            >
              <span className="block">
                Precision{" "}
                {/* Rotating word — clipped slot with reserved width so no reflow / leak */}
                <span className="relative inline-block align-bottom overflow-hidden">
                  {/* invisible spacer reserves the longest word's width + line-height */}
                  <span aria-hidden className="invisible whitespace-nowrap">
                    {LONGEST_WORD}
                  </span>
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.span
                      key={wordIndex}
                      initial={{ y: "100%", opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: "-100%", opacity: 0 }}
                      transition={{ duration: 0.45, ease: [0.2, 0.8, 0.2, 1] }}
                      className="absolute inset-0 text-gold-gradient whitespace-nowrap"
                    >
                      {ROTATING_WORDS[wordIndex]}
                    </motion.span>
                  </AnimatePresence>
                </span>
              </span>
              <span className="block mt-1">
                for India&apos;s most ambitious{" "}
                <span className="italic text-emerald-400">businesses.</span>
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.22 }}
              className="mt-6 text-base md:text-lg text-white/65 max-w-2xl leading-relaxed"
            >
              A modern freelance CA practice for founders, MSMEs, and professionals — combining decades of tax expertise with technology-led compliance, transparent pricing, and white-glove service.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.36 }}
              className="mt-8 flex flex-wrap gap-3"
            >
              <a
                href={waLink()}
                target="_blank"
                rel="noreferrer"
                className="cta-pulse group inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-gradient-to-r from-gold-500 to-gold-700 text-navy-950 font-semibold transition-transform hover:scale-[1.03]"
              >
                <MessageCircle className="w-5 h-5" />
                Talk on WhatsApp
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
              <Link
                to="/consultation"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full glass border border-white/10 hover:border-gold-400/50 text-white font-semibold transition-colors"
              >
                <Calendar className="w-5 h-5" />
                Free Consultation
              </Link>
              <a
                href={telLink}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-white/5 border border-white/10 hover:border-white/25 text-white font-medium transition-colors"
              >
                <Phone className="w-5 h-5" />
                Call Now
              </a>
            </motion.div>

            {/* Trust badges */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.55 }}
              className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-x-6 gap-y-3 max-w-2xl"
            >
              {TRUST_BADGES.slice(0, 4).map((b, i) => (
                <motion.div
                  key={b}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.55 + i * 0.08 }}
                  className="flex items-center gap-2 text-xs text-white/65"
                >
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span className="leading-tight">{b}</span>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Right: dashboard card */}
          <div className="lg:col-span-5 relative mt-2 lg:mt-0">
            {/* Floating chips live OUTSIDE the tilt wrapper so 3D rotation
                doesn't warp them. They're positioned against the column. */}
            <motion.div
              initial={{ opacity: 0, x: -16, y: 8 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ delay: 1 }}
              className="absolute z-20 left-0 top-10 -translate-x-1/4 p-3 rounded-2xl glass-strong border border-emerald-500/25 shadow-2xl float-medium hidden md:flex items-center gap-2 pointer-events-none"
              aria-hidden
            >
              <div className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              </div>
              <div>
                <div className="text-[10px] text-white/50">GSTR-3B</div>
                <div className="text-xs font-semibold text-white">Filed ✓</div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 16, y: -8 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ delay: 1.15 }}
              className="absolute z-20 right-0 bottom-10 translate-x-1/4 p-3 rounded-2xl glass-strong border border-gold-500/25 shadow-2xl float-slow hidden md:flex items-center gap-2 pointer-events-none"
              aria-hidden
            >
              <div className="flex -space-x-2">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="w-7 h-7 rounded-full border-2 border-navy-900 bg-gradient-to-br from-gold-400 to-gold-600"
                  />
                ))}
              </div>
              <div className="text-xs font-semibold text-white">1200+ Clients</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.25 }}
              style={{ rotateX: cardRX, rotateY: cardRY, transformPerspective: 1400 }}
              className="relative will-change-transform"
            >
              <div className="relative rounded-3xl p-6 md:p-7 glass-strong border border-gold-500/20 overflow-hidden scanline">
                <div className="absolute -top-24 -right-24 w-60 h-60 bg-gold-500/25 rounded-full blur-3xl pointer-events-none"></div>
                <div className="absolute -bottom-24 -left-24 w-60 h-60 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none"></div>

                <div className="relative">
                  {/* header */}
                  <div className="flex items-center justify-between mb-5">
                    <div className="flex items-center gap-2">
                      <div className="w-2.5 h-2.5 rounded-full bg-red-400/70"></div>
                      <div className="w-2.5 h-2.5 rounded-full bg-yellow-400/70"></div>
                      <div className="w-2.5 h-2.5 rounded-full bg-emerald-400/80"></div>
                    </div>
                    <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.22em] text-white/50">
                      <Activity className="w-3 h-3 text-emerald-400" />
                      <span className="font-mono">FY 2025-26 · LIVE</span>
                    </div>
                  </div>

                  {/* primary tile */}
                  <div className="rounded-2xl bg-white/5 border border-white/10 p-4 mb-4">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <div className="text-[11px] uppercase tracking-wider text-white/45">
                          Tax Saved YTD
                        </div>
                        <div className="font-display text-3xl font-bold text-white mt-0.5">
                          ₹12,42,800
                        </div>
                      </div>
                      <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-semibold whitespace-nowrap">
                        <TrendingUp className="w-3.5 h-3.5" /> +34.2%
                      </div>
                    </div>
                    <Sparkline />
                  </div>

                  {/* metric grid */}
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className="p-4 rounded-2xl bg-gradient-to-br from-navy-800/60 to-navy-950/60 border border-white/10">
                      <div className="text-[10px] uppercase tracking-wider text-white/45">GST Filed</div>
                      <div className="font-mono text-2xl font-semibold text-gold-300 mt-1">
                        480<span className="text-sm text-white/40">+</span>
                      </div>
                    </div>
                    <div className="p-4 rounded-2xl bg-gradient-to-br from-navy-800/60 to-navy-950/60 border border-white/10">
                      <div className="text-[10px] uppercase tracking-wider text-white/45">Companies</div>
                      <div className="font-mono text-2xl font-semibold text-gold-300 mt-1">
                        150<span className="text-sm text-white/40">+</span>
                      </div>
                    </div>
                  </div>

                  {/* compliance bar */}
                  <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-500/10 via-gold-500/10 to-transparent border border-emerald-500/20">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs text-white/65 inline-flex items-center gap-1.5">
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                        Compliance Score
                      </span>
                      <span className="text-xs font-mono text-emerald-300 font-semibold">98.4%</span>
                    </div>
                    <div className="h-1.5 rounded-full bg-white/10 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: "98.4%" }}
                        transition={{ duration: 1.6, delay: 0.9, ease: [0.2, 0.8, 0.2, 1] }}
                        className="h-full rounded-full bg-gradient-to-r from-emerald-400 via-gold-400 to-gold-500"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Scroll hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4 }}
          className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-white/35"
          aria-hidden
        >
          <span className="text-[9px] uppercase tracking-[0.3em] font-mono">Scroll</span>
          <ChevronDown className="w-4 h-4 animate-bounce" />
        </motion.div>
      </section>

      {/* Ticker tape — moved OUT of the hero so it doesn't overlap content */}
      <div className="relative overflow-hidden border-y border-white/5 bg-navy-950/60 backdrop-blur-md py-3">
        <div className="flex ticker-track whitespace-nowrap">
          {[...TICKER_ITEMS, ...TICKER_ITEMS].map((t, i) => (
            <div key={i} className="flex items-center gap-3 px-7 flex-shrink-0">
              <span className="font-mono text-[11px] tracking-wider text-white/45 uppercase">
                {t.sym}
              </span>
              <span
                className={`font-mono text-sm font-semibold ${
                  t.up ? "text-emerald-400" : "text-red-400"
                }`}
              >
                {t.chg}
              </span>
              <span className="text-xs text-white/50">{t.note}</span>
              <span className="text-gold-500/60">•</span>
            </div>
          ))}
        </div>
        {/* edge fades */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-navy-950/90 to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-navy-950/90 to-transparent" />
      </div>
    </>
  );
}
