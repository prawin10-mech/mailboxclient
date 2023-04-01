const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const mailSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "user" },
  from: { type: String },
  to: { type: String, required: true },
  cc: String,
  bcc: String,
  subject: { type: String },
  message: { type: String, required: true },
  isRead: { type: Boolean, default: false },
});

module.exports = mongoose.model("Mail", mailSchema);
