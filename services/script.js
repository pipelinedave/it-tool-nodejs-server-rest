const express = require("express");
const router = express.Router();
const scriptutil = require("../util/scriptutil");
const path = require("path");
const scriptdir = path.resolve(__dirname, "../script/");

// */script/run
router.get(["/run/:script", "/run/:script/:parameter"], async (req, res) => {
  try {
    //* input validation happens here so we can be agile and also dont init a shell if input is invalid
    if (scriptmap.get(req.params.script) === undefined) {
      console.log("Invalid script name provided. Aborting.");
      res.send("Invalid script name provided. Aborting.");
      return;
    } else {
      let script = `${scriptdir}\\${req.params.script}`;
      if (!script.includes(".ps1")) script = `${script}.ps1`;
      if (!(req.params.parameter === undefined))
        script = `${script} ${req.params.parameter}`;
      console.log(script);

      let shell = scriptutil.initShell();
      scriptutil.prepShell(req, shell, script);
      scriptutil.invokeShell(shell, res);
    }
  } catch (error) {
    console.log(error);
    res.send(error);
  }
});

// */script/get
router.get("/get/:script", (req, res) => {
  console.log(`getting script ${req.params.script}`);
  res.json(scriptmap.get(req.params.script));
});

module.exports = router;
