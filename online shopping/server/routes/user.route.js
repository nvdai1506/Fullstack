import express from 'express';
import { body } from 'express-validator';

import userController from '../controllers/user.controller.js';

const router = express.Router();

// get info user
router.get('/', userController.getUser);

// change password
router.post('/changepw', [
    body('oldPassword')
        .trim()
        .isLength({ min: 6 })
        .withMessage('Password has to be valid.'),
    body('newPassword')
        .trim()
        .isLength({ min: 6 })
        .withMessage('Password has to be valid.')
        .custom((value, { req }) => {
            if (value === req.body.oldPassword) {
                throw new Error('New Password must differ the old.');
            }
            return true;
        })
], userController.changePassword);

// update
router.patch('/', [
    body('newPhone')
        .trim()
        .isLength({ min: 10 })
        .withMessage('Phone number has to be valid.'),
    body('newPoints')
        .isNumeric()
        .withMessage('Points has to be number.')
], userController.editUser);

// cart
// get cart
router.get('/cart', userController.getCart);
// add product to cart
router.post('/cart', userController.addToCart);
// remove product from cart
router.delete('/cart', userController.removeFromCart);

export default router;