
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

    // // Verifica se a biblioteca html2pdf está carregada
    // // let valorArmazenado = localStorage.getItem('Ipdeconsumo');
    // let valorArmazenado = dados['Ipdeconsumo'];
    // if (valorArmazenado !== null) {
    //     valorArmazenado = parseFloat(valorArmazenado).toFixed(2);

    //     const input = document.getElementById('ajuste-i-partida-fase');
    //     if (input) {
    //         input.textContent = valorArmazenado + " A";
    //     }
    // }

    // Novo trecho para ajuste-tc-abc
    let valorAjusteTc = dados['RTCselecionado'];
    if (valorAjusteTc !== null && valorAjusteTc !== undefined) {
        valorAjusteTc = parseFloat(valorAjusteTc).toFixed(2);

        // Atualiza TODOS os campos com a classe ajuste-tc-abc em todas as tabelas
        document.querySelectorAll('.ajuste-tc-abc').forEach(function(inputTc) {
            inputTc.textContent = valorAjusteTc + "";
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
            el.textContent = dialNeutro;
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


