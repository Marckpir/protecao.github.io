









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


    //preencher campos do html com os valores do localStorage para injeção
    const potenciaGDSelecionada = localStorage.getItem("potenciaGDSelecionada");
    if (potenciaGDSelecionada !== null) {
        const potenciaNominalElem = document.getElementById("potencia-nominal-injecao-html");
        if (potenciaNominalElem) {
            potenciaNominalElem.textContent = potenciaGDSelecionada + " kW";
        }
    }

    const toleranciaInjecao32 = localStorage.getItem("tolerancia-injecao-32");
    if (toleranciaInjecao32 !== null) {
        const toleranciaInjecaoElem = document.getElementById("tolerancia-injecao-html");
        if (toleranciaInjecaoElem) {
            toleranciaInjecaoElem.value = toleranciaInjecao32;
        }
    }

    const tempoInjecao32 = localStorage.getItem("tempo-injecao-32");
    if (tempoInjecao32 !== null) {
        const tempoInjecaoElem = document.getElementById("tempo-injecao-html");
        if (tempoInjecaoElem) {
            tempoInjecaoElem.value = tempoInjecao32;
        }
    }
    //-------------------------------------------------------------------------------------------
    // Preencher o campo de potência nominal de consumo com o valor da demanda selecionada
    const demandaSelecionada = localStorage.getItem("demandaSelecionada");
    if (demandaSelecionada !== null) {
        const potenciaNominalConsumoElem = document.getElementById("potencia-nominal-consumo-html");
        if (potenciaNominalConsumoElem) {
            potenciaNominalConsumoElem.textContent = demandaSelecionada + " kW";
        }
    }



    //persistir os valores de tolerância e tempo de consumo - CORRIGIDO
    const toleranciaConsumo32 = localStorage.getItem("tolerancia-consumo-32");
    if (toleranciaConsumo32 !== null) {
        const toleranciaConsumoElem = document.getElementById("tolerancia-consumo-html");
        if (toleranciaConsumoElem) {
            toleranciaConsumoElem.value = toleranciaConsumo32;
        }
    }

    const tempoConsumo32 = localStorage.getItem("tempo-consumo-32");
    if (tempoConsumo32 !== null) {
        const tempoConsumoElem = document.getElementById("tempo-consumo-html");
        if (tempoConsumoElem) {
            tempoConsumoElem.value = tempoConsumo32;
        }
    }

   
    //-------------------------------------------------------------------------------------------







    calcularfuncoes32();



}


function salvarOpcao() {
    // const tolerancia = document.getElementById("tolerancia-consumo-html").value;
    // const tempo = document.getElementById("tempo-consumo-html").value;

    // // Aqui você pode implementar a lógica para salvar as opções
    // console.log("Opções salvas:");
    // console.log("Tolerância:", tolerancia);
    // console.log("Tempo:", tempo);


    const tolerancia = document.getElementById("tolerancia-injecao-html").value;
    localStorage.setItem("tolerancia-injecao-32", tolerancia);

    const tempo = document.getElementById("tempo-injecao-html").value;
    localStorage.setItem("tempo-injecao-32", tempo);

    const toleranciaConsumo = document.getElementById("tolerancia-consumo-html").value;
    localStorage.setItem("tolerancia-consumo-32", toleranciaConsumo);

    const tempoConsumo = document.getElementById("tempo-consumo-html").value;
    localStorage.setItem("tempo-consumo-32", tempoConsumo);


    calcularfuncoes32();

    location.reload();

}


function calcularfuncoes32() {

    // Importa o valor de "demandaInjecao" do localStorage
    const demandaInjecao = parseFloat(localStorage.getItem("potenciaGDSelecionada"));
    console.log("Demanda de Injeção importada do localStorage:", demandaInjecao);

    const toleranciaInjecao = parseFloat(document.getElementById("tolerancia-injecao-html").value);
    console.log("Tolerância de Injeção importada do HTML:", toleranciaInjecao);

    // Importa o valor de "tcSelecionado" do localStorage
    const potenciabase = parseFloat(localStorage.getItem("potenciabase"));
    console.log("Potência Base importada do localStorage:", potenciabase);

    // Calcula a potência de injeção
    const potenciaInjecao = demandaInjecao * (1 + toleranciaInjecao / 100);
    console.log("Potência de Injeção calculada:", potenciaInjecao);

    const potenciaRealInjecaoElem = document.getElementById("potencia-real-injecao-html");
    if (potenciaRealInjecaoElem) {
        potenciaRealInjecaoElem.textContent = potenciaInjecao.toFixed(2) + " kW";
    }

    // Calcula a potência de injeção em P.U.
    if (potenciabase !== 0) {
        let potenciaInjecaoPU = potenciaInjecao / potenciabase;
        console.log("Potência de Injeção em P.U:", potenciaInjecaoPU);

        const potenciaInjecaoPUElem = document.getElementById("potencia-pu-injecao-html");
        if (potenciaInjecaoPUElem) {
            potenciaInjecaoPUElem.textContent = potenciaInjecaoPU.toFixed(3) + " p.u.";
        }
    }


    // Importa o valor de "demandaSelecionada" do localStorage
    const demandaConsumo = parseFloat(localStorage.getItem("demandaSelecionada"));
    console.log("Demanda de Consumo importada do localStorage:", demandaConsumo);

    const toleranciaConsumo = parseFloat(document.getElementById("tolerancia-consumo-html").value);
    console.log("Tolerância de Consumo importada do HTML:", toleranciaConsumo);

    // Calcula a potência de consumo
    const potenciaConsumo = demandaConsumo * (1 + toleranciaConsumo / 100);
    console.log("Potência de Consumo calculada:", potenciaConsumo);

    const potenciaRealConsumoElem = document.getElementById("potencia-real-consumo-html");
    if (potenciaRealConsumoElem) {
        potenciaRealConsumoElem.textContent = potenciaConsumo.toFixed(2) + " kW";
    }

    // Calcula a potência de consumo em P.U.
    if (potenciabase !== 0) {
        let potenciaConsumoPU = potenciaConsumo / potenciabase;
        console.log("Potência de Consumo em P.U:", potenciaConsumoPU);

        const potenciaConsumoPUElem = document.getElementById("potencia-pu-consumo-html");
        if (potenciaConsumoPUElem) {
            potenciaConsumoPUElem.textContent = potenciaConsumoPU.toFixed(3) + " p.u.";
        }
    }





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
