import { Router } from 'express';
import { AuthRoutes } from '../modules/Auth/auth.route';
import { AboutRoutes } from '../modules/About/about.route';
import { BlogRoutes } from '../modules/Blog/blog.route';
import { ProjectRoutes } from '../modules/Project/project.route';
import { ExperienceRoutes } from '../modules/Experience/experience.route';
import { EducationRoutes } from '../modules/Education/education.route';

const router = Router();

// All the routes in the project
const moduleRoutes = [
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/about',
    route: AboutRoutes,
  },
  {
    path: '/blogs',
    route: BlogRoutes,
  },
  {
    path: '/projects',
    route: ProjectRoutes,
  },
  {
    path: '/experiences',
    route: ExperienceRoutes,
  },
  {
    path: '/educations',
    route: EducationRoutes,
  },
];

// lopping through the routes
moduleRoutes.forEach(route => router.use(route.path, route.route));

export default router;
