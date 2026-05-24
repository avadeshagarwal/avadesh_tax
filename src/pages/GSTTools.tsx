import { useMemo, useState } from "react";
import type { ComponentType, ReactNode } from "react";
import { Link } from "react-router-dom";
import { Calculator, Copy, FileText, MessageCircle, Printer, Receipt, RotateCcw, ShieldCheck, Store, CalendarClock, MapPinned, Percent, Sparkles } from "lucide-react";
import { BRAND, waLink } from "../data/content";

type SupplyPlace = "intrastate" | "interstate";
type GstMode = "add" | "remove";
type RateOption = "0" | "5" | "12" | "18" | "28" | "custom";
type ReturnType = "normal" | "nil";
type BusinessType = "goods" | "services";
type StateCategory = "normal" | "special";
type CompositionBusiness = "trader" | "manufacturer" | "restaurant" | "service";
type IconType = ComponentType<{ className?: string }>;
type ResultLine = { label: string; value: string; tone?: "default" | "success" | "warning" };

const GST_RATES: RateOption[] = ["0", "5", "12", "18", "28", "custom"];
const specialStates = "Arunachal Pradesh, Assam, Himachal Pradesh, Manipur, Meghalaya, Mizoram, Nagaland, Sikkim, Tripura, Uttarakhand";
const money = new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 2 });
const number = new Intl.NumberFormat("en-IN", { maximumFractionDigits: 2 });

const toNumber = (value: string) => {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : 0;
};
const positive = (value: number) => Math.max(0, value);
const formatMoney = (value: number) => money.format(positive(value));
const formatNumber = (value: number) => number.format(positive(value));
const getRate = (option: RateOption, customRate: string) => (option === "custom" ? positive(toNumber(customRate)) : Number(option));
const splitTax = (gst: number, supply: SupplyPlace) =>
  supply === "intrastate" ? { cgst: gst / 2, sgst: gst / 2, igst: 0 } : { cgst: 0, sgst: 0, igst: gst };
const daysBetween = (start: string, end: string) => {
  if (!start || !end) return 0;
  const startTime = new Date(`${start}T00:00:00`).getTime();
  const endTime = new Date(`${end}T00:00:00`).getTime();
  if (!Number.isFinite(startTime) || !Number.isFinite(endTime) || endTime <= startTime) return 0;
  return Math.ceil((endTime - startTime) / 86400000);
};
const fieldError = (value: string, label: string) => {
  if (value.trim() === "") return `${label} is required.`;
  if (toNumber(value) < 0) return `${label} cannot be negative.`;
  return "";
};

function copyResult(title: string, lines: ResultLine[]) {
  const text = [title, ...lines.map((line) => `${line.label}: ${line.value}`), `Prepared on ${BRAND.full}`].join("\n");
  void navigator.clipboard?.writeText(text);
}

function NumberField({ label, value, onChange, prefix, suffix, step = "0.01" }: { label: string; value: string; onChange: (value: string) => void; prefix?: string; suffix?: string; step?: string }) {
  const error = fieldError(value, label);
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-semibold text-navy-800">{label}</span>
      <span className="flex min-h-12 items-center overflow-hidden rounded-2xl border border-navy-100 bg-navy-50/70 transition focus-within:border-gold-500/50 focus-within:bg-white focus-within:ring-4 focus-within:ring-gold-500/10">
        {prefix && <span className="pl-4 text-sm font-semibold text-navy-500">{prefix}</span>}
        <input type="number" min="0" step={step} value={value} onChange={(event) => onChange(event.target.value)} className="w-full bg-transparent px-4 py-3 font-semibold text-navy-950 outline-none" placeholder="0.00" />
        {suffix && <span className="pr-4 text-sm font-semibold text-navy-500">{suffix}</span>}
      </span>
      {error && <span className="mt-2 block text-xs font-medium text-red-600">{error}</span>}
    </label>
  );
}

