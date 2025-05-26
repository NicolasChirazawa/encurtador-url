async function testarConexao(db) {
    try {
        let conexao = await db.connect();
        console.log('Conexão realizada com o Postgres');
        conexao = conexao.done();

        return true;
    } catch(e) {
        console.log(e.message);

        return false;
    }
}

function gerarURLs() {
    const crypto = require('crypto');
    const url_curta = crypto.randomBytes(10).toString('base64url');

    return url_curta;
}

function gerarDiaAtual() {
    const data_agora = new Date;

    let dia = String(data_agora.getDate());
    let mes = String(data_agora.getMonth() + 1);
    const ano = data_agora.getFullYear();

    if(dia.length < 2) { dia = '0' + dia }
    if(mes.length < 2) { mes = '0' + mes } 

    data_agora_formatada = ano + '-' + mes + '-' + dia
    return data_agora_formatada;
}

module.exports = { testarConexao, gerarURLs, gerarDiaAtual }