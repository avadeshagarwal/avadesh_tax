import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, Printer } from "lucide-react";
import { InvoiceCalculation } from "@/lib/gstCalculations";

interface InvoicePreviewProps {
  data: InvoiceCalculation;
  companyName?: string;
  invoiceNumber?: string;
  invoiceDate?: string;
  isInterstate?: boolean;
}

export function InvoicePreview({
  data,
  companyName = "Your Company Name",
  invoiceNumber = "INV-001",
  invoiceDate = new Date().toLocaleDateString(),
  isInterstate = false,
}: InvoicePreviewProps) {
  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    const element = document.getElementById("invoice-preview");
    if (element) {
      const html = element.innerHTML;
      const blob = new Blob([html], { type: "text/html" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `invoice-${invoiceNumber}.html`;
      link.click();
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2 justify-end">
        <Button
          variant="outline"
          size="sm"
          onClick={handlePrint}
          className="gap-2 border-slate-200 hover:bg-slate-50"
        >
          <Printer className="h-4 w-4" />
          Print
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={handleDownload}
          className="gap-2 border-slate-200 hover:bg-slate-50"
        >
          <Download className="h-4 w-4" />
          Download
        </Button>
      </div>

      <Card className="border-slate-200 bg-white" id="invoice-preview">
        <CardHeader className="border-b border-slate-200 pb-4">
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-2xl text-slate-900">{companyName}</CardTitle>
              <p className="text-sm text-slate-600 mt-1">Tax Invoice</p>
            </div>
            <div className="text-right">
              <p className="text-sm font-semibold text-slate-900">Invoice No: {invoiceNumber}</p>
              <p className="text-sm text-slate-600">Date: {invoiceDate}</p>
            </div>
          </div>
        </CardHeader>

        <CardContent className="pt-6">
          {/* Invoice Details Table */}
          <div className="mb-6">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b-2 border-slate-300 bg-slate-50">
                  <th className="text-left py-2 px-3 font-semibold text-slate-900">Description</th>
                  <th className="text-right py-2 px-3 font-semibold text-slate-900">Qty</th>
                  <th className="text-right py-2 px-3 font-semibold text-slate-900">Rate</th>
                  <th className="text-right py-2 px-3 font-semibold text-slate-900">Amount</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-slate-200">
                  <td className="py-3 px-3 text-slate-700">Product/Service</td>
                  <td className="text-right py-3 px-3 text-slate-700 font-mono">{data.quantity}</td>
                  <td className="text-right py-3 px-3 text-slate-700 font-mono">₹{data.rate.toFixed(2)}</td>
                  <td className="text-right py-3 px-3 text-slate-700 font-mono">₹{data.subtotal.toFixed(2)}</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Summary Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Left: Notes */}
            <div>
              <p className="text-xs font-semibold text-slate-600 uppercase mb-2">Notes</p>
              <p className="text-xs text-slate-600">Thank you for your business!</p>
            </div>

            {/* Right: Calculations */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-slate-600">Subtotal:</span>
                <span className="font-mono text-slate-900">₹{data.subtotal.toFixed(2)}</span>
              </div>
              {data.discount > 0 && (
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600">Discount:</span>
                  <span className="font-mono text-slate-900">-₹{data.discount.toFixed(2)}</span>
                </div>
              )}
              {data.freight > 0 && (
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600">Freight:</span>
                  <span className="font-mono text-slate-900">₹{data.freight.toFixed(2)}</span>
                </div>
              )}
              {data.otherCharges > 0 && (
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600">Other Charges:</span>
                  <span className="font-mono text-slate-900">₹{data.otherCharges.toFixed(2)}</span>
                </div>
              )}
              <div className="border-t border-slate-200 pt-2 mt-2">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600">Taxable Value:</span>
                  <span className="font-mono font-semibold text-slate-900">₹{data.taxableValue.toFixed(2)}</span>
                </div>
              </div>

              {/* Tax Breakdown */}
              <div className="border-t border-slate-200 pt-2 mt-2 space-y-1">
                {isInterstate ? (
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600">IGST:</span>
                    <span className="font-mono text-slate-900">₹{data.igst.toFixed(2)}</span>
                  </div>
                ) : (
                  <>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-600">CGST:</span>
                      <span className="font-mono text-slate-900">₹{data.cgst.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-600">SGST:</span>
                      <span className="font-mono text-slate-900">₹{data.sgst.toFixed(2)}</span>
                    </div>
                  </>
                )}
              </div>

              {/* Grand Total */}
              <div className="border-t-2 border-slate-900 pt-2 mt-2 bg-slate-50 p-3 rounded">
                <div className="flex justify-between">
                  <span className="font-semibold text-slate-900">Grand Total:</span>
                  <span className="font-mono font-bold text-lg text-emerald-700">
                    ₹{data.grandTotal.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="border-t border-slate-200 mt-6 pt-4 text-center text-xs text-slate-600">
            <p>This is a computer-generated invoice. No signature required.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

