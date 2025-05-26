const express = require("express");
const app = express();
const port = process.env.EXPRESS_PORT || 3000;

const db = require('./conexao_postgres').db;
const testeConexaoPostgres = require('./funcoes').testarConexao;

if(testeConexaoPostgres(db) === false) { return };

app.use(express.json());

const urlRouter = require('./url/router.js');
app.use('/api', urlRouter);

app.listen(port, () => {
    console.log(`App de exemplo está rodando na porta ${port}`);
})