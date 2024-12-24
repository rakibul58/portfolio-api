import slugify from 'slugify';
import { IBlogSchema } from './blog.interface';
import { Blog } from './blog.model';

const createBlogInDB = async (blogData: IBlogSchema | Partial<IBlogSchema>) => {
  const { title, content, excerpt, category, tags, coverImage, status } =
    blogData;
  const slug = slugify(title as string, { lower: true });

  const blog = await Blog.create({
    title,
    slug,
    content,
    excerpt,
    category,
    tags,
    coverImage,
    status,
  });

  return blog;
};

const getAllBlogsFromDB = async (query: any) => {
  const { page = 1, limit = 3, category, status } = query;
  const searchQuery: { category?: string; status?: string } = {};

  if (category) searchQuery.category = category;
  if (status) searchQuery.status = status;

  const blogs = await Blog.find(searchQuery)
    .sort({ createdAt: -1 })
    .limit(limit * 1)
    .skip((page - 1) * limit);

  const count = await Blog.countDocuments(searchQuery);

  return {
    blogs,
    totalPages: Math.ceil(count / limit),
    currentPage: page,
  };
};

const getBlogBySlugFromDB = async (slug: string) => {
  const blog = await Blog.findOne({ slug });
  return blog;
};

const updateBlogInDB = async (id: string, blogData: Partial<IBlogSchema>) => {
  const { title, content, excerpt, category, tags, coverImage, status } =
    blogData;
  const updateData = {
    title,
    content,
    excerpt,
    category,
    tags,
    coverImage,
    status,
    slug: title ? slugify(title as string, { lower: true }) : undefined,
  };

  const blog = await Blog.findByIdAndUpdate(id, updateData, {
    new: true,
    runValidators: true,
  });

  return blog;
};

const deleteBlogFromDB = async (id: string) => {
  const blog = await Blog.findByIdAndDelete(id);
  return blog;
};

export const BlogService = {
  createBlogInDB,
  getAllBlogsFromDB,
  getBlogBySlugFromDB,
  updateBlogInDB,
  deleteBlogFromDB,
};
