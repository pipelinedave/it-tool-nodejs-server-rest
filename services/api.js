const express = require('express');
const router = express.Router();

// */api
router.get('/', (req, res) => {
  let stuff = [
    {
      name: 'dawg', 
      data: 'it-tool-rest',
    },
    {
      name: 'uptime',
      data: `${process.uptime()}`,
    },
    {
      name: 'lmao', 
      data: 'LEL'
    }
  ]
  return res.status(200).json(stuff);
});

module.exports = router;