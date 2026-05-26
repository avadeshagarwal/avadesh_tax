import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
import { calculateInclusiveExclusive, formatCurrency } from "@/lib/gstCalculations";

const GST_RATES = [
  { value: "5", label: "5%" },
  { value: "12", label: "12%" },
  { value: "18", label: "18%" },
  { value: "28", label: "28%" },
  { value: "custom", label: "Custom Rate" },
];

export function InclusiveExclusiveCalculator() {
  const [type, setType] = React.useState<"inclusive" | "exclusive">("inclusive");
  const [amount, setAmount] = React.useState("1000");
  const [gstRate, setGstRate] = React.useState("18");
  const [customRate, setCustomRate] = React.useState("");

  const rate = gstRate === "custom" ? parseFloat(customRate) || 0 : parseFloat(gstRate);
  const result = calculateInclusiveExclusive(parseFloat(amount) || 0, rate, type === "inclusive");

  const resultText = `Taxable Value: ${formatCurrency(result.taxableValue)}, GST: ${formatCurrency(result.gstAmount)}, Total: ${formatCurrency(result.totalAmount)}`;

  return (
    <div>
      <PageHeader
        title="Inclusive / Exclusive Calculator"
        description="Convert between inclusive and exclusive prices with automatic GST calculation"
      />

      <CalculatorLayout
        inputs={
          <CalculatorCard
            title="Enter Details"
            description="Provide the amount and GST rate"
          >
            <div className="space-y-4">
              <Tabs value={type} onValueChange={(v) => setType(v as "inclusive" | "exclusive")}>
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="inclusive">Inclusive (with GST)</TabsTrigger>
                  <TabsTrigger value="exclusive">Exclusive (without GST)</TabsTrigger>
                </TabsList>
              </Tabs>

              <InputWithTooltip
                label="Amount"
                tooltip={
                  type === "inclusive"
                    ? "Enter the price that already includes GST"
                    : "Enter the price before GST is added"
                }
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Enter amount"
                type="number"
                min="0"
                step="0.01"
              />

              <SelectWithTooltip
                label="GST Rate"
                tooltip="Select the applicable GST rate"
                value={gstRate}
                onValueChange={setGstRate}
                options={GST_RATES}
              />

              {gstRate === "custom" && (
                <InputWithTooltip
                  label="Custom Rate (%)"
                  tooltip="Enter your custom GST rate"
                  value={customRate}
                  onChange={(e) => setCustomRate(e.target.value)}
                  placeholder="Enter rate"
                  type="number"
                  min="0"
                  step="0.01"
                />
              )}
            </div>
          </CalculatorCard>
        }
        results={
          <div className="space-y-4">
            <ResultCard
              title="Calculation Result"
              items={[
                {
                  label: "Taxable Value",
                  value: formatCurrency(result.taxableValue),
                },
                {
                  label: "GST Amount",
                  value: formatCurrency(result.gstAmount),
                  highlight: true,
                },
                {
                  label: "Total Amount",
                  value: formatCurrency(result.totalAmount),
                  highlight: true,
                },
              ]}
            />

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
          <CardTitle className="text-lg">Understanding Inclusive vs Exclusive</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm text-slate-600">
          <p>
            <strong>Inclusive Price (with GST):</strong> The price shown to the customer already includes the GST amount.
            This is what customers typically see in retail.
          </p>
          <p>
            <strong>Exclusive Price (without GST):</strong> The base price before GST is added. This is the taxable value
            used for GST calculations.
          </p>
          <p>
            <strong>Conversion:</strong> Use this calculator to convert between the two formats. For example, if you have
            a retail price (inclusive) and need to find the base price (exclusive) for invoicing.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
