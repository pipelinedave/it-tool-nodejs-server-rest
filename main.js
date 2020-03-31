const express = require("express");
const app = express();
const cors = require("cors");
const router = express.Router();
const port = 1337;
const path = require("path");
const scriptdir = path.resolve(__dirname, "./script/");
const fs = require("fs");
const scriptutil = require("./util/scriptutil");

app.use(express.json());
app.use("/", router);
app.use(cors());
router.use(cors());

// *building scriptmap
scriptutil.getScriptMap(scriptdir, fs);

// */
app.get("/", (req, res) => {
  scriptutil.getScriptMap(scriptdir, fs);
  res.status(200).send("OK");
});

// */script
const script = require("./services/script");
router.use("/script", script);

// */data
const data = require("./services/data");
router.use("/data", data);

// */shell
const shell = require("./services/shell");
router.use("/shell", shell);

// */api
const api = require("./services/api");
router.use("/api", api);

// */lab
const lab = require("./services/lab");
router.use("/lab", lab);

module.exports = app.listen(port, () => console.log(`ready.`));
