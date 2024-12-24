import { Router } from 'express';
import { AboutController } from './about.controller';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../User/user.constant';

const router = Router();

router
  .route('/')
  .get(AboutController.getAboutData)
  .put(auth(USER_ROLE.admin), AboutController.updateAboutData);

router
  .route('/section/:section')
  .put(auth(USER_ROLE.admin), AboutController.updateSection);

router
  .route('/skills/:category')
  .put(auth(USER_ROLE.admin), AboutController.updateSkill);

export const AboutRoutes = router;
