import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Analytics } from "@vercel/analytics/react";
import { OrganizationSchema, FAQSchema } from "./components/SchemaMarkup";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import WhatsAppFloat from "./components/WhatsAppFloat";
import Loader from "./components/Loader";
import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import GSTServices from "./pages/GSTServices";
import GSTCalculator from "./pages/GSTCalculator";
import IncomeTaxServices from "./pages/IncomeTaxServices";
import BusinessRegistration from "./pages/BusinessRegistration";
import Team from "./pages/Team";
import Contact from "./pages/Contact";
import Consultation from "./pages/Consultation";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsConditions from "./pages/TermsConditions";
import Disclaimer from "./pages/Disclaimer";
import RefundPolicy from "./pages/RefundPolicy";
import NotFound from "./pages/NotFound";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <div className="min-h-screen relative overflow-hidden" style={{ background: "var(--bg-base)", color: "var(--fg-base)" }}>
      <OrganizationSchema />
      <FAQSchema />
      <Loader />
      <ScrollToTop />
      <Navbar />
      <main className="relative z-10">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/gst-services" element={<GSTServices />} />
          <Route path="/gst-calculator" element={<GSTCalculator />} />
          <Route path="/income-tax" element={<IncomeTaxServices />} />
          <Route path="/business-registration" element={<BusinessRegistration />} />
          <Route path="/team" element={<Team />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/consultation" element={<Consultation />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-conditions" element={<TermsConditions />} />
          <Route path="/disclaimer" element={<Disclaimer />} />
          <Route path="/refund-policy" element={<RefundPolicy />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
      <WhatsAppFloat />
      <Analytics />
    </div>
  );
}
