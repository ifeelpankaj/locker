import mongoose from "mongoose";

const schema = new mongoose.Schema({
  projectName: {
    type: String,
    required: true,
  },
  pinfo: {
    type: String,
    required: true,
  },
  accessinglink: {
    type: String,
    required: true,
    // unique: true,
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const Info = mongoose.model("Info", schema);
