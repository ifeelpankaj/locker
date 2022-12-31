import mongoose from "mongoose";

const schema = new mongoose.Schema({
  aprojects: [
    {
      projectName: {
        type: String,
        required: true,
      },
      homepage: {
        public_id: String,
        url: String,
      },
      apinfo: {
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
    },
  ],

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
