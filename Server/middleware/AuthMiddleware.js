import jwt from "jsonwebtoken";
import userRegister from "../models/userRegister.model.js";

const protect = async (req, res, next) => {

    if (req.headers.authorization) { //tomamos parametros del headers.autorization (el token)
        console.log(`REQ.HEADER.TOKEN -> ${req.headers.authorization}`);

        try {
            const token = req.headers.authorization;
            const decoded = jwt.verify(token, process.env.JWT__SECRET);
            console.log(decoded);

            if(decoded) {
                const verifyUserId = await userRegister.findById(decoded.id)
                console.log(verifyUserId);
                next();
            }

        } catch(error) {
            console.error(error);
            console.log('TOKEN TIME EXPIRE');
            res.json({msg: 'tokenExpire'});
        }

    } else {
        return res.status(401).json({msg: 'Not authorized, no token'});
    }
}

export default protect;