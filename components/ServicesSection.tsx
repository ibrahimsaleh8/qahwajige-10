import { ServicesSectionData } from "@/lib/responseType";
import ShowSectionIcon from "./ShowSectionIcon";

export default function ServicesSection({
  description,
  items,
  label,
  title,
}: ServicesSectionData) {
  return (
    <section id="services" className="py-20 relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="text-4xl md:text-5xl font-bold text-main-color mb-4">
            {label}
          </p>
          <div className="w-24 h-1 bg-main-color/90 mx-auto rounded-full mb-6" />
          <p className="text-2xl font-semibold mb-4">{title}</p>
          <p className="text-low-color text-lg max-w-3xl mx-auto leading-relaxed">
            {description}
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {items &&
            items.map((service, index) => {
              return (
                <div
                  key={index}
                  className="bg-card-background rounded-2xl p-8 card-hover border border-main-color/10 hover:border-main-color/30 transition-all duration-300">
                  {/* Icon */}
                  <ShowSectionIcon icon={service.icon} />

                  {/* Title */}
                  <p className="text-2xl font-bold text-main-color mb-4 text-center">
                    {service.title}
                  </p>

                  {/* Description */}
                  <p className="text-low-color text-center leading-relaxed">
                    {service.description}
                  </p>
                </div>
              );
            })}
        </div>
      </div>
    </section>
  );
}
