
//FUNÇÃO PARA SALVAR OS CAMPOS PREENCHIDOS NO LOCAL STORAGE E REALIZAR ALGUNS CÁLCULOS NECESSÁRIOS PARA A PROTEÇÃO

window.onload = function () {


    // -----------------manter o botão vermelho selecionado-------------------
    const botaoParametro = document.getElementById("botaotptchtml");
    if (botaoParametro) {
        botaoParametro.style.backgroundColor = "#cf0808";
    }



    dimensionarTCconformenorma();
    // Recupera a opção selecionada do localStorage e define no campo correspondente
    //-----------------------------------------------------------------------------------------
    //persisti o valor do TC de protecao selecionado do localstorage
    const TC = document.getElementById("tcdeProtecao");
    const TCSalva = localStorage.getItem("TCdeprotecaoEscolhido");
    if (TCSalva) {
        TC.value = TCSalva;
    }

    //persisti o valor de RTP selecionado do localstorage
    const TP = document.getElementById("TPdeprotecaohtml");
    const TPSalva = localStorage.getItem("TPdeprotecaoSelecionada");
    if (TPSalva) {
        TP.value = TPSalva;
    }

    //persisti o valor da ligação do TP de proteção selecionado do localstorage
    const ligacaoBobina = document.getElementById("ligacaodabobinahtml");
    const ligacaoBobinaSalva = localStorage.getItem("ligacaodabobinaSelecionada");
    if (ligacaoBobinaSalva) {
        ligacaoBobina.value = ligacaoBobinaSalva;
    }

    //persisti o valor do RTP auxiliar selecionado do localstorage
    const RTPauxiliar = document.getElementById("RTPauxiliarhtml");
    const RTPauxiliarSalva = localStorage.getItem("RTPauxiliarSelecionada");
    if (RTPauxiliarSalva) {
        RTPauxiliar.value = RTPauxiliarSalva;
    }


    const RTC = document.getElementById("RTChtml");
    const RTCSalva = localStorage.getItem("RTCselecionado");
    if (RTC && RTCSalva) {
        RTC.textContent = RTCSalva;
    }
    //-----------------------------------------------------------------------------------------

    //-----------------------------------------------------------------------------------------


    //-----------------------------------------------------------------------------------------

    //-----------------------------------------------------------------------------------------




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

    // Recupera o valor da potência base do localStorage e exibe no elemento HTML
    const potenciaBaseSelecionada = localStorage.getItem("potenciabase");
    let potenciaBaseElement = document.getElementById("potenciabasehtml");
    if (potenciaBaseElement) {
        potenciaBaseElement.textContent = potenciaBaseSelecionada !== null ? potenciaBaseSelecionada + " kW" : "";
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





    dimensionarTCconformenorma();



}








function salvarOpcao() {

    
    // Exportar valores dos campos para o localStorage

    //exporta selecao do TC de protecao
    const TCdeprotecao = document.getElementById("tcdeProtecao");
    const TCdeprotecaoEscolhido = TCdeprotecao.value;
    localStorage.setItem("TCdeprotecaoEscolhido", TCdeprotecaoEscolhido);

    //exporta o valor do RTP selecionado 
    const TPdeprotecao = document.getElementById("TPdeprotecaohtml");
    const TPdeprotecaoSelecionada = TPdeprotecao.value;
    localStorage.setItem("TPdeprotecaoSelecionada", TPdeprotecaoSelecionada);

    //exporta o valor da ligação do TP de proteção selecionado
    const ligacaoBobina = document.getElementById("ligacaodabobinahtml");
    const ligacaoBobinaSelecionada = ligacaoBobina.value;
    localStorage.setItem("ligacaodabobinaSelecionada", ligacaoBobinaSelecionada);

    //exporta o valor do RTP auxiliar selecionado
    const RTPauxiliar = document.getElementById("RTPauxiliarhtml");
    const RTPauxiliarSelecionada = RTPauxiliar.value;
    localStorage.setItem("RTPauxiliarSelecionada", RTPauxiliarSelecionada);

    dimensionarTCconformenorma();

    location.reload();
}


function dimensionarTCconformenorma() {

    const TPdeprotecaoSelecionada = parseFloat(localStorage.getItem("TPdeprotecaoSelecionada")) || 120;
    let ligacaoBobinaSelecionada = localStorage.getItem("ligacaodabobinaSelecionada");
    if (!ligacaoBobinaSelecionada) {
        ligacaoBobinaSelecionada = "Estrela-Estrela";
    }
    let RTPauxiliarSelecionada = parseFloat(localStorage.getItem("RTPauxiliarSelecionada"));
    if (!RTPauxiliarSelecionada) {
        RTPauxiliarSelecionada = 120;
    }
    const TCdeprotecaoSelecionada = parseFloat(localStorage.getItem("TCdeprotecaoEscolhido")) || 0; // Valor padrão de TC de proteção
    const tensaoSelecionada = parseFloat(localStorage.getItem("tensaoSelecionada")) || 0;
    const demandaSelecionada = parseFloat(localStorage.getItem("demandadecontrato")) || 0;
    const potenciaGDSelecionada = parseFloat(localStorage.getItem("potenciaGDSelecionada")) || 0;
    //localStorage.setItem("potenciaGDSelecionada", potenciaGDSelecionada);
    const fatorPotenciaSelecionada = parseFloat(localStorage.getItem("fatorPotenciaSelecionada")) || 0;
    const fatorPotenciaGDSelecionada = parseFloat(localStorage.getItem("fatorPotenciaGDSelecionada")) || 0;
    const desequilibrioSelecionada = localStorage.getItem("desequilibrioSelecionada") || 0;
    const curtoSelecionada = localStorage.getItem("curtoSelecionada") || 0;
    const instmagconsumo1 = localStorage.getItem("imagtotalSelecionada") || 0;



    // //-----------------------------------------------------------------------------------------
    // const TPdeprotecao = document.getElementById("TPdeprotecaohtml");
    // const TPdeprotecaoSelecionada = TPdeprotecao.value;
    // localStorage.setItem("TPdeprotecaoSelecionada", TPdeprotecaoSelecionada);

    // //-----------------------------------------------------------------------------------------
    // const ligacaoBobina = document.getElementById("ligacaodabobinahtml");
    // const ligacaoBobinaSelecionada = ligacaoBobina.value;
    // localStorage.setItem("ligacaodabobinaSelecionada", ligacaoBobinaSelecionada);

    // //-----------------------------------------------------------------------------------------
    // const RTPauxiliar = document.getElementById("RTPauxiliarhtml");
    // const RTPauxiliarSelecionada = RTPauxiliar.value;
    // localStorage.setItem("RTPauxiliarSelecionada", RTPauxiliarSelecionada);

    // //-----------------------------------------------------------------------------------------


   


    //---------------------------Codigo para definir o TC Ideal---------------------------------------------------------------

    // Cria um array com os valores possíveis de TC
    // Esses valores são os valores nominais dos transformadores de corrente
    const valoresTC = [
        15, 20, 25, 30, 35, 40, 50, 75, 100,
        150, 200, 250, 300, 400, 500, 600, 800, 1000, 1200, 1500, 2000
    ];

    // calcula o valor de corrente nominal de consumo
    let inominalDemanda = 0;
    inominalDemanda = (demandaSelecionada / (tensaoSelecionada * Math.sqrt(3) * fatorPotenciaSelecionada));



    // calcula o valor de corrente nominal de consumo para GD
    let inominalDemandaGD = 0;
    inominalDemandaGD = (potenciaGDSelecionada / (tensaoSelecionada * Math.sqrt(3) * fatorPotenciaGDSelecionada));

    // faz a divisão do valor da corrente de curto por 50 para comparar com os valores do array
    let iprimTccurto = curtoSelecionada / 50;

    // Recupera a corrente instantanea de magnetização selecionada do localStorage para comparar com os valores do array
    let instMagconsumo = instmagconsumo1 / 20;

    // Converte os valores para números calculados nesse escopo no formato de numeros flutuantes
    let iprimTccurtoNum = parseFloat(iprimTccurto);
    let instMagconsumoNum = parseFloat(instMagconsumo) * 1.05;
    let inominalDemandaNum = Math.max(parseFloat(inominalDemanda), parseFloat(inominalDemandaGD));
    let RTCselecionado = parseFloat(TCdeprotecaoSelecionada) / 5;

    // Busca o maior valor em valoresTC que atenda todos os critérios
    let valorTCdimensionado = null;
    for (let i = 0; i < valoresTC.length; i++) {
        const valor = valoresTC[i];
        if (
            valor >= inominalDemandaNum * 1.05 &&
            valor >= iprimTccurtoNum &&
            valor >= instMagconsumoNum
        ) {
            valorTCdimensionado = valor; // pega o menor possível dentro da condição
            break; // para no primeiro (menor) que atende
        }
    }

    //Cacula o RTC ideal 
    let RTCdimensionado = 0;
    if (valorTCdimensionado !== null) {
        RTCdimensionado = (valorTCdimensionado / 5).toFixed(2);
    } else {
        RTCdimensionado = null;
    }

    //Calcula a potência mínima referente a 10% do TC selecionado

    // Se o valor do TC selecionado for nulo, define a potência mínima como 0
    let potenciaMinima2 = 0;
    if (TCdeprotecaoSelecionada === null) {
        potenciaMinima2 = 0;
    }
    // Caso contrário, calcula a potência mínima com base no valor do TC Selecionado
    else {
        potenciaMinima2 = TCdeprotecaoSelecionada * 0.1 * tensaoSelecionada * Math.sqrt(3) * (fatorPotenciaSelecionada);
    }

    console.log("Potência mínima calculada:", potenciaMinima2.toFixed(2));

    //Calcula a potência mínima referente a 10% do TC dimensionado

    let potenciaMinima = valorTCdimensionado * 0.1 * tensaoSelecionada * Math.sqrt(3) * (fatorPotenciaSelecionada);

    console.log("Potência mínima calculada para TC dimensionado:", potenciaMinima.toFixed(2));

    // Armazena o valor TC dimensionado no localStorage
    if (valorTCdimensionado !== null) {
        localStorage.setItem("valorTCideal", valorTCdimensionado);
    } else {
        localStorage.removeItem("valorTCideal");
    }

    // Exibe no console o valor de TCdeprotecaoSelecionada
    console.log("TCdeprotecaoSelecionada:", TCdeprotecaoSelecionada);

    // Armazenar o RTC Selecionado caso não haja valor no TC selecionado
    if (TCdeprotecaoSelecionada === null || TCdeprotecaoSelecionada === "" || TCdeprotecaoSelecionada === 0) {
        localStorage.setItem("RTCselecionado", RTCdimensionado);
        localStorage.setItem("TCdeprotecaoSelecionada", valorTCdimensionado);
        console.log("RTC selecionado (sem TC):", RTCdimensionado);

    } else {
        localStorage.setItem("RTCselecionado", RTCselecionado);
        localStorage.setItem("TCdeprotecaoSelecionada", TCdeprotecaoSelecionada);
        console.log("RTC selecionado:", RTCselecionado);
    }


    //Armazena Potencia minima do primário do TC dimensionado no localStorage caso o valor de TC selecionado seja nulo
    if (TCdeprotecaoSelecionada === null || TCdeprotecaoSelecionada === "" || TCdeprotecaoSelecionada === 0) {

        localStorage.setItem("potenciaMinimaSelecionada", potenciaMinima.toFixed(2));
    } else {
        localStorage.setItem("potenciaMinimaSelecionada", potenciaMinima2.toFixed(2));
    }
    // ----------------------------------------------------------------------
    // ------------------------fim calculos dos TCs-----------------------------------------------


    //-----calcular potencia base para calculos de P.U --------------------

    // Calcula a potência base considerando tc dimensionado caso o TC selecionado seja nulo
    let potenciabase = 0;
    if (TCdeprotecaoSelecionada === null || TCdeprotecaoSelecionada === "" || TCdeprotecaoSelecionada === 0) {

        potenciabase = (tensaoSelecionada * Math.sqrt(3) * valorTCdimensionado).toFixed(2);
        console.log("potenciabase1:", potenciabase);
    }
    else {
        potenciabase = (tensaoSelecionada * Math.sqrt(3) * TCdeprotecaoSelecionada).toFixed(2);
        console.log("potenciabase2:", potenciabase);

    }

    // Armazena a potencia base no localstorage 
    localStorage.setItem("potenciabase", potenciabase); // Armazena a potência base no localStorage


    //-------------FIM DOS CALCULOS DE POTENCIA BASE PARA CALCULOS DE P.U --------------------



    //----------------------Calcular as tensões secundárias do TP auxiliar

    let tensaoSecundariaTPauxiliar = 0;
    if (RTPauxiliarSelecionada) {
        tensaoSecundariaTPauxiliar = (tensaoSelecionada * 1000 / RTPauxiliarSelecionada);
    }

    // Armazena a tensão secundária do TP auxiliar no localStorage
    localStorage.setItem("tensaoSecundariaTPauxiliar", tensaoSecundariaTPauxiliar.toFixed(2));

    // fim dos calculos do TP auxiliar
    //-----------------------------------------------------------------------------------------



    //-----------------Calcular as tensoes secundárias do TP de proteção------------------------------------------------------------------------

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

    // Armazena a tensão secundária do TP de proteção no localStorage
    localStorage.setItem("tensaoSecundariaFFTP", tensaoSecundariaFFTP.toFixed(2));

    // Armazena a tensão primária fase-neutro no localStorage
    localStorage.setItem("tensaoprimariaFN", tensaoprimariaFN ? tensaoprimariaFN.toFixed(2) : "0");

    // Armazena a tensão primária fase-fase no localStorage
    localStorage.setItem("tensaoprimariaFF", tensaoprimariaFF ? tensaoprimariaFF.toFixed(2) : "0");

    // Armazena a tensão secundária do TP de neutro no localStorage
    localStorage.setItem("tensaoSecundariaFNTP", tensaoSecundariaFNTP.toFixed(2));

    //compara potencia minima com a demanda selecionada, se a demanda selecionada for menor que a potencia minima 
    //então uma variavel armazena a potencia selecionada que sera demanda de contrato e a potencia minima é salva no localStorage
    if (demandaSelecionada < potenciaMinima) {
        localStorage.setItem("demandaSelecionada", potenciaMinima.toFixed(2));
        localStorage.setItem("demandadecontrato", demandaSelecionada);

    } else {
        localStorage.setItem("demandaSelecionada", demandaSelecionada);
        localStorage.setItem("demandadecontrato", demandaSelecionada);
    }

    //----------------------CALCULARIA O MINIMO DE CORRENTE DE CONSUMO PARA O TC DE PROTEÇÃO-----------------------------
    //veifica se inominalDemanda é menor que 10% da corrente de primario do TC de proteção dimensionado se for o valor é substituido por 10% do TC de proteção dimensionado
    let correntedeconsumominima = 0;
    if (valorTCdimensionado !== null && valorTCdimensionado !== 0 && valorTCdimensionado !== "") {
        correntedeconsumominima = valorTCdimensionado * 0.1; // Corrente mínima de consumo em A
    }

    // Também calcula corrente mínima de consumo para o TC selecionado
    let correntedeconsumominimaSelecionado = 0;
    if (TCdeprotecaoSelecionada !== null && TCdeprotecaoSelecionada !== 0 && TCdeprotecaoSelecionada !== "") {
        correntedeconsumominimaSelecionado = TCdeprotecaoSelecionada * 0.1;
    }
    

    // Verifica se a corrente nominal de demanda é menor que a corrente mínima de consumo

    let inominalminimaTC;
    if (inominalDemanda < correntedeconsumominimaSelecionado && correntedeconsumominimaSelecionado > 0) {
        inominalDemanda = correntedeconsumominimaSelecionado;
        inominalminimaTC = "Sim";
    } else if (inominalDemanda < correntedeconsumominima && correntedeconsumominima > 0 && correntedeconsumominimaSelecionado === 0) {
        inominalDemanda = correntedeconsumominima;
        
        inominalminimaTC = "Sim";
    } else {
        inominalminimaTC = "Não";
    }



    // let inominalminimaTC; // Variável para armazenar se a corrente nominal de consumo é menor que a mínima
    // if (inominalDemanda < correntedeconsumominima) {
    //     inominalDemanda = correntedeconsumominima;
    //     inominalminimaTC = "Sim";
    // } else {
    //     inominalminimaTC = "Não";
    // }


    //armazena a corrente nominal de consumo no localStorage
    localStorage.setItem("inominalminimaTC", inominalminimaTC); // Armazena a corrente nominal de consumo no localStorage
    localStorage.setItem("correntedeconsumominima", correntedeconsumominima.toFixed(2));
    localStorage.setItem("Inominalfase", inominalDemanda.toFixed(2));

    localStorage.setItem("InominalfaseGD", inominalDemandaGD.toFixed(2));

    console.log("correntedeconsumominima:", correntedeconsumominima.toFixed(2), "inominalDemanda:", (inominalDemanda.toFixed(2)));

    //-----------FIM DO CALCULO DO MINIMO DE CORRENTE DE CONSUMO PARA O TC DE PROTEÇÃO-----------------------------

    const valorTCSelecionado2 = localStorage.getItem("valorTCideal");
    let tcProtecaoIdeal = document.getElementById("tcdeProtecaoideal");
    if (tcProtecaoIdeal) {
        tcProtecaoIdeal.textContent = valorTCSelecionado2 !== null ? valorTCSelecionado2 + " :5" : "";
    }


     //--------------------calucla TC em kA para o rele SEG-----------------------------------------
    const TCdeprotecaoSelecionadaemka = (TCdeprotecaoSelecionada / 1000).toFixed(3);
    localStorage.setItem("TCdeprotecaoSelecionadaemka", TCdeprotecaoSelecionadaemka);
    //---------------------------------------------------------------------------------------------
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
    console.log("valorTCdimensionado:", valorTCdimensionado);
    console.log("tensaoSecundariaTPauxiliar:", tensaoSecundariaTPauxiliar);
    console.log("tensaoSecundariaFFTP:", tensaoSecundariaFFTP);
    console.log("tensaoSecundariaFNTP:", tensaoSecundariaFNTP);
    console.log("tensaoprimariaFN:", tensaoprimariaFN);
    console.log("potenciabase:", potenciabase);
    console.log("RTCdimensionado:", RTCdimensionado);
    console.log("RTCselecionado:", RTCselecionado);


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

