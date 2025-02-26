import { Router } from 'express';
import { userControllers } from './user.controller';
import auth from '../../middlewares/auth';

const router = Router();

router.get('/', auth('admin'), userControllers.getAllUser);
router.get('/:id', auth('admin', 'user'), userControllers.getSingleUser);
router.patch('/:id', auth('admin', 'user'), userControllers.updateUser);

export const userRouter = router;
