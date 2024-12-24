import { Router } from 'express';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../User/user.constant';
import { BlogController } from './blog.controller';

const router = Router();

router
  .route('/')
  .get(BlogController.getAllBlogs)
  .post(auth(USER_ROLE.admin), BlogController.createBlog);

router
  .route('/:slug')
  .get(BlogController.getBlogBySlug)
  .put(auth(USER_ROLE.admin), BlogController.updateBlog)
  .delete(auth(USER_ROLE.admin), BlogController.deleteBlog);

export const BlogRoutes = router;
