import express, { NextFunction, Request, Response } from 'express';
import { ProductControllers } from './product.controller';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { ProductValidationSchemas } from './poduct.validation';
import { upload } from '../../utils/sendImageToCloudinary';

const router = express.Router();

router.post(
  '/',
  auth('admin'),
  upload.single('file'),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data);
    next();
  },

  validateRequest(ProductValidationSchemas.CreateProductValidationSchema),
  ProductControllers.createProduct,
);
router.get('/', ProductControllers.getAllProducts);
router.get('/:productId', ProductControllers.getSingleProduct);
router.put(
  '/:productId',
  auth('admin'),
  validateRequest(ProductValidationSchemas.UpdateProductValidationSchema),
  ProductControllers.updateProduct,
);
router.delete('/:productId', auth('admin'), ProductControllers.deleteProduct);

// router.get("/api/", (req, res) => {
//   res.send("Hello World!");
// });

export const productRouters = router;
