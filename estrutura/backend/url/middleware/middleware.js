const estrutura_URL = require('../model').estrutura_URL;

const verificacao_url = (async function (req, res, next) {
    let { url_original, url_customizado = undefined } = req.body;

    if(url_original === '') {

        let url_invalida = new estrutura_URL('', '', 'Erro', 'Insira uma URL');
        
        return res.status(400).send(url_invalida);
    }

    if(url_customizado !== undefined) {
        
        if(url_customizado === '') {
            
            let url_invalida = new estrutura_URL('', '', 'Erro', 'Insira a URL personalizada');
        
            return res.status(400).send(url_invalida);
        }

        if(url_customizado.length > 14) {
            let url_invalida = new estrutura_URL('', '', 'Erro', 'O tamanho limite da URL é 14');
        
            return res.status(400).send(url_invalida);
        }

        for(let i = 0; i < url_customizado.length; i++) {
            let caractere_codigo = url_customizado[i].charCodeAt(0);

            if(!(caractere_codigo == 45 || 
                (caractere_codigo >= 48 && caractere_codigo <= 57) || 
                (caractere_codigo >= 65 && caractere_codigo <= 90) ||
                (caractere_codigo == 95) ||
                (caractere_codigo >= 97 && caractere_codigo <= 122))) {
                
                let url_invalida = new estrutura_URL('', '', 'Erro', 'Caractere inválido');

                return res.status(400).send(url_invalida);
            }
        }
    }

    next();
})

module.exports = { verificacao_url }