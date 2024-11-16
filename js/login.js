const verificaSenha = () => {
    const entrada = document.getElementById("password").value
    const senha = "b427d8b97526e30ef1adc00d1b9ae82b16af9716326685beebb6e83e6a0789ea"
    
    if (senha === hex_sha256(entrada)) {
        sessionStorage.setItem("logado", "sim")
        window.location.href = "principal.html";

    } else {
        alert("Senha incorreta.")
    }
}
