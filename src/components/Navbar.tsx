import { Link, NavLink, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { Menu, X, ChevronDown, Phone, Sparkles, Sun, Moon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { NAV_LINKS, BRAND, waLink } from "../data/content";
import { useTheme } from "./ThemeProvider";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [dropOpen, setDropOpen] = useState(false);
  const { pathname } = useLocation();
  const { theme, toggle } = useTheme();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
    setDropOpen(false);
  }, [pathname]);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-white/95 dark:bg-navy-950/80 backdrop-blur-xl border-b border-gold-500/10 dark:border-gold-500/10 shadow-lg dark:shadow-[0_8px_40px_-20px_rgba(11,18,48,0.18)]"
          : "bg-white/50 dark:bg-transparent backdrop-blur-sm"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="relative w-11 h-11 rounded-xl bg-gradient-to-br from-gold-400 via-gold-500 to-gold-700 flex items-center justify-center shadow-lg shadow-gold-500/30 group-hover:scale-105 transition-transform">
              <span className="font-display text-navy-950 font-black text-xl">A</span>
              <div className="absolute inset-0 rounded-xl bg-gold-400/30 blur-md opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </div>
            <div className="hidden sm:block leading-tight">
              <div className="font-display text-navy-950 dark:text-white text-lg font-bold tracking-tight">
                {BRAND.name}
              </div>
              <div className="text-[10px] uppercase tracking-[0.2em] text-gold-600 dark:text-gold-400 font-semibold">
                Tax Consultancy
              </div>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map((link) => {
              if (link.children) {
                return (
                  <div
                    key={link.label}
                    className="relative"
                    onMouseEnter={() => setDropOpen(true)}
                    onMouseLeave={() => setDropOpen(false)}
                  >
                    <button className="px-4 py-2 text-sm font-medium text-navy-950/70 dark:text-white/80 hover:text-gold-600 dark:hover:text-gold-400 transition-colors flex items-center gap-1">
                      {link.label}
                      <ChevronDown className={`w-4 h-4 transition-transform ${dropOpen ? "rotate-180" : ""}`} />
                    </button>
                    <AnimatePresence>
                      {dropOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 8 }}
                          transition={{ duration: 0.2 }}
                          className="absolute top-full left-0 pt-2 w-64"
                        >
                          <div className="glass-strong rounded-xl p-2 shadow-2xl">
                            {link.children.map((c) => (
                              <Link
                                key={c.to}
                                to={c.to}
                                className="block px-4 py-2.5 rounded-lg text-sm text-navy-950/70 dark:text-white/80 hover:bg-gold-500/10 hover:text-gold-600 dark:hover:text-gold-400 transition-colors"
                              >
                                {c.label}
                              </Link>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              }
              return (
                <NavLink
                  key={link.to}
                  to={link.to}
                  end={link.to === "/"}
                  className={({ isActive }) =>
                    `relative px-4 py-2 text-sm font-medium transition-colors ${
                      isActive ? "text-gold-600 dark:text-gold-400" : "text-navy-950/70 dark:text-white/80 hover:text-gold-600 dark:hover:text-gold-400"
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      {link.label}
                      {isActive && (
                        <motion.span
                          layoutId="nav-underline"
                          className="absolute left-3 right-3 -bottom-0.5 h-0.5 bg-gradient-to-r from-transparent via-gold-400 to-transparent"
                        />
                      )}
                    </>
                  )}
                </NavLink>
              );
            })}
          </nav>

          {/* Right CTA */}
          <div className="flex items-center gap-3">
            <a
              href={`tel:${BRAND.phone}`}
              className="hidden md:flex items-center gap-2 text-sm text-white/80 hover:text-gold-400 transition-colors"
            >
              <Phone className="w-4 h-4" />
              <span className="font-medium">{BRAND.phoneDisplay}</span>
            </a>
            <button
              onClick={toggle}
              aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
              className="relative w-10 h-10 rounded-full glass flex items-center justify-center text-white/90 hover:text-gold-400 hover:border-gold-400/40 transition-all"
            >
              <AnimatePresence mode="wait" initial={false}>
                {theme === "dark" ? (
                  <motion.span
                    key="moon"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="absolute inset-0 flex items-center justify-center"
                  >
                    <Moon className="w-4.5 h-4.5" style={{ width: 18, height: 18 }} />
                  </motion.span>
                ) : (
                  <motion.span
                    key="sun"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="absolute inset-0 flex items-center justify-center"
                  >
                    <Sun className="w-4.5 h-4.5" style={{ width: 18, height: 18 }} />
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
            <Link
              to="/consultation"
              className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-gold-400 to-gold-600 text-navy-950 font-semibold text-sm shadow-lg shadow-gold-500/30 hover:shadow-gold-500/50 hover:scale-105 transition-all"
            >
              <Sparkles className="w-4 h-4" />
              Book Consultation
            </Link>
            <button
              className="lg:hidden w-10 h-10 rounded-lg glass flex items-center justify-center text-white"
              onClick={() => setOpen(!open)}
              aria-label="Toggle menu"
            >
              {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden glass-strong border-t border-gold-500/10 overflow-hidden"
          >
            <nav className="px-4 py-4 flex flex-col gap-1">
              {NAV_LINKS.map((link) => {
                if (link.children) {
                  return (
                    <div key={link.label} className="flex flex-col">
                      <div className="px-3 py-2 text-xs uppercase tracking-wider text-gold-400 font-semibold">
                        {link.label}
                      </div>
                      {link.children.map((c) => (
                        <Link
                          key={c.to}
                          to={c.to}
                          className="pl-6 pr-3 py-2.5 text-sm text-white/80 hover:text-gold-400 hover:bg-gold-500/5 rounded-lg"
                        >
                          {c.label}
                        </Link>
                      ))}
                    </div>
                  );
                }
                return (
                  <NavLink
                    key={link.to}
                    to={link.to}
                    end={link.to === "/"}
                    className={({ isActive }) =>
                      `px-3 py-2.5 rounded-lg text-sm font-medium ${
                        isActive ? "bg-gold-500/10 text-gold-400" : "text-white/80 hover:bg-white/5"
                      }`
                    }
                  >
                    {link.label}
                  </NavLink>
                );
              })}
              <div className="mt-3 pt-3 border-t border-white/5 flex flex-col gap-2">
                <a
                  href={`tel:${BRAND.phone}`}
                  className="flex items-center justify-center gap-2 py-2.5 rounded-lg glass text-white/90 text-sm"
                >
                  <Phone className="w-4 h-4" /> Call {BRAND.phoneDisplay}
                </a>
                <a
                  href={waLink()}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center py-2.5 rounded-lg bg-gradient-to-r from-gold-400 to-gold-600 text-navy-950 font-semibold text-sm"
                >
                  Book Free Consultation
                </a>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
