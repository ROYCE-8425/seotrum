import { getSinglePage } from "@/lib/contentParser";
import { humanize, slugify } from "@/lib/utils/textConverter";

// get all taxonomies from frontmatter
export const getTaxonomy = (folder: string, name: string): Array<string> => {
  const singlePages = getSinglePage(folder);
  const taxonomyPages = singlePages.map((page) => page.frontmatter[name]);
  const taxonomies = [];
  for (let i = 0; i < taxonomyPages?.length; i++) {
    const taxonomyArray = taxonomyPages[i];
    for (let j = 0; j < taxonomyArray?.length; j++) {
      taxonomies.push(slugify(taxonomyArray[j]));
    }
  }
  const taxonomy = [...new Set(taxonomies)];

  return taxonomy;
};

export const getAllTaxonomy = (folder: string, name: string) => {
  const singlePages = getSinglePage(folder);
  const taxonomyPages = singlePages.map((page) => page.frontmatter[name]);
  const taxonomies = [];
  for (let i = 0; i < taxonomyPages?.length; i++) {
    const taxonomyArray = taxonomyPages[i];
    for (let j = 0; j < taxonomyArray?.length; j++) {
      taxonomies.push(slugify(taxonomyArray[j]));
    }
  }

  return taxonomies;
};

// Resolve ASCII slug back to original Vietnamese display label
export const getTaxonomyLabel = (
  folder: string,
  name: string,
  targetSlug: string,
): string => {
  const singlePages = getSinglePage(folder);
  for (const page of singlePages) {
    const list: string[] | undefined = page.frontmatter[name];
    if (Array.isArray(list)) {
      for (const item of list) {
        if (slugify(item) === targetSlug) {
          return item;
        }
      }
    }
  }
  return humanize(targetSlug);
};
