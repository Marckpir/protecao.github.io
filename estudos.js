
window.onload = function() {
            const botaoParametro = document.getElementById("botaoestudoshtml");
    if (botaoParametro) {
        botaoParametro.style.backgroundColor = "#cf0808";
    }





    // Código a ser executado quando a tela for carregada
    console.log('Tela carregada!');
    // Adicione aqui outras funções ou inicializações necessárias
};




// --------------------------------------------------------------// Código para gerar a curva tempo inverso em SVG
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

const botaoImprimir = document.createElement("button");
botaoImprimir.textContent = "Imprimir em PDF";
botaoImprimir.style.margin = "20px";
botaoImprimir.onclick = imprimirPaginaEmPDF;
document.body.insertBefore(botaoImprimir, document.body.firstChild);

// Sugestão: adicione CSS para layout A4 ao imprimir e evitar quebra de tabelas
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
/* Evitar quebra de tabelas */
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