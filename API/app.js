require("rootpath")();
const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const jwt = require("middlewares/jwt");
const errorHandler = require("_helpers/error-handler");
const morgan = require("morgan");
var path = require("path");

if (typeof PhusionPassenger !== "undefined") {
  PhusionPassenger.configure({ autoInstall: false });
}

// enable files upload

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan("dev"));

// use JWT auth to secure the api
app.use(jwt());

// api routes
app.use("/users", require("./controllers/sistemas/users.controller"));

app.use("/pedidos", require("./controllers/sistemas/pedidos.controller"));

app.use("/productos", require("./controllers/sistemas/productos.controller"));

// global error handler
app.use(errorHandler);

//app.listen("passenger");
/*
if (typeof PhusionPassenger !== "undefined") {
  app.listen("passenger");
} else {
  app.listen(5000);
}*/

//start server
const port =
  process.env.NODE_ENV === "production" ? process.env.PORT || 80 : 5000;
const server = app.listen(port, function () {
  console.log("Server listening on port " + port);
});