function SelectField<T extends string>({ label, value, options, onChange }: { label: string; value: T; options: { value: T; label: string }[]; onChange: (value: T) => void }) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-semibold text-navy-800">{label}</span>
      <select value={value} onChange={(event) => onChange(event.target.value as T)} className="min-h-12 w-full rounded-2xl border border-navy-100 bg-navy-50/70 px-4 font-semibold text-navy-950 outline-none transition focus:border-gold-500/50 focus:bg-white focus:ring-4 focus:ring-gold-500/10">
        {options.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
      </select>
    </label>
  );
}

function Segmented<T extends string>({ label, value, options, onChange }: { label: string; value: T; options: { value: T; label: string }[]; onChange: (value: T) => void }) {
  return (
    <div>
      <span className="mb-2 block text-sm font-semibold text-navy-800">{label}</span>
      <div className="grid gap-2 rounded-2xl bg-navy-50 p-1 sm:grid-cols-2">
        {options.map((option) => (
          <button key={option.value} type="button" onClick={() => onChange(option.value)} className={`rounded-xl px-4 py-3 text-sm font-semibold transition ${value === option.value ? "bg-white text-navy-950 shadow-sm ring-1 ring-gold-500/20" : "text-navy-500 hover:bg-white/70 hover:text-navy-800"}`}>{option.label}</button>
        ))}
      </div>
    </div>
  );
}

function RateSelector({ option, customRate, onOptionChange, onCustomRateChange }: { option: RateOption; customRate: string; onOptionChange: (value: RateOption) => void; onCustomRateChange: (value: string) => void }) {
  return (
    <div className="space-y-3">
      <span className="block text-sm font-semibold text-navy-800">GST Rate</span>
      <div className="grid grid-cols-3 gap-2 sm:grid-cols-6">
        {GST_RATES.map((rate) => <button key={rate} type="button" onClick={() => onOptionChange(rate)} className={`rounded-2xl border px-3 py-3 text-sm font-semibold transition ${option === rate ? "border-gold-500/50 bg-gold-50 text-gold-800 shadow-sm" : "border-navy-100 bg-white text-navy-600 hover:border-gold-500/30 hover:text-navy-950"}`}>{rate === "custom" ? "Custom" : `${rate}%`}</button>)}
      </div>
      {option === "custom" && <NumberField label="Custom GST rate" value={customRate} onChange={onCustomRateChange} suffix="%" />}
    </div>
  );
}

function ResultCards({ title, lines }: { title: string; lines: ResultLine[] }) {
  return (
    <div className="rounded-3xl border border-gold-500/15 bg-gradient-to-br from-navy-950 via-navy-900 to-navy-800 p-4 text-white shadow-[0_24px_70px_-34px_rgba(13,23,42,0.8)] md:p-5">
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div><p className="text-xs font-semibold uppercase tracking-[0.22em] text-gold-300">Live Result</p><h4 className="mt-1 font-display text-xl font-semibold">{title}</h4></div>
        <div className="flex gap-2">
          <button type="button" onClick={() => copyResult(title, lines)} aria-label="Copy result" className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/80 transition hover:border-gold-400/40 hover:text-gold-300"><Copy className="h-4 w-4" /></button>
          <button type="button" onClick={() => window.print()} aria-label="Print result" className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/80 transition hover:border-gold-400/40 hover:text-gold-300"><Printer className="h-4 w-4" /></button>
        </div>
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        {lines.map((line) => <div key={line.label} className={`rounded-2xl border p-4 ${line.tone === "success" ? "border-emerald-400/20 bg-emerald-400/10" : line.tone === "warning" ? "border-gold-400/20 bg-gold-400/10" : "border-white/10 bg-white/[0.04]"}`}><p className="text-xs font-medium uppercase tracking-[0.16em] text-white/45">{line.label}</p><p className="mt-2 text-lg font-semibold text-white">{line.value}</p></div>)}
      </div>
    </div>
  );
}

