import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  CalculatorCard,
  InputWithTooltip,
  ResultCard,
  CalculatorLayout,
  CopyButton,
  PrintButton,
} from "@/components/GSTComponents";
import { PageHeader } from "@/components/GSTLayout";
import { calculateITC, formatCurrency } from "@/lib/gstCalculations";

export function ITCCalculator() {
  const [outputGST, setOutputGST] = React.useState("1800");
  const [inputGST, setInputGST] = React.useState("1500");

  const result = calculateITC(parseFloat(outputGST) || 0, parseFloat(inputGST) || 0);

  const resultText = `Output GST: ${formatCurrency(result.outputGST)}, Input GST: ${formatCurrency(result.inputGST)}, ITC: ${formatCurrency(result.itcAvailable)}, Net Payable: ${formatCurrency(result.netPayable)}`;

  return (
    <div>
      <PageHeader
        title="Input Tax Credit (ITC) Calculator"
        description="Calculate available ITC and net GST payable or refundable"
      />

      <CalculatorLayout
        inputs={
          <CalculatorCard
            title="Enter GST Details"
            description="Provide output and input GST amounts"
          >
            <div className="space-y-4">
              <InputWithTooltip
                label="Output GST Collected"
                tooltip="Total GST collected from customers on sales"
                value={outputGST}
                onChange={(e) => setOutputGST(e.target.value)}
                placeholder="Enter output GST"
                type="number"
                min="0"
                step="0.01"
              />

              <InputWithTooltip
                label="Input GST Paid"
                tooltip="Total GST paid on purchases of goods/services"
                value={inputGST}
                onChange={(e) => setInputGST(e.target.value)}
                placeholder="Enter input GST"
                type="number"
                min="0"
                step="0.01"
              />
            </div>
          </CalculatorCard>
        }
        results={
          <div className="space-y-4">
            <ResultCard
              title="ITC Calculation"
              items={[
                {
                  label: "Output GST",
                  value: formatCurrency(result.outputGST),
                },
                {
                  label: "Input GST",
                  value: formatCurrency(result.inputGST),
                },
                {
                  label: "ITC Available",
                  value: formatCurrency(result.itcAvailable),
                  highlight: true,
                },
              ]}
            />

            <Card className={`border-2 ${
              result.isRefundable ? "border-emerald-200 bg-emerald-50" : "border-orange-200 bg-orange-50"
            }`}>
              <CardHeader className="pb-3">
                <CardTitle className={`text-lg ${
                  result.isRefundable ? "text-emerald-900" : "text-orange-900"
                }`}>
                  {result.isRefundable ? "Refund Due" : "Net GST Payable"}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-600">Amount</span>
                  <span className={`font-mono font-semibold text-2xl ${
                    result.isRefundable ? "text-emerald-700" : "text-orange-700"
                  }`}>
                    {formatCurrency(result.netPayable)}
                  </span>
                </div>
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
          <CardTitle className="text-lg">Understanding ITC</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm text-slate-600">
          <p>
            <strong>Input Tax Credit (ITC):</strong> GST paid on purchases of goods/services used in business can be
            claimed as credit against GST collected from customers.
          </p>
          <p>
            <strong>Calculation:</strong> ITC Available = Minimum of (Output GST, Input GST). The net GST payable is
            Output GST minus ITC Available.
          </p>
          <p>
            <strong>Refund:</strong> If Input GST exceeds Output GST, the difference can be claimed as a refund
            (subject to GST rules and conditions).
          </p>
          <p>
            <strong>Important:</strong> ITC is only available on GST-registered purchases. Keep all invoices and
            supporting documents for audit purposes.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

