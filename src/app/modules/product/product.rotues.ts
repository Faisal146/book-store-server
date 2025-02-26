import express from 'express';
import { ProductControllers } from './product.controller';
import auth from '../../middlewares/auth';

const router = express.Router();

router.post('/', auth('admin'), ProductControllers.createProduct);
router.get('/', ProductControllers.getAllProducts);
router.get('/:productId', ProductControllers.getSingleProduct);
router.put('/:productId', auth('admin'), ProductControllers.updateProduct);
router.delete('/:productId', auth('admin'), ProductControllers.deleteProduct);

// router.get("/api/", (req, res) => {
//   res.send("Hello World!");
// });

export const productRouters = router;
