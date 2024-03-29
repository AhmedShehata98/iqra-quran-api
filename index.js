const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const port = process.env.PORT || 3003;
const recitersRoute = require("./routes/reciters.route");
const moshafRoute = require("./routes/moshafType.route");
const bodyParser = require("body-parser");

app.get("/", (_, res) =>
  res.json({
    message:
      "hello 👋🏻, It's a quran listen API based on ( mp3Quran - tvQuran ) API's",
  })
);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(
  cors({
    origin: "*",
  })
);

app.use("/reciters", recitersRoute);
app.use("/moshaf", moshafRoute);

app.listen(port, () =>
  console.log(`🌐 API server is listening on port: ${port}`)
);
