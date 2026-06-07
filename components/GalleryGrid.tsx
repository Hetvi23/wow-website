"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import type { GalleryItem } from "@/lib/erpnext";

export default function GalleryGrid({
  items,
  categories,
  imageUrl,
}: {
  items: (GalleryItem & { _img: string | null })[];
  categories: string[];
  imageUrl: string | null;
}) {
  const [active, setActive] = useState<string | null>(null);
  const [lightbox, setLightbox] = useState<string | null>(null);

  const filtered = active
    ? items.filter((i) => i.category === active)
    : items;

  void imageUrl; // images are pre-resolved on the server

  return (
    <>
      {categories.length > 0 && (
        <div className="flex flex-wrap gap-3 mb-10">
          <button
            onClick={() => setActive(null)}
            className={`px-5 py-2 rounded-full text-sm font-bold uppercase tracking-wider transition-colors ${
              !active
                ? "bg-[#E26304] text-white"
                : "bg-white text-[#3A115F] border border-[#3A115F]/15 hover:border-[#E26304]"
            }`}
          >
            All
          </button>
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setActive(c)}
              className={`px-5 py-2 rounded-full text-sm font-bold uppercase tracking-wider transition-colors ${
                active === c
                  ? "bg-[#E26304] text-white"
                  : "bg-white text-[#3A115F] border border-[#3A115F]/15 hover:border-[#E26304]"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      )}

      {filtered.length === 0 ? (
        <div className="text-center py-24">
          <p className="text-[#3A115F] text-2xl font-black uppercase">
            No photos yet
          </p>
          <p className="text-[#1D1D1C]/50 mt-2">Check back soon.</p>
        </div>
      ) : (
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-5 [column-fill:_balance]">
          {filtered.map((item) =>
            item._img ? (
              <motion.button
                key={item.name}
                layout
                onClick={() => setLightbox(item._img)}
                className="mb-5 block w-full break-inside-avoid group relative overflow-hidden rounded-2xl"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item._img}
                  alt={item.caption || "Gallery image"}
                  className="w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {item.caption && (
                  <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-4 text-white text-sm font-semibold text-left opacity-0 group-hover:opacity-100 transition-opacity">
                    {item.caption}
                  </span>
                )}
              </motion.button>
            ) : null
          )}
        </div>
      )}

      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightbox(null)}
            className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-6 cursor-zoom-out"
          >
            <button
              onClick={() => setLightbox(null)}
              className="absolute top-6 right-6 text-white/70 hover:text-white"
              aria-label="Close"
            >
              <X size={32} />
            </button>
            <motion.img
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              src={lightbox}
              alt="Gallery"
              className="max-h-[90vh] max-w-full rounded-lg object-contain"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
