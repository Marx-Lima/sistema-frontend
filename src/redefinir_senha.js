window.onload = function (e) {
    var txt_email = document.getElementById('txt_email');
    txt_email.focus();

    var form = document.getElementById("frm_redefinir");
    form.onsubmit = function (e) {
        e.preventDefault();

        var email = txt_email.value;

        if (email == "") {
            var mensagem = "Email obrigatório"
            exibir_mensagem_erro(mensagem);
        }
        else {
            redefinir_senha(email);
        }
    };

    function exibir_mensagem_erro(mensagem) {
        var spn_erro = document.getElementById("spn_erro");
        spn_erro.innerText = mensagem;
        spn_erro.style.display = "block";
        setTimeout(function () { spn_erro.style.display = "none"; }, 5000);
    }
    function redefinir_senha(email) {
        var data = JSON.stringify({
            "email": email
        });

        var xhr = new XMLHttpRequest();
        xhr.withCredentials = true;

        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {

                var result = JSON.parse(this.responseText);

                if (result.sucesso) {
                    "Email enviado com sucesso!";
                }
                else {
                    exibir_mensagem_erro(result.mensagem);
                }
            }
        });

        xhr.open("POST", "http://localhost:5009/api/usuario/esqueceu_senha");
        xhr.setRequestHeader("Content-Type", "application/json");

        xhr.send(data);
    }
}