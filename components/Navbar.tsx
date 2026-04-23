"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const navLinks = ["About", "Services", "Why Us", "Contact"];

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
          ? "bg-[#1D1D1C]/95 backdrop-blur-xl shadow-2xl shadow-black/30"
          : "bg-[#1D1D1C]/70 backdrop-blur-md"
      } border-b border-white/10`}
    >
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex flex-col leading-none group">
          <span className="text-2xl font-black text-white tracking-tighter italic group-hover:text-[#E26304] transition-colors duration-300">
            WOW
          </span>
          <span className="text-[10px] text-[#E26304] font-bold tracking-[0.22em] uppercase">
            Workshop on Wheels
          </span>
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase().replace(" ", "-")}`}
              className="text-sm font-semibold text-white/70 hover:text-[#E26304] transition-colors duration-200 uppercase tracking-widest"
            >
              {item}
            </a>
          ))}
          <a
            href="#contact"
            className="bg-[#E26304] text-white px-6 py-2.5 font-bold text-sm uppercase tracking-widest hover:brightness-110 hover:scale-105 transition-all duration-200 shadow-lg shadow-orange-900/20"
          >
            Book Service
          </a>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-white p-2 rounded-sm hover:bg-white/10 transition-colors"
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
            className="md:hidden bg-[#1D1D1C]/98 backdrop-blur-xl border-t border-white/10 px-6 py-6 space-y-5"
          >
            {navLinks.map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase().replace(" ", "-")}`}
                onClick={() => setIsMenuOpen(false)}
                className="block text-sm font-bold text-white/80 hover:text-[#E26304] uppercase tracking-widest transition-colors"
              >
                {item}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setIsMenuOpen(false)}
              className="block text-center bg-[#E26304] text-white py-3 font-bold uppercase tracking-widest text-sm"
            >
              Book Service
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
