import mongoose from "mongoose";

const Schema = mongoose.Schema;

const orderSchema = new Schema({
    email:{
        type:String,
        require:true
    },
    cart:{
        type:Object,
        require:true
    },
    user:{
        type: Schema.Types.ObjectId,
        ref:'User'
    },
    status:{
        type:Number, //0: ordering  1:ordered
        default:0
    }
    
});

const model = mongoose.model('Order', orderSchema);

export default model;