






function inicializarNavegacaoPorDataTarget() {
    const botoesNavegacao = document.querySelectorAll('button[data-nav-target]');
    botoesNavegacao.forEach((botao) => {
        if (botao.dataset.navBound === 'true') {
            return;
        }

        botao.addEventListener('click', () => {
            const target = botao.getAttribute('data-nav-target');
            if (target) {
                window.location.href = target;
            }
        });

        botao.dataset.navBound = 'true';
    });
}

function obterConteudoEmailContainerParaCopia() {
    const emailContainer = document.getElementById('email-container');
    if (!emailContainer) {
        return { html: '', texto: '' };
    }

    const clone = emailContainer.cloneNode(true);
    const painelAcoes = clone.querySelector('.action-panel');
    if (painelAcoes) {
        painelAcoes.remove();
    }

    const sandbox = document.createElement('div');
    sandbox.style.position = 'fixed';
    sandbox.style.left = '-99999px';
    sandbox.style.top = '0';
    sandbox.style.pointerEvents = 'none';
    sandbox.style.opacity = '0';
    sandbox.appendChild(clone);
    document.body.appendChild(sandbox);

    const propriedadesImportantes = [
        'font-family', 'font-size', 'font-weight', 'font-style', 'line-height',
        'color', 'background-color', 'text-align', 'text-decoration', 'letter-spacing',
        'margin-top', 'margin-right', 'margin-bottom', 'margin-left',
        'padding-top', 'padding-right', 'padding-bottom', 'padding-left',
        'border-top', 'border-right', 'border-bottom', 'border-left',
        'border-radius', 'display', 'list-style-type', 'white-space'
    ];

    const todosElementos = [clone, ...clone.querySelectorAll('*')];
    todosElementos.forEach((elemento) => {
        const estilos = window.getComputedStyle(elemento);
        const estiloInline = propriedadesImportantes
            .map((prop) => `${prop}: ${estilos.getPropertyValue(prop)};`)
            .join(' ');
        elemento.setAttribute('style', `${elemento.getAttribute('style') || ''}; ${estiloInline}`);
    });

    const avisoImportante = clone.querySelector('.analise-aviso-importante');
    if (avisoImportante) {
        avisoImportante.style.color = '#ff0000';
        avisoImportante.style.fontWeight = '700';
    }

    const avisoNegrito = clone.querySelector('.analise-aviso-negrito');
    if (avisoNegrito) {
        avisoNegrito.style.color = '#000000';
        avisoNegrito.style.fontWeight = '700';
    }

    const htmlFragmento = clone.outerHTML;
    const html = `<!DOCTYPE html><html><head><meta charset="utf-8"></head><body>${htmlFragmento}</body></html>`;
    const texto = (clone.innerText || '').trim();

    document.body.removeChild(sandbox);

    return { html, texto };
}

async function copiarTextoEmailContainer() {
    const { html, texto } = obterConteudoEmailContainerParaCopia();
    const textoParaCopiar = texto;
    if (!textoParaCopiar) {
        window.alert('Não foi possível localizar conteúdo para copiar.');
        return;
    }

    try {
        if (navigator.clipboard && window.ClipboardItem) {
            const item = new ClipboardItem({
                'text/html': new Blob([html], { type: 'text/html' }),
                'text/plain': new Blob([textoParaCopiar], { type: 'text/plain' })
            });
            await navigator.clipboard.write([item]);
        } else if (navigator.clipboard && navigator.clipboard.writeText) {
            await navigator.clipboard.writeText(textoParaCopiar);
        } else {
            throw new Error('Clipboard API indisponível');
        }
        window.alert('Texto copiado com sucesso! Agora você pode colar no Word.');
        return;
    } catch (erroClipboard) {
    }

    const areaTemporaria = document.createElement('div');
    areaTemporaria.setAttribute('contenteditable', 'true');
    areaTemporaria.innerHTML = html;
    areaTemporaria.style.position = 'fixed';
    areaTemporaria.style.opacity = '0';
    areaTemporaria.style.pointerEvents = 'none';
    areaTemporaria.style.left = '-99999px';
    document.body.appendChild(areaTemporaria);

    const selecao = window.getSelection();
    const range = document.createRange();
    range.selectNodeContents(areaTemporaria);
    selecao.removeAllRanges();
    selecao.addRange(range);

    const listenerCopia = (event) => {
        event.preventDefault();
        if (event.clipboardData) {
            event.clipboardData.setData('text/html', html);
            event.clipboardData.setData('text/plain', textoParaCopiar);
        }
    };

    document.addEventListener('copy', listenerCopia);
    const copiado = document.execCommand('copy');
    document.removeEventListener('copy', listenerCopia);
    document.body.removeChild(areaTemporaria);
    selecao.removeAllRanges();

    if (copiado) {
        window.alert('Texto copiado com sucesso! Agora você pode colar no Word.');
    } else {
        window.alert('Não foi possível copiar automaticamente.');
    }
}

function montarTextoNotasParaCopia() {
    const tensao = (document.getElementById('tensao-atendimento')?.innerText || '').trim();
    const demanda = (document.getElementById('demanda-consumo')?.innerText || '').trim();
    const rotuloPotencia = (document.getElementById('rotulo-potencia-gd')?.innerText || 'POTÊNCIA GD:').trim();
    const potenciaGeracao = (document.getElementById('potencia-GD')?.innerText || '').trim();
    const linhaInjecaoVisivel = document.getElementById('campoInjecaoZero')?.style.display !== 'none';
    const potenciaInjecao = (document.getElementById('potencia-injecao')?.innerText || '0 KW (GRID ZERO)').trim();
    const linhaGeradorDiesel = document.getElementById('campogeradordiesel');
    const potenciaGeradorDiesel = (document.getElementById('potencia-gerador')?.innerText || '').trim();
    const nota3 = (document.getElementById('nsedata')?.innerText || '').trim();
    const nota4 = (document.getElementById('nota4')?.innerText || '').trim();
    const nota5 = (document.getElementById('nota5')?.innerText || '').trim();
    const observacaoInput = document.getElementById('observacao-nota6');
    const observacao = (observacaoInput?.value || '').trim();

    const linhas = [
        'NOTA 1:',
        `TENSÃO DE ATENDIMENTO:\t${tensao}`,
        `DEMANDA DE CONSUMO:\t${demanda}`
    ];

    if (potenciaGeracao) {
        linhas.push(`${rotuloPotencia}\t${potenciaGeracao}`);
    }

    if (linhaInjecaoVisivel) {
        linhas.push(`POTÊNCIA DE INJEÇÃO:\t${potenciaInjecao}`);
    }

    if (linhaGeradorDiesel && linhaGeradorDiesel.style.display !== 'none' && potenciaGeradorDiesel) {
        linhas.push(`POTÊNCIA GERADOR A DIESEL:\t${potenciaGeradorDiesel}`);
    }

    linhas.push(
        'NOTA 2:\tPROJETO EM CONFORMIDADE COM NORMAS CEMIG;',
        `NOTA 3:\t${nota3}`,
        `NOTA 4:\t${nota4}`,
        `NOTA 5:\t${nota5}`,
        'NOTA 6:\tCOPIA DO CLIENTE FOI ANEXADA NO APR WEB.'
    );

    if (observacao) {
        linhas.push('OBSERVAÇÃO:', observacao);
    }

    return linhas.join('\n');
}

async function copiarNotasComObservacao() {
    const texto = montarTextoNotasParaCopia();
    if (!texto.trim()) {
        window.alert('Não foi possível montar o texto das notas para cópia.');
        return;
    }

    try {
        await navigator.clipboard.writeText(texto);
        window.alert('Notas copiadas com sucesso!');
        return;
    } catch {
        const areaTemporaria = document.createElement('textarea');
        areaTemporaria.value = texto;
        areaTemporaria.style.position = 'fixed';
        areaTemporaria.style.left = '-99999px';
        document.body.appendChild(areaTemporaria);
        areaTemporaria.select();
        const copiado = document.execCommand('copy');
        document.body.removeChild(areaTemporaria);

        if (copiado) {
            window.alert('Notas copiadas com sucesso!');
        } else {
            window.alert('Não foi possível copiar automaticamente.');
        }
    }
}

function montarTextoOperacaoInAteTinst() {
    const inOperacao = (document.getElementById('in-operacao')?.innerText || '').trim();
    const alimentadorOperacao = (document.getElementById('alimentador-operacao')?.innerText || '').trim();
    const tensaoOperacao = (document.getElementById('tensao-operacao')?.innerText || '').trim();
    const ip51Operacao = (document.getElementById('ip51-operacao')?.innerText || '').trim();
    const curvaOperacao = (document.getElementById('curva-operacao')?.innerText || '').trim();
    const dialOperacao = (document.getElementById('dial-operacao')?.innerText || '').trim();
    const iInst50Operacao = (document.getElementById('iinst50-operacao')?.innerText || '').trim();
    const tInstOperacao = (document.getElementById('tinst-operacao')?.innerText || '').trim();

    return [
        `IN:\t${inOperacao}`,
        `Alimentador:\t${alimentadorOperacao}`,
        `Tensão:\t${tensaoOperacao}`,
        `Ip 51:\t${ip51Operacao}`,
        `Curva:\t${curvaOperacao}`,
        `Dial:\t${dialOperacao}`,
        `I inst 50:\t${iInst50Operacao}`,
        `T inst:\t${tInstOperacao}`
    ].join('\n');
}

