import { Page, Title } from "@/components/Site";
export default function Privacy() {
  return (
    <Page>
      <Title eyebrow="Legal" title="Privacy policy" />
      <div className="mx-auto mt-10 max-w-2xl px-6 space-y-4 text-slate-600">
        <p>SalesNova collects the account details and sales data you provide in order to run your workspace. We do not sell your data and we do not use it to train shared models.</p>
        <p>Data is stored in an isolated workspace protected by row-level security. You can export or delete your data at any time by contacting us.</p>
        <p>Replace this placeholder with your reviewed legal text before launch.</p>
      </div>
    </Page>
  );
}
