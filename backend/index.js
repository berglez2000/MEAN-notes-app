const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const users = require("./routes/users");

const port = process.env.port || 5000;

// Connect to DB
mongoose.connect("mongodb://localhost:27017/notes-app", () => {
  console.log("Connected to DB");
});

// Cors Middleware
app.use(cors());

// JSON Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Users Middleware
app.use("/api/users/", users);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
