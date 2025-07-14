// Debug: mostrar todos os itens do localStorage
// console.log('Itens no localStorage:');
// for (let i = 0; i < localStorage.length; i++) {
//     var chave = localStorage.key(i);
//     console.log(`${chave}:`, localStorage.getItem(chave));
// }

//INICIALIZAR DO CARREGAMENTO DA PAGINA 
document.addEventListener('DOMContentLoaded', function () {




    // Aguardar MathJax carregar
    if (typeof MathJax !== 'undefined') {
        MathJax.startup.promise.then(() => {
            atualizarFormula();
            atualizarFormula2();
        });
    } else {
        setTimeout(() => {
            atualizarFormula();
            atualizarFormula2();
        }, 1000);
    }

    const botaoParametro = document.getElementById("botaoestudoshtml");
    if (botaoParametro) {
        botaoParametro.style.backgroundColor = "#cf0808";
    }

    // Carregar o script do gráfico
    carregarScript('grafico5051consumo.js', function () {
        setTimeout(() => {
            verificarMathJax();
        }, 1000);
    });

    // Carregar tabela de relés
    setTimeout(() => {

        adicionarEstilosTabelaParametrizacaoReles();
        carregarTabelaReles();

    }, 1500);


    carregarVariaveisEstudo()

    incluirimagensrele()
});



// -----------------------------------------------------------
//Função para carregar PARAMETROS ELETRICOS do localStorage e exibir na página

