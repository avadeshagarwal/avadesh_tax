import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  CalculatorCard,
  InputWithTooltip,
  SelectWithTooltip,
  ResultCard,
  CalculatorLayout,
  CopyButton,
  PrintButton,
} from "@/components/GSTComponents";
import { PageHeader } from "@/components/GSTLayout";
import { calculateCompositionScheme, formatCurrency } from "@/lib/gstCalculations";

const BUSINESS_TYPES = [
  { value: "manufacturing", label: "Manufacturing" },
  { value: "trading", label: "Trading/Retail" },
  { value: "services", label: "Services" },
];

export function CompositionSchemeCalculator() {
  const [turnover, setTurnover] = React.useState("5000000");
  const [businessType, setBusinessType] = React.useState("trading");

  const result = calculateCompositionScheme(
    parseFloat(turnover) || 0,
    businessType as "manufacturing" | "trading" | "services"
  );

  const resultText = `Turnover: ${formatCurrency(result.turnover)}, Normal GST: ${formatCurrency(result.normalGST)}, Composition Tax: ${formatCurrency(result.compositionTax)}, Savings: ${formatCurrency(result.savings)}`;

  return (
    <div>
      <PageHeader
        title="GST Composition Scheme Calculator"
        description="Compare normal GST vs composition scheme to find the best option"
      />

      <CalculatorLayout
        inputs={
          <CalculatorCard
            title="Enter Details"
            description="Provide annual turnover and business type"
          >
            <div className="space-y-4">
              <InputWithTooltip
                label="Annual Turnover"
                tooltip="Total annual business turnover (revenue)"
                value={turnover}
                onChange={(e) => setTurnover(e.target.value)}
                placeholder="Enter turnover"
                type="number"
                min="0"
                step="100000"
              />

              <SelectWithTooltip
                label="Business Type"
                tooltip="Type of business for composition rate determination"
                value={businessType}
                onValueChange={setBusinessType}
                options={BUSINESS_TYPES}
              />
            </div>
          </CalculatorCard>
        }
        results={
          <div className="space-y-4">
            <ResultCard
              title="Comparison"
              items={[
                {
                  label: "Annual Turnover",
                  value: formatCurrency(result.turnover),
                },
                {
                  label: "Normal GST (12%)",
                  value: formatCurrency(result.normalGST),
                },
                {
                  label: `Composition Tax (${result.compositionRate}%)`,
                  value: formatCurrency(result.compositionTax),
                },
              ]}
            />

            <Card className="border-emerald-200 bg-emerald-50">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg text-emerald-900">Tax Savings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-600">Annual Savings with Composition</span>
                  <span className="font-mono font-semibold text-2xl text-emerald-700">
                    {formatCurrency(result.savings)}
                  </span>
                </div>
              </CardContent>
            </Card>

            <Card className="border-slate-200 bg-slate-50">
              <CardHeader className="pb-3">
                <CardTitle className="text-base text-slate-900">Recommendation</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-slate-600">
                {result.savings > 0 ? (
                  <p>
                    <strong>Composition Scheme is beneficial!</strong> You can save{" "}
                    <span className="font-semibold text-emerald-700">{formatCurrency(result.savings)}</span> annually
                    by opting for the composition scheme.
                  </p>
                ) : (
                  <p>
                    <strong>Normal GST is better.</strong> The composition scheme does not provide significant savings
                    for your business type.
                  </p>
                )}
              </CardContent>
            </Card>

            <div className="flex gap-2">
              <CopyButton text={resultText} label="Copy Result" />
              <PrintButton label="Print" />
            </div>
          </div>
        }
      />

      {/* Information Section */}
      <Card className="mt-8 border-slate-200">
        <CardHeader>
          <CardTitle className="text-lg">Composition Scheme Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm text-slate-600">
          <p>
            <strong>What is it?</strong> The composition scheme allows small businesses to pay a fixed percentage of
            turnover as GST instead of calculating it on individual transactions.
          </p>
          <p>
            <strong>Eligibility:</strong> Available for businesses with turnover up to ₹1.5 crore. Rates vary by
            business type: Manufacturing (1%), Trading (1%), Services (5%).
          </p>
          <p>
            <strong>Benefits:</strong> Simplified compliance, lower tax burden for eligible businesses, no need to
            maintain detailed transaction records.
          </p>
          <p>
            <strong>Limitations:</strong> Cannot claim input tax credit, cannot supply to other registered businesses
            under composition, cannot make interstate supplies.
          </p>
          <p>
            <strong>Opt-in:</strong> Composition scheme is optional. You can choose to opt out and file regular GST
            returns if it's more beneficial.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

