import { NextFunction, Request, Response, Router } from 'express';
import { userValidations } from '../user/user.validation';
import { authControllers } from './auth.controller';
import validateRequest from '../../middlewares/validateRequest';
import { upload } from '../../utils/sendImageToCloudinary';

const router = Router();

router.post(
  '/register',
  upload.single('file'),

  (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data);
    next();
  },
  validateRequest(userValidations.createUserValidationSchema),
  authControllers.createUser,
);

router.post('/login', authControllers.loginUser);
router.patch('/:id/block', authControllers.blockUser);
router.patch('/:id/unblock', authControllers.unblockUser);

export const authRoutes = router;
