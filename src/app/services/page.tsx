"use client";

import config from "@/config/config.json";
import SeoMeta from "@/partials/SeoMeta";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

interface ServicePillar {
  id: string;
  slug: string;
  code: string;
  tag: string;
  title: string;
  summary: string;
  problemSymptoms: string[];
  deliverables: string[];
  exampleWorkflow: {
    input: string;
    rule: string;
    output: string;
  };
  techStack: string[];
  formOption: string;
}

const SERVICE_PILLARS: ServicePillar[] = [
  {
    id: "automation-tools",
    slug: "cong-cu-tu-dong-hoa",
    code: "SOL-01",
    tag: "DỊCH VỤ AUTOMATION QUY TRÌNH",
    title: "Dịch vụ & Công cụ tự động hoá",
    summary:
      "Dịch vụ tự động hoá (automation) quy trình vận hành: giảm nhập liệu thủ công, tự chạy tác vụ lặp lại và đối soát dữ liệu 24/7.",
    problemSymptoms: [
      "Mỗi ngày đội ngũ phải copy-paste dữ liệu qua lại giữa nhiều file bảng tính hoặc biểu mẫu",
      "Dễ sót đơn, lệch mã bản ghi hoặc sai định dạng SĐT/Email khi làm tay",
      "Tốn hàng giờ cuối ngày chỉ để tổng hợp báo cáo tiến độ lặp đi lặp lại",
    ],
    deliverables: [
      "Bộ công cụ tự động nhận, kiểm tra và chuẩn hoá dữ liệu theo quy tắc riêng",
      "Cơ chế kích hoạt tự động theo sự kiện (realtime) hoặc chạy định kỳ theo lịch",
      "Màn hình theo dõi nhật ký thực thi (log) rõ ràng để đối soát bất cứ lúc nào",
    ],
    exampleWorkflow: {
      input: "Biểu mẫu / File bảng tính",
      rule: "Kiểm tra & Chuẩn hoá quy tắc",
      output: "Cập nhật hệ thống & Báo tin",
    },
    techStack: ["Node.js / TypeScript", "Python", "n8n / Custom Queue", "Webhook"],
    formOption: "Tự động hoá",
  },
  {
    id: "custom-web-app",
    slug: "thiet-ke-web-app-theo-yeu-cau",
    code: "SOL-02",
    tag: "CUSTOM DEVELOPMENT",
    title: "Web & App theo yêu cầu",
    summary:
      "Ứng dụng nội bộ, cổng khách hàng và dashboard quản lý gọn rõ, bám sát quy trình thật.",
    problemSymptoms: [
      "Quản lý công việc bằng bảng tính bắt đầu quá tải, rối phân quyền khi nhiều người cùng sửa",
      "Phần mềm đóng gói sẵn trên thị trường thừa tính năng không dùng nhưng thiếu đúng bước nghiệp vụ riêng",
      "Không theo dõi được trạng thái xử lý từng đầu việc trên một màn hình tập trung",
    ],
    deliverables: [
      "Ứng dụng Web / Internal Tool thiết kế vừa khít luồng làm việc của đội ngũ",
      "Phân quyền vai trò rõ ràng (Người tiếp nhận, Người xử lý, Quản lý duyệt)",
      "Giao diện sáng, tốc độ phản hồi nhanh trên cả máy tính và điện thoại",
    ],
    exampleWorkflow: {
      input: "Tạo yêu cầu / Tiếp nhận đơn",
      rule: "Phân luồng & Xử lý theo trạng thái",
      output: "Dashboard theo dõi & Báo cáo",
    },
    techStack: ["Next.js", "React", "TypeScript", "PostgreSQL / Prisma"],
    formOption: "Web & App",
  },
  {
    id: "api-bot-integration",
    slug: "tich-hop-api-bot-he-thong",
    code: "SOL-03",
    tag: "SYSTEM INTEGRATION",
    title: "API, Bot & Tích hợp",
    summary:
      "Kết nối CRM, bảng tính, thông báo và các công cụ làm việc để dữ liệu tự đồng bộ.",
    problemSymptoms: [
      "Đang dùng nhiều công cụ rời rạc (Web, CRM, Google Sheets, Chat nội bộ) nhưng không tự liên thông",
      "Nhân sự phải mở 3–4 màn hình khác nhau để nhập lại cùng một thông tin khách hàng",
      "Thông báo việc mới trong nhóm chat dễ bị trôi, không biết ai đã nhận xử lý",
    ],
    deliverables: [
      "Cầu nối API / Webhook đồng bộ dữ liệu tự động giữa các nền tảng đang dùng",
      "Bot thông báo trạng thái, nhắc việc hoặc tra cứu nhanh ngay trong khung chat",
      "Cơ chế tự thử lại (retry) và cảnh báo ngay khi kết nối bên thứ ba gián đoạn",
    ],
    exampleWorkflow: {
      input: "Sự kiện từ Web / CRM",
      rule: "Ánh xạ & Lọc điều kiện API",
      output: "Đồng bộ Sheet & Bot báo tin",
    },
    techStack: ["REST API", "Webhook", "Telegram / Slack / Zalo Bot", "Worker"],
    formOption: "API, Bot & Tích hợp",
  },
  {
    id: "seo-architecture",
    slug: "kien-truc-web-va-tu-dong-hoa-seo",
    code: "SOL-04",
    tag: "TECHNICAL SEO & WEB STRUCTURE",
    title: "Kiến trúc Web & SEO bền vững",
    summary:
      "Xây dựng website có cấu trúc thông tin mạch lạc, tốc độ tải nhẹ và nền tảng kỹ thuật chuẩn SEO.",
    problemSymptoms: [
      "Website hiện tại tải chậm, cấu trúc trang rời rạc khiến cả người đọc lẫn công cụ tìm kiếm khó hiểu",
      "Thiếu dữ liệu có cấu trúc (Schema JSON-LD), phân cấp tiêu đề và liên kết nội bộ hợp lý",
      "Tốn nhiều công sức quản trị bài viết và kiểm tra lỗi kỹ thuật thủ công",
    ],
    deliverables: [
      "Kiến trúc trang đích dịch vụ & chuyên mục nội dung rõ ràng, tối ưu trải nghiệm đọc",
      "Chuẩn hoá Technical SEO (Metadata, Schema.org, Sitemap, Core Web Vitals)",
      "Công cụ tự động hỗ trợ kiểm tra cấu trúc nội dung và theo dõi sức khoẻ kỹ thuật của web",
    ],
    exampleWorkflow: {
      input: "Nghiên cứu chủ đề & Cấu trúc",
      rule: "Chuẩn hoá Schema & Liên kết nội bộ",
      output: "Nền tảng Web nhẹ & Bền cho SEO",
    },
    techStack: ["Next.js App Router", "Schema JSON-LD", "Core Web Vitals", "Content Tooling"],
    formOption: "SEO",
  },
];

