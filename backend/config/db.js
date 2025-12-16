const mongoose = require("mongoose");

module.exports = async () => {
  await mongoose.connect("mongodb://127.0.0.1:27017/hammalmessage");
  console.log("✅ MongoDB connected");
};
