"use client";

import { useState } from "react";
import { MapPin, Phone, Mail, Clock, Navigation } from "lucide-react";
import type { Branch } from "@/lib/erpnext";

function mapSrc(b: Branch) {
  if (b.google_maps_url) {
    const m = b.google_maps_url.match(/src=["']([^"']+)["']/i);
    return m ? m[1] : b.google_maps_url;
  }
  const parts = [b.address, b.city, b.pincode].filter(Boolean).join(", ");
  if (parts) {
    return `https://maps.google.com/maps?q=${encodeURIComponent(parts)}&z=15&output=embed`;
  }
  if (b.latitude && b.longitude) {
    return `https://maps.google.com/maps?q=${b.latitude},${b.longitude}&z=15&output=embed`;
  }
  return `https://maps.google.com/maps?q=${encodeURIComponent(b.branch_name)}&z=14&output=embed`;
}

function directionsUrl(b: Branch) {
  if (b.latitude && b.longitude) {
    return `https://www.google.com/maps/dir/?api=1&destination=${b.latitude},${b.longitude}`;
  }
  const parts = [b.address, b.city, b.pincode].filter(Boolean).join(", ");
  return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(parts || b.branch_name)}`;
}

export default function LocateUsContent({ branches }: { branches: Branch[] }) {
  const [tab, setTab] = useState<"pit-stop" | "our-planet">("pit-stop");

  // Partners/franchises are flagged branch_type = "Partner" in ERPNext; everything
  // else (including legacy rows with no type) shows under Avenger Pit Stop.
  const pitStops = branches.filter((b) => b.branch_type !== "Partner");
  const partners = branches.filter((b) => b.branch_type === "Partner");
  const displayedLocations = tab === "pit-stop" ? pitStops : partners;

  return (
    <div className="space-y-10">
      {/* Tab Selectors */}
      <div className="flex justify-center border-b border-black/5 pb-2 max-w-md mx-auto">
        <button
          onClick={() => setTab("pit-stop")}
          className={`flex-1 py-3 text-sm font-bold uppercase tracking-wider transition-colors border-b-2 ${
            tab === "pit-stop"
              ? "border-[#E26304] text-[#E26304]"
              : "border-transparent text-[#1D1D1C]/60 hover:text-[#3A115F]"
          }`}
        >
          Avenger Pit Stop (Branches)
        </button>
        <button
          onClick={() => setTab("our-planet")}
          className={`flex-1 py-3 text-sm font-bold uppercase tracking-wider transition-colors border-b-2 ${
            tab === "our-planet"
              ? "border-[#E26304] text-[#E26304]"
              : "border-transparent text-[#1D1D1C]/60 hover:text-[#3A115F]"
          }`}
        >
          Our Planet (Partners &amp; Franchise)
        </button>
      </div>

      {displayedLocations.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl border border-black/5 shadow-sm">
          <p className="text-[#3A115F] text-xl font-black uppercase">
            No locations listed
          </p>
          <p className="text-[#1D1D1C]/50 mt-2 text-sm">
            Check back later or call us to confirm service area.
          </p>
        </div>
      ) : (
        <div className="space-y-12">
          {displayedLocations.map((b) => (
            <div
              key={b.branch_name}
              className="grid lg:grid-cols-2 gap-8 items-stretch"
            >
              <div className="bg-white rounded-2xl border border-black/5 shadow-sm p-8 flex flex-col justify-between">
                <div>
                  <h2 className="text-[#3A115F] text-2xl font-black uppercase">
                    {b.branch_name}
                  </h2>
                  <div className="mt-6 space-y-4 text-[#1D1D1C]/75">
                    {(b.address || b.city) && (
                      <p className="flex gap-3 text-sm">
                        <MapPin size={18} className="text-[#E26304] shrink-0 mt-0.5" />
                        <span>
                          {b.address}
                          {b.city ? `, ${b.city}` : ""}
                          {b.pincode ? ` - ${b.pincode}` : ""}
                        </span>
                      </p>
                    )}
                    {b.phone && (
                      <p className="flex gap-3 items-center text-sm">
                        <Phone size={18} className="text-[#E26304] shrink-0" />
                        <a href={`tel:${b.phone}`} className="hover:text-[#E26304] font-semibold">
                          {b.phone}
                        </a>
                      </p>
                    )}
                    {b.email && (
                      <p className="flex gap-3 items-center text-sm">
                        <Mail size={18} className="text-[#E26304] shrink-0" />
                        <a href={`mailto:${b.email}`} className="hover:text-[#E26304] font-semibold">
                          {b.email}
                        </a>
                      </p>
                    )}
                    {b.working_hours && (
                      <p className="flex gap-3 items-center text-sm">
                        <Clock size={18} className="text-[#E26304] shrink-0" />
                        <span>{b.working_hours}</span>
                      </p>
                    )}
                  </div>
                  {b.service_areas && (
                    <div className="mt-6 pt-6 border-t border-black/5">
                      <p className="text-[#E26304] font-bold tracking-[0.2em] uppercase text-[11px] mb-2">
                        Service Areas
                      </p>
                      <p className="text-[#1D1D1C]/70 text-xs leading-relaxed">{b.service_areas}</p>
                    </div>
                  )}
                </div>

                <div className="mt-8 pt-6 border-t border-black/5">
                  <a
                    href={directionsUrl(b)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-[#3A115F] hover:bg-[#E26304] text-white px-5 py-3 rounded-md font-bold text-xs uppercase tracking-wider transition-colors"
                  >
                    <Navigation size={14} /> Get Directions
                  </a>
                </div>
              </div>

              <div className="group rounded-2xl overflow-hidden border border-black/5 shadow-sm min-h-[320px] bg-white">
                <iframe
                  title={`Map of ${b.branch_name}`}
                  src={mapSrc(b)}
                  className="w-full h-full min-h-[320px] grayscale-[0.3] contrast-[1.05] brightness-[1.02] transition duration-500 group-hover:grayscale-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
