const express = require("express");
const router = express.Router();
const productoService = require("../../services/sistemas/productos.service");

// routes
router.post("/", register);
router.get("/", getAll);
router.get("/:id", getById);
router.put("/:id", update);
router.delete("/:id", _delete);

module.exports = router;

function register(req, res, next) {
  productoService
    .create(req.body)
    .then(() => res.json({ message: "Creado" }))
    .catch((err) => next(err));
}

function getAll(req, res, next) {
  productoService
    .getAll()
    .then((productos) => res.json(productos))
    .catch((err) => next(err));
}

function getById(req, res, next) {
  productoService
    .getById(req.params.id)
    .then((productos) =>
      productos ? res.json(productos) : res.sendStatus(404)
    )
    .catch((err) => next(err));
}

function update(req, res, next) {
  productoService
    .update(req.params.id, req.body)
    .then(() => res.json({}))
    .catch((err) => next(err));
}

function _delete(req, res, next) {
  productoService
    .delete(req.params.id)
    .then(() => res.json({ message: "Eliminado" }))
    .catch((err) => next(err));
}
