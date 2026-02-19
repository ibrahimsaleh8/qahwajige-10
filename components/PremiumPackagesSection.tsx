"use client";
import { motion } from "motion/react";
import { PackageData } from "@/lib/responseType";
import { Check, MessageCircle, Sparkles } from "lucide-react";
import Image from "next/image";

export default function PremiumPackagesSection({
  whatsapp,
  packages,
}: {
  whatsapp: string;
  packages: PackageData[];
}) {
  const whatsappNumber = whatsapp.includes("+")
    ? whatsapp.split("+").join("")
    : whatsapp;
  const waLink = `https://wa.me/${whatsappNumber}?text=`;

  if (!packages?.length) return null;

  return (
    <section
      id="packages"
      className="py-20 md:py-28 relative overflow-hidden"
      style={{ background: "var(--main-background, #fdfcf7)" }}>
      {/* Subtle texture overlay */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, var(--main-black, #332822) 1px, transparent 0)`,
          backgroundSize: "32px 32px",
        }}
      />

      {/* Warm top accent line */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: "var(--slate-700, #b4a597)" }}
      />
      <div
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{ background: "var(--slate-700, #b4a597)" }}
      />

      {/* Decorative soft blobs */}
      <div
        className="absolute -top-40 -left-40 w-96 h-96 rounded-full blur-3xl opacity-20 pointer-events-none"
        style={{ background: "var(--main-color, #7a5b3d)" }}
      />
      <div
        className="absolute -bottom-40 -right-40 w-96 h-96 rounded-full blur-3xl opacity-10 pointer-events-none"
        style={{ background: "var(--main-color-dark, #6b4e2f)" }}
      />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-14 md:mb-20 max-w-2xl mx-auto"
          dir="rtl">
          <div
            className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full border"
            style={{
              borderColor: "var(--slate-700, #b4a597)",
              background: "rgba(122,91,61,0.06)",
            }}>
            <Sparkles
              className="w-3.5 h-3.5"
              style={{ color: "var(--main-color, #7a5b3d)" }}
            />
            <span
              className="text-xs font-bold tracking-widest uppercase"
              style={{ color: "var(--main-color, #7a5b3d)" }}>
              باقاتنا
            </span>
          </div>

          <h2
            className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-5 leading-snug"
            style={{ color: "var(--text-heading, #332822)" }}>
            اختر الباقة المناسبة لك
          </h2>

          {/* Ornamental divider */}
          <div className="flex items-center justify-center gap-3 mb-5">
            <div
              className="h-px w-12"
              style={{ background: "var(--slate-700, #b4a597)" }}
            />
            <div
              className="w-2 h-2 rounded-full"
              style={{ background: "var(--main-color, #7a5b3d)" }}
            />
            <div
              className="h-px w-12"
              style={{ background: "var(--slate-700, #b4a597)" }}
            />
          </div>

          <p
            className="text-base md:text-lg leading-relaxed"
            style={{ color: "var(--text-body, #8b7d72)" }}>
            نقدم لك مجموعة متميزة من الباقات المصممة بعناية لتلبي احتياجاتك
          </p>
        </motion.div>

        {/* Packages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mx-auto w-full">
          {packages.map((pkg, index) => (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              viewport={{ once: true }}
              key={pkg.id}
              className="group relative flex flex-col h-full w-full rounded-2xl overflow-hidden transition-all duration-500 hover:-translate-y-1.5"
              style={{
                background: "var(--card-background, #fdfcf7)",
                border: "1px solid var(--slate-700, #b4a597)",
                boxShadow: "0 2px 16px rgba(51,40,34,0.06)",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.boxShadow =
                  "0 12px 40px rgba(51,40,34,0.14), 0 0 0 1px var(--slate-800, #a09082)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.boxShadow =
                  "0 2px 16px rgba(51,40,34,0.06)";
              }}>
              {/* Image */}
              <div
                className="relative aspect-video overflow-hidden"
                style={{ background: "var(--second-background, #fdfbf7)" }}>
                {pkg.image ? (
                  <Image
                    src={pkg.image}
                    alt={pkg.title}
                    width={600}
                    height={338}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                ) : (
                  <div
                    className="w-full h-full flex items-center justify-center"
                    style={{
                      background:
                        "linear-gradient(135deg, var(--second-background, #fdfbf7) 0%, #f0ece4 100%)",
                    }}>
                    <span
                      className="text-6xl font-extrabold"
                      style={{ color: "var(--slate-700, #b4a597)" }}>
                      {pkg.title?.charAt(0) ?? "?"}
                    </span>
                  </div>
                )}

                {/* Gradient overlay */}
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(to top, rgba(51,40,34,0.45) 0%, transparent 60%)",
                  }}
                />

                {/* Package badge */}
                <div className="absolute top-3 right-3" dir="rtl">
                  <span
                    className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold"
                    style={{
                      background: "var(--main-color, #7a5b3d)",
                      color: "#fdfcf7",
                    }}>
                    الباقة {index + 1}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="flex flex-col flex-1 p-6 md:p-7" dir="rtl">
                <h3
                  className="text-xl md:text-2xl font-extrabold mb-3 text-right"
                  style={{ color: "var(--text-heading, #332822)" }}>
                  {pkg.title}
                </h3>

                {/* Divider */}
                <div
                  className="w-10 h-0.5 rounded-full mb-5"
                  style={{
                    background: "var(--main-color, #7a5b3d)",
                    opacity: 0.5,
                  }}
                />

                {/* Features */}
                {pkg.features?.length > 0 ? (
                  <div className="flex-1 mb-6">
                    <p
                      className="text-xs font-bold mb-3 uppercase tracking-wider text-right"
                      style={{ color: "var(--secondary-accent, #8b7d72)" }}>
                      المميزات
                    </p>
                    <ul className="space-y-2.5">
                      {pkg.features.map((feature, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-2.5 text-right">
                          <span
                            className="shrink-0 mt-0.5 w-5 h-5 rounded-full flex items-center justify-center"
                            style={{
                              background: "rgba(122,91,61,0.1)",
                              border: "1px solid rgba(122,91,61,0.2)",
                            }}>
                            <Check
                              className="w-3 h-3"
                              strokeWidth={3}
                              style={{ color: "var(--main-color, #7a5b3d)" }}
                            />
                          </span>
                          <span
                            className="text-sm md:text-base leading-relaxed"
                            style={{ color: "var(--low-color, #4e4742)" }}>
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : (
                  <div className="flex-1 mb-6" />
                )}

                {/* Separator */}
                <div
                  className="w-full h-px mb-5"
                  style={{
                    background: "var(--slate-700, #b4a597)",
                    opacity: 0.4,
                  }}
                />

                {/* CTA Button */}
                <a
                  href={waLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-auto w-full py-3.5 px-6 rounded-xl font-bold text-sm md:text-base transition-all duration-300 flex items-center justify-center gap-2 shadow-sm hover:shadow-md hover:-translate-y-0.5 active:translate-y-0"
                  style={{
                    background: "var(--main-color, #7a5b3d)",
                    color: "#fdfcf7",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.background =
                      "var(--main-color-dark, #6b4e2f)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.background =
                      "var(--main-color, #7a5b3d)";
                  }}>
                  <MessageCircle className="w-5 h-5" />
                  اطلب الخدمة عبر واتساب
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
