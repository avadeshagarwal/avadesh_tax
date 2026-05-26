import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Info, Copy, Download, Printer } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

/**
 * Result Card Component
 * Displays calculation results in a premium card format
 */
export function ResultCard({
  title,
  items,
  highlight,
}: {
  title: string;
  items: Array<{ label: string; value: string; highlight?: boolean }>;
  highlight?: string;
}) {
  return (
    <Card className="border-emerald-100 bg-gradient-to-br from-emerald-50 to-white">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg text-emerald-900">{title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {items.map((item, idx) => (
          <div key={idx} className={`flex justify-between items-center ${item.highlight ? "bg-emerald-100 px-3 py-2 rounded-md" : ""}`}>
            <span className="text-sm text-slate-600">{item.label}</span>
            <span className={`font-mono font-semibold ${item.highlight ? "text-emerald-700 text-lg" : "text-slate-900"}`}>
              {item.value}
            </span>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

/**
 * Input Field with Tooltip
 * Reusable input component with integrated tooltip support
 */
export function InputWithTooltip({
  label,
  tooltip,
  value,
  onChange,
  placeholder,
  type = "text",
  step,
  min,
  max,
}: {
  label: string;
  tooltip?: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  type?: string;
  step?: string;
  min?: string;
  max?: string;
}) {
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <Label className="text-sm font-medium text-slate-700">{label}</Label>
        {tooltip && (
          <Tooltip>
            <TooltipTrigger asChild>
              <Info className="h-4 w-4 text-slate-400 cursor-help" />
            </TooltipTrigger>
            <TooltipContent className="max-w-xs bg-slate-900 text-white border-0">
              <p className="text-xs">{tooltip}</p>
            </TooltipContent>
          </Tooltip>
        )}
      </div>
      <Input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        step={step}
        min={min}
        max={max}
        className="border-slate-200 focus:border-emerald-500 focus:ring-emerald-500"
      />
    </div>
  );
}

/**
 * Select Field with Tooltip
 */
export function SelectWithTooltip({
  label,
  tooltip,
  value,
  onValueChange,
  options,
}: {
  label: string;
  tooltip?: string;
  value: string;
  onValueChange: (value: string) => void;
  options: Array<{ value: string; label: string }>;
}) {
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <Label className="text-sm font-medium text-slate-700">{label}</Label>
        {tooltip && (
          <Tooltip>
            <TooltipTrigger asChild>
              <Info className="h-4 w-4 text-slate-400 cursor-help" />
            </TooltipTrigger>
            <TooltipContent className="max-w-xs bg-slate-900 text-white border-0">
              <p className="text-xs">{tooltip}</p>
            </TooltipContent>
          </Tooltip>
        )}
      </div>
      <Select value={value} onValueChange={onValueChange}>
        <SelectTrigger className="border-slate-200 focus:border-emerald-500 focus:ring-emerald-500">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

/**
 * Copy to Clipboard Button
 */
export function CopyButton({ text, label = "Copy" }: { text: string; label?: string }) {
  return (
    <Button
      variant="outline"
      size="sm"
      onClick={() => {
        navigator.clipboard.writeText(text);
        toast.success("Copied to clipboard!");
      }}
      className="gap-2 border-slate-200 hover:bg-slate-50"
    >
      <Copy className="h-4 w-4" />
      {label}
    </Button>
  );
}

/**
 * Print Button
 */
export function PrintButton({ label = "Print" }: { label?: string }) {
  return (
    <Button
      variant="outline"
      size="sm"
      onClick={() => window.print()}
      className="gap-2 border-slate-200 hover:bg-slate-50"
    >
      <Printer className="h-4 w-4" />
      {label}
    </Button>
  );
}

/**
 * Download Button
 */
export function DownloadButton({ onClick, label = "Download" }: { onClick: () => void; label?: string }) {
  return (
    <Button
      variant="outline"
      size="sm"
      onClick={onClick}
      className="gap-2 border-slate-200 hover:bg-slate-50"
    >
      <Download className="h-4 w-4" />
      {label}
    </Button>
  );
}

/**
 * Calculator Card Wrapper
 * Premium card for each calculator tool
 */
export function CalculatorCard({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <Card className="border-slate-200 shadow-sm hover:shadow-md transition-shadow">
      <CardHeader>
        <CardTitle className="text-xl text-slate-900">{title}</CardTitle>
        <CardDescription className="text-slate-600">{description}</CardDescription>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
}

/**
 * Two Column Layout for Input and Results
 */
export function CalculatorLayout({
  inputs,
  results,
}: {
  inputs: React.ReactNode;
  results: React.ReactNode;
}) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="space-y-4">{inputs}</div>
      <div className="space-y-4">{results}</div>
    </div>
  );
}

/**
 * Animated Number Display
 * Animates numbers from 0 to final value
 */
export function AnimatedNumber({ value, prefix = "", suffix = "" }: { value: number; prefix?: string; suffix?: string }) {
  const [displayValue, setDisplayValue] = React.useState(0);

  React.useEffect(() => {
    const duration = 600;
    const steps = 30;
    const stepValue = value / steps;
    let currentStep = 0;

    const interval = setInterval(() => {
      currentStep++;
      setDisplayValue(Math.min(stepValue * currentStep, value));

      if (currentStep >= steps) {
        clearInterval(interval);
        setDisplayValue(value);
      }
    }, duration / steps);

    return () => clearInterval(interval);
  }, [value]);

  return (
    <span className="font-mono font-semibold">
      {prefix}
      {displayValue.toFixed(2)}
      {suffix}
    </span>
  );
}

/**
 * Tax Breakup Display
 * Shows CGST, SGST, IGST breakdown
 */
export function TaxBreakup({
  cgst,
  sgst,
  igst,
  total,
}: {
  cgst: number;
  sgst: number;
  igst: number;
  total: number;
}) {
  return (
    <Card className="border-slate-200 bg-slate-50">
      <CardHeader className="pb-3">
        <CardTitle className="text-base text-slate-900">Tax Breakup</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        {cgst > 0 && (
          <div className="flex justify-between text-sm">
            <span className="text-slate-600">CGST (Central GST)</span>
            <span className="font-mono font-semibold text-slate-900">₹{cgst.toFixed(2)}</span>
          </div>
        )}
        {sgst > 0 && (
          <div className="flex justify-between text-sm">
            <span className="text-slate-600">SGST (State GST)</span>
            <span className="font-mono font-semibold text-slate-900">₹{sgst.toFixed(2)}</span>
          </div>
        )}
        {igst > 0 && (
          <div className="flex justify-between text-sm">
            <span className="text-slate-600">IGST (Integrated GST)</span>
            <span className="font-mono font-semibold text-slate-900">₹{igst.toFixed(2)}</span>
          </div>
        )}
        <div className="border-t border-slate-300 pt-2 mt-2 flex justify-between font-semibold">
          <span className="text-slate-700">Total GST</span>
          <span className="font-mono text-emerald-700">₹{total.toFixed(2)}</span>
        </div>
      </CardContent>
    </Card>
  );
}

/**
 * CTA Section
 * Call-to-action section for consultation/help
 */
export function CTASection() {
  return (
    <Card className="border-emerald-200 bg-gradient-to-r from-emerald-50 to-blue-50 mt-8">
      <CardHeader>
        <CardTitle className="text-emerald-900">Need GST Help?</CardTitle>
        <CardDescription className="text-emerald-800">
          Get expert assistance with your GST calculations and compliance
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col sm:flex-row gap-3">
        <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">
          Book Consultation
        </Button>
        <Button variant="outline" className="border-emerald-300 text-emerald-700 hover:bg-emerald-50">
          WhatsApp Us
        </Button>
        <Button variant="outline" className="border-slate-300 hover:bg-slate-50">
          File With Expert
        </Button>
      </CardContent>
    </Card>
  );
}
