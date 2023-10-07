window.onload = function (e) {

    var usuarioGuid = localStorage.getItem("usuarioGuid");

    if (usuarioGuid == null) {
        window.location.href = "login.html";
    }
    else {
        obterUsuario(usuarioGuid);
    }

    var lnkSair = document.getElementById("lnkSair");
    lnkSair.onclick = function (e) {
        localStorage.removeItem("usuarioGuid");

        window.location.href = "login.html"
    }

    function obterUsuario(usuarioGuid) {
        var xhr = new XMLHttpRequest();
        xhr.withCredentials = true;

        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {
                var result = JSON.parse(this.responseText);

                if (result.sucesso) {
                    //sucesso
                    var spnMensagem = document.getElementById("spnMensagem");

                    spnMensagem.innerText = "Bem-Vindo(a) ao sistema " + result.nome;
                }
                else {
                    window.location.href = "login.html";
                }
            }
        });

        xhr.open("GET", "http://localhost:5009/api/usuario/obterUsuario?usuarioGuid=" + usuarioGuid);

        xhr.send();
    }
}