import { plainify } from "@/lib/utils/textConverter";
import Image from "next/image";
import Link from "next/link";

const AuthorCard = ({ data }: { data: any }) => {
  const { title, image } = data.frontmatter;
  return (
    <div className="rounded-[20px] bg-[#FFFFFF] border border-[#E5E7EB] p-7 text-center st-card-hover">
      {image && (
        <div className="w-28 h-28 mx-auto mb-5 rounded-[16px] bg-[#FFFCF1] border border-[#E5E7EB] p-3 flex items-center justify-center">
          <Image
            className="w-full h-auto object-contain"
            src={image}
            alt={title}
            width={110}
            height={110}
          />
        </div>
      )}
      <span className="inline-block text-[11px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#FFC62A] text-[#202326] mb-2">
        Thương hiệu cá nhân &amp; Studio
      </span>
      <h2 className="text-[20px] font-bold text-[#202326] mb-2.5">
        <Link href={`/authors/${data.slug}`} className="hover:underline">
          {title}
        </Link>
      </h2>
      <p className="text-[14.5px] text-[#5B6068] leading-relaxed mb-5">
        {plainify(data.content?.slice(0, 140))}
      </p>
      <Link
        href={`/authors/${data.slug}`}
        className="inline-flex items-center gap-1.5 text-[14px] font-bold text-[#202326] bg-[#F6F7F8] hover:bg-[#FFC62A] border border-[#E5E7EB] rounded-[10px] px-4 py-2 transition-colors"
      >
        <span>Xem hồ sơ &amp; bài viết</span>
        <span aria-hidden="true">→</span>
      </Link>
    </div>
  );
};

export default AuthorCard;
