window.onload = function (e) {
    var login = document.getElementById('b_entrar');
    var txt_email = document.getElementById("txt_email");
    var txt_senha = document.getElementById("txt_senha");
    txt_email.focus();
    login.onclick = function (e) {
        e.preventDefault();

        var email = txt_email.value;
        var senha = txt_senha.value;

        if (email == "") {
            exibir_mensagem_erro("Campo e-mail obrigatório");
        }
        else if (senha == "") {
            exibir_mensagem_erro("Campo senha obrigatório");
        }
        else {
            realizar_login(email, senha);
        }
    }
    function exibir_mensagem_erro(mensagem) {
        var spn_erro = document.getElementById("spn_erro");
        spn_erro.innerText = mensagem;
        spn_erro.style.display = "block";
        setTimeout(function () { spn_erro.style.display = "none"; }, 5000);
    }

    function realizar_login(email, senha) {

        var data = JSON.stringify({
            "email": email,
            "senha": senha
        });

        var xhr = new XMLHttpRequest();
        xhr.withCredentials = true;

        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {

                var result = JSON.parse(this.responseText);

                if (result.sucesso) {
                    localStorage.setItem("usuarioGuid", result.usuarioGuid);
                    window.location.href = "home.html";
                }
                else {
                    exibir_mensagem_erro(result.mensagem);
                }
            }
        });

        xhr.open("POST", "http://localhost:5009/api/usuario/login");
        xhr.setRequestHeader("Content-Type", "application/json");

        xhr.send(data);
    }

}