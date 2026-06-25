export const BRAND = {
  name: "Avadesh Agarwal",
  full: "Avadesh Agarwal Tax Consultancy",
  tagline: "Professional GST, Taxation & Business Registration Services Across India",
  email: "avadeshagarwal6@gmail.com",
  phone: "+91 7976439089",
  phoneDisplay: "+91 79764 39089",
  whatsapp: "917976439089",
  domain: "avadeshagarwal.com",
};

export const waLink = (msg = "Hello, I would like to consult about your CA & tax services.") =>
  `https://wa.me/${BRAND.whatsapp}?text=${encodeURIComponent(msg)}`;

export const telLink = `tel:+917976439089`;
export const mailLink = (subject = "Consultation Request") =>
  `mailto:${BRAND.email}?subject=${encodeURIComponent(subject)}`;

export const NAV_LINKS = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/services", label: "Services" },
  { to: "/gst-calculator", label: "GST Calculator" },
  {
    to: "#",
    label: "Specialized",
    children: [
      { to: "/gst-services", label: "GST Services" },
      { to: "/income-tax", label: "Income Tax Services" },
      { to: "/business-registration", label: "Business Registration" },
    ],
  },
  { to: "/team", label: "Our Experts" },
  { to: "/contact", label: "Contact" },
];

export const STATS = [
  { value: 5, suffix: "+", label: "Years of Experience" },
  { value: 25, suffix: "+", label: "Services Offered" },
  { value: 28, suffix: "", label: "States Served" },
  { value: 100, suffix: "%", label: "Online Process" },
];

export const TRUST_BADGES = [
  "5+ Years Experience",
  "Serving Clients Across India",
  "Professional Tax Experts",
  "Fast & Hassle-Free Process",
  "Expert Tax & Compliance Services",
  "Trusted Compliance Solutions",
];

export type Service = {
  slug: string;
  title: string;
  short: string;
  description: string;
  icon: string;
  category: "GST" | "Income Tax" | "Registration" | "Advisory" | "Compliance";
  features: string[];
};

