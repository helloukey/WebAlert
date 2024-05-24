const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const alertSchema = new Schema({
  url: {
    type: String,
    required: true,
  },
  selector: {
    type: String,
    required: true,
  },
  lastValue: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Alert", alertSchema);
