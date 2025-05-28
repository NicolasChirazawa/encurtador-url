async function gerarURL() {
    removerAba();
    bloquearBotao();

    const url = document.getElementById("texto").value;
    
    let requisicao = await fetch('http://localhost:3000/api/criarURL', {
        body: JSON.stringify({ url_original: url }),
        method: 'POST',
        headers: {
            'Content-Type': 'application/JSON'
        }
    });

    requisicao = await requisicao.json();

    criarAba(requisicao);
    liberarBotao();
}

function criarAba(requisicao) {
    let elemento_pai = document.querySelector('section.principal')
    
    let aba = document.createElement('div');
    let conteudo = document.createElement('p');
    let link = document.createElement('a');

    elemento_pai.appendChild(aba);

    if(requisicao.status === 'Novo') {
        aba.setAttribute('id', 'sucesso');
        conteudo.innerText = 'Foi criado a URL encurtada, segue o link abaixo:';
    }

    if(requisicao.status === 'Repetida') {
        aba.setAttribute('id', 'fracasso');
        conteudo.innerText = 'Já existe uma URL com o link colado:';
    }

    link.innerText = `http://localhost:3000/api/path/${requisicao.url_referencia}`;
    aba.appendChild(conteudo);
    aba.appendChild(link);
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