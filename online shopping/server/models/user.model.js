import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userSchema = new Schema({
    phone: {
        type: String,
        default: ''
    },
    email: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    rfToken: {
        type: String,
        default: ''
    },
    points: {
        type: Number,
        default: 0
    },
    role: {
        type: Number,
        default: 0
    },
    cart: {
        items: [
            {
                product: {
                    type: Schema.Types.ObjectId,
                    ref: 'Product',
                    required: true
                },
                quantity: {
                    type: Number,
                    required: true
                }
            }
        ],
        subTotal: {
            type: Number,
            default: 0
        }
    },
    orders:[{
        type: Schema.Types.ObjectId,
        ref:'Order',
        default:[]
    }]
});

userSchema.methods.addToCart = async function (product) {
    const indexOfProduct = this.cart.items.findIndex(item => {
        return item.product.toString() === product._id.toString();
    })
    const updatedCart = this.cart;
    let newQuantity = 1;
    if (indexOfProduct >= 0) {
        newQuantity = this.cart.items[indexOfProduct].quantity + 1;
        updatedCart.items[indexOfProduct].quantity = newQuantity;
        updatedCart.subTotal += product.price;
    } else {
        const item = {
            product: product._id,
            quantity: newQuantity
        }
        updatedCart.items.push(item);
        updatedCart.subTotal += product.price;
    }
    this.cart = updatedCart;
    return this.save();
}

userSchema.methods.removeFromCart = function (product) {
    const indexOfProduct = this.cart.items.findIndex(item => {
        return item.product.toString() === product._id.toString();
    })
    let updatedCart = this.cart;
    let quantity = updatedCart.items[indexOfProduct].quantity;
    if (quantity > 1) {
        updatedCart.items[indexOfProduct].quantity = quantity - 1;
    } else {
        updatedCart.items = updatedCart.items.filter(item => {
            return item.product.toString() !== product._id.toString();
        });
    }
    updatedCart.subTotal -= product.price;
    this.cart = updatedCart;
    return this.save();
};

userSchema.methods.clearCart = function () {
    this.cart.items = [];
    return this.save();
};

const model = mongoose.model('User', userSchema);

export default model;