function carregarVariaveisEstudo() {

    const tensaoAtendimento = localStorage.getItem('tensaoSelecionada');
    if (tensaoAtendimento !== null) {
        const tensaoEl = document.getElementById('tensao-atendimento');
        if (tensaoEl) {
            tensaoEl.textContent = tensaoAtendimento + ' kV';
        }
    }

    const demandaContratada = localStorage.getItem('demandaSelecionada');
    if (demandaContratada !== null) {
        const demandaEl = document.getElementById('demanda-contratada-consumo');
        if (demandaEl) {
            demandaEl.textContent = demandaContratada + ' kW';
        }
    }

    const fatorPotencia = localStorage.getItem('fatorPotenciaSelecionada');
    if (fatorPotencia !== null) {
        const fatorEl = document.getElementById('fator-potencia');
        if (fatorEl) {
            fatorEl.textContent = fatorPotencia * 100 + '%';
        }
    }

    const iccPontoConexao = localStorage.getItem('curtoSelecionada');
    if (iccPontoConexao !== null) {
        const iccEl = document.getElementById('icc-ponto-conexao');
        if (iccEl) {
            iccEl.textContent = iccPontoConexao + ' A';
        }
    }

    const releProtecao = localStorage.getItem('TabelaSelecionadaHTML');
    if (releProtecao !== null) {
        const releEl = document.getElementById('rele-protecao');
        if (releEl) {
            // Remove tudo antes do primeiro "-" (incluindo o "-")
            const textoLimpo = releProtecao.replace(/^[^-]*-/, '').trim();
            releEl.textContent = textoLimpo;
        }
    }






    const geradorSalvo = JSON.parse(localStorage.getItem("geradorJSON")) || {};
    const geradorDiesel = parseFloat(geradorSalvo.potencia) || 0;

    if (geradorDiesel !== null) {
        const geradorEl = document.getElementById('gerador-diesel');
        if (geradorEl) {
            geradorEl.textContent = geradorDiesel + ' kVA';
        }
    }


    // ---------FIM DO CARREGAMENTO DAS VARIAVEIS DOS PARAMETROS ELETRICO -------------------

    //FUNÇÃO PARA CARREGA CAMPOS E CALCULOS DE CORRENTES DOS TRAFOS

    for (let i = 1; i <= 10; i++) { // Suporta até trafo10JSON e s-trf10
        const trafoSalvo = JSON.parse(localStorage.getItem(`trafo${i}JSON`)) || {};
        const potenciaTrafo = parseFloat(trafoSalvo.potencia) || 0;
        // Corrige para s-trf01, s-trf02 ... s-trf10 (com zero à esquerda para 1-9, sem zero para 10)
        const trafoId = i < 10 ? `s-trf0${i}` : `s-trf${i}`;
        const trafoEl = document.getElementById(trafoId);
        if (trafoEl) {
            trafoEl.textContent = potenciaTrafo + ' kVA';
        }

        // Preencher campo potencia da tabela de trafos
        const potenciaId = i < 10 ? `potencia-0${i}` : `potencia-${i}`;
        const potenciaEl = document.getElementById(potenciaId);
        if (potenciaEl) {
            potenciaEl.textContent = potenciaTrafo + ' kVA';
        }

        // Preencher campo de quantidade do trafo

        const qtdeTrafo = parseFloat(trafoSalvo.qtde) || 0;
        const qtdeId = i < 10 ? `qtde-0${i}` : `qtde-${i}`;
        const qtdeEl = document.getElementById(qtdeId);
        if (qtdeEl) {
            qtdeEl.textContent = qtdeTrafo;
        }

        // Preencher campo im-in-0x importando imin
        const imin = trafoSalvo.imin || 0;
        const imInId = i < 10 ? `im-in-0${i}` : `im-in-${i}`;
        const imInEl = document.getElementById(imInId);
        if (imInEl) {
            imInEl.textContent = imin;
        }

        // Preencher campo t-0x importando tempo
        const tempo = trafoSalvo.tempo || 0;
        const tempoId = i < 10 ? `t-0${i}` : `t-${i}`;
        const tempoEl = document.getElementById(tempoId);
        if (tempoEl) {
            tempoEl.textContent = tempo + ' s';
        }




        // Preencher campo de tensão do trafo
        const tensaoTrafo = localStorage.getItem('tensaoSelecionada');
        const denominadorId = i < 10 ? `v-trf0${i}` : `v-trf${i}`;
        const denominadorEl = document.getElementById(denominadorId);
        if (denominadorEl && tensaoTrafo !== null) {
            denominadorEl.textContent = tensaoTrafo + ' *√3  kV';
        }

        // Preencher campo de corrente do trafo
        const correnteTrafo = potenciaTrafo;
        const correntesTrafos = JSON.parse(localStorage.getItem('correntestrafosJSON')) || {};
        const trafoKey = `trafo${i}`;
        const resultadoTrfId = i < 10 ? `resultado-trf0${i}` : `resultado-trf${i}`;

        // Preencher impedância do trafo
        const impedanciaTrafo = trafoSalvo.z || 0;
        // Preencher campo den-ansi-tr0x
        const impedanciaId = i < 10 ? `den-ansi-tr0${i}` : `den-ansi-tr${i}`;
        const impedanciaEl = document.getElementById(impedanciaId);
        if (impedanciaEl) {
            impedanciaEl.textContent = impedanciaTrafo + ' %';
        }
        // Preencher campo z-0x
        const zId = i < 10 ? `z-0${i}` : `z-${i}`;
        const zEl = document.getElementById(zId);
        if (zEl) {
            zEl.textContent = impedanciaTrafo + ' %';
        }










        if (correntesTrafos[trafoKey] && correntesTrafos[trafoKey].intrafoindividual !== undefined) {
            const resultadoTrfEl = document.getElementById(resultadoTrfId);
            if (resultadoTrfEl) {
                resultadoTrfEl.textContent = correntesTrafos[trafoKey].intrafoindividual.toFixed(2) + ' A';
            }


            // Preencher campo de corrente do trafo neutro
            // Preencher campo de corrente do trafo neutro
            const inAnsiId = i < 10 ? `in-ansi-tr0${i}` : `in-ansi-tr${i}`;
            const inAnsiEl = document.getElementById(inAnsiId);
            if (inAnsiEl) {
                inAnsiEl.textContent = correntesTrafos[trafoKey].intrafoindividual.toFixed(2) + ' A';
            }

            // Preencher campo in-0x
            const inId = i < 10 ? `in-0${i}` : `in-${i}`;
            const inEl = document.getElementById(inId);
            if (inEl) {
                inEl.textContent = correntesTrafos[trafoKey].intrafoindividual.toFixed(2) + ' A';
            }

            // Preencher campo resultado-ansi-tr0x considerando intrafo
            const resultadoAnsiTrId = i < 10 ? `resultado-ansi-tr0${i}` : `resultado-ansi-tr${i}`;
            const resultadoAnsiTrEl = document.getElementById(resultadoAnsiTrId);
            if (resultadoAnsiTrEl) {
                resultadoAnsiTrEl.textContent = correntesTrafos[trafoKey].iansi.toFixed(2) + ' A';
            }

            // Preencher campo i-ansi-0x
            const iAnsiId = i < 10 ? `i-ansi-0${i}` : `i-ansi-${i}`;
            const iAnsiEl = document.getElementById(iAnsiId);
            if (iAnsiEl) {
                iAnsiEl.textContent = correntesTrafos[trafoKey].iansi.toFixed(2) + ' A';
            }

            // Preencher campo resultado-ansi-tr0x-neutro considerando iansi
            const resultadoAnsiTrNeutroId = i < 10 ? `resultado-ansi-tr0${i}-neutro` : `resultado-ansi-tr${i}-neutro`;
            const resultadoAnsiTrNeutroEl = document.getElementById(resultadoAnsiTrNeutroId);
            if (resultadoAnsiTrNeutroEl) {
                resultadoAnsiTrNeutroEl.textContent = correntesTrafos[trafoKey].iansi.toFixed(2) + ' A';
            }

            // Preencher campo i-nansi-0x
            const iNansiId = i < 10 ? `i-nansi-0${i}` : `i-nansi-${i}`;
            const iNansiEl = document.getElementById(iNansiId);
            if (iNansiEl && correntesTrafos[trafoKey].inansi !== undefined) {
                iNansiEl.textContent = correntesTrafos[trafoKey].inansi.toFixed(2) + ' A';
            }

            // Preencher campo resultado-neutro-tr0x considerando importação de inansi
            const resultadoNeutroTrId = i < 10 ? `resultado-neutro-tr0${i}` : `resultado-neutro-tr${i}`;
            const resultadoNeutroTrEl = document.getElementById(resultadoNeutroTrId);
            if (resultadoNeutroTrEl && correntesTrafos[trafoKey].inansi !== undefined) {
                resultadoNeutroTrEl.textContent = correntesTrafos[trafoKey].inansi.toFixed(2) + ' A';
            }

            // Preencher campo i-mag-0x
            const iMagId = i < 10 ? `i-mag-0${i}` : `i-mag-${i}`;
            const iMagEl = document.getElementById(iMagId);
            if (iMagEl && correntesTrafos[trafoKey].imagindividual !== undefined) {
                iMagEl.textContent = correntesTrafos[trafoKey].imagindividual.toFixed(2) + ' A';
            }

        }
    }


    // ----------------------INICIO CALCULO DE IMAG TOTAL DOS TRAFOS-----------------------------
    // Preencher campos de imag 
    const inMaiorTrafo = parseFloat(localStorage.getItem('maiortrafoinSelecionada'));
    const inMaiorTrafoEl = document.getElementById('in-maior-trafo');
    if (inMaiorTrafoEl && !isNaN(inMaiorTrafo)) {
        inMaiorTrafoEl.textContent = "(" + inMaiorTrafo.toFixed(2);
    }

    // Preencher campo de maior fator IMIN
    const maiorTrafoImin = parseFloat(localStorage.getItem('maiortrafoiminSelecionada'));
    const maiorTrafoIminEl = document.getElementById('M-maior-trafo');
    if (maiorTrafoIminEl && !isNaN(maiorTrafoImin)) {
        maiorTrafoIminEl.textContent = ' x ' + maiorTrafoImin.toFixed(2) + ")";
    }

    // Preencher campo de maior trafo quando a quantidade do maior trafo for maior que 1
    const maiorTrafoQtde = parseFloat(localStorage.getItem('maiortrafoqtdeSelecionada'));
    const inTrafo2El = document.getElementById('in-trafo-1');
    if (inTrafo2El) {
        if (!isNaN(maiorTrafoQtde) && maiorTrafoQtde > 1) {
            const maiorTrafoIn = parseFloat(localStorage.getItem('maiortrafoinSelecionada'));
            inTrafo2El.textContent = !isNaN(maiorTrafoIn) ? `+ ( ${maiorTrafoIn.toFixed(2)} × ${maiorTrafoQtde-1} )` : '';
            
            // inTrafo2El.textContent = !isNaN(maiorTrafoIn) ? maiorTrafoIn.toFixed(2) + ' A' : '';
            inTrafo2El.style.display = '';
        } else {
            inTrafo2El.style.display = 'none';
        }
    }

    // Preencher campo de corrente do trafo 2
    
    // Preencher in-trafo-2 até in-trafo-10 em ordem decrescente de corrente, desconsiderando o maior corrente intrafoindividual
    const correntesTrafos = JSON.parse(localStorage.getItem('correntestrafosJSON')) || {};
    // Monta array de correntes (trafo2 a trafo10) ignorando o maior corrente
    let trafosArray = [];
    for (let i = 1; i <= 10; i++) {
        const trafoKey = `trafo${i}`;
        const trafoSalvo = JSON.parse(localStorage.getItem(`${trafoKey}JSON`)) || {};
        const qtdeTrafo = parseFloat(trafoSalvo.qtde) || 0;
        if (correntesTrafos[trafoKey] && correntesTrafos[trafoKey].intrafoindividual !== undefined) {
            trafosArray.push({ i, corrente: correntesTrafos[trafoKey].intrafoindividual, qtde: qtdeTrafo });
        }
    }
    // Descobre o maior corrente entre trafo2 a trafo10
    const maiorCorrente = trafosArray.length > 0 ? Math.max(...trafosArray.map(t => t.corrente)) : null;
    // Remove o maior corrente
    trafosArray = trafosArray.filter(t => t.corrente !== maiorCorrente);
    // Ordena em ordem decrescente
    trafosArray.sort((a, b) => b.corrente - a.corrente);

    // Preenche os campos in-trafo-2 até in-trafo-10 conforme ordem decrescente (sem o maior)
    for (let idx = 0; idx < trafosArray.length; idx++) {
        const inTrafoEl = document.getElementById(`in-trafo-${idx + 2}`);
        if (inTrafoEl) {
            // Se qtde > 1, mostra x qtde, senão só corrente
            if (trafosArray[idx].qtde > 0) {
                inTrafoEl.textContent = `+ ( ${trafosArray[idx].corrente.toFixed(2)} × ${trafosArray[idx].qtde} )`;
            } else {
                inTrafoEl.textContent = `+ ( ${trafosArray[idx].corrente.toFixed(2)} )`;
            }
            inTrafoEl.style.display = '';
        }
    }
    // Oculta os campos restantes se não houver trafo suficiente
    for (let i = trafosArray.length + 1; i <= 10; i++) {
        const inTrafoEl = document.getElementById(`in-trafo-${i}`);
        if (inTrafoEl) {
            inTrafoEl.style.display = 'none';
        }
    }

    // Preencher campo de imag total dos trafos
    const imagTotal = parseFloat(localStorage.getItem('imagtotalSelecionada'));
    const imagTotalEls = document.querySelectorAll('.imag-total-valor');
    imagTotalEls.forEach(el => {
        if (imagTotal !== null && !isNaN(imagTotal)) {
            el.textContent = imagTotal.toFixed(2) + ' A';
        }
    });

    // ---------------FIM DE IMAG DOS TRAFOS -------------------------------------------------

    // ----------------------INICIO CALCULO DE MAGNETIZACAO REAL-----------------------------

    // Carregar corrente de curto no calculo de imag real no HTML
    const curtoSelecionada = localStorage.getItem('curtoSelecionada');
    const inrushCc3fEl = document.getElementById('inrush-cc3f');
    if (inrushCc3fEl && curtoSelecionada !== null) {
        inrushCc3fEl.textContent = curtoSelecionada + ' A';
    }

    // Carregar corrente de inrush no calculo de imag real no HTML
    const inrushInEl = document.getElementById('inrush-in');
    if (inrushInEl && imagTotal !== null && !isNaN(imagTotal)) {
        inrushInEl.textContent = imagTotal.toFixed(2) + ' A';
    }

    // Calcular 1/curtoSelecionada e preencher em divisao-icc com 2 casas decimais
    const divisaoIccEl = document.getElementById('divisao-icc');
    if (divisaoIccEl && curtoSelecionada !== null && !isNaN(curtoSelecionada) && parseFloat(curtoSelecionada) !== 0) {
        divisaoIccEl.textContent = (1 / parseFloat(curtoSelecionada)).toFixed(6);
    }

    // Calcular 1/imagTotal e preencher em divisao-inrush com 2 casas decimais
    const divisaoInrushEl = document.getElementById('divisao-inrush');
    if (divisaoInrushEl && imagTotal !== null && !isNaN(imagTotal) && imagTotal !== 0) {
        divisaoInrushEl.textContent = (1 / imagTotal).toFixed(6);
    }

    
    // Calcular a soma das divisões e preencher em resultado-divisao
    const resultadoDivisaoEl = document.getElementById('resultado-divisao');
    if (
        resultadoDivisaoEl &&
        divisaoIccEl &&
        divisaoInrushEl &&
        !isNaN(parseFloat(divisaoIccEl.textContent)) &&
        !isNaN(parseFloat(divisaoInrushEl.textContent))
    ) {
        const soma = parseFloat(divisaoIccEl.textContent) + parseFloat(divisaoInrushEl.textContent);
        resultadoDivisaoEl.textContent = soma.toFixed(6);
    }

    // Calcular o resultado final da magnetização real
    // Calcular o resultado final da magnetização real
    const resultadoInrushRealEl = document.getElementById('resultado-inrush-real');
    if (
        resultadoInrushRealEl &&
        divisaoIccEl &&
        divisaoInrushEl &&
        !isNaN(parseFloat(divisaoIccEl.textContent)) &&
        !isNaN(parseFloat(divisaoInrushEl.textContent))
    ) {
        const soma = parseFloat(divisaoIccEl.textContent) + parseFloat(divisaoInrushEl.textContent);
        if (soma !== 0) {
            resultadoInrushRealEl.textContent = (1 / soma).toFixed(2) + ' A';
        } else {
            resultadoInrushRealEl.textContent = '';
        }
    }

    // -----------------------FIM DE MAGNETIZACAO REAL--------------------------------

    // ---------------INICIO DIMENSIONAMENTO DE TC------------------------------------

    // Carregar corrente de curto no calculo de TC no HTML  
    const curtoSelecionadaTC = localStorage.getItem('curtoSelecionada');
    const curtoTCEl = document.getElementById('curtoTC');
    if (curtoTCEl && curtoSelecionadaTC !== null) {
        curtoTCEl.textContent = curtoSelecionadaTC + ' A';
    }

    // Calcular curtoSelecionadaTC / 50 e preencher em tc-saturacao-primario
    const tcSaturacaoPrimarioEl = document.getElementById('tc-saturacao-primario');
    if (tcSaturacaoPrimarioEl && curtoSelecionadaTC !== null && !isNaN(curtoSelecionadaTC)) {
        tcSaturacaoPrimarioEl.textContent = (parseFloat(curtoSelecionadaTC) / 50).toFixed(2);
    }







    // -----------------FIM DIMENSIONAMENTO DE TC-------------------------------------------











    //LEMBRAR DE INCLUIR LOGICA PARA APARECER E REMOVER OS CALCULOS QUANDO NÃO HOUVER VALOR



















}














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

