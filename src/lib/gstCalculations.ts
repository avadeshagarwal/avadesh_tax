/**
 * GST Calculation Utilities
 * All calculations follow Indian GST rules and regulations
 */

export interface GSTBreakup {
  cgst: number;
  sgst: number;
  igst: number;
  total: number;
}

export interface InvoiceCalculation {
  quantity: number;
  rate: number;
  subtotal: number;
  discount: number;
  discountedSubtotal: number;
  freight: number;
  otherCharges: number;
  taxableValue: number;
  gstAmount: number;
  cgst: number;
  sgst: number;
  igst: number;
  grandTotal: number;
}

export interface CompositionComparison {
  turnover: number;
  normalGST: number;
  compositionRate: number;
  compositionTax: number;
  savings: number;
}

/**
 * Basic GST Calculator - Add GST to amount
 */
export function addGSTToAmount(amount: number, gstRate: number): {
  baseAmount: number;
  gstAmount: number;
  finalAmount: number;
  breakup: GSTBreakup;
} {
  const gstAmount = (amount * gstRate) / 100;
  const finalAmount = amount + gstAmount;

  return {
    baseAmount: amount,
    gstAmount,
    finalAmount,
    breakup: calculateGSTBreakup(gstAmount),
  };
}

/**
 * Basic GST Calculator - Remove GST from amount
 */
export function removeGSTFromAmount(amount: number, gstRate: number): {
  baseAmount: number;
  gstAmount: number;
  finalAmount: number;
  breakup: GSTBreakup;
} {
  const baseAmount = amount / (1 + gstRate / 100);
  const gstAmount = amount - baseAmount;

  return {
    baseAmount,
    gstAmount,
    finalAmount: amount,
    breakup: calculateGSTBreakup(gstAmount),
  };
}

/**
 * Calculate CGST/SGST/IGST breakup
 * CGST = Central GST (intrastate)
 * SGST = State GST (intrastate)
 * IGST = Integrated GST (interstate)
 */
export function calculateGSTBreakup(
  gstAmount: number,
  isInterstate: boolean = false
): GSTBreakup {
  if (isInterstate) {
    return {
      cgst: 0,
      sgst: 0,
      igst: gstAmount,
      total: gstAmount,
    };
  }

  const half = gstAmount / 2;
  return {
    cgst: half,
    sgst: half,
    igst: 0,
    total: gstAmount,
  };
}

/**
 * GST Inclusive/Exclusive Calculator
 */
export function calculateInclusiveExclusive(
  amount: number,
  gstRate: number,
  isInclusive: boolean
): {
  taxableValue: number;
  gstAmount: number;
  totalAmount: number;
} {
  if (isInclusive) {
    const taxableValue = amount / (1 + gstRate / 100);
    const gstAmount = amount - taxableValue;
    return {
      taxableValue,
      gstAmount,
      totalAmount: amount,
    };
  } else {
    const gstAmount = (amount * gstRate) / 100;
    return {
      taxableValue: amount,
      gstAmount,
      totalAmount: amount + gstAmount,
    };
  }
}

/**
 * Invoice GST Calculator
 */
export function calculateInvoiceGST(
  quantity: number,
  rate: number,
  discount: number,
  freight: number,
  otherCharges: number,
  gstRate: number,
  isInterstate: boolean = false
): InvoiceCalculation {
  const subtotal = quantity * rate;
  const discountedSubtotal = subtotal - discount;
  const taxableValue = discountedSubtotal + freight + otherCharges;
  const gstAmount = (taxableValue * gstRate) / 100;

  const breakup = calculateGSTBreakup(gstAmount, isInterstate);

  return {
    quantity,
    rate,
    subtotal,
    discount,
    discountedSubtotal,
    freight,
    otherCharges,
    taxableValue,
    gstAmount,
    cgst: breakup.cgst,
    sgst: breakup.sgst,
    igst: breakup.igst,
    grandTotal: taxableValue + gstAmount,
  };
}

/**
 * Reverse GST Calculator - Extract GST from final amount
 */
export function reverseGST(finalAmount: number, gstRate: number): {
  baseAmount: number;
  gstAmount: number;
  finalAmount: number;
  breakup: GSTBreakup;
} {
  const baseAmount = finalAmount / (1 + gstRate / 100);
  const gstAmount = finalAmount - baseAmount;

  return {
    baseAmount,
    gstAmount,
    finalAmount,
    breakup: calculateGSTBreakup(gstAmount),
  };
}

