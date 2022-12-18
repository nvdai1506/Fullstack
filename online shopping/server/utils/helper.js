import Catalog from '../models/catalog.model.js';
import Product from '../models/product.model.js';

export const addPropertyToModel = async (key, value, modelName) => {
  let Model;
  if (modelName === 'Catalog') {
    Model = Catalog;
  } else if (modelName === 'Product') {
    Model = Product;
  }
  try {
    const arrays = await Model.find();
    for (const element of arrays) {
      element[key] = value;
      element.save();
      // console.log(typeof (element));
    }
  } catch (error) {
    console.log(error);
  }
}

export const deletePropertyfromModel = async (key, modelName) => {
  let Model;
  if (modelName === 'Catalog') {
    Model = Catalog;
  } else if (modelName === 'Product') {
    Model = Product;
  }
  try {
    const arrays = await Model.find();
    for (const element of arrays) {
      element[key] = undefined;
      element.save();
    }
  } catch (error) {
    console.log(error);
  }
}