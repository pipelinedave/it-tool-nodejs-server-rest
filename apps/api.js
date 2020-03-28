const express = require('express');
const router = express.Router();

// */api
router.get('/', (req, res) => {
  return res.status(200).json([
    {
      api: 'it-tool-rest',
      uptime: process.uptime(),
      reqheader: req.header,
    },
  ]);
});

module.exports = router;