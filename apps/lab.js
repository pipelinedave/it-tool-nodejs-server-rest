const express = require("express");
const router = express.Router();

const Promise = require("bluebird");
const fs = Promise.promisifyAll(require("fs"));
const path = require("path");

const scriptutil = require("../util/scriptutil");
const scriptdir = path.resolve(__dirname, "../script/");

function toast(param1, param2) {
  return new Promise((resolve, reject) => {
    console.log(param1);
    console.log(param2);
    resolve("woah");
  });
}

// */lab
router.get("/", async (req, res) => {
  // res.send({a: [...a], b: [...b]});
  scriptutil.getScriptMap(scriptdir, fs);
  const output = { scripts: [...scriptmap] };
  console.log({ scripts: [...scriptmap] });
  res.json(output);
});

module.exports = router;
