const express = require("express");
const app = express();
const port = 3001;

const mockUser = [
  { id: 1, name: "Theethawat", department: "Software" },
  { id: 2, name: "Thanachit", department: "Software" },
  { id: 3, name: "Paipan", department: "Software" },
  { id: 4, name: "Aekapol", department: "Automation" },
];

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/user", (req, res) => {
  console.log("Find All Users");
  res.json({ rows: mockUser });
});

app.get("/user/:id", (req, res) => {
  console.log("Fine One User with Id" + req.params.id);
  const foundUser = mockUser.find(
    (data) => data.id === parseInt(req.params.id)
  );
  res.json(foundUser);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
