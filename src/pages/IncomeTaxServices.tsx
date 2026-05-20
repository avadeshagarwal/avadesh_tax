import { ArrowRight, CheckCircle2, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Reveal, SectionBadge, PageHero } from "../components/ui";
import ServiceIcon from "../components/ServiceIcon";
import { SERVICES, waLink } from "../data/content";

export default function IncomeTaxServices() {
  const tax = SERVICES.filter((s) => s.category === "Income Tax");

  return (
    <>
      <PageHero
        badge="Income Tax Services"
        title={<>Smart <span className="text-gold-gradient">Tax Planning</span> & Filing for Everyone</>}
        subtitle="For salaried professionals, freelancers, businesses, and NRIs — maximize savings and stay 100% compliant."
      />

      <section className="py-10">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {tax.map((s, i) => (
              <Reveal key={s.slug} delay={i * 0.08}>
                <div className="p-6 rounded-2xl glass-strong border border-gold-500/20 card-hover h-full">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-gold-400 to-gold-600 flex items-center justify-center text-navy-950 mb-5">
                    <ServiceIcon name={s.icon} className="w-7 h-7" />
                  </div>
                  <h3 className="font-display text-2xl font-bold text-white mb-2">{s.title}</h3>
                  <p className="text-sm text-white/60 leading-relaxed mb-4">{s.description}</p>
                  <ul className="space-y-2 mb-6">
                    {s.features.map((f) => (
                      <li key={f} className="flex items-start gap-2 text-sm text-white/70">
                        <CheckCircle2 className="w-4 h-4 text-gold-400 mt-0.5 flex-shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <a
                    href={waLink(`Hi, I need help with ${s.title}.`)}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 text-sm text-gold-400 font-semibold"
                  >
                    <MessageCircle className="w-4 h-4" /> Get Started <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison */}
      <section className="relative py-20 bg-gradient-to-b from-transparent via-navy-900/30 to-transparent">
        <div className="max-w-6xl mx-auto px-4 md:px-6 lg:px-8">
          <Reveal>
            <div className="text-center mb-12">
              <SectionBadge>Old vs New Regime</SectionBadge>
              <h2 className="mt-5 font-display text-3xl md:text-4xl font-bold text-white">
                Which <span className="text-gold-gradient">Tax Regime</span> is Right for You?
              </h2>
              <p className="mt-4 text-white/60">We help you analyze both and pick the most tax-efficient option.</p>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                title: "Old Regime",
                tag: "Deduction-Friendly",
                points: [
                  "80C, 80D, HRA, LTA deductions allowed",
                  "Ideal if you have home loan, investments",
                  "Better for high-income with exemptions",
                  "Requires detailed record-keeping",
                ],
              },
              {
                title: "New Regime",
                tag: "Simplified",
                points: [
                  "Lower slab rates, no deductions needed",
                  "Default regime from FY 2023-24",
                  "Ideal for those with fewer exemptions",
                  "Faster filing, minimal documentation",
                ],
              },
            ].map((r, i) => (
              <Reveal key={r.title} delay={i * 0.1}>
                <div className="p-8 rounded-3xl glass-strong border border-gold-500/20 h-full">
                  <div className="flex items-center justify-between mb-5">
                    <h3 className="font-display text-2xl font-bold text-white">{r.title}</h3>
                    <span className="text-xs px-3 py-1 rounded-full bg-gold-500/10 border border-gold-500/20 text-gold-300">{r.tag}</span>
                  </div>
                  <ul className="space-y-3">
                    {r.points.map((p) => (
                      <li key={p} className="flex items-start gap-3 text-white/70">
                        <CheckCircle2 className="w-5 h-5 text-gold-400 mt-0.5 flex-shrink-0" />
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 md:px-6 lg:px-8 text-center">
          <Reveal>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-white">
              Ready to <span className="text-gold-gradient">Save More Tax?</span>
            </h2>
            <p className="mt-4 text-white/60">Get expert tax planning and filing support from certified professionals.</p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <a href={waLink("Hi, I need help with income tax services.")} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-gradient-to-r from-gold-400 to-gold-600 text-navy-950 font-semibold hover:scale-105 transition-transform">
                <MessageCircle className="w-5 h-5" /> Chat on WhatsApp
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