/**
 * GST Input Tax Credit Calculator
 */
export function calculateITC(
  outputGST: number,
  inputGST: number
): {
  outputGST: number;
  inputGST: number;
  itcAvailable: number;
  netPayable: number;
  isRefundable: boolean;
} {
  const itcAvailable = Math.min(outputGST, inputGST);
  const netPayable = Math.max(0, outputGST - inputGST);
  const isRefundable = inputGST > outputGST;

  return {
    outputGST,
    inputGST,
    itcAvailable,
    netPayable,
    isRefundable,
  };
}

/**
 * GST Late Fee & Interest Calculator
 * Based on CGST/SGST rules
 */
export function calculateLateFeeAndInterest(
  dueDate: Date,
  filingDate: Date,
  taxPayable: number,
  returnType: "GSTR1" | "GSTR3B" | "GSTR9"
): {
  daysLate: number;
  lateFee: number;
  interest: number;
  totalPayable: number;
} {
  const daysLate = Math.max(
    0,
    Math.floor((filingDate.getTime() - dueDate.getTime()) / (1000 * 60 * 60 * 24))
  );

  let lateFee = 0;
  let interest = 0;

  if (daysLate > 0) {
    // Late fee: Rs. 100 per day or 5% of tax, whichever is higher
    lateFee = Math.max(100 * daysLate, (taxPayable * 5) / 100);

    // Interest: 18% per annum (0.049% per day)
    interest = (taxPayable * 18 * daysLate) / (365 * 100);
  }

  return {
    daysLate,
    lateFee,
    interest,
    totalPayable: taxPayable + lateFee + interest,
  };
}

/**
 * GST Composition Scheme Calculator
 * Composition scheme allows small businesses to pay fixed % of turnover
 */
export function calculateCompositionScheme(
  turnover: number,
  businessType: "manufacturing" | "trading" | "services"
): CompositionComparison {
  // Composition rates as per GST rules (as of 2024)
  const compositionRates: Record<string, number> = {
    manufacturing: 1, // 1% for manufacturing
    trading: 1, // 1% for trading
    services: 5, // 5% for services
  };

  const compositionRate = compositionRates[businessType] || 1;

  // Assume average GST rate of 12% for normal scheme
  const normalGSTRate = 12;

  const normalGST = (turnover * normalGSTRate) / 100;
  const compositionTax = (turnover * compositionRate) / 100;
  const savings = normalGST - compositionTax;

  return {
    turnover,
    normalGST,
    compositionRate,
    compositionTax,
    savings,
  };
}

/**
 * GST Turnover Threshold Calculator
 * Determines if GST registration is required
 */
export function calculateTurnoverThreshold(
  turnover: number,
  state: string,
  businessType: string
): {
  registrationRequired: boolean;
  threshold: number;
  recommendation: string;
} {
  // Standard threshold: Rs. 40 lakhs (Rs. 20 lakhs for special category states)
  const specialCategoryStates = [
    "Arunachal Pradesh",
    "Assam",
    "Himachal Pradesh",
    "Jammu & Kashmir",
    "Manipur",
    "Meghalaya",
    "Mizoram",
    "Nagaland",
    "Sikkim",
    "Tripura",
    "Uttarakhand",
  ];

  const threshold = specialCategoryStates.includes(state) ? 2000000 : 4000000; // in rupees
  const registrationRequired = turnover > threshold;

  let recommendation = "";
  if (registrationRequired) {
    recommendation = `GST registration is mandatory. Your turnover (₹${turnover.toLocaleString()}) exceeds the threshold of ₹${threshold.toLocaleString()}.`;
  } else {
    const remainingTurnover = threshold - turnover;
    recommendation = `GST registration is not mandatory. You can register voluntarily. Remaining turnover before mandatory registration: ₹${remainingTurnover.toLocaleString()}.`;
  }

  return {
    registrationRequired,
    threshold,
    recommendation,
  };
}

/**
 * Format number as currency (Indian Rupees)
 */
export function formatCurrency(value: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}

/**
 * Format number with 2 decimal places
 */
export function formatNumber(value: number): string {
  return value.toFixed(2);
}

/**
 * Parse currency string to number
 */
export function parseCurrency(value: string): number {
  return parseFloat(value.replace(/[^\d.-]/g, "")) || 0;
}
