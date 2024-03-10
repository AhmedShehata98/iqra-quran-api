const fs = require("fs/promises");
const path = require("path");

const RECITERS_DATA_PATH = path.join(
  path.dirname(__dirname),
  "data",
  "recitersData.json"
);

const getAllReciters = async () => {
  try {
    const reciters = await fs.readFile(RECITERS_DATA_PATH, {
      encoding: "utf8",
    });
    return JSON.parse(reciters);
  } catch (error) {
    throw error;
  }
};

module.exports = { getAllReciters };
