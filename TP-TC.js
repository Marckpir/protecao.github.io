
//FUNÇÃO PARA SALVAR OS CAMPOS PREENCHIDOS NO LOCAL STORAGE E REALIZAR ALGUNS CÁLCULOS NECESSÁRIOS PARA A PROTEÇÃO

document.addEventListener('click', function (event) {
    const navButton = event.target.closest('button[data-nav-target]');
    if (navButton) {
        const target = navButton.getAttribute('data-nav-target');
        if (target) {
            window.location.href = target;
        }
        return;
    }

    const saveButton = event.target.closest('#botaoSalvar');
    if (saveButton) {
        salvarOpcao();
    }
});

document.addEventListener('change', function (event) {
    const relaySelect = event.target.closest('#tabelaselecionadahtml');
    if (relaySelect && typeof salvarTabela === 'function') {
        salvarTabela();
    }
});

window.addEventListener('load', function () {










    // Adicionar a classe 'loaded' ao elemento <h1> para acionar a animação de fade-in
    const header = document.querySelector('h1');
    if (header) {
        header.classList.add('loaded');
    }

    // Manter o botão vermelho do header indicando que está selecionado
    const botaoParametro = document.getElementById("botaotptchtml");
    if (botaoParametro) {
        botaoParametro.style.backgroundColor = "#cf0808";
    }

    //-----------------------
    // // Controle de acesso para ocultar a seção de saturação por tensão para a categoria 'usuario'
    // const categoria = (localStorage.getItem('usuarioCategoria') || '').toLowerCase();
    // // A div do título e a div da tabela de saturação estão próximas, então ocultamos ambas
    // if (categoria === 'usuario') {
    //     // Oculta o título
    //     const tituloSaturacao = Array.from(document.getElementsByClassName('tp-tc-caption-main'))
    //         .find(div => div.textContent && div.textContent.includes('DIMENSIONAMENTO TC (CRITÉRIO SATURAÇÃO POR TENSÃO'));
    //     if (tituloSaturacao) {
    //         tituloSaturacao.style.display = 'none';
    //     }
    //     // Oculta a tabela de saturação (primeira tabela-container após o título)
    //     const tabelas = document.getElementsByClassName('tabela-container');
    //     for (let i = 0; i < tabelas.length; i++) {
    //         if (tabelas[i].previousElementSibling === tituloSaturacao) {
    //             tabelas[i].style.display = 'none';
    //             break;
    //         }
    //     }
    // }

    // Controle de acesso movido para controle-acesso.js

    // Chama a função para dimensionar o TP de proteção conforme a norma
    dimensionarTPconformenorma();

    // Chama a função para calcular a saturação do TC de proteção
    calcularSaturacaotensaoTC();

    // Chama a função para dimensionar o TC de proteção conforme a norma
    dimensionarTCconformenorma();





    // Recupera a opção selecionada do localStorage e define no campo correspondente
    //-----------------------------------------------------------------------------------------
    //persisti o valor do TC de protecao selecionado do localstorage
    const TC = document.getElementById("tcdeProtecao");
    const TCSalva = localStorage.getItem("TCdeprotecaoEscolhido");
    if (TCSalva) {
        TC.value = TCSalva;
    }

    if (TC.value !== "") {
        const exibircalculo = document.getElementById("exibicaotccalculado");
        exibircalculo.style.display = "none";
    }

    //persisti o valor de RTP selecionado do localstorage
    const TP = document.getElementById("TPdeprotecaohtml");
    const TPSalva = localStorage.getItem("TPdeprotecaoEscolhido");
    if (TPSalva) {
        TP.value = TPSalva;
    }

    //persisti o valor da ligação do TP de proteção selecionado do localstorage
    const ligacaoBobina = document.getElementById("ligacaodabobinahtml");
    const ligacaoBobinaSalva = localStorage.getItem("ligacaodabobinaEscolhido");
    if (ligacaoBobinaSalva) {
        ligacaoBobina.value = ligacaoBobinaSalva;
    }

    //persisti o valor do RTP auxiliar selecionado do localstorage
    const RTPauxiliar = document.getElementById("RTPauxiliarhtml");
    const RTPauxiliarSalva = localStorage.getItem("RTPauxiliarEscolhido");
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
    const erroSaturacaoTC = localStorage.getItem("erroSaturacaoTC");
    const fatorMultiplicidadeTC = localStorage.getItem("fatorMultiplicidadeTC");
    const especificacaoTC = localStorage.getItem("especificacaoTC");


    const comprimentoCondutorTC = localStorage.getItem("comprimentoCondutorTC");
    const bitolaCondutorTC = localStorage.getItem("bitolaCondutorTC");
    const resistividadeCondutorTC = localStorage.getItem("resistividadeCondutorTC");
    const potenciabobinaRele = localStorage.getItem("potenciabobinaRele");
    const relacaoXRCurto = localStorage.getItem("relacaoXRCurto");





    if (document.getElementById("input-potencia-Nominal-TC-html")) {
        document.getElementById("input-potencia-Nominal-TC-html").value = potenciaNominalTC || "";
    }
    if (document.getElementById("input-erro-saturacao-TC-html")) {
        document.getElementById("input-erro-saturacao-TC-html").value = erroSaturacaoTC || "";
    }
    if (document.getElementById("input-fator-multiplicidade-TC-html")) {
        document.getElementById("input-fator-multiplicidade-TC-html").value = fatorMultiplicidadeTC || "";
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
    if (document.getElementById("input-potencia-bobina-rele-html")) {
        document.getElementById("input-potencia-bobina-rele-html").value = potenciabobinaRele || "";
    }
    if (document.getElementById("input-relacao-xr-curto-html")) {
        document.getElementById("input-relacao-xr-curto-html").value = relacaoXRCurto || "";
    }



    // exibir os resultados nas labels correspondentes

    const especificacaoTClabel = especificacaoTC ? especificacaoTC : "12.5VA 10P20";

    const especificacaoCondutor = comprimentoCondutorTC ? comprimentoCondutorTC + " m" : "3 m";
    const especificacaoBitola = bitolaCondutorTC ? bitolaCondutorTC + " mm²" : "2.5 mm²";
    const especificacaoResistividade = resistividadeCondutorTC ? resistividadeCondutorTC + " Ω/km" : "6.72 Ω/km";

    const especificacaoPotenciaBobinaRele = potenciabobinaRele ? potenciabobinaRele + " VA" : "0.20 VA";
    const especificacaoRelacaoXRCurto = relacaoXRCurto ? relacaoXRCurto : "0";

    const especificacaonormaantiga = localStorage.getItem("EspecificacaoNormaAntigaTC") || '';

    const especificacaoImpedanciaBurdenValor = localStorage.getItem("impedanciaburdendoTC");
    const especificacaoImpedanciaBurden = especificacaoImpedanciaBurdenValor ? especificacaoImpedanciaBurdenValor + ' Ω' : '';

    const especificacaoImpedanciaTotalDoTrechoValor = localStorage.getItem("impedanciatotaldotrecho");
    const especificacaoImpedanciaTotalDoTrecho = especificacaoImpedanciaTotalDoTrechoValor ? especificacaoImpedanciaTotalDoTrechoValor + ' Ω' : '';

    // Correção NBR 6856:2021: tensaoSaturacaoTC é a tensão nominal suportada (Eal), tensaoSaturacaotrecho é a calculada exigida (Ereq)
    const especificacaoTensaoSaturacaonominalValor = localStorage.getItem("tensaoSaturacaoTC");
    const especificacaoTensaoSaturacaonominal = especificacaoTensaoSaturacaonominalValor ? especificacaoTensaoSaturacaonominalValor + ' V' : '';

    const tensaoSaturacaoCalculadaTCValor = localStorage.getItem("tensaoSaturacaotrecho");
    const tensaoSaturacaoCalculadaTC = tensaoSaturacaoCalculadaTCValor ? tensaoSaturacaoCalculadaTCValor + ' V' : '';

    const alfRealTCValor = localStorage.getItem("alfRealTC");
    const alfRealTC = alfRealTCValor ? alfRealTCValor : '';

    document.getElementById("label-especificacao-norma-nova-html").textContent = especificacaoTClabel;

    document.getElementById("label-especificacao-condutor-html").textContent = especificacaoCondutor;
    document.getElementById("label-especificacao-bitola-html").textContent = especificacaoBitola;
    document.getElementById("label-especificacao-resistividade-html").textContent = especificacaoResistividade;

    document.getElementById("label-especificacao-potencia-bobina-rele-html").textContent = especificacaoPotenciaBobinaRele;
    document.getElementById("label-especificacao-relacao-xr-curto-html").textContent = especificacaoRelacaoXRCurto;

    document.getElementById("label-especificacao-norma-antiga-html").textContent = especificacaonormaantiga;

    document.getElementById("label-burden-calculado-tc-html").textContent = especificacaoImpedanciaBurden;
    document.getElementById("label-impedancia-calculada-total-html").textContent = especificacaoImpedanciaTotalDoTrecho;
    document.getElementById("label-tensao-saturacao-nominal-html").textContent = especificacaoTensaoSaturacaonominal;

    document.getElementById("label-tensao-saturacao-calculada-TC-html").textContent = tensaoSaturacaoCalculadaTC;

    const labelAlfReal = document.getElementById("label-alf-real-tc-html");
    if (labelAlfReal) {
        labelAlfReal.textContent = alfRealTC;
    }


    //especificação nos labels das grandezas calculadas


    // document.getElementById("label-especificacao-percentual-burden-tc-html").textContent = especificacaoPercentualBurden;





    // Importa o status da saturação do TC do localStorage e exibe no elemento HTML correspondente
    const statusSaturacaoTC = localStorage.getItem("statusdasaturacaotc");
    const labelStatusSaturacaoTC = document.getElementById("label-notificacao-saturacao-tc-html");
    if (labelStatusSaturacaoTC) {
        if (statusSaturacaoTC === "nao") {
            labelStatusSaturacaoTC.textContent = "O TC não irá saturar com a ICC";
            labelStatusSaturacaoTC.style.backgroundColor = "#00ff00";
            labelStatusSaturacaoTC.style.animation = "piscaverde 1s infinite";
        } else if (statusSaturacaoTC === "sim") {
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

    // Recupera o valor do TC calculado do localStorage e exibe no elemento HTML
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
        potenciaBaseElement.textContent = potenciaBaseSelecionada !== null ? potenciaBaseSelecionada + " kVA" : "";
    }


    //recupera o valor da ligação do TP de proteção calculada do localStorage e exibe no elemento HTML em ligacaodotpdimensionadahtml
    const ligacaoTPdimensionada = localStorage.getItem("ligacaodabobinaSelecionada");
    let ligacaoTPdimensionadaElement = document.getElementById("ligacaodotpdimensionadahtml");
    if (ligacaoTPdimensionadaElement) {
        ligacaoTPdimensionadaElement.textContent = ligacaoTPdimensionada !== null ? ligacaoTPdimensionada : "";
    }

    //recupera o valor da RTP calculada do localStorage e exibe no elemento HTML em tensaosecundariaffhtml
    const RTPcalculada = localStorage.getItem("TPdeprotecaoSelecionada");
    let RTPcalculadaElement = document.getElementById("rtphtml");
    if (RTPcalculadaElement && RTPcalculada !== null && !isNaN(parseFloat(RTPcalculada))) {
        RTPcalculadaElement.textContent = RTPcalculada + " : 1";
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


    // Recupera o valor da tensão secundária do TP auxiliar do localStorage e exibe no elemento HTML
    const tensaoSecundariaTPauxiliar = localStorage.getItem("tensaoSecundariaTPauxiliar");
    let tensaoSecundariaAuxiliarElement = document.getElementById("tensaosecundariaauxiliarhtml");
    if (tensaoSecundariaAuxiliarElement) {
        tensaoSecundariaAuxiliarElement.textContent = tensaoSecundariaTPauxiliar !== null ? tensaoSecundariaTPauxiliar + " V" : "";
    }

    // Recupera o valor da RTP auxiliar do localStorage e exibe no elemento HTML
    const RTPauxiliarSelecionada = localStorage.getItem("RTPauxiliarSelecionada");
    let RTPauxiliarElement = document.getElementById("rtpauxiliarhtml");
    if (RTPauxiliarElement) {
        RTPauxiliarElement.textContent = RTPauxiliarSelecionada !== null ? RTPauxiliarSelecionada + " : 1" : "";
    }


    dimensionarTPconformenorma();
    dimensionarTCconformenorma();



});




function calcularSaturacaotensaoTC() {
    const TCselecionadoBruto = parseFloat(localStorage.getItem("TCdeprotecaoSelecionada"));
    const TCselecionado = Number.isFinite(TCselecionadoBruto) && TCselecionadoBruto > 0 ? (TCselecionadoBruto / 5) : 0;
    const curtoSelecionada = parseFloat(localStorage.getItem("curtoSelecionada")) || 0;
    const potenciaNominalTC = parseFloat(localStorage.getItem("potenciaNominalTC")) || 12.5;
    const erroSaturacaoTC = parseFloat(localStorage.getItem("erroSaturacaoTC")) || 10;
    const fatorMultiplicidadeTC = parseFloat(localStorage.getItem("fatorMultiplicidadeTC")) || 20;

    const comprimentoCondutorTC = parseFloat(localStorage.getItem("comprimentoCondutorTC")) || 3;
    const bitolaCondutorTC = parseFloat(localStorage.getItem("bitolaCondutorTC")) || 2.5;
    const resistividadeCondutorTC = parseFloat(localStorage.getItem("resistividadeCondutorTC")) || 6.72;
    const potenciabobinaRele = parseFloat(localStorage.getItem("potenciabobinaRele")) || 0.2;
    const relacaoXRCurto = parseFloat(localStorage.getItem("relacaoXRCurto")) || 0;

    console.log("TC selecionado (RTC):", TCselecionado);

    let impedanciadocondutor = 0;
    let impedanciadorele = 0;
    let impedanciatotaldotrecho = 0;
    let impedanciaburdendoTC = 0;
    let statusdasaturacaotc = 'nao';

    // 1. Impedância da bobina do relé para curto trifásico (bobina de fase: S / In^2, com In = 5 A)
    // Conforme ABNT NBR 6856:2021, em falta trifásica equilibrada a corrente de neutro é nula
    impedanciadorele = potenciabobinaRele / Math.pow(5, 2);
    console.log("Impedância do relé:", impedanciadorele.toFixed(5), "Ω");

    // 2. Impedância dos condutores (TC ao relé)
    // Se a bitola for informada e válida (> 0), calcula pela resistividade do cobre a 75°C (rho = 0.021 Ω*mm²/m)
    // considerando loop de ida e retorno (fator 2) para conservadorismo e faltas com retorno:
    if (bitolaCondutorTC > 0) {
        const rhoCobre75C = 0.021; // Ω*mm²/m a 75°C conforme NBR
        impedanciadocondutor = (rhoCobre75C * comprimentoCondutorTC * 2) / bitolaCondutorTC;
    } else {
        // Fallback usando resistência linear (Ω/km) se bitola não informada
        impedanciadocondutor = ((resistividadeCondutorTC / 1000) * (comprimentoCondutorTC * 2));
    }
    console.log("Impedância do Condutor:", impedanciadocondutor.toFixed(5), "Ω");

    // 3. Resistência interna do enrolamento secundário do TC (Rct)
    // Conforme ABNT NBR 6856:2021 / IEC 61869-2, TCs de proteção classe P possuem dispersão desprezível (Xs ≈ 0).
    // Adota-se valor típico de ensaio/catálogo para TC de proteção de 5 A: Rct = 0.50 Ω
    const resistenciaInternaTC = 0.50; // Ω (Rct a 75°C)
    console.log("Resistência interna do TC (Rct):", resistenciaInternaTC.toFixed(5), "Ω");

    // 4. Carga externa conectada (Z_b_real) e Impedância Total do circuito secundário
    const cargaConectadaReal = impedanciadocondutor + impedanciadorele;
    impedanciatotaldotrecho = resistenciaInternaTC + cargaConectadaReal;
    localStorage.setItem("impedanciatotaldotrecho", impedanciatotaldotrecho.toFixed(5));
    console.log("Impedância Total do circuito secundário (Rct + Zfiação + Zrelé):", impedanciatotaldotrecho.toFixed(5), "Ω");

    // 5. Carga nominal padronizada (Z burden nominal do TC) conforme NBR 6856:2021
    impedanciaburdendoTC = potenciaNominalTC / Math.pow(5, 2);
    localStorage.setItem("impedanciaburdendoTC", impedanciaburdendoTC.toFixed(5));
    console.log("Impedância do Burden Nominal do TC:", impedanciaburdendoTC.toFixed(5), "Ω");

    // 6. Tensão limite de saturação nominal suportada pelo TC (Eal / V_sat_nom)
    // Conforme ABNT NBR 6856:2021 / IEC 61869-2:
    // Eal = ALF * Isn * (Rct + Zb_nom)
    const tensaoSaturacaoNominalSuportada = fatorMultiplicidadeTC * 5 * (resistenciaInternaTC + impedanciaburdendoTC);
    localStorage.setItem("tensaoSaturacaoTC", tensaoSaturacaoNominalSuportada.toFixed(2));
    console.log("Tensão de saturação nominal suportada pelo TC (Eal):", tensaoSaturacaoNominalSuportada.toFixed(2), "V");

    // 7. Corrente de curto-circuito refletida no secundário do TC (Icc_sec)
    let iccrefletida = 0;
    if (!isNaN(curtoSelecionada) && !isNaN(TCselecionado) && TCselecionado > 0) {
        iccrefletida = curtoSelecionada / TCselecionado;
    }
    console.log("Corrente de curto refletida no secundário do TC:", iccrefletida.toFixed(2), "A");

    // 8. Tensão de saturação calculada / exigida pela falta (Ereq / V_sat_calc)
    // Tensão em regime permanente simétrico: Ereq_sim = Icc_sec * Ztotal
    let tensaoSaturacaoCalculada = iccrefletida * impedanciatotaldotrecho;

    // Se houver relação X/R, aplicar o fator de sobredimensionamento transitório (1 + X/R)
    // para garantir a não saturação na presença de componente CC aperiódica (fator de assimetria / IEEE C37.110)
    if (!isNaN(relacaoXRCurto) && relacaoXRCurto > 0) {
        tensaoSaturacaoCalculada = tensaoSaturacaoCalculada * (1 + relacaoXRCurto);
        console.log("Fator transitório aplicado (1 + X/R):", (1 + relacaoXRCurto).toFixed(2));
    }
    localStorage.setItem("tensaoSaturacaotrecho", tensaoSaturacaoCalculada.toFixed(2));
    console.log("Tensão de saturação calculada exigida:", tensaoSaturacaoCalculada.toFixed(2), "V");

    // 9. Fator Limite de Exatidão Operacional Real (ALF_real) conforme NBR 6856:2021:
    // ALF_real = ALF_nom * (Rct + Zb_nom) / (Rct + Zb_real)
    const alfReal = fatorMultiplicidadeTC * ((resistenciaInternaTC + impedanciaburdendoTC) / (resistenciaInternaTC + cargaConectadaReal));
    localStorage.setItem("alfRealTC", alfReal.toFixed(2));
    console.log("Fator Limite de Exatidão Real (ALF_real):", alfReal.toFixed(2));

    // 10. Comparação e critério de não saturação:
    // O TC NÃO satura se a tensão suportada (Eal) for maior ou igual à exigida (Ereq)
    if (!isNaN(tensaoSaturacaoCalculada) && !isNaN(tensaoSaturacaoNominalSuportada)) {
        if (tensaoSaturacaoCalculada > tensaoSaturacaoNominalSuportada) {
            statusdasaturacaotc = 'sim';
            console.log("A tensão calculada exigida é maior que a nominal suportada: TC IRÁ SATURAR.");
        } else {
            statusdasaturacaotc = 'nao';
            console.log("A tensão calculada exigida é menor ou igual à nominal suportada: TC NÃO IRÁ SATURAR.");
        }
    }
    localStorage.setItem("statusdasaturacaotc", statusdasaturacaotc);

    // 11. Nomenclatura norma antiga equivalente (ABNT NBR 6856:1992):
    // Na norma antiga, a classe B indicava a tensão terminal máxima com 20 x In e carga nominal:
    // V_terminal_nom = ALF * In * Zb_nom
    const tensaoTerminalNormaAntiga = Math.round(fatorMultiplicidadeTC * 5 * impedanciaburdendoTC);
    const especificacaoantiga = erroSaturacaoTC + 'B' + tensaoTerminalNormaAntiga;
    console.log("Especificação antiga equivalente:", especificacaoantiga);
    localStorage.setItem("EspecificacaoNormaAntigaTC", especificacaoantiga);
}



function salvarOpcao() {

    //-----------INICIO DO BLOCO TC, TP , E TP AUXILIAR PARA EXPORTAÇÃO DOS VALORES SELECIONADOS PELO USUÁRIO PARA O LOCALSTORAGE------------------
    // Exportar valores dos campos para o localStorage

    //exporta selecao do TC de protecao digitado pelo usuario no input para o localstorage
    const TCdeprotecao = document.getElementById("tcdeProtecao");
    const TCdeprotecaoEscolhido = TCdeprotecao.value;
    localStorage.setItem("TCdeprotecaoEscolhido", TCdeprotecaoEscolhido);

    //exporta o valor do RTP selecionado digitado pelo usuario no input para o localstorage
    const TPdeprotecao = document.getElementById("TPdeprotecaohtml");
    const TPdeprotecaoEscolhido = TPdeprotecao.value;
    localStorage.setItem("TPdeprotecaoEscolhido", TPdeprotecaoEscolhido);
    // localStorage.setItem("TPdeprotecaoSelecionada", TPdeprotecaoSelecionada);


    //exporta o tipo da ligação do TP de proteção digitado pelo usuário no input para o localstorage
    const ligacaoBobina = document.getElementById("ligacaodabobinahtml");
    const ligacaoBobinaEscolhido = ligacaoBobina.value;
    localStorage.setItem("ligacaodabobinaEscolhido", ligacaoBobinaEscolhido);
    // localStorage.setItem("ligacaodabobinaSelecionada", ligacaoBobinaSelecionada);

    //exporta o valor do RTP auxiliar selecionado digitado pelo usuário no input para o localstorage
    const RTPauxiliar = document.getElementById("RTPauxiliarhtml");
    const RTPauxiliarEscolhido = RTPauxiliar.value;
    localStorage.setItem("RTPauxiliarEscolhido", RTPauxiliarEscolhido);
    // localStorage.setItem("RTPauxiliarSelecionada", RTPauxiliarSelecionada);

    // ---------FIM DO BLOCO TC, TP , E TP AUXILIAR PARA EXPORTAÇÃO DOS VALORES SELECIONADOS PELO USUÁRIO PARA O LOCALSTORAGE-----------------------------


    // -------INICIO DO BLOCO DE EXPORTAÇÃO DOS VALORES DOS INPUTS DO CALCULO DE SATURAÇÃO DO TC DE PROTEÇÃO------------------
    const potenciaNominalTC = document.getElementById("input-potencia-Nominal-TC-html").value;
    localStorage.setItem("potenciaNominalTC", potenciaNominalTC);
    console.log("potenciaNominalTC exportada:", potenciaNominalTC);

    const erroSaturacaoTC = document.getElementById("input-erro-saturacao-TC-html").value;
    localStorage.setItem("erroSaturacaoTC", erroSaturacaoTC);
    console.log("erroSaturacaoTC exportada:", erroSaturacaoTC);

    const fatorMultiplicidadeTC = document.getElementById("input-fator-multiplicidade-TC-html").value;
    localStorage.setItem("fatorMultiplicidadeTC", fatorMultiplicidadeTC);
    console.log("fatorMultiplicidadeTC exportada:", fatorMultiplicidadeTC);

    const especificacaoTC = potenciaNominalTC + ' ' + erroSaturacaoTC + 'P' + fatorMultiplicidadeTC;
    console.log("especificacaoTC exportada:", especificacaoTC);

    if (potenciaNominalTC && erroSaturacaoTC && fatorMultiplicidadeTC) {
        localStorage.setItem("especificacaoTC", especificacaoTC);
    } else {
        localStorage.setItem("especificacaoTC", '');
    }

    const comprimentoCondutorTC = document.getElementById("input-comprimento-Condutor-TC-html");
    localStorage.setItem("comprimentoCondutorTC", comprimentoCondutorTC && comprimentoCondutorTC.value.trim() !== "" ? comprimentoCondutorTC.value : "3");
    console.log("comprimentoCondutorTC exportada:", localStorage.getItem("comprimentoCondutorTC"));

    const bitolaCondutorTC = document.getElementById("input-bitola-Condutor-TC-html");
    localStorage.setItem("bitolaCondutorTC", bitolaCondutorTC && bitolaCondutorTC.value.trim() !== "" ? bitolaCondutorTC.value : "2.5");
    console.log("bitolaCondutorTC exportada:", localStorage.getItem("bitolaCondutorTC"));

    const resistividadeCondutorTC = document.getElementById("input-resistividade-Condutor-TC-html");
    localStorage.setItem("resistividadeCondutorTC", resistividadeCondutorTC && resistividadeCondutorTC.value.trim() !== "" ? resistividadeCondutorTC.value : "6.72");
    console.log("resistividadeCondutorTC exportada:", localStorage.getItem("resistividadeCondutorTC"));

    // const percentualBurdenTC = document.getElementById("input-percentual-burden-TC-html");
    // localStorage.setItem("percentualBurdenTC", percentualBurdenTC ? percentualBurdenTC.value : "");
    // console.log("percentualBurdenTC exportada:", percentualBurdenTC ? percentualBurdenTC.value : "");

    const potenciabobinarele = document.getElementById("input-potencia-bobina-rele-html");
    const valorPotenciaBobinaRele = potenciabobinarele && potenciabobinarele.value.trim() !== "" ? potenciabobinarele.value : "0.20";
    localStorage.setItem("potenciabobinaRele", valorPotenciaBobinaRele);
    console.log("potenciabobinaRele exportada:", valorPotenciaBobinaRele);

    const relacaoXRCurto = document.getElementById("input-relacao-xr-curto-html");
    localStorage.setItem("relacaoXRCurto", relacaoXRCurto ? relacaoXRCurto.value : "");
    console.log("relacaoXRCurto exportada:", relacaoXRCurto ? relacaoXRCurto.value : "");

    // const impedanciaTC = document.getElementById("input-impedancia-TC-html");
    // localStorage.setItem("impedanciaTC", impedanciaTC ? impedanciaTC.value : "");

    //--------------FIM DO BLOCO DE EXPORTAÇÃO DOS VALORES DOS INPUTS DO CALCULO DE SATURAÇÃO DO TC DE PROTEÇÃO------------------









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
    let potenciaGDSelecionada = parseFloat(localStorage.getItem("potenciaGDcontratada")) || 0;

    const fatorPotenciaSelecionada = parseFloat(localStorage.getItem("fatorPotenciaSelecionada")) || 0.92;
    const fatorPotenciaGDSelecionada = parseFloat(localStorage.getItem("fatorPotenciaGDSelecionada")) || 0.92;
    const tipoParalelismoSelecionado = localStorage.getItem("tipoParalelismoSelecionado") || "Com Injeção";


    const desequilibrioSelecionada = (parseFloat(localStorage.getItem("desequilibrioSelecionada")) || 33) / 100;
    const curtoSelecionada = localStorage.getItem("curtoSelecionada") || 0;
    const instmagconsumo1 = localStorage.getItem("imagtotalSelecionada") || 0;

    // Verifica se a GD sera com injeção ou sem injeção , para considerar a demanda minima
    // nos demais calculos.
    // Ajusta potenciaGDSelecionada conforme tipoParalelismoSelecionado
    if (
        tipoParalelismoSelecionado &&
        tipoParalelismoSelecionado !== "" &&
        tipoParalelismoSelecionado === "Sem Injeção"
    ) {
        potenciaGDSelecionada = 0;
    }



    //---------------------------Codigo para definir o TC Ideal---------------------------------------------------------------

    // Cria um array com os valores possíveis de TC
    // Esses valores são os valores nominais dos transformadores de corrente
    const valoresTC = [
        5, 10, 15, 20, 25, 30, 40, 50, 60, 75, 100,
        150, 200, 250, 300, 400, 500, 600, 800, 1000, 1200, 1500, 2000, 2500, 3000, 4000, 5000, 6000, 8000
    ];

    //---------------------inicio calculo das correntes nominais reais 
    // calcula o valor de corrente nominal de consumo
    let inominalDemanda = 0;
    inominalDemanda = (demandaSelecionada / (tensaoSelecionada * Math.sqrt(3) * fatorPotenciaSelecionada));

    // calcula o valor de corrente nominal de potencia para GD
    let inominalDemandaGD = 0;
    inominalDemandaGD = (potenciaGDSelecionada / (tensaoSelecionada * Math.sqrt(3) * fatorPotenciaGDSelecionada));

    //---------------------fim calculo das correntes nominais reais 


    //-----------------inicio de de determinações dos valores referente aos criterios para definir o TC

    // faz a divisão do valor da corrente de curto por 50 para comparar com os valores do array
    let iprimTccurto = curtoSelecionada / 50;

    // Recupera a corrente instantanea de magnetização selecionada do localStorage para comparar com os valores do array
    let instMagconsumo = instmagconsumo1 / 20;

    // Converte os valores para números calculados nesse escopo no formato de numeros flutuantes

    // Converter corrente de curto
    let iprimTccurtoNum = parseFloat(iprimTccurto);

    //Converter corrente instantanea de fase 
    let instMagconsumoNum = parseFloat(instMagconsumo) * 1.05;

    //converter valor das corrente nominais de consumo e de injeção, escolhendo qual o maior valor e salvando na variavel
    let inominalDemandaNum = Math.max(parseFloat(inominalDemanda), parseFloat(inominalDemandaGD));

    //converter valor do RTC de proteção Selecionada pelo usuario
    let RTCselecionado = parseFloat(TCdeprotecaoSelecionada) / 5;

    //-----------------fim de de determinações dos valores referente aos criterios para definir o TC

    //-----------------inicio de varredura na lista de valores de TC para encontrar o valor ideal conforme os critérios estabelecidos
    // Busca o maior valor em valoresTC que atenda todos os critérios
    let valorTCdimensionado = null;
    for (let i = 0; i < valoresTC.length; i++) {
        const valor = valoresTC[i];

        if (
            //o valor do tc que esta na posicao i , é maior ou igual a 105% do valor da corrente nominal de demanda ou injeção, escolhendo o maior valor entre os dois
            valor >= inominalDemandaNum * 1.05 &&
            //o valor do tc que esta na posicao i , é maior ou igual a corrente de curto dividida por 50
            valor >= iprimTccurtoNum &&
            //o valor do tc que esta na posicao i , é maior ou igual a corrente instantanea de magnetização
            valor >= instMagconsumoNum
        ) {
            valorTCdimensionado = valor; // pega o menor possível dentro da condição
            break; // para no primeiro (menor) que atende
        }
    }
    //-----------------fim  de varredura na lista de valores de TC para encontrar o valor ideal conforme os critérios estabelecidos

    console.log("inominalDemandaNum:", inominalDemandaNum);
    console.log("iprimTccurtoNum:", iprimTccurtoNum);
    console.log("instMagconsumoNum:", instMagconsumoNum);

    console.log("valor do tc dimensionado:", valorTCdimensionado);

    //-----------------Inicio da etapa de determinação de quais valores serão armazenados no localstorage-----------------
    // Etapa para calcular a potencia minima do TC dimensionado, considerando o valor do TC de proteção selecionado caso haja um valor selecionado, caso contrário considerar o TC dimensionado para esse cálculo
    //Verifica se o valor do TC dimensionado é diferente de nulo para calcular o RTC dimensionado, caso contrário o RTC dimensionado permanece nulo 
    let RTCdimensionado = 0;
    if (valorTCdimensionado !== null) {
        RTCdimensionado = (valorTCdimensionado / 5);
    } else {
        RTCdimensionado = null;
    }


    //Calcula a potência mínima referente a 10% do TC dimensionado (calculado)
    let potenciaMinima = 0;
    //se o valor do TC de proteção selecionado for nulo, vazio ou zero, calcular a potência mínima com base no TC dimensionado, caso contrário calcular com base no TC de proteção selecionado
    if (TCdeprotecaoSelecionada === null || TCdeprotecaoSelecionada === "" || TCdeprotecaoSelecionada === 0) {
        potenciaMinima = valorTCdimensionado * 0.1 * tensaoSelecionada * Math.sqrt(3) * (fatorPotenciaSelecionada);
    }
    else {
        potenciaMinima = TCdeprotecaoSelecionada * 0.1 * tensaoSelecionada * Math.sqrt(3) * (fatorPotenciaSelecionada);
    }

    console.log("potencia minima", potenciaMinima);

    //Calcula a potência mínima referente a 10% do TC selecionado
    // Se o valor do TC preenchido pelo usuario for nulo, define a potência mínima desse TC como 0
    let potenciaMinima2 = 0;
    if (TCdeprotecaoSelecionada === null) {
        potenciaMinima2 = 0;
    }
    // Caso contrário, calcula a potência mínima com base no valor do TC preenchido pelo usuário
    else {
        potenciaMinima2 = TCdeprotecaoSelecionada * 0.1 * tensaoSelecionada * Math.sqrt(3) * (fatorPotenciaSelecionada);
    }



    // Armazena o valor TC dimensionado (calculado) no localStorage
    if (valorTCdimensionado !== null) {
        localStorage.setItem("valorTCideal", valorTCdimensionado);
    } else {
        localStorage.removeItem("valorTCideal");
    }

    // Armazena o valor do TC de proteção selecionado no localStorage, caso haja um valor selecionado, caso contrário armazena o valor do TC dimensionado
    //const TCdeprotecaoSelecionadaemka = 0;//não sei para que serve essa variável, mas ela é usada para armazenar o valor do TC de proteção selecionado em kA, caso haja um valor selecionado, caso contrário armazena o valor do TC dimensionado em kA

    // Armazena no localStorage o valor de RTC dimensionado, do TC dimensionado e do TC em kA, no lugar do TC de proteção selecionado, 
    // caso o valor do TC de proteção selecionado seja nulo, vazio ou zero, 
    // caso contrário armazena os valores do TC de proteção selecionado
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
    //-----------------Fim da etapa de determinação de quais valores serão armazenados no localstorage-----------------
    // ------------------------fim calculos dos TCs-----------------------------------------------


    //-------------INICIO DOS CALCULOS DE POTENCIA BASE PARA CALCULOS DE P.U --------------------
    //-----calcular potencia base (denominador) para calculos de P.U --------------------

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

    //compara potencia minima com a demanda selecionada (preenchida pelo usuario) com a pontecia minima referente a precisao 
    // dos 10% do TC Selecionado caso tenha sido preenchida, ou do TC calculado, 
    // caso não tenha sido preenchido pelo usuario, se a demanda preenchida for menor que a potencia minima 
    //então uma variavel armazena a potencia preenchida(selecionada) que sera demanda de contrato e a potencia minima é salva no localStorage

    if (demandaSelecionada < potenciaMinima) {
        localStorage.setItem("demandaSelecionada", potenciaMinima.toFixed(2));
        localStorage.setItem("demandadecontrato", demandaSelecionada);

    } else {
        localStorage.setItem("demandaSelecionada", demandaSelecionada);
        localStorage.setItem("demandadecontrato", demandaSelecionada);
    }

    //compara potencia de GD minima com a POTENCIA DE GD selecionada, se a demanda selecionada for menor que a potencia minima 
    //então uma variavel armazena a potencia selecionada que sera demanda GD de contrato e a potencia minima é salva no localStorage

    if (potenciaGDSelecionada < potenciaMinima) {
        localStorage.setItem("potenciaGDSelecionada", potenciaMinima.toFixed(2));
        //localStorage.setItem("potenciaGDcontratada", potenciaGDSelecionada);

    } else {
        localStorage.setItem("potenciaGDSelecionada", potenciaGDSelecionada);
        //localStorage.setItem("potenciaGDcontratada", potenciaGDSelecionada);
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


    // Verifica se a corrente nominal de demanda (consumo) é menor que a corrente mínima do TC dimensionado
    // ou do TC selecionado, se for o valor é substituído pela corrente mínima do TC dimensionado 
    // ou do TC selecionado, escolhendo o maior valor entre os dois, e uma variável armazena se 
    // a corrente nominal de consumo foi ajustada para atender a corrente mínima do TC dimensionado ou do TC selecionado

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


    // Verifica se a corrente nominal de demanda de GD (injeção) é menor que a corrente mínima do TC dimensionado
    // ou do TC selecionado, se for o valor é substituído pela corrente mínima do TC dimensionado 
    // ou do TC selecionado, escolhendo o maior valor entre os dois, e uma variável armazena se 
    // a corrente nominal de injeção foi ajustada para atender a corrente mínima do TC dimensionado ou do TC selecionado
    let inominalminimaTCGD;
    if (inominalDemandaGD < correntedeconsumominimaSelecionado && correntedeconsumominimaSelecionado > 0) {

        inominalDemandaGD = correntedeconsumominimaSelecionado;

        inominalminimaTCGD = "Sim";
    } else if (inominalDemandaGD < correntedeconsumominima && correntedeconsumominima > 0 && correntedeconsumominimaSelecionado === 0) {

        inominalDemandaGD = correntedeconsumominima;

        inominalminimaTCGD = "Sim";
    } else {
        inominalminimaTCGD = "Não";
    }


    //armazena a corrente nominal de consumo mínima no localStorage
    localStorage.setItem("inominalminimaTC", inominalminimaTC); // Armazena a corrente nominal de consumo no localStorage
    localStorage.setItem("correntedeconsumominima", correntedeconsumominima.toFixed(2));
    localStorage.setItem("Inominalfase", inominalDemanda.toFixed(2));



    //armazena a corrente nominal de injeção mínima no localStorage
    localStorage.setItem("inominalminimaTCGD", inominalminimaTCGD);
    localStorage.setItem("correntedeGDminima", correntedeconsumominima.toFixed(2));
    localStorage.setItem("InominalfaseGD", inominalDemandaGD.toFixed(2));


    //-----------FIM DO CALCULO DO MINIMO DE CORRENTE DE CONSUMO PARA O TC DE PROTEÇÃO-----------------------------


    const valorTCSelecionado2 = localStorage.getItem("valorTCideal");
    let tcProtecaoIdeal = document.getElementById("tcdeProtecaoideal");
    if (tcProtecaoIdeal) {
        tcProtecaoIdeal.textContent = valorTCSelecionado2 !== null ? valorTCSelecionado2 + " :5" : "";
    }


}


function dimensionarTPconformenorma() {
    let TPdeprotecaoEscolhido = parseFloat(localStorage.getItem("TPdeprotecaoEscolhido"));
    if (!TPdeprotecaoEscolhido || isNaN(TPdeprotecaoEscolhido) || TPdeprotecaoEscolhido <= 0) {
        localStorage.setItem("TPdeprotecaoSelecionada", "120");

    } else {
        localStorage.setItem("TPdeprotecaoSelecionada", TPdeprotecaoEscolhido);
    }


    let ligacaoBobinaEscolhido = localStorage.getItem("ligacaodabobinaEscolhido");
    if (!ligacaoBobinaEscolhido || ligacaoBobinaEscolhido === "") {
        localStorage.setItem("ligacaodabobinaSelecionada", "Estrela-Estrela");
    } else {
        localStorage.setItem("ligacaodabobinaSelecionada", ligacaoBobinaEscolhido);
    }

    let RTPauxiliarEscolhido = parseFloat(localStorage.getItem("RTPauxiliarEscolhido"));
    if (!RTPauxiliarEscolhido || isNaN(RTPauxiliarEscolhido) || RTPauxiliarEscolhido <= 0) {
        localStorage.setItem("RTPauxiliarSelecionada", "120");
    } else {
        localStorage.setItem("RTPauxiliarSelecionada", RTPauxiliarEscolhido);
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
