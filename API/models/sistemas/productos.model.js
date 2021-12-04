const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schema = new Schema({
  name: { type: String, required: true },
  descripcion: { type: String, required: true },
  stock: { type: Number, required: true },
  precio: { type: Number, required: true },
});

schema.set("toJSON", { virtuals: true });

module.exports = mongoose.model("productos", schema);
