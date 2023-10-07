window.onload = function (e) {
    var b_cadastro = document.getElementById('b_cadastro');
    var txt_nome = document.getElementById('txt_nome');
    var txt_cpf = document.getElementById('txt_cpf');
    var slc_genero = document.getElementById('slc_genero');
    var txt_celular = document.getElementById('txt_cel');
    var txt_email = document.getElementById('txt_email');
    var txt_senha = document.getElementById('txt_senha');

    txt_nome.focus();

    b_cadastro.onclick = function (e) {
        e.preventDefault();

        var nome = txt_nome.value;
        var cpf = txt_cpf.value;
        var genero = slc_genero.value;
        var celular = txt_celular.value;
        var email = txt_email.value;
        var senha = txt_senha.value;

        if (nome == "") { exibir_msg_erro("Informe o seu nome.") }
        else if (cpf == "") { exibir_msg_erro("Informe o seu cpf.") }
        else if (celular == "") { exibir_msg_erro("Informe o seu celular.") }
        else if (email == "") { exibir_msg_erro("Informe o seu email.") }
        else if (senha == "") { exibir_msg_erro("Crie uma senha.") }
        else { cadastrar(nome, cpf, genero, celular, email, senha) }
    };
    function exibir_msg_erro(mensagem) {
        var spn_erro = document.getElementById('spn_erro');
        spn_erro.innerText = mensagem;
        spn_erro.style.display = "block";
        setTimeout(function () {
            spn_erro.style.display = "none";
        }, 5000);
    }

    function cadastrar(nome, cpf, genero, celular, email, senha) {

        
        var data = JSON.stringify({
            "nome": nome,
            "cpf": cpf,
            "genero": genero,
            "celular": celular,
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
                    exibir_msg_erro(result.mensagem);
                }
            }
        });

        xhr.open("POST", "http://localhost:5009/api/usuario/cadastro");
        xhr.setRequestHeader("Content-Type", "application/json");

        xhr.send(data);
    }
}