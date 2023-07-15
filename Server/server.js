import express from "express";
import dotenv from "dotenv";
import colors from "colors";
import cors from "cors";
import bodyParser from "body-parser";
import morgan from "morgan";
import connectDatabase from "./dataBase/mongoDB.js";
import listProductsRoute from "./routes/listProducts.routes.js";
import userRegisterRoute from "./routes/userRegisterLogin.routes.js";

dotenv.config();
connectDatabase(); 
const app = express();

//SETTING
const port = process.env.PORT || 4000; 

//MIDDLEWARE 
app.use(cors());
app.use(bodyParser.json()); 
app.use(express.json());

//ROUTES
app.use('/api/listProducts', listProductsRoute);
app.use('/api/userRegisterLogin', userRegisterRoute);

//RUN SERVER
app.listen(port, console.log(`Server running on port ${port}`.brightGreen));