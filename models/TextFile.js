import mongoose from "mongoose";

const schema = new mongoose.Schema({
    name: String,
    content: String,
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

  export const TextFile = mongoose.model("TextFile", schema);