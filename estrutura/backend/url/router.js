const express = require('express');
const controller = require('./controller');

const router = express.Router();

router.post('/criarURL', controller.novaURL);

module.exports = router;