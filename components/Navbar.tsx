"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const navLinks: { label: string; href: string }[] = [
  { label: "About", href: "/#about" },
  { label: "Services", href: "/#services" },
  { label: "Products", href: "/products" },
  { label: "Gallery", href: "/gallery" },
  { label: "Blog", href: "/blog" },
  { label: "Locate Us", href: "/locate-us" },
];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-xl shadow-lg shadow-black/5"
          : "bg-white/80 backdrop-blur-md"
      } border-b border-black/5`}
    >
      <div className="max-w-7xl mx-auto px-6 py-2 flex items-center justify-between">
        {/* Logo — transparent, sits directly on the white bar */}
        <Link
          href="/"
          className="flex items-center group transition-transform duration-300 hover:scale-105"
        >
          <img
            src="/images/wow-images/Auto_Avengers_Logo.png"
            alt="Auto Avengers Logo"
            className="h-20 md:h-24 w-auto object-contain"
          />
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="text-sm font-semibold text-[#1D1D1C]/70 hover:text-[#E26304] transition-colors duration-200 uppercase tracking-widest"
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/booking"
            className="bg-[#E26304] text-white px-6 py-2.5 font-bold text-sm uppercase tracking-widest hover:brightness-110 hover:scale-105 transition-all duration-200 shadow-lg shadow-orange-900/20"
          >
            Book Service
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-[#1D1D1C] p-2 rounded-sm hover:bg-black/5 transition-colors"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="md:hidden bg-white border-t border-black/5 px-6 py-6 space-y-5"
          >
            {navLinks.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setIsMenuOpen(false)}
                className="block text-sm font-bold text-[#1D1D1C]/80 hover:text-[#E26304] uppercase tracking-widest transition-colors"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/booking"
              onClick={() => setIsMenuOpen(false)}
              className="block text-center bg-[#E26304] text-white py-3 font-bold uppercase tracking-widest text-sm"
            >
              Book Service
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
