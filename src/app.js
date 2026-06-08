const express = require("express");

const app = express();

app.get("/user", [
  [
    (req, res, next) => {
      console.log("Request handler from first route");
      // res.send("Response from user route one");
      next();
    },
    (req, res, next) => {
      console.log("Request handler from second route");
      // res.send("Response from user route two");
      next();
    },
  ],
  (req, res, next) => {
    console.log("Request handler from three route");
    // res.send("Response from user route three");
    next();
  },
  (req, res, next) => {
    console.log("Request handler from four route");
    // res.send("Response from user route four");
    next();
  },
  (req, res, next) => {
    console.log("Request handler from five route");
    res.send("Response from user route five");
    // next();
  },
]);

app.listen(7777, () => {
  console.log("Server is running fine on port 7777");
});
