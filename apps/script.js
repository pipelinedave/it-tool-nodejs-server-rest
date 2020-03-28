const express = require("express");
const router = express.Router();
const Promise = require("bluebird");
const fs = Promise.promisifyAll(require("fs"));
const scriptutil = require("../util/scriptutil");
const path = require("path");
const scriptdir = path.resolve(__dirname, "../script/");

// *building scriptmap
async function scriptmap() {
  const scriptmap = await scriptutil.getScriptMap(scriptdir, fs);
}
scriptmap();

// */script
router.get(["/", "/:script"], async (req, res) => {
  let shell = scriptutil.initShell();

  scriptutil.prepShell(req, shell, req.params.script);

  scriptutil.invokeShell(shell, res);
});

module.exports = router;
