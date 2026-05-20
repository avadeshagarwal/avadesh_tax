import { useState } from "react";
import { Mail, Phone, MapPin, MessageCircle, Send, CheckCircle2, Clock } from "lucide-react";
import { Reveal, SectionBadge, PageHero } from "../components/ui";
import { BRAND, waLink, telLink, mailLink } from "../data/content";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", service: "", message: "" });
  const [sent, setSent] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = `New enquiry from ${form.name}%0APhone: ${form.phone}%0AEmail: ${form.email}%0AService: ${form.service}%0A%0A${form.message}`;
    window.open(`https://wa.me/${BRAND.whatsapp}?text=${text}`, "_blank");
    setSent(true);
    setTimeout(() => {
      setSent(false);
      setForm({ name: "", email: "", phone: "", service: "", message: "" });
    }, 3000);
  };

  return (
    <>
      <PageHero
        badge="Contact Us"
        title={<>Let's Start a <span className="text-gold-gradient">Conversation</span></>}
        subtitle="Have a question or need expert advice? We're here to help. Reach out through any channel — we respond within 30 minutes."
      />

      <section className="py-10">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 grid lg:grid-cols-5 gap-8">
          {/* Contact info */}
          <div className="lg:col-span-2 space-y-4">
            <Reveal>
              <div className="p-6 rounded-2xl glass-strong border border-gold-500/20">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center mb-4">
                  <MessageCircle className="w-6 h-6 text-white" />
                </div>
                <div className="text-xs text-white/50 uppercase tracking-wider">WhatsApp</div>
                <a href={waLink()} target="_blank" rel="noreferrer" className="font-display text-xl font-bold text-white hover:text-gold-400 transition-colors">
                  {BRAND.phoneDisplay}
                </a>
                <p className="text-sm text-white/60 mt-2">Fastest way to reach us — replies within 30 min.</p>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="p-6 rounded-2xl glass border border-white/5">
                <div className="w-12 h-12 rounded-xl bg-gold-500/10 border border-gold-500/20 flex items-center justify-center mb-4">
                  <Phone className="w-6 h-6 text-gold-400" />
                </div>
                <div className="text-xs text-white/50 uppercase tracking-wider">Call Us</div>
                <a href={telLink} className="font-display text-xl font-bold text-white hover:text-gold-400 transition-colors">
                  {BRAND.phoneDisplay}
                </a>
                <p className="text-sm text-white/60 mt-2">Mon–Sat, 10:00 AM – 7:00 PM IST</p>
              </div>
            </Reveal>
            <Reveal delay={0.15}>
              <div className="p-6 rounded-2xl glass border border-white/5">
                <div className="w-12 h-12 rounded-xl bg-gold-500/10 border border-gold-500/20 flex items-center justify-center mb-4">
                  <Mail className="w-6 h-6 text-gold-400" />
                </div>
                <div className="text-xs text-white/50 uppercase tracking-wider">Email</div>
                <a href={mailLink()} className="font-display text-lg font-bold text-white hover:text-gold-400 transition-colors break-all">
                  {BRAND.email}
                </a>
                <p className="text-sm text-white/60 mt-2">We respond to emails within 2 hours.</p>
              </div>
            </Reveal>
            <Reveal delay={0.2}>
              <div className="p-6 rounded-2xl glass border border-white/5">
                <div className="w-12 h-12 rounded-xl bg-gold-500/10 border border-gold-500/20 flex items-center justify-center mb-4">
                  <MapPin className="w-6 h-6 text-gold-400" />
                </div>
                <div className="text-xs text-white/50 uppercase tracking-wider">Service Area</div>
                <div className="font-display text-xl font-bold text-white">Pan-India</div>
                <p className="text-sm text-white/60 mt-2">100% online services across 28 states & 8 UTs.</p>
              </div>
            </Reveal>
          </div>

          {/* Form */}
          <div className="lg:col-span-3">
            <Reveal>
              <div className="relative rounded-3xl p-8 md:p-10 glass-strong border border-gold-500/20 overflow-hidden">
                <div className="absolute -top-20 -right-20 w-80 h-80 bg-gold-500/10 rounded-full blur-3xl"></div>
                <div className="relative">
                  <div className="mb-6">
                    <SectionBadge>Send a Message</SectionBadge>
                    <h2 className="mt-4 font-display text-3xl font-bold text-white">Get in Touch</h2>
                    <p className="mt-2 text-sm text-white/60">We'll get back to you within 30 minutes during business hours.</p>
                  </div>

                  <form onSubmit={submit} className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <Input label="Your Name" value={form.name} onChange={(v) => setForm({ ...form, name: v })} required />
                      <Input label="Phone" value={form.phone} onChange={(v) => setForm({ ...form, phone: v })} required type="tel" />
                    </div>
                    <Input label="Email" value={form.email} onChange={(v) => setForm({ ...form, email: v })} required type="email" />
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-white/60 mb-2">
                        Service Required
                      </label>
                      <select
                        value={form.service}
                        onChange={(e) => setForm({ ...form, service: e.target.value })}
                        required
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:border-gold-400 focus:outline-none transition-colors"
                      >
                        <option value="" className="bg-navy-900">Select a service</option>
                        <option className="bg-navy-900">GST Registration</option>
                        <option className="bg-navy-900">GST Return Filing</option>
                        <option className="bg-navy-900">Income Tax Return Filing</option>
                        <option className="bg-navy-900">Company Registration</option>
                        <option className="bg-navy-900">LLP Registration</option>
                        <option className="bg-navy-900">Trademark Registration</option>
                        <option className="bg-navy-900">Other</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-white/60 mb-2">
                        Your Message
                      </label>
                      <textarea
                        value={form.message}
                        onChange={(e) => setForm({ ...form, message: e.target.value })}
                        required
                        rows={5}
                        placeholder="Tell us briefly what you need help with..."
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:border-gold-400 focus:outline-none transition-colors resize-none"
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={sent}
                      className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-gradient-to-r from-gold-400 to-gold-600 text-navy-950 font-semibold shadow-lg shadow-gold-500/30 hover:scale-[1.02] transition-transform disabled:opacity-70"
                    >
                      {sent ? (
                        <>
                          <CheckCircle2 className="w-5 h-5" /> Sent! Opening WhatsApp...
                        </>
                      ) : (
                        <>
                          <Send className="w-5 h-5" /> Send via WhatsApp
                        </>
                      )}
                    </button>
                    <p className="text-xs text-white/40 text-center flex items-center justify-center gap-1">
                      <Clock className="w-3 h-3" /> Average response time: under 30 minutes
                    </p>
                  </form>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}

function Input({
  label, value, onChange, required, type = "text",
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  required?: boolean;
  type?: string;
}) {
  return (
    <div>
      <label className="block text-xs font-semibold uppercase tracking-wider text-white/60 mb-2">
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:border-gold-400 focus:outline-none transition-colors"
      />
    </div>
  );
}
