"use client";

import config from "@/config/config.json";
import SeoMeta from "@/partials/SeoMeta";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

const PRINCIPLES = [
  {
    code: "01",
    title: "Bắt đầu từ thao tác thật, không vẽ tính năng thừa",
    description:
      "Một công cụ tốt là công cụ giúp nhân sự bớt phải bấm, bớt phải nhớ quy tắc vụn vặt. Mình ưu tiên làm gọn những điểm nghẽn đang xảy ra mỗi ngày trước khi nghĩ đến những thứ phức tạp.",
  },
  {
    code: "02",
    title: "Người khảo sát bài toán cũng là người trực tiếp xây",
    description:
      "Khi làm việc cùng Sèo Trum, bạn trao đổi thẳng với người thiết kế luồng dữ liệu và viết code. Không qua nhiều tầng trung gian nên ý tưởng không bị tam sao thất bản.",
  },
  {
    code: "03",
    title: "Cấu trúc kỹ thuật rõ ràng, bền cho cả vận hành lẫn SEO",
    description:
      "Từ cơ sở dữ liệu, API kết nối cho đến cấu trúc HTML/Schema trên web đều được tổ chức ngăn nắp để dễ bảo trì, dễ mở rộng và thân thiện với công cụ tìm kiếm.",
  },
];

const TECH_GROUPS = [
  {
    group: "Ứng dụng Web & Giao diện vận hành",
    items: ["Next.js (App Router)", "React 19", "TypeScript", "Tailwind CSS"],
  },
  {
    group: "Tự động hoá, API & Tích hợp hệ thống",
    items: [
      "Node.js",
      "Python",
      "REST API & Webhook",
      "Cron / Queue Workers",
      "Telegram / Zalo / Slack Bot",
    ],
  },
  {
    group: "Dữ liệu & Nền tảng SEO Kỹ thuật",
    items: [
      "PostgreSQL / SQLite",
      "Google Sheets API",
      "Schema.org JSON-LD",
      "Core Web Vitals & Semantic Web",
    ],
  },
];

const FAQS = [
  {
    q: "Doanh nghiệp nhỏ hoặc đội ngũ ít người có nên làm công cụ tự động hoá riêng không?",
    a: "Rất phù hợp nếu bạn đang có một quy trình lặp đi lặp lại mỗi ngày (như tổng hợp đơn, chuẩn hoá dữ liệu, nhắc việc hoặc đồng bộ giữa bảng tính và phần mềm). Bạn có thể bắt đầu từ một tool nhỏ giải quyết đúng chỗ tốn thời gian nhất.",
  },
  {
    q: "Chưa có tài liệu kỹ thuật chi tiết thì trao đổi với Sèo Trum như thế nào?",
    a: "Bạn chỉ cần kể lại cách bạn hoặc nhân sự đang làm tay công việc đó hàng ngày. Mình sẽ cùng bạn vẽ lại thành luồng 3 bước (Đầu vào → Quy tắc xử lý → Kết quả đồng bộ) rõ ràng trước khi bắt tay vào xây dựng.",
  },
  {
    q: "Sau khi bàn giao, nếu quy trình thay đổi thì có nâng cấp tiếp được không?",
    a: "Hoàn toàn được. Các công cụ và web app tại Sèo Trum đều được viết theo cấu trúc mô-đun rõ ràng để dễ dàng thêm bước kiểm tra mới, nối thêm API hoặc mở rộng sang hệ thống lớn hơn khi bạn cần.",
  },
];

