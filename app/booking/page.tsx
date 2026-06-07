import type { Metadata } from "next";
import { Clock, MapPin, ShieldCheck } from "lucide-react";
import Navbar from "@/components/Navbar";
import SiteFooter from "@/components/SiteFooter";
import BookingForm from "@/components/BookingForm";
import { getBookingOptions } from "@/lib/erpnext";

export const metadata: Metadata = {
  title: "Book a Service | Auto Avengers",
  description:
    "Book doorstep car service with Auto Avengers — choose your service, date and time slot. We come to you.",
  alternates: { canonical: "https://care.autoavengers.com/booking" },
};

const perks = [
  { Icon: MapPin, label: "Doorstep service" },
  { Icon: Clock, label: "Slot of your choice" },
  { Icon: ShieldCheck, label: "Certified technicians" },
];

export default async function BookingPage() {
  const options = await getBookingOptions();

  return (
    <main>
      <Navbar />

      <section className="bg-[#1D1D1C] pt-36 pb-24 angled-clip">
        <div className="max-w-7xl mx-auto px-6">
          <span className="text-[#E26304] font-bold tracking-[0.3em] uppercase text-xs">
            Book Online
          </span>
          <h1 className="text-white text-5xl md:text-6xl font-black mt-3 uppercase tracking-wide">
            Book a <span className="gradient-text">Service</span>
          </h1>
          <p className="text-white/60 max-w-2xl mt-5 text-lg">
            Tell us what your car needs and when. We&apos;ll confirm your slot by
            phone.
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

      <section className="max-w-4xl mx-auto px-6 -mt-12 pb-24">
        <div className="bg-white rounded-2xl border border-black/5 shadow-xl p-8 md:p-10">
          <BookingForm options={options} />
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
