import AuthorCard from "@/components/AuthorCard";
import { getListPage, getSinglePage } from "@/lib/contentParser";
import PageHeader from "@/partials/PageHeader";
import SeoMeta from "@/partials/SeoMeta";
import { Author } from "@/types";

const Authors = () => {
  const authorIndex: Author = getListPage("authors/_index.md");
  const authors: Author[] = getSinglePage("authors");
  const { title, meta_title, description, image } = authorIndex.frontmatter;
  return (
    <div className="bg-[#FFFFFF] text-[#202326]">
      <SeoMeta
        title={title}
        meta_title={meta_title}
        description={description}
        image={image}
      />
      <PageHeader
        title={title}
        eyebrow="TÁC GIẢ & NGƯỜI TRỰC TIẾP XÂY DỰNG"
        subtitle="Hồ sơ chuyên môn và các bài phân tích thực chiến về tự động hoá quy trình, ứng dụng theo yêu cầu và kiến trúc SEO."
      />
      <section className="st-section">
        <div className="st-container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-center">
            {authors.map((author: Author, index: number) => (
              <div key={index}>
                <AuthorCard data={author} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Authors;
