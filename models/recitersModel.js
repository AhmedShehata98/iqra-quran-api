const fs = require("fs/promises");
const path = require("path");
const { validateSchemaKeys } = require("../utils/index");
const { ytid } = require("ytid");

const RECITERS_DATA_PATH = path.join(
  path.dirname(__dirname),
  "data",
  "recitersData.json"
);

const findAllReciters = async () => {
  try {
    const reciters = await fs.readFile(RECITERS_DATA_PATH, {
      encoding: "utf8",
    });
    return JSON.parse(reciters);
  } catch (error) {
    throw error;
  }
};
const createReciter = async (reciter) => {
  try {
    const isValid = validateSchemaKeys(
      ["id", "name", "bio", "img", "letter", "date", "moshaf"],
      reciter
    );
    if (!isValid) throw new Error("Invalid reciter schema keys");
    if (await isExist(reciter.id))
      throw new Error("reciter you tring to add is already exists");
    const oldReciters = await findAllReciters();
    const newReciters = [...oldReciters, { reciter, id: ytid() }];

    await fs.writeFile(RECITERS_DATA_PATH, JSON.stringify(newReciters));
    return reciter;
  } catch (error) {
    throw new Error(error.message);
  }
};
const findReciterById = async (reciterId) => {
  try {
    const allReciters = await findAllReciters();
    const reciterTarget = allReciters.find(
      (reciter) => reciter.id === reciterId
    );

    if (reciterTarget === undefined)
      throw new Error(
        `error , the reciter id ${reciterId} you provided is not available`
      );

    return reciterTarget;
  } catch (error) {
    throw new Error(error.message);
  }
};
const deleteById = async (reciterId) => {
  try {
    if (!(await isExist(reciterId)))
      throw new Error(
        `error , the reciter id ${reciterId} you provided is not available`
      );
    const oldReciters = await findAllReciters();
    const newReciters = oldReciters.filter(
      (reciter) => reciter.id !== reciterId
    );

    await fs.writeFile(RECITERS_DATA_PATH, JSON.stringify(newReciters));
    return true;
  } catch (error) {
    throw new Error(error.message);
  }
};
const isExist = async (id) => {
  try {
    const reciters = await findAllReciters();
    return Boolean(reciters.find((reciter) => reciter.id === id));
  } catch (error) {
    throw new Error(error.message);
  }
};
module.exports = {
  findAllReciters,
  createReciter,
  deleteById,
  findReciterById,
};
