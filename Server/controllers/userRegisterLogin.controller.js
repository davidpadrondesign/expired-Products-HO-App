import userRegister from "../models/userRegister.model.js";
import generateToken from "../utils/generateToken.js";
import bcrypt from "bcryptjs";

//GET-LOGIN
export const getUserLogin = async (req, res) => {
    try {
        const { addUserLogin } = req.body; //take data from client
        const loginPassword = addUserLogin.userPassword;
        
        //VALIDATION IF USER EXIST
        const user = await userRegister.findOne({ userName: addUserLogin.userName });

        if(user && (await bcrypt.compare(loginPassword, user.userPassword))) {
            const token = generateToken(user._id);

            const authUser = {
                _id: user._id,
                token: token,
                authorization: user.authorization,
            };
            res.status(200).json(authUser);
        } else {
            res.json({msg: 'Invalid Email or Password'});
            return res.status(404);
        }

    } catch(error) {
        return res.status(500).json({message: error.message});
    }
};

//CREATE-REGISTER
export const createUserRegister = async (req, res) => {
    try {
        const { newUserRegister } = req.body; //take data from client

        //VALIDATION IF USER EXIST
        const register = await userRegister.findOne({userName: newUserRegister.userName});

        if(register) {
            res.json({msg: 'user already exist'});
            return res.status(400);
        }

        //HASHING PASSWORD
        const passwordHash = await bcrypt.hash(newUserRegister.userPassword, 10);

        const newRegister = new userRegister({ //set data into the model-schema
            userName: newUserRegister.userName,
            userPassword: passwordHash,
        });
        const resultado = await newRegister.save(); //save into mongoDB

        const token = generateToken(resultado._id);

        const sendRegister = { //send register to redux state
            _id: resultado._id,
            token: token,
            authorization: resultado.authorization,
        }
        res.json(sendRegister);

    } catch(error) {
        res.json({msg: 'Error Register'});
        return res.status(500);
    }
};
