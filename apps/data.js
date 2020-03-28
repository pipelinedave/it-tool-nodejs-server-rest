const express = require("express");
const router = express.Router();

const Promise = require("bluebird");
const fs = Promise.promisifyAll(require("fs"));

// */data
router.get("/", (req, res) => {
  async function getData() {
    const data = await fs.readdirAsync("./data");
    res.send(data);
  }
  return getData();
});

// */data/file
router.get("/:file", (req, res) => {
  async function getFile() {
    const data = await fs.readFileAsync(`./data/${req.params.file}.json`);
    res.send(JSON.parse(data));
  }
  return getFile();
});

module.exports = router;
