import { ArrowRight, CheckCircle2, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Reveal, SectionBadge, PageHero } from "../components/ui";
import ServiceIcon from "../components/ServiceIcon";
import { SERVICES, waLink } from "../data/content";

export default function GSTServices() {
  const gst = SERVICES.filter((s) => s.category === "GST");

  return (
    <>
      <PageHero
        badge="GST Services"
        title={<>Complete <span className="text-gold-gradient">GST Solutions</span> for Indian Businesses</>}
        subtitle="From registration to monthly filings and audit support — end-to-end GST services by compliance experts."
      />

      <section className="py-10">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 grid md:grid-cols-3 gap-5">
          {gst.map((s, i) => (
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
                  <MessageCircle className="w-4 h-4" />
                  Get Started
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Compliance workflow */}
      <section className="relative py-20 bg-gradient-to-b from-transparent via-navy-900/30 to-transparent">
        <div className="max-w-6xl mx-auto px-4 md:px-6 lg:px-8">
          <Reveal>
            <div className="text-center mb-12">
              <SectionBadge>GST Workflow</SectionBadge>
              <h2 className="mt-5 font-display text-3xl md:text-4xl font-bold text-white">
                Our <span className="text-gold-gradient">GST Compliance</span> Process
              </h2>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-4 gap-4">
            {[
              { n: "01", t: "Data Collection", d: "Secure upload of invoices, bank statements & purchase records." },
              { n: "02", t: "Reconciliation", d: "ITC reconciliation with GSTR-2A/2B for maximum claim accuracy." },
              { n: "03", t: "Return Filing", d: "GSTR-1, 3B & annual returns filed on time with full compliance." },
              { n: "04", t: "Post-Filing", d: "Acknowledgements, records, and ongoing notice support if needed." },
            ].map((s, i) => (
              <Reveal key={s.n} delay={i * 0.1}>
                <div className="relative p-6 rounded-2xl glass border border-white/5 hover:border-gold-500/30 card-hover h-full">
                  <div className="font-display text-4xl font-bold text-gold-gradient mb-3">{s.n}</div>
                  <div className="font-display text-lg font-bold text-white mb-2">{s.t}</div>
                  <div className="text-sm text-white/60">{s.d}</div>
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
              Need <span className="text-gold-gradient">GST Expert Help?</span>
            </h2>
            <p className="mt-4 text-white/60">Our GST specialists are a message away.</p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <a href={waLink("Hi, I need help with GST services.")} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-gradient-to-r from-gold-400 to-gold-600 text-navy-950 font-semibold hover:scale-105 transition-transform">
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