export const SERVICES: Service[] = [
  { slug: "gst-registration", title: "GST Registration", short: "Get GSTIN in days, not weeks.", description: "End-to-end GST registration for businesses crossing threshold limits or voluntarily opting for registration.", icon: "FileCheck2", category: "GST", features: ["Document preparation", "GSTIN allotment", "Liaison with department", "Post-registration support"] },
  { slug: "gst-return-filing", title: "GST Return Filing", short: "Timely GSTR-1, 3B & annual returns.", description: "Accurate and on-time filing of all GST returns including GSTR-1, GSTR-3B, GSTR-9, and reconciliation.", icon: "FileSpreadsheet", category: "GST", features: ["Monthly / quarterly returns", "ITC reconciliation", "E-invoice support", "Penalty avoidance"] },
  { slug: "gst-compliance", title: "GST Compliance", short: "Stress-free ongoing compliance.", description: "Comprehensive compliance management — notices, audits, amendments, and refunds handled by experts.", icon: "ShieldCheck", category: "GST", features: ["Notice replies", "Audit support", "Refund claims", "Amendments & cancellations"] },
  { slug: "itr-filing", title: "Income Tax Return (ITR) Filing", short: "For salaried, business & professionals.", description: "ITR filing for individuals, HUFs, firms, companies, and NRIs — maximizing deductions legally.", icon: "FileText", category: "Income Tax", features: ["All ITR forms (1-7)", "Capital gains", "Foreign income", "Refund tracking"] },
  { slug: "personal-tax-consultancy", title: "Personal Income Tax Consultancy", short: "Save tax the smart way.", description: "Personalized tax planning, investment advisory under new/old regime, and year-round advisory.", icon: "UserCheck", category: "Income Tax", features: ["Tax planning", "Regime selection", "Investment advisory", "Year-round support"] },
  { slug: "international-taxation", title: "International Taxation", short: "Cross-border tax expertise.", description: "DTAA benefits, NRI taxation, transfer pricing, foreign income structuring, and expat advisory.", icon: "Globe2", category: "Income Tax", features: ["DTAA advisory", "NRI taxation", "Transfer pricing", "Form 10F / TRC"] },
  { slug: "tax-planning", title: "Tax Planning", short: "Legally minimize your tax burden.", description: "Strategic tax planning for individuals and businesses aligned with current Finance Act provisions.", icon: "TrendingUp", category: "Advisory", features: ["Old vs new regime", "Business deductions", "Wealth structuring", "Family tax optimization"] },
  { slug: "business-tax-consultancy", title: "Business Tax Consultancy", short: "End-to-end business tax advisory.", description: "Comprehensive tax advisory for MSMEs, startups, and established businesses.", icon: "Briefcase", category: "Advisory", features: ["Corporate tax", "Matters with ROC", "Cash-flow tax planning", "Growth structuring"] },
  { slug: "tds-filing", title: "TDS Filing", short: "Quarterly TDS returns made easy.", description: "TDS deduction, quarterly return filing (24Q, 26Q, 27Q), Form 16, and lower deduction certificates.", icon: "Receipt", category: "Compliance", features: ["Quarterly returns", "Form 16 / 16A", "Lower deduction certificate", "Default rectification"] },
  { slug: "msme-registration", title: "MSME Registration", short: "Udyam registration in a few clicks.", description: "Get your Udyam registration and unlock government schemes, subsidies, and tender benefits.", icon: "Factory", category: "Registration", features: ["Udyam certificate", "Scheme eligibility", "Subsidy advisory", "Renewals & updates"] },
  { slug: "company-registration", title: "Company Registration", short: "Private Limited in 7 days.", description: "Incorporate a Private Limited Company with DSC, DIN, MOA, AOA, PAN, TAN, and bank account support.", icon: "Building2", category: "Registration", features: ["Name reservation", "MCA filing", "PAN / TAN / GST", "Post-incorporation"] },
  { slug: "llp-registration", title: "LLP Registration", short: "Flexible structure, limited liability.", description: "Set up a Limited Liability Partnership with complete MCA compliance and partnership deed.", icon: "Handshake", category: "Registration", features: ["LLP agreement", "DSC & DPIN", "PAN / TAN / GST", "Annual filings"] },
  { slug: "partnership-registration", title: "Partnership Registration", short: "Firm registration & deed drafting.", description: "Register your partnership firm with a robust partnership deed and registrar filing.", icon: "Users", category: "Registration", features: ["Partnership deed", "Registrar filing", "PAN / TAN", "Compliance calendar"] },
  { slug: "proprietorship-registration", title: "Proprietorship Registration", short: "Start solo, start right.", description: "Complete proprietorship setup — MSME, GST, shop & establishment, and current account.", icon: "UserRound", category: "Registration", features: ["MSME + GST", "Shop Act license", "Current account help", "Brand name protection"] },
  { slug: "huf-registration", title: "HUF Registration & Compliance", short: "Unlock HUF tax benefits.", description: "HUF creation, PAN, bank account, deed drafting, and ongoing ITR compliance.", icon: "HeartHandshake", category: "Registration", features: ["HUF deed", "HUF PAN", "Bank account", "ITR filing"] },
  { slug: "startup-registration", title: "Startup Registration", short: "DPIIT recognition & tax benefits.", description: "DPIIT registration, 80-IAC tax holiday, and access to Startup India schemes.", icon: "Rocket", category: "Registration", features: ["DPIIT recognition", "80-IAC benefits", "Angel tax relief", "IP fast-track"] },
  { slug: "roc-compliance", title: "ROC Compliance", short: "Stay compliant, avoid penalties.", description: "Annual ROC filings, board resolutions, event-based forms, and director KYC.", icon: "Scale", category: "Compliance", features: ["AOC-4 / MGT-7", "DIR-3 KYC", "Event-based forms", "Penalty waivers"] },
  { slug: "trademark-registration", title: "Trademark Registration", short: "Protect your brand identity.", description: "Trademark search, application filing, objection handling, and registration certificate.", icon: "Trademark", category: "Registration", features: ["Trademark search", "Class selection", "Application filing", "Objection handling"] },
  { slug: "iec-registration", title: "Import Export Code (IEC)", short: "Start global trade quickly.", description: "IEC registration with DGFT for businesses looking to import or export goods and services.", icon: "Ship", category: "Registration", features: ["DGFT application", "AD code support", "RCMC guidance", "Modification / renewal"] },
  { slug: "pan-tan-services", title: "PAN & TAN Services", short: "New, correction, and reprint.", description: "PAN application, correction, e-PAN, TAN allotment, and Form 49B services.", icon: "CreditCard", category: "Compliance", features: ["New PAN / TAN", "Correction", "Reprint / e-PAN", "NRI PAN"] },
  { slug: "accounting-bookkeeping", title: "Accounting & Bookkeeping", short: "Clean books, clear business.", description: "Cloud-based bookkeeping, monthly MIS, Tally / Zoho Books, and financial reporting.", icon: "Calculator", category: "Advisory", features: ["Daily bookkeeping", "Monthly MIS", "Bank reconciliation", "Financial reports"] },
  { slug: "audit-support", title: "Audit Support Services", short: "Statutory, tax & internal audits.", description: "Coordination with auditors, data preparation, schedules, and closure support.", icon: "ClipboardCheck", category: "Compliance", features: ["Statutory audit", "Tax audit", "Internal audit", "Stock audit"] },
  { slug: "dsc", title: "Digital Signature Certificate", short: "Class-3 DSC in 24 hours.", description: "Class-3 DSC for individuals, directors, and organizations — with video KYC support.", icon: "PenTool", category: "Compliance", features: ["Individual / Org DSC", "Video KYC", "USB token delivery", "Renewal support"] },
  { slug: "tax-notice", title: "Tax Notice Handling", short: "Expert replies, zero stress.", description: "Handling of notices from Income Tax, GST, and TDS departments with precise replies.", icon: "MailWarning", category: "Advisory", features: ["Scrutiny notices", "Demand notices", "Reply drafting", "Hearing representation"] },
  { slug: "online-consultation", title: "Online CA Consultation", short: "Talk to an expert, anytime.", description: "Video / phone consultations with qualified tax experts — from anywhere in India.", icon: "Video", category: "Advisory", features: ["Video calls", "Phone calls", "Document review", "Written opinions"] },
];

