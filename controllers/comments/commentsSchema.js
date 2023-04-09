import mongoose from "mongoose";
const commentsSchema = new mongoose.Schema(
  {
    comment: { type: String, required: true },
    itemType: {
      type: String,
      required: true,
      enum: ["games", "characters"],
    },
    itemId: {
      type: Number,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    likesUsernames: [String],
    dislikesUsernames: [String],
    createdAt: { type: Date, default: Date.now },
  },
  { collection: "comments" }
);

export default commentsSchema;
