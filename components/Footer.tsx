"use client";

import { Phone, ChevronRight } from "lucide-react";

const navLinks = [
  { label: "About Us", href: "#about" },
  { label: "Premium Care", href: "#services" },
  { label: "Drive with wow", href: "#why-us" },
  { label: "Request Callback", href: "#contact" },
];

const services = [
  "Oil & Filter Change",
  "Brake Repair",
  "Battery Replacement",
  "Advanced Diagnostics",
  "Roadside Assistance",
  "Fleet Services",
];

const socials = [
  { label: "FB", href: "https://facebook.com" },
  { label: "IG", href: "https://instagram.com" },
  { label: "LI", href: "https://linkedin.com" },
];

export default function Footer() {
  return (
    <footer className="bg-[#1D1D1C] border-t border-white/5 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="mb-6 inline-block">
              <img 
                src="/images/wow-images/AA__Logo_PNG.png" 
                alt="Auto Avengers Logo" 
                className="h-20 md:h-24 w-auto object-contain"
              />
            </div>
            <p className="text-gray-500 text-sm leading-relaxed max-w-sm">
              Redefining the automotive experience through doorstep delivery of
              professional repair and maintenance services. Expert automotive
              solutions, certified mechanics, wherever you are.
            </p>
            <div className="mt-8 flex items-center space-x-4">
              <a
                href="tel:+919638610000"
                className="flex items-center text-white font-bold text-sm hover:text-[#E26304] transition-colors duration-200"
              >
                <Phone size={16} className="mr-2 text-[#E26304]" />
                +91 96386 10000
              </a>
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
