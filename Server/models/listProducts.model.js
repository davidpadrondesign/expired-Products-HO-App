import mongoose from "mongoose";
import { Schema } from "mongoose";

const listProductsSchema = new Schema(
  {
    productName: { type: String, require: true },
    productImage: { type: String, require: true },
    price: { type: String, require: true },
    expireTime: { type: String, require: true },
    expireProductDate: { type: Object, required: true },
    deprecate: { type: Boolean, default: false, required: true },
    statusNumber: { type: Number, require: true },
  },
  {
    timestamps: true,
    versionKey: false //delete the "__v: 0" property from the mongo schema
  }
);

const listProducts = mongoose.model("listProducts", listProductsSchema);

export default listProducts;