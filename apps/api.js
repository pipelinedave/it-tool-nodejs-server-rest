const express = require('express');
const router = express.Router();

const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'));


router.use((req, res, next) => {
  console.log('I am the api router');
  next();
});

// */api
router.get('/', (req, res) => {
  res.status(200).json([
    {
      api: 'it-tool-rest',
      uptime: process.uptime(),
      reqheader: req.header,
    },
  ]);
});

module.exports = router;