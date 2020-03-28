const express = require('express');
const router = express.Router();

// */lab
router.get('/', (req, res) => {
  console.log(req.protocol)
  console.log(req.hostname)
  console.log(req.path)
  console.log(req.originalUrl)
  console.log(req.subomains)
  return res.status(200).json('lab completed.');
});

module.exports = router;