const mp3Quran = require("../models/mp3-quran");
const recitersModel = require("../models/recitersModel");

const { getTargetSuwar, groupByLetter, pagination } = require("../utils");

const getAllReciters = async (req, res) => {
  const { page, limit } = req.query;

  try {
    const reciters = await recitersModel.getAllReciters();
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
  try {
    const reciters = await recitersModel.getAllReciters();
    const suwar = await mp3Quran.getAllSuwar({ lang: "ara" });
    const reciter = reciters.find((reciter) => reciter.id === req.params.id);
    res.json({
      message: `gathered reciter data successfully`,
      reciter: {
        ...reciter,
        moshaf: {
          ...reciter.moshaf.map((moshaf) => ({
            id: moshaf.id,
            name: moshaf.name,
            server: moshaf.server,
            surah_total: moshaf.surah_total,
            suwar: getTargetSuwar(reciter.moshaf, suwar),
          })),
        },
      },
    });
  } catch (error) {
    return res.json({ message: error.message }).status(error.code);
  }
};

module.exports = { getAllReciters, getReciterById };
