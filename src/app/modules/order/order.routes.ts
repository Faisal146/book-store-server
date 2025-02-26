import express from 'express';
import { orderController } from './order.controller';
import validateRequest from '../../middlewares/validateRequest';
import orderValidationSchema from './order.validation';
import auth from '../../middlewares/auth';

const router = express.Router();

router.post(
  '/',
  auth('admin', 'user'),
  validateRequest(orderValidationSchema),
  orderController.newOrder,
);
router.get('/', orderController.getAllOrders);
router.get('/my-orders', auth('user', 'admin'), orderController.getUserOrders);
router.delete('/:id', auth('user', 'admin'), orderController.deleteOrder);
router.get('/revenue', auth('admin'), orderController.totalRevenue);

export const orderRouter = router;
