//console.log("Hello World from app");

const express = require("express");

const app = express();

app.use("/test", (req, res) => {
  res.send("Hello from test page route");
});

app.use("/hello", (req, res) => {
  res.send("Hello hello hello hello hello from helol page !!!!");
});

app.use("/", (req, res) => {
  res.send("Hello from server using express testing nodemon!");
});

app.listen(7777, () => {
  console.log("Server is running fine on port 7777");
});
