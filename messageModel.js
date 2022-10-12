const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema(
  {
    Name: {
      type: String,
      default : "",
    },
    email: {
      type: String,
      required : true
    },
    msg: {
      type: String,
      required : true
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("message", MessageSchema);