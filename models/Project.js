import mongoose from "mongoose";

const schema = new mongoose.Schema({
  bio:{
    type: String,
    required: true,
  },
  
  instaUserName: {
    type: String,
    required: true,
  },
  contactNo: {
    type: Number,
    required: true,
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
