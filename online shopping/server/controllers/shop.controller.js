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
            .populate({ path: 'ChildCatalogs', model: 'ChildCatalog' });
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


// <<<<<<<<<<<<product>>>>>>>>>>>>>>>
shop.getProducts = async (req, res, next) => {
    try {
        const products = await Product.find().populate({ path: 'childCatalog', select: 'title' }).populate({ path: 'parentCatalog', select: 'name' });
        res.status(200).json({ products: products });
    } catch (error) {
        next(errorHandler.defaultErr(error));
    }
}

shop.getProductByType = async (req, res, next) => {
    const value = req.params.value;
    const level = req.query.level;
    console.log(value, level);
    try {
        let products = [];
        if (Number(level) === 1) {
            const parent = await Catalog.find({ value: value });
            products = await Product.find({ parentCatalog: parent[0]._id })
        } else {
            const child = await ChildCatalog.find({ value: value });

            products = await Product.find({ childCatalog: child[0]._id })
        }
        res.status(200).json({ product: products });
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

// featured product
shop.getFeaturedProducts = async (req, res, next) => {
    const CatalogValue = req.params.CatalogValue;
    try {
        const catalog = await Catalog.find({ value: CatalogValue }).populate({ path: 'featuredProducts' });
        res.status(200).json({ products: catalog });
    } catch (error) {
        next(errorHandler.defaultErr(error));
    }
}

//Order
shop.postOrder = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next(errorHandler.throwErr(errors.errors[0].msg, 422));
    }

    const cart = req.body.cart;
    const shippingInfo = req.body.shippingInfo;
    const email = shippingInfo.email;

    try {
        const order = new Order({ cart: cart, shippingInfo: shippingInfo });
        const result = await order.save();

        const user = await User.find({ email: email });
        if (user.length > 0) {
            result.user = user._id;
            // console.log(user);
            user[0].orders.push(result._id);
            await user[0].save();
            await result.save();
        }
        res.status(200).json({ order: order });

    } catch (error) {
        next(errorHandler.defaultErr(error));
    }
}

export default shop;