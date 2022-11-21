import path from 'path';
import { fileURLToPath } from 'url';

import * as dotenv from 'dotenv' 
dotenv.config()
import express from 'express';
import mongoose from 'mongoose';
import cors from "cors";

import AdminRouter from './routes/admin.route.js';
import AuthRouter from './routes/auth.route.js';
import UserRouter from './routes/user.route.js';
import ShopRouter from './routes/shop.route.js';
import { v4 } from'uuid';
import  multer from'multer';

import Auth from './middlewares/auth.mdw.js';

const app= express();

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

const fileStorage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'images');
},
filename: function(req, file, cb) {
    cb(null, v4()+'-'+ file.originalname)
}
});
const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === 'image/png' ||
    file.mimetype === 'image/jpg' ||
    file.mimetype === 'image/jpeg'
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};


app.use(express.json());
app.use(cors());

app.use(
  multer({ storage: fileStorage, fileFilter: fileFilter }).single('image')
);
app.use('/images', express.static(path.join(__dirname, 'images')));

app.use('/', AuthRouter);
app.use('/shop', ShopRouter);
app.use('/admin',Auth, AdminRouter);
app.use('/user', Auth , UserRouter);


app.use((error, req, res, next) => {
  console.log(error);
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  res.status(status).json({ message: message, data: data });
});


const PORT = process.env.PORT || 8080;

mongoose.connect('mongodb+srv://ochimot:Vandai1506@cluster0.bhpjcf9.mongodb.net/onlineShop').then( result =>{
  app.listen(PORT, function () {
    console.log(`Server is listening at http://localhost:${PORT}`);
  });
}).catch(err => console.log(err));

