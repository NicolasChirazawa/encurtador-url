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

module.exports = { testarConexao, gerarURLs }