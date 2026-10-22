import config from "@/config/config.json";
import { getSinglePage } from "@/lib/contentParser";
import { CASE_STUDY_CATALOG, SERVICE_CATALOG } from "@/lib/seoTrumCatalog";
import { getTaxonomy } from "@/lib/taxonomyParser";
import { Post } from "@/types";
import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = config.site.base_url.replace(/\/$/, "");
  const blogFolder = config.settings.blog_folder;
  const posts: Post[] = getSinglePage(blogFolder);
  const categories = getTaxonomy(blogFolder, "categories");
  const tags = getTaxonomy(blogFolder, "tags");

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${baseUrl}/automation-studio`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/services`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.95,
    },
    {
      url: `${baseUrl}/case-studies`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.85,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.85,
    },
    {
      url: `${baseUrl}/categories`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/tags`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.65,
    },
    {
      url: `${baseUrl}/authors/seo-trum`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.75,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/privacy-policy`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.5,
    },
  ];

  const serviceDetailRoutes: MetadataRoute.Sitemap = SERVICE_CATALOG.map(
    (svc) => ({
      url: `${baseUrl}/services/${svc.slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    }),
  );

  const caseStudyDetailRoutes: MetadataRoute.Sitemap = CASE_STUDY_CATALOG.map(
    (cs) => ({
      url: `${baseUrl}/case-studies/${cs.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    }),
  );

  const postRoutes: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: post.frontmatter.date
      ? new Date(post.frontmatter.date)
      : new Date(),
    changeFrequency: "monthly",
    priority: 0.75,
  }));

  const categoryRoutes: MetadataRoute.Sitemap = categories.map((cat) => ({
    url: `${baseUrl}/categories/${cat}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  const tagRoutes: MetadataRoute.Sitemap = tags.map((tag) => ({
    url: `${baseUrl}/tags/${tag}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.65,
  }));

  return [
    ...staticRoutes,
    ...serviceDetailRoutes,
    ...caseStudyDetailRoutes,
    ...postRoutes,
    ...categoryRoutes,
    ...tagRoutes,
  ];
}
