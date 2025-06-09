class estrutura_URL {
    constructor(url_original, url_referencia, status) {
        this.url_original = url_original;
        this.url_referencia = url_referencia;
        this.status = status;
    }
}

class estrutura_URL_fracasso {
    constructor(status, mensagem, valida) {
        this.status = status;
        this.mensagem = mensagem;
        this.valida = valida;
    }
}

module.exports = { estrutura_URL, estrutura_URL_fracasso }