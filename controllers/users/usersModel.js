import mongoose from "mongoose";
import usersSchema from "./usersSchema.js";

const usersModel = mongoose.model("users", usersSchema);

export default usersModel;
