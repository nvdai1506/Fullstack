import { validationResult } from 'express-validator';
import bcrypt from 'bcryptjs';
import moment from 'moment';

import clearImage from '../utils/clearImage.js';

import Catalog from '../models/catalog.model.js';
import ChildCatalog from '../models/childCatalog.model.js';
import Product from '../models/product.model.js';
import Order from '../models/order.model.js';
import User from '../models/user.model.js';


import errorHandler from '../utils/errorHandler.js';


let admin = () => { }

// management account
admin.getManagementrAccounts = async (req, res, next) => {
    if (req.accessTokenPayload.role === 0 || req.accessTokenPayload.role === 2) {
        return next(errorHandler.throwErr('Do not have permission!', 401));
    }
    try {
        const users = await User.find({ role: 2 });

        res.status(200).json({ users: users });
    } catch (error) {
        next(errorHandler.defaultErr(error));
    }
}
admin.addManagementAccount = async (req, res, next) => {
    const email = req.body.email;
    if (req.accessTokenPayload.role === 0 || req.accessTokenPayload.role === 2) {
        return next(errorHandler.throwErr('Do not have permission!', 401));
    }
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next(errorHandler.throwErr(errors.errors[0].msg, 422));
    }
    try {
        const isUserExist = await User.findOne({ email: email });
        if (isUserExist) {
            throw errorHandler.throwErr('User is existed.', 422);
        }
        const password = await bcrypt.hash(req.body.password, 12);
        const user = new User({
            email: req.body.email,
            password: password,
            role: 2
        })

        const result = await user.save();

        res.status(201).json({ mess: 'Account is signed up.', id: result._id, email: result.email });
    } catch (error) {
        next(errorHandler.defaultErr(error));
    }
}

admin.deleteManagementAccount = async (req, res, next) => {
    if (req.accessTokenPayload.role === 0 || req.accessTokenPayload.role === 2) {
        return next(errorHandler.throwErr('Do not have permission!', 401));
    }
    const userId = req.params.userId;
    try {
        const result = await User.findByIdAndDelete(userId);

        res.status(200).json({ result: result });

    } catch (error) {
        next(errorHandler.defaultErr(error));
    }
}
// Catalog
admin.addCatalog = async (req, res, next) => {
    if (req.accessTokenPayload.role === 0) {
        return next(errorHandler.throwErr('Do not have permission!', 401));
    }
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next(errorHandler.throwErr(errors.errors[0].msg, 422));
    }
    const name = req.body.name;

    const catalog = new Catalog({
        name: name
    })
    try {
        const result = await catalog.save();
        res.status(201).json({ mess: "Catalog is added.", id: result._id });
    } catch (error) {
        next(errorHandler.defaultErr(error));
    }
}

admin.updateCatalog = async (req, res, next) => {
    if (req.accessTokenPayload.role === 0) {
        return next(errorHandler.throwErr('Do not have permission!', 401));
    }
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next(errorHandler.throwErr(errors.errors[0].msg, 422));
    }

    const id = req.params.id;
    const newName = req.body.name;
    // console.log(id, newName);
    try {
        const catalog = await Catalog.findById(id);
        if (!catalog) {
            throw next(errorHandler('Could not find Catalog', 422));
        }
        catalog.name = newName;
        await catalog.save();

        res.status(200).json({ mess: "Catalog is updated." });
    } catch (error) {
        next(errorHandler.defaultErr(error));
    }


}

admin.deleteCatalog = async (req, res, next) => {
    if (req.accessTokenPayload.role === 0) {
        return next(errorHandler.throwErr('Do not have permission!', 401));
    }
    const id = req.params.id;
    try {
        const result = await Catalog.findByIdAndDelete(id);
        if (!result) {
            throw next(errorHandler.throwErr('Id is in correct.', 422));
        }
        res.status(200).json({ mess: "Catalog is deleted!", _id: id });
    } catch (error) {
        next(errorHandler.defaultErr(error));
    }


}

// childCatalog


admin.addChildCatalog = async (req, res, next) => {
    if (req.accessTokenPayload.role === 0) {
        return next(errorHandler.throwErr('Do not have permission!', 401));
    }
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next(errorHandler.throwErr(errors.errors[0].msg, 422));
    }
    const parentId = req.body.parent;
    const title = req.body.title;



    try {
        const child = await ChildCatalog.findOne({ title: title });
        if (child !== null) {
            if (child.parent.toString() === parentId.toString()) {
                throw errorHandler.throwErr('Child already exist.');
            } else {
                child.parent = parentId;
                const result = await child.save();
                const catalog = await Catalog.findById(parentId);
                if (!catalog) {
                    throw errorHandler.throwErr('Could not find parent Catalog!', 422);
                }
                catalog.ChildCatalogs.push(result._id);
                await catalog.save();
                return res.status(201).json({ mess: "ChildCatalog is added.", id: result._id });
            }
        }
        const childCatalog = new ChildCatalog({
            parent: parentId,
            title: title
        });
        const result = await childCatalog.save();
        const catalog = await Catalog.findById(parentId);

        if (!catalog) {
            throw errorHandler.throwErr('Could not find parent Catalog!', 422);
        }
        catalog.ChildCatalogs.push(result._id);
        await catalog.save();
        res.status(201).json({ mess: "ChildCatalog is added.", id: result._id });
    } catch (error) {
        next(errorHandler.defaultErr(error));
    }
}

