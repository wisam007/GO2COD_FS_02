const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    name: {
      required: [true, "Please add your name"],
      type: String,
    },
    email: {
      required: [true, "Add your email"],
      type: String,
      unique: true,
    },
    password: {
      required: [true, "Please add a password"],
      type: String,
    },
    role: {
      required: [true, "Please add a role"],
      type: String,
      default: "user",
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("User", userSchema);
