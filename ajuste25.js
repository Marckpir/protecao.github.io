
//listar nome de todas a variaveis do localStorage
const listarVariaveisLocalStorage = () => {
    const variaveis = Object.keys(localStorage);
    console.log("Variáveis do localStorage:", variaveis);
};





window.onload = function () {
    // -----------------manter o botão vermelho selecionado-------------------
    const botaoParametro = document.getElementById("botaoajustesGDhtml");
    if (botaoParametro) {
        botaoParametro.style.backgroundColor = "#cf0808";
    }

    const botaoParametro2 = document.getElementById("botaoajuste25html");
    if (botaoParametro2) {
        botaoParametro2.style.backgroundColor = "#cf0808";
    }
    // -----------------manter o botão vermelho selecionado-------------------

    // Controle de acesso movido para controle-acesso.js


    const ligacaoSecundariaTP = localStorage.getItem("ligacaodabobinaSelecionada");
    if (ligacaoSecundariaTP !== null) {
        const ligacaoSecundariaTPHtml = document.getElementById("ligacao-secundaria-tp-html");
        if (ligacaoSecundariaTPHtml) {
            ligacaoSecundariaTPHtml.textContent = ligacaoSecundariaTP;
        }
    }
    const tensaoPrimariaFF = localStorage.getItem("tensaoprimariaFF");
    const tensaoPrimariaFN = localStorage.getItem("tensaoprimariaFN");
    const tensaoSecundariaFFTP = localStorage.getItem("tensaoSecundariaFFTP");
    const tensaoSecundariaFNTP = localStorage.getItem("tensaoSecundariaFNTP");




    const tensaoPrimariaLinhaHtml = document.getElementById("tensao-primaria-linha-html");
    if (tensaoPrimariaLinhaHtml && tensaoPrimariaFF) {
        tensaoPrimariaLinhaHtml.textContent = tensaoPrimariaFF + " V";
    }

    const tensaoPrimariaFaseHtml = document.getElementById("tensao-primaria-fase-html");
    if (tensaoPrimariaFaseHtml && tensaoPrimariaFN) {
        tensaoPrimariaFaseHtml.textContent = tensaoPrimariaFN + " V";
    }

    const tensaoSecundariaLinhaHtml = document.getElementById("tensao-secundaria-linha-html");
    if (tensaoSecundariaLinhaHtml && tensaoSecundariaFFTP) {
        tensaoSecundariaLinhaHtml.textContent = tensaoSecundariaFFTP + " V";
    }

    const tensaoSecundariaFaseHtml = document.getElementById("tensao-secundaria-fase-html");
    if (tensaoSecundariaFaseHtml && tensaoSecundariaFNTP) {
        tensaoSecundariaFaseHtml.textContent = tensaoSecundariaFNTP + " V";
    }








    //persistir os valores ajustados no html
    const tensaoDeseqAjustada = localStorage.getItem("TensaoDeseqAjustada25");
    if (tensaoDeseqAjustada !== null && tensaoDeseqAjustada !== "") {
        document.getElementById("tensao-desequilibrio-ajustada-html").value = tensaoDeseqAjustada;
    }

    //persistir o valor de frequência-desequilibrio-ajustada-html ajustada no html
    const freqDeseqAjustada = localStorage.getItem("FrequenciaDeseqAjustada25");
    if (freqDeseqAjustada !== null && freqDeseqAjustada !== "") {
        document.getElementById("frequência-desequilibrio-ajustada-html").value = freqDeseqAjustada;
    }

    //persistir o valor de angulo-desequilibrio-ajustada-html ajustada no html
    const anguloDeseqAjustada = localStorage.getItem("AnguloDeseqAjustada25");
    if (anguloDeseqAjustada !== null && anguloDeseqAjustada !== "") {
        document.getElementById("angulo-desequilibrio-ajustada-html").value = anguloDeseqAjustada;
    }

    //----------------------------------------------------------
    //persistir o valor de condicao-seccionamento-ajustada-html ajustada no html
    // const condicaoSeccionamentoAjustada = localStorage.getItem("CondicaoSeccionamentoAjustada25");
    // if (condicaoSeccionamentoAjustada !== null && condicaoSeccionamentoAjustada !== "") {
    //     document.getElementById("condicao-seccionamento-ajustada-html").value = condicaoSeccionamentoAjustada;
    // }

    //persistir o valor de condicao2-seccionamento-ajustada-html ajustada no html
    // const condicao2SeccionamentoAjustada = localStorage.getItem("Condicao2SeccionamentoAjustada25");
    // if (condicao2SeccionamentoAjustada !== null && condicao2SeccionamentoAjustada !== "") {
    //     document.getElementById("condicao2-seccionamento-ajustada-html").value = condicao2SeccionamentoAjustada;
    // }

    //persistir o valor de condicao3-seccionamento-ajustada-html ajustada no html
    // const condicao3SeccionamentoAjustada = localStorage.getItem("Condicao3SeccionamentoAjustada25");
    // if (condicao3SeccionamentoAjustada !== null && condicao3SeccionamentoAjustada !== "") {
    //     document.getElementById("condicao3-seccionamento-ajustada-html").value = condicao3SeccionamentoAjustada;
    // }

    //persistir o valor de condicao4-seccionamento-ajustada-html ajustada no html
    // const condicao4SeccionamentoAjustada = localStorage.getItem("Condicao4SeccionamentoAjustada25");
    // if (condicao4SeccionamentoAjustada !== null && condicao4SeccionamentoAjustada !== "") {
    //     document.getElementById("condicao4-seccionamento-ajustada-html").value = condicao4SeccionamentoAjustada;
    // }

    //----------------------------------------------------------

    
    // Persistir descrição do seccionamento ajustado e salvar no localStorage
    const descricaoSeccionamentoAjustada = localStorage.getItem("DescricaoSeccionamentoAjustada25");
    if (descricaoSeccionamentoAjustada !== null && descricaoSeccionamentoAjustada !== "") {
        document.getElementById("descricao-seccionamento-ajustada-html").value = descricaoSeccionamentoAjustada;
    }

    // Persistir descrição 2 do seccionamento ajustado e salvar no localStorage
    const descricao2SeccionamentoAjustada = localStorage.getItem("Descricao2SeccionamentoAjustada25");
    if (descricao2SeccionamentoAjustada !== null && descricao2SeccionamentoAjustada !== "") {
        document.getElementById("descricao2-seccionamento-ajustada-html").value = descricao2SeccionamentoAjustada;
    }

    // Persistir descrição 3 do seccionamento ajustado e salvar no localStorage
    const descricao3SeccionamentoAjustada = localStorage.getItem("Descricao3SeccionamentoAjustada25");
    if (descricao3SeccionamentoAjustada !== null && descricao3SeccionamentoAjustada !== "") {
        document.getElementById("descricao3-seccionamento-ajustada-html").value = descricao3SeccionamentoAjustada;
    }

    // Persistir descrição 4 do seccionamento ajustado e salvar no localStorage
    const descricao4SeccionamentoAjustada = localStorage.getItem("Descricao4SeccionamentoAjustada25");
    if (descricao4SeccionamentoAjustada !== null && descricao4SeccionamentoAjustada !== "") {
        document.getElementById("descricao4-seccionamento-ajustada-html").value = descricao4SeccionamentoAjustada;
    }

    // Persistir descrição ajustada do seccionamento dimensionado e salvar no localStorage
    const descricaoSeccionamentoDimensionado = localStorage.getItem("DescricaoSeccionamentoDimensionado25") || "FECHAMENTO DO DISJUNTOR PERMITIDO";
    if (descricaoSeccionamentoDimensionado !== null && descricaoSeccionamentoDimensionado !== "") {
        document.getElementById("descricao-seccionamento-dimensionado-html").value = descricaoSeccionamentoDimensionado;
    }

    // Persistir descrição 2 ajustada do seccionamento dimensionado e salvar no localStorage
    const descricao2SeccionamentoDimensionado = localStorage.getItem("Descricao2SeccionamentoDimensionado25") || "FECHAMENTO DO DISJUNTOR PERMITIDO";
    if (descricao2SeccionamentoDimensionado !== null && descricao2SeccionamentoDimensionado !== "") {
        document.getElementById("descricao2-seccionamento-dimensionado-html").value = descricao2SeccionamentoDimensionado;
    }

    // Persistir descrição 3 ajustada do seccionamento dimensionado e salvar no localStorage
    const descricao3SeccionamentoDimensionado = localStorage.getItem("Descricao3SeccionamentoDimensionado25") || "FECHAMENTO DO DISJUNTOR BLOQUEADO";
    if (descricao3SeccionamentoDimensionado !== null && descricao3SeccionamentoDimensionado !== "") {
        document.getElementById("descricao3-seccionamento-dimensionado-html").value = descricao3SeccionamentoDimensionado;
    }

    // Persistir descrição 4 ajustada do seccionamento dimensionado e salvar no localStorage
    const descricao4SeccionamentoDimensionado = localStorage.getItem("Descricao4SeccionamentoDimensionado25") || "FECHAMENTO DO DISJUNTOR BLOQUEADO";
    if (descricao4SeccionamentoDimensionado !== null && descricao4SeccionamentoDimensionado !== "") {
        document.getElementById("descricao4-seccionamento-dimensionado-html").value = descricao4SeccionamentoDimensionado;
    }









    //-------------------------------------------------------------------

    // Preencher campos do html com os valores do localStorage

    // Preencher o campo de tensão de desequilíbrio dimensionado no label da coluna Valores Ajustados
    const valorDesequilibrioDimensionado = localStorage.getItem("TensaoDeseqAjustada25") || "10";
    document.getElementById("tensao-desequilibrio-dimensionado-html").textContent = valorDesequilibrioDimensionado + " %";

    // Preencher o campo de frequência de desequilíbrio dimensionado no label da coluna Valores Ajustados
    const freqDesequilibrioDimensionado = localStorage.getItem("FrequenciaDeseqAjustada25") || "0.3";
    document.getElementById("frequência-desequilibrio-dimensionado-html").textContent = freqDesequilibrioDimensionado + " Hz";

    // Preencher o campo de ângulo de desequilíbrio dimensionado no label da coluna Valores Ajustados
    const anguloDesequilibrioDimensionado = localStorage.getItem("AnguloDeseqAjustada25") || "10";
    document.getElementById("angulo-desequilibrio-dimensionado-html").textContent = anguloDesequilibrioDimensionado + " °";

    // Preencher o campo de condição de seccionamento dimensionado no label da coluna Valores Ajustados
    const condicaoSeccionamentoDimensionado = localStorage.getItem("CondicaoSeccionamentoAjustada25") || "LINHA-VIVA/BARRA-VIVA";
    document.getElementById("condicao-seccionamento-dimensionado-html").textContent = condicaoSeccionamentoDimensionado;

    // Preencher o campo de condição 2 de seccionamento dimensionado no label da coluna Valores Ajustados
    const condicao2SeccionamentoDimensionado = localStorage.getItem("Condicao2SeccionamentoAjustada25") || "LINHA-VIVA/BARRA-MORTA";
    document.getElementById("condicao2-seccionamento-dimensionado-html").textContent = condicao2SeccionamentoDimensionado;

    // Preencher o campo de condição 3 de seccionamento dimensionado no label da coluna Valores Ajustados
    const condicao3SeccionamentoDimensionado = localStorage.getItem("Condicao3SeccionamentoAjustada25") || "LINHA-MORTA/BARRA-VIVA";
    document.getElementById("condicao3-seccionamento-dimensionado-html").textContent = condicao3SeccionamentoDimensionado;

    // Preencher o campo de condição 4 de seccionamento dimensionado no label da coluna Valores Ajustados
    const condicao4SeccionamentoDimensionado = localStorage.getItem("Condicao4SeccionamentoAjustada25") || "LINHA-MORTA/BARRA-MORTA";
    document.getElementById("condicao4-seccionamento-dimensionado-html").textContent = condicao4SeccionamentoDimensionado;

  
    // Preencher o campo de descrição ajustada do seccionamento dimensionado no label da coluna Valores Ajustados
    const descricaoAjustadaSeccionamentoDimensionado = localStorage.getItem("DescricaoSeccionamentoAjustada25") || "FECHAMENTO DO DISJUNTOR PERMITIDO";
    document.getElementById("descricao-seccionamento-dimensionado-html").textContent = descricaoAjustadaSeccionamentoDimensionado;

    // Preencher o campo de descrição 2 ajustada do seccionamento dimensionado no label da coluna Valores Ajustados
    const descricao2AjustadaSeccionamentoDimensionado = localStorage.getItem("Descricao2SeccionamentoAjustada25") || "FECHAMENTO DO DISJUNTOR PERMITIDO";
    document.getElementById("descricao2-seccionamento-dimensionado-html").textContent = descricao2AjustadaSeccionamentoDimensionado;

    // Preencher o campo de descrição 3 ajustada do seccionamento dimensionado no label da coluna Valores Ajustados
    const descricao3AjustadaSeccionamentoDimensionado = localStorage.getItem("Descricao3SeccionamentoAjustada25") || "FECHAMENTO DO DISJUNTOR BLOQUEADO";
    document.getElementById("descricao3-seccionamento-dimensionado-html").textContent = descricao3AjustadaSeccionamentoDimensionado;

    // Preencher o campo de descrição 4 ajustada do seccionamento dimensionado no label da coluna Valores Ajustados
    const descricao4AjustadaSeccionamentoDimensionado = localStorage.getItem("Descricao4SeccionamentoAjustada25") || "FECHAMENTO DO DISJUNTOR BLOQUEADO";
    document.getElementById("descricao4-seccionamento-dimensionado-html").textContent = descricao4AjustadaSeccionamentoDimensionado;
















    // Preencher o campo de tensão calculando valor base pela porcentagem definida
    const tensaoPrimariaFasecalculada = document.getElementById("tensao-ajustada-primaria-linha-html");
    const tensaoPrimariaFase = tensaoPrimariaLinhaHtml ? parseFloat(tensaoPrimariaLinhaHtml.textContent) : 0;
    const tensaoPrimariaFaseCalculada = (tensaoPrimariaFase * valorDesequilibrioDimensionado / 100).toFixed(2);
    tensaoPrimariaFasecalculada.textContent = tensaoPrimariaFaseCalculada + " V";

    // Calcular e preencher para tensao-ajustada-primaria-fase-html
    const tensaoPrimariaFaseAjustada = document.getElementById("tensao-ajustada-primaria-fase-html");
    const tensaoPrimariaFaseValor = tensaoPrimariaFaseHtml ? parseFloat(tensaoPrimariaFaseHtml.textContent) : 0;
    const tensaoPrimariaFaseAjustadaValor = (tensaoPrimariaFaseValor * valorDesequilibrioDimensionado / 100).toFixed(2);
    tensaoPrimariaFaseAjustada.textContent = tensaoPrimariaFaseAjustadaValor + " V";

    localStorage.setItem("tensaoPrimariaFaseAjustada25", tensaoPrimariaFaseAjustadaValor);

    const tensaoSecundariaFasecalculada = document.getElementById("tensao-ajustada-secundaria-linha-html");
    const tensaoSecundariaFase = tensaoSecundariaLinhaHtml ? parseFloat(tensaoSecundariaLinhaHtml.textContent) : 0;
    const tensaoSecundariaFaseCalculada = (tensaoSecundariaFase * valorDesequilibrioDimensionado / 100).toFixed(2);
    tensaoSecundariaFasecalculada.textContent = tensaoSecundariaFaseCalculada + " V";



    // Calcular e preencher para tensao-ajustada-secundaria-fase-html
    const tensaoSecundariaFaseAjustada = document.getElementById("tensao-ajustada-secundaria-fase-html");
    const tensaoSecundariaFaseValor = tensaoSecundariaFaseHtml ? parseFloat(tensaoSecundariaFaseHtml.textContent) : 0;
    const tensaoSecundariaFaseAjustadaValor = (tensaoSecundariaFaseValor * valorDesequilibrioDimensionado / 100).toFixed(2);
    tensaoSecundariaFaseAjustada.textContent = tensaoSecundariaFaseAjustadaValor + " V";










}