admin.updateChildCatalog = async (req, res, next) => {
    if (req.accessTokenPayload.role === 0) {
        return next(errorHandler.throwErr('Do not have permission!', 401));
    }
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next(errorHandler.throwErr(errors.errors[0].msg, 422));
    }
    const childId = req.params.childId;
    const parentId = req.body.parent;
    const newTitle = req.body.title;
    try {
        const catalog = await Catalog.findById(parentId);
        if (!catalog) {
            throw errorHandler.throwErr('Could not find parent catalog!', 422);
        }


        const child = await ChildCatalog.findById(childId);
        if (!child) {
            throw errorHandler.throwErr('Could not find child catalog!', 422);
        }
        const oldParentId = child.parent;
        if (parentId.toString() !== oldParentId.toString()) {
            catalog.ChildCatalogs.push(childId);
            await catalog.save();
            const oldParent = await Catalog.findById(oldParentId);
            if (oldParent) {
                oldParent.ChildCatalogs.pull(childId);
                await oldParent.save();
            }
        }
        child.parent = parentId;
        child.title = newTitle;
        await child.save();
        res.status(200).json({ mess: "Data is updated.", id: child._id });
    } catch (error) {
        next(errorHandler.defaultErr(error));
    }
}

admin.deleteChildCatalog = async (req, res, next) => {
    if (req.accessTokenPayload.role === 0) {
        return next(errorHandler.throwErr('Do not have permission!', 401));
    }
    const childId = req.params.childId;
    try {
        const child = await ChildCatalog.findById(childId);
        if (!child) {
            throw errorHandler.throwErr('Could not find child catalog!', 422);
        }
        const parent = await Catalog.findById(child.parent);
        if (parent) {
            parent.ChildCatalogs.pull(childId);
            await parent.save();
        }
        await ChildCatalog.findByIdAndDelete(childId);
        res.status(200).json({ mess: `${childId} is deleted.` })
    } catch (error) {
        next(errorHandler.defaultErr(error));
    }
}
// product

admin.addProduct = async (req, res, next) => {
    if (req.accessTokenPayload.role === 0) {
        return next(errorHandler.throwErr('Do not have permission!', 401));
    }
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next(errorHandler.throwErr(errors.errors[0].msg, 422));
    }
    if (!req.file) {
        return next(errorHandler.throwErr('No image provided!', 401));
    }
    const imageUrl = req.file.path.replace("\\", "/");
    // console.log(imageUrl);
    const childCatalogId = req.body.childCatalog;
    try {
        const childCatalog = await ChildCatalog.findById(childCatalogId);
        if (!childCatalog) {
            throw errorHandler.throwErr('Could not find child Catalog!', 422);
        }
        const product = new Product({
            title: req.body.title,
            description: req.body.description,
            imageUrl: imageUrl,
            material: req.body.material,
            size: req.body.size,
            price: req.body.price,
            childCatalog: req.body.childCatalog,
            parentCatalog: req.body.parentCatalog
        });
        const productResult = await product.save();
        childCatalog.products.push(product._id);
        await childCatalog.save();
        res.status(200).json({ mess: "Product is added.", id: productResult._id });
    } catch (error) {
        next(errorHandler.defaultErr(error));
    }
}
admin.updateProduct = async (req, res, next) => {
    if (req.accessTokenPayload.role === 0) {
        return next(errorHandler.throwErr('Do not have permission!', 401));
    }
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next(errorHandler.throwErr(errors.errors[0].msg, 422));
    }
    const productId = req.params.productId;
    try {
        const product = await Product.findById(productId);
        if (!product) {
            throw errorHandler.throwErr('Could not find product!', 422);
        }
        let imageUrl;
        if (req.file) {
            imageUrl = req.file.path.replace("\\", "/");
            clearImage(product.imageUrl);
        } else {
            imageUrl = product.imageUrl;
        }


        const newTitle = req.body.title;
        const newDescription = req.body.description;
        const newMaterial = req.body.material;
        const newSize = req.body.size;
        const newPrice = req.body.price;
        const newChildCatalog = req.body.childCatalog
        const newParentCatalog = req.body.parentCatalog
        const childCatalog = await ChildCatalog.findById(newChildCatalog);
        if (!childCatalog) {
            throw errorHandler.throwErr('Could not child Catalog!', 422);
        }
        product.title = newTitle;
        product.description = newDescription;
        product.imageUrl = imageUrl;
        product.material = newMaterial;
        product.size = newSize;
        product.price = newPrice;
        product.childCatalog = newChildCatalog;
        product.parentCatalog = newParentCatalog;

        const result = await product.save();

        res.status(200).json({ mess: "Product is updated.", id: result._id });
    } catch (error) {
        next(errorHandler.defaultErr(error));
    }
}
admin.deleteProduct = async (req, res, next) => {
    if (req.accessTokenPayload.role === 0) {
        return next(errorHandler.throwErr('Do not have permission!', 401));
    }
    const productId = req.params.productId;
    try {
        const product = await Product.findById(productId);
        clearImage(product.imageUrl);
        if (!product) {
            throw errorHandler.throwErr('Could not find product!', 422);
        }
        const childCatalogId = product.childCatalog;
        const childCatalog = await ChildCatalog.findById(childCatalogId);
        if (childCatalog) {
            childCatalog.products.pull(product._id);
            await childCatalog.save();
        }
        const result = await Product.findByIdAndDelete(productId);

        res.status(200).json({ mess: `${result._id} is deleted!` });
    } catch (error) {
        next(errorHandler.defaultErr(error));
    }
}

