

// Alerta estilizado para campos obrigatórios do motor, sempre aparece quando 
//os campos não sao preenchidos adequadamente 


function mostrarAlertaMotorObrigatorio() {
    const alerta = document.createElement("div");
    alerta.textContent = "Para registrar os dados do motor, preencha os campos obrigatórios: Corrente de Partida e Tempo de Partida.\nPotência Operante e Corrente Nominal Operante não são obrigatórios.";
    alerta.style.position = "fixed";
    alerta.style.top = "20px";
    alerta.style.right = "-500px";
    alerta.style.background = "linear-gradient(to left, #b6fcb6 80%, #fff 100%)";
    alerta.style.color = "#222";
    alerta.style.padding = "18px 32px";
    alerta.style.borderRadius = "10px";
    alerta.style.boxShadow = "0 2px 12px rgba(0,0,0,0.18)";
    alerta.style.fontWeight = "bold";
    alerta.style.fontSize = "1.1em";
    alerta.style.zIndex = "9999";
    alerta.style.transition = "right 0.5s cubic-bezier(.68,-0.55,.27,1.55), opacity 0.5s";

    document.body.appendChild(alerta);

    setTimeout(() => {
        alerta.style.right = "20px";
    }, 50);

    setTimeout(() => {
        alerta.style.right = "-500px";
        alerta.style.opacity = "0";
        setTimeout(() => {
            alerta.remove();
        }, 500);
    }, 2500);
}



let kva1formatada = 0;
let qtde1formatada = 0;
let imin1formatada = 0;
let intrafo1formatada = 0;
let imagtr1formatada = 0;

let kva2formatada = 0;
let qtde2formatada = 0;
let imin2formatada = 0;
let intrafo2formatada = 0;
let imagtr2formatada = 0;


let imagtotalformatada = 0;
let imagtotalneutroformatada = 0;

function obterJSONStorage(chave, fallback = null) {
    const valorBruto = localStorage.getItem(chave);
    if (!valorBruto) {
        return fallback;
    }

    try {
        return JSON.parse(valorBruto);
    } catch (erro) {
        return fallback;
    }
}

const TABELA_MOTORES_STORAGE_KEY = "tabelaMotoresJSON";

const CAMPOS_TABELA_MOTORES = [
    "motor",
    "cv",
    "potenciaKva",
    "potenciaKw",
    "correnteNominal",
    "ipIn",
    "correntePartida",
    "tempoPartida",
    "mecanismoPartida",
    "potenciaInstalacaoPartida",
    "correnteInstalacao",
    "correnteTotal"
];

function converterNumeroBr(valor) {
    if (valor === null || valor === undefined) {
        return NaN;
    }

    const texto = String(valor).trim();
    if (!texto) {
        return NaN;
    }

    return parseFloat(texto.replace(/\./g, "").replace(",", "."));
}

function montarLinhaMotorDetalhado(dados = {}) {
    const tr = document.createElement("tr");

    CAMPOS_TABELA_MOTORES.forEach((campo, indice) => {
        const td = document.createElement("td");

        if (campo === "correntePartida" || campo === "correnteInstalacao" || campo === "correnteTotal") {
            const label = document.createElement("span");
            label.className = "motor-detalhe-label";
            label.dataset.field = campo;
            td.appendChild(label);
            tr.appendChild(td);
            return;
        }

        const input = document.createElement("input");
        input.type = "text";
        input.className = "motor-detalhe-input";
        input.dataset.field = campo;
        input.value = dados[campo] || "";

        if (indice === 0) {
            input.readOnly = true;
            const wrapper = document.createElement("div");
            wrapper.className = "motor-cell-actions";
            wrapper.appendChild(input);

            const botaoRemover = document.createElement("button");
            botaoRemover.type = "button";
            botaoRemover.className = "motor-remove-row";
            botaoRemover.textContent = "Remover";
            wrapper.appendChild(botaoRemover);

            td.appendChild(wrapper);
        } else {
            td.appendChild(input);
        }

        tr.appendChild(td);
    });

    return tr;
}

function calcularCorrentePartidaLinha(linha) {
    const label = linha.querySelector('[data-field="correntePartida"]');
    if (label) {
        const nominal = converterNumeroBr(linha.querySelector('[data-field="correnteNominal"]')?.value);
        const ipIn = converterNumeroBr(linha.querySelector('[data-field="ipIn"]')?.value);
        label.textContent = (!isNaN(nominal) && !isNaN(ipIn))
            ? (nominal * ipIn).toFixed(2).replace(".", ",")
            : "";
    }

    const labelInstalacao = linha.querySelector('[data-field="correnteInstalacao"]');
    if (labelInstalacao) {
        const potencia = converterNumeroBr(linha.querySelector('[data-field="potenciaInstalacaoPartida"]')?.value);
        const tensao = parseFloat(localStorage.getItem("tensaoSelecionada")) || 0;
        const fatorPotencia = parseFloat(localStorage.getItem("fatorPotenciaSelecionada")) || 0;
        const corrente = potencia / (tensao * fatorPotencia * Math.sqrt(3));
        labelInstalacao.textContent = (isFinite(corrente) && corrente > 0)
            ? corrente.toFixed(2).replace(".", ",")
            : "";
    }

    const labelTotal = linha.querySelector('[data-field="correnteTotal"]');
    if (labelTotal) {
        const partida = converterNumeroBr(label?.textContent);
        const instalacao = converterNumeroBr(labelInstalacao?.textContent);
        const total = (isNaN(partida) ? 0 : partida) + (isNaN(instalacao) ? 0 : instalacao);
        labelTotal.textContent = total > 0 ? total.toFixed(2).replace(".", ",") : "";
    }
}

