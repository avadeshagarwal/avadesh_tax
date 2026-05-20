import { ArrowRight, CheckCircle2, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Reveal, SectionBadge, PageHero } from "../components/ui";
import ServiceIcon from "../components/ServiceIcon";
import { SERVICES, waLink } from "../data/content";

export default function BusinessRegistration() {
  const regs = SERVICES.filter((s) => s.category === "Registration");

  return (
    <>
      <PageHero
        badge="Business Registration"
        title={<>Launch Your <span className="text-gold-gradient">Business the Right Way</span></>}
        subtitle="From Pvt Ltd to Trademark — complete registration and compliance services for every type of business."
      />

      <section className="py-10">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {regs.map((s, i) => (
              <Reveal key={s.slug} delay={i * 0.05}>
                <div className="p-6 rounded-2xl glass border border-white/5 hover:border-gold-500/30 card-hover h-full">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-gold-400 to-gold-600 flex items-center justify-center text-navy-950 mb-4">
                    <ServiceIcon name={s.icon} className="w-6 h-6" />
                  </div>
                  <h3 className="font-display text-xl font-bold text-white mb-2">{s.title}</h3>
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
                    href={waLink(`Hi, I need help with ${s.title}.`)}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 text-sm text-gold-400 font-semibold"
                  >
                    Enquire Now <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison */}
      <section className="relative py-20 bg-gradient-to-b from-transparent via-navy-900/30 to-transparent">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <Reveal>
            <div className="text-center mb-12">
              <SectionBadge>Which Structure?</SectionBadge>
              <h2 className="mt-5 font-display text-3xl md:text-4xl font-bold text-white">
                Choose the Right <span className="text-gold-gradient">Business Structure</span>
              </h2>
            </div>
          </Reveal>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[700px] rounded-2xl overflow-hidden glass border border-white/5">
              <thead>
                <tr className="bg-navy-800/50 border-b border-white/5">
                  <th className="text-left p-4 text-sm font-semibold text-white/80">Feature</th>
                  <th className="text-left p-4 text-sm font-semibold text-gold-400">Proprietorship</th>
                  <th className="text-left p-4 text-sm font-semibold text-gold-400">LLP</th>
                  <th className="text-left p-4 text-sm font-semibold text-gold-400">Pvt Ltd</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {[
                  ["Liability", "Unlimited", "Limited", "Limited"],
                  ["Compliance", "Low", "Moderate", "High"],
                  ["Fundraising", "Limited", "Moderate", "Excellent"],
                  ["Credibility", "Basic", "Good", "High"],
                  ["Best For", "Solo businesses", "Professionals", "Startups & Scale-ups"],
                ].map((row, i) => (
                  <tr key={i} className="border-b border-white/5 last:border-0 hover:bg-white/5 transition-colors">
                    {row.map((cell, k) => (
                      <td key={k} className={`p-4 ${k === 0 ? "font-semibold text-white" : "text-white/70"}`}>
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 md:px-6 lg:px-8 text-center">
          <Reveal>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-white">
              Not Sure Which <span className="text-gold-gradient">Structure to Choose?</span>
            </h2>
            <p className="mt-4 text-white/60">Book a free consultation — we'll help you pick the best option.</p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <a href={waLink("Hi, I need help choosing a business structure.")} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-gradient-to-r from-gold-400 to-gold-600 text-navy-950 font-semibold hover:scale-105 transition-transform">
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
