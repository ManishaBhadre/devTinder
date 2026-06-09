const express = require("express");

const { adminAuth, userAuth } = require("./middlewares/auth");

const app = express();

// app.use("/admin", (req, res, next) => {
//   console.log("admin authorization in the middleware");
//   const token = "xyzz";

//   const isUserAuthorized = token === "xyz";

//   if (!isUserAuthorized) {
//     res.status(401).send("Unauthorized request");
//   } else {
//     next();
//   }
// });

app.use("/admin", adminAuth);

app.post("/user/login", (req, res) => {
  res.send("User logged in sucessfully!");
});

app.get("/user/data", userAuth, (req, res) => {
  res.send("User data sent");
});

app.get("/admin/getAllData", (req, res) => {
  res.send("All data submitted");
});

app.get("/admin/deleteData", (req, res) => {
  res.send("One Data deleted");
});

app.listen(7777, () => {
  console.log("Server is running fine on port 7777");
});