function salvarOpcao() {

    // importar valores dos inputs e armazenar no localStorage
    const tensaoDeseqAjustada = document.getElementById("tensao-desequilibrio-ajustada-html").value;
    localStorage.setItem("TensaoDeseqAjustada25", tensaoDeseqAjustada);
    console.log("Tensão Desequilíbrio Ajustada:", tensaoDeseqAjustada);

    // Gerar frequência de desequilíbrio ajustada e salvar no localStorage
    const freqDeseqAjustada = document.getElementById("frequência-desequilibrio-ajustada-html").value;
    localStorage.setItem("FrequenciaDeseqAjustada25", freqDeseqAjustada);
    console.log("Frequência Desequilíbrio Ajustada:", freqDeseqAjustada);

    // Gerar ângulo de desequilíbrio ajustada e salvar no localStorage
    const anguloDeseqAjustada = document.getElementById("angulo-desequilibrio-ajustada-html").value;
    localStorage.setItem("AnguloDeseqAjustada25", anguloDeseqAjustada);
    console.log("Ângulo Desequilíbrio Ajustada:", anguloDeseqAjustada);

    //------------------------------------------------------------------------
    // Gerar condição de seccionamento ajustada e salvar no localStorage
    // const condicaoSeccionamentoAjustada = document.getElementById("condicao-seccionamento-ajustada-html").value;
    // localStorage.setItem("CondicaoSeccionamentoAjustada25", condicaoSeccionamentoAjustada);
    // console.log("Condição Seccionamento Ajustada:", condicaoSeccionamentoAjustada);

    // Gerar condição 2 de seccionamento ajustada e salvar no localStorage
    // const condicao2SeccionamentoAjustada = document.getElementById("condicao2-seccionamento-ajustada-html").value;
    // localStorage.setItem("Condicao2SeccionamentoAjustada25", condicao2SeccionamentoAjustada);
    // console.log("Condição 2 Seccionamento Ajustada:", condicao2SeccionamentoAjustada);

    // Gerar condição 3 de seccionamento ajustada e salvar no localStorage
    // const condicao3SeccionamentoAjustada = document.getElementById("condicao3-seccionamento-ajustada-html").value;
    // localStorage.setItem("Condicao3SeccionamentoAjustada25", condicao3SeccionamentoAjustada);
    // console.log("Condição 3 Seccionamento Ajustada:", condicao3SeccionamentoAjustada);

    // Gerar condição 4 de seccionamento ajustada e salvar no localStorage
    // const condicao4SeccionamentoAjustada = document.getElementById("condicao4-seccionamento-ajustada-html").value;
    // localStorage.setItem("Condicao4SeccionamentoAjustada25", condicao4SeccionamentoAjustada);
    // console.log("Condição 4 Seccionamento Ajustada:", condicao4SeccionamentoAjustada);

    //-------------------------------------------------------------------------


    // Gerar descrição do seccionamento ajustado e salvar no localStorage
    const descricaoSeccionamentoAjustada = document.getElementById("descricao-seccionamento-ajustada-html").value;
    localStorage.setItem("DescricaoSeccionamentoAjustada25", descricaoSeccionamentoAjustada);
    console.log("Descrição Seccionamento Ajustada:", descricaoSeccionamentoAjustada);


    // Gerar descrição 2 do seccionamento ajustado e salvar no localStorage
    const descricao2SeccionamentoAjustada = document.getElementById("descricao2-seccionamento-ajustada-html").value;
    localStorage.setItem("Descricao2SeccionamentoAjustada25", descricao2SeccionamentoAjustada);
    console.log("Descrição 2 Seccionamento Ajustada:", descricao2SeccionamentoAjustada);

    // Gerar descrição 3 do seccionamento ajustado e salvar no localStorage
    const descricao3SeccionamentoAjustada = document.getElementById("descricao3-seccionamento-ajustada-html").value;
    localStorage.setItem("Descricao3SeccionamentoAjustada25", descricao3SeccionamentoAjustada);
    console.log("Descrição 3 Seccionamento Ajustada:", descricao3SeccionamentoAjustada);

    // Gerar descrição 4 do seccionamento ajustado e salvar no localStorage
    const descricao4SeccionamentoAjustada = document.getElementById("descricao4-seccionamento-ajustada-html").value;
    localStorage.setItem("Descricao4SeccionamentoAjustada25", descricao4SeccionamentoAjustada);
    console.log("Descrição 4 Seccionamento Ajustada:", descricao4SeccionamentoAjustada);

    //------------------------------------------------------------------------------------

    // Gerar descrição ajustada do seccionamento dimensionado e salvar no localStorage
    const descricaoSeccionamentoDimensionado = document.getElementById("descricao-seccionamento-dimensionado-html").value;
    localStorage.setItem("DescricaoSeccionamentoDimensionado25", descricaoSeccionamentoDimensionado);
    console.log("Descrição Seccionamento Dimensionado:", descricaoSeccionamentoDimensionado);

    // Gerar descrição 2 ajustada do seccionamento dimensionado e salvar no localStorage
    const descricao2SeccionamentoDimensionado = document.getElementById("descricao2-seccionamento-dimensionado-html").value;
    localStorage.setItem("Descricao2SeccionamentoDimensionado25", descricao2SeccionamentoDimensionado);
    console.log("Descrição 2 Seccionamento Dimensionado:", descricao2SeccionamentoDimensionado);

    // Gerar descrição 3 ajustada do seccionamento dimensionado e salvar no localStorage
    const descricao3SeccionamentoDimensionado = document.getElementById("descricao3-seccionamento-dimensionado-html").value;
    localStorage.setItem("Descricao3SeccionamentoDimensionado25", descricao3SeccionamentoDimensionado);
    console.log("Descrição 3 Seccionamento Dimensionado:", descricao3SeccionamentoDimensionado);

    // Gerar descrição 4 ajustada do seccionamento dimensionado e salvar no localStorage
    const descricao4SeccionamentoDimensionado = document.getElementById("descricao4-seccionamento-dimensionado-html").value;
    localStorage.setItem("Descricao4SeccionamentoDimensionado25", descricao4SeccionamentoDimensionado);
    console.log("Descrição 4 Seccionamento Dimensionado:", descricao4SeccionamentoDimensionado);



    // Recarregar a página após salvar as opções
    location.reload();
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




