function imprimirPaginaEmPDF() {
    window.print();
}



// Adicionar estilos de impressão apenas se não existirem
if (!document.querySelector('style[media="print"]')) {
    const estiloImpressao = document.createElement("style");
    estiloImpressao.media = "print";
    estiloImpressao.textContent = `
@page {
    size: A4 portrait;
    margin: 20mm;
}
body {
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
}
button {
    display: none !important;
}
table {
    page-break-inside: avoid !important;
    break-inside: avoid !important;
}
tr, td, th {
    page-break-inside: avoid !important;
    break-inside: avoid !important;
}
`;
    document.head.appendChild(estiloImpressao);
}



function atualizarFormula() {
    const campos = ["beta", "imag", "in", "alpha", "k", "dt"];
    const valores = campos.reduce((obj, id) => {
        const element = document.getElementById(id);
        obj[id] = element ? element.textContent : '';
        // console.log(`${id}:`, obj[id]); // Debug
        return obj;
    }, {});

    // console.log('Valores:', valores); // Debug
    const latex = `t = \\left( \\frac{${valores.beta}}{\\left( \\frac{${valores.imag}}{${valores.in}} \\right)^{${valores.alpha}}} - ${valores.k} \\right) \\times ${valores.dt}`;
    const formulaEl = document.getElementById("formula");

    if (formulaEl && typeof MathJax !== 'undefined') {
        formulaEl.innerHTML = `\\(${latex}\\)`;
        MathJax.typesetPromise([formulaEl]).catch(err => console.log('Erro MathJax:', err));
    } else {
        // console.log('MathJax não disponível ou elemento formula não encontrado');
    }
}

