import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import SiteFooter from "@/components/SiteFooter";
import GalleryGrid from "@/components/GalleryGrid";
import { getGallery, erpFileUrl } from "@/lib/erpnext";

export const metadata: Metadata = {
  title: "Gallery | Auto Avengers",
  description:
    "See Auto Avengers in action — our mobile workshop, before/after transformations, and team at work.",
  alternates: { canonical: "https://care.autoavengers.com/gallery" },
};

export default async function GalleryPage() {
  const { items, categories } = await getGallery();
  const withImages = items.map((i) => ({ ...i, _img: erpFileUrl(i.image) }));

  return (
    <main>
      <Navbar />

      <section className="bg-[#1D1D1C] pt-36 pb-20 angled-clip">
        <div className="max-w-7xl mx-auto px-6">
          <span className="text-[#E26304] font-bold tracking-[0.3em] uppercase text-xs">
            Our Work
          </span>
          <h1 className="text-white text-5xl md:text-6xl font-black mt-3 uppercase tracking-wide">
            The <span className="gradient-text">Gallery</span>
          </h1>
          <p className="text-white/60 max-w-2xl mt-5 text-lg">
            A look at the cars we&apos;ve cared for and the team behind the wow.
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-16">
        <GalleryGrid items={withImages} categories={categories} imageUrl={null} />
      </section>

      <SiteFooter />
    </main>
  );
}
