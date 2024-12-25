import { Router } from 'express';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../User/user.constant';
import { EducationController } from './education.controller';

const router = Router();

router
  .route('/')
  .get(EducationController.getAllEducation)
  .post(auth(USER_ROLE.admin), EducationController.createEducation);

router
  .route('/:id')
  .get(EducationController.getEducationById)
  .put(auth(USER_ROLE.admin), EducationController.updateEducation)
  .delete(auth(USER_ROLE.admin), EducationController.deleteEducation);

export const EducationRoutes = router;
