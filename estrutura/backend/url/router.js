const express = require('express');

const middleware = require('./middleware/middleware');
const controller = require('./controller');

const router = express.Router();

router.post('/criarURL',   middleware.verificacao_url, controller.novaURL);
router.get ('/path/:rota', controller.redirecionamentoURL);

module.exports = router;