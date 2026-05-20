import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle2, Filter } from "lucide-react";
import { Reveal, PageHero } from "../components/ui";
import ServiceIcon from "../components/ServiceIcon";
import { SERVICES, waLink } from "../data/content";

export default function Services() {
  const categories = ["All", "GST", "Income Tax", "Registration", "Advisory", "Compliance"] as const;
  const [cat, setCat] = useState<(typeof categories)[number]>("All");

  const filtered = cat === "All" ? SERVICES : SERVICES.filter((s) => s.category === cat);

  return (
    <>
      <PageHero
        badge="Our Services"
        title={<>25+ Expert <span className="text-gold-gradient">Tax & Business</span> Solutions</>}
        subtitle="From GST filing to company registration — complete professional services delivered by qualified experts across India."
      />

      <section className="relative py-10">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          {/* Filters */}
          <Reveal>
            <div className="flex items-center gap-3 overflow-x-auto pb-4 mb-8 scrollbar-none">
              <Filter className="w-4 h-4 text-gold-400 flex-shrink-0" />
              {categories.map((c) => (
                <button
                  key={c}
                  onClick={() => setCat(c)}
                  className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    cat === c
                      ? "bg-gradient-to-r from-gold-400 to-gold-600 text-navy-950 shadow-lg shadow-gold-500/30"
                      : "glass border border-white/10 text-white/70 hover:text-gold-400 hover:border-gold-500/30"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </Reveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((s, i) => (
              <Reveal key={s.slug} delay={(i % 6) * 0.05}>
                <div className="group relative h-full p-6 rounded-2xl glass border border-white/5 hover:border-gold-500/30 card-hover">
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-gold-400/20 to-gold-600/10 border border-gold-500/20 flex items-center justify-center text-gold-400 group-hover:scale-110 group-hover:rotate-6 transition-transform">
                      <ServiceIcon name={s.icon} />
                    </div>
                    <span className="text-[10px] uppercase tracking-wider text-gold-300 px-2 py-1 rounded-full bg-gold-500/10 border border-gold-500/20">
                      {s.category}
                    </span>
                  </div>
                  <h3 className="font-display text-xl font-bold text-white mb-2 group-hover:text-gold-400 transition-colors">
                    {s.title}
                  </h3>
                  <p className="text-sm text-white/60 leading-relaxed mb-4">{s.description}</p>
                  <ul className="space-y-1.5 mb-5">
                    {s.features.map((f) => (
                      <li key={f} className="flex items-start gap-2 text-xs text-white/70">
                        <CheckCircle2 className="w-3.5 h-3.5 text-gold-400 mt-0.5 flex-shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <a
                    href={waLink(`Hi, I want to know more about ${s.title}.`)}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 text-sm text-gold-400 font-semibold group/btn"
                  >
                    Enquire Now
                    <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                  </a>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Specialized CTAs */}
          <Reveal>
            <div className="mt-16">
              <h3 className="font-display text-2xl font-bold text-white mb-6 text-center">
                Explore <span className="text-gold-gradient">Specialized</span> Pages
              </h3>
              <div className="grid md:grid-cols-3 gap-5">
                {[
                  { to: "/gst-services", title: "GST Services", desc: "Registration, filing, compliance, and notices." },
                  { to: "/income-tax", title: "Income Tax Services", desc: "ITR filing, planning, and international taxation." },
                  { to: "/business-registration", title: "Business Registration", desc: "Pvt Ltd, LLP, Partnership, Trademark & more." },
                ].map((c) => (
                  <Link
                    key={c.to}
                    to={c.to}
                    className="group p-6 rounded-2xl glass border border-white/5 hover:border-gold-500/30 card-hover text-center"
                  >
                    <div className="font-display text-xl font-bold text-white group-hover:text-gold-400 transition-colors">
                      {c.title}
                    </div>
                    <div className="text-sm text-white/60 mt-2">{c.desc}</div>
                    <div className="mt-4 inline-flex items-center gap-1 text-sm text-gold-400 font-semibold">
                      Learn more <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