async function copiarOperacaoInAteTinst() {
    const texto = montarTextoOperacaoInAteTinst();
    if (!texto.trim()) {
        window.alert('Não foi possível montar o texto da nota de operação para cópia.');
        return;
    }

    try {
        await navigator.clipboard.writeText(texto);
        window.alert('Trecho de IN até T inst copiado com sucesso!');
        return;
    } catch {
        const areaTemporaria = document.createElement('textarea');
        areaTemporaria.value = texto;
        areaTemporaria.style.position = 'fixed';
        areaTemporaria.style.left = '-99999px';
        document.body.appendChild(areaTemporaria);
        areaTemporaria.select();
        const copiado = document.execCommand('copy');
        document.body.removeChild(areaTemporaria);

        if (copiado) {
            window.alert('Trecho de IN até T inst copiado com sucesso!');
        } else {
            window.alert('Não foi possível copiar automaticamente.');
        }
    }
}

function obterTextoCelulaTabelaAtalho(celula) {
    if (!celula) {
        return '';
    }

    const input = celula.querySelector('input, textarea, select');
    if (input) {
        return (input.value || '').trim();
    }

    return (celula.innerText || '').trim();
}

function montarTextoUltimasLinhasTabelaAtalho() {
    const tabelaAtalho = document.getElementById('tabelaatalho');
    if (!tabelaAtalho) {
        return '';
    }

    const linhas = Array.from(tabelaAtalho.querySelectorAll('tbody tr'));
    if (linhas.length === 0) {
        return '';
    }

    const ultimasLinhas = linhas.slice(-2);
    const linhasTexto = ultimasLinhas.map((linha) => {
        const colunas = Array.from(linha.querySelectorAll('td'));
        return colunas.map((celula) => obterTextoCelulaTabelaAtalho(celula)).join('\t');
    });

    return linhasTexto.join('\n');
}

async function copiarUltimasLinhasTabelaAtalho() {
    const texto = montarTextoUltimasLinhasTabelaAtalho();
    if (!texto.trim()) {
        window.alert('Não foi possível localizar linhas para copiar.');
        return;
    }

    try {
        await navigator.clipboard.writeText(texto);
        window.alert('Linhas copiadas com sucesso!');
        return;
    } catch {
        const areaTemporaria = document.createElement('textarea');
        areaTemporaria.value = texto;
        areaTemporaria.style.position = 'fixed';
        areaTemporaria.style.left = '-99999px';
        document.body.appendChild(areaTemporaria);
        areaTemporaria.select();
        const copiado = document.execCommand('copy');
        document.body.removeChild(areaTemporaria);

        if (copiado) {
            window.alert('Linhas copiadas com sucesso!');
        } else {
            window.alert('Não foi possível copiar automaticamente.');
        }
    }
}

function converterNumeroEntrada(valor) {
    if (valor === null || valor === undefined) {
        return NaN;
    }

    const texto = String(valor).trim();
    if (!texto) {
        return NaN;
    }

    return parseFloat(texto.replace(/\./g, '').replace(',', '.'));
}

function formatarNumeroParaDisplay(valor, casas = 4) {
    if (!isFinite(valor)) {
        return '';
    }

    return Number(valor).toLocaleString('pt-BR', {
        minimumFractionDigits: casas,
        maximumFractionDigits: casas
    });
}

function formatarNumeroParaEquacao(valor, casas = 4) {
    if (!isFinite(valor)) {
        return '?';
    }

    return Number(valor).toFixed(casas);
}

const estadoRenderEquacaoMathJax = {};

function renderizarEquacaoMathJax(idElemento, expressaoTex) {
    const elemento = document.getElementById(idElemento);
    if (!elemento) {
        return;
    }

    const tokenRender = (estadoRenderEquacaoMathJax[idElemento] || 0) + 1;
    estadoRenderEquacaoMathJax[idElemento] = tokenRender;

    const expressao = String(expressaoTex || '');
    const fallbackLatex = `\\[${expressao}\\]`;

    if (!window.MathJax) {
        elemento.innerHTML = fallbackLatex;
        return;
    }

    if (typeof window.MathJax.tex2svgPromise === 'function') {
        window.MathJax.tex2svgPromise(expressao, { display: true })
            .then((node) => {
                if (estadoRenderEquacaoMathJax[idElemento] !== tokenRender) {
                    return;
                }

                elemento.innerHTML = '';
                const svg = node && typeof node.querySelector === 'function'
                    ? node.querySelector('svg')
                    : null;

                if (svg) {
                    const svgClone = svg.cloneNode(true);
                    svgClone.style.maxWidth = '76%';
                    svgClone.style.width = '76%';
                    svgClone.style.height = 'auto';
                    svgClone.style.display = 'block';
                    svgClone.style.margin = '8px auto';
                    elemento.style.textAlign = 'center';
                    elemento.appendChild(svgClone);
                } else if (node) {
                    elemento.appendChild(node.cloneNode(true));
                }
            })
            .catch(() => {
                if (estadoRenderEquacaoMathJax[idElemento] !== tokenRender) {
                    return;
                }
                elemento.innerHTML = fallbackLatex;
                if (typeof window.MathJax.typesetPromise === 'function') {
                    window.MathJax.typesetPromise([elemento]).catch(() => { });
                }
            });
        return;
    }

    elemento.innerHTML = fallbackLatex;

    if (typeof window.MathJax.typesetClear === 'function') {
        window.MathJax.typesetClear([elemento]);
    }

    if (window.MathJax && typeof window.MathJax.typesetPromise === 'function') {
        window.MathJax.typesetPromise([elemento]).catch(() => { });
    }
}

function atualizarEquacaoDialPorTempo(tempo, beta, alfa, iInst, ip, k, dial) {
    const divisao = iInst / ip;
    const exponenciacao = Math.pow(divisao, alfa);
    const subtracao = exponenciacao - k;
    const fracaoFinal = subtracao / beta;

    const tex = String.raw`\begin{aligned}
\mathrm{DIAL} &= t\cdot\frac{\left(\frac{I_{inst}}{I_p}\right)^{\alpha}-k}{\beta} \\
\frac{I_{inst}}{I_p} &= \frac{${formatarNumeroParaEquacao(iInst)}}{${formatarNumeroParaEquacao(ip)}} = ${formatarNumeroParaEquacao(divisao)} \\[6pt]
\left(\frac{I_{inst}}{I_p}\right)^{\alpha} &= ${formatarNumeroParaEquacao(divisao)}^{${formatarNumeroParaEquacao(alfa)}} = ${formatarNumeroParaEquacao(exponenciacao)} \\[6pt]
\left(\frac{I_{inst}}{I_p}\right)^{\alpha} - k &= ${formatarNumeroParaEquacao(exponenciacao)} - ${formatarNumeroParaEquacao(k)} = ${formatarNumeroParaEquacao(subtracao)} \\[6pt]
\frac{\left(\frac{I_{inst}}{I_p}\right)^{\alpha}-k}{\beta} &= \frac{${formatarNumeroParaEquacao(subtracao)}}{${formatarNumeroParaEquacao(beta)}} = ${formatarNumeroParaEquacao(fracaoFinal)} \\[6pt]
\mathrm{DIAL} &= ${formatarNumeroParaEquacao(tempo)}\cdot${formatarNumeroParaEquacao(fracaoFinal)} \\[6pt]
\mathrm{DIAL} &= ${formatarNumeroParaEquacao(dial)}
\end{aligned}`;
    renderizarEquacaoMathJax('formulaDialCalcEq', tex);
}

function atualizarEquacaoTempoPorDial(dial, beta, alfa, iInst, ip, k, tempo) {
    const divisao = iInst / ip;
    const exponenciacao = Math.pow(divisao, alfa);
    const subtracao = exponenciacao - k;
    const fracaoTempo = beta / subtracao;

    const tex = String.raw`\begin{aligned}
t &= \mathrm{DIAL}\cdot\frac{\beta}{\left(\frac{I_{inst}}{I_p}\right)^{\alpha}-k} \\
\frac{I_{inst}}{I_p} &= \frac{${formatarNumeroParaEquacao(iInst)}}{${formatarNumeroParaEquacao(ip)}} = ${formatarNumeroParaEquacao(divisao)} \\[6pt]
\left(\frac{I_{inst}}{I_p}\right)^{\alpha} &= ${formatarNumeroParaEquacao(divisao)}^{${formatarNumeroParaEquacao(alfa)}} = ${formatarNumeroParaEquacao(exponenciacao)} \\[6pt]
\left(\frac{I_{inst}}{I_p}\right)^{\alpha} - k &= ${formatarNumeroParaEquacao(exponenciacao)} - ${formatarNumeroParaEquacao(k)} = ${formatarNumeroParaEquacao(subtracao)} \\[6pt]
\frac{\beta}{\left(\frac{I_{inst}}{I_p}\right)^{\alpha}-k} &= \frac{${formatarNumeroParaEquacao(beta)}}{${formatarNumeroParaEquacao(subtracao)}} = ${formatarNumeroParaEquacao(fracaoTempo)} \\[6pt]
t &= ${formatarNumeroParaEquacao(dial)}\cdot${formatarNumeroParaEquacao(fracaoTempo)} \\[6pt]
t &= ${formatarNumeroParaEquacao(tempo)}
\end{aligned}`;
    renderizarEquacaoMathJax('formulaTempoCalcEq', tex);
}

