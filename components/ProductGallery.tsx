"use client";

import { useState } from "react";

interface ProductGalleryProps {
  images: string[];
  productName: string;
}

export default function ProductGallery({ images, productName }: ProductGalleryProps) {
  const [activeImage, setActiveImage] = useState(images[0] || "");

  if (images.length === 0) {
    return (
      <div className="aspect-[4/3] flex items-center justify-center bg-[#3A115F]/5 rounded-2xl border border-black/5 text-[#3A115F]/25 font-black text-3xl tracking-widest">
        WOW
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {/* Main Image View */}
      <div className="relative aspect-[4/3] w-full bg-[#3A115F]/5 rounded-2xl overflow-hidden border border-black/5 shadow-sm">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={activeImage}
          alt={productName}
          className="w-full h-full object-cover transition-all duration-300"
        />
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex flex-wrap gap-3">
          {images.map((img, idx) => {
            const isActive = img === activeImage;
            return (
              <button
                key={idx}
                onClick={() => setActiveImage(img)}
                className={`relative w-20 h-20 rounded-lg overflow-hidden border-2 bg-white transition-all duration-200 ${
                  isActive
                    ? "border-[#E26304] scale-95 shadow-md"
                    : "border-black/5 hover:border-[#3A115F]/35"
                }`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={img}
                  alt={`${productName} thumbnail ${idx + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
