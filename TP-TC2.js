
//FUNÇÃO PARA SALVAR OS CAMPOS PREENCHIDOS NO LOCAL STORAGE E REALIZAR ALGUNS CÁLCULOS NECESSÁRIOS PARA A PROTEÇÃO

window.onload = function () {


    // -----------------manter o botão vermelho selecionado-------------------
    const botaoParametro = document.getElementById("botaotptchtml");
    if (botaoParametro) {
        botaoParametro.style.backgroundColor = "#cf0808";
    }




    // Recupera a opção selecionada do localStorage e define no campo correspondente
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


    

    //inicializa duas variaveis do tipo constante, um obtem o valor da ID meu select
    //que corresponde ao valor armazenado no campo de selecao e a outra armazena o valor desse campo

    const tensaoSelecionada = parseFloat(localStorage.getItem("tensaoSelecionada")) || 0;

    //-----------------------------------------------------------------------------------------
    const demandaSelecionada = parseFloat(localStorage.getItem("demandadecontrato")) || 0;
    //localStorage.setItem("demandaSelecionada", demandaSelecionada);

    //-----------------------------------------------------------------------------------------
    const potenciaGDSelecionada = parseFloat(localStorage.getItem("potenciaGDSelecionada")) || 0;
    //localStorage.setItem("potenciaGDSelecionada", potenciaGDSelecionada);
    //-----------------------------------------------------------------------------------------

    const fatorPotenciaSelecionada = parseFloat(localStorage.getItem("fatorPotenciaSelecionada")) || 0;
    //-----------------------------------------------------------------------------------------
    const fatorPotenciaGDSelecionada = parseFloat(localStorage.getItem("fatorPotenciaGDSelecionada")) || 0;

    //-----------------------------------------------------------------------------------------

    //-----------------------------------------------------------------------------------------

    const desequilibrioSelecionada = localStorage.getItem("desequilibrioSelecionada") || 0;


    //-----------------------------------------------------------------------------------------
    const curtoSelecionada = localStorage.getItem("curtoSelecionada") || 0;

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

    console.log("inominalDemanda:", inominalDemanda);

    // calcula o valor de corrente nominal de consumo para GD
    let inominalDemandaGD = 0;
    inominalDemandaGD = (potenciaGDSelecionada / (tensaoSelecionada * Math.sqrt(3) * fatorPotenciaGDSelecionada));

    console.log("inominalDemandaGD:", inominalDemandaGD);
    //

    // faz a divisão do valor da corrente de curto por 50 para comparar com os valores do array
    let iprimTccurto = curtoSelecionada / 50;

    // Recupera a corrente instantanea de magnetização selecionada do localStorage para comparar com os valores do array
    let instMagconsumo = localStorage.getItem("imagtotalSelecionada") / 20;

    // Converte os valores para números calculados nesse escopo para numeros flutuantes
    let iprimTccurtoNum = parseFloat(iprimTccurto);
    let instMagconsumoNum = parseFloat(instMagconsumo) * 1.05;
    let inominalDemandaNum = Math.max(parseFloat(inominalDemanda), parseFloat(inominalDemandaGD));
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
    console.log("Valor TC Ideal:", valorTCSelecionado);
    let potenciaMinima = TCdeprotecaoSelecionada * 0.1 * tensaoSelecionada * Math.sqrt(3) * (fatorPotenciaSelecionada);


    // Armazena o valor selecionado no localStorage
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


    //-----calcular potencia base para calculos de P.U --------------------

    const potenciabase = (tensaoSelecionada * Math.sqrt(3) * TCdeprotecaoSelecionada).toFixed(2); // Potência base em kVA


    localStorage.setItem("potenciabase", potenciabase); // Armazena a potência base no localStorage


    //-------------FIM DOS CALCULOS DE POTENCIA BASE PARA CALCULOS DE P.U --------------------


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

    // Armazena a tensão secundária do TP de proteção no localStorage
    localStorage.setItem("tensaoSecundariaFFTP", tensaoSecundariaFFTP.toFixed(2));

    // Armazena a tensão primária fase-neutro no localStorage
    localStorage.setItem("tensaoprimariaFN", tensaoprimariaFN ? tensaoprimariaFN.toFixed(2) : "0");

    // Armazena a tensão primária fase-fase no localStorage
    localStorage.setItem("tensaoprimariaFF", tensaoprimariaFF ? tensaoprimariaFF.toFixed(2) : "0");

    // Armazena a tensão secundária do TP de neutro no localStorage
    localStorage.setItem("tensaoSecundariaFNTP", tensaoSecundariaFNTP.toFixed(2));

    //compara potencia minima com a demanda selecionada, se a demanda for menor que a potencia minima 
    //então uma variavel armazena a potencia selecionada e a potencia minima é salva no localStorage
    if (demandaSelecionada < potenciaMinima) {
        localStorage.setItem("demandaSelecionada", potenciaMinima.toFixed(2));
        localStorage.setItem("demandadecontrato", demandaSelecionada);

    } else {
        localStorage.setItem("demandaSelecionada", demandaSelecionada);
        localStorage.setItem("demandadecontrato", demandaSelecionada);
    }

    //----------------------CALCULARIA O MINIMO DE CORRENTE DE CONSUMO PARA O TC DE PROTEÇÃO-----------------------------
    //veifica se inominalDemanda é menor que 10% da corrente de primario do TC de proteção se for o valor é substituido por 10% do TC de proteção
    let correntedeconsumominima = 0;
    if (TCdeprotecaoSelecionada) {
        correntedeconsumominima = TCdeprotecaoSelecionada * 0.1; // Corrente mínima de consumo em A
    }


    let inominalminimaTC; // Variável para armazenar se a corrente nominal de consumo é menor que a mínima
    if (inominalDemanda < correntedeconsumominima) {
        inominalDemanda = correntedeconsumominima;
        inominalminimaTC = "Sim";
    } else {
        inominalminimaTC = "Não";
    }

    localStorage.setItem("inominalminimaTC", inominalminimaTC); // Armazena a corrente nominal de consumo no localStorage
    localStorage.setItem("correntedeconsumominima", correntedeconsumominima.toFixed(2));
    localStorage.setItem("Inominalfase", inominalDemanda.toFixed(2));

    localStorage.setItem("InominalfaseGD", inominalDemandaGD.toFixed(2));

    console.log("correntedeconsumominima:", correntedeconsumominima.toFixed(2), "inominalDemanda:", (inominalDemanda.toFixed(2)));

    //-----------FIM DO CALCULO DO MINIMO DE CORRENTE DE CONSUMO PARA O TC DE PROTEÇÃO-----------------------------



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


    const valorTCSelecionado2 = localStorage.getItem("valorTCideal");
    let tcProtecaoIdeal2 = document.getElementById("tcdeProtecaoideal");
    if (tcProtecaoIdeal2) {
        tcProtecaoIdeal2.textContent = valorTCSelecionado2 !== null ? valorTCSelecionado2 + " :5" : "";
    }


    // alert("Dimensionamentos salvos com sucesso!");
    // Recarrega a página após salvar as opções
    location.reload();
}