function ToolCard({ id, icon: Icon, title, description, children }: { id: string; icon: IconType; title: string; description: string; children: ReactNode }) {
  return (
    <section id={id} className="rounded-3xl border border-navy-100 bg-white p-4 shadow-[0_24px_80px_-40px_rgba(13,23,42,0.35)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_30px_90px_-42px_rgba(13,23,42,0.45)] md:p-6">
      <div className="mb-5 flex items-start gap-4"><div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-gold-100 to-emerald-50 text-gold-700 ring-1 ring-gold-500/15"><Icon className="h-5 w-5" /></div><div><h3 className="font-display text-xl font-semibold text-navy-950">{title}</h3><p className="mt-1 text-sm leading-relaxed text-navy-600">{description}</p></div></div>
      {children}
    </section>
  );
}

function BasicGSTCalculator() {
  const [amount, setAmount] = useState("10000");
  const [mode, setMode] = useState<GstMode>("add");
  const [rateOption, setRateOption] = useState<RateOption>("18");
  const [customRate, setCustomRate] = useState("18");
  const [supply, setSupply] = useState<SupplyPlace>("intrastate");
  const result = useMemo(() => {
    const rate = getRate(rateOption, customRate);
    const input = positive(toNumber(amount));
    const base = mode === "add" ? input : rate > 0 ? input / (1 + rate / 100) : input;
    const gst = mode === "add" ? (base * rate) / 100 : input - base;
    return { rate, base, gst, finalAmount: mode === "add" ? base + gst : input, ...splitTax(gst, supply) };
  }, [amount, customRate, mode, rateOption, supply]);
  return <ToolCard id="basic-gst-calculator" icon={Calculator} title="Basic GST Calculator" description="Add GST to a base price or remove GST from an inclusive price with CGST, SGST, and IGST split."><div className="grid gap-6 lg:grid-cols-[1fr_1.05fr]"><div className="space-y-5"><Segmented label="Calculation Mode" value={mode} onChange={setMode} options={[{ value: "add", label: "Add GST" }, { value: "remove", label: "Remove GST" }]} /><NumberField label={mode === "add" ? "Base amount" : "GST-inclusive amount"} value={amount} onChange={setAmount} prefix="₹" /><RateSelector option={rateOption} customRate={customRate} onOptionChange={setRateOption} onCustomRateChange={setCustomRate} /><Segmented label="Place of Supply" value={supply} onChange={setSupply} options={[{ value: "intrastate", label: "Intrastate" }, { value: "interstate", label: "Interstate" }]} /></div><ResultCards title={`${formatNumber(result.rate)}% GST Summary`} lines={[{ label: "Base Amount", value: formatMoney(result.base) }, { label: "GST Amount", value: formatMoney(result.gst), tone: "warning" }, { label: "Final Amount", value: formatMoney(result.finalAmount), tone: "success" }, { label: "CGST", value: formatMoney(result.cgst) }, { label: "SGST", value: formatMoney(result.sgst) }, { label: "IGST", value: formatMoney(result.igst) }]} /></div></ToolCard>;
}

