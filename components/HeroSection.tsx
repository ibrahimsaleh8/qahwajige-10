import { HeroSectionData } from "@/lib/responseType";
import HeroLinks from "./AnimatedComponents/HeroLinks";
import AboutImage from "./AnimatedComponents/AboutImage";

export default function HeroSection({
  headline,
  subheadline,
  whatsApp,
  image,
}: HeroSectionData & {
  image?: string | null | undefined;
}) {
  return (
    <section id="home" className="relative py-20 md:py-32 bg-second-background">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Text Column - Right */}
          <div className="text-center lg:text-right flex flex-col gap-4">
            <p className="text-white mb-4 px-4 py-2 bg-main-color rounded-full w-fit font-medium text-sm">
              مرحباً بك في عالم الضيافة الفاخرة
            </p>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-[hsl(var(--color-text-heading))] leading-tight mb-6">
              {headline}
            </h1>

            {/* Description */}
            <p className="text-black/80 text-lg md:text-xl mb-10 leading-relaxed max-w-xl mx-auto lg:mx-0">
              {subheadline}
            </p>

            {/* CTA Buttons */}
            <HeroLinks whatsApp={whatsApp} />
          </div>
          {/* Image Column - Left */}
          {image && <AboutImage imageUrl={image} />}
        </div>
      </div>
    </section>
  );
}