const WORK_PROCESS = [
  {
    step: "01",
    title: "Nghe bài toán & Khảo sát luồng thật",
    detail:
      "Cùng bạn nhìn thẳng vào thao tác đang lặp lại mỗi ngày: dữ liệu bắt đầu từ đâu, qua những bước kiểm tra nào và kết quả cuối cần nằm ở đâu.",
  },
  {
    step: "02",
    title: "Dựng mô hình & Thống nhất phạm vi",
    detail:
      "Vẽ sơ đồ luồng xử lý gọn nhất, chọn phương án kỹ thuật vừa vặn (dịch vụ tự động hoá n8n/Make, viết tool riêng, tích hợp API hay dựng web app) để tối ưu chi phí và thời gian.",
  },
  {
    step: "03",
    title: "Xây dựng & Chạy thử dữ liệu mẫu",
    detail:
      "Trực tiếp phát triển hệ thống, kiểm thử kỹ với bộ dữ liệu mẫu và tinh chỉnh giao diện sao cho người dùng cuối thao tác ít bước nhất.",
  },
  {
    step: "04",
    title: "Bàn giao rõ ràng & Đồng hành mở rộng",
    detail:
      "Bàn giao hệ thống kèm hướng dẫn ngắn gọn, theo dõi vận hành thực tế và sẵn sàng nâng cấp thêm luồng mới khi doanh nghiệp mở rộng.",
  },
];