function InclusiveExclusiveCalculator() {
  const [amount, setAmount] = useState("11800");
  const [rateOption, setRateOption] = useState<RateOption>("18");
  const [customRate, setCustomRate] = useState("18");
  const result = useMemo(() => {
    const rate = getRate(rateOption, customRate);
    const gross = positive(toNumber(amount));
    const exclusive = rate > 0 ? gross / (1 + rate / 100) : gross;
    return { rate, gross, exclusive, gst: gross - exclusive };
  }, [amount, customRate, rateOption]);
  return <ToolCard id="gst-inclusive-exclusive-calculator" icon={Percent} title="GST Inclusive / Exclusive Calculator" description="Convert inclusive invoice values into taxable value and GST amount."><div className="grid gap-6 lg:grid-cols-[1fr_1.05fr]"><div className="space-y-5"><NumberField label="GST-inclusive amount" value={amount} onChange={setAmount} prefix="₹" /><RateSelector option={rateOption} customRate={customRate} onOptionChange={setRateOption} onCustomRateChange={setCustomRate} /><div className="rounded-2xl border border-emerald-500/15 bg-emerald-50 p-4 text-sm leading-relaxed text-emerald-900">Use this when the customer-facing price already includes GST and you need taxable value for billing.</div></div><ResultCards title="Inclusive / Exclusive Split" lines={[{ label: "Inclusive Amount", value: formatMoney(result.gross), tone: "success" }, { label: "Exclusive Amount", value: formatMoney(result.exclusive) }, { label: "GST Amount", value: formatMoney(result.gst), tone: "warning" }, { label: "Applied Rate", value: `${formatNumber(result.rate)}%` }]} /></div></ToolCard>;
}

function InvoiceGSTCalculator() {
  const [quantity, setQuantity] = useState("10");
  const [rate, setRate] = useState("1250");
  const [discount, setDiscount] = useState("500");
  const [charges, setCharges] = useState("250");
  const [rateOption, setRateOption] = useState<RateOption>("18");
  const [customRate, setCustomRate] = useState("18");
  const [supply, setSupply] = useState<SupplyPlace>("intrastate");
  const result = useMemo(() => {
    const subtotal = positive(toNumber(quantity)) * positive(toNumber(rate));
    const discountAmount = Math.min(positive(toNumber(discount)), subtotal);
    const taxable = Math.max(0, subtotal - discountAmount + positive(toNumber(charges)));
    const gst = (taxable * getRate(rateOption, customRate)) / 100;
    return { subtotal, discountAmount, taxable, gst, grandTotal: taxable + gst, ...splitTax(gst, supply) };
  }, [charges, customRate, discount, quantity, rate, rateOption, supply]);
  return <ToolCard id="invoice-gst-calculator" icon={Receipt} title="Invoice GST Calculator" description="Calculate invoice taxable value, GST split, and grand total with quantity, discount, and freight charges."><div className="grid gap-6 xl:grid-cols-[1fr_1.05fr]"><div className="grid gap-5 sm:grid-cols-2"><NumberField label="Quantity" value={quantity} onChange={setQuantity} step="1" /><NumberField label="Rate per unit" value={rate} onChange={setRate} prefix="₹" /><NumberField label="Discount" value={discount} onChange={setDiscount} prefix="₹" /><NumberField label="Freight / other charges" value={charges} onChange={setCharges} prefix="₹" /><div className="sm:col-span-2"><RateSelector option={rateOption} customRate={customRate} onOptionChange={setRateOption} onCustomRateChange={setCustomRate} /></div><div className="sm:col-span-2"><Segmented label="Place of Supply" value={supply} onChange={setSupply} options={[{ value: "intrastate", label: "Intrastate" }, { value: "interstate", label: "Interstate" }]} /></div></div><div className="rounded-3xl border border-navy-100 bg-gradient-to-br from-white to-navy-50 p-5 shadow-inner"><p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-700">Invoice Preview</p><h4 className="mt-1 font-display text-2xl font-semibold text-navy-950">GST Tax Invoice</h4>{[["Subtotal", result.subtotal], ["Less: Discount", result.discountAmount], ["Taxable Value", result.taxable], ["CGST", result.cgst], ["SGST", result.sgst], ["IGST", result.igst]].map(([label, value]) => <div key={label} className="mt-3 flex justify-between rounded-2xl bg-white px-4 py-3 text-sm shadow-sm"><span>{label}</span><strong>{formatMoney(Number(value))}</strong></div>)}<div className="mt-3 flex justify-between rounded-2xl bg-gradient-to-r from-gold-500 to-gold-700 px-4 py-4 text-navy-950"><strong>Grand Total</strong><strong>{formatMoney(result.grandTotal)}</strong></div></div></div></ToolCard>;
}

