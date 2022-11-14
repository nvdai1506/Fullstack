import express from 'express';

import shopController from '../controllers/shop.controller.js';

const router = express.Router();

router.get('/catalog', shopController.getCatalog);

// childCatalog
router.get('/childCatalog/:catalogId', shopController.getChildCatalog);

// product

router.get('/products', shopController.getProducts);
router.get('/product/:productId', shopController.getProductById);
router.get('/products/:childCatalogId', shopController.getProductsByChildCatalogId);

export default router;