









window.onload = function () {
    // -----------------manter o botão vermelho selecionado-------------------
    const botaoParametro = document.getElementById("botaoajustesGDhtml");
    if (botaoParametro) {
        botaoParametro.style.backgroundColor = "#cf0808";
    }

    const botaoParametro2 = document.getElementById("botaoajuste81html");
    if (botaoParametro2) {
        botaoParametro2.style.backgroundColor = "#cf0808";
    }
    // -----------------manter o botão vermelho selecionado-------------------

    // Controle de acesso movido para controle-acesso.js

    //----persistir os valores dos inputs no html de subfrequencia manual

    // Persistir valores dos inputs de subfrequência
    const subfreqInput1 = document.getElementById("subfrequencia-manual-html-1");
    if (subfreqInput1) {
        const valorInput1 = localStorage.getItem("ajustemanual81Uprimeiroestagio");
        subfreqInput1.value = valorInput1 !== null && valorInput1 !== "" ? valorInput1 : "";
    }

    const subfreqInput2 = document.getElementById("subfrequencia-manual-html-2");
    if (subfreqInput2) {
        const valorInput2 = localStorage.getItem("ajustemanual81Usegundoestagio");
        subfreqInput2.value = valorInput2 !== null && valorInput2 !== "" ? valorInput2 : "";
    }

    const subfreqInput3 = document.getElementById("subfrequencia-manual-html-3");
    if (subfreqInput3) {
        const valorInput3 = localStorage.getItem("ajustemanual81Uterceiroestagio");
        subfreqInput3.value = valorInput3 !== null && valorInput3 !== "" ? valorInput3 : "";
    }

    // Persistir valores dos inputs de tempo subrequência manual
    const subfreqTempoInput1 = document.getElementById("subfrequencia-tempo-manual-html-1");
    if (subfreqTempoInput1) {
        const tempoInput1 = localStorage.getItem("ajustemanual81Utempo1");
        subfreqTempoInput1.value = tempoInput1 !== null && tempoInput1 !== "" ? tempoInput1 : "";
    }

    const subfreqTempoInput2 = document.getElementById("subfrequencia-tempo-manual-html-2");
    if (subfreqTempoInput2) {
        const tempoInput2 = localStorage.getItem("ajustemanual81Utempo2");
        subfreqTempoInput2.value = tempoInput2 !== null && tempoInput2 !== "" ? tempoInput2 : "";
    }

    const subfreqTempoInput3 = document.getElementById("subfrequencia-tempo-manual-html-3");
    if (subfreqTempoInput3) {
        const tempoInput3 = localStorage.getItem("ajustemanual81Utempo3");
        subfreqTempoInput3.value = tempoInput3 !== null && tempoInput3 !== "" ? tempoInput3 : "";
    }


    // Importa do localStorage para subfrequencia-html-1, se não houver valor, mantém o valor programado
    const subfreqlabel = document.getElementById("subfrequencia-html-1");
    if (subfreqlabel) {
        const valorSalvo = localStorage.getItem("ajustemanual81Uprimeiroestagio");
        subfreqlabel.textContent = valorSalvo !== null && valorSalvo !== "" ? valorSalvo + " Hz" : "56.9" + " Hz";
    }

    localStorage.setItem("ajustereal81Uprimeiroestagio", subfreqlabel.textContent);


    const subfreqlabel2 = document.getElementById("subfrequencia-html-2");
    if (subfreqlabel2) {
        const valorSalvo2 = localStorage.getItem("ajustemanual81Usegundoestagio");
        subfreqlabel2.textContent = valorSalvo2 !== null && valorSalvo2 !== "" ? valorSalvo2 + " Hz" : "57.4" + " Hz";
    }

    localStorage.setItem("ajustereal81Usegundoestagio", subfreqlabel2.textContent);

    const subfreqlabel3 = document.getElementById("subfrequencia-html-3");
    if (subfreqlabel3) {
        const valorSalvo3 = localStorage.getItem("ajustemanual81Uterceiroestagio");
        subfreqlabel3.textContent = valorSalvo3 !== null && valorSalvo3 !== "" ? valorSalvo3 + " Hz" : "58.5" + " Hz";
    }
    localStorage.setItem("ajustereal81Uterceiroestagio", subfreqlabel3.textContent);

    const subfreqTempo1 = document.getElementById("subfrequencia-tempo-html-1");
    if (subfreqTempo1) {
        const tempoSalvo1 = localStorage.getItem("ajustemanual81Utempo1");
        subfreqTempo1.textContent = tempoSalvo1 !== null && tempoSalvo1 !== "" ? tempoSalvo1 + " s" : "0.20 s";
    }

    localStorage.setItem("ajustereal81Utempo1", subfreqTempo1.textContent);

    const subfreqTempo2 = document.getElementById("subfrequencia-tempo-html-2");
    if (subfreqTempo2) {
        const tempoSalvo2 = localStorage.getItem("ajustemanual81Utempo2");
        subfreqTempo2.textContent = tempoSalvo2 !== null && tempoSalvo2 !== "" ? tempoSalvo2 + " s" : "5.50 s";
    }
    localStorage.setItem("ajustereal81Utempo2", subfreqTempo2.textContent);

    const subfreqTempo3 = document.getElementById("subfrequencia-tempo-html-3");
    if (subfreqTempo3) {
        const tempoSalvo3 = localStorage.getItem("ajustemanual81Utempo3");
        subfreqTempo3.textContent = tempoSalvo3 !== null && tempoSalvo3 !== "" ? tempoSalvo3 + " s" : "20.50 s";
    }
    localStorage.setItem("ajustereal81Utempo3", subfreqTempo3.textContent);





    //----persistir os valores dos inputs no html de sobrefrequencia manual

    // Persistir valores dos inputs de sobrefrequência
    const sobrefreqInput1 = document.getElementById("sobrefrequencia-manual-html-1");
    if (sobrefreqInput1) {
        const valorInput1 = localStorage.getItem("ajustemanual81Oprimeiroestagio");
        sobrefreqInput1.value = valorInput1 !== null && valorInput1 !== "" ? valorInput1 : "";
    }


    const sobrefreqInput2 = document.getElementById("sobrefrequencia-manual-html-2");
    if (sobrefreqInput2) {
        const valorInput2 = localStorage.getItem("ajustemanual81Osegundoestagio");
        sobrefreqInput2.value = valorInput2 !== null && valorInput2 !== "" ? valorInput2 : "";
    }
    // Persistir valores dos inputs de tempo sobrequência manual
    const sobrefreqTempoInput1 = document.getElementById("sobrefrequencia-tempo-manual-html-1");
    if (sobrefreqTempoInput1) {
        const valorTempoInput1 = localStorage.getItem("ajustemanual81Otempo1");
        sobrefreqTempoInput1.value = valorTempoInput1 !== null && valorTempoInput1 !== "" ? valorTempoInput1 : "";
    }

    const sobrefreqTempoInput2 = document.getElementById("sobrefrequencia-tempo-manual-html-2");
    if (sobrefreqTempoInput2) {
        const valorTempoInput2 = localStorage.getItem("ajustemanual81Otempo2");
        sobrefreqTempoInput2.value = valorTempoInput2 !== null && valorTempoInput2 !== "" ? valorTempoInput2 : "";
    }

    // Importa do localStorage para sobrefrequencia-html-1, se não houver valor, mantém o valor programado
    const sobrefreqLabel1 = document.getElementById("sobrefrequencia-html-1");
    if (sobrefreqLabel1) {
        const valorSobrefreq1 = localStorage.getItem("ajustemanual81Oprimeiroestagio");
        sobrefreqLabel1.textContent = valorSobrefreq1 !== null && valorSobrefreq1 !== "" ? valorSobrefreq1 + " Hz" : "62.60" + " Hz";
    }
    localStorage.setItem("ajustereal81Oprimeiroestagio", sobrefreqLabel1.textContent);
    const sobrefreqLabel2 = document.getElementById("sobrefrequencia-html-2");
    if (sobrefreqLabel2) {
        const valorSobrefreq2 = localStorage.getItem("ajustemanual81Osegundoestagio");
        sobrefreqLabel2.textContent = valorSobrefreq2 !== null && valorSobrefreq2 !== "" ? valorSobrefreq2 + " Hz" : "63.10" + " Hz";
    }
    localStorage.setItem("ajustereal81Osegundoestagio", sobrefreqLabel2.textContent);
    const sobrefreqTempo1 = document.getElementById("sobrefrequencia-tempo-html-1");
    if (sobrefreqTempo1) {
        const tempoSobrefreq1 = localStorage.getItem("ajustemanual81Otempo1");
        sobrefreqTempo1.textContent = tempoSobrefreq1 !== null && tempoSobrefreq1 !== "" ? tempoSobrefreq1 + " s" : "10.50 s";
    }
    localStorage.setItem("ajustereal81Otempo1", sobrefreqTempo1.textContent);
    const sobrefreqTempo2 = document.getElementById("sobrefrequencia-tempo-html-2");
    if (sobrefreqTempo2) {
        const tempoSobrefreq2 = localStorage.getItem("ajustemanual81Otempo2");
        sobrefreqTempo2.textContent = tempoSobrefreq2 !== null && tempoSobrefreq2 !== "" ? tempoSobrefreq2 + " s" : "0.20 s";
    }
    localStorage.setItem("ajustereal81Otempo2", sobrefreqTempo2.textContent);


}


