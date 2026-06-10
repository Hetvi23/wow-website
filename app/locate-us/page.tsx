import type { Metadata } from "next";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import Navbar from "@/components/Navbar";
import SiteFooter from "@/components/SiteFooter";
import { getBranches } from "@/lib/erpnext";

export const metadata: Metadata = {
  title: "Locate Us | Auto Avengers",
  description:
    "Find your nearest Auto Avengers branch and service area. Doorstep car care across the city.",
  alternates: { canonical: "https://care.autoavengers.com/locate-us" },
};

function mapSrc(b: {
  google_maps_url: string | null;
  latitude: number | null;
  longitude: number | null;
  branch_name: string;
  address: string | null;
  city: string | null;
  pincode: string | null;
}) {
  // 1. A pasted Google "Embed a map" value is the cleanest. Accept either the
  //    bare src URL or the full <iframe ...> HTML (extract its src).
  if (b.google_maps_url) {
    const m = b.google_maps_url.match(/src=["']([^"']+)["']/i);
    return m ? m[1] : b.google_maps_url;
  }

  // 2. Prefer a textual address so Google resolves a real place. Raw lat/long
  //    embeds show a "Place info couldn't load" card; an address avoids it.
  const parts = [b.address, b.city, b.pincode].filter(Boolean).join(", ");
  if (parts) {
    return `https://maps.google.com/maps?q=${encodeURIComponent(parts)}&z=15&output=embed`;
  }

  // 3. Fall back to coordinates, then to the branch name.
  if (b.latitude && b.longitude) {
    return `https://maps.google.com/maps?q=${b.latitude},${b.longitude}&z=15&output=embed`;
  }
  const q = encodeURIComponent(`${b.branch_name} ${b.address || ""}`.trim());
  return `https://maps.google.com/maps?q=${q}&z=14&output=embed`;
}

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
            We come to you — but here&apos;s where our hubs and service areas are.
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-16">
        {branches.length === 0 ? (
          <div className="text-center py-24">
            <p className="text-[#3A115F] text-2xl font-black uppercase">
              Branch details coming soon
            </p>
            <p className="text-[#1D1D1C]/50 mt-2">
              Call us to book doorstep service anywhere in the city.
            </p>
          </div>
        ) : (
          <div className="space-y-16">
            {branches.map((b) => (
              <div
                key={b.branch_name}
                className="grid lg:grid-cols-2 gap-8 items-stretch"
              >
                <div className="bg-white rounded-2xl border border-black/5 shadow-sm p-8">
                  <h2 className="text-[#3A115F] text-2xl font-black uppercase">
                    {b.branch_name}
                  </h2>
                  <div className="mt-6 space-y-4 text-[#1D1D1C]/75">
                    {(b.address || b.city) && (
                      <p className="flex gap-3">
                        <MapPin size={20} className="text-[#E26304] shrink-0 mt-0.5" />
                        <span>
                          {b.address}
                          {b.city ? `, ${b.city}` : ""}
                          {b.pincode ? ` - ${b.pincode}` : ""}
                        </span>
                      </p>
                    )}
                    {b.phone && (
                      <p className="flex gap-3 items-center">
                        <Phone size={20} className="text-[#E26304] shrink-0" />
                        <a href={`tel:${b.phone}`} className="hover:text-[#E26304]">
                          {b.phone}
                        </a>
                      </p>
                    )}
                    {b.email && (
                      <p className="flex gap-3 items-center">
                        <Mail size={20} className="text-[#E26304] shrink-0" />
                        <a href={`mailto:${b.email}`} className="hover:text-[#E26304]">
                          {b.email}
                        </a>
                      </p>
                    )}
                    {b.working_hours && (
                      <p className="flex gap-3 items-center">
                        <Clock size={20} className="text-[#E26304] shrink-0" />
                        <span>{b.working_hours}</span>
                      </p>
                    )}
                  </div>
                  {b.service_areas && (
                    <div className="mt-6 pt-6 border-t border-black/5">
                      <p className="text-[#E26304] font-bold tracking-[0.2em] uppercase text-[11px] mb-2">
                        Service Areas
                      </p>
                      <p className="text-[#1D1D1C]/70 text-sm">{b.service_areas}</p>
                    </div>
                  )}
                </div>

                <div className="group rounded-2xl overflow-hidden border border-black/5 shadow-sm min-h-[320px] bg-white">
                  <iframe
                    title={`Map of ${b.branch_name}`}
                    src={mapSrc(b)}
                    className="w-full h-full min-h-[320px] grayscale-[0.45] contrast-[1.05] brightness-[1.02] transition duration-500 group-hover:grayscale-0"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <SiteFooter />
    </main>
  );
}
