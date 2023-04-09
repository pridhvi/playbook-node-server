import mongoose from "mongoose";
import commentsSchema from "./commentsSchema.js";

const commentsModel = mongoose.model("comments", commentsSchema);

export default commentsModel;
