import SeoTrumHome from "@/components/SeoTrumHome";
import config from "@/config/config.json";
import SeoMeta from "@/partials/SeoMeta";

const Home = () => {
  const baseUrl = config.site.base_url.replace(/\/$/, "");

  const homeServiceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${baseUrl}/#automation-service`,
    name: "Dịch Vụ Tự Động Hoá (Automation) & Xây Dựng Phần Mềm Theo Yêu Cầu — Sèo Trum",
    serviceType: "Dịch vụ tự động hoá quy trình (Workflow Automation) & Custom Software Development",
    description:
      "Sèo Trum cung cấp dịch vụ tự động hoá (automation), xây dựng phần mềm, web app nội bộ, bot và tích hợp API theo yêu cầu giúp doanh nghiệp giảm thao tác thủ công và đồng bộ dữ liệu.",
    provider: {
      "@id": `${baseUrl}/#organization`,
    },
    areaServed: "VN",
    url: `${baseUrl}/services`,
  };

  return (
    <>
      <SeoMeta
        title="Sèo Trum — Dịch Vụ Tự Động Hoá (Automation) & Phần Mềm Theo Yêu Cầu"
        meta_title="Sèo Trum — Dịch Vụ Tự Động Hoá (Automation) & Phần Mềm Theo Yêu Cầu"
        description="Sèo Trum cung cấp dịch vụ tự động hoá (automation), xây dựng phần mềm, web app, bot và tích hợp API theo yêu cầu giúp doanh nghiệp giảm thao tác thủ công và vận hành gọn hơn."
        canonical={baseUrl}
        jsonLd={homeServiceSchema}
      />
      <SeoTrumHome />
    </>
  );
};

export default Home;
