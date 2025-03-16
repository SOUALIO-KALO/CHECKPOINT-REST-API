const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    fullname: String,
    age: {
      type: Number,
      default: 21,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
