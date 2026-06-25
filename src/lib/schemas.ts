import { BRAND, SERVICES, FAQS } from "../data/content";

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": BRAND.full,
  "url": `https://${BRAND.domain}`,
  "logo": `https://${BRAND.domain}/logo.png`,
  "description": "Professional GST, income tax, business registration, and compliance services for businesses across India",
  "sameAs": [
    "https://www.facebook.com/avadeshagarwal",
    "https://www.instagram.com/avadeshagarwal",
    "https://www.linkedin.com/company/avadesh-agarwal-tax-consultancy"
  ],
  "contactPoint": {
    "@type": "ContactPoint",
    "contactType": "Customer Service",
    "telephone": "+91-7976439089",
    "email": BRAND.email,
    "areaServed": "IN"
  },
  "address": {
    "@type": "PostalAddress",
    "addressCountry": "IN",
    "addressRegion": "India"
  },
  "foundingDate": "2019",
  "founder": {
    "@type": "Person",
    "name": BRAND.name
  }
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
  "@type": "LocalBusiness",
  "name": BRAND.full,
  "image": `https://${BRAND.domain}/logo.png`,
  "description": "Professional tax and compliance services",
  "url": `https://${BRAND.domain}`,
  "telephone": "+91-7976439089",
  "email": BRAND.email,
  "priceRange": "$$",
  "areaServed": {
    "@type": "State",
    "name": "India"
  },
  "serviceArea": {
    "@type": "State",
    "name": "India"
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
