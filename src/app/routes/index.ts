import { Router } from 'express';
import { AuthRoutes } from '../modules/Auth/auth.route';
import { AboutRoutes } from '../modules/About/about.route';

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
];

// lopping through the routes
moduleRoutes.forEach(route => router.use(route.path, route.route));

export default router;
