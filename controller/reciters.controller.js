const mp3Quran = require("../models/mp3-quran");
const recitersModel = require("../models/recitersModel");

const { groupByLetter, pagination } = require("../utils");

const getAllReciters = async (req, res) => {
  const { page, limit } = req.query;
  try {
    const reciters = await recitersModel.findAllReciters();
    const { data, hasNext, length, total } = pagination({
      page,
      limit,
      data: reciters,
    });

    return res.json({
      message: `gathered reciters data from file`,
      reciters: groupByLetter(data),
      length,
      total,
      hasNext,
    });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};
const getReciterById = async (req, res) => {
  const { reciterId } = req.params;
  try {
    if (reciterId === undefined)
      res
        .status(400)
        .json({
          message: `please provide a reciter id expected ( id ) but got ( ${reciterId} )`,
        });
    const reciter = await recitersModel.findReciterById(reciterId);
    res.json({
      message: `gathered reciter data successfully`,
      reciter: {
        ...reciter,
        moshaf: {
          ...reciter.moshaf.map((moshaf) => ({
            id: moshaf.id,
            name: moshaf.name,
          })),
        },
      },
    });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};
const addReciter = async (req, res) => {
  try {
    const reciter = req.body;
    if (!Boolean(Object.keys(reciter).length))
      return res
        .status(404)
        .json({ message: "reciter is required !!, please provide a data " });
    const newReciter = await recitersModel.createReciter(reciter);

    return res.json({
      message: " added a new reciter to file data successfully",
      reciter: newReciter,
    });
  } catch (error) {
    return res.status(400).json({ message: error.message, reciter: {} });
  }
};
const deleteReciter = async (req, res) => {
  const { reciterId } = req.params;
  if (reciterId === undefined)
    return res.status(404).json({ message: "reciter id is required" });

  const isDeleted = await recitersModel.deleteById(reciterId);
  if (isDeleted)
    return res.status(200).json({ message: "reciter deleted successfully" });
};

module.exports = { getAllReciters, getReciterById, addReciter, deleteReciter };