function ReverseGSTCalculator() {
  const [total, setTotal] = useState("59000");
  const [rateOption, setRateOption] = useState<RateOption>("18");
  const [customRate, setCustomRate] = useState("18");
  const result = useMemo(() => { const rate = getRate(rateOption, customRate); const gross = positive(toNumber(total)); const base = rate > 0 ? gross / (1 + rate / 100) : gross; return { rate, gross, base, gst: gross - base }; }, [customRate, rateOption, total]);
  return <ToolCard id="reverse-gst-calculator" icon={RotateCcw} title="Reverse GST Calculator" description="Reverse-calculate taxable value and GST from a final amount that already includes GST."><div className="grid gap-6 lg:grid-cols-[1fr_1.05fr]"><div className="space-y-5"><NumberField label="Final amount including GST" value={total} onChange={setTotal} prefix="₹" /><RateSelector option={rateOption} customRate={customRate} onOptionChange={setRateOption} onCustomRateChange={setCustomRate} /></div><ResultCards title="Reverse GST Summary" lines={[{ label: "Final Amount", value: formatMoney(result.gross), tone: "success" }, { label: "Taxable Value", value: formatMoney(result.base) }, { label: "GST Removed", value: formatMoney(result.gst), tone: "warning" }, { label: "GST Rate", value: `${formatNumber(result.rate)}%` }]} /></div></ToolCard>;
}

function ITCCalculator() {
  const [outputGst, setOutputGst] = useState("25000");
  const [inputGst, setInputGst] = useState("18000");
  const output = positive(toNumber(outputGst));
  const input = positive(toNumber(inputGst));
  return <ToolCard id="gst-itc-calculator" icon={ShieldCheck} title="GST Input Tax Credit Calculator" description="Compare output GST collected with input GST paid to estimate ITC and net liability."><div className="grid gap-6 lg:grid-cols-[1fr_1.05fr]"><div className="space-y-5"><NumberField label="Output GST collected" value={outputGst} onChange={setOutputGst} prefix="₹" /><NumberField label="Input GST paid" value={inputGst} onChange={setInputGst} prefix="₹" /></div><ResultCards title="ITC Position" lines={[{ label: "Output GST", value: formatMoney(output) }, { label: "ITC Available", value: formatMoney(input), tone: "success" }, { label: "Net GST Payable", value: formatMoney(Math.max(0, output - input)), tone: output > input ? "warning" : "success" }, { label: "Refund / Carry Forward", value: formatMoney(Math.max(0, input - output)), tone: input > output ? "success" : "default" }]} /></div></ToolCard>;
}

function LateFeeInterestCalculator() {
  const [dueDate, setDueDate] = useState("2026-04-20");
  const [filingDate, setFilingDate] = useState("2026-04-30");
  const [taxPayable, setTaxPayable] = useState("15000");
  const [returnType, setReturnType] = useState<ReturnType>("normal");
  const delayDays = daysBetween(dueDate, filingDate);
  const dailyFee = returnType === "nil" ? 20 : 50;
  const lateFee = delayDays * dailyFee;
  const interest = (positive(toNumber(taxPayable)) * 0.18 * delayDays) / 365;
  return <ToolCard id="gst-late-fee-interest-calculator" icon={CalendarClock} title="GST Late Fee / Interest Calculator" description="Estimate late fee and simple interest at 18% p.a. using filing delay and return type."><div className="grid gap-6 lg:grid-cols-[1fr_1.05fr]"><div className="grid gap-5 sm:grid-cols-2"><label className="block"><span className="mb-2 block text-sm font-semibold text-navy-800">Due date</span><input type="date" value={dueDate} onChange={(event) => setDueDate(event.target.value)} className="min-h-12 w-full rounded-2xl border border-navy-100 bg-navy-50/70 px-4 font-semibold text-navy-950 outline-none" /></label><label className="block"><span className="mb-2 block text-sm font-semibold text-navy-800">Filing date</span><input type="date" value={filingDate} onChange={(event) => setFilingDate(event.target.value)} className="min-h-12 w-full rounded-2xl border border-navy-100 bg-navy-50/70 px-4 font-semibold text-navy-950 outline-none" /></label><NumberField label="Tax payable" value={taxPayable} onChange={setTaxPayable} prefix="₹" /><SelectField label="Return type" value={returnType} onChange={setReturnType} options={[{ value: "normal", label: "Normal return - ₹50/day" }, { value: "nil", label: "NIL return - ₹20/day" }]} /></div><ResultCards title="Late Fee Estimate" lines={[{ label: "Delay Days", value: `${delayDays} day${delayDays === 1 ? "" : "s"}` }, { label: "Late Fee", value: formatMoney(lateFee), tone: "warning" }, { label: "Interest @ 18% p.a.", value: formatMoney(interest), tone: "warning" }, { label: "Total Estimate", value: formatMoney(lateFee + interest), tone: "success" }]} /></div></ToolCard>;
}

