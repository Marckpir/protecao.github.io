let kva1formatada = 0;
let qtde1formatada = 0;
let imin1formatada = 0;
let intrafo1formatada = 0;
let imagtr1formatada = 0;

let kva2formatada = 0;
let qtde2formatada = 0;
let imin2formatada = 0;
let intrafo2formatada = 0;
let imagtr2formatada = 0;


let imagtotalformatada = 0;
let imagtotalneutroformatada = 0;
//------------------------------------------------------------------
function salvarOpcao() {

    //Armazenar todas as potencias em KVA em variaveis formator JSON e no localstorage
    for (let i = 1; i <= 10; i++) {
        const trafo = {
            potencia: document.getElementById(`potenciahtml${i}`)?.value || "",
            qtde: document.getElementById(`qtdehtml${i}`)?.value || "",
            z: document.getElementById(`impedanciahtml${i}`)?.value || "",
            imin: document.getElementById(`fatoriminhtml${i}`)?.value || "",
            tempo: document.getElementById(`tempotrhtml${i}`)?.value || ""
        };
        localStorage.setItem(`trafo${i}JSON`, JSON.stringify(trafo));
    }

    //Armazenar informações de input do gerador no formato JSON e armazenar no local storage
    const potenciagerador = document.getElementById("potenciageradorhtml")?.value || "";
    const fatorpotenciagerador = document.getElementById("fatorpotenciageradorhtml")?.value || "";
    const toleranciagerador = document.getElementById("toleranciageradorhtml")?.value || "";

    const gerador = {
        potencia: potenciagerador,
        fatorpotencia: fatorpotenciagerador,
        tolerancia: toleranciagerador
    };

    localStorage.setItem("geradorJSON", JSON.stringify(gerador));





    // Armazenar informações de input do motor no formato JSON e armazenar no local storage
    const potenciaOperanteMotor = document.getElementById("potenciaoperantemotorhtml")?.value || 0;
    const correntePartidaMotor = document.getElementById("correntepartidamotorhtml")?.value || 0;
    const tempoPartidaMotor = document.getElementById("tempopartidamotorhtml")?.value || 0;

    const motor = {
        potenciaoperante: potenciaOperanteMotor,
        correntepartida: correntePartidaMotor,
        tempopartida: tempoPartidaMotor
    };


    console.log("i motor localstorage:" + motor);




    localStorage.setItem("motorJSON", JSON.stringify(motor));

    console.log("Motor armazenado:", motor);

    const tensaoArmazenada = parseFloat(localStorage.getItem("tensaoSelecionada")) || 1;
    const fatordePotencia = parseFloat(localStorage.getItem("fatorPotenciaSelecionada")) || 1;
    const correntemotor = parseFloat(correntePartidaMotor);



    const correnteoperantemotor = potenciaOperanteMotor / (tensaoArmazenada * Math.sqrt(3) * fatordePotencia);
    // console.log("i maior corrente motor localstorage:"+ correntePartidaMotor);
    // console.log("i maior corrente motor localstorage:"+ correnteoperantemotor);
    // if (correntemotor !== null && correnteoperantemotor !== null){
    let maiorValor = correntemotor + correnteoperantemotor;

    console.log("potencia operante:" + potenciaOperanteMotor);
    console.log("tensao operante:" + tensaoArmazenada);
    console.log("fp operante:" + fatordePotencia);
    

    localStorage.setItem("maiorCorrenteoperante", maiorValor);


    // }

    console.log("i maior corrente motor localstorage:" + maiorValor);




    location.reload();//recarrega a página sempre que o botão é clicado

}
//---------------------------------------------------------------------------------

