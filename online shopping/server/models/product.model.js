import mongoose from "mongoose";

const Schema = mongoose.Schema;

const productSchema = new Schema({
    title:{
        type:String,
        require:true
    },
    description:{
        type:String,
        require:true
    },
    imageUrl:{
        type:String,
        require:true
    },
    material:{
        type:String,
        require:true
    },
    size:{
        type:String,
        require:true
    },
    price:{
        type:Number,
        require:true
    },
    childCatalog:{
        type:Schema.Types.ObjectId,
        require:true,
        ref:'ChildCatalog'
    },
    parentCatalog:{
        type:Schema.Types.ObjectId,
        require:true,
        ref:'Catalog'
    }
});

// const model = mongoose.model('Product', productSchema);
const model = mongoose.models.Product || mongoose.model('Product', productSchema);

export default model;