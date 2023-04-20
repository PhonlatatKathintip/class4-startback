const express = require("express");
const app = express();
const port = 3001;
const User = require("./models/User");

// const mockUser = [
//   { id: 1, name: "Theethawat", department: "Software" },
//   { id: 2, name: "Thanachit", department: "Software" },
//   { id: 3, name: "Paipan", department: "Software" },
//   { id: 4, name: "Aekapol", department: "Automation" },
// ];

// connectMongo //
const mongoose = require("mongoose");
const uri = "mongodb://127.0.0.1:27017/react-stater-test";
mongoose.connect(uri).then(
  () => {
    console.log("Connection is Successful");
  },
  (err) => {
    console.error("Connection to mongodb is error", err?.message);
  }
);

// app.use //

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/user", async (req, res) => {
  console.log("Create User Body", req.body);
  const newUser = new User(req.body);
  try {
    await newUser.save({});
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ err: error });
  }
});

app.get("/", (req, res) => {
  res.send("Hello");
});

//function//
// app.get("/user", async (req, res) => {
//   try {
//     const result = await User.find();
//     console.log("Find All Users", result);
//     res.json({ rows: result });
//   } catch (error) {
//     console.log("error All Users", error);
//     res.status(404).json({ err: error });
//   }
// });

app.get("/user/:id", (req, res) => {
  console.log("Fine One User with Id" + req.params.id);
  const foundUser = result.find((data) => data.id === parseInt(req.params.id));
  res.json(foundUser);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
