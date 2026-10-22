import config from "@/config/config.json";
import {
  CASE_STUDY_CATALOG,
  SERVICE_CATALOG,
  ServiceDetailItem,
} from "@/lib/seoTrumCatalog";
import SeoMeta from "@/partials/SeoMeta";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

export const dynamicParams = false;

export function generateStaticParams() {
  return SERVICE_CATALOG.map((service) => ({
    slug: service.slug,
  }));
}

export default async function ServiceSinglePage(props: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await props.params;
  const service: ServiceDetailItem | undefined = SERVICE_CATALOG.find(
    (s) => s.slug === slug,
  );

  if (!service) {
    notFound();
  }

  const relatedCaseStudy = CASE_STUDY_CATALOG.find(
    (c) => c.slug === service.relatedCaseStudySlug,
  );
  const otherServices = SERVICE_CATALOG.filter((s) => s.slug !== service.slug);

  const baseUrl = config.site.base_url.replace(/\/$/, "");
  const pageUrl = `${baseUrl}/services/${service.slug}`;

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      "@id": `${pageUrl}#service`,
      name: service.title,
      description: service.metaDescription,
      url: pageUrl,
      provider: {
        "@id": `${baseUrl}/#organization`,
      },
      areaServed: "VN",
      serviceType: service.shortTitle,
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
          name: "Phần mềm & Giải pháp",
          item: `${baseUrl}/services`,
        },
        {
          "@type": "ListItem",
          position: 3,
          name: service.shortTitle,
          item: pageUrl,
        },
      ],
    },
  ];

  return (
    <div className="bg-[#FFFFFF] text-[#202326]">
      <SeoMeta
        title={service.metaTitle}
        meta_title={service.metaTitle}
        description={service.metaDescription}
        canonical={pageUrl}
        jsonLd={jsonLd}
      />

      {/* Hero Section */}
      <section className="pt-8 pb-16 lg:pt-12 lg:pb-20 border-b border-[#E5E7EB]">
        <div className="st-container">
          {/* Breadcrumb */}
          <nav
            aria-label="Breadcrumb"
            className="mb-6 flex flex-wrap items-center gap-2 text-[13.5px] font-medium text-[#5B6068]"
          >
            <Link href="/" className="hover:text-[#202326]">
              Trang chủ
            </Link>
            <span>/</span>
            <Link href="/services" className="hover:text-[#202326]">
              Phần mềm &amp; Giải pháp
            </Link>
            <span>/</span>
            <span className="text-[#202326] font-semibold">
              {service.shortTitle}
            </span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2.5 mb-4">
                <span className="text-[12px] font-extrabold uppercase tracking-wider px-3 py-1 rounded-full bg-[#FFC62A] text-[#202326]">
                  {service.code}
                </span>
                <span className="st-eyebrow text-[#5B6068]">{service.tag}</span>
              </div>

              <h1 className="st-h1 text-[#202326] mb-5">{service.title}</h1>

              <p className="text-[17px] lg:text-[18px] leading-[1.6] text-[#5B6068] max-w-[60ch] mb-8">
                {service.heroSummary}
              </p>

              <div className="flex flex-wrap items-center gap-3.5">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2.5 bg-[#202326] text-[#FFFFFF] text-[15px] font-bold rounded-[12px] px-5 py-3.5 st-btn-lift hover:bg-[#141618]"
                >
                  <span>Trao đổi nhu cầu {service.shortTitle}</span>
                  <span
                    className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-[#FFC62A] text-[#202326] text-xs font-extrabold"
                    aria-hidden="true"
                  >
                    →
                  </span>
                </Link>
                <Link
                  href="/automation-studio"
                  className="inline-flex items-center gap-2 bg-[#FFFFFF] text-[#202326] border border-[#202326] text-[15px] font-bold rounded-[12px] px-5 py-3.5 st-btn-lift hover:bg-[#F6F7F8]"
                >
                  <span>Chạy thử luồng mô phỏng</span>
                </Link>
              </div>
            </div>

            {/* Right: 3-Step Workflow Preview Card */}
            <div className="lg:col-span-5">
              <div className="bg-[#F6F7F8] border border-[#E5E7EB] rounded-[20px] p-6 sm:p-7">
                <div className="flex items-center justify-between border-b border-[#E5E7EB] pb-3.5 mb-5">
                  <span className="text-[13px] font-bold uppercase tracking-wider text-[#202326]">
                    Luồng hoạt động tiêu chuẩn
                  </span>
                  <span className="text-[11.5px] font-semibold px-2.5 py-0.5 rounded-full bg-[#FFFCF1] border border-[#FFC62A] text-[#202326]">
                    3 bước cốt lõi
                  </span>
                </div>

                <div className="space-y-3.5">
                  {service.workflowSteps.map((ws, idx) => (
                    <div
                      key={ws.step}
                      className={`rounded-xl p-4 border ${
                        idx === 2
                          ? "bg-[#202326] text-[#FFFFFF] border-[#202326]"
                          : "bg-[#FFFFFF] text-[#202326] border-[#E5E7EB]"
                      }`}
                    >
                      <div className="flex items-center gap-2.5 mb-1">
                        <span
                          className={`w-6 h-6 rounded-lg text-[11px] font-extrabold flex items-center justify-center ${
                            idx === 2
                              ? "bg-[#FFC62A] text-[#202326]"
                              : "bg-[#FFC62A]/35 text-[#202326]"
                          }`}
                        >
                          {ws.step}
                        </span>
                        <h2 className="text-[15px] font-bold m-0">{ws.name}</h2>
                      </div>
                      <p
                        className={`text-[13.5px] m-0 pl-8 ${
                          idx === 2 ? "text-[#FFFFFF]/80" : "text-[#5B6068]"
                        }`}
                      >
                        {ws.detail}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pain Points vs Deliverables Section */}
      <section className="st-section border-b border-[#E5E7EB]">
        <div className="st-container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left: Pain Points (5 cols) */}
            <div className="lg:col-span-5 bg-[#FFFCF1] border border-[#E5E7EB] rounded-[20px] p-6 sm:p-8">
              <span className="st-eyebrow text-[#5B6068] block mb-2">
                DẤU HIỆU NHẬN BIẾT
              </span>
              <h2 className="st-h3 text-[#202326] mb-5">
                Khi nào bạn nên triển khai {service.shortTitle}?
              </h2>

              <div className="space-y-4">
                {service.painPoints.map((pp, i) => (
                  <div
                    key={pp.title}
                    className="bg-[#FFFFFF] border border-[#E5E7EB] rounded-xl p-4"
                  >
                    <div className="flex items-center gap-2.5 mb-1.5">
                      <span className="w-6 h-6 rounded-full bg-[#FFC62A] text-[#202326] text-[12px] font-extrabold flex items-center justify-center shrink-0">
                        0{i + 1}
                      </span>
                      <h3 className="text-[15.5px] font-bold text-[#202326] m-0">
                        {pp.title}
                      </h3>
                    </div>
                    <p className="text-[14px] text-[#5B6068] leading-relaxed m-0 pl-8">
                      {pp.detail}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Deliverables (7 cols) */}
            <div className="lg:col-span-7">
              <span className="st-eyebrow text-[#5B6068] block mb-2">
                HẠNG MỤC XÂY DỰNG &amp; BÀN GIAO
              </span>
              <h2 className="st-h2 text-[#202326] mb-6">
                Cấu trúc giải pháp Sèo Trum trực tiếp xây dựng
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                {service.deliverables.map((deliv) => (
                  <div
                    key={deliv.title}
                    className="bg-[#FFFFFF] border border-[#E5E7EB] rounded-[16px] p-5 st-card-hover"
                  >
                    <div className="w-7 h-7 rounded-full bg-[#217A48]/15 text-[#217A48] font-bold text-[13px] flex items-center justify-center mb-3">
                      ✓
                    </div>
                    <h3 className="text-[16.5px] font-bold text-[#202326] mb-2">
                      {deliv.title}
                    </h3>
                    <p className="text-[14px] text-[#5B6068] leading-relaxed m-0">
                      {deliv.detail}
                    </p>
                  </div>
                ))}
              </div>

              {/* Practical Use Cases Box */}
              <div className="bg-[#F6F7F8] border border-[#E5E7EB] rounded-[18px] p-6">
                <h3 className="text-[16px] font-bold text-[#202326] mb-3">
                  Các kịch bản ứng dụng thực tế thường gặp:
                </h3>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 m-0 p-0 list-none">
                  {service.useCases.map((uc) => (
                    <li
                      key={uc}
                      className="bg-[#FFFFFF] border border-[#E5E7EB] rounded-xl p-3.5 text-[14px] text-[#202326] flex items-start gap-2.5"
                    >
                      <span className="text-[#FFC62A] font-extrabold">●</span>
                      <span>{uc}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Project Blueprint + Tech Stack + FAQ */}
      <section className="st-section border-b border-[#E5E7EB]">
        <div className="st-container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Related Case Study Card (5 cols) */}
            <div className="lg:col-span-5 space-y-6">
              {relatedCaseStudy && (
                <div className="bg-[#FFFFFF] border border-[#E5E7EB] rounded-[20px] p-6 shadow-2xs">
                  <span className="inline-block text-[11.5px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-full bg-[#FFC62A] text-[#202326] mb-3">
                    Mô hình dự án minh hoạ liên quan
                  </span>
                  <h2 className="text-[20px] font-bold text-[#202326] mb-2">
                    {relatedCaseStudy.title}
                  </h2>
                  <p className="text-[14.5px] text-[#5B6068] leading-relaxed mb-5">
                    {relatedCaseStudy.summary}
                  </p>
                  <Link
                    href={`/case-studies/${relatedCaseStudy.slug}`}
                    className="inline-flex items-center gap-2 bg-[#202326] text-[#FFFFFF] text-[14px] font-bold rounded-[10px] px-4 py-2.5 st-btn-lift"
                  >
                    <span>Xem chi tiết mô hình này</span>
                    <span className="text-[#FFC62A]" aria-hidden="true">
                      →
                    </span>
                  </Link>
                </div>
              )}

              <div className="bg-[#F6F7F8] border border-[#E5E7EB] rounded-[20px] p-6">
                <h3 className="text-[15px] font-bold text-[#202326] mb-3">
                  Công nghệ &amp; Nền tảng triển khai:
                </h3>
                <div className="flex flex-wrap gap-2">
                  {service.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="text-[12.5px] font-semibold px-3 py-1.5 rounded-lg bg-[#FFFFFF] border border-[#E5E7EB] text-[#202326]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* FAQ Section (7 cols) */}
            <div className="lg:col-span-7">
              <span className="st-eyebrow text-[#5B6068] block mb-2">
                CÂU HỎI THƯỜNG GẶP
              </span>
              <h2 className="st-h3 text-[#202326] mb-5">
                Giải đáp về {service.shortTitle}
              </h2>

              <div className="space-y-4 mb-8">
                {service.faqs.map((faq) => (
                  <div
                    key={faq.question}
                    className="bg-[#FFFFFF] border border-[#E5E7EB] rounded-[16px] p-5"
                  >
                    <h3 className="text-[16px] font-bold text-[#202326] mb-2">
                      {faq.question}
                    </h3>
                    <p className="text-[14.5px] text-[#5B6068] leading-relaxed m-0">
                      {faq.answer}
                    </p>
                  </div>
                ))}
              </div>

              {/* Other Services Cross-Links for SEO Silo */}
              <div className="bg-[#F6F7F8] border border-[#E5E7EB] rounded-[18px] p-5">
                <h3 className="text-[14px] font-bold uppercase tracking-wider text-[#5B6068] mb-3">
                  Khám phá các giải pháp khác của Sèo Trum:
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {otherServices.map((os) => (
                    <Link
                      key={os.slug}
                      href={`/services/${os.slug}`}
                      className="bg-[#FFFFFF] border border-[#E5E7EB] rounded-xl p-3.5 hover:border-[#202326] transition-colors block"
                    >
                      <span className="text-[11px] font-extrabold text-[#5B6068] block mb-1">
                        {os.code}
                      </span>
                      <span className="text-[14px] font-bold text-[#202326] block">
                        {os.shortTitle} →
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA Band */}
      <section className="py-12 lg:py-16">
        <div className="st-container">
          <div className="bg-[#FFC62A] rounded-[24px] p-6 sm:p-10 border border-[#202326]/10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div className="flex items-center gap-5">
              <Image
                src="/images/brand-mascot.png"
                alt="Linh vật Sèo Trum"
                width={84}
                height={86}
                loading="eager"
                className="w-[76px] h-auto object-contain shrink-0 hidden sm:block"
              />
              <div>
                <h2 className="st-h3 text-[#202326] mb-1.5">
                  Bắt đầu trao đổi về {service.shortTitle}
                </h2>
                <p className="text-[16px] text-[#202326]/90 m-0">
                  Mô tả ngắn bài toán thực tế của bạn, mình sẽ đề xuất mô hình
                  xử lý gọn và phù hợp nhất.
                </p>
              </div>
            </div>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-[#202326] text-[#FFFFFF] text-[15px] font-bold rounded-[12px] px-6 py-3.5 st-btn-lift shrink-0"
            >
              <span>Gửi bài toán cần tư vấn</span>
              <span className="text-[#FFC62A]" aria-hidden="true">
                →
              </span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
