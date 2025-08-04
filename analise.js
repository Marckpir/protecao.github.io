






window.onload = function () {
    // -----------------manter o botão vermelho selecionado-------------------
    const botaoParametro = document.getElementById("botaoanalisehtml");
    if (botaoParametro) {
        botaoParametro.style.backgroundColor = "#cf0808";
    }

//--persistir os valores ajustados no html

    const numeroNSInput = document.getElementById("numeroNS");
    if (numeroNSInput) {
        const numeroNSSalvo = localStorage.getItem("numeroNS");
        if (numeroNSSalvo) {
            numeroNSInput.value = numeroNSSalvo;
        }
    }

    const nota4Select2 = document.getElementById("nota4-select");
    if (nota4Select2) {
        const nota4Salva = localStorage.getItem("tipodeanalise");
        if (nota4Salva) {
            nota4Select2.value = nota4Salva;
        }
    }

    const matriculaInput = document.getElementById("matricula");
    if (matriculaInput) {
        const matriculaSalva = localStorage.getItem("matriculadotecnico");
        if (matriculaSalva) {
            matriculaInput.value = matriculaSalva;
        }
    }

    //------------------------------------------------------

    // Preencher os campos com os valores do localStorage
    const tensaoAtendimento = localStorage.getItem("tensaoSelecionada");
    const demandaConsumo = localStorage.getItem("demandaSelecionada");
    const potenciaGerador = localStorage.getItem("potenciaGDSelecionada");


    const geradorJSON = localStorage.getItem("geradorJSON");
    const potenciaDiesel = geradorJSON ? JSON.parse(geradorJSON).potencia : null;


    const anoAtual = new Date().getFullYear();


    if (tensaoAtendimento) {
        document.getElementById("tensao-atendimento").innerText = tensaoAtendimento + " KV;";
    }

    if (demandaConsumo) {
        document.getElementById("demanda-consumo").innerText = demandaConsumo + " KW;";
    }

    if (potenciaGerador) {
        document.getElementById("potencia-GD").innerText = potenciaGerador + " KW;";
        document.getElementById("campoGD").style.display = "";
    } else {
        document.getElementById("campoGD").style.display = "none";
    }


    // if (potenciaGerador) {
    //     document.getElementById("potencia-GD").innerText = potenciaGerador + " KVA";
    // }


    if (potenciaDiesel) {
        document.getElementById("potencia-gerador").innerText = potenciaDiesel + " KVA;";
        document.getElementById("campogeradordiesel").style.display = "";
    } else {
        document.getElementById("campogeradordiesel").style.display = "none";
    }


    // Preencher nsedata com valor de numeroNS, se não houver valor deixa 
    const numeroNS = 'PROJETO NS :' + (localStorage.getItem("numeroNS") + '/' + anoAtual || '' + '/' + anoAtual) + ';';
    document.getElementById("nsedata").innerText = numeroNS;


    // Preencher nota4
    const nota4Select = document.getElementById("nota4");
    if (nota4Select) {
        const nota4Salva = localStorage.getItem("tipodeanalise");
        if (nota4Salva) {
            nota4Select.textContent = 'TRATA-SE DE : ' + nota4Salva + ';';
        } else {
            nota4Select.textContent = 'TRATA-SE DE : COORDENOGRAMA;';
        }
    }


    // Preencher nsselo com valor de numeroNS
    const nsselo = document.getElementById("nsselo");
    if (nsselo) {
        const numeroNSValue = localStorage.getItem("numeroNS");
        nsselo.innerText = numeroNSValue ? numeroNSValue : "";
    }


    // Preencher aprovadorselo com valor de matriculadotecnico
    const aprovadorselo = document.getElementById("aprovadorselo");
    if (aprovadorselo) {
        const matriculaTecnico = localStorage.getItem("matriculadotecnico");
        if (matriculaTecnico) {
            aprovadorselo.innerText = 'Por ' + matriculaTecnico + ' às ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + ' , ' + new Date().toLocaleDateString();
        } else {
            aprovadorselo.innerText = "";
        }
    }


    // Preencher total dos transformadores com valor do localStorage
    const potenciaTotalTrafos = localStorage.getItem("potenciatotaltrafos");
    const totalTransformadores = document.getElementById("total-transformadores");
    if (totalTransformadores) {
        if (potenciaTotalTrafos) {
            totalTransformadores.innerText = "TOTAL DOS TRANSFORMADORES: " + potenciaTotalTrafos + " KVA;";
        } else {
            totalTransformadores.innerText = "";
        }
    }








};



function salvarOpcao() {


    const numeroNS = document.getElementById("numeroNS").value;
    localStorage.setItem("numeroNS", numeroNS);
    console.log("numeroNS salvo:", numeroNS);

    const nota4Select = document.getElementById("nota4-select");
    if (nota4Select) {
        localStorage.setItem("tipodeanalise", nota4Select.value);
        console.log("tipodeanalise salvo:", nota4Select.value);
    }

    const matriculaInput = document.getElementById("matricula");
    if (matriculaInput) {
        localStorage.setItem("matriculadotecnico", matriculaInput.value);
        console.log("matricula salva:", matriculaInput.value);
    }

    // Atualizar a página para recarregar os dados salvos
    location.reload();

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










// --------------------------------------------------------------// 
// Código para gerar a curva tempo inverso em SVG
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
