"use client";

import { Users, ShieldCheck, Award, Star } from "lucide-react";

const stats = [
  {
    id: 1,
    Icon: Users,
    value: "15,000+",
    label: "Happy Clients",
    description: "Car owners who trust our doorstep mechanics.",
  },
  {
    id: 2,
    Icon: Star,
    value: "4.9/5",
    label: "Average Rating",
    description: "Based on verified online reviews and feedback.",
  },
  {
    id: 3,
    Icon: ShieldCheck,
    value: "99.8%",
    label: "Satisfaction Rate",
    description: "Delivering first-class service every single time.",
  },
  {
    id: 4,
    Icon: Award,
    value: "24/7",
    label: "Support Presence",
    description: "Round-the-clock emergency support.",
  },
];

export default function Clientele() {
  return (
    <section className="py-20 bg-gradient-to-b from-[#1D1D1C] to-[#3A115F] relative border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((s) => (
            <div
              key={s.id}
              className="text-center p-6 bg-white/5 rounded-2xl border border-white/5 hover:border-white/10 transition-colors"
            >
              <div className="inline-flex p-3 rounded-xl bg-[#E26304]/10 text-[#E26304] mb-4">
                <s.Icon size={24} />
              </div>
              <h3 className="text-3xl md:text-4xl font-black text-white">{s.value}</h3>
              <p className="text-[#87B21D] font-bold text-sm uppercase tracking-wider mt-1">
                {s.label}
              </p>
              <p className="text-white/55 text-xs mt-2 leading-relaxed">
                {s.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
