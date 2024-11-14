const container = document.getElementById("container")

const pega_json = async (caminho) => {
    const resposta = await fetch(caminho);
    const dados = await resposta.json();
    return dados;
}

const manipulaClick = (evento) => {
    const id = evento.currentTarget.dataset.id
    const nome = evento.currentTarget.dataset.nome
    const desc = evento.currentTarget.dataset.desc

    // Criando cookies de quem foi clicado (ficam disponíveis em todo o site)
    document.cookie = `id=${id}`
    document.cookie = `nome=${nome}`
    document.cookie = `desc=${desc}`
    
    // Session
    sessionStorage.setItem("id", id)
    sessionStorage.setItem("atleta", JSON.stringify(evento.currentTarget.dataset))

    // Local
    localStorage.setItem("id", id)
    localStorage.setItem("atleta", JSON.stringify(evento.currentTarget.dataset))


    window.location = `detalhes.html?id=${id}`
}

const montaCard = (atleta) => {
    const cartao = document.createElement("div");
    cartao.classList.add("cartao")
    const nome = document.createElement("h1");
    const imagem = document.createElement("img");
    const desc = document.createElement("p");
    const link = document.createElement("a");


    nome.innerHTML = atleta.nome;
    cartao.appendChild(nome);
    
    imagem.src = atleta.imagem;
    cartao.appendChild(imagem);

    desc.innerHTML = atleta.detalhes;
    cartao.appendChild(desc);

    // link.innerHTML = "Saiba mais..."
    // link.href = `detalhes.html?id=${atleta.id}`
    // cartao.appendChild(link)

    cartao.dataset.id = atleta.id;
    cartao.dataset.nome = atleta.nome;
    cartao.dataset.desc = atleta.detalhes;

    cartao.onclick = manipulaClick;

    container.appendChild(cartao)
}

const urls = {
    all: "https://botafogo-atletas.mange.li/2024-1/all",
    masculino: "https://botafogo-atletas.mange.li/2024-1/masculino",
    feminino: "https://botafogo-atletas.mange.li/2024-1/feminino",
  };



let allData = [];
let masculinoData = [];
let femininoData = [];



pega_json("https://botafogo-atletas.mange.li/2024-1/all").then(
    (retorno) => {
        retorno.forEach((atleta) => montaCard(atleta))
    }
)

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