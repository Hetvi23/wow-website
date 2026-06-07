import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import Navbar from "@/components/Navbar";
import SiteFooter from "@/components/SiteFooter";
import { getBlogPost, erpFileUrl } from "@/lib/erpnext";

type Props = { params: Promise<{ slug: string }> };

function formatDate(date: string | null) {
  if (!date) return "";
  return new Date(date).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPost(slug);

  if (!post) {
    return { title: "Post Not Found | Auto Avengers" };
  }

  const image = erpFileUrl(post.cover_image);
  const url = `https://care.autoavengers.com/blog/${post.slug}`;

  return {
    title: `${post.seo_title || post.title} | Auto Avengers`,
    description: post.meta_description || post.excerpt || undefined,
    alternates: { canonical: url },
    openGraph: {
      title: post.seo_title || post.title,
      description: post.meta_description || post.excerpt || undefined,
      url,
      type: "article",
      publishedTime: post.published_on || undefined,
      images: image ? [{ url: image }] : undefined,
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getBlogPost(slug);

  if (!post) notFound();

  const image = erpFileUrl(post.cover_image);
  const tags = post.tags
    ? post.tags.split(",").map((t) => t.trim()).filter(Boolean)
    : [];

  return (
    <main>
      <Navbar />

      <article>
        {/* Header */}
        <header className="bg-[#1D1D1C] pt-32 pb-10">
          <div className="max-w-3xl mx-auto px-6">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-white/50 hover:text-[#E26304] text-sm font-bold uppercase tracking-wider transition-colors"
            >
              <ArrowLeft size={16} /> Back to Blog
            </Link>
            {post.category && (
              <span className="block text-[#E26304] font-bold tracking-[0.25em] uppercase text-xs mt-6">
                {post.category}
              </span>
            )}
            <h1 className="text-white text-3xl md:text-4xl font-black mt-2 leading-tight">
              {post.title}
            </h1>
            <div className="mt-4 flex items-center gap-4 text-white/50 text-sm font-semibold uppercase tracking-wider">
              <span>{post.author || "Auto Avengers"}</span>
              {post.published_on && (
                <>
                  <span className="w-1 h-1 rounded-full bg-white/30" />
                  <span>{formatDate(post.published_on)}</span>
                </>
              )}
            </div>
          </div>
        </header>

        {/* Cover image */}
        {image && (
          <div className="max-w-4xl mx-auto px-6 mt-10">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={image}
              alt={post.title}
              className="w-full rounded-2xl shadow-lg object-cover max-h-[440px]"
            />
          </div>
        )}

        {/* Body */}
        <div className="max-w-3xl mx-auto px-6 py-16">
          <div
            className="blog-content"
            dangerouslySetInnerHTML={{ __html: post.content || "" }}
          />

          {tags.length > 0 && (
            <div className="mt-12 flex flex-wrap gap-2">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-[#3A115F]/5 text-[#3A115F] rounded-full text-xs font-bold uppercase tracking-wider"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}

          {/* CTA */}
          <div className="mt-16 bg-[#3A115F] rounded-2xl p-8 text-center">
            <h3 className="text-white text-2xl font-black uppercase">
              Need a service?
            </h3>
            <p className="text-white/60 mt-2">
              Book doorstep car care with Auto Avengers — anytime, anywhere.
            </p>
            <Link
              href="/#contact"
              className="inline-block mt-6 bg-[#E26304] text-white px-8 py-3 font-bold text-sm uppercase tracking-widest hover:brightness-110 transition-all rounded-sm"
            >
              Book Service
            </Link>
          </div>
        </div>
      </article>

      <SiteFooter />
    </main>
  );
}
