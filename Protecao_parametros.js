

//chama função ao se clicar no botão 
function salvarOpcao() {

    //inicializa duas variaveis do tipo constante, um obtem o valor da ID meu select
    //que corresponde ao valor armazenado no campo de selecao e a outra armazena o valor desse campo
    const tensao = document.getElementById("tensaoprimaria");
    const tensaoSelecionada = tensao.value;
    localStorage.setItem("tensaoSelecionada", tensaoSelecionada);

    //-----------------------------------------------------------------------------------------
    const demandaPotencia = document.getElementById("demandaConsumo");
    const demandaSelecionada = demandaPotencia.value;
    localStorage.setItem("demandaSelecionada", demandaSelecionada);

    //-----------------------------------------------------------------------------------------
    const fatorPotencia = document.getElementById("fatorPotencia");
    const fatorPotenciaSelecionada = fatorPotencia.value / 100;
    localStorage.setItem("fatorPotenciaSelecionada", fatorPotenciaSelecionada);

    //-----------------------------------------------------------------------------------------
    const desequilibrio = document.getElementById("desequilibrio");
    const desequilibrioSelecionada = desequilibrio.value;
    localStorage.setItem("desequilibrioSelecionada", desequilibrioSelecionada);

    //-----------------------------------------------------------------------------------------
    const curto = document.getElementById("icctrifasica");
    const curtoSelecionada = curto.value;
    localStorage.setItem("curtoSelecionada", curtoSelecionada);

    //-----------------------------------------------------------------------------------------

    const TCdeprotecao = document.getElementById("tcdeProtecao");
    const TCdeprotecaoSelecionada = TCdeprotecao.value;
    localStorage.setItem("TCdeprotecaoSelecionada", TCdeprotecaoSelecionada);

    //calucla TC em kA para o rele SEG
    const TCdeprotecaoSelecionadaemka = (TCdeprotecaoSelecionada / 1000).toFixed(3);
    localStorage.setItem("TCdeprotecaoSelecionadaemka", TCdeprotecaoSelecionadaemka);

    //-----------------------------------------------------------------------------------------
    const TPdeprotecao = document.getElementById("TPdeprotecaohtml");
    const TPdeprotecaoSelecionada = TPdeprotecao.value;
    localStorage.setItem("TPdeprotecaoSelecionada", TPdeprotecaoSelecionada);

    //-----------------------------------------------------------------------------------------
    const ligacaoBobina = document.getElementById("ligacaodabobinahtml");
    const ligacaoBobinaSelecionada = ligacaoBobina.value;
    localStorage.setItem("ligacaodabobinaSelecionada", ligacaoBobinaSelecionada);

    //-----------------------------------------------------------------------------------------
    const RTPauxiliar = document.getElementById("RTPauxiliarhtml");
    const RTPauxiliarSelecionada = RTPauxiliar.value;
    localStorage.setItem("RTPauxiliarSelecionada", RTPauxiliarSelecionada);

    //-----------------------------------------------------------------------------------------
//seleciona a tabela do rele de proteção e armazena no localStorage
    // const tabelaSelect = document.getElementById("tabelaselecionadahtml");
    // if (tabelaSelect) {
    //     const tabelaSelecionada = tabelaSelect.value;
    //     localStorage.setItem("tabelaselecionadahtml", tabelaSelecionada);
    // }

    //-----------------------------------------------------------------------------------------


    // Codigo para definir o TC Ideal

    // Cria um array com os valores possíveis de TC
    // Esses valores são os valores nominais dos transformadores de corrente
    const valoresTC = [
        15, 20, 25, 30, 35, 40, 50, 75, 100,
        150, 200, 250, 300, 400, 500, 600, 800, 1000, 1200, 1500, 2000
    ];

    // calcula o valor de corrente nominal de consumo
    let inominalDemanda = 0;
    inominalDemanda = (demandaSelecionada / (tensaoSelecionada * Math.sqrt(3) * fatorPotenciaSelecionada));

    // faz a divisão do valor da corrente nominal por 50 para comparar com os valores do array
    let iprimTccurto = curtoSelecionada / 50;

    // Recupera a corrente instantanea de magnetização selecionada do localStorage para comparar com os valores do array
    let instMagconsumo = localStorage.getItem("Instfaseconsumo") / 20;

    // Converte os valores para números calculados nesse escopo para numeros flutuantes
    let iprimTccurtoNum = parseFloat(iprimTccurto);
    let instMagconsumoNum = parseFloat(instMagconsumo);
    let inominalDemandaNum = parseFloat(inominalDemanda);
    let RTCselecionado = parseFloat(TCdeprotecaoSelecionada) / 5;


    // Busca o maior valor em valoresTC que atenda todos os critérios
    let valorTCSelecionado = null;
    for (let i = 0; i < valoresTC.length; i++) {
        const valor = valoresTC[i];
        if (
            valor >= inominalDemandaNum * 1.05 &&
            valor >= iprimTccurtoNum &&
            valor >= instMagconsumoNum
        ) {
            valorTCSelecionado = valor; // pega o menor possível dentro da condição
            break; // para no primeiro (menor) que atende
        }

    }

    //Calcula a potência mínima referente a 10% do TC ideal

    let potenciaMinima = TCdeprotecaoSelecionada * 0.1 * tensaoSelecionada * Math.sqrt(3) * fatorPotenciaSelecionada;


    // Armazena o valor selecionado no localStorage e exibe no console log
    if (valorTCSelecionado !== null) {
        localStorage.setItem("valorTCideal", valorTCSelecionado);
        
    } else {
        
        localStorage.removeItem("valorTCideal");
    }

    localStorage.setItem("RTCselecionado", RTCselecionado);
    
    //Armazena Potencia minima do primário do TC no localStorage
    localStorage.setItem("potenciaMinimaSelecionada", potenciaMinima.toFixed(2));
    // ----------------------------------------------------------------------
    // ------------------------fim calculos dos TCs-----------------------------------------------


    
    //-----------------------------------------------------------------------------------------
    //Calcular as tensões secundárias do TP auxiliar

    let tensaoSecundariaTPauxiliar = 0;
    if (RTPauxiliarSelecionada) {
        tensaoSecundariaTPauxiliar = (tensaoSelecionada * 1000 / RTPauxiliarSelecionada);
    }

    // Armazena a tensão secundária do TP auxiliar no localStorage
    localStorage.setItem("tensaoSecundariaTPauxiliar", tensaoSecundariaTPauxiliar.toFixed(2));

    // fim dos calculos do TP auxiliar
    //-----------------------------------------------------------------------------------------



    //-----------------------------------------------------------------------------------------
    // Calcular as tensoes secundárias do TP de proteção
    
    let tensaoprimariaFN;
    let tensaoprimariaFF;
    let tensaoSecundariaFNTP;
    let tensaoSecundariaFFTP;
    if (!TPdeprotecaoSelecionada) {
    
        tensaoSecundariaFNTP = 0;
        tensaoSecundariaFFTP = 0;
    } else if (ligacaoBobinaSelecionada === "Estrela-Estrela") {
        tensaoprimariaFN = tensaoSelecionada * 1000 / Math.sqrt(3);
        tensaoprimariaFF = tensaoSelecionada * 1000;

        tensaoSecundariaFNTP = tensaoprimariaFN / TPdeprotecaoSelecionada;
        tensaoSecundariaFFTP = tensaoSecundariaFNTP * Math.sqrt(3);
    } else if (ligacaoBobinaSelecionada === "Triangulo-Estrela") {
        tensaoprimariaFN = tensaoSelecionada * 1000;
        tensaoprimariaFF = tensaoSelecionada * 1000;

        tensaoSecundariaFNTP = tensaoprimariaFN / TPdeprotecaoSelecionada;
        tensaoSecundariaFFTP = tensaoSecundariaFNTP * Math.sqrt(3);
    } else {
        tensaoSecundariaFNTP = 0;
        tensaoSecundariaFFTP = 0;
    }


    // const tensaoSecundariaFFTP = (tensaoprimariaFN/ TPdeprotecaoSelecionada); // Tensão secundária do TP de proteção
    
    // const tensaoSecundariaFNTP = tensaoprimariaFN/ Math.sqrt(3); // Tensão secundária do TP de neutro

    
    
    // Armazena a tensão secundária do TP de proteção no localStorage
    localStorage.setItem("tensaoSecundariaFFTP", tensaoSecundariaFFTP.toFixed(2));

    // Armazena a tensão primária fase-neutro no localStorage
    localStorage.setItem("tensaoprimariaFN", tensaoprimariaFN ? tensaoprimariaFN.toFixed(2) : "0");

    // Armazena a tensão primária fase-fase no localStorage
    localStorage.setItem("tensaoprimariaFF", tensaoprimariaFF ? tensaoprimariaFF.toFixed(2) : "0");

    // Armazena a tensão secundária do TP de neutro no localStorage
    localStorage.setItem("tensaoSecundariaFNTP", tensaoSecundariaFNTP.toFixed(2));



    console.log("tensaoSelecionada:", tensaoSelecionada);
    console.log("demandaSelecionada:", demandaSelecionada);
    console.log("fatorPotenciaSelecionada:", fatorPotenciaSelecionada);
    console.log("desequilibrioSelecionada:", desequilibrioSelecionada);
    console.log("curtoSelecionada:", curtoSelecionada);
    console.log("inominalDemanda:", inominalDemanda);
    console.log("iprimTccurto:", iprimTccurto);
    console.log("instMagconsumo:", instMagconsumo);
    console.log("iprimTccurtoNum:", iprimTccurtoNum);
    console.log("instMagconsumoNum:", instMagconsumoNum);
    console.log("inominalDemandaNum:", inominalDemandaNum);
    console.log("valorTCSelecionado:", valorTCSelecionado);
    console.log("tensaoSecundariaTPauxiliar:", tensaoSecundariaTPauxiliar);
    console.log("tensaoSecundariaFFTP:", tensaoSecundariaFFTP);
    console.log("tensaoSecundariaFNTP:", tensaoSecundariaFNTP);
    console.log("tensaoprimariaFN:", tensaoprimariaFN);






    // Recarrega a página após salvar as opções
    location.reload();
}


