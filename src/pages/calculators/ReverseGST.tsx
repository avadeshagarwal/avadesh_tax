import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  CalculatorCard,
  InputWithTooltip,
  SelectWithTooltip,
  ResultCard,
  TaxBreakup,
  CalculatorLayout,
  CopyButton,
  PrintButton,
} from "@/components/GSTComponents";
import { PageHeader } from "@/components/GSTLayout";
import { reverseGST, formatCurrency } from "@/lib/gstCalculations";

const GST_RATES = [
  { value: "5", label: "5%" },
  { value: "12", label: "12%" },
  { value: "18", label: "18%" },
  { value: "28", label: "28%" },
  { value: "custom", label: "Custom Rate" },
];

export function ReverseGSTCalculator() {
  const [finalAmount, setFinalAmount] = React.useState("1180");
  const [gstRate, setGstRate] = React.useState("18");
  const [customRate, setCustomRate] = React.useState("");

  const rate = gstRate === "custom" ? parseFloat(customRate) || 0 : parseFloat(gstRate);
  const result = reverseGST(parseFloat(finalAmount) || 0, rate);

  const resultText = `Base: ${formatCurrency(result.baseAmount)}, GST: ${formatCurrency(result.gstAmount)}, Total: ${formatCurrency(result.finalAmount)}`;

  return (
    <div>
      <PageHeader
        title="Reverse GST Calculator"
        description="Extract GST amount from a final price to find the base amount"
      />

      <CalculatorLayout
        inputs={
          <CalculatorCard
            title="Enter Details"
            description="Provide the final amount (including GST)"
          >
            <div className="space-y-4">
              <InputWithTooltip
                label="Final Amount (with GST)"
                tooltip="The total amount including GST that you want to reverse"
                value={finalAmount}
                onChange={(e) => setFinalAmount(e.target.value)}
                placeholder="Enter final amount"
                type="number"
                min="0"
                step="0.01"
              />

              <SelectWithTooltip
                label="GST Rate"
                tooltip="Select the GST rate that was applied"
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
              title="Reverse GST Result"
              items={[
                {
                  label: "Base Amount",
                  value: formatCurrency(result.baseAmount),
                  highlight: true,
                },
                {
                  label: "GST Amount",
                  value: formatCurrency(result.gstAmount),
                },
                {
                  label: "Final Amount",
                  value: formatCurrency(result.finalAmount),
                },
              ]}
            />

            <TaxBreakup
              cgst={result.breakup.cgst}
              sgst={result.breakup.sgst}
              igst={result.breakup.igst}
              total={result.breakup.total}
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
          <CardTitle className="text-lg">When to Use Reverse GST</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm text-slate-600">
          <p>
            <strong>Use Case:</strong> When you have a final price (including GST) and need to find the base amount
            for accounting or invoicing purposes.
          </p>
          <p>
            <strong>Example:</strong> You purchased an item for ₹1,180 (which includes 18% GST). Using reverse GST,
            you can find that the base price was ₹1,000 and GST was ₹180.
          </p>
          <p>
            <strong>Formula:</strong> Base Amount = Final Amount / (1 + GST Rate / 100)
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

