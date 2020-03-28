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

    shell.addCommand(req.params.command).catch(err => {
      shell.addCommand('$PSVersionTable');
    });

    await shell.invoke().then(output => {
      console.log(output);
      res.send(output);
    }).catch(err => {
      console.log(err);
    });

    await shell.dispose();
    res.end();
  };
  executeCommand();
});


module.exports = router;