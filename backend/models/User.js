const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  name: String,
  price: String,
  slug: String,
  image: String,
});

const User = mongoose.model("User", schema);

module.exports = User;
