import { validationResult } from 'express-validator';
import moment from 'moment/moment.js';

import Catalog from '../models/catalog.model.js';
import ChildCatalog from '../models/childCatalog.model.js';
import Product from '../models/product.model.js';
import Order from '../models/order.model.js';
import User from '../models/user.model.js';
import Rate from '../models/rate.model.js';
import Voucher from '../models/voucher.model.js';



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
            if (parent.length === 0) {
                res.status(200).json({ product: [] });
            }
            products = await Product.find({ parentCatalog: parent[0]._id }).populate({ path: 'rate', select: ['total', 'average'] });
            // console.log(products[0]);
        } else {
            const child = await ChildCatalog.find({ value: value });
            if (child.length === 0) {
                res.status(200).json({ product: [] });
            }
            products = await Product.find({ childCatalog: child[0]._id }).populate({ path: 'rate', select: ['total', 'average'] });
        }
        res.status(200).json({ product: products });
    } catch (error) {
        next(errorHandler.defaultErr(error));
    }
}
shop.getProductById = async (req, res, next) => {
    const productId = req.params.productId;
    try {
        const product = await Product.findById(productId).populate({ path: 'rate', select: ['total', 'average'] });
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
        const catalog = await Catalog.find({ value: CatalogValue }).populate({ path: 'featuredProducts' })
            .populate({
                path: 'featuredProducts',
                populate: {
                    path: 'rate',
                    model: 'Rate',
                    select: ['total', 'average'],
                },
            });
        // console.log(catalog);
        res.status(200).json({ products: catalog });
    } catch (error) {
        next(errorHandler.defaultErr(error));
    }
}
// get Rate
shop.getRate = async (req, res, next) => {
    const rateId = req.params.rateId;
    try {
        const rate = await Rate.findById(rateId).populate({ path: 'rate.user', select: 'name' });
        res.status(200).json({ rate: rate });
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

    const { cart, shippingInfo, percent, vnd, total } = req.body;
    const email = shippingInfo.email;

    try {
        const order = new Order({ cart, shippingInfo, percent, vnd, total });
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
shop.updateOrder = async (req, res, next) => {
    const orderId = req.params.orderId;
    const status = req.body.status;
    const shippingStatus = req.body.shippingStatus;
    const secretKey = req.body.secretKey;

    try {
        const order = await Order.findById(orderId);
        if (!order) {
            throw errorHandler.throwErr('Could not find this order!', 422);
        }
        order.status = status;
        order.shippingStatus = shippingStatus;
        if (secretKey.toString() !== process.env.ACCESSTOKEN_SECRET_KEY) {
            await order.save();
            return next(errorHandler.throwErr('Invalid secret key', 203));
        }
        const updatedOrder = await order.save();
        res.status(200).json({ mess: 'Order is updated.', updatedOrder: updatedOrder });
    } catch (error) {
        next(errorHandler.defaultErr(error));
    }
}
// voucher
shop.checkVoucher = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next(errorHandler.throwErr(errors.errors[0].msg, 422));
    }

    const captcha = req.body.captcha;
    console.log(captcha);
    const lowcaseCaptcha = captcha.toLowerCase();

    try {
        const vouchers = await Voucher.find({ captcha: lowcaseCaptcha });
        if (vouchers.length <= 0) {
            throw errorHandler.throwErr('Voucher is not exist!', 204);
        }
        const currentDate = moment().format();
        const fromDate = moment(vouchers[0].fromDate).format();
        const toDate = moment(vouchers[0].toDate).format();
        if (currentDate < fromDate) {
            throw errorHandler.throwErr(`${fromDate}`, 406);
        }
        if (fromDate < currentDate && currentDate < toDate) {
            res.status(200).json({ percent: vouchers[0].percent, vnd: vouchers[0].vnd });
        } else {
            throw errorHandler.throwErr('Voucher is expired!', 410);
        }

    } catch (error) {
        next(errorHandler.defaultErr(error));
    }
}
export default shop;