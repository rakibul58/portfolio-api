import { Router } from 'express';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../User/user.constant';
import { ProjectController } from './project.controller';

const router = Router();

router
  .route('/')
  .get(ProjectController.getAllProjects)
  .post(auth(USER_ROLE.admin), ProjectController.createProject);

router
  .route('/:slug')
  .get(ProjectController.getProjectBySlug)
  .put(auth(USER_ROLE.admin), ProjectController.updateProject)
  .delete(auth(USER_ROLE.admin), ProjectController.deleteProject);

export const ProjectRoutes = router;
