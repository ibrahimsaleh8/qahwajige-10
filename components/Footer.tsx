import { FooterData } from "@/lib/responseType";
import { Mail, MapPin, Phone } from "lucide-react";
import Link from "next/link";

const mapEmbedSrc =
  "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d7247.733529263881!2d46.7653!3d24.731454!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e2f013bec0d4b7b%3A0xeb4d9048d7b13647!2z2YLZh9mI2KzZiiDZiNi12KjYp9io2YrZhiDZgtmH2YjYqSDYp9mE2LHZitin2LY!5e0!3m2!1sar!2str!4v1728329118756!5m2!1sar!2str";

export default function Footer({
  address,
  phone,
  brandName,
  email,
  description,
}: FooterData & { description?: string }) {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    company: [
      { name: "الرئيسية", href: "#home" },
      { name: "عن الشركة", href: "#about" },
      { name: "خدماتنا", href: "#services" },
      { name: "الأسئلة الشائعة", href: "#faq" },
      { name: "اتصل بنا", href: "#contact" },
    ],
  };

  return (
    <footer className="border-t border-black/5 relative z-10 overflow-hidden bg-white/50">
      <div className="container mx-auto">
        {/* Main Footer Content */}
        <div className="container mx-auto px-4 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {/* Brand Section */}
            <div className="lg:col-span-1">
              <Link
                href="/"
                className="text-main-color flex items-center gap-2 mb-6 text-xl font-bold hover:text-main-color transition-colors">
                {brandName}
              </Link>
              <p className="mb-6 leading-relaxed">{description}</p>
            </div>

            {/* Quick Links */}
            <div>
              <p className="font-bold text-lg mb-6">روابط سريعة</p>
              <ul className="space-y-3">
                {footerLinks.company.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-black/60 hover:text-main-color transition-colors inline-block">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <p className="text-black font-bold text-lg mb-6">تواصل معنا</p>
              <ul className="space-y-4 text-black/80">
                {address && (
                  <li className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 mt-1" />
                    <span>{address}</span>
                  </li>
                )}
                {email && (
                  <li className="flex items-start gap-3">
                    <Mail className="w-5 h-5 mt-1" />
                    <a
                      href={`mailto:${email}`}
                      className="hover:text-main-color transition-colors">
                      {email}
                    </a>
                  </li>
                )}
                {phone && (
                  <li className="flex items-start gap-3">
                    <Phone className="w-5 h-5 mt-1" />
                    <a
                      href={`tel:${phone}`}
                      className="hover:text-main-color transition-colors">
                      {phone}
                    </a>
                  </li>
                )}
              </ul>
            </div>

            <div>
              <p className="text-black font-bold text-lg mb-6">
                موقعنا على الخريطة
              </p>

              <div className="w-full aspect-video md:aspect-21/9 min-h-55 bg-slate-800">
                <iframe
                  src={mapEmbedSrc}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="موقع قهوجيين الرياض على الخريطة"
                  className="w-full h-full border-0"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-black/10">
          <div className="container mx-auto px-4 py-6">
            <p className="text-black/60 text-sm text-center md:text-center">
              © {currentYear} {brandName}. جميع الحقوق محفوظة
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
