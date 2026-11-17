import { Module } from "@/components/Module";
export default function Upload() {
  return <Module kind="briefing" title="Upload data" blurb="Upload your sales file (CSV works) to get your report, strategy and next best actions." placeholder="customer,product,region,rep,month,revenue&#10;Acme,Pro,West,Dana,2026-09,12000&#10;..." allowFile />;
}
