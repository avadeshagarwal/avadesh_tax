import {
  FileCheck2, FileSpreadsheet, ShieldCheck, FileText, UserCheck, Globe2,
  TrendingUp, Briefcase, Receipt, Factory, Building2, Handshake, Users,
  UserRound, HeartHandshake, Rocket, Scale, Stamp, Ship, CreditCard,
  Calculator, ClipboardCheck, PenTool, MailWarning, Video, LucideIcon
} from "lucide-react";

const MAP: Record<string, LucideIcon> = {
  FileCheck2, FileSpreadsheet, ShieldCheck, FileText, UserCheck, Globe2,
  TrendingUp, Briefcase, Receipt, Factory, Building2, Handshake, Users,
  UserRound, HeartHandshake, Rocket, Scale, Trademark: Stamp, Ship, CreditCard,
  Calculator, ClipboardCheck, PenTool, MailWarning, Video,
};

export default function ServiceIcon({ name, className = "w-6 h-6" }: { name: string; className?: string }) {
  const Icon = MAP[name] || Briefcase;
  return <Icon className={className} />;
}