export const TEAM = [
  {
    name: "Pooja Aminani",
    role: "International Taxation & Personal Tax Expert",
    experience: "5+ Years Experience",
    description:
      "Specialized in international taxation, personal income tax planning, tax advisory, and individual compliance services.",
    image: "/images/team-pooja.jpg",
    skills: ["International Tax", "DTAA", "Personal ITR", "Tax Planning"],
  },
  {
    name: "Shreya Khandelwal",
    role: "GST Compliance Specialist",
    experience: "5+ Years Experience",
    description:
      "Expert in GST compliance, GST filing, GST registration, notices, and business taxation support.",
    image: "/images/team-shreya.jpg",
    skills: ["GST Returns", "Refunds", "Notice Handling", "Reconciliation"],
  },
  {
    name: "Shobhit Khandelwal",
    role: "Business Registration & HUF Specialist",
    experience: "5+ Years Experience",
    description:
      "Specialized in company registrations, LLP setup, HUF registration, startup registrations, and legal business compliance.",
    image: "/images/team-shobhit.jpg",
    skills: ["Pvt Ltd Setup", "LLP", "HUF", "Trademark"],
  },
];

export const FAQS = [
  { q: "Who can benefit from your consultancy services?", a: "Any Indian individual, freelancer, startup, MSME, or established business needing GST, income tax, registration, or compliance services. We serve clients across all 28 states and 8 UTs." },
  { q: "Do you provide services online across India?", a: "Yes. 100% of our services are delivered online via secure video consultations, e-signatures, and cloud document exchange — so location is never a barrier." },
  { q: "How are your fees structured?", a: "We offer transparent, competitive pricing for all services with no hidden charges. Our streamlined online process helps us deliver quality services efficiently. Contact us for a custom quote based on your specific needs." },
  { q: "How quickly can I get a GST registration done?", a: "Typically 3–7 working days, subject to departmental processing and document readiness. We handle end-to-end documentation and follow-ups." },
  { q: "Is my financial data safe with you?", a: "Absolutely. We use encrypted document sharing, secure cloud storage, and sign NDAs on request. Your data is never shared with third parties." },
  { q: "Can you help with pending notices from the department?", a: "Yes. We specialize in handling scrutiny, demand, and mismatch notices from GST and Income Tax departments with precise, legally sound replies." },
];

export const TESTIMONIALS = [
  { name: "Rohit Sharma", role: "Founder, Sharma Traders", text: "GST registration and monthly filings handled flawlessly. Their attention to detail saved us from multiple notices. Highly recommended for MSMEs.", rating: 5 },
  { name: "Ananya Verma", role: "Freelance Designer", text: "The team helped me understand my tax obligations and identified deductions I had missed. The entire process was straightforward and well-explained.", rating: 5 },
  { name: "Vikram Mehta", role: "Director, Mehta Industries", text: "From company incorporation to trademark registration, the team handled everything professionally. Clear communication and timely delivery throughout.", rating: 5 },
  { name: "Priya Nair", role: "NRI Entrepreneur", text: "Their international taxation expertise helped me structure my Indian investments tax-efficiently under DTAA. Exceptional knowledge.", rating: 5 },
  { name: "Arjun Kapoor", role: "Startup Founder", text: "DPIIT registration, 80-IAC tax holiday, GST — all sorted by the team. They feel like an in-house finance department.", rating: 5 },
];

export const PROCESS_STEPS = [
  { step: "01", title: "Free Consultation", desc: "Book a free 15-minute call to discuss your requirements and get expert advice." },
  { step: "02", title: "Document Collection", desc: "Securely upload documents via our encrypted cloud — we guide you on what's needed." },
  { step: "03", title: "Expert Processing", desc: "Our qualified professionals handle your filing, registration, or compliance task." },
  { step: "04", title: "Delivery & Support", desc: "Receive completed documents, certificates, and ongoing support — all on time." },
];

export const TIMELINE = [
  { year: "2019", title: "The Beginning", desc: "Started as an independent tax practice serving local businesses in Rajasthan." },
  { year: "2021", title: "Going Digital", desc: "Expanded services online to serve clients across India with secure digital workflows." },
  { year: "2023", title: "Team Expansion", desc: "Onboarded specialized experts in international taxation, GST, and company law." },
  { year: "2025", title: "Growing Client Base", desc: "Serving clients across 28 states with a focus on quality service and client satisfaction." },
];
