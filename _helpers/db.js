const config = require("config.json");
const mongoose = require("mongoose");
mongoose.connect(process.env.MONGODB_URI || config.connectionString, {
  useUnifiedTopology: true,
  useCreateIndex: true,
  useNewUrlParser: true,
});
mongoose.Promise = global.Promise;

module.exports = {
  User: require("../models/sistemas/user.model"),
  Producto: require("../models/sistemas/productos.model"),
  Pedido: require("../models/sistemas/pedidos.model"),
};
