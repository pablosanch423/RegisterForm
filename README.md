## User Registration and Management App

This Node.js Express app allows users to register, view, edit, and delete their information. The app uses MongoDB as the database and EJS as the view engine.

### Step-by-Step Explanation

#### 1. Installation

First, install the required dependencies:

```sh
npm install express mongoose body-parser ejs
```

#### 2. Database Connection

Connect to the MongoDB database using the Mongoose ODM:

```js
const mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://psanch423:westmec@cluster0.gxy1lnf.mongodb.net/addUser"
);
```

#### 3. Models

Create a User model with the following schema:

```js
const User = mongoose.model("User", {
  name: String,
  email: String,
  phone: String,
  address: String,
  password: String,
});
```

#### 4. Routes

Define the routes for the app:

```js
app.get("/", async (req, res) => {
  try {
    res.render("index", { users: await User.find() });
  } catch (err) {
    console.error(err);
  }
});

app.post("/register", async (req, res) => {
  try {
    const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      address: req.body.address,
      password: req.body.password,
    });

    await newUser.save();
    res.redirect("/");
  } catch (err) {
    console.error(err);
  }
});

app.get("/edit/:userId", async (req, res) => {
  const userId = req.params.userId;
  try {
    const user = await User.findById(userId);
    if (!user) {
      res.status(404).send("User not found");
    } else {
      res.render("edit", { user });
    }
  } catch (err) {
    console.error(err);
  }
});


```
