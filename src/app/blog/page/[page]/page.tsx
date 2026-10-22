import BlogCard from "@/components/BlogCard";
import Pagination from "@/components/Pagination";
import config from "@/config/config.json";
import { getListPage, getSinglePage } from "@/lib/contentParser";
import { sortByDate } from "@/lib/utils/sortFunctions";
import PageHeader from "@/partials/PageHeader";
import SeoMeta from "@/partials/SeoMeta";
import { Post } from "@/types";

const { blog_folder, pagination } = config.settings;

export const dynamicParams = false;

export const generateStaticParams = () => {
  const allPost: Post[] = getSinglePage(blog_folder);
  const allSlug: string[] = allPost.map((item) => item.slug!);
  const totalPages = Math.ceil(allSlug.length / pagination);
  const paths: { page: string }[] = [];

  for (let i = 1; i < totalPages; i++) {
    paths.push({
      page: (i + 1).toString(),
    });
  }

  return paths;
};

const Posts = async (props: { params: Promise<{ page: number }> }) => {
  const params = await props.params;
  const postIndex: Post = getListPage(`${blog_folder}/_index.md`);
  const { title, meta_title, description, image } = postIndex.frontmatter;
  const posts: Post[] = getSinglePage(blog_folder);
  const sortedPosts = sortByDate(posts);
  const totalPages = Math.ceil(posts.length / pagination);
  const currentPage =
    params.page && !isNaN(Number(params.page)) ? Number(params.page) : 1;
  const indexOfLastPost = currentPage * pagination;
  const indexOfFirstPost = indexOfLastPost - pagination;
  const currentPosts = sortedPosts.slice(indexOfFirstPost, indexOfLastPost);

  return (
    <div className="bg-[#FFFFFF] text-[#202326]">
      <SeoMeta
        title={`${title} — Trang ${currentPage}`}
        meta_title={`${meta_title || title} — Trang ${currentPage}`}
        description={description}
        image={image}
      />
      <PageHeader
        title={`${title} (Trang ${currentPage})`}
        eyebrow="GÓC CHIA SẺ KIẾN THỨC"
      />
      <section className="st-section">
        <div className="st-container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
            {currentPosts.map((post: Post, index: number) => (
              <div key={index}>
                <BlogCard data={post} />
              </div>
            ))}
          </div>
          <Pagination
            section={blog_folder}
            currentPage={currentPage}
            totalPages={totalPages}
          />
        </div>
      </section>
    </div>
  );
};

export default Posts;