window.onload = function () {
    // -----------------manter o botão vermelho selecionado-------------------
    const botaoParametro = document.getElementById("botaoparametrohtml");
    if (botaoParametro) {
        botaoParametro.style.backgroundColor = "#cf0808";
    }
    // --------------------------------------------------------------------------

    // Recupera a opção selecionada do localStorage e define no campo correspondente
    //-----------------------------------------------------------------------------------------
    //-----------------------------------------------------------------------------------------
    const tensao = document.getElementById("tensaoprimaria");
    const tensaoSalva = localStorage.getItem("tensaoSelecionada");

    if (tensaoSalva) {
        tensao.value = tensaoSalva;
    }
    //-----------------------------------------------------------------------------------------

    const demanda = document.getElementById("demandaConsumo");
    const demandaSalva = localStorage.getItem("demandaSelecionada");
    if (demandaSalva) {
        demanda.value = demandaSalva;
    }
    //-----------------------------------------------------------------------------------------
    const fatorp = document.getElementById("fatorPotencia");
    const fatorpSalva = localStorage.getItem("fatorPotenciaSelecionada");
    if (fatorpSalva) {
        fatorp.value = fatorpSalva * 100;
    }
    //-----------------------------------------------------------------------------------------
    const desequilibrio = document.getElementById("desequilibrio");
    const desequilibrioSalva = localStorage.getItem("desequilibrioSelecionada");
    if (desequilibrioSalva) {
        desequilibrio.value = desequilibrioSalva;
    }
    //-----------------------------------------------------------------------------------------
    const curto = document.getElementById("icctrifasica");
    const curtoSalva = localStorage.getItem("curtoSelecionada");
    if (curtoSalva) {
        curto.value = curtoSalva;
    }
    //-----------------------------------------------------------------------------------------
    const TC = document.getElementById("tcdeProtecao");
    const TCSalva = localStorage.getItem("TCdeprotecaoSelecionada");
    if (TCSalva) {
        TC.value = TCSalva;
    }
    //-----------------------------------------------------------------------------------------
   
    const RTC = document.getElementById("RTChtml");
    const RTCSalva = localStorage.getItem("RTCselecionado");
    if (RTC && RTCSalva) {
        RTC.textContent = RTCSalva;
    }
    //-----------------------------------------------------------------------------------------
    const TP = document.getElementById("TPdeprotecaohtml");
    const TPSalva = localStorage.getItem("TPdeprotecaoSelecionada");
    if (TPSalva) {
        TP.value = TPSalva;
    }
    //-----------------------------------------------------------------------------------------

    const ligacaoBobina = document.getElementById("ligacaodabobinahtml");
    const ligacaoBobinaSalva = localStorage.getItem("ligacaodabobinaSelecionada");
    if (ligacaoBobinaSalva) {
        ligacaoBobina.value = ligacaoBobinaSalva;
    }
    //-----------------------------------------------------------------------------------------
    const RTPauxiliar = document.getElementById("RTPauxiliarhtml");
    const RTPauxiliarSalva = localStorage.getItem("RTPauxiliarSelecionada");
    if (RTPauxiliarSalva) {
        RTPauxiliar.value = RTPauxiliarSalva;
    }

    //-----------------------------------------------------------------------------------------
    // const tabelaSelecionada = localStorage.getItem("tabelaselecionadahtml");
    // const tabelaElement = document.getElementById("tabelaselecionadahtml");
    // if (tabelaSelecionada && tabelaElement) {
    //     tabelaElement.value = tabelaSelecionada;
    // }



    //-----------------------------------------------------------------------------------------


    //Exibir valor do TC ideal no HTML

    // Recupera o valor do TC ideal do localStorage e exibe no elemento HTML
    const valorTCSelecionado = localStorage.getItem("valorTCideal");
    let tcProtecaoIdeal = document.getElementById("tcdeProtecaoideal");
    if (tcProtecaoIdeal) {
        tcProtecaoIdeal.textContent = valorTCSelecionado !== null ? valorTCSelecionado + " :5" : "";
    }
    // Recupera o valor da potência mínima do localStorage e exibe no elemento HTML
    const potenciaMinimaSelecionada = localStorage.getItem("potenciaMinimaSelecionada");
    let potenciaMinimaElement = document.getElementById("potenciaMinimahtml");
    if (potenciaMinimaElement) {
        potenciaMinimaElement.textContent = potenciaMinimaSelecionada !== null ? potenciaMinimaSelecionada + " kW" : "";
    }

    // Recupera o valor da tensão secundária do TP auxiliar do localStorage e exibe no elemento HTML
    const tensaoSecundariaTPauxiliar = localStorage.getItem("tensaoSecundariaTPauxiliar");
    let tensaoSecundariaAuxiliarElement = document.getElementById("tensaosecundariaauxiliarhtml");
    if (tensaoSecundariaAuxiliarElement) {
        tensaoSecundariaAuxiliarElement.textContent = tensaoSecundariaTPauxiliar !== null ? tensaoSecundariaTPauxiliar + " V" : "";
    }

    // Recupera o valor da tensão secundária fase-fase do TP de proteção e exibe no elemento HTML
    const tensaoSecundariaFFTP = localStorage.getItem("tensaoSecundariaFFTP");
    let tensaoSecundariaFFElement = document.getElementById("tensaosecundariaffhtml");
    if (tensaoSecundariaFFElement) {
        tensaoSecundariaFFElement.textContent = tensaoSecundariaFFTP !== null ? tensaoSecundariaFFTP + " V" : "";
    }

    // Recupera o valor da tensão secundária fase-neutro do TP de proteção e exibe no elemento HTML
    const tensaoSecundariaFNTP = localStorage.getItem("tensaoSecundariaFNTP");
    let tensaoSecundariaFNElement = document.getElementById("tensaosecundariafnhtml");
    if (tensaoSecundariaFNElement) {
        tensaoSecundariaFNElement.textContent = tensaoSecundariaFNTP !== null ? tensaoSecundariaFNTP + " V" : "";
    }








}


// function salvarTabela(){

//     const tabelaSelect = document.getElementById("tabelaselecionadahtml");
//     if (tabelaSelect) {
//         const tabelaSelecionada = tabelaSelect.value;
//         localStorage.setItem("tabelaselecionadahtml", tabelaSelecionada);
//     }


// }









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
