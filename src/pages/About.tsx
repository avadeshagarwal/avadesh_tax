import { Link } from "react-router-dom";
import { Award, Shield, Users, Zap, CheckCircle2, Heart, Target, Lightbulb } from "lucide-react";
import { Reveal, SectionBadge, PageHero, Counter } from "../components/ui";
import { TIMELINE, STATS, TRUST_BADGES, waLink } from "../data/content";

export default function About() {
  return (
    <>
      <PageHero
        badge="About Us"
        title={<>Built on <span className="text-gold-gradient">Trust</span>, Powered by <span className="text-gold-gradient">Expertise</span></>}
        subtitle="We are a premium freelance CA & tax consultancy committed to delivering world-class financial services to businesses and individuals across India."
      />

      {/* Vision & Mission */}
      <section className="relative py-16">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 grid md:grid-cols-2 gap-6">
          <Reveal>
            <div className="p-8 rounded-3xl glass-strong border border-gold-500/20 h-full">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-gold-400 to-gold-600 flex items-center justify-center mb-5">
                <Target className="w-6 h-6 text-navy-950" />
              </div>
              <h3 className="font-display text-2xl font-bold text-white mb-3">Our Mission</h3>
              <p className="text-white/70 leading-relaxed">
                To simplify taxes, compliance, and business registration for every Indian entrepreneur, professional, and business owner — through expert advice, transparent pricing, and digital-first service delivery.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="p-8 rounded-3xl glass-strong border border-gold-500/20 h-full">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-gold-400 to-gold-600 flex items-center justify-center mb-5">
                <Lightbulb className="w-6 h-6 text-navy-950" />
              </div>
              <h3 className="font-display text-2xl font-bold text-white mb-3">Our Vision</h3>
              <p className="text-white/70 leading-relaxed">
                To become India's most trusted freelance CA consultancy — known for premium service, ethical practices, and making professional financial guidance accessible to every Indian business, big or small.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Story */}
      <section className="relative py-16">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 grid lg:grid-cols-2 gap-12 items-center">
          <Reveal>
            <div>
              <SectionBadge>Our Story</SectionBadge>
              <h2 className="mt-5 font-display text-3xl md:text-4xl font-bold text-white leading-tight">
                From a Small Practice to a <span className="text-gold-gradient">Pan-India Consultancy</span>
              </h2>
              <div className="mt-6 space-y-4 text-white/70 leading-relaxed">
                <p>
                  Founded in 2019, Avadesh Agarwal Tax Consultancy began as a small independent practice with a single mission: deliver professional CA services without the big-firm price tag.
                </p>
                <p>
                  Today, we serve over 1,200 clients across 28 Indian states — from solopreneurs and freelancers to MSMEs and established companies. Our digital-first approach means you get expert advice from anywhere in India, with secure cloud-based document sharing and transparent online workflows.
                </p>
                <p>
                  What sets us apart is our team of specialized experts — each with 5+ years of domain experience in international taxation, GST compliance, and business registration.
                </p>
              </div>
              <div className="mt-8 flex flex-wrap gap-2">
                {TRUST_BADGES.map((b) => (
                  <div key={b} className="flex items-center gap-2 px-3 py-1.5 rounded-full glass border border-gold-500/20 text-xs text-white/70">
                    <CheckCircle2 className="w-3.5 h-3.5 text-gold-400" />
                    {b}
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-gold-500/20 to-navy-500/20 rounded-3xl blur-2xl"></div>
              <div className="relative p-10 rounded-3xl glass-strong border border-gold-500/20">
                <div className="grid grid-cols-2 gap-6">
                  {STATS.map((s) => (
                    <div key={s.label} className="text-center">
                      <div className="font-display text-4xl md:text-5xl font-bold text-gold-gradient">
                        <Counter target={s.value} suffix={s.suffix} />
                      </div>
                      <div className="text-sm text-white/60 mt-2">{s.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Values */}
      <section className="relative py-20">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <Reveal>
            <div className="text-center max-w-3xl mx-auto mb-14">
              <SectionBadge>Our Values</SectionBadge>
              <h2 className="mt-5 font-display text-3xl md:text-5xl font-bold text-white">
                What We <span className="text-gold-gradient">Stand For</span>
              </h2>
            </div>
          </Reveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { icon: Shield, title: "Integrity", desc: "Ethical practices and complete transparency in every engagement." },
              { icon: Award, title: "Excellence", desc: "Premium service quality that exceeds client expectations." },
              { icon: Heart, title: "Client-First", desc: "Your success is our priority — we treat your business like our own." },
              { icon: Zap, title: "Efficiency", desc: "Fast, accurate, and hassle-free delivery — every single time." },
            ].map((v, i) => (
              <Reveal key={v.title} delay={i * 0.08}>
                <div className="p-6 rounded-2xl glass border border-white/5 hover:border-gold-500/30 card-hover h-full text-center">
                  <div className="w-14 h-14 mx-auto rounded-2xl bg-gradient-to-br from-gold-400 to-gold-600 flex items-center justify-center mb-4">
                    <v.icon className="w-7 h-7 text-navy-950" />
                  </div>
                  <h3 className="font-display text-xl font-bold text-white mb-2">{v.title}</h3>
                  <p className="text-sm text-white/60">{v.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="relative py-20 bg-gradient-to-b from-transparent via-navy-900/30 to-transparent">
        <div className="max-w-4xl mx-auto px-4 md:px-6 lg:px-8">
          <Reveal>
            <div className="text-center mb-14">
              <SectionBadge>Our Journey</SectionBadge>
              <h2 className="mt-5 font-display text-3xl md:text-5xl font-bold text-white">
                Milestones That <span className="text-gold-gradient">Define Us</span>
              </h2>
            </div>
          </Reveal>
          <div className="relative">
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-gold-400 via-gold-500/50 to-transparent md:-translate-x-0.5"></div>
            {TIMELINE.map((t, i) => (
              <Reveal key={t.year} delay={i * 0.1}>
                <div className={`relative pl-14 md:pl-0 pb-10 ${i % 2 === 0 ? "md:pr-[50%] md:text-right md:mr-8" : "md:pl-[50%] md:ml-8"}`}>
                  <div className="absolute left-2 md:left-1/2 w-5 h-5 rounded-full bg-gradient-to-br from-gold-400 to-gold-600 border-4 border-navy-950 md:-translate-x-1/2 mt-1.5"></div>
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

      {/* CTA */}
      <section className="relative py-20">
        <div className="max-w-5xl mx-auto px-4 md:px-6 lg:px-8 text-center">
          <Reveal>
            <h2 className="font-display text-3xl md:text-5xl font-bold text-white">
              Ready to Work With <span className="text-gold-gradient">India's Trusted Experts?</span>
            </h2>
            <p className="mt-5 text-white/60 max-w-2xl mx-auto">
              Let's discuss your requirements and find the best solution for your business.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <a href={waLink()} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-gradient-to-r from-gold-400 to-gold-600 text-navy-950 font-semibold shadow-xl shadow-gold-500/30 hover:scale-105 transition-transform">
                <Users className="w-5 h-5" /> Chat With Us
              </a>
              <Link to="/consultation" className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full glass border border-white/10 text-white font-semibold">
                Book Consultation
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
