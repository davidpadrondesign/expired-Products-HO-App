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
connectDatabase(); //conexion DB
const app = express();

//SETTING
const port = process.env.PORT || 4000; //para que lea el archivo .env lo tenemos que dejar en la carpeta general 'Server', sino especificar la dirección de carpeta ej: 'dotenv.config({ path: './config.env' });'

//MIDDLEWARE
app.use(morgan('dev')); //'dev' -> return colored status info
app.use(cors());//permite conectar con otros back-end (en nuestro caso el back-end del front-end)
app.use(bodyParser.json()); //permite manipular data del req.body
app.use(express.json());//process data in json 

//ROUTES
//app.use('/', (req, res) => { res.json({msg: "HELLO EXPRESS"}) });
app.use('/api/listProducts', listProductsRoute);
app.use('/api/userRegisterLogin', userRegisterRoute);

//RUN SERVER
app.listen(port, console.log(`Server running on port ${port}`.brightGreen));