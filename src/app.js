const express = require("express");

const { adminAuth, userAuth } = require("./middlewares/auth");

const app = express();

app.get("/getUserData", (req, res) => {
  try {
    //logic for db  call and get user data

    throw new Error("random error happens");

    res.send("User data sent");
  } catch (err) {
    res.status(500).send("some error contact support team");
  }
});

app.use("/", (err, req, res, next) => {
  if (err) {
    res.status(500).send("something went wrong");
  }
});

app.listen(7777, () => {
  console.log("Server is running fine on port 7777");
});
