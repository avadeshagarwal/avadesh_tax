import { BRAND, SERVICES, FAQS } from "../data/content";

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": BRAND.full,
  "url": `https://${BRAND.domain}`,
  "logo": "https://d2xsxph8kpxj0f.cloudfront.net/310519663607453869/7dz5XW3iucUDziXx7qTEk5/logo-4gsS9n9rmLh67k2oDG3hAG.png",
  "description": "Professional GST registration, income tax filing, business registration, and compliance services for businesses, startups, and individuals across India",
  "sameAs": [
    "https://www.facebook.com/avadeshagarwal",
    "https://www.instagram.com/avadeshagarwal",
    "https://www.linkedin.com/company/avadesh-agarwal-tax-consultancy"
  ],
  "contactPoint": [
    {
      "@type": "ContactPoint",
      "contactType": "Customer Service",
      "telephone": "+91-7976439089",
      "email": BRAND.email,
      "areaServed": "IN"
    },
    {
      "@type": "ContactPoint",
      "contactType": "WhatsApp Support",
      "telephone": "+91-7976439089"
    }
  ],
  "address": {
    "@type": "PostalAddress",
    "addressCountry": "IN",
    "addressRegion": "India"
  },
  "foundingDate": "2019",
  "founder": {
    "@type": "Person",
    "name": BRAND.name
  },
  "knowsAbout": [
    "GST Services",
    "Income Tax Filing",
    "Business Registration",
    "Tax Compliance",
    "Company Registration",
    "LLP Registration",
    "MSME Registration",
    "Trademark Registration",
    "Tax Planning"
  ]
};

export const serviceSchema = (service: typeof SERVICES[0]) => ({
  "@context": "https://schema.org",
  "@type": "Service",
  "name": service.title,
  "description": service.description,
  "provider": {
    "@type": "Organization",
    "name": BRAND.full,
    "url": `https://${BRAND.domain}`
  },
  "areaServed": "IN",
  "serviceType": service.category,
  "url": `https://${BRAND.domain}/services#${service.slug}`
});

export const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": FAQS.map((faq) => ({
    "@type": "Question",
    "name": faq.q,
    "acceptedAnswer": {
      "@type": "Answer",
      "text": faq.a
    }
  }))
};

export const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "name": BRAND.full,
  "image": "https://d2xsxph8kpxj0f.cloudfront.net/310519663607453869/7dz5XW3iucUDziXx7qTEk5/logo-4gsS9n9rmLh67k2oDG3hAG.png",
  "description": "Expert GST, income tax, business registration, and compliance services for businesses and individuals",
  "url": `https://${BRAND.domain}`,
  "telephone": "+91-7976439089",
  "email": BRAND.email,
  "priceRange": "$$",
  "areaServed": "IN",
  "serviceArea": {
    "@type": "Country",
    "name": "India"
  },
  "knowsLanguage": "en",
  "brand": {
    "@type": "Brand",
    "name": BRAND.full
  }
};

export const breadcrumbSchema = (items: Array<{ name: string; url: string }>) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": items.map((item, index) => ({
    "@type": "ListItem",
    "position": index + 1,
    "name": item.name,
    "item": item.url
  }))
});
