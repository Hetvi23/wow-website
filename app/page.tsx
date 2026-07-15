import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Services from "@/components/Services";
import WhyUs from "@/components/WhyUs";
import Testimonials from "@/components/Testimonials";
import Clientele from "@/components/Clientele";
import Contact from "@/components/Contact";
import SiteFooter from "@/components/SiteFooter";
import { getBanners, erpFileUrl } from "@/lib/erpnext";

export default async function Home() {
  const heroBanners = await getBanners("Hero");
  const banner = heroBanners[0]
    ? { ...heroBanners[0], image: erpFileUrl(heroBanners[0].image) }
    : null;

  return (
    <main>
      <Navbar />
      <Hero banner={banner} />
      <About />
      <Services />
      <WhyUs />
      <Testimonials />
      <Clientele />
      <Contact />
      <SiteFooter />
    </main>
  );
}
