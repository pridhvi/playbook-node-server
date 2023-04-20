import mongoose from "mongoose";
import followsSchema from "./followsSchema.js";

const followsModel = mongoose.model("follows", followsSchema);

export default followsModel;
