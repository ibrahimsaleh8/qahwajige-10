"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, HelpCircle } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    question: "ما هي المناطق التي تغطونها؟",
    answer:
      "نقدم خدماتنا في جميع أنحاء مدينة الرياض والمناطق المجاورة. يمكننا أيضًا الوصول إلى مناطق أخرى حسب الترتيب المسبق.",
  },
  {
    question: "هل توفرون أدوات الضيافة مع الصبابين؟",
    answer:
      "نعم، نوفر جميع أدوات الضيافة الفاخرة من دلال وفناجيل وصواني تقديم تليق بمناسبتكم، بالإضافة إلى القهوة العربية الأصيلة.",
  },
  {
    question: "كم عدد الصبابين المناسب لمناسبتي؟",
    answer:
      "يعتمد ذلك على عدد الضيوف. عادةً نوصي بصباب واحد لكل 30-50 ضيف لضمان خدمة سريعة ومميزة وتغطية شاملة للقاعة.",
  },
  {
    question: "كيف يمكنني حجز الخدمة؟",
    answer:
      "يمكنك الحجز بسهولة عن طريق الاتصال بنا مباشرة أو التواصل عبر الواتساب من خلال الأزرار الموجودة في الموقع. نوصي بالحجز المبكر لضمان التوفر.",
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-2 text-main-color mb-4">
            <HelpCircle className="w-6 h-6" />
            <span className="font-bold text-lg">الأسئلة الشائعة</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">
            إجابات على استفساراتكم
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            لقد جمعنا لكم أكثر الأسئلة شيوعًا حول خدماتنا لمساعدتكم في اتخاذ
            القرار المناسب لمناسبتكم.
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-4">
          {faqData.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex items-center justify-between p-5 text-right bg-white hover:bg-gray-50 transition-colors duration-200">
                <span className="font-bold text-lg text-gray-800">
                  {item.question}
                </span>
                <span
                  className={`transform transition-transform duration-300 text-main-color ${
                    openIndex === index ? "rotate-180" : ""
                  }`}>
                  <ChevronDown className="w-6 h-6" />
                </span>
              </button>

              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}>
                    <div className="px-5 pb-5 text-gray-600 leading-relaxed border-t border-gray-100/50 pt-4">
                      {item.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
