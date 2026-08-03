import { APP_URL, CurrentProjectId, currentURL } from "@/lib/ProjectId";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Metadata } from "next";

type Article = {
  id: string;
  title: string;
  coverImage: string | null;
  createdAt: string;
  updatedAt: string;
  content: string | null;
};

type GetArticlesResponse = {
  success: boolean;
  data: {
    articles: Article[];
    count: number;
  };
};

export const metadata: Metadata = {
  title: "خدمات الضيافة والمقالات",
  description:
    "اطلع على أحدث المقالات والنصائح المتعلقة بخدمات الضيافة والقهوة العربية.",
  alternates: {
    canonical: `${currentURL}/articles`,
  },
  openGraph: {
    title: "خدمات الضيافة والمقالات",
    description:
      "اطلع على أحدث المقالات والنصائح المتعلقة بخدمات الضيافة والقهوة العربية.",
    url: `${currentURL}/articles`,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "خدمات الضيافة والمقالات",
    description:
      "اطلع على أحدث المقالات والنصائح المتعلقة بخدمات الضيافة والقهوة العربية.",
  },
};

export default async function ArticlesPage() {
  const res = await fetch(
    `${APP_URL}/api/project/${CurrentProjectId}/articles/category/خدمات-الضيافة`,
  );

  if (!res.ok) {
    throw new Error("Failed to fetch articles");
  }

  const data: GetArticlesResponse = await res.json();
  const articles = data.data.articles;
  return (
    <section id="articles" className="py-10 min-h-[60vh] pt-25">
      <div className="px-4 md:px-6 lg:px-8 max-w-6xl mx-auto text-black">
        {/* Header */}
        <div className="mb-14">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-medium transition-opacity hover:opacity-70"
            style={{ color: "var(--main-color-dark)" }}>
            <ArrowLeft className="w-4 h-4" strokeWidth={2} />
            الصفحة الرئيسية
          </Link>
          <div className="text-center">
            <h1
              className="font-black text-3xl md:text-4xl lg:text-5xl leading-[1.15] mb-6"
              style={{ color: "var(--main-color)" }}>
              خدمات الضيافة
            </h1>
          </div>
        </div>

        {articles.length === 0 ? (
          <div
            className="text-center py-16 rounded-2xl bg-white"
            style={{
              border: "1px solid var(--border-warm)",
            }}>
            <p
              className="text-base"
              style={{ color: "var(--main-color-dark)" }}>
              لا توجد مقالات متاحة حالياً.
            </p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {articles.map((article) => (
              <Link
                href={`/${article.title.split(" ").join("-")}`}
                key={article.id}
                className="group flex flex-col rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1"
                style={{
                  backgroundColor: "var(--card-background)",
                  border: "1px solid var(--border-warm)",
                  boxShadow: "0 4px 20px rgba(44,24,16,0.06)",
                }}>
                {article.coverImage && (
                  <div className="relative w-full aspect-4/3 overflow-hidden">
                    <Image
                      src={article.coverImage}
                      alt={article.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                )}

                <div className="flex flex-col flex-1 p-6">
                  <span className="text-xs text-black/90 mb-1">
                    {new Date(article.createdAt).toLocaleDateString("ar-SA", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </span>
                  <h2
                    className="font-black text-lg mb-3 line-clamp-2"
                    style={{ color: "var(--main-color)" }}>
                    {article.title}
                  </h2>

                  {article.content && (
                    <p
                      className="text-sm leading-relaxed line-clamp-3 flex-1 mb-4"
                      style={{ color: "var(--main-color-dark)" }}>
                      {article.content.replace(/<[^>]+>/g, "")}
                    </p>
                  )}

                  <p className="" style={{ borderColor: "var(--border-warm)" }}>
                    <span className="text-xs font-semibold flex items-center justify-center gap-1 mt-auto py-1.5 bg-main-color text-white rounded-md">
                      اقرأ المقال
                      <ArrowLeft className="w-3 h-3" strokeWidth={2} />
                    </span>
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
