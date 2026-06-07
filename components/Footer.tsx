"use client";

import { Phone, ChevronRight, Mail, MapPin } from "lucide-react";
import type { SiteSettings } from "@/lib/erpnext";

const navLinks = [
  { label: "About Us", href: "/#about" },
  { label: "Premium Care", href: "/#services" },
  { label: "Products", href: "/products" },
  { label: "Gallery", href: "/gallery" },
  { label: "Blog", href: "/blog" },
  { label: "Locate Us", href: "/locate-us" },
  { label: "Book Service", href: "/booking" },
];

const services = [
  "Oil & Filter Change",
  "Brake Repair",
  "Battery Replacement",
  "Advanced Diagnostics",
  "Roadside Assistance",
  "Fleet Services",
];

export default function Footer({ settings }: { settings?: SiteSettings }) {
  const phone = settings?.phone || "+91 96386 10000";
  const email = settings?.email || "Infoautoavengers@gmail.com";
  const address = settings?.address || "Surat, Gujarat, India";
  const socials = [
    { label: "FB", href: settings?.facebook_url },
    { label: "IG", href: settings?.instagram_url },
    { label: "IN", href: settings?.linkedin_url },
    { label: "YT", href: settings?.youtube_url },
    { label: "X", href: settings?.twitter_url },
  ].filter((s) => s.href);

  return (
    <footer className="bg-[#1D1D1C] border-t border-white/5 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="mb-6 inline-block bg-white p-2 rounded-2xl shadow-xl overflow-hidden">
              <img 
                src="/images/wow-images/Auto_Avengers_Logo_2026.jpeg" 
                alt="Auto Avengers Logo" 
                className="h-20 md:h-24 w-auto object-contain rounded-xl"
              />
            </div>
            <p className="text-gray-500 text-sm leading-relaxed max-w-sm">
              Redefining the automotive experience through doorstep delivery of
              professional repair and maintenance services. Expert automotive
              solutions, certified mechanics, wherever you are.
            </p>
            <div className="mt-8 space-y-3">
              <a
                href={`tel:${phone.replace(/\s/g, "")}`}
                className="flex items-center text-white font-bold text-sm hover:text-[#E26304] transition-colors duration-200"
              >
                <Phone size={16} className="mr-2 text-[#E26304]" />
                {phone}
              </a>
              <a
                href={`mailto:${email}`}
                className="flex items-center text-white/80 font-semibold text-sm hover:text-[#E26304] transition-colors duration-200"
              >
                <Mail size={16} className="mr-2 text-[#E26304]" />
                {email}
              </a>
              <p className="flex items-center text-white/80 font-semibold text-sm">
                <MapPin size={16} className="mr-2 text-[#E26304]" />
                {address}
              </p>
            </div>
            <div className="mt-4">
              <a
                href="https://www.autoavengers.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#8852A7] text-sm font-semibold hover:text-[#E26304] transition-colors duration-200"
              >
                www.autoavengers.com
              </a>
            </div>
            {socials.length > 0 && (
              <div className="mt-6 flex items-center gap-3">
                {socials.map(({ label, href }) => (
                  <a
                    key={label}
                    href={href as string}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white/5 hover:bg-[#E26304] text-white/70 hover:text-white w-10 h-10 rounded-full flex items-center justify-center text-xs font-black transition-colors"
                    aria-label={`${label} link`}
                  >
                    {label}
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-white font-black uppercase tracking-[0.2em] text-xs mb-8">
              Navigate
            </h4>
            <ul className="space-y-4">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-gray-500 text-sm font-bold uppercase tracking-wide hover:text-white transition-colors duration-200 flex items-center group"
                  >
                    <ChevronRight
                      size={14}
                      className="mr-2 text-[#87B21D] group-hover:translate-x-1 transition-transform"
                    />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-black uppercase tracking-[0.2em] text-xs mb-8">
              Services
            </h4>
            <ul className="space-y-4">
              {services.map((service) => (
                <li key={service}>
                  <span className="text-gray-500 text-sm font-bold flex items-center">
                    <ChevronRight size={14} className="mr-2 text-[#87B21D]" />
                    {service}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/5 pt-8 flex justify-center pb-4">
          <p className="text-gray-600 text-[11px] font-black uppercase tracking-[0.2em]">
            © 2026 Auto Avengers
          </p>
        </div>
      </div>
    </footer>
  );
}
