const express = require("express");
const router = express.Router();
const pedidosService = require("../../services/sistemas/pedidos.service");

// routes
router.post("/", register);
router.get("/", getAll);
router.get("/:id", getById);
router.put("/:id", update);
router.delete("/:id", _delete);

module.exports = router;

function register(req, res, next) {
  pedidosService
    .create(req.body)
    .then(() => res.json({ message: "Creado" }))
    .catch((err) => next(err));
}

function getAll(req, res, next) {
  pedidosService
    .getAll()
    .then((pedidos) => res.json(pedidos))
    .catch((err) => next(err));
}

function getById(req, res, next) {
  pedidosService
    .getById(req.params.id)
    .then((pedidos) => (pedidos ? res.json(pedidos) : res.sendStatus(404)))
    .catch((err) => next(err));
}

function update(req, res, next) {
  pedidosService
    .update(req.params.id, req.body)
    .then(() => res.json({}))
    .catch((err) => next(err));
}

function _delete(req, res, next) {
  pedidosService
    .delete(req.params.id)
    .then(() => res.json({ message: "Eliminado" }))
    .catch((err) => next(err));
}
