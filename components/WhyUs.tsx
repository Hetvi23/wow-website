"use client";

import { motion } from "framer-motion";

const stats = [
  { stat: "30 Min", title: "Response Time", desc: "Minimum arrival time for city-wide emergencies." },
  { stat: "24/7", title: "Availability", desc: "Round-the-clock technician support, every day." },
  { stat: "100%", title: "Certified", desc: "Every mechanic is fully certified and background-checked." },
  { stat: "0", title: "Hidden Costs", desc: "Honest, upfront, and affordable pricing — always." },
];

const reasons = [
  "Fully equipped mobile workshop van",
  "Genuine OEM & aftermarket parts",
  "Real-time service tracking via call",
  "Post-service quality assurance check",
  "Guaranteed workmanship warranty",
  "City-wide coverage, expanding nationally",
];

export default function WhyUs() {
  return (
    <section id="why-us" className="py-28 bg-[#FDFDFD]">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <span className="text-[#E26304] font-bold tracking-[0.3em] uppercase text-xs">
              Unmatched Reliability
            </span>
            <h2 className="text-[#3A115F] text-5xl md:text-6xl font-black mt-2 uppercase tracking-wide">
              Why Choose{" "}
              <span className="text-[#E26304]">Auto Avengers?</span>
            </h2>
            <div className="w-20 h-2 bg-[#87B21D] mt-4" />
          </motion.div>
          <motion.p
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-gray-500 max-w-sm text-right"
          >
            We combine certified expertise with the agility of a mobile unit — bringing the workshop to you.
          </motion.p>
        </div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="grid md:grid-cols-4 gap-px bg-gray-200 border border-gray-200 mb-16"
        >
          {stats.map((item, idx) => (
            <div
              key={idx}
              className="bg-[#FDFDFD] p-10 hover:bg-[#3A115F] group transition-all duration-300 cursor-default"
            >
              <span className="block text-5xl font-black text-[#3A115F] group-hover:text-[#E26304] transition-colors duration-300 mb-3">
                {item.stat}
              </span>
              <h4 className="font-black uppercase tracking-widest text-xs group-hover:text-white transition-colors duration-300 mb-2">
                {item.title}
              </h4>
              <p className="text-gray-500 text-sm group-hover:text-gray-300 transition-colors duration-300">
                {item.desc}
              </p>
            </div>
          ))}
        </motion.div>

        {/* Reasons List */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {reasons.map((reason, idx) => (
            <div
              key={idx}
              className="flex items-start space-x-4 p-5 border border-gray-100 rounded-xl hover:border-[#3A115F]/30 hover:shadow-md transition-all duration-300 group"
            >
              <div className="w-8 h-8 bg-[#3A115F] rounded-full flex items-center justify-center flex-shrink-0 group-hover:bg-[#E26304] transition-colors duration-300">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span className="text-gray-700 font-semibold text-sm leading-snug group-hover:text-[#3A115F] transition-colors duration-300">
                {reason}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