function CompositionSchemeCalculator() {
  const [turnover, setTurnover] = useState("5000000");
  const [normalRate, setNormalRate] = useState("18");
  const [business, setBusiness] = useState<CompositionBusiness>("trader");
  const rates: Record<CompositionBusiness, number> = { trader: 1, manufacturer: 2, restaurant: 5, service: 6 };
  const amount = positive(toNumber(turnover));
  const normal = (amount * positive(toNumber(normalRate))) / 100;
  const composition = (amount * rates[business]) / 100;
  return <ToolCard id="gst-composition-scheme-calculator" icon={Store} title="GST Composition Scheme Calculator" description="Compare normal GST with composition scheme rates for common business categories."><div className="grid gap-6 lg:grid-cols-[1fr_1.05fr]"><div className="space-y-5"><NumberField label="Annual turnover" value={turnover} onChange={setTurnover} prefix="₹" /><NumberField label="Normal GST rate for comparison" value={normalRate} onChange={setNormalRate} suffix="%" /><SelectField label="Business category" value={business} onChange={setBusiness} options={[{ value: "trader", label: "Trader - 1%" }, { value: "manufacturer", label: "Manufacturer - 2%" }, { value: "restaurant", label: "Restaurant - 5%" }, { value: "service", label: "Service / mixed - 6%" }]} /></div><ResultCards title="Scheme Comparison" lines={[{ label: "Turnover", value: formatMoney(amount) }, { label: "Normal GST Estimate", value: formatMoney(normal), tone: "warning" }, { label: `Composition @ ${rates[business]}%`, value: formatMoney(composition), tone: "success" }, { label: normal >= composition ? "Estimated Difference" : "Additional Cost", value: formatMoney(Math.abs(normal - composition)), tone: normal >= composition ? "success" : "warning" }]} /></div></ToolCard>;
}