function dimensionarTCconformenorma() {

    //inicializa duas variaveis do tipo constante, um obtem o valor da ID meu select
    //que corresponde ao valor armazenado no campo de selecao e a outra armazena o valor desse campo

    const tensaoSelecionada = parseFloat(localStorage.getItem("tensaoSelecionada")) || 0;

    //-----------------------------------------------------------------------------------------
    const demandaSelecionada = parseFloat(localStorage.getItem("demandadecontrato")) || 0;
    //localStorage.setItem("demandaSelecionada", demandaSelecionada);

    //-----------------------------------------------------------------------------------------
    const potenciaGDSelecionada = parseFloat(localStorage.getItem("potenciaGDSelecionada")) || 0;
    //localStorage.setItem("potenciaGDSelecionada", potenciaGDSelecionada);
    //-----------------------------------------------------------------------------------------

    const fatorPotenciaSelecionada = parseFloat(localStorage.getItem("fatorPotenciaSelecionada")) || 0;
    //-----------------------------------------------------------------------------------------
    const fatorPotenciaGDSelecionada = parseFloat(localStorage.getItem("fatorPotenciaGDSelecionada")) || 0;

    //-----------------------------------------------------------------------------------------

    //-----------------------------------------------------------------------------------------

    const desequilibrioSelecionada = localStorage.getItem("desequilibrioSelecionada") || 0;


    //-----------------------------------------------------------------------------------------
    const curtoSelecionada = localStorage.getItem("curtoSelecionada") || 0;

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

    console.log("inominalDemanda:", inominalDemanda);

    // calcula o valor de corrente nominal de consumo para GD
    let inominalDemandaGD = 0;
    inominalDemandaGD = (potenciaGDSelecionada / (tensaoSelecionada * Math.sqrt(3) * fatorPotenciaGDSelecionada));

    console.log("inominalDemandaGD:", inominalDemandaGD);
    //

    // faz a divisão do valor da corrente de curto por 50 para comparar com os valores do array
    let iprimTccurto = curtoSelecionada / 50;

    // Recupera a corrente instantanea de magnetização selecionada do localStorage para comparar com os valores do array
    let instMagconsumo = localStorage.getItem("imagtotalSelecionada") / 20;

    // Converte os valores para números calculados nesse escopo para numeros flutuantes
    let iprimTccurtoNum = parseFloat(iprimTccurto);
    let instMagconsumoNum = parseFloat(instMagconsumo) * 1.05;
    let inominalDemandaNum = Math.max(parseFloat(inominalDemanda), parseFloat(inominalDemandaGD));
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
    console.log("Valor TC Ideal:", valorTCSelecionado);
    let potenciaMinima = TCdeprotecaoSelecionada * 0.1 * tensaoSelecionada * Math.sqrt(3) * (fatorPotenciaSelecionada);


    // Armazena o valor selecionado no localStorage
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


    //-----calcular potencia base para calculos de P.U --------------------

    const potenciabase = (tensaoSelecionada * Math.sqrt(3) * TCdeprotecaoSelecionada).toFixed(2); // Potência base em kVA


    localStorage.setItem("potenciabase", potenciabase); // Armazena a potência base no localStorage


    //-------------FIM DOS CALCULOS DE POTENCIA BASE PARA CALCULOS DE P.U --------------------


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

    // Armazena a tensão secundária do TP de proteção no localStorage
    localStorage.setItem("tensaoSecundariaFFTP", tensaoSecundariaFFTP.toFixed(2));

    // Armazena a tensão primária fase-neutro no localStorage
    localStorage.setItem("tensaoprimariaFN", tensaoprimariaFN ? tensaoprimariaFN.toFixed(2) : "0");

    // Armazena a tensão primária fase-fase no localStorage
    localStorage.setItem("tensaoprimariaFF", tensaoprimariaFF ? tensaoprimariaFF.toFixed(2) : "0");

    // Armazena a tensão secundária do TP de neutro no localStorage
    localStorage.setItem("tensaoSecundariaFNTP", tensaoSecundariaFNTP.toFixed(2));

    //compara potencia minima com a demanda selecionada, se a demanda for menor que a potencia minima 
    //então uma variavel armazena a potencia selecionada e a potencia minima é salva no localStorage
    if (demandaSelecionada < potenciaMinima) {
        localStorage.setItem("demandaSelecionada", potenciaMinima.toFixed(2));
        localStorage.setItem("demandadecontrato", demandaSelecionada);

    } else {
        localStorage.setItem("demandaSelecionada", demandaSelecionada);
        localStorage.setItem("demandadecontrato", demandaSelecionada);
    }

    //----------------------CALCULARIA O MINIMO DE CORRENTE DE CONSUMO PARA O TC DE PROTEÇÃO-----------------------------
    //veifica se inominalDemanda é menor que 10% da corrente de primario do TC de proteção se for o valor é substituido por 10% do TC de proteção
    let correntedeconsumominima = 0;
    if (TCdeprotecaoSelecionada) {
        correntedeconsumominima = TCdeprotecaoSelecionada * 0.1; // Corrente mínima de consumo em A
    }


    let inominalminimaTC; // Variável para armazenar se a corrente nominal de consumo é menor que a mínima
    if (inominalDemanda < correntedeconsumominima) {
        inominalDemanda = correntedeconsumominima;
        inominalminimaTC = "Sim";
    } else {
        inominalminimaTC = "Não";
    }

    localStorage.setItem("inominalminimaTC", inominalminimaTC); // Armazena a corrente nominal de consumo no localStorage
    localStorage.setItem("correntedeconsumominima", correntedeconsumominima.toFixed(2));
    localStorage.setItem("Inominalfase", inominalDemanda.toFixed(2));

    localStorage.setItem("InominalfaseGD", inominalDemandaGD.toFixed(2));

    console.log("correntedeconsumominima:", correntedeconsumominima.toFixed(2), "inominalDemanda:", (inominalDemanda.toFixed(2)));

    //-----------FIM DO CALCULO DO MINIMO DE CORRENTE DE CONSUMO PARA O TC DE PROTEÇÃO-----------------------------



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

        const valorTCSelecionado2 = localStorage.getItem("valorTCideal");
    let tcProtecaoIdeal = document.getElementById("tcdeProtecaoideal");
    if (tcProtecaoIdeal) {
        tcProtecaoIdeal.textContent = valorTCSelecionado2 !== null ? valorTCSelecionado2 + " :5" : "";
    }

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

