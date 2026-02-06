"use client";

import { FooterData } from "@/lib/responseType";
import { Phone, Mail, MapPin, MessageCircle } from "lucide-react";

export default function ContactSection({
  address,
  phone,
  email,
  whatsapp,
}: FooterData & { whatsapp: string }) {
  return (
    <section id="contact" className="py-20 relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="text-4xl md:text-5xl font-bold text-main-color mb-4">
            معلومات التواصل
          </p>
          <div className="w-24 h-1 bg-main-color mx-auto rounded-full mb-6" />
          <p className="text-low-color text-lg max-w-2xl mx-auto">
            نحن هنا لخدمتكم والإجابة على جميع استفساراتكم. تواصل معنا عبر أي من
            الوسائل التالية وسيسعد فريقنا بمساعدتك.{" "}
          </p>
        </div>

        <div className="grid gap-12 max-w-6xl mx-auto">
          {/* Contact Information */}
          <div className="space-y-8">
            {/* Contact Cards */}
            <div className="space-y-6 grid md:grid-cols-2 items-start gap-5">
              {/* Phone */}
              <div className="bg-card-background rounded-2xl p-6 border border-main-color/10 hover:border-main-color/30 transition-all duration-300 group">
                <div className="flex flex-col items-center text-center gap-4">
                  <div className="w-12 h-12 bg-main-color/10 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Phone className="w-6 h-6 text-main-color" />
                  </div>
                  <div className="flex-1">
                    <p className="text-black font-semibold mb-2">الهاتف</p>
                    <a
                      href={`tel:${phone}`}
                      target="_blank"
                      className="text-low-color hover:text-main-color transition-colors duration-300 text-lg"
                      dir="ltr">
                      {phone}
                    </a>
                  </div>
                </div>
              </div>

              {/* Whatsapp */}
              <div className="bg-card-background rounded-2xl p-6 border border-main-color/10 hover:border-main-color/30 transition-all duration-300 group">
                <div className="flex flex-col items-center text-center gap-4">
                  <div className="w-12 h-12 bg-main-color/10 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <MessageCircle className="w-6 h-6 text-main-color" />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold mb-2">واتساب</p>
                    <a
                      href={`https://wa.me/${
                        whatsapp.includes("+")
                          ? whatsapp.split("+").join("")
                          : whatsapp
                      }?text=`}
                      target="_blank"
                      className="text-low-color hover:text-main-color transition-colors duration-300 text-lg"
                      dir="ltr">
                      {whatsapp}
                    </a>
                  </div>
                </div>
              </div>

              {/* Email */}
              <div className="bg-card-background rounded-2xl p-6 border border-main-color/10 hover:border-main-color/30 transition-all duration-300 group">
                <div className="flex flex-col items-center text-center gap-4">
                  <div className="w-12 h-12 bg-main-color/10 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Mail className="w-6 h-6 text-main-color" />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold mb-2">البريد الإلكتروني</p>
                    <a
                      target="_blank"
                      href={`mailto:${email}`}
                      className="text-low-color hover:text-main-color transition-colors duration-300 break-all">
                      {email}
                    </a>
                  </div>
                </div>
              </div>

              {/* Address */}
              <div className="bg-card-background rounded-2xl p-6 border border-main-color/10 hover:border-main-color/30 transition-all duration-300 group">
                <div className="flex flex-col items-center text-center gap-4">
                  <div className="w-12 h-12 bg-main-color/10 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <MapPin className="w-6 h-6 text-main-color" />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold mb-2">العنوان</p>
                    <p className="text-low-color text-sm leading-relaxed">
                      {address}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
