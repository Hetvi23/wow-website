"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import type { Offer } from "@/lib/erpnext";

function alreadyDismissed(offer: Offer): boolean {
  if (typeof window === "undefined") return true;
  const key = `wow-offer-${offer.name}`;
  if (offer.frequency === "Every visit") return false;
  if (offer.frequency === "Once per day") {
    const last = localStorage.getItem(key);
    if (!last) return false;
    return new Date(last).toDateString() === new Date().toDateString();
  }
  // Default: Once per session
  return sessionStorage.getItem(key) === "1";
}

function markDismissed(offer: Offer) {
  const key = `wow-offer-${offer.name}`;
  if (offer.frequency === "Once per day") {
    localStorage.setItem(key, new Date().toISOString());
  } else if (offer.frequency !== "Every visit") {
    sessionStorage.setItem(key, "1");
  }
}

export default function OfferPopup({
  offer,
  image,
}: {
  offer: Offer | null;
  image: string | null;
}) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!offer || alreadyDismissed(offer)) return;
    const delay = (offer.show_after_seconds ?? 4) * 1000;
    const t = setTimeout(() => setOpen(true), delay);
    return () => clearTimeout(t);
  }, [offer]);

  if (!offer) return null;

  function close() {
    if (offer) markDismissed(offer);
    setOpen(false);
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={close}
          className="fixed inset-0 z-[120] bg-black/70 backdrop-blur-sm flex items-center justify-center p-6"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ type: "spring", damping: 22, stiffness: 280 }}
            onClick={(e) => e.stopPropagation()}
            className="relative bg-white rounded-2xl overflow-hidden max-w-md w-full shadow-2xl"
          >
            <button
              onClick={close}
              className="absolute top-3 right-3 z-10 bg-black/30 hover:bg-black/50 text-white rounded-full p-1.5 transition-colors"
              aria-label="Close offer"
            >
              <X size={20} />
            </button>

            {image && (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={image} alt={offer.title} className="w-full h-48 object-cover" />
            )}

            <div className="p-8 text-center">
              <h3 className="text-[#3A115F] text-2xl font-black uppercase">
                {offer.title}
              </h3>
              {offer.description && (
                <p className="text-[#1D1D1C]/65 mt-3">
                  {offer.description}
                  <span className="text-[#E26304] align-super text-xs">*</span>
                </p>
              )}
              {offer.cta_label && (
                <a
                  href={offer.cta_link || "/booking"}
                  onClick={close}
                  className="inline-block mt-6 bg-[#E26304] text-white px-8 py-3 font-bold text-sm uppercase tracking-widest hover:brightness-110 transition-all rounded-sm"
                >
                  {offer.cta_label}
                </a>
              )}
              <p className="mt-4 text-[11px] text-[#1D1D1C]/40">
                *Terms &amp; conditions apply.
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
