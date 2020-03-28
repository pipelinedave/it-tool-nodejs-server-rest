const express = require("express");
const router = express.Router();

const Powershell = require("node-powershell");

const fallbackcommand = "Write-Output @($PSVersionTable)";

// */shell
router.get(["/", "/:command"], (req, res) => {
  async function executeCommand() {
    let shell = new Powershell({
      pwsh: true,
      executionPolicy: "Bypass",
      verbose: true
    });

    console.log(req.params.command);

    if (req.params.command === undefined) shell.addCommand(fallbackcommand);
    else shell.addCommand(req.params.command);

    await shell
      .invoke()
      .then(output => {
        console.log(output);
        res.json(output);
      })
      .catch(err => {
        console.log(err);
      });

    await shell.dispose();
    res.end();
  }
  return executeCommand();
});

module.exports = router;
