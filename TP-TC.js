
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
    // Persiste o valor do TC de proteção selecionado do localStorage ou pré-preenche com o calculado
    const TC = document.getElementById("tcdeProtecao");
    const TCSalva = localStorage.getItem("TCdeprotecaoEscolhido") || localStorage.getItem("valorTCideal");
    if (TCSalva && TC) {
        TC.value = TCSalva;
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
    // INICIALIZAÇÃO E EVENT LISTENERS DE SATURAÇÃO DO TC (ABNT NBR 6856:2021)
    //-----------------------------------------------------------------------------------------
    inicializarCamposSaturacaoTC();
    configurarEventosSaturacaoTC();

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

// =========================================================================================
// MÓDULO DE DIMENSIONAMENTO E VERIFICAÇÃO DE SATURAÇÃO DO TC (ABNT NBR 6856:2021)
// =========================================================================================

const VALORES_TC_COMERCIAIS = [
    5, 10, 15, 20, 25, 30, 40, 50, 60, 75, 100,
    150, 200, 250, 300, 400, 500, 600, 800, 1000, 1200, 1500, 2000, 2500, 3000, 4000, 5000, 6000, 8000
];

const POTENCIAS_TC_COMERCIAIS = [
    2.5, 5, 10, 12.5, 15, 20, 22.5, 25, 30, 45, 50, 60, 90, 100
];

const RESISTENCIA_CONDUTOR_POR_BITOLA = {
    "1.5": 12.10,
    "2.5": 7.41,
    "4": 4.61,
    "6": 3.08,
    "10": 1.83,
    "16": 1.15
};

function inicializarCamposSaturacaoTC() {
    // 1. Corrente primária do TC / RTC (em formato de label copiado de TCdeprotecaoSelecionada do localStorage)
    const labelTcPrimario = document.getElementById("label-tc-primario-saturacao-html");
    const inputTcPrimario = document.getElementById("input-tc-primario-saturacao-html");
    const salvoTc = localStorage.getItem("TCdeprotecaoSelecionada") ||
                    localStorage.getItem("TCdeprotecaoEscolhido") ||
                    localStorage.getItem("tcPrimarioSaturacao") ||
                    localStorage.getItem("valorTCideal") ||
                    "100";
    if (labelTcPrimario) {
        labelTcPrimario.textContent = salvoTc;
    }
    if (inputTcPrimario) {
        inputTcPrimario.value = salvoTc;
    }

    // 2. Corrente secundária nominal (Is pré-preenchido como 5 A em formato de label)
    const labelIs = document.getElementById("label-corrente-secundaria-tc-html");
    const inputIs = document.getElementById("input-corrente-secundaria-tc-html");
    if (labelIs) {
        labelIs.textContent = "5";
    }
    if (inputIs) {
        inputIs.value = "5";
    }
    localStorage.setItem("correnteSecundariaTC", "5");

    // 3. Potência nominal do TC (Sb)
    const inputSb = document.getElementById("input-potencia-Nominal-TC-html");
    if (inputSb) {
        let salvoSb = localStorage.getItem("potenciaNominalTC") || "25VA";
        if (salvoSb && !salvoSb.includes("VA")) {
            salvoSb = salvoSb + "VA";
        }
        inputSb.value = salvoSb;
    }

    // 4. Erro de saturação (%)
    const inputErro = document.getElementById("input-erro-saturacao-TC-html");
    if (inputErro) {
        const salvoErro = localStorage.getItem("erroSaturacaoTC") || "10";
        inputErro.value = salvoErro;
    }

    // 5. Fator de multiplicidade (ALF)
    const inputAlf = document.getElementById("input-fator-multiplicidade-TC-html");
    if (inputAlf) {
        const salvoAlf = localStorage.getItem("fatorMultiplicidadeTC") || "20";
        inputAlf.value = salvoAlf;
    }

    // 6. Fator kTC
    const inputKtc = document.getElementById("input-ktc-fator-impedancia-html");
    if (inputKtc) {
        const salvoKtc = localStorage.getItem("ktcFatorImpedancia") || "0.2";
        inputKtc.value = salvoKtc;
    }

    // 7. Corrente de curto-circuito (Icc) preenchida com a informação de curtoSelecionada do localStorage em formato de label
    const labelIcc = document.getElementById("label-icc-curto-saturacao-html");
    const inputIcc = document.getElementById("input-icc-curto-saturacao-html");
    const salvoIcc = localStorage.getItem("curtoSelecionada") ||
                     localStorage.getItem("iccCurtoSaturacao") ||
                     "";
    if (labelIcc) {
        labelIcc.textContent = salvoIcc !== "" ? salvoIcc : "--";
    }
    if (inputIcc) {
        inputIcc.value = salvoIcc;
    }

    // 8. Comprimento do condutor (L)
    const inputL = document.getElementById("input-comprimento-Condutor-TC-html");
    if (inputL) {
        const salvoL = localStorage.getItem("comprimentoCondutorTC") || "20";
        inputL.value = salvoL;
    }

    // 9. Bitola do condutor
    const inputBitola = document.getElementById("input-bitola-Condutor-TC-html");
    if (inputBitola) {
        const salvaBitola = localStorage.getItem("bitolaCondutorTC") || "2.5";
        inputBitola.value = salvaBitola;
    }

    // 10. Resistividade do condutor (Rcab)
    const inputRcab = document.getElementById("input-resistividade-Condutor-TC-html");
    if (inputRcab) {
        const bitolaAtual = inputBitola ? inputBitola.value : "2.5";
        const rDefault = RESISTENCIA_CONDUTOR_POR_BITOLA[bitolaAtual] || 7.41;
        const salvaRcab = localStorage.getItem("resistividadeCondutorTC") || rDefault.toString();
        inputRcab.value = salvaRcab;
    }

    // 11. Potência bobina do relé (Srele)
    const inputSrele = document.getElementById("input-potencia-bobina-rele-html");
    if (inputSrele) {
        const salvaSrele = localStorage.getItem("potenciabobinaRele") || "0.5";
        inputSrele.value = salvaSrele;
    }

    // 12. Relação X/R
    const inputXr = document.getElementById("input-relacao-xr-curto-html");
    if (inputXr) {
        const salvaXr = localStorage.getItem("relacaoXRCurto") || "0";
        inputXr.value = salvaXr;
    }

    // Executa o primeiro cálculo completo e atualização da interface
    calcularEAtualizarSaturacaoTC();
}

function configurarEventosSaturacaoTC() {
    const idsInputs = [
        "input-tc-primario-saturacao-html",
        "input-corrente-secundaria-tc-html",
        "input-potencia-Nominal-TC-html",
        "input-erro-saturacao-TC-html",
        "input-fator-multiplicidade-TC-html",
        "input-ktc-fator-impedancia-html",
        "input-icc-curto-saturacao-html",
        "input-comprimento-Condutor-TC-html",
        "input-bitola-Condutor-TC-html",
        "input-resistividade-Condutor-TC-html",
        "input-potencia-bobina-rele-html",
        "input-relacao-xr-curto-html"
    ];

    idsInputs.forEach(id => {
        const el = document.getElementById(id);
        if (el) {
            el.addEventListener("input", () => {
                calcularEAtualizarSaturacaoTC();
            });
            el.addEventListener("change", () => {
                calcularEAtualizarSaturacaoTC();
            });
        }
    });

    // Atualização automática da resistência linear ao mudar a bitola
    const inputBitola = document.getElementById("input-bitola-Condutor-TC-html");
    const inputRcab = document.getElementById("input-resistividade-Condutor-TC-html");
    if (inputBitola && inputRcab) {
        inputBitola.addEventListener("change", function () {
            const valorBitola = inputBitola.value;
            if (RESISTENCIA_CONDUTOR_POR_BITOLA[valorBitola] !== undefined) {
                inputRcab.value = RESISTENCIA_CONDUTOR_POR_BITOLA[valorBitola];
            }
            calcularEAtualizarSaturacaoTC();
        });
    }

    // Sincronização em tempo real da alteração da corrente de primário do TC pelo usuário
    const labelTcPrimario = document.getElementById("label-tc-primario-saturacao-html");
    const inputTcPrimario = document.getElementById("input-tc-primario-saturacao-html");
    const inputTcProtecao = document.getElementById("tcdeProtecao");
    if (inputTcProtecao) {
        const tratarAlteracaoTc = function () {
            const valorTexto = inputTcProtecao.value.trim();
            const valorNum = parseFloat(valorTexto);

            if (Number.isFinite(valorNum) && valorNum > 0) {
                localStorage.setItem("TCdeprotecaoEscolhido", valorNum);
                localStorage.setItem("TCdeprotecaoSelecionada", valorNum);
                localStorage.setItem("tcPrimarioSaturacao", valorNum);
                if (labelTcPrimario) labelTcPrimario.textContent = valorNum;
                if (inputTcPrimario) inputTcPrimario.value = valorNum;
            } else if (valorTexto === "") {
                localStorage.removeItem("TCdeprotecaoEscolhido");
                const ideal = localStorage.getItem("valorTCideal") || "100";
                localStorage.setItem("TCdeprotecaoSelecionada", ideal);
                localStorage.setItem("tcPrimarioSaturacao", ideal);
                if (labelTcPrimario) labelTcPrimario.textContent = ideal;
                if (inputTcPrimario) inputTcPrimario.value = ideal;
            }

            // Recalcula o dimensionamento conforme a norma e atualiza os cards superiores (RTC, Pot 10%, Pot Base)
            dimensionarTCconformenorma();
            atualizarExibicaoDimensionamentoTC();

            // Recalcula toda a tabela de saturação em tempo real
            calcularEAtualizarSaturacaoTC();
        };

        inputTcProtecao.addEventListener("input", tratarAlteracaoTc);
        inputTcProtecao.addEventListener("change", tratarAlteracaoTc);
    }

    // Botões de aplicação das recomendações de redimensionamento
    const btnAplicarRTC = document.getElementById("btn-aplicar-redim-tc");
    if (btnAplicarRTC) {
        btnAplicarRTC.addEventListener("click", function () {
            const tcSug = btnAplicarRTC.dataset.tcsugerido;
            if (tcSug) {
                if (labelTcPrimario) labelTcPrimario.textContent = tcSug;
                if (inputTcPrimario) inputTcPrimario.value = tcSug;
                if (inputTcProtecao) inputTcProtecao.value = tcSug;
                localStorage.setItem("TCdeprotecaoEscolhido", tcSug);
                localStorage.setItem("TCdeprotecaoSelecionada", tcSug);
                localStorage.setItem("tcPrimarioSaturacao", tcSug);
                dimensionarTCconformenorma();
                atualizarExibicaoDimensionamentoTC();
                calcularEAtualizarSaturacaoTC();
            }
        });
    }

    const btnAplicarSb = document.getElementById("btn-aplicar-redim-sb");
    if (btnAplicarSb) {
        btnAplicarSb.addEventListener("click", function () {
            const sbSug = btnAplicarSb.dataset.sbsugerido;
            const inputSb = document.getElementById("input-potencia-Nominal-TC-html");
            if (sbSug && inputSb) {
                const valorFormatado = sbSug + "VA";
                inputSb.value = valorFormatado;
                localStorage.setItem("potenciaNominalTC", valorFormatado);
                calcularEAtualizarSaturacaoTC();
            }
        });
    }

    // Sincronização em tempo real do Icc digitado com curtoSelecionada do localStorage
    const inputIccCurto = document.getElementById("input-icc-curto-saturacao-html");
    if (inputIccCurto) {
        inputIccCurto.addEventListener("input", function () {
            if (inputIccCurto.value.trim() !== "") {
                localStorage.setItem("curtoSelecionada", inputIccCurto.value.trim());
                localStorage.setItem("iccCurtoSaturacao", inputIccCurto.value.trim());
            }
        });
    }
}

function calcularEAtualizarSaturacaoTC() {
    // 1. Leitura dos inputs e sincronização das labels
    const labelTcPrimario = document.getElementById("label-tc-primario-saturacao-html");
    const elTcPrimario = document.getElementById("input-tc-primario-saturacao-html");
    const labelIs = document.getElementById("label-corrente-secundaria-tc-html");
    const elIs = document.getElementById("input-corrente-secundaria-tc-html");
    const labelIcc = document.getElementById("label-icc-curto-saturacao-html");
    const elIcc = document.getElementById("input-icc-curto-saturacao-html");
    const elSb = document.getElementById("input-potencia-Nominal-TC-html");
    const elErro = document.getElementById("input-erro-saturacao-TC-html");
    const elAlf = document.getElementById("input-fator-multiplicidade-TC-html");
    const elKtc = document.getElementById("input-ktc-fator-impedancia-html");
    const elL = document.getElementById("input-comprimento-Condutor-TC-html");
    const elBitola = document.getElementById("input-bitola-Condutor-TC-html");
    const elRcab = document.getElementById("input-resistividade-Condutor-TC-html");
    const elSrele = document.getElementById("input-potencia-bobina-rele-html");
    const elXr = document.getElementById("input-relacao-xr-curto-html");

    // Parâmetros numéricos com fallbacks seguros
    let Ip = parseFloat(localStorage.getItem("TCdeprotecaoSelecionada")) ||
             parseFloat(elTcPrimario ? elTcPrimario.value : "") ||
             parseFloat(localStorage.getItem("TCdeprotecaoEscolhido")) ||
             100;
    if (elTcPrimario) elTcPrimario.value = Ip;
    if (labelTcPrimario) labelTcPrimario.textContent = Ip;

    const Is = 5;
    if (elIs) elIs.value = "5";
    if (labelIs) labelIs.textContent = "5";
    const RTC = Is > 0 ? (Ip / Is) : 20;

    let sbBruto = elSb ? elSb.value : "25VA";
    const Sb = parseFloat(sbBruto) || 25;

    const erro = parseFloat(elErro ? elErro.value : "") || 10;
    const ALF = parseFloat(elAlf ? elAlf.value : "") || 20;
    const kTC = parseFloat(elKtc ? elKtc.value : "") || 0.2;

    let Icc = parseFloat(localStorage.getItem("curtoSelecionada")) ||
              parseFloat(elIcc ? elIcc.value : "") ||
              parseFloat(localStorage.getItem("iccCurtoSaturacao")) || 0;
    if (elIcc) {
        elIcc.value = Icc > 0 ? Icc : "";
    }
    if (labelIcc) {
        labelIcc.textContent = Icc > 0 ? Icc : "--";
    }

    const L = parseFloat(elL ? elL.value : "") || 20;
    const bitola = parseFloat(elBitola ? elBitola.value : "") || 2.5;
    const Rcab = parseFloat(elRcab ? elRcab.value : "") || 7.41;
    const Srele = parseFloat(elSrele ? elSrele.value : "") || 0.5;
    const xr = parseFloat(elXr ? elXr.value : "") || 0;

    // 2. Atualização das badges na Tabela 1
    const badgeRtc = document.getElementById("label-rtc-calculada-html");
    if (badgeRtc) {
        badgeRtc.textContent = `RTC = ${RTC.toFixed(0)} : 1 (${Ip}/${Is} A)`;
    }

    const badgeNormaNova = document.getElementById("label-especificacao-norma-nova-html");
    if (badgeNormaNova) {
        badgeNormaNova.textContent = `${Sb}VA ${erro}P${ALF}`;
    }

    const badgeCondutor = document.getElementById("label-especificacao-condutor-html");
    if (badgeCondutor) {
        badgeCondutor.textContent = `${L} m`;
    }

    const badgeBitola = document.getElementById("label-especificacao-bitola-html");
    if (badgeBitola) {
        badgeBitola.textContent = `${bitola} mm²`;
    }

    const badgeResistividade = document.getElementById("label-especificacao-resistividade-html");
    if (badgeResistividade) {
        badgeResistividade.textContent = `${Rcab} Ω/km`;
    }

    const badgeSrele = document.getElementById("label-especificacao-potencia-bobina-rele-html");
    if (badgeSrele) {
        badgeSrele.textContent = `${Srele} VA`;
    }

    const badgeXr = document.getElementById("label-especificacao-relacao-xr-curto-html");
    if (badgeXr) {
        badgeXr.textContent = `X/R = ${xr}`;
    }

    // 3. Cálculos conforme ABNT NBR 6856:2021
    // Impedância do cabo (ida e volta): Zcabo = 2 × (L / 1000) × Rcab
    const Zcabo = 2 * (L / 1000) * Rcab;

    // Impedância interna do TC: ZTC = kTC × Sb / Is²
    const Ztc = (kTC * Sb) / Math.pow(Is, 2);

    // Impedância da bobina do relé: Zrele = Srele / Is²
    const Zrele = Srele / Math.pow(Is, 2);

    // Impedância total do circuito secundário: Ztotal = Zcabo + ZTC + Zrele
    const Ztotal = Zcabo + Ztc + Zrele;

    // Carga nominal padronizada (Burden): Zb = Sb / Is²
    const Zb = Sb / Math.pow(Is, 2);

    // Corrente secundária de falta: Isec,cc = Icc / RTC
    const IsecCC = RTC > 0 ? (Icc / RTC) : 0;

    // Tensão requerida pela falta em regime permanente simétrico: Vreq = Isec,cc × Ztotal
    // Com componente transitória aperiódica (1 + X/R):
    let Vreq = IsecCC * Ztotal;
    if (xr > 0) {
        Vreq = Vreq * (1 + xr);
    }

    // Tensão requerida com margem de segurança de 20%
    const VreqMargem = 1.2 * Vreq;

    // Tensão de saturação nominal suportada pelo TC: Vsat = Sb × ALF / Is
    const Vsat = Is > 0 ? ((Sb * ALF) / Is) : 0;

    // Fator Limite de Exatidão Operacional Real (ALF real)
    // ALF_real = ALF * (Ztc + Zb) / (Ztc + Zcabo + Zrele) = ALF * (Ztc + Zb) / Ztotal
    const alfReal = Ztotal > 0 ? (ALF * (Ztc + Zb) / Ztotal) : 0;

    // Nomenclatura norma antiga equivalente (ABNT NBR 6856:1992):
    // Classe B: erroB[tensão terminal com 20xIn e burden nominal]
    const tensaoTerminalNormaAntiga = Math.round((ALF * Is * Zb));
    const especificacaoAntiga = `${erro}B${tensaoTerminalNormaAntiga}`;

    // 4. Preenchimento da Tabela 2 (Resultados)
    const lblZcabo = document.getElementById("label-zcabo-calculado-html");
    if (lblZcabo) lblZcabo.textContent = `${Zcabo.toFixed(4)} Ω`;

    const lblZtc = document.getElementById("label-ztc-interno-calculado-html");
    if (lblZtc) lblZtc.textContent = `${Ztc.toFixed(4)} Ω`;

    const lblZrele = document.getElementById("label-zrele-calculado-html");
    if (lblZrele) lblZrele.textContent = `${Zrele.toFixed(4)} Ω`;

    const lblZtot = document.getElementById("label-impedancia-calculada-total-html");
    if (lblZtot) lblZtot.textContent = `${Ztotal.toFixed(4)} Ω`;

    const lblZb = document.getElementById("label-burden-calculado-tc-html");
    if (lblZb) lblZb.textContent = `${Zb.toFixed(4)} Ω`;

    const lblIsec = document.getElementById("label-icc-secundaria-html");
    if (lblIsec) lblIsec.textContent = `${IsecCC.toFixed(2)} A`;

    const lblVreq = document.getElementById("label-tensao-saturacao-calculada-TC-html");
    if (lblVreq) lblVreq.textContent = `${Vreq.toFixed(2)} V`;

    const lblVreqMargem = document.getElementById("label-tensao-requerida-margem-html");
    if (lblVreqMargem) lblVreqMargem.textContent = `${VreqMargem.toFixed(2)} V`;

    const lblVsat = document.getElementById("label-tensao-saturacao-nominal-html");
    if (lblVsat) lblVsat.textContent = `${Vsat.toFixed(2)} V`;

    const lblAlfReal = document.getElementById("label-alf-real-tc-html");
    if (lblAlfReal) lblAlfReal.textContent = `${alfReal.toFixed(2)}`;

    const lblNormaAntiga = document.getElementById("label-especificacao-norma-antiga-html");
    if (lblNormaAntiga) lblNormaAntiga.textContent = especificacaoAntiga;

    // 5. Avaliação de Saturação e Painel 3 (Status)
    const cardNotificacao = document.getElementById("label-notificacao-saturacao-tc-html");
    const aprovado = (Icc > 0) ? (Vsat >= VreqMargem) : true;

    if (cardNotificacao) {
        if (Icc <= 0) {
            cardNotificacao.className = "tp-tc-status-card tp-tc-status-card--aprovado";
            cardNotificacao.innerHTML = `
                <div class="tp-tc-status-title">
                    Aguardando Corrente de Curto-Circuito (Icc)
                </div>
                <div class="tp-tc-status-detail">
                    Informe o valor da corrente de curto-circuito (Icc) no campo correspondente para verificar o risco de saturação.
                </div>
            `;
        } else if (aprovado) {
            cardNotificacao.className = "tp-tc-status-card tp-tc-status-card--aprovado";
            cardNotificacao.innerHTML = `
                <div class="tp-tc-status-title">
                    TC Aprovado - Não Satura sob Falta (ABNT NBR 6856:2021)
                </div>
                <div class="tp-tc-status-detail">
                    A tensão limite nominal suportada pelo TC (<strong>Vsat = ${Vsat.toFixed(2)} V</strong>) é superior à tensão requerida pela falta com margem de 20% (<strong>1,2 × Vreq = ${VreqMargem.toFixed(2)} V</strong>).<br>
                    O fator de exatidão real é <strong>ALF real = ${alfReal.toFixed(2)}</strong> (suporta até ${(alfReal * Is).toFixed(1)} A no secundário sem distorção). O TC operará na região linear, garantindo a atuação confiável e seletiva do relé de proteção.
                </div>
                <div>
                    <span class="tp-tc-status-badge tp-tc-status-badge--verde">APROVADO PELA NORMA ABNT NBR 6856:2021</span>
                </div>
            `;
        } else {
            cardNotificacao.className = "tp-tc-status-card tp-tc-status-card--reprovado";
            cardNotificacao.innerHTML = `
                <div class="tp-tc-status-title">
                    TC Reprovado - Risco de Saturação sob Curto-Circuito (ABNT NBR 6856:2021)
                </div>
                <div class="tp-tc-status-detail">
                    A tensão exigida sob curto-circuito com margem de segurança de 20% (<strong>1,2 × Vreq = ${VreqMargem.toFixed(2)} V</strong>) supera a tensão limite nominal suportada pelo TC (<strong>Vsat = ${Vsat.toFixed(2)} V</strong>).<br>
                    O fator de exatidão operacional real é <strong>ALF real = ${alfReal.toFixed(2)}</strong>, insuficiente para a corrente secundária de falta (${IsecCC.toFixed(1)} A = ${(IsecCC / Is).toFixed(1)} × Is). O TC sofrerá saturação severa, reduzindo a corrente secundária e podendo atrasar ou inibir a atuação do relé de proteção.
                </div>
                <div>
                    <span class="tp-tc-status-badge tp-tc-status-badge--vermelho">RISCO DE SATURAÇÃO - REDIMENSIONAMENTO NECESSÁRIO</span>
                </div>
            `;
        }
    }

    // 6. Painel 4: Redimensionamento Pelas Formas Diretas (ABNT NBR 6856:2021)
    // OPÇÃO A: Redimensionar Relação de Transformação (RTC)
    let rtcMin = 0;
    let ipMin = 0;
    let tcSugerido = null;
    if (Vsat > 0 && Icc > 0) {
        rtcMin = (1.2 * Icc * Ztotal * (1 + xr)) / Vsat;
        ipMin = rtcMin * Is;
        for (let i = 0; i < VALORES_TC_COMERCIAIS.length; i++) {
            if (VALORES_TC_COMERCIAIS[i] >= ipMin) {
                tcSugerido = VALORES_TC_COMERCIAIS[i];
                break;
            }
        }
        if (!tcSugerido) {
            tcSugerido = VALORES_TC_COMERCIAIS[VALORES_TC_COMERCIAIS.length - 1];
        }
    }

    const lblRtcMin = document.getElementById("label-redim-rtc-minimo");
    if (lblRtcMin) {
        lblRtcMin.textContent = rtcMin > 0 ? `${rtcMin.toFixed(2)} : 1 (Ip,mín = ${ipMin.toFixed(1)} A)` : "--";
    }

    const lblTcSug = document.getElementById("label-redim-tc-comercial-sug");
    if (lblTcSug) {
        lblTcSug.textContent = tcSugerido ? `${tcSugerido} : ${Is} A (RTC = ${(tcSugerido / Is).toFixed(0)} : 1)` : "--";
    }

    const txtCompA = document.getElementById("texto-comprovacao-opcao-a");
    const btnAppA = document.getElementById("btn-aplicar-redim-tc");
    if (tcSugerido && Icc > 0) {
        const novoRtc = tcSugerido / Is;
        const novaIsec = Icc / novoRtc;
        const novoVreq = novaIsec * Ztotal * (1 + xr);
        const novoVreqMargem = 1.2 * novoVreq;
        const novoAlfNecessario = novaIsec / Is;
        if (txtCompA) {
            txtCompA.innerHTML = `Com TC de <strong>${tcSugerido}/${Is} A</strong> (RTC = ${novoRtc.toFixed(0)}:1), a nova corrente secundária de falta será de <strong>${novaIsec.toFixed(2)} A</strong> (${novoAlfNecessario.toFixed(1)}×Is). A tensão requerida com margem de 20% cai para <strong>${novoVreqMargem.toFixed(2)} V</strong>, ficando inferior à tensão nominal suportada de <strong>${Vsat.toFixed(2)} V</strong>. TC Aprovado!`;
        }
        if (btnAppA) {
            btnAppA.dataset.tcsugerido = tcSugerido;
            btnAppA.disabled = false;
        }
    } else {
        if (txtCompA) txtCompA.textContent = "Preencha a corrente de curto-circuito para calcular o redimensionamento.";
        if (btnAppA) btnAppA.disabled = true;
    }

    // OPÇÃO B: Redimensionar Carga Nominal de Exatidão (Sb)
    let sbMin = 0;
    let sbSugerida = null;
    if (ALF > 0 && Is > 0 && IsecCC > 0) {
        const termoFalta = 1.2 * IsecCC * (1 + xr);
        const denomSb = (ALF / Is) - (termoFalta * kTC / Math.pow(Is, 2));
        const numSb = termoFalta * (Zcabo + Zrele);

        if (denomSb > 0) {
            sbMin = numSb / denomSb;
        } else {
            sbMin = (1.2 * Vreq * Is) / ALF;
        }

        for (let i = 0; i < POTENCIAS_TC_COMERCIAIS.length; i++) {
            if (POTENCIAS_TC_COMERCIAIS[i] >= sbMin) {
                sbSugerida = POTENCIAS_TC_COMERCIAIS[i];
                break;
            }
        }
    }

    const lblSbMin = document.getElementById("label-redim-sb-minimo");
    if (lblSbMin) {
        lblSbMin.textContent = sbMin > 0 ? `${sbMin.toFixed(2)} VA` : "--";
    }

    const lblSbSug = document.getElementById("label-redim-sb-comercial-sug");
    if (lblSbSug) {
        lblSbSug.textContent = sbSugerida ? `${sbSugerida} VA` : (sbMin > 100 ? "Excede catálogo padrão (Requer redimensionar RTC ou bitola)" : "--");
    }

    const txtCompB = document.getElementById("texto-comprovacao-opcao-b");
    const btnAppB = document.getElementById("btn-aplicar-redim-sb");
    if (sbSugerida && IsecCC > 0) {
        const novaZtc = (kTC * sbSugerida) / Math.pow(Is, 2);
        const novaZtot = Zcabo + novaZtc + Zrele;
        const novoVreqB = IsecCC * novaZtot * (1 + xr);
        const novoVreqMargemB = 1.2 * novoVreqB;
        const novaVsatB = (sbSugerida * ALF) / Is;

        if (txtCompB) {
            txtCompB.innerHTML = `Aumentando a potência nominal para <strong>${sbSugerida} VA</strong> (mantendo a relação ${Ip}/${Is} A), a nova tensão de saturação suportada sobe para <strong>${novaVsatB.toFixed(2)} V</strong>, atendendo à nova tensão requerida com margem (<strong>${novoVreqMargemB.toFixed(2)} V</strong>). TC Aprovado!`;
        }
        if (btnAppB) {
            btnAppB.dataset.sbsugerido = sbSugerida;
            btnAppB.disabled = false;
        }
    } else {
        if (txtCompB) {
            if (sbMin > 100) {
                txtCompB.textContent = "A potência requerida supera o limite comercial padrão (100 VA). Recomenda-se adotar a Opção A (redimensionar a RTC) ou reduzir a impedância da fiação.";
            } else {
                txtCompB.textContent = "Preencha a corrente de curto-circuito para calcular o redimensionamento.";
            }
        }
        if (btnAppB) btnAppB.disabled = true;
    }

    // 7. Persistência de sincronização no localStorage para as demais telas
    localStorage.setItem("potenciaNominalTC", Sb.toString());
    localStorage.setItem("erroSaturacaoTC", erro.toString());
    localStorage.setItem("fatorMultiplicidadeTC", ALF.toString());
    localStorage.setItem("comprimentoCondutorTC", L.toString());
    localStorage.setItem("bitolaCondutorTC", bitola.toString());
    localStorage.setItem("resistividadeCondutorTC", Rcab.toString());
    localStorage.setItem("potenciabobinaRele", Srele.toString());
    localStorage.setItem("relacaoXRCurto", xr.toString());
    localStorage.setItem("impedanciatotaldotrecho", Ztotal.toFixed(5));
    localStorage.setItem("impedanciaburdendoTC", Zb.toFixed(5));
    localStorage.setItem("tensaoSaturacaoTC", Vsat.toFixed(2));
    localStorage.setItem("tensaoSaturacaotrecho", Vreq.toFixed(2));
    localStorage.setItem("alfRealTC", alfReal.toFixed(2));
    localStorage.setItem("statusdasaturacaotc", aprovado ? "nao" : "sim");
    localStorage.setItem("EspecificacaoNormaAntigaTC", especificacaoAntiga);
    localStorage.setItem("especificacaoTC", `${Sb}VA ${erro}P${ALF}`);
}




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

    const inputTcPrimarioSat = document.getElementById("input-tc-primario-saturacao-html");
    if (inputTcPrimarioSat && inputTcPrimarioSat.value.trim() !== "") {
        localStorage.setItem("tcPrimarioSaturacao", inputTcPrimarioSat.value.trim());
        if (!TCdeprotecaoEscolhido || TCdeprotecaoEscolhido.trim() === "") {
            localStorage.setItem("TCdeprotecaoEscolhido", inputTcPrimarioSat.value.trim());
        }
    }

    const inputCorrenteSec = document.getElementById("input-corrente-secundaria-tc-html");
    if (inputCorrenteSec && inputCorrenteSec.value) {
        localStorage.setItem("correnteSecundariaTC", inputCorrenteSec.value);
    }

    const inputKtc = document.getElementById("input-ktc-fator-impedancia-html");
    if (inputKtc && inputKtc.value.trim() !== "") {
        localStorage.setItem("ktcFatorImpedancia", inputKtc.value.trim());
    }

    const inputIccCurto = document.getElementById("input-icc-curto-saturacao-html");
    if (inputIccCurto && inputIccCurto.value.trim() !== "") {
        localStorage.setItem("curtoSelecionada", inputIccCurto.value.trim());
        localStorage.setItem("iccCurtoSaturacao", inputIccCurto.value.trim());
    }

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

    const potenciaTotalTrafos = parseFloat(localStorage.getItem("potenciatotaltrafos")) || 0;

    if (demandaSelecionada < potenciaMinima && potenciaTotalTrafos >= potenciaMinima) {
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
    // Não aplica a corrente nominal mínima caso a potência total dos transformadores seja menor que a demanda mínima calculada

    let inominalminimaTC;
    if (potenciaTotalTrafos < potenciaMinima) {
        inominalminimaTC = "Não";
    } else if (inominalDemanda < correntedeconsumominimaSelecionado && correntedeconsumominimaSelecionado > 0) {
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


    atualizarExibicaoDimensionamentoTC();
}

function atualizarExibicaoDimensionamentoTC() {
    const valorTCideal = localStorage.getItem("valorTCideal");
    const tcProtecaoIdeal = document.getElementById("tcdeProtecaoideal");
    if (tcProtecaoIdeal) {
        tcProtecaoIdeal.textContent = valorTCideal !== null ? valorTCideal + " :5" : "";
    }

    const rtc = localStorage.getItem("RTCselecionado");
    const elRTC = document.getElementById("RTChtml");
    if (elRTC && rtc !== null && rtc !== "") {
        elRTC.textContent = rtc;
    }

    const potMin = localStorage.getItem("potenciaMinimaSelecionada");
    const elPotMin = document.getElementById("potenciaMinimahtml");
    if (elPotMin && potMin !== null && potMin !== "") {
        elPotMin.textContent = potMin + " kW";
    }

    const potBase = localStorage.getItem("potenciabase");
    const elPotBase = document.getElementById("potenciabasehtml");
    if (elPotBase && potBase !== null && potBase !== "") {
        elPotBase.textContent = potBase + " kVA";
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
