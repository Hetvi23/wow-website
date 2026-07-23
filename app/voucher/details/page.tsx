import type { Metadata } from "next";
import Link from "next/link";
import {
  CheckCircle2,
  ShieldCheck,
  Car,
  BadgeIndianRupee,
  Clock3,
  Sparkles,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import SiteFooter from "@/components/SiteFooter";
import { getVoucherPackage } from "@/lib/erpnext";

export const metadata: Metadata = {
  title: "₹999 Package Details | Auto Avengers",
  description:
    "Everything included in the ₹999 Universal Car Care Voucher — services, benefits and terms. One transparent price for all makes & models.",
  alternates: { canonical: "https://care.autoavengers.com/voucher/details" },
};

// Fallback content shown until an admin fills the package in ERPNext
// (WOW Website Settings / the "999 Voucher" item group).
const DEFAULT_SERVICES: { title: string; description: string | null }[] = [
  { title: "Exterior Foam Wash", description: "Thorough doorstep exterior wash and rinse." },
  { title: "Interior Vacuum & Dusting", description: "Cabin vacuuming and dashboard dusting." },
  { title: "Tyre Pressure Check", description: "All four tyres checked and set to spec." },
  { title: "Fluid Top-up Check", description: "Coolant, washer and brake fluid level check." },
  { title: "Battery Health Check", description: "Quick battery voltage and terminal inspection." },
  { title: "Multi-point Inspection", description: "Visual safety inspection with a report." },
];

const DEFAULT_BENEFITS = [
  "One flat price of ₹999 — no hidden charges.",
  "Valid for all makes & models.",
  "Doorstep service, done right in front of you.",
  "Carried out by certified technicians.",
  "Redeemable in easy visits across the voucher validity.",
];

const DEFAULT_TERMS = [
  "The voucher is activated after payment is verified and approved.",
  "Valid for 6 months from the date of issue.",
  "Redemptions are limited as per the active subscription plan.",
  "Non-transferable and non-refundable once activated.",
  "Auto Avengers reserves the right to amend service inclusions.",
];

export default async function VoucherDetailsPage() {
  const pkg = await getVoucherPackage();
  const services = pkg.services.length ? pkg.services : DEFAULT_SERVICES;
  const price = pkg.price ?? 999;

  const perks = [
    { Icon: BadgeIndianRupee, label: `One flat ₹${price}` },
    { Icon: Car, label: "All makes & models" },
    { Icon: ShieldCheck, label: "Certified technicians" },
    { Icon: Clock3, label: "Doorstep service" },
  ];

  return (
    <main>
      <Navbar />

      {/* Hero */}
      <section className="bg-[#1D1D1C] pt-32 pb-24 angled-clip">
        <div className="max-w-7xl mx-auto px-6">
          <span className="text-[#E26304] font-bold tracking-[0.3em] uppercase text-xs">
            Package Details
          </span>
          <h1 className="text-white text-4xl md:text-5xl font-black mt-2 uppercase tracking-wide">
            ₹{price} Universal Car Care{" "}
            <span className="gradient-text">Package</span>
          </h1>
          <p className="text-white/60 max-w-2xl mt-4">
            Everything that&apos;s included, the benefits you get, and the terms —
            all in one place. One transparent price for complete peace of mind.
          </p>
          <div className="flex flex-wrap gap-6 mt-8">
            {perks.map(({ Icon, label }) => (
              <div key={label} className="flex items-center gap-2 text-white/70">
                <Icon size={18} className="text-[#87B21D]" />
                <span className="text-sm font-semibold">{label}</span>
              </div>
            ))}
          </div>
          <Link
            href="/voucher"
            className="inline-flex items-center gap-2 mt-10 bg-[#E26304] text-white px-8 py-4 font-bold uppercase tracking-widest text-sm hover:brightness-110 hover:scale-105 transition-all rounded-sm shadow-lg shadow-orange-900/30"
          >
            <Sparkles size={18} /> Buy for ₹{price}
          </Link>
        </div>
      </section>

      {/* Services included */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="max-w-2xl">
          <span className="text-[#E26304] font-bold tracking-[0.3em] uppercase text-xs">
            What&apos;s Included
          </span>
          <h2 className="text-[#3A115F] text-3xl md:text-4xl font-black mt-2 uppercase tracking-wide">
            Services Included
          </h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
          {services.map((s, i) => (
            <div
              key={`${s.title}-${i}`}
              className="bg-white rounded-2xl border border-black/5 shadow-sm p-6 flex gap-4 hover:-translate-y-1 transition-transform"
            >
              <CheckCircle2 size={22} className="text-[#87B21D] shrink-0 mt-0.5" />
              <div>
                <h3 className="text-[#1D1D1C] font-black uppercase text-sm tracking-wide">
                  {s.title}
                </h3>
                {s.description && (
                  <p className="text-[#1D1D1C]/60 text-sm mt-1 leading-relaxed">
                    {s.description}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Benefits */}
      <section className="bg-[#3A115F]/[0.03] py-20">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-start">
          <div>
            <span className="text-[#E26304] font-bold tracking-[0.3em] uppercase text-xs">
              Why It&apos;s Worth It
            </span>
            <h2 className="text-[#3A115F] text-3xl md:text-4xl font-black mt-2 uppercase tracking-wide">
              Benefits
            </h2>
          </div>
          <div>
            {pkg.benefits ? (
              <div
                className="blog-content text-[#1D1D1C]/75"
                dangerouslySetInnerHTML={{ __html: pkg.benefits }}
              />
            ) : (
              <ul className="space-y-4">
                {DEFAULT_BENEFITS.map((b) => (
                  <li key={b} className="flex gap-3 text-[#1D1D1C]/80">
                    <CheckCircle2
                      size={20}
                      className="text-[#87B21D] shrink-0 mt-0.5"
                    />
                    <span className="text-sm leading-relaxed">{b}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </section>

      {/* Terms & Conditions */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="max-w-2xl">
          <span className="text-[#E26304] font-bold tracking-[0.3em] uppercase text-xs">
            The Fine Print
          </span>
          <h2 className="text-[#3A115F] text-3xl md:text-4xl font-black mt-2 uppercase tracking-wide">
            Terms &amp; Conditions
          </h2>
        </div>
        <div className="mt-8 bg-white rounded-2xl border border-black/5 shadow-sm p-8">
          {pkg.terms ? (
            <div
              className="blog-content text-[#1D1D1C]/75"
              dangerouslySetInnerHTML={{ __html: pkg.terms }}
            />
          ) : (
            <ol className="space-y-3 list-decimal pl-5 text-[#1D1D1C]/75 marker:text-[#E26304] marker:font-bold">
              {DEFAULT_TERMS.map((t) => (
                <li key={t} className="text-sm leading-relaxed pl-1">
                  {t}
                </li>
              ))}
            </ol>
          )}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/voucher"
            className="inline-flex items-center gap-2 bg-[#E26304] text-white px-8 py-4 font-bold uppercase tracking-widest text-sm hover:brightness-110 hover:scale-105 transition-all rounded-sm shadow-lg shadow-orange-900/30"
          >
            <Sparkles size={18} /> Grab Your ₹{price} Voucher
          </Link>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
