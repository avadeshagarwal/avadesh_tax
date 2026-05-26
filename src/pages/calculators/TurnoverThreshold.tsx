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
import { calculateTurnoverThreshold, formatCurrency } from "@/lib/gstCalculations";

const STATES = [
  { value: "Andhra Pradesh", label: "Andhra Pradesh" },
  { value: "Arunachal Pradesh", label: "Arunachal Pradesh" },
  { value: "Assam", label: "Assam" },
  { value: "Bihar", label: "Bihar" },
  { value: "Chhattisgarh", label: "Chhattisgarh" },
  { value: "Goa", label: "Goa" },
  { value: "Gujarat", label: "Gujarat" },
  { value: "Haryana", label: "Haryana" },
  { value: "Himachal Pradesh", label: "Himachal Pradesh" },
  { value: "Jharkhand", label: "Jharkhand" },
  { value: "Karnataka", label: "Karnataka" },
  { value: "Kerala", label: "Kerala" },
  { value: "Madhya Pradesh", label: "Madhya Pradesh" },
  { value: "Maharashtra", label: "Maharashtra" },
  { value: "Manipur", label: "Manipur" },
  { value: "Meghalaya", label: "Meghalaya" },
  { value: "Mizoram", label: "Mizoram" },
  { value: "Nagaland", label: "Nagaland" },
  { value: "Odisha", label: "Odisha" },
  { value: "Punjab", label: "Punjab" },
  { value: "Rajasthan", label: "Rajasthan" },
  { value: "Sikkim", label: "Sikkim" },
  { value: "Tamil Nadu", label: "Tamil Nadu" },
  { value: "Telangana", label: "Telangana" },
  { value: "Tripura", label: "Tripura" },
  { value: "Uttar Pradesh", label: "Uttar Pradesh" },
  { value: "Uttarakhand", label: "Uttarakhand" },
  { value: "West Bengal", label: "West Bengal" },
  { value: "Delhi", label: "Delhi" },
  { value: "Jammu & Kashmir", label: "Jammu & Kashmir" },
  { value: "Ladakh", label: "Ladakh" },
  { value: "Puducherry", label: "Puducherry" },
];

const BUSINESS_TYPES = [
  { value: "manufacturing", label: "Manufacturing" },
  { value: "trading", label: "Trading/Retail" },
  { value: "services", label: "Services" },
  { value: "other", label: "Other" },
];

export function TurnoverThresholdCalculator() {
  const [turnover, setTurnover] = React.useState("2500000");
  const [state, setState] = React.useState("Maharashtra");
  const [businessType, setBusinessType] = React.useState("trading");

  const result = calculateTurnoverThreshold(parseFloat(turnover) || 0, state, businessType);

  const resultText = `Turnover: ${formatCurrency(result.threshold)}, Registration Required: ${result.registrationRequired}, Recommendation: ${result.recommendation}`;

  return (
    <div>
      <PageHeader
        title="GST Turnover Threshold Calculator"
        description="Check if GST registration is mandatory for your business"
      />

      <CalculatorLayout
        inputs={
          <CalculatorCard
            title="Enter Business Details"
            description="Provide turnover, state, and business type"
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
                label="State"
                tooltip="State where your business is registered"
                value={state}
                onValueChange={setState}
                options={STATES}
              />

              <SelectWithTooltip
                label="Business Type"
                tooltip="Type of business you operate"
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
              title="Threshold Information"
              items={[
                {
                  label: "Your Turnover",
                  value: formatCurrency(parseFloat(turnover) || 0),
                },
                {
                  label: "Registration Threshold",
                  value: formatCurrency(result.threshold),
                },
              ]}
            />

            <Card
              className={`border-2 ${
                result.registrationRequired
                  ? "border-red-200 bg-red-50"
                  : "border-emerald-200 bg-emerald-50"
              }`}
            >
              <CardHeader className="pb-3">
                <CardTitle
                  className={`text-lg ${
                    result.registrationRequired ? "text-red-900" : "text-emerald-900"
                  }`}
                >
                  {result.registrationRequired
                    ? "GST Registration Required"
                    : "GST Registration Not Mandatory"}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p
                  className={`text-sm ${
                    result.registrationRequired ? "text-red-800" : "text-emerald-800"
                  }`}
                >
                  {result.recommendation}
                </p>
              </CardContent>
            </Card>

            <Card className="border-slate-200 bg-slate-50">
              <CardHeader className="pb-3">
                <CardTitle className="text-base text-slate-900">Key Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm text-slate-600">
                <p>
                  <strong>Standard Threshold:</strong> ₹40 lakhs for most states
                </p>
                <p>
                  <strong>Special Category States:</strong> ₹20 lakhs (includes NE states and certain others)
                </p>
                <p>
                  <strong>Voluntary Registration:</strong> You can register even if below threshold
                </p>
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
          <CardTitle className="text-lg">Registration Threshold Rules</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm text-slate-600">
          <p>
            <strong>Mandatory Registration:</strong> If your annual turnover exceeds the threshold, you must register
            for GST within 30 days of crossing the limit.
          </p>
          <p>
            <strong>Special Category States:</strong> Arunachal Pradesh, Assam, Himachal Pradesh, Jammu & Kashmir,
            Manipur, Meghalaya, Mizoram, Nagaland, Sikkim, Tripura, and Uttarakhand have a lower threshold of ₹20 lakhs.
          </p>
          <p>
            <strong>Voluntary Registration:</strong> Even if your turnover is below the threshold, you can voluntarily
            register for GST. This is beneficial if you want to claim input tax credit.
          </p>
          <p>
            <strong>Non-Resident Taxable Person:</strong> Businesses making supplies in India without a fixed place of
            business must register regardless of turnover.
          </p>
          <p>
            <strong>Penalties:</strong> Operating without GST registration when mandatory can result in penalties up to
            10% of tax due or ₹10,000, whichever is higher.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

