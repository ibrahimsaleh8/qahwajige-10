// app/page.tsx
import AboutSection from "@/components/AboutSection";
import ContactSection from "@/components/ContactSection";
import FAQSection from "@/components/FAQSection";
import FloatedIcons from "@/components/FloatedIcons";
import Footer from "@/components/Footer";
import { GallerySection } from "@/components/GallerySection";
import { Header } from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import PremiumPackagesSection from "@/components/PremiumPackagesSection";
import RatingSection from "@/components/RatingSection";
import ServicesSection from "@/components/ServicesSection";
import { APP_URL, CurrentProjectId } from "@/lib/ProjectId";
import { ProjectContentResponse } from "@/lib/responseType";
export default async function HomePage() {
  let data;

  try {
    const res = await fetch(
      `${APP_URL}/api/project/${CurrentProjectId}/main-data`,
    );
    data = (await res.json()) as ProjectContentResponse;
  } catch (error) {
    console.error("Failed to fetch project content:", error);

    data = {
      header: { brandName: "قهوجيين الرياض" },
      hero: { headline: "", subheadline: "", whatsApp: "" },
      about: { label: "", title: "", description1: "", image: "" },
      services: { label: "", title: "", description: "", items: [] },
      whyUs: { label: "", title: "", description: "", features: [] },
      gallery: [],
      footer: {
        brandName: "قهوجيين الرياض",
        phone: "",
        email: "",
        address: "",
      },
    };
  }

  return (
    <div className="min-h-screen bg-[hsl(var(--color-main-background))] text-[hsl(var(--color-text-heading))] overflow-x-hidden">
      <Header brandName={data.header.brandName} telephone={data.footer.phone} />
      <HeroSection {...data.hero} image={data.about.image} />
      <AboutSection {...data.about} features={data.whyUs.features} />
      <ServicesSection {...data.services} />
      <PremiumPackagesSection
        packages={data.packages ?? []}
        whatsapp={data.hero?.whatsApp ?? ""}
      />
      <RatingSection
        projectId={CurrentProjectId}
        averageRating={data.rating?.averageRating ?? 0}
        totalRatings={data.rating?.totalRatings ?? 0}
      />
      <FloatedIcons
        whatsapp={data.hero?.whatsApp ?? ""}
        telephone={data.footer.phone ?? ""}
      />

      <FAQSection />
      <GallerySection gallery={data.gallery} />
      <ContactSection {...data.footer} whatsapp={data.hero?.whatsApp ?? ""} />
      <Footer {...data.footer} description={data.hero?.subheadline} />
    </div>
  );
}
