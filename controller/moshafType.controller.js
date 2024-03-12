const { getAllSuwar } = require("../models/mp3-quran");
const recitersModel = require("../models/recitersModel");
const { getTargetSuwar } = require("../utils");
const getMoshafController = async (req, res) => {
  const reciters =
    req.locals && req.locals.reciters
      ? req.locals.reciters
      : await recitersModel.getAllReciters();
  const suwar =
    req.locals && req.locals.suwar
      ? req.locals.suwar
      : await getAllSuwar({ lang: "ara" });
  const { reciterId, moshafId } = req.params;
  const reciter = reciters.find((reciter) => reciter.id === reciterId);

  req.locals = { reciters, suwar };

  if (!reciter) {
    return res.status(404).json({
      moshafType: [],
      message: `there's no reciters with this id :${reciterId}`,
    });
  }

  const moshafType = reciter.moshaf.find(
    (moshaf) => moshaf.id === parseInt(moshafId)
  );
  if (!moshafType) {
    return res.status(404).json({
      moshafType: [],
      message: `there's no moshaf with this id :${moshafId}`,
    });
  }
  return res.json({
    moshafType: {
      id: moshafType.id,
      name: moshafType.name,
      server: moshafType.server,
      surah_total: moshafType.surah_total,
      moshaf_type: moshafType.moshaf_type,
      suwar: getTargetSuwar([moshafType], suwar),
    },
    message: "gathered moshaf type data",
  });
};

module.exports = { getMoshafController };
