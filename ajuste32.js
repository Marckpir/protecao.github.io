









let graficoPotenciaTempoInjecao = null;
let graficoPotenciaTempoConsumo = null;

function atualizarGraficoPotenciaTempoInjecao(potenciaReal, tempoSegundos) {
    // Canvas alvo do gráfico de injeção.
    const canvas = document.getElementById("grafico-potencia-tempo-injecao");
    if (!canvas || typeof Chart === "undefined") return;

    // Normaliza e valida entradas numéricas antes de desenhar.
    const tempo = Number(tempoSegundos);
    const potencia = Number(potenciaReal);
    if (!isFinite(tempo) || !isFinite(potencia) || tempo <= 0 || potencia < 0) return;

    // Define escala horizontal e parâmetros visuais do degrau.
    const xMaximo = Math.max(potencia * 1.8, potencia + 1, 1);
    const TEMPO_INICIO_DEGRAU_PADRAO = 240;
    const tempoInfinitoVisual = Math.max(TEMPO_INICIO_DEGRAU_PADRAO, tempo + 10);
    const yMaximoVisivel = Math.max(tempo * 1.2, tempo + 5, 60);

    // Curva em degrau sem o trecho horizontal superior:
    // 1) Queda vertical na potência limite
    // 2) Trecho plano no tempo de trip para potências acima do limite
    const dadosDegrau = [
        { x: potencia, y: tempoInfinitoVisual },
        { x: potencia, y: tempo },
        { x: xMaximo, y: tempo }
    ];

    // Se o gráfico já existe, apenas atualiza dados e limites (evita recriar o objeto Chart).
    if (graficoPotenciaTempoInjecao) {
        graficoPotenciaTempoInjecao.data.datasets[0].data = dadosDegrau;
        graficoPotenciaTempoInjecao.options.scales.x.max = xMaximo;
        graficoPotenciaTempoInjecao.options.scales.y.max = yMaximoVisivel;
        graficoPotenciaTempoInjecao.update();
        return;
    }

    // Primeira renderização do gráfico de injeção.
    const contexto = canvas.getContext("2d");
    graficoPotenciaTempoInjecao = new Chart(contexto, {
        type: "line",
        data: {
            datasets: [{
                label: "Curva Função 32 Injeção",
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
                    text: "Relação Potência por Tempo - 32 Injeção"
                },
                tooltip: {
                    callbacks: {
                        label: (context) => {
                            const x = context.parsed.x.toFixed(2);
                            const y = context.parsed.y.toFixed(2);
                            return `Potência: ${x} kW | Tempo: ${y} s`;
                        }
                    }
                }
            },
            scales: {
                x: {
                    type: "linear",
                    min: 0,
                    max: xMaximo,
                    title: {
                        display: true,
                        text: "Potência Real (kW)"
                    }
                },
                y: {
                    min: 0,
                    max: yMaximoVisivel,
                    title: {
                        display: true,
                        text: "Tempo (s)"
                    }
                }
            }
        }
    });
}

