const express = require('express');
const router = express.Router();

const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'));


router.use((req, res, next) => {
  console.log('I am the data router');
  next();
});

// */data
router.get('/', (req, res) => {
  async function getData() {
    const data = await fs.readdirAsync('./data');
    console.log(data);
    res.send(data);
  }
  getData();
});

// */data/file
router.get('/:file', (req, res) => {
  async function getFile() {
    const data = await fs.readFileAsync(`./data/${req.params.file}.json`);
    res.send(JSON.parse(data));
  }
  getFile();
});

module.exports = router;