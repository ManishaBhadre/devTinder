//console.log("Hello World from app");

const express = require("express");

const app = express();

// app.use("/user", (req, res) => {
//   res.send("HAHAHAHAHAHA");
// });

// This will only handle GET requests to /user
// app.get("/user", (req, res) => {
//   console.log(req.query);
//   res.send({ firstName: "Akshay", lastName: "Saini" });
// });

// app.get("/user/:userId", (req, res) => {
//   console.log(req.params);
//   res.send({ firstName: "Akshay", lastName: "Saini" });
// });

//You can also make more complex routes using multiple parameters:

// app.get("/user/:userId/:name/:password", (req, res) => {
//   console.log(req.params);
//   res.send({ firstName: "Akshay", lastName: "Saini" });
// });

// This will handle all HTTP method requests to /test
app.use("/test", (req, res) => {
  res.send("Hello from the server!!");
});

// Handle POST request → Save data to the database
app.post("/user", (req, res) => {
  // saving data to DB
  res.send("Data successfully saved to the DB!");
});
// Handle DELETE request → Delete user data
app.delete("/user", (req, res) => {
  res.send("Deleted successfully!!");
});

// Keep this generic one last
app.use("/user", (req, res) => {
  res.send("HAHAHAHAHAHA");
});

app.use("/hello/2", (req, res) => {
  res.send("Abra ka Dabra!!");
});

app.use("/hello", (req, res) => {
  res.send("Hello hello hello hello hello from helol page !!!!");
});
/*
app.use("/", (req, res) => {
  res.send("Hello from server using express testing nodemon!");
});

*/

app.get("/abc", (req, res) => {
  res.send({ firstName: "Akshay", lastName: "Saini" });
});

// app.get(/^\/ab?c$/, (req, res) => {
//   res.send({ firstName: "Akshay", lastName: "Saini" });
// });

// Regex work if path contain a
app.get(/a/, (req, res) => {
  res.send({ firstName: "Akshay", lastName: "Saini" });
});

// Regex work if start with anything but end with fly
app.get(/.*fly$/, (req, res) => {
  res.send({ firstName: "Akshay", lastName: "Saini" });
});

app.listen(7777, () => {
  console.log("Server is running fine on port 7777");
});
