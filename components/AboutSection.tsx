import { AboutSectionData, WhyUsFeatureData } from "@/lib/responseType";
import { Award, Clock, Shield, Sparkles, LucideIcon } from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  Award,
  Clock,
  Shield,
  Sparkles,
};
export default function AboutSection({
  description1,
  label,
  title,
  features,
}: AboutSectionData & {
  features?: WhyUsFeatureData[];
}) {
  return (
    <section id="about" className="py-20 relative overflow-hidden bg-white">
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="text-4xl md:text-5xl font-bold text-main-color mb-4">
            {label}
          </p>
          <div className="w-24 h-1 bg-main-color/90 mx-auto rounded-full mb-6" />
          <p className="text-2xl font-semibold mb-4">{title}</p>
          <p className="text-low-color text-lg max-w-3xl mx-auto leading-relaxed">
            {description1}
          </p>
        </div>

        {features && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-20">
            {features.map((item) => {
              const Icon = iconMap[item.icon as keyof typeof iconMap];

              return (
                <div
                  key={item.title}
                  className="group bg-card-background text-black border border-main-color/10 rounded-2xl p-10 text-center hover:border-main-color/30 transition">
                  {Icon && (
                    <Icon className="w-8 h-8 text-main-color mx-auto mb-3" />
                  )}

                  <div className="text-2xl font-bold text-main-color mb-1">
                    {item.title}
                  </div>

                  <div className="text-low-color text-sm">
                    {item.description}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
