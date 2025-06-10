class estrutura_URL {
    constructor(url_original, url_referencia, status, mensagem) {
        this.url_original = url_original;
        this.url_referencia = url_referencia;
        this.status = status;
        this.mensagem = mensagem;
    }
}

module.exports = { estrutura_URL }