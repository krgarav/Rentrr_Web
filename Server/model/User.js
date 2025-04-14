const mongoose = require("mongoose");

// Define the user schema
const UserSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true, match: /\S+@\S+\.\S+/ }, // Unique email and regex validation
    password: { type: String, required: true },
    role: { type: String, required: true, default: 'operator' },
  },
  { timestamps: true } // This will add createdAt and updatedAt fields automatically
);

module.exports = mongoose.model("User", UserSchema);
