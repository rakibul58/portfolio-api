import slugify from 'slugify';
import { IBlogSchema } from './blog.interface';
import { Blog } from './blog.model';
import QueryBuilder from '../../builder/QueryBuilder';

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
  const BlogQuery = new QueryBuilder(Blog.find(), query)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await BlogQuery.modelQuery;
  const meta = await BlogQuery.countTotal();

  return {
    blogs: result,
    totalPages: meta.totalPage,
    currentPage: meta.page,
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
