const config = require("config.json");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const db = require("_helpers/db");

var md5 = require("md5");
const Pedido = db.Pedido;

module.exports = {
  getAll,
  getById,
  create,
  update,
  delete: _delete,
};

async function getAll() {
  return await Pedido.find().populate({ path: "cliente", select: "name" });
}

async function getById(id) {
  return await Pedido.findById(id);
}

async function create(pedidoParam) {
  var pedidos = JSON.parse(pedidoParam.productos);
  var result = pedidos.reduce(function (_this, val) {
    return _this + val.cantidad * val.precio;
  }, 0);
  pedidoParam.total = result;
  const pedido = new Pedido(pedidoParam);
  pedido.productos = pedidos;
  // save pedido
  await pedido.save();
}

async function update(id, pedidoParam) {
  const pedido = await Pedido.findById(id);

  // validate
  if (!pedido) throw "Pedido not found";
  if (
    pedido.pedidoname !== pedidoParam.pedidoname &&
    (await Pedido.findOne({ pedidoParam: pedidoParam.pedidoname }))
  ) {
    throw 'Productname "' + pedidoParam.pedidoname + '" is already taken';
  }

  // hash password if it was entered
  if (pedidoParam.password) {
    pedidoParam.hash = bcrypt.hashSync(pedidoParam.password, 10);
  }
  pedido.access = JSON.parse(pedidoParam.access);

  // copy pedidoParam properties to pedido
  Object.assign(pedido, pedidoParam);

  await pedido.save();
}

async function _delete(id) {
  await Pedido.findByIdAndRemove(id);
}
