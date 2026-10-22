"use client";

import SeoMeta from "@/partials/SeoMeta";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

interface SystemBlueprint {
  id: string;
  slug: string;
  relatedServiceSlug: string;
  tag: string;
  tagStyle: "brand" | "dark";
  title: string;
  summary: string;
  manualWorkflow: string[];
  automatedWorkflow: string[];
  sampleNodes: {
    step: string;
    label: string;
    desc: string;
  }[];
  techStack: string[];
}

const BLUEPRINTS: SystemBlueprint[] = [
  {
    id: "ops-dashboard",
    slug: "he-thong-quan-ly-va-dieu-phoi-van-hanh",
    relatedServiceSlug: "thiet-ke-web-app-theo-yeu-cau",
    tag: "WEB APP / AUTOMATION",
    tagStyle: "brand",
    title: "Hệ thống quản lý & điều phối vận hành tập trung",
    summary:
      "Tập hợp toàn bộ yêu cầu đầu vào, phân công xử lý theo trạng thái và theo dõi tiến độ trên một màn hình duy nhất.",
    manualWorkflow: [
      "Nhận yêu cầu rải rác qua nhiều nhóm chat và file bảng tính khác nhau",
      "Người điều phối phải copy-paste thủ công từng dòng để giao việc",
      "Khó biết đầu việc nào đang tắc ở bước nào khi số lượng yêu cầu tăng",
    ],
    automatedWorkflow: [
      "Tự động gom mọi yêu cầu mới về một danh sách chuẩn hoá ngay khi phát sinh",
      "Cập nhật trạng thái rõ ràng: Mới tiếp nhận → Đang xử lý → Hoàn tất",
      "Lưu lịch sử thao tác minh bạch theo từng bản ghi để tra cứu tức thì",
    ],
    sampleNodes: [
      {
        step: "01",
        label: "Cổng tiếp nhận",
        desc: "Biểu mẫu / Nhập liệu nội bộ (REQ-001)",
      },
      {
        step: "02",
        label: "Bộ điều phối trạng thái",
        desc: "Phân loại & gắn người phụ trách",
      },
      {
        step: "03",
        label: "Màn hình vận hành",
        desc: "Theo dõi tiến độ & xuất báo cáo mẫu",
      },
    ],
    techStack: ["Next.js", "TypeScript", "PostgreSQL", "Role-based Access"],
  },
  {
    id: "data-sync-engine",
    slug: "cong-cu-xu-ly-va-dong-bo-du-lieu-da-kenh",
    relatedServiceSlug: "cong-cu-tu-dong-hoa",
    tag: "CUSTOM TOOL / API",
    tagStyle: "dark",
    title: "Công cụ kiểm tra, chuẩn hoá & đồng bộ dữ liệu đa nền tảng",
    summary:
      "Tự động đọc dữ liệu đầu vào, lọc bản ghi lỗi hoặc trùng lặp và đẩy dữ liệu sạch sang hệ thống đích qua API.",
    manualWorkflow: [
      "Mở file dữ liệu hàng ngày để dò tìm dòng thiếu SĐT, sai định dạng email hoặc trùng mã",
      "Sửa tay từng dòng rồi xuất file CSV để tải lên phần mềm quản lý",
      "Khi có lỗi nhập liệu chỉ phát hiện sau khi dữ liệu đã bị lệch giữa hai nơi",
    ],
    automatedWorkflow: [
      "Tự động kiểm tra tính hợp lệ của từng trường dữ liệu theo bộ quy tắc định sẵn",
      "Tách riêng các bản ghi hợp lệ để đồng bộ ngay và đánh dấu bản ghi cần kiểm tra lại",
      "Ghi nhật ký đồng bộ chi tiết cho từng lượt chạy để đối soát dễ dàng",
    ],
    sampleNodes: [
      {
        step: "01",
        label: "Nguồn dữ liệu mẫu",
        desc: "Bảng tính / Webhook / File đầu vào",
      },
      {
        step: "02",
        label: "Bộ lọc & Chuẩn hoá",
        desc: "Kiểm tra định dạng & chống trùng lặp",
      },
      {
        step: "03",
        label: "Đồng bộ API đích",
        desc: "Cập nhật CRM / Cơ sở dữ liệu",
      },
    ],
    techStack: ["Node.js", "Python", "REST API / Webhook", "Validation Rules"],
  },
  {
    id: "chat-bot-ops",
    slug: "he-thong-bot-thong-bao-va-tra-cuu-nhanh",
    relatedServiceSlug: "tich-hop-api-bot-he-thong",
    tag: "BOT / NOTIFICATION PIPELINE",
    tagStyle: "brand",
    title: "Hệ thống Bot thông báo trạng thái & tra cứu nhanh",
    summary:
      "Kết nối sự kiện từ hệ thống vận hành vào khung chat làm việc để nhắc việc đúng người và tra cứu trạng thái tức thì.",
    manualWorkflow: [
      "Nhân sự phải liên tục nhắn hỏi nhau trong nhóm chat xem đơn hoặc tác vụ đã xong chưa",
      "Tin nhắn quan trọng bị trôi giữa hàng trăm trao đổi khác trong ngày",
      "Cuối ngày phải tổng hợp thủ công danh sách các việc còn tồn đọng",
    ],
    automatedWorkflow: [
      "Tự động gửi thông báo có cấu trúc rõ ràng ngay khi trạng thái công việc thay đổi",
      "Hỗ trợ gõ lệnh tra cứu nhanh mã bản ghi mẫu ngay trong khung chat",
      "Tự động gửi bản tóm tắt các đầu việc cần chú ý theo khung giờ cố định",
    ],
    sampleNodes: [
      {
        step: "01",
        label: "Sự kiện hệ thống",
        desc: "Thay đổi trạng thái / Lịch định kỳ",
      },
      {
        step: "02",
        label: "Định tuyến thông báo",
        desc: "Chọn đúng nhóm & người phụ trách",
      },
      {
        step: "03",
        label: "Bot gửi tin & Phản hồi",
        desc: "Hiển thị thẻ thông tin gọn rõ",
      },
    ],
    techStack: ["Webhook", "Bot API", "Cron Scheduler", "JSON Payload"],
  },
  {
    id: "seo-web-structure",
    slug: "kien-truc-website-dich-vu-toi-uu-seo",
    relatedServiceSlug: "kien-truc-web-va-tu-dong-hoa-seo",
    tag: "WEB ARCHITECTURE / SEO",
    tagStyle: "dark",
    title: "Kiến trúc Website dịch vụ & hệ thống kiểm tra cấu trúc SEO",
    summary:
      "Xây dựng nền tảng web tốc độ cao với cấu trúc phân cấp rõ ràng, dữ liệu có cấu trúc (Schema) và công cụ rà soát nội dung.",
    manualWorkflow: [
      "Các trang dịch vụ và bài viết thiếu liên kết mạch lạc, trùng lặp tiêu đề hoặc thiếu mô tả",
      "Kiểm tra thủ công từng bài viết xem đã đủ thẻ heading và dữ liệu Schema hay chưa",
      "Giao diện nặng nề, nhiều thành phần thừa làm giảm trải nghiệm trên điện thoại",
    ],
    automatedWorkflow: [
      "Tự động sinh dữ liệu có cấu trúc (JSON-LD), Sitemap XML và kiểm soát chuẩn thẻ meta",
      "Tổ chức luồng liên kết nội bộ rõ ràng giữa trang giải pháp, mô hình mẫu và góc chia sẻ",
      "Giữ giao diện sáng, nhẹ và đạt khả năng phản hồi mượt trên cả máy tính lẫn di động",
    ],
    sampleNodes: [
      {
        step: "01",
        label: "Cấu trúc nội dung",
        desc: "Phân nhóm chủ đề & từ khoá mục tiêu",
      },
      {
        step: "02",
        label: "Chuẩn hoá kỹ thuật",
        desc: "Schema.org, Metadata & Internal Links",
      },
      {
        step: "03",
        label: "Hiển thị & Chuyển đổi",
        desc: "Tải nhanh, dễ đọc & dẫn về form tư vấn",
      },
    ],
    techStack: ["Next.js App Router", "Schema.org JSON-LD", "Sitemap XML", "Semantic HTML"],
  },
];

