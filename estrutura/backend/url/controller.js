const bd = require('../conexao_postgres.js').db;
const estrutura_URL = require('./model').estrutura_URL;

const novaURL = (async function(req, res) {
    const { url_original, url_customizada } = req.body;

    // Verificar como inserir CORS através do res.setHeader(https://www.geeksforgeeks.org/how-to-set-response-header-on-express-js-assets/)

    let buscaURLoriginalRepetida = await bd.oneOrNone({
        text: 'SELECT url_original, url_referencia FROM url WHERE url_original = $1',
        values: url_original
    });

    if(buscaURLoriginalRepetida !== null) { 
        const urlRepetida = new estrutura_URL(buscaURLoriginalRepetida.url_original, buscaURLoriginalRepetida.url_referencia, 'Repetida');

        return res.status(400).send(urlRepetida);
    }

    let urlReferencia;

    if(url_customizada === undefined) {
        const gerarURL = require('../funcoes').gerarURLs;

        let testeURLrepetida = true;
        while(testeURLrepetida) {
            urlReferencia = gerarURL();

            const buscarBancoURLreferencia = await bd.oneOrNone({
            text: 'SELECT url_referencia FROM url WHERE url_referencia = $1',
            values: urlReferencia
            });

            if(buscarBancoURLreferencia === null) { testeURLrepetida = false }
        }
    } else if (url_customizada !== undefined) {
        const buscaURLcustomizadaRepetida = await bd.oneOrNone({
            text: 'SELECT url_original, url_referencia FROM url WHERE url_referencia = $1',
            values: url_customizada
        });

        if(buscaURLcustomizadaRepetida !== null) {
            const urlPersonalizaRepetida = new estrutura_URL(buscaURLcustomizadaRepetida.url_original, buscaURLcustomizadaRepetida.url_referencia, 'Repetida');
            return res.status(400).send(urlPersonalizaRepetida);
        }

        urlReferencia = url_customizada;
    }

    const gerarDateHoje = require('../funcoes.js').gerarDiaAtual;
    const data_hoje = gerarDateHoje();

    const bancoInserirURLreferencia = await bd.one({
        text: 'INSERT INTO url (url_original, url_referencia, data_criada) VALUES ($1, $2, $3) RETURNING url_original, url_referencia',
        values: [url_original, urlReferencia, data_hoje]
    })

    let estruturaNovaURL = new estrutura_URL(bancoInserirURLreferencia.url_original, bancoInserirURLreferencia.url_referencia, 'Novo');
    
    return res.status(201).send(estruturaNovaURL);
});

const redirecionamentoURL = (async function (req, res) {
    let procurarURLoriginal = await bd.oneOrNone({
        text: 'SELECT url_Original FROM url WHERE url_Referencia = $1',
        values: req.params.rota
    });

    if(await procurarURLoriginal === null) { 
        console.log(procurarURLoriginal)
        return res.status(404).send();
    }

    return res.status(301).redirect(procurarURLoriginal.url_original);
})

module.exports = { novaURL, redirecionamentoURL }