import express from "express";
import { createUserRegister, getUserLogin } from "../controllers/userRegisterLogin.controller.js";

const userRegisterRoute = express.Router();

userRegisterRoute.post('/createRegister', createUserRegister);
userRegisterRoute.post('/getUserLogin', getUserLogin);

export default userRegisterRoute;