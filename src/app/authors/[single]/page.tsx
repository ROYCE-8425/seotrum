import BlogCard from "@/components/BlogCard";
import config from "@/config/config.json";
import MDXContent from "@/helpers/MDXContent";
import { getSinglePage } from "@/lib/contentParser";
import { slugify } from "@/lib/utils/textConverter";
import SeoMeta from "@/partials/SeoMeta";
import { Author, Post } from "@/types";
import Image from "next/image";
import Link from "next/link";

export const dynamicParams = false;

export const generateStaticParams: () => { single?: string }[] = () => {
  const authors: Author[] = getSinglePage("authors");
  return authors.map((author) => ({
    single: author.slug,
  }));
};

const AuthorSingle = async (props: { params: Promise<{ single: string }> }) => {
  const params = await props.params;
  const authors: Author[] = getSinglePage("authors");
  const author = authors.filter((page) => page.slug === params.single)[0];
  const { frontmatter, content } = author;
  const { title, meta_title, description, image } = frontmatter;
  const { blog_folder } = config.settings;
  const posts: Post[] = getSinglePage(blog_folder);
  const postFilterByAuthor: Post[] = posts.filter(
    (post) => slugify(post.frontmatter.author) === slugify(title),
  );

  const baseUrl = config.site.base_url.replace(/\/$/, "");
  const pageUrl = `${baseUrl}/authors/${params.single}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    "@id": `${pageUrl}#profile`,
    url: pageUrl,
    mainEntity: {
      "@type": "Person",
      "@id": `${baseUrl}/#person`,
      name: title,
      description:
        description ||
        "Người trực tiếp khảo sát bài toán và xây dựng phần mềm tự động hoá tại Sèo Trum.",
      url: `${baseUrl}/about`,
    },
  };

  return (
    <div className="bg-[#FFFFFF] text-[#202326]">
      <SeoMeta
        title={`${title} — Hồ sơ Tác giả & Kỹ sư Hệ thống Tự động hoá`}
        meta_title={
          meta_title ||
          `${title} — Hồ sơ Tác giả & Kỹ sư Hệ thống Tự động hoá`
        }
        description={description}
        image={image}
        canonical={pageUrl}
        jsonLd={jsonLd}
      />
      <section className="pt-10 pb-14 border-b border-[#E5E7EB]">
        <div className="st-container">
          <div className="bg-[#FFFCF1] border border-[#E5E7EB] rounded-[22px] p-6 sm:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-3 flex justify-center">
              <div className="bg-[#FFFFFF] border border-[#E5E7EB] rounded-[20px] p-5">
                <Image
                  src={image || "/images/brand-mascot.png"}
                  className="w-[140px] h-auto object-contain"
                  height={160}
                  width={156}
                  alt={title}
                />
              </div>
            </div>
            <div className="lg:col-span-9">
              <span className="inline-block text-[11.5px] font-extrabold uppercase tracking-wider px-3 py-1 rounded-full bg-[#FFC62A] text-[#202326] mb-3">
                Tác giả &amp; Người trực tiếp xây dựng
              </span>
              <h1 className="st-h1 text-[#202326] mb-3">{title}</h1>
              <div className="content text-[16px] text-[#5B6068] mb-5">
                <MDXContent content={content} />
              </div>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/about"
                  className="inline-flex items-center gap-2 bg-[#202326] text-[#FFFFFF] text-[14px] font-bold rounded-[10px] px-4 py-2.5 st-btn-lift"
                >
                  <span>Xem trang Hồ sơ Sèo Trum</span>
                  <span className="text-[#FFC62A]" aria-hidden="true">
                    →
                  </span>
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 bg-[#FFFFFF] text-[#202326] border border-[#202326]/20 text-[14px] font-bold rounded-[10px] px-4 py-2.5"
                >
                  <span>Trao đổi bài toán cùng {title}</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="st-section">
        <div className="st-container">
          <h2 className="st-h2 text-[#202326] mb-8">
            Bài viết thực chiến bởi {title} ({postFilterByAuthor.length})
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {postFilterByAuthor.map((post, index: number) => (
              <div key={index}>
                <BlogCard data={post} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default AuthorSingle;
