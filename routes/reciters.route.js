const {
  getAllReciters,
  getReciterById,
} = require("../controller/reciters.contriller");

const recitersRoute = require("express").Router();

recitersRoute.get("", getAllReciters);
recitersRoute.get("/:id", getReciterById);

module.exports = recitersRoute;
