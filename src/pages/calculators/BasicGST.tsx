import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
import { addGSTToAmount, removeGSTFromAmount, formatCurrency } from "@/lib/gstCalculations";

const GST_RATES = [
  { value: "0", label: "0% - Exempted" },
  { value: "5", label: "5%" },
  { value: "12", label: "12%" },
  { value: "18", label: "18%" },
  { value: "28", label: "28%" },
  { value: "custom", label: "Custom Rate" },
];

export function BasicGSTCalculator() {
  const [mode, setMode] = React.useState<"add" | "remove">("add");
  const [amount, setAmount] = React.useState("1000");
  const [gstRate, setGstRate] = React.useState("18");
  const [customRate, setCustomRate] = React.useState("");

  const rate = gstRate === "custom" ? parseFloat(customRate) || 0 : parseFloat(gstRate);

  const result = mode === "add" ? addGSTToAmount(parseFloat(amount) || 0, rate) : removeGSTFromAmount(parseFloat(amount) || 0, rate);

  const resultText = `Base: ${formatCurrency(result.baseAmount)}, GST: ${formatCurrency(result.gstAmount)}, Total: ${formatCurrency(result.finalAmount)}`;

  return (
    <div>
      <PageHeader
        title="Basic GST Calculator"
        description="Quickly add or remove GST from any amount with automatic tax breakup"
      />

      <CalculatorLayout
        inputs={
          <CalculatorCard
            title="Enter Details"
            description="Provide the amount and GST rate"
          >
            <div className="space-y-4">
              <Tabs value={mode} onValueChange={(v) => setMode(v as "add" | "remove")}>
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="add">Add GST</TabsTrigger>
                  <TabsTrigger value="remove">Remove GST</TabsTrigger>
                </TabsList>
              </Tabs>

              <InputWithTooltip
                label="Amount"
                tooltip={mode === "add" ? "Enter the base amount (before GST)" : "Enter the final amount (including GST)"}
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Enter amount"
                type="number"
                min="0"
                step="0.01"
              />

              <SelectWithTooltip
                label="GST Rate"
                tooltip="Select the applicable GST rate for your product/service"
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
              title={mode === "add" ? "Final Amount" : "Base Amount"}
              items={[
                {
                  label: mode === "add" ? "Base Amount" : "Final Amount",
                  value: formatCurrency(result.baseAmount),
                },
                {
                  label: "GST Amount",
                  value: formatCurrency(result.gstAmount),
                  highlight: true,
                },
                {
                  label: mode === "add" ? "Total (with GST)" : "Total (without GST)",
                  value: formatCurrency(result.finalAmount),
                  highlight: true,
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
          <CardTitle className="text-lg">How It Works</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm text-slate-600">
          <p>
            <strong>Add GST:</strong> Calculates the GST amount based on the base amount and adds it to get the final price.
            Formula: Final Amount = Base Amount + (Base Amount × GST Rate / 100)
          </p>
          <p>
            <strong>Remove GST:</strong> Extracts the GST from the final amount to find the base amount.
            Formula: Base Amount = Final Amount / (1 + GST Rate / 100)
          </p>
          <p>
            <strong>Tax Breakup:</strong> For intrastate transactions, GST is split equally between CGST (Central GST) and SGST (State GST).
            For interstate transactions, the entire amount is IGST (Integrated GST).
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
