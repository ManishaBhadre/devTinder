const express = require("express");

const app = express();

const connectDB = require("./config/database.js");

const User = require("./models/user.js");

app.post("/signup", async (req, res) => {
  //creating new instance of user model
  const user = new User({
    firstName: "chetan",
    lastName: "madde",
    emailId: "chetanmadde@gmail.com",
    password: "chetan123",
    age: 32,
  });

  try {
    await user.save();
    res.send("User signup sucessfully");
  } catch (err) {
    res.status(500).send("there is an error saving user" + err.message);
  }
});

connectDB()
  .then(() => {
    console.log("Database connection sucessful");

    app.listen(7777, () => {
      console.log("Server is running fine on port 7777");
    });
  })
  .catch((err) => {
    console.error("Database connection failed.");
  });