function salvarOpcao() {

    // Obter os valores dos inputs de subfrequência manual
    const subfrequencia1 = document.getElementById("subfrequencia-manual-html-1").value || "";
    const subfrequencia2 = document.getElementById("subfrequencia-manual-html-2").value || "";
    const subfrequencia3 = document.getElementById("subfrequencia-manual-html-3").value || "";

    const subfrequenciaTempo1 = document.getElementById("subfrequencia-tempo-manual-html-1").value || "";
    const subfrequenciaTempo2 = document.getElementById("subfrequencia-tempo-manual-html-2").value || "";
    const subfrequenciaTempo3 = document.getElementById("subfrequencia-tempo-manual-html-3").value || "";

    // Salvar os valores no localStorage de subfrequência manual
    localStorage.setItem("ajustemanual81Uprimeiroestagio", subfrequencia1);
    localStorage.setItem("ajustemanual81Usegundoestagio", subfrequencia2);
    localStorage.setItem("ajustemanual81Uterceiroestagio", subfrequencia3);

    localStorage.setItem("ajustemanual81Utempo1", subfrequenciaTempo1);
    localStorage.setItem("ajustemanual81Utempo2", subfrequenciaTempo2);
    localStorage.setItem("ajustemanual81Utempo3", subfrequenciaTempo3);





    // Obter os valores dos inputs de sobrefrequência manual
    const sobrefrequencia1 = document.getElementById("sobrefrequencia-manual-html-1")?.value || "";
    const sobrefrequencia2 = document.getElementById("sobrefrequencia-manual-html-2")?.value || "";
    

    const sobrefrequenciaTempo1 = document.getElementById("sobrefrequencia-tempo-manual-html-1")?.value || "";
    const sobrefrequenciaTempo2 = document.getElementById("sobrefrequencia-tempo-manual-html-2")?.value || "";

    // Salvar os valores no localStorage de sobrefrequência manual
    localStorage.setItem("ajustemanual81Oprimeiroestagio", sobrefrequencia1);
    localStorage.setItem("ajustemanual81Osegundoestagio", sobrefrequencia2);

    localStorage.setItem("ajustemanual81Otempo1", sobrefrequenciaTempo1);
    localStorage.setItem("ajustemanual81Otempo2", sobrefrequenciaTempo2);













    console.log('✅ Salvamento realizado com sucesso');




    location.reload();
}





// Event listener para capturar Enter em qualquer lugar da página
document.addEventListener('keydown', function(event) {
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
const dialsvg = 90000;
const beta = 300;
const alfa = 2;
const k = 1;
const ip = 0.5;
const iMin = ip * 2.01; // Começa um pouco acima de ip
const iMax = 300;
const pontos = 1000;

const dInverso = gerarCurvaTempoInversoSVG(dialsvg, beta, alfa, k, ip, iMin, iMax, pontos);

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