function coletarTabelaMotoresDetalhada() {
    const tbody = document.getElementById("motor-detalhes-body");
    if (!tbody) {
        return [];
    }

    const linhas = Array.from(tbody.querySelectorAll("tr"));
    const dados = linhas.map((linha) => {
        calcularCorrentePartidaLinha(linha);
        const item = {};
        CAMPOS_TABELA_MOTORES.forEach((campo) => {
            const elemento = linha.querySelector(`[data-field="${campo}"]`);
            item[campo] = elemento ? (elemento.value ?? elemento.textContent).trim() : "";
        });
        return item;
    });

    return dados.filter((linha) => CAMPOS_TABELA_MOTORES.some((campo) => campo !== "motor" && linha[campo] !== ""));
}

function renumerarMotoresTabelaDetalhada() {
    const tbody = document.getElementById("motor-detalhes-body");
    if (!tbody) {
        return;
    }

    tbody.querySelectorAll("tr").forEach((linha, indice) => {
        const input = linha.querySelector('input[data-field="motor"]');
        if (input) {
            input.value = `Motor ${indice + 1}`;
        }
    });
}

// Salvar a tabela de motores detalhados
function salvarTabelaMotoresDetalhada() {
    const dados = coletarTabelaMotoresDetalhada();
    localStorage.setItem(TABELA_MOTORES_STORAGE_KEY, JSON.stringify(dados));
    
    // Sinalização de preenchimento da Tabela 2: considera "Sim" apenas se 
    // houver pelo menos uma linha com TODOS os campos preenchidos.
    const temLinhaCompleta = dados.some(linha => {
        return CAMPOS_TABELA_MOTORES.every(campo => {
            const valor = String(linha[campo] || "").trim();
            return valor !== "";
        });
    });

    // Salva a sinalização de preenchimento
    localStorage.setItem("tabelaMotoresPreenchida", temLinhaCompleta ? "Sim" : "Não");
    
    return dados;
}


// Obter o maior valor de corrente operante na tabela de motores detalhados
function obterMaiorCorrenteOperanteTabelaDetalhada(motoresDetalhados) {
    if (!Array.isArray(motoresDetalhados) || motoresDetalhados.length === 0) {
        return 0;
    }

    let maior = 0;

    motoresDetalhados.forEach((motor) => {
        const correnteTotal = converterNumeroBr(motor.correnteTotal);
        const correntePartida = converterNumeroBr(motor.correntePartida);
        const correnteInstalacao = converterNumeroBr(motor.correnteInstalacao);

        if (!isNaN(correnteTotal) && correnteTotal > maior) {
            maior = correnteTotal;
            return;
        }

        if (!isNaN(correntePartida) && !isNaN(correnteInstalacao)) {
            const soma = correntePartida + correnteInstalacao;
            if (soma > maior) {
                maior = soma;
            }
        }
    });

    return maior;
}

function calcularCorrenteTotalPartidaManual() {
    const potenciaOperanteMotor = parseFloat(lerLabelMotorPrincipal("potenciaoperantemotorhtml")) || 0;
    const correntePartidaMotor = parseFloat(lerLabelMotorPrincipal("correntepartidamotorhtml")) || 0;
    const tensaoArmazenada = parseFloat(localStorage.getItem("tensaoSelecionada")) || 0;
    const fatorPotencia = parseFloat(localStorage.getItem("fatorPotenciaSelecionada")) || 0;

    let correnteOperanteMotor = 0;
    if (potenciaOperanteMotor > 0 && tensaoArmazenada > 0 && fatorPotencia > 0) {
        correnteOperanteMotor = potenciaOperanteMotor / (tensaoArmazenada * Math.sqrt(3) * fatorPotencia);
    }

    const correnteTotalManual = correntePartidaMotor + correnteOperanteMotor;
    return isFinite(correnteTotalManual) && correnteTotalManual > 0 ? correnteTotalManual : 0;
}

function atualizarCorrenteTotalPartidaMotor() {
    preencherMotorPrincipalComTabelaDetalhada();
    const correnteFinal = calcularCorrenteTotalPartidaManual();

    localStorage.setItem("maiorCorrenteoperante", correnteFinal);

    const campoCorrenteTotal = document.getElementById("correntetotalpartidamotorhtml");
    if (campoCorrenteTotal) {
        campoCorrenteTotal.textContent = correnteFinal.toFixed(2) + " A";
    }

    return correnteFinal;
}

