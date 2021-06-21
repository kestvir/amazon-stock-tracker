import mongoose, { Schema } from "mongoose";
import { Product } from "../src/types";

export const product: Schema = new Schema({
  productURL: {
    required: true,
    type: String,
  },
  imgURL: {
    required: true,
    type: String,
  },
  title: {
    required: true,
    type: String,
  },
  inStock: {
    required: true,
    type: Boolean,
  },
});

export default mongoose.model<Product>("Product", product);
