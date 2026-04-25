"use client";

import { motion } from "framer-motion";
import { Clock, UserCheck, MapPin, Wrench, Droplets, ShieldCheck, type LucideIcon } from "lucide-react";

const services: { title: string; desc: string; Icon: LucideIcon; img: string; tag: string }[] = [
  {
    title: "24/7 Roadside Assistance",
    desc: "Emergency breakdown support, battery jumpstarts, and recovery services whenever you're stranded.",
    Icon: Clock,
    tag: "Emergency",
    img: "/images/wow-images/Web_Sec2_RSA2.png",
  },
  {
    title: "Expert Consultation",
    desc: "Professional advice and clear diagnostics from certified automotive technicians.",
    Icon: UserCheck,
    tag: "Advisory",
    img: "/images/wow-images/Web_Sec2_EC.png",
  },
  {
    title: "Doorstep Maintenance",
    desc: "On-site oil changes, filter replacements, and fluid top-ups to keep your engine running smooth.",
    Icon: MapPin,
    tag: "At-Home",
    img: "/images/wow-images/Web_Sec2_Door.png",
  },
  {
    title: "General Repairs",
    desc: "Comprehensive care from brake repairs to engine work — all at your location.",
    Icon: Wrench,
    tag: "Repairs",
    img: "/images/wow-images/Web_Sec2_GS.png",
  },
  {
    title: "Complimentary Car Wash",
    desc: "A premium finishing touch to keep your car looking as good as it runs.",
    Icon: Droplets,
    tag: "Free Add-on",
    img: "/images/wow-images/Web_Sec2_CW.png",
  },
  {
    title: "Exclusive Member Benefits",
    desc: "Member-only perks, priority scheduling, and special rates for loyal customers.",
    Icon: ShieldCheck,
    tag: "Members",
    img: "/images/wow-images/Web_Sec2_Membership.png",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function Services() {
  return (
    <section
      id="services"
      className="py-28 bg-[#1D1D1C] angled-clip-reverse relative overflow-hidden"
    >
      {/* Ambient glow */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#3A115F]/20 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#E26304]/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-20"
        >
          <span className="text-[#E26304] font-bold tracking-[0.4em] uppercase text-xs">
            The Auto Avengers Experience
          </span>
          <h2 className="text-5xl md:text-6xl font-black text-white tracking-wide uppercase mt-4">
            Auto Avengers Premium Care
          </h2>
          <div className="h-1 w-24 bg-[#E26304] mx-auto mt-6" />
        </motion.div>

        {/* Cards Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {services.map((service, idx) => (
            <motion.div
              key={idx}
              variants={cardVariants}
              whileHover={{ y: -8 }}
              className="glass group overflow-hidden flex flex-col"
            >
              {/* Image */}
              <div className="relative h-52 overflow-hidden flex-shrink-0">
                <img
                  src={service.img}
                  alt={service.title}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-600"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1D1D1C] via-[#1D1D1C]/40 to-transparent" />
                {/* Tag badge */}
                <span className="absolute top-4 right-4 bg-[#E26304] text-white text-[10px] font-black uppercase tracking-widest px-3 py-1">
                  {service.tag}
                </span>
                {/* Card number */}
                <span className="absolute bottom-4 left-4 text-white/20 font-black text-5xl leading-none select-none">
                  0{idx + 1}
                </span>
              </div>

              {/* Content */}
              <div className="p-7 flex flex-col flex-1">
                <div className="flex items-center space-x-3 mb-5">
                  <div className="w-11 h-11 bg-[#3A115F] flex items-center justify-center text-[#E26304] group-hover:bg-[#E26304] group-hover:text-white transition-all duration-300 flex-shrink-0">
                    <service.Icon size={20} />
                  </div>
                  <h3 className="text-base font-black text-white uppercase tracking-tight group-hover:text-[#E26304] transition-colors duration-300 leading-tight">
                    {service.title}
                  </h3>
                </div>
                <p className="text-gray-400 text-sm leading-relaxed flex-1">{service.desc}</p>
                <div className="mt-5 h-px bg-gradient-to-r from-[#E26304]/40 to-transparent group-hover:from-[#E26304] transition-all duration-300" />
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom perks bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-4"
        >
          {["Certified & Experienced Technicians", "Advanced Diagnostic Tools", "Genuine Parts & Transparent Pricing"].map(
            (perk, i) => (
              <div
                key={i}
                className="flex items-center space-x-3 bg-white/5 p-5 border-l-4 border-[#87B21D] hover:bg-white/10 transition-colors duration-200"
              >
                <div className="w-2 h-2 bg-[#87B21D] rounded-full flex-shrink-0" />
                <span className="text-white font-bold text-sm">{perk}</span>
              </div>
            )
          )}
        </motion.div>
      </div>
    </section>
  );
}