function obterMotorMaiorCorrenteTotalTabelaDetalhada(motoresDetalhados) {
    if (!Array.isArray(motoresDetalhados) || motoresDetalhados.length === 0) {
        return null;
    }

    let melhorMotor = null;
    let maiorVetor = -Infinity;
    let maiorCorrente = -Infinity;
    let maiorTempoPartida = -Infinity;

    motoresDetalhados.forEach((motor) => {
        const correnteTotal = converterNumeroBr(motor.correnteTotal);
        const correntePartida = converterNumeroBr(motor.correntePartida);
        const correnteInstalacao = converterNumeroBr(motor.correnteInstalacao);
        const tempoPartida = converterNumeroBr(motor.tempoPartida);

        let correnteReferencia = NaN;
        if (!isNaN(correnteTotal)) {
            correnteReferencia = correnteTotal;
        } else if (!isNaN(correntePartida) && !isNaN(correnteInstalacao)) {
            correnteReferencia = correntePartida + correnteInstalacao;
        }

        const tempoReferencia = !isNaN(tempoPartida) ? tempoPartida : 0;
        if (isNaN(correnteReferencia)) {
            return;
        }

        const vetorReferencia = Math.hypot(correnteReferencia, tempoReferencia);
        const encontrouVetorMaior = vetorReferencia > maiorVetor;
        const empatouVetorECorrenteMaior = vetorReferencia === maiorVetor && correnteReferencia > maiorCorrente;
        const empatouVetorECorrenteETempoMaior = vetorReferencia === maiorVetor
            && correnteReferencia === maiorCorrente
            && tempoReferencia > maiorTempoPartida;

        if (encontrouVetorMaior || empatouVetorECorrenteMaior || empatouVetorECorrenteETempoMaior) {
            maiorVetor = vetorReferencia;
            maiorCorrente = correnteReferencia;
            maiorTempoPartida = tempoReferencia;
            melhorMotor = {
                ...motor,
                correnteTotalCalculada: correnteReferencia,
                tempoPartidaCalculado: tempoReferencia,
                vetorMagnitudeCalculado: vetorReferencia
            };
        }
    });

    return melhorMotor;
}

function obterMotorMaiorCorrenteTotalLinha(motoresDetalhados) {
    let melhorMotor = null;
    let maiorCorrente = -Infinity;

    motoresDetalhados.forEach((motor) => {
        const corrente = converterNumeroBr(motor.correnteTotal);
        if (!isNaN(corrente) && corrente > maiorCorrente) {
            maiorCorrente = corrente;
            melhorMotor = motor;
        }
    });

    return melhorMotor;
}
function definirLabelMotorPrincipal(idCampo, valor) {
    const campo = document.getElementById(idCampo);
    if (campo) {
        campo.textContent = isNaN(valor) ? "" : valor.toFixed(2);
    }
}

function lerLabelMotorPrincipal(idCampo) {
    return document.getElementById(idCampo)?.textContent.trim() || "";
}

// Preenche os labels com a linha de maior Corrente Total com os dados da tabela de motores
function preencherMotorPrincipalComTabelaDetalhada() {
    const motor = obterMotorMaiorCorrenteTotalLinha(coletarTabelaMotoresDetalhada());
    const dados = motor || {};

    definirLabelMotorPrincipal("potenciaoperantemotorhtml", converterNumeroBr(dados.potenciaInstalacaoPartida));
    definirLabelMotorPrincipal("correntenominalmotorhtml", converterNumeroBr(dados.correnteInstalacao));
    definirLabelMotorPrincipal("potenciamotorkvahtml", converterNumeroBr(dados.potenciaKva));
    definirLabelMotorPrincipal("correntepartidamotorhtml", converterNumeroBr(dados.correntePartida));
    definirLabelMotorPrincipal("tempopartidamotorhtml", converterNumeroBr(dados.tempoPartida));

    localStorage.setItem("motorJSON", JSON.stringify({
        potenciaoperante: lerLabelMotorPrincipal("potenciaoperantemotorhtml"),
        potenciamotorkva: lerLabelMotorPrincipal("potenciamotorkvahtml"),
        correntenominal: lerLabelMotorPrincipal("correntenominalmotorhtml"),
        correntepartida: lerLabelMotorPrincipal("correntepartidamotorhtml"),
        tempopartida: lerLabelMotorPrincipal("tempopartidamotorhtml")
    }));

    return !!motor;
}
function configurarTabelaMotoresDetalhada() {
    const tbody = document.getElementById("motor-detalhes-body");
    const botaoAdicionar = document.getElementById("adicionarMotorBtn");
    if (!tbody || !botaoAdicionar) {
        return;
    }

    tbody.innerHTML = "";

    const motoresSalvos = obterJSONStorage(TABELA_MOTORES_STORAGE_KEY, []);
    if (Array.isArray(motoresSalvos) && motoresSalvos.length > 0) {
        motoresSalvos.forEach((motor) => {
            tbody.appendChild(montarLinhaMotorDetalhado(motor));
        });
    } else {
        tbody.appendChild(montarLinhaMotorDetalhado());
    }

    renumerarMotoresTabelaDetalhada();

    botaoAdicionar.addEventListener("click", function () {
        const incompleta = Array.from(tbody.querySelectorAll("tr")).some((linha) =>
            Array.from(linha.querySelectorAll("input")).some((input) => input.value.trim() === "")
        );
        if (incompleta) {
            alert("Preencha todos os campos da linha atual antes de adicionar um novo motor.");
            return;
        }

        tbody.appendChild(montarLinhaMotorDetalhado());
        renumerarMotoresTabelaDetalhada();
        salvarTabelaMotoresDetalhada();
        atualizarCorrenteTotalPartidaMotor();
    });

    tbody.addEventListener("click", function (event) {
        const alvo = event.target;
        if (!(alvo instanceof HTMLElement) || !alvo.classList.contains("motor-remove-row")) {
            return;
        }

        const linha = alvo.closest("tr");
        if (!linha) {
            return;
        }

        const totalLinhas = tbody.querySelectorAll("tr").length;
        if (totalLinhas <= 1) {
            linha.querySelectorAll("input").forEach((input) => {
                input.value = "";
            });
            renumerarMotoresTabelaDetalhada();
            salvarTabelaMotoresDetalhada();
            atualizarCorrenteTotalPartidaMotor();
            return;
        }

        linha.remove();
        renumerarMotoresTabelaDetalhada();
        salvarTabelaMotoresDetalhada();
        atualizarCorrenteTotalPartidaMotor();
    });

    tbody.addEventListener("input", function () {
        salvarTabelaMotoresDetalhada();
        // preencherMotorPrincipalComTabelaDetalhada(); // Desvinculado conforme solicitação
        atualizarCorrenteTotalPartidaMotor();
    });

    // Inicializa a sinalização de preenchimento ao carregar
    salvarTabelaMotoresDetalhada();
}