export default function CaseStudiesPage() {
  const [viewModes, setViewModes] = useState<
    Record<string, "manual" | "automated">
  >({
    "ops-dashboard": "automated",
    "data-sync-engine": "automated",
    "chat-bot-ops": "automated",
    "seo-web-structure": "automated",
  });

  const toggleMode = (id: string, mode: "manual" | "automated") => {
    setViewModes((prev) => ({ ...prev, [id]: mode }));
  };

  return (
    <div className="bg-[#FFFFFF] text-[#202326]">
      <SeoMeta
        title="Mô hình dự án & Kiến trúc hệ thống minh hoạ — Sèo Trum"
        meta_title="Mô hình dự án & Kiến trúc hệ thống minh hoạ — Sèo Trum"
        description="Khám phá các mô hình giải pháp và giao diện dự án minh hoạ của Sèo Trum: Hệ thống quản lý vận hành, công cụ đồng bộ dữ liệu API, Bot tự động và kiến trúc web chuẩn SEO."
      />

      {/* Hero Section */}
      <section className="pt-10 pb-16 lg:pt-14 lg:pb-20 border-b border-[#E5E7EB]">
        <div className="st-container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8">
              <div className="inline-flex items-center gap-2 mb-4">
                <span
                  className="w-2.5 h-2.5 rounded-full bg-[#FFC62A]"
                  aria-hidden="true"
                />
                <span className="st-eyebrow text-[#5B6068]">
                  MÔ HÌNH GIẢI PHÁP &amp; KIẾN TRÚC MINH HOẠ
                </span>
              </div>

              <h1 className="st-h1 text-[#202326] mb-5">
                Xây để dùng.{" "}
                <span className="relative inline-block pb-1">
                  Làm để chạy.
                  <span
                    className="st-yellow-bar absolute left-0 right-0 -bottom-0.5 h-[8px] bg-[#FFC62A] rounded-full"
                    aria-hidden="true"
                  />
                </span>
              </h1>

              <p className="text-[17px] lg:text-[18px] leading-[1.6] text-[#5B6068] max-w-[60ch] mb-6">
                Dưới đây là các mô hình kiến trúc minh hoạ cách Sèo Trum chuyển
                những thao tác thủ công rời rạc thành luồng phần mềm gọn gàng,
                dễ theo dõi và dễ vận hành.
              </p>

              <div className="inline-flex items-center gap-2 bg-[#F6F7F8] border border-[#E5E7EB] rounded-full px-4 py-2 text-[13.5px] font-semibold text-[#5B6068]">
                <span
                  className="w-2 h-2 rounded-full bg-[#FFC62A]"
                  aria-hidden="true"
                />
                <span>
                  Giao diện dự án minh hoạ — sử dụng dữ liệu mẫu trung lập để
                  bảo mật nghiệp vụ
                </span>
              </div>
            </div>

            <div className="lg:col-span-4 flex justify-center lg:justify-end">
              <div className="bg-[#FFFCF1] border border-[#E5E7EB] rounded-[20px] p-6 flex items-center gap-4 max-w-[360px]">
                <Image
                  src="/images/brand-mascot.png"
                  alt="Linh vật Sèo Trum"
                  width={112}
                  height={115}
                  priority
                  className="w-[96px] h-auto object-contain shrink-0"
                />
                <div className="text-[13.5px] text-[#202326] leading-snug">
                  <strong className="block mb-1">
                    So sánh trực quan từng mô hình
                  </strong>
                  Bấm chuyển đổi giữa chế độ <em>Thao tác tay</em> và{" "}
                  <em>Luồng tự động</em> ở mỗi thẻ bên dưới.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Blueprints Showcase List */}
      <section className="st-section border-b border-[#E5E7EB]">
        <div className="st-container space-y-8">
          {BLUEPRINTS.map((bp, idx) => {
            const currentMode = viewModes[bp.id] || "automated";
            return (
              <article
                key={bp.id}
                className="bg-[#FFFFFF] border border-[#E5E7EB] rounded-[22px] p-6 sm:p-8 lg:p-10 shadow-[0_14px_40px_rgba(20,23,28,0.04)]"
              >
                {/* Top Meta Row */}
                <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pb-5 border-b border-[#E5E7EB]">
                  <div className="flex flex-wrap items-center gap-2.5">
                    <span className="text-[12px] font-extrabold px-2.5 py-1 rounded bg-[#F6F7F8] border border-[#E5E7EB] text-[#202326]">
                      MÔ HÌNH 0{idx + 1}
                    </span>
                    <span
                      className={`text-[12px] font-extrabold uppercase tracking-wider px-3 py-1 rounded-full ${
                        bp.tagStyle === "brand"
                          ? "bg-[#FFC62A] text-[#202326]"
                          : "bg-[#202326] text-[#FFFFFF]"
                      }`}
                    >
                      {bp.tag}
                    </span>
                  </div>

                  <span className="text-[12.5px] font-semibold text-[#5B6068] bg-[#F6F7F8] border border-[#E5E7EB] rounded-full px-3.5 py-1">
                    Giao diện dự án minh hoạ — dữ liệu mẫu
                  </span>
                </div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                  {/* Left: Description & Before/After Toggle (7 cols) */}
                  <div className="lg:col-span-7">
                    <h2 className="st-h3 text-[#202326] mb-3">{bp.title}</h2>
                    <p className="text-[16px] text-[#5B6068] leading-relaxed mb-6">
                      {bp.summary}
                    </p>

                    {/* Interactive Mode Switcher */}
                    <div
                      className="inline-flex rounded-[12px] bg-[#F6F7F8] border border-[#E5E7EB] p-1 mb-5"
                      role="group"
                      aria-label={`Chế độ đối chiếu cho ${bp.title}`}
                    >
                      <button
                        type="button"
                        onClick={() => toggleMode(bp.id, "manual")}
                        className={`px-3.5 py-2 rounded-[9px] text-[13.5px] font-bold transition-colors ${
                          currentMode === "manual"
                            ? "bg-[#202326] text-[#FFFFFF]"
                            : "text-[#5B6068] hover:text-[#202326]"
                        }`}
                      >
                        Trước khi có hệ thống (Làm tay)
                      </button>
                      <button
                        type="button"
                        onClick={() => toggleMode(bp.id, "automated")}
                        className={`px-3.5 py-2 rounded-[9px] text-[13.5px] font-bold transition-colors ${
                          currentMode === "automated"
                            ? "bg-[#FFC62A] text-[#202326]"
                            : "text-[#5B6068] hover:text-[#202326]"
                        }`}
                      >
                        Khi vận hành tự động (Sèo Trum)
                      </button>
                    </div>

                    {/* Comparison List */}
                    <div
                      className={`rounded-[16px] p-5 border ${
                        currentMode === "automated"
                          ? "bg-[#FFFCF1] border-[#FFC62A]"
                          : "bg-[#F6F7F8] border-[#E5E7EB]"
                      }`}
                    >
                      <h3 className="text-[14px] font-bold text-[#202326] mb-3">
                        {currentMode === "automated"
                          ? "Cách luồng tự động giải quyết bài toán:"
                          : "Những điểm nghẽn thường gặp khi thao tác thủ công:"}
                      </h3>
                      <ul className="space-y-2.5 m-0 p-0 list-none">
                        {(currentMode === "automated"
                          ? bp.automatedWorkflow
                          : bp.manualWorkflow
                        ).map((point) => (
                          <li
                            key={point}
                            className="flex items-start gap-2.5 text-[14.5px] text-[#202326]"
                          >
                            <span
                              className={`w-5 h-5 rounded-full text-[11px] font-extrabold flex items-center justify-center shrink-0 mt-0.5 ${
                                currentMode === "automated"
                                  ? "bg-[#217A48] text-[#FFFFFF]"
                                  : "bg-[#202326]/15 text-[#202326]"
                              }`}
                              aria-hidden="true"
                            >
                              {currentMode === "automated" ? "✓" : "•"}
                            </span>
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Right: Architecture Flow Diagram Card (5 cols) */}
                  <div className="lg:col-span-5 bg-[#F6F7F8] border border-[#E5E7EB] rounded-[18px] p-5 sm:p-6">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-[12px] font-bold uppercase tracking-wider text-[#5B6068]">
                        Sơ đồ luồng mẫu (3 bước)
                      </span>
                      <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-[#FFFFFF] border border-[#E5E7EB] text-[#202326]">
                         Chỉ số mẫu: —
                      </span>
                    </div>

                    <div className="space-y-3 mb-5">
                      {bp.sampleNodes.map((node, nIdx) => (
                        <div
                          key={node.step}
                          className={`rounded-xl p-3.5 border flex items-start gap-3 ${
                            nIdx === 2
                              ? "bg-[#202326] text-[#FFFFFF] border-[#202326]"
                              : "bg-[#FFFFFF] text-[#202326] border-[#E5E7EB]"
                          }`}
                        >
                          <span
                            className={`w-7 h-7 rounded-lg text-[12px] font-extrabold flex items-center justify-center shrink-0 mt-0.5 ${
                              nIdx === 2
                                ? "bg-[#FFC62A] text-[#202326]"
                                : "bg-[#F6F7F8] text-[#202326] border border-[#E5E7EB]"
                            }`}
                          >
                            {node.step}
                          </span>
                          <div>
                            <div className="text-[14px] font-bold">
                              {node.label}
                            </div>
                            <div
                              className={`text-[12.5px] ${
                                nIdx === 2
                                  ? "text-[#FFFFFF]/80"
                                  : "text-[#5B6068]"
                              }`}
                            >
                              {node.desc}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="flex flex-wrap gap-1.5 mb-5">
                      {bp.techStack.map((tech) => (
                        <span
                          key={tech}
                          className="text-[11.5px] font-semibold px-2.5 py-1 rounded-lg bg-[#FFFFFF] border border-[#E5E7EB] text-[#202326]"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    <div className="space-y-2.5">
                      <Link
                        href={`/case-studies/${bp.slug}`}
                        className="w-full inline-flex items-center justify-center gap-2 bg-[#202326] text-[#FFFFFF] text-[14px] font-bold rounded-[10px] px-4 py-3 st-btn-lift hover:bg-[#141618]"
                      >
                        <span>Xem trang chi tiết mô hình này</span>
                        <span className="text-[#FFC62A]" aria-hidden="true">
                          →
                        </span>
                      </Link>
                      <Link
                        href={`/services/${bp.relatedServiceSlug}`}
                        className="w-full inline-flex items-center justify-center gap-2 bg-[#FFFFFF] text-[#202326] border border-[#E5E7EB] text-[13.5px] font-bold rounded-[10px] px-4 py-2.5 hover:bg-[#FFFCF1] transition-colors"
                      >
                        <span>Xem giải pháp kỹ thuật liên quan</span>
                      </Link>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>
    </div>
  );
}
