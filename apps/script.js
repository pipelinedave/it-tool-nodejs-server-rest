const express = require("express");
const router = express.Router();
const scriptutil = require("../util/scriptutil");

// */script/run
router.get("/run/:script", async (req, res) => {
  try {
    if (scriptmap.get(req.params.script) === undefined) {
      res.send("THIS SCRIPT AINT REAL");
      console.log("ABORT!!");
      return;
    } else {
      let shell = scriptutil.initShell();
      scriptutil.prepShell(req, shell, req.params.script);
      scriptutil.invokeShell(shell, res);
    }
  } catch (error) {
    console.log(error);
    res.send(error);
  }
});

// */script/get
router.get("/get/:script", async (req, res) => {
  console.log(`getting script ${req.params.script}`);
  res.send(scriptmap.get(req.params.script));
});

module.exports = router;
