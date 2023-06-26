import mongoose from "mongoose";
import { Schema } from "mongoose";

const userRegisterSchema = new Schema(
  {
    userName: { type: String, require: true },
    userPassword: { type: String, require: true },
    authorization: { type: Boolean, default: false, required: true },
    token: { type: String, require: true },
  },
  {
    timestamps: true,
    versionKey: false //delete the "__v: 0" property from the mongo schema
  }
);

const userRegister = mongoose.model("userRegister", userRegisterSchema);

export default userRegister;