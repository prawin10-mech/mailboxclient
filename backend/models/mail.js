const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const mailSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "user" },
  to: { type: String, required: true },
  cc: String,
  bcc: String,
  subject: { type: String },
  message: { type: String, required: true },
});

module.exports = mongoose.model("Mail", mailSchema);
