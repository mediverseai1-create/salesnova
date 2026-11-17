import { Module } from "@/components/Module";
export default function Ask() {
  return <Module kind="ask" title="Ask in plain language" blurb="Ask a question about your data and get the answer with the numbers behind it." placeholder="Question: Which customers are buying less than last quarter?&#10;&#10;Data:&#10;..." allowFile />;
}
