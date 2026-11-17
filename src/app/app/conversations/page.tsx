import { Module } from "@/components/Module";
export default function Conversations() {
  return <Module kind="conversations" title="Conversations" blurb="Upload a call transcript to get objections, intent, commitments and next steps." placeholder="Paste a call transcript..." allowFile />;
}
