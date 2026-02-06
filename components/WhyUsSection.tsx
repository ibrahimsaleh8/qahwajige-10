import { WhyUsSectionData } from "@/lib/responseType";
import { Award, Clock, MapPin, User, LucideIcon } from "lucide-react";
const iconMap: Record<string, LucideIcon> = {
  award: Award,
  clock: Clock,
  shield: MapPin,
  sparkles: User,
  Award,
  Clock,
  Shield: Award,
  Sparkles: User,
};

export function WhyUsSection({
  description,
  features,
  label,
  title,
}: WhyUsSectionData) {
  // Use first feature as testimonial if available, otherwise use default
  const testimonial = features && features.length > 0 ? features[0] : null;
  
  return (
    <section id="why-us" className="py-20 md:py-28 px-4 bg-[hsl(var(--color-main-background))]">
      <div className="container mx-auto">
        <div className="max-w-4xl mx-auto">
          {/* Testimonial Card */}
          <div className="bg-[hsl(var(--color-main-background))] rounded-2xl p-10 md:p-12 shadow-lg text-center relative">
            {/* Quote */}
            <p className="text-2xl md:text-3xl font-bold text-[hsl(var(--color-text-heading))] mb-8 leading-relaxed">
              {testimonial?.description || "كانت الضيافة أكثر من رائعة، فريق عمل محترف، وقهوة تعدل المزاج. بيضتوا وجيهنا أمام ضيوفنا في حفل زفاف ابننا."}
            </p>
            
            {/* Author */}
            <div className="mb-6">
              <p className="text-xl font-bold text-[hsl(var(--color-text-heading))] mb-2">
                {testimonial?.title || "أبو عبد العزيز"}
              </p>
              <p className="text-[hsl(var(--color-text-body))] text-lg">
                {description || "عميل من الرياض"}
              </p>
            </div>
            
            {/* Navigation Dots */}
            <div className="flex items-center justify-center gap-2">
              {[1, 2, 3].map((dot) => (
                <div
                  key={dot}
                  className={`w-2 h-2 rounded-full ${
                    dot === 1
                      ? "bg-[hsl(var(--color-main-color))]"
                      : "bg-[hsl(var(--color-slate-700))]"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
