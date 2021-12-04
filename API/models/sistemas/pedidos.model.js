const mongoose = require("mongoose");
var ObjectId = require("mongodb").ObjectID;
const Schema = mongoose.Schema;

const schema = new Schema({
  fecha: { type: Date, required: true, default: Date(Date.now) },
  total: { type: Number, required: true },
  productos: [
    {
      name: { type: String, required: true },
      cantidad: { type: Number, required: true },
      precio: { type: Number, required: true },
    },
  ],
  cliente: { type: Schema.Types.ObjectId, ref: "users", default: null },
});

schema.set("toJSON", { virtuals: true });

module.exports = mongoose.model("pedidos", schema);
