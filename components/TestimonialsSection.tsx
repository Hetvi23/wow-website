import { getTestimonials, erpFileUrl } from "@/lib/erpnext";
import Testimonials, { type TestimonialCard } from "./Testimonials";

// Turn an admin-entered video URL into an embeddable one. Handles the common
// YouTube share formats; anything else (or a site-relative upload) is passed
// through resolved to an absolute URL.
function toEmbedUrl(url: string | null): string | null {
  if (!url) return null;
  const u = url.trim();
  if (!u) return null;
  if (u.includes("/embed/")) return u;

  const yt = u.match(
    /(?:youtube\.com\/(?:watch\?v=|shorts\/)|youtu\.be\/)([\w-]{11})/
  );
  if (yt) return `https://www.youtube.com/embed/${yt[1]}`;

  return u.startsWith("http") ? u : erpFileUrl(u);
}

export default async function TestimonialsSection() {
  const rows = await getTestimonials();

  const testimonials: TestimonialCard[] = rows.map((t) => ({
    id: t.name,
    name: t.customer_name,
    role: t.role ?? "",
    rating: t.rating ?? 5,
    review: t.review ?? "",
    image: erpFileUrl(t.image),
    videoUrl: toEmbedUrl(t.video_url),
  }));

  return <Testimonials testimonials={testimonials} />;
}
