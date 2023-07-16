import express from "express";
import { getAllProducts, getOneProduct, createProduct, updateProduct, updateSingleProduct, deleteProduct } from "../controllers/listProducts.controller.js";
import protect from "../middleware/AuthMiddleware.js";

const listProductsRoute = express.Router();

listProductsRoute.get('/allProducts', protect, getAllProducts);
listProductsRoute.get('/oneProduct/:id', getOneProduct);
listProductsRoute.post('/createProduct', protect, createProduct);
listProductsRoute.put('/updateProduct/:id', updateProduct);
listProductsRoute.put('/updateSingleProduct/:id', protect, updateSingleProduct);
listProductsRoute.delete('/deleteProduct/:id', protect, deleteProduct);

export default listProductsRoute;