const mongoose = require("mongoose");

const NoteSchema = mongoose.Schema({
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  note: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Note", NoteSchema);