function atualizarFormula2() {
    const campos2 = ["beta2", "imag2", "in2", "alpha2", "k2", "t2"];
    const valores = campos2.reduce((obj, id) => {
        const element = document.getElementById(id);
        obj[id] = element ? element.textContent : '';
        // console.log(`${id}:`, obj[id]); // Debug
        return obj;
    }, {});

    // console.log('Valores2:', valores); // Debug
    // Corrigir para usar as variáveis com "2"
    const latex2 = `DT = \\left( \\frac{\\left( \\frac{${valores.imag2}}{${valores.in2}} \\right)^{${valores.alpha2}}}{${valores.beta2}} - ${valores.k2} \\right) \\times ${valores.t2}`;
    const formulaEl2 = document.getElementById("formula2");

    if (formulaEl2 && typeof MathJax !== 'undefined') {
        formulaEl2.innerHTML = `\\(${latex2}\\)`;
        MathJax.typesetPromise([formulaEl2]).catch(err => console.log('Erro MathJax:', err));
    } else {
        // console.log('MathJax não disponível ou elemento formula2 não encontrado');
    }
}




// Função para carregar script dinamicamente
function carregarScript(src, callback) {
    const script = document.createElement('script');
    script.src = src;
    script.onload = callback;
    script.onerror = () => console.error('Erro ao carregar script:', src);
    document.head.appendChild(script);
}

