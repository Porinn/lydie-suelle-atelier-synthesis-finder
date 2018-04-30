const express = require('express');
const router = express.Router();

const data = require('./data.js');

router.get('/getMaterials', data.getMeterials);

module.exports = router;
