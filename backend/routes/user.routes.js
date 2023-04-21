const express = require("express");
const router = express.Router();
const User = require("../models/User");

router.get("/user", (req, res) => {
  console.log("Hello World!");
});

router.get("/", async (req, res) => {
  console.log("Find All Users");
  try {
    const result = await User.find();
    res.json({ rows: result });
  } catch (error) {
    res.status(404).json({ err: error });
  }
});

router.get("/:id", async (req, res) => {
  console.log("Find All Users");
  try {
    const result = await User.findById(req?.params?.id);
    res.json(result);
  } catch (error) {
    res.status(404).json({ err: error });
  }
});

router.post("/", async (req, res) => {
  console.log("Create User Body", req.body);
  const newUser = new User(req.body);
  try {
    await newUser.save({});
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ err: error });
  }
});

module.exports = router;
