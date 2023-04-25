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

router.put("/:id", async (req, res) => {
  console.log("Edit Users", req?.params?.id);
  try {
    const result = await User.findByIdAndUpdate(
      { _id: req?.params?.id },
      req?.body
    );
    res.status(204).json(result);
  } catch (error) {
    res.status(404).json({ err: error });
  }
});

router.delete("/:id", async (req, res) => {
  console.log("Delete Users", req?.params?.id);
  try {
    const result = await User.findByIdAndDelete({ _id: req?.params?.id });
    res.status(204).json(result);
  } catch (error) {
    res.status(404).json({ err: error });
  }
});

module.exports = router;
