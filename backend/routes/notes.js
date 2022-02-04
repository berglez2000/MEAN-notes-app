const express = require("express");
const router = express.Router();
const Note = require("../modules/Note");
const checkAuth = require("../middleware/check-auth");

router.get("/", (req, res) => {
  res.json({ success: true });
});

router.post("/", checkAuth, (req, res) => {
  const newNote = new Note({
    creator: req.body.creator,
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

router.get("/:id", checkAuth, async (req, res) => {
  try {
    const notes = await Note.find({ creator: req.params.id });
    res.json(notes);
  } catch (error) {
    res.json({ success: false, err: err });
  }
});

router.delete("/:id", checkAuth, async (req, res) => {
  try {
    const note = await (await Note.findOne({ _id: req.params.id })).delete();
    res.status(201).json({ success: true, msg: "Note deleted successfully" });
  } catch (error) {
    res
      .status(404)
      .json({ success: false, msg: "Note with this ID doesn't exist" });
  }
});

module.exports = router;
