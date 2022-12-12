import mongoose from "mongoose";

const schema = new mongoose.Schema({
  projectName: {
    type: String,
    required: true,
    unique: true,
  },
  accessinglink: {
    type: String,
    required: true,
    unique: true,
  },
  instaUserName: {
    type: String,
    required: true,
    unique: true,
  },
  contactNo: {
    type: Number,
    required: true,
    unique: true,
  },
  resumes: [
    {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
  ],

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
