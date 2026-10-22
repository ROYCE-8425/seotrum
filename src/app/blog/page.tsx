import BlogCard from "@/components/BlogCard";
import Pagination from "@/components/Pagination";
import config from "@/config/config.json";
import { getListPage, getSinglePage } from "@/lib/contentParser";
import { sortByDate } from "@/lib/utils/sortFunctions";
import SeoMeta from "@/partials/SeoMeta";
import { Post } from "@/types";
import Image from "next/image";
import Link from "next/link";

const { blog_folder, pagination } = config.settings;

const Posts = () => {
  const postIndex: Post = getListPage(`${blog_folder}/_index.md`);
  const { title, meta_title, description, image } = postIndex.frontmatter;
  const posts: Post[] = getSinglePage(blog_folder);
  const sortedPosts = sortByDate(posts);
  const totalPages = Math.ceil(posts.length / pagination);
  const currentPosts = sortedPosts.slice(0, pagination);

  return (
    <div className="bg-[#FFFFFF] text-[#202326]">
      <SeoMeta
        title={title || "Góc chia sẻ — Tự động hoá & SEO từ việc thật | Sèo Trum"}
        meta_title={
          meta_title || "Góc chia sẻ — Tự động hoá & SEO từ việc thật | Sèo Trum"
        }
        description={
          description ||
          "Góc chia sẻ kinh nghiệm thực tế về xây dựng công cụ tự động hoá, tích hợp hệ thống và kiến trúc website bền vững cho SEO cùng Sèo Trum."
        }
        image={image}
      />

      {/* Hero Section */}
      <section className="pt-10 pb-14 lg:pt-14 lg:pb-18 border-b border-[#E5E7EB]">
        <div className="st-container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8">
              <div className="inline-flex items-center gap-2 mb-4">
                <span
                  className="w-2.5 h-2.5 rounded-full bg-[#FFC62A]"
                  aria-hidden="true"
                />
                <span className="st-eyebrow text-[#5B6068]">
                  GÓC CHIA SẺ KIẾN THỨC • TỰ ĐỘNG HOÁ &amp; SEO
                </span>
              </div>

              <h1 className="st-h1 text-[#202326] mb-4">
                Chia sẻ từ{" "}
                <span className="relative inline-block pb-1">
                  việc thật.
                  <span
                    className="st-yellow-bar absolute left-0 right-0 -bottom-0.5 h-[8px] bg-[#FFC62A] rounded-full"
                    aria-hidden="true"
                  />
                </span>
              </h1>

              <p className="text-[17px] lg:text-[18px] leading-[1.6] text-[#5B6068] max-w-[58ch] m-0">
                Tổng hợp góc nhìn và kinh nghiệm thực tế khi khảo sát quy trình,
                viết công cụ tự động hoá và tổ chức cấu trúc website bền vững
                cho SEO.
              </p>
            </div>

            <div className="lg:col-span-4 flex justify-start lg:justify-end">
              <div className="bg-[#FFFCF1] border border-[#E5E7EB] rounded-[18px] p-5 flex items-center gap-4 max-w-[360px]">
                <Image
                  src="/images/brand-mascot.png"
                  alt="Linh vật Sèo Trum"
                  width={92}
                  height={95}
                  priority
                  className="w-[82px] h-auto object-contain shrink-0"
                />
                <div className="text-[13.5px] text-[#202326] leading-snug">
                  <strong className="block mb-1">2 chủ đề trọng tâm</strong>
                  Tự động hoá quy trình vận hành &amp; Xây dựng nền tảng web rõ
                  cấu trúc cho SEO.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Posts Grid */}
      <section className="st-section border-b border-[#E5E7EB]">
        <div className="st-container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
            {currentPosts.map((post: Post, index: number) => (
              <div key={post.slug || index}>
                <BlogCard data={post} />
              </div>
            ))}
          </div>

          <Pagination
            section={blog_folder}
            currentPage={1}
            totalPages={totalPages}
          />
        </div>
      </section>

      {/* Bottom Consultation Prompt */}
      <section className="py-12 lg:py-16">
        <div className="st-container">
          <div className="bg-[#F6F7F8] border border-[#E5E7EB] rounded-[20px] p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
            <div>
              <h2 className="text-[22px] font-bold text-[#202326] mb-1.5">
                Cần áp dụng vào quy trình thực tế của bạn?
              </h2>
              <p className="text-[15px] text-[#5B6068] m-0">
                Mô tả ngắn thao tác bạn đang làm tay, mình sẽ gợi ý hướng xử lý
                phù hợp nhất.
              </p>
            </div>
            <Link
              href="/#tu-van"
              className="inline-flex items-center gap-2 bg-[#202326] text-[#FFFFFF] text-[14.5px] font-bold rounded-[10px] px-5 py-3 st-btn-lift shrink-0"
            >
              <span>Trao đổi bài toán</span>
              <span className="text-[#FFC62A]" aria-hidden="true">
                →
              </span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Posts;
