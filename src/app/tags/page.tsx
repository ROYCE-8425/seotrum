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

const Tags = () => {
  const { blog_folder } = config.settings;
  const tags = getTaxonomy(blog_folder, "tags");
  const allTags = getAllTaxonomy(blog_folder, "tags");
  const baseUrl = config.site.base_url.replace(/\/$/, "");

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${baseUrl}/tags#collection`,
    name: "Từ khoá & Chủ đề Kỹ thuật — Sèo Trum",
    description:
      "Danh mục từ khoá và chủ đề kỹ thuật về phần mềm tự động hoá, tích hợp API, Bot và SEO bền vững tại Sèo Trum.",
    url: `${baseUrl}/tags`,
  };

  return (
    <div className="bg-[#FFFFFF] text-[#202326]">
      <SeoMeta
        title="Từ khoá & Chủ đề Kỹ thuật — Sèo Trum"
        meta_title="Từ khoá & Chủ đề Kỹ thuật — Sèo Trum"
        description="Tra cứu nhanh các bài viết và kiến thức thực chiến theo từng từ khoá kỹ thuật: tự động hoá, xây dựng ứng dụng, lập trình bot, tích hợp API và SEO."
        canonical={`${baseUrl}/tags`}
        jsonLd={jsonLd}
      />
      <PageHeader
        title="Từ khoá & Chủ đề kỹ thuật"
        eyebrow="CHỈ MỤC TỪ KHOÁ • TAG INDEX"
        subtitle="Chọn một từ khoá bên dưới để lọc nhanh các bài phân tích chuyên sâu liên quan."
      />
      <section className="st-section">
        <div className="st-container">
          <div className="flex flex-wrap gap-3.5 mb-12">
            {tags.map((tagSlug: string) => {
              const count: number = allTags.filter(
                (c: string) => c === tagSlug,
              ).length;
              const label = getTaxonomyLabel(blog_folder, "tags", tagSlug);
              return (
                <Link
                  key={tagSlug}
                  href={`/tags/${tagSlug}`}
                  className="inline-flex items-center gap-2.5 rounded-[14px] bg-[#FFFFFF] border border-[#E5E7EB] hover:border-[#202326] px-4 py-3 text-[15px] font-bold text-[#202326] st-card-hover"
                >
                  <span>#{label}</span>
                  <span className="rounded-full bg-[#FFFCF1] border border-[#FFC62A] px-2.5 py-0.5 text-[12px] font-extrabold text-[#202326]">
                    {count}
                  </span>
                </Link>
              );
            })}
          </div>

          <div className="bg-[#F6F7F8] border border-[#E5E7EB] rounded-[20px] p-6 sm:p-8">
            <h2 className="text-[18px] font-bold text-[#202326] mb-4">
              Các trang đích giải pháp chính của Sèo Trum:
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

export default Tags;
