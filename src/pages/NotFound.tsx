import { Link } from "react-router-dom";
import { Home as HomeIcon, ArrowRight } from "lucide-react";

export default function NotFound() {
  return (
    <section className="min-h-[80vh] flex items-center justify-center px-4 pt-32 pb-20">
      <div className="text-center max-w-xl">
        <div className="font-display text-8xl md:text-9xl font-bold text-gold-gradient mb-4">404</div>
        <h1 className="font-display text-3xl md:text-4xl font-bold text-white mb-3">Page Not Found</h1>
        <p className="text-white/60 mb-8">
          The page you're looking for doesn't exist or has been moved. Let's get you back on track.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-gold-400 to-gold-600 text-navy-950 font-semibold hover:scale-105 transition-transform"
          >
            <HomeIcon className="w-4 h-4" /> Go Home
          </Link>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full glass border border-white/10 text-white font-semibold"
          >
            Contact Us <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