const COMPARISON_ROWS = [
  {
    criteria: "Độ khớp với quy trình thực tế",
    saas: "Phải sửa quy trình doanh nghiệp để theo phần mềm có sẵn (chỉ khớp 50–60%)",
    seotrum: "Thiết kế khớp 100% với quy trình, biểu mẫu và quy tắc nghiệp vụ riêng của bạn",
  },
  {
    criteria: "Chi phí khi mở rộng quy mô",
    saas: "Tăng luỹ tiến theo số lượng tài khoản (user) và giới hạn số lượng task/tháng",
    seotrum: "Chi phí đầu tư rõ ràng theo giai đoạn, chạy không giới hạn tác vụ trên hạ tầng riêng",
  },
  {
    criteria: "Khả năng kết nối dữ liệu",
    saas: "Bị động, phụ thuộc vào cổng tích hợp có sẵn của nhà cung cấp",
    seotrum: "Tích hợp linh hoạt mọi REST API, Webhook, Database, Google Sheets, Zalo/Telegram Bot",
  },
  {
    criteria: "Quyền sở hữu & Bảo mật",
    saas: "Dữ liệu vận hành nằm hoàn toàn trên đám mây của bên thứ ba",
    seotrum: "Bàn giao đầy đủ mã nguồn (Source Code), tài liệu và toàn quyền kiểm soát dữ liệu",
  },
];

