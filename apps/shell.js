const express = require('express');
const router = express.Router();

const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'));

const powershell = require('node-powershell');
const shell = new powershell({
  pwsh: true,
  executionPolicy: 'Bypass',
  verbose: true
});


  router.use((req, res, next) => {
    console.log('I am the shell router');
    next();
  });


module.exports = router;