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
  status: {
    type: String,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

module.exports = mongoose.model("Alert", alertSchema);