//------------------------------------------------------------------
function salvarOpcao() {
    // preencherMotorPrincipalComTabelaDetalhada(); // Desvinculado conforme solicitação

    // Validação dos campos obrigatórios do motor
    // const correntenominalMotor = document.getElementById("correntenominalmotorhtml")?.value;
    // const correntePartidaMotor = document.getElementById("correntepartidamotorhtml")?.value;
    // const tempoPartidaMotor = document.getElementById("tempopartidamotorhtml")?.value;
    // const todosPreenchidos = [correntenominalMotor, correntePartidaMotor, tempoPartidaMotor].every(v => v && Number(v) !== 0);
    // const algumPreenchido = [correntenominalMotor, correntePartidaMotor, tempoPartidaMotor].some(v => v && Number(v) !== 0);
    // if (algumPreenchido && !todosPreenchidos) {
    //     alert("Preencha corrente nominal, corrente de partida e tempo de partida do motor para continuar.");
    //     return;
    // }

    //Armazenar todas as potencias em KVA em variaveis formato JSON e no localstorage
    for (let i = 1; i <= 20; i++) {
        const impedancia = parseFloat(document.getElementById(`impedanciahtml${i}`)?.value) || 0;
        const tempo = parseFloat(document.getElementById(`tempotrhtml${i}`)?.value) || 0;

        if (impedancia > 0 && impedancia <= 4 && tempo > 2) {
            alert(`Rever preenchimento de tempo para o Trafo ${i}. Para impedância até 4%, o tempo máximo permitido é 2s.`);

        } else if (impedancia > 4 && impedancia <= 5 && tempo > 3) {
            alert(`Rever preenchimento de tempo para o Trafo ${i}. Para impedância até 5%, o tempo máximo permitido é 3s.`);

        } else if (impedancia > 5 && impedancia <= 6 && tempo > 4) {
            alert(`Rever preenchimento de tempo para o Trafo ${i}. Para impedância até 6%, o tempo máximo permitido é 4s.`);
        } else if (impedancia > 6 && impedancia <= 7 && tempo > 5) {
            alert(`Rever preenchimento de tempo para o Trafo ${i}. Para impedância até 7%, o tempo máximo permitido é 5s.`);
        }

        const trafo = {
            potencia: document.getElementById(`potenciahtml${i}`)?.value || "",
            qtde: document.getElementById(`qtdehtml${i}`)?.value || "",
            z: document.getElementById(`impedanciahtml${i}`)?.value || "",
            imin: document.getElementById(`fatoriminhtml${i}`)?.value || "",
            tempo: tempo || ""
        };
        localStorage.setItem(`trafo${i}JSON`, JSON.stringify(trafo));
    }







    // Armazenar informações de input do motor no formato JSON e armazenar no local storage
    const potenciaOperanteMotor = lerLabelMotorPrincipal("potenciaoperantemotorhtml") || 0;
    const potenciaMotorKva = lerLabelMotorPrincipal("potenciamotorkvahtml") || 0;
    const correntenominalMotor = lerLabelMotorPrincipal("correntenominalmotorhtml") || 0;
    const correntePartidaMotor = lerLabelMotorPrincipal("correntepartidamotorhtml") || 0;
    const tempoPartidaMotor = lerLabelMotorPrincipal("tempopartidamotorhtml") || 0;


    // Validação dos campos obrigatórios do motor: se algum dos campos de corrente ou tempo de partida for preenchido, todos devem ser preenchidos
    const todosPreenchidos = [correntePartidaMotor, tempoPartidaMotor].every(v => v && Number(v) !== 0);
    const algumPreenchido = [correntePartidaMotor, tempoPartidaMotor].some(v => v && Number(v) !== 0);


    if (algumPreenchido && !todosPreenchidos) {
        mostrarAlertaMotorObrigatorio();
        return;
    }




    const motor = {
        potenciaoperante: potenciaOperanteMotor,
        potenciamotorkva: potenciaMotorKva,
        correntenominal: correntenominalMotor,
        correntepartida: correntePartidaMotor,
        tempopartida: tempoPartidaMotor
    };

    localStorage.setItem("motorJSON", JSON.stringify(motor));

    const motoresDetalhados = salvarTabelaMotoresDetalhada();
    atualizarCorrenteTotalPartidaMotor(motoresDetalhados);





    location.reload();//recarrega a página sempre que o botão é clicado

}
//---------------------------------------------------------------------------------

function configurarNavegacaoHeader() {
    const headerTitulo = document.querySelector("h1");
    if (!headerTitulo) {
        return;
    }

    headerTitulo.addEventListener("click", function (event) {
        const alvo = event.target instanceof HTMLElement
            ? event.target.closest("button[data-nav-target]")
            : null;

        if (!(alvo instanceof HTMLButtonElement)) {
            return;
        }

        const destino = alvo.dataset.navTarget;
        if (destino) {
            window.location.href = destino;
        }
    });
}

