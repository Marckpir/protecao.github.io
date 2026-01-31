
var dados = {};


function importadadoslocalstorage() {

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


function carregarAssuntos() {
    const seletor = document.getElementById("seletorTabela");
    if (!seletor) return;

    seletor.innerHTML = "";

    const tabelas = document.querySelectorAll(".tabela");

    // Valor de referência do número (24)
    const numeroReferencia = 100;

    // Verifica se existe valor em potenciaGDSelecionada no localStorage
    const potenciaGD = localStorage.getItem('potenciaGDcontratada');
    const filtrar24 = potenciaGD !== null && potenciaGD !== undefined && potenciaGD !== "" && !isNaN(parseFloat(potenciaGD)) && parseFloat(potenciaGD) > 0;

    tabelas.forEach(tabela => {
        // Extrai número do final do id da tabela (ex: "tabela24", "tabela25" etc)
        let match = tabela.id.match(/(\d+)/);
        let numero = match ? parseInt(match[1], 10) : 0;

        // Se filtrar24, mostra tabelas com número >= 24
        // Se NÃO filtrar24, mostra tabelas com número < 24
        if ((filtrar24 && numero >= numeroReferencia) || (!filtrar24 && numero < numeroReferencia)) {
            let nome = tabela.querySelector("h2") ? tabela.querySelector("h2").textContent : tabela.id;
            let option = document.createElement("option");
            option.value = tabela.id;
            option.textContent = nome;
            seletor.appendChild(option);
        }
    });
}


window.onload = function () {
    const botaoParametro = document.getElementById("botaotabelarelehtml");
    if (botaoParametro) {
        botaoParametro.style.backgroundColor = "#cf0808";
    }

    // Controle de acesso movido para controle-acesso.js

    carregarAssuntos();
    importadadoslocalstorage(); // Chama a função para importar as variáveis do localStorage


    // Importa potenciabase do localStorage e atualiza campos
    let potenciabase = dados['potenciabase'];


    // Novo trecho para ajuste-tc-abc
    let valorAjusteTc = dados['RTCselecionado'];
    if (valorAjusteTc !== null && valorAjusteTc !== undefined) {
        valorAjusteTc = parseFloat(valorAjusteTc);

        // Atualiza TODOS os campos com a classe ajuste-tc-abc em todas as tabelas
        document.querySelectorAll('.ajuste-tc-abc').forEach(function (inputTc) {
            inputTc.textContent = valorAjusteTc + "";
        });
    }



    // Novo trecho para ajuste-tc-protecao
    let valorAjusteTcProtecao = dados['TCdeprotecaoSelecionada'];
    if (valorAjusteTcProtecao !== null && valorAjusteTcProtecao !== undefined) {
        valorAjusteTcProtecao = parseFloat(valorAjusteTcProtecao);

        // Atualiza TODOS os campos com a classe ajuste-tc-protecao em todas as tabelas
        document.querySelectorAll('.ajuste-tc-protecao').forEach(function (inputTcProt) {
            inputTcProt.textContent = valorAjusteTcProtecao + " A";
        });
    }

    // Novo trecho para ajuste-tc-protecao-ka
    let valorAjusteTcProtecaoKa = dados['TCdeprotecaoSelecionadaemka'];
    if (valorAjusteTcProtecaoKa !== null && valorAjusteTcProtecaoKa !== undefined) {
        valorAjusteTcProtecaoKa = parseFloat(valorAjusteTcProtecaoKa).toFixed(3);

        // Atualiza TODOS os campos com a classe ajuste-tc-protecao-ka em todas as tabelas
        document.querySelectorAll('.ajuste-tc-protecao-ka').forEach(function (inputTcProtKa) {
            inputTcProtKa.textContent = valorAjusteTcProtecaoKa + " kA";
        });
    }

    // Novo trecho para TPdeprotecaoSelecionada
    let valorAjusteTp = dados['TPdeprotecaoSelecionada'];
    if (valorAjusteTp !== null && valorAjusteTp !== undefined) {
        valorAjusteTp = parseFloat(valorAjusteTp);

        // Atualiza TODOS os campos com a classe ajuste-tp-abc em todas as tabelas
        document.querySelectorAll('.ajuste-tp-abc').forEach(function (inputTp) {
            inputTp.textContent = valorAjusteTp + "";
        });
    }
    // Novo trecho para tensaoSecundariaFNTP
    let tensaoSecundariaFNTP = dados['tensaoSecundariaFNTP'];
    if (tensaoSecundariaFNTP !== null && tensaoSecundariaFNTP !== undefined) {
        tensaoSecundariaFNTP = parseFloat(tensaoSecundariaFNTP).toFixed(2);

        // Atualiza TODOS os campos com a classe ajuste-tensao-secundaria-fn-tp em todas as tabelas
        document.querySelectorAll('.ajuste-tensao-secundaria-fn-tp').forEach(function (inputTensao) {
            inputTensao.textContent = tensaoSecundariaFNTP + " V";
        });
    }

    // Novo trecho para tensaoSecundariaFNTP
    let tensaoSecundariaFFTP = dados['tensaoSecundariaFFTP'];
    if (tensaoSecundariaFFTP !== null && tensaoSecundariaFFTP !== undefined) {
        tensaoSecundariaFFTP = parseFloat(tensaoSecundariaFFTP).toFixed(2);

        // Atualiza TODOS os campos com a classe ajuste-tensao-secundaria-fn-tp em todas as tabelas
        document.querySelectorAll('.ajuste-tensao-secundaria-ff-tp').forEach(function (inputTensao) {
            inputTensao.textContent = tensaoSecundariaFFTP + " V";
        });
    }

    console.log("Tensão Secundária FF TP:", tensaoSecundariaFFTP);

    // Novo trecho para tensaoprimariaFF
    let valorTensaoSelecionada = dados['tensaoSelecionada'];
    if (valorTensaoSelecionada !== null && valorTensaoSelecionada !== undefined) {
        valorTensaoSelecionada = parseFloat(valorTensaoSelecionada).toFixed(2);

        // Atualiza TODOS os campos com a classe ajuste-tensao-selecionada em todas as tabelas
        document.querySelectorAll('.ajuste-tensao-primaria').forEach(function (inputTensao) {
            inputTensao.textContent = valorTensaoSelecionada + " kV";
        });
    }
    // Novo trecho para tensaoprimariaFN
    let tensaoprimariaFN = dados['tensaoprimariaFN'];
    if (tensaoprimariaFN !== null && tensaoprimariaFN !== undefined) {
        tensaoprimariaFN = parseFloat(tensaoprimariaFN).toFixed(2);

        // Atualiza TODOS os campos com a classe ajuste-tensao-primaria-fn em todas as tabelas
        document.querySelectorAll('.ajuste-tensao-primaria-fn').forEach(function (inputTensao) {
            inputTensao.textContent = tensaoprimariaFN + " V";
        });
    }

    // Novo trecho para tensaoprimariaFF
    let tensaoprimariaFF = dados['tensaoprimariaFF'];
    if (tensaoprimariaFF !== null && tensaoprimariaFF !== undefined) {
        tensaoprimariaFF = parseFloat(tensaoprimariaFF).toFixed(2);

        // Atualiza TODOS os campos com a classe ajuste-tensao-primaria-ff em todas as tabelas
        document.querySelectorAll('.ajuste-tensao-primaria-ff').forEach(function (inputTensao) {
            inputTensao.textContent = tensaoprimariaFF + " V";
        });
    }

    // Novo trecho para RTPauxiliarSelecionada
    let valorAjusteTpAux = dados['RTPauxiliarSelecionada'];
    if (valorAjusteTpAux !== null && valorAjusteTpAux !== undefined) {
        valorAjusteTpAux = parseFloat(valorAjusteTpAux).toFixed(2);

        // Atualiza TODOS os campos com a classe ajuste-tp-auxiliar em todas as tabelas
        document.querySelectorAll('.ajuste-tp-auxiliar').forEach(function (inputTpAux) {
            inputTpAux.textContent = valorAjusteTpAux + "";
        });
    }

    // Novo trecho para status-funcao32
    let statusFuncao32 = dados['statusfuncao32diesel'];
    if (statusFuncao32 !== null && statusFuncao32 !== undefined) {
        document.querySelectorAll('.status-funcao32').forEach(function (el) {
            if (statusFuncao32 === "Habilitado") {
                // Só substitui se o campo estiver vazio ou só espaços
                if (!el.textContent.trim()) {
                    const seletor = document.getElementById("seletorTabela");
                    if (seletor) {
                        el.textContent = seletor.options[seletor.selectedIndex].text;
                    }
                }
                // Se já tem texto fixo, mantém o texto existente
            } else if (statusFuncao32 === "Desabilitado") {
                // Sempre sobrescreve para "Desabilitado"
                el.textContent = "Desabilitado";
            } else {
                el.textContent = statusFuncao32;
            }
        });
    }




    // Verifica o status da função 32 e exibe ou oculta os parâmetros correspond
    //foi criada a classe para tr com nome parametrosfuncao32diesel para que seja possível ocultar ou exibir os parâmetros
    // de acordo com o status da função 32
    const valoresminimos = [
        { nome: "urp2405", valor: 1 },
        { nome: "urp6100", valor: 3 },
        { nome: "7sr1004", valor: 0.05 },
        { nome: "sepams42", valor: 1 },
        { nome: "urp6000", valor: 3 },
        { nome: "rempgd", valor: 0.4 },
        { nome: "p3u30", valor: 0.05 },
        { nome: "7sr5111", valor: 0.05 },
        { nome: "sel751", valor: 0.05 },
        { nome: "remp32", valor: 1.2 },


    ];
    if (statusFuncao32 === "Desabilitado") {
        document.querySelectorAll('.parametrosfuncao32diesel').forEach(function (row) {
            row.style.display = "none";
        });
    } else {
        document.querySelectorAll('.parametrosfuncao32diesel').forEach(function (row) {
            row.style.display = "";
        });
    }

    // Novo trecho para potencia-reversa-gerador
    let potenciaReversaGerador = dados['potenciaReversaGerador'];
    if (potenciaReversaGerador !== null && potenciaReversaGerador !== undefined) {
        potenciaReversaGerador = parseFloat(potenciaReversaGerador).toFixed(2);
        document.querySelectorAll('.potencia-reversa-gerador').forEach(function (el) {
            el.textContent = potenciaReversaGerador + " W";
        });
    }

    // Novo trecho para potencia gerador-diesel-pu
    let potenciaDieselPU = dados['potenciadieselPU'];
    if (potenciaDieselPU !== null && potenciaDieselPU !== undefined) {
        potenciaDieselPU = parseFloat(potenciaDieselPU);
        let potenciaDieselPUFormatada = potenciaDieselPU.toFixed(2) + " x Sn";
        document.querySelectorAll('.potencia-diesel-pu-siemens').forEach(function (el) {
            el.textContent = potenciaDieselPUFormatada;
        });

        // Segunda variável recebe o valor multiplicado por 100 para schneider normalmente
        let potenciaDieselPUPercentual = (potenciaDieselPU * 100).toFixed(2) + " x %Sn";
        document.querySelectorAll('.potencia-diesel-pu-percentual').forEach(function (el) {
            el.textContent = potenciaDieselPUPercentual;
        });
    }





    // Novo trecho para potencia-reversa-gerador-urp2405
    document.querySelectorAll('.potencia-reversa-gerador-urp2405').forEach(function (el) {
        let minimoUrp2405 = valoresminimos.find(v => v.nome === "urp2405").valor;
        let valorminimourp2405 = valorAjusteTp * valorAjusteTc * minimoUrp2405;

        if (potenciaReversaGerador !== null && potenciaReversaGerador !== undefined && valorAjusteTp !== undefined && valorAjusteTc !== undefined) {
            if (potenciaReversaGerador < valorminimourp2405) {
                el.textContent = valorminimourp2405.toFixed(2) + " W (Minímo)";
            } else {
                el.textContent = potenciaReversaGerador + " W";
            }
        }
    });
    // Novo trecho para potencia-reversa-gerador-7sr1004 minima 
    document.querySelectorAll('.potencia-reversa-gerador-7sr1004').forEach(function (el) {
        let minimo = valoresminimos.find(v => v.nome === "7sr1004").valor;

        if (potenciaReversaGerador !== null && potenciaReversaGerador !== undefined && valorAjusteTp !== undefined && valorAjusteTc !== undefined) {
            if (potenciaDieselPU < minimo) {
                el.textContent = minimo.toFixed(2) + " x Sn (Minímo)";
            } else {
                el.textContent = potenciaDieselPU.toFixed(2) + " x Sn";
            }
        }
    });

    // Novo trecho para potencia-reversa-gerador-7sr5111 minima 
    document.querySelectorAll('.potencia-reversa-gerador-7sr5111').forEach(function (el) {
        let minimo = valoresminimos.find(v => v.nome === "7sr5111").valor;

        if (potenciaReversaGerador !== null && potenciaReversaGerador !== undefined && valorAjusteTp !== undefined && valorAjusteTc !== undefined) {
            if (potenciaDieselPU < minimo) {
                el.textContent = minimo.toFixed(2) + " x Sn (Minímo)";
            } else {
                el.textContent = potenciaDieselPU.toFixed(2) + " x Sn";
            }
        }
    });



    // Novo trecho para potencia-reversa-gerador-sepams42 minima 
    document.querySelectorAll('.potencia-reversa-gerador-sepams42').forEach(function (el) {
        let minimo = valoresminimos.find(v => v.nome === "sepams42").valor;
        let valorminimo = (minimo / 100) * (potenciabase * 1000);


        if (potenciaReversaGerador !== null && potenciaReversaGerador !== undefined && valorAjusteTp !== undefined && valorAjusteTc !== undefined) {
            if (potenciaReversaGerador < valorminimo) {
                el.textContent = minimo.toFixed(2) + " % Sn (Minímo)";

            } else {
                el.textContent = (1 * (potenciaReversaGerador / (potenciabase * 1000))).toFixed(2) + " % Sn";

            }
        }
    });

    // Novo trecho para potencia-reversa-gerador-urp6000 minima 
    document.querySelectorAll('.potencia-reversa-gerador-urp6000').forEach(function (el) {
        let minimo = valoresminimos.find(v => v.nome === "urp6000").valor;
        let valorminimo = valorAjusteTp * valorAjusteTc * minimo;
        if (potenciaReversaGerador !== null && potenciaReversaGerador !== undefined && valorAjusteTp !== undefined && valorAjusteTc !== undefined) {
            if (potenciaReversaGerador < valorminimo) {
                el.textContent = valorminimo.toFixed(2) + " W (Minímo)";
            } else {
                el.textContent = potenciaReversaGerador + " W";
            }
        }
    });

    // Novo trecho para potencia-reversa-gerador-rempgd minima 
    document.querySelectorAll('.potencia-reversa-gerador-rempgd').forEach(function (el) {
        let minimo = valoresminimos.find(v => v.nome === "rempgd").valor;
        let valorminimo = valorAjusteTp * valorAjusteTc * minimo;
        if (potenciaReversaGerador !== null && potenciaReversaGerador !== undefined && valorAjusteTp !== undefined && valorAjusteTc !== undefined) {
            if (potenciaReversaGerador < valorminimo) {
                el.textContent = valorminimo.toFixed(2) + " W (Minímo)";
            } else {
                el.textContent = potenciaReversaGerador + " W";
            }
        }
    });

    // Novo trecho para potencia-reversa-gerador-p3u30 minima 
    document.querySelectorAll('.potencia-reversa-gerador-p3u30').forEach(function (el) {
        let minimo = valoresminimos.find(v => v.nome === "p3u30").valor;
        let valorminimo = (minimo / 100) * (potenciabase * 1000);
        console.log("minimo:", minimo, "valorminimo:", valorminimo, "potenciabase:", potenciabase);
        if (potenciaReversaGerador !== null && potenciaReversaGerador !== undefined && valorAjusteTp !== undefined && valorAjusteTc !== undefined) {
            if (potenciaReversaGerador < valorminimo) {
                el.textContent = minimo.toFixed(2) + " % Sn (Minímo)";
                console.log("potenciaReversaGerador:", potenciaReversaGerador, "valorminimo:", valorminimo);
            } else {
                el.textContent = (1 * (potenciaReversaGerador / potenciabase)).toFixed(2) + " % Sn";
                console.log("potenciaReversaGerador:", potenciaReversaGerador, "valorminimo:", valorminimo);

            }
        }
    });


    // Novo trecho para potencia-reversa-gerador-remp32 minima 
    document.querySelectorAll('.potencia-reversa-gerador-remp32').forEach(function (el) {
        let minimo = valoresminimos.find(v => v.nome === "remp32").valor;
        let valorminimo = valorAjusteTp * valorAjusteTc * minimo;
        if (potenciaReversaGerador !== null && potenciaReversaGerador !== undefined && valorAjusteTp !== undefined && valorAjusteTc !== undefined) {
            if (potenciaReversaGerador < valorminimo) {
                el.textContent = valorminimo.toFixed(2) + " W";
            } else {
                el.textContent = potenciaReversaGerador + " W";
            }
        }
    });












    // Novo trecho para ip de partida
    let valorIpPartida = dados['Ipdeconsumo'];
    if (valorIpPartida !== null && valorIpPartida !== undefined) {
        valorIpPartida = parseFloat(valorIpPartida).toFixed(2);

        // Atualiza TODOS os campos com a classe ip-partida-abc em todas as tabelas
        document.querySelectorAll('.ajuste-i-partida-fase').forEach(function (inputIp) {
            inputIp.textContent = valorIpPartida + " A";
        });
    }
    // Tipo de curva fase
    let tipoCurvaFase = dados['curvafaseSelecionada'];
    if (tipoCurvaFase !== null && tipoCurvaFase !== undefined) {
        document.querySelectorAll('.ajuste-curva-fase').forEach(function (el) {
            el.textContent = tipoCurvaFase;
        });

        // Se for IEC-V.I, substitui por IEC-M.I para o campo em português
        let tipoCurvaFasePT = tipoCurvaFase === "IEC-V.I" ? "IEC-M.I" : tipoCurvaFase;
        document.querySelectorAll('.ajuste-curva-fase-pt').forEach(function (el) {
            el.textContent = tipoCurvaFasePT;
        });
    }
    // Dial selecionado fase
    let dialFase = dados['dialfaseSelecionada'];
    if (dialFase !== null && dialFase !== undefined) {
        document.querySelectorAll('.ajuste-dt-fase').forEach(function (el) {
            let valorExistente = parseFloat(el.textContent);
            let valorNovo = parseFloat(dialFase);
            // Só substitui se o novo valor for maior que o existente
            if (isNaN(valorExistente) || valorNovo > valorExistente) {
                el.textContent = dialFase;
            }
            // Se o novo valor for menor ou igual, mantém o valor fixo existente
        });
    }

    // I inst fase
    let iInstFase = dados['Instfaseconsumo'];
    if (iInstFase !== null && iInstFase !== undefined) {
        iInstFase = parseFloat(iInstFase).toFixed(2);
        document.querySelectorAll('.ajuste-iinst-fase').forEach(function (el) {
            el.textContent = iInstFase + " A";
        });
    }
    // I def fase
    let idefFase = dados['ideffaseSelecionada'];
    if (idefFase !== null && idefFase !== undefined && idefFase !== "") {
        idefFase = parseFloat(idefFase).toFixed(2);
        document.querySelectorAll('.ajuste-idef-fase').forEach(function (el) {
            el.textContent = idefFase + " A";
        });
    } else {
        document.querySelectorAll('.ajuste-idef-fase').forEach(function (el) {
            el.textContent = "Máximo";
        });
    }

    // T def fase
    let tdefFase = dados['tdeffaseSelecionada'];
    if (tdefFase !== null && tdefFase !== undefined && tdefFase !== "") {
        tdefFase = parseFloat(tdefFase).toFixed(2);
        document.querySelectorAll('.ajuste-tdef-fase').forEach(function (el) {
            el.textContent = tdefFase + " s";
        });
    } else {
        document.querySelectorAll('.ajuste-tdef-fase').forEach(function (el) {
            el.textContent = "Máximo";
        });
    }

    // Ip de neutro
    let ipNeutro = dados['IpdeneutroSelecionada'];
    if (ipNeutro !== null && ipNeutro !== undefined) {
        ipNeutro = parseFloat(ipNeutro).toFixed(2);
        document.querySelectorAll('.ajuste-i-partida-neutro').forEach(function (el) {
            el.textContent = ipNeutro + " A";
        });
    }
    // Curva de neutro
    let curvaNeutro = dados['curvaneutroSelecionada'];
    if (curvaNeutro !== null && curvaNeutro !== undefined) {
        document.querySelectorAll('.curva-neutro').forEach(function (el) {
            el.textContent = curvaNeutro;
        });

        // Se for TD, converte para Flat em inglês
        let curvaNeutroIngles = curvaNeutro === "Definite-Time" ? "FLAT" : curvaNeutro;
        document.querySelectorAll('.curva-neutro-ingles').forEach(function (el) {
            el.textContent = curvaNeutroIngles;
        });

        // Se for TD, converte para DEFT em português
        let curvaNeutroPT = curvaNeutro === "Definite-Time" ? "DEFT" : curvaNeutro;
        document.querySelectorAll('.curva-neutro-SEGMRI').forEach(function (el) {
            el.textContent = curvaNeutroPT;
        });

        // Nova condição: se for TD, outra variável assume "DT"
        let curvaNeutroDT = curvaNeutro === "Definite-Time" ? "DT" : curvaNeutro;
        document.querySelectorAll('.curva-neutro-DT').forEach(function (el) {
            el.textContent = curvaNeutroDT;
        });

    }

    // Dial de neutro
    let dialNeutro = dados['dialneutroSelecionada'];
    if (dialNeutro !== null && dialNeutro !== undefined) {
        document.querySelectorAll('.ajuste-dt-neutro').forEach(function (el) {
            el.textContent = dialNeutro + " s";
        });
    }

    // Tempo definido de neutro
    let tempoDefinidoNeutro = dados['tdefneutroSelecionada'];
    if (tempoDefinidoNeutro !== null && tempoDefinidoNeutro !== undefined) {
        tempoDefinidoNeutro = parseFloat(tempoDefinidoNeutro).toFixed(2);
        document.querySelectorAll('.ajuste-tdef-neutro').forEach(function (el) {
            el.textContent = tempoDefinidoNeutro + " s";
        });
    }
    // Inst de neutro
    let instNeutro = dados['IinstneutroSelecionada'];
    if (instNeutro !== null && instNeutro !== undefined) {
        instNeutro = parseFloat(instNeutro).toFixed(2);
        document.querySelectorAll('.ajuste-iinst-neutro').forEach(function (el) {
            el.textContent = instNeutro + " A";
        });
    }

    //Conversão de corrente para PU e preenchimento dos campos correspondentes
    // Ip PU Selecionada
    let ipPU = dados['ipPUSelecionada'];
    if (ipPU !== null && ipPU !== undefined) {
        ipPU = parseFloat(ipPU).toFixed(2) + " x In";
        document.querySelectorAll('.ajuste-ip-pu').forEach(function (el) {
            el.textContent = ipPU;
        });

        // Preencher ajuste-ip-pu-rtc com ipPU * 5
        let ipPURTC = (parseFloat(dados['ipPUSelecionada']) * 5).toFixed(2) + " x In";
        document.querySelectorAll('.ajuste-ip-pu-rtc').forEach(function (el) {
            el.textContent = ipPURTC;
        });
    }

    // Iinst PU Selecionada
        let iinstPU = dados['iinstPUSelecionada'];
        if (iinstPU !== null && iinstPU !== undefined) {
            iinstPU = parseFloat(iinstPU).toFixed(2) + " x In";
            document.querySelectorAll('.ajuste-iinst-pu').forEach(function (el) {
                el.textContent = iinstPU;
            });

            // Preencher ajuste-iinst-pu-rtc com iinstPU * 5
            let iinstPURTC = (parseFloat(dados['iinstPUSelecionada']) * 5).toFixed(2) + " x In";
            document.querySelectorAll('.ajuste-iinst-pu-rtc').forEach(function (el) {
                el.textContent = iinstPURTC;
            });
        }



    // Ip Neutro PU Selecionada
        let ipneutroPU = dados['ipneutroPUSelecionada'];
        if (ipneutroPU !== null && ipneutroPU !== undefined) {
            let valorDinamico = parseFloat(ipneutroPU)
            document.querySelectorAll('.ajuste-ipneutro-pu').forEach(function (el) {
                let valorExistente = parseFloat(el.textContent);
                if (isNaN(valorExistente) || valorExistente < valorDinamico) {
                    el.textContent = valorDinamico.toFixed(2) + " x In";
                } else {
                    el.textContent = valorExistente.toFixed(2) + " x In (Mínimo)";
                }

            });

            // Preencher ajuste-ipneutro-pu-rtc com ipneutroPU * 5
            let ipneutroPURTC = (parseFloat(dados['ipneutroPUSelecionada']) * 5).toFixed(2) + " x In";
            document.querySelectorAll('.ajuste-ipneutro-pu-rtc').forEach(function (el) {
                el.textContent = ipneutroPURTC;
            });
        }

    // Inst Neutro PU Selecionada
        let instneutrouPU = dados['instneutroPUSelecionada'];
        if (instneutrouPU !== null && instneutrouPU !== undefined) {
            instneutrouPU = parseFloat(instneutrouPU).toFixed(2) + " x In";
            document.querySelectorAll('.ajuste-instneutro-pu').forEach(function (el) {
                el.textContent = instneutrouPU;
            });

            // Preencher ajuste-instneutro-pu-rtc com instneutroPU * 5
            let instneutrouPURTC = (parseFloat(dados['instneutroPUSelecionada']) * 5).toFixed(2) + " x In";
            document.querySelectorAll('.ajuste-instneutro-pu-rtc').forEach(function (el) {
                el.textContent = instneutrouPURTC;
            });
        }


    // Preencher campos com classe 'ajuste-ipneutro-%' usando ipneutroPUSelecionada x 100
    let ipneutroPUSelecionada = dados['ipneutroPUSelecionada'];
    console.log("ipneutroPUSelecionada:", ipneutroPUSelecionada);
    if (
        ipneutroPUSelecionada !== null &&
        ipneutroPUSelecionada !== undefined &&
        ipneutroPUSelecionada !== "" &&
        !isNaN(parseFloat(ipneutroPUSelecionada))
    ) {
        let valorPercentual = parseFloat(ipneutroPUSelecionada) * 100;
        document.querySelectorAll('.ajuste-ipneutro-percentual').forEach(function (el) {
            let valorExistente = parseFloat(el.textContent);
            if (isNaN(valorExistente) || valorPercentual > valorExistente) {
                el.textContent = valorPercentual.toFixed(2) + " % In";
            }
            // Se não for maior, mantém o valor existente
        });
    } else {
        document.querySelectorAll('.ajuste-ipneutro-percentual').forEach(function (el) {
            el.textContent = "-";
        });
    }

    // Preencher campos com classe 'ajuste-instneutro-percentual' usando instneutroPUSelecionada x 100
    let instneutroPUSelecionada = dados['instneutroPUSelecionada'];
    if (
        instneutroPUSelecionada !== null &&
        instneutroPUSelecionada !== undefined &&
        instneutroPUSelecionada !== "" &&
        !isNaN(parseFloat(instneutroPUSelecionada))
    ) {
        let valorPercentual = parseFloat(instneutroPUSelecionada) * 100;
        document.querySelectorAll('.ajuste-instneutro-percentual').forEach(function (el) {
            let valorExistente = parseFloat(el.textContent);
            if (isNaN(valorExistente) || valorPercentual > valorExistente) {
                el.textContent = valorPercentual.toFixed(2) + " % In";
            }
        });
    } else {
        document.querySelectorAll('.ajuste-instneutro-percentual').forEach(function (el) {
            el.textContent = "-";
        });
    }



    //*************************NOVO TRECHO PARA PARAMETROS DE GD****************************

    // Preencher com status Desabilitado ajuste-habilita-47 e ajuste-habilita-25 se tipoUsinaGDSelecionada tiver texto "Com Inversor"
    let tipoUsinaGDSelecionada = localStorage.getItem('tipoUsinaGDSelecionada');
    if (tipoUsinaGDSelecionada !== null && tipoUsinaGDSelecionada !== undefined) {
        if (tipoUsinaGDSelecionada.includes("Com Inversor")) {

            document.querySelectorAll('.ajuste-habilita-47').forEach(function (el) {
                el.textContent = "Desabilitado";
            });

            document.querySelectorAll('.ajuste-habilita-25').forEach(function (el) {
                el.textContent = "Desabilitado";
            });

            document.querySelectorAll('.ajuste-check-barra-morta').forEach(function (el) {
                el.textContent = "Desabilitado";
            });

            document.querySelectorAll('.ajuste-habilita-47-rempgd').forEach(function (el) {
                el.textContent = "OFF";
            });

            document.querySelectorAll('.ajuste-habilita-25-rempgd').forEach(function (el) {
                el.textContent = "OFF";
            });


        } else {
            document.querySelectorAll('.ajuste-habilita-47').forEach(function (el) {
                el.textContent = "Habilitado";
            });

            document.querySelectorAll('.ajuste-habilita-25').forEach(function (el) {
                el.textContent = "Habilitado";
            });

            document.querySelectorAll('.ajuste-check-barra-morta').forEach(function (el) {
                
                
            el.textContent = "BM VAs";
                


            });

            document.querySelectorAll('.ajuste-habilita-47-rempgd').forEach(function (el) {
                el.textContent = "ABC";
            });

            document.querySelectorAll('.ajuste-habilita-25-rempgd').forEach(function (el) {
                el.textContent = "ON";
            });


        }



    }  //Não mostrar os tr display47 e display25 se tipoUsinaGDSelecionada tiver texto Com Inversor
    if (tipoUsinaGDSelecionada !== null && tipoUsinaGDSelecionada !== undefined) {
        if (tipoUsinaGDSelecionada.includes("Com Inversor")) {
            document.querySelectorAll('.display47').forEach(function (el) {
                el.style.display = "none";
            });
            document.querySelectorAll('.display25').forEach(function (el) {
                el.style.display = "none";
            });
            document.querySelectorAll('.display81u3').forEach(function (el) {
                el.style.display = "none";
            });
        }
    }


    //preencher ajuste-vpoldn com tensaoprimariaFF*0,10

    if (tensaoprimariaFF !== null && tensaoprimariaFF !== undefined) {
        let vpoldn = (parseFloat(tensaoprimariaFF) * 0.10).toFixed(2) + " V";
        document.querySelectorAll('.ajuste-vpoldn').forEach(function (el) {
            el.textContent = vpoldn;
        });
    }

    //Importar potenciaInjecaoCalculada32 do localstorage e atualizar campos
    let potenciaInjecaoCalculada32 = parseFloat(localStorage.getItem('potenciaInjecaoCalculada32'));
    if (potenciaInjecaoCalculada32 !== null && potenciaInjecaoCalculada32 !== undefined) {
        potenciaInjecaoCalculada32 = (parseFloat(potenciaInjecaoCalculada32) * 1000).toFixed(2) + " W";
        document.querySelectorAll('.ajuste-32-injecao').forEach(function (el) {
            el.textContent = potenciaInjecaoCalculada32;
        });
    }

    //Importar potenciaConsumoCalculada32 do localstorage e atualizar campos
    let potenciaConsumoCalculada32 = parseFloat(localStorage.getItem('potenciaConsumoCalculada32'));
    if (potenciaConsumoCalculada32 !== null && potenciaConsumoCalculada32 !== undefined) {
        potenciaConsumoCalculada32 = (parseFloat(potenciaConsumoCalculada32) * 1000).toFixed(2) + " W";
        document.querySelectorAll('.ajuste-32-consumo').forEach(function (el) {
            el.textContent = potenciaConsumoCalculada32;
        });
    }


    // Importar anguloFaseSelecionadoGD do localstorage e atualizar campos
    let anguloFaseSelecionadoGD = localStorage.getItem('anguloFaseSelecionadoGD');
    let valorAnguloFase;
    if (
        anguloFaseSelecionadoGD !== null &&
        anguloFaseSelecionadoGD !== undefined &&
        anguloFaseSelecionadoGD !== "" &&
        !isNaN(parseFloat(anguloFaseSelecionadoGD))
    ) {
        valorAnguloFase = parseFloat(anguloFaseSelecionadoGD).toFixed(2) + " °";
    } else {
        valorAnguloFase = "45.00 °"; // valor padrão
    }
    document.querySelectorAll('.ajuste-angulo-fase').forEach(function (el) {
        el.textContent = valorAnguloFase;
    });

    //Importar anguloNeutroSelecionadoGD do localstorage e atualizar campos
    let anguloNeutroSelecionadoGD = localStorage.getItem('anguloNeutroSelecionadoGD');
    let valorAnguloNeutro;
    if (
        anguloNeutroSelecionadoGD !== null &&
        anguloNeutroSelecionadoGD !== undefined &&
        anguloNeutroSelecionadoGD !== "" &&
        !isNaN(parseFloat(anguloNeutroSelecionadoGD))
    ) {
        valorAnguloNeutro = parseFloat(anguloNeutroSelecionadoGD).toFixed(2) + " °";
    } else {
        valorAnguloNeutro = "110.00 °"; // valor padrão
    }
    document.querySelectorAll('.ajuste-angulo-neutro').forEach(function (el) {
        el.textContent = valorAnguloNeutro;
    });


    // Importar IpfaseGD do localstorage e atualizar campos
    let IpfaseGD = parseFloat(localStorage.getItem('IpfaseGD'));
    if (IpfaseGD !== null && IpfaseGD !== undefined && !isNaN(IpfaseGD)) {
        IpfaseGD = IpfaseGD.toFixed(2) + " A";
        document.querySelectorAll('.ajuste-ip-fase-GD').forEach(function (el) {
            el.textContent = IpfaseGD;
        });
    }








    //Importar IpneutroGD do localstorage e atualizar campos
    let IpneutroGD = parseFloat(localStorage.getItem('IpdeneutroSelecionadaGD'));
    if (IpneutroGD !== null && IpneutroGD !== undefined) {
        IpneutroGD = parseFloat(IpneutroGD).toFixed(2) + " A";
        document.querySelectorAll('.ajuste-ip-neutro-GD').forEach(function (el) {
            el.textContent = IpneutroGD;
        });
    }

    //Importar dialneutroSelecionadaGD do localstorage e atualizar campos
    let dialneutroSelecionadaGD = localStorage.getItem('dialneutroSelecionadaGD');
    if (dialneutroSelecionadaGD !== null && dialneutroSelecionadaGD !== undefined) {
        document.querySelectorAll('.ajuste-dial-neutro-GD').forEach(function (el) {
            el.textContent = dialneutroSelecionadaGD + " s";
        });
    }


    // Importar tensaoPrimariaFaseAjustada51v do localStorage e preencher campos ajuste-51v-GD-pextron
    let tensaoPrimariaFaseAjustada51v = localStorage.getItem('tensaoPrimariaFaseAjustada51v');
    if (
        tensaoPrimariaFaseAjustada51v !== null &&
        tensaoPrimariaFaseAjustada51v !== undefined &&
        tensaoPrimariaFaseAjustada51v !== "" &&
        !isNaN(parseFloat(tensaoPrimariaFaseAjustada51v))
    ) {
        let valorTensaoPrimariaFaseAjustada51v = parseFloat(tensaoPrimariaFaseAjustada51v).toFixed(2) + " V";
        document.querySelectorAll('.ajuste-51v-GD-pextron').forEach(function (el) {
            el.textContent = valorTensaoPrimariaFaseAjustada51v;
        });
    }

    // Importar idef46real do localStorage e preencher campos ajuste-46-GD-pextron
    let idef46real = localStorage.getItem('Idef46real');
    if (
        idef46real !== null &&
        idef46real !== undefined &&
        idef46real !== "" &&
        !isNaN(parseFloat(idef46real))
    ) {
        let valorIdef46real = parseFloat(idef46real).toFixed(2) + " A";
        document.querySelectorAll('.ajuste-46-GD-pextron').forEach(function (el) {
            el.textContent = valorIdef46real;
        });
    }

    //importar tempoDefinido46real do localStorage e preencher campos ajuste-t46
    let tempoDefinido46 = localStorage.getItem('tempoDefinido46real');
    if (
        tempoDefinido46 !== null &&
        tempoDefinido46 !== undefined &&
        tempoDefinido46 !== "" &&
        !isNaN(parseFloat(tempoDefinido46))
    ) {
        let valorTempoDefinido46 = parseFloat(tempoDefinido46).toFixed(2) + " s";
        document.querySelectorAll('.ajuste-t46').forEach(function (el) {
            el.textContent = valorTempoDefinido46;
        });
    }

    // Importar tensaoPrimariaFaseAjustada27-1 do localStorage e preencher campos ajuste-27-1-GD-pextron
    let tensaoPrimariaFaseAjustada27_1 = localStorage.getItem('tensaoPrimariaFaseAjustada27-1');
    if (
        tensaoPrimariaFaseAjustada27_1 !== null &&
        tensaoPrimariaFaseAjustada27_1 !== undefined &&
        tensaoPrimariaFaseAjustada27_1 !== "" &&
        !isNaN(parseFloat(tensaoPrimariaFaseAjustada27_1))
    ) {
        let valorTensaoPrimariaFaseAjustada27_1 = parseFloat(tensaoPrimariaFaseAjustada27_1).toFixed(2) + " V";
        document.querySelectorAll('.ajuste-27-1-GD-pextron').forEach(function (el) {
            el.textContent = valorTensaoPrimariaFaseAjustada27_1;
        });
    }

    // Importar tempoEstagio27-1-real do localStorage e preencher campos ajuste-t27-1
    let tempoEstagio27_1_real = localStorage.getItem('tempoEstagio27-1-real');
    if (
        tempoEstagio27_1_real !== null &&
        tempoEstagio27_1_real !== undefined &&
        tempoEstagio27_1_real !== "" &&
        !isNaN(parseFloat(tempoEstagio27_1_real))
    ) {
        let valorTempoEstagio27_1_real = parseFloat(tempoEstagio27_1_real).toFixed(2) + " s";
        document.querySelectorAll('.ajuste-t27-1').forEach(function (el) {
            el.textContent = valorTempoEstagio27_1_real;
        });
    }



    // Importar tensaoPrimariaFaseAjustada27-2 do localStorage e preencher campos ajuste-27-2-GD-pextron
    let tensaoPrimariaFaseAjustada27_2 = localStorage.getItem('tensaoPrimariaFaseAjustada27-2');
    if (
        tensaoPrimariaFaseAjustada27_2 !== null &&
        tensaoPrimariaFaseAjustada27_2 !== undefined &&
        tensaoPrimariaFaseAjustada27_2 !== "" &&
        !isNaN(parseFloat(tensaoPrimariaFaseAjustada27_2))
    ) {
        let valorTensaoPrimariaFaseAjustada27_2 = parseFloat(tensaoPrimariaFaseAjustada27_2).toFixed(2) + " V";
        document.querySelectorAll('.ajuste-27-2-GD-pextron').forEach(function (el) {
            el.textContent = valorTensaoPrimariaFaseAjustada27_2;
        });
    }

    // Importar tempoEstagio27-2-real do localStorage e preencher campos ajuste-t27-2
    let tempoEstagio27_2_real = localStorage.getItem('tempoEstagio27-2-real');
    if (
        tempoEstagio27_2_real !== null &&
        tempoEstagio27_2_real !== undefined &&
        tempoEstagio27_2_real !== "" &&
        !isNaN(parseFloat(tempoEstagio27_2_real))
    ) {
        let valorTempoEstagio27_2_real = parseFloat(tempoEstagio27_2_real).toFixed(2) + " s";
        document.querySelectorAll('.ajuste-t27-2').forEach(function (el) {
            el.textContent = valorTempoEstagio27_2_real;
        });
    }


    // Importar tensaoPrimariaFaseAjustada59-1 do localStorage e preencher campos ajuste-59-1-GD-pextron
    let tensaoPrimariaFaseAjustada59_1 = localStorage.getItem('tensaoPrimariaFaseAjustada59-1');
    if (
        tensaoPrimariaFaseAjustada59_1 !== null &&
        tensaoPrimariaFaseAjustada59_1 !== undefined &&
        tensaoPrimariaFaseAjustada59_1 !== "" &&
        !isNaN(parseFloat(tensaoPrimariaFaseAjustada59_1))
    ) {
        let valorTensaoPrimariaFaseAjustada59_1 = parseFloat(tensaoPrimariaFaseAjustada59_1).toFixed(2) + " V";
        document.querySelectorAll('.ajuste-59-1-GD-pextron').forEach(function (el) {
            el.textContent = valorTensaoPrimariaFaseAjustada59_1;
        });
    }

    // Importar tempoEstagio59-1-real do localStorage e preencher campos ajuste-t59-1
    let tempoEstagio59_1_real = localStorage.getItem('tempoEstagio59-1-real');
    if (
        tempoEstagio59_1_real !== null &&
        tempoEstagio59_1_real !== undefined &&
        tempoEstagio59_1_real !== "" &&
        !isNaN(parseFloat(tempoEstagio59_1_real))
    ) {
        let valorTempoEstagio59_1_real = parseFloat(tempoEstagio59_1_real).toFixed(2) + " s";
        document.querySelectorAll('.ajuste-t59-1').forEach(function (el) {
            el.textContent = valorTempoEstagio59_1_real;
        });
    }

    // Importar tensaoPrimariaFaseAjustada59-2 do localStorage e preencher campos ajuste-59-2-GD-pextron
    let tensaoPrimariaFaseAjustada59_2 = localStorage.getItem('tensaoPrimariaFaseAjustada59-2');
    if (
        tensaoPrimariaFaseAjustada59_2 !== null &&
        tensaoPrimariaFaseAjustada59_2 !== undefined &&
        tensaoPrimariaFaseAjustada59_2 !== "" &&
        !isNaN(parseFloat(tensaoPrimariaFaseAjustada59_2))
    ) {
        let valorTensaoPrimariaFaseAjustada59_2 = parseFloat(tensaoPrimariaFaseAjustada59_2).toFixed(2) + " V";
        document.querySelectorAll('.ajuste-59-2-GD-pextron').forEach(function (el) {
            el.textContent = valorTensaoPrimariaFaseAjustada59_2;
        });
    }

    // Importar tempoEstagio59-2-real do localStorage e preencher campos ajuste-t59-2
    let tempoEstagio59_2_real = localStorage.getItem('tempoEstagio59-2-real');
    if (
        tempoEstagio59_2_real !== null &&
        tempoEstagio59_2_real !== undefined &&
        tempoEstagio59_2_real !== "" &&
        !isNaN(parseFloat(tempoEstagio59_2_real))
    ) {
        let valorTempoEstagio59_2_real = parseFloat(tempoEstagio59_2_real).toFixed(2) + " s";
        document.querySelectorAll('.ajuste-t59-2').forEach(function (el) {
            el.textContent = valorTempoEstagio59_2_real;
        });
    }

    //importar ajustereal81Uprimeiroestagio do localStorage e preencher campos ajuste-81u-1
    let ajustereal81Uprimeiroestagio = localStorage.getItem('ajustereal81Uprimeiroestagio');
    if (
        ajustereal81Uprimeiroestagio !== null &&
        ajustereal81Uprimeiroestagio !== undefined &&
        ajustereal81Uprimeiroestagio !== "" &&
        !isNaN(parseFloat(ajustereal81Uprimeiroestagio))
    ) {
        let valorAjuste81U1 = parseFloat(ajustereal81Uprimeiroestagio).toFixed(2) + " Hz";
        document.querySelectorAll('.ajuste-81u-1').forEach(function (el) {
            el.textContent = valorAjuste81U1;
        });
    }
    // importar ajustereal81Utempo1 do localStorage e preencher campos ajuste-81u-t1
    let ajustereal81Utempo1 = localStorage.getItem('ajustereal81Utempo1');
    if (
        ajustereal81Utempo1 !== null &&
        ajustereal81Utempo1 !== undefined &&
        ajustereal81Utempo1 !== "" &&
        !isNaN(parseFloat(ajustereal81Utempo1))
    ) {
        let valorAjuste81Utempo1 = parseFloat(ajustereal81Utempo1).toFixed(2) + " s";
        document.querySelectorAll('.ajuste-81u-t1').forEach(function (el) {
            el.textContent = valorAjuste81Utempo1;
        });
    }

    //importar ajustereal81Usegundoestagio do localStorage e preencher campos ajuste-81u-2
    let ajustereal81Usegundoestagio = localStorage.getItem('ajustereal81Usegundoestagio');
    if (
        ajustereal81Usegundoestagio !== null &&
        ajustereal81Usegundoestagio !== undefined &&
        ajustereal81Usegundoestagio !== "" &&
        !isNaN(parseFloat(ajustereal81Usegundoestagio))
    ) {
        let valorAjuste81U2 = parseFloat(ajustereal81Usegundoestagio).toFixed(2) + " Hz";
        document.querySelectorAll('.ajuste-81u-2').forEach(function (el) {
            el.textContent = valorAjuste81U2;
        });
    }

    // importar ajustereal81Utempo2 do localStorage e preencher campos ajuste-81u-t2
    let ajustereal81Utempo2 = localStorage.getItem('ajustereal81Utempo2');
    if (
        ajustereal81Utempo2 !== null &&
        ajustereal81Utempo2 !== undefined &&
        ajustereal81Utempo2 !== "" &&
        !isNaN(parseFloat(ajustereal81Utempo2))
    ) {
        let valorAjuste81Utempo2 = parseFloat(ajustereal81Utempo2).toFixed(2) + " s";
        document.querySelectorAll('.ajuste-81u-t2').forEach(function (el) {
            el.textContent = valorAjuste81Utempo2;
        });
    }

    //importar ajustereal81Uterceiroestagio do localStorage e preencher campos ajuste-81u-3
    let ajustereal81Uterceiroestagio = localStorage.getItem('ajustereal81Uterceiroestagio');
    if (
        ajustereal81Uterceiroestagio !== null &&
        ajustereal81Uterceiroestagio !== undefined &&
        ajustereal81Uterceiroestagio !== "" &&
        !isNaN(parseFloat(ajustereal81Uterceiroestagio))
    ) {
        let valorAjuste81U3 = parseFloat(ajustereal81Uterceiroestagio).toFixed(2) + " Hz";
        document.querySelectorAll('.ajuste-81u-3').forEach(function (el) {
            el.textContent = valorAjuste81U3;
        });
    }

    // importar ajustereal81Utempo3 do localStorage e preencher campos ajuste-81u-t3
    let ajustereal81Utempo3 = localStorage.getItem('ajustereal81Utempo3');
    if (
        ajustereal81Utempo3 !== null &&
        ajustereal81Utempo3 !== undefined &&
        ajustereal81Utempo3 !== "" &&
        !isNaN(parseFloat(ajustereal81Utempo3))
    ) {
        let valorAjuste81Utempo3 = parseFloat(ajustereal81Utempo3).toFixed(2) + " s";
        document.querySelectorAll('.ajuste-81u-t3').forEach(function (el) {
            el.textContent = valorAjuste81Utempo3;
        });
    }


    //importar ajustereal81Oprimeiroestagio do localStorage e preencher campos ajuste-81o-1
    let ajustereal81Oprimeiroestagio = localStorage.getItem('ajustereal81Oprimeiroestagio');
    if (
        ajustereal81Oprimeiroestagio !== null &&
        ajustereal81Oprimeiroestagio !== undefined &&
        ajustereal81Oprimeiroestagio !== "" &&
        !isNaN(parseFloat(ajustereal81Oprimeiroestagio))
    ) {
        let valorAjuste81O1 = parseFloat(ajustereal81Oprimeiroestagio).toFixed(2) + " Hz";
        document.querySelectorAll('.ajuste-81o-1').forEach(function (el) {
            el.textContent = valorAjuste81O1;
        });
    }

    // importar ajustereal81Otempo1 do localStorage e preencher campos ajuste-81o-t1
    let ajustereal81Otempo1 = localStorage.getItem('ajustereal81Otempo1');
    if (
        ajustereal81Otempo1 !== null &&
        ajustereal81Otempo1 !== undefined &&
        ajustereal81Otempo1 !== "" &&
        !isNaN(parseFloat(ajustereal81Otempo1))
    ) {
        let valorAjuste81Ot1 = parseFloat(ajustereal81Otempo1).toFixed(2) + " s";
        document.querySelectorAll('.ajuste-81o-t1').forEach(function (el) {
            el.textContent = valorAjuste81Ot1;
        });
    }

    //importar ajustereal81Osegundoestagio do localStorage e preencher campos ajuste-81o-2
    let ajustereal81Osegundoestagio = localStorage.getItem('ajustereal81Osegundoestagio');
    if (
        ajustereal81Osegundoestagio !== null &&
        ajustereal81Osegundoestagio !== undefined &&
        ajustereal81Osegundoestagio !== "" &&
        !isNaN(parseFloat(ajustereal81Osegundoestagio))
    ) {
        let valorAjuste81O2 = parseFloat(ajustereal81Osegundoestagio).toFixed(2) + " Hz";
        document.querySelectorAll('.ajuste-81o-2').forEach(function (el) {
            el.textContent = valorAjuste81O2;
        });
    }

    // importar ajustereal81Otempo2 do localStorage e preencher campos ajuste-81o-t2
    let ajustereal81Otempo2 = localStorage.getItem('ajustereal81Otempo2');
    if (
        ajustereal81Otempo2 !== null &&
        ajustereal81Otempo2 !== undefined &&
        ajustereal81Otempo2 !== "" &&
        !isNaN(parseFloat(ajustereal81Otempo2))
    ) {
        let valorAjuste81Ot2 = parseFloat(ajustereal81Otempo2).toFixed(2) + " s";
        document.querySelectorAll('.ajuste-81o-t2').forEach(function (el) {
            el.textContent = valorAjuste81Ot2;
        });
    }




    // Importar tensaoPrimariaFaseAjustada25 do localStorage e preencher campos ajuste-25-delta-v
    let tensaoPrimariaFaseAjustada25 = localStorage.getItem('tensaoPrimariaFaseAjustada25');
    if (
        tensaoPrimariaFaseAjustada25 !== null &&
        tensaoPrimariaFaseAjustada25 !== undefined &&
        tensaoPrimariaFaseAjustada25 !== "" &&
        !isNaN(parseFloat(tensaoPrimariaFaseAjustada25))
    ) {
        let valorTensaoPrimariaFaseAjustada25 = parseFloat(tensaoPrimariaFaseAjustada25).toFixed(2) + " V";
        document.querySelectorAll('.ajuste-25-delta-v').forEach(function (el) {
            el.textContent = valorTensaoPrimariaFaseAjustada25;
        });
    }


    // PARAMETROS EM PU

    // Importar potencia consumo em pu do localStorage e preencher campos ajuste-32-consumo-pu
    let potenciaConsumoCalculada32pu = localStorage.getItem('potenciaConsumoPU32');
    if (
        potenciaConsumoCalculada32pu !== null &&
        potenciaConsumoCalculada32pu !== undefined &&
        potenciaConsumoCalculada32pu !== "" &&
        !isNaN(parseFloat(potenciaConsumoCalculada32pu))
    ) {
        let valorPotenciaConsumoCalculada32pu = parseFloat(potenciaConsumoCalculada32pu).toFixed(2) + " x Sn";
        document.querySelectorAll('.ajuste-32-consumo-GD-PU').forEach(function (el) {
            el.textContent = valorPotenciaConsumoCalculada32pu;
        });

        // Preencher ajuste-32-2-gd-schneider com valor percentual
        let valorPercentual = "-" + (parseFloat(potenciaConsumoCalculada32pu) * 100).toFixed(2) + " %Sn";
        document.querySelectorAll('.ajuste-32-2-gd-schneider').forEach(function (el) {
            el.textContent = valorPercentual;
        });
    }

    // Importar potencia injeção em pu do localStorage e preencher campos ajuste-32-injecao-pu
    let potenciaInjecaoCalculada32pu = localStorage.getItem('potenciaInjecaoPU32');
    if (
        potenciaInjecaoCalculada32pu !== null &&
        potenciaInjecaoCalculada32pu !== undefined &&
        potenciaInjecaoCalculada32pu !== "" &&
        !isNaN(parseFloat(potenciaInjecaoCalculada32pu))
    ) {
        let valorPotenciaInjecaoCalculada32pu = parseFloat(potenciaInjecaoCalculada32pu).toFixed(2) + " x Sn";
        document.querySelectorAll('.ajuste-32-injecao-GD-PU').forEach(function (el) {
            el.textContent = valorPotenciaInjecaoCalculada32pu;
        });

        // Preencher ajuste-32-1-gd-schneider com valor percentual
        let valorPercentual = (parseFloat(potenciaInjecaoCalculada32pu) * 100).toFixed(2) + " %Sn";
        document.querySelectorAll('.ajuste-32-1-gd-schneider').forEach(function (el) {
            el.textContent = valorPercentual;
        });
    }


    //importar Ip em pu do localStorage e preencher campos ajuste-ip-fase-GD-pu
    let IpfaseGDpu = localStorage.getItem('ipPUSelecionadaGD');
    if (
        IpfaseGDpu !== null &&
        IpfaseGDpu !== undefined &&
        IpfaseGDpu !== "" &&
        !isNaN(parseFloat(IpfaseGDpu))
    ) {
        let valorIpfaseGDpu = parseFloat(IpfaseGDpu).toFixed(2) + " xIn";
        document.querySelectorAll('.ajuste-67-ip-fase-injecao-gd-pu').forEach(function (el) {
            el.textContent = valorIpfaseGDpu;
        });
    }

    //importar curva de injeção fase do localStorage e preencher campos ajuste-curva-fase-injecao-gd
    let curvaFaseInjecaoGD = localStorage.getItem('curvafaseSelecionadaGD');
    if (
        curvaFaseInjecaoGD !== null &&
        curvaFaseInjecaoGD !== undefined &&
        curvaFaseInjecaoGD !== ""
    ) {
        document.querySelectorAll('.ajuste-if1-curv').forEach(function (el) {
            el.textContent = curvaFaseInjecaoGD;
        });

        // Se for IEC-V.I, substitui por IEC-M.I para o campo em português
        let tipoCurvaGDpt = (curvaFaseInjecaoGD === "IEC-V.I") ? "IEC-M.I" : curvaFaseInjecaoGD;
        document.querySelectorAll('.ajuste-if1-gd-curv-pt').forEach(function (el) {
            el.textContent = tipoCurvaGDpt;
        });
    }

    console.log("curvaFaseInjecaoGD:", curvaFaseInjecaoGD);


    //importar dial de injeção fase do localStorage e preencher campos ajuste-dial-fase-injecao-gd
    let dialFaseInjecaoGD = localStorage.getItem('dialfaseSelecionadaGD');
    if (
        dialFaseInjecaoGD !== null &&
        dialFaseInjecaoGD !== undefined &&
        dialFaseInjecaoGD !== "" &&
        !isNaN(parseFloat(dialFaseInjecaoGD))
    ) {
        let valorDialFaseInjecaoGD = parseFloat(dialFaseInjecaoGD).toFixed(2);
        document.querySelectorAll('.ajuste-67-dial-fase-injecao-GD').forEach(function (el) {
            el.textContent = valorDialFaseInjecaoGD;
        });
    }



    //importar Ip neutro em pu do localStorage e preencher campos ajuste-ip-neutro-GD-pu
    let IpneutroGDpu = localStorage.getItem('ipneutroPUSelecionadaGD');
    if (
        IpneutroGDpu !== null &&
        IpneutroGDpu !== undefined &&
        IpneutroGDpu !== "" &&
        !isNaN(parseFloat(IpneutroGDpu))
    ) {
        let valorIpneutroGDpu = parseFloat(IpneutroGDpu).toFixed(2) + " xIn";
        document.querySelectorAll('.ajuste-ipneutro-GD-pu').forEach(function (el) {
            el.textContent = valorIpneutroGDpu;
        });
    }

    //importar dial de injeção neutro do localStorage e preencher campos ajuste-dial-neutro-injecao-gd
    let dialNeutroInjecaoGD = localStorage.getItem('dialneutroSelecionadaGD');
    if (
        dialNeutroInjecaoGD !== null &&
        dialNeutroInjecaoGD !== undefined &&
        dialNeutroInjecaoGD !== "" &&
        !isNaN(parseFloat(dialNeutroInjecaoGD))
    ) {
        let valorDialNeutroInjecaoGD = parseFloat(dialNeutroInjecaoGD).toFixed(2) + " s";
        document.querySelectorAll('.ajuste-dt-neutro-injecao-GD').forEach(function (el) {
            el.textContent = valorDialNeutroInjecaoGD;
        });
    }


    //importar tensao 51v do localStorage e preencher campos ajuste-51v-GD-pextron-pu
    let tensaosecundariaajustada51v = localStorage.getItem('tensaoSecundariaLinhaAjustada51v');
    if (
        tensaosecundariaajustada51v !== null &&
        tensaosecundariaajustada51v !== undefined &&
        tensaosecundariaajustada51v !== "" &&
        !isNaN(parseFloat(tensaosecundariaajustada51v))
    ) {
        let valortensaosecundariaajustada51v = parseFloat(tensaosecundariaajustada51v).toFixed(2) + " V";
        document.querySelectorAll('.ajuste-tensao-superior-51v-siemens').forEach(function (el) {
            el.textContent = valortensaosecundariaajustada51v;
        });
    }

    //importar corrente 46 do localStorage e preencher campos ajuste-46-GD-pextron-pu
    let Idef46realpu = localStorage.getItem('Idef46PUreal');
    if (
        Idef46realpu !== null &&
        Idef46realpu !== undefined &&
        Idef46realpu !== "" &&
        !isNaN(parseFloat(Idef46realpu))
    ) {
        let valorIdef46realpu = parseFloat(Idef46realpu).toFixed(2) + " xIn";
        document.querySelectorAll('.ajuste-ip-46-siemens').forEach(function (el) {
            el.textContent = valorIdef46realpu;
        });

        // Preencher ajuste-46-GD-schneider com valor percentual
        let valorPercentual = (parseFloat(Idef46realpu) * 100).toFixed(2) + " %In";
        document.querySelectorAll('.ajuste-ip-46-schneider').forEach(function (el) {
            el.textContent = valorPercentual;
        });
    }



    //importar tensao 27-1 do localStorage e preencher campos ajuste-27-1-GD-pextron-pu
    let tensaosecundariaajustada27_1 = localStorage.getItem('tensaoSecundariaFaseAjustada27-1');
    if (
        tensaosecundariaajustada27_1 !== null &&
        tensaosecundariaajustada27_1 !== undefined &&
        tensaosecundariaajustada27_1 !== "" &&
        !isNaN(parseFloat(tensaosecundariaajustada27_1))
    ) {
        let valortensaosecundariaajustada27_1 = parseFloat(tensaosecundariaajustada27_1).toFixed(2) + " V";
        document.querySelectorAll('.ajuste-27-1-tensao-secundaria').forEach(function (el) {
            el.textContent = valortensaosecundariaajustada27_1;
        });
    }


    //importar tensao 27-2 do localStorage e preencher campos ajuste-27-2-GD-pextron-pu
    let tensaosecundariaajustada27_2 = localStorage.getItem('tensaoSecundariaFaseAjustada27-2');
    if (
        tensaosecundariaajustada27_2 !== null &&
        tensaosecundariaajustada27_2 !== undefined &&
        tensaosecundariaajustada27_2 !== "" &&
        !isNaN(parseFloat(tensaosecundariaajustada27_2))
    ) {
        let valortensaosecundariaajustada27_2 = parseFloat(tensaosecundariaajustada27_2).toFixed(2) + " V";
        document.querySelectorAll('.ajuste-27-2-tensao-secundaria').forEach(function (el) {
            el.textContent = valortensaosecundariaajustada27_2;
        });
    }

    //importar tensao 59-1 do localStorage e preencher campos ajuste-59-1-GD-pextron-pu
    let tensaosecundariaajustada59_1 = localStorage.getItem('tensaoSecundariaFaseAjustada59-1');
    if (
        tensaosecundariaajustada59_1 !== null &&
        tensaosecundariaajustada59_1 !== undefined &&
        tensaosecundariaajustada59_1 !== "" &&
        !isNaN(parseFloat(tensaosecundariaajustada59_1))
    ) {
        let valortensaosecundariaajustada59_1 = parseFloat(tensaosecundariaajustada59_1).toFixed(2) + " V";
        document.querySelectorAll('.ajuste-59-1-tensao-secundaria').forEach(function (el) {
            el.textContent = valortensaosecundariaajustada59_1;
        });
    }

    //importar tensao 59-2 do localStorage e preencher campos ajuste-59-2-GD-pextron-pu
    let tensaosecundariaajustada59_2 = localStorage.getItem('tensaoSecundariaFaseAjustada59-2');
    if (
        tensaosecundariaajustada59_2 !== null &&
        tensaosecundariaajustada59_2 !== undefined &&
        tensaosecundariaajustada59_2 !== "" &&
        !isNaN(parseFloat(tensaosecundariaajustada59_2))
    ) {
        let valortensaosecundariaajustada59_2 = parseFloat(tensaosecundariaajustada59_2).toFixed(2) + " V";
        document.querySelectorAll('.ajuste-59-2-tensao-secundaria').forEach(function (el) {
            el.textContent = valortensaosecundariaajustada59_2;
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
    // Atualiza o localStorage com a tabela selecionada
    // localStorage.setItem("TabelaSelecionadaHTML", seletor);

    // Salva os elementos da div da tabela selecionada no localStorage
    // if (tabelaSelecionada) {
    //     localStorage.setItem("Tabelasalva", tabelaSelecionada.innerHTML);
    // }


}


function Salvaropcao() {

    const seletor = document.getElementById("seletorTabela").value;
    localStorage.setItem("TabelaSelecionadaHTML", seletor);

    const tabelaSelecionada = document.getElementById(seletor);
    if (tabelaSelecionada) {
        localStorage.setItem("Tabelasalva", tabelaSelecionada.innerHTML);
    }



    alert("Tabela salva");




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


function baixarXLS() {
    const seletor = document.getElementById("seletorTabela").value;
    if (!seletor) {
        alert("Selecione uma tabela antes de baixar o XLS.");
        return;
    }
    const tabelaSelecionada = document.getElementById(seletor);
    if (!tabelaSelecionada) {
        alert("Tabela não encontrada.");
        return;
    }

    // Clona a tabela para evitar alterações na original
    const tabelaClone = tabelaSelecionada.cloneNode(true);

    // Remove elementos indesejados (exemplo: botões ou elementos com classe 'no-export')
    tabelaClone.querySelectorAll('button, .no-export').forEach(el => el.remove());

    // Monta o HTML para exportação
    const html = `
        <html>
        <head>
            <meta charset="UTF-8">
        </head>
        <body>
            ${tabelaClone.outerHTML}
        </body>
        </html>
    `;

    // Cria um Blob e faz o download
    const blob = new Blob([html], { type: "application/vnd.ms-excel" });
    const url = URL.createObjectURL(blob);

    // Nome do arquivo baseado no <h2> da tabela, se existir
    let nomeArquivo = "tabela.xls";
    const h2 = tabelaSelecionada.querySelector("h2");
    if (h2 && h2.textContent) {
        nomeArquivo = h2.textContent.replace(/[\\/:*?"<>|]/g, '').trim() + ".xls";
    }

    const a = document.createElement("a");
    a.href = url;
    a.download = nomeArquivo;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}
// ...existing code...

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