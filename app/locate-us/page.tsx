import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import SiteFooter from "@/components/SiteFooter";
import LocateUsContent from "@/components/LocateUsContent";
import { getBranches } from "@/lib/erpnext";

export const metadata: Metadata = {
  title: "Locate Us | Auto Avengers",
  description:
    "Find your nearest Auto Avengers branch and service area. Doorstep car care across the city.",
  alternates: { canonical: "https://care.autoavengers.com/locate-us" },
};

export default async function LocateUsPage() {
  const branches = await getBranches();

  return (
    <main>
      <Navbar />

      <section className="bg-[#1D1D1C] pt-32 pb-10 angled-clip">
        <div className="max-w-7xl mx-auto px-6">
          <span className="text-[#E26304] font-bold tracking-[0.3em] uppercase text-xs">
            Find Us
          </span>
          <h1 className="text-white text-4xl md:text-5xl font-black mt-2 uppercase tracking-wide">
            Locate <span className="gradient-text">Us</span>
          </h1>
          <p className="text-white/60 max-w-2xl mt-4">
            We come to you — but here&apos;s where our hubs and partner franchises are.
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-16">
        <LocateUsContent branches={branches} />
      </section>

      <SiteFooter />
    </main>
  );
}
