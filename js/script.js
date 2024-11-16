const container = document.getElementById("container")

const div_atletas = document.querySelector(".div-atletas")

const buscaInput = document.getElementById("buscaInput")

const pega_json = async (caminho) => {
    const resposta = await fetch(caminho);
    const dados = await resposta.json();
    return dados;
}

const manipulaClick = (evento) => {
    const id = evento.currentTarget.dataset.id

    window.location = `detalhes.html?id=${id}`
}

const montaCard = (atleta) => {
    const cartao = document.createElement("div");
    cartao.classList.add("cartao")
    const nome = document.createElement("h1");
    const imagem = document.createElement("img");
    const link = document.createElement("a");


    nome.innerHTML = atleta.nome;
    cartao.appendChild(nome);
    
    imagem.src = atleta.imagem;
    cartao.appendChild(imagem);

 
    // link.innerHTML = "Saiba mais..."
    // link.href = `detalhes.html?id=${atleta.id}`
    // cartao.appendChild(link)

    cartao.dataset.id = atleta.id;
    cartao.dataset.nome = atleta.nome;

    cartao.onclick = manipulaClick;

    div_atletas.appendChild(cartao)
}




const elencoCompleto = () => {
    pega_json("https://botafogo-atletas.mange.li/2024-1/all").then((retorno) => { atletas = retorno; exibirAtletas(atletas) })
}

const masculino = () => {
    pega_json("https://botafogo-atletas.mange.li/2024-1/masculino").then((retorno) => { atletas = retorno; exibirAtletas(atletas) })
}
const feminino = () => {
    pega_json("https://botafogo-atletas.mange.li/2024-1/feminino").then((retorno) => { atletas = retorno; exibirAtletas(atletas) })
}

const select = () => pega_json(`https://botafogo-atletas.mange.li/2024-1/${select.value}`).then((retorno) => { atletas = retorno; exibirAtletas(atletas) })
const buscaNome= () => exibirAtletas(atletas, buscaInput.value)






const exibirAtletas = (atletas, entrada = "") => {
    const container = document.querySelector(".div-atletas")
    container.innerHTML = ""

    atletas.forEach((atleta) => {
        if (entrada == "") { montaCard(atleta) }
        if (entrada != "") {
            if (atleta.nome.toLowerCase().includes(entrada.toLowerCase())) { montaCard(atleta) }
        }
    })
}

const verificaSenha = () => {
    const entrada = document.getElementById("password").value
    const senha = "b427d8b97526e30ef1adc00d1b9ae82b16af9716326685beebb6e83e6a0789ea"
    
    if (senha === hex_sha256(entrada)) {
        sessionStorage.setItem("logado", "sim")
        alert("Senha correta. Logado")
        window.location.href = "index.html";

    } else {
        alert("Senha incorreta.")
    }
}

document.getElementById("logout").onclick = () => {
    sessionStorage.removeItem("logado")
    window.location.href = "login.html";
    alert("Saiu!")
}

