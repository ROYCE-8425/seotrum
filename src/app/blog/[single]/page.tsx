import BlogCard from "@/components/BlogCard";
import config from "@/config/config.json";
import MDXContent from "@/helpers/MDXContent";
import { getSinglePage } from "@/lib/contentParser";
import similarItems from "@/lib/utils/similarItems";
import { markdownify, plainify } from "@/lib/utils/textConverter";
import SeoMeta from "@/partials/SeoMeta";
import { Post } from "@/types";
import Image from "next/image";
import Link from "next/link";

const { blog_folder } = config.settings;

export const dynamicParams = false;

export const generateStaticParams: () => { single: string }[] = () => {
  const posts: Post[] = getSinglePage(blog_folder);
  return posts.map((post) => ({
    single: post.slug!,
  }));
};

const PostSingle = async (props: { params: Promise<{ single: string }> }) => {
  const params = await props.params;
  const posts: Post[] = getSinglePage(blog_folder);
  const post = posts.filter((page) => page.slug === params.single)[0];

  const { frontmatter, content } = post;
  const { title, meta_title, description, image, categories, tags, date } =
    frontmatter;
  const similarPosts = similarItems(post, posts, post.slug!)?.slice(0, 2);

  const baseUrl = config.site.base_url.replace(/\/$/, "");
  const postUrl = `${baseUrl}/blog/${post.slug}`;
  const postImage = `${baseUrl}${image || config.metadata.meta_image}`;
  const publishedIso = date
    ? new Date(date).toISOString()
    : "2026-03-01T08:00:00.000Z";

  const articleJsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      "@id": `${postUrl}#article`,
      headline: plainify(meta_title || title).trim(),
      description: plainify(
        description || config.metadata.meta_description,
      ).trim(),
      image: [postImage],
      datePublished: publishedIso,
      dateModified: publishedIso,
      inLanguage: "vi-VN",
      author: {
        "@type": "Person",
        "@id": `${baseUrl}/#founder`,
        name: "Sèo Trum",
        url: `${baseUrl}/about`,
      },
      publisher: {
        "@id": `${baseUrl}/#organization`,
      },
      mainEntityOfPage: {
        "@type": "WebPage",
        "@id": postUrl,
      },
      keywords: tags?.join(", "),
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
          name: "Góc chia sẻ",
          item: `${baseUrl}/blog`,
        },
        {
          "@type": "ListItem",
          position: 3,
          name: plainify(title),
          item: postUrl,
        },
      ],
    },
  ];

  return (
    <div className="bg-[#FFFFFF] text-[#202326]">
      <SeoMeta
        title={title}
        meta_title={meta_title}
        description={description}
        image={image}
        canonical={postUrl}
        og_type="article"
        jsonLd={articleJsonLd}
      />

      <section className="pt-8 pb-16 lg:pt-12 lg:pb-20 border-b border-[#E5E7EB]">
        <div className="st-container max-w-[920px]">
          {/* Breadcrumb */}
          <nav
            aria-label="Breadcrumb"
            className="mb-6 flex flex-wrap items-center gap-2 text-[13.5px] font-medium text-[#5B6068]"
          >
            <Link href="/" className="hover:text-[#202326]">
              Trang chủ
            </Link>
            <span>/</span>
            <Link href="/blog" className="hover:text-[#202326]">
              Góc chia sẻ
            </Link>
            <span>/</span>
            <span className="text-[#202326] font-semibold truncate max-w-[280px] sm:max-w-[440px]">
              {plainify(title)}
            </span>
          </nav>

          {/* Article Header */}
          <div className="bg-[#FFFCF1] border border-[#E5E7EB] rounded-[20px] p-6 sm:p-8 mb-8">
            <div className="flex flex-wrap items-center gap-2 mb-4">
              {categories?.map((cat: string) => (
                <span
                  key={cat}
                  className="text-[12px] font-extrabold uppercase tracking-wider px-3 py-1 rounded-full bg-[#FFC62A] text-[#202326]"
                >
                  {cat}
                </span>
              ))}
              <span className="text-[12.5px] font-semibold text-[#5B6068] bg-[#FFFFFF] border border-[#E5E7EB] rounded-full px-3 py-1">
                Sèo Trum • Chia sẻ từ việc thật
              </span>
            </div>

            <h1
              dangerouslySetInnerHTML={markdownify(title)}
              className="st-h2 text-[#202326] mb-3"
            />

            {description && (
              <p className="text-[16.5px] text-[#5B6068] leading-relaxed m-0">
                {description}
              </p>
            )}
          </div>

          {/* Article Body */}
          <article className="bg-[#FFFFFF] border border-[#E5E7EB] rounded-[20px] p-6 sm:p-10 mb-10">
            <div className="content">
              <MDXContent content={content} />
            </div>
          </article>

          {/* In-Article Conversion CTA */}
          <div className="bg-[#FFC62A] rounded-[20px] p-6 sm:p-8 border border-[#202326]/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <Image
                src="/images/brand-mascot.png"
                alt="Linh vật Sèo Trum"
                width={76}
                height={78}
                loading="eager"
                className="w-[68px] h-auto object-contain shrink-0 hidden sm:block"
              />
              <div>
                <h2 className="text-[20px] font-extrabold text-[#202326] mb-1">
                  Bạn đang gặp bài toán tương tự trong quy trình?
                </h2>
                <p className="text-[15px] text-[#202326]/90 m-0">
                  Kể tôi nghe thao tác đang lặp lại mỗi ngày. Ta cùng tìm cách
                  tự động hoá gọn nhất.
                </p>
              </div>
            </div>
            <Link
              href="/#tu-van"
              className="inline-flex items-center gap-2 bg-[#202326] text-[#FFFFFF] text-[14.5px] font-bold rounded-[12px] px-5 py-3.5 st-btn-lift shrink-0"
            >
              <span>Trao đổi bài toán</span>
              <span className="text-[#FFC62A]" aria-hidden="true">
                →
              </span>
            </Link>
          </div>

          {/* Related Posts */}
          {similarPosts.length > 0 && (
            <div className="mt-12 pt-10 border-t border-[#E5E7EB]">
              <h2 className="text-[22px] font-bold text-[#202326] mb-6">
                Chủ đề liên quan trong Góc chia sẻ
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {similarPosts.map((relPost) => (
                  <BlogCard key={relPost.slug} data={relPost} />
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default PostSingle;
