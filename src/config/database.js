const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://manishabhadre_user_one:oYBTP79zW57Jxyz@cluster0.jbd3tkc.mongodb.net/devTinder",
  );
};

module.exports = connectDB;
