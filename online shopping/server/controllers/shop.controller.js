import { validationResult } from 'express-validator';

import Catalog from '../models/catalog.model.js';
import ChildCatalog from '../models/childCatalog.model.js';
import Product from '../models/product.model.js';
import Order from '../models/order.model.js';
import User from '../models/user.model.js';


import errorHandler from '../utils/errorHandler.js';

let shop = () => { }

// Catalog
shop.getCatalog = async (req, res, next) => {
    try {
        
        const catalogs = await Catalog.find()
        .populate({path:'ChildCatalogs',model:'ChildCatalog'});
        res.status(200).json({ catalogs: catalogs });
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
}
// child
shop.getChildCatalog = async (req, res, next) => {
    const parentId = req.params.catalogId;
    try {
        const ChildCatalogs = await ChildCatalog.find({ parent: parentId });
        res.status(200).json({ ChildCatalogs: ChildCatalogs });
    } catch (error) {
        next(errorHandler.defaultErr(error));
    }
}

// product

shop.getProducts = async (req, res, next) => {
    try {
        const products = await Product.find();
        res.status(200).json({ products: products });
    } catch (error) {
        next(errorHandler.defaultErr(error));
    }
}
shop.getProductById = async (req, res, next) => {
    const productId = req.params.productId;
    try {
        const product = await Product.findById(productId);
        if (!product) {
            throw errorHandler.throwErr('Could not find product!', 422);
        }
        res.status(200).json({ product: product });
    } catch (error) {
        next(errorHandler.defaultErr(error));
    }
}
shop.getProductsByChildCatalogId = async (req, res, next) => {
    const childCatalogId = req.params.childCatalogId;
    try {
        const childCatalog = await ChildCatalog.findById(childCatalogId).populate('products');
        const products = childCatalog.products;
        res.status(200).json({ products: products });
    } catch (error) {
        next(errorHandler.defaultErr(error));
    }
}



export default shop;