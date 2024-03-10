const axios = require("axios");

const API_BASE_URL = process.env.API_BASE_URL;
const ENDPOINTS = {
  reciters: "reciters",
  suwar: "suwar",
  moshaf: "moshaf",
  recent_reads: "recent_reads",
  liveTv: "live-tv",
  radios: "radios",
};
const MP3_QURAN = axios.create({ baseURL: API_BASE_URL });
async function getAllReciters({ lang }) {
  try {
    const res = await MP3_QURAN({
      url: ENDPOINTS.reciters,
      params: { lang },
    });
    return res.data.reciters;
  } catch (error) {
    throw error;
  }
}
async function getAllSuwar({ lang = "ara" }) {
  try {
    const { data } = await MP3_QURAN({
      url: ENDPOINTS.suwar,
      params: { lang },
    });
    return data.suwar;
  } catch (error) {
    throw error;
  }
}
async function getAllMoshafWays({ lang = "ara" }) {
  try {
    const reciters = await MP3_QURAN({
      url: ENDPOINTS.moshaf,
      params: { lang },
    });
    return reciters.data;
  } catch (error) {
    throw error;
  }
}
async function getAllRecitersRecentReads({ lang = "ara" }) {
  try {
    const reciters = await MP3_QURAN({
      url: ENDPOINTS.recent_reads,
      params: { lang },
    });
    return reciters.data;
  } catch (error) {
    throw error;
  }
}
async function getAllQuranLiveChannels({ lang = "ara" }) {
  try {
    const reciters = await MP3_QURAN({
      url: ENDPOINTS.liveTv,
      params: { lang },
    });
    return reciters.data;
  } catch (error) {
    throw error;
  }
}
async function getAllQuranRadios({ lang = "ara" }) {
  try {
    const reciters = await MP3_QURAN({
      url: ENDPOINTS.recent_reads,
      params: { lang },
    });
    return reciters.data;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  getAllReciters,
  getAllSuwar,
  getAllMoshafWays,
  getAllRecitersRecentReads,
  getAllQuranLiveChannels,
  getAllQuranRadios,
};
