import { Router } from 'express';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../User/user.constant';
import { ExperienceController } from './experience.controller';

const router = Router();

router
  .route('/')
  .get(ExperienceController.getAllExperience)
  .post(auth(USER_ROLE.admin), ExperienceController.createExperience);

router
  .route('/:id')
  .get(ExperienceController.getExperienceById)
  .put(auth(USER_ROLE.admin), ExperienceController.updateExperience)
  .delete(auth(USER_ROLE.admin), ExperienceController.deleteExperience);

export const ExperienceRoutes = router;
