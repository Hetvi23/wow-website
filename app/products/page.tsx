import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import SiteFooter from "@/components/SiteFooter";
import { getProducts, getProductCategories, erpFileUrl } from "@/lib/erpnext";

export const metadata: Metadata = {
  title: "Products & Packages | Auto Avengers",
  description:
    "Explore Auto Avengers car care products, service packages and add-ons — transparent pricing, doorstep delivery.",
  alternates: { canonical: "https://care.autoavengers.com/products" },
};

function priceText(p: { price: number | null; price_label: string | null }) {
  if (p.price_label) return p.price_label;
  if (p.price) return `₹${p.price.toLocaleString("en-IN")}`;
  return "On Request";
}

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category } = await searchParams;
  const [products, categories] = await Promise.all([
    getProducts(category),
    getProductCategories(),
  ]);

  return (
    <main>
      <Navbar />

      <section className="bg-[#1D1D1C] pt-32 pb-12 angled-clip">
        <div className="max-w-7xl mx-auto px-6">
          <span className="text-[#E26304] font-bold tracking-[0.3em] uppercase text-xs">
            Premium Care
          </span>
          <h1 className="text-white text-5xl md:text-6xl font-black mt-3 uppercase tracking-wide">
            Products &amp; <span className="gradient-text">Packages</span>
          </h1>
          <p className="text-white/60 max-w-2xl mt-5 text-lg">
            Curated service packages and car care essentials — all delivered to
            your doorstep.
          </p>
        </div>
      </section>

      {categories.length > 0 && (
        <div className="max-w-7xl mx-auto px-6 mt-10 mb-10 flex flex-wrap gap-3">
          <Link
            href="/products"
            className={`px-5 py-2 rounded-full text-sm font-bold uppercase tracking-wider transition-colors ${
              !category
                ? "bg-[#E26304] text-white"
                : "bg-white text-[#3A115F] border border-[#3A115F]/15 hover:border-[#E26304]"
            }`}
          >
            All
          </Link>
          {categories.map((c) => (
            <Link
              key={c}
              href={`/products?category=${encodeURIComponent(c)}`}
              className={`px-5 py-2 rounded-full text-sm font-bold uppercase tracking-wider transition-colors ${
                category === c
                  ? "bg-[#E26304] text-white"
                  : "bg-white text-[#3A115F] border border-[#3A115F]/15 hover:border-[#E26304]"
              }`}
            >
              {c}
            </Link>
          ))}
        </div>
      )}

      <section className="max-w-7xl mx-auto px-6 pb-24">
        {products.length === 0 ? (
          <div className="text-center py-24">
            <p className="text-[#3A115F] text-2xl font-black uppercase">
              No products yet
            </p>
            <p className="text-[#1D1D1C]/50 mt-2">Check back soon.</p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((p) => {
              const img = erpFileUrl(p.image);
              return (
                <Link
                  key={p.slug}
                  href={`/products/${encodeURIComponent(p.slug)}`}
                  className="group flex flex-col bg-white rounded-2xl overflow-hidden shadow-sm border border-black/5 card-hover"
                >
                  <div className="relative h-56 bg-[#3A115F]/5 overflow-hidden">
                    {img ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={img}
                        alt={p.product_name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-[#3A115F]/30 font-black text-2xl">
                        WOW
                      </div>
                    )}
                    <span className="absolute top-3 right-3 bg-white/95 text-[#3A115F] font-black text-sm px-3 py-1 rounded-full shadow">
                      {priceText(p)}
                    </span>
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    {p.category && (
                      <span className="text-[#E26304] font-bold tracking-[0.2em] uppercase text-[11px]">
                        {p.category}
                      </span>
                    )}
                    <h2 className="text-[#1D1D1C] text-xl font-black mt-2 group-hover:text-[#3A115F] transition-colors">
                      {p.product_name}
                    </h2>
                    {p.short_description && (
                      <p className="text-[#1D1D1C]/60 mt-2 text-sm line-clamp-2">
                        {p.short_description}
                      </p>
                    )}
                    <span className="mt-5 inline-flex items-center justify-center bg-[#1D1D1C] group-hover:bg-[#E26304] text-white text-xs font-bold uppercase tracking-widest py-3 rounded-sm transition-colors">
                      View &amp; Enquire
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </section>

      <SiteFooter />
    </main>
  );
}