function configurarAcaoSalvar() {
    const botaoSalvar = document.getElementById("botaoSalvar");
    if (botaoSalvar) {
        botaoSalvar.addEventListener("click", salvarOpcao);
    }
}

function configurarBotaoLimparTrafos() {
    const botaoLimpar = document.getElementById("botaoLimparTrafos");
    if (!botaoLimpar) {
        return;
    }

    botaoLimpar.addEventListener("click", function () {
        for (let i = 1; i <= 20; i++) {
            const idsCampos = [
                `potenciahtml${i}`,
                `qtdehtml${i}`,
                `impedanciahtml${i}`,
                `fatoriminhtml${i}`,
                `tempotrhtml${i}`
            ];

            idsCampos.forEach((id) => {
                const campo = document.getElementById(id);
                if (campo) {
                    campo.value = "";
                }
            });

            localStorage.setItem(`trafo${i}JSON`, JSON.stringify({
                potencia: "",
                qtde: "",
                z: "",
                imin: "",
                tempo: ""
            }));
        }

        calcularEArmazenarIntrafoEImag();
        calculos();
        calculaimagreal();

        for (let i = 1; i <= 20; i++) {
            [`intrhtml${i}`, `iansihtml${i}`, `inansihtml${i}`, `imagtrhtml${i}`].forEach((id) => {
                const resultado = document.getElementById(id);
                if (resultado) {
                    resultado.textContent = "";
                }
            });
        }

        ["imagtotal", "imagtotalneutro", "imagrealfase", "imagrealneutro"].forEach((id) => {
            const resultado = document.getElementById(id);
            if (resultado) {
                resultado.textContent = "A";
            }
        });

        const tabelaTrafos = document.querySelector(".magnetizacao-table");
        const primeiroCampo = tabelaTrafos?.querySelector('input[type="number"]');
        primeiroCampo?.dispatchEvent(new Event("input", { bubbles: true }));
    });
}

function aplicarEstadoMagnetizacaoReal(estado) {
    const conteudoMagnetizacaoReal = document.getElementById("magnetizacao-real-conteudo");
    const botaoMagnetizacaoReal = document.getElementById("botaoMagnetizacaoReal");
    const estaLigado = estado !== "desligado";

    if (conteudoMagnetizacaoReal) {
        conteudoMagnetizacaoReal.style.display = estaLigado ? "" : "none";
    }

    if (botaoMagnetizacaoReal) {
        botaoMagnetizacaoReal.textContent = estaLigado
            ? "Ocultar magnetização real"
            : "Calcular magnetização real";
        botaoMagnetizacaoReal.setAttribute("aria-pressed", estaLigado ? "true" : "false");
    }
}

function configurarMagnetizacaoRealToggle() {
    const botaoMagnetizacaoReal = document.getElementById("botaoMagnetizacaoReal");
    if (!botaoMagnetizacaoReal) {
        return;
    }

    const estadoSalvo = localStorage.getItem("magnetizacaoreal");
    const estadoInicial = estadoSalvo === "ligado" ? "ligado" : "desligado";

    localStorage.setItem("magnetizacaoreal", estadoInicial);
    aplicarEstadoMagnetizacaoReal(estadoInicial);

    botaoMagnetizacaoReal.addEventListener("click", function () {
        const estadoAtual = localStorage.getItem("magnetizacaoreal") === "desligado" ? "desligado" : "ligado";
        const novoEstado = estadoAtual === "ligado" ? "desligado" : "ligado";

        localStorage.setItem("magnetizacaoreal", novoEstado);
        aplicarEstadoMagnetizacaoReal(novoEstado);
    });
}

function configurarExibicaoProgressivaTrafos() {
    const tabelaTrafos = document.querySelector(".magnetizacao-table");
    if (!tabelaTrafos) {
        return;
    }

    const linhas = Array.from(tabelaTrafos.querySelectorAll("tbody tr"));
    const atualizarVisibilidade = () => {
        let linhaAnteriorCompleta = true;

        linhas.forEach((linha) => {
            linha.hidden = !linhaAnteriorCompleta;

            const campos = Array.from(linha.querySelectorAll('input[type="number"]'));
            linhaAnteriorCompleta = linhaAnteriorCompleta
                && campos.length > 0
                && campos.every((campo) => campo.value.trim() !== "");
        });
    };

    tabelaTrafos.addEventListener("input", atualizarVisibilidade);
    atualizarVisibilidade();
}

