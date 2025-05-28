const express = require('express');
const controller = require('./controller');

const router = express.Router();

router.post('/criarURL', controller.novaURL);
router.get('/path/:rota',      controller.redirecionamentoURL);

module.exports = router;