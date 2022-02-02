const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const saltRounds = 10;
const secretKey = "2Pe8xTMmt&_B&vZ$2Q_4vfD-WTR@5zQVjz%V@5!hWuv5xkcz^t";
const User = require("../modules/User");
const checkAuth = require("../middleware/check-auth");

router.get("/", async (req, res) => {
  try {
    const allUsers = await User.find();
    res.status(200).json(allUsers);
  } catch (err) {
    res.json({ err: err });
  }
});

router.post("/register", (req, res) => {
  bcrypt.genSalt(saltRounds, (err, salt) => {
    if (err) return res.json(err);
    bcrypt.hash(req.body.password, salt, (err, hash) => {
      if (err) return res.json(err);
      const newUser = new User({
        email: req.body.email,
        password: hash,
        userID: req.body.userID,
      });
      newUser
        .save()
        .then(() => {
          res.status(201).json({ success: true, msg: "User added" });
        })
        .catch((err) => {
          res.json({ success: false, err: err });
        });
    });
  });
});

router.post("/login", async (req, res) => {
  let fetchedUser;
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(200).json({ msg: "User with this email not exist" });
    }
    fetchedUser = user;
    bcrypt.compare(req.body.password, user.password, (err, response) => {
      if (err) {
        return res.status(200).json({ success: false, msg: err });
      }
      if (response) {
        const token = jwt.sign(
          { email: fetchedUser.email, userID: fetchedUser._id },
          secretKey,
          { expiresIn: "1h" }
        );

        return res.status(200).json({
          success: true,
          msg: "login succesfull",
          jwt: token,
          user: fetchedUser,
        });
      }

      res.status(200).json({ success: false, msg: "Incorrect password" });
    });
  } catch (err) {
    res.json(err);
  }
});

router.get("/validate", checkAuth, (req, res) => {
  res.status(200).json({ success: true, msg: "Token is verified" });
});

router.get("/user/:id", checkAuth, async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.id });
    res.json({ success: true, user: user });
  } catch (err) {
    res.json({ success: false });
  }
});

module.exports = router;
