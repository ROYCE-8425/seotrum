export type RegularPage = {
  frontmatter: {
    title: string;
    image?: string;
    description?: string;
    meta_title?: string;
    layout?: string;
    draft?: boolean;
    [key: string]: any;
  };
  content: string;
  slug?: string;
};

export type Post = {
  frontmatter: {
    title: string;
    meta_title?: string;
    description?: string;
    image?: string;
    categories: string[];
    author: string;
    tags: string[];
    date?: string;
    draft?: boolean;
  };
  slug?: string;
  content?: string;
};

export type Author = {
  frontmatter: {
    title: string;
    image?: string;
    description?: string;
    meta_title?: string;
    social: {
      name: string;
      icon: string;
      link: string;
    }[];
  };
  content?: string;
  slug?: string;
};

export type Feature = {
  button: Button;
  image: string;
  bulletpoints: string[];
  content: string;
  title: string;
  badge?: string;
};

export type StatItem = {
  value: string;
  label: string;
  sublabel?: string;
};

export type WorkflowStep = {
  step: string;
  title: string;
  description: string;
  deliverable: string;
};

export type ServiceOffering = {
  id: string;
  badge: string;
  title: string;
  subtitle: string;
  description: string;
  deliverables: string[];
  tech_stack: string[];
  ideal_for: string;
  cta_label: string;
  cta_link: string;
};

export type CaseStudyItem = {
  id: string;
  category: string;
  title: string;
  client: string;
  challenge: string;
  solution: string;
  tech_stack: string[];
  metrics: {
    value: string;
    label: string;
  }[];
};

export type Testimonial = {
  name: string;
  designation: string;
  avatar: string;
  content: string;
};

export type Call_to_action = {
  enable?: boolean;
  title: string;
  description: string;
  image: string;
  button: Button;
};

export type Button = {
  enable: boolean;
  label: string;
  link: string;
};
