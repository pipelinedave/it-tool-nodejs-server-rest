const express = require("express");
const router = express.Router();
const scriptutil = require("../util/scriptutil");

// */shell
router.get("/:command", async (req, res) => {
  let shell = scriptutil.initShell();
  scriptutil.prepShell(req, shell, req.params.command);
  scriptutil.invokeShell(shell, res);
});

module.exports = router;
