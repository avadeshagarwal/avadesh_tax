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
import { calculateLateFeeAndInterest, formatCurrency } from "@/lib/gstCalculations";

const RETURN_TYPES = [
  { value: "GSTR1", label: "GSTR-1 (Sales Register)" },
  { value: "GSTR3B", label: "GSTR-3B (Monthly Return)" },
  { value: "GSTR9", label: "GSTR-9 (Annual Return)" },
];

export function LateFeeCalculator() {
  const [dueDate, setDueDate] = React.useState(new Date(2024, 0, 20).toISOString().split("T")[0]);
  const [filingDate, setFilingDate] = React.useState(new Date(2024, 1, 10).toISOString().split("T")[0]);
  const [taxPayable, setTaxPayable] = React.useState("10000");
  const [returnType, setReturnType] = React.useState("GSTR3B");

  const result = calculateLateFeeAndInterest(
    new Date(dueDate),
    new Date(filingDate),
    parseFloat(taxPayable) || 0,
    returnType as "GSTR1" | "GSTR3B" | "GSTR9"
  );

  const resultText = `Days Late: ${result.daysLate}, Late Fee: ${formatCurrency(result.lateFee)}, Interest: ${formatCurrency(result.interest)}, Total: ${formatCurrency(result.totalPayable)}`;

  return (
    <div>
      <PageHeader
        title="GST Late Fee & Interest Calculator"
        description="Calculate penalties and interest for delayed GST filing"
      />

      <CalculatorLayout
        inputs={
          <CalculatorCard
            title="Enter Filing Details"
            description="Provide dates and tax amount"
          >
            <div className="space-y-4">
              <InputWithTooltip
                label="Due Date"
                tooltip="The last date for filing the return without penalty"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                type="date"
              />

              <InputWithTooltip
                label="Filing Date"
                tooltip="The actual date when the return was filed"
                value={filingDate}
                onChange={(e) => setFilingDate(e.target.value)}
                type="date"
              />

              <SelectWithTooltip
                label="Return Type"
                tooltip="Type of GST return being filed"
                value={returnType}
                onValueChange={setReturnType}
                options={RETURN_TYPES}
              />

              <InputWithTooltip
                label="Tax Payable"
                tooltip="Total GST tax amount due"
                value={taxPayable}
                onChange={(e) => setTaxPayable(e.target.value)}
                placeholder="Enter tax amount"
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
              title="Filing Status"
              items={[
                {
                  label: "Days Late",
                  value: `${result.daysLate} days`,
                  highlight: result.daysLate > 0,
                },
                {
                  label: "Tax Payable",
                  value: formatCurrency(result.totalPayable - result.lateFee - result.interest),
                },
              ]}
            />

            {result.daysLate > 0 && (
              <>
                <ResultCard
                  title="Penalties & Interest"
                  items={[
                    {
                      label: "Late Fee",
                      value: formatCurrency(result.lateFee),
                    },
                    {
                      label: "Interest (18% p.a.)",
                      value: formatCurrency(result.interest),
                    },
                  ]}
                />

                <Card className="border-red-200 bg-red-50">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg text-red-900">Total Amount Payable</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-slate-600">Tax + Penalties + Interest</span>
                      <span className="font-mono font-semibold text-2xl text-red-700">
                        {formatCurrency(result.totalPayable)}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </>
            )}

            {result.daysLate === 0 && (
              <Card className="border-emerald-200 bg-emerald-50">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg text-emerald-900">No Late Fee</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-emerald-800">Return filed on time. No penalties or interest applicable.</p>
                </CardContent>
              </Card>
            )}

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
          <CardTitle className="text-lg">Late Fee & Interest Rules</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm text-slate-600">
          <p>
            <strong>Late Fee:</strong> ₹100 per day or 5% of tax payable, whichever is higher. Applicable when return
            is filed after the due date.
          </p>
          <p>
            <strong>Interest:</strong> 18% per annum (0.049% per day) on the tax payable amount for the number of days
            the return is late.
          </p>
          <p>
            <strong>Due Dates:</strong> GSTR-1 and GSTR-3B are typically due by the 11th of the next month. GSTR-9 is
            due by December 31st of the following financial year.
          </p>
          <p>
            <strong>Waiver:</strong> Late fee may be waived for first-time defaults or under specific circumstances.
            Consult with a tax professional for more information.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

