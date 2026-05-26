import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
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
import { calculateInvoiceGST, formatCurrency } from "@/lib/gstCalculations";

const GST_RATES = [
  { value: "0", label: "0% - Exempted" },
  { value: "5", label: "5%" },
  { value: "12", label: "12%" },
  { value: "18", label: "18%" },
  { value: "28", label: "28%" },
  { value: "custom", label: "Custom Rate" },
];

export function InvoiceGSTCalculator() {
  const [quantity, setQuantity] = React.useState("10");
  const [rate, setRate] = React.useState("100");
  const [discount, setDiscount] = React.useState("0");
  const [freight, setFreight] = React.useState("0");
  const [otherCharges, setOtherCharges] = React.useState("0");
  const [gstRate, setGstRate] = React.useState("18");
  const [customRate, setCustomRate] = React.useState("");
  const [isInterstate, setIsInterstate] = React.useState(false);

  const gstValue = gstRate === "custom" ? parseFloat(customRate) || 0 : parseFloat(gstRate);
  const result = calculateInvoiceGST(
    parseFloat(quantity) || 0,
    parseFloat(rate) || 0,
    parseFloat(discount) || 0,
    parseFloat(freight) || 0,
    parseFloat(otherCharges) || 0,
    gstValue,
    isInterstate
  );

  return (
    <div>
      <PageHeader
        title="Invoice GST Calculator"
        description="Calculate complete invoice with GST, discounts, and additional charges"
      />

      <CalculatorLayout
        inputs={
          <CalculatorCard
            title="Invoice Details"
            description="Enter all invoice line items"
          >
            <div className="space-y-4">
              <InputWithTooltip
                label="Quantity"
                tooltip="Number of items in the invoice"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                placeholder="Enter quantity"
                type="number"
                min="0"
                step="0.01"
              />

              <InputWithTooltip
                label="Rate per Unit"
                tooltip="Price of each item"
                value={rate}
                onChange={(e) => setRate(e.target.value)}
                placeholder="Enter rate"
                type="number"
                min="0"
                step="0.01"
              />

              <InputWithTooltip
                label="Discount"
                tooltip="Total discount amount (if any)"
                value={discount}
                onChange={(e) => setDiscount(e.target.value)}
                placeholder="Enter discount"
                type="number"
                min="0"
                step="0.01"
              />

              <InputWithTooltip
                label="Freight/Shipping"
                tooltip="Freight charges added to taxable value"
                value={freight}
                onChange={(e) => setFreight(e.target.value)}
                placeholder="Enter freight"
                type="number"
                min="0"
                step="0.01"
              />

              <InputWithTooltip
                label="Other Charges"
                tooltip="Any additional charges (insurance, etc.)"
                value={otherCharges}
                onChange={(e) => setOtherCharges(e.target.value)}
                placeholder="Enter other charges"
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

              <div className="flex items-center gap-2 pt-2">
                <Checkbox
                  id="interstate"
                  checked={isInterstate}
                  onCheckedChange={(checked) => setIsInterstate(checked as boolean)}
                />
                <label htmlFor="interstate" className="text-sm font-medium text-slate-700 cursor-pointer">
                  Interstate Transaction (IGST instead of CGST/SGST)
                </label>
              </div>
            </div>
          </CalculatorCard>
        }
        results={
          <div className="space-y-4">
            <ResultCard
              title="Invoice Summary"
              items={[
                {
                  label: "Subtotal",
                  value: formatCurrency(result.subtotal),
                },
                {
                  label: "Discount",
                  value: `-${formatCurrency(result.discount)}`,
                },
                {
                  label: "Subtotal (after discount)",
                  value: formatCurrency(result.discountedSubtotal),
                },
                {
                  label: "Freight",
                  value: formatCurrency(result.freight),
                },
                {
                  label: "Other Charges",
                  value: formatCurrency(result.otherCharges),
                },
                {
                  label: "Taxable Value",
                  value: formatCurrency(result.taxableValue),
                },
              ]}
            />

            <ResultCard
              title="GST Calculation"
              items={[
                {
                  label: `GST @ ${gstValue}%`,
                  value: formatCurrency(result.gstAmount),
                  highlight: true,
                },
                {
                  label: "Grand Total",
                  value: formatCurrency(result.grandTotal),
                  highlight: true,
                },
              ]}
            />

            <TaxBreakup
              cgst={result.cgst}
              sgst={result.sgst}
              igst={result.igst}
              total={result.gstAmount}
            />

            <div className="flex gap-2">
              <CopyButton text={`Taxable: ${formatCurrency(result.taxableValue)}, GST: ${formatCurrency(result.gstAmount)}, Total: ${formatCurrency(result.grandTotal)}`} label="Copy" />
              <PrintButton label="Print Invoice" />
            </div>
          </div>
        }
      />

      {/* Information Section */}
      <Card className="mt-8 border-slate-200">
        <CardHeader>
          <CardTitle className="text-lg">Invoice Calculation Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm text-slate-600">
          <p>
            <strong>Taxable Value:</strong> Calculated as (Quantity × Rate) - Discount + Freight + Other Charges.
            GST is applied on this taxable value.
          </p>
          <p>
            <strong>Intrastate vs Interstate:</strong> Intrastate transactions use CGST (Central) and SGST (State).
            Interstate transactions use IGST (Integrated) which is the full GST amount.
          </p>
          <p>
            <strong>Grand Total:</strong> Taxable Value + GST Amount. This is the final amount to be paid.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

