"use client";

import { useState } from "react";
import { Star, Play, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Testimonial {
  id: string;
  name: string;
  role: string;
  rating: number;
  review: string;
  image: string;
  videoUrl: string | null;
}

const TESTIMONIALS: Testimonial[] = [
  {
    id: "1",
    name: "Rajesh Patel",
    role: "Honda City Owner",
    rating: 5,
    review: "Absolutely outstanding service! The convenience of a doorstep car service done right in front of me is unmatched. Highly recommend Auto Avengers.",
    image: "/images/Web_Sec2_CW.png",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", // Demonstration video URL
  },
  {
    id: "2",
    name: "Sneha Sharma",
    role: "Hyundai i20 Owner",
    rating: 5,
    review: "The technicians were super professional, explained everything clearly, and finished the maintenance in under an hour. Outstanding value!",
    image: "/images/Web_Sec2_Door.png",
    videoUrl: null,
  },
  {
    id: "3",
    name: "Vikram Shah",
    role: "BMW 3 Series Owner",
    rating: 5,
    review: "Excellent premium care. Safe, prompt, and high quality. The 24/7 roadside assistance gave me complete peace of mind on my highway trip.",
    image: "/images/Web_Sec2_EC.png",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
  },
];

export default function Testimonials() {
  const [activeVideo, setActiveVideo] = useState<string | null>(null);

  return (
    <section className="py-24 bg-[#1D1D1C] relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-[#3A115F]/20 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-[#E26304]/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-[#E26304] font-bold tracking-[0.3em] uppercase text-xs">
            Reviews
          </span>
          <h2 className="text-white text-3xl md:text-4xl font-black mt-2 uppercase tracking-wide">
            What Our <span className="gradient-text">Customers Say</span>
          </h2>
          <p className="text-white/60 mt-4">
            Hear from car owners who trust Auto Avengers for premium doorstep care and quick responses.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.id}
              className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 flex flex-col justify-between transition-transform duration-300 hover:-translate-y-2"
            >
              <div>
                <div className="flex gap-1 mb-6">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} size={16} className="fill-[#E26304] text-[#E26304]" />
                  ))}
                </div>

                <p className="text-white/80 italic leading-relaxed text-sm mb-8">
                  &ldquo;{t.review}&rdquo;
                </p>
              </div>

              <div className="flex items-center justify-between mt-auto">
                <div className="flex items-center gap-3">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-[#E26304]/30">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={t.image} alt={t.name} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-sm">{t.name}</h4>
                    <span className="text-white/50 text-xs">{t.role}</span>
                  </div>
                </div>

                {t.videoUrl && (
                  <button
                    onClick={() => setActiveVideo(t.videoUrl)}
                    className="bg-[#E26304] hover:bg-[#87B21D] text-white p-2.5 rounded-full transition-colors duration-300 shadow-lg flex items-center justify-center"
                    aria-label="Play video testimonial"
                  >
                    <Play size={16} className="fill-current pl-0.5" />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Video Modal */}
      <AnimatePresence>
        {activeVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveVideo(null)}
            className="fixed inset-0 z-[150] bg-black/80 backdrop-blur-md flex items-center justify-center p-4 md:p-8"
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-4xl aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl border border-white/10"
            >
              <button
                onClick={() => setActiveVideo(null)}
                className="absolute top-4 right-4 z-10 bg-black/50 hover:bg-black/85 text-white p-2 rounded-full transition-colors"
                aria-label="Close video"
              >
                <X size={20} />
              </button>
              <iframe
                src={activeVideo}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
