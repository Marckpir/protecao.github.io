






let correnteFormatada = 0;
let Ippercentual = 0;
let Imagpercentual = 0;
let curvafase = 0
let dial = 0;
let alfa1 = 0;
let beta1 = 0;
let k1 = 0;
var tempomagfase = 0.1;

let inominalneutro = 0;
let ipeutropercentual = 0;
let imagpercentualneutro = 0;
let curvaneutro = 0;
let dial2 = 0;
let alfa2 = 0;
let beta2 = 0;
let k2 = 0;


let ipneutro = 0;
let imagneutro = 0;
let Iinstneutro = 0;

var dial_calculado_planta = 0;
var dial_calculado = 0;

// Importa statuslegenda do localStorage ou usa valor padrão
var legenda = localStorage.getItem('statuslegenda') || 'none'; // Variável para controlar a exibição da legenda


//Gravar todas as variaveis escrita no armazenamento do local storage

function salvarOpcao() {


    //Captura dos valores de fase dos campos preenchiveis do HTML 
    const IPpercentual = document.getElementById("IPpercentualhtml");
    const IPpercentualSelecionadaGD = IPpercentual.value;

    const curvafase = document.getElementById("tipodecurvahtml");
    const curvafaseSelecionadaGD = curvafase.value;

    const dialfase = document.getElementById("dialfasehtml");
    const dialfaseSelecionadaGD = dialfase.value;

    // const imagfase = document.getElementById("imagpercentual");
    // const imagpercentualSelecionadaGD = imagfase.value;


    //Captura dos valores de neutro dos campos preenchiveis do HTML 
    const IPpercentualneutro = document.getElementById("IPpercentualneutrohtml");
    const IPpercentualneutroSelecionadaGD = IPpercentualneutro.value;

    const curvaneutro = document.getElementById("tipodecurvaneutrohtml");
    const curvaneutroSelecionadaGD = curvaneutro.value;

    const dialneutro = document.getElementById("curvaneutrohtml");
    const dialneutroSelecionadaGD = dialneutro.value;





    //armazenamento dos valores de fase no local storage
    localStorage.setItem("PercentualIPSelecionadaGD", IPpercentualSelecionadaGD);
    localStorage.setItem("curvafaseSelecionadaGD", curvafaseSelecionadaGD);
    localStorage.setItem("dialfaseSelecionadaGD", dialfaseSelecionadaGD);




    //armazenamento dos valores de neutro no local storage
    localStorage.setItem("PercentualIPneutroSelecionadaGD", IPpercentualneutroSelecionadaGD);
    localStorage.setItem("curvaneutroSelecionadaGD", curvaneutroSelecionadaGD);
    localStorage.setItem("dialneutroSelecionadaGD", dialneutroSelecionadaGD);
    //-----------------------------------------------------------------------------------------


    location.reload();//recarrega a página sempre que o botão é clicado






}