// order

admin.getOrderByUser = async (req, res, next) => {
    const userId = req.accessTokenPayload.userId;
    if (!userId) {
        return next(errorHandler.throwErr('Can not find User!', 401));
    }
    try {
        const user = await User.findById(userId).populate('orders');
        if (!user) {
            throw errorHandler.throwErr('Can not find User!', 401);
        }
        res.status(200).json({ orders: user.orders });
    } catch (error) {
        next(errorHandler.defaultErr(error));
    }
}

admin.getOrderByStatus = async (req, res, next) => {
    // console.log(req.params.status);

    if (req.accessTokenPayload.role === 0) {
        // console.log(req.accessTokenPayload.role);
        return next(errorHandler.throwErr('Do not have permission!', 401));
    }
    const status = req.params.status; // 0 1 

    try {
        const orders = await Order.find({ status: status });
        
        res.status(200).json({ orders: orders });
    } catch (error) {
        next(errorHandler.defaultErr(error));
    }
}
admin.updateOrderStatus = async (req, res, next) => {
    if (req.accessTokenPayload.role === 0) {
        return next(errorHandler.throwErr('Do not have permission!', 401));
    }
    const orderId = req.params.orderId;
    const status = req.body.status;
    try {
        const order = await Order.findById(orderId);
        if (!order) {
            throw errorHandler.throwErr('Could not find this order!', 422);
        }
        order.status = status;
        const today = moment().format('L');
        if (status === 1)//completed
        {
            for (const item of order.cart.items) {
                const productId = item.product;
                const quantity = Number(item.quantity);
                const product = await Product.findById(productId);

                const childCatalogId = product.childCatalog;
                const parentCatalogId = product.parentCatalog;

                const childCatalog = await ChildCatalog.findById(childCatalogId);
                if (childCatalog.salesFigures.length === 0) {
                    childCatalog.salesFigures.push({
                        numProducts: quantity,
                        turnovers: product.price * quantity,
                        date: moment().format()
                    })
                }else{
                    const lastSalesFigures = childCatalog.salesFigures.slice(-1);
                    const lastDay = moment(lastSalesFigures[0].date).format('L');
                    const index = childCatalog.salesFigures.length - 1;
                    if(lastDay === today){
                        childCatalog.salesFigures[index].numProducts+=quantity;
                        childCatalog.salesFigures[index].turnovers+=product.price * quantity;
                    }else{
                        childCatalog.salesFigures.push({
                            numProducts: quantity,
                            turnovers: product.price * quantity,
                            date: moment().format()
                        })
                    }
                }
                await childCatalog.save();

                const parentCatalog = await Catalog.findById(parentCatalogId);
                if (parentCatalog.salesFigures.length === 0) {
                    parentCatalog.salesFigures.push({
                        numProducts: quantity,
                        turnovers: product.price * quantity,
                        date: moment().format()
                    })
                }else{
                    const lastSalesFigures = parentCatalog.salesFigures.slice(-1);
                    const lastDay = moment(lastSalesFigures[0].date).format('L');
                    const index = parentCatalog.salesFigures.length - 1;
                    if(lastDay === today){
                        parentCatalog.salesFigures[index].numProducts+=quantity;
                        parentCatalog.salesFigures[index].turnovers+=product.price * quantity;
                    }else{
                        parentCatalog.salesFigures.push({
                            numProducts: quantity,
                            turnovers: product.price * quantity,
                            date: moment().format()
                        })
                    }
                }
                await parentCatalog.save();
            }
        }
        const updatedOrder = await order.save();
        res.status(200).json({ mess: 'Order is updated.', updatedOrder: updatedOrder });
    } catch (error) {
        next(errorHandler.defaultErr(error));
    }
}

// Overview
admin.getOverview = async (req, res, next) => {
    let overview = [];
    if (req.accessTokenPayload.role === 0) {
        return next(errorHandler.throwErr('Do not have permission!', 401));
    }
    try {
        const catalogs = await Catalog.find();
        for (const catalog of catalogs) {
            let turnovers = 0;
            for(const f of catalog.salesFigures){
                turnovers+=f.turnovers;
            }

            overview.push({
                catalog: catalog.name,
                turnovers: turnovers
            })
        }
        res.status(200).json({ overview: overview });

    } catch (error) {

    }
}
export default admin;