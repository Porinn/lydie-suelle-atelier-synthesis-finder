const express = require('express');
const router = express.Router();

const data = require('./data.js');

router.get('/getData', data.getData);
router.post('/calculate', data.calculate);

module.exports = router;
