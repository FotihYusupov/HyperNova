const mongoose = require("mongoose");
const TeamSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  position: {
    type: String,
    required: true,
    ref: "positions"
  },
  level: {
    type: String,
    required: true,
  },
  tools: {
    type: String,
    required: true,
  },
  images: {
    type: Array,
    required: true,
  },
});

const Teams = mongoose.model("teams", TeamSchema);
module.exports = Teams;
