export interface IBlogSchema {
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  coverImage: {
    url: string;
  };
  category: string;
  tags: string[];
  status: 'draft' | 'published';
}