//Carregar nos campos do HTML todos os valores calculados e armazenados no local storage
window.onload = function () {
    calculaimagreal();
    calcularEArmazenarIntrafoEImag();
    calculos();
    // calculoGerador();

    const headerTitulo = document.querySelector("h1");
    if (headerTitulo) {
        headerTitulo.classList.add("loaded");
    }

    configurarNavegacaoHeader();
    configurarAcaoSalvar();
    configurarMagnetizacaoRealToggle();
    configurarBotaoLimparTrafos();
    configurarTabelaMotoresDetalhada();
    let motorPreenchidoPelaTabela2 = false;

    const botaoParametro = document.getElementById("botaotrafohtml");
    if (botaoParametro) {
        botaoParametro.classList.add("nav-active");
    }

    // Controle de acesso movido para controle-acesso.js

    //Manter exibindo as grandezas de input dos trafos no HTML
    for (let i = 1; i <= 20; i++) {
        const trafoSalvo = obterJSONStorage(`trafo${i}JSON`, null);
        if (trafoSalvo) {
            if (document.getElementById(`potenciahtml${i}`)) {
                document.getElementById(`potenciahtml${i}`).value = trafoSalvo.potencia || "";
            }
            if (document.getElementById(`qtdehtml${i}`)) {
                document.getElementById(`qtdehtml${i}`).value = trafoSalvo.qtde || "";
            }
            if (document.getElementById(`impedanciahtml${i}`)) {
                document.getElementById(`impedanciahtml${i}`).value = trafoSalvo.z || "";
            }
            if (document.getElementById(`fatoriminhtml${i}`)) {
                document.getElementById(`fatoriminhtml${i}`).value = trafoSalvo.imin || "";
            }
            if (document.getElementById(`tempotrhtml${i}`)) {
                document.getElementById(`tempotrhtml${i}`).value = trafoSalvo.tempo || "";
            }
        }
    }
    configurarExibicaoProgressivaTrafos();

    //Manter exibindo as correntes calculadas no HTML
    const correntestrafos = obterJSONStorage("correntestrafosJSON", {});

    for (let i = 1; i <= 20; i++) {
        // Exibe In (corrente nominal)
        if (document.getElementById(`intrhtml${i}`) && correntestrafos[`trafo${i}`]) {
            document.getElementById(`intrhtml${i}`).textContent = correntestrafos[`trafo${i}`].intrafo
                ? correntestrafos[`trafo${i}`].intrafoindividual.toFixed(2) + " A"
                : "";
        }
        // Exibe Imag (corrente de magnetização)
        if (document.getElementById(`imagtrhtml${i}`) && correntestrafos[`trafo${i}`]) {
            document.getElementById(`imagtrhtml${i}`).textContent = correntestrafos[`trafo${i}`].imag
                ? correntestrafos[`trafo${i}`].imagindividual.toFixed(2) + " A"
                : "";
        }
        // Exibe IANSI (corrente ANSI)
        if (document.getElementById(`iansihtml${i}`) && correntestrafos[`trafo${i}`]) {
            document.getElementById(`iansihtml${i}`).textContent = correntestrafos[`trafo${i}`].iansi
                ? correntestrafos[`trafo${i}`].iansi.toFixed(2) + " A"
                : "";
        }
        // Exibe INANSI (corrente ANSI neutro)
        if (document.getElementById(`inansihtml${i}`) && correntestrafos[`trafo${i}`]) {
            document.getElementById(`inansihtml${i}`).textContent = correntestrafos[`trafo${i}`].inansi
                ? correntestrafos[`trafo${i}`].inansi.toFixed(2) + " A"
                : "";
        }
    }

    //carregar imag total no HTML
    const label91 = document.getElementById("imagtotal");
    const imagtotalArmazenado = parseFloat(localStorage.getItem("imagtotalSelecionada"));
    if (imagtotalArmazenado) { label91.textContent = imagtotalArmazenado.toFixed(2) + " A"; }



    //carregar imag total do neutro no HTML
    const label92 = document.getElementById("imagtotalneutro");
    const imagtotalneutroArmazenado = parseFloat(localStorage.getItem("imagtotalneutroSelecionada"));
    if (imagtotalneutroArmazenado) { label92.textContent = imagtotalneutroArmazenado.toFixed(2) + " A"; }




    //carregar imag real de fase no HTML
    const labelImagRealFase = document.getElementById("imagrealfase");
    const imagRealFaseArmazenado = parseFloat(localStorage.getItem("inmagrealSelecionada"));
    if (imagRealFaseArmazenado) { labelImagRealFase.textContent = imagRealFaseArmazenado.toFixed(2) + " A"; }

    //carregar inmagreal do neutro no HTML
    const labelInmagrealNeutro = document.getElementById("imagrealneutro");
    const inmagrealneutroArmazenado = parseFloat(localStorage.getItem("inmagrealneutroSelecionada"));
    if (inmagrealneutroArmazenado) { labelInmagrealNeutro.textContent = inmagrealneutroArmazenado.toFixed(2) + " A"; }




    //----------------------------------------------------------------------------------------------

    // Preenche o motor de maior potência (CV) com os dados da tabela de motores
    atualizarCorrenteTotalPartidaMotor();

    //console.log("corrente que esta no lstorage",correnteoperantearmazenada);


}