function obterDenominadorDial(beta, alfa, iInst, ip, k) {
    if ([beta, alfa, iInst, ip, k].some((numero) => isNaN(numero))) {
        return { valido: false, mensagem: 'Preencha Beta, Alfa, I inst, Ip e K com valores numéricos válidos.' };
    }

    if (beta === 0 || ip === 0) {
        return { valido: false, mensagem: 'Beta e Ip devem ser diferentes de zero.' };
    }

    const denominador = Math.pow(iInst / ip, alfa) - k;
    if (denominador <= 0) {
        return { valido: false, mensagem: 'Combinação inválida: ((I inst / Ip)^Alfa - K) deve ser maior que zero.' };
    }

    return { valido: true, denominador };
}

function calcularDialPorTempo(exibirAlertas = false) {
    const campoTempo = document.getElementById('testeDialTempoCalc');
    const campoBeta = document.getElementById('testeDialBetaCalc');
    const campoAlfa = document.getElementById('testeDialAlfaCalc');
    const campoIinst = document.getElementById('testeDialIinstCalc');
    const campoIp = document.getElementById('testeDialIpCalc');
    const campoK = document.getElementById('testeDialKCalc');
    const campoResultado = document.getElementById('testeDialResultadoCalc');

    if (!campoTempo || !campoBeta || !campoAlfa || !campoIinst || !campoIp || !campoK || !campoResultado) {
        return;
    }

    const tempo = converterNumeroEntrada(campoTempo.value);
    const beta = converterNumeroEntrada(campoBeta.value);
    const alfa = converterNumeroEntrada(campoAlfa.value);
    const iInst = converterNumeroEntrada(campoIinst.value);
    const ip = converterNumeroEntrada(campoIp.value);
    const k = converterNumeroEntrada(campoK.value);

    const validacao = obterDenominadorDial(beta, alfa, iInst, ip, k);
    if (!validacao.valido) {
        campoResultado.value = '';
        atualizarEquacaoDialPorTempo(tempo, beta, alfa, iInst, ip, k, NaN);
        if (exibirAlertas) {
            window.alert(validacao.mensagem);
        }
        return;
    }

    if (isNaN(tempo) || tempo <= 0) {
        campoResultado.value = '';
        atualizarEquacaoDialPorTempo(tempo, beta, alfa, iInst, ip, k, NaN);
        if (exibirAlertas) {
            window.alert('Informe um Tempo válido para calcular o DIAL.');
        }
        return;
    }

    const dialCalculado = tempo * (validacao.denominador / beta);
    if (!isFinite(dialCalculado) || dialCalculado <= 0) {
        campoResultado.value = '';
        atualizarEquacaoDialPorTempo(tempo, beta, alfa, iInst, ip, k, NaN);
        if (exibirAlertas) {
            window.alert('Não foi possível calcular um DIAL válido com os dados informados.');
        }
        return;
    }

    campoResultado.value = formatarNumeroParaDisplay(dialCalculado, 4);
    atualizarEquacaoDialPorTempo(tempo, beta, alfa, iInst, ip, k, dialCalculado);
}

function calcularTempoPorDial(exibirAlertas = false) {
    const campoDial = document.getElementById('testeTempoDialCalc');
    const campoBeta = document.getElementById('testeTempoBetaCalc');
    const campoAlfa = document.getElementById('testeTempoAlfaCalc');
    const campoIinst = document.getElementById('testeTempoIinstCalc');
    const campoIp = document.getElementById('testeTempoIpCalc');
    const campoK = document.getElementById('testeTempoKCalc');
    const campoResultado = document.getElementById('testeTempoResultadoCalc');

    if (!campoDial || !campoBeta || !campoAlfa || !campoIinst || !campoIp || !campoK || !campoResultado) {
        return;
    }

    const dial = converterNumeroEntrada(campoDial.value);
    const beta = converterNumeroEntrada(campoBeta.value);
    const alfa = converterNumeroEntrada(campoAlfa.value);
    const iInst = converterNumeroEntrada(campoIinst.value);
    const ip = converterNumeroEntrada(campoIp.value);
    const k = converterNumeroEntrada(campoK.value);

    const validacao = obterDenominadorDial(beta, alfa, iInst, ip, k);
    if (!validacao.valido) {
        campoResultado.value = '';
        atualizarEquacaoTempoPorDial(dial, beta, alfa, iInst, ip, k, NaN);
        if (exibirAlertas) {
            window.alert(validacao.mensagem);
        }
        return;
    }

    if (isNaN(dial) || dial <= 0) {
        campoResultado.value = '';
        atualizarEquacaoTempoPorDial(dial, beta, alfa, iInst, ip, k, NaN);
        if (exibirAlertas) {
            window.alert('Informe um DIAL válido para calcular o Tempo.');
        }
        return;
    }

    const tempoCalculado = dial * (beta / validacao.denominador);
    if (!isFinite(tempoCalculado) || tempoCalculado <= 0) {
        campoResultado.value = '';
        atualizarEquacaoTempoPorDial(dial, beta, alfa, iInst, ip, k, NaN);
        if (exibirAlertas) {
            window.alert('Não foi possível calcular um Tempo válido com os dados informados.');
        }
        return;
    }

    campoResultado.value = formatarNumeroParaDisplay(tempoCalculado, 4);
    atualizarEquacaoTempoPorDial(dial, beta, alfa, iInst, ip, k, tempoCalculado);
}

function configurarTesteDial() {
    const btnCalcularDial = document.getElementById('btnCalcularDialTeste');
    if (btnCalcularDial && btnCalcularDial.dataset.bound !== 'true') {
        btnCalcularDial.addEventListener('click', function () {
            calcularDialPorTempo(true);
        });
        btnCalcularDial.dataset.bound = 'true';
    }

    const btnCalcularTempo = document.getElementById('btnCalcularTempoTeste');
    if (btnCalcularTempo && btnCalcularTempo.dataset.bound !== 'true') {
        btnCalcularTempo.addEventListener('click', function () {
            calcularTempoPorDial(true);
        });
        btnCalcularTempo.dataset.bound = 'true';
    }

    [
        'testeDialTempoCalc',
        'testeDialBetaCalc',
        'testeDialAlfaCalc',
        'testeDialIinstCalc',
        'testeDialIpCalc',
        'testeDialKCalc'
    ].forEach((idCampo) => {
        const campo = document.getElementById(idCampo);
        if (!campo || campo.dataset.bound === 'true') {
            return;
        }

        campo.addEventListener('input', function () {
            calcularDialPorTempo(false);
        });
        campo.dataset.bound = 'true';
    });

    [
        'testeTempoDialCalc',
        'testeTempoBetaCalc',
        'testeTempoAlfaCalc',
        'testeTempoIinstCalc',
        'testeTempoIpCalc',
        'testeTempoKCalc'
    ].forEach((idCampo) => {
        const campo = document.getElementById(idCampo);
        if (!campo || campo.dataset.bound === 'true') {
            return;
        }

        campo.addEventListener('input', function () {
            calcularTempoPorDial(false);
        });
        campo.dataset.bound = 'true';
    });

    atualizarEquacaoDialPorTempo(NaN, NaN, NaN, NaN, NaN, NaN, NaN);
    atualizarEquacaoTempoPorDial(NaN, NaN, NaN, NaN, NaN, NaN, NaN);
}

function copiarTextoSimplesComFallback(texto, mensagemSucesso) {
    if (!texto || !texto.trim()) {
        window.alert('Não foi possível localizar conteúdo para copiar.');
        return;
    }

    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(texto)
            .then(() => {
                window.alert(mensagemSucesso);
            })
            .catch(() => {
                const areaTemporaria = document.createElement('textarea');
                areaTemporaria.value = texto;
                areaTemporaria.style.position = 'fixed';
                areaTemporaria.style.left = '-99999px';
                document.body.appendChild(areaTemporaria);
                areaTemporaria.select();
                const copiado = document.execCommand('copy');
                document.body.removeChild(areaTemporaria);

                if (copiado) {
                    window.alert(mensagemSucesso);
                } else {
                    window.alert('Não foi possível copiar automaticamente.');
                }
            });
        return;
    }

    const areaTemporaria = document.createElement('textarea');
    areaTemporaria.value = texto;
    areaTemporaria.style.position = 'fixed';
    areaTemporaria.style.left = '-99999px';
    document.body.appendChild(areaTemporaria);
    areaTemporaria.select();
    const copiado = document.execCommand('copy');
    document.body.removeChild(areaTemporaria);

    if (copiado) {
        window.alert(mensagemSucesso);
    } else {
        window.alert('Não foi possível copiar automaticamente.');
    }
}

function obterBlobDoCanvas(canvas, tipo, qualidade) {
    return new Promise((resolve) => {
        canvas.toBlob((blob) => {
            resolve(blob || null);
        }, tipo, qualidade);
    });
}

