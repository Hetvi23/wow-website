import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import SiteFooter from "@/components/SiteFooter";
import { getBlogPosts, getBlogCategories, erpFileUrl } from "@/lib/erpnext";

export const metadata: Metadata = {
  title: "Blog | Auto Avengers — Car Care Tips & News",
  description:
    "Expert car care advice, maintenance guides, and the latest from Auto Avengers mobile automotive service.",
  alternates: { canonical: "https://care.autoavengers.com/blog" },
};

function formatDate(date: string | null) {
  if (!date) return "";
  return new Date(date).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default async function BlogIndex({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; page?: string }>;
}) {
  const { category, page } = await searchParams;
  const pageNum = Math.max(parseInt(page || "1", 10) || 1, 1);

  const [{ data: posts, has_more }, categories] = await Promise.all([
    getBlogPosts({ page: pageNum, category }),
    getBlogCategories(),
  ]);

  return (
    <main>
      <Navbar />

      {/* Header */}
      <section className="bg-[#1D1D1C] pt-32 pb-12 angled-clip">
        <div className="max-w-7xl mx-auto px-6">
          <span className="text-[#E26304] font-bold tracking-[0.3em] uppercase text-xs">
            The Garage Journal
          </span>
          <h1 className="text-white text-5xl md:text-6xl font-black mt-3 uppercase tracking-wide">
            Car Care <span className="gradient-text">Insights</span>
          </h1>
          <p className="text-white/60 max-w-2xl mt-5 text-lg">
            Tips, guides, and stories from the Auto Avengers team — to keep your
            car running like new.
          </p>
        </div>
      </section>

      {/* Category filter */}
      {categories.length > 0 && (
        <div className="max-w-7xl mx-auto px-6 mt-10 mb-10 flex flex-wrap gap-3">
          <Link
            href="/blog"
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
              href={`/blog?category=${encodeURIComponent(c)}`}
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

      {/* Grid */}
      <section className="max-w-7xl mx-auto px-6 pb-24">
        {posts.length === 0 ? (
          <div className="text-center py-24">
            <p className="text-[#3A115F] text-2xl font-black uppercase">
              No posts yet
            </p>
            <p className="text-[#1D1D1C]/50 mt-2">
              Check back soon for fresh car-care content.
            </p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => {
              const img = erpFileUrl(post.cover_image);
              return (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group block bg-white rounded-2xl overflow-hidden shadow-sm border border-black/5 card-hover"
                >
                  <div className="h-52 bg-[#3A115F]/5 overflow-hidden">
                    {img ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={img}
                        alt={post.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-[#3A115F]/30 font-black text-2xl">
                        WOW
                      </div>
                    )}
                  </div>
                  <div className="p-6">
                    {post.category && (
                      <span className="text-[#E26304] font-bold tracking-[0.2em] uppercase text-[11px]">
                        {post.category}
                      </span>
                    )}
                    <h2 className="text-[#1D1D1C] text-xl font-black mt-2 leading-snug group-hover:text-[#3A115F] transition-colors">
                      {post.title}
                    </h2>
                    {post.excerpt && (
                      <p className="text-[#1D1D1C]/60 mt-3 text-sm line-clamp-3">
                        {post.excerpt}
                      </p>
                    )}
                    <div className="mt-5 flex items-center justify-between text-xs text-[#1D1D1C]/40 font-semibold uppercase tracking-wider">
                      <span>{post.author || "Auto Avengers"}</span>
                      <span>{formatDate(post.published_on)}</span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}

        {/* Pagination */}
        {(pageNum > 1 || has_more) && (
          <div className="flex justify-center gap-4 mt-16">
            {pageNum > 1 && (
              <Link
                href={`/blog?${new URLSearchParams({
                  ...(category ? { category } : {}),
                  page: String(pageNum - 1),
                })}`}
                className="px-6 py-3 bg-white border border-[#3A115F]/15 rounded-full font-bold text-sm uppercase tracking-wider text-[#3A115F] hover:border-[#E26304] transition-colors"
              >
                ← Previous
              </Link>
            )}
            {has_more && (
              <Link
                href={`/blog?${new URLSearchParams({
                  ...(category ? { category } : {}),
                  page: String(pageNum + 1),
                })}`}
                className="px-6 py-3 bg-[#E26304] text-white rounded-full font-bold text-sm uppercase tracking-wider hover:brightness-110 transition-all"
              >
                Next →
              </Link>
            )}
          </div>
        )}
      </section>

      <SiteFooter />
    </main>
  );
}
