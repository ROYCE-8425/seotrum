import config from "@/config/config.json";
import { plainify } from "@/lib/utils/textConverter";
import { Post } from "@/types";
import Link from "next/link";

const BlogCard = ({ data }: { data: Post }) => {
  const { summary_length, blog_folder } = config.settings;
  const { title, categories, description } = data.frontmatter;
  const primaryCategory = categories?.[0] || "Tự động hoá";
  const isSeoTopic = primaryCategory.toLowerCase().includes("seo");

  return (
    <article className="bg-[#FFFFFF] border border-[#E5E7EB] rounded-[18px] p-6 flex flex-col justify-between h-full st-card-hover">
      <div>
        {/* Technical SVG Illustration matching Sèo Trum Design Kit */}
        <div
          className="h-[110px] w-full bg-[#F6F7F8] border border-[#E5E7EB] rounded-[12px] p-4 mb-5 flex items-center justify-center"
          aria-hidden="true"
        >
          {!isSeoTopic ? (
            <svg viewBox="0 0 160 64" className="w-full h-full max-w-[148px]">
              <rect
                x="10"
                y="20"
                width="34"
                height="24"
                rx="6"
                fill="#FFFFFF"
                stroke="#202326"
                strokeWidth="2"
              />
              <line
                x1="44"
                y1="32"
                x2="64"
                y2="32"
                stroke="#FFC62A"
                strokeWidth="3"
              />
              <circle
                cx="80"
                cy="32"
                r="15"
                fill="#FFC62A"
                stroke="#202326"
                strokeWidth="2"
              />
              <circle cx="80" cy="32" r="5" fill="#202326" />
              <line
                x1="95"
                y1="32"
                x2="115"
                y2="32"
                stroke="#FFC62A"
                strokeWidth="3"
              />
              <rect
                x="115"
                y="20"
                width="34"
                height="24"
                rx="6"
                fill="#202326"
              />
              <path
                d="M126 32 L131 37 L139 27"
                stroke="#FFC62A"
                strokeWidth="2.5"
                fill="none"
                strokeLinecap="round"
              />
            </svg>
          ) : (
            <svg viewBox="0 0 160 64" className="w-full h-full max-w-[148px]">
              <rect
                x="18"
                y="36"
                width="20"
                height="18"
                rx="3"
                fill="#E5E7EB"
                stroke="#202326"
                strokeWidth="1.8"
              />
              <rect
                x="46"
                y="26"
                width="20"
                height="28"
                rx="3"
                fill="#FFFFFF"
                stroke="#202326"
                strokeWidth="1.8"
              />
              <rect
                x="74"
                y="14"
                width="20"
                height="40"
                rx="3"
                fill="#FFC62A"
                stroke="#202326"
                strokeWidth="1.8"
              />
              <path
                d="M106 42 L122 24 L138 14"
                stroke="#202326"
                strokeWidth="2.5"
                fill="none"
                strokeLinecap="round"
              />
              <circle cx="138" cy="14" r="5" fill="#FFC62A" />
            </svg>
          )}
        </div>

        <div className="flex items-center justify-between gap-2 mb-3">
          <span className="text-[11.5px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#FFFCF1] border border-[#FFC62A] text-[#202326]">
            {primaryCategory}
          </span>
          <span className="text-[11.5px] font-medium text-[#5B6068]">
            Góc chia sẻ
          </span>
        </div>

        <h3 className="text-[18px] font-bold text-[#202326] leading-snug mb-2.5">
          <Link
            href={`/${blog_folder}/${data.slug}`}
            className="hover:underline"
          >
            {title}
          </Link>
        </h3>

        <p className="text-[14.5px] text-[#5B6068] leading-relaxed mb-5">
          {description
            ? plainify(description)
            : plainify(data.content?.slice(0, Number(summary_length)) || "")}
        </p>
      </div>

      <Link
        className="inline-flex items-center gap-1.5 text-[14px] font-bold text-[#202326] self-start hover:translate-x-0.5 transition-transform"
        href={`/${blog_folder}/${data.slug}`}
      >
        <span>Đọc chi tiết</span>
        <span aria-hidden="true">→</span>
      </Link>
    </article>
  );
};

export default BlogCard;
