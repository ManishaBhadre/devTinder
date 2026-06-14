const express = require("express");
const bcrypt = require("bcrypt");
const app = express();

const connectDB = require("./config/database.js");

const {
  validateSignUpData,
  validateLoginData,
} = require("./utils/validate.js");

const User = require("./models/user.js");

app.use(express.json());

/**SignUP API */

app.post("/signup", async (req, res) => {
  try {
    //Validate data
    validateSignUpData(req);

    const { firstName, lastName, emailId, password } = req.body;

    //Encrypt password

    const passwordHash = await bcrypt.hash(password, 10);
    console.log(passwordHash);

    //creating new instance of user model
    /* console.log(req.body); */

    const user = new User({
      firstName,
      lastName,
      emailId,
      password: passwordHash,
    });

    await user.save();
    res.send("User added sucessfully");
  } catch (err) {
    res.status(500).send("Error: " + err.message);
  }
});

/**Login API */

app.post("/login", async (req, res) => {
  try {
    //Validate data
    validateLoginData(req);

    const { emailId, password } = req.body;

    const user = await User.findOne({ emailId: emailId });
    if (!user) {
      throw new Error("Invalid Credentails");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (isPasswordValid) {
      res.send("Logged in sucessfully");
    } else {
      throw new Error("Invalid Credentails");
    }
  } catch (err) {
    res.status(400).send("Error: " + err.message);
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

app.patch("/user/:userId", async (req, res) => {
  //const userId = req.body.userId;

  const userId = req.params?.userId;

  const data = req.body;

  try {
    const ALLOWED_UPDATES = ["photoUrl", "about", "gender", "age", "skills"];

    const isUpdateAllowed = Object.keys(data).every((k) =>
      ALLOWED_UPDATES.includes(k),
    );

    if (!isUpdateAllowed) {
      throw new Error("Updates not allowed");
    }

    if (data?.skills?.length > 10) {
      throw new Error("Skills cannot be more than 10");
    }
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
