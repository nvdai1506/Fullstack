import mongoose from "mongoose";

const Schema = mongoose.Schema;

const orderSchema = new Schema(
    {
        shippingInfo: {
            name: {
                type: String,
                required: true
            },
            phone: {
                type: String,
                required: true
            },
            email: {
                type: String,
                required: true
            },
            address: {
                type: String,
                required: true
            },
            note: {
                type: String
            },
        },
        cart: {
            items: [],
            totalPrice: {
                type: Number,
                require: true
            },
            totalAmount: {
                type: Number,
                require: true
            },
        },
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
        status: {
            type: Number, //0: ordering  1:ordered
            default: 0
        }
    },
    { timestamps: true }
);

const model = mongoose.model('Order', orderSchema);

export default model;