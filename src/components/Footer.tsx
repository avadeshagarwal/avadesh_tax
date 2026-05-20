import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, ArrowUpRight, Sparkles } from "lucide-react";
import { BRAND, SERVICES, waLink } from "../data/content";

export default function Footer() {
  const quickLinks = [
    { to: "/", label: "Home" },
    { to: "/about", label: "About Us" },
    { to: "/services", label: "Our Services" },
    { to: "/team", label: "Our Experts" },
    { to: "/contact", label: "Contact" },
    { to: "/consultation", label: "Book Consultation" },
  ];
  const serviceLinks = [
    { to: "/gst-services", label: "GST Services" },
    { to: "/income-tax", label: "Income Tax" },
    { to: "/business-registration", label: "Business Registration" },
  ];

  return (
    <footer className="relative bg-navy-950 border-t border-gold-500/10 pt-20 pb-8 overflow-hidden">
      {/* Background accents */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-gold-500/5 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-navy-500/10 rounded-full blur-3xl pointer-events-none"></div>

      {/* CTA Strip */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 mb-16">
        <div className="relative rounded-3xl overflow-hidden p-8 md:p-12 bg-gradient-to-br from-navy-800 via-navy-900 to-navy-950 border border-gold-500/20">
          <div className="absolute inset-0 bg-grid opacity-30"></div>
          <div className="absolute -top-20 -right-20 w-80 h-80 bg-gold-500/20 rounded-full blur-3xl"></div>
          <div className="relative flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-500/10 border border-gold-500/20 mb-3">
                <Sparkles className="w-3.5 h-3.5 text-gold-400" />
                <span className="text-xs font-semibold text-gold-300 uppercase tracking-wider">
                  Free Consultation
                </span>
              </div>
              <h3 className="font-display text-2xl md:text-4xl font-bold text-white">
                Ready to Simplify Your <span className="text-gold-gradient">Taxes & Compliance?</span>
              </h3>
              <p className="text-white/60 mt-2 max-w-xl">
                Talk to our expert today — no obligations, just clear answers.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href={waLink()}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-gold-400 to-gold-600 text-navy-950 font-semibold shadow-lg shadow-gold-500/30 hover:scale-105 transition-transform"
              >
                Chat on WhatsApp <ArrowUpRight className="w-4 h-4" />
              </a>
              <Link
                to="/consultation"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full glass border border-white/10 text-white font-semibold hover:border-gold-400/50 transition-colors"
              >
                Book Consultation
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main grid */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Brand */}
        <div>
          <Link to="/" className="flex items-center gap-3 mb-4">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-gold-400 via-gold-500 to-gold-700 flex items-center justify-center shadow-lg shadow-gold-500/30">
              <span className="font-display text-navy-950 font-black text-xl">A</span>
            </div>
            <div>
              <div className="font-display text-white font-bold">{BRAND.name}</div>
              <div className="text-[10px] uppercase tracking-[0.2em] text-gold-400 font-semibold">
                Tax Consultancy
              </div>
            </div>
          </Link>
          <p className="text-sm text-white/60 leading-relaxed mb-5">
            Premium freelance CA & tax consultancy helping businesses and individuals across India with GST, income tax, registrations, and compliance — professionally and affordably.
          </p>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass border border-gold-500/20 text-xs text-gold-300 font-medium">
            <MapPin className="w-3.5 h-3.5" /> Serving Clients Across India
          </div>
        </div>

        {/* Quick links */}
        <div>
          <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Quick Links</h4>
          <ul className="space-y-2.5">
            {quickLinks.map((l) => (
              <li key={l.to}>
                <Link to={l.to} className="text-sm text-white/60 hover:text-gold-400 transition-colors inline-flex items-center gap-1 group">
                  <span className="w-1 h-1 rounded-full bg-gold-400/0 group-hover:bg-gold-400 transition-colors"></span>
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Services */}
        <div>
          <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Our Services</h4>
          <ul className="space-y-2.5 mb-4">
            {serviceLinks.map((l) => (
              <li key={l.to}>
                <Link to={l.to} className="text-sm text-white/60 hover:text-gold-400 transition-colors">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="pt-4 border-t border-white/5">
            <div className="text-xs text-white/40 uppercase tracking-wider mb-2">Popular</div>
            <div className="flex flex-wrap gap-1.5">
              {SERVICES.slice(0, 6).map((s) => (
                <span key={s.slug} className="text-[11px] px-2 py-1 rounded-full glass text-white/70">
                  {s.title.split(" ")[0]}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Contact */}
        <div>
          <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Get in Touch</h4>
          <ul className="space-y-3 mb-5">
            <li>
              <a href={`tel:${BRAND.phone}`} className="flex items-start gap-3 text-sm text-white/70 hover:text-gold-400 transition-colors">
                <Phone className="w-4 h-4 mt-0.5 text-gold-400" />
                <span>{BRAND.phoneDisplay}</span>
              </a>
            </li>
            <li>
              <a href={`mailto:${BRAND.email}`} className="flex items-start gap-3 text-sm text-white/70 hover:text-gold-400 transition-colors break-all">
                <Mail className="w-4 h-4 mt-0.5 text-gold-400 flex-shrink-0" />
                <span>{BRAND.email}</span>
              </a>
            </li>
          </ul>
          <a
            href={waLink()}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-sm font-medium hover:bg-green-500/20 transition-colors"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
            </svg>
            Chat on WhatsApp
          </a>
        </div>
      </div>

      {/* Bottom */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 mt-12 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-xs text-white/40 text-center md:text-left">
          © {new Date().getFullYear()} {BRAND.full}. All rights reserved.
        </p>
        <div className="flex items-center gap-5 text-xs text-white/40">
          <span>Privacy Policy</span>
          <span>Terms of Service</span>
          <span>Disclaimer</span>
        </div>
      </div>
    </footer>
  );
}
