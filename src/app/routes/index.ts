import { Router } from 'express';
import { productRouters } from '../modules/product/product.rotues';
import { orderRouter } from '../modules/order/order.routes';
import { authRoutes } from '../modules/auth/auth.route';
import { userRouter } from '../modules/user/user.routes';

const router = Router();

const moduleRoutes = [
  {
    path: '/products',
    route: productRouters,
  },
  {
    path: '/orders',
    route: orderRouter,
  },
  {
    path: '/users',
    route: userRouter,
  },
  {
    path: '/auth',
    route: authRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
