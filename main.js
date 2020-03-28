const express = require('express');

const app = express();
const router = express.Router();

const port = 1337;

app.use(express.json());
app.use('/', router);

// */
app.get('/', (req, res) => {
  res.status(200).send('OK');
});

// */data
const data = require('./apps/data');
router.use('/data', data);

// */shell
const shell = require('./apps/shell');
router.use('/shell', shell);

// */api
const api = require('./apps/api');
router.use('/api', api);

// */lab
const lab = require('./apps/lab');
router.use('/lab', lab);


module.exports = app.listen(port, () => console.log(`ready.`));

