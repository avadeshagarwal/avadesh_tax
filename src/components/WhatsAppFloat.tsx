import { MessageCircle } from "lucide-react";
import { waLink } from "../data/content";

export default function WhatsAppFloat() {
  return (
    <a
      href={waLink("Hi, I'd like to consult about your CA & tax services.")}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-5 right-5 md:bottom-8 md:right-8 z-50 group"
    >
      <div className="relative">
        <div className="absolute inset-0 rounded-full bg-green-500 pulse-ring"></div>
        <div className="relative w-14 h-14 md:w-16 md:h-16 rounded-full bg-gradient-to-br from-green-400 to-green-600 shadow-2xl shadow-green-500/40 flex items-center justify-center hover:scale-110 transition-transform">
          <MessageCircle className="w-7 h-7 md:w-8 md:h-8 text-white fill-white" />
        </div>
      </div>
      <span className="hidden md:block absolute right-full mr-3 top-1/2 -translate-y-1/2 whitespace-nowrap px-3 py-1.5 rounded-lg bg-navy-800 border border-gold-500/20 text-xs text-white font-medium opacity-0 group-hover:opacity-100 transition-opacity shadow-lg">
        Chat with us →
      </span>
    </a>
  );
}