function baixarCanvasComoJpg(canvas, nomeArquivoBase) {
    const link = document.createElement('a');
    link.href = canvas.toDataURL('image/jpeg', 0.95);
    link.download = `${nomeArquivoBase}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

function obterDadosImagemDial() {
    const tempo = (document.getElementById('testeDialTempoCalc')?.value || '').trim();
    const beta = (document.getElementById('testeDialBetaCalc')?.value || '').trim();
    const alfa = (document.getElementById('testeDialAlfaCalc')?.value || '').trim();
    const iinst = (document.getElementById('testeDialIinstCalc')?.value || '').trim();
    const ip = (document.getElementById('testeDialIpCalc')?.value || '').trim();
    const k = (document.getElementById('testeDialKCalc')?.value || '').trim();
    const resultadoDial = (document.getElementById('testeDialResultadoCalc')?.value || '').trim();

    return {
        titulo: 'PARAMETROS PARA O CALCULO DO DIAL',
        parametros: [
            ['Tempo (s)', tempo],
            ['Beta', beta],
            ['Alfa', alfa],
            ['I inst (A)', iinst],
            ['Ip (A)', ip],
            ['K', k],
            ['DIAL de ajuste', resultadoDial]
        ],
        formula: [
            'DIAL = t * (((Iinst / Ip)^alfa - K) / beta)',
            `DIAL = ${tempo || '?'} * (((${iinst || '?'} / ${ip || '?'})^${alfa || '?'} - ${k || '?'}) / ${beta || '?'})`,
            `DIAL = ${resultadoDial || '?'}`
        ]
    };
}

function obterDadosImagemTempo() {
    const dial = (document.getElementById('testeTempoDialCalc')?.value || '').trim();
    const beta = (document.getElementById('testeTempoBetaCalc')?.value || '').trim();
    const alfa = (document.getElementById('testeTempoAlfaCalc')?.value || '').trim();
    const iinst = (document.getElementById('testeTempoIinstCalc')?.value || '').trim();
    const ip = (document.getElementById('testeTempoIpCalc')?.value || '').trim();
    const k = (document.getElementById('testeTempoKCalc')?.value || '').trim();
    const resultadoTempo = (document.getElementById('testeTempoResultadoCalc')?.value || '').trim();

    return {
        titulo: 'PARAMETROS PARA O CALCULO DO TEMPO',
        parametros: [
            ['DIAL (s)', dial],
            ['Beta', beta],
            ['Alfa', alfa],
            ['I inst (A)', iinst],
            ['Ip (A)', ip],
            ['K', k],
            ['Tempo calculado (s)', resultadoTempo]
        ],
        formula: [
            't = DIAL * (beta / ((Iinst / Ip)^alfa - K))',
            `t = ${dial || '?'} * (${beta || '?'} / (((${iinst || '?'} / ${ip || '?'})^${alfa || '?'}) - ${k || '?'}))`,
            `t = ${resultadoTempo || '?'}`
        ]
    };
}

function quebrarTextoCanvas(ctx, texto, larguraMaxima) {
    const palavras = String(texto || '').split(' ');
    const linhas = [];
    let atual = '';

    for (const palavra of palavras) {
        const tentativa = atual ? `${atual} ${palavra}` : palavra;
        if (ctx.measureText(tentativa).width <= larguraMaxima || !atual) {
            atual = tentativa;
        } else {
            linhas.push(atual);
            atual = palavra;
        }
    }

    if (atual) {
        linhas.push(atual);
    }

    return linhas.length ? linhas : [''];
}

function criarCanvasResumoCalculo(dados) {
    const canvas = document.createElement('canvas');
    const largura = 1700;
    const margem = 60;
    const larguraUtil = largura - (margem * 2);
    const contexto = canvas.getContext('2d');

    if (!contexto) {
        return null;
    }

    contexto.font = '700 52px Arial, sans-serif';
    const alturaTitulo = 72;
    const alturaLinhaParametro = 58;
    const alturaEspaco = 26;
    const alturaSubtitulo = 52;
    const alturaLinhaFormula = 54;

    contexto.font = '500 42px Arial, sans-serif';
    const linhasFormula = [];
    dados.formula.forEach((linha, indice) => {
        contexto.font = indice === dados.formula.length - 1
            ? '700 44px Arial, sans-serif'
            : '500 42px Arial, sans-serif';
        const quebradas = quebrarTextoCanvas(contexto, linha, larguraUtil - 40);
        quebradas.forEach((item, idxInterno) => {
            linhasFormula.push({ texto: item, destaque: indice === dados.formula.length - 1 && idxInterno === quebradas.length - 1 });
        });
    });

    const alturaFormulaBloco = 40 + (linhasFormula.length * alturaLinhaFormula) + 20;
    const altura = margem
        + alturaTitulo
        + alturaEspaco
        + (dados.parametros.length * alturaLinhaParametro)
        + alturaEspaco
        + alturaSubtitulo
        + alturaFormulaBloco
        + margem;

    canvas.width = largura;
    canvas.height = altura;

    contexto.fillStyle = '#ffffff';
    contexto.fillRect(0, 0, largura, altura);

    let y = margem;

    contexto.fillStyle = '#111111';
    contexto.font = '700 52px Arial, sans-serif';
    contexto.fillText(dados.titulo, margem, y + 48);
    y += alturaTitulo;

    contexto.strokeStyle = '#d0d0d0';
    contexto.lineWidth = 2;
    contexto.beginPath();
    contexto.moveTo(margem, y + 4);
    contexto.lineTo(largura - margem, y + 4);
    contexto.stroke();
    y += alturaEspaco;

    dados.parametros.forEach(([rotulo, valor], indice) => {
        const destaque = indice === dados.parametros.length - 1;
        contexto.font = destaque ? '700 44px Arial, sans-serif' : '500 42px Arial, sans-serif';
        contexto.fillStyle = '#111111';
        contexto.fillText(`${rotulo}:`, margem, y + 42);
        contexto.font = destaque ? '700 44px Arial, sans-serif' : '500 42px Arial, sans-serif';
        contexto.fillText(valor || '-', margem + 560, y + 42);
        y += alturaLinhaParametro;
    });

    y += 8;
    contexto.font = '700 46px Arial, sans-serif';
    contexto.fillStyle = '#111111';
    contexto.fillText('FORMULA', margem, y + 40);
    y += alturaSubtitulo;

    const blocoX = margem;
    const blocoY = y;
    const blocoW = larguraUtil;
    const blocoH = alturaFormulaBloco;

    contexto.fillStyle = '#eef8ee';
    contexto.strokeStyle = '#cfe8cf';
    contexto.lineWidth = 2;
    contexto.beginPath();
    contexto.roundRect(blocoX, blocoY, blocoW, blocoH, 14);
    contexto.fill();
    contexto.stroke();

    let yFormula = blocoY + 54;
    linhasFormula.forEach((linha) => {
        contexto.font = linha.destaque ? '700 44px Arial, sans-serif' : '500 42px Arial, sans-serif';
        contexto.fillStyle = '#111111';
        contexto.fillText(linha.texto, blocoX + 20, yFormula);
        yFormula += alturaLinhaFormula;
    });

    return canvas;
}

async function copiarResumoComoImagemJpg(tipo, nomeArquivoBase) {
    const dados = tipo === 'dial' ? obterDadosImagemDial() : obterDadosImagemTempo();
    const canvas = criarCanvasResumoCalculo(dados);
    if (!canvas) {
        window.alert('Não foi possível gerar a imagem do resumo.');
        return;
    }

    const blobJpg = await obterBlobDoCanvas(canvas, 'image/jpeg', 0.95);
    if (!blobJpg) {
        window.alert('Não foi possível gerar a imagem JPG.');
        return;
    }

    if (navigator.clipboard && window.ClipboardItem && navigator.clipboard.write) {
        try {
            await navigator.clipboard.write([
                new ClipboardItem({ 'image/jpeg': blobJpg })
            ]);
            window.alert('Parâmetros e fórmula copiados como imagem JPG!');
            return;
        } catch {
            try {
                const blobPng = await obterBlobDoCanvas(canvas, 'image/png');
                if (blobPng) {
                    await navigator.clipboard.write([
                        new ClipboardItem({ 'image/png': blobPng })
                    ]);
                    window.alert('Imagem copiada para a área de transferência (PNG).');
                    return;
                }
            } catch {
            }
        }
    }

    baixarCanvasComoJpg(canvas, nomeArquivoBase);
    window.alert('Seu navegador não permitiu copiar imagem. O arquivo JPG foi baixado automaticamente.');
}

async function copiarBlocoComoImagemJpg(idBloco, nomeArquivoBase) {
    const elemento = document.getElementById(idBloco);
    const tipo = idBloco === 'blocoDialParaImagem' ? 'dial' : 'tempo';
    if (!elemento) {
        await copiarResumoComoImagemJpg(tipo, nomeArquivoBase);
        return;
    }

    if (typeof window.html2canvas !== 'function') {
        await copiarResumoComoImagemJpg(tipo, nomeArquivoBase);
        return;
    }

    try {
        if (window.MathJax && typeof window.MathJax.typesetPromise === 'function') {
            const formulasNoBloco = elemento.querySelectorAll('#formulaDialCalcEq, #formulaTempoCalcEq');
            await window.MathJax.typesetPromise(Array.from(formulasNoBloco));
        }

        await new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)));

        const canvas = await window.html2canvas(elemento, {
            backgroundColor: '#ffffff',
            scale: 2,
            useCORS: true,
            logging: false,
            onclone: (documentoClone) => {
                const elementosOcultos = documentoClone.querySelectorAll('[data-excluir-captura="true"]');
                elementosOcultos.forEach((el) => {
                    el.style.display = 'none';
                });

                // Evita sobreposição do MathJax na captura mantendo apenas a camada visual principal.
                const assistivos = documentoClone.querySelectorAll('mjx-assistive-mml, .MJX_Assistive_MathML');
                assistivos.forEach((el) => {
                    el.remove();
                });

                const containersMath = documentoClone.querySelectorAll('mjx-container');
                containersMath.forEach((container) => {
                    const svgs = container.querySelectorAll('svg');
                    svgs.forEach((svg, indice) => {
                        if (indice > 0) {
                            svg.remove();
                            return;
                        }

                        svg.style.overflow = 'visible';
                        svg.style.display = 'block';
                        svg.style.marginBottom = '12px';
                    });

                    container.style.display = 'block';
                    container.style.overflow = 'visible';
                });

                const blocosFormula = documentoClone.querySelectorAll('#formulaDialCalcEq, #formulaTempoCalcEq');
                blocosFormula.forEach((bloco) => {
                    bloco.style.overflow = 'visible';
                    bloco.style.paddingBottom = '48px';
                    bloco.style.marginBottom = '20px';

                    const alturaFormula = bloco.scrollHeight || 0;
                    if (alturaFormula > 0) {
                        bloco.style.minHeight = `${alturaFormula + 30}px`;
                    }
                });

                const blocoFormulaTempo = documentoClone.querySelector('#formulaTempoCalcEq');
                if (blocoFormulaTempo) {
                    const alturaTempo = blocoFormulaTempo.scrollHeight || 0;
                    if (alturaTempo > 0) {
                        blocoFormulaTempo.style.minHeight = `${alturaTempo + 54}px`;
                    }
                    blocoFormulaTempo.style.paddingBottom = '60px';
                }

                const blocosImagem = documentoClone.querySelectorAll('#blocoDialParaImagem, #blocoTempoParaImagem');
                blocosImagem.forEach((bloco) => {
                    bloco.style.paddingBottom = '42px';
                    const alturaBloco = bloco.scrollHeight || 0;
                    if (alturaBloco > 0) {
                        bloco.style.minHeight = `${alturaBloco + 24}px`;
                    }
                });
            }
        });

        const blobJpg = await obterBlobDoCanvas(canvas, 'image/jpeg', 0.95);
        if (!blobJpg) {
            await copiarResumoComoImagemJpg(tipo, nomeArquivoBase);
            return;
        }

        if (navigator.clipboard && window.ClipboardItem && navigator.clipboard.write) {
            try {
                await navigator.clipboard.write([
                    new ClipboardItem({ 'image/jpeg': blobJpg })
                ]);
                window.alert('Parâmetros e fórmula copiados como imagem JPG!');
                return;
            } catch {
                try {
                    const blobPng = await obterBlobDoCanvas(canvas, 'image/png');
                    if (blobPng) {
                        await navigator.clipboard.write([
                            new ClipboardItem({ 'image/png': blobPng })
                        ]);
                        window.alert('Imagem copiada para a área de transferência (PNG).');
                        return;
                    }
                } catch {
                }
            }
        }

        baixarCanvasComoJpg(canvas, nomeArquivoBase);
        window.alert('Seu navegador não permitiu copiar imagem. O arquivo JPG foi baixado automaticamente.');
    } catch {
        await copiarResumoComoImagemJpg(tipo, nomeArquivoBase);
    }
}

function montarTextoCopiarDialTeste() {
    const tempo = (document.getElementById('testeDialTempoCalc')?.value || '').trim();
    const beta = (document.getElementById('testeDialBetaCalc')?.value || '').trim();
    const alfa = (document.getElementById('testeDialAlfaCalc')?.value || '').trim();
    const iinst = (document.getElementById('testeDialIinstCalc')?.value || '').trim();
    const ip = (document.getElementById('testeDialIpCalc')?.value || '').trim();
    const k = (document.getElementById('testeDialKCalc')?.value || '').trim();
    const resultadoDial = (document.getElementById('testeDialResultadoCalc')?.value || '').trim();

    return [
        'PARÂMETROS PARA O CALCULO DO DIAL',
        `Tempo (s): ${tempo}`,
        `Beta: ${beta}`,
        `Alfa: ${alfa}`,
        `I inst (A): ${iinst}`,
        `Ip (A): ${ip}`,
        `K: ${k}`,
        '',
        'FÓRMULA:',
        'DIAL = t * (((Iinst / Ip)^alfa - K) / beta)',
        `DIAL = ${tempo} * (((${iinst} / ${ip})^${alfa} - ${k}) / ${beta})`,
        `DIAL = ${resultadoDial}`
    ].join('\n');
}

function montarTextoCopiarTempoTeste() {
    const dial = (document.getElementById('testeTempoDialCalc')?.value || '').trim();
    const beta = (document.getElementById('testeTempoBetaCalc')?.value || '').trim();
    const alfa = (document.getElementById('testeTempoAlfaCalc')?.value || '').trim();
    const iinst = (document.getElementById('testeTempoIinstCalc')?.value || '').trim();
    const ip = (document.getElementById('testeTempoIpCalc')?.value || '').trim();
    const k = (document.getElementById('testeTempoKCalc')?.value || '').trim();
    const resultadoTempo = (document.getElementById('testeTempoResultadoCalc')?.value || '').trim();

    return [
        'PARÂMETROS PARA O CALCULO DO TEMPO',
        `DIAL (s): ${dial}`,
        `Beta: ${beta}`,
        `Alfa: ${alfa}`,
        `I inst (A): ${iinst}`,
        `Ip (A): ${ip}`,
        `K: ${k}`,
        '',
        'FÓRMULA:',
        't = DIAL * (beta / ((Iinst / Ip)^alfa - K))',
        `t = ${dial} * (${beta} / (((${iinst} / ${ip})^${alfa}) - ${k}))`,
        `t = ${resultadoTempo}`
    ].join('\n');
}

function configurarBotoesCopiarTesteDial() {
    const btnCopiarDial = document.getElementById('btnCopiarDialTesteDetalhes');
    if (btnCopiarDial && btnCopiarDial.dataset.bound !== 'true') {
        btnCopiarDial.addEventListener('click', function () {
            const texto = montarTextoCopiarDialTeste();
            copiarTextoSimplesComFallback(texto, 'Parâmetros e fórmula do DIAL copiados com sucesso!');
        });
        btnCopiarDial.dataset.bound = 'true';
    }

    const btnCopiarTempo = document.getElementById('btnCopiarTempoTesteDetalhes');
    if (btnCopiarTempo && btnCopiarTempo.dataset.bound !== 'true') {
        btnCopiarTempo.addEventListener('click', function () {
            const texto = montarTextoCopiarTempoTeste();
            copiarTextoSimplesComFallback(texto, 'Parâmetros e fórmula do TEMPO copiados com sucesso!');
        });
        btnCopiarTempo.dataset.bound = 'true';
    }

    const btnCopiarDialJpg = document.getElementById('btnCopiarDialTesteJpg');
    if (btnCopiarDialJpg && btnCopiarDialJpg.dataset.bound !== 'true') {
        btnCopiarDialJpg.addEventListener('click', function () {
            copiarBlocoComoImagemJpg('blocoDialParaImagem', 'parametros-formula-dial');
        });
        btnCopiarDialJpg.dataset.bound = 'true';
    }

    const btnCopiarTempoJpg = document.getElementById('btnCopiarTempoTesteJpg');
    if (btnCopiarTempoJpg && btnCopiarTempoJpg.dataset.bound !== 'true') {
        btnCopiarTempoJpg.addEventListener('click', function () {
            copiarBlocoComoImagemJpg('blocoTempoParaImagem', 'parametros-formula-tempo');
        });
        btnCopiarTempoJpg.dataset.bound = 'true';
    }
}

window.onload = function () {
    inicializarNavegacaoPorDataTarget();

    const tituloHeader = document.querySelector('.analise-header-title');
    if (tituloHeader) {
        tituloHeader.classList.add('loaded');
    }

    // -----------------manter o botão vermelho selecionado-------------------
    const botaoParametro = document.getElementById("botaoanalisehtml");
    if (botaoParametro) {
        botaoParametro.classList.add('analise-header-active');
    }

    const botaoSalvar = document.getElementById('botaoSalvar');
    if (botaoSalvar && botaoSalvar.dataset.bound !== 'true') {
        botaoSalvar.addEventListener('click', salvarOpcao);
        botaoSalvar.dataset.bound = 'true';
    }

    const btnAdicionarItem = document.getElementById('btnAdicionarItem');
    if (btnAdicionarItem && btnAdicionarItem.dataset.bound !== 'true') {
        btnAdicionarItem.addEventListener('click', adicionarItem);
        btnAdicionarItem.dataset.bound = 'true';
    }

    const btnRemoverItem = document.getElementById('btnRemoverItem');
    if (btnRemoverItem && btnRemoverItem.dataset.bound !== 'true') {
        btnRemoverItem.addEventListener('click', removerUltimoItem);
        btnRemoverItem.dataset.bound = 'true';
    }

    const btnCopiar = document.getElementById('btnCopiar');
    if (btnCopiar && btnCopiar.dataset.bound !== 'true') {
        btnCopiar.addEventListener('click', copiarTextoEmailContainer);
        btnCopiar.dataset.bound = 'true';
    }

    const btnCopiarNotas = document.getElementById('btnCopiarNotas');
    if (btnCopiarNotas && btnCopiarNotas.dataset.bound !== 'true') {
        btnCopiarNotas.addEventListener('click', copiarNotasComObservacao);
        btnCopiarNotas.dataset.bound = 'true';
    }

    const btnCopiarOperacaoInAteTinst = document.getElementById('btnCopiarOperacaoInAteTinst');
    if (btnCopiarOperacaoInAteTinst && btnCopiarOperacaoInAteTinst.dataset.bound !== 'true') {
        btnCopiarOperacaoInAteTinst.addEventListener('click', copiarOperacaoInAteTinst);
        btnCopiarOperacaoInAteTinst.dataset.bound = 'true';
    }

    configurarTesteDial();
    configurarBotoesCopiarTesteDial();

    const btnCopiarAtalhosUltimasLinhas = document.getElementById('btnCopiarAtalhosUltimasLinhas');
    if (btnCopiarAtalhosUltimasLinhas && btnCopiarAtalhosUltimasLinhas.dataset.bound !== 'true') {
        btnCopiarAtalhosUltimasLinhas.addEventListener('click', copiarUltimasLinhasTabelaAtalho);
        btnCopiarAtalhosUltimasLinhas.dataset.bound = 'true';
    }

    // Controle de acesso movido para controle-acesso.js

    //--persistir os valores ajustados no html
    const numeroNSInput = document.getElementById("numeroNS");
    if (numeroNSInput) {
        const numeroNSSalvo = localStorage.getItem("numeroNS");
        if (numeroNSSalvo) {
            numeroNSInput.value = numeroNSSalvo;
        }
    }

    const nota4Select2 = document.getElementById("nota4-select");
    if (nota4Select2) {
        const nota4Salva = localStorage.getItem("tipodeanalise");
        if (nota4Salva) {
            nota4Select2.value = nota4Salva;
        }
    }

    const matriculaInput = document.getElementById("matricula");
    if (matriculaInput) {
        const matriculaSalva = localStorage.getItem("matriculadotecnico");
        if (matriculaSalva) {
            matriculaInput.value = matriculaSalva;
        }
    }

    //------------------------------------------------------

    // Preencher os campos com os valores do localStorage
    const tensaoAtendimento = localStorage.getItem("tensaoSelecionada");
    const demandaConsumo = localStorage.getItem("demandadecontrato");
    const potenciaGerador = localStorage.getItem("potenciaGDcontratada");
    const tipoParalelismoSelecionado = localStorage.getItem("tipoParalelismoSelecionado") || "";
    const tipoParalelismoNormalizado = tipoParalelismoSelecionado
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase()
        .trim();
    const isSemInjecao = tipoParalelismoNormalizado === "sem injecao";



    const geradorJSON = localStorage.getItem("geradorJSON");
    const potenciaDiesel = geradorJSON ? JSON.parse(geradorJSON).potencia : null;


    const anoAtual = new Date().getFullYear();


    if (tensaoAtendimento) {
        document.getElementById("tensao-atendimento").innerText = tensaoAtendimento + " KV;";
    }

    if (demandaConsumo) {
        document.getElementById("demanda-consumo").innerText = demandaConsumo + " KW;";
    }

    const rotuloPotenciaGD = document.getElementById("rotulo-potencia-gd");
    const campoInjecaoZero = document.getElementById("campoInjecaoZero");

    if (rotuloPotenciaGD) {
        rotuloPotenciaGD.innerText = isSemInjecao ? "POTÊNCIA DE GERAÇÃO:" : "POTÊNCIA GD:";
    }

    if (potenciaGerador && potenciaGerador !== "0" && potenciaGerador !== "0.0") {
        document.getElementById("potencia-GD").innerText = potenciaGerador + " KW;";
        document.getElementById("campoGD").style.display = "";
        if (campoInjecaoZero) {
            campoInjecaoZero.style.display = isSemInjecao ? "" : "none";
        }
    } else {
        document.getElementById("campoGD").style.display = "none";
        if (campoInjecaoZero) {
            campoInjecaoZero.style.display = "none";
        }
    }


    // if (potenciaGerador) {
    //     document.getElementById("potencia-GD").innerText = potenciaGerador + " KVA";
    // }


    if (potenciaDiesel) {
        document.getElementById("potencia-gerador").innerText = potenciaDiesel + " KVA;";
        document.getElementById("campogeradordiesel").style.display = "";
    } else {
        document.getElementById("campogeradordiesel").style.display = "none";
    }


    // Preencher nsedata com valor de numeroNS, se não houver valor deixa 
    const numeroNS = 'PROJETO NS:' + (localStorage.getItem("numeroNS") + '/' + anoAtual || '' + '/' + anoAtual) + ';';
    document.getElementById("nsedata").innerText = numeroNS;


    // Preencher nota4
    const nota4Select = document.getElementById("nota4");
    if (nota4Select) {
        const nota4Salva = localStorage.getItem("tipodeanalise");
        if (nota4Salva) {
            nota4Select.textContent = 'TRATA-SE DE: ' + nota4Salva + ';';
        } else {
            nota4Select.textContent = 'TRATA-SE DE: COORDENOGRAMA;';
        }
    }


    // Preencher nsselo com valor de numeroNS
    const nsselo = document.getElementById("nsselo");
    if (nsselo) {
        const numeroNSValue = localStorage.getItem("numeroNS");
        nsselo.innerText = numeroNSValue ? numeroNSValue : "";
    }


    // Preencher aprovadorselo com valor de matriculadotecnico
    const aprovadorselo = document.getElementById("aprovadorselo");
    if (aprovadorselo) {
        const matriculaTecnico = localStorage.getItem("matriculadotecnico");
        if (matriculaTecnico) {
            aprovadorselo.innerText = 'Por ' + matriculaTecnico + ' às ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + ' , ' + new Date().toLocaleDateString();
        } else {
            aprovadorselo.innerText = "";
        }
    }


    // Preencher total dos transformadores com valor do localStorage
    const potenciaTotalTrafos = localStorage.getItem("potenciatotaltrafos");
    const totalTransformadores = document.getElementById("total-transformadores");
    if (totalTransformadores) {
        if (potenciaTotalTrafos) {
            totalTransformadores.innerText = "TOTAL DOS TRANSFORMADORES: " + potenciaTotalTrafos + " KVA;";
        } else {
            totalTransformadores.innerText = "";
        }
    }








};



function salvarOpcao() {


    const numeroNS = document.getElementById("numeroNS").value;
    localStorage.setItem("numeroNS", numeroNS);
    console.log("numeroNS salvo:", numeroNS);

    const nota4Select = document.getElementById("nota4-select");
    if (nota4Select) {
        localStorage.setItem("tipodeanalise", nota4Select.value);
        console.log("tipodeanalise salvo:", nota4Select.value);
    }

    const matriculaInput = document.getElementById("matricula");
    if (matriculaInput) {
        localStorage.setItem("matriculadotecnico", matriculaInput.value);
        console.log("matricula salva:", matriculaInput.value);
    }

    // Atualizar a página para recarregar os dados salvos
    location.reload();

}




//funçao para buscar contatos no arquivo listaRTs.txt

let contatos = [];

const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const resultsDiv = document.getElementById('results');

function atualizarContatoNaPagina(contato) {
    if (!contato) {
        return;
    }

    const nomeEl = document.getElementById('contato-nome');
    if (nomeEl) {
        nomeEl.textContent = contato.nome || '';
    }

    const emailEl = document.getElementById('email-texto');
    if (emailEl) {
        emailEl.textContent = contato.email || '';
    }

    const telefoneEl = document.getElementById('telefone-texto');
    if (telefoneEl) {
        telefoneEl.textContent = contato.telefone || '';
    }

    const responsavelEl = document.getElementById('responsavel-tecnico');
    if (responsavelEl && contato.nome) {
        responsavelEl.textContent = contato.nome;
    }
}

function renderizarResultadosBusca(filtered) {
    resultsDiv.innerHTML = '';

    if (!filtered || filtered.length === 0) {
        resultsDiv.innerHTML = '<div>Nenhum contato encontrado.</div>';
        return;
    }

    filtered.forEach(c => {
        const item = document.createElement('div');
        item.className = 'result-item';
        item.innerHTML = `
                    <div class="analise-result-line"><strong>Nome:</strong> ${c.nome || '—'}</div>
                    <div class="analise-result-line"><strong>Email:</strong> ${c.email || '—'}</div>
                    <div class="analise-result-line"><strong>Telefone:</strong> ${c.telefone || '—'}</div>
                `;
        resultsDiv.appendChild(item);
    });
}

function executarBuscaRT() {
    const query = (searchInput.value || '').toLowerCase().trim();
    localStorage.setItem('rt_query', searchInput.value || '');

    if (query.length === 0) {
        resultsDiv.innerHTML = '<div>Digite um nome, e-mail ou telefone para pesquisar.</div>';
        return;
    }

    const filtered = contatos.filter(c =>
        (c.nome && c.nome.toLowerCase().includes(query)) ||
        (c.email && c.email.toLowerCase().includes(query)) ||
        (c.telefone && c.telefone.toLowerCase().includes(query))
    );

    renderizarResultadosBusca(filtered);

    if (filtered.length > 0) {
        const contato = filtered[0];
        localStorage.setItem('contato_nome', contato.nome || '');
        localStorage.setItem('contato_email', contato.email || '');
        localStorage.setItem('contato_telefone', contato.telefone || '');
        atualizarContatoNaPagina(contato);
    }
}

// Carrega o arquivo automaticamente
fetch('listaRTs.txt')
    .then(response => response.text())
    .then(text => {
        const lines = text.split('\n').map(l => l.trim()).filter(l => l);

        contatos = lines.map(line => {
            // Divide por espaços
            const partes = line.split(/\s+/);

            // Regex para identificar email e telefone
            const email = partes.find(p => /\S+@\S+\.\S+/.test(p));
            const telefone = partes.find(p => /\(\d{2}\)\d{4,5}-\d{4}/.test(p));

            // Remove email e telefone do array para sobrar só o nome
            const nome = partes.filter(p => p !== email && p !== telefone).join(' ');

            return { nome, email, telefone };
        });

        searchInput.disabled = false;
        searchBtn.disabled = false;

        const queryPersistida = localStorage.getItem('rt_query') || '';
        if (queryPersistida) {
            searchInput.value = queryPersistida;
            executarBuscaRT();
        } else {
            resultsDiv.innerHTML = '<div>✅ Arquivo carregado. Agora pesquise pelo nome.</div>';

            const contatoPersistido = {
                nome: localStorage.getItem('contato_nome') || '',
                email: localStorage.getItem('contato_email') || '',
                telefone: localStorage.getItem('contato_telefone') || ''
            };
            if (contatoPersistido.nome || contatoPersistido.email || contatoPersistido.telefone) {
                atualizarContatoNaPagina(contatoPersistido);
            }
        }
    })
    .catch(() => {
        resultsDiv.innerHTML = '<div>❌ Erro ao carregar o arquivo de contatos.</div>';
    });

searchBtn.addEventListener('click', executarBuscaRT);
searchInput.addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
        executarBuscaRT();
    }
});

// gerarcarta();
//fim da funçao buscar contatos no arquivo listaRTs.txt

// Preenchimento automático do nome do RT a partir da NS (tabela inf_rts no Supabase)
(function () {
    const numeroNSInputRT = document.getElementById('numeroNS');
    if (!numeroNSInputRT || typeof supabase === 'undefined') {
        return;
    }

    const supabaseUrl = "https://nelzhukmxrgdoarsxcek.supabase.co";
    const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5lbHpodWtteHJnZG9hcnN4Y2VrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTYwMDIxNzUsImV4cCI6MjA3MTU3ODE3NX0.KHvfJHVimKwiraEzbyZWyLnTO5P5VEvM86GlyE7y09k";
    const sbRT = supabase.createClient(supabaseUrl, supabaseKey);

    async function preencherRTPorNS() {
        const ns = (numeroNSInputRT.value || '').trim();
        if (!ns) {
            return;
        }

        try {
            const { data, error } = await sbRT
                .from('inf_rts')
                .select('nome_rt')
                .eq('ns', ns)
                .maybeSingle();

            if (error) {
                console.error('Erro ao buscar RT pela NS:', error);
                return;
            }

            if (data && data.nome_rt) {
                searchInput.value = data.nome_rt;
                localStorage.setItem('rt_query', data.nome_rt);
                if (!searchInput.disabled) {
                    executarBuscaRT();
                }
            }
        } catch (err) {
            console.error('Erro ao consultar inf_rts:', err);
        }
    }

    async function preencherDataInicioPlanejadoPorNS() {
        const ns = (numeroNSInputRT.value || '').trim();
        const dataInicioInput = document.getElementById('datainicioplanejado');
        if (!ns || !dataInicioInput) {
            return;
        }

        try {
            const { data, error } = await sbRT
                .from('indices')
                .select('inicio_planejado')
                .eq('nota', ns)
                .eq('codigo_medidas', '0040')
                .in('status_usuario', ['ANDM', 'ABER'])
                .order('id', { ascending: false })
                .limit(1)
                .maybeSingle();

            if (error) {
                console.error('Erro ao buscar inicio_planejado pela NS:', error);
                return;
            }

            if (data && data.inicio_planejado) {
                dataInicioInput.value = data.inicio_planejado;
                dataInicioInput.dispatchEvent(new Event('input'));
            }
        } catch (err) {
            console.error('Erro ao consultar indices:', err);
        }
    }

    let debounceTimerRT = null;
    numeroNSInputRT.addEventListener('input', function () {
        clearTimeout(debounceTimerRT);
        debounceTimerRT = setTimeout(function () {
            preencherRTPorNS();
            preencherDataInicioPlanejadoPorNS();
        }, 600);
    });
    numeroNSInputRT.addEventListener('blur', function () {
        preencherRTPorNS();
        preencherDataInicioPlanejadoPorNS();
    });
    numeroNSInputRT.addEventListener('keydown', function (event) {
        if (event.key === 'Enter') {
            clearTimeout(debounceTimerRT);
            preencherRTPorNS();
            preencherDataInicioPlanejadoPorNS();
        }
    });
})();





//funções para gerar a carta de correções rápidas




// function gerarcarta() {
const numeroNS2 = localStorage.getItem('numeroNS');
if (numeroNS2) {
    const assuntoEmail = document.getElementById('assuntoemail');
    if (assuntoEmail) {
        assuntoEmail.textContent = 'Assunto: Inconformidades' + ` NS ${numeroNS2}`;
    }
}

function adicionarItem() {
    const section = document.getElementById('projeto-eletrico');
    const newRow = document.createElement('div');
    newRow.className = 'item-row';
    newRow.style.marginBottom = '16px';

    const number = document.createElement('div');
    number.className = 'item-number';

    const textarea = document.createElement('textarea');
    textarea.placeholder = "Novo item...";
    textarea.classList.add('analise-item-textarea');

    // Carrega texto salvo se existir
    const itemsSalvos = JSON.parse(localStorage.getItem('itensProjetoEletrico') || '[]');
    textarea.value = itemsSalvos[section.children.length] || '';

    // Salva ao digitar
    textarea.addEventListener('input', function () {
        const items = Array.from(section.querySelectorAll('textarea')).map(t => t.value);
        localStorage.setItem('itensProjetoEletrico', JSON.stringify(items));
    });

    newRow.appendChild(number);
    newRow.appendChild(textarea);
    section.appendChild(newRow);

    atualizarNumeracao();
}

// Carrega itens salvos ao iniciar
document.addEventListener('DOMContentLoaded', function () {
    const section = document.getElementById('projeto-eletrico');
    const itemsSalvos = JSON.parse(localStorage.getItem('itensProjetoEletrico') || '[]');
    itemsSalvos.forEach(() => adicionarItem());
});

// Atualiza localStorage ao remover item
function removerUltimoItem() {
    const section = document.getElementById('projeto-eletrico');
    const items = section.querySelectorAll('.item-row');
    if (items.length > 0) {
        section.removeChild(items[items.length - 1]);
        // Atualiza localStorage
        const textos = Array.from(section.querySelectorAll('textarea')).map(t => t.value);
        localStorage.setItem('itensProjetoEletrico', JSON.stringify(textos));
        atualizarNumeracao();
    }
}

function removerUltimoItem() {
    const section = document.getElementById('projeto-eletrico');
    const items = section.querySelectorAll('.item-row');
    if (items.length > 0) {
        // Limpa o valor do último textarea antes de remover
        const lastTextarea = items[items.length - 1].querySelector('textarea');
        if (lastTextarea) lastTextarea.value = '';
        section.removeChild(items[items.length - 1]);
        // Atualiza localStorage
        const textos = Array.from(section.querySelectorAll('textarea')).map(t => t.value);
        localStorage.setItem('itensProjetoEletrico', JSON.stringify(textos));
        atualizarNumeracao();
    }
}


function atualizarNumeracao() {
    const items = document.querySelectorAll('#projeto-eletrico .item-row');
    items.forEach((item, index) => {
        const number = item.querySelector('.item-number');
        number.textContent = `${index + 1})`;
    });
}





document.addEventListener('DOMContentLoaded', function () {
    const nome = localStorage.getItem('contato_nome');
    if (nome) {
        document.getElementById('contato-nome').textContent = nome;
    }
});

document.addEventListener('DOMContentLoaded', function () {
    const email = localStorage.getItem('contato_email');
    if (email) {
        document.getElementById('email-texto').textContent = email;
    }
});

document.addEventListener('DOMContentLoaded', function () {
    const telefone = localStorage.getItem('contato_telefone');
    if (telefone) {
        document.getElementById('telefone-texto').textContent = telefone;
    }
});


const numeroNS = localStorage.getItem('numeroNS');
if (numeroNS) {
    document.getElementById('numero-ns').textContent = numeroNS;
}


function obterSaudacao() {
    const hora = new Date().getHours();
    if (hora >= 6 && hora < 12) return "Bom dia";
    if (hora >= 12 && hora < 18) return "Boa tarde";
    return "Boa noite";
}
document.getElementById('saudacao').textContent = obterSaudacao();


function gerarPDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    doc.setFont("helvetica", "bold");
    doc.setFontSize(18);
    doc.text("", 105, 20, { align: "center" });

    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);

    let y = 35;
    const saudacao = document.getElementById('saudacao').textContent;
    const nome = document.getElementById('contato-nome').textContent;
    doc.text(`${saudacao}, ${nome}.`, 20, y, { maxWidth: 170, align: "justify" });

    y += 10;
    const numeroNS = document.getElementById('numero-ns').textContent;
    doc.text(
        `Durante a análise da(s) NS(s) ${numeroNS}, foram identificados alguns itens necessários para alteração na solcitação para que a aprovação seja concluída. Segue itens de correção à serem observados:`,
        20, y, { maxWidth: 170, align: "justify" }
    );

    y += 15;
    doc.setFont("helvetica", "bold");
    doc.text("", 20, y);
    doc.setFont("helvetica", "normal");

    y += 8;
    const items = document.querySelectorAll('#projeto-eletrico .item-row textarea');
    items.forEach((textarea, idx) => {
        const text = `${idx + 1}) ${textarea.value}`;
        const lines = doc.splitTextToSize(text, 165);
        doc.text(lines, 25, y, { maxWidth: 165, align: "justify" });
        y += (lines.length * 6) + 4; // Altura dinâmica baseada no número de linhas
    });

    y += 5;
    doc.text("Com exceção das alterações solicitadas acima, não deverá ser realizada nenhuma outra mudança.", 20, y, { maxWidth: 170, align: "justify" });
    y += 10;
    doc.text("Informamos que, caso necessário, esse e-mail se encontra disponível para resoluções de dúvidas relacionadas à nota de serviço em questão.", 20, y, { maxWidth: 170, align: "justify" });
    y += 10;
    doc.text("Pedimos que se possível, informar telefone e e-mail de contato atualizado do responsável técnico.", 20, y, { maxWidth: 170, align: "justify" });
    y += 10;
    y += 10;
    doc.text("Informamos que o prazo limite para as alterações solicitadas é de 24 horas.", 20, y, { maxWidth: 170, align: "justify" });
    y += 10;
    doc.text("Para que haja liberação do projeto elétrico aprovado, após alterações efetuadas no mesmo, favor anexar os novos arquivos diretamente no APRWEB. Salientamos a importância de que essas alterações sejam feitas de forma imediata.", 20, y, { maxWidth: 170, align: "justify" });

    y += 15;
    doc.setFontSize(11);
    y += 10;
    doc.text(" ", 20, y); // Espaço para separar o parágrafo

    y += 6;
    doc.text("Att.", 20, y, { maxWidth: 170, align: "justify" });
    y += 6;
    doc.text("Núcleo Técnico", 20, y, { maxWidth: 170, align: "justify" });
    y += 6;
    doc.text("Processos Especiais de Expansão e Manutenção de Média e Baixa Tensão – PE/EM", 20, y, { maxWidth: 170, align: "justify" });
    y += 6;
    doc.text("www.cemig.com.br", 20, y, { maxWidth: 170, align: "justify" });

    doc.save("Carta_de_correcoes_rapidas.pdf");
}

// Adiciona o botão para gerar PDF
const pdfBtn = document.createElement('button');
pdfBtn.textContent = "PDF";
pdfBtn.style.backgroundColor = "#27ae60";
pdfBtn.style.color = "white";
pdfBtn.style.border = "none";
pdfBtn.style.borderRadius = "6px";
pdfBtn.style.padding = "10px 18px";
pdfBtn.style.cursor = "pointer";
pdfBtn.style.fontSize = "14px";
pdfBtn.onclick = gerarPDF;

document.querySelector('.action-panel').appendChild(pdfBtn);

// Adiciona jsPDF via CDN se não estiver presente
if (!window.jspdf) {
    const script = document.createElement('script');
    script.src = "https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js";
    script.onload = () => { };
    document.head.appendChild(script);
}
// }
//fim das funções para gerar a carta de correções rápidas












// Event listener para capturar Enter em qualquer lugar da página
document.addEventListener('keydown', function (event) {
    // Verificar se a tecla pressionada é Enter (código 13 ou 'Enter')
    if (event.key === 'Enter' || event.keyCode === 13) {
        // Evitar comportamento padrão (submissão de formulário)
        event.preventDefault();

        // Chamar a função salvar
        salvarOpcao();

        // Executar a pesquisa de contato
        searchBtn.click();

        // Exibir o evento da pesquisa de contato
        resultsDiv.style.display = 'block';

    }
});


//---LOGICA PARA PREENCHER TABELA DA OPERAÇÃO--------------------------------------

const demandaContrato = parseFloat(localStorage.getItem("demandadecontrato"));
const dialdimensionado = parseFloat(localStorage.getItem("dialfaseSelecionada"));
const notaOperacao = document.getElementById("nota-operacao");
if (notaOperacao) {
    if (demandaContrato < 1500 && dialdimensionado >= 1) {
        let piscar = true;
        setInterval(() => {
            notaOperacao.style.backgroundColor = piscar ? "#cf0808" : "";
            piscar = !piscar;
        }, 500);
    } else if (demandaContrato >= 1500 && demandaContrato < 4000 && dialdimensionado >= 0.4) {
        let piscar = true;
        setInterval(() => {
            notaOperacao.style.backgroundColor = piscar ? "#cf0808" : "";
            piscar = !piscar;
        }, 500);
    } else if (demandaContrato >= 4000 && dialdimensionado > 0.2) {
        let piscar = true;
        setInterval(() => {
            notaOperacao.style.backgroundColor = piscar ? "#cf0808" : "";
            piscar = !piscar;
        }, 500);
    }
}

// in-operacao
// alimentador-operacao
// tensao-operacao

// ip51-operacao
// curva-operacao
// dial-operacao
// iinst50-operacao

// ip51n-operacao
// tempodefinido-operacao
// iinst50n-operacao



const inOperacao = document.getElementById("in-operacao");
const UCgemini = localStorage.getItem("UCgemini");
if (inOperacao && UCgemini) {
    inOperacao.textContent = UCgemini;
}


const alimentadorOperacao = document.getElementById("alimentador-operacao");
const alimentadorGemini = localStorage.getItem("ALIMENTADORgemini");
if (alimentadorOperacao && alimentadorGemini) {
    alimentadorOperacao.textContent = alimentadorGemini;
}


const tensaoOperacao = document.getElementById("tensao-operacao");
const tensaoSelecionada = localStorage.getItem("TENSAOgemini");
if (tensaoOperacao && tensaoSelecionada) {
    tensaoOperacao.textContent = tensaoSelecionada + " KV";
}

const ip51Operacao = document.getElementById("ip51-operacao");
const ipDeConsumo = parseFloat(localStorage.getItem("Ipdeconsumo"));
if (ip51Operacao && ipDeConsumo) {
    ip51Operacao.textContent = ipDeConsumo.toFixed(2) + " A";
}


const curvaOperacao = document.getElementById("curva-operacao");
const curvaFaseSelecionada = localStorage.getItem("curvafaseSelecionada");
if (curvaOperacao && curvaFaseSelecionada) {
    curvaOperacao.textContent = curvaFaseSelecionada;
}


const dialOperacao = document.getElementById("dial-operacao");
const dialFaseSelecionada = localStorage.getItem("dialfaseSelecionada");
if (dialOperacao && dialFaseSelecionada) {
    dialOperacao.textContent = dialFaseSelecionada;
}

const iinst50Operacao = document.getElementById("iinst50-operacao");
const instFaseConsumo = parseFloat(localStorage.getItem("Instfaseconsumo"));
if (iinst50Operacao && instFaseConsumo) {
    iinst50Operacao.textContent = instFaseConsumo.toFixed(2) + " A";
}

const ip51nOperacao = document.getElementById("ip51n-operacao");
const ipDeNeutro = parseFloat(localStorage.getItem("IpdeneutroSelecionada"));
if (ip51nOperacao && ipDeNeutro) {
    ip51nOperacao.textContent = ipDeNeutro.toFixed(2) + " A";
}


const tempodefinidoOperacao = document.getElementById("tempodefinido-operacao");
const dialNeutroSelecionada = localStorage.getItem("dialneutroSelecionada");
if (tempodefinidoOperacao && dialNeutroSelecionada) {
    tempodefinidoOperacao.textContent = dialNeutroSelecionada + " s";
}

const iinst50nOperacao = document.getElementById("iinst50n-operacao");
const instNeutroSelecionada = parseFloat(localStorage.getItem("IinstneutroSelecionada"));
if (iinst50nOperacao && instNeutroSelecionada) {
    iinst50nOperacao.textContent = instNeutroSelecionada.toFixed(2) + " A";
}



//INICIO AUTOMAÇÃO PARA ENVIO DE CARTA EMAIL 

// Gera texto padrão
function nt_gerarTexto(ns) {

  let nome = localStorage.getItem("contato_nome") || "";
  let email = localStorage.getItem("contato_email") || "";
  let telefone = localStorage.getItem("contato_telefone") || "";

  // Saudação automática
  let hora = new Date().getHours();
  let saudacao = "";

  if (hora < 12) {
    saudacao = "Bom dia";
  } else if (hora < 18) {
    saudacao = "Boa tarde";
  } else {
    saudacao = "Boa noite";
  }

  return `${saudacao}, ${nome} (${email}), ${telefone}.

