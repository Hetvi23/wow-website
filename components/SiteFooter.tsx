import Footer from "@/components/Footer";
import { getSiteSettings } from "@/lib/erpnext";

// Server wrapper: fetches website settings (socials/contact) and feeds the
// presentational Footer. Use this in pages instead of <Footer /> directly.
export default async function SiteFooter() {
  const settings = await getSiteSettings();
  return <Footer settings={settings} />;
}
