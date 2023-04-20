import mongoose from "mongoose";
import ratingsSchema from "./ratingsSchema.js";

const ratingsModel = mongoose.model("ratings", ratingsSchema);

export default ratingsModel;