function calcularEArmazenarIntrafoEImag() {
    const tensaoArmazenada = parseFloat(localStorage.getItem("tensaoSelecionada"));





    let correntestrafosJSON = {};

    for (let i = 1; i <= 20; i++) {
        const trafoSalvo = obterJSONStorage(`trafo${i}JSON`, null);
        const potencia = trafoSalvo ? parseFloat(trafoSalvo.potencia) : 0;
        const qtde = trafoSalvo ? parseInt(trafoSalvo.qtde) : 0;
        const imin = trafoSalvo ? parseFloat(trafoSalvo.imin) : 0;
        const tempo = trafoSalvo ? parseFloat(trafoSalvo.tempo) : 0;
        // const intrafoindividual = potencia / (tensaoArmazenada * Math.sqrt(3));
        let intrafo = 0;
        if (potencia > 0 && qtde > 0 && tempo > 0) {
            intrafo = ((qtde * potencia) / (tensaoArmazenada * Math.sqrt(3)));
        }



        const imag = intrafo * imin;
        // const imagindividual = intrafoindividual * imin;

        const impedancia = trafoSalvo ? (parseFloat(trafoSalvo.z) || 0) : 0;
        // const iansitrafo = impedancia > 0 ? (100 / impedancia) * intrafoindividual : 0;
        // const inansi = iansitrafo * 0.58;

        // let intrafoindividual = 0;
        // let imagindividual = 0;
        // if (potencia > 0 && qtde > 0) {
        //     intrafoindividual = potencia / (tensaoArmazenada * Math.sqrt(3));
        //     imagindividual = intrafoindividual * imin;
        // }





        //         let iansitrafo = 0;
        // let inansi = 0;
        // if (impedancia > 0 && potencia > 0 && qtde > 0) {
        //     iansitrafo = (100 / impedancia) * intrafoindividual;
        //     inansi = iansitrafo * 0.58;
        // }


        let intrafoindividual = 0;
        let imagindividual = 0;
        let iansitrafo = 0;
        let inansi = 0;

        if (potencia > 0 && qtde > 0 && tempo > 0) {
            intrafoindividual = potencia / (tensaoArmazenada * Math.sqrt(3));
            imagindividual = intrafoindividual * imin;
            if (impedancia > 0) {
                iansitrafo = (100 / impedancia) * intrafoindividual;
                inansi = iansitrafo * 0.58;
            }
            // tempo já está preenchido, pode usar normalmente
        } else {
            // Se quiser, pode zerar ou tratar os valores aqui
        }






        correntestrafosJSON[`trafo${i}`] = {
            intrafo: isNaN(intrafo) ? 0 : intrafo,
            imag: isNaN(imag) ? 0 : imag,
            intrafoindividual: isNaN(intrafoindividual) ? 0 : intrafoindividual,
            imagindividual: isNaN(imagindividual) ? 0 : imagindividual,
            tempo: isNaN(tempo) ? 0 : tempo,
            iansi: isNaN(iansitrafo) ? 0 : iansitrafo,
            inansi: isNaN(inansi) ? 0 : inansi
        };

        // console.log("Todos os trafos:", correntestrafosJSON);
    }
    localStorage.setItem("correntestrafosJSON", JSON.stringify(correntestrafosJSON));

    //FAZ A EXIBIÇÃO DO VALOR DE CORRENTE TOTAL DA CARGA OPERANTE NA TELA HTML

    const somaCorrentePartidaOperante = parseFloat(localStorage.getItem("maiorCorrenteoperante")) || 0;
    const campoCorrenteTotal = document.getElementById("correntetotalpartidamotorhtml");
    if (campoCorrenteTotal) {
        campoCorrenteTotal.textContent = somaCorrentePartidaOperante.toFixed(2) + " A";
    }

}


function calculos() {
    // Recupera a tensão e o desequilíbrio do localStorage
    const tensaoArmazenada = parseFloat(localStorage.getItem("tensaoSelecionada"));
    const desequilibrioSelecionada = parseFloat(localStorage.getItem("desequilibrioSelecionada")) / 100;

    // Variáveis auxiliares para identificar o trafo com maior Imag
    let maiorImag = 0;
    let indexMaiorImag = -1;
    let maiorImagIn = 0;
    let maiorImagQtde = 1;
    let maiorimin = 0;

    let somaInTotal = 0;

    // Arrays para armazenar os valores de In, Imag e quantidade de cada trafo
    const inArray = [];
    const imagArray = [];
    const qtdeArray = [];

    // Loop para calcular In, Imag e identificar o trafo com maior Imag
    for (let i = 1; i <= 20; i++) {
        const trafoSalvo = obterJSONStorage(`trafo${i}JSON`, null);
        if (trafoSalvo) {
            const potencia = parseFloat(trafoSalvo.potencia) || 0;
            const imin = parseFloat(trafoSalvo.imin) || 0;
            const qtde = parseInt(trafoSalvo.qtde) || 0;
            // Só considera trafos preenchidos
            if (qtde > 0 && potencia > 0) {
                // Calcula corrente nominal do trafo
                const intrafo = potencia / (tensaoArmazenada * Math.sqrt(3));
                // Calcula corrente de magnetização
                const imag = intrafo * imin;
                inArray[i] = intrafo;
                imagArray[i] = imag;
                qtdeArray[i] = qtde;
                // Identifica o trafo com maior Imag
                if (imag > maiorImag) {
                    maiorImag = imag;
                    indexMaiorImag = i;
                    maiorImagIn = intrafo;
                    maiorImagQtde = qtde;
                    maiorimin = imin;
                }
            } else {
                // Se não preenchido, zera os valores
                inArray[i] = 0;
                imagArray[i] = 0;
                qtdeArray[i] = 0;
            }
        } else {
            // Se não existe, zera os valores
            inArray[i] = 0;
            imagArray[i] = 0;
            qtdeArray[i] = 0;
        }
    }

    // Soma as In dos trafos, ponderando pelo trafo de maior Imag
    for (let i = 1; i <= 20; i++) {
        if (qtdeArray[i] > 0 && inArray[i] > 0) {
            if (i === indexMaiorImag) {
                // Para o trafo de maior Imag, soma (qtde - 1) * In
                somaInTotal += (qtdeArray[i] - 1) * inArray[i];
            } else {
                // Para os demais, soma qtde * In
                somaInTotal += qtdeArray[i] * inArray[i];
            }
        }
    }

    // Soma a potência total de todos os trafos válidos
    let somaPotenciaTotal = 0;
    for (let i = 1; i <= 20; i++) {
        const trafoSalvo = obterJSONStorage(`trafo${i}JSON`, null);
        somaPotenciaTotal += qtdeArray[i] * (parseFloat(trafoSalvo?.potencia) || 0);
    }
    localStorage.setItem("potenciatotaltrafos", somaPotenciaTotal);

    const labelPotenciaTotalTrafos = document.getElementById("potenciatotaltrafoshtml");
    if (labelPotenciaTotalTrafos) {
        labelPotenciaTotalTrafos.textContent = somaPotenciaTotal + " kVA";
    }

    

    // Calcula a magnetização total: maior Imag + soma das In dos demais trafos
    imagtotalformatada = maiorImag + somaInTotal;

    // Calcula a magnetização total do neutro considerando o desequilíbrio
    imagtotalneutroformatada = imagtotalformatada * (desequilibrioSelecionada);

    // Salva os resultados no localStorage para uso em outros pontos do sistema
    
    localStorage.setItem("imagtotalSelecionada", imagtotalformatada);
    localStorage.setItem("imagtotalneutroSelecionada", imagtotalneutroformatada);
    localStorage.setItem("maiortrafoimagSelecionada", maiorImag);
    localStorage.setItem("maiortrafoindexSelecionada", indexMaiorImag);
    localStorage.setItem("maiortrafoinSelecionada", maiorImagIn);
    localStorage.setItem("maiortrafoqtdeSelecionada", maiorImagQtde);
    localStorage.setItem("maiortrafoiminSelecionada", maiorimin);

    // Debug: imprime no console os principais valores calculados
    console.log("Maior Imag:", maiorImag);
    console.log("Índice do maior Imag:", indexMaiorImag);
    console.log("In do maior Imag:", maiorImagIn);
    console.log("Qtde do maior Imag:", maiorImagQtde);
    console.log("Imin do maior Imag:", maiorimin);
}


