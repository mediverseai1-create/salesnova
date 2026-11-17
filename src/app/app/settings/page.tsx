import Link from "next/link";

export default function Settings() {
  const pro = process.env.NEXT_PUBLIC_PAYMENT_LINK_PRO, biz = process.env.NEXT_PUBLIC_PAYMENT_LINK_BUSINESS;
  return (
    <div className="max-w-3xl">
      <h1 className="text-4xl font-bold tracking-tight">Settings</h1>
      <h2 className="mt-8 text-xl font-semibold">Plan and credits</h2>
      <p className="mt-1 text-slate-600">Upgrade for more monthly credits.</p>
      <div className="mt-4 grid gap-5 sm:grid-cols-2">
        <div className="card"><h3 className="font-semibold">Professional</h3><p className="text-3xl font-bold mt-1">$47<span className="text-base font-normal text-slate-500"> /mo</span></p><p className="text-sm text-slate-600 mt-2">4,000 credits per month</p>
          <Link href={pro || "/pricing"} className="btn btn-primary mt-4 w-full">Upgrade</Link></div>
        <div className="card"><h3 className="font-semibold">Business</h3><p className="text-3xl font-bold mt-1">$97<span className="text-base font-normal text-slate-500"> /mo</span></p><p className="text-sm text-slate-600 mt-2">11,000 credits per month</p>
          <Link href={biz || "/pricing"} className="btn btn-primary mt-4 w-full">Upgrade</Link></div>
      </div>
    </div>
  );
}
