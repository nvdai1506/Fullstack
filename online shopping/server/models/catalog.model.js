import mongoose from "mongoose";

const Schema = mongoose.Schema;

const catalogSchema = new Schema({
    name:{
        type:String,
        require: true
    },
    ChildCatalogs:[
        {
            type: Schema.Types.ObjectId,
            ref:'ChildCatalog',
            default:[]
        }
]
});

const model = mongoose.model('Catalog', catalogSchema);

export default model;