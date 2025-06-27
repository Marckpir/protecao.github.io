// Função para adicionar um novo aluno à tabela
/*
function adicionar() {
    let aluno = document.getElementById("aluno").value;
    let html = parseFloat(document.getElementById("html").value) || 0;
    let css = parseFloat(document.getElementById("css").value) || 0;
    let javascript = parseFloat(document.getElementById("javascript").value) || 0;

    let total = html + css + javascript;
    let media = (total / 3).toFixed(2);
    let resultado = media >= 70 ? "Aprovado" : "Reprovado"; // Média mínima corrigida para 70

    let tabela = document.getElementById("tabelaNotas");
    let novaLinha = tabela.insertRow();
    novaLinha.innerHTML = `<td>${aluno}</td><td>${total}</td><td>${media}</td><td>${resultado}</td>`;

    salvar(); // Salva automaticamente após adicionar um aluno
}

// Função para salvar o boletim no LocalStorage
function salvar() {
    let tabela = document.getElementById("tabelaNotas").innerHTML; // Obtém o HTML interno da tabela
    localStorage.setItem("boletim", tabela); // Salva no LocalStorage
    alert("Boletim salvo no navegador!");
}

// Função para carregar os dados do LocalStorage ao iniciar a página
function carregarBoletim() {
    let boletimSalvo = localStorage.getItem("boletim");
    if (boletimSalvo) {
        document.getElementById("tabelaNotas").innerHTML = boletimSalvo;
    }
}

// Chama a função ao carregar a página
window.onload = carregarBoletim;
*/


//chama função ao se clicar no botão 
function salvarOpcao(){

    //inicializa duas variaveis do tipo constante, um obtem o valor da ID meu select
    //que corresponde ao valor armazenado no campo de selecao e a outra armazena o valor desse campo
    const tensao = document.getElementById("tensaoprimaria");
    const tensaoSelecionada = tensao.value;

    //utiliza-se o local storage para armazenada a variavel inicializada com o nome opção selecionada
    // (ira aparecer no application do browser)
    localStorage.setItem("tensaoSelecionada", tensaoSelecionada);

    //mostro no console log o que foi armazenado no local storage para conferencia
    

    //-----------------------------------------------------------------------------------------
    const demandaPotencia = document.getElementById("demandaConsumo");
    const demandaSelecionada = demandaPotencia.value;
    localStorage.setItem("demandaSelecionada", demandaSelecionada);
    
    //-----------------------------------------------------------------------------------------
    const fatorPotencia = document.getElementById("fatorPotencia");
    const fatorPotenciaSelecionada = fatorPotencia.value/100;
    localStorage.setItem("fatorPotenciaSelecionada", fatorPotenciaSelecionada);
    
    //-----------------------------------------------------------------------------------------
    const desequilibrio = document.getElementById("desequilibrio");
    const desequilibrioSelecionada = desequilibrio.value;
    localStorage.setItem("desequilibrioSelecionada", desequilibrioSelecionada);
    
    //-----------------------------------------------------------------------------------------
    const curto = document.getElementById("icctrifasica");
    const curtoSelecionada = curto.value;
    localStorage.setItem("curtoSelecionada", curtoSelecionada);
    
    //-----------------------------------------------------------------------------------------
    
    const TCdeprotecao = document.getElementById("tcdeProtecao");
    const TCdeprotecaoSelecionada = TCdeprotecao.value;
    localStorage.setItem("TCdeprotecaoSelecionada", TCdeprotecaoSelecionada);
   //-----------------------------------------------------------------------------------------
    const TPdeprotecao = document.getElementById("TPdeprotecaohtml");
    const TPdeprotecaoSelecionada = TPdeprotecao.value;
    localStorage.setItem("TPdeprotecaoSelecionada", TPdeprotecaoSelecionada);
    
    //-----------------------------------------------------------------------------------------
    // Codigo para definir o TC Ideal
    const valoresTC = [
        15, 20, 25, 30, 35, 40, 50, 75, 100,
        150, 200, 250, 300, 400, 600, 800, 1000, 1200, 1500, 2000
    ];

    let inominalDemanda = 0;

    inominalDemanda = (demandaSelecionada/(tensaoSelecionada*Math.sqrt(3)*fatorPotenciaSelecionada));
    let iprimTccurto = curtoSelecionada/50;

    // Recupera a corrente instantanea selecionada do localStorage
    let instMagconsumo = localStorage.getItem("Instfaseconsumo")/20;

    console.log("instantanea de magnetização:", instMagconsumo);
    

    // Converte os valores para números
    let iprimTccurtoNum = parseFloat(iprimTccurto);
    let instMagconsumoNum = parseFloat(instMagconsumo);
    let inominalDemandaNum = parseFloat(inominalDemanda);
    let RTCselecionado =    parseFloat(TCdeprotecaoSelecionada)/5;
    

    console.log("RTCselecionado:", RTCselecionado);

    // Busca o maior valor em valoresTC que atenda todos os critérios
    let valorTCSelecionado = null;
    for (let i = 0; i < valoresTC.length; i++) {
        const valor = valoresTC[i];
        if (
            valor >= inominalDemandaNum*1.05 &&
            valor >= iprimTccurtoNum &&
            valor >= instMagconsumoNum
        ) {
            valorTCSelecionado = valor; // pega o menor possível dentro da condição
            break; // para no primeiro (menor) que atende
        }
        console.log("valor TC:", valor);
    }

    //Calcula a potência mínima referente a 10% do TC ideal

    let potenciaMinima = valorTCSelecionado * 0.1* tensaoSelecionada * Math.sqrt(3) * fatorPotenciaSelecionada;
    // console.log("Potência mínima:", potenciaMinima);







    // Armazena o valor selecionado no localStorage e exibe no console
    if (valorTCSelecionado !== null) {
        localStorage.setItem("valorTCideal", valorTCSelecionado);
        console.log("Valor TC selecionado:", valorTCSelecionado);
    } else {
        console.log("Nenhum valor TC atende aos critérios.");
        localStorage.removeItem("valorTCideal");
    }

    localStorage.setItem("RTCselecionado", RTCselecionado);
    console.log("RTCselecionado armazenado:", RTCselecionado);

    //Armazena Potencia minima no localStorage
    localStorage.setItem("potenciaMinimaSelecionada", potenciaMinima.toFixed(2));
    console.log("Potência mínima armazenada:", potenciaMinima);

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






    // Recarrega a página após salvar as opções
    location.reload();
}      





