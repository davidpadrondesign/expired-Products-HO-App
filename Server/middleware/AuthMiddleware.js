import jwt from "jsonwebtoken";
import userRegister from "../models/userRegister.model.js";

const protect = async (req, res, next) => {

    if (req.headers.authorization) { 

        try {
            const token = req.headers.authorization;
            const decoded = jwt.verify(token, process.env.JWT__SECRET);

            if(decoded) {
                await userRegister.findById(decoded.id);
                next();
            }

        } catch(error) {
            res.json({msg: 'tokenExpire'});
        }

    } else {
        return res.status(401).json({msg: 'Not authorized, no token'});
    }
}

export default protect;