//Carregar nos campos do HTML todos os valores calculados e armazenados no local storage
window.onload = function () {
    calculaimagreal();
    calcularEArmazenarIntrafoEImag();
    calculos();
    calculoGerador();

    const botaoParametro = document.getElementById("botaotrafohtml");
    if (botaoParametro) {
        botaoParametro.style.backgroundColor = "#cf0808";
    }
  


    //Manter exibindo as grandezas de input dos trafos no HTML
    for (let i = 1; i <= 10; i++) {
        const trafoSalvo = JSON.parse(localStorage.getItem(`trafo${i}JSON`));
        if (trafoSalvo) {
            if (document.getElementById(`potenciahtml${i}`)) {
                document.getElementById(`potenciahtml${i}`).value = trafoSalvo.potencia || "";
            }
            if (document.getElementById(`qtdehtml${i}`)) {
                document.getElementById(`qtdehtml${i}`).value = trafoSalvo.qtde || "";
            }
            if (document.getElementById(`impedanciahtml${i}`)) {
                document.getElementById(`impedanciahtml${i}`).value = trafoSalvo.z || "";
            }
            if (document.getElementById(`fatoriminhtml${i}`)) {
                document.getElementById(`fatoriminhtml${i}`).value = trafoSalvo.imin || "";
            }
            if (document.getElementById(`tempotrhtml${i}`)) {
                document.getElementById(`tempotrhtml${i}`).value = trafoSalvo.tempo || "";
            }
        }
    }

    //Manter exibindo as correntes calculadas no HTML
    const correntestrafos = JSON.parse(localStorage.getItem("correntestrafosJSON")) || {};

    for (let i = 1; i <= 10; i++) {
        // Exibe In (corrente nominal)
        if (document.getElementById(`intrhtml${i}`) && correntestrafos[`trafo${i}`]) {
            document.getElementById(`intrhtml${i}`).textContent = correntestrafos[`trafo${i}`].intrafo
                ? correntestrafos[`trafo${i}`].intrafoindividual.toFixed(2) + " A"
                : "";
        }
        // Exibe Imag (corrente de magnetização)
        if (document.getElementById(`imagtrhtml${i}`) && correntestrafos[`trafo${i}`]) {
            document.getElementById(`imagtrhtml${i}`).textContent = correntestrafos[`trafo${i}`].imag
                ? correntestrafos[`trafo${i}`].imagindividual.toFixed(2) + " A"
                : "";
        }
    }

    //carregar imag total no HTML
    const label91 = document.getElementById("imagtotal");
    const imagtotalArmazenado = parseFloat(localStorage.getItem("imagtotalSelecionada"));
    if (imagtotalArmazenado) { label91.textContent = imagtotalArmazenado.toFixed(2) + " A"; }



    //carregar imag total do neutro no HTML
    const label92 = document.getElementById("imagtotalneutro");
    const imagtotalneutroArmazenado = parseFloat(localStorage.getItem("imagtotalneutroSelecionada"));
    if (imagtotalneutroArmazenado) { label92.textContent = imagtotalneutroArmazenado.toFixed(2) + " A"; }




    //carregar imag real de fase no HTML
    const labelImagRealFase = document.getElementById("imagrealfase");
    const imagRealFaseArmazenado = parseFloat(localStorage.getItem("inmagrealSelecionada"));
    if (imagRealFaseArmazenado) { labelImagRealFase.textContent = imagRealFaseArmazenado.toFixed(2) + " A"; }

    //carregar inmagreal do neutro no HTML
    const labelInmagrealNeutro = document.getElementById("imagrealneutro");
    const inmagrealneutroArmazenado = parseFloat(localStorage.getItem("inmagrealneutroSelecionada"));
    if (inmagrealneutroArmazenado) { labelInmagrealNeutro.textContent = inmagrealneutroArmazenado.toFixed(2) + " A"; }

    // Exibir valores armazenados do gerador a diesel no HTML
    const geradorSalvo = JSON.parse(localStorage.getItem("geradorJSON"));
    if (geradorSalvo) {
        if (document.getElementById("potenciageradorhtml")) {
            document.getElementById("potenciageradorhtml").value = geradorSalvo.potencia || "";
        }
        if (document.getElementById("fatorpotenciageradorhtml")) {
            document.getElementById("fatorpotenciageradorhtml").value = geradorSalvo.fatorpotencia || "";
        }
        if (document.getElementById("toleranciageradorhtml")) {
            document.getElementById("toleranciageradorhtml").value = geradorSalvo.tolerancia || "";
        }
    }

    const potenciaReversaArmazenada = parseFloat(localStorage.getItem("potenciaReversaGerador"));
    const labelPotenciaReversa = document.getElementById("potenciareversageradorhtml");
    if (labelPotenciaReversa && !isNaN(potenciaReversaArmazenada)) {
        labelPotenciaReversa.textContent = potenciaReversaArmazenada.toFixed(2) + " W";
    }

    // Exibir valores armazenados do motor no HTML
    const motorSalvo = JSON.parse(localStorage.getItem("motorJSON"));
    if (motorSalvo) {
        if (document.getElementById("potenciaoperantemotorhtml")) {
            document.getElementById("potenciaoperantemotorhtml").value = motorSalvo.potenciaoperante || "";
        }
        if (document.getElementById("correntepartidamotorhtml")) {
            document.getElementById("correntepartidamotorhtml").value = motorSalvo.correntepartida || "";
        }
        if (document.getElementById("tempopartidamotorhtml")) {
            document.getElementById("tempopartidamotorhtml").value = motorSalvo.tempopartida || "";
        }
    }

    const correnteoperantelabel = document.getElementById("correntetotalpartidamotorhtml");
    const correnteoperantearmazenada = parseFloat(localStorage.getItem("maiorCorrenteoperante"));
    if (correnteoperantearmazenada) { correnteoperantelabel.textContent = correnteoperantearmazenada.toFixed(2) + " A"; }

    console.log("corrente que esta no lstorage",correnteoperantearmazenada);
}


