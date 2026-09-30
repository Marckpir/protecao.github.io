




let graficoFuncao46 = null;

function parseNumeroFlex(valor) {
    if (valor === null || valor === undefined) return NaN;
    const texto = String(valor).replace(/[^0-9,.-]/g, "").replace(",", ".");
    return Number(texto);
}

function parseTcSelecionado(valorTc) {
    if (valorTc === null || valorTc === undefined) return NaN;
    const texto = String(valorTc).trim();

    // Em seleções no formato "300/5", usa o valor primário para P.U.
    if (texto.includes("/")) {
        const partePrimaria = texto.split("/")[0];
        return parseNumeroFlex(partePrimaria);
    }

    return parseNumeroFlex(texto);
}

function obterNumeroPorPreferencia(idInput, idLabel) {
    const input = document.getElementById(idInput);
    const label = document.getElementById(idLabel);

    const valorInput = parseNumeroFlex(input?.value);
    if (isFinite(valorInput) && valorInput > 0) return valorInput;

    const valorLabel = parseNumeroFlex(label?.textContent);
    if (isFinite(valorLabel) && valorLabel > 0) return valorLabel;

    return NaN;
}

function atualizarGraficoFuncao46() {
    const canvas = document.getElementById("grafico-funcao-46");
    if (!canvas || typeof Chart === "undefined") return;

    const tcSelecionado = parseTcSelecionado(localStorage.getItem("TCdeprotecaoSelecionada"));
    const idefAjustadaAmpere = parseNumeroFlex(document.getElementById("idef-46-ajustada-html")?.value);
    const idefPuLabel = document.getElementById("idef-46-pu-html");
    const idefRealLabel = document.getElementById("idef-46-real-html");

    // Pickup da curva deve considerar a coluna P.U parametrizada.
    let pickupPU = parseNumeroFlex(idefPuLabel?.textContent);
    if (!isFinite(pickupPU) || pickupPU <= 0) {
        pickupPU = parseNumeroFlex(localStorage.getItem("Idef46PUreal"));
    }
    if (isFinite(idefAjustadaAmpere) && idefAjustadaAmpere > 0 && isFinite(tcSelecionado) && tcSelecionado > 0) {
        pickupPU = idefAjustadaAmpere / tcSelecionado;
        if (idefPuLabel) idefPuLabel.textContent = pickupPU.toFixed(2) + " P.U";
        if (idefRealLabel) idefRealLabel.textContent = idefAjustadaAmpere.toFixed(2) + " A";
    }

    // Tempo definido parametrizado: prioriza input manual, senão valor já exibido.
    const tempoInput = parseNumeroFlex(document.getElementById("tempodefinido-ajustada-html")?.value);
    const tempoLabel = document.getElementById("tempodefinido-real-html");
    let tempoDefinido = parseNumeroFlex(tempoLabel?.textContent);
    if (isFinite(tempoInput) && tempoInput > 0) {
        tempoDefinido = tempoInput;
        if (tempoLabel) tempoLabel.textContent = tempoDefinido.toFixed(2) + " s";
    }

    if (!isFinite(pickupPU) || !isFinite(tempoDefinido) || pickupPU <= 0 || tempoDefinido <= 0) {
        return;
    }

    // Converte o pickup em P.U para percentual de desequilíbrio I2/I1.
    const desequilibrioPickupPct = pickupPU * 100;

    const xMin = 0;
    const xMax = Math.max(desequilibrioPickupPct * 1.8, desequilibrioPickupPct + 5, 20);
    const yTopoVisual = Math.max(tempoDefinido * 3, tempoDefinido + 2, 8);
    const yMaxVisivel = Math.max(tempoDefinido * 1.3, tempoDefinido + 1, 5);

    // Degrau de atuação: queda vertical no pickup e patamar no tempo definido.
    const dadosDegrau = [
        { x: desequilibrioPickupPct, y: yTopoVisual },
        { x: desequilibrioPickupPct, y: tempoDefinido },
        { x: xMax, y: tempoDefinido }
    ];

    if (graficoFuncao46) {
        graficoFuncao46.data.datasets[0].data = dadosDegrau;
        graficoFuncao46.options.scales.x.max = xMax;
        graficoFuncao46.options.scales.y.max = yMaxVisivel;
        graficoFuncao46.update();
        return;
    }

    const contexto = canvas.getContext("2d");
    graficoFuncao46 = new Chart(contexto, {
        type: "line",
        data: {
            datasets: [{
                label: "Curva Função ANSI 46",
                data: dadosDegrau,
                borderColor: "#d35400",
                backgroundColor: "rgba(211, 84, 0, 0.15)",
                borderWidth: 3,
                pointRadius: 4,
                pointHoverRadius: 6,
                fill: false,
                tension: 0
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: true,
                    position: "bottom"
                },
                title: {
                    display: true,
                    text: "Relação Desequilíbrio (I2/I1 %) por Tempo - ANSI 46"
                },
                tooltip: {
                    callbacks: {
                        label: (context) => {
                            const x = context.parsed.x.toFixed(2);
                            const y = context.parsed.y.toFixed(2);
                            return `Desequilíbrio: ${x}% | Tempo: ${y} s`;
                        }
                    }
                }
            },
            scales: {
                x: {
                    type: "linear",
                    min: xMin,
                    max: xMax,
                    title: {
                        display: true,
                        text: "Desequilíbrio I2/I1 (%)"
                    }
                },
                y: {
                    min: 0,
                    max: yMaxVisivel,
                    title: {
                        display: true,
                        text: "Tempo (s)"
                    }
                }
            }
        }
    });
}

