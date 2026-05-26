/**
 * SEO and Schema Markup Utilities
 */

export interface SEOMetaTags {
  title: string;
  description: string;
  keywords?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogUrl?: string;
  twitterCard?: string;
  twitterTitle?: string;
  twitterDescription?: string;
  twitterImage?: string;
}

/**
 * SEO content for each calculator
 */
export const CALCULATOR_SEO = {
  basic: {
    title: "Basic GST Calculator - Add or Remove GST from Amount",
    description:
      "Free online GST calculator to quickly add or remove GST from any amount. Get instant tax breakup with CGST, SGST, and IGST calculations.",
    keywords: "GST calculator, add GST, remove GST, tax calculator, CGST SGST IGST",
  },
  inclusive: {
    title: "Inclusive/Exclusive GST Calculator - Convert Prices",
    description:
      "Convert between inclusive and exclusive prices with our GST calculator. Calculate taxable value and GST amount instantly.",
    keywords: "inclusive exclusive calculator, GST inclusive, GST exclusive, price converter",
  },
  invoice: {
    title: "Invoice GST Calculator - Complete Invoice Calculation",
    description:
      "Calculate complete invoices with GST, discounts, freight, and other charges. Get detailed tax breakup and invoice preview.",
    keywords: "invoice calculator, GST invoice, invoice GST calculation, tax invoice",
  },
  reverse: {
    title: "Reverse GST Calculator - Extract GST from Final Amount",
    description:
      "Extract GST amount from a final price to find the base amount. Perfect for accounting and invoice reconciliation.",
    keywords: "reverse GST, extract GST, GST from final amount, tax extraction",
  },
  itc: {
    title: "Input Tax Credit Calculator - Calculate ITC Available",
    description:
      "Calculate available input tax credit and net GST payable. Determine if you are eligible for GST refund.",
    keywords: "input tax credit, ITC calculator, GST refund, net payable",
  },
  latefee: {
    title: "GST Late Fee & Interest Calculator - Calculate Penalties",
    description:
      "Calculate late fee and interest on delayed GST filing. Understand penalties for late GST return submission.",
    keywords: "GST late fee, GST interest, GST penalty, late filing fee",
  },
  composition: {
    title: "GST Composition Scheme Calculator - Compare Tax Options",
    description:
      "Compare normal GST vs composition scheme. Calculate tax savings and determine the best option for your business.",
    keywords: "composition scheme, GST composition, tax savings, small business GST",
  },
  turnover: {
    title: "GST Turnover Threshold Calculator - Check Registration Requirement",
    description:
      "Check if GST registration is mandatory for your business based on annual turnover. Get state-specific threshold information.",
    keywords: "GST threshold, turnover limit, GST registration requirement, business turnover",
  },
};
