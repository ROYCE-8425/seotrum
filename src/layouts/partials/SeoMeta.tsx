"use client";

import config from "@/config/config.json";
import social from "@/config/social.json";
import { plainify } from "@/lib/utils/textConverter";
import { usePathname } from "next/navigation";

const SeoMeta = ({
  title,
  meta_title,
  image,
  description,
  canonical,
  noindex,
  og_type = "website",
  jsonLd,
}: {
  title?: string;
  meta_title?: string;
  image?: string;
  description?: string;
  canonical?: string;
  noindex?: boolean;
  og_type?: "website" | "article" | "profile";
  jsonLd?: Record<string, any> | Record<string, any>[];
}) => {
  const { meta_image, meta_author, meta_description } = config.metadata;
  const { base_url, title: siteTitle, logo } = config.site;
  const pathname = usePathname() || "/";

  const cleanBaseUrl = base_url.replace(/\/$/, "");
  const cleanPathname =
    pathname === "/" ? "" : `/${pathname.replace(/^\/+|\/+$/g, "")}`;
  const currentUrl = canonical || `${cleanBaseUrl}${cleanPathname}`;
  const resolvedTitle = plainify(
    meta_title ? meta_title : title ? title : siteTitle,
  ).trim();
  const resolvedDescription = plainify(
    description ? description : meta_description,
  ).trim();
  const resolvedImage = `${cleanBaseUrl}${image ? image : meta_image}`;

  const defaultSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${cleanBaseUrl}/#organization`,
        name: "Sèo Trum",
        url: cleanBaseUrl,
        logo: {
          "@type": "ImageObject",
          url: `${cleanBaseUrl}${logo}`,
        },
        description:
          "Sèo Trum cung cấp dịch vụ tự động hoá (automation), xây dựng phần mềm, web app, bot và tích hợp API theo yêu cầu giúp doanh nghiệp giảm thao tác thủ công và vận hành gọn hơn.",
        sameAs: social.main.map((s) => s.link),
        founder: {
          "@type": "Person",
          "@id": `${cleanBaseUrl}/#founder`,
          name: "Sèo Trum",
          jobTitle: "Software Builder & Automation Studio Founder",
          url: `${cleanBaseUrl}/about`,
        },
        knowsAbout: [
          "Dịch vụ tự động hoá (Automation)",
          "Phần mềm tự động hoá quy trình (Workflow Automation)",
          "Thiết kế Web & App theo yêu cầu",
          "API, Bot & Tích hợp hệ thống",
          "Technical SEO & Kiến trúc thông tin",
        ],
      },
      {
        "@type": "WebSite",
        "@id": `${cleanBaseUrl}/#website`,
        url: cleanBaseUrl,
        name: "Sèo Trum",
        description:
          "Sèo Trum cung cấp dịch vụ tự động hoá (automation), xây dựng phần mềm, web app, bot và tích hợp API theo yêu cầu giúp doanh nghiệp giảm thao tác thủ công và vận hành gọn hơn.",
        inLanguage: "vi-VN",
        publisher: {
          "@id": `${cleanBaseUrl}/#organization`,
        },
      },
    ],
  };

  const extraSchemas = Array.isArray(jsonLd)
    ? jsonLd
    : jsonLd
      ? [jsonLd]
      : [];

  return (
    <>
      {/* title */}
      <title>{resolvedTitle}</title>

      {/* canonical url (without itemProp so React 19 hoists it into <head>) */}
      <link rel="canonical" href={currentUrl} />

      {/* noindex robots */}
      {noindex ? (
        <meta name="robots" content="noindex,nofollow" />
      ) : (
        <meta
          name="robots"
          content="index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1"
        />
      )}

      {/* meta-description */}
      <meta name="description" content={resolvedDescription} />

      {/* author from config.json */}
      <meta name="author" content={meta_author} />

      {/* og-title */}
      <meta property="og:title" content={resolvedTitle} />

      {/* og-description */}
      <meta property="og:description" content={resolvedDescription} />
      <meta property="og:type" content={og_type} />
      <meta property="og:locale" content="vi_VN" />
      <meta property="og:site_name" content="Sèo Trum" />
      <meta property="og:url" content={currentUrl} />

      {/* twitter-title */}
      <meta name="twitter:title" content={resolvedTitle} />

      {/* twitter-description */}
      <meta name="twitter:description" content={resolvedDescription} />

      {/* og-image */}
      <meta property="og:image" content={resolvedImage} />

      {/* twitter-image */}
      <meta name="twitter:image" content={resolvedImage} />
      <meta name="twitter:card" content="summary_large_image" />

      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(defaultSchema) }}
      />
      {extraSchemas.map((schemaItem, idx) => (
        <script
          key={`jsonld-${idx}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaItem) }}
        />
      ))}
    </>
  );
};

export default SeoMeta;
