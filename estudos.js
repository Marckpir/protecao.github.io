window.onload = function() {
    // Aguardar MathJax carregar
    if (typeof MathJax !== 'undefined') {
        MathJax.startup.promise.then(() => {
            atualizarFormula();
            atualizarFormula2();
        });
    } else {
        // Se MathJax não estiver carregado, tentar novamente após um tempo
        setTimeout(() => {
            atualizarFormula();
            atualizarFormula2();
        }, 1000);
    }
    
    const botaoParametro = document.getElementById("botaoestudoshtml");
    if (botaoParametro) {
        botaoParametro.style.backgroundColor = "#cf0808";
    }

    console.log('Tela carregada!');
};

// Função para gerar a curva tempo inverso em SVG da animação
function gerarCurvaTempoInversoSVG(dial, beta, alfa, k, ip, iMin, iMax, pontos) {
    let d = "";
    let primeiro = true;
    for (let i = 0; i <= pontos; i++) {
        let corrente = iMin + (iMax - iMin) * (i / pontos);
        let denominador = Math.pow(corrente / ip, alfa) - k;
        if (denominador <= 0) continue;
        let tempo = dial * (beta / denominador);
        if (tempo > 1000) tempo = 1000;
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

// Função para adicionar curva SVG (apenas se necessário)
function adicionarCurvaSVG() {
    const svg = document.querySelector("svg");
    if (!svg) return; // Sai se não encontrar o SVG

    // Verifica se já existe uma curva para evitar duplicação
    if (svg.querySelector(".curva-inversa")) return;

    const dial = 90000;
    const beta = 300;
    const alfa = 2;
    const k = 1;
    const ip = 0.5;
    const iMin = ip * 2.01;
    const iMax = 300;
    const pontos = 1000;

    const dInverso = gerarCurvaTempoInversoSVG(dial, beta, alfa, k, ip, iMin, iMax, pontos);

    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute("class", "curva-inversa");
    path.setAttribute("fill", "none");
    path.setAttribute("stroke", "#ff0080");
    path.setAttribute("stroke-width", "3");
    path.setAttribute("stroke-dasharray", "1000");
    path.setAttribute("stroke-dashoffset", "1000");
    path.setAttribute("d", dInverso);
    svg.appendChild(path);
}

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
        console.log(`${id}:`, obj[id]); // Debug
        return obj;
    }, {});

    console.log('Valores:', valores); // Debug
    const latex = `t = \\left( \\frac{${valores.beta}}{\\left( \\frac{${valores.imag}}{${valores.in}} \\right)^{${valores.alpha}}} - ${valores.k} \\right) \\times ${valores.dt}`;
    const formulaEl = document.getElementById("formula");

    if (formulaEl && typeof MathJax !== 'undefined') {
        formulaEl.innerHTML = `\\(${latex}\\)`;
        MathJax.typesetPromise([formulaEl]).catch(err => console.log('Erro MathJax:', err));
    } else {
        console.log('MathJax não disponível ou elemento formula não encontrado');
    }
}

function atualizarFormula2() {
    const campos2 = ["beta2", "imag2", "in2", "alpha2", "k2", "t2"];
    const valores = campos2.reduce((obj, id) => {
        const element = document.getElementById(id);
        obj[id] = element ? element.textContent : '';
        console.log(`${id}:`, obj[id]); // Debug
        return obj;
    }, {});

    console.log('Valores2:', valores); // Debug
    // Corrigir para usar as variáveis com "2"
    const latex2 = `DT = \\left( \\frac{\\left( \\frac{${valores.imag2}}{${valores.in2}} \\right)^{${valores.alpha2}}}{${valores.beta2}} - ${valores.k2} \\right) \\times ${valores.t2}`;
    const formulaEl2 = document.getElementById("formula2");

    if (formulaEl2 && typeof MathJax !== 'undefined') {
        formulaEl2.innerHTML = `\\(${latex2}\\)`;
        MathJax.typesetPromise([formulaEl2]).catch(err => console.log('Erro MathJax:', err));
    } else {
        console.log('MathJax não disponível ou elemento formula2 não encontrado');
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
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM carregado, carregando script do gráfico...');
    
    // Carregar o script do gráfico primeiro
    carregarScript('grafico5051consumo.js', function() {
        console.log('Script do gráfico carregado com sucesso');
        
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
        console.log('MathJax disponível!');
        atualizarFormula();
        atualizarFormula2();
    } else {
        console.log('MathJax não disponível, tentando novamente...');
        setTimeout(verificarMathJax, 500);
    }
}

