"use client";

import { motion } from "framer-motion";
import { Navigation, ChevronRight } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative h-[95vh] flex items-center overflow-hidden angled-clip">
      {/* Background Image + Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="/images/wow-images/Website_Banner.png"
          className="w-full h-full object-cover scale-105"
          alt="Modern Car Workshop"
        />
        <div className="absolute inset-0 hero-overlay" />
      </div>

      {/* Decorative purple glow */}
      <div className="absolute top-1/2 right-10 -translate-y-1/2 w-[600px] h-[600px] bg-[#3A115F]/30 rounded-full blur-[120px] z-0 pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="max-w-3xl space-y-7"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="inline-flex items-center space-x-2 bg-[#E26304] px-4 py-1.5"
          >
            <Navigation size={13} className="text-white badge-pulse" />
            <span className="text-white text-[11px] font-bold tracking-[0.22em] uppercase italic">
              Your Car Our Care Anytime Anywhere
            </span>
          </motion.div>

          {/* Headline */}
          <h1 className="text-6xl md:text-8xl font-black text-white leading-[0.9] tracking-tighter uppercase">
            Workshop on{" "}
            <br />
            <span className="gradient-text">Wheels</span>
          </h1>

          {/* Subtext */}
          <p className="text-xl md:text-2xl text-white/75 font-light max-w-xl leading-relaxed">
            Mobile Car Repair &amp; Maintenance at Your Doorstep.
            <span className="block mt-2 text-base font-semibold text-white/60 italic">
              &ldquo;Innovation meets automotive excellence&rdquo;
            </span>
          </p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 pt-2"
          >
            <a
              href="#contact"
              className="group inline-flex items-center justify-center px-10 py-5 bg-[#E26304] text-white font-black text-sm uppercase tracking-widest shadow-2xl shadow-orange-900/30 hover:brightness-110 hover:-translate-y-1 transition-all duration-300"
            >
              Book Service
              <ChevronRight className="ml-2 group-hover:translate-x-1 transition-transform" size={18} />
            </a>
            <a
              href="tel:+919638610000"
              className="inline-flex items-center justify-center px-10 py-5 border-2 border-white text-white font-black text-sm uppercase tracking-widest hover:bg-white hover:text-[#1D1D1C] transition-all duration-300"
            >
              Call Now: +91 96386 10000
            </a>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-16 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center space-y-2 bounce-y">
        <div className="w-[1px] h-10 bg-white/30" />
        <span className="text-white/30 text-[10px] uppercase tracking-widest font-bold">scroll</span>
      </div>
    </section>
  );
}
