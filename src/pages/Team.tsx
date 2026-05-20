import { Award, Mail, Phone, MessageCircle, Sparkles } from "lucide-react";
import { Reveal, PageHero } from "../components/ui";
import { TEAM, BRAND, waLink, telLink } from "../data/content";

export default function Team() {
  return (
    <>
      <PageHero
        badge="Our Experts"
        title={<>Meet the <span className="text-gold-gradient">Professionals</span> Behind Our Success</>}
        subtitle="A team of certified tax experts, CAs, and compliance specialists — each with 5+ years of domain expertise."
      />

      <section className="py-10">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            {TEAM.map((m, i) => (
              <Reveal key={m.name} delay={i * 0.12}>
                <div className="group relative rounded-3xl overflow-hidden glass-strong border border-white/5 hover:border-gold-500/30 card-hover">
                  <div className="relative h-96 overflow-hidden">
                    <img
                      src={m.image}
                      alt={m.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/60 to-transparent"></div>
                    <div className="absolute top-4 left-4 inline-flex items-center gap-1 px-3 py-1.5 rounded-full glass-strong border border-gold-500/30">
                      <Award className="w-3.5 h-3.5 text-gold-400" />
                      <span className="text-xs font-semibold text-gold-300">{m.experience}</span>
                    </div>
                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="font-display text-2xl font-bold text-white">{m.name}</h3>
                      <p className="text-sm text-gold-400 font-semibold mt-1">{m.role}</p>
                    </div>
                  </div>
                  <div className="p-6">
                    <p className="text-sm text-white/70 leading-relaxed mb-5">{m.description}</p>
                    <div className="mb-5">
                      <div className="text-xs uppercase tracking-wider text-white/40 mb-2">Specializations</div>
                      <div className="flex flex-wrap gap-1.5">
                        {m.skills.map((sk) => (
                          <span key={sk} className="text-[11px] px-2.5 py-1 rounded-full bg-gold-500/10 border border-gold-500/20 text-gold-300">
                            {sk}
                          </span>
                        ))}
                      </div>
                    </div>
                    <a
                      href={waLink(`Hi, I would like to consult with ${m.name}.`)}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 w-full justify-center py-2.5 rounded-xl bg-gradient-to-r from-gold-400/10 to-gold-600/10 border border-gold-500/20 text-gold-400 text-sm font-semibold hover:bg-gold-500/10 transition-colors"
                    >
                      <MessageCircle className="w-4 h-4" />
                      Consult with {m.name.split(" ")[0]}
                    </a>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Team highlights */}
          <Reveal>
            <div className="mt-20 p-10 rounded-3xl glass-strong border border-gold-500/20">
              <div className="text-center mb-8">
                <Sparkles className="w-8 h-8 text-gold-400 mx-auto mb-3" />
                <h3 className="font-display text-2xl md:text-3xl font-bold text-white">
                  Why Our Team <span className="text-gold-gradient">Stands Out</span>
                </h3>
              </div>
              <div className="grid md:grid-cols-3 gap-6">
                {[
                  { t: "Certified Experts", d: "Qualified professionals with CA, CS, and specialized tax certifications." },
                  { t: "Domain Specialization", d: "Each expert focuses on their core domain — ensuring best-in-class service." },
                  { t: "Continuous Learning", d: "Regular training on latest tax amendments, GST updates, and case laws." },
                ].map((item) => (
                  <div key={item.t} className="text-center">
                    <div className="font-display text-xl font-bold text-white mb-2">{item.t}</div>
                    <p className="text-sm text-white/60">{item.d}</p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 md:px-6 lg:px-8 text-center">
          <Reveal>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-white">
              Want to Talk to an <span className="text-gold-gradient">Expert?</span>
            </h2>
            <p className="mt-4 text-white/60">Reach out directly — we respond within 30 minutes.</p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <a href={waLink()} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-gradient-to-r from-gold-400 to-gold-600 text-navy-950 font-semibold hover:scale-105 transition-transform">
                <MessageCircle className="w-5 h-5" /> WhatsApp Us
              </a>
              <a href={telLink} className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full glass border border-white/10 text-white font-semibold">
                <Phone className="w-5 h-5" /> {BRAND.phoneDisplay}
              </a>
              <a href={`mailto:${BRAND.email}`} className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full glass border border-white/10 text-white font-semibold">
                <Mail className="w-5 h-5" /> Email
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
