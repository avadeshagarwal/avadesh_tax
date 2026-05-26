import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Calculator,
  Percent,
  FileText,
  RotateCcw,
  CreditCard,
  Clock,
  TrendingUp,
  BarChart3,
  Menu,
  X,
} from "lucide-react";

export interface CalculatorTab {
  id: string;
  label: string;
  icon: React.ReactNode;
  description: string;
}

export const CALCULATOR_TABS: CalculatorTab[] = [
  {
    id: "basic",
    label: "Basic GST",
    icon: <Calculator className="h-5 w-5" />,
    description: "Add or remove GST from amount",
  },
  {
    id: "inclusive",
    label: "Inclusive/Exclusive",
    icon: <Percent className="h-5 w-5" />,
    description: "Calculate taxable value from inclusive/exclusive amounts",
  },
  {
    id: "invoice",
    label: "Invoice GST",
    icon: <FileText className="h-5 w-5" />,
    description: "Complete invoice GST calculation with breakup",
  },
  {
    id: "reverse",
    label: "Reverse GST",
    icon: <RotateCcw className="h-5 w-5" />,
    description: "Extract GST from final amount",
  },
  {
    id: "itc",
    label: "Input Tax Credit",
    icon: <CreditCard className="h-5 w-5" />,
    description: "Calculate ITC available and net payable",
  },
  {
    id: "latefee",
    label: "Late Fee & Interest",
    icon: <Clock className="h-5 w-5" />,
    description: "Calculate late fee and interest on GST",
  },
  {
    id: "composition",
    label: "Composition Scheme",
    icon: <TrendingUp className="h-5 w-5" />,
    description: "Compare normal GST vs composition scheme",
  },
  {
    id: "turnover",
    label: "Turnover Threshold",
    icon: <BarChart3 className="h-5 w-5" />,
    description: "Check GST registration requirement",
  },
];

interface GSTLayoutProps {
  activeTab: string;
  onTabChange: (tabId: string) => void;
  children: React.ReactNode;
}

export function GSTLayout({ activeTab, onTabChange, children }: GSTLayoutProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/80 backdrop-blur-sm">
        <div className="container flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-emerald-500 to-blue-600 flex items-center justify-center">
              <Calculator className="h-5 w-5 text-white" />
            </div>
            <h1 className="text-xl font-bold text-slate-900">GST Calculator Suite</h1>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 hover:bg-slate-100 rounded-lg transition-colors"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </header>

      <div className="flex flex-col lg:flex-row">
        {/* Sidebar Navigation */}
        <aside
          className={`w-full lg:w-64 border-r border-slate-200 bg-white transition-all duration-300 ${
            mobileMenuOpen ? "block" : "hidden lg:block"
          }`}
        >
          <nav className="p-4 space-y-2 max-h-[calc(100vh-4rem)] overflow-y-auto">
            {CALCULATOR_TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  onTabChange(tab.id);
                  setMobileMenuOpen(false);
                }}
                className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-200 ${
                  activeTab === tab.id
                    ? "bg-emerald-50 border-l-4 border-emerald-500 text-emerald-900"
                    : "text-slate-700 hover:bg-slate-50 border-l-4 border-transparent"
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className={activeTab === tab.id ? "text-emerald-600" : "text-slate-400"}>
                    {tab.icon}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm">{tab.label}</p>
                    <p className="text-xs text-slate-500 truncate">{tab.description}</p>
                  </div>
                </div>
              </button>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-4 lg:p-8">
          <div className="max-w-6xl mx-auto">{children}</div>
        </main>
      </div>
    </div>
  );
}

/**
 * Page Header Component
 */
export function PageHeader({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="mb-8">
      <h2 className="text-3xl font-bold text-slate-900 mb-2">{title}</h2>
      <p className="text-slate-600">{description}</p>
    </div>
  );
}
