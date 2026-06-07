// Server-side helpers for reading public content from the WOW Workshop
// ERPNext backend. These endpoints are whitelisted with allow_guest=True,
// so no API key is required — they are called from Server Components only.

const BASE_URL =
  process.env.ERPNEXT_BASE_URL?.replace(/\/$/, "") ||
  "https://care.autoavengers.com";

// Revalidate cached content every 5 minutes (ISR-style).
const REVALIDATE_SECONDS = 300;

export type BlogPostSummary = {
  slug: string;
  title: string;
  excerpt: string | null;
  cover_image: string | null;
  author: string | null;
  category: string | null;
  tags: string | null;
  published_on: string | null;
};

export type BlogPost = BlogPostSummary & {
  content: string | null;
  seo_title: string | null;
  meta_description: string | null;
};

type ListResponse = {
  message: {
    status: string;
    data: BlogPostSummary[];
    total: number;
    page: number;
    page_size: number;
    has_more: boolean;
  };
};

type DetailResponse = {
  message: {
    status: string;
    data?: BlogPost;
    message?: string;
  };
};

function methodUrl(method: string, params?: Record<string, string | number>) {
  const url = new URL(`${BASE_URL}/api/method/wow_workshop.api.${method}`);
  if (params) {
    for (const [k, v] of Object.entries(params)) {
      if (v !== undefined && v !== null && v !== "") {
        url.searchParams.set(k, String(v));
      }
    }
  }
  return url.toString();
}

/** Absolute URL for an image stored in ERPNext (cover_image is a site-relative path). */
export function erpFileUrl(path: string | null | undefined): string | null {
  if (!path) return null;
  if (path.startsWith("http")) return path;
  return `${BASE_URL}${path}`;
}

export async function getBlogPosts(opts?: {
  page?: number;
  pageSize?: number;
  category?: string;
}): Promise<ListResponse["message"]> {
  const empty = {
    status: "error",
    data: [],
    total: 0,
    page: 1,
    page_size: 9,
    has_more: false,
  };
  try {
    const res = await fetch(
      methodUrl("blog_posts", {
        page: opts?.page ?? 1,
        page_size: opts?.pageSize ?? 9,
        ...(opts?.category ? { category: opts.category } : {}),
      }),
      { next: { revalidate: REVALIDATE_SECONDS } }
    );
    // Fail soft: an empty list renders a friendly empty-state instead of a crash.
    if (!res.ok) return empty;
    const json = (await res.json()) as ListResponse;
    return json.message;
  } catch {
    return empty;
  }
}

export async function getBlogPost(slug: string): Promise<BlogPost | null> {
  try {
    const res = await fetch(methodUrl("blog_post", { slug }), {
      next: { revalidate: REVALIDATE_SECONDS },
    });
    if (!res.ok) return null;
    const json = (await res.json()) as DetailResponse;
    if (json.message?.status !== "success" || !json.message.data) return null;
    return json.message.data;
  } catch {
    return null;
  }
}

export async function getBlogCategories(): Promise<string[]> {
  try {
    const res = await fetch(methodUrl("blog_categories"), {
      next: { revalidate: REVALIDATE_SECONDS },
    });
    if (!res.ok) return [];
    const json = (await res.json()) as { message: { data: string[] } };
    return json.message?.data ?? [];
  } catch {
    return [];
  }
}

// --- Shared low-level fetch helper -----------------------------------------

async function getMethod<T>(
  method: string,
  params?: Record<string, string | number>,
  fallback?: T
): Promise<T> {
  try {
    const res = await fetch(methodUrl(method, params), {
      next: { revalidate: REVALIDATE_SECONDS },
    });
    if (!res.ok) return fallback as T;
    const json = (await res.json()) as { message: { data: T } };
    return (json.message?.data ?? fallback) as T;
  } catch {
    return fallback as T;
  }
}

// --- Products ---------------------------------------------------------------

export type ProductSummary = {
  slug: string;
  product_name: string;
  category: string | null;
  price: number | null;
  price_label: string | null;
  image: string | null;
  short_description: string | null;
};

export type Product = ProductSummary & { description: string | null };

export function getProducts(category?: string) {
  return getMethod<ProductSummary[]>(
    "products",
    category ? { category } : undefined,
    []
  );
}

export function getProductCategories() {
  return getMethod<string[]>("product_categories", undefined, []);
}

export async function getProduct(slug: string): Promise<Product | null> {
  return getMethod<Product | null>("product", { slug }, null);
}

// --- Gallery ----------------------------------------------------------------

export type GalleryItem = {
  name: string;
  caption: string | null;
  image: string | null;
  category: string | null;
};

export async function getGallery(
  category?: string
): Promise<{ items: GalleryItem[]; categories: string[] }> {
  try {
    const res = await fetch(
      methodUrl("gallery", category ? { category } : undefined),
      { next: { revalidate: REVALIDATE_SECONDS } }
    );
    if (!res.ok) return { items: [], categories: [] };
    const json = (await res.json()) as {
      message: { data: GalleryItem[]; categories: string[] };
    };
    return {
      items: json.message?.data ?? [],
      categories: json.message?.categories ?? [],
    };
  } catch {
    return { items: [], categories: [] };
  }
}

// --- Banners ----------------------------------------------------------------

export type Banner = {
  name: string;
  badge_text: string | null;
  heading: string | null;
  subheading: string | null;
  cta_label: string | null;
  cta_link: string | null;
  image: string | null;
  image_mobile: string | null;
};

export function getBanners(placement = "Hero") {
  return getMethod<Banner[]>("banners", { placement }, []);
}

// --- Offer ------------------------------------------------------------------

export type Offer = {
  name: string;
  title: string;
  image: string | null;
  description: string | null;
  cta_label: string | null;
  cta_link: string | null;
  show_after_seconds: number | null;
  frequency: string | null;
};

export function getActiveOffer() {
  return getMethod<Offer | null>("active_offer", undefined, null);
}

// --- Branches ---------------------------------------------------------------

export type Branch = {
  branch_name: string;
  phone: string | null;
  email: string | null;
  address: string | null;
  city: string | null;
  pincode: string | null;
  working_hours: string | null;
  service_areas: string | null;
  latitude: number | null;
  longitude: number | null;
  google_maps_url: string | null;
};

export function getBranches() {
  return getMethod<Branch[]>("branches", undefined, []);
}

// --- Site settings (socials / contact) -------------------------------------

export type SiteSettings = {
  phone?: string | null;
  whatsapp?: string | null;
  email?: string | null;
  address?: string | null;
  facebook_url?: string | null;
  instagram_url?: string | null;
  linkedin_url?: string | null;
  youtube_url?: string | null;
  twitter_url?: string | null;
  show_offer_popup?: boolean;
};

export function getSiteSettings() {
  return getMethod<SiteSettings>("site_settings", undefined, {});
}

// --- Booking ----------------------------------------------------------------

export type BookingOptions = {
  service_types: string[];
  time_slots: string[];
  makes: string[];
};

export function getBookingOptions() {
  return getMethod<BookingOptions>("booking_options", undefined, {
    service_types: [],
    time_slots: [],
    makes: [],
  });
}
