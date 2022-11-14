import { validationResult } from 'express-validator';
import bcrypt from "bcryptjs";

import User from '../models/user.model.js';
import Product from '../models/product.model.js';


import errorHandler from '../utils/errorHandler.js';

let user = () => { };

user.getUser = async (req, res, next) => {
    // const userId = req.params.userId;
    const userId = req.accessTokenPayload.userId;
    try {
        const user = await User.findById(userId);
        if (!user) {
            throw errorHandler.throwErr('Could not find user!', 422);
        }

        res.status(200).json({ user: user });
    } catch (error) {
        next(errorHandler.defaultErr(error));
    }
};
user.changePassword = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next(errorHandler.throwErr(errors.errors[0].msg, 422));
    }

    // const userId = req.params.userId;
    const userId = req.accessTokenPayload.userId;
    const oldPassword = req.body.oldPassword;
    const newPassword = req.body.newPassword;

    try {
        const user = await User.findById(userId);
        if (!user) {
            throw errorHandler.throwErr('Could not find user!', 401);
        }
        const equal = await bcrypt.compare(oldPassword, user.password);
        if (!equal) {
            throw errorHandler.throwErr('Old password is not correct!', 401);
        }
        const newPasswordHash = await bcrypt.hash(newPassword, 12);
        user.password = newPasswordHash;
        await user.save();

        res.json({ mess: "Password is updated." });

    } catch (error) {
        next(errorHandler.defaultErr(error));
    }

};
user.editUser = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next(errorHandler.throwErr(errors.errors[0].msg, 422));
    }
    // const userId = req.params.userId;
    const userId = req.accessTokenPayload.userId;

    const { newPhone, newPoints } = req.body;

    try {
        const user = await User.findById(userId);
        if (!user) {
            throw errorHandler.throwErr('Could not find user!', 401);
        }
        user.phone = newPhone;
        user.points += Number(newPoints);
        const result = await user.save();

        res.json({ user: result });

    } catch (error) {
        next(errorHandler.defaultErr(error));
    }
};

user.getCart = async (req, res, next) => {
    const userId = req.accessTokenPayload.userId;
    try {
        const user = await User.findById(userId).populate('cart.items.product');
        if (!user) {
            throw errorHandler.throwErr('Could not find user!', 401);
        }
        res.json({ cart: user.cart });
    } catch (error) {
        next(errorHandler.defaultErr(error));
    }
};
user.addToCart = async (req, res, next) => {
    const userId = req.accessTokenPayload.userId;
    const productId = req.body.productId;
    try {
        const user = await User.findById(userId);
        if (!user) {
            throw errorHandler.throwErr('Could not find user!', 401);
        }
        const product = await Product.findById(productId);
        if (!product) {
            throw errorHandler.throwErr('Could not find product!', 401);
        }
        await user.addToCart(product);
        const loadUser = await User.findById(userId).populate('cart.items.product');
        const newCart = loadUser.cart;
        res.status(200).json({mess:"Product is added to cart.", cart: newCart});
    } catch (error) {
        next(errorHandler.defaultErr(error));
    }

};
user.removeFromCart = async (req, res, next) => { 
    const userId = req.accessTokenPayload.userId;
    const productId = req.body.productId;
    try {
        const user = await User.findById(userId);
        if (!user) {
            throw errorHandler.throwErr('Could not find user!', 401);
        }
        const product = await Product.findById(productId);
        if (!product) {
            throw errorHandler.throwErr('Could not find product!', 401);
        }
        await user.removeFromCart(product);
        
        res.status(200).json({mess:"Product is removed."});
    } catch (error) {
        next(errorHandler.defaultErr(error));
    }
};
export default user;