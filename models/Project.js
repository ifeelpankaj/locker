import mongoose from "mongoose";

const schema = new mongoose.Schema({

  bio: String,
  instaUserName: String,
  contactNo: String,

  resumes: {
    public_id: String,
    url: String,
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

export const Project = mongoose.model("Project", schema);
