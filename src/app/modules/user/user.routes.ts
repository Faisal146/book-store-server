import { Router } from 'express';
import { userControllers } from './user.controller';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { userValidations } from './user.validation';

const router = Router();

router.get('/', auth('admin'), userControllers.getAllUser);
router.get('/:id', auth('admin', 'user'), userControllers.getSingleUser);
router.get(
  '/email/:id',
  auth('admin', 'user'),
  userControllers.getSingleUserWithEmail,
);
router.patch(
  '/:id',
  auth('admin', 'user'),
  validateRequest(userValidations.UpdateUserValidationSchema),
  userControllers.updateUser,
);
router.post('/cart', auth('admin', 'user'), userControllers.addToCart);
router.post(
  '/cart/delete',
  auth('admin', 'user'),
  userControllers.removeItemFromCart,
);

export const userRouter = router;