function atualizarGraficoPotenciaTempoConsumo(potenciaReal, tempoSegundos) {
    // Canvas alvo do gráfico de consumo.
    const canvas = document.getElementById("grafico-potencia-tempo-consumo");
    if (!canvas || typeof Chart === "undefined") return;

    // Normaliza e valida entradas numéricas antes de desenhar.
    const tempo = Number(tempoSegundos);
    const potencia = Number(potenciaReal);
    if (!isFinite(tempo) || !isFinite(potencia) || tempo <= 0 || potencia < 0) return;

    // Mesma lógica da injeção para manter consistência visual e de interpretação.
    const xMaximo = Math.max(potencia * 1.8, potencia + 1, 1);
    const TEMPO_INICIO_DEGRAU_PADRAO = 240;
    const tempoInfinitoVisual = Math.max(TEMPO_INICIO_DEGRAU_PADRAO, tempo + 10);
    const yMaximoVisivel = Math.max(tempo * 1.2, tempo + 5, 60);

    // Degrau sem trecho horizontal superior visível.
    const dadosDegrau = [
        { x: potencia, y: tempoInfinitoVisual },
        { x: potencia, y: tempo },
        { x: xMaximo, y: tempo }
    ];

    // Atualização incremental quando já existe instância de gráfico.
    if (graficoPotenciaTempoConsumo) {
        graficoPotenciaTempoConsumo.data.datasets[0].data = dadosDegrau;
        graficoPotenciaTempoConsumo.options.scales.x.max = xMaximo;
        graficoPotenciaTempoConsumo.options.scales.y.max = yMaximoVisivel;
        graficoPotenciaTempoConsumo.update();
        return;
    }

    // Primeira renderização do gráfico de consumo.
    const contexto = canvas.getContext("2d");
    graficoPotenciaTempoConsumo = new Chart(contexto, {
        type: "line",
        data: {
            datasets: [{
                label: "Curva Função 32 Consumo",
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
                    text: "Relação Potência por Tempo - 32 Consumo"
                },
                tooltip: {
                    callbacks: {
                        label: (context) => {
                            const x = context.parsed.x.toFixed(2);
                            const y = context.parsed.y.toFixed(2);
                            return `Potência: ${x} kW | Tempo: ${y} s`;
                        }
                    }
                }
            },
            scales: {
                x: {
                    type: "linear",
                    min: 0,
                    max: xMaximo,
                    title: {
                        display: true,
                        text: "Potência Real (kW)"
                    }
                },
                y: {
                    min: 0,
                    max: yMaximoVisivel,
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

    const botaoParametro2 = document.getElementById("botaoajuste32html");
    if (botaoParametro2) {
        botaoParametro2.style.backgroundColor = "#cf0808";
    }
    // -----------------manter o botão vermelho selecionado-------------------

    // Controle de acesso movido para controle-acesso.js

    //Importa potenciaMinimaSelecionada do localStorage
    let potenciaMinimaSelecionada = parseFloat(localStorage.getItem("potenciaMinimaSelecionada")) || 0;

    //preencher campos do html com os valores do localStorage para injeção
    let potenciaGDSelecionada = localStorage.getItem("potenciaGDSelecionada") || 0; // Valor padrão de 0 se não estiver definido
    if (potenciaGDSelecionada !== null) {
        const potenciaNominalElem = document.getElementById("potencia-nominal-injecao-html");
        if (potenciaNominalElem) {

            if(potenciaGDSelecionada < potenciaMinimaSelecionada){
                potenciaGDSelecionada = potenciaMinimaSelecionada;
            }
            potenciaNominalElem.textContent = potenciaGDSelecionada + " kW";
        }
    }

    const toleranciaInjecao32 = localStorage.getItem("tolerancia-injecao-32") || 105; // Valor padrão de 105 se não estiver definido
    if (toleranciaInjecao32 !== null) {
        const toleranciaInjecaoElem = document.getElementById("tolerancia-injecao-html");
        if (toleranciaInjecaoElem) {
            toleranciaInjecaoElem.value = toleranciaInjecao32;
        }
    }

    const tempoInjecao32 = localStorage.getItem("tempo-injecao-32") || 15; // Valor padrão de 15 se não estiver definido
    if (tempoInjecao32 !== null) {
        const tempoInjecaoElem = document.getElementById("tempo-injecao-html");
        if (tempoInjecaoElem) {
            tempoInjecaoElem.value = tempoInjecao32;
        }
    }
    //-------------------------------------------------------------------------------------------
    // Preencher o campo de potência nominal de consumo com o valor da demanda selecionada
    let demandaSelecionada = localStorage.getItem("demandaSelecionada");
    if (demandaSelecionada !== null) {
        const potenciaNominalConsumoElem = document.getElementById("potencia-nominal-consumo-html");
        if (potenciaNominalConsumoElem) {
            if(demandaSelecionada < potenciaMinimaSelecionada){
                demandaSelecionada = potenciaMinimaSelecionada;
            }
            potenciaNominalConsumoElem.textContent = demandaSelecionada + " kW";
        }
    }



    //persistir os valores de tolerância e tempo de consumo - CORRIGIDO
    const toleranciaConsumo32 = localStorage.getItem("tolerancia-consumo-32") || 105; // Valor padrão de 105 se não estiver definido
    if (toleranciaConsumo32 !== null) {
        const toleranciaConsumoElem = document.getElementById("tolerancia-consumo-html");
        if (toleranciaConsumoElem) {
            toleranciaConsumoElem.value = toleranciaConsumo32;
        }
    }

    const tempoConsumo32 = localStorage.getItem("tempo-consumo-32") || 15; // Valor padrão de 15 se não estiver definido
    if (tempoConsumo32 !== null) {
        const tempoConsumoElem = document.getElementById("tempo-consumo-html");
        if (tempoConsumoElem) {
            tempoConsumoElem.value = tempoConsumo32;
        }
    }

   
    //-------------------------------------------------------------------------------------------







    calcularfuncoes32();

    // Mantém gráfico/valores de injeção em tempo real durante edição.
    const tempoInjecaoInput = document.getElementById("tempo-injecao-html");
    if (tempoInjecaoInput) {
        tempoInjecaoInput.addEventListener("input", calcularfuncoes32);
    }

    const toleranciaInjecaoInput = document.getElementById("tolerancia-injecao-html");
    if (toleranciaInjecaoInput) {
        toleranciaInjecaoInput.addEventListener("input", calcularfuncoes32);
    }

    // Mantém gráfico/valores de consumo em tempo real durante edição.
    const tempoConsumoInput = document.getElementById("tempo-consumo-html");
    if (tempoConsumoInput) {
        tempoConsumoInput.addEventListener("input", calcularfuncoes32);
    }

    const toleranciaConsumoInput = document.getElementById("tolerancia-consumo-html");
    if (toleranciaConsumoInput) {
        toleranciaConsumoInput.addEventListener("input", calcularfuncoes32);
    }



}


async function salvarOpcao() {


    let tolerancia = document.getElementById("tolerancia-injecao-html").value;
    if (tolerancia < 1) {
        await validarPercentualMinimo(tolerancia, "");
        tolerancia = 105;
        document.getElementById("tolerancia-injecao-html").value = 105;
    }
    localStorage.setItem("tolerancia-injecao-32", tolerancia);

    const tempo = document.getElementById("tempo-injecao-html").value;
    localStorage.setItem("tempo-injecao-32", tempo);

    let toleranciaConsumo = document.getElementById("tolerancia-consumo-html").value;
    if (toleranciaConsumo < 100) {
        await validarPercentualMinimo(toleranciaConsumo, "");
        toleranciaConsumo = 105;
        document.getElementById("tolerancia-consumo-html").value = 105;
    }
    localStorage.setItem("tolerancia-consumo-32", toleranciaConsumo);

    const tempoConsumo = document.getElementById("tempo-consumo-html").value;
    localStorage.setItem("tempo-consumo-32", tempoConsumo);


    calcularfuncoes32();

    location.reload();

}


function calcularfuncoes32() {

    //Importa potenciaMinimaSelecionada do localStorage
    const potenciaMinimaSelecionada = parseFloat(localStorage.getItem("potenciaMinimaSelecionada")) || 0;
    console.log("Potência Mínima Selecionada importada do localStorage:", potenciaMinimaSelecionada);

    // Importa o valor de "demandaInjecao" do localStorage
    const demandaInjecao = parseFloat(localStorage.getItem("potenciaGDSelecionada")) || 0;
    console.log("Demanda de Injeção importada do localStorage:", demandaInjecao);

    const toleranciaInjecao = parseFloat(document.getElementById("tolerancia-injecao-html").value) || 105;
    console.log("Tolerância de Injeção importada do HTML:", toleranciaInjecao);

    // Importa o valor de "tcSelecionado" do localStorage
    const potenciabase = parseFloat(localStorage.getItem("potenciabase"));
    console.log("Potência Base importada do localStorage:", potenciabase);

    // Calcula a potência de injeção

    let potenciaInjecao = 0;
    if(demandaInjecao < potenciaMinimaSelecionada){
        potenciaInjecao = potenciaMinimaSelecionada * (1 * toleranciaInjecao / 100);
    } else {
        potenciaInjecao = demandaInjecao * (1 * toleranciaInjecao / 100);
    }


    //exportar potenciaInjecao para o localStorage
    localStorage.setItem("potenciaInjecaoCalculada32", potenciaInjecao);

    

    console.log("Potência de Injeção calculada:", potenciaInjecao);

    const potenciaRealInjecaoElem = document.getElementById("potencia-real-injecao-html");
    if (potenciaRealInjecaoElem) {
        potenciaRealInjecaoElem.textContent = potenciaInjecao.toFixed(2) + " kW";
    }

    // Atualiza o gráfico de injeção com os valores calculados no ciclo atual.
    const tempoInjecaoAtual = parseFloat(document.getElementById("tempo-injecao-html")?.value) || 0;
    atualizarGraficoPotenciaTempoInjecao(potenciaInjecao, tempoInjecaoAtual);

    // Calcula a potência de injeção em P.U.
    let potenciaInjecaoPU = 0;
    if (potenciabase !== 0) {
        potenciaInjecaoPU = potenciaInjecao / potenciabase;
        console.log("Potência de Injeção em P.U:", potenciaInjecaoPU);

        const potenciaInjecaoPUElem = document.getElementById("potencia-pu-injecao-html");
        if (potenciaInjecaoPUElem) {
            potenciaInjecaoPUElem.textContent = potenciaInjecaoPU.toFixed(3) + " P.U";
        }
    }

    // exportar potenciaInjecaoPU para o localStorage
    localStorage.setItem("potenciaInjecaoPU32", potenciaInjecaoPU.toFixed(2));







    // Importa o valor de "demandaSelecionada" do localStorage
    const demandaConsumo = parseFloat(localStorage.getItem("demandaSelecionada")) || 0;
    console.log("Demanda de Consumo importada do localStorage:", demandaConsumo);

    const toleranciaConsumo = parseFloat(document.getElementById("tolerancia-consumo-html").value) || 105;
    console.log("Tolerância de Consumo importada do HTML:", toleranciaConsumo);

    // Calcula a potência de consumo
    let potenciaConsumo = 0;
    if(demandaConsumo < potenciaMinimaSelecionada){
        potenciaConsumo = potenciaMinimaSelecionada * (1 * toleranciaConsumo / 100);
    } else {
        potenciaConsumo = demandaConsumo * (1 * toleranciaConsumo / 100);
    }

    //exportar potenciaConsumo para o localStorage
    localStorage.setItem("potenciaConsumoCalculada32", potenciaConsumo);  

    console.log("Potência de Consumo calculada:", potenciaConsumo);

    const potenciaRealConsumoElem = document.getElementById("potencia-real-consumo-html");
    if (potenciaRealConsumoElem) {
        potenciaRealConsumoElem.textContent = potenciaConsumo.toFixed(2) + " kW";
    }

    // Atualiza o gráfico de consumo com os valores calculados no ciclo atual.
    const tempoConsumoAtual = parseFloat(document.getElementById("tempo-consumo-html")?.value) || 0;
    atualizarGraficoPotenciaTempoConsumo(potenciaConsumo, tempoConsumoAtual);

    // Calcula a potência de consumo em P.U.
    let potenciaConsumoPU = 0;
    if (potenciabase !== 0) {
        potenciaConsumoPU = potenciaConsumo / potenciabase;
        console.log("Potência de Consumo em P.U:", potenciaConsumoPU);

        const potenciaConsumoPUElem = document.getElementById("potencia-pu-consumo-html");
        if (potenciaConsumoPUElem) {
            potenciaConsumoPUElem.textContent = potenciaConsumoPU.toFixed(3) + " P.U";
        }
    }
    
    // exportar potenciaInjecaoPU para o localStorage
    localStorage.setItem("potenciaConsumoPU32", potenciaConsumoPU);




}



// Função para validar o percentual mínimo de 100% e exibir um alerta estilizado
function validarPercentualMinimo(valor, mensagem) {
    if (valor < 100) {
        // Cria o alerta estilizado
        const alerta = document.createElement("div");
        alerta.textContent = mensagem || "O valor percentual não pode ser menor que 100%.";
        alerta.style.position = "fixed";
        alerta.style.top = "20px";
        alerta.style.right = "-400px";
        alerta.style.background = "linear-gradient(to left, #b6fcb6 80%, #fff 100%)";
        alerta.style.color = "#222";
        alerta.style.padding = "16px 32px";
        alerta.style.borderRadius = "8px";
        alerta.style.boxShadow = "0 2px 8px rgba(0,0,0,0.15)";
        alerta.style.fontWeight = "bold";
        alerta.style.fontSize = "1.1em";
        alerta.style.zIndex = "9999";
        alerta.style.transition = "right 0.5s cubic-bezier(.68,-0.55,.27,1.55), opacity 0.5s";

        document.body.appendChild(alerta);

        setTimeout(() => {
            alerta.style.right = "20px";
        }, 50);

        // Retorna uma Promise que resolve após o alerta sumir
        return new Promise(resolve => {
            setTimeout(() => {
                alerta.style.right = "-400px";
                alerta.style.opacity = "0";
                setTimeout(() => {
                    alerta.remove();
                    resolve();
                }, 500);
            }, 2000);
        });
    }
    // Se não precisar alertar, retorna Promise resolvida imediatamente
    return Promise.resolve();
}


// Event listener para capturar Enter em qualquer lugar da página
document.addEventListener('keydown', function(event) {
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
