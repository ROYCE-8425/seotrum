"use client";

import { humanize } from "@/lib/utils/textConverter";
import Link from "next/link";
import { usePathname } from "next/navigation";

const VIETNAMESE_ROUTE_LABELS: Record<string, string> = {
  categories: "Chuyên mục",
  tags: "Từ khoá chủ đề",
  authors: "Tác giả",
  blog: "Góc chia sẻ",
  services: "Phần mềm & Giải pháp",
  "case-studies": "Mô hình dự án",
  "automation-studio": "Automation Studio",
  about: "Hồ sơ Sèo Trum",
  contact: "Đặt bài toán tư vấn",
  "privacy-policy": "Chính sách bảo mật",
};

const Breadcrumbs = ({ className }: { className?: string }) => {
  const pathname = usePathname();

  const paths = pathname.split("/").filter((x) => x);
  const parts = [
    {
      label: "Trang chủ",
      href: "/",
      "aria-label": pathname === "/" ? "page" : undefined,
    },
  ];

  paths.forEach((segment: string, i: number) => {
    const href = `/${paths.slice(0, i + 1).join("/")}`;
    if (segment !== "page") {
      const decoded = decodeURIComponent(segment);
      const label =
        VIETNAMESE_ROUTE_LABELS[decoded] ||
        humanize(decoded.replace(/[-_]/g, " ")) ||
        "";
      parts.push({
        label,
        href,
        "aria-label": pathname === href ? "page" : undefined,
      });
    }
  });

  return (
    <nav aria-label="Breadcrumb" className={className}>
      <ol
        className="inline-flex flex-wrap items-center gap-1.5 text-[13.5px] font-medium m-0 p-0 list-none"
        role="list"
      >
        {parts.map(({ label, ...attrs }, index) => (
          <li
            className="inline-flex items-center gap-1.5"
            role="listitem"
            key={index}
          >
            {index > 0 && <span className="text-[#5B6068]">/</span>}
            {index !== parts.length - 1 ? (
              <Link
                className="text-[#5B6068] hover:text-[#202326] transition-colors"
                {...attrs}
              >
                {label}
              </Link>
            ) : (
              <span className="text-[#202326] font-semibold">{label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
