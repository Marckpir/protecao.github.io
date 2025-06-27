
var dados = {};


function salvarOpcao(){

// importa todas variáveis do localStorage
    //  const dados = {};
    for (let i = 0; i < localStorage.length; i++) {
        const chave = localStorage.key(i);
        let valor = localStorage.getItem(chave);

        // Tenta converter para float, se possível
        if (!isNaN(valor) && valor.trim() !== "") {
            const valorFloat = parseFloat(valor);
            // Se a conversão não resultar em NaN e o valor original não contém letras
            if (!isNaN(valorFloat) && /^[\d\.\-]+$/.test(valor)) {
                valor = valorFloat;
            }
        }
        dados[chave] = valor;
    }
    console.log("Variáveis importadas do localStorage:", dados);
    // return dados;
    
}



window.onload = function () {
        const botaoParametro = document.getElementById("botaotabelarelehtml");
    if (botaoParametro) {
        botaoParametro.style.backgroundColor = "#cf0808";
    }
    salvarOpcao(); // Chama a função para importar as variáveis do localStorage
    // Novo trecho para ajuste-tc-abc
    let valorAjusteTc = dados['RTCselecionado'];
    if (valorAjusteTc !== null && valorAjusteTc !== undefined) {
        valorAjusteTc = parseFloat(valorAjusteTc).toFixed(2);

        // Atualiza TODOS os campos com a classe ajuste-tc-abc em todas as tabelas
        document.querySelectorAll('.ajuste-tc-abc').forEach(function(inputTc) {
            inputTc.textContent = valorAjusteTc + "";
        });
    }

    // Novo trecho para ajuste-tc-protecao
    let valorAjusteTcProtecao = dados['TCdeprotecaoSelecionada'];
    if (valorAjusteTcProtecao !== null && valorAjusteTcProtecao !== undefined) {
        valorAjusteTcProtecao = parseFloat(valorAjusteTcProtecao).toFixed(2);

        // Atualiza TODOS os campos com a classe ajuste-tc-protecao em todas as tabelas
        document.querySelectorAll('.ajuste-tc-protecao').forEach(function(inputTcProt) {
            inputTcProt.textContent = valorAjusteTcProtecao + "";
        });
    }



    // Novo trecho para TPdeprotecaoSelecionada
    let valorAjusteTp = dados['TPdeprotecaoSelecionada'];
    if (valorAjusteTp !== null && valorAjusteTp !== undefined) {
        valorAjusteTp = parseFloat(valorAjusteTp).toFixed(2);

        // Atualiza TODOS os campos com a classe ajuste-tp-abc em todas as tabelas
        document.querySelectorAll('.ajuste-tp-abc').forEach(function(inputTp) {
            inputTp.textContent = valorAjusteTp + "";
        });
    }

    // Novo trecho para status-funcao32
    let statusFuncao32 = dados['statusfuncao32diesel'];
    if (statusFuncao32 !== null && statusFuncao32 !== undefined) {
        document.querySelectorAll('.status-funcao32').forEach(function(el) {
            el.textContent = statusFuncao32;
        });
    }
    
    
    // Verifica o status da função 32 e exibe ou oculta os parâmetros correspond
    //foi criada a classe para tr com nome parametrosfuncao32diesel para que seja possível ocultar ou exibir os parâmetros
    // de acordo com o status da função 32
    if (statusFuncao32 === "Desabilitado") {
        document.querySelectorAll('.parametrosfuncao32diesel').forEach(function(row) {
            row.style.display = "none";
        });
    } else {
        document.querySelectorAll('.parametrosfuncao32diesel').forEach(function(row) {
            row.style.display = "";
        });
    }

    // Novo trecho para potencia-reversa-gerador
    let potenciaReversaGerador = dados['potenciareversagerador'];
    if (potenciaReversaGerador !== null && potenciaReversaGerador !== undefined) {
        potenciaReversaGerador = parseFloat(potenciaReversaGerador).toFixed(2);
        document.querySelectorAll('.potencia-reversa-gerador').forEach(function(el) {
            el.textContent = potenciaReversaGerador + " kW";
        });
    }

    // Novo trecho para potencia-diesel-pu
    let potenciaDieselPU = dados['potenciadieselPU'];
    if (potenciaDieselPU !== null && potenciaDieselPU !== undefined) {
        potenciaDieselPU = parseFloat(potenciaDieselPU).toFixed(2) + " x Sn";
        document.querySelectorAll('.potencia-diesel-pu-siemens').forEach(function(el) {
            el.textContent = potenciaDieselPU;
        });
    }



    // Novo trecho para ip de partida
    let valorIpPartida = dados['Ipdeconsumo'];
    if (valorIpPartida !== null && valorIpPartida !== undefined) {
        valorIpPartida = parseFloat(valorIpPartida).toFixed(2);

        // Atualiza TODOS os campos com a classe ip-partida-abc em todas as tabelas
        document.querySelectorAll('.ajuste-i-partida-fase').forEach(function(inputIp) {
            inputIp.textContent = valorIpPartida + " A";
        });
    }

    // Tipo de curva fase
    let tipoCurvaFase = dados['curvafaseSelecionada'];
    if (tipoCurvaFase !== null && tipoCurvaFase !== undefined) {
        document.querySelectorAll('.ajuste-curva-fase').forEach(function(el) {
            el.textContent = tipoCurvaFase;
        });
    }

    // Dial selecionado fase
    let dialFase = dados['dialfaseSelecionada'];
    if (dialFase !== null && dialFase !== undefined) {
        document.querySelectorAll('.ajuste-dt-fase').forEach(function(el) {
            el.textContent = dialFase;
        });
    }

    // I inst fase
    let iInstFase = dados['Instfaseconsumo'];
    if (iInstFase !== null && iInstFase !== undefined) {
        iInstFase = parseFloat(iInstFase).toFixed(2);
        document.querySelectorAll('.ajuste-iinst-fase').forEach(function(el) {
            el.textContent = iInstFase + " A";
        });
    }

    // Ip de neutro
    let ipNeutro = dados['IpdeneutroSelecionada'];
    if (ipNeutro !== null && ipNeutro !== undefined) {
        ipNeutro = parseFloat(ipNeutro).toFixed(2);
        document.querySelectorAll('.ajuste-i-partida-neutro').forEach(function(el) {
            el.textContent = ipNeutro + " A";
        });
    }

    // Curva de neutro
    let curvaNeutro = dados['curvaNeutro'];
    if (curvaNeutro !== null && curvaNeutro !== undefined) {
        document.querySelectorAll('.curva-neutro').forEach(function(el) {
            el.textContent = curvaNeutro;
        });
    }

    // Dial de neutro
    let dialNeutro = dados['dialneutroSelecionada'];
    if (dialNeutro !== null && dialNeutro !== undefined) {
        document.querySelectorAll('.ajuste-dt-neutro').forEach(function(el) {
            el.textContent = dialNeutro + " s";
        });
    }

        // Tempo definido de neutro
    let tempoDefinidoNeutro = dados['tdefneutroSelecionada'];
    if (tempoDefinidoNeutro !== null && tempoDefinidoNeutro !== undefined) {
        tempoDefinidoNeutro = parseFloat(tempoDefinidoNeutro).toFixed(2);
        document.querySelectorAll('.ajuste-tdef-neutro').forEach(function(el) {
            el.textContent = tempoDefinidoNeutro + " s";
        });
    }
    // Inst de neutro
    let instNeutro = dados['IinstneutroSelecionada'];
    if (instNeutro !== null && instNeutro !== undefined) {
        instNeutro = parseFloat(instNeutro).toFixed(2);
        document.querySelectorAll('.ajuste-iinst-neutro').forEach(function(el) {
            el.textContent = instNeutro + " A";
        });
    }

    // Ip PU Selecionada
    let ipPU = dados['ipPUSelecionada'];
    if (ipPU !== null && ipPU !== undefined) {
        ipPU = parseFloat(ipPU).toFixed(2) + " x In";
        document.querySelectorAll('.ajuste-ip-pu').forEach(function(el) {
            el.textContent = ipPU;
        });
    }

    // Iinst PU Selecionada
    let iinstPU = dados['iinstPUSelecionada'];
    if (iinstPU !== null && iinstPU !== undefined) {
        iinstPU = parseFloat(iinstPU).toFixed(2) + " x In";
        document.querySelectorAll('.ajuste-iinst-pu').forEach(function(el) {
            el.textContent = iinstPU;
        });
    }

    // Ip Neutro PU Selecionada
    let ipneutroPU = dados['ipneutroPUSelecionada'];
    if (ipneutroPU !== null && ipneutroPU !== undefined) {
        ipneutroPU = parseFloat(ipneutroPU).toFixed(2) + " x In";
        document.querySelectorAll('.ajuste-ipneutro-pu').forEach(function(el) {
            el.textContent = ipneutroPU;
        });
    }

    // Inst Neutro PU Selecionada
    let instneutrouPU = dados['instneutroPUSelecionada'];
    if (instneutrouPU !== null && instneutrouPU !== undefined) {
        instneutrouPU = parseFloat(instneutrouPU).toFixed(2) + " x In";
        document.querySelectorAll('.ajuste-instneutro-pu').forEach(function(el) {
            el.textContent = instneutrouPU;
        });
    }








   
    mostrarTabela();


};



        function mostrarTabela() {
            var seletor = document.getElementById("seletorTabela").value;
            var tabelas = document.querySelectorAll(".tabela");

            tabelas.forEach(tabela => {
                tabela.style.display = "none"; // Oculta todas as tabelas
            });

            var tabelaSelecionada = document.getElementById(seletor);
            if (tabelaSelecionada) {
                tabelaSelecionada.style.display = "block"; // Exibe a tabela selecionada
            }


        }





function baixarPDF() {
    // Verifica se html2pdf está disponível
    if (typeof html2pdf === "undefined") {
        alert("A biblioteca html2pdf não está carregada. Verifique se o script está incluído no HTML.");
        return;
    }
    const seletor = document.getElementById("seletorTabela").value;
    if (!seletor) {
        alert("Selecione uma tabela antes de baixar o PDF.");
        return;
    }
    const tabelaSelecionada = document.getElementById(seletor);
    if (tabelaSelecionada) {
        // Busca o texto do <h2> dentro da tabela selecionada
        let nomeArquivo = "tabela-selecionada.pdf";
        const h2 = tabelaSelecionada.querySelector("h2");
        if (h2 && h2.textContent) {
            // Remove caracteres inválidos para nome de arquivo
            nomeArquivo = h2.textContent.replace(/[\\/:*?"<>|]/g, '').trim() + ".pdf";
        }

        tabelaSelecionada.style.display = "block";
        html2pdf().set({
            margin: [10, 5, 10, 10],
            filename: nomeArquivo,
            image: { type: 'jpeg', quality: 0.99 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
        }).from(tabelaSelecionada).save();
    } else {
        alert("Selecione uma tabela antes de baixar o PDF.");
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