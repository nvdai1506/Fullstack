import mongoose from "mongoose";

const Schema = mongoose.Schema;

const orderSchema = new Schema(
    {
        email: {
            type: String,
            require: true
        },
        cart: {
            type: Object,
            require: true
        },
        shippingAddress: {
            type: String,
            require: true
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