import type { Metadata } from "next";
import { ShieldCheck, Car, BadgeIndianRupee } from "lucide-react";
import Navbar from "@/components/Navbar";
import SiteFooter from "@/components/SiteFooter";
import VoucherForm from "@/components/VoucherForm";

export const metadata: Metadata = {
  title: "₹999 Car Care Voucher | Auto Avengers",
  description:
    "Buy the ₹999 Universal Car Care Voucher — one transparent price for all makes & models, doorstep service done right in front of you.",
  alternates: { canonical: "https://care.autoavengers.com/voucher" },
};

const perks = [
  { Icon: BadgeIndianRupee, label: "One flat ₹999" },
  { Icon: Car, label: "All makes & models" },
  { Icon: ShieldCheck, label: "Certified technicians" },
];

export default function VoucherPage() {
  return (
    <main>
      <Navbar />

      <section className="bg-[#1D1D1C] pt-32 pb-24 angled-clip">
        <div className="max-w-7xl mx-auto px-6">
          <span className="text-[#E26304] font-bold tracking-[0.3em] uppercase text-xs">
            Signature Offer
          </span>
          <h1 className="text-white text-4xl md:text-5xl font-black mt-2 uppercase tracking-wide">
            ₹999 Universal Car Care <span className="gradient-text">Voucher</span>
          </h1>
          <p className="text-white/60 max-w-2xl mt-4">
            One transparent price, designed for all makes &amp; models — doorstep
            service done right in front of you. Register below to grab yours.
          </p>
          <div className="flex flex-wrap gap-6 mt-8">
            {perks.map(({ Icon, label }) => (
              <div key={label} className="flex items-center gap-2 text-white/70">
                <Icon size={18} className="text-[#87B21D]" />
                <span className="text-sm font-semibold">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative z-10 max-w-2xl mx-auto px-6 mt-16 pb-24">
        <div className="bg-white rounded-2xl border border-black/5 shadow-xl p-8 md:p-10">
          <VoucherForm />
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
