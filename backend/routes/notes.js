const express = require("express");
const { db } = require("../modules/Note");
const router = express.Router();
const Note = require("../modules/Note");

router.get("/", (req, res) => {
  res.json({ success: true });
});

router.post("/", (req, res) => {
  const newNote = new Note({
    creator: req.body.userId,
    note: req.body.note,
  });

  newNote
    .save()
    .then(() => {
      res.status(201).json({ success: true, msg: "Note added succesfully" });
    })
    .catch((err) => {
      res.status(400).json({ success: false, msg: err });
    });
});

module.exports = router;