function ThresholdCalculator() {
  const [stateCategory, setStateCategory] = useState<StateCategory>("normal");
  const [state, setState] = useState("Rajasthan");
  const [turnover, setTurnover] = useState("3500000");
  const [businessType, setBusinessType] = useState<BusinessType>("goods");
  const threshold = businessType === "goods" ? (stateCategory === "special" ? 2000000 : 4000000) : stateCategory === "special" ? 1000000 : 2000000;
  const amount = positive(toNumber(turnover));
  const required = amount >= threshold;
  return <ToolCard id="gst-turnover-threshold-calculator" icon={MapPinned} title="GST Turnover Threshold Calculator" description="Check GST registration requirement based on state category, turnover, and business type."><div className="grid gap-6 lg:grid-cols-[1fr_1.05fr]"><div className="space-y-5"><label className="block"><span className="mb-2 block text-sm font-semibold text-navy-800">State</span><input type="text" value={state} onChange={(event) => setState(event.target.value)} className="min-h-12 w-full rounded-2xl border border-navy-100 bg-navy-50/70 px-4 font-semibold text-navy-950 outline-none" /></label><SelectField label="State category" value={stateCategory} onChange={setStateCategory} options={[{ value: "normal", label: "Normal category state" }, { value: "special", label: "Special category state" }]} /><NumberField label="Annual turnover" value={turnover} onChange={setTurnover} prefix="₹" /><Segmented label="Business type" value={businessType} onChange={setBusinessType} options={[{ value: "goods", label: "Goods" }, { value: "services", label: "Services" }]} /><div className="rounded-2xl border border-navy-100 bg-navy-50 p-4 text-xs leading-relaxed text-navy-600">Special category examples: {specialStates}.</div></div><ResultCards title={required ? "Registration Required" : "Registration Not Mandatory Yet"} lines={[{ label: "State", value: state || "Not specified" }, { label: "Turnover", value: formatMoney(amount) }, { label: "Applicable Threshold", value: formatMoney(threshold) }, { label: required ? "Excess Over Threshold" : "Room Before Threshold", value: formatMoney(Math.abs(amount - threshold)), tone: required ? "warning" : "success" }, { label: "Recommendation", value: required ? "GST registration is recommended immediately." : "Registration may not be mandatory yet; voluntary registration can help with B2B credibility.", tone: required ? "warning" : "success" }]} /></div></ToolCard>;
}

const faqs = [
  ["Is this GST calculator suitable for invoices?", "Yes. The invoice calculator covers quantity, rate, discount, freight or other charges, GST rate, and intrastate or interstate split."],
  ["Does the calculator store my financial data?", "No. Calculations happen live in the browser and do not require a page reload or data submission."],
  ["Which late fee rates are used?", "The page uses ₹50 per day for normal returns and ₹20 per day for NIL returns, with 18% p.a. simple interest."],
  ["Should I rely on this for final GST filing?", "Use it as an estimate. Final filing should be checked against invoices, ITC eligibility, return period, and GST portal data."],
];