// Carregar o script do gráfico após o DOM estar pronto
document.addEventListener('DOMContentLoaded', function () {


    // Carregar o script do gráfico primeiro
    carregarScript('grafico5051consumo.js', function () {


        // Aguardar um pouco e então carregar as fórmulas
        setTimeout(() => {
            verificarMathJax();
        }, 1000);
    });

    // Configurar botão se existir
    const botaoParametro = document.getElementById("botaoestudoshtml");
    if (botaoParametro) {
        botaoParametro.style.backgroundColor = "#cf0808";
    }
});

function verificarMathJax() {
    if (typeof MathJax !== 'undefined' && MathJax.typesetPromise) {

        atualizarFormula();
        atualizarFormula2();
    } else {

        setTimeout(verificarMathJax, 500);
    }
}


// ...existing code...

// Função para carregar dados do localStorage e exibir na div tabelareles
function carregarTabelaReles() {

    const tabelaRelesDiv = document.getElementById('tabelareles');

    // Recupera os dados do localStorage
    const dadosArmazenados = localStorage.getItem('Tabelasalva');

    // console.log('Dados encontrados no localStorage:', dadosArmazenados); //Debug adicional

    if (dadosArmazenados) {
        // Define o conteúdo HTML da div com os dados recuperados
        tabelaRelesDiv.innerHTML = dadosArmazenados;
    } else {
        // console.warn('Nenhum dado encontrado no localStorage para Tabelasalva');
        tabelaRelesDiv.innerHTML = '<p>Nenhum dado encontrado.</p>';
    }


}


