import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRight, MessageCircle, Sparkles, Calendar,
  TrendingUp, Shield, Zap, Award, Users, Star, ChevronDown
} from "lucide-react";
import { Reveal, Counter, SectionBadge } from "../components/ui";
import ServiceIcon from "../components/ServiceIcon";
import HeroHome from "../components/HeroHome";
import {
  STATS, TRUST_BADGES, SERVICES, TEAM, FAQS, TESTIMONIALS,
  PROCESS_STEPS, TIMELINE, waLink
} from "../data/content";

export default function Home() {
  return (
    <>
      {/* HERO */}
      <HeroHome />

      {/* STATS */}
      <section className="relative py-16 border-y border-white/5 bg-navy-900/30">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 grid grid-cols-2 lg:grid-cols-4 gap-6">
          {STATS.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.1}>
              <div className="text-center p-6 rounded-2xl glass border border-white/5 hover:border-gold-500/20 transition-colors">
                <div className="font-display text-4xl md:text-5xl font-bold text-gold-gradient">
                  <Counter target={s.value} suffix={s.suffix} />
                </div>
                <div className="mt-2 text-sm text-white/60">{s.label}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* TRUST MARQUEE */}
      <section className="py-10 overflow-hidden border-b border-white/5">
        <div className="flex marquee whitespace-nowrap">
          {[...TRUST_BADGES, ...TRUST_BADGES].map((b, i) => (
            <div key={i} className="flex items-center gap-3 px-8 text-white/40">
              <Sparkles className="w-4 h-4 text-gold-400" />
              <span className="font-display text-xl">{b}</span>
              <span className="text-gold-400">•</span>
            </div>
          ))}
        </div>
      </section>

      {/* SERVICES */}
      <section className="relative py-20 md:py-28 overflow-hidden">
        <div className="absolute top-40 right-0 w-[500px] h-[500px] bg-gold-500/5 rounded-full blur-3xl"></div>
        <div className="relative max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <Reveal>
            <div className="text-center max-w-3xl mx-auto mb-14">
              <SectionBadge>Our Expertise</SectionBadge>
              <h2 className="mt-5 font-display text-3xl md:text-5xl font-bold text-white">
                Comprehensive <span className="text-gold-gradient">Tax & Business</span> Solutions
              </h2>
              <p className="mt-5 text-white/60">
                From GST to company registration — 25+ expert services designed for Indian businesses and individuals.
              </p>
            </div>
          </Reveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {SERVICES.slice(0, 9).map((s, i) => (
              <Reveal key={s.slug} delay={(i % 3) * 0.08}>
                <Link
                  to="/services"
                  className="group block h-full p-6 rounded-2xl glass border border-white/5 hover:border-gold-500/30 card-hover"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-gold-400/20 to-gold-600/10 border border-gold-500/20 flex items-center justify-center text-gold-400 group-hover:scale-110 group-hover:rotate-6 transition-transform">
                      <ServiceIcon name={s.icon} />
                    </div>
                    <span className="text-[10px] uppercase tracking-wider text-white/40 px-2 py-1 rounded-full bg-white/5">
                      {s.category}
                    </span>
                  </div>
                  <h3 className="font-display text-xl font-bold text-white mb-2 group-hover:text-gold-400 transition-colors">
                    {s.title}
                  </h3>
                  <p className="text-sm text-white/60 leading-relaxed mb-4">{s.short}</p>
                  <div className="flex items-center gap-1 text-sm text-gold-400 font-semibold">
                    Learn more
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>

          <Reveal>
            <div className="mt-12 text-center">
              <Link
                to="/services"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full glass border border-gold-500/30 text-gold-400 font-semibold hover:bg-gold-500/10 transition-colors"
              >
                View All {SERVICES.length} Services
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="relative py-20 md:py-28 bg-gradient-to-b from-transparent via-navy-900/30 to-transparent">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <Reveal>
              <div>
                <SectionBadge>Why Choose Us</SectionBadge>
                <h2 className="mt-5 font-display text-3xl md:text-5xl font-bold text-white leading-tight">
                  Expert Tax & Compliance <span className="text-gold-gradient">Services</span> You Can Trust
                </h2>
                <p className="mt-5 text-white/60">
                  Expert tax, GST, registration, and compliance support delivered through a streamlined online process across India.
                </p>
                <div className="mt-8 space-y-4">
                  {[
                    { icon: Award, title: "Expert Professionals", desc: "Team of tax experts with 5+ years experience in GST, income tax, and compliance." },
                    { icon: Zap, title: "Fast Turnaround", desc: "Most services delivered in 3–7 days, not weeks." },
                    { icon: Shield, title: "100% Data Security", desc: "Secure cloud-based document sharing with encryption and confidentiality." },
                    { icon: Users, title: "Transparent Pricing", desc: "Clear, competitive pricing with no hidden charges or surprise fees." },
                  ].map((item, i) => (
                    <div key={i} className="flex gap-4 p-4 rounded-2xl hover:bg-white/5 transition-colors">
                      <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-gold-400/20 to-gold-600/10 border border-gold-500/20 flex items-center justify-center text-gold-400 flex-shrink-0">
                        <item.icon className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="font-semibold text-white">{item.title}</div>
                        <div className="text-sm text-white/60 mt-1">{item.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.15}>
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-gold-500/20 to-navy-500/20 rounded-3xl blur-2xl"></div>
                <div className="relative rounded-3xl p-8 glass-strong border border-gold-500/20">
                  <div className="grid grid-cols-2 gap-4">
                    {[
                    { label: "Average Response", value: "< 30 min", icon: Zap },
                    { label: "Client Retention", value: "98%", icon: Users },
                    { label: "Online Process", value: "100%", icon: Award },
                    { label: "Services Offered", value: "25+", icon: TrendingUp },
                    ].map((item, i) => (
                      <div key={i} className="p-5 rounded-2xl bg-white/5 border border-white/5 text-center hover:border-gold-500/30 transition-colors">
                        <div className="w-10 h-10 rounded-xl bg-gold-500/10 flex items-center justify-center text-gold-400 mx-auto mb-3">
                          <item.icon className="w-5 h-5" />
                        </div>
                        <div className="font-display text-2xl font-bold text-gold-gradient">{item.value}</div>
                        <div className="text-xs text-white/50 mt-1">{item.label}</div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-5 p-5 rounded-2xl bg-gradient-to-r from-gold-500/10 to-transparent border border-gold-500/20">
                    <div className="flex items-center gap-2 mb-2">
                      <Star className="w-4 h-4 text-gold-400 fill-gold-400" />
                      <Star className="w-4 h-4 text-gold-400 fill-gold-400" />
                      <Star className="w-4 h-4 text-gold-400 fill-gold-400" />
                      <Star className="w-4 h-4 text-gold-400 fill-gold-400" />
                      <Star className="w-4 h-4 text-gold-400 fill-gold-400" />
                    </div>
                    <p className="text-sm text-white/80 italic">"Professional service with transparent pricing and quick turnaround. Highly recommended!"</p>
                    <div className="mt-2 text-xs text-white/50">— Ananya V., Freelance Designer</div>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="relative py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <Reveal>
            <div className="text-center max-w-3xl mx-auto mb-14">
              <SectionBadge>How It Works</SectionBadge>
              <h2 className="mt-5 font-display text-3xl md:text-5xl font-bold text-white">
                A Simple <span className="text-gold-gradient">4-Step Process</span>
              </h2>
              <p className="mt-5 text-white/60">
                From consultation to delivery — streamlined, transparent, and stress-free.
              </p>
            </div>
          </Reveal>

          <div className="relative">
            <div className="hidden md:block absolute top-12 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-gold-500/30 to-transparent"></div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {PROCESS_STEPS.map((s, i) => (
                <Reveal key={s.step} delay={i * 0.1}>
                  <div className="relative p-6 rounded-2xl glass border border-white/5 hover:border-gold-500/30 transition-colors h-full">
                    <div className="relative w-16 h-16 rounded-2xl bg-gradient-to-br from-gold-400 to-gold-600 flex items-center justify-center font-display text-2xl font-bold text-navy-950 shadow-lg shadow-gold-500/30 mb-5">
                      {s.step}
                    </div>
                    <h3 className="font-display text-xl font-bold text-white mb-2">{s.title}</h3>
                    <p className="text-sm text-white/60 leading-relaxed">{s.desc}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* TEAM */}
      <section className="relative py-20 md:py-28 bg-gradient-to-b from-transparent via-navy-900/30 to-transparent">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <Reveal>
            <div className="text-center max-w-3xl mx-auto mb-14">
              <SectionBadge>Meet Our Experts</SectionBadge>
              <h2 className="mt-5 font-display text-3xl md:text-5xl font-bold text-white">
                The <span className="text-gold-gradient">Professionals</span> Behind Our Success
              </h2>
              <p className="mt-5 text-white/60">
                Qualified, experienced, and passionate about helping you succeed.
              </p>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-3 gap-6">
            {TEAM.map((m, i) => (
              <Reveal key={m.name} delay={i * 0.12}>
                <div className="group relative rounded-3xl overflow-hidden glass-strong border border-white/5 hover:border-gold-500/30 card-hover">
                  <div className="relative h-80 overflow-hidden">
                    <img
                      src={m.image}
                      alt={m.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/50 to-transparent"></div>
                    <div className="absolute top-4 right-4 px-3 py-1 rounded-full glass-strong border border-gold-500/30 text-xs text-gold-300 font-semibold">
                      {m.experience}
                    </div>
                  </div>
                  <div className="p-6 -mt-16 relative">
                    <h3 className="font-display text-2xl font-bold text-white">{m.name}</h3>
                    <p className="text-sm text-gold-400 font-semibold mt-1">{m.role}</p>
                    <p className="text-sm text-white/60 mt-3 leading-relaxed">{m.description}</p>
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {m.skills.map((sk) => (
                        <span key={sk} className="text-[11px] px-2 py-1 rounded-full bg-gold-500/10 border border-gold-500/20 text-gold-300">
                          {sk}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal>
            <div className="mt-10 text-center">
              <Link
                to="/team"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full glass border border-gold-500/20 text-gold-400 font-semibold hover:bg-gold-500/10 transition-colors"
              >
                Learn More About Our Team
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="relative py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <Reveal>
            <div className="text-center max-w-3xl mx-auto mb-14">
              <SectionBadge>Client Love</SectionBadge>
              <h2 className="mt-5 font-display text-3xl md:text-5xl font-bold text-white">
                What Our <span className="text-gold-gradient">Clients Say</span>
              </h2>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {TESTIMONIALS.slice(0, 3).map((t, i) => (
              <Reveal key={t.name} delay={i * 0.1}>
                <div className="p-6 rounded-2xl glass border border-white/5 hover:border-gold-500/30 card-hover h-full">
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(t.rating)].map((_, k) => (
                      <Star key={k} className="w-4 h-4 text-gold-400 fill-gold-400" />
                    ))}
                  </div>
                  <p className="text-white/80 leading-relaxed">"{t.text}"</p>
                  <div className="mt-5 pt-5 border-t border-white/5 flex items-center gap-3">
                    <div className="w-11 h-11 rounded-full bg-gradient-to-br from-gold-400 to-gold-600 flex items-center justify-center text-navy-950 font-bold">
                      {t.name.charAt(0)}
                    </div>
                    <div>
                      <div className="font-semibold text-white text-sm">{t.name}</div>
                      <div className="text-xs text-white/50">{t.role}</div>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* TIMELINE / ABOUT */}
      <section className="relative py-20 md:py-28 bg-gradient-to-b from-transparent via-navy-900/30 to-transparent">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <Reveal>
            <div className="text-center max-w-3xl mx-auto mb-14">
              <SectionBadge>Our Journey</SectionBadge>
              <h2 className="mt-5 font-display text-3xl md:text-5xl font-bold text-white">
                A Legacy of <span className="text-gold-gradient">Trust & Excellence</span>
              </h2>
            </div>
          </Reveal>

          <div className="relative max-w-4xl mx-auto">
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-gold-400 via-gold-500/50 to-transparent md:-translate-x-0.5"></div>
            {TIMELINE.map((t, i) => (
              <Reveal key={t.year} delay={i * 0.1}>
                <div className={`relative pl-14 md:pl-0 pb-10 ${i % 2 === 0 ? "md:pr-[50%] md:text-right md:mr-8" : "md:pl-[50%] md:ml-8"}`}>
                  <div className={`absolute left-2 md:left-1/2 w-5 h-5 rounded-full bg-gradient-to-br from-gold-400 to-gold-600 border-4 border-navy-950 md:-translate-x-1/2 mt-1.5`}></div>
                  <div className="inline-block p-5 rounded-2xl glass border border-gold-500/20 text-left">
                    <div className="font-display text-gold-400 font-bold text-lg">{t.year}</div>
                    <div className="font-display text-white text-xl font-semibold mt-1">{t.title}</div>
                    <div className="text-sm text-white/60 mt-2">{t.desc}</div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="relative py-20 md:py-28">
        <div className="max-w-4xl mx-auto px-4 md:px-6 lg:px-8">
          <Reveal>
            <div className="text-center mb-14">
              <SectionBadge>FAQ</SectionBadge>
              <h2 className="mt-5 font-display text-3xl md:text-5xl font-bold text-white">
                Frequently Asked <span className="text-gold-gradient">Questions</span>
              </h2>
            </div>
          </Reveal>

          <div className="space-y-3">
            {FAQS.map((f, i) => (
              <Reveal key={i} delay={i * 0.05}>
                <FAQItem q={f.q} a={f.a} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-20 md:py-28">
        <div className="max-w-5xl mx-auto px-4 md:px-6 lg:px-8">
          <Reveal>
            <div className="relative rounded-3xl p-10 md:p-16 overflow-hidden bg-gradient-to-br from-navy-800 via-navy-900 to-navy-950 border border-gold-500/30 text-center">
              <div className="absolute inset-0 bg-grid opacity-30"></div>
              <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-gold-500/20 rounded-full blur-3xl"></div>
              <div className="relative">
                <Sparkles className="w-10 h-10 text-gold-400 mx-auto mb-5" />
                <h2 className="font-display text-3xl md:text-5xl font-bold text-white leading-tight">
                  Let's Build Your <span className="text-gold-gradient">Financial Success</span> Together
                </h2>
                <p className="mt-5 text-white/60 max-w-2xl mx-auto">
                  Book a free consultation today and discover how we can simplify your taxes, compliance, and business journey.
                </p>
                <div className="mt-8 flex flex-wrap justify-center gap-3">
                  <a
                    href={waLink()}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-gradient-to-r from-gold-400 to-gold-600 text-navy-950 font-semibold shadow-xl shadow-gold-500/30 hover:scale-105 transition-transform"
                  >
                    <MessageCircle className="w-5 h-5" />
                    Chat on WhatsApp
                  </a>
                  <Link
                    to="/consultation"
                    className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full glass border border-white/10 text-white font-semibold hover:border-gold-400/50 transition-colors"
                  >
                    <Calendar className="w-5 h-5" />
                    Schedule Consultation
                  </Link>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <div className={`rounded-2xl glass border transition-colors ${open ? "border-gold-500/30" : "border-white/5"}`}>
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-4 p-5 text-left"
      >
        <span className="font-semibold text-white">{q}</span>
        <ChevronDown className={`w-5 h-5 text-gold-400 flex-shrink-0 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      <motion.div
        initial={false}
        animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden"
      >
        <div className="px-5 pb-5 text-sm text-white/60 leading-relaxed">{a}</div>
      </motion.div>
    </div>
  );
}
