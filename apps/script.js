const express = require("express");
const router = express.Router();
const scriptutil = require("../util/scriptutil");

// */script
router.get(["/", "/:script"], async (req, res) => {
  try {
    if (scriptmap.get(req.params.script) === undefined) {
      res.send("THIS SCRIPT AINT REAL");
      console.log("ABORT!!");
      return;
    }
    let shell = scriptutil.initShell();

    scriptutil.prepShell(req, shell, req.params.script);

    scriptutil.invokeShell(shell, res);
  } catch (error) {
    console.log(error);
    res.send(error);
  }
});

// */getscript
router.get(["/get", "/:getscript"], async (req, res) => {
  res.send(scriptmap.get(req.params.getscript));
});

module.exports = router;
