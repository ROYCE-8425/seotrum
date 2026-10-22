import BlogCard from "@/components/BlogCard";
import config from "@/config/config.json";
import { getSinglePage } from "@/lib/contentParser";
import { getTaxonomy, getTaxonomyLabel } from "@/lib/taxonomyParser";
import { sortByDate } from "@/lib/utils/sortFunctions";
import taxonomyFilter from "@/lib/utils/taxonomyFilter";
import PageHeader from "@/partials/PageHeader";
import SeoMeta from "@/partials/SeoMeta";
import { Post } from "@/types";
import Link from "next/link";

const { blog_folder } = config.settings;
type StaticParams = () => { single: string }[];

export const dynamicParams = false;

export const generateStaticParams: StaticParams = () => {
  const categories = getTaxonomy(blog_folder, "categories");
  return categories.map((category) => ({
    single: category,
  }));
};

const CategorySingle = async (props: {
  params: Promise<{ single: string }>;
}) => {
  const params = await props.params;
  const posts: Post[] = getSinglePage(blog_folder);
  const filterByCategories = taxonomyFilter(posts, "categories", params.single);
  const sortedPosts = sortByDate(filterByCategories);
  const label = getTaxonomyLabel(blog_folder, "categories", params.single);
  const baseUrl = config.site.base_url.replace(/\/$/, "");
  const pageUrl = `${baseUrl}/categories/${params.single}`;

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      "@id": `${pageUrl}#collection`,
      name: `Chuyên mục: ${label} — Sèo Trum`,
      description: `Tổng hợp bài viết thực chiến thuộc chuyên mục ${label} tại Sèo Trum.`,
      url: pageUrl,
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Trang chủ",
          item: baseUrl,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Chuyên mục",
          item: `${baseUrl}/categories`,
        },
        {
          "@type": "ListItem",
          position: 3,
          name: label,
          item: pageUrl,
        },
      ],
    },
  ];

  return (
    <div className="bg-[#FFFFFF] text-[#202326]">
      <SeoMeta
        title={`Chuyên mục ${label} — Kiến thức Tự động hoá & SEO | Sèo Trum`}
        meta_title={`Chuyên mục ${label} — Kiến thức Tự động hoá & SEO | Sèo Trum`}
        description={`Tổng hợp các bài phân tích chuyên sâu thuộc chuyên mục ${label} do Sèo Trum biên soạn từ kinh nghiệm xây dựng hệ thống thực tế.`}
        canonical={pageUrl}
        jsonLd={jsonLd}
      />
      <PageHeader
        title={`Chuyên mục: ${label}`}
        eyebrow="CHUYÊN MỤC KIẾN THỨC"
        subtitle={`Danh sách ${sortedPosts.length} bài viết chuyên sâu thuộc nhóm chủ đề "${label}".`}
      />
      <section className="st-section">
        <div className="st-container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
            {sortedPosts.map((post: Post, index: number) => (
              <div key={index}>
                <BlogCard data={post} />
              </div>
            ))}
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4 bg-[#F6F7F8] border border-[#E5E7EB] rounded-[18px] p-6">
            <div>
              <h2 className="text-[17px] font-bold text-[#202326] mb-1">
                Cần tư vấn giải pháp thực tế cho doanh nghiệp?
              </h2>
              <p className="text-[14px] text-[#5B6068] m-0">
                Xem thêm các chuyên mục khác hoặc gửi bài toán để trao đổi trực
                tiếp cùng Sèo Trum.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/categories"
                className="px-4 py-2.5 rounded-[10px] bg-[#FFFFFF] border border-[#E5E7EB] text-[14px] font-bold text-[#202326] hover:border-[#202326]"
              >
                ← Tất cả chuyên mục
              </Link>
              <Link
                href="/contact"
                className="px-5 py-2.5 rounded-[10px] bg-[#202326] text-[#FFFFFF] text-[14px] font-bold st-btn-lift"
              >
                Trao đổi bài toán →
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CategorySingle;