function calcularEArmazenarIntrafoEImag() {
    const tensaoArmazenada = parseFloat(localStorage.getItem("tensaoSelecionada"));
    let correntestrafosJSON = {};

    for (let i = 1; i <= 10; i++) {
        const trafoSalvo = JSON.parse(localStorage.getItem(`trafo${i}JSON`));
        const potencia = trafoSalvo ? parseFloat(trafoSalvo.potencia) : 0;
        const qtde = trafoSalvo ? parseInt(trafoSalvo.qtde) : 0;
        const imin = trafoSalvo ? parseFloat(trafoSalvo.imin) : 0;
        const intrafoindividual = potencia / (tensaoArmazenada * Math.sqrt(3));
        const intrafo = ((qtde * potencia) / (tensaoArmazenada * Math.sqrt(3)));
        const imag = intrafo * imin;
        const imagindividual = intrafoindividual * imin;

        correntestrafosJSON[`trafo${i}`] = {
            intrafo: isNaN(intrafo) ? 0 : intrafo,
            imag: isNaN(imag) ? 0 : imag,
            intrafoindividual: isNaN(intrafoindividual) ? 0 : intrafoindividual,
            imagindividual: isNaN(imagindividual) ? 0 : imagindividual
        };

        // console.log("Todos os trafos:", correntestrafosJSON);
    }
    localStorage.setItem("correntestrafosJSON", JSON.stringify(correntestrafosJSON));

    //FAZ A EXIBIÇÃO DO VALOR DE CORRENTE TOTAL DA CARGA OPERANTE NA TELA HTML
    
    const somaCorrentePartidaOperante = parseFloat(localStorage.getItem("somaCorrentePartidaOperante")) || 0;
    const campoCorrenteTotal = document.getElementById("correntetotalpartidamotorhtml");
    if (campoCorrenteTotal) {
        campoCorrenteTotal.textContent = somaCorrentePartidaOperante.toFixed(2) + " A";
    }
    
}


