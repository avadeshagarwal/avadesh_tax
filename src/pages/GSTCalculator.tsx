import React from "react";
import { GSTLayout } from "@/components/GSTLayout";
import { BasicGSTCalculator } from "./calculators/BasicGST";
import { InclusiveExclusiveCalculator } from "./calculators/InclusiveExclusive";
import { InvoiceGSTCalculator } from "./calculators/InvoiceGST";
import { ReverseGSTCalculator } from "./calculators/ReverseGST";
import { ITCCalculator } from "./calculators/ITCCalculator";
import { LateFeeCalculator } from "./calculators/LateFeeCalculator";
import { CompositionSchemeCalculator } from "./calculators/CompositionScheme";
import { TurnoverThresholdCalculator } from "./calculators/TurnoverThreshold";
import { CTASection } from "@/components/GSTComponents";
import { FAQSection } from "@/components/FAQSection";

export default function GSTCalculator() {
  const [activeTab, setActiveTab] = React.useState("basic");

  const renderCalculator = () => {
    switch (activeTab) {
      case "basic":
        return <BasicGSTCalculator />;
      case "inclusive":
        return <InclusiveExclusiveCalculator />;
      case "invoice":
        return <InvoiceGSTCalculator />;
      case "reverse":
        return <ReverseGSTCalculator />;
      case "itc":
        return <ITCCalculator />;
      case "latefee":
        return <LateFeeCalculator />;
      case "composition":
        return <CompositionSchemeCalculator />;
      case "turnover":
        return <TurnoverThresholdCalculator />;
      default:
        return <BasicGSTCalculator />;
    }
  };

  return (
    <>
      <GSTLayout activeTab={activeTab} onTabChange={setActiveTab}>
        {renderCalculator()}
        <CTASection />
      </GSTLayout>
      <FAQSection />
    </>
  );
}
