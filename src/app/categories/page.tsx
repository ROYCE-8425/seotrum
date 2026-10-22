import config from "@/config/config.json";
import { SERVICE_CATALOG } from "@/lib/seoTrumCatalog";
import {
  getAllTaxonomy,
  getTaxonomy,
  getTaxonomyLabel,
} from "@/lib/taxonomyParser";
import PageHeader from "@/partials/PageHeader";
import SeoMeta from "@/partials/SeoMeta";
import Link from "next/link";

const Categories = () => {
  const { blog_folder } = config.settings;
  const categories = getTaxonomy(blog_folder, "categories");
  const allCategories = getAllTaxonomy(blog_folder, "categories");
  const baseUrl = config.site.base_url.replace(/\/$/, "");

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${baseUrl}/categories#collection`,
    name: "Chuyên mục Kiến thức Tự động hoá & SEO — Sèo Trum",
    description:
      "Danh mục các chủ đề chuyên sâu về hệ thống tự động hoá doanh nghiệp, phát triển công cụ theo yêu cầu và kiến trúc website chuẩn SEO từ Sèo Trum.",
    url: `${baseUrl}/categories`,
  };

  return (
    <div className="bg-[#FFFFFF] text-[#202326]">
      <SeoMeta
        title="Chuyên mục Kiến thức Tự động hoá & SEO — Sèo Trum"
        meta_title="Chuyên mục Kiến thức Tự động hoá & SEO — Sèo Trum"
        description="Khám phá các chuyên mục bài viết thực chiến về hệ thống tự động hoá, kỹ thuật phần mềm, chiến lược SEO và kiến trúc website từ Sèo Trum."
        canonical={`${baseUrl}/categories`}
        jsonLd={jsonLd}
      />
      <PageHeader
        title="Chuyên mục kiến thức thực chiến"
        eyebrow="PHÂN NHÓM CHỦ ĐỀ • TOPIC CLUSTER"
        subtitle="Tổng hợp các nhóm chủ đề trọng tâm về xây dựng phần mềm tự động hoá, tích hợp API/Bot và kiến trúc website chuẩn SEO."
      />
      <section className="st-section">
        <div className="st-container">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-12">
            {categories.map((categorySlug: string) => {
              const count = allCategories.filter(
                (c: string) => c === categorySlug,
              ).length;
              const displayLabel = getTaxonomyLabel(
                blog_folder,
                "categories",
                categorySlug,
              );
              return (
                <Link
                  key={categorySlug}
                  href={`/categories/${categorySlug}`}
                  className="bg-[#FFFFFF] border border-[#E5E7EB] rounded-[18px] p-6 st-card-hover flex items-center justify-between gap-4"
                >
                  <div>
                    <span className="text-[11.5px] font-bold uppercase tracking-wider text-[#5B6068] block mb-1">
                      Chuyên mục
                    </span>
                    <h2 className="text-[19px] font-bold text-[#202326] m-0">
                      {displayLabel}
                    </h2>
                  </div>
                  <span className="px-3 py-1.5 rounded-full bg-[#FFFCF1] border border-[#FFC62A] text-[#202326] text-[13px] font-extrabold shrink-0">
                    {count} bài viết →
                  </span>
                </Link>
              );
            })}
          </div>

          <div className="bg-[#F6F7F8] border border-[#E5E7EB] rounded-[20px] p-6 sm:p-8">
            <h2 className="text-[18px] font-bold text-[#202326] mb-4">
              Khám phá thêm các trang giải pháp kỹ thuật của Sèo Trum:
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {SERVICE_CATALOG.map((svc) => (
                <Link
                  key={svc.slug}
                  href={`/services/${svc.slug}`}
                  className="bg-[#FFFFFF] border border-[#E5E7EB] rounded-xl p-4 hover:border-[#202326] transition-colors block"
                >
                  <span className="text-[11px] font-extrabold px-2 py-0.5 rounded bg-[#FFC62A] text-[#202326] inline-block mb-1.5">
                    {svc.code}
                  </span>
                  <span className="text-[14.5px] font-bold text-[#202326] block">
                    {svc.shortTitle} →
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Categories;
