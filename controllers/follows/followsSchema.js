import mongoose from "mongoose";
const followsSchema = new mongoose.Schema(
  {
    followingUser: { type: String, required: true },
    masterUser: { type: String, required: true },
    // followingUser: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
    // masterUser: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
  },
  { collection: "follows" }
);

export default followsSchema;
