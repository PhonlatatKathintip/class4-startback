const express = require("express");
const app = express();
const port = 3001;
// const User = require("./models/User");
const userRouter = require("./routes/user.routes");

const cors = require("cors");
const mongoose = require("mongoose");
const uri = "mongodb://127.0.0.1:27017/react-stater-test";

// mongo
mongoose.connect(uri).then(
  () => {
    console.log("Connection is Successful");
  },
  (err) => {
    console.error("Connection to mongodb is error", err?.message);
  }
);
////

// app.use //

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({}));
app.use("/api/user", userRouter);

app.listen(port, () => {
  console.log("Server start");
});
