import "./globals.css";
import { Instrument_Sans } from "next/font/google";
import type { Metadata } from "next";
const sans = Instrument_Sans({ subsets: ["latin"], variable: "--font-sans" });
export const metadata: Metadata = { title: "SalesNova — the AI sales team for teams with more pipeline than time", description: "SalesNova unifies your pipeline, calls and follow-ups into one governed system of record." };
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="en"><body className={`${sans.variable} font-sans antialiased`}>{children}</body></html>;
}
