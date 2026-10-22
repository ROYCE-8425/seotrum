import config from "@/config/config.json";
import {
  CASE_STUDY_CATALOG,
  CaseStudyDetailItem,
  SERVICE_CATALOG,
} from "@/lib/seoTrumCatalog";
import SeoMeta from "@/partials/SeoMeta";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

export const dynamicParams = false;

export function generateStaticParams() {
  return CASE_STUDY_CATALOG.map((item) => ({
    slug: item.slug,
  }));
}

export default async function CaseStudySinglePage(props: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await props.params;
  const study: CaseStudyDetailItem | undefined = CASE_STUDY_CATALOG.find(
    (c) => c.slug === slug,
  );

  if (!study) {
    notFound();
  }

  const relatedService = SERVICE_CATALOG.find(
    (s) => s.slug === study.relatedServiceSlug,
  );
  const otherStudies = CASE_STUDY_CATALOG.filter((c) => c.slug !== study.slug);

  const baseUrl = config.site.base_url.replace(/\/$/, "");
  const pageUrl = `${baseUrl}/case-studies/${study.slug}`;

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "CreativeWork",
      "@id": `${pageUrl}#blueprint`,
      name: study.title,
      description: study.metaDescription,
      url: pageUrl,
      author: {
        "@id": `${baseUrl}/#organization`,
      },
      inLanguage: "vi-VN",
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
          name: "Mô hình Dự án",
          item: `${baseUrl}/case-studies`,
        },
        {
          "@type": "ListItem",
          position: 3,
          name: study.title,
          item: pageUrl,
        },
      ],
    },
  ];

  return (
    <div className="bg-[#FFFFFF] text-[#202326]">
      <SeoMeta
        title={study.metaTitle}
        meta_title={study.metaTitle}
        description={study.metaDescription}
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
            <Link href="/case-studies" className="hover:text-[#202326]">
              Mô hình Dự án
            </Link>
            <span>/</span>
            <span className="text-[#202326] font-semibold">{study.title}</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            <div className="lg:col-span-7">
              <div className="flex flex-wrap items-center gap-2.5 mb-4">
                <span className="text-[12px] font-extrabold px-3 py-1 rounded-full bg-[#FFC62A] text-[#202326]">
                  Khái niệm giải pháp minh hoạ
                </span>
                <span className="text-[12px] font-bold px-3 py-1 rounded-full bg-[#F6F7F8] border border-[#E5E7EB] text-[#202326]">
                  {study.tag}
                </span>
              </div>

              <h1 className="st-h1 text-[#202326] mb-5">{study.title}</h1>

              <p className="text-[17px] lg:text-[18px] leading-[1.6] text-[#5B6068] max-w-[60ch] mb-6">
                {study.summary}
              </p>

              <div className="bg-[#FFFCF1] border border-[#E5E7EB] rounded-[16px] p-5 mb-7">
                <h2 className="text-[15px] font-bold text-[#202326] mb-1.5">
                  Bối cảnh bài toán vận hành:
                </h2>
                <p className="text-[14.5px] text-[#5B6068] leading-relaxed m-0">
                  {study.problemContext}
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3.5">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2.5 bg-[#202326] text-[#FFFFFF] text-[15px] font-bold rounded-[12px] px-5 py-3.5 st-btn-lift hover:bg-[#141618]"
                >
                  <span>Trao đổi mô hình tương tự</span>
                  <span className="text-[#FFC62A]" aria-hidden="true">
                    →
                  </span>
                </Link>
                {relatedService && (
                  <Link
                    href={`/services/${relatedService.slug}`}
                    className="inline-flex items-center gap-2 bg-[#FFFFFF] text-[#202326] border border-[#202326] text-[15px] font-bold rounded-[12px] px-5 py-3.5 st-btn-lift hover:bg-[#F6F7F8]"
                  >
                    <span>Xem dịch vụ: {relatedService.shortTitle}</span>
                  </Link>
                )}
              </div>
            </div>

            {/* Right: Sample Dashboard / Records Preview */}
            <div className="lg:col-span-5">
              <div className="bg-[#F6F7F8] border border-[#E5E7EB] rounded-[20px] p-6">
                <div className="flex items-center justify-between border-b border-[#E5E7EB] pb-3.5 mb-4">
                  <span className="text-[13px] font-bold text-[#202326]">
                    Giao diện dự án minh hoạ
                  </span>
                  <span className="text-[11.5px] font-semibold px-2.5 py-0.5 rounded-full bg-[#FFFFFF] border border-[#E5E7EB] text-[#5B6068]">
                    Dữ liệu mẫu
                  </span>
                </div>

                <div className="bg-[#FFFFFF] border border-[#E5E7EB] rounded-xl p-4 space-y-3 mb-4">
                  <div className="flex items-center justify-between text-[11px] font-bold text-[#5B6068] border-b border-[#E5E7EB] pb-2">
                    <span>MÃ MẪU</span>
                    <span>THAO TÁC TỰ ĐỘNG</span>
                    <span>TRẠNG THÁI</span>
                  </div>
                  {study.sampleRecords.map((rec) => (
                    <div
                      key={rec.id}
                      className="flex items-center justify-between gap-2 text-[12.5px] border-b border-[#E5E7EB]/60 pb-2 last:border-none last:pb-0"
                    >
                      <div>
                        <span className="font-bold text-[#202326] block">
                          {rec.id}
                        </span>
                        <span className="text-[11px] text-[#5B6068]">
                          {rec.source}
                        </span>
                      </div>
                      <span className="text-[#5B6068] text-[12px] flex-1 px-2">
                        {rec.action}
                      </span>
                      <span className="px-2.5 py-0.5 rounded-full bg-[#FFFCF1] border border-[#FFC62A] text-[#202326] font-bold text-[11px] shrink-0">
                        {rec.status}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="bg-[#202326] text-[#FFFFFF] rounded-xl p-4 flex items-center justify-between">
                  <div>
                    <span className="text-[11px] text-[#FFC62A] font-bold uppercase block">
                      Trạng thái mô hình
                    </span>
                    <span className="text-[13.5px] font-semibold">
                      3/3 bước xử lý tự động
                    </span>
                  </div>
                  <span className="text-[12px] font-bold px-2.5 py-1 rounded bg-[#FFC62A] text-[#202326]">
                    Chỉ số mẫu: —
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3-Node Architecture Breakdown */}
      <section className="st-section border-b border-[#E5E7EB]">
        <div className="st-container">
          <div className="max-w-[640px] mb-10">
            <span className="st-eyebrow text-[#5B6068] block mb-2">
              KIẾN TRÚC LUỒNG DỮ LIỆU
            </span>
            <h2 className="st-h2 text-[#202326] m-0">
              Cấu trúc 3 bước từ dữ liệu đầu vào đến đồng bộ hoàn tất
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
            {study.architectureNodes.map((node) => (
              <div
                key={node.step}
                className="bg-[#FFFFFF] border border-[#E5E7EB] rounded-[18px] p-6 flex flex-col justify-between st-card-hover"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="w-9 h-9 rounded-xl bg-[#FFC62A] text-[#202326] text-[14px] font-extrabold flex items-center justify-center">
                      {node.step}
                    </span>
                    <span className="text-[11.5px] font-bold uppercase tracking-wider text-[#5B6068]">
                      Bước xử lý
                    </span>
                  </div>
                  <h3 className="text-[19px] font-bold text-[#202326] mb-4">
                    {node.title}
                  </h3>

                  <div className="space-y-2.5 text-[13.5px]">
                    <div className="bg-[#F6F7F8] border border-[#E5E7EB] rounded-lg p-3">
                      <span className="font-bold text-[#202326] block mb-0.5">
                        Đầu vào (Input):
                      </span>
                      <span className="text-[#5B6068]">{node.input}</span>
                    </div>
                    <div className="bg-[#FFFCF1] border border-[#FFC62A] rounded-lg p-3">
                      <span className="font-bold text-[#202326] block mb-0.5">
                        Quy tắc (Rule):
                      </span>
                      <span className="text-[#202326]">{node.rule}</span>
                    </div>
                    <div className="bg-[#202326] text-[#FFFFFF] rounded-lg p-3">
                      <span className="font-bold text-[#FFC62A] block mb-0.5">
                        Kết quả (Output):
                      </span>
                      <span className="text-[#FFFFFF]/90">{node.output}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Comparison: Manual vs Automated */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-[#F6F7F8] border border-[#E5E7EB] rounded-[18px] p-6">
              <h3 className="text-[17px] font-bold text-[#202326] mb-4">
                Trước khi có hệ thống (Thao tác thủ công)
              </h3>
              <ul className="space-y-2.5 m-0 p-0 list-none">
                {study.manualPainPoints.map((pt) => (
                  <li
                    key={pt}
                    className="flex items-start gap-2.5 text-[14.5px] text-[#5B6068]"
                  >
                    <span className="w-5 h-5 rounded-full bg-[#202326]/15 text-[#202326] text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                      •
                    </span>
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-[#FFFCF1] border border-[#FFC62A] rounded-[18px] p-6">
              <h3 className="text-[17px] font-bold text-[#202326] mb-4">
                Khi vận hành theo mô hình tự động Sèo Trum
              </h3>
              <ul className="space-y-2.5 m-0 p-0 list-none">
                {study.automatedAdvantages.map((adv) => (
                  <li
                    key={adv}
                    className="flex items-start gap-2.5 text-[14.5px] text-[#202326]"
                  >
                    <span className="w-5 h-5 rounded-full bg-[#217A48] text-[#FFFFFF] text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                      ✓
                    </span>
                    <span>{adv}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Other Blueprints Cross-Links */}
      <section className="st-section">
        <div className="st-container">
          <h2 className="text-[22px] font-bold text-[#202326] mb-6">
            Các mô hình hệ thống minh hoạ khác
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-12">
            {otherStudies.map((os) => (
              <Link
                key={os.slug}
                href={`/case-studies/${os.slug}`}
                className="bg-[#FFFFFF] border border-[#E5E7EB] rounded-[16px] p-5 st-card-hover block"
              >
                <span className="text-[11px] font-extrabold uppercase px-2.5 py-0.5 rounded bg-[#FFC62A] text-[#202326] inline-block mb-2.5">
                  {os.tag}
                </span>
                <h3 className="text-[16.5px] font-bold text-[#202326] mb-2">
                  {os.title}
                </h3>
                <p className="text-[13.5px] text-[#5B6068] m-0">{os.summary}</p>
              </Link>
            ))}
          </div>

          <div className="bg-[#FFC62A] rounded-[24px] p-6 sm:p-10 border border-[#202326]/10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div className="flex items-center gap-5">
              <Image
                src="/images/brand-mascot.png"
                alt="Linh vật Sèo Trum"
                width={80}
                height={82}
                loading="eager"
                className="w-[72px] h-auto object-contain shrink-0 hidden sm:block"
              />
              <div>
                <h2 className="st-h3 text-[#202326] mb-1">
                  Cần xây dựng mô hình tương tự cho doanh nghiệp của bạn?
                </h2>
                <p className="text-[15.5px] text-[#202326]/90 m-0">
                  Kể cho Sèo Trum nghe quy trình hiện tại, ta cùng thiết kế luồng
                  xử lý gọn nhất.
                </p>
              </div>
            </div>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-[#202326] text-[#FFFFFF] text-[15px] font-bold rounded-[12px] px-6 py-3.5 st-btn-lift shrink-0"
            >
              <span>Trao đổi bài toán</span>
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