function adicionarEstilosTabelaParametrizacaoReles() {
    if (!document.getElementById('estilo-tabela-parametrizacao-reles')) {
        const style = document.createElement('style');
        style.id = 'estilo-tabela-parametrizacao-reles';
        style.textContent = `
.tabelaparametrizacaoreles {
    font-family: 'Times New Roman', Times, serif;
    font-size: 1.05em;
    background: #fff; /* fundo branco */
    color: #000;      /* letras pretas */
    border: 2px solid #34335c;
    border-radius: 10px;
    padding: 20px 30px;
    margin: 40px auto;
    width: 210mm;
    max-width: 100vw;
    box-shadow: 0 2px 10px rgba(52, 51, 92, 0.10);
    text-align: left;
}

.tabelaparametrizacaoreles table {
    border-collapse: collapse;
    width: 100%;
    background: #fff;
    color: #000; /* letras pretas */
}

.tabelaparametrizacaoreles th,
.tabelaparametrizacaoreles td {
    border: 1px solid #34335c;
    padding: 8px;
    text-align: left;
    font-size: 1em;
    color: #000; /* letras pretas */
}
        `;
        document.head.appendChild(style);
    }
}

// Chame a função ao carregar a página
document.addEventListener('DOMContentLoaded', adicionarEstilosTabelaParametrizacaoReles);

function incluirimagensrele(){

       const imageInput = document.getElementById("imageInput");
    const gallery = document.getElementById("gallery");
    const clearButton = document.getElementById("clearButton");

    // 🖼️ Carrega imagens salvas do localStorage
    const savedImages = JSON.parse(localStorage.getItem("imageGallery")) || [];
    savedImages.forEach(dataURL => {
      const img = document.createElement("img");
      img.src = dataURL;
      gallery.appendChild(img);
    });

    // 📤 Salva novas imagens quando o usuário envia
    imageInput.addEventListener("change", () => {
      const files = Array.from(imageInput.files);
      files.forEach(file => {
        const reader = new FileReader();
        reader.onload = e => {
          const dataURL = e.target.result;
          const img = document.createElement("img");
          img.src = dataURL;
          gallery.appendChild(img);

          savedImages.push(dataURL);
          localStorage.setItem("imageGallery", JSON.stringify(savedImages));
        };
        reader.readAsDataURL(file);
      });
    });

    // 🧹 Limpa galeria e localStorage
    clearButton.addEventListener("click", () => {
      localStorage.removeItem("imageGallery");
      gallery.innerHTML = "";
    });

}