function calculos() {
    const tensaoArmazenada = parseFloat(localStorage.getItem("tensaoSelecionada"));
    const desequilibrioSelecionada = parseFloat(localStorage.getItem("desequilibrioSelecionada"));

    let maiorImag = 0;
    let indexMaiorImag = -1;
    let maiorImagIn = 0;
    let maiorImagQtde = 1;

    let somaInTotal = 0;

    // Arrays para armazenar os valores de In, Imag e quantidade de cada trafo
    const inArray = [];
    const imagArray = [];
    const qtdeArray = [];

    // Calcula In, Imag e soma total ponderada pela quantidade
    for (let i = 1; i <= 10; i++) {
        const trafoSalvo = JSON.parse(localStorage.getItem(`trafo${i}JSON`));
        if (trafoSalvo) {
            const potencia = parseFloat(trafoSalvo.potencia) || 0;
            const imin = parseFloat(trafoSalvo.imin) || 0;
            const qtde = parseInt(trafoSalvo.qtde) || 0;
            const intrafo = potencia / (tensaoArmazenada * Math.sqrt(3));
            const imag = intrafo * imin;

            inArray[i] = intrafo;
            imagArray[i] = imag;
            qtdeArray[i] = qtde;

            // Descobre o trafo com maior Imag
            if (imag > maiorImag) {
                maiorImag = imag;
                indexMaiorImag = i;
                maiorImagIn = intrafo;
                maiorImagQtde = qtde;
            }
        } else {
            inArray[i] = 0;
            imagArray[i] = 0;
            qtdeArray[i] = 0;
        }
    }

    // Soma as In dos trafos:
    for (let i = 1; i <= 10; i++) {
        if (i === indexMaiorImag) {
            // Para o trafo de maior Imag, soma (qtde - 1) * In
            somaInTotal += (qtdeArray[i] - 1) * inArray[i];
        } else {
            // Para os demais, soma qtde * In
            somaInTotal += qtdeArray[i] * inArray[i];
        }
    }

    // imagtotalformatada = maior Imag + soma das In dos demais trafos (considerando quantidade)
    imagtotalformatada = maiorImag + somaInTotal;

    // imagtotalneutroformatada = imagtotalformatada * (desequilibrioSelecionada/100)
    imagtotalneutroformatada = imagtotalformatada * (desequilibrioSelecionada / 100);

    // Salva no localStorage
    localStorage.setItem("imagtotalSelecionada", imagtotalformatada);
    localStorage.setItem("imagtotalneutroSelecionada", imagtotalneutroformatada);
}



//Função para calcular a potência reversa do gerador
function calculoGerador() {
    const geradorSalvo = JSON.parse(localStorage.getItem("geradorJSON")) || {};
    const potenciagerador = parseFloat(geradorSalvo.potencia) || 0;
    const fatorpotenciagerador = parseFloat(geradorSalvo.fatorpotencia) || 0;
    const toleranciagerador = parseFloat(geradorSalvo.tolerancia) || 0;

    // Potência reversa = potência * fator de potência * tolerância
    const potenciaReversa = (potenciagerador * 1000) * (fatorpotenciagerador / 100) * (toleranciagerador / 100);

    localStorage.setItem("potenciaReversaGerador", potenciaReversa);

    //EXIBIR VALOR DA CORRENTE TOTAL OPERANTE DO MOTOR



    // Exemplo: exibir no console ou salvar no localStorage
    console.log("Potência reversa do gerador:", potenciaReversa);


}


function calculaimagreal() {

    const ICCselecionada = parseFloat(localStorage.getItem("curtoSelecionada")) || 0;
    const instselecionada = parseFloat(localStorage.getItem("imagtotalSelecionada")) || 0;
    const desequilibrioneutro = parseFloat(localStorage.getItem("desequilibrioSelecionada"));

    const denominador = (1 / ICCselecionada) + (1 / instselecionada);

    const inmagreal = 1 / denominador;

    const inmagrelaneutro = inmagreal * desequilibrioneutro / 100;

    localStorage.setItem("inmagrealSelecionada", inmagreal);
    localStorage.setItem("inmagrealneutroSelecionada", inmagrelaneutro);

    // console.log("imag real:",inmagreal)
    // console.log("imag real neutro:",inmagrelaneutro)


}


