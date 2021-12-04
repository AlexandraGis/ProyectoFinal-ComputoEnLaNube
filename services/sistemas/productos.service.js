const config = require("config.json");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const db = require("_helpers/db");

var md5 = require("md5");
const Producto = db.Producto;

module.exports = {
  getAll,
  getById,
  create,
  update,
  delete: _delete,
};


async function getAll() {
  return await Producto.find();
}

async function getById(id) {
  return await Producto.findById(id);
}

async function create(productoParam) {
  // validate
  if (await Producto.findOne({ name: productoParam.name })) {
    throw 'Productoname "' + productoParam.name + '" is already taken';
  }
  
  const producto = new Producto(productoParam);

  // save producto
  await producto.save();
}

async function update(id, productoParam) {
  const producto = await Producto.findById(id);

  // validate
  if (!producto) throw "Producto not found";
  if (
    producto.name !== productoParam.name &&
    (await Producto.findOne({ name: productoParam.name }))
  ) {
    throw 'Productname "' + productoParam.name + '" is already taken';
  }

  // copy productoParam properties to producto
  Object.assign(producto, productoParam);

  await producto.save();
}

async function _delete(id) {
  await Producto.findByIdAndRemove(id);
}