export default function AboutPage() {
  const [openFaqIdx, setOpenFaqIdx] = useState<number | null>(0);
  const baseUrl = config.site.base_url.replace(/\/$/, "");

  const profileJsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    "@id": `${baseUrl}/about#profilepage`,
    mainEntity: {
      "@type": "Person",
      "@id": `${baseUrl}/#founder`,
      name: "Sèo Trum",
      jobTitle: "Software Builder & Automation Studio Founder",
      description:
        "Sèo Trum là thương hiệu cá nhân và studio chuyên xây dựng phần mềm tự động hoá, web app theo yêu cầu, tích hợp API/Bot và kiến trúc web chuẩn SEO.",
      url: `${baseUrl}/about`,
      worksFor: {
        "@id": `${baseUrl}/#organization`,
      },
      knowsAbout: [
        "Phần mềm tự động hoá",
        "Web & App theo yêu cầu",
        "API, Bot & Tích hợp hệ thống",
        "Technical SEO & Kiến trúc thông tin",
      ],
    },
  };

  return (
    <div className="bg-[#FFFFFF] text-[#202326]">
      <SeoMeta
        title="Về Sèo Trum — Người hiểu bài toán, người trực tiếp xây"
        meta_title="Về Sèo Trum — Người hiểu bài toán, người trực tiếp xây"
        description="Sèo Trum là thương hiệu cá nhân và studio nơi tôi trực tiếp khảo sát, thiết kế và xây dựng phần mềm tự động hoá, ứng dụng nội bộ và nền tảng web chuẩn SEO."
        og_type="profile"
        jsonLd={profileJsonLd}
      />

      {/* Hero Section on Warm Surface */}
      <section className="pt-10 pb-16 lg:pt-14 lg:pb-20 border-b border-[#E5E7EB]">
        <div className="st-container">
          <div className="bg-[#FFFCF1] border border-[#E5E7EB] rounded-[24px] p-6 sm:p-10 lg:p-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              <div className="lg:col-span-7">
                <div className="inline-flex items-center gap-2 mb-4">
                  <span
                    className="w-2.5 h-2.5 rounded-full bg-[#FFC62A]"
                    aria-hidden="true"
                  />
                  <span className="st-eyebrow text-[#5B6068]">
                    THƯƠNG HIỆU CÁ NHÂN &amp; AUTOMATION STUDIO
                  </span>
                </div>

                <h1 className="st-h1 text-[#202326] mb-5">
                  Người hiểu bài toán.
                  <br />
                  Người{" "}
                  <span className="relative inline-block pb-1">
                    trực tiếp xây.
                    <span
                      className="st-yellow-bar absolute left-0 right-0 -bottom-0.5 h-[8px] bg-[#FFC62A] rounded-full"
                      aria-hidden="true"
                    />
                  </span>
                </h1>

                <p className="text-[17px] lg:text-[18px] leading-[1.6] text-[#5B6068] max-w-[56ch] mb-6">
                  Sèo Trum là thương hiệu cá nhân và studio nơi tôi xây phần mềm
                  tự động hoá, từ ý tưởng đến vận hành. Mục tiêu của tôi rất đơn
                  giản: biến những thao tác lặp lại tốn sức mỗi ngày thành các
                  luồng phần mềm chạy êm, gọn và chính xác.
                </p>

                <div className="flex flex-wrap items-center gap-3.5">
                  <Link
                    href="/#tu-van"
                    className="inline-flex items-center gap-2 bg-[#202326] text-[#FFFFFF] text-[15px] font-bold rounded-[12px] px-5 py-3.5 st-btn-lift hover:bg-[#141618]"
                  >
                    <span>Trao đổi trực tiếp cùng tôi</span>
                    <span className="text-[#FFC62A]" aria-hidden="true">
                      →
                    </span>
                  </Link>
                  <Link
                    href="/services"
                    className="inline-flex items-center gap-2 bg-[#FFFFFF] text-[#202326] border border-[#202326] text-[15px] font-bold rounded-[12px] px-5 py-3.5 st-btn-lift hover:bg-[#F6F7F8]"
                  >
                    <span>Xem các giải pháp đang triển khai</span>
                  </Link>
                </div>
              </div>

              <div className="lg:col-span-5 flex justify-center">
                <div className="bg-[#FFFFFF] border border-[#E5E7EB] rounded-[20px] p-6 sm:p-8 shadow-[0_18px_50px_rgba(20,23,28,0.06)] max-w-[380px] w-full text-center">
                  <div className="bg-[#F6F7F8] border border-[#E5E7EB] rounded-[16px] p-5 mb-5 flex justify-center">
                    <Image
                      src="/images/brand-mascot.png"
                      alt="Linh vật Sèo Trum — Builder trực tiếp xây dựng phần mềm"
                      width={196}
                      height={201}
                      priority
                      className="w-[164px] h-auto object-contain st-mascot-hover"
                    />
                  </div>
                  <Image
                    src="/images/brand-logo.png"
                    alt="Sèo Trum"
                    width={148}
                    height={54}
                    loading="eager"
                    className="w-[138px] h-auto object-contain mx-auto mb-2"
                  />
                  <p className="text-[13.5px] font-semibold text-[#5B6068] mb-4">
                    Software Builder • Automation &amp; Web Studio
                  </p>
                  <div className="text-left bg-[#F6F7F8] border border-[#E5E7EB] rounded-xl p-3.5 space-y-1.5 text-[13px] text-[#202326]">
                    <div>• Trọng tâm: Phần mềm tự động hoá &amp; Custom App</div>
                    <div>• Mở rộng: Tích hợp API, Bot &amp; Kiến trúc SEO</div>
                    <div>• Phong cách: Trực diện, gọn rõ, dùng được ngay</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3 Working Principles */}
      <section className="st-section border-b border-[#E5E7EB]">
        <div className="st-container">
          <div className="max-w-[620px] mb-10">
            <span className="st-eyebrow text-[#5B6068] block mb-2">
              TRIẾT LÝ LÀM VIỆC
            </span>
            <h2 className="st-h2 text-[#202326] m-0">
              Vì sao khách hàng chọn làm việc trực tiếp cùng Sèo Trum?
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {PRINCIPLES.map((item) => (
              <div
                key={item.code}
                className="bg-[#FFFFFF] border border-[#E5E7EB] rounded-[18px] p-7 flex flex-col justify-between st-card-hover"
              >
                <div>
                  <span className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-[#FFC62A] text-[#202326] text-[14px] font-extrabold mb-4">
                    {item.code}
                  </span>
                  <h3 className="st-h3 text-[#202326] mb-3">{item.title}</h3>
                  <p className="text-[15.5px] text-[#5B6068] leading-relaxed m-0">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technology Stack & FAQ */}
      <section className="st-section border-b border-[#E5E7EB]">
        <div className="st-container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Left: Tech Stack (5 cols) */}
            <div className="lg:col-span-5 bg-[#F6F7F8] border border-[#E5E7EB] rounded-[20px] p-6 sm:p-8">
              <span className="st-eyebrow text-[#5B6068] block mb-2">
                NỀN TẢNG KỸ THUẬT
              </span>
              <h2 className="text-[24px] font-bold text-[#202326] mb-3">
                Công nghệ phục vụ bài toán
              </h2>
              <p className="text-[14.5px] text-[#5B6068] leading-relaxed mb-6">
                Lựa chọn công nghệ dựa trên độ ổn định, tốc độ phản hồi và sự
                thuận tiện khi vận hành lâu dài cho doanh nghiệp.
              </p>

              <div className="space-y-4">
                {TECH_GROUPS.map((tg) => (
                  <div
                    key={tg.group}
                    className="bg-[#FFFFFF] border border-[#E5E7EB] rounded-xl p-4"
                  >
                    <h3 className="text-[14px] font-bold text-[#202326] mb-2.5">
                      {tg.group}
                    </h3>
                    <div className="flex flex-wrap gap-1.5">
                      {tg.items.map((tech) => (
                        <span
                          key={tech}
                          className="text-[12px] font-semibold px-2.5 py-1 rounded-lg bg-[#F6F7F8] border border-[#E5E7EB] text-[#202326]"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: FAQ (7 cols) */}
            <div className="lg:col-span-7">
              <span className="st-eyebrow text-[#5B6068] block mb-2">
                CÂU HỎI THƯỜNG GẶP
              </span>
              <h2 className="st-h2 text-[#202326] mb-6">
                Giải đáp nhanh trước khi bắt đầu
              </h2>

              <div className="space-y-3.5">
                {FAQS.map((faq, idx) => {
                  const isOpen = openFaqIdx === idx;
                  return (
                    <div
                      key={faq.q}
                      className="bg-[#FFFFFF] border border-[#E5E7EB] rounded-[16px] overflow-hidden"
                    >
                      <button
                        type="button"
                        aria-expanded={isOpen}
                        onClick={() => setOpenFaqIdx(isOpen ? null : idx)}
                        className="w-full text-left px-6 py-4 flex items-center justify-between gap-4 hover:bg-[#F6F7F8] transition-colors"
                      >
                        <span className="text-[16px] font-bold text-[#202326]">
                          {faq.q}
                        </span>
                        <span
                          className={`w-7 h-7 rounded-lg flex items-center justify-center text-[14px] font-extrabold shrink-0 ${
                            isOpen
                              ? "bg-[#FFC62A] text-[#202326]"
                              : "bg-[#F6F7F8] text-[#202326] border border-[#E5E7EB]"
                          }`}
                          aria-hidden="true"
                        >
                          {isOpen ? "−" : "+"}
                        </span>
                      </button>
                      {isOpen && (
                        <div className="px-6 pb-5 pt-1 text-[15px] text-[#5B6068] leading-relaxed border-t border-[#E5E7EB]/60">
                          {faq.a}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