export default function ServicesPage() {
  const [selectedPillarId, setSelectedPillarId] = useState<string>(
    SERVICE_PILLARS[0].id,
  );

  const baseUrl = config.site.base_url.replace(/\/$/, "");
  const serviceJsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      "@id": `${baseUrl}/services#service`,
      name: "Dịch Vụ Tự Động Hoá (Automation) & Phần Mềm Theo Yêu Cầu — Sèo Trum",
      serviceType: "Dịch vụ tự động hoá quy trình (Workflow Automation) & Custom Software Development",
      description:
        "Sèo Trum cung cấp dịch vụ tự động hoá (automation), xây dựng phần mềm theo yêu cầu, web app nội bộ, tích hợp API & Bot giúp doanh nghiệp loại bỏ thao tác thủ công và đồng bộ dữ liệu.",
      provider: {
        "@id": `${baseUrl}/#organization`,
      },
      areaServed: "VN",
      url: `${baseUrl}/services`,
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
          name: "Dịch vụ tự động hoá (Automation)",
          item: `${baseUrl}/services`,
        },
      ],
    },
  ];

  return (
    <div className="bg-[#FFFFFF] text-[#202326]">
      <SeoMeta
        title="Dịch Vụ Tự Động Hoá (Automation) & Phần Mềm Theo Yêu Cầu | Sèo Trum"
        meta_title="Dịch Vụ Tự Động Hoá (Automation) & Phần Mềm Theo Yêu Cầu | Sèo Trum"
        description="Sèo Trum cung cấp dịch vụ tự động hoá (automation), xây dựng phần mềm theo yêu cầu, web app nội bộ, tích hợp API & Bot giúp doanh nghiệp loại bỏ thao tác thủ công và đồng bộ dữ liệu."
        canonical={`${baseUrl}/services`}
        jsonLd={serviceJsonLd}
      />

      {/* Hero Section */}
      <section className="pt-10 pb-16 lg:pt-14 lg:pb-20 border-b border-[#E5E7EB]">
        <div className="st-container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 mb-4">
                <span
                  className="w-2.5 h-2.5 rounded-full bg-[#FFC62A]"
                  aria-hidden="true"
                />
                <span className="st-eyebrow text-[#5B6068]">
                  ĐÚNG CÔNG CỤ. ĐÚNG VIỆC. • DỊCH VỤ AUTOMATION THEO NHU CẦU
                </span>
              </div>

              <h1 className="st-h1 text-[#202326] mb-5">
                Dịch Vụ{" "}
                <span className="relative inline-block pb-1">
                  Tự Động Hoá
                  <span
                    className="st-yellow-bar absolute left-0 right-0 -bottom-0.5 h-[8px] bg-[#FFC62A] rounded-full"
                    aria-hidden="true"
                  />
                </span>{" "}
                (Automation) &amp; Phần Mềm Theo Yêu Cầu
              </h1>

              <p className="text-[17px] lg:text-[18px] leading-[1.6] text-[#5B6068] max-w-[60ch] mb-8">
                Mỗi doanh nghiệp có một quy trình vận hành khác nhau. Sèo Trum
                cung cấp <strong>dịch vụ tự động hoá (automation)</strong> và
                xây dựng phần mềm may đo riêng giúp đội ngũ bớt thao tác tay,
                nối liền dữ liệu giữa các công cụ và vận hành nhẹ nhàng hơn.
              </p>

              <div className="flex flex-wrap items-center gap-3.5">
                <Link
                  href="/#tu-van"
                  className="inline-flex items-center gap-2.5 bg-[#202326] text-[#FFFFFF] text-[15px] font-bold rounded-[12px] px-5 py-3.5 st-btn-lift hover:bg-[#141618]"
                >
                  <span>Trao đổi bài toán của bạn</span>
                  <span
                    className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-[#FFC62A] text-[#202326] text-xs font-extrabold"
                    aria-hidden="true"
                  >
                    →
                  </span>
                </Link>
                <Link
                  href="/case-studies"
                  className="inline-flex items-center gap-2 bg-[#FFFFFF] text-[#202326] border border-[#202326] text-[15px] font-bold rounded-[12px] px-5 py-3.5 st-btn-lift hover:bg-[#F6F7F8]"
                >
                  <span>Xem mô hình dự án minh hoạ</span>
                </Link>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="bg-[#FFFCF1] border border-[#E5E7EB] rounded-[20px] p-6 sm:p-7 flex flex-col sm:flex-row items-center gap-6">
                <Image
                  src="/images/brand-mascot.png"
                  alt="Linh vật Sèo Trum lập trình giải pháp dịch vụ tự động hoá automation"
                  width={156}
                  height={160}
                  priority
                  className="w-[128px] sm:w-[148px] h-auto object-contain shrink-0 st-mascot-hover"
                />
                <div>
                  <span className="inline-block text-[11.5px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-full bg-[#FFC62A] text-[#202326] mb-2.5">
                    Bắt đầu từ quy trình thật
                  </span>
                  <h2 className="text-[18px] font-bold text-[#202326] mb-2">
                    Chưa rõ nên thuê dịch vụ automation hay dựng web app?
                  </h2>
                  <p className="text-[14px] text-[#5B6068] leading-relaxed m-0">
                    Chọn nhóm giải pháp bên dưới để đối chiếu các dấu hiệu thực
                    tế và xem luồng xử lý minh hoạ.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Solution Selector & Deep Breakdown (All 4 rendered in DOM for SEO) */}
      <section className="st-section border-b border-[#E5E7EB]">
        <div className="st-container">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <span className="st-eyebrow text-[#5B6068] block mb-2">
                4 TRỤ CỘT DỊCH VỤ TỰ ĐỘNG HOÁ &amp; PHẦN MỀM
              </span>
              <h2 className="st-h2 text-[#202326] m-0">
                Chọn bài toán bạn đang ưu tiên giải quyết
              </h2>
            </div>
            <span className="text-[13.5px] font-semibold text-[#202326] bg-[#F6F7F8] border border-[#E5E7EB] rounded-full px-4 py-2 self-start sm:self-auto">
              Thiết kế mô-đun — dễ nâng cấp theo giai đoạn
            </span>
          </div>

          {/* 4 Solution Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
            {SERVICE_PILLARS.map((pillar) => {
              const isSelected = pillar.id === selectedPillarId;
              return (
                <article
                  key={pillar.id}
                  onClick={() => setSelectedPillarId(pillar.id)}
                  className={`cursor-pointer text-left rounded-[16px] p-6 border transition-all st-card-hover flex flex-col justify-between ${
                    isSelected
                      ? "bg-[#FFFCF1] border-[#202326] ring-2 ring-[#FFC62A]/70 shadow-[0_12px_30px_rgba(20,23,28,0.06)]"
                      : "bg-[#FFFFFF] border-[#E5E7EB]"
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="text-[11px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded bg-[#FFC62A] text-[#202326]">
                        {pillar.code}
                      </span>
                      <span className="text-[11px] font-bold text-[#5B6068]">
                        {pillar.tag}
                      </span>
                    </div>
                    <h3 className="text-[19px] font-bold text-[#202326] mb-2">
                      {pillar.title}
                    </h3>
                    <p className="text-[14.5px] text-[#5B6068] leading-relaxed mb-4">
                      {pillar.summary}
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-2 pt-3 border-t border-[#E5E7EB]">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedPillarId(pillar.id);
                      }}
                      className="text-[13px] font-bold text-[#5B6068] hover:text-[#202326]"
                    >
                      {isSelected ? "● Đang chọn" : "Xem nhanh"}
                    </button>
                    <Link
                      href={`/services/${pillar.slug}`}
                      onClick={(e) => e.stopPropagation()}
                      className="inline-flex items-center gap-1 text-[13.5px] font-bold text-[#202326] hover:underline"
                    >
                      <span>Mở trang riêng</span>
                      <span aria-hidden="true">→</span>
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>

          {/* All 4 Pillars Rendered in Static HTML DOM (toggled via block/hidden) */}
          <div aria-live="polite">
            {SERVICE_PILLARS.map((pillar) => {
              const isSelected = pillar.id === selectedPillarId;
              return (
                <div
                  key={pillar.id}
                  className={`${
                    isSelected ? "block" : "hidden"
                  } bg-[#F6F7F8] border border-[#E5E7EB] rounded-[20px] p-6 sm:p-8 lg:p-10`}
                >
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    {/* Left: Symptoms & Deliverables (7 cols) */}
                    <div className="lg:col-span-7 space-y-6">
                      <div>
                        <span className="inline-block text-[12px] font-extrabold px-3 py-1 rounded-full bg-[#FFC62A] text-[#202326] mb-3">
                          {pillar.code} • {pillar.title}
                        </span>
                        <h3 className="st-h3 text-[#202326] mb-2">
                          Khi nào doanh nghiệp cần {pillar.title.toLowerCase()}?
                        </h3>
                        <ul className="space-y-2.5 m-0 p-0 list-none">
                          {pillar.problemSymptoms.map((symptom) => (
                            <li
                              key={symptom}
                              className="bg-[#FFFFFF] border border-[#E5E7EB] rounded-xl p-3.5 text-[14.5px] text-[#202326] flex items-start gap-3"
                            >
                              <span
                                className="w-5 h-5 rounded-full bg-[#FFFCF1] border border-[#FFC62A] text-[#202326] font-extrabold text-[11px] flex items-center justify-center shrink-0 mt-0.5"
                                aria-hidden="true"
                              >
                                !
                              </span>
                              <span>{symptom}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h4 className="text-[16px] font-bold text-[#202326] mb-3">
                          Hạng mục Sèo Trum thiết kế &amp; bàn giao:
                        </h4>
                        <ul className="space-y-2.5 m-0 p-0 list-none">
                          {pillar.deliverables.map((item) => (
                            <li
                              key={item}
                              className="flex items-start gap-2.5 text-[15px] text-[#5B6068]"
                            >
                              <span
                                className="w-5 h-5 rounded-full bg-[#217A48] text-[#FFFFFF] text-[11px] font-bold flex items-center justify-center shrink-0 mt-0.5"
                                aria-hidden="true"
                              >
                                ✓
                              </span>
                              <span className="text-[#202326]">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Right: Visual Workflow Diagram & CTA (5 cols) */}
                    <div className="lg:col-span-5 bg-[#FFFFFF] border border-[#E5E7EB] rounded-[18px] p-6 shadow-2xs">
                      <div className="flex items-center justify-between border-b border-[#E5E7EB] pb-3 mb-5">
                        <span className="text-[12.5px] font-bold uppercase tracking-wider text-[#5B6068]">
                          Mô hình luồng xử lý mẫu
                        </span>
                        <span className="text-[11.5px] font-semibold px-2.5 py-0.5 rounded-full bg-[#F6F7F8] border border-[#E5E7EB] text-[#202326]">
                          Minh hoạ kỹ thuật
                        </span>
                      </div>

                      <div className="space-y-3 mb-6">
                        <div className="bg-[#F6F7F8] border border-[#E5E7EB] rounded-xl p-3.5">
                          <span className="text-[11px] font-bold uppercase text-[#5B6068] block mb-1">
                            Bước 1 • Đầu vào (Input)
                          </span>
                          <span className="text-[14.5px] font-bold text-[#202326]">
                            {pillar.exampleWorkflow.input}
                          </span>
                        </div>

                        <div className="flex justify-center" aria-hidden="true">
                          <span className="w-6 h-6 rounded-full bg-[#FFC62A] text-[#202326] text-xs font-extrabold flex items-center justify-center">
                            ↓
                          </span>
                        </div>

                        <div className="bg-[#FFFCF1] border border-[#FFC62A] rounded-xl p-3.5">
                          <span className="text-[11px] font-bold uppercase text-[#5B6068] block mb-1">
                            Bước 2 • Xử lý quy tắc (Rule Engine)
                          </span>
                          <span className="text-[14.5px] font-bold text-[#202326]">
                            {pillar.exampleWorkflow.rule}
                          </span>
                        </div>

                        <div className="flex justify-center" aria-hidden="true">
                          <span className="w-6 h-6 rounded-full bg-[#FFC62A] text-[#202326] text-xs font-extrabold flex items-center justify-center">
                            ↓
                          </span>
                        </div>

                        <div className="bg-[#202326] text-[#FFFFFF] rounded-xl p-3.5">
                          <span className="text-[11px] font-bold uppercase text-[#FFC62A] block mb-1">
                            Bước 3 • Đồng bộ &amp; Kết quả (Output)
                          </span>
                          <span className="text-[14.5px] font-bold text-[#FFFFFF]">
                            {pillar.exampleWorkflow.output}
                          </span>
                        </div>
                      </div>

                      <div className="mb-6">
                        <span className="text-[12px] font-bold text-[#5B6068] block mb-2">
                          Nhóm công nghệ thường dùng:
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {pillar.techStack.map((tech) => (
                            <span
                              key={tech}
                              className="text-[12px] font-semibold px-2.5 py-1 rounded-lg bg-[#F6F7F8] border border-[#E5E7EB] text-[#202326]"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-2.5">
                        <Link
                          href={`/services/${pillar.slug}`}
                          className="w-full inline-flex items-center justify-center gap-2 bg-[#202326] text-[#FFFFFF] text-[14.5px] font-bold rounded-[12px] px-5 py-3.5 st-btn-lift hover:bg-[#141618]"
                        >
                          <span>Mở trang chuyên sâu: {pillar.title}</span>
                          <span className="text-[#FFC62A]" aria-hidden="true">
                            →
                          </span>
                        </Link>
                        <Link
                          href="/contact"
                          className="w-full inline-flex items-center justify-center gap-2 bg-[#FFFCF1] text-[#202326] border border-[#202326]/20 text-[14px] font-bold rounded-[12px] px-5 py-3 hover:bg-[#FFC62A]/40 transition-colors"
                        >
                          <span>Đặt bài toán tư vấn về {pillar.title}</span>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Comparison & Value Proposition Section (Topical Authority for "dịch vụ tự động hoá automation") */}
      <section className="st-section bg-[#F6F7F8] border-b border-[#E5E7EB]">
        <div className="st-container">
          <div className="max-w-[760px] mb-10">
            <span className="st-eyebrow text-[#5B6068] block mb-2">
              SO SÁNH PHƯƠNG ÁN ĐẦU TƯ
            </span>
            <h2 className="st-h2 text-[#202326] mb-3">
              Vì sao doanh nghiệp chọn Dịch vụ tự động hoá (Automation) may đo tại Sèo Trum?
            </h2>
            <p className="text-[16px] text-[#5B6068] m-0 leading-relaxed">
              Thay vì phải gồng gánh chi phí thuê bao hàng tháng cho nhiều phần
              mềm SaaS rời rạc hoặc bị giới hạn số lượng task trên các nền tảng
              no-code, dịch vụ tự động hoá (automation) kết hợp lập trình riêng
              tại Sèo Trum giúp bạn sở hữu hệ thống vừa khít quy trình vận hành.
            </p>
          </div>

          <div className="bg-[#FFFFFF] border border-[#E5E7EB] rounded-[20px] overflow-hidden shadow-2xs mb-8">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-[#202326] text-[#FFFFFF] text-[13.5px]">
                    <th className="py-4 px-5 font-bold w-1/4">Tiêu chí đánh giá</th>
                    <th className="py-4 px-5 font-bold w-3/8 border-l border-white/10">
                      Phần mềm đóng gói / SaaS rời rạc
                    </th>
                    <th className="py-4 px-5 font-bold w-3/8 border-l border-white/10 text-[#FFC62A]">
                      Dịch vụ tự động hoá (Automation) tại Sèo Trum
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E5E7EB] text-[14.5px]">
                  {COMPARISON_ROWS.map((row) => (
                    <tr key={row.criteria} className="hover:bg-[#FFFCF1]/60">
                      <td className="py-4 px-5 font-bold text-[#202326]">
                        {row.criteria}
                      </td>
                      <td className="py-4 px-5 text-[#5B6068] border-l border-[#E5E7EB]">
                        {row.saas}
                      </td>
                      <td className="py-4 px-5 text-[#202326] font-medium border-l border-[#E5E7EB] bg-[#FFFCF1]/40">
                        {row.seotrum}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <Link
              href="/blog/so-sanh-n8n-make-zapier-va-custom-code-automation"
              className="bg-[#FFFFFF] border border-[#E5E7EB] rounded-[16px] p-5 st-card-hover block"
            >
              <span className="text-[11px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded bg-[#FFC62A] text-[#202326] inline-block mb-2.5">
                Góc phân tích kỹ thuật
              </span>
              <h3 className="text-[16.5px] font-bold text-[#202326] mb-1.5">
                So sánh n8n, Make, Zapier và Custom Code Automation →
              </h3>
              <p className="text-[13.5px] text-[#5B6068] m-0">
                Khi nào doanh nghiệp nên dùng nền tảng kéo-thả và khi nào cần viết hệ thống riêng?
              </p>
            </Link>

            <Link
              href="/blog/bang-gia-va-quy-trinh-thue-dich-vu-tu-dong-hoa-automation-doanh-nghiep"
              className="bg-[#FFFFFF] border border-[#E5E7EB] rounded-[16px] p-5 st-card-hover block"
            >
              <span className="text-[11px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded bg-[#FFC62A] text-[#202326] inline-block mb-2.5">
                Chi phí &amp; ROI
              </span>
              <h3 className="text-[16.5px] font-bold text-[#202326] mb-1.5">
                Chi phí &amp; Quy trình thuê dịch vụ tự động hoá (Automation) →
              </h3>
              <p className="text-[13.5px] text-[#5B6068] m-0">
                Cách bóc tách phạm vi bài toán, ước tính ngân sách và đo lường thời gian hoàn vốn.
              </p>
            </Link>

            <Link
              href="/blog/tu-dong-hoa-quy-trinh-ban-hang-va-dong-bo-crm-api"
              className="bg-[#FFFFFF] border border-[#E5E7EB] rounded-[16px] p-5 st-card-hover block"
            >
              <span className="text-[11px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded bg-[#FFC62A] text-[#202326] inline-block mb-2.5">
                Ứng dụng thực tế
              </span>
              <h3 className="text-[16.5px] font-bold text-[#202326] mb-1.5">
                Tự động hoá quy trình bán hàng &amp; Đồng bộ CRM qua API →
              </h3>
              <p className="text-[13.5px] text-[#5B6068] m-0">
                Kiến trúc nối liền dữ liệu từ quảng cáo, biểu mẫu web về CRM và cảnh báo Zalo/Telegram.
              </p>
            </Link>
          </div>
        </div>
      </section>

      {/* 4-Step Implementation Process */}
      <section className="st-section border-b border-[#E5E7EB]">
        <div className="st-container">
          <div className="max-w-[640px] mb-10">
            <span className="st-eyebrow text-[#5B6068] block mb-2">
              QUY TRÌNH TRIỂN KHAI GỌN RÕ
            </span>
            <h2 className="st-h2 text-[#202326] mb-3">
              Từ bài toán thủ công đến hệ thống chạy thật
            </h2>
            <p className="text-[16px] text-[#5B6068] m-0">
              Làm việc trực tiếp cùng người xây hệ thống, chia nhỏ từng bước để
              bạn luôn nắm rõ tiến độ và kiểm chứng được hiệu quả thực tế.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {WORK_PROCESS.map((proc) => (
              <div
                key={proc.step}
                className="bg-[#FFFFFF] border border-[#E5E7EB] rounded-[16px] p-6 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="w-10 h-10 rounded-xl bg-[#FFC62A] text-[#202326] text-[15px] font-extrabold flex items-center justify-center">
                      {proc.step}
                    </span>
                    <span className="h-[2px] flex-1 bg-[#E5E7EB] ml-3" />
                  </div>
                  <h3 className="text-[18px] font-bold text-[#202326] mb-2.5">
                    {proc.title}
                  </h3>
                  <p className="text-[14.5px] text-[#5B6068] leading-relaxed m-0">
                    {proc.detail}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom Yellow CTA Band */}
      <section className="py-12 lg:py-16">
        <div className="st-container">
          <div className="bg-[#FFC62A] rounded-[24px] p-6 sm:p-10 border border-[#202326]/10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div className="max-w-[600px]">
              <h2 className="st-h2 text-[#202326] mb-2">
                Bạn đang có một quy trình lặp lại muốn rút gọn?
              </h2>
              <p className="text-[17px] font-medium text-[#202326]/90 m-0">
                Gửi mô tả ngắn gọn về thao tác hiện tại của bạn, mình sẽ gợi ý
                hướng dịch vụ tự động hoá (automation) phù hợp nhất.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/#tu-van"
                className="inline-flex items-center gap-2 bg-[#202326] text-[#FFFFFF] text-[15px] font-bold rounded-[12px] px-6 py-3.5 st-btn-lift hover:bg-[#141618]"
              >
                <span>Mô tả bài toán ngay</span>
                <span className="text-[#FFC62A]" aria-hidden="true">
                  →
                </span>
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-[#FFFFFF] text-[#202326] border border-[#202326]/20 text-[15px] font-bold rounded-[12px] px-5 py-3.5 st-btn-lift"
              >
                <span>Mở trang liên hệ riêng</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