window.onload = function () {
    // -----------------manter o botão vermelho selecionado-------------------
    const botaoParametro = document.getElementById("botaoajustesGDhtml");
    if (botaoParametro) {
        botaoParametro.style.backgroundColor = "#cf0808";
    }

    const botaoParametro2 = document.getElementById("botaoajuste46html");
    if (botaoParametro2) {
        botaoParametro2.style.backgroundColor = "#cf0808";
    }
    // -----------------manter o botão vermelho selecionado-------------------

    // Controle de acesso movido para controle-acesso.js

    //persistir os valores ajustados no html

    const ipAjustada = localStorage.getItem("Ipajustada46");
    if (ipAjustada !== null) {
        document.getElementById("ip-46-ajustada-html").value = ipAjustada;
    }
    const curvaAjustada = localStorage.getItem("Curvaajustada46");
    if (curvaAjustada !== null) {
        document.getElementById("curva-46-ajustada-html").value = curvaAjustada;
    }
    const dialAjustado = localStorage.getItem("Dialajustado46");
    if (dialAjustado !== null) {
        document.getElementById("dial-46-ajustada-html").value = dialAjustado;
    }
    const idefAjustada = localStorage.getItem("Idefajustada46");
    if (idefAjustada !== null) {
        document.getElementById("idef-46-ajustada-html").value = idefAjustada;
    }
    const tempoDefinido = localStorage.getItem("Tempodefinido46");
    if (tempoDefinido !== null) {
        document.getElementById("tempodefinido-ajustada-html").value = tempoDefinido;
    }

    //-------------------------------------------------------------------

    // Preencher campos do html com os valores do localStorage 

    const tcSelecionado = localStorage.getItem("TCdeprotecaoSelecionada") || "";
    const tcSelecionadoNumero = parseTcSelecionado(tcSelecionado);


    const ipFaseGD = parseFloat(localStorage.getItem("IpfaseGD")) || 0;
    const ipDeConsumo = parseFloat(localStorage.getItem("Ipdeconsumo")) || 0;
    const maiorIp = Math.max(ipFaseGD, ipDeConsumo);




    let ip46real; // Variável independente para armazenar o valor definido

    const ipHtml = document.getElementById("ip-46-real-html");
    const ipAjustada46 = localStorage.getItem("Ipajustada46");
    if (ipHtml) {
        if (ipAjustada46 && !isNaN(parseFloat(ipAjustada46))) {
            ip46real = parseFloat(ipAjustada46); // Ajuste para P.U
            ipHtml.textContent = (ip46real).toFixed(2) + " A";
        } else {
            ip46real = maiorIp;
            ipHtml.textContent = (ip46real * 0.20).toFixed(2) + " A";
        }
    }



    const curvaHtml = document.getElementById("curva-46-real-html");
    const curvaAjustada46 = localStorage.getItem("Curvaajustada46");
    if (curvaHtml) {
        if (curvaAjustada46 && curvaAjustada46.trim() !== "") {
            curvaHtml.textContent = curvaAjustada46;
        } else if (maiorIp === ipFaseGD) {
            curvaHtml.textContent = localStorage.getItem("curvafaseSelecionadaGD") || "";
        } else if (maiorIp === ipDeConsumo) {
            curvaHtml.textContent = localStorage.getItem("curvafaseSelecionada") || "";
        }
    }

    const dialHtml = document.getElementById("dial-46-real-html");
    const dialAjustado46 = localStorage.getItem("Dialajustado46");
    if (dialHtml) {
        if (dialAjustado46 && dialAjustado46.trim() !== "") {
            dialHtml.textContent = dialAjustado46;
        } else if (maiorIp === ipFaseGD) {
            dialHtml.textContent = localStorage.getItem("dialfaseSelecionadaGD") || "";
        } else if (maiorIp === ipDeConsumo) {
            dialHtml.textContent = localStorage.getItem("dialfaseSelecionada") || "";
        }
    }


    const idefHtml = document.getElementById("idef-46-real-html");
    const idefAjustada46 = localStorage.getItem("Idefajustada46");
    let idef46real; // Variável independente para armazenar o valor definido

    if (idefHtml) {
        if (idefAjustada46 && !isNaN(parseFloat(idefAjustada46))) {
            idef46real = parseFloat(idefAjustada46).toFixed(2);
            idefHtml.textContent = idef46real + " A";
        } else {
            idef46real = (maiorIp * 0.20).toFixed(2);
            idefHtml.textContent = idef46real + " A";
        }
    }


    const tempoDefinidoHtml = document.getElementById("tempodefinido-real-html");
    let tempoDefinido46 = localStorage.getItem("Tempodefinido46");
    if (tempoDefinidoHtml) {
        if (tempoDefinido46 && tempoDefinido46.trim() !== "") {
            tempoDefinidoHtml.textContent = tempoDefinido46 + " s";
        } else {
            tempoDefinido46 = 3; // Valor padrão
            tempoDefinidoHtml.textContent = "3 s";
        }
    }

    

    const ipPuHtml = document.getElementById("ip-46-pu-html");
    let ipPu; // Declarar ipPu aqui para uso posterior
    if (ipPuHtml && isFinite(tcSelecionadoNumero) && tcSelecionadoNumero > 0) {
        if (ipAjustada46 && !isNaN(parseFloat(ipAjustada46))) {
            // Se houver valor ajustado, usa ele
            ipPu = (parseFloat(ipAjustada46) / tcSelecionadoNumero).toFixed(2);
            ipPuHtml.textContent = ipPu + " P.U";
        } else {
            // Caso contrário, usa o maiorIp * 0.20
            ipPu = ((maiorIp * 0.20) / tcSelecionadoNumero).toFixed(2);
            ipPuHtml.textContent = ipPu + " P.U";
        }
    }

    const idefPuHtml = document.getElementById("idef-46-pu-html");
    let idefPuCalculado = parseNumeroFlex(localStorage.getItem("Idef46PUreal"));
    if (idefPuHtml) {
        if (isFinite(tcSelecionadoNumero) && tcSelecionadoNumero > 0) {
            idefPuCalculado = parseFloat(idef46real) / tcSelecionadoNumero;
        }

        if (isFinite(idefPuCalculado) && idefPuCalculado > 0) {
            idefPuHtml.textContent = idefPuCalculado.toFixed(2) + " P.U";
        }
    }



    //exportar ip46real e idef46real para o localStorage
    
    localStorage.setItem("Idef46real", idef46real);

    if (isFinite(idefPuCalculado) && idefPuCalculado > 0) {
        localStorage.setItem("Idef46PUreal", idefPuCalculado.toFixed(2));
    }

    localStorage.setItem("tempoDefinido46real", tempoDefinido46);

    // Renderização inicial do gráfico ANSI 46 com os valores atuais.
    atualizarGraficoFuncao46();

    // Atualização em tempo real ao editar os ajustes manuais.
    ["idef-46-ajustada-html", "tempodefinido-ajustada-html"].forEach((id) => {
        const elem = document.getElementById(id);
        if (elem) {
            elem.addEventListener("input", atualizarGraficoFuncao46);
        }
    });




}


function salvarOpcao() {

    // Salvar os valores ajustados no localStorage
    const ipAjustada = document.getElementById("ip-46-ajustada-html").value;
    const curvaAjustada = document.getElementById("curva-46-ajustada-html").value;
    const dialAjustado = document.getElementById("dial-46-ajustada-html").value;
    const idefAjustada = document.getElementById("idef-46-ajustada-html").value;
    const tempoDefinido = document.getElementById("tempodefinido-ajustada-html").value;

    localStorage.setItem("Ipajustada46", ipAjustada);
    localStorage.setItem("Curvaajustada46", curvaAjustada);
    localStorage.setItem("Dialajustado46", dialAjustado);
    localStorage.setItem("Idefajustada46", idefAjustada);
    localStorage.setItem("Tempodefinido46", tempoDefinido);



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
const dialsvg = 90000;
const beta = 300;
const alfa = 2;
const k = 1;
const ip = 0.5;
const iMin = ip * 2.01; // Começa um pouco acima de ip
const iMax = 300;
const pontos = 1000;

const dInverso = gerarCurvaTempoInversoSVG(dialsvg, beta, alfa, k, ip, iMin, iMax, pontos);

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
