const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schema = new Schema({
  name: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  pass: { type: String, required: true },
});

schema.set("toJSON", { virtuals: true });

module.exports = mongoose.model("users", schema);