export default function GSTTools() {
  return (
    <div className="bg-[#f7f8fb] text-navy-950">
      <section className="relative overflow-hidden pt-32 pb-16"><div className="absolute inset-0 bg-grid-light opacity-70" /><div className="absolute left-1/2 top-0 h-80 w-[44rem] -translate-x-1/2 rounded-full bg-gold-200/30 blur-3xl" /><div className="relative mx-auto max-w-7xl px-4 md:px-6 lg:px-8"><div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center"><div><div className="inline-flex items-center gap-2 rounded-full border border-gold-500/20 bg-white/80 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-gold-700 shadow-sm"><Calculator className="h-4 w-4" /> GST Calculator Suite</div><h1 className="mt-6 font-display text-4xl font-semibold leading-tight text-navy-950 md:text-6xl">Premium GST calculators for faster tax decisions.</h1><p className="mt-5 max-w-2xl text-base leading-relaxed text-navy-600 md:text-lg">Calculate GST-inclusive prices, invoice tax splits, ITC position, late fees, composition liability, and registration threshold in one clean workspace.</p><div className="mt-8 flex flex-wrap gap-3"><a href="#basic-gst-calculator" className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-gold-500 to-gold-700 px-6 py-3 text-sm font-semibold text-navy-950 shadow-lg shadow-gold-500/20 transition hover:scale-[1.02]">Start Calculating</a><Link to="/consultation" className="inline-flex items-center gap-2 rounded-full border border-navy-200 bg-white px-6 py-3 text-sm font-semibold text-navy-800 shadow-sm transition hover:border-gold-500/40 hover:text-gold-700">Ask an Expert</Link></div></div><div className="rounded-3xl border border-white bg-white/85 p-5 shadow-[0_30px_90px_-45px_rgba(13,23,42,0.5)] backdrop-blur"><div className="grid gap-3 sm:grid-cols-2">{[["8", "GST tools"], ["0", "page reloads"], ["18%", "interest p.a."], ["Live", "calculation"]].map(([value, label]) => <div key={label} className="rounded-2xl border border-navy-100 bg-gradient-to-br from-white to-navy-50 p-4"><div className="font-display text-3xl font-semibold text-navy-950">{value}</div><div className="mt-1 text-xs font-semibold uppercase tracking-[0.18em] text-navy-500">{label}</div></div>)}</div><div className="mt-4 rounded-2xl bg-navy-950 p-4 text-white"><p className="font-semibold">Built for Indian GST workflows</p><p className="mt-1 text-sm text-white/60">CGST, SGST, IGST, ITC, late fee, composition, and threshold checks.</p></div></div></div></div></section>
      <section className="mx-auto max-w-7xl px-4 pb-16 md:px-6 lg:px-8"><p className="text-xs font-semibold uppercase tracking-[0.22em] text-gold-700">GST Tools</p><h2 className="mt-2 font-display text-2xl font-semibold text-navy-950 md:text-3xl">Live calculators for common GST decisions</h2><p className="mt-2 max-w-3xl text-sm leading-relaxed text-navy-600 md:text-base">Every calculator updates while you type, validates negative inputs, and lets you copy or print results.</p><div className="mt-6 grid gap-6"><BasicGSTCalculator /><InclusiveExclusiveCalculator /><InvoiceGSTCalculator /><ReverseGSTCalculator /><ITCCalculator /><LateFeeInterestCalculator /><CompositionSchemeCalculator /><ThresholdCalculator /></div></section>
      <section className="mx-auto max-w-7xl px-4 pb-16 md:px-6 lg:px-8"><div className="rounded-3xl bg-gradient-to-br from-navy-950 via-navy-900 to-navy-800 p-6 text-white shadow-[0_30px_90px_-45px_rgba(13,23,42,0.8)] md:p-8"><div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center"><div><div className="inline-flex items-center gap-2 rounded-full border border-gold-400/20 bg-gold-400/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-gold-300"><Sparkles className="h-4 w-4" /> Need GST help?</div><h2 className="mt-4 font-display text-3xl font-semibold md:text-4xl">File accurately with an expert review.</h2><p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/65 md:text-base">Get help with GST registration, returns, ITC reconciliation, notices, refunds, and monthly compliance from {BRAND.full}.</p></div><div className="flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row"><Link to="/consultation" className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-gold-400 to-gold-600 px-5 py-3 text-sm font-semibold text-navy-950 transition hover:scale-[1.02]">Book Consultation</Link><a href={waLink("Hello, I need help with GST calculation and filing.")} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:border-emerald-400/40 hover:text-emerald-300"><MessageCircle className="h-4 w-4" /> WhatsApp Us</a><Link to="/gst-services" className="inline-flex items-center justify-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:border-gold-400/40 hover:text-gold-300"><FileText className="h-4 w-4" /> File With Expert</Link></div></div></div></section>
      <section className="mx-auto max-w-7xl px-4 pb-20 md:px-6 lg:px-8"><p className="text-xs font-semibold uppercase tracking-[0.22em] text-gold-700">FAQ</p><h2 className="mt-2 font-display text-2xl font-semibold text-navy-950 md:text-3xl">GST calculator questions</h2><div className="mt-6 grid gap-4 md:grid-cols-2">{faqs.map(([q, a]) => <div key={q} className="rounded-3xl border border-navy-100 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg"><div className="flex items-start gap-3"><div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gold-50 text-gold-700"><ShieldCheck className="h-4 w-4" /></div><div><h3 className="font-semibold text-navy-950">{q}</h3><p className="mt-2 text-sm leading-relaxed text-navy-600">{a}</p></div></div></div>)}</div></section>
    </div>
  );
}
