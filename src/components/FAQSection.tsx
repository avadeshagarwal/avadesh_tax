import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface FAQItem {
  question: string;
  answer: string;
}

const FAQ_ITEMS: FAQItem[] = [
  {
    question: "What is GST and why is it important?",
    answer:
      "GST (Goods and Services Tax) is a comprehensive indirect tax levied on the supply of goods and services. It replaced multiple indirect taxes and is important for businesses to ensure compliance with tax regulations and maintain proper financial records.",
  },
  {
    question: "What are the different GST rates in India?",
    answer:
      "The main GST rates are 0%, 5%, 12%, 18%, and 28%. The rate depends on the nature of goods or services. Essential items like food and medicines are typically at 0% or 5%, while luxury items are at 28%. Our calculator supports all standard rates plus custom rates.",
  },
  {
    question: "What is the difference between CGST, SGST, and IGST?",
    answer:
      "CGST (Central GST) and SGST (State GST) are applicable for intrastate transactions (within the same state), while IGST (Integrated GST) is applicable for interstate transactions. For intrastate transactions, CGST and SGST are equal and together make up the total GST rate.",
  },
  {
    question: "When is GST registration mandatory?",
    answer:
      "GST registration is mandatory when your annual turnover exceeds ₹40 lakhs (or ₹20 lakhs for special category states). You must register within 30 days of crossing this threshold. However, you can voluntarily register even if below the threshold.",
  },
  {
    question: "What is Input Tax Credit (ITC)?",
    answer:
      "ITC allows registered businesses to claim credit for GST paid on purchases of goods and services used in their business. This credit can be used to reduce the GST liability on sales. ITC is a key benefit of GST registration.",
  },
  {
    question: "What is the Composition Scheme?",
    answer:
      "The Composition Scheme allows small businesses with turnover up to ₹1.5 crore to pay a fixed percentage of turnover as GST instead of calculating it on individual transactions. This simplifies compliance but comes with limitations like no ITC eligibility.",
  },
  {
    question: "What are the penalties for late GST filing?",
    answer:
      "Late filing of GST returns attracts a late fee of ₹100 per day or 5% of tax payable (whichever is higher) and interest at 18% per annum. Our calculator helps you estimate these penalties based on the delay.",
  },
  {
    question: "How do I calculate the base amount from a GST-inclusive price?",
    answer:
      "Use the Reverse GST calculator or the Inclusive/Exclusive calculator. The formula is: Base Amount = Final Amount / (1 + GST Rate / 100). For example, if the final price is ₹1,180 with 18% GST, the base is ₹1,000.",
  },
  {
    question: "Can I claim ITC on all purchases?",
    answer:
      "No, ITC can only be claimed on purchases that are directly related to your taxable business supplies. Purchases for personal use, certain services, and specific items like vehicles are not eligible for ITC. Always maintain proper documentation.",
  },
  {
    question: "What is the difference between exclusive and inclusive pricing?",
    answer:
      "Exclusive pricing shows the base price before GST is added, while inclusive pricing shows the final price with GST included. Most retail prices are inclusive, while B2B invoices typically show exclusive prices with GST calculated separately.",
  },
];

export function FAQSection() {
  return (
    <section className="py-12 bg-white">
      <div className="max-w-4xl mx-auto px-4">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-slate-900 mb-2">Frequently Asked Questions</h2>
          <p className="text-slate-600">Find answers to common questions about GST calculations and compliance</p>
        </div>

        <Accordion type="single" collapsible className="space-y-2">
          {FAQ_ITEMS.map((item, index) => (
            <AccordionItem key={index} value={`item-${index}`} className="border border-slate-200 rounded-lg">
              <AccordionTrigger className="px-4 py-3 hover:bg-slate-50 transition-colors">
                <span className="text-left font-medium text-slate-900">{item.question}</span>
              </AccordionTrigger>
              <AccordionContent className="px-4 py-3 text-slate-600 bg-slate-50">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>

      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: FAQ_ITEMS.map((item) => ({
            "@type": "Question",
            name: item.question,
            acceptedAnswer: {
              "@type": "Answer",
              text: item.answer,
            },
          })),
        })}
      </script>
    </section>
  );
}
