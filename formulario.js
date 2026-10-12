document.addEventListener("DOMContentLoaded", function () {
    const botaoFormulario = document.getElementById("botaoformulariohtml");
    if (botaoFormulario) {
        botaoFormulario.classList.add("nav-active");
    }

    const formulario = document.getElementById("formularioProjeto");
    if (!formulario) {
        return;
    }

    const chaveArmazenamento = "formularioProjetoDados";
    const campos = Array.from(formulario.querySelectorAll("input[name]"));
    let dadosSalvos = {};
    const dadosBrutos = localStorage.getItem(chaveArmazenamento);

    if (dadosBrutos !== null) {
        try {
            const dadosAnalisados = JSON.parse(dadosBrutos);
            if (dadosAnalisados && typeof dadosAnalisados === "object" && !Array.isArray(dadosAnalisados)) {
                dadosSalvos = dadosAnalisados;
            } else {
                console.error("Os dados salvos do formulário têm um formato inválido.");
            }
        } catch (erro) {
            console.error("Não foi possível ler os dados salvos do formulário.", erro);
        }
    }

    console.log("Conteúdo armazenado do formulário no localStorage:", dadosSalvos);

    campos.forEach((campo) => {
        if (typeof dadosSalvos[campo.name] === "string") {
            campo.value = dadosSalvos[campo.name];
        }
    });

    const campoData = document.getElementById("dataProjeto");
    if (campoData && !campoData.value) {
        const hoje = new Date();
        const ano = hoje.getFullYear();
        const mes = String(hoje.getMonth() + 1).padStart(2, "0");
        const dia = String(hoje.getDate()).padStart(2, "0");
        campoData.value = `${ano}-${mes}-${dia}`;
    }

    function salvarDadosFormulario() {
        const dados = Object.fromEntries(campos.map((campo) => [campo.name, campo.value]));
        try {
            localStorage.setItem(chaveArmazenamento, JSON.stringify(dados));
        } catch (erro) {
            console.error("Não foi possível salvar os dados do formulário no armazenamento local.", erro);
        }
    }

    const botaoLimpar = document.getElementById("botaoLimparFormulario");
    if (botaoLimpar) {
        botaoLimpar.addEventListener("click", function () {
            campos.forEach((campo) => {
                if (campo.name !== "dataProjeto") {
                    campo.value = "";
                }
            });
            salvarDadosFormulario();
        });
    }

    formulario.addEventListener("input", salvarDadosFormulario);
    formulario.addEventListener("change", salvarDadosFormulario);
    salvarDadosFormulario();
});
