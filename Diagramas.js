

function salvarOpcao() {

    const select = document.getElementById("diagramaSelect");
    const diagramaSelecionado = select ? select.value : null;
    if (diagramaSelecionado) {
        localStorage.setItem("diagramaSelecionado", diagramaSelecionado);
    }

    alert("Opção salva com sucesso!");

}


window.onload = function () {
        // -----------------manter o botão vermelho selecionado-------------------
    const botaoParametro = document.getElementById("botaodiagramahtml");
    if (botaoParametro) {
        botaoParametro.style.backgroundColor = "#cf0808";
    }
    carregarOpcao();
}




function carregarOpcao() {
    const select = document.getElementById('tipoDiagrama');
    const imagens = [
        document.getElementById('diagramaImagem'),
        document.getElementById('diagramaImagem2'),
        document.getElementById('diagramaImagem3'),
        document.getElementById('diagramaImagem4'),
        document.getElementById('diagramaImagem5')
    ];

    // Exibe a imagem salva no localStorage ao carregar
    const imagemSalva = localStorage.getItem('imagemSelecionada');
    if (imagemSalva) {
        imagens.forEach(img => img.style.display = 'none');
        // Cria um elemento de imagem temporário para exibir a imagem salva
        let imgTemp = document.getElementById('imagemSalvaTemp');
        if (!imgTemp) {
            imgTemp = document.createElement('img');
            imgTemp.id = 'imagemSalvaTemp';
            imgTemp.style.display = 'block';
            imgTemp.style.maxWidth = '100%';
            imagens[0].parentNode.appendChild(imgTemp);
        }
        imgTemp.src = imagemSalva;
        imgTemp.style.display = 'block';
        select.selectedIndex = 0; // Opcional: selecione o primeiro item
    }

    select.addEventListener('change', function () {
        imagens.forEach(img => img.style.display = 'none');
        let imgSelecionada = imagens[select.selectedIndex];
        if (imgSelecionada) {
            imgSelecionada.style.display = 'block';

            // Salva a imagem (src) no localStorage
            // Se for uma imagem externa, pode não funcionar por CORS
            // Se for base64, funciona normalmente
            localStorage.setItem('imagemSelecionada', imgSelecionada.src);
        }
        // Remove imagem temporária se existir
        let imgTemp = document.getElementById('imagemSalvaTemp');
        if (imgTemp) imgTemp.style.display = 'none';
    });
}




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
