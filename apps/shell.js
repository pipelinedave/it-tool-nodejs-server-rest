const express = require('express');
const router = express.Router();

const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'));

const Powershell = require('node-powershell');
// ?Test having the shell be launched on demand rather than autoinit


// */shell
router.get(['/', '/:command'], (req, res) => {
  async function executeCommand() {
    let shell = new Powershell({
      pwsh: true,
      executionPolicy: 'Bypass',
      verbose: true,
    });

    console.log(req.params.command);

    if(req.params.command === undefined) shell.addCommand('Write-Output @($PSVersionTable)');
    else shell.addCommand(req.params.command);

    await shell.invoke().then(output => {
      console.log(output);
      res.json(output);
    }).catch(err => {
      console.log(err);
    });

    await shell.dispose();
    res.end();
  };
  return executeCommand();
});


module.exports = router;