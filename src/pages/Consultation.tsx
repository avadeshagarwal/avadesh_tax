import { useState } from "react";
import { Calendar, Clock, MessageCircle, CheckCircle2, User, Video } from "lucide-react";
import { Reveal, SectionBadge, PageHero } from "../components/ui";
import { BRAND, waLink } from "../data/content";

export default function Consultation() {
  const [form, setForm] = useState({
    name: "", email: "", phone: "", business: "",
    date: "", time: "", mode: "Video Call", service: "", notes: "",
  });
  const [booked, setBooked] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = `🗓 New Consultation Booking%0A%0A👤 Name: ${form.name}%0A📞 Phone: ${form.phone}%0A📧 Email: ${form.email}%0A🏢 Business: ${form.business}%0A%0A📅 Date: ${form.date}%0A⏰ Time: ${form.time}%0A🎥 Mode: ${form.mode}%0A📋 Service: ${form.service}%0A%0A📝 Notes: ${form.notes}`;
    window.open(`https://wa.me/${BRAND.whatsapp}?text=${text}`, "_blank");
    setBooked(true);
  };

  return (
    <>
      <PageHero
        badge="Book Consultation"
        title={<>Schedule Your <span className="text-gold-gradient">Free Consultation</span></>}
        subtitle="Book a free 15-minute consultation with our experts. Available via video call, phone, or WhatsApp chat."
      />

      <section className="py-10">
        <div className="max-w-5xl mx-auto px-4 md:px-6 lg:px-8">
          {/* Info cards */}
          <div className="grid md:grid-cols-3 gap-4 mb-10">
            {[
              { icon: Clock, t: "15 Minutes", d: "Free consultation" },
              { icon: Video, t: "Video / Phone", d: "Your preferred mode" },
              { icon: User, t: "Expert Advisor", d: "Domain specialist" },
            ].map((item, i) => (
              <Reveal key={item.t} delay={i * 0.08}>
                <div className="p-5 rounded-2xl glass border border-white/5 text-center">
                  <div className="w-11 h-11 mx-auto rounded-xl bg-gradient-to-br from-gold-400 to-gold-600 flex items-center justify-center mb-3">
                    <item.icon className="w-5 h-5 text-navy-950" />
                  </div>
                  <div className="font-display font-bold text-white">{item.t}</div>
                  <div className="text-sm text-white/60 mt-1">{item.d}</div>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal>
            <div className="relative rounded-3xl p-8 md:p-12 glass-strong border border-gold-500/20 overflow-hidden">
              <div className="absolute -top-20 -right-20 w-96 h-96 bg-gold-500/10 rounded-full blur-3xl"></div>
              <div className="relative">
                {booked ? (
                  <div className="text-center py-10">
                    <div className="w-20 h-20 mx-auto rounded-full bg-green-500/20 border border-green-500/30 flex items-center justify-center mb-5">
                      <CheckCircle2 className="w-10 h-10 text-green-400" />
                    </div>
                    <h2 className="font-display text-3xl font-bold text-white">Booking Sent!</h2>
                    <p className="mt-3 text-white/70 max-w-md mx-auto">
                      Your consultation request has been sent via WhatsApp. We'll confirm your slot within 30 minutes.
                    </p>
                    <button
                      onClick={() => setBooked(false)}
                      className="mt-6 px-6 py-3 rounded-full glass border border-white/10 text-white font-semibold"
                    >
                      Book Another
                    </button>
                  </div>
                ) : (
                  <>
                    <div className="mb-6">
                      <SectionBadge>Consultation Booking</SectionBadge>
                      <h2 className="mt-4 font-display text-3xl font-bold text-white">Pick a Time That Works</h2>
                      <p className="mt-2 text-sm text-white/60">All fields marked * are required.</p>
                    </div>

                    <form onSubmit={submit} className="space-y-4">
                      <div className="grid md:grid-cols-2 gap-4">
                        <Field label="Full Name *"><input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="field" /></Field>
                        <Field label="Phone (WhatsApp) *"><input required type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="field" /></Field>
                      </div>
                      <div className="grid md:grid-cols-2 gap-4">
                        <Field label="Email *"><input required type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="field" /></Field>
                        <Field label="Business / Company"><input value={form.business} onChange={(e) => setForm({ ...form, business: e.target.value })} className="field" placeholder="Optional" /></Field>
                      </div>
                      <div className="grid md:grid-cols-2 gap-4">
                        <Field label="Preferred Date *"><input required type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} className="field" /></Field>
                        <Field label="Preferred Time *">
                          <select required value={form.time} onChange={(e) => setForm({ ...form, time: e.target.value })} className="field">
                            <option value="" className="bg-navy-900">Select time slot</option>
                            <option className="bg-navy-900">10:00 AM</option>
                            <option className="bg-navy-900">11:00 AM</option>
                            <option className="bg-navy-900">12:00 PM</option>
                            <option className="bg-navy-900">2:00 PM</option>
                            <option className="bg-navy-900">3:00 PM</option>
                            <option className="bg-navy-900">4:00 PM</option>
                            <option className="bg-navy-900">5:00 PM</option>
                            <option className="bg-navy-900">6:00 PM</option>
                          </select>
                        </Field>
                      </div>
                      <div className="grid md:grid-cols-2 gap-4">
                        <Field label="Consultation Mode *">
                          <select required value={form.mode} onChange={(e) => setForm({ ...form, mode: e.target.value })} className="field">
                            <option className="bg-navy-900">Video Call</option>
                            <option className="bg-navy-900">Phone Call</option>
                            <option className="bg-navy-900">WhatsApp Chat</option>
                          </select>
                        </Field>
                        <Field label="Service Required *">
                          <select required value={form.service} onChange={(e) => setForm({ ...form, service: e.target.value })} className="field">
                            <option value="" className="bg-navy-900">Select service</option>
                            <option className="bg-navy-900">GST Services</option>
                            <option className="bg-navy-900">Income Tax / ITR</option>
                            <option className="bg-navy-900">Company Registration</option>
                            <option className="bg-navy-900">International Taxation</option>
                            <option className="bg-navy-900">Trademark / IEC</option>
                            <option className="bg-navy-900">Other / General</option>
                          </select>
                        </Field>
                      </div>
                      <Field label="Additional Notes">
                        <textarea rows={4} value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} placeholder="Briefly describe your requirement..." className="field resize-none" />
                      </Field>

                      <button
                        type="submit"
                        className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-gradient-to-r from-gold-400 to-gold-600 text-navy-950 font-semibold shadow-lg shadow-gold-500/30 hover:scale-[1.02] transition-transform"
                      >
                        <Calendar className="w-5 h-5" /> Confirm & Send via WhatsApp
                      </button>
                      <p className="text-xs text-white/40 text-center">
                        By booking, you agree to receive a confirmation via WhatsApp.
                      </p>
                    </form>
                  </>
                )}
              </div>
            </div>
          </Reveal>

          <Reveal>
            <div className="mt-10 text-center p-6 rounded-2xl glass border border-white/5">
              <div className="flex items-center justify-center gap-2 text-gold-400 font-semibold">
                <MessageCircle className="w-5 h-5" /> Prefer to message directly?
              </div>
              <a href={waLink()} target="_blank" rel="noreferrer" className="inline-block mt-2 text-sm text-white/70 hover:text-gold-400 transition-colors underline">
                Chat with us on WhatsApp →
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      <style>{`
        .field { width: 100%; padding: 0.75rem 1rem; border-radius: 0.75rem; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); color: white; outline: none; transition: border-color 0.2s; }
        .field::placeholder { color: rgba(255,255,255,0.3); }
        .field:focus { border-color: #d4a21a; }
      `}</style>
    </>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-xs font-semibold uppercase tracking-wider text-white/60 mb-2">{label}</label>
      {children}
    </div>
  );
}
