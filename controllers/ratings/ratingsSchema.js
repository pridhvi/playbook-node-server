import mongoose from "mongoose";
const ratingsSchema = new mongoose.Schema(
  {
    rating: { type: Number, required: true },
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
    // createdAt: { type: Date, default: Date.now },
  },
  { collection: "ratings" }
);

export default ratingsSchema;
