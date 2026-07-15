import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import Navbar from "@/components/Navbar";
import SiteFooter from "@/components/SiteFooter";
import ProductGallery from "@/components/ProductGallery";
import { getProduct, erpFileUrl } from "@/lib/erpnext";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const p = await getProduct(slug);
  if (!p) return { title: "Product Not Found | Auto Avengers" };
  const image = erpFileUrl(p.image);
  const url = `https://care.autoavengers.com/products/${p.slug}`;
  return {
    title: `${p.product_name} | Auto Avengers`,
    description: p.short_description || undefined,
    alternates: { canonical: url },
    openGraph: {
      title: p.product_name,
      description: p.short_description || undefined,
      url,
      type: "website",
      images: image ? [{ url: image }] : undefined,
    },
  };
}

export default async function ProductDetail({ params }: Props) {
  const { slug } = await params;
  const p = await getProduct(slug);
  if (!p) notFound();

  const img = erpFileUrl(p.image);
  const images = [
    img,
    "/images/Web_Sec2_Door.png",
    "/images/Web_Sec2_CW.png",
    "/images/Web_Sec2_EC.png",
  ].filter(Boolean) as string[];

  const price = p.price_label || (p.price ? `₹${p.price.toLocaleString("en-IN")}` : "On Request");
  const description = p.description || p.short_description;

  return (
    <main>
      <Navbar />

      <section className="bg-[#1D1D1C] pt-32 pb-14 angled-clip">
        <div className="max-w-5xl mx-auto px-6">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 text-white/50 hover:text-[#E26304] text-sm font-bold uppercase tracking-wider transition-colors"
          >
            <ArrowLeft size={16} /> All Products
          </Link>
          {p.category && (
            <span className="block text-[#E26304] font-bold tracking-[0.25em] uppercase text-xs mt-8">
              {p.category}
            </span>
          )}
          <h1 className="text-white text-4xl md:text-5xl font-black mt-3 leading-tight">
            {p.product_name}
          </h1>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-6 py-16">
        <div className="block flow-root">
          <div className="w-full md:w-[48%] md:float-left mb-8 md:mr-8 md:mb-6">
            <ProductGallery images={images} productName={p.product_name} />
          </div>

          <div className="text-[#1D1D1C]">
            <span className="text-[#E26304] font-bold tracking-[0.2em] uppercase text-[11px] block">
              Price
            </span>
            <div className="mt-1 text-[#3A115F] font-black text-4xl mb-6">{price}</div>

            {description && (
              <div
                className="blog-content leading-relaxed"
                dangerouslySetInnerHTML={{ __html: description }}
              />
            )}

            <div className="mt-8 clear-both md:clear-none">
              <Link
                href="/booking"
                className="inline-block bg-[#E26304] text-white px-8 py-3.5 font-bold text-sm uppercase tracking-widest hover:brightness-110 transition-all rounded-sm"
              >
                Book This Service
              </Link>
              <p className="mt-4 text-[#1D1D1C]/45 text-sm">
                Prefer to talk first? Call us and our team will guide you.
              </p>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
