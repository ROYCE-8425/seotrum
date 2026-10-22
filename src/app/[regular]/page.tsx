import MDXContent from "@/helpers/MDXContent";
import { getSinglePage } from "@/lib/contentParser";
import PageHeader from "@/partials/PageHeader";
import SeoMeta from "@/partials/SeoMeta";
import { RegularPage } from "@/types";

export const dynamicParams = false;

export const generateStaticParams = () => {
  const getRegularPages = getSinglePage("pages");

  const regularPages = getRegularPages.map((page: RegularPage) => ({
    regular: page.slug,
  }));

  return regularPages;
};

const RegularPages = async (props: {
  params: Promise<{ regular: string }>;
}) => {
  const params = await props.params;
  const regularData = getSinglePage("pages");
  const data = regularData.filter(
    (page: RegularPage) => page.slug === params.regular,
  )[0];
  const { frontmatter, content } = data;
  const { title, meta_title, description, image } = frontmatter;

  return (
    <div className="bg-[#FFFFFF] text-[#202326]">
      <SeoMeta
        title={title}
        meta_title={meta_title}
        description={description}
        image={image}
      />
      <PageHeader title={title} eyebrow="THÔNG TIN & QUY ĐỊNH" />
      <section className="st-section">
        <div className="st-container max-w-[840px]">
          <div className="bg-[#FFFFFF] border border-[#E5E7EB] rounded-[20px] p-6 sm:p-10 content">
            <MDXContent content={content} />
          </div>
        </div>
      </section>
    </div>
  );
};

export default RegularPages;
