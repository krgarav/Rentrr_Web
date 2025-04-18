const mongoose = require("mongoose");

// Define the user schema
const UserSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: {
      type: String,
      required: true,
      unique: true,
      match: /\S+@\S+\.\S+/,
    },
    password: {
      type: String,
      default: null, // Not required for Google users
    },
    provider: {
      type: String,
      enum: ["local", "google"],
      default: "local",
    },
    avatar: {
      type: String, // Store Google profile picture
    },
    role: {
      type: String,
      enum: ["operator", "admin"],
      default: "operator",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
