const express = require("express");

const app = express();

const connectDB = require("./config/database.js");

const User = require("./models/user.js");

app.use(express.json());

app.post("/signup", async (req, res) => {
  //creating new instance of user model

  /* console.log(req.body); */

  const user = new User(req.body);

  try {
    await user.save();
    res.send("User signup sucessfully");
  } catch (err) {
    res.status(500).send("there is an error saving user" + err.message);
  }
});

/** Find or View one user by email filter */

app.get("/user", async (req, res) => {
  const userEmail = req.body.emailId;

  try {
    const userFound = await User.find({ emailId: userEmail });
    if (userFound.length === 0) {
      res.status(404).send("User not found");
    } else {
      res.send(userFound);
    }
  } catch (err) {
    res.status(500).send("something went wrong");
  }
});

/** Find or View one user by email filter by findOne method */

app.get("/userbyfindone", async (req, res) => {
  const userEmail = req.body.emailId;

  try {
    const userFound = await User.findOne({ emailId: userEmail });
    if (!userFound) {
      res.status(404).send("User not found");
    } else {
      res.send(userFound);
    }
  } catch (err) {
    res.status(500).send("something went wrong");
  }
});

/** Find or View all users*/

app.get("/feed", async (req, res) => {
  try {
    const userFound = await User.find({});
    if (userFound.length === 0) {
      res.status(404).send("User not found");
    } else {
      res.send(userFound);
    }
  } catch (err) {
    res.status(500).send("something went wrong");
  }
});

/** Find by Id*/

app.get("/usersid", async (req, res) => {
  const userId = req.body._id;

  try {
    const userFound = await User.findById(userId);
    if (!userFound) {
      res.status(404).send("User not found");
    } else {
      res.send(userFound);
    }
  } catch (err) {
    res.status(500).send("something went wrong");
  }
});

/**FindByIdAndDelete */

app.delete("/user", async (req, res) => {
  const userId = req.body.userId;

  try {
    const user = await User.findByIdAndDelete(userId);

    res.send("User Deleted Sucessfully");
  } catch (err) {
    res.status(400).send("something went wrong");
  }
});

/**Update the data of the User by id */

app.patch("/user", async (req, res) => {
  const userId = req.body.userId;

  const data = req.body;

  try {
    const user = await User.findByIdAndUpdate(userId, data, {
      returnDocument: "before",
      runValidators: true,
    });

    // console.log(user);

    res.send("User Updated Sucessfully");
  } catch (err) {
    res.status(400).send("Update Failed: " + err.message);
  }
});

/**Update by email  */

// app.patch("/user", async (req, res) => {
//   const userEmail = req.body.emailId;
//   console.log("uemail: " + userEmail);
//   const data = req.body;
//   console.log(data);
//   try {
//     const user = await User.findOneAndUpdate({ emailId: userEmail }, data);

//     res.send("User Updated Sucessfully");
//   } catch (err) {
//     res.status(400).send("something went wrong");
//   }
// });

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
