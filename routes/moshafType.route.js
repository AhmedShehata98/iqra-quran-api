const { getMoshafController } = require("../controller/moshafType.controller");

const moshafRoute = require("express").Router();

moshafRoute.get("/:reciterId/:moshafId", getMoshafController);
module.exports = moshafRoute;
