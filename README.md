<div align=center>
  <img src="https://img.shields.io/static/v1?label=%20&labelColor=fffdaf&message=Javascript&color=grey&style=for-the-badge&logo=javascript&logoColor=black"/>
  <img src="https://img.shields.io/static/v1?label=%20&labelColor=d1ffbd&message=Node.JS&color=grey&style=for-the-badge&logo=node.js&logoColor=black"/>
  <img src="https://img.shields.io/static/v1?label=%20&labelColor=white&message=Express.JS&color=grey&style=for-the-badge&logo=express&logoColor=black"/>
  <img src="https://img.shields.io/static/v1?label=%20&labelColor=9fb6fd&message=Postgres&color=grey&style=for-the-badge&logo=postgreSQL&logoColor=black"/>
</div> <br>

<div align="center">
 • <a href=#descricao>Descrição</a> • <a href=#inicializar>Inicializar</a> • <a href=#endpoint>Endpoint</a> • <a href=#bd>Banco de Dados</a> • <a href=#lista_ideais>Lista de Ideias</a> •
</div>

<h2 name="descricao">💻 Descrição</h2>
Um estudo para o desenvolvimento de um Encurtador de URLs em Node.JS.

<h3>Funcionalidades</h3>
• Criar URLs encurtadas genéricas; <br>
• Criar URLs encurtadas personalizadas; <br>
• Redirecionar URLs; <br>

<h2 name="inicializar">🚀 Iniciando</h2>
Passos para utilizar deste projeto: <br>

<div align="center"><h6>/ Instalações dos Softwares / Baixar o projeto / Configurar as variáveis de ambiente / Inicializar o projeto /</h6></div>


<h3>Softwares necessários</h3>

• <a href="https://nodejs.org/dist/v22.14.0/node-v22.14.0-x64.msi">Node.JS</a>; <br>
• <a href="https://code.visualstudio.com/Download">PostgreSQL</a>; <br>
<h6>Recomendação: Um editor de código: <a href="https://code.visualstudio.com/sha/download?build=stable&os=win32-x64-user">Visual Studio Code</a>; </h6>
<h6>Recomendação: Um API Cliente para manejar as requisições, como o: <a href="https://dl.pstmn.io/download/latest/win64">Postman</a> 
  ou o <a href="https://updates.insomnia.rest/downloads/windows/latest?app=com.insomnia.app">Insomnia</a>; </h6>

<h3>Meios de acessar o projeto</h3>

Clone o projeto ou <a href="https://github.com/NicolasChirazawa/encurtador-url/archive/refs/heads/main.zip">baixe-o</a>; <br>

```
gh repo clone NicolasChirazawa/API-postgres
```

<h3>Definindo as variáveis de ambientes...</h3>

Use o arquivo <b>'.env-teste'</b> de referência para criar o seu próprio <b>'.env'</b>, 
e defina as seguintes variáveis de acordo a descrição.
```
EXPRESS_PORT= /* Porta do Projeto */

HOST= /* Configurações do Banco */
POSTGRES_PORT= /* Configurações do Banco */
DATABASE= /* Configurações do Banco */
USER= /* Configurações do Banco */
PASSWORD= /* Configurações do Banco */
```

<h3>Como inicializar o projeto?</h3>

Na raiz do projeto basta starttar.

```
npm start
```
<h2 name="endpoint">📍 Endpoints API</h2>

| rotas            | descrição                                          |
| ---------------- | :---:                                              |
| `POST/criarURL`  | Cria uma URL encurtada (seja customizada ou não).  |
| `GET/path/:rota` | Direcionador da URL customizada.                   |

<h3>POST/criarURL</h3>

<h4>REQUEST</h4>

```JSON
{
  "url_original": "https://www.youtube.com/@Palpitando_123",
  "url_customizada": "url_unica" // É um parâmetro opcional
}
```

<h4>RESPONSE</h4>

```JSON
{
  "url_original": "https://www.youtube.com/@Palpitando_123",
  "url_referencia": "url_unica",
  "status": "Novo"
}
```

<h2 name="bd">🧱 Banco de dados</h2>
<img src="https://raw.githubusercontent.com/NicolasChirazawa/encurtador-url/refs/heads/main/imagem-read_me/url_encurtada_banco.png"/>

<h2 name="lista_ideais">📋 Lista de ideias</h2>
• Criação do Swagger para documentação da API; <br>
• Desenvolvimento de testes unitários; <br>