// Função para calcular a corrente de magnetização real e do neutro

function calculaimagreal() {

    const ICCselecionada = parseFloat(localStorage.getItem("curtoSelecionada")) || 0;
    const instselecionada = parseFloat(localStorage.getItem("imagtotalSelecionada")) || 0;
    const desequilibrioneutro = parseFloat(localStorage.getItem("desequilibrioSelecionada")) / 100;

    let inmagreal = 0;
    if (ICCselecionada > 0 && instselecionada > 0) {
        const denominador = (1 / ICCselecionada) + (1 / instselecionada);
        inmagreal = denominador > 0 ? (1 / denominador) : 0;
    }

    const inmagrelaneutro = inmagreal * desequilibrioneutro;

    localStorage.setItem("inmagrealSelecionada", inmagreal);
    localStorage.setItem("inmagrealneutroSelecionada", inmagrelaneutro);

    // console.log("imag real:",inmagreal)
    // console.log("imag real neutro:",inmagrelaneutro)


}




// Event listener para capturar Enter em qualquer lugar da página
document.addEventListener('keydown', function (event) {
    // Verificar se a tecla pressionada é Enter (código 13 ou 'Enter')
    if (event.key === 'Enter' || event.keyCode === 13) {
        // Evitar comportamento padrão (submissão de formulário)
        event.preventDefault();

        // Chamar a função salvar
        salvarOpcao();

        console.log('✅ Salvamento ativado por Enter');
    }
});







// --------------------------------------------------------------// Código para gerar a curva tempo inverso em SVG
// Esta função gera uma curva de tempo
// Função para gerar a curva tempo inverso em SVG da animação
function gerarCurvaTempoInversoSVG(dial, beta, alfa, k, ip, iMin, iMax, pontos) {
    let d = "";
    let primeiro = true;
    for (let i = 0; i <= pontos; i++) {
        let corrente = iMin + (iMax - iMin) * (i / pontos);
        let denominador = Math.pow(corrente / ip, alfa) - k;
        if (denominador <= 0) continue;
        let tempo = dial * (beta / denominador);
        if (tempo > 1000) tempo = 1000; // Limite para visualização
        let svgX = 50 + (corrente - iMin) * 500 / (iMax - iMin);
        let svgY = 350 - (tempo * 300 / 1000);
        if (primeiro) {
            d += `M${svgX},${svgY}`;
            primeiro = false;
        } else {
            d += ` L${svgX},${svgY}`;
        }
    }
    return d;
}

// Parâmetros do exemplo
const dial = 90000;
const beta = 300;
const alfa = 2;
const k = 1;
const ip = 0.5;
const iMin = ip * 2.01; // Começa um pouco acima de ip
const iMax = 300;
const pontos = 1000;

const dInverso = gerarCurvaTempoInversoSVG(dial, beta, alfa, k, ip, iMin, iMax, pontos);

const svg = document.querySelector("svg");
const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
path.setAttribute("class", "curva-inversa");
path.setAttribute("fill", "none");
path.setAttribute("stroke", "#ff0080");
path.setAttribute("stroke-width", "3");
path.setAttribute("stroke-dasharray", "1000");
path.setAttribute("stroke-dashoffset", "1000");
path.setAttribute("d", dInverso);
svg.appendChild(path);
// --------------------------------------------------------------
// Fim do Js do SVG