window.onload = function () {
    // -----------------manter o botão vermelho selecionado-------------------
    const botaoParametro = document.getElementById("botaoajustesGDhtml");
    if (botaoParametro) {
        botaoParametro.style.backgroundColor = "#cf0808";
    }









    //Resgata todos os valores do html para as variaveis internas do js e salva nos campos HTML
    const Inominalhtml = document.getElementById("Inominalhtml");
    const IPpercentualhtml = document.getElementById("IPpercentualhtml");
    const IPrealhtml = document.getElementById("IPrealhtml");
    const tipodecurvahtml = document.getElementById("tipodecurvahtml");
    const dialfasehtml = document.getElementById("dialfasehtml");
    // const imagfase = document.getElementById("imagfase");
    // const imagpercentual = document.getElementById("imagpercentual");
    // const imagreal = document.getElementById("imagreal");
    // const imagrealcalculada = document.getElementById("imagrealcalculadahtml");

    // const imagsimuladahtml = document.getElementById("imagsimuladahtml");






    const inominalneutrohtml = document.getElementById("Inominalneutrohtml");
    const IPpercentualneutrohtml = document.getElementById("IPpercentualneutrohtml");
    const IPrealneutrohtml = document.getElementById("IPrealneutrohtml");
    const tipodecurvaneutrohtml = document.getElementById("tipodecurvaneutrohtml");
    const curvaneutrohtml = document.getElementById("curvaneutrohtml");
    // const Imagneutro = document.getElementById("Imagneutro");
    // const Imagneutropercentual = document.getElementById("Imagneutropercentual");
    // const Iinstneutrohtml = document.getElementById("Iinstneutrohtml");




    //Resgata todos os valores de fase do local storage para as variaveis internas do js e salva nos campos HTML
    const tensaoArmazenada = parseFloat(localStorage.getItem("tensaoSelecionada"));
    const potenciaArmazenada = parseFloat(localStorage.getItem("demandaSelecionadaGD"));
    const fatorpArmazenada = parseFloat(localStorage.getItem("fatorPotenciaSelecionadaGD"));
    const Ippercentual = parseFloat(localStorage.getItem("PercentualIPSelecionadaGD"));
    const curvafaseArmazenada = localStorage.getItem("curvafaseSelecionadaGD");
    const dialfaseArmazenada = localStorage.getItem("dialfaseSelecionadaGD");
    // const imagArmazenada = parseFloat(localStorage.getItem("imagtotalSelecionadaGD"));
    // const imagpercentualArmazenada = parseFloat(localStorage.getItem("imagpercentualSelecionadaGD"));
    // const imagsimuladaArmazenada = parseFloat(localStorage.getItem("imagsimuladaSelecionadaGD"));
    // const imagrealcalculadaArmazenada = parseFloat(localStorage.getItem("inmagrealSelecionadaGD"));
    // const ideffaseArmazenada = parseFloat(localStorage.getItem("ideffaseSelecionadaGD"));
    // const tdeffaseArmazenada = parseFloat(localStorage.getItem("tdeffaseSelecionadaGD"));
    // const imagresultanteArmazenada = parseFloat(localStorage.getItem("ImagresultanteGD"));
    const TCdeprotecaoSelecionada = parseFloat(localStorage.getItem("TCdeprotecaoSelecionada"));


    const curtoArmazenada = parseFloat(localStorage.getItem("curtoSelecionada"));
    const desequilibrio = parseFloat(localStorage.getItem("desequilibrioSelecionada"));


    //Resgata todos os valores de neutro do local storage para as variaveis internas do js e salva nos campos HTML

    const ipneutropercentualArmazenada = parseFloat(localStorage.getItem("PercentualIPneutroSelecionadaGD"));
    const curvaneutroArmazenada = localStorage.getItem("curvaneutroSelecionadaGD");
    const dialneutroArmazenada = localStorage.getItem("dialneutroSelecionadaGD");
    // const imagneutroArmazenada = parseFloat(localStorage.getItem("imagneutropercentualSelecionadaGD"));
    // const idefneutroArmazenada = parseFloat(localStorage.getItem("idefneutroSelecionadaGD"));
    // const tdefneutroArmazenada = parseFloat(localStorage.getItem("tdefneutroSelecionadaGD"));








    // -------------------------------------------------------------------------------
    // Calculo da  corrente IP de fase somando a tolerancia a corrente nominal


    //var correnteprimaria = (potenciaArmazenada / (tensaoArmazenada * Math.sqrt(3) * fatorpArmazenada));

    //codigo novo
    const correnteprimaria = parseFloat(localStorage.getItem("InominalfaseGD"));
    console.log("correnteprimaria: ", correnteprimaria);
    //fim do codigo novo


    //----------------------CALCULARIA O MINIMO DE CORRENTE DE CONSUMO PARA O TC DE PROTEÇÃO-----------------------------
    //veifica se inominalDemanda é menor que 10% da corrente de primario do TC de proteção se for o valor é substituido por 10% do TC de proteção
    // let correntedeconsumominima = 0;
    // if (TCdeprotecaoSelecionada) {
    //     correntedeconsumominima = TCdeprotecaoSelecionada * 0.1; // Corrente mínima de consumo em A
    // }


    // let inominalminimaTC; // Variável para armazenar se a corrente nominal de consumo é menor que a mínima
    // if (correnteprimaria < correntedeconsumominima) {
    //     correnteprimaria = correntedeconsumominima;
    //      inominalminimaTC = "Sim";  
    // }else {
    //     inominalminimaTC = "Não";
    // }

    // localStorage.setItem("inominalminimaTC", inominalminimaTC); // Armazena a corrente nominal de consumo no localStorage
    // localStorage.setItem("correntedeconsumominima", correntedeconsumominima);

    // console.log("correntedeconsumominima:", correntedeconsumominima, "inominalDemanda:", correnteprimaria);

    //-----------FIM DO CALCULO DO MINIMO DE CORRENTE DE CONSUMO PARA O TC DE PROTEÇÃO-----------------------------

    var correnteIP = correnteprimaria * (1 + Ippercentual / 100);
    correnteFormatada = correnteIP;


    localStorage.setItem("IpfaseGD", correnteFormatada);

    //retornar isso aqui caso de ruim
    //localStorage.setItem("Inominalfase", correnteprimaria);
    //fim do codigo que foi comentado

    // Calculo da  corrente instantanea de fase somando a tolerancia a corrente de magnetização nominal

    // Calcula Imaginstantanea usando imagsimuladaArmazenada se houver, senão usa imagArmazenada
    // var imagBase = (!isNaN(imagsimuladaArmazenada) && imagsimuladaArmazenada !== null) ? imagsimuladaArmazenada : imagArmazenada;
    // var Imaginstantanea = imagBase * (1 + imagpercentualArmazenada / 100);
    // imagtotalformatada = Imaginstantanea;
    // localStorage.setItem("Instfaseconsumo", imagtotalformatada);
    // localStorage.setItem("Imagresultante", imagBase);

    //Calculo da  corrente nominal de neutro
    inominalneutro = (correnteprimaria * (desequilibrio));
    // Calculo da corrente IP de neutro somando a tolerancia a corrente nominal
    ipneutro = inominalneutro * (1 + ipneutropercentualArmazenada / 100);
    // Armazenando o valor de ipneutro no local storage
    localStorage.setItem("IpdeneutroSelecionadaGD", ipneutro);
    localStorage.setItem("InominalneutroGD", inominalneutro);

    //  Calculo da  corrente de magnetização de neutro 
    // imagneutro = imagBase * (desequilibrio)

    // console.log("imagneutro: " + imagneutro);
    // Calculo da  corrente instantanea de neutro somando a tolerancia a corrente de magnetização nominal
    // Iinstneutro = imagneutro * (1 + imagneutroArmazenada / 100);
    // console.log("inst neutro: " + Iinstneutro);
    // // Armazenando o valor de Iinstneutro no local storage
    // localStorage.setItem("IinstneutroSelecionada", Iinstneutro);

    //---------------------------------------------------------------------------------------
    //CACLULOS PARA VALORES DAS CORRENTE EM P.U
    //importar valor do local storage do TC de proteção selecionado
    const TCselecionado = parseFloat(localStorage.getItem("TCdeprotecaoSelecionada"));

    //Divide valores encontrados por valor primário do TC selecionado
    const ipPU = correnteIP / TCselecionado;
    // const iinstPU = Imaginstantanea / TCselecionado;
    const ipneutroPU = ipneutro / TCselecionado;
    // const instneutroPU = Iinstneutro / TCselecionado;

    //Armazena os valores de P.U no local storage
    localStorage.setItem("ipPUSelecionadaGD", ipPU);
    // localStorage.setItem("iinstPUSelecionadaGD", iinstPU);
    localStorage.setItem("ipneutroPUSelecionadaGD", ipneutroPU);
    // localStorage.setItem("instneutroPUSelecionadaGD", instneutroPU);



    //alimenta todos os campos da tela com os valores do local storage diretamente no HTML

    Inominalhtml.textContent = correnteprimaria.toFixed(2) + " A";
    IPpercentualhtml.value = Ippercentual;
    IPrealhtml.textContent = correnteFormatada.toFixed(2) + " A";
    tipodecurvahtml.value = curvafaseArmazenada;
    dialfasehtml.value = dialfaseArmazenada;
    // imagfase.textContent = imagresultanteArmazenada.toFixed(2) + " A";
    // imagpercentual.value = imagpercentualArmazenada;
    // imagreal.textContent = imagtotalformatada.toFixed(2) + " A";
    // imagrealcalculada.textContent = imagrealcalculadaArmazenada.toFixed(2) + " A";
    // imagsimuladahtml.value = imagsimuladaArmazenada;
    // ideffasehtml.value = ideffaseArmazenada;
    // tdeffasehtml.value = tdeffaseArmazenada;

    inominalneutrohtml.textContent = inominalneutro.toFixed(2) + " A";
    IPpercentualneutrohtml.value = ipneutropercentualArmazenada;
    IPrealneutrohtml.textContent = ipneutro.toFixed(2) + " A";
    tipodecurvaneutrohtml.value = curvaneutroArmazenada;
    curvaneutrohtml.value = dialneutroArmazenada;
    // Imagneutro.textContent = imagneutro.toFixed(2) + " A";
    // Imagneutropercentual.value = imagneutroArmazenada;
    // Iinstneutrohtml.textContent = Iinstneutro.toFixed(2) + " A";
    // idefneutrohtml.value = idefneutroArmazenada;
    // tdefneutrohtml.value = tdefneutroArmazenada;

    // ...existing code...

    //alimenta todos os campos da tela com os valores do local storage diretamente no HTML

    Inominalhtml.textContent = correnteprimaria.toFixed(2) + " A";

    // Validar antes de definir valores nos campos
    IPpercentualhtml.value = (!isNaN(Ippercentual) && Ippercentual !== null) ? Ippercentual : 0;

    console.log("IPpercentual: ", Ippercentual);

    IPrealhtml.textContent = correnteFormatada.toFixed(2) + " A";
    tipodecurvahtml.value = curvafaseArmazenada || '';

    // Validar dialfaseArmazenada
    dialfasehtml.value = (!isNaN(parseFloat(dialfaseArmazenada)) && dialfaseArmazenada !== null) ? dialfaseArmazenada : '';

    // imagfase.textContent = (!isNaN(imagresultanteArmazenada) && imagresultanteArmazenada !== null) ? imagresultanteArmazenada.toFixed(2) + " A" : "0.00 A";

    // Validar imagpercentualArmazenada
    // imagpercentual.value = (!isNaN(imagpercentualArmazenada) && imagpercentualArmazenada !== null) ? imagpercentualArmazenada : 0;

    // imagreal.textContent = imagtotalformatada.toFixed(2) + " A";
    // imagrealcalculada.textContent = (!isNaN(imagrealcalculadaArmazenada) && imagrealcalculadaArmazenada !== null) ? imagrealcalculadaArmazenada.toFixed(2) + " A" : "0.00 A";

    // // Validar imagsimuladaArmazenada
    // imagsimuladahtml.value = (!isNaN(imagsimuladaArmazenada) && imagsimuladaArmazenada !== null) ? imagsimuladaArmazenada : '';

    // // Validar ideffaseArmazenada e tdeffaseArmazenada
    // ideffasehtml.value = (!isNaN(ideffaseArmazenada) && ideffaseArmazenada !== null) ? ideffaseArmazenada : '';
    // tdeffasehtml.value = (!isNaN(tdeffaseArmazenada) && tdeffaseArmazenada !== null) ? tdeffaseArmazenada : '';

    inominalneutrohtml.textContent = inominalneutro.toFixed(2) + " A";

    // Validar ipneutropercentualArmazenada
    IPpercentualneutrohtml.value = (!isNaN(ipneutropercentualArmazenada) && ipneutropercentualArmazenada !== null) ? ipneutropercentualArmazenada : 0;

    IPrealneutrohtml.textContent = ipneutro.toFixed(2) + " A";
    tipodecurvaneutrohtml.value = curvaneutroArmazenada || '';

    // Validar dialneutroArmazenada
    curvaneutrohtml.value = (!isNaN(parseFloat(dialneutroArmazenada)) && dialneutroArmazenada !== null) ? dialneutroArmazenada : '';

    // Imagneutro.textContent = imagneutro.toFixed(2) + " A";

    // // Validar imagneutroArmazenada
    // Imagneutropercentual.value = (!isNaN(imagneutroArmazenada) && imagneutroArmazenada !== null) ? imagneutroArmazenada : 0;

    // Iinstneutrohtml.textContent = Iinstneutro.toFixed(2) + " A";

    // // Validar idefneutroArmazenada e tdefneutroArmazenada
    // idefneutrohtml.value = (!isNaN(idefneutroArmazenada) && idefneutroArmazenada !== null) ? idefneutroArmazenada : '';
    // tdefneutrohtml.value = (!isNaN(tdefneutroArmazenada) && tdefneutroArmazenada !== null) ? tdefneutroArmazenada : '';

    // ...existing code...



    // Atualização dos valores de P.U na tela
    const ipPUhtml = document.getElementById("IpPUhtml");
    ipPUhtml.textContent = ipPU.toFixed(2) + " P.U";

    // const iinstPUhtml = document.getElementById("iinstPUhtml");
    // iinstPUhtml.textContent = iinstPU.toFixed(2) + " P.U";

    const ipneutroPUhtml = document.getElementById("ipneutroPUhtml");
    ipneutroPUhtml.textContent = ipneutroPU.toFixed(2) + " P.U";

    // const iinstneutroPUhtml = document.getElementById("iinstneutroPUhtml");
    // iinstneutroPUhtml.textContent = instneutroPU.toFixed(2) + " P.U";

    //----------------------------------------------atualização de valores na tela da tabela
    const pencentualIP = document.getElementById("IPpercentualhtml");
    const percentualIPSalva = localStorage.getItem("PercentualIPSelecionadaGD");

    if (percentualIPSalva) {
        pencentualIP.value = percentualIPSalva;
    }
    //--------------------------------------------------------------------------------------




    //    console.log(correnteFormatada);
    // Definição do tipo de curva de fase 

    curvafase = curvafaseArmazenada;

    switch (curvafase) {

        case "IEC-N.I":
            alfa1 = 0.02;
            beta1 = 0.14;
            k1 = 1;
            break;

        case "IEC-V.I":
            alfa1 = 1;
            beta1 = 13.5;
            k1 = 1;
            break;

        case "IEC-E.I":
            alfa1 = 2;
            beta1 = 80;
            k1 = 1;
            break;

        case "LONG":
            alfa1 = 1;
            beta1 = 80;
            k1 = 1;
            break;

        case "Definite-Time":
            alfa1 = 0;
            beta1 = 1;
            k1 = 0;
            break;


        default:
            alfa1 = 0;
            beta1 = 0;
            k1 = 0;
            break;


    }

    const dadosCurvaUsuarioFase = {
        tipoCurva: curvafaseArmazenada,
        dial: dialfaseArmazenada,
        alfa: alfa1,
        beta: beta1,
        k: k1
    };
    localStorage.setItem("dadoscurvausariofase", JSON.stringify(dadosCurvaUsuarioFase));

    curvaneutro = curvaneutroArmazenada;

    switch (curvaneutro) {

        case "IEC-N.I":
            alfa2 = 0.02;
            beta2 = 0.14;
            k2 = 1;
            break;

        case "IEC-V.I":
            alfa2 = 1;
            beta2 = 13.5;
            k2 = 1;
            break;

        case "IEC-E.I":
            alfa2 = 2;
            beta2 = 80;
            k2 = 1;
            break;

        case "LONG":
            alfa2 = 1;
            beta2 = 80;
            k2 = 1;
            break;

        case "Definite-Time":
            alfa2 = 0;
            beta2 = 1;
            k2 = 0;
            break;

        default:
            alfa2 = 0;
            beta2 = 0;
            k2 = 0;
            break;
    }


    //------------------------------------------------------------------
    // Reprodução das variaveis no gráfico de coordenação
    // Definição das variáveis comuns
    let dial1 = dialfaseArmazenada;

    let ip1 = correnteFormatada;
    iccGD = ip1 * (Math.sqrt((dial1 * beta1 + k1) / 0.01));
    let Iinst1 = iccGD;
    let x1 = [iccGD];
    let y1 = [0.01];
    let ideffase = 10000;
    let tdeffase = 10000;

    console.log("ip1: ", ip1);
    console.log("dial1: ", dial1);
    console.log("beta1: ", beta1);
    console.log("k1: ", k1);

    console.log("ICC GD: ", iccGD);


    let passo1 = (Iinst1 - ip1) / 1000;

    for (let i = 0; Iinst1 >= ip1; i++) {
        const idefValido = !isNaN(ideffase) && ideffase !== null && ideffase !== undefined;
        const tdefValido = !isNaN(tdeffase) && tdeffase !== null && tdeffase !== undefined;

        let z1 = dial1 * (beta1 / (Math.pow(Iinst1 / ip1, alfa1) - k1));
        let tempo = z1;

        // Se idef e tdef são válidos, e estamos na região <= ideffase, pega o menor entre z1 e tdeffase
        if (idefValido && tdefValido && Iinst1 >= ideffase) {
            tempo = Math.min(tempo, tdeffase);
        }

        x1.push(Iinst1);
        y1.push(tempo);




        Iinst1 -= passo1;
        if (Iinst1 <= (ip1 - 0.9)) {
            // Garante o último ponto em ip1
            x1.push(ip1);
            let z1final = dial1 * (beta1 / (Math.pow(ip1 / ip1, alfa1) - k1));
            let tempofinal = Math.min(z1final, 1000);
            if (idefValido && tdefValido && ip1 <= ideffase) {
                tempofinal = Math.min(tempofinal, tdeffase);
            }
            y1.push(tempofinal);
            break;
        }
    }
    if (y1[y1.length - 1] !== 1000) {
        x1.push(ip1);
        y1.push(1000);
    }



    // Segunda curva
    // Definição das variáveis comuns
    let dial2 = dialneutroArmazenada;
    let Iinst2 = 30000;
    let ip2 = ipneutro;
    let x2 = [10000];
    let y2 = [0.01];
    let idefneutro = 30000;
    let tdefneutro = 1000;




    let passo2 = (Iinst2 - ip2) / 1000;
    // Se dial2 não tiver valor, considera 1000
    if (!dial2 || isNaN(dial2)) {
        dial2 = 1000;
    }

    for (let i = 0; Iinst2 >= ip2; i++) {
        const idefValidoNeutro = !isNaN(idefneutro) && idefneutro !== null && idefneutro !== undefined;
        const tdefValidoNeutro = !isNaN(tdefneutro) && tdefneutro !== null && tdefneutro !== undefined;

        let z2 = dial2 * (beta2 / (Math.pow(Iinst2 / ip2, alfa2) - k2));
        let tempo2 = z2;

        // Se idef e tdef são válidos, e estamos na região <= idefneutro, pega o menor entre z2 e tdefneutro
        if (idefValidoNeutro && tdefValidoNeutro && Iinst2 >= idefneutro) {
            tempo2 = Math.min(tempo2, tdefneutro);
        }

        x2.push(Iinst2);
        y2.push(tempo2);

        Iinst2 -= passo2;
        if (Iinst2 <= (ip2)) {
            // Garante o último ponto em ip2
            x2.push(ip2);
            let z2final = dial2 * (beta2 / (Math.pow(ip2 / ip2, alfa2) - k2));
            let tempofinal2 = Math.min(z2final, 1000);
            if (idefValidoNeutro && tdefValidoNeutro && ip2 <= idefneutro) {
                tempofinal2 = Math.min(tempofinal2, tdefneutro);
            }
            y2.push(tempofinal2);
            break;
        }
    }
    if (y2[y2.length - 1] !== 1000) {
        x2.push(ip2);
        y2.push(1000);
    }

    // Armazena os pontos x e y de fase e neutro no localStorage separadamente em formato JSON
    localStorage.setItem("pontosCurvaFaseX", JSON.stringify(x1));
    localStorage.setItem("pontosCurvaFaseY", JSON.stringify(y1));
    localStorage.setItem("pontosCurvaNeutroX", JSON.stringify(x2));
    localStorage.setItem("pontosCurvaNeutroY", JSON.stringify(y2));




    // Exibe no console todas as informações de correntestrafosJSON, se houver
    const correntesTrafos = JSON.parse(localStorage.getItem("correntestrafosJSON"));







    // ------

    // Configuração do gráfico logarítmico

    let ctx = document.getElementById('grafico').getContext('2d');


    let grafico = new Chart(ctx, {
        type: 'line',
        data: {
            datasets: [
                {
                    label: 'Curva 67 fase injeção ',
                    data: x1.map((val, index) => ({ x: val, y: y1[index] })),
                    borderColor: 'red',
                    borderWidth: 2,
                    pointRadius: 0
                },
                {
                    label: 'Curva 67N neutro injeção',
                    data: x2.map((val, index) => ({ x: val, y: y2[index] })),
                    borderColor: 'blue',
                    borderWidth: 2,
                    pointRadius: 0
                },
                {
                    label: 'I nominal fase' + (isNaN(correnteprimaria) ? '' : ' (' + correnteprimaria.toFixed(2) + ' A)'),

                    data: [{ x: correnteprimaria, y: 0.01 }],
                    backgroundColor: 'red',
                    borderColor: 'red',
                    borderWidth: 2,
                    pointRadius: 4,
                    pointStyle: 'triangle',
                    showLine: false // só o ponto, sem linha
                },
                {
                    label: 'I nominal fase' ,

                    data: [
                        { x: correnteprimaria, y: 0.01 },
                        { x: correnteprimaria, y: 1000 }
                    ],
                    borderColor: 'red',
                    borderWidth: 2,
                    borderDash: [10, 5],
                    pointRadius: 0,
                    fill: false,
                    showLine: true
                },
                {
                    label: 'I nominal neutro' + (isNaN(inominalneutro) ? '' : ' (' + inominalneutro.toFixed(2) + ' A)'),
                    data: [{ x: inominalneutro, y: 0.01 }],
                    backgroundColor: 'blue',
                    borderColor: 'blue',
                    borderWidth: 2,
                    pointRadius: 4,
                    pointStyle: 'triangle',
                    showLine: false // só o ponto, sem linha
                },
                {
                    label: 'I nominal neutro',
                    data: [
                        { x: inominalneutro, y: 0.01 },
                        { x: inominalneutro, y: 1000 }
                    ],
                    borderColor: 'blue',
                    borderWidth: 2,
                    borderDash: [10, 5],
                    pointRadius: 0,
                    fill: false,
                    showLine: true
                },
                {
                    label: 'I Ip fase'+ (isNaN(ip1) ? '' : ' (' + ip1.toFixed(2) + ' A)'),
                    data: [{ x: ip1, y: 0.01 }],
                    backgroundColor: 'red',
                    borderColor: 'red',
                    borderWidth: 2,
                    pointRadius: 4,
                    pointStyle: 'triangle',
                    showLine: false // só o ponto, sem linha
                },
                {
                    label: 'I Ip neutro' + (isNaN(ip2) ? '' : ' (' + ip2.toFixed(2) + ' A)'),
                    data: [{ x: ip2, y: 0.01 }],
                    backgroundColor: 'blue',
                    borderColor: 'blue',
                    borderWidth: 2,
                    pointRadius: 4,
                    pointStyle: 'triangle',
                    showLine: false // só o ponto, sem linha
                },
                // {
                //     label: 'I iinst fase',
                //     data: [{ x: null, y: null }],
                //     backgroundColor: 'red',
                //     borderColor: 'red',
                //     borderWidth: 2,
                //     pointRadius: 4,
                //     pointStyle: 'triangle',
                //     showLine: false // só o ponto, sem linha
                // },
                // {
                //     label: 'I inst neutro',
                //     data: [{ x: null, y: null }],
                //     backgroundColor: 'blue',
                //     borderColor: 'blue',
                //     borderWidth: 2,
                //     pointRadius: 4,
                //     pointStyle: 'triangle',
                //     showLine: false // só o ponto, sem linha
                // },
                // {
                //     label: 'I mag fase',
                //     data: [{ x: null, y: null }],
                //     backgroundColor: 'red',
                //     borderColor: 'red',
                //     borderWidth: 2,
                //     pointRadius: 4,
                //     pointStyle: 'circle',
                //     showLine: false // só o ponto, sem linha
                // },
                // {
                //     label: 'I mag neutro',
                //     data: [{ x: null, y: null }],
                //     backgroundColor: 'blue',
                //     borderColor: 'blue',
                //     borderWidth: 2,
                //     pointRadius: 4,
                //     pointStyle: 'circle',
                //     showLine: false // só o ponto, sem linha
                // },
                // {
                //     label: 'Partida motor+carga operante',
                //     data: [{
                //         x: null,
                //         y: null

                //     }],
                //     backgroundColor: 'green',
                //     borderColor: 'green',
                //     borderWidth: 2,
                //     pointRadius: 4,
                //     pointStyle: 'rect',
                //     showLine: false // só o ponto, sem linha
                // },
                // {
                //     label: 'ICC Trifásica',
                //     data: [{ x: null, y: null }],
                //     backgroundColor: 'black',
                //     borderColor: 'black',
                //     borderWidth: 2,
                //     pointRadius: 4,
                //     pointStyle: 'star',
                //     showLine: false // só o ponto, sem linha
                // },
                // // Linha pontilhada vertical de curtoArmazenada até y=1000
                // {
                //     label: 'Curto Circuito',
                //     data: [
                //         { x: null, y: null },
                //         { x: null, y: null }
                //     ],
                //     borderColor: 'black',
                //     borderWidth: 2,
                //     borderDash: [10, 5],
                //     pointRadius: 0,
                //     fill: false,
                //     showLine: true
                // },
                // I ANSI pontos
                //                 {
                //                     label: 'I ANSI 1',
                //                     data: [
                //                         { x: null, y: null }
                //                     ],
                //                     backgroundColor: 'orange',
                //                     borderColor: 'red',
                //                     borderWidth: 2,
                //                     pointRadius: 5,
                //                     pointStyle: 'triangle',
                //                     showLine: false
                //                 },
                //                 {
                //                     label: 'I ANSI 2',
                //                     data: [
                //                         { x: null, y: null }
                //                     ],
                //                     backgroundColor: 'orange',
                //                     borderColor: 'blue',
                //                     borderWidth: 2,
                //                     pointRadius: 5,
                //                     pointStyle: 'triangle',
                //                     showLine: false
                //                 },
                //                 {
                //                     label: 'I ANSI 3',
                //                     data: [
                //                         { x: null, y: null }
                //                     ],
                //                     backgroundColor: 'orange',
                //                     borderColor: 'green',
                //                     borderWidth: 2,
                //                     pointRadius: 5,
                //                     pointStyle: 'triangle',
                //                     showLine: false
                //                 },
                //                 {
                //                     label: 'I ANSI 4',
                //                     data: [
                //                         { x: null, y: null }
                //                     ],
                //                     backgroundColor: 'orange',
                //                     borderColor: 'purple',
                //                     borderWidth: 2,
                //                     pointRadius: 5,
                //                     pointStyle: 'triangle',
                //                     showLine: false
                //                 },
                //                 {
                //                     label: 'I ANSI 5',
                //                     data: [
                //                         { x: null, y: null }
                //                     ],
                //                     backgroundColor: 'orange',
                //                     borderColor: 'brown',
                //                     borderWidth: 2,
                //                     pointRadius: 5,
                //                     pointStyle: 'triangle',
                //                     showLine: false
                //                 },
                //                 {
                //                     label: 'I ANSI 6',
                //                     data: [
                //                         { x: null, y: null }
                //                     ],
                //                     backgroundColor: 'orange',
                //                     borderColor: 'pink',
                //                     borderWidth: 2,
                //                     pointRadius: 5,
                //                     pointStyle: 'triangle',
                //                     showLine: false
                //                 },
                //                 {
                //                     label: 'I ANSI 7',
                //                     data: [
                //                         { x: null, y: null }
                //                     ],
                //                     backgroundColor: 'orange',
                //                     borderColor: 'cyan',
                //                     borderWidth: 2,
                //                     pointRadius: 5,
                //                     pointStyle: 'triangle',
                //                     showLine: false
                //                 },
                //                 {
                //                     label: 'I ANSI 8',
                //                     data: [
                //                         { x: null, y: null }
                //                     ],
                //                     backgroundColor: 'orange',
                //                     borderColor: 'magenta',
                //                     borderWidth: 2,
                //                     pointRadius: 5,
                //                     pointStyle: 'triangle',
                //                     showLine: false
                //                 },
                //                 {
                //                     label: 'I ANSI 9',
                //                     data: [
                //                         { x: null, y: null }
                //                     ],
                //                     backgroundColor: 'orange',
                //                     borderColor: 'gray',
                //                     borderWidth: 2,
                //                     pointRadius: 5,
                //                     pointStyle: 'triangle',
                //                     showLine: false
                //                 },
                //                 {
                //                     label: 'I ANSI 10',
                //                     data: [
                //                         { x: null, y: null }
                //                     ],
                //                     backgroundColor: 'orange',
                //                     borderColor: 'black',
                //                     borderWidth: 2,
                //                     pointRadius: 5,
                //                     pointStyle: 'triangle',
                //                     showLine: false
                //                 },
                //                 // I NANSI pontos
                //                 {
                //                     label: 'I NANSI 1',
                //                     data: [
                //                         { x: null, y: null }
                //                     ],
                //                     backgroundColor: 'yellow',
                //                     borderColor: 'red',
                //                     borderWidth: 2,
                //                     pointRadius: 5,
                //                     pointStyle: 'rectRot',
                //                     showLine: false
                //                 },
                //                 {
                //                     label: 'I NANSI 2',
                //                     data: [
                // { x: null, y: null }                    ],
                //                     backgroundColor: 'yellow',
                //                     borderColor: 'blue',
                //                     borderWidth: 2,
                //                     pointRadius: 5,
                //                     pointStyle: 'rectRot',
                //                     showLine: false
                //                 },
                //                 {
                //                     label: 'I NANSI 3',
                //                     data: [
                // { x: null, y: null }                    ],
                //                     backgroundColor: 'yellow',
                //                     borderColor: 'green',
                //                     borderWidth: 2,
                //                     pointRadius: 5,
                //                     pointStyle: 'rectRot',
                //                     showLine: false
                //                 },
                //                 {
                //                     label: 'I NANSI 4',
                //                     data: [
                //                         { x: null, y: null }
                //                     ],
                //                     backgroundColor: 'yellow',
                //                     borderColor: 'purple',
                //                     borderWidth: 2,
                //                     pointRadius: 5,
                //                     pointStyle: 'rectRot',
                //                     showLine: false
                //                 },
                //                 {
                //                     label: 'I NANSI 5',
                //                     data: [
                //                         { x: null, y: null }
                //                     ],
                //                     backgroundColor: 'yellow',
                //                     borderColor: 'brown',
                //                     borderWidth: 2,
                //                     pointRadius: 5,
                //                     pointStyle: 'rectRot',
                //                     showLine: false
                //                 },
                //                 {
                //                     label: 'I NANSI 6',
                //                     data: [
                //                         { x: null, y: null }
                //                     ],
                //                     backgroundColor: 'yellow',
                //                     borderColor: 'pink',
                //                     borderWidth: 2,
                //                     pointRadius: 5,
                //                     pointStyle: 'rectRot',
                //                     showLine: false
                //                 },
                //                 {
                //                     label: 'I NANSI 7',
                //                     data: [
                //                         { x: null, y: null }
                //                     ],
                //                     backgroundColor: 'yellow',
                //                     borderColor: 'cyan',
                //                     borderWidth: 2,
                //                     pointRadius: 5,
                //                     pointStyle: 'rectRot',
                //                     showLine: false
                //                 },
                //                 {
                //                     label: 'I NANSI 8',
                //                     data: [
                //                         { x: null, y: null }
                //                     ],
                //                     backgroundColor: 'yellow',
                //                     borderColor: 'magenta',
                //                     borderWidth: 2,
                //                     pointRadius: 5,
                //                     pointStyle: 'rectRot',
                //                     showLine: false
                //                 },
                //                 {
                //                     label: 'I NANSI 9',
                //                     data: [
                //                         { x: null, y: null }
                //                     ],
                //                     backgroundColor: 'yellow',
                //                     borderColor: 'gray',
                //                     borderWidth: 2,
                //                     pointRadius: 5,
                //                     pointStyle: 'rectRot',
                //                     showLine: false
                //                 },
                //                 {
                //                     label: 'I NANSI 10',
                //                     data: [
                //                         { x: null, y: null }
                //                     ],
                //                     backgroundColor: 'yellow',
                //                     borderColor: 'black',
                //                     borderWidth: 2,
                //                     pointRadius: 5,
                //                     pointStyle: 'rectRot',
                //                     showLine: false
                //                 },


            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: legenda // <-- Define se aparece legenda(top,bottom,left,right ou none)
                }
            },
            scales: {
                x: {
                    type: 'logarithmic',
                    title: { display: true, text: 'Corrente (A)' },
                    min: 1,
                    max: iccGD + 1000,
                    grid: {
                        display: true,
                        // Ativa linhas principais
                        color: 'rgba(0,0,0,0.1)',
                        // Ativa linhas secundárias (menores)
                        drawTicks: true,
                        borderDash: [2, 2],
                        // Configura as linhas secundárias
                        minor: {
                            display: true,
                            color: 'rgba(0,0,0,0.05)', // cor mais clara para secundárias
                            borderDash: [1, 1]
                        }
                    }
                },
                y: {
                    type: 'logarithmic',
                    title: { display: true, text: 'Tempo (s)' },
                    min: 0.01,
                    max: 1000,

                    grid: {
                        display: true,
                        // Ativa linhas principais
                        color: 'rgba(0,0,0,0.1)',
                        // Ativa linhas secundárias (menores)
                        drawTicks: true,
                        borderDash: [2, 2],
                        // Configura as linhas secundárias
                        minor: {
                            display: true,
                            color: 'rgba(0,0,0,0.05)', // cor mais clara para secundárias
                            borderDash: [1, 1]
                        }
                    }
                }
            }
        }
    });

    // Salva a imagem do gráfico no localStorage
    // setTimeout(() => {
    //     try {
    //         const graficoCanvas = document.getElementById('grafico');
    //         const graficoImg = graficoCanvas.toDataURL('image/png');
    //         localStorage.setItem('graficoImagem', graficoImg);
    //     } catch (e) {
    //         console.error('Erro ao salvar imagem do gráfico:', e);
    //     }
    // }, 500);

    //Mantem exibindo o dial ideal no HTML 
    // const dialIdealTag = document.getElementById("dialideal");



    // calculadialideal();

    // if (!isNaN(dial_calculado) && !isNaN(dial_calculado_planta)) {
    //     let maiorDial = Math.max(dial_calculado, dial_calculado_planta);
    //     if (dialIdealTag) {
    //         dialIdealTag.textContent = maiorDial.toFixed(2);
    //     }
    // }


    // verificarAlertaPotMinima();
};


//função para comparar o melhor dial entre planta com motor e sem motor 



// Função para ativar as legendas do gráfico
function ativarLegendas() {

    const statuslegenda = (legenda === 'none') ? 'bottom' : 'none';

    localStorage.setItem('statuslegenda', statuslegenda);

    location.reload();
}


// Função para gerar alerta dos 10% do primario do TC de proteção

// function verificarAlertaPotMinima() {
//     const status = localStorage.getItem("inominalminimaTC");
//     const alertaDiv = document.querySelector(".alertapotminima");
//     if (status) {
//         if (status === "Sim") {
//             alertaDiv.style.display = "";
//             // Adiciona classe para piscar lentamente
//             alertaDiv.classList.add("piscando-lento");
//         } else {
//             alertaDiv.style.display = "none";
//             alertaDiv.classList.remove("piscando-lento");
//         }
//     }
// }

// Adicione este CSS ao seu arquivo ou dentro de uma <style> no HTML:
/*
.piscando-lento {
    animation: piscarLento 1.5s infinite;
}
@keyframes piscarLento {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.3; }
}
*/

// Chame a função ao carregar a página






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
