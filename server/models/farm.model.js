import mongoose from "mongoose";

const farmSchema = new mongoose.Schema(
  {
    plotSize: {
      type: String,
      required: true,
      min: [0, "plotSize must be >= 0"],
    },
    cropType: {
      type: String,
      required: true,
    },
    location: {
      type: String,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
  },
  { timestamps: true }
);

export const Farm = mongoose.model("Farm", farmSchema);
