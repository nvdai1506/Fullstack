import mongoose from "mongoose";

const Schema = mongoose.Schema;

const ChildCatalogschema = new Schema({
    parent:{
        type: Schema.Types.ObjectId,
        ref:'Catalog',
        require:true
    },
    title:{
        type: String,
        require:true
    },
    products:[{
        type: Schema.Types.ObjectId,
        ref:'Product',
        default:[]
    }]
});

const model = mongoose.model('ChildCatalog', ChildCatalogschema);

export default model;