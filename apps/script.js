const express = require("express");
const router = express.Router();
const fs = require("fs");
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
  try {
    let shell = scriptutil.initShell();

    scriptutil.prepShell(req, shell, req.params.script);

    scriptutil.invokeShell(shell, res);
  } catch (error) {
    res.end();
  }
});

module.exports = router;
