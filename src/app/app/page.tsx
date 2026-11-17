import { Module } from "@/components/Module";
export default function Briefing() {
  return <Module kind="briefing" title="Sales Briefing" blurb="Paste or upload your sales data (CSV works) and get your report, strategy and next best actions." placeholder="customer,product,region,rep,month,revenue&#10;Acme,Pro,West,Dana,2026-09,12000&#10;..." allowFile />;
}
