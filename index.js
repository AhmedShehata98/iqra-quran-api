const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const port = process.env.PORT || 3003;
const recitersRoute = require("./routes/reciters.route");

app.get("/", (_, res) =>
  res.json({ message: " It's a mp3Quran and tvQuran based api" })
);
app.use(
  cors({
    origin: "*",
  })
);
app.use("/reciters", recitersRoute);

app.listen(port, () =>
  console.log(`Express server listening on http://localhost:${port}`)
);
