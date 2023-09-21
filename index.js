const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const app = express();
const port = 3000;

mongoose.connect(
  "mongodb+srv://psanch423:westmec@cluster0.gxy1lnf.mongodb.net/addUser"
);

app.set("view engine", "ejs");
app.set("views", "./public/views");

const User = mongoose.model("User", {
  name: String,
  email: String,
  phone: String,
  address: String,
  password: String,
});

app.use(bodyParser.urlencoded({ extended: true }));

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

app.post("/edit/:userId", async (req, res) => {
  const userId = req.params.userId;
  try {
    await User.findByIdAndUpdate(userId, {
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      address: req.body.address,
      password: req.body.password,
    });
    res.redirect("/");
  } catch (err) {
    console.error(err);
  }
});

app.post("/delete/:userId", async (req, res) => {
  const userId = req.params.userId;
  try {
    await User.findByIdAndDelete(userId);
    res.redirect("/");
  } catch (err) {
    console.error(err);
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
