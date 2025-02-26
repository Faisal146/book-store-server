import { Router } from 'express';
import { userValidations } from '../user/user.validation';
import { authControllers } from './auth.controller';
import validateRequest from '../../middlewares/validateRequest';

const router = Router();

router.post(
  '/register',
  validateRequest(userValidations.createUserValidationSchema),
  authControllers.createUser,
);

router.post('/login', authControllers.loginUser);
router.patch('/:id/block', authControllers.blockUser);
router.patch('/:id/unblock', authControllers.unblockUser);

export const authRoutes = router;
