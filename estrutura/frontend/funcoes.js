let customizado_status = false;

function ativacaoEsquerda() {
    const botao_1 = document.getElementById('fix');
    const botao_2 = document.getElementById('fix_2');
    
    const campo = document.getElementById('wrapper');
    const placeholder = document.getElementById('texto_url');
    const texto = document.getElementById('personalizada');

    if(customizado_status === true) {
        campo.setAttribute('class', 'desativado_1');
        placeholder.setAttribute('class', 'desativado_2');
        texto.setAttribute('class', 'desativado_3');

        texto.value = '';
        texto.setAttribute('readonly', 'readonly')

        botao_2.removeAttribute('class');
        botao_1.setAttribute('class', 'ativo');

        customizado_status = false;
    }
}

function ativacaoDireita() {
    const botao_1 = document.getElementById('fix');
    const botao_2 = document.getElementById('fix_2')

    const campo = document.getElementById('wrapper');
    const placeholder = document.getElementById('texto_url');
    const texto = document.getElementById('personalizada');

    if(customizado_status === false) {
        campo.removeAttribute('class');
        placeholder.removeAttribute('class');
        texto.removeAttribute('class');

        texto.removeAttribute('readonly');

        botao_1.removeAttribute('class');
        botao_2.setAttribute('class', 'ativo');
        
        customizado_status = true;
    }
}

async function gerarURL() {
    removerAba();
    bloquearBotao();
    
    const url_original = document.getElementById("texto").value;
    let url_customizado = document.getElementById('personalizada').value;
    
    if(url_customizado == '') { url_customizado = undefined }

    const teste_condicoes = eURLValida(url_original, url_customizado);

    if(teste_condicoes.status === 'Erro') {
        criarAba(teste_condicoes);
        liberarBotao();
        return;
    }

    let url_gerada = await criarURLCurta(url_original, url_customizado);
    if(url_gerada.status != 'Erro') {
        url_gerada = await url_gerada.json();
    }
    
    criarAba(url_gerada);
    liberarBotao();
    return;
}

function eURLValida(url_link, url_customizado) {

    if(url_link === '') {
        return {
            status: 'Erro',
            mensagem: 'Insira uma URL'
        }
    }

    if(url_customizado !== undefined) {
        
        if(url_customizado === '') {
            return {
                status: 'Erro',
                mensagem: 'Insira a URL personalizada'
            }
        }

        if(url_customizado.length > 14) {
            return {
                status: 'Erro',
                mensagem: 'O tamanho limite da URL é 14'
            }
        }

        for(let i = 0; i < url_customizado.length; i++) {
            let caractere_codigo = url_customizado[i].charCodeAt(0);

            if(!(caractere_codigo == 45 || 
                (caractere_codigo >= 48 && caractere_codigo <= 57) || 
                (caractere_codigo >= 65 && caractere_codigo <= 90) ||
                (caractere_codigo == 95) ||
                (caractere_codigo >= 97 && caractere_codigo <= 122))) {
                return {
                    status: 'Erro',
                    mensagem: 'Caractere inválido'
                }
            }
        }
    }

    return {
        status: 'Válido'
    }
}

function criarAba(resposta) {
    let elemento_pai = document.querySelector('section.principal')
    
    let aba = document.createElement('div');
    let conteudo = document.createElement('p');
    let link = document.createElement('a');

    elemento_pai.appendChild(aba);

    switch (resposta.status) {
        case 'Erro':
            aba.setAttribute('id', 'fracasso');
            conteudo.innerText = 'Ocorreu um erro durante a requisição';
            link.innerText = resposta.mensagem;
        break;

        case 'Novo':
            aba.setAttribute('id', 'sucesso');
            conteudo.innerText = 'Foi criado a URL encurtada, segue o link abaixo:';
            link.innerText = resposta.mensagem;
        break;

        case 'Repetida':
            aba.setAttribute('id', 'fracasso');
            conteudo.innerText = 'Já existe uma URL com o link colado:';
            link.innerText = resposta.mensagem;
        break;
    }

    aba.appendChild(conteudo);
    aba.appendChild(link);
    return;
}

async function criarURLCurta(url_link, url_customizado) {
    try {
        let request = await fetch('http://localhost:3000/api/criarURL', {
            body: JSON.stringify({ 
                url_original: url_link,
                url_customizado: url_customizado
             }),
            method: 'POST',
            headers: {
                'Content-Type': 'application/JSON'
            },
            signal: AbortSignal.timeout(5000)
        });

        return request;
    } catch (error) {
        console.log(error);

        return { 
            status: 'Erro',
            mensagem: 'Tempo limite do request'
        }
    }
}

function removerAba() {
    let aba_1 = document.getElementById('sucesso');
    let aba_2 = document.getElementById('fracasso');

    if(aba_1 !== null) { aba_1.remove() }
    if(aba_2 !== null) { aba_2.remove() }
}

function bloquearBotao() {
   let botao = document.getElementById('botao');
   botao.disabled = true;
   botao.setAttribute('id', 'desabilitado');
}

function liberarBotao() {
    let botao = document.getElementById('desabilitado');

    botao.removeAttribute('disabled');
    botao.setAttribute('id', 'botao');
}