// Recuperar a opção ao carregar a página

//uma função que é chamada assim que o janela é carregada
//inicializa duas variaveis do tipo constante, 
//a variavel select recebe o espaco do campo de opção de selecao que foi atribuida com esse ID
//opçãosalva recebe a informação armazenada no local storage com o nome opçãoSelecionada

//é realizado uma validação atraves do if para validar se a informação salva não é null
//então o campo valor da variavel select recebe o valor da opçãosalva
window.onload = function () {
    const botaoParametro = document.getElementById("botaoparametrohtml");
    if (botaoParametro) {
        botaoParametro.style.backgroundColor = "#cf0808";
    }
    
    
    const tensao = document.getElementById("tensaoprimaria");
    const tensaoSalva = localStorage.getItem("tensaoSelecionada");

    if (tensaoSalva) {
        tensao.value = tensaoSalva;
    }
//-----------------------------------------------------------------------------------------
    const demanda = document.getElementById("demandaConsumo");
    const demandaSalva = localStorage.getItem("demandaSelecionada");
    if (demandaSalva) {
        demanda.value = demandaSalva;
    }
//-----------------------------------------------------------------------------------------
    const fatorp = document.getElementById("fatorPotencia");
    const fatorpSalva = localStorage.getItem("fatorPotenciaSelecionada");
    if (fatorpSalva) {
        fatorp.value = fatorpSalva*100;
    }
//-----------------------------------------------------------------------------------------
    const desequilibrio = document.getElementById("desequilibrio");
    const desequilibrioSalva = localStorage.getItem("desequilibrioSelecionada");
    if (desequilibrioSalva) {
        desequilibrio.value = desequilibrioSalva;
    }
//-----------------------------------------------------------------------------------------
    const curto = document.getElementById("icctrifasica");
    const curtoSalva = localStorage.getItem("curtoSelecionada");
    if (curtoSalva) {
        curto.value = curtoSalva;
    }
//-----------------------------------------------------------------------------------------
    const TC = document.getElementById("tcdeProtecao");
    const TCSalva = localStorage.getItem("TCdeprotecaoSelecionada");
    if (TCSalva) {
        TC.value = TCSalva;
    }
//-----------------------------------------------------------------------------------------
// Recupera o valor do RTCselecionado do localStorage e define no campo correspondente
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



    //Exibir valor do TC ideal no HTML

// Recupera o valor do TC ideal do localStorage e exibe no elemento HTML
const valorTCSelecionado = localStorage.getItem("valorTCideal");
let tcProtecaoIdeal = document.getElementById("tcdeProtecaoideal");
if (tcProtecaoIdeal) {
    tcProtecaoIdeal.textContent = valorTCSelecionado !== null ? valorTCSelecionado + " :5" : "";
}




//Recupera o valor da potência mínima do localStorage e exibe no elemento HTML
const potenciaMinimaSelecionada = localStorage.getItem("potenciaMinimaSelecionada");
let potenciaMinimaElement = document.getElementById("potenciaMinimahtml");
if (potenciaMinimaElement) {
    potenciaMinimaElement.textContent = potenciaMinimaSelecionada !== null ? potenciaMinimaSelecionada + " kW" : "";
}


}


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