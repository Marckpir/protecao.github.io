
//FUNÇÃO PARA SALVAR OS CAMPOS PREENCHIDOS NO LOCAL STORAGE E REALIZAR ALGUNS CÁLCULOS NECESSÁRIOS PARA A PROTEÇÃO

window.onload = function () {


    // -----------------manter o botão vermelho selecionado-------------------
    const botaoParametro = document.getElementById("botaotptchtml");
    if (botaoParametro) {
        botaoParametro.style.backgroundColor = "#cf0808";
    }

    calcularSaturacaotensaoTC();

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

    // Recupera os valores dos inputs do cálculo da saturação do TC de proteção e define no localStorage

    const potenciaNominalTC = localStorage.getItem("potenciaNominalTC");
    const tensaoSaturacaoNominalTC = localStorage.getItem("tensaoSaturacaoNominalTC");
    const comprimentoCondutorTC = localStorage.getItem("comprimentoCondutorTC");
    const bitolaCondutorTC = localStorage.getItem("bitolaCondutorTC");
    const resistividadeCondutorTC = localStorage.getItem("resistividadeCondutorTC");
    const percentualBurdenTC = localStorage.getItem("percentualBurdenTC");
    const potenciaRelé = localStorage.getItem("potenciaRelé");
    const impedanciaTC = localStorage.getItem("impedanciaTC");

    if (document.getElementById("input-potencia-Nominal-TC-html")) {
        document.getElementById("input-potencia-Nominal-TC-html").value = potenciaNominalTC || "";
    }
    if (document.getElementById("input-tensao-Saturacao-Nominal-TC-html")) {
        document.getElementById("input-tensao-Saturacao-Nominal-TC-html").value = tensaoSaturacaoNominalTC || "";
    }
    if (document.getElementById("input-comprimento-Condutor-TC-html")) {
        document.getElementById("input-comprimento-Condutor-TC-html").value = comprimentoCondutorTC || "";
    }
    if (document.getElementById("input-bitola-Condutor-TC-html")) {
        document.getElementById("input-bitola-Condutor-TC-html").value = bitolaCondutorTC || "";
    }
    if (document.getElementById("input-resistividade-Condutor-TC-html")) {
        document.getElementById("input-resistividade-Condutor-TC-html").value = resistividadeCondutorTC || "";
    }
    if (document.getElementById("input-percentual-burden-TC-html")) {
        document.getElementById("input-percentual-burden-TC-html").value = percentualBurdenTC || "";
    }
    if (document.getElementById("input-potencia-rele-html")) {
        document.getElementById("input-potencia-rele-html").value = potenciaRelé || "";
    }
    if (document.getElementById("input-impedancia-TC-html")) {
        document.getElementById("input-impedancia-TC-html").value = impedanciaTC || "";
    }




    // persistir os valores dos campos spans do calculo de saturação por tensão do TC
    const especificacaoNormaNova = potenciaNominalTC ? potenciaNominalTC : "12.5VA10P20";
    const especificacaoNormaAntiga = tensaoSaturacaoNominalTC ? tensaoSaturacaoNominalTC : "10B50";
    const especificacaoCondutor = comprimentoCondutorTC ? comprimentoCondutorTC + " m" : "6 m";
    const especificacaoBitola = bitolaCondutorTC ? bitolaCondutorTC + " mm²" : "2.5 mm²";
    const especificacaoResistividade = resistividadeCondutorTC ? resistividadeCondutorTC + " Ω.m" : "1.68 x 10⁻⁸ Ω.m";
    const especificacaoPercentualBurden = percentualBurdenTC ? percentualBurdenTC + " %" : "20 %";
    const especificacaoPotenciaRele = potenciaRelé ? potenciaRelé + " VA" : "0.20 VA";
    const tensaoSaturacaoCalculadaTC = localStorage.getItem("tensaoSaturacaoTC") || 0;

    document.getElementById("label-especificacao-norma-nova-html").textContent = especificacaoNormaNova;
    document.getElementById("label-especificacao-norma-antiga-html").textContent = especificacaoNormaAntiga;
    document.getElementById("label-especificacao-condutor-html").textContent = especificacaoCondutor;
    document.getElementById("label-especificacao-bitola-html").textContent = especificacaoBitola;
    document.getElementById("label-especificacao-resistividade-html").textContent = especificacaoResistividade;
    document.getElementById("label-especificacao-percentual-burden-tc-html").textContent = especificacaoPercentualBurden;
    document.getElementById("label-especificacao-potencia-rele-html").textContent = especificacaoPotenciaRele;
    document.getElementById("label-tensao-saturacao-calculada-TC-html").textContent = tensaoSaturacaoCalculadaTC;


    // Importa o status da saturação do TC do localStorage e exibe no elemento HTML correspondente
    const statusSaturacaoTC = localStorage.getItem("statusdasaturacaotc");
    const labelStatusSaturacaoTC = document.getElementById("label-notificacao-saturacao-tc-html");
    if (labelStatusSaturacaoTC) {
        if (statusSaturacaoTC === "sim") {
            labelStatusSaturacaoTC.textContent = "O TC não irá saturar com a ICC";
            labelStatusSaturacaoTC.style.backgroundColor = "#00ff00";
            labelStatusSaturacaoTC.style.animation = "piscaverde 1s infinite";
        } else if (statusSaturacaoTC === "nao") {
            labelStatusSaturacaoTC.textContent = "O TC irá saturar com a ICC";
            labelStatusSaturacaoTC.style.backgroundColor = "#ff0000";
            labelStatusSaturacaoTC.style.animation = "piscavermelho 1s infinite";
        } else {
            labelStatusSaturacaoTC.textContent = "";
            labelStatusSaturacaoTC.style.backgroundColor = "";
            labelStatusSaturacaoTC.style.animation = "";
        }
    }

    // Adicione no seu CSS:
    const style = document.createElement('style');
    style.textContent = `
    @keyframes piscaverde {
        0%, 100% { background-color: #00ff00; }
        50% { background-color: #b6ffb6; }
    }
    @keyframes piscavermelho {
        0%, 100% { background-color: #ff0000; }
        50% { background-color: #ffb6b6; }
    }
    `;
    document.head.appendChild(style);

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




function calcularSaturacaotensaoTC() {


    




    const curtoSelecionada = localStorage.getItem("curtoSelecionada") || 0;
    const potenciaNominalTCString = localStorage.getItem("potenciaNominalTC") || "";
    const potenciaNominalTC = parseFloat((potenciaNominalTCString.match(/^([\d.]+)\s*VA/i) || [])[1]) || 0;
    const tensaoSaturacaoNominalTCString = localStorage.getItem("tensaoSaturacaoNominalTC") || "";
    const tensaoSaturacaoNominalTC = parseFloat((tensaoSaturacaoNominalTCString.match(/[BA](\d+(\.\d+)?)/i) || [])[1]) || 0;
   
    const comprimentoCondutorTC = parseFloat(localStorage.getItem("comprimentoCondutorTC"));
    const bitolaCondutorTC = parseFloat(localStorage.getItem("bitolaCondutorTC"));
    const resistividadeCondutorTC = parseFloat(localStorage.getItem("resistividadeCondutorTC"));
    const percentualBurdenTC = parseFloat(localStorage.getItem("percentualBurdenTC"));
    const potenciaRelé = parseFloat(localStorage.getItem("potenciaRelé"));

    const TCselecionado = localStorage.getItem("TCdeprotecaoSelecionada");

    let impedanciadocondutor = 0;
    let impedanciadorele = 0;
    let impedanciadototal = 0;
    let impedanciaburdenTC = 0;
    let zburdendoTC = 0
    let statusdasaturacaotc =0;

    //calcular impedancia do rele
    // Calcula impedância do relé: se houver valor em potenciaRelé, usa esse valor; senão, assume valor padrão 0.008 Ω
    if (!isNaN(potenciaRelé)) {
        impedanciadorele = potenciaRelé / Math.pow(5, 2) + 3 * (potenciaRelé / Math.pow(5, 2));
    } else {
        impedanciadorele = 0.2 / Math.pow(5, 2) + 3 * (0.2 / Math.pow(5, 2)); // valor padrão
    }

    console.log("Impedância do rele:", impedanciadorele.toFixed(5), "Ω");

    //Calcular a impedancia dos condutores

    if (!isNaN(comprimentoCondutorTC) && !isNaN(bitolaCondutorTC) && !isNaN(resistividadeCondutorTC)) {
        impedanciadocondutor = ((resistividadeCondutorTC * (comprimentoCondutorTC * 2)) / bitolaCondutorTC); // Convertendo bitola de mm² para m²
    } else {
        impedanciadocondutor = ((0.02 * (3)) / 2.5);
    }

    console.log("Impedância do Condutor:", impedanciadocondutor.toFixed(5), "Ω");

    // Calcular a impedância do burden do TC
    if (!isNaN(percentualBurdenTC)) {
        impedanciaburdenTC = (percentualBurdenTC/100) * (potenciaNominalTC/ Math.pow(5, 2));
    } else {
        impedanciaburdenTC = (20/100) * (12.5/ Math.pow(5, 2)); // valor padrão
    }
    

    console.log("Impedância do Burden do TC:", impedanciaburdenTC.toFixed(5), "Ω");


    // Calcular a impedância total do TC
    if (!isNaN(impedanciadocondutor) && !isNaN(impedanciadorele) && !isNaN(impedanciaburdenTC)) {
        impedanciadototal = impedanciadocondutor + impedanciadorele + impedanciaburdenTC;
    } else {
        // impedanciadototal = 0.0240 + 0.2 + 0.0320; // valor padrão
    }

    console.log("Impedância Total do TC:", impedanciadototal.toFixed(5), "Ω");


    // Calcular a ICC refeltida no secundario do TC
    let iccrefletida = 0;
    if (!isNaN(curtoSelecionada) && !isNaN(TCselecionado)) {
        iccrefletida = curtoSelecionada / TCselecionado;
    } 
    
    console.log("Corrente de curto refeltida no secundário do TC:", iccrefletida.toFixed(5), "A");


    // Calcular a tensão de saturação do TC
    let tensaoSaturacaoTC = 0;  
    if (!isNaN(iccrefletida)) {
        tensaoSaturacaoTC = iccrefletida * impedanciadototal;
    } else {
        tensaoSaturacaoTC = (0.2 * (0.0240 / 5) * iccrefletida).toFixed(2); // valor padrão
    }
    localStorage.setItem("tensaoSaturacaoTC", tensaoSaturacaoTC.toFixed(2));
    console.log("Tensão de saturação do TC:", tensaoSaturacaoTC.toFixed(2), "V");

    // Comparar tensao de saturação selecionada com a calculada e dizer se a calculada é menor caso houver valor
    if (!isNaN(tensaoSaturacaoNominalTC) && !isNaN(tensaoSaturacaoTC)) {
        if (tensaoSaturacaoTC <= tensaoSaturacaoNominalTC) {
            statusdasaturacaotc = 'sim';
            console.log("A tensão de saturação calculada é menor ou igual à nominal.");
        } else {
            statusdasaturacaotc = 'nao';
            console.log("A tensão de saturação calculada é maior que a nominal.");
        }
    }

    // Exibir o status da saturação do TC no console
    console.log("Status da saturação do TC:", statusdasaturacaotc);
    localStorage.setItem("statusdasaturacaotc", statusdasaturacaotc);

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

    // ----------------------------------------------------------------------
    // exportar preenchimentos dos inputs do calculo da saturação do TC de proteção

    // Exporta preenchimentos dos inputs do cálculo da saturação do TC de proteção
    const potenciaNominalTC = document.getElementById("input-potencia-Nominal-TC-html");
    localStorage.setItem("potenciaNominalTC", potenciaNominalTC ? potenciaNominalTC.value : "");

    const tensaoSaturacaoNominalTC = document.getElementById("input-tensao-Saturacao-Nominal-TC-html");
    localStorage.setItem("tensaoSaturacaoNominalTC", tensaoSaturacaoNominalTC ? tensaoSaturacaoNominalTC.value : "");

    const comprimentoCondutorTC = document.getElementById("input-comprimento-Condutor-TC-html");
    localStorage.setItem("comprimentoCondutorTC", comprimentoCondutorTC ? comprimentoCondutorTC.value : "");

    const bitolaCondutorTC = document.getElementById("input-bitola-Condutor-TC-html");
    localStorage.setItem("bitolaCondutorTC", bitolaCondutorTC ? bitolaCondutorTC.value : "");

    const resistividadeCondutorTC = document.getElementById("input-resistividade-Condutor-TC-html");
    localStorage.setItem("resistividadeCondutorTC", resistividadeCondutorTC ? resistividadeCondutorTC.value : "");

    const percentualBurdenTC = document.getElementById("input-percentual-burden-TC-html");
    localStorage.setItem("percentualBurdenTC", percentualBurdenTC ? percentualBurdenTC.value : "");

    const potenciaRelé = document.getElementById("input-potencia-rele-html");
    localStorage.setItem("potenciaRelé", potenciaRelé ? potenciaRelé.value : "");

    const impedanciaTC = document.getElementById("input-impedancia-TC-html");
    localStorage.setItem("impedanciaTC", impedanciaTC ? impedanciaTC.value : "");











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



    //Calcula a potência mínima referente a 10% do TC dimensionado

    let potenciaMinima = valorTCdimensionado * 0.1 * tensaoSelecionada * Math.sqrt(3) * (fatorPotenciaSelecionada);



    // Armazena o valor TC dimensionado no localStorage
    if (valorTCdimensionado !== null) {
        localStorage.setItem("valorTCideal", valorTCdimensionado);
    } else {
        localStorage.removeItem("valorTCideal");
    }

    // Exibe no console o valor de TCdeprotecaoSelecionada
    const TCdeprotecaoSelecionadaemka = 0;
    // Armazenar o RTC Selecionado caso não haja valor no TC selecionado
    if (TCdeprotecaoSelecionada === null || TCdeprotecaoSelecionada === "" || TCdeprotecaoSelecionada === 0) {
        localStorage.setItem("RTCselecionado", RTCdimensionado);
        localStorage.setItem("TCdeprotecaoSelecionada", valorTCdimensionado);
        localStorage.setItem("TCdeprotecaoSelecionadaemka", (valorTCdimensionado / 1000).toFixed(3));

    } else {
        localStorage.setItem("RTCselecionado", RTCselecionado);
        localStorage.setItem("TCdeprotecaoSelecionada", TCdeprotecaoSelecionada);
        localStorage.setItem("TCdeprotecaoSelecionadaemka", (TCdeprotecaoSelecionada / 1000).toFixed(3));
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
    }
    else {
        potenciabase = (tensaoSelecionada * Math.sqrt(3) * TCdeprotecaoSelecionada).toFixed(2);

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


    //-----------FIM DO CALCULO DO MINIMO DE CORRENTE DE CONSUMO PARA O TC DE PROTEÇÃO-----------------------------

    const valorTCSelecionado2 = localStorage.getItem("valorTCideal");
    let tcProtecaoIdeal = document.getElementById("tcdeProtecaoideal");
    if (tcProtecaoIdeal) {
        tcProtecaoIdeal.textContent = valorTCSelecionado2 !== null ? valorTCSelecionado2 + " :5" : "";
    }


    //--------------------calucla TC em kA para o rele SEG-----------------------------------------
    // const TCdeprotecaoSelecionadaemka = (TCdeprotecaoSelecionada / 1000).toFixed(3);
    // localStorage.setItem("TCdeprotecaoSelecionadaemka", TCdeprotecaoSelecionadaemka);
    //---------------------------------------------------------------------------------------------



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
