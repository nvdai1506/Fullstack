import express from 'express';
import { body } from 'express-validator';

import shopController from '../controllers/shop.controller.js';

const router = express.Router();

router.get('/catalog', shopController.getCatalog);

// childCatalog
router.get('/childCatalog/:catalogId', shopController.getChildCatalog);

// product

router.get('/products', shopController.getProducts);
router.get('/:value', shopController.getProductByType);
router.get('/product/:productId', shopController.getProductById);
router.get('/products/:childCatalogId', shopController.getProductsByChildCatalogId);
// order

router.post('/order', [
    body('email').trim().isEmail().not().isEmpty().withMessage('Email is not valid!')
], shopController.postOrder);

export default router;