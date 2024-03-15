const {
  getAllReciters,
  getReciterById,
  addReciter,
  deleteReciter,
} = require("../controller/reciters.controller");

const recitersRoute = require("express").Router();

recitersRoute
  .get("", getAllReciters)
  .get("/:reciterId", getReciterById)
  .post("/", addReciter)
  .delete("/:reciterId", deleteReciter);

module.exports = recitersRoute;
