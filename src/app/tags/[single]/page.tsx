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
  const tags = getTaxonomy(blog_folder, "tags");
  return tags.map((tag) => ({
    single: tag,
  }));
};

const TagSingle = async (props: { params: Promise<{ single: string }> }) => {
  const params = await props.params;
  const posts: Post[] = getSinglePage(blog_folder);
  const filterByTags = taxonomyFilter(posts, "tags", params.single);
  const sortedPosts = sortByDate(filterByTags);
  const label = getTaxonomyLabel(blog_folder, "tags", params.single);
  const baseUrl = config.site.base_url.replace(/\/$/, "");
  const pageUrl = `${baseUrl}/tags/${params.single}`;

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      "@id": `${pageUrl}#collection`,
      name: `Chủ đề #${label} — Sèo Trum`,
      description: `Các bài viết và tài liệu kỹ thuật gắn nhãn #${label} tại Sèo Trum.`,
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
          name: "Từ khoá chủ đề",
          item: `${baseUrl}/tags`,
        },
        {
          "@type": "ListItem",
          position: 3,
          name: `#${label}`,
          item: pageUrl,
        },
      ],
    },
  ];

  return (
    <div className="bg-[#FFFFFF] text-[#202326]">
      <SeoMeta
        title={`Chủ đề #${label} — Kiến thức Tự động hoá & SEO | Sèo Trum`}
        meta_title={`Chủ đề #${label} — Kiến thức Tự động hoá & SEO | Sèo Trum`}
        description={`Tổng hợp bài viết thực chiến về chủ đề #${label} do Sèo Trum biên soạn: quy trình tự động hoá, tích hợp hệ thống và tối ưu SEO.`}
        canonical={pageUrl}
        jsonLd={jsonLd}
      />
      <PageHeader
        title={`Chủ đề: #${label}`}
        eyebrow="TỪ KHOÁ CHỦ ĐỀ • TAG"
        subtitle={`Danh sách ${sortedPosts.length} bài viết gắn với từ khoá "${label}".`}
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
                Tìm hiểu thêm các chủ đề hoặc trao đổi trực tiếp
              </h2>
              <p className="text-[14px] text-[#5B6068] m-0">
                Khám phá toàn bộ danh mục từ khoá hoặc gửi mô tả bài toán vận
                hành của bạn.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/tags"
                className="px-4 py-2.5 rounded-[10px] bg-[#FFFFFF] border border-[#E5E7EB] text-[14px] font-bold text-[#202326] hover:border-[#202326]"
              >
                ← Tất cả từ khoá
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

export default TagSingle;