Durante a análise da(s) NS(s) (${ns}), foram identificados alguns itens necessários para alteração na solicitação para que a aprovação seja concluída.

Segue itens de correção a serem observados.

Informamos que o prazo limite para as alterações solicitadas é de 24 horas.

Para que haja liberação do projeto elétrico aprovado, após alterações efetuadas no mesmo, favor anexar os novos arquivos diretamente no APRWEB.

Salientamos a importância de que essas alterações sejam feitas de forma imediata.

Att.

Núcleo Técnico
Processos Especiais de Expansão e Manutenção de Média e Baixa Tensão – PE/EM
www.cemig.com.br`;
}

// Inicialização segura
function nt_init() {

  let numeroNS = localStorage.getItem("numeroNS") || "";
  let contatoEmail = localStorage.getItem("contato_email") || "";

  document.getElementById("nt_ns").value = numeroNS;
  document.getElementById("nt_destinatario").value = contatoEmail;
  document.getElementById("nt_remetente").value = "resposta_nucleotecnico@cemig.com.br";

  document.getElementById("nt_corpo").value = nt_gerarTexto(numeroNS);

  // Atualiza corpo automaticamente ao mudar NS
  document.getElementById("nt_ns").addEventListener("input", function() {
    document.getElementById("nt_corpo").value = nt_gerarTexto(this.value);
  });
}

// Função envio
function nt_enviarEmail() {

  var ns = document.getElementById("nt_ns").value;
  var destinatario = document.getElementById("nt_destinatario").value;
  var corpo = document.getElementById("nt_corpo").value;

  var assunto = `Inconformidades NS (${ns})`;

  var mailto = `mailto:${destinatario}?subject=${encodeURIComponent(assunto)}&body=${encodeURIComponent(corpo)}`;

  window.location.href = mailto;
}

// Inicializa sem conflito com outros scripts
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", nt_init);
} else {
  nt_init();
}

//FIM DA AUTOMAÇÃO PARA ENVIO DE CARTA EMAIL



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
