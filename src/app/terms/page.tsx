import { Page, Title } from "@/components/Site";
export default function Terms() {
  return (
    <Page>
      <Title eyebrow="Legal" title="Terms of service" />
      <div className="mx-auto mt-10 max-w-2xl px-6 space-y-4 text-slate-600">
        <p>By using SalesNova you agree to use the service lawfully and to keep your credentials secure. Plans renew monthly until cancelled. Credits refresh every billing cycle.</p>
        <p>Replace this placeholder with your reviewed legal text before launch.</p>
      </div>
    </Page>
  );
}
